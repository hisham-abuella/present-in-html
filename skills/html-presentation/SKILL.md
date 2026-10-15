---
name: html-presentation
description: Build professional, self-contained HTML presentations (Keynote Pro, 16:9, one file, works offline, prints to PDF). Use when the user asks for a presentation, slide deck, slides, keynote, pitch deck, investor pitch, board or quarterly review, status update, tech talk, conference talk, lecture, training, workshop, thesis defence, clinical case or grand rounds, or "PowerPoint-like HTML". Also covers Arabic/RTL decks. Older formats (markdown keynote index.html, Stories for vertical/mobile, reveal.js Course) are used only when asked for by name or need.
---

# HTML presentations: Keynote Pro by default

Keynote Pro is one HTML file: fixed 16:9 stage, 6 core themes plus a look library (26 profession themes, 26 extra font
pairings), auto-fit type, builds, Magic Move, a link to every slide, overview, presenter window, marker, PDF print, a checker
and a text editor. No framework, no build step, opens from `file://`. You write plain HTML slides.

## 0. Find the files (do this first)

Keynote Pro lives in a folder called `keynote-pro/`. Locate it from the skill's base directory (the path shown when this skill loads):

```bash
KP=<skill base dir>/keynote-pro                       # manual install (~/.claude/skills/html-presentation/ or ./.claude/skills/html-presentation/)
[ -f "$KP/template.html" ] || KP=<skill base dir>/../../keynote-pro   # plugin install (skills/html-presentation/ inside the repo)
ls "$KP/template.html" "$KP/check.mjs" "$KP/README.md"
```

Never edit files inside `$KP`. Copy `template.html` to the user's working folder as the deck; `check.mjs` finds the template beside
itself and Playwright by itself. Images the deck uses go next to the deck (or copy from `$KP/assets/`, which holds illustrative stock images).

## 1. Route the request

| The user wants | Use |
|---|---|
| Anything called deck, slides, talk, pitch, review, lecture, training | **Keynote Pro** (this file) |
| Vertical, phone-first, social-style slides | Stories: read `legacy-formats.md`, template `stories-template.html` |
| The old markdown keynote (`index.html`) or a `samples/` style | `legacy-formats.md` |
| LMS-style course (sidebar, progress, reveal.js widgets) | Course: `legacy-formats.md` |

Only leave Keynote Pro when the user names one of those or clearly needs it. Do not offer them otherwise.

## 2. Ask little, decide the rest

Ask ONLY what you cannot know: (1) audience and occasion (who, how long), (2) the real facts and numbers they want shown.
Decide everything else yourself: theme, fonts, recipe, slide count (about one per minute), builds. State the choice in one line:
"Boardroom theme, board-review recipe, 11 slides, count-up on the KPIs." Then build. Do not run a questionnaire.

Never invent numbers, names, quotes or sources. If data is missing, use clearly labelled placeholders ("illustrative", "TBC")
and say so in your delivery message. A brand colour is a one-line `--brand` override in the deck's `<style>`; for offline use set
`data-fonts="system"`.

## 3. Pick the look: need -> recipe -> theme -> fonts

Recipes and slide sequences are in `$KP/README.md` section 3; profession themes in section 14. `data-theme` and `data-fonts` go on `<html>`;
leave `data-fonts` empty to use the theme's own pairing.

The template holds only the 6 core themes and 9 core pairings. Every other look lives in the library (`$KP/library/themes/`,
`$KP/library/fonts/`, index in `$KP/library/looks.json`) and is copied INTO the deck, so the deck stays one file:

```bash
node "$KP/tools/add-look.mjs" --list                                  # every library theme and pairing (id, label)
node "$KP/tools/add-look.mjs" my-deck.html --theme ledger             # add one (the deck's own data-theme/data-fonts are always added)
node "$KP/tools/add-look.mjs" my-deck.html --theme ledger,partner --fonts bitter   # several, for the S panel's "Library" group
```

Add the deck's library theme BEFORE running the checker (an unknown `data-theme` falls back to the first core theme). Never paste
library CSS into `template.html`; new themes and pairings go in `$KP/library/` (README section 11).

