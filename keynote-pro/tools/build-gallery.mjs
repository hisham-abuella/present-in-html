#!/usr/bin/env node
/* Builds library/thumbs/*.jpg (title slide of each sample deck), library/index.html (the gallery) and the "Theme library"
   section of README.md from tools/library-data.mjs. Needs Playwright like check.mjs. Usage: node tools/build-gallery.mjs [--no-thumbs] */
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import data, {FIELDS} from './library-data.mjs';
const here = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const md = s => s.replace(/`([^`]+)`/g, '<code>$1</code>');

if (!process.argv.includes('--no-thumbs')) {
  const pw = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
  const chromium = pw.chromium || pw.default.chromium;
  const browser = await chromium.launch(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {});
  fs.mkdirSync(path.join(here, 'library/thumbs'), {recursive: true});
  const page = await browser.newPage({viewport: {width: 960, height: 540}});
  for (const d of data) {
    await page.goto(pathToFileURL(path.join(here, `library/${d.slug}.html`)).href);
    await page.waitForFunction(() => window.kp && window.kp.ready); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(250);
    await page.addStyleTag({content: '.kp-ui,.kp-progress,.kp-toast{display:none!important}'}); await page.evaluate(() => { document.documentElement.classList.add('kp-idle'); window.kp.showAll(0); });
    await page.waitForTimeout(80);
    await page.screenshot({path: path.join(here, `library/thumbs/${d.slug}.jpg`), type: 'jpeg', quality: 82});
  }
  await browser.close();
}

const modeKey = d => d.mode.startsWith('dark') ? 'dark' : 'light';
const cards = data.map(d => `<li class="card" data-field="${d.field}" data-mode="${modeKey(d)}">
  <a href="${d.slug}.html"><img src="thumbs/${d.slug}.jpg" width="960" height="540" loading="lazy" alt="Title slide of the ${esc(d.profession)} sample deck, ${esc(d.label)} theme"></a>
  <div class="body">
    <p class="no">${String(d.n).padStart(2, '0')} &middot; ${esc(FIELDS[d.field])}</p>
    <h2><a href="${d.slug}.html">${esc(d.profession)}</a></h2>
    <dl>
      <div><dt>Theme</dt><dd><b>${esc(d.label)}</b> <code>data-theme="${d.theme}"</code> &middot; ${esc(d.mode)}</dd></div>
      <div><dt>Fonts</dt><dd>${esc(d.fontsLabel)} <code>data-fonts="${d.fonts}"</code></dd></div>
      <div><dt>Best for</dt><dd>${esc(d.bestFor)}</dd></div>
      <div><dt>Recipe</dt><dd>${esc(d.recipe)}</dd></div>
    </dl>
    <p class="sw" aria-label="Palette">${d.sw.map(c => `<i style="background:${c}" title="${c}"></i>`).join('')}<span>${d.sw.join(' ')}</span></p>
  </div></li>`).join('\n');

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>present-in-html skill theme library: 26 professions</title>
<style>
:root{--ink:#16181d;--ink2:#4a505b;--bg:#eceef1;--card:#fff;--rule:#cfd3da;--accent:#1f4fc1}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
a{color:inherit}
header.top{padding:48px 24px 8px;max-width:1500px;margin:0 auto}
header.top h1{font-size:clamp(30px,5vw,56px);line-height:1.05;margin:0 0 12px;letter-spacing:-0.03em}
header.top p{margin:0;max-width:760px;color:var(--ink2);font-size:18px}
header.top nav{display:flex;flex-wrap:wrap;gap:8px 20px;margin-top:16px;font-size:15px}
header.top nav a{color:var(--accent);min-height:40px;display:inline-flex;align-items:center}
.filters{position:sticky;top:0;z-index:5;background:var(--bg);border-bottom:1px solid var(--rule);padding:12px 24px;max-width:none}
.filters .in{max-width:1500px;margin:0 auto;display:flex;flex-wrap:wrap;gap:8px 28px;align-items:center}
.group{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.group>span{font:500 13px ui-monospace,Menlo,monospace;color:var(--ink2);margin-inline-end:4px}
button.f{font:inherit;font-size:15px;min-height:40px;padding:0 14px;border:1px solid var(--rule);background:var(--card);color:var(--ink);border-radius:20px;cursor:pointer}
button.f[aria-pressed="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
button.f:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.count{margin-inline-start:auto;color:var(--ink2);font-size:15px}
ul.grid{list-style:none;margin:0 auto;padding:24px;max-width:1500px;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,420px),1fr));gap:24px}
.card{background:var(--card);border:1px solid var(--rule);display:flex;flex-direction:column;min-width:0}
.card[hidden]{display:none}
.card>a{display:block;line-height:0;border-bottom:1px solid var(--rule)}
.card img{width:100%;height:auto;display:block}
.card>a:focus-visible,.card h2 a:focus-visible{outline:3px solid var(--accent);outline-offset:-3px}
.body{padding:18px 20px 20px;display:flex;flex-direction:column;gap:10px;flex:1}
.no{margin:0;font:500 13px ui-monospace,Menlo,monospace;color:var(--ink2)}
.card h2{margin:0;font-size:22px;line-height:1.2;letter-spacing:-0.01em}
.card h2 a{text-decoration:none}.card h2 a:hover{text-decoration:underline}
dl{margin:0;display:flex;flex-direction:column;gap:6px;font-size:15px;line-height:1.4}
dl>div{display:grid;grid-template-columns:76px 1fr;gap:0 12px}
dt{color:var(--ink2);font-size:14px;padding-top:1px}dd{margin:0;min-width:0;overflow-wrap:anywhere}
code{font:13px ui-monospace,Menlo,monospace;background:#eef0f3;padding:1px 5px}
.sw{display:flex;align-items:center;gap:6px;margin:auto 0 0;padding-top:6px}
.sw i{width:26px;height:26px;border:1px solid rgba(0,0,0,.2);flex:none}
.sw span{font:12px ui-monospace,Menlo,monospace;color:var(--ink2);margin-inline-start:6px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.empty{padding:40px 24px;text-align:center;color:var(--ink2)}
footer{max-width:1500px;margin:0 auto;padding:8px 24px 48px;color:var(--ink2);font-size:15px}
@media (max-width:700px){.filters{position:static}}
@media (max-width:480px){header.top{padding:32px 16px 8px}.filters{padding:10px 16px}ul.grid{padding:16px;gap:16px}.count{margin:0}}
</style></head><body>
<header class="top"><h1>Theme library</h1>
<p>Twenty-six professions, twenty-six looks. Each card opens a short sample deck built from the present-in-html template with that theme, its font pairing and a recommended slide sequence. Any deck can switch to any theme: press <b>S</b>.</p>
<nav><a href="../README.md">README: Theme library</a><a href="../template.html">Template</a><a href="../fonts.html">Font and theme specimens</a><a href="../../index.html#library">All examples</a><a href="https://hisham-abuella.github.io/present-in-html/">present-in-html skill website</a></nav></header>
<div class="filters"><div class="in">
<div class="group" role="group" aria-label="Filter by field"><span>Field</span><button class="f" type="button" data-k="field" data-v="all" aria-pressed="true">All</button>${Object.entries(FIELDS).map(([k, v]) => `<button class="f" type="button" data-k="field" data-v="${k}" aria-pressed="false">${esc(v)}</button>`).join('')}</div>
<div class="group" role="group" aria-label="Filter by light or dark"><span>Look</span><button class="f" type="button" data-k="mode" data-v="all" aria-pressed="true">All</button><button class="f" type="button" data-k="mode" data-v="light" aria-pressed="false">Light</button><button class="f" type="button" data-k="mode" data-v="dark" aria-pressed="false">Dark</button></div>
<span class="count" role="status" aria-live="polite" id="count"></span></div></div>
<ul class="grid" id="grid">
${cards}
</ul>
<p class="empty" id="empty" hidden>No theme matches both filters.</p>
<footer>Sample decks use fictional people, companies, patients and clients. Light means a light content page; a dark title slide on a light theme still counts as Light.</footer>
<script>
(function(){var f={field:'all',mode:'all'},cards=[].slice.call(document.querySelectorAll('.card')),cnt=document.getElementById('count'),em=document.getElementById('empty');
function run(){var n=0;cards.forEach(function(c){var ok=(f.field==='all'||c.dataset.field===f.field)&&(f.mode==='all'||c.dataset.mode===f.mode);c.hidden=!ok;if(ok)n++});cnt.textContent=n+' of '+cards.length+' themes';em.hidden=n>0}
document.querySelectorAll('button.f').forEach(function(b){b.addEventListener('click',function(){f[b.dataset.k]=b.dataset.v;document.querySelectorAll('button.f[data-k="'+b.dataset.k+'"]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});run()})});run()})();
</script></body></html>`;
fs.writeFileSync(path.join(here, 'library/index.html'), html);

