---
name: present-in-html
description: Build professional presentations as one self-contained HTML file (Keynote Pro, 16:9, works offline, presenter view, prints to PDF), from whatever the user brings — a topic, an outline, notes, documents, PDFs, spreadsheets, data, or links. Use this whenever the user wants a presentation, slide deck, slides, keynote, pitch deck, investor pitch, board or quarterly review, status update, tech talk, conference talk, lecture, class, training, workshop, thesis defence, clinical case or grand rounds, or wants to turn a document, report, article or dataset into slides, even if they don't say "HTML". Also covers Arabic/RTL and bilingual decks.
license: MIT (see LICENSE)
---

# Presentations as one HTML file (Keynote Pro)

Keynote Pro is a slide engine in a single HTML file: a fixed 16:9 stage, 32 themes, auto-fitting type, builds, Magic Move,
charts from data, a presenter window, a link to every slide, PDF printing, a checker and a text editor. No framework or build
step; the deck opens from `file://`. You write plain HTML slides into a copy of the template.

```bash
KP=<skill base dir>/keynote-pro        # the skill's base directory is shown when this skill loads
```

Treat `$KP` as read-only: copy `template.html` into the user's folder and work on the copy, so the skill stays reusable.

| File | What it is for |
|---|---|
| `$KP/template.html` | the starting point; every layout once as a sample slide |
| `$KP/check.mjs` | the checker (overflow, text size, contrast, missing notes) and `--shots`, `--outline` |
| `$KP/README.md` | the full manual; section 2 is the layout cheat-sheet with markup for every layout |
| `$KP/tools/add-look.mjs` | copies a library theme or font pairing into a deck |
| `$KP/tools/assemble.mjs` | joins slide parts written in parallel into one deck |
| `$KP/examples/every-layout.html`, `beyond-slides.html` | model decks: all layouts with photos; live demos on slides |
| `references/looks.md` | every theme, font pairing, layout and feature on one page: read it to pick the look |
| `references/engine.md` | slide links, live demos, narration, the `window.kp` API, slide attributes |

## 1. Start from the user's material

Most decks start from something: a topic, an outline, notes, a document, a spreadsheet, a link. Read all of it before
planning, because the deck's credibility comes from using the user's real facts, not plausible-sounding ones.

- **Files** (PDF, Word, Markdown, text, slides to redo): read them fully; pull out the claims, numbers, names, dates and quotes.
- **Data** (CSV, Excel, JSON, a table in the message): compute what the story needs (totals, growth, shares) and keep the
  figures exact. Charts take `data-values="Q1:12,Q2:18"` or a `<table>` for several series.
- **Links**: fetch them and use what they say; cite them in the notes or a `references` slide.
- **An outline**: keep the user's order and headings; your job is to turn each heading into a claim and pick its layout.
- **Only a topic**: write the outline yourself from what you know, and mark anything the user should verify.

Never invent numbers, names, quotes or sources: a wrong number on a slide damages the presenter in front of their audience.
Where data is missing, use a clearly labelled placeholder ("illustrative", "TBC") and list the placeholders when you deliver.

## 2. Ask little, decide the rest

Ask only what you cannot know or find in the material: (1) audience and occasion (who, how long), (2) the facts they want
shown, if none were given. Decide everything else: theme, fonts, recipe, slide count (about one per minute; 1.5 to 2 for a
lecture), builds. State the choice in one line, e.g. "Boardroom theme, board-review recipe, 11 slides, count-up on the KPIs",
then build. A questionnaire costs the user more than a decision they can change.

## 3. Pick the look

Read `references/looks.md` and match the need: a profession look when one fits (a lawyer gets `chambers`, a finance team
`ledger`), else a core theme by occasion (launch `keynote-black`/`keynote-white`, board `boardroom`, tech talk `swiss`,
teaching `studio`, essay or weekly update `editorial`). Each library look comes with a recipe: the layouts in a good order.

