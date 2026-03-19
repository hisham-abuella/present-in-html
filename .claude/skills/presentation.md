# Presentation Skill

Create professional, self-contained HTML presentations in two formats. Works offline with no external dependencies.

## Usage

Invoke this skill with: `/presentation`

## Quick Commands

- `/presentation create "Title"` - Create a keynote-style presentation (16:9 widescreen)
- `/presentation story "Title"` - Create a stories-style presentation (vertical, mobile-first)
- `/presentation` - Start creating interactively

## Two Presentation Formats

### 1. Keynote Format (default)
Template: `index.html` — 16:9 widescreen, markdown-based, toolbar with drawing/annotation tools, dark/light theme, PDF export.

### 2. Stories Format
Template: `stories-template.html` — Vertical mobile-first format (like Instagram Stories), beautiful gradient backgrounds, grain texture, floating orbs, staggered animations. Great for educational content, narratives, and mobile audiences.

---

## KEYNOTE FORMAT

### Creating a Keynote Presentation

1. **Copy** `index.html` to your project folder
2. **Edit slide content** in `<script id="slides-markdown">`
3. **Update** the `<title>` tag
4. **Customize** CSS `:root` variables for theme

### Slide Content (Markdown)

Edit inside `<script id="slides-markdown" type="text/markdown">`:

```markdown
class: center-content

# Presentation Title
### Subtitle

Author Name

<div class="contact-links"><a href="mailto:email@example.com" class="contact-link">Email</a></div>

---

## Slide Title

- Bullet point one
- Bullet point two

---
class: center-content

# Thank You!
### Questions?
```

### Slide Separators

Use `---` on its own line.

### Slide Classes

Add `class:` at the start of a slide:

| Class | Effect |
|-------|--------|
| `center-content` | Center content vertically and horizontally |
| `section-slide` | Dark background section divider |
| `gradient-bg` | Purple gradient background with white text |
| `gradient-warm` | Pink-red gradient |
| `gradient-cool` | Blue-cyan gradient with dark text |
| `gradient-dark` | Deep navy gradient |
| `gradient-sunset` | Pink-yellow gradient with dark text |
| `gradient-forest` | Green gradient with dark text |
| `dark-accent` | Dark navy with glowing accent orb |
| `quote-slide` | Large decorative quote mark, centered |
| `split-slide` | Two-panel layout (requires split-left/split-right divs) |

### Text Content

- `# H1` - Main title (title slides)
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

### New Components

#### Stat Cards (number showcase)
```html
<div class="stat-grid"><div class="stat-card"><div class="stat-value">42%</div><div class="stat-label">Growth Rate</div></div><div class="stat-card"><div class="stat-value">3.2M</div><div class="stat-label">Users</div></div><div class="stat-card"><div class="stat-value">99.9%</div><div class="stat-label">Uptime</div></div></div>
```

#### Timeline
```html
<div class="timeline"><div class="timeline-item"><div class="tl-date">2024</div><div class="tl-title">Milestone One</div><div class="tl-desc">Description of what happened</div></div><div class="timeline-item"><div class="tl-date">2025</div><div class="tl-title">Milestone Two</div><div class="tl-desc">Description of what happened</div></div></div>
```

#### Icon Grid (3-column)
```html
<div class="icon-grid"><div class="icon-card"><div class="icon-emoji">🚀</div><div class="icon-title">Speed</div><div class="icon-desc">Lightning fast</div></div><div class="icon-card"><div class="icon-emoji">🔒</div><div class="icon-title">Security</div><div class="icon-desc">Enterprise grade</div></div><div class="icon-card"><div class="icon-emoji">📊</div><div class="icon-title">Analytics</div><div class="icon-desc">Deep insights</div></div></div>
```

#### Pill Tags
```html
<div class="pill-tags"><span class="pill">Default</span><span class="pill pill-green">Success</span><span class="pill pill-red">Critical</span><span class="pill pill-yellow">Warning</span><span class="pill pill-purple">New</span></div>
```

#### Progress Steps (horizontal workflow)
```html
<div class="progress-steps"><div class="step"><div class="step-dot">1</div><div class="step-label">Plan</div><div class="step-sublabel">Define scope</div></div><div class="step"><div class="step-dot">2</div><div class="step-label">Build</div><div class="step-sublabel">Write code</div></div><div class="step"><div class="step-dot">3</div><div class="step-label">Ship</div><div class="step-sublabel">Deploy</div></div></div>
```

#### Callout Box
```html
<div class="callout"><div class="callout-title">Important Note</div><div class="callout-text">Key information goes here.</div></div>
```
Variants: `callout-warn`, `callout-success`, `callout-error`

#### Quote Slide
Use `class: quote-slide` then:
```html
<blockquote>The best way to predict the future is to invent it.</blockquote>
<div class="quote-author">Alan Kay</div>
```

#### Split Slide
Use `class: split-slide` then:
```html
<div class="split-left"><h2>Left Panel</h2><p>Description</p></div><div class="split-right"><ul><li>Point one</li><li>Point two</li></ul></div>
```

#### Feature Grid (2 columns)
```html
<div class="feature-grid"><div class="feature-card"><div class="feature-icon">🚀</div><div class="feature-content"><strong>Feature</strong><span>Description</span></div></div><div class="feature-card"><div class="feature-icon">⚡</div><div class="feature-content"><strong>Feature</strong><span>Description</span></div></div></div>
```

