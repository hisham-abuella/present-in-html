# Presentation Skill

Create professional, self-contained HTML presentations. Works offline with no external dependencies - perfect for presenting anywhere without internet access.

## Usage

Invoke this skill with: `/presentation`

## Quick Commands

- `/presentation create "Title"` - Create a new presentation
- `/presentation` - Start creating a presentation interactively

## Features

All presentations are **self-contained** (no CDN, no server required) and include:
- 16:9 aspect ratio widescreen format
- Touch/swipe navigation for mobile devices
- Keyboard shortcuts (O=outline, D=draw, M=marker, T=theme, F=fullscreen)
- Drawing/annotation canvas
- Slide outline panel
- Dark/Light theme toggle
- PDF export via print
- Markdown-based slide content

## Creating a New Presentation

When asked to create a presentation:

1. **Copy the template** from `index.html`
2. **Edit the slide content** in the `<script id="slides-markdown">` section
3. **Update the title** in the `<title>` tag
4. **Customize theme colors** in CSS `:root` variables if needed

## Slide Content Format

Edit content inside `<script id="slides-markdown" type="text/markdown">`:

### Basic Structure

```markdown
class: center-content

# Presentation Title
### Subtitle

Author Name

<div class="contact-links"><a href="mailto:email@example.com" class="contact-link">📧 Email</a></div>

---

## Slide Title

- Bullet point one
- Bullet point two

---

## Code Example

```python
def hello(name):
    return f"Hello, {name}!"
```

---
class: center-content

# Thank You!
### Questions?
```

### Slide Separators

Use `---` on its own line to separate slides.

### Slide Classes

Add `class:` at the start of a slide:

| Class | Effect |
|-------|--------|
| `center-content` | Center content vertically and horizontally |
| `section-slide` | Dark background section divider |

## Supported Content

### Text
- `# H1` - Main title (use for title slides)
- `## H2` - Slide titles
- `### H3` - Subtitles
- `- item` - Bullet lists
- `1. item` - Numbered lists
- `` `code` `` - Inline code as keyboard key style

### Code Blocks
````markdown
```python
def example():
    print("Hello")
```
````

### Feature Grid (2 columns)
```html
<div class="feature-grid"><div class="feature-card"><div class="feature-icon">🚀</div><div class="feature-content"><strong>Feature</strong><span>Description</span></div></div><div class="feature-card"><div class="feature-icon">⚡</div><div class="feature-content"><strong>Feature</strong><span>Description</span></div></div></div>
```

**IMPORTANT:** Keep feature-grid HTML on a single line to avoid markdown parsing issues!

### Comparison Table
```html
<table class="comparison-table">
<tr class="compare-row header"><td class="compare-cell">Feature</td><td class="compare-cell">A</td><td class="compare-cell highlight">B</td></tr>
<tr class="compare-row"><td class="compare-cell">Speed</td><td class="compare-cell">Fast</td><td class="compare-cell highlight">Faster</td></tr>
</table>
```

### Contact Links
```html
<div class="contact-links"><a href="mailto:email@example.com" class="contact-link">📧 Email</a><a href="https://linkedin.com" class="contact-link">💼 LinkedIn</a></div>
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| ← → | Navigate slides |
| O | Toggle outline |
| M | Marker mode |
| D | Drawing mode |
| C | Clear drawings |
| T | Toggle dark/light theme |
| F | Fullscreen |
| P | Export to PDF |
| Esc | Exit current mode |

## Theme Customization

Edit CSS variables in `:root`:

```css
:root {
    --accent-color: #D97757;    /* Claude orange */
    --title-font: Georgia, serif;
    --body-font: -apple-system, sans-serif;
    --text-primary: #1d1d1f;
    --bg-color: #ffffff;
}
```

## Best Practices

1. **Keep slides focused** - One main idea per slide
2. **Use center-content** - For title and closing slides
3. **Feature grids on single line** - Avoid markdown parsing issues
4. **Test in browser** - Open HTML file directly, no server needed
5. **Use the outline** - Press O to navigate quickly during presentation

## Example: Creating a Tech Presentation

When asked to "Create a presentation about Python":

```markdown
class: center-content

# Introduction to Python
### A Beginner's Guide

Your Name

---

## Why Python?

- Easy to learn syntax
- Versatile language
- Large community
- Extensive libraries

---

## Code Example

```python
# Hello World
print("Hello, World!")

# Variables
name = "Python"
version = 3.12
```

---

## Key Features

<div class="feature-grid"><div class="feature-card"><div class="feature-icon">📚</div><div class="feature-content"><strong>Libraries</strong><span>NumPy, Pandas, Django</span></div></div><div class="feature-card"><div class="feature-icon">🔧</div><div class="feature-content"><strong>Tools</strong><span>pip, virtualenv, pytest</span></div></div></div>

---
class: center-content

# Thank You!
### Questions?
```

## Setup Instructions

1. Copy `index.html` to your project folder
2. Rename it to match your presentation topic
3. Edit the markdown content in `<script id="slides-markdown">`
4. Open in any browser - works offline!
