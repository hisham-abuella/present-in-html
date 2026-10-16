#!/usr/bin/env node
/* Keynote Pro checker.  Usage:
     node check.mjs deck.html [more.html ...] [--themes] [--shots out/] [--outline]
   Opens each deck at 1920x1080, shows every slide with all builds revealed and reports, per slide:
     layout   unknown data-layout (the list is read from template.html), no title, bullet lists over 6 items or 40 words
     media    missing image file or alt, bad data-chart type, malformed data-values / table numbers
     fit      content outside the safe area, text wider than its box, audience text under 28px, contrast under 4.5:1
     other    console errors; WARNINGS (do not fail): slides without speaker notes
   Exit code 1 on any error.  --themes repeats the run in every theme; --shots saves PNGs (toolbar hidden); --outline prints the outline.
   Needs Playwright; it is searched for automatically (see findPlaywright).  If it fails the error prints the env-var line to use. */
import path from 'node:path';
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';

const args = process.argv.slice(2);
const flag = n => args.includes(n);
const wantOutline = args.includes('--outline');
const shotsDir = args.includes('--shots') ? args[args.indexOf('--shots') + 1] : null;
const files = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--shots');
if (!files.length) { console.error('usage: node check.mjs deck.html [...] [--themes] [--shots dir]'); process.exit(2); }

const HERE = path.dirname(new URL(import.meta.url).pathname);
const HOME = process.env.HOME || '';
const tryDirs = d => { try { return fs.readdirSync(d).map(n => path.join(d, n)); } catch { return []; } };
async function findPlaywright() {
  const cands = [];
  if (process.env.PLAYWRIGHT_MODULE) cands.push(process.env.PLAYWRIGHT_MODULE);
  // Never the current folder: the checker runs on decks from anywhere, and a deck's folder must not be able to supply code.
  for (const root of [HERE, path.join(HOME, '.kp-tools')]) for (const n of ['playwright', 'playwright-core']) cands.push(path.join(root, 'node_modules', n));
  try { const g = (await import('node:child_process')).execSync('npm root -g', {encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 4000}).trim(); for (const n of ['playwright', 'playwright-core']) cands.push(path.join(g, n)); } catch {}
  for (const d of tryDirs(path.join(HOME, '.npm/_npx'))) for (const n of ['playwright', 'playwright-core']) cands.push(path.join(d, 'node_modules', n));
  for (const f of [() => import('playwright'), () => import('playwright-core')]) { try { const m = await f(); return {mod: m, from: 'import'}; } catch {} }
  for (const c of cands) {
    for (const entry of [c, path.join(c, 'index.mjs'), path.join(c, 'index.js')]) {
      try { if (!fs.existsSync(entry) || fs.statSync(entry).isDirectory()) continue; return {mod: await import(pathToFileURL(entry).href), from: entry}; } catch {}
    }
  }
  return null;
}
function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const found = [];
  for (const base of [path.join(HOME, 'Library/Caches/ms-playwright'), path.join(HOME, '.cache/ms-playwright')])
    for (const d of tryDirs(base).filter(d => /chromium-\d+$/.test(d))) for (const rel of ['chrome-mac/Chromium.app/Contents/MacOS/Chromium', 'chrome-mac-arm64/Chromium.app/Contents/MacOS/Chromium', 'chrome-linux/chrome', 'chrome-win/chrome.exe']) found.push(path.join(d, rel));
  found.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser');
  return found.find(f => fs.existsSync(f)) || null;
}
const pwFound = await findPlaywright();
const hint = (modPath, chrome) => `  set once:  export PLAYWRIGHT_MODULE=${modPath || '/path/to/node_modules/playwright/index.mjs'} CHROME_PATH=${chrome || '"/path/to/chrome"'}\n  or run:    PLAYWRIGHT_MODULE=${modPath || '/path/to/node_modules/playwright/index.mjs'} CHROME_PATH=${chrome || '"/path/to/chrome"'} node check.mjs ${files.join(' ')}`;
if (!pwFound) { console.error('check.mjs: Playwright not found (tried env PLAYWRIGHT_MODULE, ./node_modules, global npm root, the npx cache).\n  install outside the skill folder:  mkdir -p ~/.kp-tools && cd ~/.kp-tools && npm i playwright && npx playwright install chromium\n' + hint(HOME + '/.kp-tools/node_modules/playwright/index.mjs', null)); process.exit(2); }
const pw = pwFound.mod, chromium = pw.chromium || pw.default.chromium;
let browser;
try { browser = await chromium.launch(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {}); }
catch (e) {
  const chrome = findChrome();
  try { if (!chrome) throw e; browser = await chromium.launch({executablePath: chrome}); }
  catch (e2) { console.error('check.mjs: Playwright found but no browser could start (' + String(e2.message).split('\n')[0] + ').\n  install one:  npx playwright install chromium\n' + hint(pwFound.from === 'import' ? null : pwFound.from, chrome)); process.exit(2); }
}

