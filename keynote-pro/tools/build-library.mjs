#!/usr/bin/env node
/* Builds the look library: expands library/themes/src/*.css (macros + inline SVG art) into library/themes/*.css, indexes
   library/fonts/*.css, writes library/looks.json, keeps the template's LIBRARY blocks empty and splices tools/layouts.css. Safe to re-run. Usage: node tools/build-library.mjs */
import fs from 'node:fs';
import path from 'node:path';
const here = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const G = 'https://fonts.googleapis.com/css2?family=';
const uri = svg => `url("data:image/svg+xml,${svg.replace(/#/g, '%23').replace(/"/g, "'").replace(/\s+/g, ' ')}")`;
const svg = (w, h, body) => `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>${body}</svg>`;

/* I/Q traces: two channels, 1920x300 */
const trace = (f, a, ph, mid) => Array.from({length: 241}, (_, i) => { const x = i * 8, y = mid + a * Math.sin(2 * Math.PI * f * x / 1920 + ph); return (i ? 'L' : 'M') + x + ' ' + y.toFixed(1); }).join('');
const IQ = svg(1920, 300, `<path d='${trace(3, 56, 0, 150)}' fill='none' stroke='#5FD3EE' stroke-width='4' stroke-opacity='.75'/><path d='${trace(3, 56, Math.PI / 2, 150)}' fill='none' stroke='#FFB454' stroke-width='4' stroke-opacity='.6'/>`);
/* ECG: one beat repeated */
const beat = x => `M${x} 130 H${x + 110} l16 -14 l20 14 H${x + 190} l12 14 l16 -110 l18 150 l14 -54 H${x + 300} l26 -26 l26 26 H${x + 420}`;
const ECG = svg(1920, 240, `<path d='${[0, 1, 2, 3].map(k => beat(k * 480)).join(' ')}' fill='none' stroke='#7DE0D2' stroke-width='4' stroke-opacity='.55' stroke-linejoin='round'/>`);
const ECGMARK = svg(260, 56, `<path d='M0 34 H60 l8 -8 l10 8 H100 l6 8 l9 -34 l9 44 l8 -18 H150 l12 -10 l12 10 H260' fill='none' stroke='#0F766E' stroke-width='3' stroke-linejoin='round'/>`);
/* eight-pointed star tile (two squares, one turned 45 degrees) and its one-row band */
const star = (stroke, op) => `<g fill='none' stroke='${stroke}' stroke-opacity='${op}' stroke-width='2'><rect x='40' y='40' width='80' height='80'/><rect x='40' y='40' width='80' height='80' transform='rotate(45 80 80)'/><circle cx='80' cy='80' r='20'/><path d='M0 80 H40 M120 80 H160 M80 0 V40 M80 120 V160'/></g>`;
const STAR = svg(160, 160, star('#FFFFFF', .09));
const STARBAND = svg(40, 40, `<g fill='none' stroke='#1B4F9C' stroke-opacity='.45' stroke-width='1.5'><rect x='10' y='10' width='20' height='20'/><rect x='10' y='10' width='20' height='20' transform='rotate(45 20 20)'/></g>`);
const CHALK = svg(300, 18, `<path d='M3 11 C60 3 120 16 180 8 S270 12 297 6' fill='none' stroke='#8FD6C0' stroke-width='4' stroke-linecap='round'/>`);
const CROP = svg(1920, 1080, `<g stroke='#111' stroke-width='1.5' fill='none'>${[[60, 60], [1860, 60], [60, 1020], [1860, 1020]].map(([x, y]) => `<path d='M${x - 22} ${y} H${x + 22} M${x} ${y - 22} V${y + 22}'/><circle cx='${x}' cy='${y}' r='10'/>`).join('')}</g>`);
const IMG = {iq: IQ, ecg: ECG, ecgmark: ECGMARK, star: STAR, starband: STARBAND, chalk: CHALK, crop: CROP};

