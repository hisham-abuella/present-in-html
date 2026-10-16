#!/usr/bin/env node
// Writes the present-in-html skill's references/looks.md: every theme, font pairing, layout and feature in one short page,
// so the plugin can ship two model decks instead of the whole gallery. Theme library rows come from
// keynote-pro/tools/library-data.mjs; run by scripts/build-plugin.sh.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const {default: lib, FIELDS} = await import(pathToFileURL(path.join(root, 'keynote-pro/tools/library-data.mjs')).href);
const out = path.join(root, 'plugins/present-in-html/skills/present-in-html/references/looks.md');
const GALLERY = 'https://github.com/hisham-abuella/present-in-html/tree/main/keynote-pro';
const first = s => (s || '').split(/(?<=\.)\s/)[0];

const core = [
  ['keynote-white', 'Apple-clean: white, huge tight headlines, one blue phrase per slide', 'Inter / JetBrains Mono', 'launches, pitches, status decks'],
  ['keynote-black', 'Cinematic dark, the same system on pure black', 'Inter / JetBrains Mono', 'reveals, demos, keynotes'],
  ['boardroom', 'Corporate done well: navy, serif titles, gold accent', 'Source Serif 4 / Source Sans 3', 'board and quarterly reviews'],
  ['swiss', 'International style: hard grid, black rules, one red', 'Inter Tight / Inter', 'tech talks, architecture'],
  ['editorial', 'A printed essay: paper, ink, oxblood, italic emphasis', 'Newsreader / Inter', 'essays, weekly updates, Arabic'],
  ['studio', 'Deep teal and amber', 'Instrument Serif / DM Sans', 'teaching, courses, talks'],
];
const layouts = [
  ['title', 'opening slide; also `closing` for the end'], ['section', 'part breaks every 3 to 5 slides'], ['statement', 'one big sentence: the claim, a turn in the story'],
  ['agenda', 'what is coming; `aria-current` marks where we are'], ['bullets', 'at most 5 short points, built one by one'], ['two-column', 'A vs B, before/after, risks/asks; `data-cols="3"` for three'],
  ['image-left / image-right', 'a picture with a point'], ['full-bleed', 'a photo with a title on it'], ['big-number', 'one number that matters, counted up'],
  ['stats', '2 to 4 KPIs'], ['chart', 'column, bar or line from `data-values` or a table; takeaway in `.lede`'], ['comparison', 'options in a table with a recommended column'],
  ['timeline', 'dates and milestones; `class="now"` marks today'], ['process', '3 to 5 steps'], ['quote', 'a voice: customer, source, clause'],
  ['code', 'code with focus steps per click'], ['team', 'people with initials or photos'], ['diagram', 'inline SVG that draws itself'],
  ['formula', 'one equation, explained'], ['case', 'a case record: summary, vitals, timed course'], ['ask', 'the raise or the need: amount, use of funds, terms'],
  ['rows', 'labelled rows: issue/rule/application/conclusion, claim/evidence/caveat'], ['quiz', 'a question; the click reveals the answer'], ['materials', 'a board of swatches or samples'],
  ['references', 'sources and further reading'],
];

let md = `# Looks, layouts and features (summary)

Pick from this page; you do not need to open sample decks. Full specs (colours, type, signatures) are in
\`keynote-pro/README.md\` sections 4 and 14. Every deck in the gallery, live: ${GALLERY} (open \`index.html\` and
\`library/index.html\` there).

Model decks shipped with the skill: \`keynote-pro/template.html\` (every layout once, the starting point),
\`keynote-pro/examples/every-layout.html\` (all layouts with photos, one story) and \`keynote-pro/examples/beyond-slides.html\`
(live demos on slides). Copy patterns from those.

## Core themes (in the template)

| \`data-theme\` | Look | Fonts | Good for |
|---|---|---|---|
${core.map(r => `| \`${r[0]}\` | ${r[1]} | ${r[2]} | ${r[3]} |`).join('\n')}

Core font pairings (\`data-fonts\`): inter, sora, grotesk, plex, fraunces, playfair, spectral, cormorant, system (offline).
Empty \`data-fonts\` uses the theme's own pairing.

## Library themes (add with \`tools/add-look.mjs deck.html --theme <id>\`)

Each has its own font pairing (also usable with any theme as \`data-fonts\`). Recipe = layouts in order for a typical deck.

| \`data-theme\` | For | Look | Fonts (\`data-fonts\`) | Recipe |
|---|---|---|---|---|
${lib.map(d => `| \`${d.theme}\` | ${d.profession} | ${first(d.spec?.overview)} ${d.mode ? `(${d.mode})` : ''} | \`${d.fonts}\` | ${d.recipe} |`).join('\n')}

Fields: ${Object.values(FIELDS).join(', ')}.

## Layouts (\`data-layout\`)

| Layout | Use it for |
|---|---|
${layouts.map(r => `| \`${r[0].replace(' / ', '` / `')}\` | ${r[1]} |`).join('\n')}

Markup for each is in \`keynote-pro/README.md\` section 2 (the cheat-sheet).

## Features worth using

- **Builds**: \`data-build="list|fade|rise|scale|wipe|count|draw"\` reveal points in order, count numbers up, grow bars, draw lines; \`data-focus\` steps through code.
- **Backup slides**: a \`data-layout="appendix"\` slide (or \`data-appendix\`) and everything after it is skipped in play; \`data-skip\` skips one slide.
- **Magic Move**: the same \`data-magic\` id on two consecutive slides morphs the object between them.
- **Charts** from data (\`data-chart\` column, bar, line; multi-series from a \`<table>\`), with highlight, units, source.
- **Diagrams** as inline SVG that draw on entry.
- **Presenter window** (P): notes, next build, timer; \`data-duration="20"\` makes it a countdown.
- **Slide links** (\`data-id\`), overview (G), outline (O), marker (M), laser (L), theme panel (S), black screen (B).
- **Narration**: one MP3 per slide plays and advances (\`data-narration\`).
- **Slides that run**: live UI, calculators, simulations, sound, code, games, iframes, video, camera.
- **Arabic / RTL**: \`dir="rtl"\` mirrors every layout; bilingual with the \`trainer\` look.
- **PDF**: Cmd/Ctrl+P, one slide per page, builds shown.
`;
fs.mkdirSync(path.dirname(out), {recursive: true});
fs.writeFileSync(out, md);
console.log(`wrote ${path.relative(root, out)} (${md.split('\n').length} lines)`);
