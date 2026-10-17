# Model comparison: present-in-html, STATS 101 — Module 1: Data, Samples and Describing Data

Run `20261016-063639-stats-101` · Claude Code 2.1.301 (Claude Code) · plugin 3.1.0 (commit ae03c20) · Apple M4 Max, 64 GB · Ollama 0.40.5

Same prompt (`prompt.txt`), same source file, each model in its own new empty folder outside the repo. Runs one after another.

## Time and cost

| Model | Provider | Finished | Wall time | API time | Turns | Tool calls | Skill used | Input tok | Output tok | Cache read | Cost |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **haiku** `claude-haiku-5-5` | anthropic | yes | 8m 44s | 6m 48s | 46 | 45 | yes | 54 | 90k | 2.89M | $0.32 |
| **opus** `claude-opus-5-5` | anthropic | yes | 11m 14s | 8m 51s | 32 | 31 | yes | 56 | 57k | 2.59M | $2.79 |
| **qwen-local** `qwen3.8:27b-mlx` | ollama | timed out | 120m 00s | – | – | 22 | yes | 0 | 0 | 0 | $0 (local) |
| **sonnet** `claude-sonnet-5-5` | anthropic | yes | 5m 24s | 3m 52s | 22 | 21 | yes | 34 | 30k | 973k | $0.70 |

Cost is the CLI's API list-price figure for the whole run, background calls included (on a subscription it is what the same run would cost on the API). The judge's cost is not included.

## The deck (checker and counts)

| Model | Slides | 20–30 | Checker | Issues | Notes | Diagrams | Animated slides | Placeholders | Images | Quiz | Deck KB |
|---|---|---|---|---|---|---|---|---|---|---|---|
| haiku | 29 | yes | pass | 0 | 29/29 | 7 | 10 | 2 | 0 | yes | 188 |
| opus | 30 | yes | pass | 0 | 30/30 | 11 | 20 | 2 | 0 | yes | 197 |
| qwen-local | 21 | yes | pass | 0 | 3/21 | 1 | 7 | 6 | 0 | no | 146 |
| sonnet | 29 | yes | pass | 0 | 29/29 | 7 | 14 | 2 | 0 | yes | 173 |

## Judge scores (blind, claude-opus-5-5)

| Model | Accuracy | Coverage | Teaching | Visual | Diagrams | Notes | Reqs | **Overall /10** | Wrong claims (major) | Invented | UI issues (major) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| haiku | 4 | 4 | 4 | 3 | 4 | 5 | 4 | **7** | 1 (0) | 3 | 6 (2) |
| opus | 5 | 5 | 5 | 4 | 5 | 5 | 5 | **9** | 1 (0) | 6 | 4 (0) |
| qwen-local | 1 | 1 | 1 | 2 | 1 | 1 | 1 | **1** | 5 (4) | 9 | 6 (6) |
| sonnet | 5 | 5 | 5 | 4 | 5 | 5 | 5 | **9** | 0 (0) | 4 | 6 (1) |

## Findings per model

### haiku (`claude-haiku-5-5`)

This is an accurate, well-paced deck with very good speaker notes, and it is close to ready to teach from. It has two real flaws. First, it reorders the module's sections (sampling, bias and study design come before types of variables), which goes against the explicit 'in order' requirement. Second, x̄ renders broken on the mean and SD formula slides, and those need fixing before class. Anscombe's quartet would also benefit from an actual plot. Fix the glyphs and the order, and this deck could be used tomorrow.

**Major mistakes**

- The order of the module's sections is changed, although the request says to follow them in order. The source goes 3 Population, 4 Types of variables, 5 Levels of measurement, 6 Study design, 7 Sampling, 8 Bias. The deck goes Population (6), Sampling (7–8), Bias (9), Study design (10), Types of variables (11), Levels (12–13).
- On the formula slides (17 and 21) the x̄ symbol renders broken. On slide 21 the SD formula looks like (x − x)², which could confuse first-year students on exactly the formula they need to learn.

**Wrong claims**

