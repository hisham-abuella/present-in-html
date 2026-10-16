#!/usr/bin/env node
// Build a static site folder for GitHub Pages from one or more Keynote Pro decks. No dependencies.
//   node build-site.mjs deck.html [more.html ...] --out site/ [--strip-notes]
// One deck becomes site/index.html; several keep their names and get an index.html that links to each.
// Every local file a deck points to (src, href, data-bg, data-src, poster, url(), the data-narration folder) is copied
// with the same relative path; a path that leaves the deck's folder (../x.jpg) is copied into _ext/ and rewritten in the
// published copy. --strip-notes removes <aside class="notes"> from the published copies (the source decks are untouched).
// Exits 1, copying nothing, if a referenced file is missing.
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const outI = args.indexOf('--out');
const out = outI >= 0 ? path.resolve(args[outI + 1] || '') : null;
const strip = args.includes('--strip-notes');
const decks = args.filter((a, i) => !a.startsWith('--') && i !== outI + 1);
if (!out || !decks.length) { console.error('usage: node build-site.mjs deck.html [more.html ...] --out site/ [--strip-notes]'); process.exit(2); }
if (fs.existsSync(out) && fs.readdirSync(out).length) { console.error(`${out} is not empty; pass a new folder`); process.exit(2); }

const isLocal = u => u && !/^(?:[a-z][\w+.-]*:|\/\/|#|\/)/i.test(u) && !u.includes('${') && !u.includes('...');
// url() only when it names a file with a known extension, so url(...) calls inside the engine's script are left alone
const refRe = /(\s(?:src|href|data-bg|data-src|poster)=")([^"]+)(")|(url\(\s*['"]?)([\w./%-]+\.(?:png|jpe?g|gif|webp|avif|svg|mp4|webm|mp3|m4a|ogg|wav|woff2?|ttf|otf|css))(['"]?\s*\))/gi;
const plan = [], missing = [], pages = [];
const titleOf = h => (h.match(/<main\b[^>]*\sdata-title="([^"]*)"/) || h.match(/<title>([^<]*)<\/title>/) || [, ''])[1].trim();

for (const deck of decks) {
  const abs = path.resolve(deck), dir = path.dirname(abs);
  if (!fs.existsSync(abs)) { missing.push(deck); continue; }
  let html = fs.readFileSync(abs, 'utf8');
  const map = new Map();
  const target = rel => {                                  // where a deck-relative path lands in the site
    const clean = decodeURIComponent(rel.split(/[?#]/)[0]);
    const src = path.resolve(dir, clean);
    const inside = !path.relative(dir, src).startsWith('..');
    const dest = inside ? path.relative(dir, src) : path.join('_ext', path.basename(src));
    return {src, dest, newRef: inside ? rel : rel.replace(clean, dest.split(path.sep).join('/'))};
  };
  html = html.replace(refRe, (m, a1, u1, z1, a2, u2, z2) => {
    const u = u1 ?? u2; if (!isLocal(u)) return m;
    const t = target(u);
    if (!fs.existsSync(t.src)) { missing.push(`${deck}: ${u}`); return m; }
    map.set(t.src, t.dest);
    return u1 !== undefined ? a1 + t.newRef + z1 : a2 + t.newRef + z2;
  });
  const narr = (html.match(/\sdata-narration="([^"]+)"/) || [])[1];
  if (narr && isLocal(narr)) {                             // the clips may not exist yet; the deck then hides the button
    const src = path.resolve(dir, narr);
    if (fs.existsSync(src)) for (const f of fs.readdirSync(src)) map.set(path.join(src, f), path.join(path.relative(dir, src), f));
  }
  if (strip) html = html.replace(/\s*<aside\b[^>]*class="[^"]*\bnotes\b[^"]*"[^>]*>[\s\S]*?<\/aside>/gi, '');
  const name = decks.length === 1 ? 'index.html' : path.basename(abs);
  pages.push({name, title: titleOf(html) || path.basename(abs, '.html'), html});
  for (const [s, d] of map) plan.push([s, d]);
}

if (missing.length) { console.error('missing files (fix these first):\n  ' + missing.join('\n  ')); process.exit(1); }
fs.mkdirSync(out, {recursive: true});
for (const p of pages) fs.writeFileSync(path.join(out, p.name), p.html);
for (const [s, d] of plan) { if (!fs.statSync(s).isFile()) continue; fs.mkdirSync(path.dirname(path.join(out, d)), {recursive: true}); fs.copyFileSync(s, path.join(out, d)); }
if (pages.length > 1) {
  const esc = s => s.replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[c]);
  fs.writeFileSync(path.join(out, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Slides</title>
<style>body{font:18px/1.5 system-ui,sans-serif;max-width:720px;margin:48px auto;padding:0 16px;color:#16171a;background:#fff}a{color:#0a63c9}li{margin:8px 0}@media(prefers-color-scheme:dark){body{background:#141517;color:#eceef1}a{color:#5aa4ff}}</style></head>
<body><h1>Slides</h1><ul>${pages.map(p => `<li><a href="${esc(p.name)}">${esc(p.title)}</a></li>`).join('')}</ul></body></html>\n`);
}
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log(`site: ${out}\n  ${pages.map(p => `${p.name}  (${p.title})`).join('\n  ')}${pages.length > 1 ? '\n  index.html  (list of decks)' : ''}\n  ${new Set(plan.map(p => p[1])).size} asset file(s)${strip ? ', speaker notes removed' : ''}`);