| Need | Recipe | `data-theme` | `data-fonts` |
|---|---|---|---|
| Product launch, keynote talk | Product launch | `keynote-black` (cinematic) or `keynote-white` | theme default |
| Quarterly or board review | Quarterly / board review | `boardroom` | theme default |
| Tech talk, conference | Tech talk | `swiss` or `studio` | theme default |
| Training, course session | Training / course | `studio` or `editorial` | theme default |
| Investor pitch (generic) | Investor pitch | `keynote-white` | `grotesk` |
| Weekly status | Weekly status update | `editorial` or `keynote-white` | theme default |
| Electrical / wireless engineer | Section 14 row 1 | `spectrum` | `plexcond` |
| Software engineer | row 2 | `commit` | `geist` |
| Data scientist / analyst | row 3 | `notebook` | `franklin` |
| Doctor / clinician (cases) | row 4 | `clinic` | `figtree` |
| Medical / scientific researcher | row 5 | `labbook` | `stix` |
| School teacher | row 6 | `schoolyard` | `lexend` |
| University lecturer | row 7 | `chalk` | `literata` |
| Student, thesis defence | row 8 | `thesis` | `fira` |
| Startup founder pitch (with ask) | row 9 | `pitch` | `bricolage` |
| Product manager, roadmap | row 10 | `roadmap` | `jakarta` |
| Executive / consultant | row 11 | `partner` | `gelasio` |
| Finance professional | row 12 | `ledger` | `bitter` |
| Marketing / sales | row 13 | `campaign` | `syne` |
| Lawyer, legal brief | row 14 | `chambers` | `garamond` |
| Architect / designer | row 15 | `drawing` | `jost` |
| Trainer, community or faith educator, Arabic + English | row 16 | `trainer` | `readex` |
| Cybersecurity, threat model, incident | row 17 | `sentinel` | theme default |
| Civil / structural / mechanical engineer | row 18 | `blueprint` | theme default |
| Nonprofit, NGO, public policy | row 19 | `civic` | theme default |
| Journalist, editor, investigation | row 20 | `newsroom` | theme default |
| Real estate, property | row 21 | `estate` | theme default |
| Chef, restaurant, hospitality | row 22 | `menu` | theme default |
| HR, people operations, all-hands | row 23 | `people` | theme default |
| UX / product designer, design crit | row 24 | `wireframe` | theme default |
| Sports coach, performance analyst | row 25 | `pitchside` | theme default |
| Historian, museum curator, humanities | row 26 | `archive` | theme default |

When a profession row fits, read its layout recipe in README section 14 and the matching deck in `$KP/library/` as a model.
If two fit, prefer the profession theme. Preview alternatives with `$KP/fonts.html` or press **S** in the deck.

## 4. Workflow (commands verbatim)

```bash
cp "$KP/template.html" my-deck.html          # 1. new deck, beside the user's files (then add-look.mjs if the theme is a library one)
# 2. in my-deck.html: set data-theme / data-fonts on <html>; set <title> AND data-title on <main class="deck"> to the same text;
#    set lang (and dir="rtl" for Arabic) on <html>; delete every sample slide between SLIDES:START and SLIDES:END
# 3. story first: the title, the one-sentence story, then one claim per slide as its <h2>
# 4. add the supporting snippet per slide (README section 2 cheat-sheet), then <aside class="notes"> on EVERY slide
node "$KP/check.mjs" my-deck.html            # 5. check; fix every error; re-run. At most 3 passes, then cut content, don't tune CSS
node "$KP/check.mjs" my-deck.html --themes   # 6. same checks in every theme (someone will press S)
node "$KP/check.mjs" my-deck.html --shots shots/   # 7. PNG per slide (toolbar hidden): LOOK at title, a chart, a dense slide, the closing
node "$KP/check.mjs" my-deck.html --outline  # optional: the deck as a list, for a final read-through
```

