#!/bin/bash
# Open a present-in-html deck in the text editor, served from the deck's own folder so its images and fonts show.
#   open-editor.sh path/to/deck.html [port]    copy the editor beside the deck, start a local server, open the browser
#   open-editor.sh --stop path/to/deck.html    stop that server and remove the temporary editor copy
# The editor only opens ?deck= paths from its own folder, which is why it is copied next to the deck (as kp-editor.html).
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EDITOR_SRC="$HERE/../assets/editor.html"

if [ "${1:-}" = "--stop" ]; then
    DIR="$(cd "$(dirname "${2:?usage: open-editor.sh --stop deck.html}")" && pwd)"
    [ -f "$DIR/.kp-editor.pid" ] && kill "$(cat "$DIR/.kp-editor.pid")" 2>/dev/null || true
    rm -f "$DIR/.kp-editor.pid" "$DIR/kp-editor.html"
    echo "editor stopped; removed $DIR/kp-editor.html"
    exit 0
fi

DECK="${1:?usage: open-editor.sh deck.html [port]}"
[ -f "$DECK" ] || { echo "no such file: $DECK" >&2; exit 1; }
grep -q 'SLIDES:START' "$DECK" || echo "warning: $DECK does not look like a present-in-html deck (no SLIDES:START marker)" >&2
DIR="$(cd "$(dirname "$DECK")" && pwd)"; NAME="$(basename "$DECK")"
PORT="${2:-8765}"
while lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; do PORT=$((PORT + 1)); done

cp "$EDITOR_SRC" "$DIR/kp-editor.html"
( cd "$DIR" && exec python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 ) &
echo $! > "$DIR/.kp-editor.pid"
sleep 1

# ?deck= accepts only a plain relative name (letters, digits, - and _); otherwise the user picks the file with "Open deck"
if [[ "$NAME" =~ ^[A-Za-z0-9_-]+\.html?$ ]]; then URL="http://127.0.0.1:$PORT/kp-editor.html?deck=$NAME"
else URL="http://127.0.0.1:$PORT/kp-editor.html"; echo "note: the file name has characters ?deck= refuses; use Open deck and pick $NAME"; fi

if command -v open >/dev/null; then open "$URL"; elif command -v xdg-open >/dev/null; then xdg-open "$URL"; fi
echo "editor: $URL"
echo "stop:   $0 --stop \"$DECK\""
