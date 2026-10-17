# STATS 101 — Module 1: Data, Samples and Describing Data

**Course:** STATS 101 (introductory, first-year undergraduate, no prior statistics)
**Class length:** 50 minutes
**Prerequisites:** high-school algebra

## Learning objectives

By the end of this module students can:

1. Explain what statistics is for and tell a population from a sample, and a parameter from a statistic.
2. Classify variables (categorical or numerical) and their level of measurement.
3. Describe how data are collected (observational study or experiment, sampling methods) and spot common biases.
4. Choose a suitable graph for a variable.
5. Calculate and interpret measures of centre (mean, median, mode) and spread (range, IQR, standard deviation).
6. Find outliers with the 1.5 × IQR rule, compute z-scores and use the 68–95–99.7 rule.
7. Explain why correlation does not imply causation.

---

## 1. Why statistics?

- Statistics is the science of **collecting, describing and drawing conclusions from data** in the presence of variation and uncertainty.
- Two branches:
  - **Descriptive statistics** summarise the data we have (tables, graphs, averages). Most of this module.
  - **Inferential statistics** use a sample to draw conclusions about a larger population, with a measure of uncertainty. Later modules.
- Everyday examples: opinion polls, clinical trials of new medicines, sports analytics, weather forecasts, A/B tests on websites.
- The three questions that structure this module:
  1. **Where do the data come from?** (populations, samples, study design)
  2. **What kind of data are they?** (types of variables)
  3. **What do the data say?** (graphs, centre, spread, shape)

## 2. Two stories about data

**John Snow, London, 1854.** During a cholera outbreak in Soho, Snow marked each death on a street map. The deaths clustered around one water pump on Broad Street. The pump's handle was removed. A simple picture of data pointed to the cause.

**The Literary Digest poll, 1936.** The magazine mailed about 10 million ballots, drawn largely from telephone directories and car-registration lists, and got about 2.4 million back. It predicted that Alf Landon would beat Franklin D. Roosevelt. Roosevelt won with about 61% of the popular vote and 46 of the 48 states. George Gallup, with a much smaller but better-chosen sample (about 50,000 people), correctly predicted Roosevelt's win.

Takeaway: **a huge biased sample is worse than a small well-chosen one.** How data are collected matters more than how much there is.

## 3. Population, sample, parameter, statistic

- **Population**: the entire group we want to know about (e.g. all students at the university).
- **Sample**: the part of the population we actually collect data from (e.g. 200 students who answered a survey).
- **Parameter**: a number describing the population (usually unknown). Notation: population mean **μ**, population standard deviation **σ**.
- **Statistic**: a number computed from the sample, used to estimate the parameter. Notation: sample mean **x̄**, sample standard deviation **s**.
- Memory aid: **P**opulation – **P**arameter; **S**ample – **S**tatistic.

## 4. Types of variables

| Type | Subtype | What it is | Examples |
|---|---|---|---|
| Categorical | Nominal | categories with no order | blood type, favourite colour, country |
| Categorical | Ordinal | categories with a natural order | satisfaction (low/medium/high), year of study |
| Numerical | Discrete | counts, whole numbers | number of siblings, goals scored |
| Numerical | Continuous | measurements on a scale | height, time, temperature |

Watch out: numbers are not always numerical data. A postcode or a student ID is categorical; averaging them means nothing.

## 5. Levels of measurement

| Level | Order? | Equal intervals? | True zero? | Example |
|---|---|---|---|---|
| Nominal | no | no | no | eye colour |
| Ordinal | yes | no | no | race finishing position |
| Interval | yes | yes | no | temperature in °C |
| Ratio | yes | yes | yes | weight, income, time |

Why it matters: 20 °C is not "twice as hot" as 10 °C (interval, no true zero), but 20 kg is twice 10 kg (ratio).

## 6. Collecting data: observational studies and experiments

- **Observational study**: researchers observe and measure without assigning treatments (e.g. surveying students about sleep and grades). It can show an association, but not cause and effect.
- **Experiment**: researchers **assign** treatments and compare outcomes. Good experiments use:
  - a **control group** for comparison,
  - **random assignment** to groups, so the groups are alike apart from the treatment,
  - a **placebo** where possible, and **blinding** (double-blind: neither subjects nor researchers know who got what).
