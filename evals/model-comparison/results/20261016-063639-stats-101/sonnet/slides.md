## Slide 1 [title]

STATS 101 · Module 1
Data, samples and describing data
By the end of this hour you can tell a sample from a population, pick a graph, and explain why correlation is not causation.
First-year course 50 minutes

Notes: Welcome. This is an introductory course: you need only high-school algebra. Today's promise: you will be able to tell a population from a sample, classify variables, spot biased data, choose a graph, calculate and interpret centre and spread, find outliers and z-scores, and explain why correlation does not imply causation. Seven skills in fifty minutes, one idea at a time.

## Slide 2 [agenda]

The plan
Three questions structure this hour
Where do the data come from? populations, samples, study design
What kind of data are they? types of variables
What do the data say? graphs, centre, spread, shape

Notes: Every slide today answers one of these three questions. The label at the top of each slide tells you which. Learning objectives for the module: explain what statistics is for and tell population from sample, parameter from statistic; classify variables and levels of measurement; describe how data are collected and spot bias; choose a graph; calculate and interpret mean, median, mode, range, IQR and standard deviation; find outliers with the 1.5 x IQR rule, compute z-scores and use the 68-95-99.7 rule; and explain why correlation does not imply causation.

## Slide 3 [statement]

Statistics is the science of collecting, describing and drawing conclusions from data.

Notes: Statistics works in the presence of variation and uncertainty: no two students have the same commute, and no sample is a perfect copy of the whole group. Three verbs to remember: collect, describe, conclude. Today is mostly the first two.

## Slide 4 [two-column]

Where do the data come from?
Two branches: describe what we have, or infer beyond it
Descriptive statistics
Summarise the data we have: tables, graphs, averages. Most of this module.
Inferential statistics
Use a sample to draw conclusions about a larger population, with a measure of uncertainty. Later modules.

Notes: Fence: today is not about inference. Everyday examples of statistics: opinion polls, clinical trials of new medicines, sports analytics, weather forecasts, A/B tests on websites. Ask the room: which of these have you met this week? Descriptive statistics summarise; inferential statistics reach beyond the data in hand.

## Slide 5 [image-left, 1 placeholder]

Story 1 · London, 1854
A simple picture of data pointed to the cause
During a cholera outbreak in Soho, John Snow marked each death on a street map. The deaths clustered around one water pump on Broad Street. The pump's handle was removed.
Image placeholder: John Snow's 1854 map of cholera deaths around the Broad Street pump.

Notes: Story one. John Snow, London, 1854, a cholera outbreak in Soho. He marked each death on a street map and the deaths clustered around one water pump on Broad Street. The pump's handle was removed. Describing data with a picture was enough to point to a cause. Replace the placeholder with the map image.

## Slide 6 [stats]

Story 2 · The Literary Digest poll, 1936
A giant poll predicted the wrong winner
10 M ballots mailed, about
2.4 M returned, about
61 % of the popular vote went to Roosevelt, about
46 of 48 states won by Roosevelt

Notes: The magazine mailed about 10 million ballots, drawn largely from telephone directories and car-registration lists, and got about 2.4 million back. It predicted that Alf Landon would beat Franklin D. Roosevelt. Roosevelt won with about 61% of the popular vote and 46 of the 48 states. Ask: with 2.4 million responses, what could possibly go wrong?

## Slide 7 [image-right, 1 placeholder]

Takeaway
A huge biased sample is worse than a small well-chosen one
George Gallup, with a much smaller but better-chosen sample of about 50,000 people, correctly predicted Roosevelt's win. How data are collected matters more than how much there is.
Image placeholder: a 1936 newspaper front page about the Roosevelt landslide.

Notes: First statement of our main idea: how the data are collected matters more than how much there is. Gallup used about 50,000 people and got it right; the Digest used millions and got it wrong. Keep this in mind: we will return to it at the bias slide and in the summary.

## Slide 8 [diagram, 1 diagram]

Where do the data come from?
A sample gives a statistic that estimates the population's parameter
Population
Sample
Parameter: μ, σ
describes the population (usually unknown)
Statistic: x̄, s
computed from the sample
estimates
Memory aid: Population – Parameter; Sample – Statistic.

