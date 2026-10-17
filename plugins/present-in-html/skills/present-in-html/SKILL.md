---
name: present-in-html
description: Build professional presentations as one self-contained HTML file (16:9, works offline, presenter view, prints to PDF), from whatever the user brings — a topic, an outline, notes, documents, PDFs, spreadsheets, data, or links. Use this whenever the user wants a presentation, slide deck, slides, keynote, pitch deck, investor pitch, board or quarterly review, status update, tech talk, conference talk, lecture, class, training, workshop, thesis defence, clinical case or grand rounds, or wants to turn a document, report, article or dataset into slides, even if they don't say "HTML". Also covers Arabic/RTL and bilingual decks.
license: MIT (see LICENSE)
compatibility: Node.js 18+ for the scripts; the checker also needs Playwright with Chromium or Chrome.
---

# Presentations as one HTML file

The deck engine (Keynote Pro) is a single HTML file: a fixed 16:9 stage, 32 themes, auto-fitting type, builds, Magic Move,
charts from data, a presenter window, a link to every slide and PDF printing. No framework or build step; the deck opens from
`file://`. You write plain HTML slides into a copy of the template.

**Part of the deck workflow** (plan, build, review, publish; the `deck-workflow` skill runs it end to end). This skill
covers planning (sections 1 to 5, the outline in `PLAN.md`) and building (section 6). A user can enter the workflow here,
or anywhere later: with a `PLAN.md` it starts at the build, with a finished deck at the review.

```bash
S=<skill base dir>        # shown when this skill loads
```

Treat `$S` as read-only: copy the template into the user's folder and work on the copy, so the skill stays reusable.