- slide 7 (minor): "every person has the same chance" → The source defines a simple random sample as one where every group of n individuals has the same chance of being chosen. Every person having the same chance is necessary but not sufficient: stratified and systematic samples also give each person an equal chance. Slide 8 itself uses the correct definition, so the two slides disagree.

**Not in the source**

- slide 4: "a public-domain reproduction is fine, and check the licence before using it"
- slide 13: "zero degrees is not the absence of temperature"
- slide 2: "Where do the data come from? about 15 min / What kind of data are they? about 7 min / What do the data say? about 22 min / Quiz and summary about 5 min"

**UI issues**

- slide 17 (major): The x̄ in the headline formula renders broken: the bar sits to the right of the x and next to the equals sign, so it reads like 'x ¯= Σx / n'. This is the key formula of the slide.
- slide 21 (major): The x̄ in the SD formula renders as '(x − x)̄²': the bar lands on the closing bracket and merges with the ². The legend shows 'x⁻'. Students could read it as (x − x)², which is zero.
- slide 6 (minor): The 'statistic: x̄, s' label renders with a misplaced bar. The 'used to estimate' arrow ends in empty space instead of pointing at the parameter.
- slide 15 (minor): The slide says 'four completely different pictures' but shows no pictures. There is no scatter-plot diagram or image placeholder for Anscombe's quartet, which is the slide's whole point.
- slide 24 (minor): The three-line caption sits right on top of the footer and the axis label, which feels cramped.
- slide 4 (minor): The image placeholder is a small box inside a decorative panel rather than a clear frame for the image, so the space set aside for the map is unclear.

**Strengths**

- Every number checks out against the source and recomputes correctly: mean 26, median 21, mode 15, 20.4/20 without the outlier, range 64, Q1 15, Q3 27, IQR 12, variance 341.3, s ≈ 18.5 and ≈ 6.1, fences −3 and 45, z = 2 and 1.5, and the 62–78 / 54–86 / 46–94 bands.
- The box-plot diagram is drawn to scale and correct: whiskers at 12 and 30, the 76 shown as an outlier dot, fences marked. The 68–95–99.7 bell has correctly placed brackets.
- The confounding triangle, the variable-type tree and the skew diagram are clear, correct, animated diagrams that explain better than text.
- Strong speaker notes on every slide, with timings and prompts to the room, and they add the detail the slides leave out (double-blind, variance, 97.5%).
- The checker passes cleanly. 29 slides fall within the 20–30 range. The two required image placeholders have descriptive captions. All six quiz questions are kept, with click-to-reveal answers.

Deck: [output/deck.html](haiku/output/deck.html) · screenshots: [haiku/shots/](haiku/shots/) · transcript: [haiku/transcript.jsonl](haiku/transcript.jsonl)

### opus (`claude-opus-5-5`)

This deck is close to ready to teach tomorrow. I found no factual errors that would teach students anything wrong, the diagrams are accurate and drawn to scale, and the notes support the presenter well. The only problems are cosmetic: the bias slide is missing its section label, some lines wrap awkwardly, and one diagram label slightly mixes up which ballots came from the phone and car lists.

**Wrong claims**

- slide 5 (minor): "≈ 2.4 million returned (from phone books and car lists)" → Per the source, the ~10 million mailed ballots were drawn from telephone directories and car-registration lists, and ~2.4 million came back. The label attaches the source lists to the returns, which slightly blurs the selection-bias point (the list) with the non-response point (the returns). The notes get it right.

**Not in the source**

- slide 23: "Hot weather drives both: more people buy ice cream and more people swim."
- slide 8: "but the gap between first and second need not equal the gap between second and third."
- slide 15: "Last click: the same fitted line drawn through all four. It describes the first set well and the other three badly."
- slide 22: "95% are between 54 and 86, so 5% are outside, half of that above: a score of 86 is better than about 97.5% of the class."
- slide 3: "if every person were identical we would not need statistics."
- slide 19: "Like the mean, the SD is not resistant."

**UI issues**

