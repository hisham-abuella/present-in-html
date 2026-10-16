/* Shared helpers: put library looks into a deck, and move a deck onto the current engine.
   A deck stays ONE file: the chosen library/themes/<id>.css and library/fonts/<id>.css are copied in between the
   LIBRARY markers of its <style id="kp-themes">, and the settings panel (S) lists them under "Library". */
import fs from 'node:fs';
import path from 'node:path';
export const here = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const L = path.join(here, 'library');
export const looks = () => JSON.parse(fs.readFileSync(path.join(L, 'looks.json'), 'utf8'));
const block = (name, body) => `/* LIBRARY:${name}:START */\n${body}\n/* LIBRARY:${name}:END */`;
const markers = name => new RegExp(`/\\* LIBRARY:${name}:START \\*/[\\s\\S]*?/\\* LIBRARY:${name}:END \\*/`);
const ids = (html, name) => [...((html.match(markers(name)) || [''])[0]).matchAll(name === 'THEMES' ? /\/\* THEME:([\w-]+) \|/g : /\/\* FONTS:([\w-]+) \|/g)].map(m => m[1]);

/* themes / fonts: arrays of ids, or 'all'. keep: also keep whatever library looks the deck already has. The deck's own
   data-theme / data-fonts are always included when they are library looks. Unknown ids throw with the list of real ones. */
export function addLooks(html, {themes = [], fonts = [], keep = true} = {}) {
  const lib = looks(), T = lib.themes.map(t => t.id), F = lib.fonts.map(f => f.id);
  const want = (list, all, name, attr) => {
    let s = list === 'all' ? [...all] : [...list];
    if (keep) s.push(...ids(html, name));
    const cur = (html.match(new RegExp(`<html[^>]*\\b${attr}="([\\w-]*)"`)) || [])[1]; if (cur && all.includes(cur)) s.push(cur);
    const bad = s.filter(x => !all.includes(x)); if (bad.length) throw new Error(`unknown ${name.toLowerCase()}: ${bad.join(', ')}. Library has: ${all.join(', ')}`);
    return all.filter(x => s.includes(x)); // library order, no duplicates
  };
  const th = want(themes, T, 'THEMES', 'data-theme'), fo = want(fonts, F, 'FONTS', 'data-fonts');
  const read = (dir, id) => fs.readFileSync(path.join(L, dir, id + '.css'), 'utf8').trim();
  if (!markers('THEMES').test(html) || !markers('FONTS').test(html)) throw new Error('this deck has no LIBRARY markers: run tools/upgrade.mjs on it first');
  return html.replace(markers('THEMES'), () => block('THEMES', th.length ? th.map(id => read('themes', id)).join('\n') : '/* Library themes are added per deck from library/themes by tools/add-look.mjs */'))
             .replace(markers('FONTS'), () => block('FONTS', fo.length ? fo.map(id => read('fonts', id)).join('\n') : '/* Library font pairings are added per deck from library/fonts by tools/add-look.mjs */'));
}

/* Replace a deck's engine (CSS + JS) and core themes with the current template's; slides, title, own <style>/<script>
   blocks and library looks are kept (library looks are refreshed from library/). */
export function upgrade(html) {
  const tpl = fs.readFileSync(path.join(here, 'template.html'), 'utf8');
  const part = (s, re, what) => { const m = s.match(re); if (!m) throw new Error('missing ' + what); return m[0]; };
  // anchored to line starts: every deck's header comment mentions <style id="kp-engine"> in prose
  const STYLE_T = /^<style id="kp-themes">[\s\S]*?^<\/style>/m, STYLE_E = /^<style id="kp-engine">[\s\S]*?^<\/style>/m, JS = /^<script id="kp-engine-js">[\s\S]*?^<\/script>/m;
  const keepT = ids(html, 'THEMES'), keepF = ids(html, 'FONTS');
  const oldThemes = part(html, STYLE_T, 'kp-themes');
  const legacy = [...oldThemes.matchAll(/\/\* THEME:([\w-]+) \|/g)].map(m => m[1]); // decks made before the split had every library theme inline
  const lib = looks(), libT = lib.themes.map(t => t.id), libF = lib.fonts.map(f => f.id);
  let out = html.replace(STYLE_T, () => part(tpl, STYLE_T, 'template kp-themes')).replace(STYLE_E, () => part(tpl, STYLE_E, 'template kp-engine')).replace(JS, () => part(tpl, JS, 'template kp-engine-js'));
  const t = [...new Set([...keepT, ...legacy.filter(x => libT.includes(x))])], f = [...new Set([...keepF, ...[...oldThemes.matchAll(/\/\* FONTS:([\w-]+) \|/g)].map(m => m[1]).filter(x => libF.includes(x))])];
  return addLooks(out, {themes: t, fonts: f, keep: false});
}
