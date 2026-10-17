# Engine notes (read when the deck needs one of these)

Contents: slide links · live demos on slides · narration · `window.kp` API · slide attributes · old decks

## Slide links

Every slide has its own address: `my-deck.html#pricing`. It comes from `data-id="pricing"` on the `<section>`, otherwise from
the slide title, otherwise `#slide-7` (`#/7` and `#7` also work). Set `data-id` on slides people will link to (the ask, the
pricing, the demo) and keep ids short, lowercase, unique and stable across edits, because links already shared depend on them.
**K** copies the current slide's link; the outline (**O**) has a `#` per slide and "Links" copies them all.

## Slides that run: live demos on a slide

When a live demo beats a picture (product UI, calculator, simulation, sound, code to edit, a game, an embedded page, video,
camera), build it on the slide. `assets/examples/beyond-slides.html` has one working pattern for each; copy from it.
What those patterns get right, and why:
- Slide: `data-layout="two-column" data-fit="off" data-demo`, a `.col.bx-text` (label, h2, short text) and a `.col.bx-stage.bx-ui`.
- Wrap widgets in `.bx-ui` and stop `click` there, or every click inside the demo advances the deck. Text inputs stop
  `keydown` and blur on Enter/Escape, so typing does not trigger deck shortcuts.
- Colours come from theme tokens (`getComputedStyle(slide).getPropertyValue('--brand')` for canvas), re-read on slide enter,
  so pressing **S** restyles demos too.
- Animate, play sound, video or camera only while the slide has `.is-current` (watch its class with a MutationObserver) and stop
  on leave; otherwise a hidden slide burns CPU or keeps talking. Respect `prefers-reduced-motion`. Load iframes on enter
  (`data-src`). Camera and sound start from a button, never on their own.
- Text in widgets stays at 28px or more (the checker's floor). Wait for `window.kp.ready` before wiring.

## Narration

`<main class="deck" data-narration="audio/my-deck/">` plays `<folder>/<slide link id>.mp3` per slide (key **A** or the speaker
button, which stays hidden until the first slide's clip exists, so a deck can ship before its audio). While on, each slide
plays its clip, reveals its builds and advances when the clip ends; a slide without a clip shows a note and moves on after 3 s.
Write one transcript per slide and name clips by `data-id`.

## `window.kp` (after `kp.ready`)

`go(i, step)`, `next()`, `prev()`, `showAll(i)`, `refit()`, `outline()`, `count`, `state`, `slugs`, `link(i)`, `copyLink(i)`,
`applyLook(theme, fonts, persist, preview)` (fonts `''` = the theme's own), `themes`, `fonts` (id lists). The registry is read
from the marker comments in `<style id="kp-themes">`.

## Slide attributes and small facts

- Layouts (`data-layout`): agenda, appendix, ask, big-number, bullets, case, chart, closing, code, comparison, diagram, formula,
  full-bleed, image-left, image-right, materials, process, quiz, quote, references, rows, section, statement, stats, team,
  timeline, title, two-column. Unknown layouts are a checker error.
- `data-id` (link), `data-footer="off"`, `data-fit="off"`, `data-skip`, `data-tone="hero"`, `data-transition="push|move-in|none"`.
- An appendix slide (`data-layout="appendix"` or `data-appendix`) and everything after it are skipped in play: backup slides.
- `data-duration="20"` on `<main class="deck">` turns the presenter timer into a 20-minute countdown.
- Keys are ignored while focus is in an input, textarea, select or editable text, so interactive slides can take typing.
- An inline element at the very top of a slide trips the safe-area warning: put a label in `.label`, not a loose `<em>`.

## Old decks

`node "<skill base dir>/scripts/upgrade.mjs" deck.html` moves a deck made with an older engine onto the current one, keeping its slides and looks.
