# Looks, layouts and features (summary)

Pick from this page; you do not need to open sample decks. The core themes' full specs (colours, type, signatures) are in
`references/manual.md` section 4. Every example and profession deck, live in the browser: https://hisham-abuella.github.io/present-in-html/

Shipped with the skill: `assets/template.html` (every layout once: the starting point and the markup to copy) and
`assets/examples/beyond-slides.html` (live demos on slides).

## Core themes (in the template)

| `data-theme` | Look | Fonts | Good for |
|---|---|---|---|
| `keynote-white` | Apple-clean: white, huge tight headlines, one blue phrase per slide | Inter / JetBrains Mono | launches, pitches, status decks |
| `keynote-black` | Cinematic dark, the same system on pure black | Inter / JetBrains Mono | reveals, demos, keynotes |
| `boardroom` | Corporate done well: navy, serif titles, gold accent | Source Serif 4 / Source Sans 3 | board and quarterly reviews |
| `swiss` | International style: hard grid, black rules, one red | Inter Tight / Inter | tech talks, architecture |
| `editorial` | A printed essay: paper, ink, oxblood, italic emphasis | Newsreader / Inter | essays, weekly updates, Arabic |
| `studio` | Deep teal and amber | Instrument Serif / DM Sans | teaching, courses, talks |

Core font pairings (`data-fonts`): inter, sora, grotesk, plex, fraunces, playfair, spectral, cormorant, system (offline).
Empty `data-fonts` uses the theme's own pairing.

## Library themes (add with `scripts/add-look.mjs deck.html --theme <id>`)

Each has its own font pairing (also usable with any theme as `data-fonts`). Recipe = layouts in order for a typical deck.

| `data-theme` | For | Look | Fonts (`data-fonts`) | Recipe |
|---|---|---|---|---|
| `spectrum` | Electrical / wireless engineer | An instrument faceplate. (light + dark hero) | `plexcond` | title, statement, formula, chart (line), diagram, stats, closing |
| `commit` | Software engineer | An editor at night. (dark) | `geist` | title, statement, timeline, code (focus), chart, two-column, bullets |
| `notebook` | Data scientist / analyst | A notebook page. (light + orange hero) | `franklin` | title, statement, chart (bar), chart (line), comparison, two-column (caveats), closing |
| `clinic` | Doctor / clinician | Clean, calm and legible from the back of a lecture theatre. (light + deep teal hero) | `figtree` | title, case, two-column (differential), chart (line), timeline (course), bullets (take-home), closing |
| `labbook` | Medical / scientific researcher | A graph-paper lab notebook with a journal-style serif. (light + violet hero) | `stix` | title, statement (finding first), process (methods), chart, stats (n, effect), rows (claim, evidence, caveat), closing |
| `schoolyard` | School teacher | Big, friendly and high-contrast. (light + yellow hero) | `lexend` | title, agenda ("today we will"), statement, diagram, quiz (reveal), bullets (remember), closing (task) |
| `chalk` | University lecturer | A slate board with three colours of chalk. (dark) | `literata` | title, agenda, formula, code (focus), quiz (check), bullets, closing (reading) |
| `thesis` | Student (thesis defence) | A Beamer-era academic frame done properly: white pages, a maroon header bar, an info-line footer. (light) | `fira` | title, agenda (outline), statement (the question), rows (question to contribution), chart, two-column (limits, future), closing |
| `pitch` | Startup founder (pitch) | Confident and quick. (light + ultramarine hero) | `bricolage` | title, statement (problem), big-number (market), stats (traction), chart (growth), comparison, ask, closing |
| `roadmap` | Product manager | The look of a good product tool: neutral surfaces, one indigo, rounded pills, and task circles instead of bullets. (light) | `jakarta` | title, stats, two-column x3 (now, next, later), timeline, comparison, rows (decision log), bullets (decisions needed) |
| `partner` | Executive / consultant (board review) | Answer first, evidence after. (light + charcoal hero) | `gelasio` | title, statement (the answer), rows (situation, complication, resolution), chart, comparison, big-number, bullets (next steps) |
| `ledger` | Finance professional | Accountant's columnar paper. (light + green hero) | `bitter` | title, big-number, comparison (statement), chart (variance), formula (margin), bullets (outlook) |
| `campaign` | Marketing / sales | A poster, not a template. (light + raspberry hero) | `syne` | title, statement (the promise), stats (funnel), chart (budget), timeline (beats), comparison (test), closing |
| `chambers` | Lawyer | A chambers letterhead. (light + aubergine hero) | `garamond` | title, agenda, quote (the clause), rows (issue, rule, application, conclusion), two-column (for, against), comparison (options), closing |
| `drawing` | Architect / designer | A drawing sheet. (light + concrete hero) | `jost` | title, statement (the idea), diagram (plan), materials, stats (brief), timeline, closing |
| `trainer` | Trainer / community or faith educator (EN and AR) | Lapis and gold, drawn from geometric tilework. (light + lapis hero) | `readex` | title (EN + AR), two-column (EN left, AR right), Arabic slides with dir="rtl", quiz in both languages, closing |
| `sentinel` | Security engineer | A security operations screen. (dark) | `overpass` | title, big-number (impact), timeline, chart (line), rows (threat, gap, impact, fix), comparison (before, after), process, bullets (decisions), closing |
| `blueprint` | Civil / structural / mechanical engineer | A drawing sheet. (light + blueprint-blue hero) | `archivo` | title, stats, two-column (design basis), formula (check), chart (bar), materials, timeline, closing |
| `civic` | Nonprofit / NGO / public policy | Warm and trustworthy. (light + deep green hero) | `petrona` | title, big-number (reach), stats (outcomes), chart (column), quote, ask (the need), bullets (how to help), closing |
| `newsroom` | Journalist / editor | A broadsheet page. (light + black hero) | `caslon` | title, statement (the story), big-number, chart (line), rows (claim, evidence, caveat), timeline, closing |
| `estate` | Real estate / property | Quiet premium. (light + navy hero) | `redhat` | title, stats, two-column x3 (buildings), chart (bar), comparison, ask (equity), timeline, closing |
| `menu` | Chef / restaurant / hospitality | A printed menu card. (light + bottle-green hero) | `youngserif` | title, statement, bullets (the courses), stats, chart (bar), process (service), comparison (suppliers), closing |
| `people` | HR / people operations | Warm and human. (light + plum hero) | `outfit` | title, big-number (response rate), chart (bar), two-column (themes), comparison (policy), timeline (commitments), closing |
| `wireframe` | UX / product designer | A design canvas. (light + near-black hero) | `epilogue` | title, statement (the finding), chart (column), rows (observed, why, change), two-column (flow A vs B), process, closing |
| `pitchside` | Sports coach / performance analyst | The touchline. (light + pitch-green hero) | `barlow` | title, stats, chart (line), two-column (worked, cost us), comparison (formations), timeline (pre-season), closing |
| `archive` | Historian / museum curator | A catalogue card. (light + slate hero) | `bodoni` | title, quote (primary source), timeline, case (object record), chart (line), two-column (readings), closing |

