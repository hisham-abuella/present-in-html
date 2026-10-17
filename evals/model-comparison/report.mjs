#!/usr/bin/env node
// Builds the comparison for one run: results.json, REPORT.md and index.html (decks side by side).
//   node report.mjs results/<run-id>
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(process.argv[2] || '');
if (!process.argv[2] || !fs.existsSync(path.join(OUT, 'run.json'))) { console.error('usage: node report.mjs results/<run-id>'); process.exit(2); }
const read = (f, d = null) => { try { return fs.readFileSync(f, 'utf8'); } catch { return d; } };
const json = (f, d = null) => { try { return JSON.parse(read(f)); } catch { return d; } };
const run = json(path.join(OUT, 'run.json'));
// A prompt that starts with /plugin:skill loads that skill before the first turn, without a Skill tool call.
const slashSkill = ((read(path.join(OUT, 'prompt.txt'), '') || '').match(/^\/([\w:-]+)/) || [])[1];

const rows = [];
for (const label of fs.readdirSync(OUT).sort()) {
  const dir = path.join(OUT, label);
  const meta = json(path.join(dir, 'meta.json'));
  if (!meta) continue;

  // Transcript: the init event (what was loaded), the result event (cost, time, tokens) and every tool call.
  let init = null, result = null; const tools = {}; const skills = new Set();
  for (const line of (read(path.join(dir, 'transcript.jsonl'), '') || '').split('\n')) {
    let e; try { e = JSON.parse(line); } catch { continue; }
    if (e.type === 'system' && e.subtype === 'init') init = e;
    if (e.type === 'result') result = e;
    if (e.type === 'assistant') for (const c of e.message?.content || []) if (c.type === 'tool_use') {
      tools[c.name] = (tools[c.name] || 0) + 1;
      if (c.name === 'Skill') skills.add(c.input?.skill || c.input?.command || '?');
    }
  }
  const mu = Object.values(result?.modelUsage || {});
  const tok = k => mu.reduce((a, m) => a + (m[k] || 0), 0);

  const check = read(path.join(dir, 'check.txt'), '') || '';
  const cm = check.match(/^(ok|FAIL)\s+\S+: (\d+) slides, (\d+) issue/m);
  const stats = json(path.join(dir, 'stats.json'), {}) || {};
  const jraw = json(path.join(dir, 'judge.json'), {});
  let judge = jraw?.structured_output || null;
  if (!judge && typeof jraw?.result === 'string') { try { judge = JSON.parse(jraw.result.replace(/^```(json)?|```$/g, '')); } catch {} }
  let htmls = []; try { htmls = fs.readdirSync(path.join(dir, 'output')).filter(f => f.endsWith('.html')); } catch {}
  const deck = htmls.includes('deck.html') ? 'output/deck.html' : htmls[0] ? 'output/' + htmls[0] : null;

  rows.push({
    label, model: meta.model, provider: meta.provider,
    finished: !!result && !result.is_error && !meta.timed_out, timed_out: meta.timed_out, exit_code: meta.exit_code,
    wall_seconds: meta.wall_seconds, api_seconds: result ? Math.round(result.duration_api_ms / 1000) : null,
    turns: result?.num_turns ?? null, tool_calls: Object.values(tools).reduce((a, b) => a + b, 0), tools,
    skills_used: [...(slashSkill ? [slashSkill + ' (prompt)'] : []), ...skills],
    skill_used: !!slashSkill || [...skills].some(s => /present-in-html/.test(s)),
    // Local models cost nothing per token; the CLI prices unknown models at a default rate, so that figure is ignored.
    cost_usd: meta.provider === 'ollama' ? 0 : (result?.total_cost_usd ?? null),
    cost_note: meta.provider === 'ollama' ? 'local (electricity only)' : 'API list price',
    tokens: {input: tok('inputTokens'), output: tok('outputTokens'), cache_read: tok('cacheReadInputTokens'), cache_write: tok('cacheCreationInputTokens')},
    models_called: Object.keys(result?.modelUsage || {}),
    loaded: init ? {plugins: (init.plugins || []).map(p => p.name), mcp_servers: (init.mcp_servers || []).map(m => m.name)} : null,
    deck,
    checker: cm ? {pass: cm[1] === 'ok', slides: +cm[2], issues: +cm[3], warnings: (check.match(/^\s+warn\s/gm) || []).length} : null,
    stats,
    judge: judge ? {...judge, cost_usd: jraw.total_cost_usd ?? null, model: Object.keys(jraw.modelUsage || {})[0] || null} : null,
  });
}
fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify({run, rows}, null, 2) + '\n');

// ---- REPORT.md ----
const t = s => s == null ? '–' : `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`;
const usd = v => v == null ? '–' : '$' + v.toFixed(2);
const k = n => n == null ? '–' : n >= 1e6 ? (n / 1e6).toFixed(2) + 'M' : n >= 1e3 ? Math.round(n / 1e3) + 'k' : String(n);
const yn = b => b == null ? '–' : b ? 'yes' : 'no';
const table = (head, body) => [`| ${head.join(' | ')} |`, `|${head.map(() => '---').join('|')}|`, ...body.map(r => `| ${r.join(' | ')} |`)].join('\n');
const sev = (list, s) => (list || []).filter(x => x.severity === s).length;

