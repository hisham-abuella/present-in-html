# Keynote Pro

A one-file HTML presentation format that looks like a well-made Keynote or PowerPoint deck.
No framework, no build step, no dependencies; it opens from `file://`. You write plain HTML
slides, pick a layout per slide, and the engine gives you a fixed 16:9 stage, themes, builds,
Magic Move, a link to every slide, overview, presenter view, marker, print to PDF, a checker and a text editor.

```
keynote-pro/
  template.html        copy this; replace the slides between SLIDES:START and SLIDES:END
  examples/            product-launch, quarterly-review, tech-talk, genai-101, how-it-works, beyond-slides (live demos:
                       app UI, calculator, simulation, sound, live code, game, embedded page, video, camera),
                       every-layout (all 28 layouts once, with locally generated photos; the slide-type reference),
                       how-it-works-ar and beyond-slides-ar (whole decks in Egyptian Arabic, right to left)
  examples/src/        slide sources for the examples (build-examples.mjs assembles them)
  library/             LOOK LIBRARY: one sample deck per profession and index.html (gallery with filters); library/src holds their sources
  library/themes/      every non-core theme, one file each (library/themes/src = sources with macros); added to a deck by tools/add-look.mjs
  library/fonts/       every non-core font pairing, one file each; library/looks.json indexes themes and pairings
  editor.html          small text edits to any deck: click text, type, edit notes, find and replace, Save writes the file back
  check.mjs            node + Playwright checker (overflow, text size, contrast, console errors) and --outline
  build-examples.mjs   regenerates examples/*.html and fonts.html from template.html
  fonts.html           font-pairing and theme specimen library (type your own headline to preview)
  assets/              illustrative images made locally (see Images)
  tools/gen-images.sh  local image generation with Draw Things (no cloud)
  tools/               add-look.mjs (copy library looks into a deck), assemble.mjs (join slide parts written by subagents into one deck),
                       upgrade.mjs (move an old deck onto the current engine), build-library.mjs (library/themes + looks.json, layouts into
                       template), build-gallery.mjs (gallery + README table), contrast.mjs (token audit), library-data.mjs
```

## 1. Write a deck in 60 seconds

1. Copy `template.html`. Set `data-theme` (and optionally `data-fonts`) on `<html>`, and the title in `<title>` and `data-title` on `<main class="deck">`.
2. Delete the sample slides. Add `<section class="slide" data-layout="...">` blocks (cheat-sheet below).
3. Add `<aside class="notes"><p>...</p></aside>` inside any slide for presenter notes.
4. `node check.mjs my-deck.html`, fix what it lists, open it, press **P**.

Rules of thumb: one idea per slide; at most 5 bullets; say the number, not the paragraph. Layouts auto-fit
(type shrinks to 78% before content would leave the safe area, and short content grows, up to 1.25x on bullets and 1.5x on statements, so a slide is never half empty), lists balance their wrapping, images crop with
`object-fit: cover`. You never tune CSS to make text fit; if `check.mjs` still complains, cut words.

## 2. Layout cheat-sheet (shortest working snippet for each)

Every snippet goes inside `<section class="slide" data-layout="NAME"> ... </section>`. Optional extras are in comments.

```html
<!-- title -->       <h1>Title with <em>one accent</em></h1><p class="sub">Subtitle</p>
                      <!-- <p class="label">Event</p> <p class="meta"><span>Name</span><span>Date</span></p> -->
<!-- section -->     <h2>Part two</h2>   <!-- <p class="label">Part two</p> <span class="num">2</span> <p>One-line promise</p> -->
<!-- statement -->   <h2>One huge sentence with an <em>accent</em>.</h2>
<!-- agenda -->      <h2>Agenda</h2><ol><li>Results <small>10 min</small></li><li>Plan</li></ol>   <!-- aria-current on an li dims the rest -->
<!-- bullets -->     <h2>Title</h2><ul data-build="list"><li><strong>Lead.</strong> Support.</li><li>Two</li><li>Three</li></ul>
<!-- two-column -->  <h2>Title</h2><div class="col"><h3>A</h3><p>Text</p></div><div class="col"><h3>B</h3><ul><li>x</li></ul></div>
<!-- image-left -->  <figure><img src="a.jpg" alt=""></figure><h2>Title</h2><p>Text</p>      <!-- empty <figure></figure> = placeholder art -->
<!-- image-right --> (same markup, mirrored)
<!-- full-bleed -->  <h2>Title on a photo</h2>   <!-- data-bg="photo.jpg" on the section, or <img class="bleed" src alt=""> -->
<!-- big-number -->  <div class="big" data-build="count">98<small>%</small></div><p>One honest caption.</p>  <!-- <p class="src">Source</p> -->
<!-- stats -->       <h2>Title</h2><div class="stat"><b>4.2M</b><span>Users</span></div> ...2 to 4 of these
<!-- chart -->       <h2>Title</h2><p class="lede">Takeaway</p>
                     <figure class="chart" data-chart="column" data-values="Q1:12,Q2:18,Q3:21"></figure>
                     <!-- data-chart: column | bar | line.  Multi-series: put a <table> inside (header row + label column).
                          data-prefix="$" data-unit="M" data-decimals="1" data-highlight="3" (1-based or a label)
                          data-min="92" (line charts only) data-build="draw" (bars grow, lines draw)
                          data-wide on the section = full-width plot; <figcaption>Source</figcaption> -->
<!-- comparison -->  <h2>Title</h2><table><thead><tr><th></th><th>A</th><th class="rec" data-tag="Recommended">B</th></tr></thead>
                     <tbody><tr><th>Price</th><td>$1</td><td>$2</td></tr></tbody></table>
<!-- timeline -->    <h2>Title</h2><ol class="timeline" data-build="list"><li><time>Q1</time><h3>Step</h3><p>Detail</p></li>...</ol>   <!-- class="now" marks today -->
<!-- process -->     <h2>Title</h2><ol class="steps" data-build="list"><li><h3>Capture</h3><p>Detail</p></li>...</ol>  <!-- 3 to 5 steps -->
<!-- quote -->       <blockquote>The quote with an <em>accent</em>.</blockquote><cite><b>Name</b>Title, Company</cite>
<!-- code -->        <h2>Title</h2><pre data-lang="js" data-focus="1-2;4-6;*">  code  </pre>   <!-- indent freely; focus steps light lines per click -->
<!-- team -->        <h2>Team</h2><div class="people"><figure class="person" data-initials="AK"><figcaption><b>Ann</b><span>Role</span></figcaption></figure>...</div>
<!-- diagram -->     <h2>Title</h2><figure class="dg"><svg viewBox="0 0 1680 400">...</svg></figure>   <!-- see Diagrams -->
<!-- case -->        <p class="label">Case</p><h2>Title</h2><div class="pt"><h3>History</h3><p>Summary</p></div>
                     <div class="vitals"><div class="vital" data-flag="high"><span>BP</span><b>162/94</b></div><div class="vital"><span>HR</span><b>96</b></div></div>
                     <ol class="course" data-build="list"><li><time>00:06</time>Event</li></ol>   <!-- summary left; 2 to 4 vitals; timed course. data-flag marks an abnormal value -->
<!-- ask -->         <h2>Raising a seed round</h2><div class="amount"><b data-build="count">$2.5<small>M</small></b><span>What it buys</span></div>
                     <ul class="use"><li style="--w:50"><b>Engineering</b><span>50%</span><i></i></li></ul><dl class="terms"><div><dt>Instrument</dt><dd>SAFE</dd></div></dl>
<!-- rows -->        <h2>Title</h2><ol class="rows"><li data-k="Issue"><p>Text</p></li><li data-k="Conclusion" data-hot><h3>Bold line</h3><p>Text</p></li></ol>
                     <!-- labelled rows: issue / rule / application / conclusion; situation / complication / resolution; claim / evidence / caveat. data-hot highlights one -->
<!-- quiz -->        <h2>Question?</h2><ol class="opts" data-build="reveal"><li>A</li><li data-correct>B</li><li>C</li><li>D</li></ol>   <!-- the click marks the data-correct option -->
<!-- materials -->   <h2>Title</h2><div class="board"><figure class="mat" style="--sw:#9a9892"><figcaption><b>Concrete</b><span>Where it goes</span></figcaption></figure>...</div>   <!-- or an <img> in each figure; --tx adds a texture gradient -->
<!-- formula -->     <h2>Title</h2><div class="eq"><i>P<sub>r</sub></i> = <i>P<sub>t</sub></i> &minus; <span class="hot"><i>L</i></span></div><dl class="terms"><div><dt><i>P<sub>t</sub></i></dt><dd>Meaning</dd></div></dl>
<!-- two-column x3 -> add data-cols="3" to the section for three columns (now / next / later) -->
<!-- closing -->     <h2>Thank you</h2><p class="contact"><span><b>Web</b> example.com</span><span>me@example.com</span></p>
```