/* ---- README section ---- */
const row = d => `| ${d.n} | ${d.profession} | \`${d.theme}\` | ${d.fontsLabel} (\`${d.fonts}\`) | ${d.recipe} | [${d.slug}](library/${d.slug}.html) |`;
const specs = data.map(d => `#### ${d.n}. ${d.label} (\`${d.theme}\`): ${d.profession}
- **Overview.** ${d.spec.overview}
- **Colors.** ${d.spec.colors}
- **Typography.** ${d.spec.typography}
- **Shape.** ${d.spec.shape}
- **Signature.** ${d.spec.signature}
- **Do / Don't.** ${d.spec.dodont}
`).join('\n');
const section = `<!-- LIBRARY:START (generated by tools/build-gallery.mjs from tools/library-data.mjs; edit the data file) -->
## 14. Theme library: one look per profession

Twenty-six themes and twenty-six font pairings, each tested on a six-to-eight slide sample deck in \`library/\`. Open \`library/index.html\` for the gallery (filter by field and by light or dark).
Library themes are not in \`template.html\`: copy one into a deck with \`node tools/add-look.mjs deck.html --theme id\` (or \`--all\`), then switch in the settings panel (**S**) or with \`data-theme\` and \`data-fonts\`. A theme's own font pairing is its default;
the matching \`data-fonts\` id is listed so you can pair it with any other theme.

| # | Profession | Theme | Fonts | Recipe (layouts in order) | Sample deck |
|---|---|---|---|---|---|
${data.map(row).join('\n')}

New layouts these recipes use: \`case\`, \`ask\`, \`rows\`, \`quiz\`, \`materials\`, \`formula\`, and \`data-cols="3"\` on \`two-column\` (see the cheat-sheet in section 2).
Build tools: \`node tools/build-library.mjs\` (expands \`library/themes/src\` into \`library/themes\`, indexes \`library/looks.json\`, splices layouts into \`template.html\`), \`node tools/add-look.mjs deck.html --theme id\` (copies a look into a deck), \`node build-examples.mjs\` (rebuilds examples, library decks and \`fonts.html\`),
\`node tools/build-gallery.mjs\` (thumbnails, gallery, this section) and \`node tools/contrast.mjs\` (token contrast audit of every theme).

### Theme specs (DESIGN.md format)

${specs}<!-- LIBRARY:END -->`;
let r = fs.readFileSync(path.join(here, 'README.md'), 'utf8');
if (/<!-- LIBRARY:START/.test(r)) r = r.replace(/<!-- LIBRARY:START[\s\S]*?<!-- LIBRARY:END -->/, () => section);
else r = r.replace(/\s*$/, '') + `\n\n${section}\n`;
fs.writeFileSync(path.join(here, 'README.md'), r);
console.log('gallery + README section written');
