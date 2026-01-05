#!/bin/bash

# Presentation Skill Setup Script
# This script helps set up reveal.js for the presentation skill

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REVEAL_SOURCE="/Users/hishamabuella/Work/Tools/reveal.js"

echo "==================================="
echo "Presentation Skill Setup"
echo "==================================="
echo

# Check if reveal.js source exists
if [ ! -d "$REVEAL_SOURCE" ]; then
    echo "reveal.js not found at $REVEAL_SOURCE"
    echo "Cloning reveal.js..."
    git clone https://github.com/hakimel/reveal.js.git "$REVEAL_SOURCE"
    echo "reveal.js cloned successfully!"
fi

# Function to create a new presentation
create_presentation() {
    local name="$1"
    local template="${2:-base}"

    if [ -z "$name" ]; then
        echo "Usage: $0 new <presentation-name> [template]"
        echo "Templates: base, tech-talk, business-pitch, minimal"
        exit 1
    fi

    local dir="$SCRIPT_DIR/presentations/$name"

    if [ -d "$dir" ]; then
        echo "Error: Presentation '$name' already exists"
        exit 1
    fi

    echo "Creating presentation: $name"
    mkdir -p "$dir/assets"

    # Copy reveal.js (or create symlink)
    echo "Setting up reveal.js..."
    cp -r "$REVEAL_SOURCE" "$dir/reveal.js"

    # Copy template
    local template_file="$SCRIPT_DIR/templates/${template}-template.html"
    if [ ! -f "$template_file" ]; then
        echo "Template '$template' not found, using base template"
        template_file="$SCRIPT_DIR/templates/base-template.html"
    fi

    cp "$template_file" "$dir/index.html"

    echo
    echo "Presentation created at: $dir"
    echo
    echo "Next steps:"
    echo "  1. Edit $dir/index.html"
    echo "  2. Open in browser to view"
    echo "  3. Press 'S' for speaker view"
}

# Function to list templates
list_templates() {
    echo "Available templates:"
    echo
    for f in "$SCRIPT_DIR/templates"/*.html; do
        name=$(basename "$f" .html | sed 's/-template//')
        echo "  - $name"
    done
    echo
}

# Function to show help
show_help() {
    echo "Usage: $0 <command> [options]"
    echo
    echo "Commands:"
    echo "  new <name> [template]  Create a new presentation"
    echo "  templates              List available templates"
    echo "  install-skill          Install skill to ~/.claude/skills/"
    echo "  help                   Show this help message"
    echo
    echo "Examples:"
    echo "  $0 new my-talk"
    echo "  $0 new investor-pitch business-pitch"
    echo "  $0 templates"
}

# Install skill globally
install_skill() {
    local target="$HOME/.claude/skills"
    mkdir -p "$target"
    cp "$SCRIPT_DIR/.claude/skills/presentation.md" "$target/"
    echo "Skill installed to $target/presentation.md"
    echo "You can now use /presentation in any Claude Code session"
}

# Main
case "${1:-help}" in
    new)
        create_presentation "$2" "$3"
        ;;
    templates)
        list_templates
        ;;
    install-skill)
        install_skill
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo "Unknown command: $1"
        show_help
        exit 1
        ;;
esac
