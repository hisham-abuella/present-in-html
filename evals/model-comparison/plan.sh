#!/usr/bin/env bash
# Writes the shared PLAN.md for a planned task: one planner model (PLANNER, default claude-opus-5-5) runs
# tasks/<task>/plan-prompt.txt on the task's source, in a new empty folder outside the repo with the same isolation as
# run.sh. Saves PLAN.md, plan.json (time, cost, tokens) and plan-transcript.jsonl into tasks/<task>/; run.sh then gives
# that same PLAN.md to every model.
#
#   TASK=stats-101-planned evals/model-comparison/plan.sh
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(cd "$HERE/../.." && pwd)"
PLUGIN="$REPO/plugins/present-in-html"
TASK="${TASK:?set TASK to a folder in tasks/ that has plan-prompt.txt}"
DIR="$HERE/tasks/$TASK"
PLANNER="${PLANNER:-claude-opus-5-5}"
SOURCE="$(ls "$DIR"/*.md 2>/dev/null | grep -v '/PLAN\.md$' | head -1)"
[ -f "$DIR/plan-prompt.txt" ] && [ -f "$SOURCE" ] || { echo "need tasks/$TASK/plan-prompt.txt and a source .md"; exit 1; }

work="$(mktemp -d "${TMPDIR:-/tmp}/pih-plan-$TASK.XXXX")"
cp "$SOURCE" "$work/"
export ENABLE_CLAUDEAI_MCP_SERVERS=false DISABLE_AUTOUPDATER=1
echo "planning $TASK with $PLANNER in $work"
start=$(date +%s)
( cd "$work" && claude -p "$(cat "$DIR/plan-prompt.txt")" --model "$PLANNER" --output-format stream-json --verbose \
    --dangerously-skip-permissions --setting-sources "" --strict-mcp-config --plugin-dir "$PLUGIN" \
    --no-session-persistence --max-budget-usd "${BUDGET_USD:-20}" ) > "$DIR/plan-transcript.jsonl" 2> "$work/stderr.log"
rc=$?; end=$(date +%s)

[ -f "$work/PLAN.md" ] || { echo "no PLAN.md written (exit $rc); see $work and $DIR/plan-transcript.jsonl"; exit 1; }
cp "$work/PLAN.md" "$DIR/PLAN.md"
node -e '
const fs = require("fs");
const lines = fs.readFileSync(process.argv[1], "utf8").split("\n").filter(Boolean).map(l => { try { return JSON.parse(l); } catch { return {}; } });
const r = lines.find(e => e.type === "result") || {};
const mu = Object.values(r.modelUsage || {});
const sum = k => mu.reduce((a, m) => a + (m[k] || 0), 0);
fs.writeFileSync(process.argv[2], JSON.stringify({
  planner: process.argv[3], wall_seconds: +process.argv[4], exit_code: +process.argv[5], cost_usd: r.total_cost_usd ?? null,
  turns: r.num_turns ?? null, tokens: {input: sum("inputTokens"), output: sum("outputTokens"), cache_read: sum("cacheReadInputTokens")},
  plan_kb: Math.round(fs.statSync(process.argv[6]).size / 1024),
}, null, 2) + "\n");
' "$DIR/plan-transcript.jsonl" "$DIR/plan.json" "$PLANNER" "$((end - start))" "$rc" "$DIR/PLAN.md"
cat "$DIR/plan.json"
rm -rf "$work"
