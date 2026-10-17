## Slide 1 [title]

STATS 101 · Module 1
Data, samples and describing data
By the end you can tell a population from a sample, choose a graph, describe a data set, find its outliers, and explain why correlation is not causation.
Lecture, 50 minutes First year, no statistics background

Notes: (About 1 minute.) Welcome. Read the promise on screen aloud: these are the module's learning objectives in plain words. Say that no statistics is needed, only high-school algebra. Set the tone: data are messy, and the job is to look at them carefully before trusting any number.

## Slide 2 [agenda]

Three questions, then a quiz
Where do the data come from? about 15 min
What kind of data are they? about 7 min
What do the data say? about 22 min
Quiz and summary about 5 min

Notes: (About 1 minute.) The module is organised around three questions: where the data come from, what kind of data they are, and what they say. Those three questions return as the three parts of the lecture. Times add up to about 50 minutes, with the quiz at the end so everyone can check their understanding before the summary.

## Slide 3 [statement]

Why statistics?
Statistics is the science of collecting, describing and drawing conclusions from data.
It works in the presence of variation and uncertainty.

Notes: (About 2 minutes.) This is the main idea, first of three times we say it. Give the everyday examples from the module: opinion polls, clinical trials of new medicines, sports analytics, weather forecasts, and A/B tests on websites. Then name the two branches. Descriptive statistics summarises the data we have, with tables, graphs and averages; most of this module is descriptive. Inferential statistics uses a sample to draw conclusions about a larger population, with a measure of uncertainty; that comes in later modules.

## Slide 4 [image-left, 1 placeholder]

Image placeholder: John Snow's 1854 street map of Soho, with each cholera death marked as a dot and the Broad Street pump
Part 1 · Where do the data come from?
A map of deaths pointed to the cause
In 1854 John Snow marked each cholera death on a street map. The deaths clustered around one water pump on Broad Street. The pump's handle was removed.

Notes: (About 2 minutes.) This is the first of two stories. The lesson is that a simple picture of the data pointed to the cause. Snow did not start with a formula; he plotted the deaths and looked. That is the first habit of this module: plot the data before computing anything. Use the image placeholder for Snow's map; a public-domain reproduction is fine, and check the licence before using it.

## Slide 5 [image-right, 1 placeholder]

Image placeholder: the Literary Digest magazine, 1936 issue (cover or masthead)
Part 1 · Where do the data come from?
A huge biased sample is worse than a small, good one
1936: about 10 million ballots mailed, about 2.4 million returned.
Drawn largely from telephone directories and car-registration lists.
It predicted Landon would beat Roosevelt. Roosevelt won about 61% of the popular vote.
George Gallup's sample of about 50,000 correctly predicted Roosevelt's win.

Notes: (About 2 minutes.) The Literary Digest mailed about 10 million ballots and got about 2.4 million back, and its prediction was wrong. Its list came mostly from telephone directories and car-registration lists, which left out poorer voters. Gallup used a much smaller sample, about 50,000 people, chosen better, and was right. Takeaway: how data are collected matters more than how much there is. Repeat it: a huge biased sample is worse than a small well-chosen one.

## Slide 6 [diagram, 1 diagram]

Part 1 · Vocabulary
We want to know the population; we only measure a sample
Population
all students at the university
parameter: μ, σ
a number about the population, usually unknown
Sample
200 students who answered a survey
statistic: x̄, s
a number computed from the sample
used to estimate
Population: the whole group. Sample: the part we collected data from.

Notes: (About 2 minutes.) Three clicks: the population, then the sample, then the arrow. A population is the entire group we want to know about. A sample is the part we actually collected data from. A parameter describes the population and is usually unknown; a statistic is computed from the sample and used to estimate the parameter. Notation: population mean μ and population standard deviation σ; sample mean x̄ and sample standard deviation s. Memory aid: Population goes with Parameter, Sample goes with Statistic.