/* layouts the template knows: every data-layout="x" in template.html (next to this file) */
let LAYOUTS = null;
try { LAYOUTS = [...new Set([...fs.readFileSync(path.join(HERE, 'template.html'), 'utf8').matchAll(/data-layout="([a-z0-9-]+)"/g)].map(m => m[1]))]; } catch {}
const MIN_PX = 28, MIN_SMALL = 20;   /* audience text 28px; kickers, sources, captions, chart and diagram labels 20px */

/* ---- static authoring checks, run once per deck in the page ---- */
async function authoring(layouts) {
  const out = [], warn = [];
  const slides = window.kp.slides;
  const name = e => { let t = e.tagName.toLowerCase(); if (e.className && typeof e.className === 'string' && e.className.trim()) t += '.' + e.className.trim().split(/\s+/)[0]; return t; };
  const words = t => t.trim().split(/\s+/).filter(Boolean).length;
  const imgLoaded = src => new Promise(res => { const im = new Image(); const t = setTimeout(() => res(false), 4000); im.onload = () => { clearTimeout(t); res(true); }; im.onerror = () => { clearTimeout(t); res(false); }; im.src = src; });
  const noNotes = [];
  for (let i = 0; i < slides.length; i++) {
    const s = slides[i], n = i + 1, lay = s.dataset.layout, add = (el, m, fix) => out.push({slide: n, m: el + ' ' + m, fix});
    if (!lay) add('section', 'has no data-layout', 'add data-layout="bullets" (or another layout from README section 2)');
    else if (layouts && !layouts.includes(lay)) add(`data-layout="${lay}"`, 'is not a known layout', 'use one of: ' + layouts.join(', '));
    const hasTitle = [...s.querySelectorAll('h1,h2,blockquote,.big')].some(e => !e.closest('.notes') && e.textContent.trim());
    if (!hasTitle) add('slide', 'has no title (h1/h2, blockquote or .big)', 'start the slide with <h2>its one claim</h2>');
    for (const l of s.querySelectorAll('ul:not([class]),ol:not([class])')) {
      if (l.closest('.notes')) continue;
      const items = [...l.children].filter(c => c.tagName === 'LI');
      if (items.length > 6) add(name(l), `has ${items.length} bullets (max 6)`, 'cut to 5 or split into two slides');
      items.forEach((li, k) => { const w = words(li.textContent); if (w > 40) add('li #' + (k + 1), `has ${w} words (max 40)`, 'say the number, not the paragraph; move detail to the notes'); });
    }
    for (const im of s.querySelectorAll('img')) {
      const shown = im.getAttribute('src') || '';
      if (!im.hasAttribute('alt')) add(`img "${shown.slice(-30)}"`, 'has no alt attribute', 'add alt="what it shows" (alt="" if purely decorative)');
      if (!im.complete || !im.naturalWidth) { await new Promise(r => setTimeout(r, 150)); }
      if (!(im.complete && im.naturalWidth > 0)) add(`img "${shown.slice(-30)}"`, 'file did not load', 'check the path (relative to the deck) or remove the image');
    }
    if (s.dataset.bg && !(await imgLoaded(s.dataset.bg))) add(`data-bg="${s.dataset.bg.slice(-30)}"`, 'file did not load', 'check the path (relative to the deck)');
    for (const f of s.querySelectorAll('figure.chart, [data-chart]')) {
      const t = f.dataset.chart || 'column', v = f.dataset.values, tb = f.querySelector('table');
      if (!['column', 'bar', 'line'].includes(t)) add(`data-chart="${t}"`, 'is not a chart type', 'use column, bar or line');
      if (v != null) {
        const bad = v.split(',').map(p => p.trim()).filter(p => !/^[^:]+:\s*-?\d+(\.\d+)?$/.test(p));
        if (!v.trim() || bad.length) add('data-values', `is malformed${bad.length ? ' near "' + bad[0].slice(0, 20) + '"' : ''}`, 'write Label:number pairs separated by commas, e.g. Q1:12,Q2:18 (no semicolons, no units)');
      } else if (tb) {
        const rows = [...tb.rows]; const badc = rows.slice(1).flatMap(r => [...r.cells].slice(1)).find(c => !/\d/.test(c.textContent));
        if (rows.length < 2 || badc) add('chart table', 'has a non-numeric cell or no data rows', 'header row, label column, numbers in the rest');
      } else add('figure.chart', 'has no data-values and no table', 'add data-values="Q1:12,Q2:18" or a <table>');
    }
    if (![...s.querySelectorAll('.notes')].some(a => a.textContent.trim())) noNotes.push(n);
  }
  if (noNotes.length) warn.push({slide: noNotes.length > 8 ? noNotes.slice(0, 8).join(', ') + ` ... (${noNotes.length} total)` : noNotes.join(', '), m: 'no speaker notes', fix: 'add <aside class="notes"><p>what to say</p></aside>'});
  return {out, warn};
}

