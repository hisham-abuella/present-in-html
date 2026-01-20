# HTML Presentation Skill for Claude Code

A Claude Code Skill for creating professional, self-contained HTML presentations. No external dependencies required - just describe what you want and Claude generates beautiful, interactive slide decks.

## Features

- **Self-contained HTML** - Single file presentations, no CDN or external dependencies
- **16:9 aspect ratio** - Professional widescreen format
- **Dark/Light mode** - Toggle with one click
- **Interactive toolbar** - Outline, marker, drawing, PDF export
- **Keyboard navigation** - Arrow keys, fullscreen (F), overview (O)
- **Responsive design** - Works on any screen size
- **Print to PDF** - Built-in export functionality

## Files

| File | Description |
|------|-------------|
| `index.html` | Main skill demo and template |
| `claude101.html` | Example presentation about Claude AI |
| `install-skill.sh` | Installation script for the skill |
| `logo.jpg` | Logo asset |

## Quick Start

1. **Install the skill** (optional):
   ```bash
   ./install-skill.sh
   ```

2. **Ask Claude to create a presentation**:
   ```
   Create a presentation about "Introduction to Python"
   ```

3. **Open the generated HTML file** in any modern browser

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| ← → | Navigate slides |
| O | Toggle outline |
| M | Marker mode |
| D | Drawing mode |
| C | Clear drawings |
| T | Toggle theme (dark/light) |
| F | Fullscreen |
| P | Export to PDF |

## Slide Types

- **Title slides** - Centered content with contact links
- **Content slides** - Headers, bullet points, code blocks
- **Feature grids** - 2-column card layouts
- **Tables** - Comparison and data tables
- **Code blocks** - Syntax highlighted with copy button

## Customization

The presentations use CSS variables for easy theming:

```css
:root {
    --accent-color: #D97757;  /* Claude orange */
    --title-font: Georgia, serif;
    --body-font: -apple-system, sans-serif;
}
```

## Example Presentations

- [Skill Demo](index.html) - Demo of this presentation skill
- [CLAUDE 101](claude101.html) - Introduction to Claude AI

## License

MIT License

## Credits

Created with Claude Code by Anthropic