## Slide 7 [diagram, 1 diagram]

Part 1 · Sampling
Random samples spread across the population; convenience samples clump
Simple random
every person has the same chance
Convenience
whoever is easiest to reach
Illustrative dot grids, not real data. Each dot is one person; the bright dots are the sample.

Notes: (About 1.5 minutes.) Each grid stands for a population, and the bright dots are the sample. On the left, the sample was chosen by chance, so it is spread across the whole population. On the right, the sample is whoever was easiest to reach, so it clumps in one corner. Ask the room: which picture is more like the population? The next slide names the five sampling methods.

## Slide 8 [comparison]

Part 1 · Sampling methods
Four methods use chance; convenience sampling is the one to avoid
How it works Example
Simple random every n-person group has the same chance 100 student IDs drawn at random
Stratified random sample from each group 25 students from each year
Cluster random whole groups 5 lecture sections, all surveyed
Systematic every k-th after a random start every 20th name on the list
Convenience not random: avoid asking friends in the cafeteria

Notes: (About 2 minutes.) Go row by row. Simple random: every group of n individuals has the same chance of being chosen. Stratified: split the population into groups, called strata, and sample from each. Cluster: randomly choose whole groups and survey everyone in them. Systematic: take every k-th individual from a list after a random start. Convenience: whoever is easiest to reach. It is not random, so avoid it. The cafeteria example is the one to remember.

## Slide 9 [rows]

Part 1 · Bias
Bias: four ways a sample misleads, and size fixes none of them
Selection bias
The way the sample is chosen leaves out part of the population.
Non-response bias
The people who do not respond differ from those who do.
Response bias
Question wording or setting pushes people towards an answer.
Voluntary response bias
Only people with strong opinions choose to take part.
A bigger sample does not fix bias
It only makes a biased answer look more precise.

Notes: (About 2 minutes.) Selection bias: the Literary Digest's phone and car lists left out poorer voters in 1936. Non-response bias: the people who do not answer differ from those who do. Response bias: a question such as "Don't you agree that...?" pushes people. Voluntary response bias: online polls and call-in shows hear mainly from people with strong opinions. Fence this idea: a bigger sample does not fix bias. It only makes a biased answer look more precise.

## Slide 10 [rows]

Part 1 · Study design
Only a randomised experiment can show cause and effect
Observational study
Researchers observe without assigning treatments, e.g. surveying students about sleep and grades. It shows association, not cause and effect.
Experiment
Researchers assign the treatments and compare outcomes, with a control group, random assignment, and a placebo and blinding where possible.

Notes: (About 2 minutes.) The key difference: in an observational study the researchers only observe; in an experiment they assign treatments and compare outcomes. Good experiments use a control group, random assignment, a placebo where possible, and blinding. Double-blind means neither the subjects nor the researchers know who got which treatment. This is the second of three times we say the main idea: only a well-designed randomised experiment can establish cause and effect.

## Slide 11 [diagram, 1 diagram]

Part 2 · Types of variables
Every variable is either categorical or numerical
Variable
Categorical
Numerical
Nominal
blood type,
country
Ordinal
satisfaction,
year of study
Discrete
number of siblings,
goals scored
Continuous
height, time,
temperature
Watch out: numbers are not always numerical. A postcode or a student ID is categorical; averaging it means nothing.

Notes: (About 2 minutes.) Build the tree from the top. First question: is the variable categorical, meaning it puts people into groups, or numerical, meaning it is a measurement or a count? Categorical splits into nominal, which have no order, and ordinal, which have a natural order. Numerical splits into discrete, which are counts of whole numbers, and continuous, which are measurements on a scale. Ask the room for one example of each before revealing the examples. Stress the watch-out: a student ID is a number but it is categorical.

## Slide 12 [comparison]

