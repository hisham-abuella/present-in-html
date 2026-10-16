# Older formats: markdown Keynote, Stories, Course

Archived. These formats came before Keynote Pro and are no longer part of the skill: `plugins/present-in-html/skills/present-in-html/SKILL.md`
builds every deck with Keynote Pro (`keynote-pro/`). The files are kept here for reference only: `index.html` (markdown
keynote), `stories-template.html`, `demo-*.html`, `claude101.html`, `samples/` and `QUICK_REFERENCE.md`, all in this folder.
The Course reference path below is the owner's local machine only. The "Trigger", "Commands" and "Workflow" sections below
describe the old routing and no longer apply.

---

# HTML Presentation Skill

Create stunning, self-contained HTML presentations with zero dependencies. Three formats available: **Keynote** (16:9 widescreen), **Stories** (vertical mobile-first), and **Course** (Coursera-style LMS with sidebar, progress tracking, and interactive widgets). Each presentation gets a unique visual theme.

## Trigger

Activate when the user asks to:
- Create a presentation, slide deck, or slides
- Build a keynote, pitch deck, or talk
- Make a story-format or mobile presentation
- Create a course, lesson, or educational module
- Convert content into a presentation

## Commands

- `/html-presentation` — Interactive mode, ask user for topic and format
- `/html-presentation keynote "Title"` — Create a keynote-style presentation
- `/html-presentation story "Title"` — Create a stories-style presentation
- `/html-presentation course "Title"` — Create a Coursera-style course presentation
- `/html-presentation theme` — Show available themes and samples

## Three Presentation Modes

| Format | Best For | Template | Key Features |
|--------|----------|----------|--------------|
| **Keynote** | Conference talks, business decks, lectures | `index.html` | 16:9 widescreen, markdown-based, toolbar with drawing/annotation, dark/light toggle, PDF export |
| **Stories** | Educational content, mobile sharing, social | `stories-template.html` | Vertical mobile-first, gradient orbs, grain texture, swipe nav |
| **Course** | Courses, workshops, training modules | See reference: `genai101/lessons/m1-l1-slides.html` | Sidebar navigation, progress tracking, reveal.js slides, interactive JS widgets, animated SVG diagrams, card modals |

## Workflow

1. **Ask** the user for: topic, audience, desired tone, and format preference
2. **Pick a unique theme** — Never reuse the same design
3. **Copy the base template** or build from the Course reference
4. **Replace content** with the user's topic material
5. **Add interactive elements** where appropriate (widgets, animated diagrams, clickable cards)
6. **Test in browser** — just open the HTML file directly

---

## FORMAT 1: KEYNOTE (16:9 Widescreen)

**Base template:** `index.html`
**Best for:** Conference talks, tech demos, business presentations, lectures, workshops

### How It Works

Slides are written in **markdown** inside `<script id="slides-markdown" type="text/markdown">`. The built-in engine parses markdown and renders interactive slides with toolbar, keyboard navigation, dark/light theme toggle, drawing tools, and PDF export.

### Slide Syntax

Slides are separated by `---` on its own line. Add `class:` at the start of a slide for special layouts:

```markdown
class: center-content

# Welcome to My Talk
### A subtitle goes here

Speaker Name

<div class="contact-links"><a href="mailto:me@example.com" class="contact-link">Email</a></div>

---

## Regular Content Slide

- First bullet point
- Second bullet point

---
class: gradient-bg

## Gradient Background Slide

---
class: center-content

# Thank You!
### Questions?
```

### Slide Classes

| Class | Effect |
|-------|--------|
| `center-content` | Center everything vertically and horizontally |
| `section-slide` | Dark background section divider |
| `gradient-bg` | Purple gradient with white text |
| `gradient-warm` | Pink-red gradient |
| `gradient-cool` | Blue-cyan gradient with dark text |
| `gradient-dark` | Deep navy gradient |
| `gradient-sunset` | Pink-yellow gradient with dark text |
| `gradient-forest` | Green gradient with dark text |
| `dark-accent` | Dark navy with glowing accent orb |
| `quote-slide` | Large decorative quote mark, centered text |
| `split-slide` | Two-panel layout (use with split-left/split-right divs) |

