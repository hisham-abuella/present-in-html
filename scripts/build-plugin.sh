#!/bin/bash
# Copies the Keynote Pro files the skills use at runtime from keynote-pro/ (the engine's source, where you edit and build)
# into the plugin at plugins/present-in-html/skills/present-in-html/keynote-pro/. Build tools, sources, the gallery and
# thumbnails stay out of the plugin. Run after changing anything in keynote-pro/.
#   scripts/build-plugin.sh           sync the plugin copy
#   scripts/build-plugin.sh --check   exit 1 if the plugin copy is out of date (for CI or a pre-commit hook)
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/keynote-pro"
DEST="$ROOT/plugins/present-in-html/skills/present-in-html/keynote-pro"

# The skill ships the engine, the look library's CSS (add-look.mjs copies it into decks) and two model decks. The gallery
# (index.html, library/index.html, the other examples and the 26 profession sample decks) stays in keynote-pro/, summarised for
# the skill in references/looks.md, which this script regenerates.
FILES=(template.html check.mjs README.md editor.html
       tools/add-look.mjs tools/assemble.mjs tools/upgrade.mjs tools/looks.mjs
       library/looks.json
       examples/every-layout.html examples/beyond-slides.html)
cd "$SRC"
FILES+=(library/themes/*.css library/fonts/*.css)
for f in examples/every-layout.html examples/beyond-slides.html; do      # the images and video the model decks use
    for a in $(grep -oE '\.\./assets/[A-Za-z0-9._-]+' "$f" | sort -u); do FILES+=("${a#../}"); done
done
KEEP=("${FILES[@]}")

STAGE="$(mktemp -d)"; trap 'rm -rf "$STAGE"' EXIT
for f in "${KEEP[@]}"; do mkdir -p "$STAGE/$(dirname "$f")"; cp -p "$f" "$STAGE/$f"; done

# MIT requires the notice in every copy: the plugin root and each skill folder (manual installs copy single skills)
for d in "$ROOT/plugins/present-in-html" "$ROOT"/plugins/present-in-html/skills/*/; do cp "$ROOT/LICENSE" "$d/LICENSE"; done
node "$ROOT/scripts/build-looks-ref.mjs" >/dev/null   # references/looks.md (tracked by git, so --check sees drift there too)
if [ "${1:-}" = "--check" ]; then
    if diff -rq "$STAGE" "$DEST" >/dev/null 2>&1; then echo "plugin copy is up to date"; exit 0; fi
    echo "plugin copy is out of date; run scripts/build-plugin.sh"; diff -rq "$STAGE" "$DEST" | head -20; exit 1
fi
rm -rf "$DEST"; mkdir -p "$(dirname "$DEST")"; cp -R "$STAGE" "$DEST"
echo "synced ${#KEEP[@]} files into ${DEST#$ROOT/} ($(du -sh "$DEST" | cut -f1))"
