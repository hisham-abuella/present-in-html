// Converts paper.md into article.html (single-column web edition).
import fs from 'node:fs';

const SRC = new URL('../paper.md', import.meta.url);
const OUT = new URL('../article.html', import.meta.url);
const lines = fs.readFileSync(SRC, 'utf8').replace(/\r/g, '').split('\n');

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = s => esc(s).replace(/"/g, '&quot;');

function inline(s, { autolink = false } = {}) {
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => { codes.push(`<code>${esc(c)}</code>`); return `\u0000${codes.length - 1}\u0000`; });
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

const romanToNum = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8 };
const toc = [];
let out = [];
let i = 0;

// ---- Front matter (lines 1-14) ----
const title = lines[0].replace(/^# /, '');
const author = lines[2].replace(/^\*\*|\*\*$/g, '');
const affiliation = lines[3];
let abstractText = '', indexTerms = '';
for (i = 4; i < lines.length; i++) {
  const l = lines[i];
  if (l.startsWith('## I.')) break;
  if (l.startsWith('**Index Terms**')) indexTerms = l;
  else if (l && !l.startsWith('#') && l !== '---') abstractText = l;
}

// ---- Body ----
let section = null;     // open h2 section id
let subNum = 0;
let pendingCaption = null;
let lastWasTable = false;
let inRefs = false;

function closeSection() { if (section) { out.push('</section>'); section = null; } }

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
    else if (/^Artifacts/.test(text)) { id = 'artifacts'; cls = ' class="artifacts"'; }
    else if (/^References/.test(text)) { id = 'references'; cls = ' class="references"'; inRefs = true; }
    section = id; subNum = 0;
    toc.push({ id, text });
    const h = rm ? `<span class="num">${rm[1]}.</span> ${inline(rm[2])}` : inline(text);
    out.push(`<section id="${id}"${cls} aria-labelledby="${id}-h">`, `<h2 id="${id}-h">${h}</h2>`);
    if (inRefs) out.push('<ol class="refs">');
    lastWasTable = false; i++; continue;
  }
  if ((m = l.match(/^### (.+)$/))) {
    const lm = m[1].match(/^([A-Z])\. (.+)$/);
    const id = `${section}${lm ? lm[1].toLowerCase() : ++subNum}`;
    const h = lm ? `<span class="num">${lm[1]}.</span> ${inline(lm[2])}` : inline(m[1]);
    out.push(`<h3 id="${id}">${h}</h3>`);
    lastWasTable = false; i++; continue;
  }
  // Table caption: **TABLE N** then **CAPTION**
  if ((m = l.match(/^\*\*(TABLE [IVX]+)\*\*$/))) {
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
    const isDecks = head[head.length - 1] === 'Deck';
    const numCols = new Set();
    head.forEach((_, c) => {
      if (body.every(r => /^(\*\*)?[\d$.,\s()+–-]*(\*\*)?$|^[\d]+m \d+s$|^unfinished$|^not judged$|^\d+ \(\d+\)$/.test(r[c]) || /^0 \(\+ 5\.05 plan\)$/.test(r[c]))) numCols.add(c);
    });
    const tid = pendingCaption ? 'table-' + pendingCaption.label.split(' ')[1].toLowerCase() : '';
    out.push(`<figure class="table${isDecks ? ' decks' : ''}"${tid ? ` id="${tid}"` : ''}>`);
    if (pendingCaption) out.push(`<figcaption><span class="tlabel">${pendingCaption.label}</span><span class="tcap">${inline(pendingCaption.cap)}</span></figcaption>`);
    out.push('<div class="table-scroll" tabindex="0" role="region" aria-label="' + attr(pendingCaption ? `${pendingCaption.label}: ${pendingCaption.cap}` : 'Table') + '"><table>');
    out.push('<thead><tr>' + head.map((h, c) => `<th scope="col"${numCols.has(c) ? ' class="n"' : ''}>${inline(h)}</th>`).join('') + '</tr></thead><tbody>');
    const lab = k => isDecks ? ` data-label="${attr(head[k])}"` : '';
    for (const r of body) out.push('<tr>' + r.map((c, k) => `<td${lab(k)}${numCols.has(k) ? ' class="n"' : (isDecks && k === r.length - 1 ? ' class="deck"' : '')}>${inline(c)}</td>`).join('') + '</tr>');
    out.push('</tbody></table></div>');
    // note directly after table?
    let j = i; while (j < lines.length && !lines[j].trim()) j++;
    if (/^\*[^*].*\*$/.test(lines[j])) { out.push(`<p class="table-note">${inline(lines[j].slice(1, -1))}</p>`); i = j + 1; }
    out.push('</figure>');
    pendingCaption = null; lastWasTable = true; continue;
  }
  if ((m = l.match(/^!\[(.+)\]\((.+)\)$/))) {
    const cap = m[1]; const src = m[2];
    const fm = cap.match(/^(Fig\. (\d+)\.) (.+)$/);
    const wide = /fig[45]-/.test(src);
    const alt = fm[3].split('. ')[0].replace(/\.$/, '');
    out.push(`<figure class="fig${wide ? ' fig-wide' : ''}" id="fig-${fm[2]}">`,
      `<div class="fig-scroll"><img src="${attr(src)}" alt="${attr(alt)}" loading="lazy"></div>`,
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
    out.push('<aside class="callout" aria-label="Disclaimer"><p class="callout-label">Disclaimer</p>');
    while (i < lines.length && lines[i].startsWith('>')) { out.push(`<p>${inline(lines[i].replace(/^> ?/, ''))}</p>`); i++; }
    out.push('</aside>'); continue;
  }
  if (inRefs && (m = l.match(/^\[(\d+)\] (.+)$/))) {
    out.push(`<li id="ref-${m[1]}"><span class="refnum">[${m[1]}]</span>${inline(m[2], { autolink: true })}</li>`);
    i++; continue;
  }
  // paragraph (group label in Artifacts gets a class)
  const isLabel = section === 'artifacts' && /^\*\*[^*]+\*\*/.test(l);
  out.push(`<p${isLabel ? ' class="group"' : ''}>${inline(l)}</p>`);
  lastWasTable = false; i++;
}
if (inRefs) out.push('</ol>');
closeSection();

const tocHtml = toc.map(t => {
  const rm = t.text.match(/^([IVX]+)\. (.+)$/);
  return rm ? `<li><span class="num">${rm[1]}.</span><a href="#${t.id}">${inline(rm[2])}</a></li>`
            : `<li><span class="num"></span><a href="#${t.id}">${inline(t.text)}</a></li>`;
}).join('\n        ');

const css = fs.readFileSync(new URL('./article.css', import.meta.url), 'utf8');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cloud vs Local LLM Slides</title>
<meta name="description" content="${attr(title)}">
<meta name="author" content="${attr(author)}">
<style>
${css}
</style>
</head>
<body>
<a class="skip" href="#sec-1">Skip to the article</a>
<article>
  <header class="masthead">
    <h1>${inline(title)}</h1>
    <p class="byline"><span class="author">${inline(author)}</span><br><span class="affil">${inline(affiliation)}</span></p>
    <p class="dateline"><time datetime="2026-10">October 2026</time></p>
    <p class="status">Preliminary study: early indications from single runs</p>
    <nav class="toc" aria-label="Contents">
      <h2 class="toc-h">Contents</h2>
      <ol>
        <li><span class="num"></span><a href="#abstract">Abstract</a></li>
        ${tocHtml}
      </ol>
    </nav>
  </header>

  <section id="abstract" class="abstract" aria-labelledby="abstract-h">
    <h2 id="abstract-h">Abstract</h2>
    <p class="lead">${inline(abstractText)}</p>
    <p class="index-terms">${inline(indexTerms)}</p>
  </section>

${out.join('\n')}
</article>
</body>
</html>
`;
fs.writeFileSync(OUT, html);
console.log('wrote', OUT.pathname, html.length, 'bytes');