### Text Elements

- `# H1` — Main title (title slides only)
- `## H2` — Slide titles
- `### H3` — Subtitles
- `- item` — Bullet lists
- `1. item` — Numbered lists
- `` `code` `` — Inline code rendered as keyboard-key style

### Code Blocks

````markdown
```python
def hello(name):
    return f"Hello, {name}!"
```
````

### Components

**CRITICAL:** All HTML components MUST be on a single line to avoid markdown parsing issues.

#### Feature Grid (2 columns)
```html
<div class="feature-grid"><div class="feature-card"><div class="feature-icon">🚀</div><div class="feature-content"><strong>Speed</strong><span>Lightning fast builds</span></div></div><div class="feature-card"><div class="feature-icon">🔒</div><div class="feature-content"><strong>Security</strong><span>Enterprise grade</span></div></div></div>
```

#### Stat Cards (number showcase)
```html
<div class="stat-grid"><div class="stat-card"><div class="stat-value">42%</div><div class="stat-label">Growth Rate</div></div><div class="stat-card"><div class="stat-value">3.2M</div><div class="stat-label">Users</div></div><div class="stat-card"><div class="stat-value">99.9%</div><div class="stat-label">Uptime</div></div></div>
```

#### Timeline
```html
<div class="timeline"><div class="timeline-item"><div class="tl-date">2024</div><div class="tl-title">Milestone One</div><div class="tl-desc">Description here</div></div><div class="timeline-item"><div class="tl-date">2025</div><div class="tl-title">Milestone Two</div><div class="tl-desc">Description here</div></div></div>
```

#### Icon Grid (3 columns)
```html
<div class="icon-grid"><div class="icon-card"><div class="icon-emoji">🚀</div><div class="icon-title">Speed</div><div class="icon-desc">Lightning fast</div></div><div class="icon-card"><div class="icon-emoji">🔒</div><div class="icon-title">Security</div><div class="icon-desc">Enterprise grade</div></div><div class="icon-card"><div class="icon-emoji">📊</div><div class="icon-title">Analytics</div><div class="icon-desc">Deep insights</div></div></div>
```

#### Pill Tags
```html
<div class="pill-tags"><span class="pill">Default</span><span class="pill pill-green">Success</span><span class="pill pill-red">Critical</span><span class="pill pill-yellow">Warning</span><span class="pill pill-purple">New</span></div>
```

#### Progress Steps
```html
<div class="progress-steps"><div class="step"><div class="step-dot">1</div><div class="step-label">Plan</div><div class="step-sublabel">Define scope</div></div><div class="step"><div class="step-dot">2</div><div class="step-label">Build</div><div class="step-sublabel">Write code</div></div><div class="step"><div class="step-dot">3</div><div class="step-label">Ship</div><div class="step-sublabel">Deploy</div></div></div>
```

#### Callout Box
```html
<div class="callout"><div class="callout-title">Important Note</div><div class="callout-text">Key information here.</div></div>
```
Variants: `callout-warn`, `callout-success`, `callout-error`

#### Quote (use with `class: quote-slide`)
```html
<blockquote>The best way to predict the future is to invent it.</blockquote>
<div class="quote-author">Alan Kay</div>
```

#### Split Layout (use with `class: split-slide`)
```html
<div class="split-left"><h2>Left Panel</h2><p>Description text</p></div><div class="split-right"><ul><li>Point one</li><li>Point two</li></ul></div>
```

