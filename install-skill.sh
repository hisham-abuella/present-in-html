#!/bin/bash

# ============================================
# present-in-html installer (Keynote Pro skills for Claude Code)
# ============================================

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
RED='\033[0;31m'
DIM='\033[2m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILLS_SRC="$SCRIPT_DIR/plugins/present-in-html/skills"

echo -e "${CYAN}"
echo "╔══════════════════════════════════════════════╗"
echo "║   present-in-html for Claude Code            ║"
echo "║   Keynote Pro: make, edit, review, publish   ║"
echo "╚══════════════════════════════════════════════╝"
echo -e "${NC}"

if [ ! -f "$SKILLS_SRC/present-in-html/SKILL.md" ] || [ ! -f "$SKILLS_SRC/present-in-html/keynote-pro/template.html" ]; then
    echo -e "${RED}Error: plugin files not found under $SKILLS_SRC${NC}"
    exit 1
fi

echo -e "${YELLOW}How would you like to install?${NC}"
echo ""
echo -e "  1) ${GREEN}Plugin install${NC} ${DIM}(recommended: updates come with /plugin update)${NC}"
echo -e "  2) Copy the skills to ~/.claude/skills/ ${DIM}(every project)${NC}"
echo -e "  3) Copy the skills to ./.claude/skills/ ${DIM}(this project only)${NC}"
echo ""
read -p "Select option [1-3]: " method

case $method in
    1)
        echo ""
        echo -e "${CYAN}Run these in Claude Code:${NC}"
        echo ""
        echo -e "  ${GREEN}/plugin marketplace add hisham-abuella/present-in-html${NC}"
        echo -e "  ${GREEN}/plugin install present-in-html@present-in-html-marketplace${NC}"
        echo ""
        echo -e "${DIM}From this local clone instead:${NC}  ${GREEN}/plugin marketplace add $SCRIPT_DIR${NC}"
        exit 0
        ;;
    3) INSTALL_DIR="./.claude/skills" ;;
    *) INSTALL_DIR="$HOME/.claude/skills" ;;
esac

echo ""
echo -e "${BLUE}Installing to:${NC} $INSTALL_DIR"
mkdir -p "$INSTALL_DIR"
rm -f "$INSTALL_DIR/html-presentation.md" "$INSTALL_DIR/presentation.md" 2>/dev/null || true   # files from older versions

# Each skill is a folder with its SKILL.md. The engine ships inside present-in-html/keynote-pro/, and the other skills use it
# from there, so all four are installed side by side.
for SRC in "$SKILLS_SRC"/*/; do
    NAME="$(basename "$SRC")"
    rm -rf "$INSTALL_DIR/$NAME"
    cp -R "$SRC" "$INSTALL_DIR/$NAME"
    find "$INSTALL_DIR/$NAME" -name .DS_Store -delete
    echo -e "  ${GREEN}✓${NC} $NAME"
done
if [ -d "$INSTALL_DIR/html-presentation" ]; then
    echo -e "${YELLOW}Note:${NC} an older version is still at $INSTALL_DIR/html-presentation; remove it to avoid two presentation skills."
fi

echo ""
echo -e "${GREEN}Installation complete!${NC}"
echo ""
echo -e "${CYAN}Usage in Claude Code:${NC}"
echo "  /present-in-html   make a deck (or just ask for a presentation)"
echo "  /edit-deck         fix wording and notes in the browser editor"
echo "  /review-deck       check a deck against its audience and time slot"
echo "  /publish-deck      put a deck on GitHub Pages"
echo "  The checker needs Playwright once:  node $INSTALL_DIR/present-in-html/keynote-pro/check.mjs deck.html  prints the setup line if it is missing"
echo ""