- slide 12 (minor): This is the only content slide without a section label (no '8 · Bias' above the title), so it breaks the numbering pattern every other section slide follows.
- slide 2 (minor): The first agenda item 'Where do the data come from?' is squeezed into a narrow column and wraps over four lines, which looks cramped next to the other rows.
- slide 30 (minor): In 'sample → statistic (x̄, s)' the 's' wraps onto a line by itself in the left column.
- slide 18 (minor): The accent underline under the title stops partway, at '27 −', so it looks clipped and arbitrary in a title that includes a formula.

**Strengths**

- Every number and worked example matches the source and is arithmetically correct: commute mean 26, median 21, mode 15, Q1 15, Q3 27, IQR 12, range 64, fences −3 and 45, s ≈ 18.5 and 6.1, z = 2 and 1.5, and the 68–95–99.7 bounds.
- The data diagrams are drawn to scale: the dot plot puts the mean and median lines at the right places, the box plot's whiskers stop at 12 and 30, the Literary Digest bars use the same scale for both polls, and the bell curve's axis is marked in steps of one SD.
- It follows all 18 module sections in order, keeps one idea per slide, and uses section-divider slides that line up with the module's three questions.
- Animated diagrams are used where they actually explain something: population and sample, the variable tree, experiment design, Anscombe's quartet, distribution shapes, the outlier pulling the mean, the IQR, the box plot, the normal curve and the confounder diagram.
- The speaker notes are excellent. They tell the presenter what to say at each click, ask the room questions, point out quiz traps, and link back to earlier ideas (the Literary Digest comes back three times).
- All six quiz questions are there with plausible wrong options and correct answers, followed by a summary slide. The deck has 30 slides, the checker passes with 0 issues, and both image placeholders are captioned.

Deck: [output/deck.html](opus/output/deck.html) · screenshots: [opus/shots/](opus/shots/) · transcript: [opus/transcript.jsonl](opus/transcript.jsonl)

### qwen-local (`qwen3.8:27b-mlx`)

This deck can't be taught from. It is the skill's sample template with a stats footer added: no module content, no quiz, no summary, no real notes, and invented business placeholders on almost every slide. The whole deck has to be rebuilt.

**Major mistakes**

- The deck is the unmodified present-in-html template. Apart from the footer it contains none of the STATS 101 Module 1 content.
- None of the 17 module sections are covered: no population/sample, variable types, sampling, bias, graphs, centre and spread, the commute worked example, z-scores, the 68–95–99.7 rule, or correlation vs causation.
- There is no quiz slide and no summary slide.
- 18 of 21 slides have no speaker notes, and the 3 that do contain template instructions.
- The deck is full of made-up business content (revenue, pricing plans, roadmap, team, sources).
- The only diagram is the template demo; there are no stats diagrams such as a box plot, normal curve or Anscombe scatter plots.
- The checker passes only on layout; its notes warning is still there.

**Wrong claims**

- slide 1 (major): "Decks that look designed" → Title should be STATS 101 Module 1: Data, Samples and Describing Data. This is template boilerplate.
- slide 2 (major): "Why this matters 5 min" → The agenda should list the module's sections (Why statistics, two stories, population/sample, variables, ... quiz) and how long each takes in a 50-minute class. It shows the template's 30-minute generic agenda instead.
- slide 10 (major): "98 %" → This number is not in the module. Use real figures from it, such as Roosevelt's 61% or the 97.5% from the z = 2 example.
- slide 12 (major): "Revenue by quarter" → A made-up revenue chart; the module has nothing like it. It should be a stats graph, such as a histogram or box plot of the commute times.
- slide 21 (minor): "Your Name you@example.com example.com/deck" → Placeholder contact details left unfilled. The request also wanted the deck to end with the quiz and summary, not a thank-you slide.

**Not in the source**

- slide 11: "4.2 M Users this quarter" (and wrong)
- slide 11: "38 % Faster than last year" (and wrong)
- slide 11: "12 Countries live" (and wrong)
- slide 12: "Q4 closes the year at its highest point." (and wrong)
- slide 13: "Price $0 $12 per seat Talk to us" (and wrong)
- slide 14: "Aug Launch Public release in six regions." (and wrong)
- slide 16: "Design is not how it looks. It is how it works ." (and wrong)
- slide 18: "Amira Khalil Product" (and wrong)
- slide 20: "Vendor quote, 14 August Installation cost for option B." (and wrong)