Notes: Population: the entire group we want to know about, for example all students at the university. Sample: the part we actually collect data from, for example 200 students who answered a survey. A parameter is a number describing the population, usually unknown, written mu for the mean and sigma for the standard deviation. A statistic is computed from the sample to estimate the parameter: x-bar for the mean, s for the standard deviation. Memory aid: P with P, S with S. Click through the four steps.

## Slide 9 [diagram, 1 diagram]

What kind of data are they?
Every variable is categorical or numerical
Variable
Categorical
Numerical
Nominal
no order: blood type, country
Ordinal
natural order: satisfaction, year
Discrete
counts: siblings, goals scored
Continuous
measured: height, time, temperature
Watch out: a postcode or a student ID is categorical; averaging them means nothing.

Notes: Categorical nominal: categories with no order, such as blood type, favourite colour, country. Categorical ordinal: categories with a natural order, such as satisfaction low, medium, high, or year of study. Numerical discrete: counts, whole numbers, such as number of siblings or goals scored. Numerical continuous: measurements on a scale, such as height, time, temperature. Watch out: numbers are not always numerical data. A postcode or student ID is categorical, and averaging them means nothing.

## Slide 10 [comparison]

What kind of data are they?
Levels of measurement decide which arithmetic makes sense
Level Order? Equal intervals? True zero? Example
Nominal no no no eye colour
Ordinal yes no no race finishing position
Interval yes yes no temperature in °C
Ratio yes yes yes weight, income, time

Notes: Why it matters: 20 °C is not "twice as hot" as 10 °C, because temperature in Celsius is interval with no true zero. But 20 kg is twice 10 kg, because weight is ratio. Ask the room which row "year of study" would fall in; earlier we called it ordinal.

## Slide 11 [two-column]

Where do the data come from?
Only an experiment can show cause and effect
Observational study
Researchers observe and measure without assigning treatments, e.g. surveying students about sleep and grades. It can show an association, but not cause and effect.
Experiment
Researchers assign treatments and compare outcomes. Only a well-designed randomised experiment can establish cause and effect.

Notes: The key word is assign. In the sleep and grades survey, nobody assigned sleep, so students who sleep more may differ in many other ways. In an experiment the researchers assign the treatments.

## Slide 12 [process]

Where do the data come from?
A good experiment has four ingredients
Control group
for comparison
Random assignment
groups alike apart from the treatment
Placebo
where possible
Blinding
double-blind: neither subjects nor researchers know who got what

Notes: A control group gives the comparison. Random assignment to groups means the groups are alike apart from the treatment. A placebo is used where possible, and blinding goes further: in a double-blind experiment neither the subjects nor the researchers know who got what.

## Slide 13 [comparison]

Where do the data come from?
Random sampling methods beat convenience
Method How it works Example
Simple random every group of n has the same chance draw 100 student IDs
Stratified random sample from each stratum 25 students per year
Cluster randomly choose whole groups pick 5 lecture sections
Systematic every k-th after a random start every 20th name on a list
Convenience whoever is easiest: avoid friends in the cafeteria

Notes: Four random methods and one to avoid. Simple random: every group of n individuals has the same chance of being chosen. Stratified: split into groups called strata and take a random sample from each. Cluster: split into groups and randomly choose whole groups. Systematic: choose every k-th individual from a list after a random start. Convenience: whoever is easiest to reach, not random, avoid.

## Slide 14 [bullets]

Four ways a sample can mislead
Selection bias. Part of the population is left out.
Non-response bias. Non-responders differ from responders.
Response bias. Wording pushes people to an answer.
Voluntary response bias. Only strong opinions volunteer.

Notes: Bias is a systematic error that pushes results away from the truth in one direction. Selection bias: the Literary Digest's phone and car lists left out poorer voters in 1936. Response bias example wording: "Don't you agree that...?" Voluntary response: online polls and call-in shows.

## Slide 15 [statement]

A bigger sample does not fix bias. It only makes a biased answer look more precise .

Notes: Second statement of the main idea, in different words: collection beats quantity. This is the Literary Digest lesson in one line. Fence: bigger is not automatically better.

## Slide 16 [comparison]

What do the data say?
The type of data picks the graph
Data Graph What it shows
One categorical variable bar chart (or pie chart) counts or percentages per category
One numerical variable histogram shape of the distribution
One numerical variable box plot five-number summary and outliers
Two numerical variables scatter plot direction, form, strength
A variable over time line graph trends

