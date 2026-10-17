# Keynote Pro manual (the engine behind present-in-html)

Paths below are the engine's. In this skill: `check.mjs` and `tools/*.mjs` are in `scripts/`; `template.html`,
`library/` and `examples/` are in `assets/`. Build tools and the sample decks mentioned here are not shipped with the skill.

- 1. Write a deck in 60 seconds
- 2. Layout cheat-sheet (shortest working snippet for each)
- 3. Deck recipes (theme, fonts, sequence, builds)
- 4. Theme design plans (DESIGN.md format)
- 5. Builds, transitions, Magic Move
- 6. Diagrams that draw
- 6b. Images
- 7. Presenter keys and tools
- 8. PDF and print
- 9. Right-to-left and Arabic
- 10. Checker
- 12. Checklist before you present
- 12a. Narration (recorded voice per slide)
- 12b. Slides that run
- 13. Known limits

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