#### Comparison Table
```html
<table class="comparison-table"><tr class="compare-row header"><td class="compare-cell">Feature</td><td class="compare-cell">Option A</td><td class="compare-cell highlight">Option B</td></tr><tr class="compare-row"><td class="compare-cell">Speed</td><td class="compare-cell">Fast</td><td class="compare-cell highlight">Faster</td></tr></table>
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| ← → | Navigate slides |
| O | Toggle outline sidebar |
| M | Marker/highlighter mode |
| D | Freehand drawing mode |
| C | Clear drawings |
| T | Toggle dark/light theme |
| F | Fullscreen |
| P | Export to PDF |
| Esc | Exit current mode |

---

## FORMAT 2: STORIES (Vertical Mobile-First)

**Base template:** `stories-template.html`
**Best for:** Educational content, narratives, mobile sharing, social media, quick updates

### How It Works

Slides are HTML `<div>` elements with class `s` plus a color variant. Each slide has floating gradient orbs, grain texture overlay, and staggered entrance animations. Navigation: tap/click left-right halves, arrow keys, or swipe on mobile.

### Slide Structure

```html
<div class="s s--ink">
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="s-top">
    <div class="s-brand"><div class="s-brand-dot"></div><div class="s-brand-name">Brand</div></div>
    <div class="s-tag">Topic</div>
  </div>
  <div class="s-body">
    <div class="s-label">SECTION LABEL</div>
    <h2 class="s-title">Title with <i>Accent Word</i></h2>
    <p class="s-text">Body text with <strong>bold emphasis</strong>.</p>
  </div>
  <div class="s-foot"><div class="s-pg">01 / 10</div></div>
</div>
```

### Color Variants

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
  <div class="s-stat"><div class="s-stat-label">Growth</div><div class="s-stat-val">3.2x</div></div>
</div>
```

#### Bullet List
```html
<ul class="s-list">
  <li><strong>Key point</strong> with explanation</li>
  <li><strong>Another point</strong> with details</li>
</ul>
```

#### Timeline / Card / Code Block / Pulse Dot
```html
<div class="s-timeline">
  <div class="s-tl-item"><strong>2024</strong> &mdash; Description</div>
</div>

<div class="s-card">
  <div class="s-card-label">Label</div>
  <div class="s-card-value">Content</div>
</div>

<div class="s-code">
  <div class="s-code-label">Python</div>
  <pre>def hello(): return "world"</pre>
</div>

<h2 class="s-title">Live <i>Now</i> <span class="pulse-dot"></span></h2>
```

---

## FORMAT 3: COURSE (Coursera-Style LMS)

**Reference implementation:** `/Users/hishamabuella/Work/Wireless_101/courses/genai101/lessons/m1-l1-slides.html`
**Best for:** Online courses, training modules, workshops, educational content with interactivity

### Architecture

The Course format is a full LMS-like layout:
- **Sidebar** — Module/lesson navigation with progress tracking, collapsible sections
- **Topbar** — Current module/lesson title, progress bar, dark/light toggle
- **Reveal.js slides** — The main content area, customized to match the LMS design
- **Bottom navigation** — Previous/Next buttons
- **Interactive JavaScript widgets** embedded directly in slides

### Layout Structure

```html
<body>
  <!-- Sidebar Navigation -->
  <div class="sidebar">
    <div class="sidebar-header">...</div>
    <div class="sidebar-progress">
      <div class="progress-track"><div class="progress-fill" style="width:10%"></div></div>
    </div>
    <div class="sidebar-modules">
      <div class="module-group open">
        <div class="module-header">
          <div><div class="module-name">Module 1: Title</div><div class="module-count">5 lessons</div></div>
        </div>
        <div class="module-lessons">
          <div class="lesson-item active"><div class="lesson-circle"></div><div class="lesson-text">Lesson 1</div></div>
          <div class="lesson-item"><div class="lesson-circle"></div><div class="lesson-text">Lesson 2</div></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="main">
    <div class="topbar">...</div>
    <div class="reveal-wrap">
      <div class="reveal"><div class="slides">
        <section>...</section>
        <section>...</section>
      </div></div>
    </div>
    <div class="bottom-nav">
      <button class="nav-btn nav-prev">← Previous</button>
      <button class="nav-btn nav-next">Next →</button>
    </div>
  </div>
</body>
```

### CSS Variables (Course Theme)