Part 2 · Levels of measurement
Only ratio data have order, equal intervals and a true zero
Nominal Ordinal Interval Ratio
Order? no yes yes yes
Equal intervals? no no yes yes
True zero? no no no yes
Example eye colour race finishing position temperature in °C weight, income, time

Notes: (About 2 minutes.) Walk across the columns. Nominal: categories with no order, such as eye colour. Ordinal: order, but the gaps are not equal, such as race finishing position. Interval: order and equal intervals, but no true zero, such as temperature in degrees Celsius. Ratio: all three, such as weight, income or time. The next slide shows why the true zero matters.

## Slide 13 [statement]

Why it matters
20 °C is not twice as hot as 10 °C. 20 kg is twice 10 kg.
Interval data have no true zero; ratio data do.

Notes: (About 1 minute.) This is the reason the levels matter. Temperature in degrees Celsius is an interval scale: zero degrees is not the absence of temperature, so 20 °C is not twice as hot as 10 °C. Weight is a ratio scale: zero kilograms is no weight at all, so 20 kg really is twice 10 kg. Before you say that a value is twice another, check the level of measurement.

## Slide 14 [comparison]

Part 3 · Graphs
Plot before you compute, using the graph that fits the variable
Data Graph What it shows
Categorical bar chart or pie chart counts or percentages
Numerical histogram shape of the distribution
Numerical box plot five-number summary, outliers
Two numerical scatter plot direction, form, strength
Over time line graph trends

Notes: (About 1.5 minutes.) Read the table as a lookup. Match the kind of variable to the graph, then to what it shows. The rule underneath is the most important line in this part: always plot the data before computing anything. The box plot is the graph we use for outliers later in the lecture.

## Slide 15 [stats]

Part 3 · Always plot first
Same summary numbers, four completely different pictures
9 mean of x in each data set
7.50 mean of y, about
0.816 correlation, about
0.5 slope of the regression line, y = 3 + 0.5x
Anscombe's quartet (1973): four data sets of 11 points each

Notes: (About 2 minutes.) Anscombe's quartet is four small data sets with almost the same summary numbers: the same mean of x, the same mean of y, the same correlation and the same regression line. Their scatter plots are completely different: one is a straight-line cloud, one is a curve, one is a line with a single outlier, and one is a vertical stack with one far point. Summary numbers can hide the story, so plot first.

## Slide 16 [diagram, 1 diagram]

Part 3 · Shape and centre
Right skew pulls the mean above the median
mean = median
median
mean
Symmetric
Right-skewed: long tail to the right
Illustrative curves. In a right-skewed distribution the mean is above the median; in a left-skewed one it is below. Use the median for skewed data such as incomes.

Notes: (About 2 minutes.) Every numerical distribution is described by its shape, centre, spread and unusual features. The left curve is roughly symmetric, so the mean and median coincide. The right curve has a long tail to the right, as incomes do; the tail pulls the mean up above the median. These curves are illustrations of shape only, with no data behind them.

## Slide 17 [formula]

Part 3 · Centre
The mean shares out the total; the median takes the middle
x̄ = Σ x / n
Σ x add all the values
n how many values
Median middle of the ordered data; average the two middle values if n is even
Mode the most frequent value

Notes: (About 2 minutes.) The mean is x̄ = Σx / n: add the values and divide by how many there are. The median is the middle value of the ordered data, and when n is even it is the average of the two middle values. The mode is the most frequent value. Next we apply all three to ten real commute times.

## Slide 18 [stats]

Worked example · commute times
Ten commutes give three different centres
26 min mean: 260 ÷ 10
21 min median: average of 20 and 22
15 min mode: appears twice
Commute times in minutes, 10 students: 12, 15, 15, 18, 20, 22, 25, 27, 30, 76

Notes: (About 2 minutes.) Work it on the board with the class. The values sum to 260, so the mean is 26 minutes. Sorted, the two middle values are 20 and 22, so the median is 21. The mode is 15, the only value that appears twice. Point out the 76: it is the reason the mean sits above most of the commutes.

