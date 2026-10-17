#!/usr/bin/env node
/* Regenerates examples/*.html from template.html + examples/src/<name>.html.
   Each source file starts with <!--meta {"theme":"…","title":"…"} --> followed by the slides
   (optional "narration":"audio/<deck>/" turns on per-slide narration).
   Diagrams ({{PIPE}}, {{ARCH1}} …) come from examples/src/gen_diagrams.py. Authors of a new deck can skip this:
   just copy template.html and replace the slides. */
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {addLooks, looks} from './tools/looks.mjs';
const here = path.dirname(new URL(import.meta.url).pathname);
const tpl = fs.readFileSync(path.join(here, 'template.html'), 'utf8');
const dg = JSON.parse(execFileSync('python3', ['-B', '-c', `import json,sys;sys.path.insert(0,'${path.join(here, 'examples/src')}');import gen_diagrams as g;print(json.dumps({'PIPE':g.pipe(),'EMB':g.emb(),'ATT':g.att(),'ARCH1':g.arch1(),'ARCH2':g.arch2()}))`]).toString());
for (const [srcDir, outDir] of [['examples/src', 'examples'], ['library/src', 'library']]) for (const f of fs.readdirSync(path.join(here, srcDir)).filter(f => f.endsWith('.html'))) {
  let src = fs.readFileSync(path.join(here, srcDir, f), 'utf8');
  const meta = JSON.parse(src.match(/^<!--meta (.*?) -->/)[1]); src = src.replace(/^<!--meta .*? -->\n/, '');
  src = src.replace(/\{\{(\w+)\}\}/g, (_, k) => dg[k]);
  let out = tpl.replace(/(<!-- SLIDES:START -->)[\s\S]*(<!-- SLIDES:END -->)/, (_, a, b) => `${a}\n${src}\n${b}`)
    .replace('data-theme="keynote-white"', `data-theme="${meta.theme}"`).replace('data-fonts=""', `data-fonts="${meta.fonts || ''}"`)
    .replace('<title>present-in-html template</title>', `<title>${meta.pageTitle || meta.title}</title>`).replace('data-title="present-in-html template"', `data-title="${meta.title}"`);
  if (meta.narration) out = out.replace('<main class="deck"', `<main class="deck" data-narration="${meta.narration}"`); // one MP3 per slide in that folder, named by data-id
  if (meta.lang) out = out.replace('<html lang="en"', `<html lang="${meta.lang}"${meta.dir ? ` dir="${meta.dir}"` : ''}`); // Arabic decks: lang and dir come from the meta line
  out = addLooks(out, {themes: meta.looks === 'all' ? 'all' : meta.looks || [], fonts: meta.looks === 'all' ? 'all' : [], keep: false}); // meta.looks: 'all' or [theme ids]; the deck's own theme and fonts are always added
  fs.writeFileSync(path.join(here, outDir, f), out); console.log('built ' + outDir + '/' + f);
}

