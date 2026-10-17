#!/usr/bin/env node
// Writes the repo's landing page, index.html: what present-in-html is, the skills, how to install, and the template
// library (example decks, the 26 profession looks from keynote-pro/tools/library-data.mjs, and the earlier formats).
//   node scripts/build-home.mjs
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const {default: lib, FIELDS} = await import(pathToFileURL(path.join(root, 'keynote-pro/tools/library-data.mjs')).href);
const REPO = 'https://github.com/hisham-abuella/present-in-html';
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[c]);

const examples = [
  ['tour.html', 'gallery/thumbs/tour.jpg', 'The tour', 'Keynote Black. What present-in-html is and how to install it, made with the plugin.', ['keynote-black', 'dark']],
  ['keynote-pro/template.html', 'keynote-pro/assets/thumb-template.jpg', 'The template', 'Every layout once. The file each new deck starts from.', ['keynote-white', 'light']],
  ['keynote-pro/examples/every-layout.html', 'keynote-pro/assets/thumb-every-layout.jpg', 'Every layout', 'All 28 layouts in one story, with photos generated on a laptop.', ['keynote-black', 'dark']],
  ['keynote-pro/examples/product-launch.html', 'keynote-pro/assets/thumb-product-launch.jpg', 'Product launch', 'Big statements, a hero number that morphs, counting stats.', ['keynote-black', 'dark']],
  ['keynote-pro/examples/quarterly-review.html', 'keynote-pro/assets/thumb-quarterly-review.jpg', 'Quarterly review', 'Agenda, charts to scale, KPIs, a recommended option, a timeline.', ['boardroom', 'light']],
  ['keynote-pro/examples/tech-talk.html', 'keynote-pro/assets/thumb-tech-talk.jpg', 'Engineering talk', 'Architecture diagrams that draw, a process, a code walkthrough.', ['swiss', 'light']],
  ['keynote-pro/examples/genai-101.html', 'keynote-pro/assets/thumb-genai-101.jpg', 'How LLMs actually work', 'Magic Move, diagrams that draw, charts, code. From a public GenAI course.', ['studio', 'dark']],
  ['keynote-pro/examples/how-it-works.html', 'keynote-pro/assets/thumb-how-it-works.jpg', 'How it works', 'The skill explained, with the deck as its own live demo.', ['studio', 'dark']],
  ['keynote-pro/examples/beyond-slides.html', 'keynote-pro/assets/thumb-beyond-slides.jpg', 'Slides that run', 'Live demos on slides: app UI, calculator, simulation, sound, code, a game.', ['keynote-black', 'dark']],
  ['keynote-pro/examples/arabic-sample.html', 'keynote-pro/assets/thumb-arabic-sample.jpg', 'Arabic, right to left', 'A whole deck in Arabic: layouts, timelines and charts mirror.', ['editorial', 'light', 'Arabic']],
  ['keynote-pro/examples/how-it-works-ar.html', 'keynote-pro/assets/thumb-how-it-works-ar.jpg', 'How it works, in Egyptian Arabic', 'The how-it-works deck, right to left.', ['studio', 'dark', 'Arabic']],
  ['keynote-pro/examples/beyond-slides-ar.html', 'keynote-pro/assets/thumb-beyond-slides-ar.jpg', 'Slides that run, in Egyptian Arabic', 'The live-demo deck, right to left.', ['keynote-black', 'dark', 'Arabic']],
  ['keynote-pro/fonts.html', 'keynote-pro/assets/aria-hero.jpg', 'Fonts and themes', 'Every font pairing and theme as a specimen. Type your own headline.', ['specimens']],
];
const legacy = [
  ['legacy/claude101.html', 'claude101', 'Claude 101', 'A crash course on getting real work out of Claude, from first prompt to your own skills.', 'Markdown keynote'],
  ['legacy/index.html', 'markdown-keynote', 'The future of presentations', 'The original markdown keynote: toolbar, drawing, dark and light.', 'Markdown keynote'],
  ['legacy/demo-keynote.html', 'demo-keynote', 'The power of HTML', 'Keynote-format demo deck.', 'Markdown keynote'],
  ['legacy/demo-stories.html', 'demo-stories', 'Why HTML wins', 'Vertical, phone-first slides you swipe through.', 'Stories'],
  ['legacy/stories-template.html', 'stories-template', 'Stories template', 'The starting file for vertical decks.', 'Stories'],
  ['legacy/samples/conference-keynote.html', 'sample-conference-keynote', 'The future of work in the age of AI', 'Conference keynote sample.', 'Markdown keynote'],
  ['legacy/samples/product-launch.html', 'sample-product-launch', 'Introducing Arc', 'Product launch sample.', 'Markdown keynote'],
  ['legacy/samples/sales-pitch.html', 'sample-sales-pitch', 'Accelerate your growth', 'Sales pitch sample.', 'Markdown keynote'],
  ['legacy/samples/tech-talk.html', 'sample-tech-talk', 'Building scalable APIs with GraphQL', 'Terminal-styled tech talk.', 'Markdown keynote'],
  ['legacy/samples/course-materials.html', 'sample-course-materials', 'Introduction to machine learning', 'Course module in the Stories format.', 'Stories'],
  ['legacy/samples/internal-training.html', 'sample-internal-training', 'Security awareness', 'Internal training in the Stories format.', 'Stories'],
  ['legacy/samples/team-update.html', 'sample-team-update', 'Q1 update', 'Team update in the Stories format.', 'Stories'],
  ['legacy/samples/workshop-guide.html', 'sample-workshop-guide', 'Mastering Git and GitHub', 'Workshop guide in the Stories format.', 'Stories'],
];

