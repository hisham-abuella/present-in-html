# Results

Two tasks, four models, one run each, plus a third run where three local models build from a plan written by Opus. Same conditions throughout: Claude Code 2.1.301, plugin 3.1.0 (commit ae03c20),
Apple M4 Max 64 GB, Ollama 0.40.5, 120-minute limit per run (the planned run: Claude Code 2.1.302, 240 minutes), judged blind by `claude-opus-5-5`.

## STATS 101, Module 1

Run [`20261016-063639-stats-101`](results/20261016-063639-stats-101/REPORT.md) ·
[decks side by side](results/20261016-063639-stats-101/index.html). The prompt starts with `/present-in-html:present-in-html`,
so every model had the skill loaded before its first turn.

| Model | Time | Cost | Slides | Checker | Notes | Diagrams | Wrong claims (major) | UI issues (major) | **Judge /10** |
|---|---|---|---|---|---|---|---|---|---|
| Opus 5.5 | 11m 14s | $2.79 | 30 | pass | 30/30 | 11 | 1 (0) | 4 (0) | **9** |
| Sonnet 5.5 | 5m 24s | $0.70 | 29 | pass | 29/29 | 7 | 0 (0) | 6 (1) | **9** |
| Haiku 5.5 | 8m 44s | $0.32 | 29 | pass | 29/29 | 7 | 1 (0) | 6 (2) | **7** |
| qwen3.8 27B (local) | 120m, timed out | $0 | – | – | – | – | – | – | **unfinished** |

- **Sonnet:** no wrong claims; one visible bug (the eyebrow label overlaps the title on slide 2).
- **Opus:** the most animated slides (20 of 30); one minor wording slip on a diagram label.
- **Haiku:** moved sections out of the module's order, which the request forbade, and its x̄ symbol renders broken on
  the formula slides, so the SD formula reads (x − x)².
- **Qwen:** read the skill, set up the `chalk` theme and wrote slides 1–20 (in `output/parts/`, 17 of 20 with notes).
  It was writing the last part when the limit stopped it, so the judged `deck.html` is still the template (scored 1/10).

## STATS 101, Module 1, built from an Opus plan (local models)