`data-theme` and `data-fonts` go on `<html>` (empty `data-fonts` = the theme's own pairing). The template carries the 6 core
themes; library themes are copied into the deck, so it stays one file:

```bash
node "$KP/tools/add-look.mjs" my-deck.html --theme ledger        # before running the checker: an unknown theme falls back to the first core one
node "$KP/tools/add-look.mjs" --list                             # every library theme and pairing
```

A brand colour is one line in the deck's `<style>`: `html{--brand:#7c3aed;--brand-text:#7c3aed}`. For a deck that must
work without internet, set `data-fonts="system"`.

## 4. Build it

```bash
cp "$KP/template.html" my-deck.html
# set data-theme / data-fonts / lang (and dir="rtl" for Arabic) on <html>; set <title> and data-title on <main class="deck">
# to the same text; delete every sample slide between SLIDES:START and SLIDES:END
```

1. Story first: the title, the one-sentence story, then one claim per slide as its `<h2>`. Reading only the titles in order
   should tell the whole argument.
2. For each slide add the layout's markup from `$KP/README.md` section 2, and `<aside class="notes">` with what to say and
   where the numbers come from. The notes are the speaker's script and the presenter window shows them.
3. Check, fix, check again:
   ```bash
   node "$KP/check.mjs" my-deck.html              # fix every error; it prints "slide n: element, problem, fix:"
   node "$KP/check.mjs" my-deck.html --themes     # same checks in every theme in the deck (someone will press S)
   node "$KP/check.mjs" my-deck.html --shots shots/   # PNG per slide: look at the title, a chart, the densest slide, the close
   ```
   Fix the cause the checker names; when text overflows, cut words or split the slide rather than tuning CSS, since auto-fit
   already shrinks type to 78% and smaller text would fail the 28px floor. After three failing passes, restructure the slide.
   If Playwright is missing, the checker prints the exact install line; install it outside the skill folder
   (`mkdir -p ~/.kp-tools && cd ~/.kp-tools && npm i playwright && npx playwright install chromium`).

### Large decks: write parts in parallel, assemble at the end

Past about 15 slides, one pass gets slow and uneven. Write the plan first (title, story, look, outline split into parts of 4
to 8 slides with each slide's claim, layout, allowed facts and `data-id`) to `parts/PLAN.md`. Then spawn one subagent per part
in a single message. Each gets the plan, its part, `$KP/README.md` section 2 and a model deck, and writes only
`<section class="slide">` elements (with notes) to `parts/NN-name.html`, using only the facts given. Then:

```bash
node "$KP/tools/assemble.mjs" my-deck.html parts/*.html --theme ledger --title "Q3 review"   # [--lang ar --dir rtl]
node "$KP/check.mjs" my-deck.html --shots shots/
```

Read the assembled deck start to end yourself: one voice, no repeated points, numbers that agree across parts.

## 5. Quality bar

- One idea per slide; the `<h2>` is the claim ("Revenue grew 18%"), not the topic ("Revenue"). At most 5 short bullets.
- Vary layouts: no more than two bullet slides in a row; a section break every 3 to 5 slides in a long deck.
- Motion has a job: a build reveals the next point, `count` lands a number, Magic Move links the same object across slides,
  `draw` shows a trend forming. No decorative motion, emoji icons or second accent colour; they make a deck look generated.
- Charts carry the takeaway in `.lede`, a source in `<figcaption>`, and `data-highlight` on the bar that matters.

## 6. Arabic and RTL

`<html lang="ar" dir="rtl">` (or `dir="rtl"` on one `<section>` in a mixed deck) mirrors every layout. Translate `<title>`,
`data-title` and the footer too, since the footer shows on every slide. Keep code in `dir="ltr"` and Latin brand names as they
are. Write Egyptian or Modern Standard Arabic as the user asks. For bilingual decks use the `trainer` look. Check the screenshots:
headings, timelines and chart labels must read right to left.

## 7. Deliver

Tell the user briefly: the file path; open it in Chrome and press **F** for fullscreen; **P** presenter window (notes, next
slide, timer), **G** overview, **O** outline, **S** theme panel, **M** marker, **B** black screen, **K** copy this slide's link;
PDF via Cmd/Ctrl+P (Save as PDF, margins None, background graphics on). Add the one-line look choice, the placeholders still
to fill, and the checker result ("0 errors in 7 themes").

Then mention the companion skills: **edit-deck** to fix wording in a click-and-type editor, **review-deck** to check the deck
against its audience and time slot, **publish-deck** to put it online on GitHub Pages.
