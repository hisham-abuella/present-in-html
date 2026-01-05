# Presentation Skill for Claude Code

A Claude Code skill that creates professional HTML presentations using [reveal.js](https://revealjs.com/). Create beautiful, interactive slide decks with animations, transitions, code highlighting, speaker notes, and more.

## Features

- Multiple presentation templates (base, tech talk, business pitch, minimal)
- All reveal.js features: fragments, transitions, backgrounds, auto-animate
- Syntax-highlighted code blocks with line highlighting
- Speaker notes and presenter view
- 14 built-in themes
- Vertical slides for deep-dive sections
- Two-column and multi-column layouts
- Custom styling options

## Installation

### 1. Install the Skill

Copy the `.claude` directory to your project or home directory:

```bash
# For project-specific installation
cp -r .claude /path/to/your/project/

# For global installation
cp -r .claude ~/
```

### 2. Set Up reveal.js

The skill requires reveal.js to render presentations. You have two options:

**Option A: Copy reveal.js to your presentation directory (recommended)**

```bash
# Clone reveal.js somewhere accessible
git clone https://github.com/hakimel/reveal.js.git ~/Tools/reveal.js

# When creating a presentation, copy it:
cp -r ~/Tools/reveal.js ./my-presentation/reveal.js
```

**Option B: Use a symlink**

```bash
ln -s /path/to/reveal.js ./my-presentation/reveal.js
```

## Usage

### Quick Start

Ask Claude to create a presentation:

```
Create a presentation about "Introduction to Machine Learning"
```

Or use the skill command:

```
/presentation create "Introduction to Machine Learning"
```

### Available Commands

| Command | Description |
|---------|-------------|
| `/presentation create "Title"` | Create a new presentation |
| `/presentation add slide` | Add a new slide |
| `/presentation add section` | Add vertical slides section |
| `/presentation set theme <name>` | Change theme |

### Available Templates

1. **base-template.html** - General purpose with common slide types
2. **tech-talk-template.html** - Technical presentations with code focus
3. **business-pitch-template.html** - Investor/business presentations
4. **minimal-template.html** - Simple, clean starting point

## Themes

Choose from 14 built-in themes:

| Dark Themes | Light Themes | Special |
|-------------|--------------|---------|
| black (default) | white | dracula |
| night | simple | solarized |
| league | beige | |
| blood | sky | |
| moon | serif | |

## Slide Types

### Title Slide
```html
<section class="title-slide">
  <h1>Presentation Title</h1>
  <h3>Subtitle</h3>
</section>
```

### Content with Fragments
```html
<section>
  <h2>Key Points</h2>
  <ul>
    <li class="fragment">Point 1</li>
    <li class="fragment">Point 2</li>
  </ul>
</section>
```

### Code Block
```html
<section>
  <h2>Code Example</h2>
  <pre><code class="language-python" data-trim data-line-numbers="1-2|4-5">
def hello():
    print("Hello!")

if __name__ == "__main__":
    hello()
  </code></pre>
</section>
```

### Two-Column Layout
```html
<section>
  <h2>Comparison</h2>
  <div class="two-column">
    <div><h3>Left</h3></div>
    <div><h3>Right</h3></div>
  </div>
</section>
```

### Vertical Slides
```html
<section>
  <section><h2>Overview</h2></section>
  <section><h2>Detail 1</h2></section>
  <section><h2>Detail 2</h2></section>
</section>
```

### Speaker Notes
```html
<section>
  <h2>Topic</h2>
  <aside class="notes">
    Notes only visible in speaker view (press S)
  </aside>
</section>
```

### Custom Backgrounds
```html
<!-- Color -->
<section data-background="#2d3436">

<!-- Gradient -->
<section data-background-gradient="linear-gradient(135deg, #667eea, #764ba2)">

<!-- Image -->
<section data-background="image.jpg" data-background-opacity="0.3">
```

## Fragment Animations

| Class | Effect |
|-------|--------|
| `fragment` | Fade in |
| `fragment fade-up` | Slide up |
| `fragment grow` | Grow |
| `fragment highlight-red` | Highlight red |
| `fragment strike` | Strikethrough |

## Viewing Presentations

1. **Direct browser**: Open the HTML file in Chrome/Firefox/Safari
2. **Local server**:
   ```bash
   cd my-presentation
   python -m http.server 8000
   # Open http://localhost:8000
   ```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Space / Arrows | Navigate |
| S | Speaker view |
| Esc | Overview mode |
| F | Fullscreen |
| B | Blackout |
| ? | Help |

## Project Structure

```
keynote_html_claude_skill/
├── .claude/
│   └── skills/
│       └── presentation.md    # Skill definition
├── templates/
│   ├── base-template.html     # General template
│   ├── tech-talk-template.html
│   ├── business-pitch-template.html
│   └── minimal-template.html
├── examples/
│   └── intro-to-python.html   # Example presentation
├── assets/                    # Images, logos, etc.
└── README.md
```

## Configuration Options

Customize in `Reveal.initialize()`:

```javascript
Reveal.initialize({
  // Size
  width: 1280,
  height: 720,

  // UI
  controls: true,
  progress: true,
  slideNumber: 'c/t',

  // Transitions
  transition: 'slide',  // none, fade, slide, convex, concave, zoom
  transitionSpeed: 'default',

  // Plugins
  plugins: [ RevealMarkdown, RevealHighlight, RevealNotes, RevealZoom ]
});
```

## Creating Custom Themes

1. Copy an existing theme from `reveal.js/css/theme/source/`
2. Modify the SCSS variables:
   ```scss
   $backgroundColor: #1a1a2e;
   $mainColor: #eee;
   $headingColor: #fff;
   $linkColor: #42affa;
   ```
3. Compile with `npm run build` in reveal.js

## Tips for Great Presentations

1. **One idea per slide** - Keep content focused
2. **Use fragments sparingly** - Don't overdo animations
3. **Include speaker notes** - Help yourself during delivery
4. **Test on target display** - Check resolution and colors
5. **Use vertical slides** - For deep dives into subtopics
6. **Highlight code** - Use `data-line-numbers` for emphasis
7. **Practice navigation** - Know your keyboard shortcuts

## License

MIT License - see LICENSE file

## Credits

- [reveal.js](https://revealjs.com/) - The HTML Presentation Framework
- [Highlight.js](https://highlightjs.org/) - Syntax highlighting
