#!/usr/bin/env bash
# Scores every deck in a results folder made by run.sh, in two parts:
#   1. the skill's own checker (check.mjs): layout, overflow, text size, contrast, notes; plus a screenshot of every slide
#   2. a blind judge: one fixed model (JUDGE_MODEL, default claude-opus-5-5) grades each deck with judge-prompt.txt against
#      the source module, the slide text, the checker output and the screenshots, and lists wrong or invented claims,
#      UI issues and major mistakes (schema: judge-schema.json).
#
#   evals/model-comparison/evaluate.sh evals/model-comparison/results/<run-id>
# Re-running it rescores the decks (the judge's cost is recorded separately from the model's).
set -uo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(cd "$HERE/../.." && pwd)"
CHECK="$REPO/plugins/present-in-html/skills/present-in-html/scripts/check.mjs"
JUDGE_MODEL="${JUDGE_MODEL:-claude-opus-5-5}"
OUT="${1:?usage: evaluate.sh results/<run-id>}"; OUT="$(cd "$OUT" && pwd)"
export ENABLE_CLAUDEAI_MCP_SERVERS=false DISABLE_AUTOUPDATER=1

for dest in "$OUT"/*/; do
  dest="${dest%/}"; label="$(basename "$dest")"
  [ -f "$dest/meta.json" ] || continue
  deck="$dest/output/deck.html"
  [ -f "$deck" ] || deck="$(ls -t "$dest"/output/*.html 2>/dev/null | head -1)"
  if [ -z "$deck" ] || [ ! -f "$deck" ]; then echo "== $label: no deck produced"; echo '{"deck": null}' > "$dest/judge.json"; continue; fi
  echo "== $label: $(basename "$deck")"

  # 1. Checker, outline and screenshots (PNG -> 1280px JPEG to keep the results folder small).
  rm -rf "$dest/shots"; tmpshots="$(mktemp -d)"
  node "$CHECK" "$deck" --outline --shots "$tmpshots" > "$dest/check.txt" 2>&1; echo "checker_exit=$?" >> "$dest/check.txt"
  mkdir -p "$dest/shots"; i=0
  for png in $(ls "$tmpshots"/*.png 2>/dev/null | sort); do
    i=$((i + 1)); sips -s format jpeg -s formatOptions 70 -Z 1280 "$png" --out "$dest/shots/slide-$(printf %02d $i).jpg" >/dev/null
  done
  rm -rf "$tmpshots"
  grep -E '^(ok|FAIL) ' "$dest/check.txt" | sed 's/^/   /'
  node "$HERE/extract-slides.mjs" "$deck" "$dest" | sed 's/^/   /'

  # 2. Blind judge, in its own empty folder outside the repo; only Read/Glob/Grep, nothing else loaded.
  jw="$(mktemp -d "${TMPDIR:-/tmp}/pih-judge.XXXX")"
  cp "$OUT/source.md" "$jw/source.md"
  cp "$OUT/prompt.txt" "$jw/request.txt"
  cp "$dest/slides.md" "$jw/slides.md"
  grep -v '^checker_exit=' "$dest/check.txt" > "$jw/check.txt"
  cp -R "$dest/shots" "$jw/shots"
  start=$(date +%s)
  ( cd "$jw" && claude -p "$(cat "$HERE/judge-prompt.txt")" --model "$JUDGE_MODEL" --output-format json \
      --json-schema "$(cat "$HERE/judge-schema.json")" --tools Read,Glob,Grep --dangerously-skip-permissions \
      --setting-sources "" --strict-mcp-config --no-session-persistence ) > "$dest/judge.json" 2> "$dest/judge.stderr.log"
  echo "   judged by $JUDGE_MODEL in $(( $(date +%s) - start ))s"
  rm -rf "$jw"
done
