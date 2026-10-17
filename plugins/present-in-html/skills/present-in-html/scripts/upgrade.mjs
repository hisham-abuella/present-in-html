#!/usr/bin/env node
/* Move decks onto the current engine: replaces their engine CSS/JS and core themes with template.html's and refreshes
   their library looks. Slides, title, and the deck's own extra <style>/<script> blocks are untouched.
   Usage: node tools/upgrade.mjs deck.html [more.html ...] */
import fs from 'node:fs';
import {upgrade} from './looks.mjs';
const files = process.argv.slice(2).filter(f => f.endsWith('.html'));
if (!files.length) { console.error('usage: node tools/upgrade.mjs deck.html [...]'); process.exit(2); }
for (const f of files) { fs.writeFileSync(f, upgrade(fs.readFileSync(f, 'utf8'))); console.log('upgraded ' + f); }