## Slide 19 [comparison]

Part 3 · Outliers and centre
One 76-minute commute moves the mean, but barely the median
All ten commutes Without the 76
Mean 26 min about 20.4 min
Median 21 min 20 min

Notes: (About 1.5 minutes.) Remove the 76-minute commute and the mean drops from 26 to about 20.4, while the median only drops from 21 to 20. The median is resistant to outliers; the mean is not. In a right-skewed distribution the mean is pulled above the median, and for skewed data such as house prices or incomes, use the median.

## Slide 20 [stats]

Part 3 · Spread
The outlier stretches the range; the IQR covers the middle 50%
64 min range: 76 − 12
12 min IQR: Q3 − Q1 = 27 − 15
18.5 min standard deviation, s
Quartiles: lower half 12, 15, 15, 18, 20 gives Q1 = 15; upper half 22, 25, 27, 30, 76 gives Q3 = 27

Notes: (About 2 minutes.) Range is the maximum minus the minimum: 76 minus 12, which is 64 minutes, and very sensitive to the outlier. Q1 is the median of the lower half, 15; Q3 is the median of the upper half, 27. The IQR, Q3 minus Q1, is 12 minutes and is the spread of the middle 50%. Standard deviation is roughly the typical distance of values from the mean: about 18.5 minutes here.

## Slide 21 [formula]

Part 3 · Standard deviation
One 76-minute outlier triples the standard deviation
s = √( Σ( x − x̄ )² / ( n − 1) )
x̄ the sample mean
n − 1 for a sample we divide by n − 1, not n; this corrects for the sample mean sitting closer to the data than the true mean
With the 76: s ≈ 18.5 min. Without it: s ≈ 6.1 min.

Notes: (About 2 minutes.) Read the formula in words: for each value, take its distance from the mean and square it, add those up, divide by n minus 1, then take the square root. The variance, before the square root, is about 341.3 for the ten commutes, so s is about 18.5 minutes. Without the 76 the standard deviation is about 6.1 minutes: one outlier roughly triples it. This is the same lesson as the mean and range.

## Slide 22 [diagram, 1 diagram]

Part 3 · Outliers
The 1.5 × IQR rule flags the 76-minute commute
0
10
20
30
40
50
60
70
80
12
30
76 outlier
median 21
Q1 15
Q3 27
lower fence −3
upper fence 45
Fences: Q1 − 1.5 × IQR = 15 − 18 = −3 and Q3 + 1.5 × IQR = 27 + 18 = 45. The whiskers reach 12 and 30; the 76 is an outlier.

Notes: (About 2.5 minutes.) The five-number summary is minimum 12, Q1 15, median 21, Q3 27 and maximum 76. Draw the box from Q1 to Q3 with a line at the median. The whiskers run to the most extreme values that are not outliers, 12 and 30. The 1.5 × IQR rule: with IQR 12, 1.5 × 12 = 18, so the fences are 15 − 18 = −3 and 27 + 18 = 45. The 76 lies beyond 45, so it is a suspected outlier. Click through the builds slowly.

## Slide 23 [formula]

Part 3 · z-scores
A z-score says how many SDs a value sits from the mean
z = ( x − mean) / SD
x the value we are looking at
SD the standard deviation of the data
Exam: mean 70, SD 8. A score of 86 has z = (86 − 70) / 8 = 2: two SDs above the mean.

Notes: (About 2 minutes.) A z-score is the number of standard deviations a value lies above (positive) or below (negative) the mean. Worked example: an exam with mean 70 and SD 8. A score of 86 has z = 2. z-scores also let us compare values on different scales, such as a score on a hard test and a score on an easy one.

## Slide 24 [diagram, 1 diagram]

