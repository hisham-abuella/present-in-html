# Line figures and slide effects (read when a slide needs a drawing or one visual effect)

Contents: when to read · line figures (Hairline-style) · the effect contract · effects · restraint rules · sources

## 1. When to read it

- A slide needs a picture of a structure (layers, a stack, a module, a pipeline) and a photo or a `dg-*` box diagram is the wrong fit.
- A title, section or closing slide feels flat and you want one quiet effect.
- One element must pull the eye (the recommended card, the "now" point, the result box).

Do not read it for charts (the engine draws them), for builds (`data-build`), or for live demos (`engine.md`).
Everything here is plain CSS and inline SVG in the deck's own `<style>` (put it right after `SLIDES:START`, as
`assets/examples/beyond-slides.html` does). It works offline, follows every theme, and prints. No `!important`.

## 2. Line figures (Hairline-style)

Hairline draws isometric objects with thin lines, opaque plates and one highlighted stroke. Five of its ten rules are
about pointer response (hit areas, stagger, reach, clocks, sleeping loops) and do not apply to a still slide. The rest,
adapted for a projected 1920x1080 slide:

1. **One camera.** Use the 2:1 view (Hairline's `Cam(45, 0.5, S)`): ground edges run at about 26.6 degrees (2 across,
   1 down) and verticals stay vertical. With a scale `s`: `X = cx + (x - y)*s`, `Y = cy + (x + y)*s/2 - z*s`.
   Keep the same camera and scale on every figure in a deck.
2. **Silhouette plus one crease.** A solid is its outline and one dim line for its top's near edge. Never draw the
   vertical corner lines or the hidden back edges.
3. **Round the corners.** Hairline builds solids from rounded rings. At least use `stroke-linejoin:round;
   stroke-linecap:round`.
4. **Paint back to front.** Plates are opaque, filled with the slide colour, so they hide what is behind them. Dashed
   guides go first, so they only show in the gaps.
5. **One highlight.** Exactly one stroke (or dot) is in the highlight tone, and it means one thing (the layer the slide
   is about). Never a fill, glow or shadow.
6. **Rest is the picture.** The still figure must read alone: slightly exploded, leaning, uneven. Never a flat grid.
   It is what prints, what thumbnails show, and what reduced-motion users see.
