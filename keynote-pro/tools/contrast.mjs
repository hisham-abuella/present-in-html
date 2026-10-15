#!/usr/bin/env node
/* Token-level contrast audit for every THEME block in template.html and library/themes (or one file you pass). Prints failures; exit 1 if any. */
import fs from 'node:fs';
const file = process.argv[2] || new URL('../template.html', import.meta.url).pathname;
const css = process.argv[2] ? fs.readFileSync(file, 'utf8') : [file, ...fs.readdirSync(new URL('../library/themes', import.meta.url).pathname).filter(f => f.endsWith('.css')).map(f => new URL('../library/themes/' + f, import.meta.url).pathname)].map(f => fs.readFileSync(f, 'utf8')).join('\n');
const hex = h => { h = h.trim().replace('#', ''); if (h.length === 3) h = [...h].map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
const L = ([r, g, b]) => { const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
const cr = (a, b) => { const x = L(hex(a)), y = L(hex(b)); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
let bad = 0;
for (const m of css.matchAll(/\/\* THEME:([\w-]+) \|[^*]*\*\/\s*html\[data-theme="[\w-]+"\]\{([^}]*)\}/g)) {
  const t = Object.fromEntries([...m[2].matchAll(/(--[\w-]+):\s*(#[0-9a-fA-F]{3,6})\b/g)].map(x => [x[1], x[2]]));
  const chk = (fg, bg, min, why) => { if (!t[fg] || !t[bg]) return; const r = cr(t[fg], t[bg]); if (r < min) { bad++; console.log(`${m[1]}: ${fg} on ${bg} = ${r.toFixed(2)} (need ${min}) ${why || ''}`); } };
  for (const bg of ['--bg', '--bg2']) { chk('--ink', bg, 4.5); chk('--ink2', bg, 4.5); chk('--brand-text', bg, 4.5); chk('--hot-text', bg, 4.5); }
  chk('--on-brand', '--brand', 4.5);
  for (const fg of ['--hero-ink', '--hero-ink2', '--hero-brand']) chk(fg, '--hero-bg', 4.5);
  chk('--bleed-ink', '--bleed-bg', 4.5);
  for (const fg of ['--code-ink', '--c-kw', '--c-str', '--c-num', '--c-com', '--c-fn']) chk(fg, '--code-bg', 4.5);
  console.log(`checked ${m[1]}`);
}
process.exit(bad ? 1 : 0);