const card = ({href, img, title, desc, kind, tags, field = '', mode = '', sw = null}) =>
  `<a class="card" href="${esc(href)}" data-kind="${kind}" data-field="${field}" data-mode="${mode}" data-q="${esc((title + ' ' + desc + ' ' + tags.join(' ')).toLowerCase())}">
      <span class="thumb"><img src="${esc(img)}" alt="" loading="lazy" width="800" height="450"></span>
      <span class="body"><b>${esc(title)}</b><span class="desc">${esc(desc)}</span>
        <span class="tags">${sw ? `<span class="sw">${sw.map(c => `<i style="background:${c}"></i>`).join('')}</span>` : ''}${tags.map(t => `<em>${esc(t)}</em>`).join('')}</span></span>
    </a>`;

const cards = [
  ...examples.map(([href, img, title, desc, tags]) => card({href, img, title, desc, kind: 'example', tags, mode: tags.includes('dark') ? 'dark' : 'light'})),
  ...lib.map(d => card({href: `keynote-pro/library/${d.slug}.html`, img: `keynote-pro/library/thumbs/${d.slug}.jpg`, title: d.profession,
    desc: d.bestFor, kind: 'look', field: d.field, mode: d.mode.startsWith('dark') ? 'dark' : 'light', sw: d.sw, tags: [d.theme, d.fontsLabel.split(' / ')[0]]})),
  ...legacy.map(([href, img, title, desc, fmt]) => card({href, img: `gallery/thumbs/${img}.jpg`, title, desc, kind: 'legacy', tags: [fmt]})),
];
const counts = {example: examples.length, look: lib.length, legacy: legacy.length};

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>present-in-html: presentations written in HTML</title>
<meta name="description" content="A Claude Code plugin that makes, edits, reviews and publishes slide decks as one HTML file, with 32 themes and a template library.">
<link rel="icon" type="image/svg+xml" href="assets/logo.svg">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{--bg:#fbf7f0;--bg2:#f3ece0;--card:#fffdf9;--ink:#1a1612;--ink2:#5e554b;--rule:#e4dacb;--accent:#d9542f;--accent-ink:#fff;--code:#1f1b17;--code-ink:#f3ede4;
  --f-d:"Bricolage Grotesque",system-ui,sans-serif;--f-b:Inter,system-ui,sans-serif;--f-m:"JetBrains Mono",ui-monospace,monospace;color-scheme:light}
