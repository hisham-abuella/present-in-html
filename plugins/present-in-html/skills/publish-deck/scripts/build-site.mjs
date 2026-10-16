#!/usr/bin/env node
// Build a static site folder for GitHub Pages from one or more Keynote Pro decks. No dependencies.
//   node build-site.mjs deck.html [more.html ...] --out site/ [--strip-notes]
// One deck becomes site/index.html; several keep their names and get an index.html that links to each.
// Every local file a deck points to (src, href, data-bg, data-src, poster, url(), the data-narration folder) is copied
// with the same relative path. --strip-notes removes <aside class="notes"> from the published copies (the source decks are
// untouched).
// Everything copied ends up public, so the rules are strict: a file must sit inside the deck's folder after symlinks are
// resolved (with --allow-outside, a file outside it is copied into _ext/ and the reference rewritten); hidden files and
// folders are never copied; only web file types are copied (images, video, audio, fonts, styles, scripts, pages, plain data).
// Exits 1, copying nothing, if a referenced file is missing or refused.
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const outI = args.indexOf('--out');
const out = outI >= 0 ? path.resolve(args[outI + 1] || '') : null;
const strip = args.includes('--strip-notes');
const allowOutside = args.includes('--allow-outside');
const decks = args.filter((a, i) => !a.startsWith('--') && i !== outI + 1);
if (!out || !decks.length) { console.error('usage: node build-site.mjs deck.html [more.html ...] --out site/ [--strip-notes] [--allow-outside]'); process.exit(2); }
if (fs.existsSync(out) && fs.readdirSync(out).length) { console.error(`${out} is not empty; pass a new folder`); process.exit(2); }

const isLocal = u => u && !/^(?:[a-z][\w+.-]*:|\/\/|#|\/)/i.test(u) && !u.includes('${') && !u.includes('...');
// url() only when it names a file with a known extension, so url(...) calls inside the engine's script are left alone
const refRe = /(\s(?:src|href|data-bg|data-src|poster)=")([^"]+)(")|(url\(\s*['"]?)([\w./%-]+\.(?:png|jpe?g|gif|webp|avif|svg|mp4|webm|mp3|m4a|ogg|wav|woff2?|ttf|otf|css))(['"]?\s*\))/gi;
const plan = [], missing = [], refused = [], pages = [];
const WEB = /\.(png|jpe?g|gif|webp|avif|svg|ico|mp4|webm|mov|m4v|mp3|m4a|ogg|oga|wav|vtt|woff2?|ttf|otf|css|js|mjs|json|html?|pdf|txt|csv)$/i;
const hidden = p => p.split(path.sep).some(seg => seg.startsWith('.') && seg !== '.' && seg !== '..');
const within = (root, p) => p === root || p.startsWith(root + path.sep);
const titleOf = h => (h.match(/<main\b[^>]*\sdata-title="([^"]*)"/) || h.match(/<title>([^<]*)<\/title>/) || [, ''])[1].trim();

for (const deck of decks) {
  if (!fs.existsSync(deck)) { missing.push(deck); continue; }
  const abs = fs.realpathSync(deck), dir = path.dirname(abs);
  let html = fs.readFileSync(abs, 'utf8');
  const map = new Map();
  // Decide whether a referenced file may be published, and where it lands. Returns null (and records why) if not.
  const target = (rel, label) => {
    let clean; try { clean = decodeURIComponent(rel.split(/[?#]/)[0]); } catch { refused.push(`${label}: ${rel} (bad escape)`); return null; }
    const given = path.resolve(dir, clean);
    if (!fs.existsSync(given)) { missing.push(`${label}: ${rel}`); return null; }
    const src = fs.realpathSync(given);                   // follow symlinks: the real file is what would be published
    if (!fs.statSync(src).isFile()) return null;          // a folder link: nothing to copy
    const inside = within(dir, src);
    if (hidden(inside ? path.relative(dir, src) : src)) { refused.push(`${label}: ${rel} (hidden file or folder)`); return null; }
    if (!WEB.test(src)) { refused.push(`${label}: ${rel} (not a web file type)`); return null; }
    if (!inside && !allowOutside) { refused.push(`${label}: ${rel} (outside the deck's folder: move it next to the deck, or pass --allow-outside)`); return null; }
    const dest = inside ? path.relative(dir, src) : path.join('_ext', path.basename(src));
    return {src, dest, newRef: inside ? rel : rel.replace(clean, dest.split(path.sep).join('/'))};
  };
  html = html.replace(refRe, (m, a1, u1, z1, a2, u2, z2) => {
    const u = u1 ?? u2; if (!isLocal(u)) return m;
    const t = target(u, deck); if (!t) return m;
    map.set(t.src, t.dest);
    return u1 !== undefined ? a1 + t.newRef + z1 : a2 + t.newRef + z2;
  });
  const narr = (html.match(/\sdata-narration="([^"]+)"/) || [])[1];
  if (narr && isLocal(narr)) {                             // the clips may not exist yet; the deck then hides the button
    const folder = path.resolve(dir, narr);
    if (fs.existsSync(folder)) {
      const real = fs.realpathSync(folder);
      if (!within(dir, real) || hidden(path.relative(dir, real))) refused.push(`${deck}: data-narration="${narr}" (must be a folder inside the deck's folder)`);
      else for (const f of fs.readdirSync(real)) { const t = target(path.relative(dir, path.join(real, f)), `${deck} narration`); if (t) map.set(t.src, t.dest); }
    }
  }
  if (strip) html = html.replace(/\s*<aside\b[^>]*class="[^"]*\bnotes\b[^"]*"[^>]*>[\s\S]*?<\/aside>/gi, '');
  const name = decks.length === 1 ? 'index.html' : path.basename(abs);
  pages.push({name, title: titleOf(html) || path.basename(abs, '.html'), html});
  for (const [s, d] of map) plan.push([s, d]);
}

if (missing.length || refused.length) {
  if (missing.length) console.error('missing files (fix these first):\n  ' + missing.join('\n  '));
  if (refused.length) console.error('refused, not published:\n  ' + refused.join('\n  '));
  process.exit(1);
}
const into = d => { const p = path.resolve(out, d); if (!within(out, p)) throw new Error(`refusing to write outside ${out}: ${d}`); return p; };
fs.mkdirSync(out, {recursive: true});
for (const p of pages) fs.writeFileSync(into(p.name), p.html);
for (const [s, d] of plan) { const to = into(d); fs.mkdirSync(path.dirname(to), {recursive: true}); fs.copyFileSync(s, to); }
if (pages.length > 1) {
  const esc = s => s.replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[c]);
  fs.writeFileSync(path.join(out, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Slides</title>
<style>body{font:18px/1.5 system-ui,sans-serif;max-width:720px;margin:48px auto;padding:0 16px;color:#16171a;background:#fff}a{color:#0a63c9}li{margin:8px 0}@media(prefers-color-scheme:dark){body{background:#141517;color:#eceef1}a{color:#5aa4ff}}</style></head>
<body><h1>Slides</h1><ul>${pages.map(p => `<li><a href="${esc(p.name)}">${esc(p.title)}</a></li>`).join('')}</ul></body></html>\n`);
}
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log(`site: ${out}\n  ${pages.map(p => `${p.name}  (${p.title})`).join('\n  ')}${pages.length > 1 ? '\n  index.html  (list of decks)' : ''}\n  ${new Set(plan.map(p => p[1])).size} asset file(s)${strip ? ', speaker notes removed' : ''}`);