7. **No words inside.** Labels go in the slide text beside the figure (the `h2`, a list, the notes). Number things with dots.
8. **Stays in its frame.** Nothing leaves the 5:4 box. The silhouette still reads at 240 px wide (Hairline's test).

**Tones.** Hairline has five colour tokens and a stroke width. Its `hi` is the strongest ink (near-black on its light
theme); on a slide it becomes the brand highlight. Map them onto the engine's tokens, so the figure follows the theme,
hero slides and dark themes by itself:

| Hairline | Role | Slide value |
| --- | --- | --- |
| plate | fill of solids | `var(--bg)` (or `var(--bg2)` when the figure sits on a panel) |
| edge | silhouettes | `color-mix(in srgb, var(--ink) 80%, var(--bg))` |
| mid | creases, inner lines | `color-mix(in srgb, var(--ink) 45%, var(--bg))` |
| lo | dashed guides, inactive dots | `color-mix(in srgb, var(--ink) 25%, var(--bg))` |
| hi | the one highlight | `var(--hot)` (the diagram highlight; it defaults to `--brand`) |
| stroke | width | 0.9px in Hairline; on a slide 3 (edge), 2 (mid, lo), 4 (hi) |

For a monochrome figure, as Hairline draws it, use `var(--ink)` as hi and drop edge to 60%.

**Frame and size.** viewBox `0 0 800 640` (5:4, twice Hairline's 400x320), so one unit is one stage pixel at 800 wide
and the stroke widths above are real pixels. On a slide, 640 to 800 px wide, for example one `.col` of a `two-column`
slide. Below 480 px wide the creases vanish on a projector.

**Accessibility.** The `<figure>` gets `role="img"` and an `aria-label` that says what it shows and what is highlighted;
the `<svg>` inside gets `aria-hidden="true"`.

**Example: an exploded stack of three layers, middle one highlighted.** Copy the CSS once per deck.

```css
.hl{--hl-plate:var(--bg);--hl-edge:color-mix(in srgb,var(--ink) 80%,var(--bg));--hl-mid:color-mix(in srgb,var(--ink) 45%,var(--bg));
  --hl-lo:color-mix(in srgb,var(--ink) 25%,var(--bg));--hl-hi:var(--hot);margin:0;max-width:800px}
.hl svg{display:block;width:100%;height:auto;overflow:visible}
.hl path{fill:var(--hl-plate);stroke:var(--hl-mid);stroke-width:2;stroke-linejoin:round;stroke-linecap:round}
.hl .sil{stroke:var(--hl-edge);stroke-width:3}  .hl .crease{fill:none}
.hl .guide{fill:none;stroke:var(--hl-lo);stroke-dasharray:4 10}
.hl .hi{stroke:var(--hl-hi);stroke-width:4}  .hl .dot{stroke:none;fill:var(--hl-hi)}
```

```html
<section class="slide" data-layout="two-column">
  <h2>The rules live in the middle layer</h2>
  <div class="col"><h3>Three layers</h3><p>Interface on top, rules in the middle, storage below.</p></div>
  <div class="col">
    <figure class="hl" role="img" aria-label="Three stacked layers, pulled apart; the middle layer is highlighted">
      <svg viewBox="0 0 800 640" aria-hidden="true">
        <path class="guide" d="M160 208V410M640 208V410M400 328V530"/>
        <path class="sil" d="M400 290L640 410V438L400 558L160 438V410Z"/><path class="crease" d="M160 410L400 530L640 410"/>
        <path class="sil hi" d="M400 175L640 295V323L400 443L160 323V295Z"/><path class="crease" d="M160 295L400 415L640 295"/>
        <path class="sil" d="M400 60L640 180V208L400 328L160 208V180Z"/><path class="crease" d="M160 180L400 300L640 180"/>
      </svg>
    </figure>
  </div>
</section>
```

Each slab is a hexagon (top rhombus plus 28 px of thickness) and one crease; the gaps between slabs are the "explode".
To walk through the layers, repeat the slide and move `hi` to the next slab; the dissolve reads as the highlight moving.
Do not put `data-build="draw"` on a group with dashed guides: the engine gives every shape in it `pathLength="1"` and
its own dash (`.kd`), which breaks the guides' dashes. `data-build="fade"` on a `<g>` is fine.

**The real package.** `@lucasmarkes/hairline` (v0.5.x, MIT, "Copyright (c) 2026 Lucas Marques") has 33 interactive
figures. Use it only when the deck will be shown online: it loads as an ES module from npm or a CDN (`esm.sh`), so an
offline deck shows nothing. Each figure is a named function (`import {terrain} from '@lucasmarkes/hairline'`);
`terrain(el, {label, intensity, theme})` mounts it and returns `{update, destroy}`. Leave `play` off (its default):
it animates on its own until the pointer arrives. Set its tokens
from the theme on the container (`--hairline-plate:var(--bg); --hairline-hi:var(--hot); --hairline-edge:...;
--hairline-stroke:2`). Its figures answer the pointer, so wrap the stage in `.bx-ui` and stop `click` there, as
`engine.md` says for live demos. For an offline deck, draw the figure inline as above. If you copy a figure's SVG
or code from the package, keep the MIT notice in an HTML comment next to it.

## 3. The effect contract (every animated effect below uses it)

The engine marks the slide on screen with `.is-current` (added when the transition ends; at once when there is no
transition or motion is reduced). The incoming slide has `.is-active` without `.is-current` while it dissolves or
pushes in. There is no slide-enter event; key off these classes. Rules:

- **Rest = final state.** The element's normal CSS is the finished look. Only a `@keyframes ... from{}` hides it.
  So print, overview thumbnails, the presenter window and the checker all see the finished slide.
- **Animate only real, live slides:** `html:not(.kp-all) .deck>.slide:is(.is-active,.is-current) …`.
  `.deck>.slide` skips the clones in the overview and presenter window (they live in `.kp-frame`);
  `html:not(.kp-all)` skips `kp.showAll()`, which the checker uses before it measures and takes shots.
- **Hold while arriving:** every animation ends in `var(--fx-play,running)`, and one rule sets `--fx-play:paused` on
  the arriving slide. The custom property inherits into children and pseudo elements, so the effect waits until the
  slide has landed. It replays each time the slide is entered, not on build clicks.
- **Wrap it in** `@media screen and (prefers-reduced-motion:no-preference){…}`. Print and reduced motion then get the
  rest state with no extra rules. (The engine's `html.kp-rm *{animation:none}` does not reach `::before`/`::after`;
  the media block does.)

```css
.deck>.slide.is-active:not(.is-current){--fx-play:paused}   /* once per deck */
@media screen and (prefers-reduced-motion:no-preference){   /* the pattern; each effect below has its own block */
  html:not(.kp-all) .deck>.slide:is(.is-active,.is-current) .fx-x{animation:fx-x .5s cubic-bezier(.2,.7,.2,1) both var(--fx-play,running)}
}
```

Backgrounds go on the slide's `::after` with `z-index:-1` and `isolation:isolate` on the slide (themes use `::before`
on some slides; `::after` is free). Put the effect class on the `<section>`.

## 4. Effects translated to vanilla CSS/SVG

**1. Dot or grid paper** (static). For title, section, closing, or the empty side of a diagram. Never under body text.
```css
.fx-dots{isolation:isolate;--fx-x:75%}  [dir="rtl"] .fx-dots{--fx-x:25%}
.fx-dots::after{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
  background:radial-gradient(color-mix(in srgb,var(--ink) 22%,transparent) 2px,transparent 2.5px) 0 0/40px 40px;
  mask-image:radial-gradient(ellipse 60% 70% at var(--fx-x) 35%,#000 20%,transparent 75%)}
```
Grid: two `linear-gradient(... 1px, transparent 1px)` layers at 80px, ink at 10%, masked to fade downward.
No motion, so nothing to fall back from. Slides print with exact colours, so it prints as shown.

**2. Spotlight** (title, statement). A soft brand glow from a top corner, away from the text.
```css
.fx-spot{isolation:isolate;--fx-x:20%}  [dir="rtl"] .fx-spot{--fx-x:80%}
.fx-spot::after{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
  background:radial-gradient(ellipse 50% 65% at var(--fx-x) 0,color-mix(in srgb,var(--brand) 30%,transparent),transparent 70%)}
@keyframes fx-in{from{opacity:0;transform:translateY(-4%) scale(.94)}}
@media screen and (prefers-reduced-motion:no-preference){
  html:not(.kp-all) .deck>.slide.fx-spot:is(.is-active,.is-current)::after{animation:fx-in .6s cubic-bezier(.2,.7,.2,1) both var(--fx-play,running)}}
```

**3. Aurora** (title, closing only). Three overlapping radial glows that drift in once and stop.
```css
.fx-aurora{isolation:isolate}
.fx-aurora::after{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background-repeat:no-repeat;background-image:
  radial-gradient(40% 50% at 20% 15%,color-mix(in srgb,var(--brand) 30%,transparent),transparent 70%),
  radial-gradient(35% 45% at 60% 5%,color-mix(in srgb,var(--brand) 45%,var(--ink) 15%),transparent 70%),
  radial-gradient(45% 40% at 90% 30%,color-mix(in srgb,var(--brand) 18%,transparent),transparent 70%)}
@keyframes fx-drift{from{opacity:0;background-position:-160px -80px}}
@media screen and (prefers-reduced-motion:no-preference){
  html:not(.kp-all) .deck>.slide.fx-aurora:is(.is-active,.is-current)::after{animation:fx-drift 6s cubic-bezier(.2,.7,.2,1) both var(--fx-play,running)}}
```
Keep the pseudo at `inset:0`: a negative inset or a transform that grows it makes the slide "scroll" in the checker.

**4. Lamp header** (section slides). A lit line above the heading and a soft cone under it.
```css
.fx-lamp{isolation:isolate}  .fx-lamp h2{position:relative}
.fx-lamp h2::before{content:"";position:absolute;top:-64px;inset-inline-start:0;width:min(70%,880px);height:4px;border-radius:2px;
  background:var(--brand);box-shadow:0 0 28px 2px color-mix(in srgb,var(--brand) 60%,transparent);transform-origin:left}
[dir="rtl"] .fx-lamp h2::before{transform-origin:right}
.fx-lamp h2::after{content:"";position:absolute;z-index:-1;top:-62px;inset-inline-start:0;width:min(70%,880px);height:360px;
  pointer-events:none;background:radial-gradient(60% 100% at 50% 0,color-mix(in srgb,var(--brand) 24%,transparent),transparent 75%)}
@keyframes fx-grow{from{transform:scaleX(0)}}
@media screen and (prefers-reduced-motion:no-preference){
  html:not(.kp-all) .deck>.slide.fx-lamp:is(.is-active,.is-current) h2::before{animation:fx-grow .6s cubic-bezier(.65,0,.35,1) both var(--fx-play,running)}
  html:not(.kp-all) .deck>.slide.fx-lamp:is(.is-active,.is-current) h2::after{animation:fx-in .6s ease .2s both var(--fx-play,running)}}
```
It uses `fx-in` from the spotlight; copy that keyframe too.

**5. Word reveal** ("text generate"; title `h1`, statement `h2`). Words rise out of a blur, 60 ms apart, on slide entry.
For a click-by-click reveal use the engine's builds instead. A tiny script wraps each word (never letters, so Arabic
stays joined). It keeps the spaces as text, so `textContent` (the slide title, link slug and outline) is unchanged.
An `<em>` moves as one word, because splitting it breaks its gradient fill. Put the script after the last slide.
```css
.fx-w{display:inline-block}
@keyframes fx-up{from{opacity:0;transform:translateY(.3em);filter:blur(8px)}}
@media screen and (prefers-reduced-motion:no-preference){
  html:not(.kp-all) .deck>.slide:is(.is-active,.is-current) .fx-w{animation:fx-up .5s cubic-bezier(.2,.7,.2,1) calc(min(var(--i),12)*60ms) both var(--fx-play,running)}}
```
```html
<script>
document.querySelectorAll('.fx-words').forEach(h => { let i = 0;
  const walk = n => [...n.childNodes].forEach(c => {
    if (c.nodeType === 1) { if (c.matches('em')) { c.classList.add('fx-w'); c.style.setProperty('--i', i++); } else walk(c); return; }
    if (c.nodeType !== 3 || !c.nodeValue.trim()) return;
    const f = document.createDocumentFragment();
    c.nodeValue.split(/(\s+)/).forEach(w => { if (!w) return; if (!w.trim()) return f.append(w);
      const s = document.createElement('span'); s.className = 'fx-w'; s.style.setProperty('--i', i++); s.textContent = w; f.append(s); });
    c.replaceWith(f); });
  walk(h); });
</script>
```
Do not combine with `data-magic` on the same heading.

