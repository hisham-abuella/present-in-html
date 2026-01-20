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

echo -e "${CYAN}"
echo "============================================"
echo "  Claude Presentation Skill Installer"
echo "============================================"
echo -e "${NC}"

# Check if skill file exists
if [ ! -f "$SCRIPT_DIR/.claude/skills/presentation.md" ]; then
    echo -e "${RED}Error: Skill file not found at $SCRIPT_DIR/.claude/skills/presentation.md${NC}"
    exit 1
fi

# Ask user for installation type
echo -e "${YELLOW}What would you like to install?${NC}"
echo ""
echo "  1) Skill only (presentation.md)"
echo "  2) Skill + templates"
echo "  3) Everything (skill, templates, examples)"
echo ""
read -p "Select option [1-3]: " install_type

# Ask user for installation directory
echo ""
echo -e "${YELLOW}Where would you like to install?${NC}"
echo ""
echo "  1) ~/.claude/skills/ (global - recommended)"
echo "  2) ./.claude/skills/ (current project)"
echo "  3) Custom location"
echo ""
read -p "Select option [1-3]: " choice

case $choice in
    1)
        INSTALL_DIR="$HOME/.claude/skills"
        ;;
    2)
        INSTALL_DIR="./.claude/skills"
        ;;
    3)
        read -p "Enter custom path: " custom_path
        INSTALL_DIR="${custom_path/#\~/$HOME}"
        ;;
    *)
        INSTALL_DIR="$HOME/.claude/skills"
        ;;
esac

echo ""
echo -e "${BLUE}Installing to:${NC} $INSTALL_DIR"
echo ""

# Create directory
mkdir -p "$INSTALL_DIR"

# Install based on selection
case $install_type in
    1)
        # Skill only
        cp "$SCRIPT_DIR/.claude/skills/presentation.md" "$INSTALL_DIR/"
        echo -e "${GREEN}✓ Skill file installed${NC}"
        ;;
    2)
        # Skill + templates
        cp "$SCRIPT_DIR/.claude/skills/presentation.md" "$INSTALL_DIR/"
        mkdir -p "$INSTALL_DIR/presentation-templates"
        cp "$SCRIPT_DIR/templates/"*.html "$INSTALL_DIR/presentation-templates/" 2>/dev/null || true
        cp "$SCRIPT_DIR/index.html" "$INSTALL_DIR/presentation-templates/" 2>/dev/null || true
        echo -e "${GREEN}✓ Skill and templates installed${NC}"
        ;;
    3)
        # Everything
        cp "$SCRIPT_DIR/.claude/skills/presentation.md" "$INSTALL_DIR/"
        mkdir -p "$INSTALL_DIR/presentation-templates"
        cp "$SCRIPT_DIR/templates/"*.html "$INSTALL_DIR/presentation-templates/" 2>/dev/null || true
        cp "$SCRIPT_DIR/index.html" "$INSTALL_DIR/presentation-templates/" 2>/dev/null || true
        cp "$SCRIPT_DIR/claude101.html" "$INSTALL_DIR/presentation-templates/" 2>/dev/null || true
        cp "$SCRIPT_DIR/QUICK_REFERENCE.md" "$INSTALL_DIR/" 2>/dev/null || true
        echo -e "${GREEN}✓ Skill, templates, and examples installed${NC}"
        ;;
    *)
        cp "$SCRIPT_DIR/.claude/skills/presentation.md" "$INSTALL_DIR/"
        echo -e "${GREEN}✓ Skill file installed${NC}"
        ;;
esac

echo ""
echo -e "${CYAN}Installed files:${NC}"
find "$INSTALL_DIR" -type f \( -name "*.html" -o -name "*.md" \) 2>/dev/null | head -15 | while read f; do
    echo "  • $f"
done

echo ""
echo -e "${GREEN}Installation complete!${NC}"
echo ""
echo -e "${CYAN}Usage:${NC}"
echo "  /presentation create \"Your Topic\""
echo "  /presentation"
echo ""