@media (prefers-color-scheme:dark){:root{--bg:#13110f;--bg2:#1b1815;--card:#1e1a17;--ink:#f3ede4;--ink2:#b3a899;--rule:#332d27;--accent:#f0805f;--accent-ink:#1a1612;--code:#0c0b0a;--code-ink:#f3ede4;color-scheme:dark}}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.6 var(--f-b);-webkit-font-smoothing:antialiased}
a{color:inherit}
.wrap{max-width:1180px;margin:0 auto;padding:0 24px}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:6px}
header{position:sticky;top:0;z-index:5;background:color-mix(in srgb,var(--bg) 86%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--rule)}
header .wrap{display:flex;align-items:center;gap:24px;height:64px}
.brand{display:flex;align-items:center;gap:10px;font:700 19px/1 var(--f-d);text-decoration:none;letter-spacing:-.01em}
.brand img{width:34px;height:34px}
nav{display:flex;gap:22px;margin-left:auto;font-size:15px}
nav a{text-decoration:none;color:var(--ink2)}nav a:hover{color:var(--ink)}
.hero{padding:88px 0 72px;display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center}
.kicker{font:500 13px/1 var(--f-m);letter-spacing:.06em;text-transform:uppercase;color:var(--accent)}
h1{font:800 clamp(44px,6.4vw,84px)/.98 var(--f-d);letter-spacing:-.035em;margin:18px 0 22px}
h1 em{font-style:normal;color:var(--accent)}
.lead{font-size:20px;color:var(--ink2);max-width:34ch;margin:0 0 32px}
.cta{display:flex;flex-wrap:wrap;gap:12px}
.btn{display:inline-flex;align-items:center;gap:8px;min-height:48px;padding:0 22px;border-radius:999px;font-weight:600;text-decoration:none;border:1.5px solid var(--ink)}
.btn.primary{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}
.btn:hover{transform:translateY(-1px)}
.shot{position:relative;display:block;border-radius:18px;overflow:hidden;box-shadow:0 30px 60px -20px rgba(40,20,0,.35),0 0 0 1px var(--rule);aspect-ratio:16/9;background:#000}
.shot img{width:100%;height:100%;object-fit:cover;display:block}
.shot .play{position:absolute;right:16px;bottom:16px;background:var(--accent);color:var(--accent-ink);font:600 14px/1 var(--f-b);padding:11px 16px;border-radius:999px}
section{padding:72px 0;border-top:1px solid var(--rule)}
h2{font:700 clamp(32px,4vw,48px)/1.05 var(--f-d);letter-spacing:-.025em;margin:0 0 12px}
.sub{color:var(--ink2);margin:0 0 40px;max-width:60ch}
.skills{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.skill{background:var(--card);border:1px solid var(--rule);border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px}
.skill .n{font:500 13px/1 var(--f-m);color:var(--accent)}
.skill h3{font:700 22px/1.1 var(--f-d);margin:0}
.skill code{font:500 13px/1 var(--f-m);color:var(--ink2)}
.skill p{margin:0;color:var(--ink2);font-size:15.5px}
.skill q{margin-top:auto;font-size:14.5px;border-top:1px dashed var(--rule);padding-top:12px;color:var(--ink)}
.feats{display:grid;grid-template-columns:repeat(3,1fr);gap:28px 40px}
.feat b{display:block;font:700 19px/1.2 var(--f-d);margin-bottom:6px}
.feat span{color:var(--ink2);font-size:15.5px}
.install{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
.step{background:var(--card);border:1px solid var(--rule);border-radius:16px;padding:24px}
.step h3{font:700 20px/1.2 var(--f-d);margin:0 0 6px}
.step p{margin:0 0 14px;color:var(--ink2);font-size:15.5px}
pre{position:relative;margin:0;background:var(--code);color:var(--code-ink);border-radius:12px;padding:44px 18px 16px;font:14px/1.7 var(--f-m);overflow-x:auto}
pre .c{color:#9d9184}
.copy{position:absolute;top:10px;right:10px;font:500 12px/1 var(--f-b);background:#ffffff1a;color:var(--code-ink);border:0;border-radius:8px;padding:7px 10px;cursor:pointer}
.copy:hover{background:#ffffff33}
.tools{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:0 0 14px}
.chip{font:500 14px/1 var(--f-b);min-height:38px;padding:0 15px;border-radius:999px;border:1px solid var(--rule);background:var(--card);color:var(--ink);cursor:pointer}
.chip[aria-pressed="true"]{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.chip small{opacity:.6;margin-left:4px}
#q{margin-left:auto;min-height:40px;min-width:min(260px,100%);border:1px solid var(--rule);border-radius:999px;padding:0 16px;background:var(--card);color:var(--ink);font:inherit;font-size:15px}
.fields{display:none;flex-wrap:wrap;gap:8px;margin:0 0 22px}.fields.on{display:flex}
.fields .chip{min-height:32px;font-size:13px;padding:0 12px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:20px}
.card{display:flex;flex-direction:column;background:var(--card);border:1px solid var(--rule);border-radius:14px;overflow:hidden;text-decoration:none;transition:transform .15s,box-shadow .15s}
.card:hover{transform:translateY(-3px);box-shadow:0 18px 36px -18px rgba(40,20,0,.4)}
.card[hidden]{display:none}
.thumb{aspect-ratio:16/9;background:var(--bg2);overflow:hidden;border-bottom:1px solid var(--rule)}
.thumb img{width:100%;height:100%;object-fit:cover;display:block}
.body{display:flex;flex-direction:column;gap:6px;padding:14px 16px 16px;flex:1}
.body b{font:700 17px/1.25 var(--f-d)}
.desc{color:var(--ink2);font-size:14px;line-height:1.45}
.tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto;padding-top:6px;align-items:center}
.tags em{font:500 11.5px/1 var(--f-m);font-style:normal;color:var(--ink2);border:1px solid var(--rule);border-radius:6px;padding:5px 7px}
.sw{display:inline-flex;margin-right:2px}.sw i{width:14px;height:14px;border-radius:50%;margin-right:-4px;box-shadow:0 0 0 1.5px var(--card)}
.empty{color:var(--ink2);display:none}
footer{border-top:1px solid var(--rule);padding:36px 0 56px;color:var(--ink2);font-size:14.5px}
footer .wrap{display:flex;flex-wrap:wrap;gap:12px 28px;justify-content:space-between}
@media (max-width:960px){.hero{grid-template-columns:1fr;padding-top:56px}.skills{grid-template-columns:1fr 1fr}.feats{grid-template-columns:1fr 1fr}.install{grid-template-columns:minmax(0,1fr)}}
@media (max-width:600px){.wrap{padding:0 16px}nav{display:none}.skills,.feats{grid-template-columns:1fr}#q{margin-left:0;width:100%}section{padding:56px 0}}
@media (prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important}.btn:hover,.card:hover{transform:none}}
</style>
</head>
<body>
<header><div class="wrap">
  <a class="brand" href="#top"><img src="assets/logo.svg" alt="" width="34" height="34">present-in-html</a>
  <nav><a href="#skills">Skills</a><a href="#install">Install</a><a href="#library">Template library</a><a href="${REPO}/issues/new/choose">Feedback</a><a href="${REPO}">GitHub</a></nav>
</div></header>

<main id="top">
<div class="wrap hero">
  <div>
    <span class="kicker">A Claude Code plugin</span>
    <h1>Presentations, <em>written in HTML.</em></h1>
    <p class="lead">Give Claude a topic, an outline, documents, data or links. Get a designed slide deck: one file that opens in any browser, presents itself, and prints to PDF.</p>
    <div class="cta"><a class="btn primary" href="#install">Install the plugin</a><a class="btn" href="tour.html">Watch the tour</a><a class="btn" href="${REPO}"><svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>View on GitHub</a></div>
  </div>
  <a class="shot" href="tour.html" aria-label="Open the tour deck"><img src="gallery/thumbs/tour.jpg" alt="Title slide of the tour deck: Presentations, written in HTML"><span class="play">&#9654; Play the tour</span></a>
</div>

<section id="skills"><div class="wrap">
  <h2>Four skills, one deck</h2>
  <p class="sub">Claude picks the right one from what you ask. Each loads only when it is needed, so the plugin adds about 734 tokens to a session.</p>
  <div class="skills">
    <div class="skill"><span class="n">01 / make</span><h3>Make</h3><code>present-in-html</code><p>Writes the deck from your material in a look chosen for your audience, with speaker notes, then runs the checker.</p><q>Turn q3-report.pdf into a 10-minute board deck</q></div>
    <div class="skill"><span class="n">02 / edit</span><h3>Edit</h3><code>edit-deck</code><p>Opens a click-and-type editor for wording and notes. Save writes the same file back.</p><q>Let me fix the wording myself</q></div>
    <div class="skill"><span class="n">03 / review</span><h3>Review</h3><code>review-deck</code><p>Checks timing, jargon, story and sources against the audience and the time slot.</p><q>Will this fit in 15 minutes for managers?</q></div>
    <div class="skill"><span class="n">04 / publish</span><h3>Publish</h3><code>publish-deck</code><p>Puts the deck and its images on GitHub Pages and returns a link to share.</p><q>Put my deck online so I can send a link</q></div>
  </div>
</div></section>

<section id="features"><div class="wrap">
  <h2>What every deck can do</h2>
  <p class="sub">The engine, the theme and the slides live in one HTML file. Nothing to install to present it.</p>
  <div class="feats">
    <div class="feat"><b>32 themes</b><span>Six core looks and 26 made for a profession, each with fonts and a slide recipe.</span></div>
    <div class="feat"><b>28 layouts</b><span>From title and chart to case review, quiz, ask and materials board. Text fits itself.</span></div>
    <div class="feat"><b>Presenter window</b><span>Notes, the next build, a timer or countdown. Press P.</span></div>
    <div class="feat"><b>Builds and Magic Move</b><span>Lists reveal, numbers count, charts draw, objects morph between slides.</span></div>
    <div class="feat"><b>Narration</b><span>One voice clip per slide; the deck plays it and moves on by itself. Press A. Try it on How it works.</span></div>
    <div class="feat"><b>Arabic and RTL</b><span>Every layout mirrors; bilingual decks have their own look.</span></div>
    <div class="feat"><b>Checked before delivery</b><span>Overflow, text size, contrast and missing notes, in every theme.</span></div>
  </div>
</div></section>

<section id="install"><div class="wrap">
  <h2>Install</h2>
  <p class="sub">Two commands in Claude Code, then ask for a presentation. The skills and the source are on <a href="${REPO}">GitHub</a>.</p>
  <div class="install">
    <div class="step"><h3>As a plugin</h3><p>Recommended. Updates arrive with <code>/plugin update</code>.</p>
<pre><button class="copy" type="button">Copy</button>/plugin marketplace add hisham-abuella/present-in-html
/plugin install present-in-html@present-in-html-marketplace</pre></div>
    <div class="step"><h3>Then just ask</h3><p>Or call a skill directly, like <code>/present-in-html:review-deck</code>.</p>
<pre><button class="copy" type="button">Copy</button>Make a 10-minute deck for our Q3 board review.
Revenue was $4.2M, up 18%.</pre></div>
    <div class="step"><h3>Without the plugin system</h3><p>Copies the skills into <code>~/.claude/skills/</code>; the workflow needs the plugin.</p>
<pre><button class="copy" type="button">Copy</button>git clone ${REPO}.git
cd present-in-html && ./install-skill.sh</pre></div>
    <div class="step"><h3>For the checker</h3><p>Playwright, installed once outside the plugin folder.</p>
<pre><button class="copy" type="button">Copy</button>mkdir -p ~/.kp-tools && cd ~/.kp-tools
npm i playwright && npx playwright install chromium</pre></div>
  </div>
</div></section>

<section id="library"><div class="wrap">
  <h2>Template library</h2>
  <p class="sub">Every deck here is one HTML file. Open one, press <b>F</b> for fullscreen, <b>P</b> for the presenter window, <b>S</b> to try another theme.</p>
  <div class="tools" role="group" aria-label="Filter templates">
    <button class="chip" data-k="all" aria-pressed="true">All<small>${cards.length}</small></button>
    <button class="chip" data-k="example" aria-pressed="false">Example decks<small>${counts.example}</small></button>
    <button class="chip" data-k="look" aria-pressed="false">Profession looks<small>${counts.look}</small></button>
    <button class="chip" data-k="legacy" aria-pressed="false">Earlier formats<small>${counts.legacy}</small></button>
    <input id="q" type="search" placeholder="Search: finance, Arabic, dark..." aria-label="Search templates">
  </div>
  <div class="fields" role="group" aria-label="Filter looks by field">
    <button class="chip" data-f="" aria-pressed="true">Every field</button>
    ${Object.entries(FIELDS).map(([k, v]) => `<button class="chip" data-f="${k}" aria-pressed="false">${esc(v)}</button>`).join('\n    ')}
  </div>
  <div class="grid">
    ${cards.join('\n    ')}
  </div>
  <p class="empty">Nothing matches. Try another word.</p>
</div></section>
</main>

<footer><div class="wrap"><span>present-in-html · <a href="LICENSE">MIT License</a> · © 2026 <a href="https://www.hishamabuella.com">Hisham Abuella</a></span><span><a href="https://www.hishamabuella.com">hishamabuella.com</a> · <a href="${REPO}">Source on GitHub</a> · <a href="${REPO}/issues/new/choose">Report a bug or share feedback</a> · <a href="keynote-pro/README.md">Engine manual</a></span></div></footer>

<script>
(() => {
  const cards = [...document.querySelectorAll('.card')], q = document.getElementById('q'), fields = document.querySelector('.fields'), empty = document.querySelector('.empty');
  let kind = 'all', field = '';
  const apply = () => {
    const t = q.value.trim().toLowerCase(); let n = 0;
    for (const c of cards) { const ok = (kind === 'all' || c.dataset.kind === kind) && (!field || c.dataset.field === field) && (!t || c.dataset.q.includes(t)); c.hidden = !ok; n += ok; }
    empty.style.display = n ? 'none' : 'block';
  };
  const press = (sel, btn) => document.querySelectorAll(sel).forEach(b => b.setAttribute('aria-pressed', b === btn));
  document.querySelectorAll('[data-k]').forEach(b => b.addEventListener('click', () => { kind = b.dataset.k; press('[data-k]', b); fields.classList.toggle('on', kind === 'look'); if (kind !== 'look') { field = ''; press('[data-f]', document.querySelector('[data-f=""]')); } apply(); }));
  document.querySelectorAll('[data-f]').forEach(b => b.addEventListener('click', () => { field = b.dataset.f; press('[data-f]', b); apply(); }));
  q.addEventListener('input', apply);
  document.querySelectorAll('.copy').forEach(b => b.addEventListener('click', async () => {
    const text = b.parentElement.textContent.replace(b.textContent, '').trim();
    try { await navigator.clipboard.writeText(text); b.textContent = 'Copied'; } catch { b.textContent = 'Select to copy'; }
    setTimeout(() => b.textContent = 'Copy', 1600);
  }));
})();
</script>
</body>
</html>
`;
fs.writeFileSync(path.join(root, 'index.html'), html);
console.log(`wrote index.html: ${cards.length} templates (${counts.example} examples, ${counts.look} looks, ${counts.legacy} earlier formats)`);