- Only a well-designed randomised experiment can establish **cause and effect**.

## 7. Sampling methods

| Method | How it works | Example |
|---|---|---|
| Simple random sample | every group of n individuals has the same chance of being chosen | draw 100 student IDs at random |
| Stratified sample | split into groups (strata), take a random sample from each | 25 students from each year of study |
| Cluster sample | split into groups, randomly choose whole groups | randomly pick 5 lecture sections, survey everyone in them |
| Systematic sample | choose every k-th individual from a list after a random start | every 20th name on the class list |
| Convenience sample | whoever is easiest to reach (**not random; avoid**) | asking friends in the cafeteria |

## 8. Bias: when samples mislead

- **Selection bias**: the way the sample is chosen leaves out part of the population (the Literary Digest's phone and car lists left out poorer voters in 1936).
- **Non-response bias**: the people who don't respond differ from those who do.
- **Response bias**: the question wording or setting pushes people towards an answer ("Don't you agree that…?").
- **Voluntary response bias**: only people with strong opinions choose to take part (online polls, call-in shows).
- A bigger sample does **not** fix bias; it only makes a biased answer look more precise.

## 9. Graphs: picking the right one

| Data | Graph | What it shows |
|---|---|---|
| One categorical variable | bar chart (or pie chart) | counts or percentages per category |
| One numerical variable | histogram | shape of the distribution |
| One numerical variable | box plot | five-number summary and outliers |
| Two numerical variables | scatter plot | relationship (direction, form, strength) |
| A variable over time | line graph | trends |

Rule: **always plot the data before computing anything.**

**Anscombe's quartet (1973):** four small data sets (11 points each) with almost the same mean of x (9), mean of y (about 7.50), correlation (about 0.816) and regression line (y = 3 + 0.5x), yet completely different scatter plots: one straight-line cloud, one curve, one line with a single outlier, one vertical stack with one far point. Summary numbers can hide the story.

## 10. Describing a distribution: shape, centre, spread

Every description of a numerical variable covers:

- **Shape**: symmetric, skewed right (long tail to the right, e.g. incomes), skewed left; one peak (unimodal) or two (bimodal).
- **Centre**: where the typical value is.
- **Spread**: how much values vary.
- **Unusual features**: outliers, gaps.

## 11. Measures of centre

- **Mean**: add the values and divide by how many. x̄ = Σx / n
- **Median**: the middle value of the ordered data (average of the two middle values if n is even).
- **Mode**: the most frequent value.

**Worked example.** Commute times (minutes) for 10 students:

> 12, 15, 15, 18, 20, 22, 25, 27, 30, 76

- Sum = 260, n = 10 → **mean = 26 minutes**
- Ordered middle values are 20 and 22 → **median = 21 minutes**
- **Mode = 15 minutes** (appears twice)

Remove the 76-minute commute: the mean drops to about **20.4**, the median only to **20**.

- The median is **resistant** to outliers; the mean is not.
- In a right-skewed distribution the mean is pulled above the median (mean > median); in a left-skewed one, below.
- Use the median for skewed data (house prices, incomes); the mean for roughly symmetric data.

## 12. Measures of spread

- **Range** = maximum − minimum. Commute example: 76 − 12 = **64 minutes**. Very sensitive to outliers.
- **Quartiles**: Q1 is the median of the lower half, Q3 the median of the upper half.
  Commute example: lower half 12, 15, 15, 18, 20 → **Q1 = 15**; upper half 22, 25, 27, 30, 76 → **Q3 = 27**.
- **Interquartile range (IQR)** = Q3 − Q1 = 27 − 15 = **12 minutes**: the spread of the middle 50%.
- **Standard deviation (s)**: roughly the typical distance of values from the mean.

> s = √( Σ(x − x̄)² / (n − 1) )

  Commute example: variance ≈ 341.3, **s ≈ 18.5 minutes**. Without the 76-minute value, s ≈ 6.1: one outlier triples the SD.
- We divide by n − 1 (not n) for a sample; this corrects for the sample mean being closer to the data than the true mean.

## 13. The five-number summary, box plots and outliers

- **Five-number summary**: minimum, Q1, median, Q3, maximum.
  Commute example: 12, 15, 21, 27, 76.
- **1.5 × IQR rule** for outliers: a value is a suspected outlier if it is below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR.
  Commute example: 1.5 × 12 = 18; fences are 15 − 18 = **−3** and 27 + 18 = **45**. The **76-minute commute is an outlier**.
- A **box plot** draws the box from Q1 to Q3 with a line at the median, whiskers to the most extreme values that are not outliers (here 12 and 30), and outliers as separate dots (here 76).

## 14. z-scores: how unusual is a value?

> z = (x − mean) / standard deviation

- A z-score says how many standard deviations a value is above (+) or below (−) the mean.
- Example: an exam has mean 70 and SD 8. A score of 86 has z = (86 − 70) / 8 = **2**: two SDs above the mean.
- z-scores let us compare values on different scales (e.g. a score on a hard test vs an easy one).

## 15. The 68–95–99.7 rule

For data with a roughly **normal (bell-shaped)** distribution:

- about **68%** of values lie within 1 SD of the mean,
- about **95%** within 2 SDs,
- about **99.7%** within 3 SDs.

Exam example (mean 70, SD 8): about 68% of scores between **62 and 78**, about 95% between **54 and 86**, about 99.7% between **46 and 94**. A score of 86 (z = 2) is better than about 97.5% of the class.

The rule only applies to roughly bell-shaped data; it does not apply to strongly skewed data like the commute times.

## 16. Correlation is not causation

- Two variables are **associated** (correlated) when they tend to move together.
- Classic example: across a year, **ice-cream sales and drownings rise and fall together**. Ice cream does not cause drowning; **hot weather** drives both. Hot weather is a **confounding variable**.
- Other reasons for a correlation without causation: reverse causation, coincidence (especially when many variables are searched).
- Only a randomised experiment (Section 6) can show cause and effect.

## 17. Summary

1. Statistics turns data into conclusions in the presence of variation.
2. Population → parameter (μ, σ); sample → statistic (x̄, s).
3. Variables are categorical (nominal, ordinal) or numerical (discrete, continuous).
4. How data are collected matters most: random sampling and randomised experiments; bigger biased samples do not help (Literary Digest 1936).
5. Always plot first (Anscombe's quartet).
6. Centre: mean (sensitive) vs median (resistant). Spread: range, IQR, SD.
7. Outliers: beyond Q1 − 1.5 × IQR or Q3 + 1.5 × IQR.
8. z = (x − mean) / SD; for bell-shaped data, 68–95–99.7.
9. Correlation is not causation; look for confounders.

**Next module (Module 2):** Probability — the language of uncertainty.

## 18. Check your understanding (quiz)

1. Is "favourite colour" categorical or numerical, and at what level? *(Answer: categorical, nominal)*
2. A survey about exercise habits only asks people leaving a gym. What is the problem? *(Answer: selection bias from a convenience sample; gym-goers exercise more than the population)*
3. Find the mean and median of 2, 4, 4, 5, 10. *(Answer: mean 5, median 4)*
4. Which is resistant to outliers: the mean or the median? *(Answer: the median)*
5. An exam has mean 70 and SD 8. What is the z-score of 82? *(Answer: 1.5)*
6. Ice-cream sales and drownings are correlated. Does ice cream cause drowning? *(Answer: no; hot weather is a confounding variable)*

## Glossary

- **Bias** — a systematic error that pushes results away from the truth in one direction.
- **Confounding variable** — a third variable that affects both variables being studied.
- **IQR** — interquartile range, Q3 − Q1.
- **Outlier** — a value far from the rest of the data.
- **Parameter** — a number describing a population.
- **Statistic** — a number computed from a sample.
- **Standard deviation** — a measure of the typical distance of values from the mean.
- **z-score** — the number of standard deviations a value lies from the mean.
