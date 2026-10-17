# Model comparison: one prompt, several models

How well, how fast and at what cost do different models build a deck with the `present-in-html` skill? This study gives
every model the **same one-shot prompt** and the **same source file** through the Claude Code CLI, and compares the
decks, time and cost.

Each task in `tasks/<task>/` is a source module (`.md`) and the exact prompt (`prompt.txt`). Both tasks ask for a 20–30
slide, 50-minute first-year lecture deck with speaker notes, animated diagrams where they help, captioned image
placeholders, a quiz and a summary:

| Task | Source | Prompt starts with |
|---|---|---|
| `wireless-101` | Module 1 of *Wireless 101*: waves, decibels, path loss, link budget, modulation, Shannon, multiple access | "Use the present-in-html skill to…" (the model picks the skill itself) |
| `stats-101` | Module 1 of *STATS 101*: samples, bias, variable types, graphs, centre, spread, outliers, z-scores, correlation | `/present-in-html:present-in-html` (the skill is loaded for every model before its first turn) |
| `stats-101-planned` | the same STATS 101 module, plus a shared `PLAN.md` written once by Opus (`plan-prompt.txt`, `plan.sh`) | `/present-in-html:present-in-html Build the slide deck … from PLAN.md` (the model only builds) |

## Models

| Label | Model | Runs on |
|---|---|---|
| `opus` | `claude-opus-5-5` | Anthropic API (your Claude Code login) |
| `sonnet` | `claude-sonnet-5-5` | Anthropic API |
| `haiku` | `claude-haiku-5-5` | Anthropic API |
| `qwen-local` | `qwen3.8:27b-mlx` | this Mac, through Ollama |
| `qwen-moe` | `qwen3.6:35b-a3b` (MoE, 3B active) | this Mac, through Ollama (planned task) |
| `gemma` | `gemma4:26b-mlx` | this Mac, through Ollama (planned task) |

The local model is the strongest one installed for tool use: the newest Qwen (27.8B, dense) in native MLX on Apple
Silicon, with tool calling, thinking and a 256k context. Claude Code drives it through Ollama's Anthropic-compatible API
(`ANTHROPIC_BASE_URL=http://localhost:11434`), so it runs the same agent loop, tools and skill as the Claude models.

## Same conditions for every run

- A **new empty folder** for each model, holding only the source file, created **outside the repo** (Claude Code reads
  `CLAUDE.md` from parent folders, so a folder inside the repo would see this project's rules). The script refuses to start
  if any parent folder has a `CLAUDE.md` or `.claude`.
- **No settings files** (`--setting-sources ""`): no user or project permissions, hooks or installed plugins.
- **Only this repo's plugin** (`--plugin-dir plugins/present-in-html`), so the run tests the version in this commit.
- **No MCP servers or claude.ai connectors** (`--strict-mcp-config`, `ENABLE_CLAUDEAI_MCP_SERVERS=false`).
- No saved session, permissions bypassed (headless), each model's default effort.
- **One run at a time**, so timings do not compete for CPU, GPU or network. The local model is loaded before its clock
  starts, so load time is not counted.
- Each run's `init` event is saved in `transcript.jsonl`, and the report lists the plugins and MCP servers that were
  loaded, so the isolation can be checked.

## How the decks are scored

1. **The skill's checker** (`check.mjs`): layout, text outside the safe area, text too small, contrast, broken charts,
   missing notes, plus a screenshot of every slide.
2. **Counts** (`extract-slides.mjs`): slides, slides with notes, diagrams, animated slides, image placeholders, quiz.
3. **A blind judge**: one fixed model (`claude-opus-5-5`, change it with `JUDGE_MODEL`) grades each deck on its own, without
   being told which model made it. It reads the source, the slide text and notes, the checker output and every screenshot,
   then (`judge-prompt.txt`, `judge-schema.json`):
   - lists every **wrong claim** (with slide, quote, correction and severity) and every claim **not in the source**,
   - lists **UI issues** it sees in the screenshots (cut-off, overlapping, unreadable, wrong diagrams),
   - lists **major mistakes**,
   - scores accuracy, coverage, teaching, visual, diagrams, notes and requirements (1–5), and gives an overall score (1–10).

**Time** is wall-clock time for the whole run; **API time** is time spent waiting on the model. **Cost** is the CLI's
API list-price figure for the run, background calls included (with a subscription login it is what the same run would cost
on the API). Local runs cost $0 per token. The judge's cost is recorded in `judge.json` and is not added to the model's cost.

## Run it

Needs the Claude Code CLI (logged in), Node 18+, Playwright with Chromium (for the checker), macOS `sips`, and for the
local model, Ollama with the model pulled.

```bash
evals/model-comparison/run.sh                                   # wireless-101, all four models, then evaluate and report
TASK=stats-101 evals/model-comparison/run.sh                    # another task (a folder in tasks/)
evals/model-comparison/run.sh sonnet=claude-sonnet-5-5 qwen=ollama:qwen3.6:35b-a3b   # pick models (label=id)
TIMEOUT_MIN=120 BUDGET_USD=20 evals/model-comparison/run.sh     # per-run timeout and cloud spend cap
RUN_ID=<run-id> TASK=<task> evals/model-comparison/run.sh haiku=claude-haiku-5-5    # redo one model inside a run

TASK=stats-101-planned evals/model-comparison/plan.sh            # Opus writes tasks/<task>/PLAN.md once (PLANNER= to change)
TASK=stats-101-planned TIMEOUT_MIN=240 evals/model-comparison/run.sh qwen-moe=ollama:qwen3.6:35b-a3b gemma=ollama:gemma4:26b-mlx

evals/model-comparison/evaluate.sh evals/model-comparison/results/<run-id>   # rescore (e.g. another JUDGE_MODEL)
node evals/model-comparison/report.mjs evals/model-comparison/results/<run-id>
```

Each run writes `results/<run-id>/`:

| File | What it is |
|---|---|
| `REPORT.md` | the comparison tables and every finding per model |
| `prompt.txt`, `source.md`, `run.json` | the exact prompt and source used; versions, machine, commit |
| `PLAN.md`, `plan.json` | planned tasks only: the shared plan and its planner, time and cost |
| `index.html` | the same tables and each deck's slides side by side; links to the live decks |
| `results.json` | every number in the report |
| `<model>/output/deck.html` | the deck, plus anything else the model wrote |
| `<model>/transcript.jsonl` | the full CLI event stream (tools called, tokens, cost) |
| `<model>/check.txt`, `shots/` | checker output and outline; a screenshot of every slide |
| `<model>/slides.md`, `stats.json` | slide text and notes as the judge saw them; counts |
| `<model>/judge.json` | the judge's structured verdict and its cost |

One run per model is a sample of one: results vary between runs, so treat small differences as noise and repeat the run
before drawing firm conclusions.

## Results

See [`RESULTS.md`](RESULTS.md) for every task's latest run.

## Paper

The study is written up as a short paper, in two editions built from [`paper/paper.md`](paper/paper.md): IEEE-style two-column
([`paper/paper-ieee.html`](paper/paper-ieee.html)) and a single-column article ([`paper/article.html`](paper/article.html)).
Its figures and data come from `results/` through `paper/make-figures.mjs`. The number audit and the reference check are
in `paper/AUDIT.md` and `paper/REFERENCES-CHECK.md`. Every generated deck, ready to open, is in [`decks/`](decks/); the
`PARTIAL_*` files were assembled afterwards from the slide parts of unfinished local runs and were not judged.
