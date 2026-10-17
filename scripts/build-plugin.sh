#!/bin/bash
# Builds the runtime files of the plugin's skills from keynote-pro/ (the engine's source, where you edit and build), in the
# standard skill layout: SKILL.md + scripts/ (code that runs) + assets/ (files used in output) + references/ (docs read when
# needed). Build tools, sources, the gallery and sample decks stay out of the plugin. Run after changing keynote-pro/.
#   scripts/build-plugin.sh           sync the plugin
#   scripts/build-plugin.sh --check   exit 1 if the plugin is out of date (for CI or a pre-commit hook)
#
#   present-in-html/scripts/      check.mjs, add-look.mjs, assemble.mjs, upgrade.mjs, looks.mjs
#   present-in-html/assets/       template.html, library/ (theme and font CSS + looks.json), examples/beyond-slides.html,
#                                 images/ (the video the model deck plays)
#   present-in-html/references/   manual.md (the engine README without its developer sections), looks.md (generated)
#   edit-deck/assets/             editor.html
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/keynote-pro"
SKILLS="$ROOT/plugins/present-in-html/skills"
STAGE="$(mktemp -d)"; trap 'rm -rf "$STAGE"' EXIT
P="$STAGE/present-in-html"; E="$STAGE/edit-deck"
mkdir -p "$P/scripts" "$P/assets/library/themes" "$P/assets/library/fonts" "$P/assets/examples" "$P/assets/images" "$P/references" "$E/assets"

cd "$SRC"
cp -p check.mjs tools/add-look.mjs tools/assemble.mjs tools/upgrade.mjs tools/looks.mjs "$P/scripts/"
cp -p template.html "$P/assets/"
cp -p library/looks.json "$P/assets/library/"
cp -p library/themes/*.css "$P/assets/library/themes/"
cp -p library/fonts/*.css "$P/assets/library/fonts/"
# One model deck: live demos on slides (the template already shows every layout once). Its media move to assets/images/.
for a in $(grep -oE '\.\./assets/[A-Za-z0-9._-]+' examples/beyond-slides.html | sort -u); do cp -p "${a#../}" "$P/assets/images/"; done
sed 's#\.\./assets/#../images/#g' examples/beyond-slides.html > "$P/assets/examples/beyond-slides.html"
cp -p editor.html "$E/assets/"
node "$ROOT/scripts/build-skill-refs.mjs" "$P/references"     # manual.md and looks.md

# MIT requires the notice in every copy: the plugin root and each skill folder (manual installs copy single skills)
cp "$ROOT/LICENSE" "$ROOT/plugins/present-in-html/LICENSE"
for d in "$SKILLS"/*/; do cp "$ROOT/LICENSE" "$d/LICENSE"; done

# Generated parts only; SKILL.md, LICENSE, references/engine.md and each skill's own scripts/ are edited in place.
GEN=(present-in-html/scripts present-in-html/assets present-in-html/references/manual.md present-in-html/references/looks.md edit-deck/assets)
if [ "${1:-}" = "--check" ]; then
    bad=0; for g in "${GEN[@]}"; do diff -rq "$STAGE/$g" "$SKILLS/$g" >/dev/null 2>&1 || { echo "out of date: $g"; bad=1; }; done
    [ -e "$SKILLS/present-in-html/keynote-pro" ] && { echo "stale: present-in-html/keynote-pro (old layout)"; bad=1; }
    [ $bad = 0 ] && echo "plugin is up to date" || echo "run scripts/build-plugin.sh"; exit $bad
fi
rm -rf "$SKILLS/present-in-html/keynote-pro"                   # the old layout, before the standard one
for g in "${GEN[@]}"; do rm -rf "$SKILLS/$g"; mkdir -p "$(dirname "$SKILLS/$g")"; cp -R "$STAGE/$g" "$SKILLS/$g"; done
echo "built: present-in-html $(du -sh "$SKILLS/present-in-html" | cut -f1), edit-deck $(du -sh "$SKILLS/edit-deck" | cut -f1)"
