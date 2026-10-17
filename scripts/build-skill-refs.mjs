#!/usr/bin/env node
// Writes the present-in-html skill's references into the folder given as the first argument (scripts/build-plugin.sh passes
// its staging folder):
//   looks.md   every theme, font pairing, layout and feature on one page, so the skill ships no sample decks; theme library
//              rows come from keynote-pro/tools/library-data.mjs
//   manual.md  keynote-pro/README.md without the developer sections (file tree, making a theme, the theme library specs)
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const {default: lib, FIELDS} = await import(pathToFileURL(path.join(root, 'keynote-pro/tools/library-data.mjs')).href);
const dir = path.resolve(process.argv[2] || path.join(root, 'plugins/present-in-html/skills/present-in-html/references'));
const GALLERY = 'https://hisham-abuella.github.io/present-in-html/';
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

Pick from this page; you do not need to open sample decks. The core themes' full specs (colours, type, signatures) are in
\`references/manual.md\` section 4. Every example and profession deck, live in the browser: ${GALLERY}

Shipped with the skill: \`assets/template.html\` (every layout once: the starting point and the markup to copy) and
\`assets/examples/beyond-slides.html\` (live demos on slides).

## Core themes (in the template)

| \`data-theme\` | Look | Fonts | Good for |
|---|---|---|---|
${core.map(r => `| \`${r[0]}\` | ${r[1]} | ${r[2]} | ${r[3]} |`).join('\n')}

Core font pairings (\`data-fonts\`): inter, sora, grotesk, plex, fraunces, playfair, spectral, cormorant, system (offline).
Empty \`data-fonts\` uses the theme's own pairing.

## Library themes (add with \`scripts/add-look.mjs deck.html --theme <id>\`)

Each has its own font pairing (also usable with any theme as \`data-fonts\`). Recipe = layouts in order for a typical deck.

| \`data-theme\` | For | Look | Fonts (\`data-fonts\`) | Recipe |
|---|---|---|---|---|
${lib.map(d => `| \`${d.theme}\` | ${d.profession} | ${first(d.spec?.overview)} ${d.mode ? `(${d.mode})` : ''} | \`${d.fonts}\` | ${d.recipe} |`).join('\n')}

Fields: ${Object.values(FIELDS).join(', ')}.

## Layouts (\`data-layout\`)

| Layout | Use it for |
|---|---|
${layouts.map(r => `| \`${r[0].replace(' / ', '` / `')}\` | ${r[1]} |`).join('\n')}

Markup for each is in \`references/manual.md\` section 2 (the cheat-sheet).

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
fs.mkdirSync(dir, {recursive: true});
fs.writeFileSync(path.join(dir, 'looks.md'), md);

// manual.md: keep the sections a deck author needs; drop the engine's file tree (its own paths), 11 (adding a theme to the
// library needs the build tools, which stay in the repo) and 14 (the theme library specs; looks.md summarises it).
const readme = fs.readFileSync(path.join(root, 'keynote-pro/README.md'), 'utf8');
const parts = readme.split(/^(?=## )/m);
const keep = parts.slice(1).filter(p => !/^## (11|14)\. /.test(p));
const toc = keep.map(p => p.match(/^## (.+)/)[1]).map(t => `- ${t}`).join('\n');
const manual = `# Keynote Pro manual (the engine behind present-in-html)

Paths below are the engine's. In this skill: \`check.mjs\` and \`tools/*.mjs\` are in \`scripts/\`; \`template.html\`,
\`library/\` and \`examples/\` are in \`assets/\`. Build tools and the sample decks mentioned here are not shipped with the skill.

${toc}

${keep.join('').trim()}
`;
fs.writeFileSync(path.join(dir, 'manual.md'), manual);
console.log(`wrote looks.md (${md.split('\n').length} lines) and manual.md (${manual.split('\n').length} lines) to ${dir}`);