Extras: `<p class="label">` is the small mono kicker above a title (use it on some slides, not all). `.chip` is a boxed token; `.chip.hot`
highlights one. `.lede`, `.src` and `<small>` are secondary text. `data-footer="off"` hides the footer, `data-fit="off"` stops auto-fit,
`data-tone="hero"` (or `"plain"`) swaps a slide into (or out of) the theme's hero palette.

## 3. Deck recipes (theme, fonts, sequence, builds)

Fonts: `data-fonts` is optional; leave it empty to use the theme's own pairing.

| Need | Theme | Sequence of layouts | Builds |
|---|---|---|---|
| **Product launch** | `keynote-black` (cinematic) or `keynote-white` | title, statement, statement + big-number (Magic Move on the number), stats, full-bleed, image-left, chart or comparison, quote, timeline, closing | `count` on stats, `list` on timeline, magic on the hero number |
| **Quarterly / board review** | `boardroom` | title, agenda, big-number, chart (actual vs plan), stats, chart (line with `data-min`), section, comparison (mark `rec`), two-column (risks / mitigations), timeline, bullets (decisions), closing | `count` on KPIs, `draw` on charts, `list` on decisions |
| **Tech talk** | `swiss` (or `studio`) | title, statement + big-number (problem), diagram (before), section, diagram (after), process, code (`data-focus`), chart (line), comparison, two-column (worked / didn't), stats, closing | `draw` + `fade` on diagram groups, focus on code |
| **Training / course** | `studio` (or `editorial`) | title, agenda, statement, diagrams, process, big-number, chart, comparison, code, quote, timeline (where we are), closing | `list`, `draw`, one `count` |
| **Investor pitch** | `keynote-white` + `data-fonts="grotesk"` | title, statement (problem), big-number (market), image-left (solution), stats (traction), chart (growth), comparison (vs alternatives), team, timeline (use of funds), closing | `count` on traction, `draw` on the growth chart |
| **Weekly status update** | `editorial` or `keynote-white` | title, bullets (done), stats (health), chart (trend), timeline (next), two-column (risks / asks), closing | `list` only; keep it quiet |

Authoring order that works in one pass: write the title and the one-sentence story, pick the recipe, write each slide's single
claim as its `<h2>`, then add the supporting snippet, then notes, then run `check.mjs`.

## 4. Theme design plans (DESIGN.md format)

Each theme is a real, shippable look. One accent, hairline rules, big type. All body text is at least 4.5:1.

### keynote-white
- **Overview.** Apple-clean. Mostly white, enormous tightly-tracked headlines, one blue phrase per slide. Fits launches, pitches, status decks.
- **Colors.** bg `#ffffff`, surface `#f5f5f7`, ink `#1d1d1f`, ink2 `#5f5f64`, rule `#d2d2d7`, brand `#0066cc` (on-brand `#fff`), hero = same as page.
- **Typography.** Display and body Inter (700 display, -0.035em), mono JetBrains Mono for labels and code.
- **Shape.** Radius 14 px (panels), 6 px bars, 1 px rules.
- **Signature.** Whitespace and scale; the accent `<em>` is the only colour on a title.
- **Do / Don't.** Do keep slides sparse. Don't add boxes around everything.

### keynote-black
- **Overview.** Cinematic dark for reveals and demos; the same system on pure black.
- **Colors.** bg `#000`, surface `#161618`, ink `#f5f5f7`, ink2 `#a1a1a6`, rule `#38383a`, brand `#2997ff`, em gradient `#2997ff` to `#c58bff`.
- **Typography.** Inter 700 display; JetBrains Mono.
- **Shape.** 14 px radius, 6 px bars.
- **Signature.** Gradient-filled headline accent, the only gradient in the system. Code panel `#1c1c1e` with Xcode-dark colours.
- **Do / Don't.** Do use for rooms with dim light. Don't print it (use keynote-white for PDF handouts).

### boardroom
- **Overview.** PowerPoint-corporate done well: navy, serif titles, gold accent, rules above the footer.
- **Colors.** bg `#fff`, surface `#eef1f6`, ink `#0b2545`, ink2 `#46576f`, rule `#c8d0dc`, brand `#c19a3d` (text version `#7a5a0a`); hero bg navy `#0b2545` with gold `#e2b658`.
- **Typography.** Source Serif 4 (600) titles, Source Sans 3 body, JetBrains Mono.
- **Shape.** 2 px radius, square bars, 1 px rules.
- **Signature.** Gold spine on title and closing slides; gold left bar on every title; navy code panel.
- **Do / Don't.** Do put the decision on the last slide. Don't use more than one chart per slide.

### swiss
- **Overview.** International typographic style: hard grid, black rules, one red.
- **Colors.** bg `#fff`, surface `#f0f0f0`, ink `#111`, ink2 `#555`, rule `#cfcfcf`, strong rule `#111`, brand `#d7000f`; hero slides are solid red with white type.
- **Typography.** Inter Tight 700 (-0.03em) display, Inter body, JetBrains Mono.
- **Shape.** Zero radius everywhere, 2 px black rule above the footer.
- **Signature.** A 96x20 red tab on the top margin and full-red hero slides.
- **Do / Don't.** Do align everything to the grid. Don't round corners.

### editorial
- **Overview.** A printed essay: paper, ink, oxblood, italic emphasis.
- **Colors.** bg `#f4efe6`, surface `#ebe4d6`, ink `#1c1a17`, ink2 `#5a5347`, rule `#cfc5b2`, brand `#8f2d17`; hero is ink `#1c1a17` with terracotta `#e49467`.
- **Typography.** Newsreader 400 display (italic for `<em>`), Inter body, JetBrains Mono.
- **Shape.** Zero radius, 1 px rules.
- **Signature.** A masthead double rule across the top of every slide.
- **Do / Don't.** Do write full sentences as titles. Don't use all-caps.

### studio
- **Overview.** Deep teal and amber, the look of the Wireless 101 courses: for teaching and talks.
- **Colors.** bg `#0a2a2f`, surface `#0f3a40`, ink `#efe8d8`, ink2 `#a9c0bd`, rule `#2c5a5f`, brand `#f0a93b` (on-brand `#0a2a2f`); hero `#061c20`.
- **Typography.** Instrument Serif display (italic amber `<em>`), DM Sans body, Space Mono labels.
- **Shape.** 4 px radius, 2 px bars.
- **Signature.** An amber dot starts every label.
- **Do / Don't.** Do keep diagrams to the amber and cream. Don't add a second accent.

Press **S** in any deck to switch theme and font pairing live; hovering an option previews it on the slide, a click keeps it (remembered per deck in localStorage).

**Font library** (9 core pairings below live in the template; the profession pairings live in `library/fonts/` and are copied into a deck with `tools/add-look.mjs`. The settings panel groups them as Core and Library, and picking a library theme selects its own pairing; `fonts.html` shows them all as specimens with your own headline): Inter (neo-grotesk), Sora/Inter (geometric), Space Grotesk/Inter (grotesk with character), IBM Plex Sans/Plex Mono (technical), Fraunces/Inter, Playfair/Source Sans,
Spectral/Public Sans, Cormorant Garamond/Source Sans (set at 1.15x via `--display-scale`), and system fonts. Type sizes come from one scale: `--t-display --t-h1 --t-h2 --t-h3 --t-body --t-small` (164/132/84/48/36/28 px; 28 px is the floor for anything the audience reads).
Set one with `data-fonts="sora"` on `<html>`. To recolour any theme, add one line: `html{--brand:#7c3aed;--brand-text:#7c3aed}`.

## 5. Builds, transitions, Magic Move

**Builds** reveal parts of a slide one click at a time. Right arrow / space / click reveals the next build, then the next slide; left steps back.

| Attribute | Effect |
|---|---|
| `data-build="fade"`, `rise`, `scale`, `wipe` | the element appears |
| `data-build="list"` on a `ul`/`ol` | children appear one by one (`data-item="fade"` to change the style) |
| `data-build="draw"` on an SVG shape or `<g>` | strokes draw themselves (every shape inside is staggered) |
| `data-build="count"` | the number counts up from 0 (`$4.2M`, `38.4%`, `1,840` all work); markup holds the final value |
| `data-build="draw"` on a chart figure | bars grow, lines draw, labels arrive |
| `data-focus="1-3;5-7;*"` on a `pre` | each click lights the next range of lines (`*` = all) |
| `data-order="2"` | builds with the same order arrive together; give all builds an order or none |
| `data-delay="200"` | extra delay in ms |

Print, overview thumbnails and `check.mjs` always show every build; the presenter window's Next pane shows the next one. Charts take `data-target="200"` (a dashed target line), `data-delta="pct"` or `"abs"` (a delta label on two-series columns), `data-muted="2"` (which series is the muted reference; with two bar series the second is one by default, `data-equal` turns that off) and `data-highlight` (also on line charts). Chart data is exposed to screen readers as a hidden table. Use builds where order matters; most slides need none.

**Skip, appendix and the end.** `data-skip` on a slide keeps it in the overview, outline and PDF but jumps over it in play (Keynote's Skip Slide); use it for backup slides. A slide with `data-layout="appendix"` renders as a section divider and it and every slide after it are skipped in play. Pressing next on the last slide shows an "End of show" screen (`data-end="off"` on the deck turns it off). Cite sources with `<sup class="cite">[1]</sup>` and list them on a `references` slide (`<ol class="refs"><li><div><cite>Title</cite> <span>Detail</span></div></li></ol>`). Recipes: an agenda that returns at each section break, with `aria-current` on the current item; a Q&A slide is a `closing` slide whose label says Questions.

**Transitions.** Default is a quick dissolve. `data-transition="push"`, `"move-in"` or `"none"` per slide (the incoming slide's setting wins).

**Magic Move.** Give an element on one slide and an element on the next the same `data-magic="id"` and they morph: position, size, colour,
opacity. If the typeface differs between the two (sentence to chip, serif to mono) it cross-fades while it travels. It works on text, boxes
and SVG; use a `<span>` rather than `<em>` for text that changes colour. A slide pair with no shared ids just dissolves.

## 6. Diagrams that draw

Author the SVG with `viewBox="0 0 1680 H"` (so 1 unit is 1 px at full width) and use the engine classes so it follows the theme:
`dg-box` (outline), `dg-hot` (accent outline), `dg-line` and `dg-line hot`, `dg-dot`, text classes `dg-t` (label), `dg-s` (small), `dg-m` (mono), `dg-b` (accent).
Wrap groups in `<g data-build="fade" data-order="1">` for boxes and `<g data-build="draw" data-order="2">` for arrows (stroke-only paths, arrowheads as part of
the path). Crop the viewBox to the content (`viewBox="0 150 1680 330"`) so the diagram fills the slide. See `examples/src/gen_diagrams.py` for generators.

## 6b. Images

Photos and illustrations go in `<img>` inside `image-left`, `image-right`, `team`, or as `data-bg` / `<img class="bleed">` on `full-bleed` (cropped with `object-fit: cover`, scrim added for legibility).
Always give `alt` text. Re-encode photos without EXIF/GPS (Pillow: open, convert, save; `sips` alone keeps metadata).

Local generation (nothing leaves the machine): `tools/gen-images.sh` renders the illustrations in `assets/` with the Draw Things CLI (`z_image_turbo`), strips metadata through Pillow and
writes JPEGs of about 70 to 110 KB; `tools/gen-images.sh name "prompt" seed WxH` renders one more. Rules that came from the Wireless 101 pipeline: generated images are **illustrative only**; never ask
for text, numbers, charts or diagrams (models garble them, so those stay SVG); no real people or brands; judge each render and drop the bad ones.
The four examples use `assets/aria-hero.jpg`, `aria-market.jpg` and `warehouse.jpg`; `abstract-teal.jpg` is a spare for dark decks.

## 7. Presenter keys and tools

| Key | Action |
|---|---|
| right, down, space, PageDown, N, click | next build / slide |
| left, up, PageUp, Backspace, Shift+space | previous |
| Home / End | first / last slide |
| number + Enter | jump to slide (a toast shows what you typed; works in the presenter window too) |
| **G** | overview (light table; arrows move, Enter opens). **Esc** only closes panels, the overview, the laser or the marker; it never opens anything, so a clicker's Esc cannot put the grid on the projector |
| **P** | presenter view in a new window (this is the presenter view, not PDF export): current slide, a Next pane that previews the next build (or the next slide when builds are done), notes (A- / A+ or + / - change their size), timer (click or T pauses; `data-duration="20"` on the deck makes it a countdown that turns amber for the last two minutes), clock, an AUDIENCE SCREEN badge when the projector is blanked. Every key above works there too, and it reconnects if the audience window is reloaded (allow pop-ups) |
| **M** | marker: draw on the slide with mouse, pen or finger. **1 2 3 4** red / yellow / blue / white, **H** highlighter, **E** eraser, **Ctrl/Cmd+Z** undo, **C** clear, **Esc** leave. Kept per slide, remembered per deck in localStorage, shown in the presenter window, never printed |
| **L** | laser pointer: a red dot follows the mouse and leaves no trace |
| **O** | outline: every slide with title, link, layout, build count, notes flag; click to jump, filter, Copy as text; `#` copies one slide's link, Links copies them all |
| **K** | copy a link to this slide (also the link button in the toolbar) |
| **A** | narration on/off, when the deck has `data-narration` clips (see 12a) |
| **S** | theme and font panel; hover or focus a theme or pairing to preview it live on the slide, click to keep it |
| **B** or **.** / **W** | black / white screen |
| **F** or **F5** | fullscreen (F5 so a clicker's start button does not reload the page) |

The toolbar at the bottom fades when idle (and the cursor hides). Every slide has a link: `deck.html#pricing`, from `data-id="pricing"` on the section, else from its title, else `#slide-7` (`#/7` and `#7` work too); the address bar follows the current slide. Touch: swipe left/right; tap the
left 22% to go back (the rest advances); the toolbar stays visible while it has keyboard focus. `prefers-reduced-motion` is honoured in JS: no transitions, builds appear instantly, counters show the final value.

## 8. PDF and print

Open the deck in Chrome, **Cmd/Ctrl+P**, destination "Save as PDF", margins "None", turn on "Background graphics". `@page` is 1920x1080 px, one slide per
page, all builds shown, backgrounds kept, toolbar and marker hidden. Headless: `page.pdf({preferCSSPageSize: true, printBackground: true})`.

## 9. Right-to-left and Arabic

Set `dir="rtl" lang="ar"` on `<html>` (the lang drives chart number formatting: Arabic-Indic digits for `ar`, and `data-build="count"` accepts Arabic-Indic digits) or on a single `<section>`. See `examples/arabic-sample.html`. Serif themes carry `--f-ar-d` (Noto Naskh Arabic) for Arabic headings; Arabic headings get line-height 1.25. All layout uses logical properties, so slides mirror (image-left becomes right, timelines run
right to left, the wipe direction flips). An Arabic face loads on demand. Keep code in `dir="ltr"` blocks (the code layout already is).

## 10. Checker

```
node check.mjs deck.html [more.html] [--themes] [--shots out/] [--outline]
```

Opens each deck at 1920x1080, shows every slide with all builds revealed and prints a short list: `slide n: element, what is wrong, fix:`. It reports
content outside the safe area (120 px sides, 96 px top/bottom) or the slide, text wider than its box, text under 20 px, text contrast under 4.5:1 (including
gradient-filled headline accents), and console errors. Exit code 1 on failure; a 15-slide deck takes about 2 seconds. `--themes` repeats the run in every
theme the deck defines (use it before sending a deck to someone who might press S). `--shots` saves a PNG per slide. `--outline` prints the deck's outline (n, title, layout, builds, magic, and `NO NOTES` where notes are missing), handy for reviewing a generated deck without opening it.

Needs Playwright: `npm i playwright && npx playwright install chromium`. Or set `PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs` and
`CHROME_PATH=/path/to/chrome`.

## 11. Making a theme

Core themes live in the template; every other theme is a file in `library/themes/src/<id>.css` (macros: `@C(id)` content slides,
`@T(id)` title/section/closing, `@A(id)` every slide, `@SVG[<svg ...>]SVG@` inline art). `node tools/build-library.mjs` expands it to
`library/themes/<id>.css` and indexes it in `library/looks.json`; a pairing is one file in `library/fonts/<id>.css`. Decks get them
with `node tools/add-look.mjs deck.html --theme <id>`. Never add library looks to `template.html`.

Inside a deck, a theme is one self-contained block in `<style id="kp-themes">`, between marker comments. Scripts can add or remove whole blocks; the settings panel lists
whatever blocks exist. Layouts read **only** the tokens below (layout CSS contains no hex colours or font names; chrome such as the toolbar is deliberately unthemed).

```css
/* THEME:ocean | Ocean | #0b7285 | https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap */
html[data-theme="ocean"]{
  --bg:#fff; --bg2:#eef7f9; --ink:#0b2a33; --ink2:#41606a; --rule:#c5dde2; --rule-strong:#0b2a33;
  --brand:#0b7285; --brand-text:#0b7285; --on-brand:#fff;
  --hero-bg:#0b2a33; --hero-ink:#fff; --hero-ink2:#b7d3da; --hero-rule:#2c5560; --hero-brand:#5bc0d0;
  --bleed-bg:#0b7285; --bleed-ink:#fff;
  --f-display:"Inter",system-ui,sans-serif; --f-body:"Inter",system-ui,sans-serif; --f-mono:ui-monospace,Menlo,monospace;
  --w-display:700; --ls-display:-0.03em; --em-style:normal;
  --radius:10px; --chart-radius:4px; --rule-w:1px; --letterbox:#061a20;
  --code-bg:#0b2a33; --code-ink:#e8f3f5; --c-kw:#5bc0d0; --c-str:#a8d8b0; --c-num:#f2b880; --c-com:#8fb0b8; --c-fn:#8ab4ff;
}
/* /THEME */
```

| Group | Tokens | Rule |
|---|---|---|
| Colour (required) | `--bg --bg2 --ink --ink2 --rule --rule-strong --brand --brand-text --on-brand` | ink and ink2 at least 4.5:1 on bg and bg2; brand-text at least 4.5:1 on bg; on-brand readable on brand |
| Hero (required) | `--hero-bg --hero-ink --hero-ink2 --hero-rule --hero-brand` | used by title, section, closing, full-bleed and `data-tone="hero"`; hero-brand is also used as text |
| Full-bleed placeholder (required) | `--bleed-bg --bleed-ink` | no-image full-bleed slides; at least 4.5:1 |
| Type (required) | `--f-display --f-body --f-mono --w-display --ls-display --em-style` | stacks end in a generic family |
| Shape (required) | `--radius --chart-radius --rule-w` | radius for panels, process boxes, chips, code panel; chart radius is a bare px number; rule weight 1px or 2px |
| Code (required) | `--code-bg --code-ink --c-kw --c-str --c-num --c-com --c-fn` | each at least 4.5:1 on code-bg |
| Chrome (required) | `--letterbox` | colour around the 16:9 stage |
| Optional, defaults exist | `--s1 --s2 --s3 --muted-bar --rec-mix --hot --hot-text --scrim --on-image --em-fill --f-ar-d --f-ar-b` | chart series, the recommended-column tint (13% light, about 24% dark), de-emphasised bars, highlight colour, a text-safe alert colour (4.5:1 on bg and bg2; used for flagged values), photo scrim, text on photos, a fixed gradient for headline `<em>`, Arabic display and body stacks (default IBM Plex Sans Arabic) |

Notes. (1) The marker is `THEME:name | Label | swatch | fonts-url`; the fonts url may be empty (system fonts) and is loaded on demand with solid fallbacks in the stacks.
(2) A theme may add small signature rules (use `::before` on `.slide` with `isolation:isolate` and `z-index:-1` for patterns; a background-image on the slide itself would make the checker skip contrast) inside its own block, scoped by `[data-theme="name"]` (see `swiss`, `editorial`). (3) Tokens that use `var()` resolve where they are
defined, so do not define `--em-fill` or similar as `var(--brand-text)` (hero slides redefine it). (4) Test with `node check.mjs examples/genai-101.html --themes`.

**Font pairings** follow the same pattern and must stay after all THEME blocks so they override the theme's own type:

```css
/* FONTS:plex | IBM Plex Sans / Plex Mono | https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap */
html[data-fonts="plex"]{--f-display:"IBM Plex Sans",system-ui,sans-serif;--f-body:"IBM Plex Sans",system-ui,sans-serif;--f-mono:"IBM Plex Mono",ui-monospace,monospace;--w-display:600;--ls-display:-0.02em;--em-style:normal}
/* /FONTS */
```

## 12. Checklist before you present

- `node check.mjs deck.html --themes` is green.
- Press **G**: the sequence reads as a story; every slide has one claim.
- Press **P**: notes on every slide that needs one; the timer works.
- Try the Magic Move pairs and the builds once in presentation order.
- Print to PDF and look at page 1, the chart page and the last page.
- Open with the system's reduced-motion setting on if your audience may need it.

## 12a. Narration (recorded voice per slide)

Add `data-narration="audio/my-deck/"` to `<main class="deck">` and put one MP3 per slide in that folder, named after the
slide's link id (`data-id`, for example `audio/my-deck/pricing.mp3`). A speaker button appears in the toolbar once the first
slide's clip loads (key **A**, also from the presenter window). While narration is on, each slide plays its clip, shows all
its builds, and moves to the next slide when the clip ends; navigating by hand keeps narrating from where you land.
Until the files exist the deck shows no button at all, so a deck can ship first and get its voice later.

## 12b. Slides that run

A slide is a web page, so it can hold things a slide file can't: a working app screen, a calculator, a simulation you drag,
sound and speech, code you edit and run, a game, another page in an iframe, a video that plays only on its slide, a live camera.
`examples/beyond-slides.html` has one of each; its source (`examples/src/beyond-slides.html`) is the pattern to copy:
wrap widgets in `.bx-ui` (clicks there don't advance), take colours from the theme tokens, and run anything that moves or
makes sound only while the slide is current. The video in it (`assets/edit-in-browser.mp4`) is a recording of `editor.html`.

## 13. Known limits

- Web fonts come from Google Fonts on demand; offline, the system fallbacks in each stack are used (set `data-fonts="system"` for fully offline decks).
- Charts are simple on purpose: column, bar and line, up to three series, no stacked or dual-axis.
- Magic Move morphs matching elements; it does not morph SVG path shapes into different paths.
- The presenter view needs pop-ups allowed and uses `postMessage`, so both windows must stay open.
- The engine fits type by shrinking to 78% (display numbers and headlines to 50%); below that the checker reports the slide instead of shrinking further.

<!-- LIBRARY:START (generated by tools/build-gallery.mjs from tools/library-data.mjs; edit the data file) -->
## 14. Theme library: one look per profession

Sixteen themes and sixteen font pairings, each tested on a six-to-eight slide sample deck in `library/`. Open `library/index.html` for the gallery (filter by field and by light or dark).
Library themes are not in `template.html`: copy one into a deck with `node tools/add-look.mjs deck.html --theme id` (or `--all`), then switch in the settings panel (**S**) or with `data-theme` and `data-fonts`. A theme's own font pairing is its default;
the matching `data-fonts` id is listed so you can pair it with any other theme.

| # | Profession | Theme | Fonts | Recipe (layouts in order) | Sample deck |
|---|---|---|---|---|---|
| 1 | Electrical / wireless engineer | `spectrum` | IBM Plex Sans Condensed / Plex Sans / Plex Mono (`plexcond`) | title, statement, formula, chart (line), diagram, stats, closing | [electrical-wireless-engineer](library/electrical-wireless-engineer.html) |
| 2 | Software engineer | `commit` | Geist / Geist Mono (`geist`) | title, statement, timeline, code (focus), chart, two-column, bullets | [software-engineer](library/software-engineer.html) |
| 3 | Data scientist / analyst | `notebook` | Libre Franklin / Roboto Mono (`franklin`) | title, statement, chart (bar), chart (line), comparison, two-column (caveats), closing | [data-scientist](library/data-scientist.html) |
| 4 | Doctor / clinician | `clinic` | Figtree / IBM Plex Mono (`figtree`) | title, case, two-column (differential), chart (line), timeline (course), bullets (take-home), closing | [doctor-clinician](library/doctor-clinician.html) |
| 5 | Medical / scientific researcher | `labbook` | STIX Two Text / Source Sans 3 / Plex Mono (`stix`) | title, statement (finding first), process (methods), chart, stats (n, effect), rows (claim, evidence, caveat), closing | [researcher](library/researcher.html) |
| 6 | School teacher | `schoolyard` | Lexend / Atkinson Hyperlegible / DM Mono (`lexend`) | title, agenda ("today we will"), statement, diagram, quiz (reveal), bullets (remember), closing (task) | [school-teacher](library/school-teacher.html) |
| 7 | University lecturer | `chalk` | Literata / Karla / Plex Mono (`literata`) | title, agenda, formula, code (focus), quiz (check), bullets, closing (reading) | [university-lecturer](library/university-lecturer.html) |
| 8 | Student (thesis defence) | `thesis` | Fira Sans / Fira Mono (`fira`) | title, agenda (outline), statement (the question), rows (question to contribution), chart, two-column (limits, future), closing | [student-thesis](library/student-thesis.html) |
| 9 | Startup founder (pitch) | `pitch` | Bricolage Grotesque / DM Sans / DM Mono (`bricolage`) | title, statement (problem), big-number (market), stats (traction), chart (growth), comparison, ask, closing | [startup-founder](library/startup-founder.html) |
| 10 | Product manager | `roadmap` | Plus Jakarta Sans / JetBrains Mono (`jakarta`) | title, stats, two-column x3 (now, next, later), timeline, comparison, rows (decision log), bullets (decisions needed) | [product-manager](library/product-manager.html) |
| 11 | Executive / consultant (board review) | `partner` | Gelasio / Lato / Source Code Pro (`gelasio`) | title, statement (the answer), rows (situation, complication, resolution), chart, comparison, big-number, bullets (next steps) | [executive-consultant](library/executive-consultant.html) |
| 12 | Finance professional | `ledger` | Bitter / Public Sans / Roboto Mono (`bitter`) | title, big-number, comparison (statement), chart (variance), formula (margin), bullets (outlook) | [finance](library/finance.html) |
| 13 | Marketing / sales | `campaign` | Syne / Manrope / DM Mono (`syne`) | title, statement (the promise), stats (funnel), chart (budget), timeline (beats), comparison (test), closing | [marketing-sales](library/marketing-sales.html) |
| 14 | Lawyer | `chambers` | EB Garamond / Public Sans / Plex Mono (`garamond`) | title, agenda, quote (the clause), rows (issue, rule, application, conclusion), two-column (for, against), comparison (options), closing | [lawyer](library/lawyer.html) |
| 15 | Architect / designer | `drawing` | Jost / DM Mono (`jost`) | title, statement (the idea), diagram (plan), materials, stats (brief), timeline, closing | [architect-designer](library/architect-designer.html) |
| 16 | Trainer / community or faith educator (EN and AR) | `trainer` | Readex Pro / IBM Plex Sans Arabic / Plex Sans (`readex`) | title (EN + AR), two-column (EN left, AR right), Arabic slides with dir="rtl", quiz in both languages, closing | [trainer-bilingual](library/trainer-bilingual.html) |
| 17 | Security engineer | `sentinel` | Overpass / Overpass Mono (`overpass`) | title, big-number (impact), timeline, chart (line), rows (threat, gap, impact, fix), comparison (before, after), process, bullets (decisions), closing | [security-engineer](library/security-engineer.html) |
| 18 | Civil / structural / mechanical engineer | `blueprint` | Archivo Narrow / Archivo / Azeret Mono (`archivo`) | title, stats, two-column (design basis), formula (check), chart (bar), materials, timeline, closing | [civil-engineer](library/civil-engineer.html) |
| 19 | Nonprofit / NGO / public policy | `civic` | Petrona / Hanken Grotesk / Red Hat Mono (`petrona`) | title, big-number (reach), stats (outcomes), chart (column), quote, ask (the need), bullets (how to help), closing | [nonprofit](library/nonprofit.html) |
| 20 | Journalist / editor | `newsroom` | Libre Caslon Text / Work Sans / Chivo Mono (`caslon`) | title, statement (the story), big-number, chart (line), rows (claim, evidence, caveat), timeline, closing | [journalist](library/journalist.html) |
| 21 | Real estate / property | `estate` | Red Hat Display / Red Hat Text / Red Hat Mono (`redhat`) | title, stats, two-column x3 (buildings), chart (bar), comparison, ask (equity), timeline, closing | [real-estate](library/real-estate.html) |
| 22 | Chef / restaurant / hospitality | `menu` | Young Serif / Alegreya Sans / Fragment Mono (`youngserif`) | title, statement, bullets (the courses), stats, chart (bar), process (service), comparison (suppliers), closing | [chef-hospitality](library/chef-hospitality.html) |
| 23 | HR / people operations | `people` | Outfit / Albert Sans / Spline Sans Mono (`outfit`) | title, big-number (response rate), chart (bar), two-column (themes), comparison (policy), timeline (commitments), closing | [hr-people](library/hr-people.html) |
| 24 | UX / product designer | `wireframe` | Epilogue / Instrument Sans / Martian Mono (`epilogue`) | title, statement (the finding), chart (column), rows (observed, why, change), two-column (flow A vs B), process, closing | [ux-designer](library/ux-designer.html) |
| 25 | Sports coach / performance analyst | `pitchside` | Barlow Condensed / Barlow (`barlow`) | title, stats, chart (line), two-column (worked, cost us), comparison (formations), timeline (pre-season), closing | [sports-coach](library/sports-coach.html) |
| 26 | Historian / museum curator | `archive` | Bodoni Moda / Alegreya / Fragment Mono (`bodoni`) | title, quote (primary source), timeline, case (object record), chart (line), two-column (readings), closing | [historian-curator](library/historian-curator.html) |

New layouts these recipes use: `case`, `ask`, `rows`, `quiz`, `materials`, `formula`, and `data-cols="3"` on `two-column` (see the cheat-sheet in section 2).
Build tools: `node tools/build-library.mjs` (expands `library/themes/src` into `library/themes`, indexes `library/looks.json`, splices layouts into `template.html`), `node tools/add-look.mjs deck.html --theme id` (copies a look into a deck), `node build-examples.mjs` (rebuilds examples, library decks and `fonts.html`),
`node tools/build-gallery.mjs` (thumbnails, gallery, this section) and `node tools/contrast.mjs` (token contrast audit of every theme).

### Theme specs (DESIGN.md format)

#### 1. Spectrum (`spectrum`): Electrical / wireless engineer
- **Overview.** An instrument faceplate. Pale blue-grey screen with a scope graticule behind the content; title slides are the dark display with two traces, I and Q, running across them.
- **Colors.** bg `#EDF0F2`, surface `#DEE3E7`, ink `#0E1B26`, ink2 `#3F4E5A`, rule `#BFC8CF`, brand `#0A6A8F` (cyan-blue trace), hot `#A63A08` (second channel, orange); hero `#0A1722` with trace `#5FD3EE`. Series: `#0A6A8F`, `#C2410C`, `#6B7B88`.
- **Typography.** IBM Plex Sans Condensed 600 titles (-0.01em), IBM Plex Sans body, IBM Plex Mono labels.
- **Shape.** 2 px radius, 1 px rules, square bars.
- **Signature.** A 120 px graticule behind every content slide, a `CH1` tag on labels, and the I/Q sine pair on title slides. Two channels mean two colours: blue and orange, never a third.
- **Do / Don't.** Do put units on every number. Do not draw the graticule heavier than 9% ink.

#### 2. Commit (`commit`): Software engineer
- **Overview.** An editor at night. Indigo-black, lavender accent, and the furniture of a code editor: markdown headings, diff markers, a status line.
- **Colors.** bg `#171A26`, surface `#20243A`, ink `#E6E9F5`, ink2 `#A3A9C4`, rule `#343A58`, brand `#B79CFF`; hero `#0F111A`. Series `#B79CFF`, `#7DCFFF`, `#9ECE6A`; hot `#FF8FB8`. Code: pink keywords, green strings, amber numbers, cyan functions.
- **Typography.** Geist 600 titles (-0.035em), Geist body, Geist Mono for labels and code.
- **Shape.** 8 px radius, 3 px bars, 1 px rules.
- **Signature.** Titles start with a dim `# `, bullets are `+` diff markers, and the footer is a status line with a brand dot and `ln 4`.
- **Do / Don't.** Do let the code slide be the hero. Do not add a second accent to the chrome; the syntax colours are the only rainbow.

#### 3. Notebook (`notebook`): Data scientist / analyst
- **Overview.** A notebook page. A cell gutter on the left, a selected-cell bar beside each title, and a colour-blind-safe series palette so charts are readable by everyone.
- **Colors.** bg `#FBFCFD`, surface `#EDF1F5`, ink `#101820`, ink2 `#47535F`, rule `#D3DAE1`, brand `#B5460F`; hero is full brand orange with white type. Series (Okabe-Ito): `#0072B2`, `#D55E00`, `#009E73`.
- **Typography.** Libre Franklin 700 titles (-0.03em), Libre Franklin body, Roboto Mono labels.
- **Shape.** 4 px radius, 2 px bars, 1 px rules.
- **Signature.** A 72 px cell gutter, an orange selected-cell bar on each title, and the footer reads `In [5]:`.
- **Do / Don't.** Do state caveats on their own slide. Do not use red and green as the only difference between two series.

#### 4. Clinic (`clinic`): Doctor / clinician
- **Overview.** Clean, calm and legible from the back of a lecture theatre. White, clinical teal, and a single alert red reserved for abnormal values.
- **Colors.** bg `#FFFFFF`, surface `#ECF4F3`, ink `#10292B`, ink2 `#41605E`, rule `#CCDEDC`, brand `#0F766E`, alert `#B42318`; hero `#0A3B3A` with `#7DE0D2`.
- **Typography.** Figtree 700 titles (-0.02em), Figtree body, IBM Plex Mono for values and times.
- **Shape.** 10 px radius, 3 px bars, 1 px rules.
- **Signature.** A small ECG trace in the corner of content slides, a full ECG strip under title slides, and flagged vitals in alert red with the word `high` beneath.
- **Do / Don't.** Do use only fictional or fully de-identified cases. Do not use red for anything but abnormal.

#### 5. Lab book (`labbook`): Medical / scientific researcher
- **Overview.** A graph-paper lab notebook with a journal-style serif. Titles are claims, charts carry numbered figure captions.
- **Colors.** bg `#FFFFFF` over faint violet graph paper, surface `#F3F0FA`, ink `#1B1530`, ink2 `#51496A`, rule `#D9D3EA`, brand `#5B3A9B`; hero `#2A1B4D` with `#CDBBFF`. Series `#5B3A9B`, `#1F7A8C`, `#8A8498`.
- **Typography.** STIX Two Text 600 titles (italic emphasis), Source Sans 3 body, IBM Plex Mono.
- **Shape.** 2 px radius, square bars, 1 px rules.
- **Signature.** A 40 px / 200 px graph-paper grid and automatic `Fig. 1.`, `Fig. 2.` captions on charts and diagrams.
- **Do / Don't.** Do lead with the result. Do not hide the caveat; give it a row.

#### 6. Schoolyard (`schoolyard`): School teacher
- **Overview.** Big, friendly and high-contrast. Squared exercise-book paper under every slide, school-bus yellow for title slides, rounded shapes.
- **Colors.** bg `#FFFFFF`, surface `#E8F0FF`, ink `#10243E`, ink2 `#3B4F69`, brand `#1D4ED8`, hot `#C2255C`; hero `#FFD23F` with navy type and a blue accent. Series `#1D4ED8`, `#C2255C`, `#2F9E44`.
- **Typography.** Lexend 700 titles (made for reading fluency), Atkinson Hyperlegible body, DM Mono.
- **Shape.** 22 px radius, 3 px rules, 8 px bars.
- **Signature.** 48 px squared paper, a thick yellow highlighter bar under every title, and quiz options that turn solid blue on the right answer.
- **Do / Don't.** Do keep one idea per slide at 36 px or bigger. Do not use colour alone to mark the right answer in a quiz; the letter stays.

#### 7. Chalk (`chalk`): University lecturer
- **Overview.** A slate board with three colours of chalk. Dark so it reads in a dimmed hall; type is a reading serif so a long derivation stays comfortable.
- **Colors.** bg `#23313A`, surface `#2D3E49`, ink `#F2F0E6`, ink2 `#BDC7CB`, rule `#4A5D68`, brand mint chalk `#8FD6C0`; yellow chalk `#F3D77A`, pink chalk `#F2A7B8`; hero `#182329`.
- **Typography.** Literata 500 titles (italic emphasis), Karla body, IBM Plex Mono.
- **Shape.** 6 px radius, 2 px dashed rules.
- **Signature.** A hand-drawn chalk underline beneath every title and dashed chalk rules.
- **Do / Don't.** Do use the three chalks for meaning (term, example, warning). Do not set long paragraphs; it is a board.

#### 8. Thesis (`thesis`): Student (thesis defence)
- **Overview.** A Beamer-era academic frame done properly: white pages, a maroon header bar, an info-line footer. Formal enough for a committee, plain enough to get out of the way.
- **Colors.** bg `#FFFFFF`, surface `#F5EFF1`, ink `#211A1D`, ink2 `#5A5256`, rule `#DDD3D7`, brand `#8A1538`. Hero is white too.
- **Typography.** Fira Sans 600 titles and body, Fira Mono for code.
- **Shape.** 4 px radius, 2 px bars, 1 px rules.
- **Signature.** A maroon header strip and a full-width maroon info-line footer with the title and slide number.
- **Do / Don't.** Do put the contribution on a slide you can keep if time runs out. Do not paste whole paragraphs from the thesis.

#### 9. Pitch (`pitch`): Startup founder (pitch)
- **Overview.** Confident and quick. A full ultramarine title slide, white pages with heavy, tight headlines, pill-shaped chips, and a coral second colour for the number that matters.
- **Colors.** bg `#FFFFFF`, surface `#EFF0FF`, ink `#0C0D2B`, ink2 `#464870`, brand `#2A2FE0`; hero `#2A2FE0` with lemon `#FFE066`; bleed coral `#FF5A36`. Series `#2A2FE0`, `#FF5A36`, `#0C0D2B`.
- **Typography.** Bricolage Grotesque 800 titles (-0.04em), DM Sans body, DM Mono.
- **Shape.** 22 px radius, 10 px bars, 2 px rules.
- **Signature.** Stat tops are 8 px brand bars, the slide number is a brand pill, and the `ask` slide carries a big amount with use-of-funds bars.
- **Do / Don't.** Do end on the ask and the use of funds. Do not put more than one chart on a slide.

#### 10. Roadmap (`roadmap`): Product manager
- **Overview.** The look of a good product tool: neutral surfaces, one indigo, rounded pills, and task circles instead of bullets.
- **Colors.** bg `#FAFAFB`, surface `#EFEFF5`, ink `#1B1B26`, ink2 `#53536A`, rule `#DEDEE8`, brand `#4F46E5`, hot `#9F4A07`; hero `#EAE9FB`. Series `#4F46E5`, `#0E9F6E`, `#B45309`.
- **Typography.** Plus Jakarta Sans 700 titles (-0.03em) and body, JetBrains Mono.
- **Shape.** 12 px radius, 5 px bars, 1 px rules.
- **Signature.** Labels are pills, bullets are open task circles, chips are rounded status tags, and the roadmap is a three-column Now, Next, Later.
- **Do / Don't.** Do ask for the decision on the last slide. Do not show a date without saying how firm it is.

#### 11. Partner (`partner`): Executive / consultant (board review)
- **Overview.** Answer first, evidence after. Action titles in a Georgia-like serif sit on a hard rule; the one thing to remember is on a yellow highlight.
- **Colors.** bg `#FFFFFF`, surface `#F0F3F6`, ink `#1A1F26`, ink2 `#4C5662`, rule `#D5DBE1`, brand `#1F5FA8`; hero charcoal `#12161C` with `#6FB1F2`; highlight `#FFF0B8`.
- **Typography.** Gelasio 700 action titles, Lato body, Source Code Pro.
- **Shape.** 2 px radius, square bars, 2 px rules.
- **Signature.** A 2 px rule under every title, a yellow so-what box on `.lede`, and `Source:` prefixed to every source line.
- **Do / Don't.** Do write titles as full sentences. Do not use the yellow box more than once per slide.

#### 12. Ledger (`ledger`): Finance professional
- **Overview.** Accountant's columnar paper. Pale green ledger, ruled lines, a red margin, and numbers set in tabular lining figures so columns align.
- **Colors.** bg `#F1F6F2`, surface `#E1ECE5`, ink `#0F2A1D`, ink2 `#3C5848`, rule `#BCD1C3`, brand `#0B6B3F`, negative `#B42318`; hero `#0B3D2A` with `#9BE3B7`.
- **Typography.** Bitter 600 titles, Public Sans body with tabular lining numerals, Roboto Mono.
- **Shape.** 2 px radius, square bars, 2 px rules.
- **Signature.** Ruled lines every 60 px with a double red margin, and the big number is underlined with a double rule like a ledger total.
- **Do / Don't.** Do put negatives in brackets. Do not round different figures to different places.

#### 13. Campaign (`campaign`): Marketing / sales
- **Overview.** A poster, not a template. Deep raspberry, lemon sticker labels, wide extra-bold type and hard 3 px rules.
- **Colors.** bg `#FFFFFF`, surface `#FFE9F1`, ink `#1A0A12`, ink2 `#5A3A4A`, brand `#B5124F`; hero `#B5124F` with lemon `#FFE45E`. Series `#B5124F`, `#1A0A12`, `#E0A800`.
- **Typography.** Syne 800 titles (-0.04em), Manrope body, DM Mono.
- **Shape.** Zero radius, square bars, 3 px rules.
- **Signature.** Every label is a lemon sticker, tilted 1.5 degrees.
- **Do / Don't.** Do keep one promise. Do not tilt anything else.

#### 14. Chambers (`chambers`): Lawyer
- **Overview.** A chambers letterhead. Aubergine and brass, a Garamond with italic emphasis, and the numbering of a contract.
- **Colors.** bg `#FFFFFF`, surface `#F6F1F5`, ink `#1E1620`, ink2 `#554958`, rule `#DCD1DC`, brand `#5B1E4F`; hero `#2A0F27` with brass `#DDBB78`. Series `#5B1E4F`, `#8A6414`, `#8E8190`.
- **Typography.** EB Garamond 500 titles (italic emphasis), Public Sans body, IBM Plex Mono.
- **Shape.** Zero radius, 1 px rules.
- **Signature.** A double hairline masthead on every page and sub-clause bullets lettered (a), (b), (c).
- **Do / Don't.** Do quote the clause on its own slide. Do not give legal advice in a sample; it is structure only.

#### 15. Drawing (`drawing`): Architect / designer
- **Overview.** A drawing sheet. White, grey concrete, black line, and one red, used the way a redline is used.
- **Colors.** bg `#FFFFFF`, surface `#F1F1EE`, ink `#111111`, ink2 `#53534F`, rule `#D3D3CE`, brand `#C8341E`; hero concrete `#E8E8E4`. Series `#111111`, `#C8341E`, `#8A8A86`.
- **Typography.** Jost 400 titles (300 on content), Jost body, DM Mono for dimensions.
- **Shape.** Zero radius, 1 px rules.
- **Signature.** Registration crosses in the four corners and a title-block footer with a boxed sheet number.
- **Do / Don't.** Do let drawings and the materials board fill the page. Do not add a second accent.

#### 16. Trainer (`trainer`): Trainer / community or faith educator (EN and AR)
- **Overview.** Lapis and gold, drawn from geometric tilework. A quiet eight-pointed star pattern frames the title slides and runs as a frieze along the top of content slides. Built for English and Arabic side by side.
- **Colors.** bg `#FFFFFF`, surface `#EDF2FA`, ink `#0F2240`, ink2 `#44577A`, rule `#CBD6E8`, brand `#1B4F9C`; hero lapis `#12305F` with gold `#F0C463`. Series `#1B4F9C`, `#0E8C86` (turquoise), `#B8892B`.
- **Typography.** Readex Pro 600 titles (Latin and Arabic share a rhythm), IBM Plex Sans body, IBM Plex Sans Arabic for Arabic body; `--f-ar-d` and `--f-ar-b` set the Arabic stacks.
- **Shape.** 14 px radius, 6 px bars, 1 px rules.
- **Signature.** An eight-pointed star tile on the title slides and a thin star frieze across the top of every other slide; everything mirrors under `dir="rtl"`.
- **Do / Don't.** Do put the same content in both languages on key slides. Do not set Arabic in italic or letter-spaced type.

#### 17. Sentinel (`sentinel`): Security engineer
- **Overview.** A security operations screen. Near-black blue-grey, one alert red-coral, and the furniture of an incident report: severity tags, a handling marking and a radar sweep on title slides.
- **Colors.** bg `#0F1419`, surface `#18202A`, ink `#E8EEF3`, ink2 `#9FB1C1`, rule `#2B3947`, brand `#FF5D4D` (text `#FF7A6B`); hero `#070A0D` with `#FF7A6B`. Severity series `#FF5D4D`, `#F5B83D`, `#5AA9E6`; hot `#F5B83D`.
- **Typography.** Overpass 800 titles (-0.02em), Overpass body, Overpass Mono for labels and times.
- **Shape.** 3 px radius, 2 px rules, thin bars.
- **Signature.** An outlined `SEV-2` tag before every label, a `TLP:AMBER INTERNAL` marking top right, and a faint radar sweep on title slides.
- **Do / Don't.** Do keep the red for severity and findings. Do not put real hostnames, IPs or customer data in a sample.

#### 18. Blueprint (`blueprint`): Civil / structural / mechanical engineer
- **Overview.** A drawing sheet. Pale cyanotype paper with a 24 px and 120 px grid, a title block in the corner, and blueprint-blue title slides with a drawn elevation.
- **Colors.** bg `#F4F8FC`, surface `#E3EDF7`, ink `#0B2545`, ink2 `#3C5675`, rule `#B6CCE3`, brand `#1558B0`, hot `#B4410B` (markup orange); hero `#0E3F84` with drafting yellow `#FFD166`.
- **Typography.** Archivo Narrow 700 titles (-0.005em), Archivo body, Azeret Mono for sheet text and values.
- **Shape.** Square corners, 1 px rules.
- **Signature.** A graph-paper grid behind content, a `SHEET S-101 REV B SCALE 1:50` title block bottom right, a sheet border with a bridge elevation on title slides.
- **Do / Don't.** Do show units and the governing check. Do not use the grid heavier than 16% brand; it is paper, not content.

#### 19. Civic (`civic`): Nonprofit / NGO / public policy
- **Overview.** Warm and trustworthy. Cream paper, a humane serif, terracotta for emphasis and deep green title slides with overlapping circles for community.
- **Colors.** bg `#FAF6EE`, surface `#F0E9DA`, ink `#1F2A24`, ink2 `#4E5A52`, rule `#D8CEB8`, brand `#B4472A`; hero `#1E4D3A` with `#F4B77E`. Series `#1E6B4E`, `#B4472A`, `#C9A227`.
- **Typography.** Petrona 600 titles (italic emphasis), Hanken Grotesk body, Red Hat Mono labels.
- **Shape.** 14 px radius, 2 px dotted footer rule.
- **Signature.** A three-colour strip along the top of content slides, a dotted footer rule, and three overlapping circles on title slides.
- **Do / Don't.** Do put a human number or quote first. Do not use real names or photos of children without written permission.

#### 20. Newsroom (`newsroom`): Journalist / editor
- **Overview.** A broadsheet page. Newsprint white, a text serif with heavy headlines, rules like column dividers, and one newspaper red.
- **Colors.** bg `#FBFAF6`, surface `#EFEDE4`, ink `#161616`, ink2 `#4A4944`, rule `#D3D0C3`, brand `#B3121B`; hero `#161616` with `#FF7468`. Series `#161616`, `#B3121B`, `#8A877C`.
- **Typography.** Libre Caslon Text 700 titles (italic emphasis), Work Sans body, Chivo Mono for datelines.
- **Shape.** Square corners, 2 px rules.
- **Signature.** A thick-and-thin double rule at the top with a small mono dateline, a hairline above the footer, and masthead rules framing title slides.
- **Do / Don't.** Do show the caveat and the source on their own rows. Do not state an unchecked number as fact.

#### 21. Estate (`estate`): Real estate / property
- **Overview.** Quiet premium. Warm white pages, deep navy title slides, and brass as the single accent, with a thin line-drawn skyline as the only decoration.
- **Colors.** bg `#FBF9F5`, surface `#F0EBE2`, ink `#1B2A33`, ink2 `#52606A`, rule `#DAD2C4`, brand brass `#8A5A1F`; hero `#14233A` with `#E3B873`. Series `#14233A`, `#8A5A1F`, `#7A8E9C`; hot `#B4381E`.
- **Typography.** Red Hat Display 700 titles (-0.025em), Red Hat Text body, Red Hat Mono labels.
- **Shape.** 6 px radius, 1 px rules.
- **Signature.** A brass tab hangs from the top edge of content slides, a small line-drawn skyline sits in the bottom corner, and a full skyline runs under title slides.
- **Do / Don't.** Do label every yield and return as a target or an estimate. Do not use more than one chart per slide.

#### 22. Menu (`menu`): Chef / restaurant / hospitality
- **Overview.** A printed menu card. Warm cream stock, a double-ruled border, brick-red numerals for the courses, and a dark bottle-green title page with a plate-ring motif.
- **Colors.** bg `#F7F0E2`, surface `#ECE2CC`, ink `#2B1B12`, ink2 `#5E4838`, rule `#D5C6A8`, brand `#8E2A17` (brick), hot `#9A4A12`; hero `#1D2A21` with gold `#E3B65B`. Series `#8E2A17`, `#3E6B4B`, `#A8895A`.
- **Typography.** Young Serif 400 titles (-0.01em), Alegreya Sans body, Fragment Mono for labels and the footer.
- **Shape.** Square corners, 1 px rules, a dotted footer rule.
- **Signature.** A fine double rule frames every content slide like a menu card, bullets are numbered `01`, `02` as courses, labels are tracked capitals with a short brick rule, and concentric plate rings sit in the corner of title slides.
- **Do / Don't.** Do number courses in the order they are served. Do not fill the frame; the margin is the card.

#### 23. People (`people`): HR / people operations
- **Overview.** Warm and human. A peach-tinted page, one plum, rounded shapes, and a trio of overlapping circles for the people in the room. Survey results stay readable without feeling clinical.
- **Colors.** bg `#FFF8F2`, surface `#F7E9DF`, ink `#2A1530`, ink2 `#5E4764`, rule `#EBD6CC`, brand `#7A2A7C`, hot `#B6430C`; hero `#36153D` with peach `#FFB38A`. Series `#7A2A7C`, `#0F766E`, `#9A8AA0`.
- **Typography.** Outfit 600 titles (-0.025em), Albert Sans body, Spline Sans Mono for labels.
- **Shape.** 18 px radius, 6 px bar corners, 1 px rules.
- **Signature.** Three overlapping circles in plum, teal and peach in the top corner of content slides, a soft three-circle bloom on title slides, and a filled dot before every label.
- **Do / Don't.** Do show the weak result as plainly as the strong one. Do not report any group smaller than five people.

#### 24. Wireframe (`wireframe`): UX / product designer
- **Overview.** A design canvas. Pale grey artboard with a dot grid, blue selection and a red redline for measurements. Title slides are an artboard in dark mode with selection handles.
- **Colors.** bg `#F4F5F7`, surface `#E6E8EC`, ink `#14171F`, ink2 `#4A5160`, rule `#CDD1D9`, brand `#2352D9`, hot `#C81E2B` (redline); hero `#12141A` with `#86A6FF`. Series `#2352D9`, `#D1242F`, `#8A91A0`.
- **Typography.** Epilogue 700 titles (-0.03em), Instrument Sans body, Martian Mono for labels and specs.
- **Shape.** 4 px radius, 1 px rules, dashed footer rule.
- **Signature.** A 32 px dot grid, a `Frame 01 / 1920 x 1080` tag above the artboard, a pale selection bar under the accent words, and on title slides a dashed frame with eight handles plus a thin red redline across the top.
- **Do / Don't.** Do keep the red for measurements and problems only. Do not draw handles on content slides; the artboard tag is enough.

#### 25. Pitchside (`pitchside`): Sports coach / performance analyst
- **Overview.** The touchline. Chalk-white pages edged by a pitch outline, mown grass stripes and a centre circle on title slides, and condensed capitals like a team sheet.
- **Colors.** bg `#F3F6F0`, surface `#E1E9DD`, ink `#0F2418`, ink2 `#455C4C`, rule `#C5D3C2`, brand `#0B6B35`, hot `#AE3A08` (bib orange); hero `#0D3B22` with lime `#C9F26B`. Series `#0B6B35`, `#D9480F`, `#7C8F82`.
- **Typography.** Barlow Condensed 700 titles in capitals, Barlow body, Barlow Condensed for labels and footers.
- **Shape.** 3 px radius, 2 px rules, square bars.
- **Signature.** A 3 px pitch outline with rounded corners and a penalty-area arc on the left, grass stripes with a halfway line and centre circle on title slides, and a bib-orange dot before each label like a player marker.
- **Do / Don't.** Do tie every statistic to a match phase. Do not set long sentences in capitals; headlines only.

#### 26. Archive (`archive`): Historian / museum curator
- **Overview.** A catalogue card. Warm museum-white stock with a red margin line and a punched hole, an accession tag top right, and a high-contrast Didone for the display. Title slides are slate with ruled index lines.
- **Colors.** bg `#F5F2EA`, surface `#E9E4D7`, ink `#1E2228`, ink2 `#545A63`, rule `#D3CCBA`, brand `#2C4A6E`, hot `#8F4A0C` (sepia); hero `#1B232D` with brass `#E3C47F`. Series `#2C4A6E`, `#9A5B16`, `#8A8F98`.
- **Typography.** Bodoni Moda 600 titles (italic emphasis), Alegreya body, Fragment Mono for labels and numbers.
- **Shape.** Square corners, 1 px rules, a double rule above the footer.
- **Signature.** An index-card margin line and punch hole on content slides, an `ACC. 2026.014` accession tag in the top right corner, tracked capital labels, and ruled index lines with a brass margin on title slides. The `case` layout works as an object record.
- **Do / Don't.** Do cite the source or the accession number for every object. Do not put the object caption in the title; keep it to the record.
<!-- LIBRARY:END -->