#### Comparison Table
```html
<table class="comparison-table"><tr class="compare-row header"><td class="compare-cell">Feature</td><td class="compare-cell">A</td><td class="compare-cell highlight">B</td></tr><tr class="compare-row"><td class="compare-cell">Speed</td><td class="compare-cell">Fast</td><td class="compare-cell highlight">Faster</td></tr></table>
```

**IMPORTANT:** Keep all HTML components on a single line to avoid markdown parsing issues!

### Theme Customization

Edit CSS variables in `:root`:

```css
:root {
    --accent-color: #2563eb;      /* Primary accent */
    --accent-light: #dbeafe;      /* Light accent bg */
    --accent-dark: #1e40af;       /* Dark accent */
    --title-font: 'Palatino Linotype', Palatino, Georgia, serif;
    --body-font: 'Avenir Next', 'Segoe UI', sans-serif;
    --mono-font: 'SF Mono', 'Fira Code', Monaco, monospace;
    --text-primary: #0f172a;
    --bg-color: #ffffff;
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Keyboard Shortcuts

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

---

## STORIES FORMAT

### Creating a Stories Presentation

1. **Copy** `stories-template.html` to your project folder
2. **Edit the slide divs** directly in the HTML body
3. **Update** the `<title>` tag
4. **Customize** CSS `:root` variables

### Slide Structure

Each slide is a `<div class="s s--variant">` with this structure:

```html
<div class="s s--ink">
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="s-top">
    <div class="s-brand"><div class="s-brand-dot"></div><div class="s-brand-name">Brand</div></div>
    <div class="s-tag">Topic</div>
  </div>
  <div class="s-body">
    <div class="s-label">Section Label</div>
    <h2 class="s-title">Title with <i>Italic Accent</i></h2>
    <p class="s-text">Body text with <strong>bold emphasis</strong>.</p>
    <!-- Components go here -->
  </div>
  <div class="s-foot"><div class="s-pg">01 / 10</div></div>
</div>
```

### Slide Color Variants

| Class | Look |
|-------|------|
| `s--ink` | Dark navy/charcoal (default dark) |
| `s--cream` | Warm cream/paper (light) |
| `s--accent` | Golden amber gradient |
| `s--deep` | Deep navy blue gradient |
| `s--teal` | Dark teal/green gradient |
| `s--rose` | Dark rose/burgundy gradient |

### Stories Components

#### Stat Pair
```html
<div class="s-stats">
  <div class="s-stat"><div class="s-stat-label">Metric</div><div class="s-stat-val">42%</div></div>
  <div class="s-stat"><div class="s-stat-label">Metric</div><div class="s-stat-val">3.2x</div></div>
</div>
```

#### Bullet List
```html
<ul class="s-list">
  <li><strong>Bold lead</strong> with explanation</li>
  <li><strong>Another point</strong> with details</li>
</ul>
```

#### Timeline
```html
<div class="s-timeline">
  <div class="s-tl-item"><strong>2024</strong> &mdash; Description</div>
  <div class="s-tl-item"><strong>2025</strong> &mdash; Description</div>
</div>
```

#### Card/Callout
```html
<div class="s-card">
  <div class="s-card-label">Label</div>
  <div class="s-card-value">Content text here</div>
</div>
```

#### Code Block
```html
<div class="s-code">
  <div class="s-code-label">Python</div>
  <pre>def hello():
    return "world"</pre>
</div>
```

#### Pulse Dot (live indicator)
```html
<h2 class="s-title">Live <i>Now</i> <span class="pulse-dot"></span></h2>
```

### Stories Typography

- `<div class="s-label">` - Small uppercase label (mono font)
- `<h2 class="s-title">` - Large display title, use `<i>` for accent color
- `<p class="s-text">` - Body text, use `<strong>` for emphasis

### Stories Theme Customization

```css
:root {
  --ink: #080d14;           /* Dark background base */
  --accent: #d4a24a;        /* Primary accent (amber) */
  --accent-glow: #e8b44e;   /* Accent glow variant */
  --cream: #f0ece4;         /* Light text color */
  --teal: #3a7d7e;          /* Secondary accent */
  --rose: #c4616a;          /* Tertiary accent */
  --display: 'Palatino Linotype', Palatino, Georgia, serif;
  --body: 'Avenir Next', system-ui, sans-serif;
  --mono: 'SF Mono', Monaco, monospace;
}
```

---

## Design Tips

1. **Keynote format** - Best for conference talks, tech demos, business presentations
2. **Stories format** - Best for educational content, narratives, mobile sharing, social media
3. **Keep slides focused** - One main idea per slide
4. **Vary slide types** - Mix gradient-bg, dark-accent, quote-slide, etc. for visual rhythm
5. **Use stat cards** - Numbers are more impactful in large display
6. **Stories: vary backgrounds** - Alternate s--ink, s--cream, s--accent, s--deep for variety
7. **Stories: use `<i>` in titles** - Adds accent color italic for visual interest
8. **HTML on single lines** - Components must be on one line to avoid markdown parsing issues (keynote format)
9. **Test in browser** - Open HTML file directly, no server needed

## Setup Instructions

1. Copy the desired template (`index.html` or `stories-template.html`) to your project
2. Rename it to match your topic
3. Edit the content (markdown for keynote, HTML divs for stories)
4. Open in any browser - works offline!
