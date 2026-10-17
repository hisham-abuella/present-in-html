# STATS 101 · Module 1: Data, samples and describing data

- **Audience**: first-year undergraduates in STATS 101 with no statistics background; they know high-school algebra.
- **Occasion and time**: Module 1 lecture, 50-minute slot. The slides run about 44.5 minutes, which leaves about 5 minutes inside the slot for questions and settling in.
- **Goal**: students can tell a population from a sample and a parameter from a statistic, classify variables and their level of measurement, judge how data were collected and spot bias, pick a graph, compute and read mean, median, mode, range, IQR and SD, find outliers with the 1.5 × IQR rule, use z-scores and the 68–95–99.7 rule, and explain why correlation is not causation (the seven learning objectives of the module).
- **Promise**: By the end you will be able to say where data come from, what kind they are, and what they say (slide 1 subtitle, then slide 3).
- **Story**: How data are collected matters more than how much there is, and the data must be plotted before they are summarised.
- **Fence**: this is not "more data and more numbers are better": a huge biased sample (Literary Digest, slides 6 and 12) or a summary number without a plot (Anscombe's quartet, slide 14) misleads.
- **Look**: `data-theme="chalk"`, `data-fonts="literata"`, `lang="en"`, no `dir`. Chalk is the library look for university lecturers (a slate board with three chalk colours), and its recipe has the formula and quiz slides this lecture needs. A 50-minute presenter countdown (`data-duration="50"`).
- **Sources**:
  - `stats-101-module-1.md` (in this folder); the § numbers below are its section numbers.
  - Slide 14 only: the dot positions are Anscombe's published 1973 data values (drawn, not printed on the slide); every number printed on the slide is from §9.
- **Placeholders**: two images to add later (slide 2 `images/everyday-statistics.jpg`, slide 4 `images/snow-map-1854.jpg`). Until they exist, the theme draws placeholder art and the visible caption says what goes there. No facts are missing.

Module sections in order: §1 slides 2–3 · §2 slides 4–6 · §3 slide 7 · §4 slide 8 · §5 slide 9 · §6 slide 10 · §7 slide 11 · §8 slide 12 · §9 slides 13–14 · §10 slide 15 · §11 slides 16–17 · §12 slides 18–19 · §13 slide 20 · §14 slide 21 · §15 slide 22 · §16 slide 23 · §18 quiz slides 24–29 · §17 summary slide 30 (the quiz comes before the summary, as asked).

| # | data-id | layout | claim (the slide's h2) | content and facts (with source) | role | min |
|---|---|---|---|---|---|---|
| 1 | start | title | Data, samples and describing data | Module title; class 50 min; promise from learning objectives and the three questions (§1) | promise | 0.5 |
| 2 | why | image-right | Statistics draws conclusions from data that vary | Definition; descriptive vs inferential; everyday examples in notes (§1); image placeholder: An opinion poll, a weather forecast and a clinical trial | signpost | 1.5 |
| 3 | questions | process | Three questions run through today's lecture | The three questions that structure the module (§1) | promise, signpost | 1 |
| 4 | snow | image-left | A map of deaths pointed to one water pump | John Snow, Soho, 1854; deaths clustered around Broad Street pump; handle removed (§2); image placeholder: John Snow's 1854 street map of Soho with each cholera death marked, clustered around the Broad Street pump | story | 2 |
| 5 | digest | diagram | 2.4 million replies lost to 50,000 well-chosen people | Animated diagram. Literary Digest 1936: about 10 million mailed, about 2.4 million returned, predicted Landon; Gallup about 50,000, predicted Roosevelt; Roosevelt about 61% and 46 of 48 states (§2) | story, evidence | 2 |
| 6 | lesson | statement | A huge biased sample is worse than a small, well-chosen one | Takeaway of §2: how data are collected matters more than how much | thesis, fence | 1 |
| 7 | population | diagram | We measure a sample to learn about a population | Animated diagram. Population, sample, parameter (μ, σ), statistic (x̄, s); 200 students example; memory aid (§3) | evidence | 1.5 |
| 8 | variables | diagram | Every variable is categorical or numerical | Animated diagram. Nominal, ordinal, discrete, continuous with examples; postcode and student ID are categorical (§4) | evidence | 2 |
| 9 | levels | comparison | 20 kg is twice 10 kg, but 20 °C is not twice as hot as 10 °C | Levels of measurement table: order, equal intervals, true zero, examples (§5) | evidence, question | 1.5 |
| 10 | studies | two-column | Only a randomised experiment can show cause and effect | Observational study vs experiment; control group, random assignment, placebo, double-blind (§6) | evidence | 2 |
| 11 | sampling | diagram | Random methods give everyone a fair chance; convenience does not | Animated diagram. Five sampling methods with how they work and examples (§7) | evidence | 2 |
| 12 | bias | bullets | A bigger sample does not fix bias | Selection, non-response, response, voluntary response bias; bigger sample does not fix bias (§8) | thesis, fence | 2 |
| 13 | graphs | comparison | The type of data picks the graph | Graph table: bar/pie, histogram, box plot, scatter plot, line graph (§9) | evidence | 1.5 |
| 14 | anscombe | diagram | Always plot the data before computing anything | Animated diagram. Anscombe's quartet (1973): 11 points each, mean x 9, mean y about 7.50, r about 0.816, line y = 3 + 0.5x; the four shapes (§9). Dot positions: Anscombe's published values, not printed | thesis, evidence | 1.5 |
| 15 | shape | diagram | Describe a distribution by its shape, centre and spread | Animated diagram. Shape: symmetric, skewed right (incomes), skewed left, unimodal or bimodal; centre, spread, unusual features (§10) | evidence | 1.5 |
| 16 | mean | formula | The mean shares out the total; the median is the middle | Mean x̄ = Σx / n, median, mode; commute times 12 ... 76: sum 260, n 10, mean 26, median 21, mode 15 (§11) | evidence | 1.5 |
| 17 | resistant | diagram | One long commute pulls the mean, but barely moves the median | Animated diagram. Mean 26, median 21, mode 15; without 76 mean about 20.4, median 20; median resistant; right skew mean above median; median for skewed data (§11) | evidence, question | 2 |
| 18 | spread | stats | The range is 64 minutes, but the middle half spans only 12 | Range 76 − 12 = 64; Q1 15, Q3 27, IQR 12; SD about 18.5 (§12) | evidence | 2 |
| 19 | sd | formula | One outlier triples the standard deviation | s = √(Σ(x − x̄)² / (n − 1)); variance about 341.3, s about 18.5; without 76 s about 6.1; why n − 1 (§12) | evidence | 2 |
| 20 | boxplot | diagram | The 76-minute commute lies beyond the cut-off: it is an outlier | Animated diagram. Five-number summary 12, 15, 21, 27, 76; 1.5 × IQR = 18; cut-offs (the module's fences) −3 and 45; whiskers 12 and 30; 76 outlier (§13) | evidence | 2 |
| 21 | zscore | formula | A z-score counts standard deviations from the mean | z = (x − mean) / SD; exam mean 70, SD 8, score 86 gives z = 2; compare across scales (§14) | evidence | 1.5 |
| 22 | rule | diagram | In a bell curve, 68% lie within 1 SD, 95% within 2, 99.7% within 3 | Animated diagram. 68–95–99.7 rule; exam mean 70, SD 8: 62–78, 54–86, 46–94; 86 better than about 97.5%; only for bell-shaped data (§15) | evidence | 2 |
| 23 | correlation | diagram | Ice-cream sales and drownings rise together, but hot weather drives both | Animated diagram. Association; ice cream and drownings; hot weather as confounder; reverse causation, coincidence; randomised experiment (§16) | evidence, question | 2 |
| 24 | quiz-1 | quiz | Is "favourite colour" categorical or numerical, and at what level? | Variable types and levels (§4, §5, §18 Q1); answer revealed on click | question | 0.75 |
| 25 | quiz-2 | quiz | A survey on exercise only asks people leaving a gym. What is the problem? | Bias and sampling (§7, §8, §18 Q2); answer revealed on click | question | 0.75 |
| 26 | quiz-3 | quiz | Find the mean and median of 2, 4, 4, 5, 10. | Mean and median (§11, §18 Q3); answer revealed on click | question | 0.75 |
| 27 | quiz-4 | quiz | Which is resistant to outliers: the mean or the median? | Resistance (§11, §18 Q4); answer revealed on click | question | 0.75 |
| 28 | quiz-5 | quiz | An exam has mean 70 and SD 8. What is the z-score of 82? | z-scores (§14, §18 Q5); answer revealed on click | question | 0.75 |
| 29 | quiz-6 | quiz | Ice-cream sales and drownings are correlated. Does ice cream cause drowning? | Correlation and confounding (§16, §18 Q6); answer revealed on click | question | 0.75 |
| 30 | summary | two-column | You can now turn data into conclusions, despite variation | Summary points 1–9 (§17); next module: probability (§17) | thesis, contribution | 1.5 |

**Total**: 30 slides, about 44.5 minutes of a 50-minute slot (89%), so about 5 minutes stay free for questions.
**Restatements of the story**: slide 6 (a statement: the lesson of 1936), slide 12 (a rule: a bigger sample does not fix bias), slide 30 (the summary: what you can now do), with slide 14 restating the plot-first half (Anscombe's quartet).
**Signposts**: slide 3 names the three questions; the small label on slides 7–23 (all but slides 12 and 13) names the question in play. **Questions to the room**: slides 2, 5, 9, 17, 23, and the six quiz slides.

## Slides in full

How to read this section (these instructions are for the builder; none of it goes on a slide):

- Each slide names its **markup** (A to L, in Build steps, step 9) and the **part file** it goes in.
- **On-slide text** lists every `{{slot}}` of that markup with its exact text between backticks. Copy the text between the backticks exactly, including any `<em>`, `<strong>`, `&nbsp;` or `<i ...>` tags inside it. Do not add, drop or reword anything.
- **Paste** blocks (SVG, table, formula, terms) go into the markup unchanged, exactly where the markup says.
- **Speaker notes**: every line of the `text` block becomes one `<p>...</p>` inside `<aside class="notes">`, in the same order. `[click]` marks where the presenter clicks for the next build; keep it.
- **Draws** (diagram slides) says what the diagram shows, click by click; it is a description for checking the screenshots, not text to copy.

### Slide 1: start

Markup **A** (title) · `data-id="start"` · part file `parts/01-opening.html` · 0.5 min

**On-slide text**:

- `{{label}}`: `STATS 101 · Module 1`
- `{{h1}}`: `Data, samples and <em>describing data</em>`
- `{{sub}}`: `By the end of today you can say where data come from, what kind they are, and what they say.`

**Speaker notes**:

```text
Welcome to STATS 101. Today is Module 1: data, samples and describing data. You need nothing beyond high-school algebra.
Here is what you get from the next fifty minutes. By the end you will be able to look at any set of numbers and ask three questions: where did these data come from, what kind of data are they, and what do they actually say?
We finish with a short quiz so you can check yourself, and a one-slide summary to take away.
```

### Slide 2: why

Markup **B** (image-right) · `data-id="why"` · part file `parts/01-opening.html` · 1.5 min

**Image to add later**: `images/everyday-statistics.jpg`, showing an opinion poll, a weather forecast and a clinical trial. Until it exists, leave `<figure></figure>` empty (see step 8).

**On-slide text**:

- `{{label}}`: `Why statistics?`
- `{{h2}}`: `Statistics draws conclusions from data that vary`
- `{{item 1 lead}}`: `Descriptive statistics`
- `{{item 1 text}}`: `summarise the data we have: tables, graphs, averages. Most of today.`
- `{{item 2 lead}}`: `Inferential statistics`
- `{{item 2 text}}`: `use a sample to draw conclusions about a larger population, with a measure of uncertainty. Later modules.`
- `{{caption}}`: `Image: everyday statistics: an opinion poll, a weather forecast, a clinical trial`

**Speaker notes**:

```text
So what is statistics? It is the science of collecting, describing and drawing conclusions from data in the presence of variation and uncertainty. If every student had exactly the same commute, we would not need it.
[click] There are two branches. Descriptive statistics summarise the data we have: tables, graphs, averages. That is most of today.
[click] Inferential statistics go a step further: they use a sample to draw conclusions about a larger population, and they come with a measure of uncertainty. That comes in later modules.
You meet statistics every day: opinion polls, clinical trials of new medicines, sports analytics, weather forecasts, and the A/B tests that websites run on you. Ask the room: which of these did you come across this week?
```

### Slide 3: questions

Markup **D** (process) · `data-id="questions"` · part file `parts/01-opening.html` · 1 min

**On-slide text**:

- `{{label}}`: `Today`
- `{{h2}}`: `Three questions run through today's lecture`
- `{{step 1 h3}}`: `Where do the data come from?`
- `{{step 1 p}}`: `Populations, samples and study design`
- `{{step 2 h3}}`: `What kind of data are they?`
- `{{step 2 p}}`: `Types of variables`
- `{{step 3 h3}}`: `What do the data say?`
- `{{step 3 p}}`: `Graphs, centre, spread and shape`

**Speaker notes**:

```text
Three questions will run through the whole lecture.
[click] First: where do the data come from? That covers populations and samples, and how a study was designed.
[click] Second: what kind of data are they? Different types of variables need different tools.
[click] Third: what do the data say? Graphs, and numbers for centre, spread and shape.
Watch the small label at the top of each slide: it tells you which of the three questions we are on.
```

### Slide 4: snow

Markup **C** (image-left) · `data-id="snow"` · part file `parts/01-opening.html` · 2 min

**Image to add later**: `images/snow-map-1854.jpg`, showing john Snow's 1854 street map of Soho with each cholera death marked, clustered around the Broad Street pump. Until it exists, leave `<figure></figure>` empty (see step 8).

**On-slide text**:

- `{{label}}`: `London, 1854`
- `{{h2}}`: `A map of deaths pointed to one water pump`
- `{{paragraph 1}}`: `During a cholera outbreak in Soho, John Snow marked each death on a street map.`
- `{{paragraph 2}}`: `The deaths clustered around one pump on Broad Street. The pump's handle was removed.`
- `{{caption}}`: `Image: John Snow's 1854 map of cholera deaths around the Broad Street pump`

**Speaker notes**:

```text
Let us start with two examples from history. London, 1854. There is a cholera outbreak in Soho.
John Snow takes a street map and marks each death on it. Look at the map: the deaths cluster around one water pump on Broad Street. The pump's handle was removed.
Nobody needed a formula here. A simple picture of data pointed to the cause. Keep that in mind: later today we will make a rule of it, always plot the data first.
```

### Slide 5: digest

Markup **F** (diagram) · `data-id="digest"` · part file `parts/01-opening.html` · 2 min

**Draws**: Three horizontal bars to scale (10 million = 820 px). Click 1: 'Digest mailed / phone books, car lists', an outline bar 820 px long, 'about 10 million'. Click 2: 'Digest replies / predicted Landon', bar 197 px, 'about 2.4 million: wrong'. Click 3: 'Gallup's sample / predicted Roosevelt', a 6 px accent sliver, 'about 50,000: right'.

**On-slide text**:

- `{{label}}`: `United States, 1936`
- `{{h2}}`: `2.4 million replies lost to 50,000 well-chosen people`
- `{{caption}}`: `Bars to scale. Roosevelt won about 61% of the popular vote and 46 of the 48 states.`

**Paste into `{{svg}}`**:

```html
<svg viewBox="0 0 1680 420" role="img" aria-label="Bar lengths to scale: about 10 million ballots mailed, about 2.4 million replies, about 50,000 in Gallup's sample">
      <g data-build="fade" data-order="1">
        <text class="dg-t" x="0" y="58">Digest mailed</text><text class="dg-s" x="0" y="96">phone books, car lists</text>
        <text class="dg-t" x="1284.0" y="72">about 10 million</text>
      </g>
      <g data-build="draw" data-order="1"><rect class="dg-box" x="440" y="20" width="820" height="80" rx="4"/></g>
      <g data-build="fade" data-order="2">
        <text class="dg-t" x="0" y="208">Digest replies</text><text class="dg-s" x="0" y="246">predicted Landon</text>
        <text class="dg-t" x="660.8" y="222">about 2.4 million: wrong</text>
      </g>
      <g data-build="draw" data-order="2"><rect class="dg-box" x="440" y="170" width="196.8" height="80" rx="4"/></g>
      <g data-build="fade" data-order="3">
        <text class="dg-t" x="0" y="358">Gallup's sample</text><text class="dg-s" x="0" y="396">predicted Roosevelt</text>
        <text class="dg-b" x="470" y="372">about 50,000: right</text>
      </g>
      <g data-build="draw" data-order="3"><rect class="dg-hot" x="440" y="320" width="6" height="80" rx="4"/></g>
    </svg>
```

**Speaker notes**:

```text
Second example: the United States, 1936. The Literary Digest magazine ran a huge poll on the presidential election.
[click] It mailed about 10 million ballots, drawn largely from telephone directories and car-registration lists.
[click] About 2.4 million came back, and the poll predicted that Alf Landon would beat Franklin D. Roosevelt.
[click] George Gallup used a much smaller but better-chosen sample, about 50,000 people, and correctly predicted a Roosevelt win. The bars are to scale: Gallup's sample is a sliver next to the Digest's replies.
Roosevelt won with about 61% of the popular vote and 46 of the 48 states. Ask the room: in 1936, who was missing from lists of telephone and car owners?
```

### Slide 6: lesson

Markup **E** (statement) · `data-id="lesson"` · part file `parts/01-opening.html` · 1 min

**On-slide text**:

- `{{label}}`: `The lesson of 1936`
- `{{h2}}`: `A huge biased sample is worse than a <em>small, well-chosen</em> one.`

**Speaker notes**:

```text
Here is the lesson, and it is the big idea of this whole module: a huge biased sample is worse than a small, well-chosen one.
How data are collected matters more than how much data there is. More data does not rescue a bad method; it only gives you a confidently wrong answer. We will meet this again when we talk about bias.
```

### Slide 7: population

Markup **F** (diagram) · `data-id="population"` · part file `parts/01-opening.html` · 1.5 min

**Draws**: Click 1: a large ellipse 'Population / all students at the university / Parameter: μ, σ / usually unknown'. Click 2: a circle 'Sample / 200 students who answered a survey / Statistic: x̄, s' and an arrow from population to sample labelled 'we collect data from part of it'. Click 3: an accent arrow back, labelled 'the statistic estimates the parameter'.

**On-slide text**:

- `{{label}}`: `Where do the data come from?`
- `{{h2}}`: `We measure a sample to learn about a population`
- `{{caption}}`: `Memory aid: Population goes with Parameter; Sample goes with Statistic.`

**Paste into `{{svg}}`**:

```html
<svg viewBox="0 0 1680 520" role="img" aria-label="A large population with parameters mu and sigma; a small sample with statistics x-bar and s; the statistic estimates the parameter">
      <g data-build="fade" data-order="1">
        <ellipse class="dg-box" cx="380" cy="260" rx="370" ry="230"/>
        <text class="dg-t" x="380" y="180" text-anchor="middle">Population</text>
        <text class="dg-s" x="380" y="228" text-anchor="middle">all students at the university</text>
        <text class="dg-b" x="380" y="310" text-anchor="middle">Parameter: μ, σ</text>
        <text class="dg-s" x="380" y="354" text-anchor="middle">usually unknown</text>
      </g>
      <g data-build="fade" data-order="2">
        <circle class="dg-box" cx="1430" cy="260" r="210"/>
        <text class="dg-t" x="1430" y="180" text-anchor="middle">Sample</text>
        <text class="dg-s" x="1430" y="228" text-anchor="middle">200 students who</text>
        <text class="dg-s" x="1430" y="264" text-anchor="middle">answered a survey</text>
        <text class="dg-b" x="1430" y="330" text-anchor="middle">Statistic: x̄, s</text>
        <text class="dg-s" x="985" y="92" text-anchor="middle">we collect data from part of it</text>
      </g>
      <g data-build="draw" data-order="2"><path class="dg-line" d="M760 180Q985 100 1205 180M1185 164L1205 180L1182 190"/></g>
      <g data-build="draw" data-order="3"><path class="dg-line hot" d="M1205 340Q985 420 760 340M780 356L760 340L783 330"/></g>
      <g data-build="fade" data-order="3"><text class="dg-b" x="985" y="470" text-anchor="middle">the statistic estimates the parameter</text></g>
    </svg>
```

**Speaker notes**:

```text
Now some vocabulary, and the first of our three questions: where do the data come from?
[click] The population is the entire group we want to know about, for example all students at the university. A number describing the population is a parameter: the population mean, written mu, and the population standard deviation, written sigma. We usually do not know them.
[click] The sample is the part of the population we actually collect data from, say 200 students who answered a survey. A number computed from the sample is a statistic: the sample mean, x-bar, and the sample standard deviation, s.
[click] We use the statistic to estimate the parameter. Memory aid: Population goes with Parameter, Sample goes with Statistic. P with P, S with S.
```

### Slide 8: variables

Markup **F** (diagram) · `data-id="variables"` · part file `parts/01-opening.html` · 2 min

**Draws**: Static: an accent box 'Variable' joined to 'Categorical' and 'Numerical'. Click 1: leaves 'Nominal / no order' (blood type, favourite colour, country) and 'Ordinal / natural order' (satisfaction, year of study). Click 2: 'Discrete / counts' (number of siblings, goals scored) and 'Continuous / measurements' (height, time, temperature).

**On-slide text**:

- `{{label}}`: `What kind of data are they?`
- `{{h2}}`: `Every variable is categorical or numerical`
- `{{caption}}`: `Watch out: a postcode or a student ID is categorical; averaging them means nothing.`

**Paste into `{{svg}}`**:

```html
<svg viewBox="0 0 1680 570" role="img" aria-label="Variables split into categorical (nominal, ordinal) and numerical (discrete, continuous)">
      <g>
        <rect class="dg-hot" x="690" y="0" width="300" height="90" rx="6"/><text class="dg-b" x="840" y="58" text-anchor="middle">Variable</text>
        <rect class="dg-box" x="226" y="170" width="360" height="90" rx="6"/><text class="dg-t" x="406" y="228" text-anchor="middle">Categorical</text>
        <rect class="dg-box" x="1093" y="170" width="360" height="90" rx="6"/><text class="dg-t" x="1273" y="228" text-anchor="middle">Numerical</text>
        <path class="dg-line" d="M840 90L406 170M840 90L1273 170"/>
      </g>
      <g data-build="draw" data-order="1"><path class="dg-line" d="M406 260L190 340M406 260L623 340"/></g>
      <g data-build="fade" data-order="1">
        <rect class="dg-box" x="0" y="340" width="380" height="130" rx="6"/>
        <text class="dg-t" x="190" y="395" text-anchor="middle">Nominal</text><text class="dg-s" x="190" y="440" text-anchor="middle">no order</text>
        <text class="dg-s" x="190" y="520" text-anchor="middle">blood type, favourite</text><text class="dg-s" x="190" y="556" text-anchor="middle">colour, country</text>
        <rect class="dg-box" x="433" y="340" width="380" height="130" rx="6"/>
        <text class="dg-t" x="623" y="395" text-anchor="middle">Ordinal</text><text class="dg-s" x="623" y="440" text-anchor="middle">natural order</text>
        <text class="dg-s" x="623" y="520" text-anchor="middle">satisfaction,</text><text class="dg-s" x="623" y="556" text-anchor="middle">year of study</text>
      </g>
      <g data-build="draw" data-order="2"><path class="dg-line" d="M1273 260L1056 340M1273 260L1490 340"/></g>
      <g data-build="fade" data-order="2">
        <rect class="dg-box" x="866" y="340" width="380" height="130" rx="6"/>
        <text class="dg-t" x="1056" y="395" text-anchor="middle">Discrete</text><text class="dg-s" x="1056" y="440" text-anchor="middle">counts</text>
        <text class="dg-s" x="1056" y="520" text-anchor="middle">number of siblings,</text><text class="dg-s" x="1056" y="556" text-anchor="middle">goals scored</text>
        <rect class="dg-box" x="1300" y="340" width="380" height="130" rx="6"/>
        <text class="dg-t" x="1490" y="395" text-anchor="middle">Continuous</text><text class="dg-s" x="1490" y="440" text-anchor="middle">measurements</text>
        <text class="dg-s" x="1490" y="520" text-anchor="middle">height, time,</text><text class="dg-s" x="1490" y="556" text-anchor="middle">temperature</text>
      </g>
    </svg>
```

**Speaker notes**:

```text
Second question: what kind of data are they? Every variable is either categorical or numerical.
[click] Categorical variables put individuals into categories. Nominal means the categories have no order: blood type, favourite colour, country. Ordinal means they have a natural order: satisfaction rated low, medium or high, or year of study.
[click] Numerical variables are numbers. Discrete ones are counts, whole numbers, like number of siblings or goals scored. Continuous ones are measurements on a scale: height, time, temperature.
Watch out: numbers are not always numerical data. A postcode or a student ID is categorical. Averaging student IDs means nothing.
```

### Slide 9: levels

Markup **G** (comparison) · `data-id="levels"` · part file `parts/01-opening.html` · 1.5 min

**On-slide text**:

- `{{label}}`: `What kind of data are they?`
- `{{h2}}`: `20&nbsp;kg is twice 10&nbsp;kg, but 20&nbsp;°C is not twice as hot as 10&nbsp;°C`

**Paste into `{{table}}`**:

```html
<table>
    <thead><tr><th></th><th>Nominal</th><th>Ordinal</th><th>Interval</th><th class="rec" data-tag="True zero">Ratio</th></tr></thead>
    <tbody>
      <tr><th>Order?</th><td>no</td><td>yes</td><td>yes</td><td>yes</td></tr>
      <tr><th>Equal intervals?</th><td>no</td><td>no</td><td>yes</td><td>yes</td></tr>
      <tr><th>True zero?</th><td>no</td><td>no</td><td>no</td><td>yes</td></tr>
      <tr><th>Example</th><td>eye colour</td><td>race finishing position</td><td>temperature in °C</td><td>weight, income, time</td></tr>
    </tbody>
  </table>
```

**Speaker notes**:

```text
Variables also have a level of measurement, and it decides which calculations make sense.
Nominal: no order, like eye colour. Ordinal: an order, but the gaps are not equal, like finishing position in a race. Interval: order and equal intervals, but no true zero, like temperature in degrees Celsius. Ratio: all three, including a true zero, like weight, income or time.
Ask the room: is 20 degrees Celsius twice as hot as 10 degrees? No. Celsius has no true zero, so twice makes no sense. But 20 kilograms really is twice 10 kilograms, because weight is ratio data.
```

### Slide 10: studies

Markup **H1** (two-column) · `data-id="studies"` · part file `parts/01-opening.html` · 2 min

**On-slide text**:

- `{{label}}`: `Where do the data come from?`
- `{{h2}}`: `Only a randomised experiment can show cause and effect`
- `{{column 1 h3}}`: `Observational study`
- `{{column 1 p}}`: `Researchers observe and measure without assigning treatments, such as surveying students about sleep and grades. It can show an association, not cause and effect.`
- `{{column 2 h3}}`: `Experiment`
- `{{column 2 item 1}}`: `Researchers assign treatments and compare outcomes`
- `{{column 2 item 2}}`: `A control group for comparison`
- `{{column 2 item 3}}`: `Random assignment, so groups are alike apart from the treatment`
- `{{column 2 item 4}}`: `A placebo where possible, and blinding`

**Speaker notes**:

```text
Back to the first question: where do the data come from? There are two kinds of study.
In an observational study, researchers observe and measure without assigning treatments, for example surveying students about their sleep and their grades. It can show an association, but not cause and effect.
In an experiment, researchers assign the treatments and compare outcomes. A good experiment has a control group for comparison, random assignment so the groups are alike apart from the treatment, a placebo where possible, and blinding. Double-blind means that neither the subjects nor the researchers know who got what.
Only a well-designed randomised experiment can establish cause and effect. Hold on to that: we need it for the last idea of today.
```

### Slide 11: sampling

Markup **F** (diagram) · `data-id="sampling"` · part file `parts/02-describing.html` · 2 min

**Draws**: Five panels, each the same population of 20 hollow dots in 4 rows (rows are groups; panels 2 and 3 outline each row). Each click fills the chosen dots in one panel and shows its labels: 1 'Simple random / same chance for any n / 100 random IDs' (4 scattered dots); 2 'Stratified / random from each group / 25 per year of study' (one dot per row); 3 'Cluster / pick whole groups / 5 whole sections' (all of row 3); 4 'Systematic / every k-th, random start / every 20th name' (every 4th dot); 5 'Convenience / easiest to reach / not random: avoid' (4 dots in one corner).

**On-slide text**:

- `{{label}}`: `Where do the data come from?`
- `{{h2}}`: `Random methods give everyone a fair chance; convenience does not`
- `{{caption}}`: `Each panel: the same 20 people in 4 groups. Filled dots are the sample.`

**Paste into `{{svg}}`**:

```html
<svg viewBox="0 0 1680 410" role="img" aria-label="Five sampling methods shown on the same population of 20 in four groups">
      <g>
        <circle class="dg-line" cx="40" cy="40" r="13"/>
        <circle class="dg-line" cx="100" cy="40" r="13"/>
        <circle class="dg-line" cx="160" cy="40" r="13"/>
        <circle class="dg-line" cx="220" cy="40" r="13"/>
        <circle class="dg-line" cx="280" cy="40" r="13"/>
        <circle class="dg-line" cx="40" cy="100" r="13"/>
        <circle class="dg-line" cx="100" cy="100" r="13"/>
        <circle class="dg-line" cx="160" cy="100" r="13"/>
        <circle class="dg-line" cx="220" cy="100" r="13"/>
        <circle class="dg-line" cx="280" cy="100" r="13"/>
        <circle class="dg-line" cx="40" cy="160" r="13"/>
        <circle class="dg-line" cx="100" cy="160" r="13"/>
        <circle class="dg-line" cx="160" cy="160" r="13"/>
        <circle class="dg-line" cx="220" cy="160" r="13"/>
        <circle class="dg-line" cx="280" cy="160" r="13"/>
        <circle class="dg-line" cx="40" cy="220" r="13"/>
        <circle class="dg-line" cx="100" cy="220" r="13"/>
        <circle class="dg-line" cx="160" cy="220" r="13"/>
        <circle class="dg-line" cx="220" cy="220" r="13"/>
        <circle class="dg-line" cx="280" cy="220" r="13"/>
        <rect class="dg-line" x="355" y="15" width="290" height="50" rx="25"/>
        <rect class="dg-line" x="355" y="75" width="290" height="50" rx="25"/>
        <rect class="dg-line" x="355" y="135" width="290" height="50" rx="25"/>
        <rect class="dg-line" x="355" y="195" width="290" height="50" rx="25"/>
        <circle class="dg-line" cx="380" cy="40" r="13"/>
        <circle class="dg-line" cx="440" cy="40" r="13"/>
        <circle class="dg-line" cx="500" cy="40" r="13"/>
        <circle class="dg-line" cx="560" cy="40" r="13"/>
        <circle class="dg-line" cx="620" cy="40" r="13"/>
        <circle class="dg-line" cx="380" cy="100" r="13"/>
        <circle class="dg-line" cx="440" cy="100" r="13"/>
        <circle class="dg-line" cx="500" cy="100" r="13"/>
        <circle class="dg-line" cx="560" cy="100" r="13"/>
        <circle class="dg-line" cx="620" cy="100" r="13"/>
        <circle class="dg-line" cx="380" cy="160" r="13"/>
        <circle class="dg-line" cx="440" cy="160" r="13"/>
        <circle class="dg-line" cx="500" cy="160" r="13"/>
        <circle class="dg-line" cx="560" cy="160" r="13"/>
        <circle class="dg-line" cx="620" cy="160" r="13"/>
        <circle class="dg-line" cx="380" cy="220" r="13"/>
        <circle class="dg-line" cx="440" cy="220" r="13"/>
        <circle class="dg-line" cx="500" cy="220" r="13"/>
        <circle class="dg-line" cx="560" cy="220" r="13"/>
        <circle class="dg-line" cx="620" cy="220" r="13"/>
        <rect class="dg-line" x="695" y="15" width="290" height="50" rx="25"/>
        <rect class="dg-line" x="695" y="75" width="290" height="50" rx="25"/>
        <rect class="dg-line" x="695" y="135" width="290" height="50" rx="25"/>
        <rect class="dg-line" x="695" y="195" width="290" height="50" rx="25"/>
        <circle class="dg-line" cx="720" cy="40" r="13"/>
        <circle class="dg-line" cx="780" cy="40" r="13"/>
        <circle class="dg-line" cx="840" cy="40" r="13"/>
        <circle class="dg-line" cx="900" cy="40" r="13"/>
        <circle class="dg-line" cx="960" cy="40" r="13"/>
        <circle class="dg-line" cx="720" cy="100" r="13"/>
        <circle class="dg-line" cx="780" cy="100" r="13"/>
        <circle class="dg-line" cx="840" cy="100" r="13"/>
        <circle class="dg-line" cx="900" cy="100" r="13"/>
        <circle class="dg-line" cx="960" cy="100" r="13"/>
        <circle class="dg-line" cx="720" cy="160" r="13"/>
        <circle class="dg-line" cx="780" cy="160" r="13"/>
        <circle class="dg-line" cx="840" cy="160" r="13"/>
        <circle class="dg-line" cx="900" cy="160" r="13"/>
        <circle class="dg-line" cx="960" cy="160" r="13"/>
        <circle class="dg-line" cx="720" cy="220" r="13"/>
        <circle class="dg-line" cx="780" cy="220" r="13"/>
        <circle class="dg-line" cx="840" cy="220" r="13"/>
        <circle class="dg-line" cx="900" cy="220" r="13"/>
        <circle class="dg-line" cx="960" cy="220" r="13"/>
        <circle class="dg-line" cx="1060" cy="40" r="13"/>
        <circle class="dg-line" cx="1120" cy="40" r="13"/>
        <circle class="dg-line" cx="1180" cy="40" r="13"/>
        <circle class="dg-line" cx="1240" cy="40" r="13"/>
        <circle class="dg-line" cx="1300" cy="40" r="13"/>
        <circle class="dg-line" cx="1060" cy="100" r="13"/>
        <circle class="dg-line" cx="1120" cy="100" r="13"/>
        <circle class="dg-line" cx="1180" cy="100" r="13"/>
        <circle class="dg-line" cx="1240" cy="100" r="13"/>
        <circle class="dg-line" cx="1300" cy="100" r="13"/>
        <circle class="dg-line" cx="1060" cy="160" r="13"/>
        <circle class="dg-line" cx="1120" cy="160" r="13"/>
        <circle class="dg-line" cx="1180" cy="160" r="13"/>
        <circle class="dg-line" cx="1240" cy="160" r="13"/>
        <circle class="dg-line" cx="1300" cy="160" r="13"/>
        <circle class="dg-line" cx="1060" cy="220" r="13"/>
        <circle class="dg-line" cx="1120" cy="220" r="13"/>
        <circle class="dg-line" cx="1180" cy="220" r="13"/>
        <circle class="dg-line" cx="1240" cy="220" r="13"/>
        <circle class="dg-line" cx="1300" cy="220" r="13"/>
        <circle class="dg-line" cx="1400" cy="40" r="13"/>
        <circle class="dg-line" cx="1460" cy="40" r="13"/>
        <circle class="dg-line" cx="1520" cy="40" r="13"/>
        <circle class="dg-line" cx="1580" cy="40" r="13"/>
        <circle class="dg-line" cx="1640" cy="40" r="13"/>
        <circle class="dg-line" cx="1400" cy="100" r="13"/>
        <circle class="dg-line" cx="1460" cy="100" r="13"/>
        <circle class="dg-line" cx="1520" cy="100" r="13"/>
        <circle class="dg-line" cx="1580" cy="100" r="13"/>
        <circle class="dg-line" cx="1640" cy="100" r="13"/>
        <circle class="dg-line" cx="1400" cy="160" r="13"/>
        <circle class="dg-line" cx="1460" cy="160" r="13"/>
        <circle class="dg-line" cx="1520" cy="160" r="13"/>
        <circle class="dg-line" cx="1580" cy="160" r="13"/>
        <circle class="dg-line" cx="1640" cy="160" r="13"/>
        <circle class="dg-line" cx="1400" cy="220" r="13"/>
        <circle class="dg-line" cx="1460" cy="220" r="13"/>
        <circle class="dg-line" cx="1520" cy="220" r="13"/>
        <circle class="dg-line" cx="1580" cy="220" r="13"/>
        <circle class="dg-line" cx="1640" cy="220" r="13"/>
      </g>
      <g data-build="fade" data-order="1">
        <circle class="dg-dot hot" cx="100" cy="40" r="13"/><circle class="dg-dot hot" cx="280" cy="40" r="13"/><circle class="dg-dot hot" cx="160" cy="160" r="13"/><circle class="dg-dot hot" cx="40" cy="220" r="13"/>
        <text class="dg-t" x="160" y="310" text-anchor="middle">Simple random</text>
        <text class="dg-s" x="160" y="352" text-anchor="middle">same chance for any n</text>
        <text class="dg-s" x="160" y="392" text-anchor="middle">100 random IDs</text>
      </g>
      <g data-build="fade" data-order="2">
        <circle class="dg-dot hot" cx="560" cy="40" r="13"/><circle class="dg-dot hot" cx="440" cy="100" r="13"/><circle class="dg-dot hot" cx="620" cy="160" r="13"/><circle class="dg-dot hot" cx="500" cy="220" r="13"/>
        <text class="dg-t" x="500" y="310" text-anchor="middle">Stratified</text>
        <text class="dg-s" x="500" y="352" text-anchor="middle">random from each group</text>
        <text class="dg-s" x="500" y="392" text-anchor="middle">25 per year of study</text>
      </g>
      <g data-build="fade" data-order="3">
        <circle class="dg-dot hot" cx="720" cy="160" r="13"/><circle class="dg-dot hot" cx="780" cy="160" r="13"/><circle class="dg-dot hot" cx="840" cy="160" r="13"/><circle class="dg-dot hot" cx="900" cy="160" r="13"/><circle class="dg-dot hot" cx="960" cy="160" r="13"/>
        <text class="dg-t" x="840" y="310" text-anchor="middle">Cluster</text>
        <text class="dg-s" x="840" y="352" text-anchor="middle">pick whole groups</text>
        <text class="dg-s" x="840" y="392" text-anchor="middle">5 whole sections</text>
      </g>
      <g data-build="fade" data-order="4">
        <circle class="dg-dot hot" cx="1120" cy="40" r="13"/><circle class="dg-dot hot" cx="1060" cy="100" r="13"/><circle class="dg-dot hot" cx="1300" cy="100" r="13"/><circle class="dg-dot hot" cx="1240" cy="160" r="13"/><circle class="dg-dot hot" cx="1180" cy="220" r="13"/>
        <text class="dg-t" x="1180" y="310" text-anchor="middle">Systematic</text>
        <text class="dg-s" x="1180" y="352" text-anchor="middle">every k-th, random start</text>
        <text class="dg-s" x="1180" y="392" text-anchor="middle">every 20th name</text>
      </g>
      <g data-build="fade" data-order="5">
        <circle class="dg-dot hot" cx="1400" cy="160" r="13"/><circle class="dg-dot hot" cx="1400" cy="220" r="13"/><circle class="dg-dot hot" cx="1460" cy="220" r="13"/><circle class="dg-dot hot" cx="1520" cy="220" r="13"/>
        <text class="dg-t" x="1520" y="310" text-anchor="middle">Convenience</text>
        <text class="dg-s" x="1520" y="352" text-anchor="middle">easiest to reach</text>
        <text class="dg-b" x="1520" y="392" text-anchor="middle">not random: avoid</text>
      </g>
    </svg>
```

**Speaker notes**:

```text
How do we choose a sample? Each panel shows the same population of 20 people in four groups, think of them as the four years of study. The filled dots are the people we pick.
[click] Simple random sample: every group of n individuals has the same chance of being chosen, like drawing 100 student IDs at random.
[click] Stratified sample: split the population into groups, called strata, and take a random sample from each, like 25 students from each year of study.
[click] Cluster sample: split into groups and randomly choose whole groups, like picking 5 lecture sections at random and surveying everyone in them.
[click] Systematic sample: choose every k-th individual from a list after a random start, like every 20th name on the class list.
[click] Convenience sample: whoever is easiest to reach, like asking your friends in the cafeteria. It is not random. Avoid it.
```

### Slide 12: bias

Markup **I** (bullets) · `data-id="bias"` · part file `parts/02-describing.html` · 2 min

**On-slide text**:

- `{{h2}}`: `A bigger sample does not fix bias`
- `{{item 1 lead}}`: `Selection bias.`
- `{{item 1 text}}`: `The way the sample is chosen leaves out part of the population.`
- `{{item 2 lead}}`: `Non-response bias.`
- `{{item 2 text}}`: `The people who don't respond differ from those who do.`
- `{{item 3 lead}}`: `Response bias.`
- `{{item 3 text}}`: `Wording or setting pushes an answer: "Don't you agree that…?"`
- `{{item 4 lead}}`: `Voluntary response bias.`
- `{{item 4 text}}`: `Only people with strong opinions take part.`
- `{{item 5 lead}}`: `Size is no cure.`
- `{{item 5 text}}`: `A bigger biased sample only looks more precise.`

**Speaker notes**:

```text
When samples mislead, we call it bias: a systematic error that pushes results away from the truth in one direction.
[click] Selection bias: the way the sample is chosen leaves out part of the population. The Literary Digest's phone and car lists left out poorer voters in 1936.
[click] Non-response bias: the people who do not respond differ from those who do.
[click] Response bias: the question wording or the setting pushes people towards an answer. A question that starts 'Don't you agree that' is a giveaway.
[click] Voluntary response bias: only people with strong opinions choose to take part, as in online polls and call-in shows.
[click] And the big idea once more, in a new form: a bigger sample does not fix bias. It only makes a biased answer look more precise.
```

### Slide 13: graphs

Markup **G** (comparison) · `data-id="graphs"` · part file `parts/02-describing.html` · 1.5 min

**On-slide text**:

- `{{h2}}`: `The type of data picks the graph`

This slide has no `{{label}}`: delete the label line of markup G.

**Paste into `{{table}}`**:

```html
<table>
    <thead><tr><th>Data</th><th>Graph</th><th>What it shows</th></tr></thead>
    <tbody>
      <tr><th>One categorical variable</th><td>Bar chart (or pie chart)</td><td>Counts or percentages per category</td></tr>
      <tr><th>One numerical variable</th><td>Histogram</td><td>Shape of the distribution</td></tr>
      <tr><th>One numerical variable</th><td>Box plot</td><td>Five-number summary and outliers</td></tr>
      <tr><th>Two numerical variables</th><td>Scatter plot</td><td>Relationship: direction, form, strength</td></tr>
      <tr><th>A variable over time</th><td>Line graph</td><td>Trends</td></tr>
    </tbody>
  </table>
```

**Speaker notes**:

```text
Third question: what do the data say? Start with a graph, and let the type of data choose it.
One categorical variable: a bar chart, or a pie chart, for counts or percentages per category. One numerical variable: a histogram shows the shape of the distribution, and a box plot shows the five-number summary and outliers.
Two numerical variables: a scatter plot shows the relationship, its direction, form and strength. A variable over time: a line graph shows trends.
The rule for all of them: always plot the data before computing anything. The next slide shows why.
```

### Slide 14: anscombe

Markup **F** (diagram) · `data-id="anscombe"` · part file `parts/02-describing.html` · 1.5 min

**Draws**: Static: four empty axes, numbered I, II, III, IV. Click 1: the same accent line y = 3 + 0.5x draws in all four. Click 2: the 11 dots of each set appear, with labels 'straight-line cloud', 'a curve', 'line + one outlier', 'stack + one far point'.

**On-slide text**:

- `{{label}}`: `What do the data say?`
- `{{h2}}`: `Always plot the data before computing anything`
- `{{caption}}`: `Anscombe's quartet, 1973: 11 points each, mean of x 9, mean of y about 7.50, correlation about 0.816, line y = 3 + 0.5x.`

**Paste into `{{svg}}`**:

```html
<svg viewBox="0 0 1680 420" role="img" aria-label="Anscombe's quartet: four scatter plots with the same line y = 3 + 0.5x but different shapes">
      <g>
        <path class="dg-line" d="M0 60V360H375"/><text class="dg-t" x="187" y="36" text-anchor="middle">I</text>
        <path class="dg-line" d="M435 60V360H810"/><text class="dg-t" x="622" y="36" text-anchor="middle">II</text>
        <path class="dg-line" d="M870 60V360H1245"/><text class="dg-t" x="1057" y="36" text-anchor="middle">III</text>
        <path class="dg-line" d="M1305 60V360H1680"/><text class="dg-t" x="1492" y="36" text-anchor="middle">IV</text>
      </g>
      <g data-build="draw" data-order="1">
        <path class="dg-line hot" d="M0 310L375 85"/>
        <path class="dg-line hot" d="M435 310L810 85"/>
        <path class="dg-line hot" d="M870 310L1245 85"/>
        <path class="dg-line hot" d="M1305 310L1680 85"/>
      </g>
      <g data-build="fade" data-order="2">
        <circle class="dg-dot" cx="166.7" cy="209" r="9"/><circle class="dg-dot" cx="125" cy="236.2" r="9"/><circle class="dg-dot" cx="229.2" cy="220.5" r="9"/><circle class="dg-dot" cx="145.8" cy="189.8" r="9"/><circle class="dg-dot" cx="187.5" cy="201.8" r="9"/><circle class="dg-dot" cx="250" cy="161" r="9"/><circle class="dg-dot" cx="83.3" cy="229" r="9"/><circle class="dg-dot" cx="41.7" cy="303.5" r="9"/><circle class="dg-dot" cx="208.3" cy="139" r="9"/><circle class="dg-dot" cx="104.2" cy="289.5" r="9"/><circle class="dg-dot" cx="62.5" cy="268" r="9"/>
        <text class="dg-s" x="187" y="405" text-anchor="middle">straight-line cloud</text>
        <circle class="dg-dot" cx="601.7" cy="181.5" r="9"/><circle class="dg-dot" cx="560" cy="206.5" r="9"/><circle class="dg-dot" cx="664.2" cy="191.5" r="9"/><circle class="dg-dot" cx="580.8" cy="190.8" r="9"/><circle class="dg-dot" cx="622.5" cy="178.5" r="9"/><circle class="dg-dot" cx="685" cy="207.5" r="9"/><circle class="dg-dot" cx="518.3" cy="256.8" r="9"/><circle class="dg-dot" cx="476.7" cy="332.5" r="9"/><circle class="dg-dot" cx="643.3" cy="181.7" r="9"/><circle class="dg-dot" cx="539.2" cy="228.5" r="9"/><circle class="dg-dot" cx="497.5" cy="291.5" r="9"/>
        <text class="dg-s" x="622" y="405" text-anchor="middle">a curve</text>
        <circle class="dg-dot" cx="1036.7" cy="223.5" r="9"/><circle class="dg-dot" cx="995" cy="240.8" r="9"/><circle class="dg-dot" cx="1099.2" cy="91.5" r="9"/><circle class="dg-dot" cx="1015.8" cy="232.2" r="9"/><circle class="dg-dot" cx="1057.5" cy="214.8" r="9"/><circle class="dg-dot" cx="1120" cy="189" r="9"/><circle class="dg-dot" cx="953.3" cy="258" r="9"/><circle class="dg-dot" cx="911.7" cy="275.2" r="9"/><circle class="dg-dot" cx="1078.3" cy="206.2" r="9"/><circle class="dg-dot" cx="974.2" cy="249.5" r="9"/><circle class="dg-dot" cx="932.5" cy="266.8" r="9"/>
        <text class="dg-s" x="1057" y="405" text-anchor="middle">line + one outlier</text>
        <circle class="dg-dot" cx="1430" cy="245.5" r="9"/><circle class="dg-dot" cx="1430" cy="266" r="9"/><circle class="dg-dot" cx="1430" cy="217.2" r="9"/><circle class="dg-dot" cx="1430" cy="189" r="9"/><circle class="dg-dot" cx="1430" cy="198.2" r="9"/><circle class="dg-dot" cx="1430" cy="234" r="9"/><circle class="dg-dot" cx="1430" cy="278.8" r="9"/><circle class="dg-dot" cx="1659.2" cy="97.5" r="9"/><circle class="dg-dot" cx="1430" cy="271" r="9"/><circle class="dg-dot" cx="1430" cy="212.2" r="9"/><circle class="dg-dot" cx="1430" cy="237.8" r="9"/>
        <text class="dg-s" x="1492" y="405" text-anchor="middle">stack + one far point</text>
      </g>
    </svg>
```

**Speaker notes**:

```text
Anscombe's quartet, from 1973: four small data sets of 11 points each.
[click] They have almost the same summary numbers: the mean of x is 9, the mean of y is about 7.50, the correlation is about 0.816, and they share the same regression line, y equals 3 plus 0.5 x. Judged by the numbers alone, they are the same data.
[click] Now look at the points. One is a straight-line cloud. One is a curve. One is a line with a single outlier. One is a vertical stack with one far point.
Summary numbers can hide what the data really look like. That is why we always plot the data before computing anything, just as John Snow did with his map.
```

### Slide 15: shape

Markup **F** (diagram) · `data-id="shape"` · part file `parts/02-describing.html` · 1.5 min

**Draws**: Static: four baselines. Each click draws one accent curve with its labels: 1 'Symmetric / one peak, sides alike'; 2 'Skewed right / long tail right: incomes'; 3 'Skewed left / long tail to the left'; 4 'Bimodal / two peaks'.

**On-slide text**:

- `{{label}}`: `What do the data say?`
- `{{h2}}`: `Describe a distribution by its shape, centre and spread`
- `{{caption}}`: `Then add unusual features: outliers and gaps.`

**Paste into `{{svg}}`**:

```html
<svg viewBox="0 60 1680 350" role="img" aria-label="Four distribution shapes: symmetric, skewed right, skewed left, bimodal">
      <g>
        <path class="dg-line" d="M0 300H375"/>
        <path class="dg-line" d="M435 300H810"/>
        <path class="dg-line" d="M870 300H1245"/>
        <path class="dg-line" d="M1305 300H1680"/>
      </g>
      <g data-build="draw" data-order="1"><path class="dg-line hot" d="M0 299.6 L6.2 299.4 L12.5 299.1 L18.8 298.7 L25 298.2 L31.2 297.4 L37.5 296.3 L43.8 294.8 L50 292.9 L56.2 290.3 L62.5 287.1 L68.8 283 L75 277.9 L81.2 271.6 L87.5 264.1 L93.8 255.3 L100 245.1 L106.2 233.6 L112.5 220.7 L118.8 206.7 L125 191.7 L131.2 176.1 L137.5 160.2 L143.8 144.5 L150 129.5 L156.2 115.7 L162.5 103.6 L168.8 93.6 L175 86.1 L181.2 81.6 L187.5 80 L193.8 81.6 L200 86.1 L206.3 93.6 L212.5 103.6 L218.8 115.7 L225 129.5 L231.2 144.5 L237.5 160.2 L243.8 176.1 L250 191.7 L256.2 206.7 L262.5 220.7 L268.8 233.6 L275 245.1 L281.2 255.3 L287.5 264.1 L293.8 271.6 L300 277.9 L306.2 283 L312.5 287.1 L318.8 290.3 L325 292.9 L331.2 294.8 L337.5 296.3 L343.8 297.4 L350 298.2 L356.2 298.7 L362.5 299.1 L368.8 299.4 L375 299.6"/></g>
      <g data-build="fade" data-order="1"><text class="dg-t" x="187" y="350" text-anchor="middle">Symmetric</text><text class="dg-s" x="187" y="392" text-anchor="middle">one peak, sides alike</text></g>
      <g data-build="draw" data-order="2"><path class="dg-line hot" d="M435 300 L441.2 278.4 L447.5 243.8 L453.8 207.5 L460 174.1 L466.2 145.3 L472.5 122.1 L478.8 104.3 L485 91.8 L491.2 83.9 L497.5 80.2 L503.8 80 L510 82.7 L516.2 87.7 L522.5 94.6 L528.8 102.9 L535 112.2 L541.2 122.1 L547.5 132.5 L553.8 143 L560 153.6 L566.2 163.9 L572.5 174 L578.8 183.8 L585 193.1 L591.2 201.9 L597.5 210.2 L603.8 218.1 L610 225.4 L616.2 232.1 L622.5 238.4 L628.8 244.2 L635 249.6 L641.2 254.5 L647.5 259 L653.8 263.1 L660 266.8 L666.2 270.2 L672.5 273.3 L678.8 276 L685 278.6 L691.2 280.8 L697.5 282.9 L703.8 284.7 L710 286.4 L716.2 287.9 L722.5 289.2 L728.8 290.4 L735 291.5 L741.2 292.4 L747.5 293.3 L753.8 294 L760 294.7 L766.2 295.3 L772.5 295.8 L778.8 296.3 L785 296.7 L791.2 297.1 L797.5 297.5 L803.8 297.8 L810 298"/></g>
      <g data-build="fade" data-order="2"><text class="dg-t" x="622" y="350" text-anchor="middle">Skewed right</text><text class="dg-s" x="622" y="392" text-anchor="middle">long tail right: incomes</text></g>
      <g data-build="draw" data-order="3"><path class="dg-line hot" d="M870 298 L876.2 297.8 L882.5 297.5 L888.8 297.1 L895 296.7 L901.2 296.3 L907.5 295.8 L913.8 295.3 L920 294.7 L926.2 294 L932.5 293.3 L938.8 292.4 L945 291.5 L951.2 290.4 L957.5 289.2 L963.8 287.9 L970 286.4 L976.2 284.7 L982.5 282.9 L988.8 280.8 L995 278.6 L1001.2 276 L1007.5 273.3 L1013.8 270.2 L1020 266.8 L1026.2 263.1 L1032.5 259 L1038.8 254.5 L1045 249.6 L1051.2 244.2 L1057.5 238.4 L1063.8 232.1 L1070 225.4 L1076.2 218.1 L1082.5 210.2 L1088.8 201.9 L1095 193.1 L1101.2 183.8 L1107.5 174 L1113.8 163.9 L1120 153.6 L1126.2 143 L1132.5 132.5 L1138.8 122.1 L1145 112.2 L1151.2 102.9 L1157.5 94.6 L1163.8 87.7 L1170 82.7 L1176.2 80 L1182.5 80.2 L1188.8 83.9 L1195 91.8 L1201.2 104.3 L1207.5 122.1 L1213.8 145.3 L1220 174.1 L1226.2 207.5 L1232.5 243.8 L1238.8 278.4 L1245 300"/></g>
      <g data-build="fade" data-order="3"><text class="dg-t" x="1057" y="350" text-anchor="middle">Skewed left</text><text class="dg-s" x="1057" y="392" text-anchor="middle">long tail to the left</text></g>
      <g data-build="draw" data-order="4"><path class="dg-line hot" d="M1305 298.5 L1311.2 297.4 L1317.5 295.6 L1323.8 292.9 L1330 288.7 L1336.2 282.8 L1342.5 274.7 L1348.8 263.9 L1355 250.4 L1361.2 234.1 L1367.5 215.3 L1373.8 194.9 L1380 173.9 L1386.2 153.9 L1392.5 136.4 L1398.8 123 L1405 114.9 L1411.2 113 L1417.5 117.4 L1423.8 127.8 L1430 143 L1436.2 161.7 L1442.5 182.2 L1448.8 203 L1455 222.7 L1461.2 240.2 L1467.5 254.8 L1473.8 266.1 L1480 274 L1486.2 278.5 L1492.5 279.5 L1498.8 277 L1505 270.8 L1511.2 260.9 L1517.5 247.3 L1523.8 229.9 L1530 209.2 L1536.2 185.9 L1542.5 161.4 L1548.8 137.3 L1555 115.3 L1561.2 97.4 L1567.5 85.2 L1573.8 80 L1580 82.3 L1586.2 91.7 L1592.5 107.5 L1598.8 128.1 L1605 151.7 L1611.2 176.3 L1617.5 200.4 L1623.8 222.4 L1630 241.6 L1636.2 257.6 L1642.5 270.2 L1648.8 279.8 L1655 286.7 L1661.2 291.6 L1667.5 294.9 L1673.8 297 L1680 298.3"/></g>
      <g data-build="fade" data-order="4"><text class="dg-t" x="1492" y="350" text-anchor="middle">Bimodal</text><text class="dg-s" x="1492" y="392" text-anchor="middle">two peaks</text></g>
    </svg>
```

**Speaker notes**:

```text
Whenever you describe a numerical variable, cover four things: shape, centre, spread and unusual features. Start with shape.
[click] Symmetric: one peak, and both sides look alike. One peak is called unimodal.
[click] Skewed right: a long tail to the right. Incomes look like this.
[click] Skewed left: the long tail is on the left.
[click] Bimodal: two peaks instead of one.
After the shape, say where the centre is, how much the values spread, and whether there are outliers or gaps. The next slides give us numbers for centre and spread.
```

### Slide 16: mean

Markup **J** (formula) · `data-id="mean"` · part file `parts/02-describing.html` · 1.5 min

**On-slide text**:

- `{{label}}`: `What do the data say?`
- `{{h2}}`: `The mean shares out the total; the median is the middle`
- `{{example}}`: `Commutes (min): 12, 15, 15, 18, 20, 22, 25, 27, 30, 76. Sum 260, n = 10: mean 26, median 21, mode 15.`

**Paste into `{{eq}}`**:

```html
<div class="eq"><i style="font-family:var(--f-body)">x̄</i> = Σ<i>x</i> / <i>n</i></div>
```

**Paste into `{{terms}}`**:

```html
<dl class="terms">
    <div><dt><i style="font-family:var(--f-body)">x̄</i></dt><dd>the mean of the sample</dd></div>
    <div><dt>Σ<i>x</i></dt><dd>the sum of all the values</dd></div>
    <div><dt><i>n</i></dt><dd>how many values there are</dd></div>
    <div><dt>Median</dt><dd>the middle of the ordered values</dd></div>
    <div><dt>Mode</dt><dd>the most frequent value</dd></div>
  </dl>
```

**Speaker notes**:

```text
Three measures of centre. The mean: add the values and divide by how many there are. In symbols, x-bar equals the sum of x divided by n.
The median is the middle value of the ordered data. With an even number of values, take the average of the two middle values. The mode is the most frequent value.
Our running example: the commute times, in minutes, of 10 students: 12, 15, 15, 18, 20, 22, 25, 27, 30 and 76. The sum is 260 and n is 10, so the mean is 26 minutes. The ordered middle values are 20 and 22, so the median is 21 minutes. And 15 appears twice, so the mode is 15 minutes.
```

### Slide 17: resistant

Markup **F** (diagram) · `data-id="resistant"` · part file `parts/02-describing.html` · 2 min

**Draws**: Static: a number line 0 to 80 minutes with ticks every 10 and the 10 commute dots (two stacked at 15, labelled 'mode 15'). Click 1: a vertical line at 21 labelled 'median 21'. Click 2: an accent line at 26 labelled 'mean 26'. Click 3: an accent ring around the 76 dot with 'without the 76: mean ≈ 20.4, median 20'.

**On-slide text**:

- `{{label}}`: `What do the data say?`
- `{{h2}}`: `One long commute pulls the mean, but barely moves the median`
- `{{caption}}`: `Use the median for skewed data such as house prices and incomes; the mean for roughly symmetric data.`

**Paste into `{{svg}}`**:

```html
<svg viewBox="0 50 1680 400" role="img" aria-label="Dot plot of 10 commute times; median 21, mean 26; without 76 the mean is about 20.4 and the median 20">
      <g>
        <path class="dg-line" d="M60 290H1620"/>
        <path class="dg-line" d="M60 290V304"/><text class="dg-m" x="60" y="340" text-anchor="middle">0</text><path class="dg-line" d="M255 290V304"/><text class="dg-m" x="255" y="340" text-anchor="middle">10</text><path class="dg-line" d="M450 290V304"/><text class="dg-m" x="450" y="340" text-anchor="middle">20</text><path class="dg-line" d="M645 290V304"/><text class="dg-m" x="645" y="340" text-anchor="middle">30</text><path class="dg-line" d="M840 290V304"/><text class="dg-m" x="840" y="340" text-anchor="middle">40</text><path class="dg-line" d="M1035 290V304"/><text class="dg-m" x="1035" y="340" text-anchor="middle">50</text><path class="dg-line" d="M1230 290V304"/><text class="dg-m" x="1230" y="340" text-anchor="middle">60</text><path class="dg-line" d="M1425 290V304"/><text class="dg-m" x="1425" y="340" text-anchor="middle">70</text><path class="dg-line" d="M1620 290V304"/><text class="dg-m" x="1620" y="340" text-anchor="middle">80</text>
        <text class="dg-m" x="1620" y="382" text-anchor="end">minutes</text>
        <circle class="dg-dot" cx="294" cy="254" r="15"/><circle class="dg-dot" cx="352.5" cy="254" r="15"/><circle class="dg-dot" cx="352.5" cy="218" r="15"/><circle class="dg-dot" cx="411" cy="254" r="15"/><circle class="dg-dot" cx="450" cy="254" r="15"/><circle class="dg-dot" cx="489" cy="254" r="15"/><circle class="dg-dot" cx="547.5" cy="254" r="15"/><circle class="dg-dot" cx="586.5" cy="254" r="15"/><circle class="dg-dot" cx="645" cy="254" r="15"/><circle class="dg-dot" cx="1542" cy="254" r="15"/>
        <text class="dg-s" x="352.5" y="190" text-anchor="middle">mode 15</text>
      </g>
      <g data-build="draw" data-order="1"><path class="dg-line" d="M469.5 150V290"/></g>
      <g data-build="fade" data-order="1"><text class="dg-t" x="457.5" y="140" text-anchor="end">median 21</text></g>
      <g data-build="draw" data-order="2"><path class="dg-line hot" d="M567 95V290"/></g>
      <g data-build="fade" data-order="2"><text class="dg-b" x="579" y="86">mean 26</text></g>
      <g data-build="draw" data-order="3"><circle class="dg-hot" cx="1542" cy="254" r="30"/></g>
      <g data-build="fade" data-order="3"><text class="dg-b" x="1680" y="150" text-anchor="end">without the 76:</text><text class="dg-s" x="1680" y="194" text-anchor="end">mean ≈ 20.4, median 20</text></g>
    </svg>
```

**Speaker notes**:

```text
Here are the ten commutes on a number line. The two stacked dots at 15 are the mode.
[click] The median, 21, sits in the middle of the pack.
[click] The mean, 26, is pulled to the right by one long commute. Ask the room: what happens if we remove the 76-minute commute?
[click] The mean drops to about 20.4, but the median only to 20. The median is resistant to outliers; the mean is not.
In a right-skewed distribution the mean is pulled above the median; in a left-skewed one, below it. So use the median for skewed data such as house prices and incomes, and the mean for roughly symmetric data.
```

### Slide 18: spread

Markup **K** (stats) · `data-id="spread"` · part file `parts/02-describing.html` · 2 min

**On-slide text**:

- `{{label}}`: `What do the data say?`
- `{{h2}}`: `The range is 64 minutes, but the middle half spans only 12`
- `{{stat 1 number}}`: `64`
- `{{stat 1 unit}}`: `min`
- `{{stat 1 caption}}`: `Range: 76 − 12`
- `{{stat 2 number}}`: `12`
- `{{stat 2 unit}}`: `min`
- `{{stat 2 caption}}`: `IQR: 27 − 15, the middle 50%`
- `{{stat 3 number}}`: `18.5`
- `{{stat 3 unit}}`: `min`
- `{{stat 3 caption}}`: `Standard deviation`

**Speaker notes**:

```text
Centre is only half the picture; spread is the other half. Same ten commutes.
[click] The range is the maximum minus the minimum: 76 minus 12, 64 minutes. It is very sensitive to outliers, because it uses only the two most extreme values.
[click] The interquartile range uses the quartiles. Q1 is the median of the lower half: 12, 15, 15, 18, 20 gives 15. Q3 is the median of the upper half: 22, 25, 27, 30, 76 gives 27. The IQR is 27 minus 15, 12 minutes: the spread of the middle 50%.
[click] The standard deviation is roughly the typical distance of values from the mean. For the commutes it is about 18.5 minutes. The next slide shows how it is calculated.
```

### Slide 19: sd

Markup **J** (formula) · `data-id="sd"` · part file `parts/02-describing.html` · 2 min

**On-slide text**:

- `{{label}}`: `What do the data say?`
- `{{h2}}`: `One outlier triples the standard deviation`
- `{{example}}`: `Commutes: variance ≈ 341.3, s ≈ 18.5 min. Without the 76: s ≈ 6.1 min.`

**Paste into `{{eq}}`**:

```html
<div class="eq"><i>s</i> = √( Σ(<i>x</i> − <i style="font-family:var(--f-body)">x̄</i>)² / (<i>n</i> − 1) )</div>
```

**Paste into `{{terms}}`**:

```html
<dl class="terms">
    <div><dt><i>s</i></dt><dd>the sample standard deviation</dd></div>
    <div><dt><i>x</i> − <i style="font-family:var(--f-body)">x̄</i></dt><dd>a value's distance from the mean</dd></div>
    <div><dt><i>s</i>²</dt><dd>the variance (before the root)</dd></div>
    <div><dt><i>n</i> − 1</dt><dd>divide by n − 1 for a sample</dd></div>
  </dl>
```

**Speaker notes**:

```text
This is the formula for the sample standard deviation. Take each value's distance from the mean, square it, add them all up, divide by n minus 1, and take the square root. Before the square root, the number is called the variance.
For the commutes the variance is about 341.3, so s is about 18.5 minutes. Without the 76-minute value, s is about 6.1 minutes. One outlier triples the standard deviation.
Why n minus 1 and not n? For a sample, the sample mean is closer to the data than the true mean is, and dividing by n minus 1 corrects for that.
```

### Slide 20: boxplot

Markup **F** (diagram) · `data-id="boxplot"` · part file `parts/02-describing.html` · 2 min

**Draws**: Static: a number line −10 to 80 minutes, ticks every 10. Click 1: box from 15 to 27 with an accent median line at 21, labels 'Q1 15', 'median 21', 'Q3 27'. Click 2: whiskers to 12 and 30, labelled. Click 3: dashed vertical lines at −3 and 45, labelled 'lower cut-off −3' and 'upper cut-off 45'. Click 4: an accent dot at 76 labelled '76: outlier'.

**On-slide text**:

- `{{label}}`: `What do the data say?`
- `{{h2}}`: `The 76-minute commute lies beyond the cut-off: it is an outlier`
- `{{caption}}`: `Five-number summary 12, 15, 21, 27, 76. 1.5 × IQR = 18, so the cut-offs are −3 and 45.`

**Paste into `{{svg}}`**:

```html
<svg viewBox="0 20 1680 380" role="img" aria-label="Box plot of commute times: box 15 to 27, median 21, whiskers 12 and 30, cut-offs at -3 and 45, outlier 76">
      <g>
        <path class="dg-line" d="M60 300H1620"/>
        <path class="dg-line" d="M233.3 300V314"/><text class="dg-m" x="233.3" y="350" text-anchor="middle">0</text><path class="dg-line" d="M406.7 300V314"/><text class="dg-m" x="406.7" y="350" text-anchor="middle">10</text><path class="dg-line" d="M580 300V314"/><text class="dg-m" x="580" y="350" text-anchor="middle">20</text><path class="dg-line" d="M753.3 300V314"/><text class="dg-m" x="753.3" y="350" text-anchor="middle">30</text><path class="dg-line" d="M926.7 300V314"/><text class="dg-m" x="926.7" y="350" text-anchor="middle">40</text><path class="dg-line" d="M1100 300V314"/><text class="dg-m" x="1100" y="350" text-anchor="middle">50</text><path class="dg-line" d="M1273.3 300V314"/><text class="dg-m" x="1273.3" y="350" text-anchor="middle">60</text><path class="dg-line" d="M1446.7 300V314"/><text class="dg-m" x="1446.7" y="350" text-anchor="middle">70</text><path class="dg-line" d="M1620 300V314"/><text class="dg-m" x="1620" y="350" text-anchor="middle">80</text>
        <text class="dg-m" x="1620" y="392" text-anchor="end">minutes</text>
      </g>
      <g data-build="draw" data-order="1"><rect class="dg-box" x="493.3" y="150" width="208" height="90" rx="4"/><path class="dg-line hot" d="M597.3 150V240"/></g>
      <g data-build="fade" data-order="1">
        <text class="dg-s" x="485.3" y="135" text-anchor="end">Q1 15</text>
        <text class="dg-s" x="597.3" y="135" text-anchor="middle">median 21</text>
        <text class="dg-s" x="709.3" y="135" text-anchor="start">Q3 27</text>
      </g>
      <g data-build="draw" data-order="2"><path class="dg-line" d="M493.3 195H441.3M441.3 170V220M701.3 195H753.3M753.3 170V220"/></g>
      <g data-build="fade" data-order="2"><text class="dg-s" x="441.3" y="270" text-anchor="middle">12</text><text class="dg-s" x="753.3" y="270" text-anchor="middle">30</text></g>
      <g data-build="fade" data-order="3">
        <path class="dg-line" stroke-dasharray="12 10" d="M181.3 90V300M1013.3 90V300"/>
        <text class="dg-m" x="193.3" y="80">lower cut-off −3</text>
        <text class="dg-m" x="1025.3" y="80">upper cut-off 45</text>
      </g>
      <g data-build="fade" data-order="4">
        <circle class="dg-dot hot" cx="1550.7" cy="195" r="15"/>
        <text class="dg-b" x="1550.7" y="140" text-anchor="middle">76: outlier</text>
      </g>
    </svg>
```

**Speaker notes**:

```text
Five numbers summarise a distribution: the minimum, Q1, the median, Q3 and the maximum. For the commutes: 12, 15, 21, 27 and 76. A box plot draws them.
[click] The box runs from Q1, 15, to Q3, 27, with a line at the median, 21.
[click] The whiskers reach to the most extreme values that are not outliers: here 12 and 30.
[click] How do we decide what counts as an outlier? The 1.5 times IQR rule. The IQR is 12, and 1.5 times 12 is 18. The lower cut-off is Q1 minus 18: 15 minus 18 is minus 3. The upper cut-off is Q3 plus 18: 27 plus 18 is 45. A value below the lower cut-off or above the upper cut-off is a suspected outlier.
[click] The 76-minute commute is far above 45, so it is an outlier, drawn as a separate dot.
```

### Slide 21: zscore

Markup **J** (formula) · `data-id="zscore"` · part file `parts/03-close.html` · 1.5 min

**On-slide text**:

- `{{label}}`: `What do the data say?`
- `{{h2}}`: `A z-score counts standard deviations from the mean`
- `{{example}}`: `Exam with mean 70, SD 8. A score of 86: z = (86 − 70) / 8 = 2, two SDs above the mean.`

**Paste into `{{eq}}`**:

```html
<div class="eq"><i>z</i> = (<i>x</i> − mean) / <span class="hot">SD</span></div>
```

**Paste into `{{terms}}`**:

```html
<dl class="terms">
    <div><dt><i>z</i></dt><dd>SDs above (+) or below (−) the mean</dd></div>
    <div><dt><i>x</i></dt><dd>the value</dd></div>
    <div><dt>mean</dt><dd>the mean of the data</dd></div>
    <div><dt>SD</dt><dd>the standard deviation</dd></div>
  </dl>
```

**Speaker notes**:

```text
How unusual is a value? A z-score answers that. z equals the value minus the mean, divided by the standard deviation.
It says how many standard deviations a value is above the mean, when it is positive, or below the mean, when it is negative.
Example: an exam has mean 70 and standard deviation 8. A score of 86 has z equal to 86 minus 70, divided by 8, which is 2: two standard deviations above the mean.
Because z-scores count in standard deviations, they let us compare values on different scales, for example a score on a hard test against a score on an easy one.
```

### Slide 22: rule

Markup **F** (diagram) · `data-id="rule"` · part file `parts/03-close.html` · 2 min

**Draws**: Static: an accent bell curve over an axis labelled 46, 54, 62, 70, 78, 86, 94. Click 1: dashed lines at 62 and 78 and a bracket 'about 68%'. Click 2: lines at 54 and 86, bracket 'about 95%'. Click 3: lines at 46 and 94, bracket 'about 99.7%'. Click 4: an accent dot on the curve at 86 with '86: z = 2' and 'better than about 97.5%'.

**On-slide text**:

- `{{label}}`: `What do the data say?`
- `{{h2}}`: `In a bell curve, 68% lie within 1 SD, 95% within 2, 99.7% within 3`
- `{{caption}}`: `Exam scores, mean 70, SD 8. The rule needs roughly bell-shaped data; it does not fit skewed data like the commutes.`

**Paste into `{{svg}}`**:

```html
<svg viewBox="0 100 1680 560" role="img" aria-label="Bell curve of exam scores, mean 70, SD 8: 68% between 62 and 78, 95% between 54 and 86, 99.7% between 46 and 94">
      <g>
        <path class="dg-line hot" d="M175 419.3 L185 419.2 L195 419.1 L205 418.9 L215 418.7 L225 418.4 L235 418.1 L245 417.8 L255 417.4 L265 416.9 L275 416.4 L285 415.8 L295 415.1 L305 414.3 L315 413.4 L325 412.4 L335 411.2 L345 409.9 L355 408.5 L365 406.8 L375 405 L385 402.9 L395 400.7 L405 398.2 L415 395.4 L425 392.4 L435 389.1 L445 385.4 L455 381.5 L465 377.2 L475 372.6 L485 367.6 L495 362.3 L505 356.6 L515 350.5 L525 344.1 L535 337.3 L545 330.1 L555 322.6 L565 314.7 L575 306.6 L585 298.1 L595 289.4 L605 280.4 L615 271.2 L625 261.8 L635 252.4 L645 242.8 L655 233.3 L665 223.7 L675 214.2 L685 204.9 L695 195.8 L705 186.9 L715 178.4 L725 170.2 L735 162.5 L745 155.3 L755 148.6 L765 142.5 L775 137.1 L785 132.3 L795 128.3 L805 125 L815 122.6 L825 120.9 L835 120.1 L845 120.1 L855 120.9 L865 122.6 L875 125 L885 128.3 L895 132.3 L905 137.1 L915 142.5 L925 148.6 L935 155.3 L945 162.5 L955 170.2 L965 178.4 L975 186.9 L985 195.8 L995 204.9 L1005 214.2 L1015 223.7 L1025 233.3 L1035 242.8 L1045 252.4 L1055 261.8 L1065 271.2 L1075 280.4 L1085 289.4 L1095 298.1 L1105 306.6 L1115 314.7 L1125 322.6 L1135 330.1 L1145 337.3 L1155 344.1 L1165 350.5 L1175 356.6 L1185 362.3 L1195 367.6 L1205 372.6 L1215 377.2 L1225 381.5 L1235 385.4 L1245 389.1 L1255 392.4 L1265 395.4 L1275 398.2 L1285 400.7 L1295 402.9 L1305 405 L1315 406.8 L1325 408.5 L1335 409.9 L1345 411.2 L1355 412.4 L1365 413.4 L1375 414.3 L1385 415.1 L1395 415.8 L1405 416.4 L1415 416.9 L1425 417.4 L1435 417.8 L1445 418.1 L1455 418.4 L1465 418.7 L1475 418.9 L1485 419.1 L1495 419.2 L1505 419.3"/>
        <path class="dg-line" d="M175 420H1505"/>
        <path class="dg-line" d="M270 420V434"/><text class="dg-m" x="270" y="470" text-anchor="middle">46</text><path class="dg-line" d="M460 420V434"/><text class="dg-m" x="460" y="470" text-anchor="middle">54</text><path class="dg-line" d="M650 420V434"/><text class="dg-m" x="650" y="470" text-anchor="middle">62</text><path class="dg-line" d="M840 420V434"/><text class="dg-m" x="840" y="470" text-anchor="middle">70</text><path class="dg-line" d="M1030 420V434"/><text class="dg-m" x="1030" y="470" text-anchor="middle">78</text><path class="dg-line" d="M1220 420V434"/><text class="dg-m" x="1220" y="470" text-anchor="middle">86</text><path class="dg-line" d="M1410 420V434"/><text class="dg-m" x="1410" y="470" text-anchor="middle">94</text>
      </g>
      <g data-build="fade" data-order="1"><path class="dg-line" stroke-dasharray="10 8" d="M650 238V420M1030 238V420"/></g>
      <g data-build="draw" data-order="1"><path class="dg-line hot" d="M650 516V544M650 530H1030M1030 516V544"/></g>
      <g data-build="fade" data-order="1"><text class="dg-b" x="840" y="516" text-anchor="middle">about 68%</text></g>
      <g data-build="fade" data-order="2"><path class="dg-line" stroke-dasharray="10 8" d="M460 379.4V420M1220 379.4V420"/></g>
      <g data-build="draw" data-order="2"><path class="dg-line hot" d="M460 576V604M460 590H1220M1220 576V604"/></g>
      <g data-build="fade" data-order="2"><text class="dg-b" x="840" y="576" text-anchor="middle">about 95%</text></g>
      <g data-build="fade" data-order="3"><path class="dg-line" stroke-dasharray="10 8" d="M270 416.7V420M1410 416.7V420"/></g>
      <g data-build="draw" data-order="3"><path class="dg-line hot" d="M270 636V664M270 650H1410M1410 636V664"/></g>
      <g data-build="fade" data-order="3"><text class="dg-b" x="840" y="636" text-anchor="middle">about 99.7%</text></g>
      <g data-build="fade" data-order="4">
        <circle class="dg-dot hot" cx="1220" cy="379.4" r="14"/>
        <text class="dg-b" x="1250" y="309.4">86: z = 2</text>
        <text class="dg-s" x="1250" y="349.4">better than about 97.5%</text>
      </g>
    </svg>
```

**Speaker notes**:

```text
For data with a roughly normal, bell-shaped distribution, there is a handy rule. Here are the exam scores again: mean 70, standard deviation 8.
[click] About 68% of values lie within 1 SD of the mean: between 62 and 78.
[click] About 95% lie within 2 SDs: between 54 and 86.
[click] About 99.7% lie within 3 SDs: between 46 and 94.
[click] So a score of 86, which is z equal to 2, is better than about 97.5% of the class: the 95% in the middle, plus half of the 5% left over, the lower tail.
One warning: the rule only applies to roughly bell-shaped data. It does not apply to strongly skewed data like our commute times.
```

### Slide 23: correlation

Markup **F** (diagram) · `data-id="correlation"` · part file `parts/03-close.html` · 2 min

**Draws**: Click 1: boxes 'Ice-cream sales' and 'Drownings' joined by a dashed line, 'rise and fall together'. Click 2: an accent box 'Hot weather' above, with accent arrows to both boxes and the label 'confounding variable'. Click 3: 'not cause and effect' under the dashed line.

**On-slide text**:

- `{{label}}`: `Correlation is not causation`
- `{{h2}}`: `Ice-cream sales and drownings rise together, but hot weather drives both`
- `{{caption}}`: `Other reasons for a correlation without causation: reverse causation, and coincidence when many variables are searched.`

**Paste into `{{svg}}`**:

```html
<svg viewBox="0 20 1680 470" role="img" aria-label="Ice-cream sales and drownings rise together; hot weather drives both">
      <g data-build="fade" data-order="1">
        <rect class="dg-box" x="80" y="330" width="500" height="120" rx="6"/><text class="dg-t" x="330" y="403" text-anchor="middle">Ice-cream sales</text>
        <rect class="dg-box" x="1100" y="330" width="500" height="120" rx="6"/><text class="dg-t" x="1350" y="403" text-anchor="middle">Drownings</text>
        <text class="dg-s" x="840" y="370" text-anchor="middle">rise and fall together</text>
        <path class="dg-line" stroke-dasharray="12 10" d="M590 390H1090"/>
      </g>
      <g data-build="fade" data-order="2">
        <rect class="dg-hot" x="590" y="40" width="500" height="120" rx="6"/><text class="dg-b" x="840" y="113" text-anchor="middle">Hot weather</text>
        <text class="dg-s" x="840" y="225" text-anchor="middle">confounding variable</text>
      </g>
      <g data-build="draw" data-order="2"><path class="dg-line hot" d="M700 165L400 322M422 306L400 322L428 323M980 165L1280 322M1252 323L1280 322L1258 306"/></g>
      <g data-build="fade" data-order="3"><text class="dg-b" x="840" y="430" text-anchor="middle">not cause and effect</text></g>
    </svg>
```

**Speaker notes**:

```text
The last idea of today. Two variables are associated, or correlated, when they tend to move together.
[click] Across a year, ice-cream sales and drownings rise and fall together. Ask the room: does ice cream cause drowning?
[click] No. Hot weather drives both. Hot weather is a confounding variable: a third variable that affects both of the variables we are studying.
[click] So the link is real, but it is not cause and effect. Other reasons for a correlation without causation are reverse causation, and coincidence, especially when many variables are searched.
Only a randomised experiment, the kind we saw earlier, can show cause and effect.
```

### Slide 24: quiz-1

Markup **L** (quiz) · `data-id="quiz-1"` · part file `parts/03-close.html` · 0.75 min

**On-slide text**:

- `{{label}}`: `Check your understanding · 1 of 6`
- `{{h2}}`: `Is "favourite colour" categorical or numerical, and at what level?`
- `{{option A}}`: `Categorical, nominal`
- `{{option B}}`: `Categorical, ordinal`
- `{{option C}}`: `Numerical, discrete`
- `{{option D}}`: `Numerical, continuous`

**Correct option**: A. Write its line as `<li data-correct>{{option A}}</li>` (the click marks it as the answer); the other three stay `<li>`.

**Speaker notes**:

```text
Give the room about twenty seconds, then [click] to reveal.
Answer: categorical, nominal. Colours are categories with no natural order.
```

### Slide 25: quiz-2

Markup **L** (quiz) · `data-id="quiz-2"` · part file `parts/03-close.html` · 0.75 min

**On-slide text**:

- `{{label}}`: `Check your understanding · 2 of 6`
- `{{h2}}`: `A survey on exercise only asks people leaving a gym. What is the problem?`
- `{{option A}}`: `Response bias from the wording`
- `{{option B}}`: `Selection bias from a convenience sample`
- `{{option C}}`: `Non-response bias`
- `{{option D}}`: `The sample is too small`

**Correct option**: B. Write its line as `<li data-correct>{{option B}}</li>` (the click marks it as the answer); the other three stay `<li>`.

**Speaker notes**:

```text
Give the room a moment, then [click] to reveal.
Answer: selection bias from a convenience sample. Gym-goers exercise more than the population, so the survey overstates how much people exercise. And asking more people at the gym would not help.
```

### Slide 26: quiz-3

Markup **L** (quiz) · `data-id="quiz-3"` · part file `parts/03-close.html` · 0.75 min

**On-slide text**:

- `{{label}}`: `Check your understanding · 3 of 6`
- `{{h2}}`: `Find the mean and median of 2, 4, 4, 5, 10.`
- `{{option A}}`: `Mean 4, median 5`
- `{{option B}}`: `Mean 5, median 5`
- `{{option C}}`: `Mean 5, median 4`
- `{{option D}}`: `Mean 4, median 4`

**Correct option**: C. Write its line as `<li data-correct>{{option C}}</li>` (the click marks it as the answer); the other three stay `<li>`.

**Speaker notes**:

```text
Let them work it out on paper, then [click] to reveal.
Answer: mean 5, median 4. The sum is 25 and there are 5 values, so the mean is 5. The middle of the ordered values is 4. The 10 pulls the mean above the median.
```

### Slide 27: quiz-4

Markup **L** (quiz) · `data-id="quiz-4"` · part file `parts/03-close.html` · 0.75 min

**On-slide text**:

- `{{label}}`: `Check your understanding · 4 of 6`
- `{{h2}}`: `Which is resistant to outliers: the mean or the median?`
- `{{option A}}`: `The mean`
- `{{option B}}`: `The median`
- `{{option C}}`: `Both`
- `{{option D}}`: `Neither`

**Correct option**: B. Write its line as `<li data-correct>{{option B}}</li>` (the click marks it as the answer); the other three stay `<li>`.

**Speaker notes**:

```text
Quick one: hands up for each option, then [click] to reveal.
Answer: the median. Remember the commutes: removing the 76 moved the mean from 26 to about 20.4, but the median only from 21 to 20.
```

### Slide 28: quiz-5

Markup **L** (quiz) · `data-id="quiz-5"` · part file `parts/03-close.html` · 0.75 min

**On-slide text**:

- `{{label}}`: `Check your understanding · 5 of 6`
- `{{h2}}`: `An exam has mean 70 and SD 8. What is the z-score of 82?`
- `{{option A}}`: `1`
- `{{option B}}`: `1.5`
- `{{option C}}`: `2`
- `{{option D}}`: `12`

**Correct option**: B. Write its line as `<li data-correct>{{option B}}</li>` (the click marks it as the answer); the other three stay `<li>`.

**Speaker notes**:

```text
Give them twenty seconds, then [click] to reveal.
Answer: 1.5. z equals 82 minus 70, divided by 8: 12 divided by 8 is 1.5. The score is one and a half standard deviations above the mean. If anyone chose 12, they forgot to divide by the SD.
```

### Slide 29: quiz-6

Markup **L** (quiz) · `data-id="quiz-6"` · part file `parts/03-close.html` · 0.75 min

**On-slide text**:

- `{{label}}`: `Check your understanding · 6 of 6`
- `{{h2}}`: `Ice-cream sales and drownings are correlated. Does ice cream cause drowning?`
- `{{option A}}`: `Yes: the correlation is strong`
- `{{option B}}`: `No: hot weather drives both`
- `{{option C}}`: `Yes: sales come first`
- `{{option D}}`: `No: drowning causes sales`

**Correct option**: B. Write its line as `<li data-correct>{{option B}}</li>` (the click marks it as the answer); the other three stay `<li>`.

**Speaker notes**:

```text
Last question. [click] to reveal.
Answer: no. Hot weather is a confounding variable that drives both. Correlation is not causation.
```

### Slide 30: summary

Markup **H2** (two-column) · `data-id="summary"` · part file `parts/03-close.html` · 1.5 min

**On-slide text**:

- `{{label}}`: `Summary · Next: Module 2, Probability`
- `{{h2}}`: `You can now turn data into conclusions, despite variation`
- `{{column 1 h3}}`: `Collecting data`
- `{{column 1 item 1}}`: `Population → parameter (μ, σ); sample → statistic (x̄, s)`
- `{{column 1 item 2}}`: `Categorical (nominal, ordinal) or numerical (discrete, continuous)`
- `{{column 1 item 3}}`: `Random samples and randomised experiments`
- `{{column 1 item 4}}`: `A bigger biased sample does not help (1936)`
- `{{column 2 h3}}`: `Describing data`
- `{{column 2 item 1}}`: `Always plot first (Anscombe's quartet)`
- `{{column 2 item 2}}`: `Mean is sensitive, median resistant; spread: range, IQR, SD`
- `{{column 2 item 3}}`: `Outliers: below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR`
- `{{column 2 item 4}}`: `z = (x − mean) / SD; bell-shaped: 68–95–99.7`
- `{{column 2 item 5}}`: `Correlation is not causation: look for confounders`

**Speaker notes**:

```text
Here is what you now have. Statistics turns data into conclusions in the presence of variation, and you can now ask the three questions.
Where do the data come from: a population described by parameters, a sample described by statistics, and whether the sample and the study were random. What kind of data are they: categorical or numerical, and at what level.
What do the data say: plot first, then centre and spread, outliers with the 1.5 times IQR rule, z-scores, and the 68, 95, 99.7 rule for bell-shaped data. And never read cause into a correlation without looking for a confounder.
Above all: how data are collected matters more than how much there is. A huge biased sample loses to a small, well-chosen one.
Next time, Module 2: probability, the language of uncertainty. You came in today with no statistics, and you leave able to question the next poll you read. Well done, all of you.
```

## Build steps

Follow these steps in order. Every command is for zsh on this Mac and uses full paths. Do not edit any file inside the skill folder `$S`; it is read-only.

1. **Set the two folders** (run once in each new terminal):

```bash
S="/Users/hishamabuella/Work/Presentation_Claude_SKILL/keynote_html_claude_skill/plugins/present-in-html/skills/present-in-html"
D="$PWD"   # the folder you were started in (it holds PLAN.md)
mkdir -p "$D/parts" "$D/images"
```

2. **Check the tools.** The template the deck is made from is `$S/assets/template.html`; the assemble script in step 6 copies it for you, so do not copy or edit it by hand. The checker needs Playwright, which is already installed in `~/.kp-tools`:

```bash
node --version
ls "$S/assets/template.html"
ls ~/.kp-tools/node_modules/playwright/package.json
```

   If the last line says "No such file", install Playwright outside the skill folder, then continue:

```bash
mkdir -p ~/.kp-tools && cd ~/.kp-tools && npm i playwright && npx playwright install chromium && cd "$D"
```

3. **Write part 1**, `$D/parts/01-opening.html`, with slides 1 to 10. For each slide, in order: copy the markup it names from step 9, replace every `{{slot}}` with the slide's text from "Slides in full", paste its SVG, table, formula or terms where the markup says, and write its notes as one `<p>` per line. The file holds only the ten `<section class="slide">` elements, one after the other: no `<html>`, `<head>`, `<body>`, `<style>` or `<script>`.

4. **Write part 2**, `$D/parts/02-describing.html`, with slides 11 to 20, the same way.

5. **Write part 3**, `$D/parts/03-close.html`, with slides 21 to 30, the same way.

   Before assembling, count: each part must contain exactly ten `<section` lines and ten `<aside class="notes">` lines:

```bash
for f in "$D"/parts/*.html; do echo "$f: $(grep -c "<section " "$f") sections, $(grep -c "<aside class=\"notes\">" "$f") notes"; done
```

6. **Assemble the deck and add the look.** This copies the template, puts the three parts between its slide markers in file-name order, sets the theme, the font pairing and the title, and copies the chalk look and the literata fonts into the file. The `add-look` line repeats the look step on purpose; it is safe to run twice.

```bash
node "$S/scripts/assemble.mjs" "$D/deck.html" "$D/parts/01-opening.html" "$D/parts/02-describing.html" "$D/parts/03-close.html" --theme chalk --fonts literata --title "STATS 101 · Module 1: Data, samples and describing data"
node "$S/scripts/add-look.mjs" "$D/deck.html" --theme chalk --fonts literata
```

   The first command should end with `30 slides from 3 parts`. If it prints `problem:`, fix the part file it names (usually a repeated `data-id` or a stray `<style>`/`<script>`), then run both commands of this step again, and step 7 after them.

7. **Turn on the 50-minute presenter countdown** (macOS `sed`):

```bash
sed -i '' 's/<main class="deck" data-title=/<main class="deck" data-duration="50" data-title=/' "$D/deck.html"
grep -c 'data-duration="50"' "$D/deck.html"
```

   The `grep` must print `1`.

8. **Images (later, when the files exist).** Put the pictures in `$D/images/`. Then, in the deck, replace the empty `<figure></figure>` of that slide with the line below. Until then, leave the figure empty: the theme draws placeholder art and the caption under the text says what belongs there.

   - Slide 2 (`why`): `<figure><img src="images/everyday-statistics.jpg" alt="An opinion poll, a weather forecast and a clinical trial"></figure>`
   - Slide 4 (`snow`): `<figure><img src="images/snow-map-1854.jpg" alt="John Snow's 1854 street map of Soho with each cholera death marked, clustered around the Broad Street pump"></figure>`

9. **Layout markup to copy.** One block per layout the plan uses. Copy the block, then fill it. `{{notes line 1}}`, `{{notes line 2}}` stand for the notes: write one `<p>` per line of the slide's notes block, as many as it has (most slides have 3 to 6). Keep every attribute exactly as shown (`data-layout`, `data-build`, `class`).

   **A. title**, used on slide 1:

```html
<section class="slide" data-layout="title" data-id="{{id}}">
  <p class="label">{{label}}</p>
  <h1>{{h1}}</h1>
  <p class="sub">{{sub}}</p>
  <aside class="notes">
    <p>{{notes line 1}}</p>
    <p>{{notes line 2}}</p>
  </aside>
</section>
```

   **B. image-right**, used on slide 2:

```html
<section class="slide" data-layout="image-right" data-id="{{id}}">
  <figure></figure>
  <p class="label">{{label}}</p>
  <h2>{{h2}}</h2>
  <ul data-build="list">
    <li><strong>{{item 1 lead}}</strong> {{item 1 text}}</li>
    <li><strong>{{item 2 lead}}</strong> {{item 2 text}}</li>
  </ul>
  <p class="src">{{caption}}</p>
  <aside class="notes">
    <p>{{notes line 1}}</p>
    <p>{{notes line 2}}</p>
  </aside>
</section>
```

   **C. image-left**, used on slide 4:

```html
<section class="slide" data-layout="image-left" data-id="{{id}}">
  <figure></figure>
  <p class="label">{{label}}</p>
  <h2>{{h2}}</h2>
  <p>{{paragraph 1}}</p>
  <p>{{paragraph 2}}</p>
  <p class="src">{{caption}}</p>
  <aside class="notes">
    <p>{{notes line 1}}</p>
    <p>{{notes line 2}}</p>
  </aside>
</section>
```

   **D. process**, used on slide 3:

```html
<section class="slide" data-layout="process" data-id="{{id}}">
  <p class="label">{{label}}</p>
  <h2>{{h2}}</h2>
  <ol class="steps" data-build="list">
    <li><h3>{{step 1 h3}}</h3><p>{{step 1 p}}</p></li>
    <li><h3>{{step 2 h3}}</h3><p>{{step 2 p}}</p></li>
    <li><h3>{{step 3 h3}}</h3><p>{{step 3 p}}</p></li>
  </ol>
  <aside class="notes">
    <p>{{notes line 1}}</p>
    <p>{{notes line 2}}</p>
  </aside>
</section>
```

   **E. statement**, used on slide 6:

```html
<section class="slide" data-layout="statement" data-id="{{id}}">
  <p class="label">{{label}}</p>
  <h2>{{h2}}</h2>
  <aside class="notes">
    <p>{{notes line 1}}</p>
    <p>{{notes line 2}}</p>
  </aside>
</section>
```

   **F. diagram**, used on slides 5, 7, 8, 11, 14, 15, 17, 20, 22, 23:

```html
<section class="slide" data-layout="diagram" data-id="{{id}}">
  <p class="label">{{label}}</p>
  <h2>{{h2}}</h2>
  <figure class="dg">
    {{svg}}
    <figcaption>{{caption}}</figcaption>
  </figure>
  <aside class="notes">
    <p>{{notes line 1}}</p>
    <p>{{notes line 2}}</p>
  </aside>
</section>
```

   **G. comparison**, used on slides 9, 13 (slide 13 has no {{label}}: delete the label line there):

```html
<section class="slide" data-layout="comparison" data-id="{{id}}">
  <p class="label">{{label}}</p>
  <h2>{{h2}}</h2>
  {{table}}
  <aside class="notes">
    <p>{{notes line 1}}</p>
    <p>{{notes line 2}}</p>
  </aside>
</section>
```

   **H1. two-column, one paragraph and one list**, used on slide 10:

```html
<section class="slide" data-layout="two-column" data-id="{{id}}">
  <p class="label">{{label}}</p>
  <h2>{{h2}}</h2>
  <div class="col"><h3>{{column 1 h3}}</h3><p>{{column 1 p}}</p></div>
  <div class="col"><h3>{{column 2 h3}}</h3><ul><li>{{column 2 item 1}}</li><li>{{column 2 item 2}}</li><li>{{column 2 item 3}}</li><li>{{column 2 item 4}}</li></ul></div>
  <aside class="notes">
    <p>{{notes line 1}}</p>
    <p>{{notes line 2}}</p>
  </aside>
</section>
```

   **H2. two-column, two lists**, used on slide 30:

```html
<section class="slide" data-layout="two-column" data-id="{{id}}">
  <p class="label">{{label}}</p>
  <h2>{{h2}}</h2>
  <div class="col"><h3>{{column 1 h3}}</h3><ul><li>{{column 1 item 1}}</li><li>{{column 1 item 2}}</li><li>{{column 1 item 3}}</li><li>{{column 1 item 4}}</li></ul></div>
  <div class="col"><h3>{{column 2 h3}}</h3><ul><li>{{column 2 item 1}}</li><li>{{column 2 item 2}}</li><li>{{column 2 item 3}}</li><li>{{column 2 item 4}}</li><li>{{column 2 item 5}}</li></ul></div>
  <aside class="notes">
    <p>{{notes line 1}}</p>
    <p>{{notes line 2}}</p>
  </aside>
</section>
```

   **I. bullets**, used on slide 12:

```html
<section class="slide" data-layout="bullets" data-id="{{id}}">
  <h2>{{h2}}</h2>
  <ul data-build="list">
    <li><strong>{{item 1 lead}}</strong> {{item 1 text}}</li>
    <li><strong>{{item 2 lead}}</strong> {{item 2 text}}</li>
    <li><strong>{{item 3 lead}}</strong> {{item 3 text}}</li>
    <li><strong>{{item 4 lead}}</strong> {{item 4 text}}</li>
    <li><strong>{{item 5 lead}}</strong> {{item 5 text}}</li>
  </ul>
  <aside class="notes">
    <p>{{notes line 1}}</p>
    <p>{{notes line 2}}</p>
  </aside>
</section>
```

   **J. formula**, used on slides 16, 19, 21:

```html
<section class="slide" data-layout="formula" data-id="{{id}}">
  <p class="label">{{label}}</p>
  <h2>{{h2}}</h2>
  {{eq}}
  {{terms}}
  <p class="example">{{example}}</p>
  <aside class="notes">
    <p>{{notes line 1}}</p>
    <p>{{notes line 2}}</p>
  </aside>
</section>
```

   **K. stats**, used on slide 18:

```html
<section class="slide" data-layout="stats" data-id="{{id}}">
  <p class="label">{{label}}</p>
  <h2>{{h2}}</h2>
  <div class="stat" data-build="rise"><b>{{stat 1 number}}<small> {{stat 1 unit}}</small></b><span>{{stat 1 caption}}</span></div>
  <div class="stat" data-build="rise"><b>{{stat 2 number}}<small> {{stat 2 unit}}</small></b><span>{{stat 2 caption}}</span></div>
  <div class="stat" data-build="rise"><b>{{stat 3 number}}<small> {{stat 3 unit}}</small></b><span>{{stat 3 caption}}</span></div>
  <aside class="notes">
    <p>{{notes line 1}}</p>
    <p>{{notes line 2}}</p>
  </aside>
</section>
```

   **L. quiz**, used on slides 24 to 29:

```html
<section class="slide" data-layout="quiz" data-id="{{id}}">
  <p class="label">{{label}}</p>
  <h2>{{h2}}</h2>
  <ol class="opts" data-build="reveal">
    <li>{{option A}}</li>
    <li>{{option B}}</li>
    <li>{{option C}}</li>
    <li>{{option D}}</li>
  </ol>
  <aside class="notes">
    <p>{{notes line 1}}</p>
    <p>{{notes line 2}}</p>
  </aside>
</section>
```

10. **Run the checker and fix until it is clean.**

```bash
node "$S/scripts/check.mjs" "$D/deck.html"
node "$S/scripts/check.mjs" "$D/deck.html" --themes
node "$S/scripts/check.mjs" "$D/deck.html" --shots "$D/shots/"
```

   Each problem prints as `slide n: element, problem, fix:`. Fix the cause in the deck file (or in the part file, then repeat step 6 and 7). Rules:

   - Text overflows or leaves the safe area: you most likely changed the text or skipped a line break in the markup. Compare the slide with "Slides in full" and copy it again. Do not change any CSS, font size or SVG coordinate.
   - `has no title`, `is not a known layout`, `no speaker notes`: an attribute or the `<aside class="notes">` block is mistyped; copy the markup block again.
   - A console error: usually an unclosed tag or a broken SVG paste; paste that slide's SVG again from the plan.
   - After three failing passes on the same slide, stop and report the slide number and the checker line instead of improvising.

   Then open the PNGs in `$D/shots/` and compare them with the **Draws** lines: look at slide 1 (title), 5 (bars), 11 (sampling panels), 17 (dot plot), 20 (box plot), 22 (bell curve), a quiz slide and slide 30. The PNGs show every build at once.

11. **Compare the deck with this plan.**

```bash
node "$S/scripts/check.mjs" "$D/deck.html" --outline
```

   It must list 30 slides with these titles and layouts, in this order, and no `NO NOTES`:

   1. Data, samples and describing data (title)
   2. Statistics draws conclusions from data that vary (image-right)
   3. Three questions run through today's lecture (process)
   4. A map of deaths pointed to one water pump (image-left)
   5. 2.4 million replies lost to 50,000 well-chosen people (diagram)
   6. A huge biased sample is worse than a small, well-chosen one (statement)
   7. We measure a sample to learn about a population (diagram)
   8. Every variable is categorical or numerical (diagram)
   9. 20 kg is twice 10 kg, but 20 °C is not twice as hot as 10 °C (comparison)
   10. Only a randomised experiment can show cause and effect (two-column)
   11. Random methods give everyone a fair chance; convenience does not (diagram)
   12. A bigger sample does not fix bias (bullets)
   13. The type of data picks the graph (comparison)
   14. Always plot the data before computing anything (diagram)
   15. Describe a distribution by its shape, centre and spread (diagram)
   16. The mean shares out the total; the median is the middle (formula)
   17. One long commute pulls the mean, but barely moves the median (diagram)
   18. The range is 64 minutes, but the middle half spans only 12 (stats)
   19. One outlier triples the standard deviation (formula)
   20. The 76-minute commute lies beyond the cut-off: it is an outlier (diagram)
   21. A z-score counts standard deviations from the mean (formula)
   22. In a bell curve, 68% lie within 1 SD, 95% within 2, 99.7% within 3 (diagram)
   23. Ice-cream sales and drownings rise together, but hot weather drives both (diagram)
   24. Is "favourite colour" categorical or numerical, and at what level? (quiz)
   25. A survey on exercise only asks people leaving a gym. What is the problem? (quiz)
   26. Find the mean and median of 2, 4, 4, 5, 10. (quiz)
   27. Which is resistant to outliers: the mean or the median? (quiz)
   28. An exam has mean 70 and SD 8. What is the z-score of 82? (quiz)
   29. Ice-cream sales and drownings are correlated. Does ice cream cause drowning? (quiz)
   30. You can now turn data into conclusions, despite variation (two-column)

12. **Done.** Leave `PLAN.md` and `stats-101-module-1.md` unchanged. Open `$D/deck.html` in Chrome: **F** fullscreen, **P** presenter window with the notes and the 50-minute countdown, **G** overview.
