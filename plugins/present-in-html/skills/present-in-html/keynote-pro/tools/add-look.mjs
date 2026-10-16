#!/usr/bin/env node
/* Copy library themes and font pairings into a deck (the deck stays one file).
   Usage: node tools/add-look.mjs deck.html [--theme spectrum,ledger] [--fonts plexcond] [--all] [--only] [--list]
     --all    every library theme and pairing (for showcase decks)      --only  drop library looks the deck had before
     --list   print the library (id, label) and exit
   The deck's own data-theme / data-fonts are always included if they come from the library. */
import fs from 'node:fs';
import {addLooks, looks} from './looks.mjs';
const a = process.argv.slice(2), opt = k => { const i = a.indexOf(k); return i > -1 ? a[i + 1].split(',').filter(Boolean) : []; };
if (a.includes('--list')) { const l = looks(); console.log('THEMES\n' + l.themes.map(t => `  ${t.id.padEnd(14)} ${t.label}  ${t.swatch}`).join('\n') + '\nFONTS\n' + l.fonts.map(f => `  ${f.id.padEnd(14)} ${f.label}`).join('\n')); process.exit(0); }
const file = a.find(x => x.endsWith('.html')); if (!file) { console.error('usage: node tools/add-look.mjs deck.html [--theme a,b] [--fonts x] [--all] [--only] [--list]'); process.exit(2); }
const all = a.includes('--all');
const out = addLooks(fs.readFileSync(file, 'utf8'), {themes: all ? 'all' : opt('--theme'), fonts: all ? 'all' : opt('--fonts'), keep: !a.includes('--only')});
fs.writeFileSync(file, out);
const n = s => [...out.matchAll(s)].length;
console.log(`${file}: ${n(/\/\* THEME:[\w-]+ \|/g)} themes, ${n(/\/\* FONTS:[\w-]+ \|/g)} font pairings in the deck`);