const md = [];
md.push(`# Model comparison: present-in-html, ${run.title || run.task || ''}`, '',
  `Run \`${run.run_id}\` · Claude Code ${run.claude_version} · plugin ${run.plugin_version} (commit ${run.git_commit}) · ${run.machine} · Ollama ${run.ollama_version || '–'}`, '',
  'Same prompt (`prompt.txt`), same source file, each model in its own new empty folder outside the repo. Runs one after another.', '');
md.push('## Time and cost', '', table(
  ['Model', 'Provider', 'Finished', 'Wall time', 'API time', 'Turns', 'Tool calls', 'Skill used', 'Input tok', 'Output tok', 'Cache read', 'Cost'],
  rows.map(r => [`**${r.label}** \`${r.model}\``, r.provider, r.timed_out ? 'timed out' : yn(r.finished), t(r.wall_seconds), t(r.api_seconds),
    r.turns ?? '–', r.tool_calls, yn(r.skill_used), k(r.tokens.input), k(r.tokens.output), k(r.tokens.cache_read),
    r.provider === 'ollama' ? '$0 (local)' : usd(r.cost_usd)])), '',
  'Cost is the CLI\'s API list-price figure for the whole run, background calls included (on a subscription it is what the same run would cost on the API). The judge\'s cost is not included.', '');
const plan = json(path.join(OUT, 'plan.json'));
if (plan) md.push(`**Shared plan:** every model built from the same [PLAN.md](PLAN.md) (${plan.plan_kb} KB), written once by \`${plan.planner}\` in ${t(plan.wall_seconds)} for ${usd(plan.cost_usd)}. That time and cost are not in the table above.`, '');
md.push('## The deck (checker and counts)', '', table(
  ['Model', 'Slides', '20–30', 'Checker', 'Issues', 'Notes', 'Diagrams', 'Animated slides', 'Placeholders', 'Images', 'Quiz', 'Deck KB'],
  rows.map(r => [r.label, r.checker?.slides ?? r.stats.slides ?? '–', yn(r.stats.slides ? r.stats.slides >= 20 && r.stats.slides <= 30 : null),
    r.checker ? (r.checker.pass ? 'pass' : 'FAIL') : '–', r.checker?.issues ?? '–',
    r.stats.slides ? `${r.stats.slides_with_notes}/${r.stats.slides}` : '–', r.stats.diagrams ?? '–', r.stats.slides_with_animation ?? '–',
    r.stats.placeholders ?? '–', r.stats.images ?? '–', yn(r.stats.has_quiz), r.stats.deck_kb ?? '–'])), '');
md.push(`## Judge scores (blind, ${rows.find(r => r.judge)?.judge.model || 'judge model'})`, '', table(
  ['Model', 'Accuracy', 'Coverage', 'Teaching', 'Visual', 'Diagrams', 'Notes', 'Reqs', '**Overall /10**', 'Wrong claims (major)', 'Invented', 'UI issues (major)'],
  rows.map(r => { const j = r.judge; if (!j) return [r.label, ...Array(11).fill('–')];
    const s = j.scores; return [r.label, s.accuracy, s.coverage, s.teaching, s.visual, s.diagrams, s.notes, s.requirements, `**${j.overall}**`,
      `${j.incorrect_claims.length} (${sev(j.incorrect_claims, 'major')})`, j.invented_claims.length, `${j.ui_issues.length} (${sev(j.ui_issues, 'major')})`]; })), '');
md.push('## Findings per model', '');
for (const r of rows) {
  md.push(`### ${r.label} (\`${r.model}\`)`, '');
  if (!r.judge) { md.push('_Not judged (no deck or the judge failed)._', ''); continue; }
  const j = r.judge;
  md.push(j.verdict, '');
  if (j.major_mistakes.length) md.push('**Major mistakes**', '', ...j.major_mistakes.map(m => `- ${m}`), '');
  if (j.incorrect_claims.length) md.push('**Wrong claims**', '', ...j.incorrect_claims.map(c => `- slide ${c.slide} (${c.severity}): "${c.claim}" → ${c.correction}`), '');
  if (j.invented_claims.length) md.push('**Not in the source**', '', ...j.invented_claims.map(c => `- slide ${c.slide}: "${c.claim}"${c.true ? '' : ' (and wrong)'}`), '');
  if (j.ui_issues.length) md.push('**UI issues**', '', ...j.ui_issues.map(u => `- slide ${u.slide} (${u.severity}): ${u.issue}`), '');
  if (j.strengths.length) md.push('**Strengths**', '', ...j.strengths.map(s => `- ${s}`), '');
  md.push(`Deck: [${r.deck}](${r.label}/${r.deck}) · screenshots: [${r.label}/shots/](${r.label}/shots/) · transcript: [${r.label}/transcript.jsonl](${r.label}/transcript.jsonl)`, '');
}
fs.writeFileSync(path.join(OUT, 'REPORT.md'), md.join('\n'));