/* ---- runs inside the page, once per slide ---- */
function inPage([i, [MIN_PX, MIN_SMALL]]) {
  const s = window.kp.slides[i], out = [];
  const px = c => { const k = document.createElement('canvas'); k.width = k.height = 1; const x = k.getContext('2d', {willReadFrequently: true}); x.clearRect(0, 0, 1, 1); x.fillStyle = '#000'; x.fillStyle = c; x.fillRect(0, 0, 1, 1); const d = x.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const lum = ([r, g, b]) => { const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
  const over = (f, b) => [0, 1, 2].map(k => f[k] * f[3] + b[k] * (1 - f[3])).concat(1);
  const name = e => { let t = e.tagName.toLowerCase(); if (e.className && typeof e.className === 'string') t += '.' + e.className.trim().split(/\s+/)[0]; const tx = (e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 28); return tx ? `${t} "${tx}"` : t; };
  const vis = e => { const cs = getComputedStyle(e), r = e.getBoundingClientRect(); return cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 0 && r.height > 0; };
  const skip = e => e.closest('.kp-foot,.notes,.sr-only,[data-bleed],.bleed,.num,.kp-ink');
  const fit = +(s.style.getPropertyValue('--fit') || 1);
  const sev = (m, fix) => out.push({m, fix});
  const hasBleedImg = !!s.querySelector('.bleed');
  for (const e of s.querySelectorAll('*')) {
    if (skip(e) || !vis(e)) continue;
    const own = [...e.childNodes].some(n => n.nodeType === 3 && n.nodeValue.trim());
    const box = own || /^(IMG|SVG|FIGURE|PRE|TABLE|UL|OL)$/i.test(e.tagName) && !e.closest('svg');
    const r = e.getBoundingClientRect();
    if (box && !e.closest('svg') || (own && e.closest('svg'))) {
      if (r.left < -1 || r.top < -1 || r.right > 1921 || r.bottom > 1081) sev(`${name(e)} runs off the slide`, 'shorten the text or split the slide');
      else if (r.left < 119 || r.right > 1801 || r.top < 95 || r.bottom > 985) sev(`${name(e)} leaves the safe area (x ${Math.round(r.left)}-${Math.round(r.right)}, y ${Math.round(r.top)}-${Math.round(r.bottom)})${fit < 1 ? ` after auto-fit ${fit}` : ''}`, 'shorten the text, drop an item, or use data-fit="off" with a smaller layout');
    }
    if (own) {
      const cs = getComputedStyle(e), fs = parseFloat(cs.fontSize);
      if (!e.closest('svg') && cs.display !== 'inline' && e.scrollWidth > e.clientWidth + 2 && cs.overflowX === 'visible') sev(`${name(e)} text is wider than its box (${e.scrollWidth} > ${e.clientWidth}px)`, 'shorten the word or text, or give the layout fewer columns');
      const small = e.closest('svg,figcaption,.label,.src,small,.legend,th,.chip,.meta') || /^(SMALL|FIGCAPTION|TIME)$/.test(e.tagName), floor = small ? MIN_SMALL : MIN_PX;
      if (fs < floor - .05) sev(`${name(e)} text is ${fs.toFixed(1)}px (min ${floor}px)`, `raise font-size to ${floor}px or more (remove any inline font-size; cut words if it then overflows)`);
      const svgText = e.closest('svg'); const fg0 = svgText ? cs.fill : cs.color;
      let clipCols = null;
      if (cs.webkitTextFillColor === 'rgba(0, 0, 0, 0)' || (cs.color === 'rgba(0, 0, 0, 0)' && !svgText)) {
        if (cs.webkitBackgroundClip === 'text' || cs.backgroundClip === 'text') clipCols = (cs.backgroundImage.match(/rgba?\([^)]*\)/g) || []); else continue; }
      let f = clipCols && clipCols.length ? px(clipCols[0]) : px(fg0), bg = [255, 255, 255, 1], stack = [], skipC = false, op = 1;
      for (let a = e === null ? null : (clipCols ? e.parentElement : e); a && a !== document.documentElement; a = a.parentElement) {
        const c = getComputedStyle(a); op *= +c.opacity;
        if (c.backgroundImage !== 'none' && c.backgroundClip !== 'text' && !/gradient/.test(c.backgroundImage) ) { skipC = true; break; }
        if (/gradient/.test(c.backgroundImage) && c.webkitBackgroundClip !== 'text') { skipC = true; break; }
        const b = px(c.backgroundColor); if (b[3] > 0) { stack.push(b); if (b[3] >= 1) break; }
        if (a === s) break;
      }
      if (hasBleedImg && s.dataset.layout === 'full-bleed') skipC = true;
      if (skipC) continue;
      bg = stack.reduceRight((acc, b) => over(b, acc), [255, 255, 255, 1]);
      if (op < 1) f = [f[0], f[1], f[2], f[3] * op];
      const L2 = lum(bg); let ratio = 99; for (const col of (clipCols && clipCols.length ? clipCols : [fg0])) { let ff = px(col); if (op < 1) ff = [ff[0], ff[1], ff[2], ff[3] * op]; const L1 = lum(over(ff, bg)); ratio = Math.min(ratio, (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05)); }
      if (ratio < 4.5) sev(`${name(e)} contrast ${ratio.toFixed(2)}:1 (need 4.5)`, 'use --ink/--ink2, or darken --brand-text for this theme');
    }
  }
  if (s.scrollHeight > 1081 || s.scrollWidth > 1921) sev(`slide content scrolls (${s.scrollWidth}x${s.scrollHeight})`, 'shorten the content');
  return out;
}

function dedupe(list) { const seen = new Map(); for (const x of list.sort((a, b) => a.slide - b.slide)) { const k = x.slide + '|' + x.m.replace(/"[^"]*"/, ''); if (seen.has(k)) seen.get(k).n++; else seen.set(k, {...x, n: 1}); } return [...seen.values()].map(x => x.n > 1 ? {...x, m: x.m + ` (x${x.n})`} : x); }
let failed = 0, total = 0;
for (const file of files) {
  const abs = path.resolve(file);
  const themeList = flag('--themes') ? await (async () => { const pg = await browser.newPage(); await pg.goto(pathToFileURL(abs).href); await pg.waitForFunction(() => window.kp && window.kp.ready); const l = await pg.evaluate(() => window.kp.themes); await pg.close(); return l; })() : [null];
  let firstRun = true;
  for (const theme of themeList) {
    const t0 = Date.now(), page = await browser.newPage({viewport: {width: 1920, height: 1080}});
    const errs = []; page.on('pageerror', e => errs.push(String(e))); page.on('console', m => { if (m.type() === 'error' && !/fonts\.g|ERR_INTERNET|ERR_NAME|Failed to load resource/.test(m.text() + (m.location()?.url || ''))) errs.push(m.text()); });
    await page.goto(pathToFileURL(abs).href); await page.waitForFunction(() => window.kp && window.kp.ready, null, {timeout: 15000});
    if (theme) { await page.evaluate(t => window.kp.applyLook(t, document.documentElement.getAttribute('data-fonts'), false), theme); await page.evaluate(() => document.fonts.ready); await page.evaluate(() => { document.querySelectorAll('.chart').length; window.kp.refit(); }); }
    await page.evaluate(() => document.documentElement.classList.add('kp-idle')); const n = await page.evaluate(() => window.kp.count); const issues = [], warns = [];
    if (firstRun) { firstRun = false; const a = await page.evaluate(authoring, LAYOUTS); issues.push(...a.out); warns.push(...a.warn); if (!LAYOUTS) warns.push({slide: '-', m: 'template.html not found next to check.mjs, layout names not verified', fix: 'keep check.mjs beside template.html'}); }
    if (shotsDir) await page.addStyleTag({content: '.kp-ui,.kp-pen,.kp-set,.kp-toast,.kp-hint{display:none!important}'});
    if (wantOutline) { console.log(`outline of ${path.basename(file)}:`); (await page.evaluate(() => window.kp.outline())).forEach(r => console.log(`  ${r.level ? '   ' : ''}${String(r.n).padStart(2)}. ${r.title}  [${r.layout}${r.builds ? ', ' + r.builds + ' builds' : ''}${r.magic ? ', magic' : ''}${r.notes ? '' : ', NO NOTES'}]`)); }
    for (let i = 0; i < n; i++) {
      await page.evaluate(i => window.kp.showAll(i), i); await page.waitForTimeout(40);
      const r = await page.evaluate(inPage, [i, [MIN_PX, MIN_SMALL]]); r.forEach(x => issues.push({slide: i + 1, ...x}));
      if (shotsDir) { fs.mkdirSync(shotsDir, {recursive: true}); await page.screenshot({path: path.join(shotsDir, `${path.basename(file, '.html')}${theme ? '-' + theme : ''}-${String(i + 1).padStart(2, '0')}.png`)}); }
    }
    errs.forEach(e => issues.push({slide: 0, m: 'console error: ' + e.slice(0, 160), fix: 'fix the script error'}));
    total += n; failed += issues.length;
    console.log(`${issues.length ? 'FAIL' : 'ok  '} ${path.basename(file)}${theme ? ' [' + theme + ']' : ''}: ${n} slides, ${issues.length} issue${issues.length === 1 ? '' : 's'} (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
    warns.forEach(w => console.log(`  warn  slide ${w.slide}: ${w.m}\n           fix: ${w.fix}`));
    dedupe(issues).slice(0, 40).forEach(x => console.log(`  slide ${x.slide || '-'}: ${x.m}\n           fix: ${x.fix}`));
    if (issues.length > 40) console.log(`  ... ${issues.length - 40} more`);
    await page.close();
  }
}
await browser.close();
process.exit(failed ? 1 : 0);
