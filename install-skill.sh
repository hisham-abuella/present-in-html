#!/bin/bash

# ============================================
# Claude Presentation Skill Installer
# ============================================

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_FOLDER="$SCRIPT_DIR/keynote_html_claude_skill"

echo -e "${CYAN}"
echo "============================================"
echo "  Claude Presentation Skill Installer"
echo "============================================"
echo -e "${NC}"

# Check if skill folder exists
if [ ! -d "$SKILL_FOLDER" ]; then
    echo -e "${RED}Error: Skill folder not found at $SKILL_FOLDER${NC}"
    exit 1
fi

# Ask user for installation directory
echo -e "${YELLOW}Where would you like to install the skill?${NC}"
echo ""
echo "  1) ~/.claude/skills/presentation  (recommended)"
echo "  2) Current project: ./.claude/skills/presentation"
echo "  3) Custom location"
echo ""
read -p "Select option [1-3]: " choice

case $choice in
    1)
        INSTALL_DIR="$HOME/.claude/skills/presentation"
        ;;
    2)
        INSTALL_DIR="./.claude/skills/presentation"
        ;;
    3)
        read -p "Enter custom path: " custom_path
        INSTALL_DIR="${custom_path/#\~/$HOME}"
        ;;
    *)
        INSTALL_DIR="$HOME/.claude/skills/presentation"
        ;;
esac

echo ""
echo -e "${BLUE}Installing to:${NC} $INSTALL_DIR"
echo ""

# Create directory and copy
mkdir -p "$INSTALL_DIR"

# Copy entire skill folder contents
cp -r "$SKILL_FOLDER/"* "$INSTALL_DIR/"

echo -e "${GREEN}✓ Skill installed successfully!${NC}"
echo ""
echo -e "${CYAN}Installed files:${NC}"
find "$INSTALL_DIR" -type f -name "*.html" -o -name "*.md" | head -20 | while read f; do
    echo "  • $f"
done

echo ""
echo -e "${CYAN}Usage:${NC}"
echo "  /presentation create \"Your Topic\""
echo "  /presentation template tech-talk"
echo ""
