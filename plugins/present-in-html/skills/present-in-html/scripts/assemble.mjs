#!/usr/bin/env node
/* Join slide parts into one deck. For large decks the outline is split into parts, each written by its own subagent as a
   file holding ONLY <section class="slide"> elements (no <html>, no <style>, no <script>), named so they sort in order:
   parts/01-intro.html, parts/02-market.html ...  This tool copies template.html, puts every part between the SLIDES
   markers in file-name order, sets theme / fonts / title / language, adds library looks, and reports problems.
   Usage: node tools/assemble.mjs out.html parts/*.html [--theme id] [--fonts id] [--title "Deck title"] [--lang ar --dir rtl]
          [--looks id,id | --looks all]   then: node check.mjs out.html */
import fs from 'node:fs';
import path from 'node:path';
import {addLooks, here} from './looks.mjs';
const a = process.argv.slice(2), val = k => { const i = a.indexOf(k); return i > -1 ? a[i + 1] : undefined; };
const flags = new Set(['--theme', '--fonts', '--title', '--lang', '--dir', '--looks']);
const pos = a.filter((x, i) => !flags.has(x) && !flags.has(a[i - 1]));
const [out, ...parts] = pos; if (!out || !parts.length) { console.error('usage: node tools/assemble.mjs out.html parts/*.html [--theme id] [--fonts id] [--title t] [--lang ar --dir rtl] [--looks a,b|all]'); process.exit(2); }
parts.sort((x, y) => path.basename(x).localeCompare(path.basename(y), 'en', {numeric: true}));
let problems = 0; const warn = m => { problems++; console.log('  problem: ' + m); };
const ids = new Map(); let n = 0;
const body = parts.map(f => {
  let s = fs.readFileSync(f, 'utf8').trim();
  if (/<(html|head|body|style|script)\b/i.test(s)) warn(`${f}: parts hold slides only; remove <html>/<head>/<body>/<style>/<script>`);
  s = s.replace(/<!--meta[\s\S]*?-->/, '').trim();
  const k = (s.match(/<section\b[^>]*class="[^"]*\bslide\b/g) || []).length; if (!k) warn(`${f}: no <section class="slide"> found`); n += k;
  for (const m of s.matchAll(/<section\b[^>]*\bdata-id="([^"]+)"/g)) { if (ids.has(m[1])) warn(`data-id="${m[1]}" is used in ${ids.get(m[1])} and ${f}`); ids.set(m[1], f); }
  return `<!-- part: ${path.basename(f)} -->\n${s}`;
}).join('\n\n');
const title = val('--title') || 'Presentation', esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
let html = fs.readFileSync(path.join(here, 'template.html'), 'utf8')
  .replace(/(<!-- SLIDES:START -->)[\s\S]*(<!-- SLIDES:END -->)/, (_, s, e) => `${s}\n${body}\n${e}`)
  .replace('data-theme="keynote-white"', `data-theme="${val('--theme') || 'keynote-white'}"`).replace('data-fonts=""', `data-fonts="${val('--fonts') || ''}"`)
  .replace('<title>present-in-html template</title>', `<title>${esc(title)}</title>`).replace('data-title="present-in-html template"', `data-title="${esc(title)}"`);
if (val('--lang')) html = html.replace('<html lang="en"', `<html lang="${val('--lang')}"${val('--dir') ? ` dir="${val('--dir')}"` : ''}`);
const looks = val('--looks');
try { html = addLooks(html, {themes: looks === 'all' ? 'all' : (looks || '').split(',').filter(Boolean), fonts: looks === 'all' ? 'all' : [], keep: false}); }
catch (e) { warn(e.message); }
fs.writeFileSync(out, html);
console.log(`${out}: ${n} slides from ${parts.length} parts${problems ? `, ${problems} problem(s) above` : ''}. Next: node check.mjs ${out}`);
process.exit(problems ? 1 : 0);