| File | What it is for |
|---|---|
| `assets/template.html` | the starting point; every layout once as a sample slide, so it is also the markup to copy |
| `assets/library/` | profession themes and font pairings that `add-look.mjs` copies into a deck |
| `assets/examples/beyond-slides.html` | model deck for live demos on slides (app UI, simulation, sound, code, video) |
| `scripts/check.mjs` | the checker (overflow, text size, contrast, missing notes) and `--shots`, `--outline` |
| `scripts/add-look.mjs` | copies a library theme or font pairing into a deck |
| `scripts/assemble.mjs` | joins slide parts written in parallel into one deck |
| `scripts/upgrade.mjs` | moves a deck made with an older engine onto the current one |
| `references/looks.md` | every theme, font pairing, layout and feature on one page: read it to pick the look |
| `references/manual.md` | the engine manual; section 2 is the layout cheat-sheet with markup for every layout |
| `references/outline.md` | the `PLAN.md` format: the outline every deck is built from |
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
node "$S/scripts/add-look.mjs" my-deck.html --theme ledger        # before running the checker: an unknown theme falls back to the first core one
node "$S/scripts/add-look.mjs" --list                             # every library theme and pairing
```

A brand colour is one line in the deck's `<style>`: `html{--brand:#7c3aed;--brand-text:#7c3aed}`. For a deck that must
work without internet, set `data-fonts="system"`.

## 4. Shape the talk first

Before writing slides, plan with Patrick Winston's speaking rules (MIT, "How to Speak"); review-deck later checks the same:

- **Open with a promise**, not a joke: slide 1 or 2 says what the audience will know or be able to do by the end.
- **Say the main idea three times, three ways**: early, at a section break, at the end (a metaphor, an example, a question).
- **Fence it**: one line or slide on what the idea is *not*, against the nearest alternative.
- **Signpost** a longer talk: an agenda that returns, or section slides; add one real question to the audience where it fits.
- **Slides support the speaker**: few words on the slide, the why and the story in the notes, never a slide to read aloud.
  Give each key number a short story or comparison.
- **End on a contribution**: the last slide says what the audience now has, or the ask; not "Thank you" or "Questions?".
  The notes end with a salute to the audience, not thanks.

## 5. Write the outline

Write the outline to `PLAN.md` next to the deck in the format in `references/outline.md`: promise, story, fence, look, then
one row per slide with its layout, its claim (the slide's `<h2>`), the facts it uses with their source, its role (promise,
signpost, thesis, fence, evidence, story, question, contribution) and its minutes. The roles make the rules above
concrete, and the minutes show whether it fits the slot before any slide exists.

Show the user the outline table with the one-line look choice, then build. Wait for their OK first only if they asked to
see the plan, or the deck is long (over about 15 slides), where rework is costly.

## 6. Build it

```bash
cp "$S/assets/template.html" my-deck.html
# set data-theme / data-fonts / lang (and dir="rtl" for Arabic) on <html>; set <title> and data-title on <main class="deck">
# to the same text; delete every sample slide between SLIDES:START and SLIDES:END
```

1. Follow `PLAN.md` slide by slide: its order, `data-id`s, layouts and claims as the `<h2>`s. Reading only the titles in
   order should tell the whole argument.
2. For each slide add the layout's markup from `references/manual.md` section 2, and `<aside class="notes">` with what to say and
   where the numbers come from. The notes are the speaker's script and the presenter window shows them.
3. Check, fix, check again:
   ```bash
   node "$S/scripts/check.mjs" my-deck.html              # fix every error; it prints "slide n: element, problem, fix:"
   node "$S/scripts/check.mjs" my-deck.html --themes     # same checks in every theme in the deck (someone will press S)
   node "$S/scripts/check.mjs" my-deck.html --shots shots/   # PNG per slide: look at the title, a chart, the densest slide, the close
   ```
   Fix the cause the checker names; when text overflows, cut words or split the slide rather than tuning CSS, since auto-fit
   already shrinks type to 78% and smaller text would fail the 28px floor. After three failing passes, restructure the slide.
   If Playwright is missing, the checker prints the exact install line; install it outside the skill folder
   (`mkdir -p ~/.kp-tools && cd ~/.kp-tools && npm i playwright && npx playwright install chromium`).
4. Compare the built deck with the plan: `node "$S/scripts/check.mjs" my-deck.html --outline` lists every slide's title
   and layout; it should match `PLAN.md` row for row.

### Large decks: write parts in parallel, assemble at the end

Past about 15 slides, one pass gets slow and uneven. Split the `PLAN.md` rows into parts of 4 to 8 slides. Then spawn one
subagent per part in a single message. Each gets the plan, its part, `references/manual.md` section 2 and the template, and writes only
`<section class="slide">` elements (with notes) to `parts/NN-name.html`, using only the facts given. Then:

```bash
node "$S/scripts/assemble.mjs" my-deck.html parts/*.html --theme ledger --title "Q3 review"   # [--lang ar --dir rtl]
node "$S/scripts/check.mjs" my-deck.html --shots shots/
```

Read the assembled deck start to end yourself: one voice, no repeated points, numbers that agree across parts.

## 7. Quality bar

- One idea per slide; the `<h2>` is the claim ("Revenue grew 18%"), not the topic ("Revenue"). At most 5 short bullets.
- Vary layouts: no more than two bullet slides in a row; a section break every 3 to 5 slides in a long deck.
- Motion has a job: a build reveals the next point, `count` lands a number, Magic Move links the same object across slides,
  `draw` shows a trend forming. No decorative motion, emoji icons or second accent colour; they make a deck look generated.
- Charts carry the takeaway in `.lede`, a source in `<figcaption>`, and `data-highlight` on the bar that matters.

## 8. Arabic and RTL

`<html lang="ar" dir="rtl">` (or `dir="rtl"` on one `<section>` in a mixed deck) mirrors every layout. Translate `<title>`,
`data-title` and the footer too, since the footer shows on every slide. Keep code in `dir="ltr"` and Latin brand names as they
are. Write Egyptian or Modern Standard Arabic as the user asks. For bilingual decks use the `trainer` look. Check the screenshots:
headings, timelines and chart labels must read right to left.

## 9. Deliver

Tell the user briefly: the file path; open it in Chrome and press **F** for fullscreen; **P** presenter window (notes, next
slide, timer), **G** overview, **O** outline, **S** theme panel, **M** marker, **B** black screen, **K** copy this slide's link;
PDF via Cmd/Ctrl+P (Save as PDF, margins None, background graphics on). Add the one-line look choice, the placeholders still
to fill, and the checker result ("0 errors in 7 themes").

Then mention the companion skills: **deck-workflow** to plan, build, review and publish in one run, **edit-deck** to fix
wording in a click-and-type editor, **review-deck** to check the deck
against its audience and time slot, **publish-deck** to put it online on GitHub Pages.