**6. Flip words** (title `.sub` only). Two or three words pass, the last one stays. Never in the `h1`/`h2`: the engine
reads the title from the heading's text, and the passing words would end up in the outline and the link.
```html
<p class="sub">Built to be <span class="fx-flip"><span aria-hidden="true" style="--i:0">fast</span><span aria-hidden="true" style="--i:1">clear</span><span style="--i:2">calm</span></span> on any screen.</p>
```
```css
.fx-flip{display:inline-grid}  .fx-flip>span{grid-area:1/1;color:var(--brand-text)}  .fx-flip>span:not(:last-child){visibility:hidden}
@keyframes fx-pass{0%{visibility:visible;opacity:0;transform:translateY(.4em)}20%,80%{visibility:visible;opacity:1;transform:none}100%{visibility:hidden;opacity:0;transform:translateY(-.4em)}}
@keyframes fx-land{from{opacity:0;transform:translateY(.4em)}}
@media screen and (prefers-reduced-motion:no-preference){
  html:not(.kp-all) .deck>.slide:is(.is-active,.is-current) .fx-flip>span{animation:fx-pass .9s cubic-bezier(.2,.7,.2,1) calc(var(--i)*.9s) both var(--fx-play,running)}
  html:not(.kp-all) .deck>.slide:is(.is-active,.is-current) .fx-flip>span:last-child{animation-name:fx-land}}
```
Pick words of similar length; the box is as wide as the longest. It runs once per entry, no loop.

