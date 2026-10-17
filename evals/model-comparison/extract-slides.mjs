#!/usr/bin/env node
// Pulls the slides out of a present-in-html deck: the text on each slide (diagram labels included), its speaker notes,
// and counts of diagrams, images and image placeholders. Writes slides.md (for the judge) and stats.json.
//   node extract-slides.mjs deck.html out-dir/
import fs from 'node:fs';
import path from 'node:path';

const [deckPath, outDir] = process.argv.slice(2);
if (!deckPath || !outDir) { console.error('usage: node extract-slides.mjs deck.html out-dir/'); process.exit(2); }
const html = fs.readFileSync(deckPath, 'utf8');

const text = s => s
  .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, ' ')
  .replace(/<br\s*\/?>|<\/(p|li|h\d|div|tr|figcaption|text|tspan)>/gi, '\n')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&(\w+);/g, (e, n) => ({middot: '·', mdash: '—', ndash: '–', minus: '−', times: '×', rarr: '→', larr: '←', hellip: '…',
    lambda: 'λ', micro: 'µ', deg: '°', quot: '"', apos: "'", rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', sup2: '²'})[n] ?? e)
  .split('\n').map(l => l.replace(/\s+/g, ' ').trim()).filter(Boolean).join('\n');

const slides = [];
for (const m of html.matchAll(/<section\b([^>]*\bclass="[^"]*\bslide\b[^"]*"[^>]*)>([\s\S]*?)<\/section>/gi)) {
  const [, attrs, body] = m;
  const notesHtml = (body.match(/<aside\b[^>]*class="[^"]*\bnotes\b[^"]*"[^>]*>([\s\S]*?)<\/aside>/i) || [])[1] || '';
  const visible = body.replace(/<aside\b[^>]*class="[^"]*\bnotes\b[\s\S]*?<\/aside>/gi, '');
  const figures = [...visible.matchAll(/<figure\b[^>]*>([\s\S]*?)<\/figure>/gi)];
  slides.push({
    n: slides.length + 1,
    layout: (attrs.match(/data-layout="([^"]*)"/) || [])[1] || '?',
    skipped: /\bdata-skip\b/.test(attrs),
    text: text(visible),
    notes: text(notesHtml),
    diagrams: (visible.match(/<svg\b/gi) || []).length,
    animated: /class="[^"]*\bdg\b|data-build|class="[^"]*\bbuild\b/i.test(visible),
    images: (visible.match(/<img\b/gi) || []).length + (visible.match(/<video\b/gi) || []).length,
    // An image placeholder is a figure with no media and nothing in it but (optionally) a caption.
    placeholders: figures.filter(f => !/<(img|svg|video|canvas|iframe)\b/i.test(f[1]) &&
      !text(f[1].replace(/<figcaption\b[\s\S]*?<\/figcaption>/gi, ''))).length,
  });
}

fs.mkdirSync(outDir, {recursive: true});
fs.writeFileSync(path.join(outDir, 'slides.md'), slides.map(s =>
  `## Slide ${s.n} [${s.layout}${s.skipped ? ', skipped' : ''}${s.diagrams ? `, ${s.diagrams} diagram` : ''}` +
  `${s.images ? `, ${s.images} image` : ''}${s.placeholders ? `, ${s.placeholders} placeholder` : ''}]\n\n` +
  `${s.text || '(no text)'}\n\nNotes: ${s.notes || '(none)'}\n`).join('\n'));

const sum = k => slides.reduce((a, s) => a + (typeof s[k] === 'boolean' ? +s[k] : s[k]), 0);
const stats = {
  slides: slides.length,
  slides_with_notes: slides.filter(s => s.notes).length,
  diagrams: sum('diagrams'),
  slides_with_animation: sum('animated'),
  images: sum('images'),
  placeholders: sum('placeholders'),
  layouts: [...new Set(slides.map(s => s.layout))].length,
  words_on_slides: slides.reduce((a, s) => a + s.text.split(/\s+/).filter(Boolean).length, 0),
  words_in_notes: slides.reduce((a, s) => a + s.notes.split(/\s+/).filter(Boolean).length, 0),
  has_quiz: slides.some(s => /quiz|check your understanding/i.test(s.text)),
  deck_kb: Math.round(fs.statSync(deckPath).size / 1024),
};
fs.writeFileSync(path.join(outDir, 'stats.json'), JSON.stringify(stats, null, 2) + '\n');
console.log(`${path.basename(deckPath)}: ${stats.slides} slides, ${stats.slides_with_notes} with notes, ` +
  `${stats.diagrams} diagrams, ${stats.placeholders} placeholders`);