// ---- index.html: the tables plus each deck's first slides; click through to the live deck ----
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[c]);
const shots = r => { try { return fs.readdirSync(path.join(OUT, r.label, 'shots')).filter(f => f.endsWith('.jpg')).sort(); } catch { return []; } };
const cards = rows.map(r => {
  const j = r.judge;
  return `<section class="card">
  <header><h2>${esc(r.label)}</h2><code>${esc(r.model)}</code>${j ? `<span class="score">${j.overall}<small>/10</small></span>` : ''}</header>
  <dl><div><dt>Time</dt><dd>${t(r.wall_seconds)}</dd></div><div><dt>Cost</dt><dd>${r.provider === 'ollama' ? '$0 local' : usd(r.cost_usd)}</dd></div>
  <div><dt>Slides</dt><dd>${r.stats.slides ?? '–'}</dd></div><div><dt>Checker</dt><dd>${r.checker ? (r.checker.pass ? 'pass' : 'fail · ' + r.checker.issues) : '–'}</dd></div>
  <div><dt>Wrong claims</dt><dd>${j ? j.incorrect_claims.length : '–'}</dd></div><div><dt>UI issues</dt><dd>${j ? j.ui_issues.length : '–'}</dd></div></dl>
  ${j ? `<p>${esc(j.verdict)}</p>` : '<p>No deck or not judged.</p>'}
  ${r.deck ? `<p><a href="${esc(r.label + '/' + r.deck)}">Open the deck →</a></p>` : ''}
  <div class="strip">${shots(r).map(f => `<a href="${esc(r.label + '/shots/' + f)}"><img loading="lazy" src="${esc(r.label + '/shots/' + f)}" alt="${esc(r.label)} ${esc(f)}"></a>`).join('')}</div>
</section>`; }).join('\n');
const mdTable = s => s.split('\n').filter(l => l.startsWith('|')).filter(l => !/^\|---/.test(l))
  .map((l, i) => `<tr>${l.slice(1, -1).split(' | ').map(c => i ? `<td>${esc(c.trim()).replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/`(.*?)`/g, '<code>$1</code>')}</td>` : `<th>${esc(c.trim()).replace(/\*\*/g, '')}</th>`).join('')}</tr>`).join('');
const sections = md.join('\n').split('\n## ').slice(1, 4).map(s => `<h2>${esc(s.split('\n')[0])}</h2><div class="scroll"><table>${mdTable(s)}</table></div>`).join('\n');
fs.writeFileSync(path.join(OUT, 'index.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Model Comparison ${esc(run.run_id)}</title>
<style>
:root{--bg:#f7f6f2;--fg:#1d1d1b;--muted:#6b6a64;--card:#fff;--line:#e2e0d8;--accent:#c4501b}
@media (prefers-color-scheme:dark){:root{--bg:#161614;--fg:#ecebe6;--muted:#9a988f;--card:#1f1f1c;--line:#34332e;--accent:#f08a4b}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 system-ui,sans-serif;padding:24px 16px 64px}
main{max-width:1200px;margin:0 auto}h1{margin:0 0 4px}.meta{color:var(--muted);margin:0 0 24px}h2{margin:32px 0 8px;font-size:18px}
.scroll{overflow-x:auto;border:1px solid var(--line);border-radius:8px;background:var(--card)}table{border-collapse:collapse;width:100%;font-size:13px}
th,td{padding:6px 10px;border-bottom:1px solid var(--line);text-align:left;white-space:nowrap}th{color:var(--muted);font-weight:600}
code{font-size:12px;color:var(--muted)}.cards{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(min(100%,520px),1fr))}
.card{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:16px;min-width:0}.card header{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap}
.card h2{margin:0}.score{margin-left:auto;font-size:28px;font-weight:700;color:var(--accent)}.score small{font-size:14px;color:var(--muted)}
dl{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0}dt{color:var(--muted);font-size:12px}dd{margin:0;font-weight:600}
a{color:var(--accent)}.strip{display:flex;gap:6px;overflow-x:auto;padding-bottom:6px}.strip img{height:90px;border-radius:4px;border:1px solid var(--line)}
</style></head><body><main>
<h1>present-in-html: model comparison</h1><p class="meta">${esc(run.title || '')}</p>
<p class="meta">Run ${esc(run.run_id)} · Claude Code ${esc(run.claude_version)} · plugin ${esc(run.plugin_version)} · ${esc(run.machine)}. Same prompt and source, each model in a new empty folder. Full findings in REPORT.md.</p>
${sections}
<h2>Decks</h2><div class="cards">${cards}</div>
</main></body></html>
`);
console.log(`report: ${path.join(OUT, 'REPORT.md')}\n        ${path.join(OUT, 'index.html')}`);