**7. Glowing border** (the one card that matters: a `.steps` item or a bento tile). Only on boxes with their own
padding; a `.stat` has none, so the ring touches its text. The card keeps its solid background, so the checker still
measures its text. Comparison tables already have `.rec`; do not add this there.
```css
.fx-glow{border-color:var(--brand);box-shadow:0 0 0 2px var(--brand),0 0 60px -6px color-mix(in srgb,var(--brand) 60%,transparent)}
@keyframes fx-glow{from{box-shadow:0 0 0 0 transparent,0 0 0 0 transparent}}
@media screen and (prefers-reduced-motion:no-preference){
  html:not(.kp-all) .deck>.slide:is(.is-active,.is-current) .fx-glow{animation:fx-glow .6s ease .3s both var(--fx-play,running)}}
```

**8. Timeline beam** (timeline layout). A brand line runs from the start to the `.now` point and stays there, so the
rest state says "we are here". Set `--to` to the now item's index `k` of `n`: `calc(100% / n * k + 12px)`.
```html
<ol class="timeline fx-beam" style="--to:calc(100% / 4 * 1 + 12px)"> … <li class="now"> … </ol>
```
```css
.timeline.fx-beam::before{content:"";position:absolute;z-index:1;top:calc(var(--t-small)*1.4 + 28px);margin-top:-2px;height:4px;inset-inline-start:0;
  width:var(--to,50%);border-radius:2px;background:linear-gradient(to right,transparent,var(--brand) 30%);transform-origin:left}
[dir="rtl"] .timeline.fx-beam::before{background:linear-gradient(to left,transparent,var(--brand) 30%);transform-origin:right}
@media screen and (prefers-reduced-motion:no-preference){
  html:not(.kp-all) .deck>.slide:is(.is-active,.is-current) .fx-beam::before{animation:fx-grow .9s cubic-bezier(.65,0,.35,1) .2s both var(--fx-play,running)}}
```
`top` is the dot centre (the `time` row plus half the 56px dot row). It uses `fx-grow` from the lamp.
With `data-build="list"` on the same timeline the beam arrives before the items; use one or the other.