Part 3 · Bell-shaped data
For bell-shaped data, about 68%, 95% and 99.7% lie within 1, 2 and 3 SDs
70
78
86
94
46
54
62
68% within 1 SD
95% within 2 SD
99.7% within 3 SD
exam score (mean 70, SD 8)
Exam example (mean 70, SD 8): about 68% of scores fall between 62 and 78, about 95% between 54 and 86, about 99.7% between 46 and 94. The rule applies only to roughly bell-shaped data, not to skewed data such as the commute times.

Notes: (About 2.5 minutes.) Build the bell, then the three brackets from the inside out. About 68% of values lie within 1 SD of the mean, about 95% within 2 SDs and about 99.7% within 3 SDs. In the exam, that means scores of 62 to 78, 54 to 86 and 46 to 94. A score of 86 (z = 2) is better than about 97.5% of the class. Warn them: the rule does not apply to strongly skewed data like the commute times.

## Slide 25 [diagram, 1 diagram]

Part 3 · Correlation
Ice cream does not cause drownings; hot weather drives both
Hot weather
confounding variable
Ice-cream sales
Drownings
correlated: they rise and fall together
ice cream does not cause drowning
Hot weather is a confounding variable. Other reasons for correlation without causation: reverse causation, and coincidence, especially when many variables are searched.

Notes: (About 2.5 minutes.) Ice-cream sales and drownings rise and fall together across a year, so they are correlated. Ice cream does not cause drowning. Hot weather drives both, and it is a confounding variable: a third variable that affects both things being studied. Other reasons for a correlation without causation are reverse causation and coincidence. The only way to show cause and effect is a randomised experiment. This is the third time we say the main idea, and the fence: correlation is not causation.

## Slide 26 [rows]

Quiz · 1 of 3
Check your understanding
Is "favourite colour" categorical or numerical, and at what level?
Categorical, nominal
A survey about exercise habits only asks people leaving a gym. What is the problem?
Selection bias from a convenience sample: gym-goers exercise more than the population.

Notes: (About 2 minutes.) Give the room 30 seconds per question before you click. Question 1: a colour has no order, so it is categorical and nominal. Question 2: a gym is not random, so this is a convenience sample, and the people in it differ from the population. Click to reveal the answers.

## Slide 27 [rows]

Quiz · 2 of 3
Check your understanding
Find the mean and median of 2, 4, 4, 5, 10.
Mean 5, median 4
Which is resistant to outliers: the mean or the median?
The median

Notes: (About 2 minutes.) Question 3: the values sum to 25, so the mean is 5; the middle value of the ordered list is 4. Question 4: the median is resistant to outliers, the mean is not. Click to reveal.

## Slide 28 [rows]

Quiz · 3 of 3
Check your understanding
An exam has mean 70 and SD 8. What is the z-score of 82?
1.5, since (82 − 70) / 8 = 1.5
Ice-cream sales and drownings are correlated. Does ice cream cause drowning?
No. Hot weather is a confounding variable.

Notes: (About 2 minutes.) Question 5 is a direct use of the z-score formula. Question 6 is the fence: correlation is not causation. Click to reveal, then move to the summary.

## Slide 29 [rows]

Summary
Collect carefully, plot first, then describe with centre and spread
Design matters more than size
Random sampling and randomised experiments. A bigger biased sample does not help.
Know the variable
Categorical (nominal, ordinal) or numerical (discrete, continuous).
Plot before you compute
Anscombe's quartet: the same summary numbers, four different pictures.
Centre and spread
Mean (sensitive) or median (resistant); range, IQR, SD; outliers beyond 1.5 × IQR.
Correlation is not causation
Look for confounders. Next module: probability, the language of uncertainty.

Notes: (About 1 minute.) This is the third and final time we say the main idea: collect carefully, plot first, then describe with centre and spread. Walk the five rows quickly. Next module is probability, the language of uncertainty. You now know how to ask where data come from, what kind they are and what they say; that is the foundation for everything that follows. Good luck with the next module, and see you there.