The checker prints `slide n: element, what is wrong, fix:`. It catches overflow, text under 28px (20px for labels and chart text), contrast under 4.5:1,
unknown `data-layout`, more than 6 bullets or 40 words in one, missing image or alt, bad `data-chart` or `data-values`, slides without a title,
console errors (errors, exit 1) and slides without notes (warning). Fix the cause named in `fix:`; never silence a check. After 3 failing passes,
shorten the text or split the slide. If Playwright is missing it prints the exact `PLAYWRIGHT_MODULE=... CHROME_PATH=...` line to use; install it
outside the skill folder (`mkdir -p ~/.kp-tools && cd ~/.kp-tools && npm i playwright && npx playwright install chromium`).

### Large decks: build in parallel with subagents, assemble at the end

For more than about 15 slides (or several distinct sections), do not write the deck in one pass:

1. **You** write the plan first: title, the one-sentence story, the look (theme, fonts), and the outline split into parts of
   4 to 8 slides, each with its claim per slide, layouts, the facts it may use, and a `data-id` per slide. Save it as `parts/PLAN.md`.
2. **Spawn one subagent per part, in parallel** (one message, several Agent calls). Each gets: the PLAN, its own part, the path to
   `$KP/README.md` section 2 (cheat-sheet) and one finished model deck, and these rules: write ONLY `<section class="slide">` elements
   to `parts/NN-name.html` (`01-`, `02-` ... so they sort); no `<html>`, `<style>` or `<script>`; notes on every slide; use only the facts
   given; the `data-id`s from the plan; no CSS tuning.
3. **You** assemble and check:
   ```bash
   node "$KP/tools/assemble.mjs" my-deck.html parts/*.html --theme ledger --title "Q3 review"   # [--lang ar --dir rtl] [--looks a,b|all]
   node "$KP/check.mjs" my-deck.html --shots shots/
   ```
   `assemble.mjs` flags parts that hold page markup, parts with no slides and duplicate `data-id`s. Then read the deck start to end
   yourself: same voice, no repeated points, section breaks in place, numbers that agree across parts. Fix in the deck, not in the parts.

### Slide links

Every slide has its own address: `my-deck.html#pricing`. It comes from `data-id="pricing"` on the `<section>` (set it on slides
people will link to: the ask, the pricing, the demo), otherwise from the slide title, otherwise `#slide-7`; `#/7` and `#7` also
work. **K** (or the link button) copies the current slide's link; the outline (**O**) has a `#` button per slide and "Links" copies
every link with its title. Keep `data-id`s short, lowercase, unique and stable when you edit a deck.

### Small text edits later: the editor

`$KP/editor.html` opens any Keynote Pro deck (drop the file, or serve the folder and open `editor.html?deck=path/deck.html`).
Click text on a slide and type, edit speaker notes, find and replace across slides, change the title; Save writes the same file back
(Chrome/Edge) or downloads it. Only the edited text changes in the file. Tell users about it when you deliver; structural changes
(new slides, layouts, charts) still come back to you.

### Slides that run: live demos on a slide

When a live demo beats a picture (a product UI, a calculator, a simulation, sound, code to edit, a game, an embedded page,
a video, a camera), build it on the slide. `$KP/examples/beyond-slides.html` (source `examples/src/beyond-slides.html`) has one
working pattern for each; copy from it. The rules it follows:
- Slide: `data-layout="two-column" data-fit="off" data-demo`, a `.col.bx-text` (label, h2, short text) and a `.col.bx-stage.bx-ui`.
- Wrap every widget in `.bx-ui` and stop `click` there, or a click advances the deck. Text inputs stop `keydown` and blur on Enter/Escape.
- Colours from tokens only (`getComputedStyle(slide).getPropertyValue('--brand')` for canvas), re-read when the slide is entered, so S restyles demos too.
- Animate, play sound, video or camera only while the slide has `.is-current` (a MutationObserver on its class); stop on leave.
  Respect `prefers-reduced-motion`. Load iframes on enter (`data-src`). Camera and sound start from a button, never on their own.
- Text in widgets stays at 28px or more. Wait for `window.kp.ready` before wiring (the script sits with the slides).

### Engine facts (to avoid guessing)

- Layouts (`data-layout`): agenda, ask, big-number, bullets, case, chart, closing, code, comparison, diagram, formula, full-bleed,
  image-left, image-right, materials, process, quiz, quote, references, rows, section, statement, stats, team, timeline, title,
  two-column. `data-appendix` starts the backup slides. Unknown layouts are a checker error.