```css
:root {
  --accent: #06b6d4;
  --accent-dark: #0891b2;
  --accent-light: #cffafe;
  --sidebar-bg: #111827;
  --bg: #ffffff;
  --slide-bg: #ffffff;
  --text: #1f2937;
  --text-sec: #6b7280;
  --card-bg: #ffffff;
  --card-border: #e5e7eb;
  --display: 'Fraunces', Georgia, serif;
  --body: 'DM Sans', system-ui, sans-serif;
  --mono: 'JetBrains Mono', monospace;
}

html.dark {
  --bg: #111827;
  --slide-bg: #1a2233;
  --text: #e5e7eb;
  --card-bg: #1f2937;
}
```

### Course Slide Types

Each `<section>` is a reveal.js slide:

```html
<!-- Title slide -->
<section class="title-slide" data-title="Introduction">
  <div class="slide-accent-bar"></div>
  <h1>Module Title</h1>
  <p class="subtitle">Module description text</p>
</section>

<!-- Content slide -->
<section data-title="Topic Name" data-lesson="1">
  <h2 class="anim">Slide Title</h2>
  <p>Body text with <strong>bold</strong> and <em>accent italic</em>.</p>
  <!-- Components go here -->
</section>
```

### Course Components

#### Card Grid (2 columns, with hover effects)
```html
<div class="card-grid">
  <div class="card anim-scale d1">
    <div class="card-icon">🧠</div>
    <div class="card-title">Card Title</div>
    <div class="card-desc">Description text</div>
  </div>
  <div class="card anim-scale d2">
    <div class="card-icon">⚡</div>
    <div class="card-title">Card Title</div>
    <div class="card-desc">Description text</div>
  </div>
</div>
```

#### Stat Grid (3 columns, top-bordered)
```html
<div class="stat-grid">
  <div class="stat-card anim-scale d1">
    <div class="stat-val">175B</div>
    <div class="stat-label">Parameters</div>
  </div>
</div>
```

#### Timeline (vertical, card-based with animated dots)
```html
<div class="timeline">
  <div class="tl-item anim-slide d1">
    <div class="tl-icon">📜</div>
    <div class="tl-content">
      <div class="tl-date">1950</div>
      <div class="tl-title">Alan Turing</div>
      <div class="tl-desc">"Can machines think?"</div>
    </div>
  </div>
</div>
```

#### Comparison Table
```html
<div class="cmp-table">
  <div class="cmp-row header">
    <div class="cmp-cell">Feature</div>
    <div class="cmp-cell">Option A</div>
    <div class="cmp-cell">Option B</div>
  </div>
  <div class="cmp-row">
    <div class="cmp-cell">Speed</div>
    <div class="cmp-cell">Slow</div>
    <div class="cmp-cell accent">Fast</div>
  </div>
</div>
```

#### Callout
```html
<div class="callout anim d3">
  <strong>Key insight:</strong> Important information here.
</div>
```

#### Pill Tags
```html
<div class="pills anim d3">
  <span class="pill">Python</span>
  <span class="pill">TensorFlow</span>
</div>
```

#### Equation Block (with KaTeX)
```html
<div class="eq-block anim d2">
  <div class="eq-label">The Attention Formula</div>
  <div id="eq-attn"></div>
</div>
<script>
  katex.render("\\text{Attention}(Q,K,V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V", document.getElementById('eq-attn'), {displayMode: true});
</script>
```

#### Icon Grid (3 columns)
```html
<div class="icon-grid">
  <div class="icon-card anim-scale d1">
    <div class="ic-emoji">📊</div>
    <div class="ic-title">Big Data</div>
    <div class="ic-desc">Massive datasets</div>
  </div>
</div>
```

### Staggered Animations

The course format uses CSS animation classes that trigger when slides become visible:

| Class | Effect | Use For |
|-------|--------|---------|
| `anim` | Fade up (translateY) | Text, paragraphs, general elements |
| `anim-scale` | Scale in (bouncy) | Cards, stat cards, icon cards |
| `anim-slide` | Slide in from left | Timeline items |
| `d1` through `d8` | Stagger delay (0.08s increments) | Apply to children for sequential reveal |

```html
<h2 class="anim">Title</h2>
<p class="anim d1">First paragraph</p>
<div class="card-grid anim d2">...</div>
```

---