**9. Signal pulse** (diagram). A short bright dash runs once along a connector, then the plain line remains. Draw the
path twice; the copy carries the pulse. Keep it out of `data-build="draw"` groups. The pulse runs in the path's own
direction and SVG does not mirror in RTL, so in an Arabic deck draw the path from right to left.
```html
<path class="dg-line" d="M330 275H1350"/><path class="dg-line hot fx-pulse" pathLength="1" d="M330 275H1350"/>
```
```css
.fx-pulse{stroke-dasharray:.12 1.12;stroke-dashoffset:-1}   /* at rest the dash sits past the end: invisible */
@keyframes fx-run{from{stroke-dashoffset:.12}}
@media screen and (prefers-reduced-motion:no-preference){
  html:not(.kp-all) .deck>.slide:is(.is-active,.is-current) .fx-pulse{animation:fx-run 1s cubic-bezier(.65,0,.35,1) .4s both var(--fx-play,running)}}
```

**10. Marker sweep** ("hero highlight"; statement slides). A tint sweeps under two or three key words.
```css
.fx-mark{background:linear-gradient(color-mix(in srgb,var(--brand) 24%,var(--bg)) 0 0) no-repeat 0 88%/100% .38em}
[dir="rtl"] .fx-mark{background-position:100% 88%}
@keyframes fx-mark{from{background-size:0 .38em}}
@media screen and (prefers-reduced-motion:no-preference){
  html:not(.kp-all) .deck>.slide:is(.is-active,.is-current) .fx-mark{animation:fx-mark .6s cubic-bezier(.65,0,.35,1) .3s both var(--fx-play,running)}}
```
The checker skips contrast for text with a background image or gradient, so check this one by eye in every theme.