- Slide attributes: `data-id` (link), `data-footer="off"`, `data-fit="off"`, `data-skip`, `data-tone="hero"`, `data-transition`.
- Narration: `<main class="deck" data-narration="audio/my-deck/">` plays `<folder>/<slide link id>.mp3` per slide (key A or the speaker
  button; hidden until the first slide's clip exists). While on, each slide plays its clip, reveals its builds and advances when
  the clip ends; a slide without a clip shows a note and moves on after 3 s. Write one transcript per slide, ids = `data-id`.
- `window.kp` (after `kp.ready`): `go(i, step)`, `next()`, `prev()`, `showAll(i)`, `refit()`, `outline()`, `count`, `state`,
  `slugs`, `link(i)`, `copyLink(i)`, `applyLook(theme, fonts, persist, preview)` (fonts `''` = the theme's own), `themes`, `fonts` (id lists).
  The registry is read from the marker comments in `<style id="kp-themes">`; labels are in those comments and in `library/looks.json`.
- Keys are ignored while focus is in an input, textarea, select or editable text, so interactive slides can take typing.
- An inline element at the very top of a slide (above the safe area) triggers the checker's safe-area warning: put the
  label in `.label`, not in a loose `<em>`.
- Old decks: `node "$KP/tools/upgrade.mjs" deck.html` moves them onto the current engine and keeps their slides and looks.

## 5. Quality bar

- One idea per slide: the `<h2>` is the claim ("Revenue grew 18%"), not the topic ("Revenue"). At most 5 bullets, short; say the number, not the paragraph.
- Motion must have a job: a build reveals the next point in order, `count` lands a number, Magic Move connects the same object on two slides, `draw` shows a trend forming.
  Nothing decorative: no floating orbs, shimmer, gradient noise or emoji as icons. One accent colour per theme.
- Charts carry the takeaway in `.lede`, a source in `<figcaption>` or `.src`, and `data-highlight` on the bar that matters.
- Vary layouts; do not stack more than two bullet slides in a row. Section breaks every 3 to 5 slides in a long deck.
- Notes on every slide: what to say, with the numbers' source. Use them as the speaker script.
- Do not tune CSS to fit text. Auto-fit handles it; if it does not, cut words.

## 6. Arabic and RTL

1. `<html lang="ar" dir="rtl">` (or `dir="rtl"` on one `<section>` for a mixed deck). Layouts use logical properties, so slides mirror themselves.
2. Translate `<title>`, `data-title` and the footer text too; the footer is visible on every slide.
3. Keep code in `dir="ltr"` blocks and Latin brand names/numbers as they are; write Egyptian or Modern Standard Arabic as the user asks and ask only if unclear.
4. Use the `trainer` theme (`readex`) for bilingual decks; see `$KP/library/trainer-bilingual.html` and README section 9.
5. Run the checker and look at the screenshots: headings, timeline direction and chart labels must read right to left.

## 7. Deliver

Tell the user, briefly: the file path; "open it in Chrome, press **F** for fullscreen"; the keys **P** presenter window (notes, next slide, timer),
**G** overview, **M** marker, **S** theme and font panel, **B** black screen, **O** outline, **K** copy this slide's link, arrow keys or click to advance;
for small wording fixes later, `editor.html` in the skill folder;
PDF: Cmd/Ctrl+P, destination Save as PDF, margins None, Background graphics on (one slide per page, builds all shown).
Add the one-line look choice, what is a placeholder, and the checker result ("0 errors in 6 themes").

## 8. Where to read more

`$KP/README.md`: section 2 layout cheat-sheet, 3 recipes, 4 theme plans, 5 builds and Magic Move, 6 diagrams, 6b images, 7 keys, 8 PDF,
9 RTL, 10 checker, 11 making a theme, 12 pre-flight checklist, 14 profession theme library. Finished models: `$KP/examples/` (product-launch,
quarterly-review, tech-talk, genai-101, how-it-works, every-layout = all 28 layouts once with photos; sources in `examples/src/`) and `$KP/library/` (26 professions, `index.html` gallery).
Older formats: `legacy-formats.md` (next to this file).