Notes: Rule: always plot the data before computing anything. Each row pairs a type of data with the graph that shows it. Ask the room: which graph for the number of siblings each of you has? Answer: a histogram for a numerical variable.

## Slide 17 [diagram, 1 diagram]

What do the data say?
Same summary numbers, four completely different pictures
straight-line cloud
a curve
one outlier
one far point
Anscombe's quartet (1973): 11 points each; mean of x = 9, mean of y about 7.50, correlation about 0.816, line y = 3 + 0.5x. Sketch of the four shapes.

Notes: Anscombe's quartet, 1973: four small data sets of 11 points each with almost the same mean of x (9), mean of y (about 7.50), correlation (about 0.816) and regression line (y = 3 + 0.5x). Yet the scatter plots are completely different: one straight-line cloud, one curve, one line with a single outlier, and one vertical stack with one far point. The panels here are schematic sketches of those four shapes, not the actual data. Summary numbers can hide the story, so always plot first.

## Slide 18 [diagram, 1 diagram]

What do the data say?
Describe every distribution by shape, centre, spread and unusual features
Symmetric
Skewed right
Bimodal
Skewed left is the mirror image of skewed right. Centre: the typical value. Spread: how much values vary. Unusual: outliers, gaps.

Notes: Shape: symmetric, skewed right with a long tail to the right (for example incomes), or skewed left; one peak is unimodal, two peaks is bimodal. Then centre, spread, and unusual features such as outliers and gaps. The curves are schematic.

## Slide 19 [stats]

What do the data say? · Centre
Ten commute times: mean 26, median 21, mode 15
12, 15, 15, 18, 20, 22, 25, 27, 30, 76 minutes
26 min Mean: sum 260 ÷ n = 10
21 min Median: middle values 20 and 22
15 min Mode: appears twice

Notes: Mean: add the values and divide by how many, x-bar = sum of x over n. Median: the middle value of the ordered data, the average of the two middle values if n is even. Mode: the most frequent value. Work it through: sum is 260, n is 10, so mean 26. The ordered middle values are 20 and 22, so median 21. The mode is 15 because it appears twice.

## Slide 20 [chart]

What do the data say? · Centre
One outlier drags the mean but barely moves the median
Remove the 76-minute commute: the mean drops from 26 to about 20.4, the median only from 21 to 20.
Commute example, 10 students
With 76 Without 76
Mean 26 20.4
Median 21 20

Notes: The median is resistant to outliers; the mean is not. In a right-skewed distribution the mean is pulled above the median; in a left-skewed one, below. Use the median for skewed data such as house prices and incomes, and the mean for roughly symmetric data.

## Slide 21 [stats]

What do the data say? · Spread
Range is fragile; IQR and SD tell the spread better
64 min Range: 76 − 12, very sensitive to outliers
12 min IQR: Q3 − Q1 = 27 − 15, the middle 50%
18.5 min Standard deviation s, about

Notes: Range is maximum minus minimum. Quartiles: Q1 is the median of the lower half, 12, 15, 15, 18, 20, so Q1 = 15; Q3 is the median of the upper half, 22, 25, 27, 30, 76, so Q3 = 27. IQR is Q3 minus Q1 = 12 minutes, the spread of the middle 50%. The standard deviation is roughly the typical distance of values from the mean: variance about 341.3, s about 18.5 minutes. Without the 76-minute value, s is about 6.1: one outlier triples the SD.

## Slide 22 [formula]

What do the data say? · Spread
The standard deviation is the typical distance from the mean
s = √( Σ( x − x )² / ( n − 1) )
x the sample mean
n how many values; we divide by n − 1 for a sample

Notes: We divide by n minus 1, not n, for a sample; this corrects for the sample mean being closer to the data than the true mean. For the commute example the variance is about 341.3 and s is about 18.5 minutes; without the 76, s is about 6.1.

## Slide 23 [diagram, 1 diagram]

What do the data say? · Outliers
The 1.5 × IQR rule flags the 76-minute commute as an outlier
0
20
40
60
80
commute time (minutes)
Q1 15
median 21
Q3 27
12
30
fence 45
76: outlier
Five-number summary: 12, 15, 21, 27, 76. Fences: 15 − 18 = −3 and 27 + 18 = 45 (1.5 × 12 = 18).