Run [`20261016-214018-stats-101-planned`](results/20261016-214018-stats-101-planned/REPORT.md) ·
[decks side by side](results/20261016-214018-stats-101-planned/index.html). Opus wrote one detailed
[`PLAN.md`](tasks/stats-101-planned/PLAN.md) once (23m 20s, $5.05, 94 KB): every slide's exact text and notes, 10
ready-to-paste SVGs, and the build commands. Each local model got that plan and only had to build from it
(240-minute limit, Claude Code 2.1.302). Two paths in the plan were fixed by hand before the run (the planner's own temp
folder and the deck's file name); `plan-prompt.txt` now asks for both.

| Model | Time | Cost | Slides | Checker | Notes | Diagrams | Wrong claims (major) | UI issues (major) | **Judge /10** |
|---|---|---|---|---|---|---|---|---|---|
| qwen3.6 35B-A3B (local, MoE) | 20m 07s | $0 (+ $5.05 plan) | 30 | pass | 30/30 | 10 | 0 (0) | 5 (0) | **9** |
| gemma4 26B (local) | 72m 34s, stopped early | $0 | 10 of 30 | – | – | – | – | – | **unfinished** |
| qwen3.8 27B (local) | 61m 03s, API error | $0 | 10 of 30 | – | – | – | – | – | **unfinished** |

- **qwen3.6 35B-A3B finished the whole deck in 20 minutes, and the judge scored it 9/10**, level with the cloud Opus
  and Sonnet decks: no wrong claims, every number right, all sections in order. Its one major finding is in the speaker
  notes of the quiz slides, which say "then to reveal" without saying how. The plan plus the fast MoE model make a
  free local build practical.
- **gemma4 26B** wrote part 1 (slides 1–10, all with notes) but rewrote the same file 8 times (4 more Write calls failed for lack of a file path), then ended its turn with
  "I will now proceed to build Part 2", which in a one-shot run ends the run. It never assembled `deck.html`.
- **qwen3.8 27B** read the plan carefully, wrote part 1 (10 slides with notes) and was writing part 2 when the
  stream from Ollama stopped ("API Error: The response stopped arriving") after 61 minutes. The dense 27B model is still
  too slow for a 30-slide deck even with the plan.
- **The plan is what made the difference.** Without it, qwen3.8 27B spent about 80 minutes reading the skill and
  ran out of time; with it, the MoE model needed no reference files at all.

## Wireless 101, Module 1

Run [`20261016-000644`](results/20261016-000644/REPORT.md) · [decks side by side](results/20261016-000644/index.html).
The prompt says "use the present-in-html skill"; every model called it itself.

| Model | Time | Cost | Slides | Checker | Notes | Diagrams | Wrong claims (major) | UI issues (major) | **Judge /10** |
|---|---|---|---|---|---|---|---|---|---|
| Opus 5.5 | 11m 44s | $2.88 | 30 | pass | 30/30 | 13 | 2 (0) | 4 (0) | **9** |
| Sonnet 5.5 | 5m 27s | $0.90 | 30 | pass | 30/30 | 10 | 0 (0) | 7 (0) | **9** |
| Haiku 5.5 | 7m 05s | $0.24 | 29 | pass | 29/29 | 4 | 5 (1) | 7 (1) | **7** |
| qwen3.8 27B (local) | 120m, timed out | $0 | – | – | – | – | – | – | **unfinished** |

- **Opus:** its diagrams were checked as correct (constellations, waveforms that encode the bits, a valid reuse grid).
- **Sonnet:** no wrong claims; small layout faults only.
- **Haiku:** all numbers right, but it left a stray `Fence:` label on a slide and overlapping timeline text.
- **Qwen:** wrote `PLAN.md` but no slides before the limit.

Costs are the CLI's API list-price figures; judging cost a further $0.61–$0.74 per finished deck.

## Across both tasks

- **Sonnet 5.5 is the best value.** It matched Opus (9/10, no wrong claims) both times, in half the time
  (about 5.5 minutes) for a quarter to a third of the cost.
- **Opus 5.5 makes the richest decks:** the most diagrams and builds, all checked as correct, at about $2.80 a deck.
- **Haiku 5.5 is a usable first draft** at about $0.30, but in each task it made one mistake a lecturer would have to
  catch before teaching (a stray label; sections out of order and a broken formula symbol).
- **The local model is too slow for this task, not unable to do it.** On the M4 Max, qwen3.8 27B spent about 80 minutes
  reading the skill and setting up, then wrote about 10 slides every 20 minutes. A full deck would take roughly 2.5–3 hours
  (`TIMEOUT_MIN=200`).
- **A local model can match the cloud when Opus plans for it.** Given Opus's full plan ($5.05, once), `qwen3.6:35b-a3b`
  built a 9/10 deck in 20 minutes for $0. The plan costs about as much as two Opus decks, so it pays off when the
  same plan is built more than once, or built locally for privacy.

## What it shows about the skill

- **The checker passes an unfinished deck.** Both Qwen decks still held the template's sample slides (`Your Name`,
  `you@example.com`, a revenue chart) and passed with 0 issues. A check for leftover template content would catch this.
- **"Fence" leaks from the plan into decks.** It is a `PLAN.md` heading. Haiku put `Fence:` on a slide and Sonnet put it
  twice in the notes (Wireless). The skill should say it stays in the plan.
- **The judge catches what the checker cannot:** overlapping labels inside diagrams, a ray that misses the receiver, a broken
  formula symbol, sections out of order.

One run per model per task; repeat before trusting small differences. Both runs used the same judge rubric in substance;
the Wireless run was judged with the audience and requirements written into the rubric, the STATS run with them read
from the prompt.
