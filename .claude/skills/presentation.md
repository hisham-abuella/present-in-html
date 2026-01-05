# Presentation Skill

Create professional HTML presentations using reveal.js. This skill enables Claude to create beautiful, interactive slide decks with animations, transitions, code highlighting, and more.

## Usage

Invoke this skill with: `/presentation`

## Quick Commands

- `/presentation create "Title"` - Create a new presentation with a title
- `/presentation add slide` - Add a new slide to the presentation
- `/presentation add section` - Add a vertical slide section
- `/presentation set theme <theme>` - Change the presentation theme
- `/presentation preview` - Instructions to preview the presentation

## Creating a New Presentation

When asked to create a presentation, follow these steps:

1. **Determine the presentation topic and structure** from the user's request
2. **Choose an appropriate theme** (default: black)
3. **Create the HTML file** using the base template structure
4. **Copy reveal.js assets** to the presentation directory

### Base Template Structure

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PRESENTATION_TITLE</title>
    <link rel="stylesheet" href="reveal.js/dist/reset.css">
    <link rel="stylesheet" href="reveal.js/dist/reveal.css">
    <link rel="stylesheet" href="reveal.js/dist/theme/THEME_NAME.css">
    <link rel="stylesheet" href="reveal.js/plugin/highlight/monokai.css">
    <style>
      /* Custom styles */
      .reveal .slides section {
        text-align: left;
      }
      .reveal h1, .reveal h2 {
        text-align: center;
      }
      .reveal .title-slide {
        text-align: center;
      }
      .reveal .two-column {
        display: flex;
        gap: 2rem;
      }
      .reveal .two-column > div {
        flex: 1;
      }
      .reveal .highlight-box {
        background: rgba(255,255,255,0.1);
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 1rem 0;
      }
      .reveal blockquote {
        width: 90%;
        padding: 1rem;
        background: rgba(255,255,255,0.05);
        border-left: 4px solid #42affa;
      }
    </style>
  </head>
  <body>
    <div class="reveal">
      <div class="slides">
        <!-- SLIDES GO HERE -->
      </div>
    </div>
    <script src="reveal.js/dist/reveal.js"></script>
    <script src="reveal.js/plugin/notes/notes.js"></script>
    <script src="reveal.js/plugin/markdown/markdown.js"></script>
    <script src="reveal.js/plugin/highlight/highlight.js"></script>
    <script src="reveal.js/plugin/zoom/zoom.js"></script>
    <script>
      Reveal.initialize({
        hash: true,
        progress: true,
        center: false,
        transition: 'slide',
        plugins: [ RevealMarkdown, RevealHighlight, RevealNotes, RevealZoom ]
      });
    </script>
  </body>
</html>
```

## Slide Types and Components

### Title Slide
```html
<section class="title-slide">
  <h1>Presentation Title</h1>
  <h3>Subtitle or Tagline</h3>
  <p>Author Name • Date</p>
</section>
```

### Basic Content Slide
```html
<section>
  <h2>Slide Title</h2>
  <p>Content paragraph with explanatory text.</p>
</section>
```

### Bullet Points with Fragments (Progressive Reveal)
```html
<section>
  <h2>Key Points</h2>
  <ul>
    <li class="fragment">First point appears on click</li>
    <li class="fragment">Second point follows</li>
    <li class="fragment">Third point concludes</li>
  </ul>
</section>
```

### Numbered List
```html
<section>
  <h2>Step-by-Step Process</h2>
  <ol>
    <li class="fragment">First step</li>
    <li class="fragment">Second step</li>
    <li class="fragment">Third step</li>
  </ol>
</section>
```

### Two-Column Layout
```html
<section>
  <h2>Comparison</h2>
  <div class="two-column">
    <div>
      <h3>Option A</h3>
      <ul>
        <li>Feature 1</li>
        <li>Feature 2</li>
      </ul>
    </div>
    <div>
      <h3>Option B</h3>
      <ul>
        <li>Feature 1</li>
        <li>Feature 2</li>
      </ul>
    </div>
  </div>
</section>
```

### Code Block with Syntax Highlighting
```html
<section>
  <h2>Code Example</h2>
  <pre><code class="language-javascript" data-trim data-line-numbers>
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
  </code></pre>
</section>
```

### Code with Line Highlighting
```html
<section>
  <h2>Code with Highlights</h2>
  <pre><code class="language-python" data-trim data-line-numbers="1-2|4-5|7">
# Define a function
def calculate(x, y):

    # Perform calculation
    result = x + y

    return result
  </code></pre>
</section>
```

### Image Slide
```html
<section>
  <h2>Visual Diagram</h2>
  <img src="assets/diagram.png" alt="Description" style="max-height: 500px;">
</section>
```

### Image with Caption
```html
<section>
  <h2>Architecture Overview</h2>
  <figure>
    <img src="assets/architecture.png" alt="System architecture" style="max-height: 450px;">
    <figcaption style="font-size: 0.7em; color: #888;">Figure 1: System Architecture</figcaption>
  </figure>
</section>
```

### Quote/Blockquote Slide
```html
<section>
  <h2>Inspiration</h2>
  <blockquote>
    "The best way to predict the future is to invent it."
    <footer style="margin-top: 1rem; font-size: 0.8em;">— Alan Kay</footer>
  </blockquote>
</section>
```

### Vertical Slides (Section with Sub-slides)
```html
<section>
  <section>
    <h2>Main Topic</h2>
    <p>Introduction to this section</p>
    <p style="font-size: 0.7em; color: #888;">↓ Press down for details</p>
  </section>
  <section>
    <h2>Detail 1</h2>
    <p>Expanded information</p>
  </section>
  <section>
    <h2>Detail 2</h2>
    <p>More details</p>
  </section>