const HERO = '[data-layout="title"],[data-layout="section"],[data-layout="closing"]';
const ALLHERO = HERO + ',[data-layout="full-bleed"],[data-tone="hero"]';
const expand = css => css.replace(/@SVG\[([\s\S]*?)\]SVG@/g, (_, s) => uri(s.trim()))
  .replace(/@C\(([\w-]+)\)/g, (_, n) => `html[data-theme="${n}"] .slide:not(:is(${ALLHERO}))`)
  .replace(/@T\(([\w-]+)\)/g, (_, n) => `html[data-theme="${n}"] .slide:is(${HERO})`)
  .replace(/@A\(([\w-]+)\)/g, (_, n) => `html[data-theme="${n}"] .slide`)
  .replace(/@IMG:(\w+)/g, (_, k) => { if (!IMG[k]) throw new Error('unknown @IMG:' + k); return uri(IMG[k]); });

/* themes: library/themes/src/<id>.css -> library/themes/<id>.css (macros expanded, source header dropped) */
const L = path.join(here, 'library');
const index = {themes: [], fonts: []};
for (const f of fs.readdirSync(path.join(L, 'themes/src')).filter(f => f.endsWith('.css')).sort()) {
  const raw = fs.readFileSync(path.join(L, 'themes/src', f), 'utf8'); if ((raw.match(/@SVG\[/g) || []).length !== (raw.match(/\]SVG@/g) || []).length) throw new Error(f + ': every @SVG[ needs a closing ]SVG@');
  const body = expand(fs.readFileSync(path.join(L, 'themes/src', f), 'utf8').replace(/^\/\* Library theme source[\s\S]*?\*\/\n/, ''));
  const m = body.match(/\/\* THEME:([\w-]+) \| ([^|]*?) \| ([^|]*?) \| (\S*) \*\//); if (!m || m[1] + '.css' !== f) throw new Error(f + ': marker missing or id does not match the file name');
  fs.writeFileSync(path.join(L, 'themes', f), body.trim() + '\n'); index.themes.push({id: m[1], label: m[2], swatch: m[3], url: m[4]});
}
/* fonts: library/fonts/<id>.css are hand-written, one pairing each */
for (const f of fs.readdirSync(path.join(L, 'fonts')).filter(f => f.endsWith('.css')).sort()) {
  const m = fs.readFileSync(path.join(L, 'fonts', f), 'utf8').match(/\/\* FONTS:([\w-]+) \| ([^|]*?) \| (\S*) \*\//); if (!m || m[1] + '.css' !== f) throw new Error(f + ': marker missing or id does not match the file name');
  index.fonts.push({id: m[1], label: m[2], url: m[3]});
}
fs.writeFileSync(path.join(L, 'looks.json'), JSON.stringify(index, null, 1) + '\n');
console.log(`library: ${index.themes.length} themes, ${index.fonts.length} font pairings -> library/themes, library/fonts, library/looks.json`);

const p = path.join(here, 'template.html');
let t = fs.readFileSync(p, 'utf8');
const put = (name, body, anchor, where) => {
  const re = new RegExp(`/\\* LIBRARY:${name}:START \\*/[\\s\\S]*?/\\* LIBRARY:${name}:END \\*/\\n?`);
  const block = `/* LIBRARY:${name}:START */\n${body}\n/* LIBRARY:${name}:END */\n`;
  if (re.test(t)) t = t.replace(re, () => block);
  else { const i = t.indexOf(anchor); if (i < 0) throw new Error('anchor ' + anchor); t = t.slice(0, i) + block + '\n' + t.slice(i); }
};
put('THEMES', '/* Library themes are added per deck from library/themes by tools/add-look.mjs */', '/* =====================================================================\n   FONT PAIRINGS');
put('FONTS', '/* Library font pairings are added per deck from library/fonts by tools/add-look.mjs */', '/* Arabic / RTL: engine-level');
{ const lay = fs.readFileSync(path.join(here, 'tools/layouts.css'), 'utf8'); const a = t.indexOf('/* ---- library layouts'), b = t.indexOf('/* chip: a boxed inline token */'); if (a < 0 || b < a) throw new Error('layout markers'); t = t.slice(0, a) + lay + t.slice(b); }
fs.writeFileSync(p, t);
console.log('template.html: library blocks emptied, layouts spliced');
