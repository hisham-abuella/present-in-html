// Converts paper.ar.md into article.ar.html (Egyptian Arabic, RTL web edition).
// Adapted from build-article.mjs; uses article.css plus the RTL overrides in article-ar.css.
import fs from 'node:fs';

const SRC = new URL('../paper.ar.md', import.meta.url);
const OUT = new URL('../article.ar.html', import.meta.url);
const lines = fs.readFileSync(SRC, 'utf8').replace(/\r/g, '').split('\n');

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = s => esc(s).replace(/"/g, '&quot;');

function inline(s, { autolink = false } = {}) {
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => { codes.push(`<code dir="ltr">${esc(c)}</code>`); return `\u0000${codes.length - 1}\u0000`; });
  s = esc(s);
  const links = [];
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => { links.push(`<a href="${attr(u)}">${t}</a>`); return `\u0001${links.length - 1}\u0001`; });
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*\w])\*(?!\s)(.+?)\*(?!\w)/g, '$1<em>$2</em>');
  s = s.replace(/\[(\d+)\](?!\()/g, '<a class="cite" href="#ref-$1">[$1]</a>');
  if (autolink) s = s.replace(/https?:\/\/[^\s<]+/g, u => `<a href="${u}">${u}</a>`);
  s = s.replace(/\u0001(\d+)\u0001/g, (_, i) => links[+i]);
  s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => codes[+i]);
  return s;
}

