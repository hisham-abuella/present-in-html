# Presentation Skill Quick Reference

## Slide Syntax Cheat Sheet

### Basic Slide
```html
<section>
  <h2>Title</h2>
  <p>Content</p>
</section>
```

### Fragments (Progressive Reveal)
```html
<li class="fragment">Appears on click</li>
<li class="fragment fade-up">Slides up</li>
<li class="fragment highlight-blue">Highlights blue</li>
```

### Vertical Slides
```html
<section>
  <section>Slide 1 (down arrow shows more)</section>
  <section>Slide 2</section>
</section>
```

### Code Block
```html
<pre><code class="language-python" data-trim data-line-numbers="1|3-4">
def hello():
    print("Hello!")
</code></pre>
```

### Two Columns
```html
<div class="two-column">
  <div>Left column</div>
  <div>Right column</div>
</div>
```

### Backgrounds
```html
<section data-background="#ff5722">                    <!-- Color -->
<section data-background-gradient="linear-gradient(...)"> <!-- Gradient -->
<section data-background="img.jpg" data-background-opacity="0.5"> <!-- Image -->
```

### Speaker Notes
```html
<aside class="notes">Only visible to presenter (press S)</aside>
```

### Transitions
```html
<section data-transition="zoom">
<section data-transition="fade-in slide-out">
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` / `→` | Next slide |
| `Shift+Space` / `←` | Previous slide |
| `↓` | Next vertical slide |
| `↑` | Previous vertical slide |
| `S` | Speaker view |
| `Esc` | Overview |
| `F` | Fullscreen |
| `B` / `.` | Blackout |
| `?` | Help |

---

## Themes

**Dark:** black, night, league, blood, moon, dracula
**Light:** white, simple, beige, sky, serif, solarized

Change in HTML:
```html
<link rel="stylesheet" href="reveal.js/dist/theme/THEME_NAME.css">
```

---

## Fragment Styles

| Style | Effect |
|-------|--------|
| `fragment` | Fade in |
| `fragment fade-up` | Slide up |
| `fragment fade-down` | Slide down |
| `fragment fade-left` | Slide left |
| `fragment fade-right` | Slide right |
| `fragment grow` | Grow |
| `fragment shrink` | Shrink |
| `fragment zoom-in` | Zoom in |
| `fragment fade-out` | Fade out |
| `fragment highlight-red` | Red highlight |
| `fragment highlight-blue` | Blue highlight |
| `fragment highlight-green` | Green highlight |
| `fragment strike` | Strikethrough |

---

## Supported Code Languages

JavaScript, Python, TypeScript, HTML, CSS, Java, Go, Rust, Ruby, PHP, C, C++, C#, Kotlin, Swift, SQL, Bash, YAML, JSON, Markdown, and many more.

```html
<code class="language-python">
<code class="language-javascript">
<code class="language-yaml">
```

---

## Configuration

```javascript
Reveal.initialize({
  transition: 'slide',     // none/fade/slide/convex/concave/zoom
  transitionSpeed: 'default', // default/fast/slow
  slideNumber: 'c/t',      // current/total
  hash: true,              // URL hash navigation
  center: false,           // vertical centering
});
```