### INTERACTIVE JAVASCRIPT WIDGETS

The Course format's most powerful feature is embedded interactive JS widgets. These make slides educational and engaging.

#### Widget Container Pattern
```html
<div class="widget">
  <div class="widget-title">Interactive Demo</div>
  <!-- Widget content -->
  <button class="widget-btn">Action</button>
</div>
```

#### 1. Perceptron Simulator
Interactive SVG-based neuron where users:
- **Click inputs** to toggle 0/1
- **Adjust weights** with +/- buttons
- **Change bias** value
- **See real-time computation** with live math formula
- **Preset gates**: AND, OR, Custom

Key elements: clickable SVG circles (`.node-input`), weight controls, summation node (Σ), step activation function, output node that pulses when fired. Live math display shows the full equation.

#### 2. Classification Canvas
Two-panel interactive widget:
- **Supervised panel**: Users click to place colored dots (Class A / Class B), then hit "Classify" to see a decision boundary drawn
- **Unsupervised panel**: "Scatter Points" generates random points, "Find Clusters" runs k-means clustering with animated colorization

Uses HTML Canvas with device pixel ratio handling for crisp rendering.

#### 3. Transformer vs RNN Race
Side-by-side comparison showing:
- **RNN lane**: Words light up sequentially (one at a time) with arrows between them
- **Transformer lane**: All words light up simultaneously after a brief pause
- **Progress bars** and **timing display** for each
- Shows a final "X× faster" speedup result

Users press "Race!" to see the animation. Visually demonstrates parallel vs sequential processing.

#### 4. Animated SVG Diagrams

##### Neural Network Diagram
SVG with animated connections, staggered node reveals, and pulse animations traveling along connection paths:
```html
<svg class="nn-diagram" viewBox="0 0 480 260">
  <!-- Layer labels, connection lines (.nn-conn), nodes (.nn-node), pulses (.nn-pulse) -->
  <!-- Pulses use <animateMotion> with <mpath> for traveling dots -->
</svg>
```
Classes: `.nn-conn.c1`–`.c6` for staggered connections, `.nn-node.n-in/.n-hid/.n-out` for layer-specific delays.

##### Attention Mechanism Diagram
SVG showing words as rectangles with attention lines of varying thickness:
- Words fade in sequentially (`.attn-word.w0`–`.w9`)
- Highlighted target word gets glow effect
- Attention lines appear with varying opacity: `.attn-line.strong`, `.medium`, `.weak`

##### ML Flow Diagram
Two-row SVG comparing traditional programming (rules + data → output) vs ML (data + output → model):
- Boxes and arrows fade in with staggered delays
- ML row has accent glow animation on the model box

#### 5. Clickable Card Modals
Cards that expand into detailed modal popups when clicked:
```html
<!-- Card with data-modal attribute -->
<div class="card clickable" data-modal="topic-key">
  <div class="card-icon">🧠</div>
  <div class="card-title">Deep Learning</div>
  <div class="card-desc">Click to learn more</div>
</div>

<!-- Modal overlay (once, at end of body) -->
<div class="modal-overlay" id="cardModal">
  <div class="modal-content">
    <button class="modal-close" id="modalClose">×</button>
    <div class="modal-icon" id="modalIcon"></div>
    <h2 class="modal-title" id="modalTitle"></h2>
    <div class="modal-body" id="modalBody"></div>
  </div>
</div>

<!-- JS data object -->
<script>
var modalData = {
  'topic-key': {
    icon: '🧠',
    title: 'Deep Learning',
    body: '<p>Rich HTML content with <strong>formatting</strong>...</p>' +
      '<div class="modal-example"><div class="modal-example-label">Example</div>Detailed example here.</div>' +
      '<ul><li>Point one</li><li>Point two</li></ul>'
  }
};
</script>
```

### Course Design Polish

The reference implementation includes these premium design touches:
- **Dot-grid background** on slides via `radial-gradient` pattern
- **Gradient mesh backgrounds** on title slides
- **Gradient text** for title slide h1 (`background-clip: text`)
- **Glassmorphic widgets** (`backdrop-filter: blur()`)
- **Left-border gradient** on cards
- **Shimmer animation** on progress bars
- **Dark mode support** via `html.dark` class toggle

