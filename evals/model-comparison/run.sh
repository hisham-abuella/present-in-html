#!/usr/bin/env bash
# Model comparison for the present-in-html skill.
#
# Runs one task's one-shot prompt (tasks/<task>/prompt.txt) on its source file (tasks/<task>/*.md) with several models
# through the Claude Code CLI, each in a brand-new empty folder, then scores every deck (evaluate.sh) and writes the
# report (report.mjs).
#
#   evals/model-comparison/run.sh                                   # TASK=wireless-101, default models (see MODELS below)
#   TASK=stats-101 evals/model-comparison/run.sh
#   evals/model-comparison/run.sh opus=claude-opus-5-5 qwen=ollama:qwen3.8:27b-mlx
#
# A model is label=id. Prefix the id with "ollama:" to run it locally through Ollama's Anthropic-compatible API.
# Environment: TASK (a folder in tasks/), RUN_ID (add to an existing results/<run-id>), TIMEOUT_MIN (per run, default 90),
# BUDGET_USD (per cloud run, default 20), OLLAMA_URL, SKIP_EVAL=1.
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(cd "$HERE/../.." && pwd)"
PLUGIN="$REPO/plugins/present-in-html"
TASK="${TASK:-wireless-101}"
SOURCE="$(ls "$HERE/tasks/$TASK"/*.md 2>/dev/null | grep -v '/PLAN\.md$' | head -1)"
PLAN="$HERE/tasks/$TASK/PLAN.md"   # a shared plan written by plan.sh, given to every model (planned tasks only)
if [ -f "$HERE/tasks/$TASK/plan-prompt.txt" ] && [ ! -f "$PLAN" ]; then echo "task $TASK needs a plan first: TASK=$TASK $HERE/plan.sh"; exit 1; fi
[ -f "$SOURCE" ] && [ -f "$HERE/tasks/$TASK/prompt.txt" ] || { echo "no task '$TASK': need tasks/$TASK/prompt.txt and one .md source"; exit 1; }
PROMPT="$(cat "$HERE/tasks/$TASK/prompt.txt")"
TIMEOUT_MIN="${TIMEOUT_MIN:-90}"
BUDGET_USD="${BUDGET_USD:-20}"
OLLAMA_URL="${OLLAMA_URL:-http://localhost:11434}"

if [ $# -gt 0 ]; then MODELS=("$@"); else
  MODELS=(opus=claude-opus-5-5 sonnet=claude-sonnet-5-5 haiku=claude-haiku-5-5 qwen-local=ollama:qwen3.8:27b-mlx)
fi

RUN_ID="${RUN_ID:-$(date +%Y%m%d-%H%M%S)-$TASK}"   # set RUN_ID to rerun some models into an existing run
OUT="$HERE/results/$RUN_ID"
mkdir -p "$OUT"

# Work folders live outside the repo: Claude Code reads CLAUDE.md from every parent folder, so a run inside the repo
# would see this project's rules. Refuse to start if any parent of the work root has one.
WORK_ROOT="$(mktemp -d "${TMPDIR:-/tmp}/pih-eval-$RUN_ID.XXXX")"
d="$WORK_ROOT"; while [ "$d" != "/" ]; do
  for f in CLAUDE.md CLAUDE.local.md .claude; do
    [ -e "$d/$f" ] && [ "$d" != "$HOME" ] && { echo "abort: $d/$f would leak into the runs"; exit 1; }
  done
  d="$(dirname "$d")"
done

# Same conditions for every run:
#   new empty folder holding only the source file      no settings files (user, project, local)
#   only this repo's plugin (--plugin-dir)              no MCP servers, no claude.ai connectors
#   no saved session, permissions bypassed (headless)   runs one after another, so timings do not compete
COMMON=(--output-format stream-json --verbose --dangerously-skip-permissions --setting-sources ""
        --strict-mcp-config --plugin-dir "$PLUGIN" --no-session-persistence)
export ENABLE_CLAUDEAI_MCP_SERVERS=false DISABLE_AUTOUPDATER=1

{
  echo "{"
  echo "  \"task\": \"$TASK\","
  echo "  \"title\": \"$(head -1 "$SOURCE" | sed 's/^# *//; s/"/\\"/g')\","
  echo "  \"run_id\": \"$RUN_ID\","
  echo "  \"claude_version\": \"$(claude --version 2>/dev/null)\","
  echo "  \"ollama_version\": \"$(ollama --version 2>/dev/null | awk '{print $NF}')\","
  echo "  \"machine\": \"$(sysctl -n machdep.cpu.brand_string 2>/dev/null || uname -m), $(( $(sysctl -n hw.memsize 2>/dev/null || echo 0) / 1073741824 )) GB\","
  echo "  \"plugin_version\": \"$(grep -o '"version": *"[^"]*"' "$PLUGIN/.claude-plugin/plugin.json" | head -1 | sed 's/.*"\([^"]*\)"$/\1/')\","
  echo "  \"git_commit\": \"$(git -C "$REPO" rev-parse --short HEAD)\","
  echo "  \"timeout_min\": $TIMEOUT_MIN, \"budget_usd\": $BUDGET_USD"
  echo "}"
} > "$OUT/run.json"
cp "$HERE/tasks/$TASK/prompt.txt" "$OUT/prompt.txt"; cp "$SOURCE" "$OUT/source.md"
[ -f "$PLAN" ] && { cp "$PLAN" "$OUT/PLAN.md"; cp "$HERE/tasks/$TASK/plan.json" "$OUT/plan.json" 2>/dev/null; }
echo "run $RUN_ID  ->  $OUT"
echo "work folders in $WORK_ROOT"