Notes: Five-number summary: minimum, Q1, median, Q3, maximum, here 12, 15, 21, 27, 76. A value is a suspected outlier if it is below Q1 minus 1.5 times IQR or above Q3 plus 1.5 times IQR. Here 1.5 times 12 is 18, so the fences are minus 3 and 45. The 76 lies beyond 45, so it is an outlier. A box plot draws the box from Q1 to Q3 with a line at the median, whiskers to the most extreme values that are not outliers (12 and 30), and outliers as separate dots (76).

## Slide 24 [formula]

What do the data say? · How unusual?
A z-score counts standard deviations from the mean
z = ( x − mean) / SD
+ / − above or below the mean
use compare values on different scales
Exam: mean 70, SD 8. Score 86 → z = (86 − 70) / 8 = 2

Notes: A z-score says how many standard deviations a value is above (plus) or below (minus) the mean. The exam has mean 70 and SD 8; a score of 86 has z = 2, two SDs above the mean. z-scores let us compare values on different scales, for example a score on a hard test versus an easy one.

## Slide 25 [diagram, 1 diagram]

What do the data say? · Bell-shaped data
For bell-shaped data, 68%, 95% and 99.7% lie within 1, 2 and 3 SDs
46
54
62
70
78
86
94
68%
95%
99.7%
Exam, mean 70, SD 8: 62–78, 54–86, 46–94. A score of 86 (z = 2) beats about 97.5% of the class. Not for skewed data like the commutes.

Notes: The 68-95-99.7 rule applies to roughly normal, bell-shaped distributions: about 68% of values lie within 1 SD of the mean, about 95% within 2 SDs, about 99.7% within 3 SDs. Exam example, mean 70, SD 8: about 68% of scores between 62 and 78, about 95% between 54 and 86, about 99.7% between 46 and 94. A score of 86 is better than about 97.5% of the class. The rule does not apply to strongly skewed data like the commute times.

## Slide 26 [diagram, 1 diagram]

What do the data say? · Caution
Correlation is not causation: look for the confounder
Hot weather
the confounding variable
Ice-cream sales
Drownings
rise and fall together
but no cause and effect
Other reasons: reverse causation, coincidence (especially when many variables are searched). Only a randomised experiment shows cause and effect.

Notes: Two variables are associated, or correlated, when they tend to move together. Across a year, ice-cream sales and drownings rise and fall together. Ice cream does not cause drowning; hot weather drives both. Hot weather is a confounding variable, a third variable that affects both variables being studied. Other reasons for a correlation without causation: reverse causation and coincidence, especially when many variables are searched. Only a randomised experiment, from earlier, can show cause and effect. Ask the room for another confounder example.

## Slide 27 [rows]

Check your understanding · 1 of 2
Quiz: data, bias and centre
Is "favourite colour" categorical or numerical, and at what level?
Categorical, nominal
A survey about exercise only asks people leaving a gym. What is the problem?
Selection bias from a convenience sample; gym-goers exercise more than the population
Find the mean and median of 2, 4, 4, 5, 10.
Mean 5, median 4

Notes: Give the room a minute per question before each click reveals the answer. Q1: categorical, nominal. Q2: selection bias from a convenience sample; gym-goers exercise more than the population. Q3: mean 5, median 4.

## Slide 28 [rows]

Check your understanding · 2 of 2
Quiz: resistance, z-scores and causation
Which is resistant to outliers: the mean or the median?
The median
Exam mean 70, SD 8. What is the z-score of 82?
1.5
Ice-cream sales and drownings are correlated. Does ice cream cause drowning?
No; hot weather is a confounding variable

Notes: Q4: the median. Q5: z = (82 − 70) / 8 = 1.5. Q6: no; hot weather is a confounding variable.

## Slide 29 [two-column]

Summary
Collect well, plot first, then summarise
Data
Data become conclusions amid variation
Population → μ, σ; sample → x̄, s
Categorical or numerical
Collection
Random samples, randomised experiments
Bigger biased samples do not help
Always plot first
Describing
Mean vs median; range, IQR, SD
Outliers: 1.5 × IQR rule
z-scores; 68–95–99.7
Correlation is not causation

Notes: Third statement of the main idea: how data are collected matters most, then plot first, then summarise with centre and spread, and look for confounders before claiming causation. You now can explain what statistics is for, classify variables, spot bias, choose a graph, compute centre and spread, find outliers and z-scores, and say why correlation is not causation. Next module, Module 2: Probability, the language of uncertainty. Go well, and see you there.
