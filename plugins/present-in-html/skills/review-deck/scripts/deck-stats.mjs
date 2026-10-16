#!/usr/bin/env node
// Per-slide numbers for reviewing a Keynote Pro deck against its audience and time slot. No dependencies.
//   node deck-stats.mjs deck.html [--wpm 130] [--json]
// For each slide: layout, title, words on the slide, words in the notes, builds, and an estimated speaking time
// (notes words / wpm; a slide without notes counts 45 s, and no slide counts under 20 s). Slides from the appendix on
// and data-skip slides are listed but not timed. The deck's data-duration (minutes), if set, is printed as the target.
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const file = args.find(a => !a.startsWith('--') && !/^\d+$/.test(a));
const wpmArg = args.indexOf('--wpm');
const wpm = wpmArg >= 0 ? Number(args[wpmArg + 1]) || 130 : 130;
const asJson = args.includes('--json');
if (!file) { console.error('usage: node deck-stats.mjs deck.html [--wpm 130] [--json]'); process.exit(2); }

const html = fs.readFileSync(file, 'utf8');
const start = html.indexOf('<!-- SLIDES:START -->'), end = html.indexOf('<!-- SLIDES:END -->');
const body = start >= 0 && end > start ? html.slice(start, end) : html;
const deckTag = (html.match(/<main\b[^>]*class="[^"]*\bdeck\b[^"]*"[^>]*>/) || [''])[0];
const attr = (tag, name) => { const m = tag.match(new RegExp(`\\s${name}(?:="([^"]*)")?(?=[\\s>/])`)); return m ? (m[1] ?? '') : null; };
const decode = s => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'");
const text = s => decode(s.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const words = s => (s.match(/[\p{L}\p{N}][\p{L}\p{N}'’.,%$-]*/gu) || []).length;

const slides = [];
const re = /<section\b([^>]*)>([\s\S]*?)<\/section>/gi;
let m, appendix = false;
while ((m = re.exec(body))) {
  const tag = '<section' + m[1] + '>';
  if (!/class="[^"]*\bslide\b/.test(tag)) continue;
  const inner = m[2];
  if (attr(tag, 'data-appendix') !== null || attr(tag, 'data-layout') === 'appendix') appendix = true;
  const notesHtml = [...inner.matchAll(/<aside\b[^>]*class="[^"]*\bnotes\b[^"]*"[^>]*>([\s\S]*?)<\/aside>/gi)].map(x => x[1]).join(' ');
  const visible = inner.replace(/<aside\b[^>]*class="[^"]*\bnotes\b[^"]*"[^>]*>[\s\S]*?<\/aside>/gi, ' ');
  const title = text((visible.match(/<h[12]\b[^>]*>([\s\S]*?)<\/h[12]>/i) || visible.match(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/i) || ['', ''])[1]);
  const builds = [...visible.matchAll(/<(\w+)\b[^>]*\sdata-build="(\w+)"[^>]*>([\s\S]*?)<\/\1>/gi)]
    .reduce((n, b) => n + (/^(list|reveal)$/.test(b[2]) ? Math.max(1, (b[3].match(/<li\b/gi) || []).length) : 1), 0);
  const nw = words(text(notesHtml)), vw = words(text(visible));
  const skip = attr(tag, 'data-skip') !== null;
  const timed = !appendix && !skip;
  const seconds = timed ? Math.max(20, nw ? Math.round(nw / wpm * 60) : 45) : 0;
  slides.push({ n: slides.length + 1, id: attr(tag, 'data-id') || '', layout: attr(tag, 'data-layout') || '?', title, slideWords: vw, notesWords: nw, builds, timed, seconds });
}

const timedSlides = slides.filter(s => s.timed);
const total = timedSlides.reduce((t, s) => t + s.seconds, 0);
const target = Number(attr(deckTag, 'data-duration')) || null;
const out = {
  file: path.basename(file), title: attr(deckTag, 'data-title') || text((html.match(/<title>([\s\S]*?)<\/title>/i) || ['', ''])[1]),
  lang: (html.match(/<html\b[^>]*\slang="([^"]*)"/i) || [, ''])[1], wpm, targetMinutes: target,
  slides: slides.length, timedSlides: timedSlides.length, backupOrSkipped: slides.length - timedSlides.length,
  estimatedMinutes: Math.round(total / 6) / 10, slidesWithoutNotes: timedSlides.filter(s => !s.notesWords).map(s => s.n),
  layouts: Object.fromEntries(Object.entries(slides.reduce((a, s) => (a[s.layout] = (a[s.layout] || 0) + 1, a), {})).sort((a, b) => b[1] - a[1])),
  perSlide: slides,
};
if (asJson) { console.log(JSON.stringify(out, null, 2)); process.exit(0); }

const mmss = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
console.log(`${out.file}: "${out.title}"${out.lang ? ` [${out.lang}]` : ''}`);
console.log(` #  layout        words notes builds  time   title`);
for (const s of slides) console.log(`${String(s.n).padStart(2)}  ${s.layout.padEnd(12)} ${String(s.slideWords).padStart(5)} ${String(s.notesWords).padStart(5)} ${String(s.builds).padStart(6)}  ${s.timed ? mmss(s.seconds).padStart(5) : ' skip'}   ${s.title.slice(0, 70)}`);
console.log(`\n${out.timedSlides} timed slides (${out.backupOrSkipped} backup/skipped), estimated ${mmss(total)} at ${wpm} wpm` +
  (target ? `; target ${target}:00 (${total > target * 60 ? 'over' : 'under'} by ${mmss(Math.abs(total - target * 60))})` : '; no data-duration target set'));
if (out.slidesWithoutNotes.length) console.log(`slides without notes (timed at 45 s): ${out.slidesWithoutNotes.join(', ')}`);
console.log(`layouts: ${Object.entries(out.layouts).map(([k, v]) => `${k} ${v}`).join(', ')}`);
