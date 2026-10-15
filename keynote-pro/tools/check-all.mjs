#!/usr/bin/env node
/* Runs check.mjs on every library deck (own theme), template.html and the examples in every theme, then the token contrast audit.
   Usage: node tools/check-all.mjs [--shots dir]   Exit 1 if anything fails. */
import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const here = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const extra = process.argv.slice(2);
const decks = fs.readdirSync(path.join(here, 'library')).filter(f => f.endsWith('.html') && f !== 'index.html').map(f => 'library/' + f);
const run = (cmd, args) => spawnSync('node', [cmd, ...args], {cwd: here, stdio: 'inherit'}).status;
let bad = 0;
console.log(`== ${decks.length} library decks`); bad += run('check.mjs', [...decks, ...extra]) ? 1 : 0;
console.log('== template.html in every theme'); bad += run('check.mjs', ['template.html', '--themes']) ? 1 : 0;
console.log('== every library look (a temporary copy of the template with --all)'); { const {addLooks} = await import('./looks.mjs'); fs.writeFileSync(path.join(here, '.all-looks.html'), addLooks(fs.readFileSync(path.join(here, 'template.html'), 'utf8'), {themes: 'all', fonts: 'all'})); bad += run('check.mjs', ['.all-looks.html', '--themes']) ? 1 : 0; fs.rmSync(path.join(here, '.all-looks.html')); }
console.log('== examples in every theme'); bad += run('check.mjs', ['examples/genai-101.html', 'examples/product-launch.html', 'examples/quarterly-review.html', 'examples/tech-talk.html', 'examples/arabic-sample.html', 'examples/how-it-works.html', 'examples/every-layout.html', 'examples/how-it-works-ar.html', 'examples/beyond-slides-ar.html', '--themes']) ? 1 : 0;
console.log('== token contrast'); bad += run('tools/contrast.mjs', []) ? 1 : 0;
console.log(bad ? 'FAILED' : 'ALL GREEN'); process.exit(bad ? 1 : 0);
