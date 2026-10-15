#!/bin/bash

# ============================================
# HTML Presentation Skill Installer
# ============================================

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
RED='\033[0;31m'
DIM='\033[2m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "${CYAN}"
echo "╔══════════════════════════════════════════════╗"
echo "║   HTML Presentation Skill for Claude Code    ║"
echo "║   Keynote Pro (default) · Stories · Course  ║"
echo "╚══════════════════════════════════════════════╝"
echo -e "${NC}"

# Check that the skill files exist (SKILL.md is the skill; keynote-pro/ is the default engine)
SKILL_DIR_SRC="$SCRIPT_DIR/skills/html-presentation"
if [ ! -f "$SKILL_DIR_SRC/SKILL.md" ] || [ ! -f "$SCRIPT_DIR/keynote-pro/template.html" ]; then
    echo -e "${RED}Error: skills/html-presentation/SKILL.md or keynote-pro/template.html not found in $SCRIPT_DIR${NC}"
    exit 1
fi

# Installation method
echo -e "${YELLOW}How would you like to install?${NC}"
echo ""
echo -e "  1) ${GREEN}Plugin install${NC} ${DIM}(recommended — adds as Claude Code plugin)${NC}"
echo -e "  2) Manual skill copy ${DIM}(copy to ~/.claude/skills/ — global)${NC}"
echo -e "  3) Manual skill copy ${DIM}(copy to ./.claude/skills/ — this project)${NC}"
echo ""
read -p "Select option [1-3]: " method

case $method in
    1)
        # Plugin installation
        echo ""
        echo -e "${BLUE}Installing as Claude Code plugin...${NC}"
        echo ""
        echo -e "${CYAN}To install this plugin, run the following in Claude Code:${NC}"
        echo ""
        echo -e "  ${GREEN}/plugin marketplace add $SCRIPT_DIR${NC}"
        echo -e "  ${GREEN}/plugin install html-presentation@html-presentation-marketplace${NC}"
        echo ""
        echo -e "${DIM}Or if this repo is on GitHub:${NC}"
        echo ""
        echo -e "  ${GREEN}/plugin marketplace add owner/keynote_html_claude_skill${NC}"
        echo -e "  ${GREEN}/plugin install html-presentation@html-presentation-marketplace${NC}"
        echo ""
        echo -e "${GREEN}Plugin config is ready at:${NC} .claude-plugin/plugin.json"
        exit 0
        ;;
    2)
        INSTALL_DIR="$HOME/.claude/skills"
        ;;
    3)
        INSTALL_DIR="./.claude/skills"
        ;;
    *)
        INSTALL_DIR="$HOME/.claude/skills"
        ;;
esac

# Ask what to install
echo ""
echo -e "${YELLOW}What would you like to install?${NC}"
echo ""
echo "  1) Skill + Keynote Pro engine (template, checker, README, fonts.html, tools)"
echo "  2) Option 1 + older formats (markdown keynote, Stories)"
echo "  3) Everything (option 2 + Keynote Pro examples, library, assets, samples)"
echo ""
read -p "Select option [1-3]: " install_type

echo ""
echo -e "${BLUE}Installing to:${NC} $INSTALL_DIR/html-presentation"
echo ""

# A skill is a folder: <skills dir>/html-presentation/SKILL.md. Keynote Pro sits beside it at
# html-presentation/keynote-pro/, which is where SKILL.md looks first.
DEST="$INSTALL_DIR/html-presentation"
mkdir -p "$DEST"
# remove flat files left by older versions of this installer
rm -f "$INSTALL_DIR/html-presentation.md" "$INSTALL_DIR/presentation.md" 2>/dev/null || true

install_skill() {
    cp "$SKILL_DIR_SRC/SKILL.md" "$SKILL_DIR_SRC/legacy-formats.md" "$DEST/"
}
install_keynote_pro() {   # $1 = "full" to include examples, library, assets
    local KP="$DEST/keynote-pro"
    mkdir -p "$KP/tools"
    cp "$SCRIPT_DIR/keynote-pro/template.html" "$SCRIPT_DIR/keynote-pro/check.mjs" "$SCRIPT_DIR/keynote-pro/README.md" "$SCRIPT_DIR/keynote-pro/fonts.html" "$KP/"
    cp "$SCRIPT_DIR/keynote-pro/build-examples.mjs" "$KP/" 2>/dev/null || true
    cp -R "$SCRIPT_DIR/keynote-pro/tools/." "$KP/tools/"
    if [ "$1" = "full" ]; then
        rm -rf "$KP/examples" "$KP/library" "$KP/assets"
        cp -R "$SCRIPT_DIR/keynote-pro/examples" "$KP/examples"
        cp -R "$SCRIPT_DIR/keynote-pro/library" "$KP/library"
        cp -R "$SCRIPT_DIR/keynote-pro/assets" "$KP/assets"
        cp "$SCRIPT_DIR/keynote-pro/index.html" "$KP/" 2>/dev/null || true
    else
        # decks reference ../assets; keep the stock images (small) so a copied template renders
        rm -rf "$KP/assets"; cp -R "$SCRIPT_DIR/keynote-pro/assets" "$KP/assets"
    fi
}
install_legacy() {   # $1 = "full" to include samples and demos
    mkdir -p "$DEST/legacy"
    cp "$SCRIPT_DIR/index.html" "$SCRIPT_DIR/stories-template.html" "$DEST/legacy/" 2>/dev/null || true
    if [ "$1" = "full" ]; then
        cp "$SCRIPT_DIR/demo-keynote.html" "$SCRIPT_DIR/claude101.html" "$DEST/legacy/" 2>/dev/null || true
        mkdir -p "$DEST/legacy/samples"
        cp "$SCRIPT_DIR/samples/"*.html "$DEST/legacy/samples/" 2>/dev/null || true
        cp "$SCRIPT_DIR/QUICK_REFERENCE.md" "$DEST/" 2>/dev/null || true
    fi
}

case $install_type in
    2)
        install_skill; install_keynote_pro basic; install_legacy basic
        echo -e "${GREEN}✓ Skill, Keynote Pro and older-format templates installed${NC}"
        ;;
    3)
        install_skill; install_keynote_pro full; install_legacy full
        echo -e "${GREEN}✓ Skill, Keynote Pro (examples, library, assets) and older formats installed${NC}"
        ;;
    *)
        install_skill; install_keynote_pro basic
        echo -e "${GREEN}✓ Skill and Keynote Pro installed${NC}"
        ;;
esac

echo ""
echo -e "${CYAN}Installed files:${NC}"
find "$INSTALL_DIR" -type f \( -name "*.mjs" -o -name "*.html" -o -name "*.md" \) -not -path "*/library/*" -not -path "*/examples/*" -not -path "*/samples/*" 2>/dev/null | head -20 | while read f; do
    echo "  • $f"
done

echo ""
echo -e "${GREEN}Installation complete!${NC}"
echo ""
echo -e "${CYAN}Usage in Claude Code:${NC}"
echo "  /html-presentation"
echo "  /html-presentation  (Keynote Pro is the default; ask for Stories or a Course by name)"
echo "  Checker needs Playwright once:  node $DEST/keynote-pro/check.mjs deck.html  prints the setup line if it is missing"
echo ""
