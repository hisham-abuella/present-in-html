# Presentation Skill Quick Reference

## Self-Contained HTML Presentations

All presentations are single HTML files with no external dependencies.

## Slide Syntax

### Slide Separator
```markdown
---
```

### Slide with Class
```markdown
---
class: center-content

# Centered Title
```

### Available Classes

| Class | Effect |
|-------|--------|
| `center-content` | Center content vertically and horizontally |
| `section-slide` | Dark background section divider |

## Content Types

### Title Slide
```markdown
class: center-content

# Main Title
### Subtitle

Author Name

<div class="contact-links">...</div>
```

### Content Slide
```markdown
## Slide Title

- Bullet point one
- Bullet point two
- Bullet point three
```

### Code Block
````markdown
## Code Example

```python
def hello(name):
    return f"Hello, {name}!"
```
````

### Feature Grid (2 columns)
```html
<div class="feature-grid"><div class="feature-card"><div class="feature-icon">🚀</div><div class="feature-content"><strong>Title</strong><span>Description</span></div></div><div class="feature-card"><div class="feature-icon">⚡</div><div class="feature-content"><strong>Title</strong><span>Description</span></div></div></div>
```

**Important:** Keep feature-grid HTML on a single line!

### Comparison Table
```html
<table class="comparison-table">
<tr class="compare-row header">
<td class="compare-cell">Feature</td>
<td class="compare-cell">Option A</td>
<td class="compare-cell highlight">Option B</td>
</tr>
<tr class="compare-row">
<td class="compare-cell">Speed</td>
<td class="compare-cell">Fast</td>
<td class="compare-cell highlight">Faster</td>
</tr>
</table>
```

### Contact Links
```html
<div class="contact-links">
<a href="mailto:email@example.com" class="contact-link">📧 Email</a>
<a href="https://linkedin.com" class="contact-link">💼 LinkedIn</a>
</div>
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

## Theme Customization

Edit CSS variables in `:root`:

```css
:root {
    --accent-color: #D97757;    /* Accent color */
    --title-font: Georgia, serif;
    --body-font: -apple-system, sans-serif;
    --text-primary: #1d1d1f;
    --bg-color: #ffffff;
}
```

## Template Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>/* All CSS here */</style>
</head>
<body>
    <div class="toolbar"><!-- Toolbar buttons --></div>
    <div class="presentation-container">
        <div class="slide-frame">
            <div class="slides-container"></div>
        </div>
    </div>
    <script id="slides-markdown" type="text/markdown">
    <!-- Slide content here -->
    </script>
    <script>/* JavaScript here */</script>
</body>
</html>
```

## Tips

1. **Keep slides focused** - One main idea per slide
2. **Use center-content** - For title and closing slides
3. **Feature grids on single line** - Prevents markdown parsing issues
4. **Test in browser** - Just open the HTML file directly
5. **Use the outline** - Press O to navigate quickly