---

## THEME CREATION GUIDE

Every presentation MUST have a unique visual identity.

### How to Theme

Add a CSS override block **before** `</style>`:

```css
/* === YOUR THEME NAME === */
:root {
    --title-font: 'Your Display Font', fallback, serif;
    --body-font: 'Your Body Font', fallback, sans-serif;
    --accent-color: #yourcolor;
    --bg-color: #yourbg;
    --text-primary: #yourtext;
}
```

### Sample Themes for Inspiration

| Theme | Fonts | Colors | Signature Effects |
|-------|-------|--------|-------------------|
| **Hacker Terminal** | Courier New mono | Green #22c55e on black | CRT scanlines, blinking cursor, terminal cards |
| **Luxury Editorial** | Didot/Bodoni serif | Gold #b8860b on cream | Em-dash bullets, gold underlines, zero radius |
| **Apple Cinematic** | SF Pro Display | White on pure black | Spotlight gradient, massive type, glass tiles |
| **Glass Futurism** | Futura/Century Gothic | Purple #a855f7 on deep space | Iridescent mesh, frosted glass, neon glow |
| **Chalkboard Academic** | Charter serif | Chalk #f5e6c8 on green | Dashed borders, chalk dust texture |
| **Swiss Dashboard** | Helvetica Neue | Blue #0066ff on white | Red square bullets, left-border stats |
| **Neural Luxe** (Course) | Fraunces + DM Sans | Cyan #06b6d4, glassmorphic | Dot-grid backgrounds, gradient cards, shimmer bars |

---

## DESIGN RULES

1. **One idea per slide** — Keep content focused and scannable
2. **Vary slide types** — Mix gradients, quotes, splits, widgets for visual rhythm
3. **Use interactive elements** (Course format) — Widgets are more engaging than static content
4. **Animate with purpose** — Use `anim`, `anim-scale`, `anim-slide` classes for staggered reveals
5. **Cards can be clickable** — Use `data-modal` + `clickable` class for expandable detail cards
6. **Keynote: HTML on single lines** — Components MUST be on one line for markdown parsing
7. **No external deps** (Keynote/Stories) — Self-contained. Course format may use reveal.js CDN + KaTeX
8. **Test in browser** — Just open the file directly
9. **Unique themes always** — Every presentation gets its own visual identity
10. **Preserve 16:9 ratio** — Keynote format slide frame is fixed

---

## FILE STRUCTURE

```
project/
├── .claude-plugin/
│   ├── plugin.json              ← Plugin manifest
│   └── marketplace.json         ← Marketplace config
├── skills/
│   └── html-presentation/
│       └── SKILL.md             ← This skill file
├── .claude/skills/
│   └── html-presentation.md     ← Local skill copy
├── index.html                   ← Keynote base template
├── stories-template.html        ← Stories base template
├── demo-keynote.html            ← Keynote demo
├── claude101.html               ← Example presentation
├── samples/                     ← Theme reference samples
│   ├── tech-talk.html
│   ├── sales-pitch.html
│   ├── product-launch.html
│   ├── conference-keynote.html
│   ├── course-materials.html
│   ├── team-update.html
│   ├── workshop-guide.html
│   └── internal-training.html
├── install-skill.sh             ← Installer script
├── QUICK_REFERENCE.md           ← Quick syntax reference
└── README.md
```

**Course format reference:** `genai101/lessons/m1-l1-slides.html` — Full working example with sidebar, reveal.js, interactive perceptron, classification canvas, transformer race widget, animated SVG diagrams, and clickable card modals.

## INSTALLATION

### Option 1: Plugin (recommended)
```
/plugin marketplace add owner/keynote_html_claude_skill
/plugin install html-presentation@html-presentation-marketplace
```

### Option 2: Global skill copy
```bash
cp skills/html-presentation/SKILL.md ~/.claude/skills/html-presentation.md
```

### Option 3: Interactive installer
```bash
./install-skill.sh
```