**UI issues**

- slide 1 (major): The title slide shows template boilerplate ('present-in-html template', 'Your Name', 'Role or team') with no course title.
- slide 7 (major): The image placeholder is a generic geometric shape. Its caption tells the author how to use the template instead of saying what picture belongs there (e.g. Snow's cholera map).
- slide 9 (major): The slide shows raw HTML instructions ('Add <img class="bleed" ...>') on screen.
- slide 17 (major): A JavaScript code slide that has nothing to do with statistics.
- slide 19 (major): The only animated diagram is the template's 'Input → Process → Result' demo, and the slide shows authoring instructions ('Author at viewBox width 1680...').
- slide 18 (major): The team slide uses fake names and initials as placeholders.

**Strengths**

- The template looks clean: nothing overflows, contrast is good, and the 21 slides fall inside the 20–30 range.
- The footer correctly reads 'STATS 101 · Module 1 — Data, Samples & Describing Data'.

Deck: [output/deck.html](qwen-local/output/deck.html) · screenshots: [qwen-local/shots/](qwen-local/shots/) · transcript: [qwen-local/transcript.jsonl](qwen-local/transcript.jsonl)

### sonnet (`claude-sonnet-5-5`)

A very accurate deck that follows the source closely, with good diagrams and notes. No wrong facts were found; the few invented details are harmless teaching asides. Fix the overlapping title on slide 2 and the misplaced x-bar on slides 8 and 29, and it is ready to teach from.

**Major mistakes**

- Slide 2: the eyebrow label overlaps the title, which is a visible layout bug on the second slide.

**Not in the source**

- slide 3: "no two students have the same commute, and no sample is a perfect copy of the whole group"
- slide 11: "nobody assigned sleep, so students who sleep more may differ in many other ways"
- slide 16: "which graph for the number of siblings each of you has? Answer: a histogram for a numerical variable."
- slide 7: "Image placeholder: a 1936 newspaper front page about the Roosevelt landslide."

**UI issues**

- slide 2 (major): The eyebrow label 'The plan' sits on top of the title 'Three questions', so the two pieces of text overlap and are hard to read.
- slide 8 (minor): The x-bar symbol renders badly in 'Statistic: x̄, s': the bar sits over the comma instead of the x.
- slide 29 (minor): Same x-bar problem in 'sample → x̄, s': the bar is misplaced.
- slide 10 (minor): The table headers mix fonts: the first column header is in a small sans-serif and the others are in serif. The same happens on slides 13 and 16.
- slide 6 (minor): The slide never says that the Digest predicted Landon would win (this is only in the notes), so the headline 'wrong winner' has no context on screen.
- slide 21 (minor): The Q1/Q3 working (lower half and upper half) appears only in the notes, not on the slide. Students see the IQR without seeing how the quartiles were found.

**Strengths**

- Every number checks out against the source: commute mean, median and mode, range, IQR, SD, the fences at −3 and 45, the z-scores, the 68–95–99.7 ranges, and the Anscombe figures.
- Follows all 18 source sections in order and ends with both quiz slides and then a summary, as requested.
- The box plot is drawn to scale: 12, 15, 21, 27, 30, the fence at 45 and the outlier at 76 all sit at the right positions. The normal-curve brackets are correctly labelled 46–94.
- Good animated diagrams: population/sample, the variable-type tree, the Anscombe sketches, the distribution shapes, the box plot, the bell curve and the confounder triangle.
- Speaker notes on every slide add the source detail, prompts to ask the room and transitions, rather than copying the slide.
- Both image placeholders have clear captions saying what picture should go there.
- The checker passes with 0 issues on 29 slides, which is within the 20–30 range.

Deck: [output/deck.html](sonnet/output/deck.html) · screenshots: [sonnet/shots/](sonnet/shots/) · transcript: [sonnet/transcript.jsonl](sonnet/transcript.jsonl)