// ---- Bidi: isolate Latin/number runs inside Arabic text so ranges, units and brackets keep their order ----
const RUN = /[A-Za-z0-9$(\[][A-Za-z0-9$%+=#@_\/.,:;'’\-–()\[\]×̄²−…!?& ]*[A-Za-z0-9%)\]²̄…]|[A-Za-z0-9]/g;
const count = (s, c) => s.split(c).length - 1;
function trimRun(r) {
  for (;;) {
    const before = r;
    if (/[)\]]$/.test(r) && count(r, '(') + count(r, '[') < count(r, ')') + count(r, ']')) r = r.slice(0, -1);
    if (/^[(\[]/.test(r) && count(r, '(') + count(r, '[') > count(r, ')') + count(r, ']')) r = r.slice(1);
    r = r.replace(/^[\s.,:;'’\-–]+|[\s.,:;'’\-–(\[]+$/g, '');
    if (r === before) return r;
  }
}
// Split a run where it cannot stay one LTR unit: an unmatched bracket, or ". " between two sentences.
function cutPoint(m) {
  let depth = 0;
  for (let k = 0; k < m.length; k++) {
    const c = m[k];
    if (c === '(' || c === '[') depth++;
    else if (c === ')' || c === ']') { if (depth === 0) return k; depth--; }
    else if (c === '.' && m[k + 1] === ' ' && depth === 0) return k;
  }
  if (depth > 0) { // unmatched opener: cut at the last one that never closes
    let d = 0;
    for (let k = m.length - 1; k >= 0; k--) {
      const c = m[k];
      if (c === ')' || c === ']') d++;
      else if (c === '(' || c === '[') { if (d === 0) return k; d--; }
    }
  }
  return -1;
}
function wrapRuns(t) {
  return t.replace(RUN, m => {
    const k = cutPoint(m);
    if (k >= 0) return wrapRuns(m.slice(0, k)) + m[k] + wrapRuns(m.slice(k + 1));
    const r = trimRun(m);
    if (!r || !(/[A-Za-z]/.test(r) || /[–$%\/:(]/.test(r))) return m;
    const j = m.indexOf(r);
    const inner = r.replace(/(?<=[A-Za-z])-(?=[A-Za-z])/g, '‑')  // no line break inside Latin terms
                   .replace(/(?<=[A-Za-z]) (?=\d)/g, ' ');                // keep "Opus 5.5" together
    return m.slice(0, j) + `<span dir="ltr">${inner}</span>` + m.slice(j + r.length);
  });
}
function isolateText(t) {
  return wrapRuns(t.replace(/ـ (?=[A-Za-z0-9$]|$)/g, 'ـ '));  // keep الـ / بـ / لـ on the line of their word
}
// Walk the HTML; touch text nodes only, skipping <code>, <title> and the English references list.
function bidi(html) {
  let skip = 0;
  return html.split(/(<[^>]+>)/).map(tok => {
    if (tok.startsWith('<')) {
      if (/^<(code|title)\b|^<ol class="refs"/.test(tok)) skip++;
      else if (/^<\/(code|title)>/.test(tok) || (skip && tok === '</ol>')) skip = Math.max(0, skip - 1);
      return tok;
    }
    return skip ? tok : isolateText(tok);
  }).join('');
}

const romanToNum = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10, XI: 11, XII: 12 };
const toc = [];
let out = [];
let i = 0;

// ---- Front matter: title, English subtitle, author, affiliation ----
const title = lines[0].replace(/^# /, '');
const subtitle = lines[1].replace(/^\*|\*$/g, '');
const author = lines[2].replace(/^\*\*|\*\*$/g, '');
const affiliation = lines[3];
let abstractText = '', indexTerms = '';
for (i = 4; i < lines.length; i++) {
  const l = lines[i];
  if (l.startsWith('## I.')) break;
  if (l.startsWith('**الكلمات المفتاحية**')) indexTerms = l;
  else if (l && !l.startsWith('#') && l !== '---') abstractText = l;
}

// ---- Body ----
let section = null;
let subNum = 0;
let pendingCaption = null;
let inRefs = false;

function closeSection() { if (section) { out.push('</section>'); section = null; } }

// Status words that sit in otherwise numeric columns
const NUM_WORDS = /^(مخلّصش|ما اتقيّمش)$/;

while (i < lines.length) {
  const l = lines[i];
  if (!l.trim()) { i++; continue; }

  let m;
  if ((m = l.match(/^## (.+)$/))) {
    closeSection();
    const text = m[1];
    const rm = text.match(/^([IVX]+)\. (.+)$/);
    let id, cls = '';
    if (rm) id = `sec-${romanToNum[rm[1]]}`;
    else if (/Artifacts/.test(text)) { id = 'artifacts'; cls = ' class="artifacts"'; }
    else if (/^ملحق/.test(text)) id = 'appendix';
    else if (/^المراجع/.test(text)) { id = 'references'; cls = ' class="references"'; inRefs = true; }
    section = id; subNum = 0;
    toc.push({ id, text });
    const h = rm ? `<span class="num" dir="ltr">${rm[1]}.</span> ${inline(rm[2])}` : inline(text);
    out.push(`<section id="${id}"${cls} aria-labelledby="${id}-h">`, `<h2 id="${id}-h">${h}</h2>`);
    if (inRefs) out.push('<ol class="refs" dir="ltr" lang="en">');
    i++; continue;
  }
  if ((m = l.match(/^### (.+)$/))) {
    const lm = m[1].match(/^([A-Z])\. (.+)$/);
    const id = `${section}${lm ? lm[1].toLowerCase() : ++subNum}`;
    const h = lm ? `<span class="num" dir="ltr">${lm[1]}.</span> ${inline(lm[2])}` : inline(m[1]);
    out.push(`<h3 id="${id}">${h}</h3>`);
    i++; continue;
  }
  // Table caption: **جدول N** then **CAPTION**
  if ((m = l.match(/^\*\*(جدول (?:A-)?[IVX]+)\*\*$/))) {
    const cap = lines[i + 1].replace(/^\*\*|\*\*$/g, '');
    pendingCaption = { label: m[1], cap };
    i += 2; continue;
  }
  if (l.startsWith('|')) {
    const rows = [];
    while (i < lines.length && lines[i].startsWith('|')) { rows.push(lines[i]); i++; }
    const cells = r => r.replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
    const head = cells(rows[0]);
    const body = rows.slice(2).map(cells);
    const isDecks = head[head.length - 1] === 'الـ deck';
    const numCols = new Set();
    head.forEach((_, c) => {
      if (body.every(r => /^(\*\*)?[\d$.,\s()+–-]*(\*\*)?$|^[\d]+m \d+s$|^\d+ \(\d+\)$/.test(r[c]) || NUM_WORDS.test(r[c]))) numCols.add(c);
    });
    const tid = pendingCaption ? 'table-' + pendingCaption.label.split(' ')[1].toLowerCase() : '';
    out.push(`<figure class="table${isDecks ? ' decks' : ''}"${tid ? ` id="${tid}"` : ''}>`);
    if (pendingCaption) out.push(`<figcaption><span class="tlabel">${inline(pendingCaption.label)}</span><span class="tcap">${inline(pendingCaption.cap)}</span></figcaption>`);
    out.push('<div class="table-scroll" tabindex="0" role="region" aria-label="' + attr(pendingCaption ? `${pendingCaption.label}: ${pendingCaption.cap}` : 'جدول') + '"><table>');
    out.push('<thead><tr>' + head.map((h, c) => `<th scope="col"${numCols.has(c) ? ' class="n"' : ''}>${inline(h)}</th>`).join('') + '</tr></thead><tbody>');
    const lab = k => isDecks ? ` data-label="${attr(head[k])}"` : '';
    for (const r of body) out.push('<tr>' + r.map((c, k) => `<td${lab(k)}${numCols.has(k) ? ' class="n"' : (isDecks && k === r.length - 1 ? ' class="deck"' : '')}>${inline(c)}</td>`).join('') + '</tr>');
    out.push('</tbody></table></div>');
    let j = i; while (j < lines.length && !lines[j].trim()) j++;
    if (/^\*[^*].*\*$/.test(lines[j])) { out.push(`<p class="table-note">${inline(lines[j].slice(1, -1))}</p>`); i = j + 1; }
    out.push('</figure>');
    pendingCaption = null; continue;
  }
  if ((m = l.match(/^!\[(.+)\]\((.+)\)$/))) {
    const cap = m[1]; const src = m[2];
    const fm = cap.match(/^(شكل (\d+)\.) (.+)$/);
    const wide = /fig[45]-/.test(src);
    const alt = fm[3].split('. ')[0].replace(/\.$/, '');
    out.push(`<figure class="fig${wide ? ' fig-wide' : ''}" id="fig-${fm[2]}">`,
      `<div class="fig-scroll" dir="ltr"><img src="${attr(src)}" alt="${attr(alt)}" loading="lazy"></div>`,
      `<figcaption><span class="flabel">${fm[1]}</span> ${inline(fm[3])}</figcaption>`, '</figure>');
    i++; continue;
  }
  if (/^- /.test(l)) {
    out.push('<ul>');
    while (i < lines.length && /^- /.test(lines[i])) { out.push(`<li>${inline(lines[i].slice(2))}</li>`); i++; }
    out.push('</ul>'); continue;
  }
  if (/^\d+\. /.test(l)) {
    out.push('<ol>');
    while (i < lines.length && /^\d+\. /.test(lines[i])) { out.push(`<li>${inline(lines[i].replace(/^\d+\. /, ''))}</li>`); i++; }
    out.push('</ol>'); continue;
  }
  if (l.startsWith('> ')) {
    out.push('<aside class="callout" aria-label="تنويه"><p class="callout-label">تنويه</p>');
    while (i < lines.length && lines[i].startsWith('>')) { out.push(`<p>${inline(lines[i].replace(/^> ?/, ''))}</p>`); i++; }
    out.push('</aside>'); continue;
  }
  if (inRefs && (m = l.match(/^\[(\d+)\] (.+)$/))) {
    out.push(`<li id="ref-${m[1]}"><span class="refnum">[${m[1]}]</span>${inline(m[2], { autolink: true })}</li>`);
    i++; continue;
  }
  const isLabel = section === 'artifacts' && /^\*\*[^*]+\*\*/.test(l);
  out.push(`<p${isLabel ? ' class="group"' : ''}>${inline(l)}</p>`);
  i++;
}
if (inRefs) out.push('</ol>');
closeSection();

const tocHtml = toc.map(t => {
  const rm = t.text.match(/^([IVX]+)\. (.+)$/);
  return rm ? `<li><span class="num" dir="ltr">${rm[1]}.</span><a href="#${t.id}">${inline(rm[2])}</a></li>`
            : `<li><span class="num"></span><a href="#${t.id}">${inline(t.text)}</a></li>`;
}).join('\n        ');

const css = fs.readFileSync(new URL('./article.css', import.meta.url), 'utf8')
  + '\n/* ---- RTL / Arabic overrides ---- */\n'
  + fs.readFileSync(new URL('./article-ar.css', import.meta.url), 'utf8');

const plain = s => s.replace(/[*`]/g, '');

const body = `<a class="skip" href="#sec-1">روح للمقال</a>
<article>
  <header class="masthead">
    <p class="lang-switch"><a href="article.html" lang="en" dir="ltr" hreflang="en">English</a></p>
    <h1>${inline(title)}</h1>
    <p class="subtitle" lang="en" dir="ltr">${esc(subtitle)}</p>
    <p class="byline"><span class="author">${inline(author)}</span><br><span class="affil">${inline(affiliation)}</span></p>
    <p class="dateline"><time datetime="2026-10">أكتوبر 2026</time></p>
    <p class="status">دراسة أولية: مؤشرات بدرية من runs فردية</p>
    <nav class="toc" aria-label="المحتويات">
      <h2 class="toc-h">المحتويات</h2>
      <ol>
        <li><span class="num"></span><a href="#abstract">الملخص</a></li>
        ${tocHtml}
      </ol>
    </nav>
  </header>

  <section id="abstract" class="abstract" aria-labelledby="abstract-h">
    <h2 id="abstract-h">الملخص</h2>
    <p class="lead">${inline(abstractText)}</p>
    <p class="index-terms">${inline(indexTerms)}</p>
  </section>

${out.join('\n')}
</article>`;

const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LLMs على الـ cloud ولا محلي؟ – هشام أبو العلا</title>
<meta name="description" content="${attr(plain(title))}">
<meta name="author" content="${attr(author)}">
<link rel="alternate" hreflang="en" href="article.html">
<style>
${css}
</style>
</head>
<body>
${bidi(body)}
</body>
</html>
`;
fs.writeFileSync(OUT, html);
console.log('wrote', OUT.pathname, html.length, 'bytes');
