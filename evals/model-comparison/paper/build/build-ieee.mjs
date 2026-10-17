// Converts paper.md into an IEEE-style two-column HTML page.
import fs from 'node:fs';
const SRC = new URL('../paper.md', import.meta.url);
const OUT = new URL('../paper-ieee.html', import.meta.url);
const lines = fs.readFileSync(SRC, 'utf8').replace(/\r/g, '').split('\n');

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = s => esc(s).replace(/"/g, '&quot;');

function inline(src, { cites = true } = {}) {
  const ph = [];
  const hold = h => `\u0000${ph.push(h) - 1}\u0000`;
  let s = esc(src);
  s = s.replace(/`([^`]+)`/g, (_, c) => hold(`<code>${c}</code>`));
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => hold(`<a href="${u}">${t}</a>`));
  s = s.replace(/https?:\/\/[^\s<]+[^\s<.,;)]/g, u => hold(`<a href="${u}">${u}</a>`));
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  if (cites) s = s.replace(/\[(\d+)\]/g, '<a class="cite" href="#ref-$1">[$1]</a>');
  let prev;
  do { prev = s; s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => ph[+i]); } while (s !== prev);
  return s;
}

const roman = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8 };
const isBlank = l => l.trim() === '';
let i = 0;
const out = [];

// Front matter: title, author block, abstract, index terms.
const title = lines[0].replace(/^#\s+/, '');
const author = lines[2].replace(/^\*\*|\*\*$/g, '');
const affil = lines[3].replace(/^\*|\*$/g, '');
const header = `<header class="paper-head">
  <h1>${inline(title)}</h1>
  <div class="authors"><p class="author-name">${inline(author)}</p><p class="affil"><em>${inline(affil)}</em></p></div>
</header>`;

i = 4;
function para(start) { // collect paragraph lines
  const buf = []; let j = start;
  while (j < lines.length && !isBlank(lines[j])) buf.push(lines[j++]);
  return [buf, j];
}

function parseTable(start) {
  const rows = []; let j = start;
  while (j < lines.length && lines[j].startsWith('|')) rows.push(lines[j++]);
  const cells = r => r.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
  const head = cells(rows[0]);
  const body = rows.slice(2).map(cells);
  const numeric = c => /^(\*\*)?(\$?[\d.,]+|–)( \(\d+\))?(\*\*)?$/.test(c) || /^\d+m \d+s$/.test(c) || /^0 \(\+ [\d.]+ plan\)$/.test(c);
  let h = '<table>\n<thead><tr>' + head.map(c => `<th>${inline(c)}</th>`).join('') + '</tr></thead>\n<tbody>\n';
  for (const r of body) h += '<tr>' + r.map(c => `<td${numeric(c) ? ' class="num"' : ''}>${inline(c)}</td>`).join('') + '</tr>\n';
  h += '</tbody>\n</table>';
  return [h, j, head.length];
}

while (i < lines.length) {
  const l = lines[i];
  if (isBlank(l) || l.trim() === '---') { i++; continue; }

  if (l === '## Abstract') {
    i++; while (isBlank(lines[i])) i++;
    const [buf, j] = para(i); i = j;
    out.push(`<p class="abstract"><strong><em>Abstract</em></strong>—${inline(buf.join(' '))}</p>`);
    continue;
  }
  if (l.startsWith('**Index Terms**:')) {
    out.push(`<p class="index-terms"><strong><em>Index Terms</em></strong>—${inline(l.replace('**Index Terms**:', '').trim())}</p>`);
    i++; continue;
  }
  let m;
  if ((m = l.match(/^## (.+)$/))) {
    const t = m[1];
    const rm = t.match(/^([IVX]+)\. /);
    const id = rm ? `sec-${roman[rm[1]]}` : 'sec-' + t.toLowerCase().replace(/[^a-z]+/g, '-').replace(/-$/, '');
    if (t === 'References') {
      out.push(`<h2 id="references">${inline(t)}</h2>\n<ol class="refs">`);
      i++;
      while (i < lines.length) {
        if (isBlank(lines[i])) { i++; continue; }
        const rm2 = lines[i].match(/^\[(\d+)\] (.*)$/);
        out.push(`<li id="ref-${rm2[1]}"><span class="ref-num">[${rm2[1]}]</span><span class="ref-body">${inline(rm2[2], { cites: false })}</span></li>`);
        i++;
      }
      out.push('</ol>');
      continue;
    }
    out.push(`<h2 id="${id}">${inline(t)}</h2>`); i++; continue;
  }
  if ((m = l.match(/^### (.+)$/))) { out.push(`<h3>${inline(m[1])}</h3>`); i++; continue; }

  // Table: caption lines then the table, then an optional italic note.
  if ((m = l.match(/^\*\*(TABLE [IVX]+)\*\*$/))) {
    const t2 = lines[i + 1].replace(/^\*\*|\*\*$/g, '');
    const tid = 'table-' + roman[m[1].split(' ')[1]];
    i += 2; while (isBlank(lines[i])) i++;
    const [tbl, j, ncols] = parseTable(i); i = j;
    let note = '';
    let k = i; while (k < lines.length && isBlank(lines[k])) k++;
    if (lines[k] && /^\*[^*]/.test(lines[k]) && lines[k].endsWith('*')) {
      note = `\n<p class="table-note">${inline(lines[k])}</p>`; i = k + 1;
    }
    out.push(`<figure class="table span" id="${tid}">
<figcaption><span class="tlabel">${m[1]}</span><span class="ttitle">${inline(t2)}</span></figcaption>
<div class="tscroll">
${tbl}
</div>${note}
</figure>`);
    continue;
  }

  if ((m = l.match(/^!\[(.+)\]\((.+)\)$/))) {
    const cap = m[1], src = m[2];
    const wide = /fig[45]/.test(src);
    const fm = cap.match(/^(Fig\. \d+\.) (.*)$/);
    const fid = 'fig-' + fm[1].match(/\d+/)[0];
    out.push(`<figure class="fig${wide ? ' span' : ''}" id="${fid}">
<img src="${src}" alt="${escAttr(cap)}"${wide ? '' : ''}>
<figcaption><span class="flabel">${fm[1]}</span> ${inline(fm[2])}</figcaption>
</figure>`);
    i++; continue;
  }

  if (l.startsWith('> ')) {
    const buf = []; while (i < lines.length && lines[i].startsWith('>')) buf.push(lines[i++].replace(/^>\s?/, ''));
    out.push(`<blockquote class="disclaimer"><p>${inline(buf.join(' '))}</p></blockquote>`);
    continue;
  }
  if (/^- /.test(l)) {
    const items = []; while (i < lines.length && /^- /.test(lines[i])) items.push(lines[i++].slice(2));
    out.push('<ul>\n' + items.map(x => `<li>${inline(x)}</li>`).join('\n') + '\n</ul>');
    continue;
  }
  if (/^\d+\. /.test(l)) {
    const items = []; while (i < lines.length && /^\d+\. /.test(lines[i])) items.push(lines[i++].replace(/^\d+\. /, ''));
    out.push('<ol class="enum">\n' + items.map(x => `<li>${inline(x)}</li>`).join('\n') + '\n</ol>');
    continue;
  }
  // Paragraph (stops before a list, CommonMark-style).
  const buf = [];
  while (i < lines.length && !isBlank(lines[i]) && !/^- /.test(lines[i])) buf.push(lines[i++]);
  const cls = /^\*\*[^*]+\*\*/.test(buf[0]) && buf.length === 1 && /^\*\*[^*]+\*\*$/.test(buf[0].trim()) ? ' class="label"' : '';
  out.push(`<p${cls}>${inline(buf.join(' '))}</p>`);
}

const css = fs.readFileSync(new URL('./ieee.css', import.meta.url), 'utf8');
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cloud vs Local LLM Slides Study</title>
<style>
${css}</style>
</head>
<body>
<main class="sheet">
${header}
<div class="cols">
${out.join('\n')}
</div>
</main>
</body>
</html>
`;
fs.writeFileSync(OUT, html);
console.log('wrote', OUT, html.length);