Fields: Engineering and data, Health and science, Education, Business, Law and design, Built world and trades, Public and media, People and hospitality.

## Layouts (`data-layout`)

| Layout | Use it for |
|---|---|
| `title` | opening slide; also `closing` for the end |
| `section` | part breaks every 3 to 5 slides |
| `statement` | one big sentence: the claim, a turn in the story |
| `agenda` | what is coming; `aria-current` marks where we are |
| `bullets` | at most 5 short points, built one by one |
| `two-column` | A vs B, before/after, risks/asks; `data-cols="3"` for three |
| `image-left` / `image-right` | a picture with a point |
| `full-bleed` | a photo with a title on it |
| `big-number` | one number that matters, counted up |
| `stats` | 2 to 4 KPIs |
| `chart` | column, bar or line from `data-values` or a table; takeaway in `.lede` |
| `comparison` | options in a table with a recommended column |
| `timeline` | dates and milestones; `class="now"` marks today |
| `process` | 3 to 5 steps |
| `quote` | a voice: customer, source, clause |
| `code` | code with focus steps per click |
| `team` | people with initials or photos |
| `diagram` | inline SVG that draws itself |
| `formula` | one equation, explained |
| `case` | a case record: summary, vitals, timed course |
| `ask` | the raise or the need: amount, use of funds, terms |
| `rows` | labelled rows: issue/rule/application/conclusion, claim/evidence/caveat |
| `quiz` | a question; the click reveals the answer |
| `materials` | a board of swatches or samples |
| `references` | sources and further reading |

Markup for each is in `references/manual.md` section 2 (the cheat-sheet).

## Features worth using

- **Builds**: `data-build="list|fade|rise|scale|wipe|count|draw"` reveal points in order, count numbers up, grow bars, draw lines; `data-focus` steps through code.
- **Backup slides**: a `data-layout="appendix"` slide (or `data-appendix`) and everything after it is skipped in play; `data-skip` skips one slide.
- **Magic Move**: the same `data-magic` id on two consecutive slides morphs the object between them.
- **Charts** from data (`data-chart` column, bar, line; multi-series from a `<table>`), with highlight, units, source.
- **Diagrams** as inline SVG that draw on entry.
- **Presenter window** (P): notes, next build, timer; `data-duration="20"` makes it a countdown.
- **Slide links** (`data-id`), overview (G), outline (O), marker (M), laser (L), theme panel (S), black screen (B).
- **Narration**: one MP3 per slide plays and advances (`data-narration`).
- **Slides that run**: live UI, calculators, simulations, sound, code, games, iframes, video, camera.
- **Arabic / RTL**: `dir="rtl"` mirrors every layout; bilingual with the `trainer` look.
- **PDF**: Cmd/Ctrl+P, one slide per page, builds shown.
