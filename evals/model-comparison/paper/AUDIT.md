# Audit of the paper and its data pipeline

Audit date: 2026-10-17. Scope: `paper/paper.md`, `README.md`, `study/RESULTS.md`, `paper/data/*`, `paper/figures/*.svg`, `paper/make-figures.mjs`, `study/scripts/*` and the raw data in `results/` and `study/tasks/`. The HTML editions were not read or edited.

**Method.** All numbers were recomputed with separate scripts written for this audit (Python, in the auditor's scratch space; `make-figures.mjs` was not reused). The scripts:

- read `meta.json`, the gzipped CLI transcripts (init event, last `result` event, every `tool_use` block), `judge.json` and `check.txt`;
- re-parsed every `deck.html` and `output/parts/*.html`;
- inverted the SVG geometry of every figure back to data values, using each figure's own tick labels.

Statuses: **PASS** (matches), **FIXED** (old → new), **FLAG** (judgement call, not changed).

## Summary

| | Count |
|---|---|
| Checks | 114 (108 numbered checks in sections 1–7, plus the 6 reference-check items R1–R6) |
| PASS | 101 |
| FIXED | 11 edits: 5 errors found by this audit (A1, A2, B1, B2, B3, from checks 21, 78, 86 and 94) and 6 reference-check items (R1–R6) |
| FLAG | 17 (F1–F17; F10, F12 and F13 are checks 108, 102 and 104) |

`make-figures.mjs` had no derivation error, so it was not changed. Rerunning it reproduced `study-data.json`, `tables.md` and all five SVGs byte for byte (SHA-1 identical).

## 1. Recomputed run metrics vs reported (TABLE III, Sections IV-A/B, tables.md, RESULTS.md)

The wall time is `ended − started` from `meta.json`. API time is `duration_api_ms` from the last result event. Cost is `total_cost_usd`, with local runs set to $0. Turns are `num_turns`. Tool calls are the `tool_use` blocks; unique ids equal the raw count in every run. Output tokens are summed from `modelUsage.outputTokens`.

| # | Run | Wall (recomp. / paper) | API | Cost | Turns | Tools | Out tokens | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | W Opus | 704 s = 11m 44s / 11m 44s | 596.9 s = 9m 57s | 2.8786 / 2.88 | 34 | 32 | 63,296 | PASS |
| 2 | W Sonnet | 327 s = 5m 27s / 5m 27s | 264.1 s = 4m 24s | 0.8992 / 0.90 | 29 | 27 | 38,188 | PASS |
| 3 | W Haiku | 425 s = 7m 05s / 7m 05s | 322.2 s | 0.2447 / 0.24 | 37 | 35 | 68,384 | PASS |
| 4 | W qwen3.8 | 7200 s = 120m 00s (timed out, exit 143) | none (no result event) | $0 | – | 19 | – | PASS |
| 5 | S Opus | 674 s = 11m 14s | 531.1 s | 2.7854 / 2.79 | 32 | 31 | 56,857 | PASS |
| 6 | S Sonnet | 324 s = 5m 24s | 231.9 s | 0.7012 / 0.70 | 22 | 21 | 29,603 | PASS |
| 7 | S Haiku | 524 s = 8m 44s | 408.4 s | 0.3163 / 0.32 | 46 | 45 | 90,031 | PASS |
| 8 | S qwen3.8 | 7200 s (timed out, exit 143) | none | $0 | – | 22 | – | PASS |
| 9 | P qwen3.8 | 3663 s = 61m 03s (exit 1, `terminal_reason: api_error`) | 3661.1 s | $0 (CLI printed $2.96) | 13 | 9 | 11,099 | PASS |
| 10 | P qwen3.6 MoE | 1207 s = 20m 07s | 1176.9 s = 19m 37s | $0 (CLI printed $3.76) | 31 | 30 | 70,144 | PASS |
| 11 | P gemma4 | 4354 s = 72m 34s (exit 0, `completed`) | 4353.1 s | $0 (CLI printed $2.61) | 18 | 17 | 54,053 | PASS |

All 11 rows also match `results.json` and `study-data.json` field for field.

| # | Check | Recomputed | Reported | Status |
|---|---|---|---|---|
| 12 | Planner (plan.json and plan transcript) | 1400 s = 23m 20s, 51 turns, 101,973 out tokens, $5.045956, 95,872 B = 94 KB, 10 `<svg>` | 23m 20s, 51, 101,973, $5.05 ($5.046), 94 KB, "10 ready-to-paste SVGs" | PASS |
| 13 | Planner CLI version | 2.1.302 (init) | not stated | PASS |
| 14 | Judge cost per finished deck | 0.6107–0.7397 | "$0.61–$0.74" | PASS |
| 15 | Judge cost, template decks | 0.4483, 0.4194 | not used | PASS |
| 16 | CLI versions (init events) | 2.1.301 (W, S), 2.1.302 (P) | TABLE II | PASS |
| 17 | Time limits (run.json, wall of timed-out runs) | 120, 120, 240 | TABLE II | PASS |
| 18 | Budget cap, Ollama, machine, plugin, commit (run.json, init) | $20; 0.40.5; M4 Max 64 GB; 3.1.0; ae03c20 | Section III-B, TABLE II | PASS (see FLAG F11) |
| 19 | Runs sequential (no time overlaps between model windows) | no overlaps in any run | "one at a time" | PASS |
| 20 | MCP servers loaded | `[]` in every init | "no MCP servers" | PASS |
| 21 | Plugins loaded | present-in-html plus 3 built-in plugins (`cc-plugin-agents-md`, `-telemetry`, `-plugin-authoring`) | "only the study's plugin" | **FIXED** (A1) |

## 2. Deck counts (independent re-parse of each `deck.html`, compared with stats.json, tables.md and the paper)

| # | Deck | Slides | Notes | Diagrams (`<svg>`) | Animated | Placeholders | Words slides / notes | Quiz | Checker | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| 22 | W Opus | 30 | 30 | 13 | 19 | 3 | 1616 / 3042 | yes | ok, 0 issues | PASS |
| 23 | W Sonnet | 30 | 30 | 10 | 14 | 2 | 1419 / 2236 | yes | ok, 0 | PASS |
| 24 | W Haiku | 29 | 29 | 4 | 14 | 3 | 1466 / 1763 | yes | ok, 0 | PASS |
| 25 | S Opus | 30 | 30 | 11 | 20 | 2 | 1513 / 2962 | yes | ok, 0 | PASS |
| 26 | S Sonnet | 29 | 29 | 7 | 14 | 2 | 1392 / 1682 | yes | ok, 0 | PASS |
| 27 | S Haiku | 29 | 29 | 7 | 10 | 2 | 1606 / 1973 | yes | ok, 0 | PASS |
| 28 | P qwen3.6 | 30 | 30 | 10 | 20 | 2 | 1458 / 2830 | yes | ok, 0 | PASS |
| 29 | Template decks (W, S qwen3.8) | 21 | 3 | 1 | 7 | 6 | – | no | ok, 0 issues, 1 warning | PASS ("21 slides, checker pass") |

| # | Check | Recomputed | Reported | Status |
|---|---|---|---|---|
| 30 | Partial slides in `output/parts`: S qwen3.8 | part1 + part2: 20 slides, 17 notes | 20 (17) | PASS |
| 31 | P qwen3.8 | 01-opening: 10 slides, 10 notes | 10 (10) | PASS |
| 32 | P gemma4 | 01-opening: 10 slides, 10 notes | 10 (10) | PASS |
| 33 | W qwen3.8 | no parts; `PLAN.md` written at +90.3 min | "0 slides, PLAN.md only" | PASS |
| 34 | `decks/` folder | the 7 finished decks are byte-identical to `results/*/output/deck.html`; PARTIAL decks have 20/17, 10/10, 10/10 slides/notes | TABLE VI, README | PASS |
| 35 | "Every finished deck … notes on every slide and a quiz" | true for all 7 | | PASS |
| 36 | Diagram counts "Opus 13 and 11, Sonnet 10 and 7, Haiku 4 and 7, qwen 10" | as recomputed | | PASS |
| 37 | Notes words "3,042 and 2,962 … 2,830"; "Opus wrote the longest notes" | Opus is the longest in each run | | PASS |
| 38 | "Opus: the most animated slides (20 of 30)" (RESULTS.md, STATS) | 20 vs Sonnet 14, Haiku 10 | | PASS |

## 3. Judge scores and findings (`judge.json` `structured_output`)

| # | Check | Recomputed | Status |
|---|---|---|---|
| 39–45 | TABLE IV, all 7 rows × 8 scores | identical | PASS (7 checks) |
| 46 | Means (Fig. 4, tables.md) | Opus 5/5/5/4/5/5/5, overall 9.0; Sonnet 5/5/4.5/4/4.5/5/5, 9.0; Haiku 4/4/4/3/3.5/5/4.5, 7.0; qwen 5/5/5/4/4/4/5, 9.0 | PASS |
| 47 | "differed most on diagrams" | diagram range 1.5; every other criterion ≤ 1.0 | PASS |
| 48 | "No deck scored 5 on visual" | visual scores 4,4,3,4,4,3,4 | PASS |
| 49 | Wrong claims (major): 2(0), 0(0), 5(1), 1(0), 0(0), 1(0), 0(0) | identical | PASS |
| 50 | Invented claims 5,3,4,6,4,3,4 ("3–6"); only untrue one is Haiku W | identical | PASS |
| 51 | UI issues (major): 4(0), 7(0), 7(1), 4(0), 6(1), 6(2), 5(0) ("4–7") | identical | PASS |
| 52 | Major mistakes 0,0,2,0,1,2,1; "Opus had no major mistakes" | identical | PASS |
| 53 | Template decks judged 1/10 | both 1 | PASS |

**Quotes checked against `judge.json`** (all PASS in substance):

| # | Quote in paper or RESULTS.md | Status |
|---|---|---|
| 54 | Opus W "Wi-Fi, Bluetooth, microwaves" vs microwave ovens (slide 6, minor) | PASS |
| 55 | Sonnet S "the eyebrow label 'The plan' sits on top of the title 'Three questions'" (major, slide 2; verbatim) | PASS |
| 56 | Haiku S x̄: "(x − x)², which is zero" (slide 21, major). The screenshot `shots/slide-21.jpg` was viewed and the macron sits on the bracket. The markup uses a combining U+0304. | PASS |
| 57 | Haiku W "'electromagnetic' runs into the Hertz column and overlaps 'radio waves'" (major; verbatim) | PASS |
| 58 | Haiku S "Population (6), Sampling (7–8), Bias (9), Study design (10), Types of variables (11)…". Verbatim; confirmed in slides.md (Sampling/Bias/Study design come before Types of variables, against module sections 4–8). | PASS |
| 59 | qwen3.6 "then to reveal" (the only major mistake) | PASS |
| 60 | Template judge: "only the footer was changed" (Wireless judge) | PASS |
| 61 | Haiku W "Fence: gain does not add energy…" slide 9, major, "would embarrass the lecturer" | PASS |
| 62 | "a reflected ray that misses the receiver (Sonnet, Wireless)" (slide 15) | PASS |
| 63 | RESULTS.md Opus W diagrams "checked as correct (constellations, waveforms that encode the bits, a valid reuse grid)" | PASS |
| 64 | RESULTS.md qwen3.6 "no wrong claims, every number right, all sections in order" | PASS |

## 4. Derived numbers and arithmetic

| # | Claim | Recomputation | Status |
|---|---|---|---|
| 65 | "5.4–11.7 minutes" (abstract), "within 12 minutes" | 324 s = 5.40, 704 s = 11.73 | PASS |
| 66 | "about half the time" | Sonnet/Opus = 327/704 = 46.4%; 324/674 = 48.1% | PASS |
| 67 | "31% and 25%" | 0.8992/2.8786 = 31.2%; 0.7012/2.7854 = 25.2% | PASS |
| 68 | "a quarter to a third", "25–31%" | 25.2–31.2% | PASS |
| 69 | Plan spread: per-deck cost = plan cost / N + build cost ($0 local). N = 2: 5.046/2 = $2.523 < Opus STATS $2.785. N = 8: $0.631 < Sonnet STATS $0.701. N = 7 gives $0.721 > $0.701, so 8 is the smallest N that beats Sonnet. Break-even against Haiku STATS would need N = 16. | PASS (comparison holds; see F7) |
| 70 | "$5.05 … more than any single cloud deck" | max cloud deck $2.88 | PASS |
| 71 | Output tokens per API minute: qwen3.6 70,144 / 19.615 = 3,576 ("about 3,575"); qwen3.8 11,099 / 61.02 = 181.9 ("182"); gemma 54,053 / 72.55 = 745.0 ("745") | PASS (see F2) |
| 72 | "faster than the planner alone (23m 20s)" | 20m 07s < 23m 20s | PASS |
| 73 | "after 19 and 22 tool calls" | 19, 22 | PASS |
| 74 | qwen3.6 "31 turns and 30 tool calls" | 31, 30 | PASS |
| 75 | "failed after 61 minutes" | 61.05 min | PASS |
| 76 | Fig. 1 label rounding (11.7, 5.5, 7.1, 11.2, 5.4, 8.7, 61.0, 20.1, 72.6, 120) | consistent with seconds/60 to 1 dp | PASS |
| 77 | RESULTS.md "Opus … about $2.80 a deck", "Haiku … about $0.30", "Sonnet … about 5.5 minutes" | 2.79–2.88; 0.24–0.32; 5.40–5.45 | PASS (loose but not misleading) |
| 78 | RESULTS.md "The plan costs about what one Opus deck does" | $5.05 / $2.79–2.88 = 1.75–1.81 Opus decks | **FIXED** (B2) |
| 79 | RESULTS.md "qwen3.8 27B spent about 80 minutes reading the skill … about 10 slides every 20 minutes". From the rsync-preserved mtimes (S run): template `deck.html` at +80.9 min, part1 at +101.8, part2 at +119.4. | PASS |

## 5. Qualitative and factual claims

| # | Claim | Evidence | Status |
|---|---|---|---|
| 80 | Wireless prompt begins "Use the present-in-html skill to…"; STATS prompts begin `/present-in-html:present-in-html` | `prompt.txt` of each task | PASS |
| 81 | "each model chose to call the skill itself" (Wireless) | each of the 4 Wireless transcripts has exactly one `Skill` call; the STATS runs have none | PASS |
| 82 | Harness flags (`--setting-sources ""`, `--plugin-dir`, `--strict-mcp-config`, `--no-session-persistence`, bypass permissions, default effort) | run.sh `COMMON`; no `--effort` | PASS |
| 83 | Local model loaded before the clock starts | run.sh preload `curl` comes before `start=$(date +%s)` | PASS (see F16) |
| 84 | Plan-prompt quote "will be built … by a smaller, much slower local model that has never used this skill" | present in the current (revised) `plan-prompt.txt` | PASS, with a caveat: the original prompt could not be verified |
| 85 | Hand patches (`D="$PWD"`, `deck.html`) | PLAN.md line 1182 `D="$PWD"`, lines 1215–1224 use `deck.html`; the run copy is identical to the task copy | PASS |
| 86 | gemma "rewrote that file eleven times" | 13 `Write` calls: 9 succeeded on `parts/01-opening.html` (1 create + 8 rewrites), and 4 failed with `InputValidationError: file_path is missing`. The 4 failed calls carried slide 11 ("sampling"), the start of part 2. | **FIXED** (A2, B1) |
| 87 | gemma ended its turn saying it would "now proceed to build Part 2"; CLI reported completed, exit 0 | result text "I will now proceed to build **Part 2 (slides 11-20)** … I'll keep going!"; `terminal_reason: completed`, exit 0 | PASS |
| 88 | qwen3.8 planned: "API Error: The response stopped arriving" at 61 min, while writing part 2 | final synthetic message is that text; the last thinking block says "Now let me write part 2 (slides 11-20)"; part1 mtime +26.6 min | PASS |
| 89 | qwen3.8 Wireless timed out with only PLAN.md | PLAN.md at +90.3 min; last turn is a resumed generation after "Your response above was cut off mid-stream"; no parts | PASS |
| 90 | Template decks passed the checker and scored 1/10 | `ok … 21 slides, 0 issues` (1 warning); judge 1 | PASS |
| 91 | "with 'Your Name,' 'you@example.com' and a revenue chart" | judge findings, both runs | PASS |
| 92 | Fence leaks: Haiku W slide 9 (on slide); Sonnet W "Fence:" twice in notes | Sonnet W notes on slides 2 and 12 | PASS (see F5) |
| 93 | qwen3.6 "needed no reference files at all" (RESULTS.md) | its only Reads were PLAN.md and the module | PASS |
| 94 | RESULTS.md header "Same conditions throughout: Claude Code 2.1.301 … 120-minute limit" | the planned run used 2.1.302 and 240 min | **FIXED** (B3) |
| 95 | README file list, deck links, "timed out after writing only its plan" | files exist; claims hold | PASS |
| 96 | README: scripts are copies of `evals/model-comparison/` in the present-in-html repo | all 7 files byte-identical | PASS |

## 6. Figures (SVG geometry inverted with each figure's own tick labels)

| # | Figure | Result | Status |
|---|---|---|---|
| 97 | Fig. 1 | Log axis: the tick positions fit log10 exactly (2–200). All 11 bars invert to their wall minutes (11.73, 5.45, 7.08, 120.1, 11.25, 5.40, 8.73, 120.1, 61.02, 20.12, 72.55). Dashed limit lines invert to 120, 120 and 240. Crosses are on the 4 unfinished runs. Fills are consistent per model. | PASS |
| 98 | Fig. 2 | Linear $0–6 axis. Bars invert to 2.880, 0.900, 0.244, 2.786, 0.701, 0.315. The planned bar is a $0 build line with a hatched 0–5.047 plan segment. Labels are right. | PASS |
| 99 | Fig. 3 | Points invert to the (cost, score) of all 7 decks. The open "incl. plan" marker is at 5.046. Legends (shape = model, fill = task) are right. | PASS (see F15) |
| 100 | Fig. 4 | All 32 bars equal the per-model means. The overall bars are drawn at half (4.5 / 3.5) with labels 9.0 / 7.0. n is shown in the legend. | PASS |
| 101 | Fig. 5 | All 21 bars and major/untrue segments equal the judge counts. The legend and the white count labels are right. | PASS |

## 7. Scripts: bugs that could skew results

| # | Script | Finding | Status |
|---|---|---|---|
| 102 | report.mjs `finished` | `finished = result && !is_error && !timed_out` marks **gemma as finished = true** in `results.json` and the planned run's REPORT.md, although no deck exists. `make-figures.mjs` overrides this with a deck-exists check (`status: stopped early`), so the paper is right. The raw REPORT.md is misleading. | FLAG (F12) |
| 103 | report.mjs cost | Local cost is forced to 0, which is correct. The CLI's own prices for local runs ($2.61–$3.76) are correctly ignored. | PASS |
| 104 | report.mjs reproducibility | Reads `transcript.jsonl`, but the released transcripts are `.gz`. Rerunning it on the released folders would blank time, cost, tokens and tool counts. Timed-out runs get tokens 0 rather than null; make-figures nulls them. | FLAG (F13) |
| 105 | extract-slides.mjs | "Diagrams" is the raw `<svg>` count. Verified: every SVG in the 7 decks is one diagram per slide, with no nested or icon SVGs, so there is no inflation here, but the method is fragile. "Animated" counts any `dg`/`build` class, bullet builds included, so it means "slides with builds", not "animated diagrams". The section regex would truncate nested `<section>` elements; there are none. `has_quiz` is a keyword match. | PASS (fragility noted) |
| 106 | evaluate.sh | Uses `output/deck.html`, or else falls back to the newest top-level `*.html`. That could judge a non-deck file, but this never happened (all 7 judged files are `deck.html`). It writes `{"deck": null}` when there is no deck. | PASS |
| 107 | run.sh wall time | 1-second `date +%s` resolution. Includes CLI start-up and plugin load (seconds). Model load is excluded by the preload. The watchdog sends SIGTERM at exactly 7200 s. A harmless orphan `sleep` is left behind. | PASS |
| 108 | run.sh isolation | The parent-folder CLAUDE.md/.claude check skips `$HOME` (`[ "$d" != "$HOME" ]`). The paper says "any parent folder". Neither `~/CLAUDE.md` nor `~/.claude/CLAUDE.md` exists today. | FLAG (F10) |

## 8. Fixes made (FIXED)

| ID | File | Old → new |
|---|---|---|
| A1 | paper.md III-C | "only the study's plugin (`--plugin-dir`)," → "only the study's plugin (`--plugin-dir`) besides the CLI's three built-in plugins," |
| A2 | paper.md IV-E | "but it rewrote that file eleven times and then ended its turn" → "but it rewrote that file eight times (four more Write calls failed for lack of a file path) and then ended its turn" |
| B1 | RESULTS.md | "rewrote the same file 11 times, then" → "rewrote the same file 8 times (4 more Write calls failed for lack of a file path), then" |
| B2 | RESULTS.md | "The plan costs about what one Opus deck does," → "The plan costs about as much as two Opus decks," |
| B3 | RESULTS.md header | "120-minute limit per run, judged blind" → "120-minute limit per run (the planned run: Claude Code 2.1.302, 240 minutes), judged blind" |
| R1 | paper.md ref [9] | Authors → "H. Zheng, X. Guan, H. Kong, W. Zhang, J. Zheng, W. Zhou, H. Lin, Y. Lu, X. Han, and L. Sun" (published EMNLP list; copied from references.md) |
| R2 | paper.md ref [2] | added "pp. 68772–68802, doi: 10.52202/079017-2197" |
| R3 | paper.md ref [10] | added "pp. 2902–2911" |
| R4 | paper.md ref [11] | added "vol. 43, no. 2, pp. 1–55" |
| R5 | paper.md III-F | "and run-to-run variance can change rankings [17]." → "and score differences smaller than benchmark variance are not meaningful [17]." |
| R6 | paper.md VI | "and benchmark variance can be large enough to change model rankings [17]." → "and differences smaller than benchmark variance are not meaningful [17]." |

The other 14 reference entries in paper.md already matched `references.md` exactly. In both [17] sentences, the repeated-run point is carried by [18].

## 9. Flags (not changed; author's judgement)

| ID | Flag |
|---|---|
| F1 | **gemma4 26B architecture.** It is not stated, and it cannot be verified from the data. If `gemma4:26b` is the 26B mixture-of-experts variant, the "sparse vs dense" reading of the speed results needs a note: gemma, also sparse, ran at 745 tok/API-min against 3,575 for qwen3.6. |
| F2 | **Tokens per API minute mixes prefill with generation.** qwen3.8 (planned) processed 522,928 uncached input tokens against 102,893 for qwen3.6 (gemma 109,280). Its 182 tok/min therefore mostly reflects prompt processing. The paper notes that prefill is included, but the dense-vs-sparse comparison is confounded. |
| F3 | **"The counts point the same way"** (IV-C). Mean diagram counts are Opus 12 > qwen3.6 10 > Sonnet 8.5 > Haiku 5.5. Mean diagram scores are Opus 5.0 > Sonnet 4.5 > qwen3.6 4.0 > Haiku 3.5. The extremes agree, but the middle two swap. Suggest "roughly the same way". |
| F4 | **"Untouched template"** (I, Table III note, VII, Table VI note). The sample slides are untouched, but both models changed the theme, `<title>` and `data-title` (the footer), which is why the judge says "only the footer was changed". Consider "unfilled template". |
| F5 | **Fence leaks are wider than reported.** Also in STATS: Sonnet notes on slides 4 and 15 ("Fence: today is not about inference", "Fence: bigger is not automatically better"), and Haiku notes on slide 9 ("Fence this idea: …"). The paper and RESULTS.md mention only Wireless. |
| F6 | **Stream cut-offs are not only the final failure.** qwen3.8's Wireless run hit "Your response above was cut off mid-stream" 3 times and resumed; the planned qwen3.8 run also had earlier resumes. This supports the streaming hypothesis in IV-E and could be mentioned. |
| F7 | **Plan amortisation assumes every build succeeds.** Only 1 of 3 local planned builds produced a deck. The plan is also STATS-specific, so the comparisons are rightly made only against the STATS decks. Break-even is N = 2 against Opus, N = 8 against Sonnet and N = 16 against Haiku. Rebuilding the same plan also yields near-duplicate decks, so "more than once" counts only where there is a reason to rebuild (the paper names such reasons). |
| F8 | **Statistical consistency.** Section VI says differences of 1–2 points are within the noise one would expect. Yet Sections IV-C and V and RESULTS.md treat Haiku's 7 vs 9 as a real gap, and RESULTS.md headlines "Sonnet 5.5 is the best value" without hedging. With n = 1 per cell (and n = 2 decks per model in the means), none of these differences has an uncertainty estimate. |
| F9 | **"The dense 27B model produced reasonable slides when it got to them"** (V). Its part files were never judged, so this is the author's impression, not a measured result. |
| F10 | **Isolation check exempts `$HOME`**, though the paper says "any parent folder" (see 108). |
| F11 | **Commit `ae03c20` was recorded without a dirty-tree flag.** The present-in-html working tree currently has many uncommitted plugin changes, so the commit alone may not identify the plugin code used. The init events do confirm plugin version 3.1.0. |
| F12 | **report.mjs `finished` bug** (see 102). The raw REPORT.md for the planned run shows gemma as finished. |
| F13 | **report.mjs cannot be rerun on the released gzipped transcripts** (see 104). |
| F14 | **RESULTS.md "It was writing the last part when the limit stopped it"** (S qwen3.8). part2 finished at +119.4 min, 36 s before the kill, and the transcript ends at that tool result, so there is no direct evidence that part 3 was under way. |
| F15 | **Fig. 3's y axis starts at 5**, which visually enlarges the 7 vs 9 gap. Fig. 1's log bars start at 2 min. Both are labelled. |
| F16 | **Possible model reload.** Preloading uses Ollama's default options. If Claude Code's requests force a different context size, Ollama may reload the model inside the timed window. This cannot be verified. |
| F17 | **Cloud auth.** The init shows `apiKeySource: "none"`, which suggests subscription login. The costs are the CLI's list-price estimates, which the paper already says. |

## 10. Could not verify

- The text of the plan-only prompt actually used. The prompt is not echoed in `plan-transcript.jsonl.gz`, and `plan-prompt.txt` is the revised version. The quoted sentence is in the revised file only.
- The Wireless-era judge prompt. That the Wireless run put the audience and requirements in the rubric cannot be checked, because `judge.json` does not store the prompt and only the current `judge-prompt.txt` exists.
- What the checker actually tests (layout, safe area, text size, contrast, broken charts, missing notes). `check.mjs` is not in this repository. Only its outputs were checked.
- The architecture of `gemma4:26b-mlx` and the exact quantisation of each local model.
- Whether `~/CLAUDE.md` or `~/.claude/CLAUDE.md` existed at run time (neither exists now).
- Whether the Ollama model stayed loaded for the whole run (F17).
- Screenshots. Only Haiku STATS slide 21 was viewed; the other UI findings were checked against the judge text, not the images.
- Electricity cost, which the paper does not measure.

## 11. Changes the HTML editions need to pick up from paper.md

1. **III-C:** "… only the study's plugin (`--plugin-dir`) besides the CLI's three built-in plugins, no MCP servers …"
2. **III-F, first bullet:** "… even with fixed settings [18], and score differences smaller than benchmark variance are not meaningful [17]."
3. **IV-E:** "… but it rewrote that file eight times (four more Write calls failed for lack of a file path) and then ended its turn …"
4. **VI disclaimer:** "… even under fixed settings [18], and differences smaller than benchmark variance are not meaningful [17]."
5. **References [2], [9], [10], [11]**, now identical to `paper/references.md`:
   - [2] adds pages and DOI.
   - [9] has the new author list.
   - [10] adds pages.
   - [11] adds volume, issue and pages.

No figure, table value or data file changed.

## Follow-up (after the audit)

These flags were resolved in `paper.md` with minimal wording changes, and both HTML editions were rebuilt:
- "untouched template" → "unfilled template" / "template with its sample slides unchanged" (3 places).
- Plan cost spread over builds: added "This assumes every build succeeds; in this study only one of the three local planned builds did."
- "The counts point the same way" → "The diagram counts only partly match these scores".
- Fence leakage: added the STATS cases (Sonnet notes twice, Haiku notes once).
- Disclaimer: noise now covers one-point differences; the Haiku two-point gap is described as consistent on both tasks but unconfirmed.

The repository copy of RESULTS.md (`evals/model-comparison/RESULTS.md`) was synced with the audited `study/RESULTS.md`.
