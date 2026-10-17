# Model comparison: present-in-html, STATS 101 — Module 1: Data, Samples and Describing Data

Run `20261016-214018-stats-101-planned` · Claude Code 2.1.302 (Claude Code) · plugin 3.1.0 (commit ae03c20) · Apple M4 Max, 64 GB · Ollama 0.40.5

Same prompt (`prompt.txt`), same source file, each model in its own new empty folder outside the repo. Runs one after another.

## Time and cost

| Model | Provider | Finished | Wall time | API time | Turns | Tool calls | Skill used | Input tok | Output tok | Cache read | Cost |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **gemma** `gemma4:26b-mlx` | ollama | yes | 72m 34s | 72m 33s | 18 | 17 | yes | 109k | 54k | 1.43M | $0 (local) |
| **qwen-local** `qwen3.8:27b-mlx` | ollama | no | 61m 03s | 61m 01s | 13 | 9 | yes | 523k | 11k | 139k | $0 (local) |
| **qwen-moe** `qwen3.6:35b-a3b` | ollama | yes | 20m 07s | 19m 37s | 31 | 30 | yes | 103k | 70k | 2.99M | $0 (local) |

Cost is the CLI's API list-price figure for the whole run, background calls included (on a subscription it is what the same run would cost on the API). The judge's cost is not included.

**Shared plan:** every model built from the same [PLAN.md](PLAN.md) (94 KB), written once by `claude-opus-5-5` in 23m 20s for $5.05. That time and cost are not in the table above.

## The deck (checker and counts)

| Model | Slides | 20–30 | Checker | Issues | Notes | Diagrams | Animated slides | Placeholders | Images | Quiz | Deck KB |
|---|---|---|---|---|---|---|---|---|---|---|---|
| gemma | – | – | – | – | – | – | – | – | – | – | – |
| qwen-local | – | – | – | – | – | – | – | – | – | – | – |
| qwen-moe | 30 | yes | pass | 0 | 30/30 | 10 | 20 | 2 | 0 | yes | 201 |

## Judge scores (blind, claude-opus-5-5)

| Model | Accuracy | Coverage | Teaching | Visual | Diagrams | Notes | Reqs | **Overall /10** | Wrong claims (major) | Invented | UI issues (major) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| gemma | – | – | – | – | – | – | – | – | – | – | – |
| qwen-local | – | – | – | – | – | – | – | – | – | – | – |
| qwen-moe | 5 | 5 | 5 | 4 | 4 | 4 | 5 | **9** | 0 (0) | 4 | 5 (0) |

## Findings per model

### gemma (`gemma4:26b-mlx`)

_Not judged (no deck or the judge failed)._

### qwen-local (`qwen3.8:27b-mlx`)

_Not judged (no deck or the judge failed)._

### qwen-moe (`qwen3.6:35b-a3b`)

This is an accurate, well-structured and nicely illustrated deck that could be taught from tomorrow. No factual errors were found, and the few points not in the source are harmless teaching remarks. Remaining issues are small: the reveal instruction in the quiz notes is missing its key, the systematic-sampling panel has a rendering glitch, and the image placeholders are weakly presented.

**Major mistakes**

- Speaker notes on every quiz slide (24 to 29) say "then to reveal" without the key or action, e.g. "Give the room about twenty seconds, then to reveal." The presenter isn't told how to reveal the answer.

**Not in the source**

- slide 25: "Gym-goers exercise more than the population, so the survey overstates how much people exercise. And asking more people at the gym would not help."
- slide 22: "the 95% in the middle, plus half of the 5% left over, the lower tail."
- slide 2: "If every student had exactly the same commute, we would not need it."
- slide 11: "think of them as the four years of study"

**UI issues**

- slide 11 (minor): In the Systematic panel the third row is missing its hollow circles; only the one filled dot is drawn, so the panel doesn't match the caption "the same 20 people in 4 groups".
- slide 2 (minor): The image placeholder is a decorative arc panel with no frame or caption. The caption text sits squeezed directly under the bullets in a small monospace font, so it reads like slide text.
- slide 4 (minor): Same as slide 2: the left panel is decorative, and the placeholder caption is placed in the text column instead of on the image area.
- slide 22 (minor): The 99.7% bracket sits very close to the caption at the bottom, so the lower part of the slide is cramped. The title also breaks awkwardly between "1" and "SD".
- slide 10 (minor): The slide has no section kicker label, unlike the other content slides, even though the notes say "Back to the first question".

**Strengths**

- All the numbers match the source: commute mean, median and mode; range, IQR and SD; the outlier cut-offs; z-scores; 68–95–99.7 intervals; Literary Digest and Gallup figures; Anscombe statistics.
- Follows the module's sections in order across 30 slides, with all 6 quiz questions and a summary.
- Strong diagrams that explain better than text: Digest vs Gallup bars to scale, population/sample loop, variable tree, sampling-method dot panels, Anscombe quartet, dot plot of mean vs median, box plot with cut-offs, bell curve with brackets, confounder diagram.
- Quiz distractors are well chosen (e.g. 12 for forgetting to divide by the SD), and the notes explain each answer.
- Speaker notes are full and conversational, with prompts to ask the room, and they add explanation rather than repeating the slide.
- The checker passes with 0 issues, and the visual style is clean and consistent.

Deck: [output/deck.html](qwen-moe/output/deck.html) · screenshots: [qwen-moe/shots/](qwen-moe/shots/) · transcript: [qwen-moe/transcript.jsonl](qwen-moe/transcript.jsonl)