</section>
```

### Slide with Speaker Notes
```html
<section>
  <h2>Important Point</h2>
  <p>Key information for the audience</p>

  <aside class="notes">
    Speaker notes: Remember to:
    - Emphasize the importance of this topic
    - Provide real-world example
    - Ask if there are questions
  </aside>
</section>
```

### Slide with Background Color
```html
<section data-background="#2d3436">
  <h2>Dark Background</h2>
  <p>Content stands out on colored background</p>
</section>
```

### Slide with Gradient Background
```html
<section data-background-gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
  <h2>Gradient Background</h2>
  <p>Modern, eye-catching design</p>
</section>
```

### Slide with Image Background
```html
<section data-background="assets/background.jpg" data-background-opacity="0.3">
  <h2>Image Background</h2>
  <p>Text over subtle background image</p>
</section>
```

### Highlight Box / Callout
```html
<section>
  <h2>Key Takeaway</h2>
  <div class="highlight-box">
    <strong>Important:</strong> This is the critical point to remember.
  </div>
</section>
```

### Table Slide
```html
<section>
  <h2>Data Comparison</h2>
  <table style="font-size: 0.8em;">
    <thead>
      <tr>
        <th>Feature</th>
        <th>Option A</th>
        <th>Option B</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Performance</td>
        <td>High</td>
        <td>Medium</td>
      </tr>
      <tr>
        <td>Cost</td>
        <td>$$$</td>
        <td>$$</td>
      </tr>
    </tbody>
  </table>
</section>
```

### Thank You / Closing Slide
```html
<section class="title-slide">
  <h1>Thank You!</h1>
  <h3>Questions?</h3>
  <p style="margin-top: 2rem;">
    Contact: email@example.com<br>
    Website: example.com
  </p>
</section>
```

## Fragment Animation Styles

Use these classes for different reveal animations:

| Class | Effect |
|-------|--------|
| `fragment` | Fade in |
| `fragment fade-up` | Fade in from bottom |
| `fragment fade-down` | Fade in from top |
| `fragment fade-left` | Fade in from right |
| `fragment fade-right` | Fade in from left |
| `fragment grow` | Grow effect |
| `fragment shrink` | Shrink effect |
| `fragment zoom-in` | Zoom in |
| `fragment fade-out` | Fade out |
| `fragment highlight-red` | Highlight in red |
| `fragment highlight-blue` | Highlight in blue |
| `fragment highlight-green` | Highlight in green |
| `fragment strike` | Strikethrough |

### Custom Fragment Order
```html
<p class="fragment" data-fragment-index="2">Appears second</p>
<p class="fragment" data-fragment-index="1">Appears first</p>
```

## Available Themes

| Theme | Description |
|-------|-------------|
| `black` | Dark background, white text (default) |
| `white` | Light background, dark text |
| `league` | Dark blue/gray |
| `sky` | Light blue |
| `beige` | Light beige |
| `simple` | Minimal white |
| `serif` | Serif typography |
| `blood` | Dark red |
| `night` | Very dark with blue accents |
| `moon` | Dark with blue/purple |
| `solarized` | Solarized color scheme |
| `dracula` | Dracula dark theme |

## Transition Effects

Configure transitions in the Reveal.initialize() call:

```javascript
Reveal.initialize({
  transition: 'slide', // none, fade, slide, convex, concave, zoom
  transitionSpeed: 'default' // default, fast, slow
});
```

Per-slide transition:
```html
<section data-transition="zoom">
  <h2>This slide zooms in</h2>
</section>

<section data-transition="fade-in slide-out">
  <h2>Fade in, slide out</h2>
</section>
```

## Auto-Animate

Automatically animate elements between consecutive slides:

```html
<section data-auto-animate>
  <h2 data-id="title">Title</h2>
  <p data-id="text">Initial state</p>
</section>
<section data-auto-animate>
  <h2 data-id="title" style="color: #42affa;">Title</h2>
  <p data-id="text" style="font-size: 2em;">Animated state</p>
</section>
```

## Setup Instructions

When creating a presentation, provide these instructions to the user:

1. **Copy reveal.js library:**
   ```bash
   cp -r /path/to/reveal.js ./presentation-name/reveal.js
   ```

2. **Open the presentation:**
   - Simply open the HTML file in a web browser
   - Or use a local server: `python -m http.server 8000`

3. **Keyboard shortcuts:**
   - **Space/Arrow keys**: Navigate slides
   - **S**: Open speaker view
   - **Esc**: Overview mode
   - **F**: Fullscreen
   - **B**: Blackout/pause
   - **?**: Help

## Best Practices

1. **Keep slides focused** - One main idea per slide
2. **Use fragments sparingly** - Don't overuse progressive reveals
3. **Choose readable fonts** - Themes are optimized for readability
4. **Test on target display** - Check how it looks on the presentation screen
5. **Add speaker notes** - Help yourself during the presentation
6. **Use vertical slides** - For deep dives into subtopics
7. **Include a closing slide** - Always end with next steps or Q&A

## Example: Creating a Tech Talk

When asked to "Create a presentation about Python best practices", generate:

1. Title slide with topic and speaker info
2. Agenda/overview slide
3. Content slides for each topic with code examples
4. Summary/key takeaways slide
5. Thank you / Q&A slide

Include appropriate:
- Code blocks with syntax highlighting
- Fragment animations for bullet points
- Speaker notes with talking points
- Consistent theme throughout