for spec in "${MODELS[@]}"; do
  label="${spec%%=*}"; model="${spec#*=}"
  work="$WORK_ROOT/$label"; dest="$OUT/$label"
  rm -rf "$dest"; mkdir -p "$work" "$dest"
  cp "$SOURCE" "$work/"
  [ -f "$PLAN" ] && cp "$PLAN" "$work/"

  envs=(); extra=(--max-budget-usd "$BUDGET_USD"); provider=anthropic
  if [[ "$model" == ollama:* ]]; then
    model="${model#ollama:}"; provider=ollama; extra=()
    curl -sf "$OLLAMA_URL/api/version" >/dev/null || { echo "skip $label: Ollama not reachable at $OLLAMA_URL"; continue; }
    # Load the model before the clock starts so load time is not counted, and keep it loaded for the whole run.
    curl -s "$OLLAMA_URL/api/generate" -d "{\"model\":\"$model\",\"keep_alive\":\"$((TIMEOUT_MIN + 30))m\"}" >/dev/null
    envs=(ANTHROPIC_BASE_URL="$OLLAMA_URL" ANTHROPIC_AUTH_TOKEN=ollama ANTHROPIC_API_KEY=
          ANTHROPIC_DEFAULT_OPUS_MODEL="$model" ANTHROPIC_DEFAULT_SONNET_MODEL="$model"
          ANTHROPIC_DEFAULT_HAIKU_MODEL="$model" CLAUDE_CODE_SUBAGENT_MODEL="$model" API_TIMEOUT_MS=3600000)
  fi

  echo "== $label ($provider $model): running, timeout ${TIMEOUT_MIN}m"
  start=$(date +%s)
  ( cd "$work" && exec env ${envs[@]+"${envs[@]}"} claude -p "$PROMPT" --model "$model" "${COMMON[@]}" ${extra[@]+"${extra[@]}"} ) \
    > "$dest/transcript.jsonl" 2> "$dest/stderr.log" &
  pid=$!
  ( sleep $((TIMEOUT_MIN * 60)); kill -TERM "$pid" 2>/dev/null && touch "$dest/.timed-out" ) & watchdog=$!
  wait "$pid"; rc=$?
  kill "$watchdog" 2>/dev/null; wait "$watchdog" 2>/dev/null
  end=$(date +%s)
  timed_out=false; [ -e "$dest/.timed-out" ] && { timed_out=true; rm -f "$dest/.timed-out"; }
  # Unload a local model so the next one gets the whole GPU memory.
  [ "$provider" = ollama ] && curl -s "$OLLAMA_URL/api/generate" -d "{\"model\":\"$model\",\"keep_alive\":0}" >/dev/null

  # Keep everything the model produced (minus the copied source and any installed packages).
  rsync -a --exclude node_modules --exclude "$(basename "$SOURCE")" "$work/" "$dest/output/"
  cat > "$dest/meta.json" <<EOF
{"label": "$label", "model": "$model", "provider": "$provider", "started": $start, "ended": $end,
 "wall_seconds": $((end - start)), "exit_code": $rc, "timed_out": $timed_out, "work_dir": "$work"}
EOF
  echo "   done in $((end - start))s, exit $rc$([ "$timed_out" = true ] && echo ', TIMED OUT')"
done

if [ "${SKIP_EVAL:-0}" != 1 ]; then
  "$HERE/evaluate.sh" "$OUT"
  node "$HERE/report.mjs" "$OUT"
fi
echo "results: $OUT"