**11. Bento grid** (a features overview). Static tiles of mixed width on a 6-column grid; one tile is the brand tile.
Put it on a `two-column` slide after the `h2`, with no `.col`. `data-build="list"` on it builds tile by tile.
```css
.fx-bento{flex:1;min-height:0;display:grid;grid-template-columns:repeat(6,1fr);grid-auto-rows:1fr;gap:28px}
.fx-bento>*{min-width:0;display:flex;flex-direction:column;justify-content:flex-end;padding:36px 40px;background:var(--bg2);border-radius:var(--radius)}
.fx-bento .w2{grid-column:span 2} .fx-bento .w3{grid-column:span 3} .fx-bento .w4{grid-column:span 4}
.fx-bento h3{font-size:44px;margin-block-end:10px}  .fx-bento p{font-size:30px;line-height:1.35;color:var(--ink2)}
.fx-bento .hot{background:var(--brand);color:var(--on-brand)}  .fx-bento .hot p{color:var(--on-brand)}
```
Four or five tiles; each row adds up to 6. Text stays at 28px or more.

**12. Before/after slider** (one comparison photo pair). Use the live-demo slide from `engine.md`
(`data-layout="two-column" data-fit="off" data-demo`, a `.col.bx-stage.bx-ui`). A hidden range input does the work,
so it is keyboard-accessible and deck keys are ignored while it has focus. Images are local files or data URIs.
```html
<figure class="fx-cmp" dir="ltr"><img src="before.jpg" alt="Before: …"><img src="after.jpg" alt="After: …">
  <input type="range" min="0" max="100" value="50" aria-label="Move the split between before and after"></figure>
```
```css
.fx-cmp{position:relative;margin:0;aspect-ratio:4/3;overflow:hidden;border-radius:var(--radius)}
.fx-cmp img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}  .fx-cmp img+img{clip-path:inset(0 0 0 var(--x,50%))}
.fx-cmp::after{content:"";position:absolute;inset-block:0;left:var(--x,50%);width:4px;margin-left:-2px;background:var(--bg);pointer-events:none}
.fx-cmp input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:ew-resize}
.fx-cmp:has(input:focus-visible){outline:4px solid var(--brand-text);outline-offset:4px}
```
```js
document.querySelectorAll('.fx-cmp').forEach(f => { const r = f.querySelector('input');
  r.addEventListener('input', () => f.style.setProperty('--x', r.value + '%'));
  f.closest('.bx-ui')?.addEventListener('click', e => e.stopPropagation()); });
```
`dir="ltr"` keeps "before" on the left in Arabic decks too. No motion; print shows the split where it was left.

## 5. Restraint rules

- **One effect per slide.** A figure counts as one. Never stack a glow on an aurora on a word reveal.
- **Where:** title, section, closing and statement slides, or to point at one element (the card, the now point, the
  result). Content slides get at most a glowing border, a beam or a pulse.
- **Never behind text that must be read.** Glows sit in corners and fade before the text block; dots and grids are masked
  away from it. Keep brand mixes at 30% or less.
- **Short.** Entrances 600 ms or less; a line that draws up to 1 s (the engine's own draw); word stagger capped at
  about 1.2 s in total. The aurora's one slow drift is the only exception and only on title or closing.
- **No loops.** Everything runs once per entry and ends still. Nothing infinite on content slides; nothing moves while
  the speaker talks.
- **Contrast stays 4.5:1.** The checker skips text whose element or ancestor has a background image or gradient, so
  effects go on pseudo elements, not on the slide or card background. It ignores pseudo elements, so it measures text
  against the background colour, not the glow. Run `node check.mjs deck.html --themes --shots out/` and look at the shots.
- **Rest state complete.** Turn on reduced motion and print to PDF once: every effect must look finished in both.
- **Themes, hero and RTL.** Use only tokens (`--bg`, `--ink`, `--brand`, `--hot`, `--rule-strong`); hero slides remap
  them for you. Mirror anything directional with `[dir="rtl"]` or logical properties.

## 6. Sources

- Hairline by Lucas Marques: https://hairline.lucasmarkes.com (docs, `/llms.txt`, `/skills`),
  https://github.com/lucasmarkes/hairline (MIT; the ten rules are in `skills/hairline-create/rules.md`),
  essay: https://lucasmarkes.com/lab/hairline
- Aceternity UI components (React, Tailwind, Motion), used for ideas only; all code here is our own:
  https://ui.aceternity.com/components (spotlight, aurora-background, lamp-effect, text-generate-effect, flip-words,
  glowing-effect, timeline, compare, grid-and-dot-backgrounds, bento-grid, hero-highlight, tracing-beam)