/* ---- fonts.html: a specimen library generated from the FONTS and THEME blocks in template.html ---- */
{
  const css = tpl.match(/<style id="kp-themes">([\s\S]*?)<\/style>/)[1] + '\n' + looks().themes.map(x => fs.readFileSync(path.join(here, 'library/themes', x.id + '.css'), 'utf8')).join('\n') + '\n' + looks().fonts.map(x => fs.readFileSync(path.join(here, 'library/fonts', x.id + '.css'), 'utf8')).join('\n');
  const fonts = [...css.matchAll(/\/\* FONTS:([\w-]+) \| ([^|]*?) \| (\S*) \*\/\s*html\[data-fonts="[\w-]+"\]\{([^}]*)\}/g)].map(m => ({id: m[1], label: m[2], url: m[3], tokens: m[4]}));
  const themes = [...css.matchAll(/\/\* THEME:([\w-]+) \| ([^|]*?) \| ([^|]*?) \| (\S*) \*\/\s*html\[data-theme="[\w-]+"\]\{([^}]*)\}/g)].map(m => ({id: m[1], label: m[2], swatch: m[3], url: m[4], tokens: m[5]}));
  const urls = [...new Set([...fonts, ...themes].map(f => f.url).filter(Boolean))];
  const card = (cls, name, note) => `<article class="card ${cls}"><header><b>${name}</b><span>${note}</span></header>
    <h2>Make the <em>numbers</em> speak</h2><p class="body">Great decks lead with one claim and prove it. Body text should stay readable from the back of the room: 4.2M users, 38.4% faster, 1,840 customers.</p>
    <pre>const next = (step) =&gt; step + 1;  // 0123456789</pre></article>`;
  const rules = [...fonts.map(f => `.fp-${f.id}{${f.tokens}}`), ...themes.map(t => `.th-${t.id}{${t.tokens}}`)].join('\n');
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>present-in-html font and theme library</title>
${urls.map(u => `<link rel="stylesheet" href="${u}">`).join('\n')}
<style>
body{margin:0;font:16px/1.5 system-ui,sans-serif;background:#f3f3f5;color:#111}
header.top{position:sticky;top:0;background:#fff;border-bottom:1px solid #ddd;padding:14px 28px;display:flex;gap:20px;align-items:center;flex-wrap:wrap;z-index:2}
header.top h1{font-size:18px;margin:0}header.top input{flex:1;min-width:0;min-height:44px;border:1px solid #bbb;border-radius:8px;padding:0 12px;font:16px system-ui}
main{padding:28px;max-width:1500px;margin:0 auto}h3{margin:34px 0 14px;font-size:14px;letter-spacing:.06em;text-transform:uppercase;color:#555}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(420px,100%),1fr));gap:20px}
.card{background:var(--bg,#fff);color:var(--ink,#111);border:1px solid var(--rule,#ddd);border-radius:10px;padding:26px 28px;font-family:var(--f-body)}
.card header{display:flex;justify-content:space-between;gap:12px;font:500 13px ui-monospace,Menlo,monospace;color:var(--ink2,#555);margin-bottom:18px}.card header b{color:var(--ink,#111)}
.card h2{margin:0 0 14px;font:var(--w-display,700) 44px/1.05 var(--f-display);letter-spacing:var(--ls-display,0)}.card h2 em{font-style:var(--em-style,normal);color:var(--brand-text,var(--brand,#06c))}
.card .body{margin:0 0 16px;font-size:18px;color:var(--ink2,#555)}.card pre{margin:0;padding:12px 14px;background:var(--code-bg,#f3f3f5);color:var(--code-ink,#111);font:15px var(--f-mono);border-radius:var(--radius,6px);overflow:auto;white-space:pre-wrap}
.fp-card{--bg:#fff}
${rules}
</style></head><body>
<header class="top"><h1>present-in-html: font pairings and theme defaults</h1><input id="q" type="text" value="Make the numbers speak" aria-label="Preview headline: type your own title"><span>${fonts.length} pairings, ${themes.length} themes. Set one with data-fonts / data-theme on &lt;html&gt; or press S in a deck.</span></header>
<main><h3>Font pairings</h3><div class="grid">${fonts.map(f => card(`fp-${f.id}`, f.label, `data-fonts="${f.id}"`)).join('\n')}</div>
<h3>Theme defaults (their own colours and type)</h3><div class="grid">${themes.map(t => card(`th-${t.id}`, t.label, `data-theme="${t.id}"`)).join('\n')}</div></main>
<script>document.getElementById('q').addEventListener('input',e=>{document.querySelectorAll('.card h2').forEach(h=>{h.textContent=e.target.value||'Make the numbers speak'})})</script>
</body></html>`;
  fs.writeFileSync(path.join(here, 'fonts.html'), html); console.log(`built fonts.html (${fonts.length} pairings, ${themes.length} themes)`);
}
