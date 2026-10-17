## Slide 1 [title]

STATS 101 · Module 1
Data, samples and describing data
By the end of today you can say where data come from, what kind they are, and what they say: with a graph and a few numbers.
STATS 101 Module 1 of the course 50-minute lecture

Notes: Welcome to STATS 101. No statistics background is needed today; high-school algebra is enough.
Here is the promise for the next fifty minutes: by the end you will be able to take any data set and answer three questions about it. Where did the data come from? What kind of data are they? And what do they say? You will answer the last one with a graph and a handful of numbers you can calculate by hand.
We finish with a six-question quiz, so keep track as we go.

## Slide 2 [agenda]

Today we ask three questions of any data set
Where do the data come from? populations, samples, study design
What kind of data are they? types of variables
What do the data say? graphs, centre, spread, shape
Check your understanding six-question quiz

Notes: These three questions structure the whole module, and they will come back in every later module too.
First: where do the data come from? That is populations, samples and how a study was designed. Second: what kind of data are they? That is types of variables. Third: what do the data say? That is graphs, and numbers for centre, spread and shape.
Question to the room: hands up if you have answered an online poll or a survey this month. Keep that in mind; we will come back to who answers polls when we talk about bias.

## Slide 3 [image-right, 1 placeholder]

Image: a collage of everyday statistics: an opinion poll, a clinical trial of a new medicine, sports analytics, a weather forecast, a website A/B test
1 · Why statistics?
Statistics draws conclusions from data despite variation
Descriptive: summarise the data we have. Most of today.
Inferential: from a sample to a population, with a measure of uncertainty. Later modules.

Notes: Definition from the module: statistics is the science of collecting, describing and drawing conclusions from data in the presence of variation and uncertainty. The key words are variation and uncertainty: if every person were identical we would not need statistics.
There are two branches. Descriptive statistics summarise the data we have, with tables, graphs and averages; that is most of this module. Inferential statistics use a sample to draw conclusions about a larger population, with a measure of uncertainty; that comes in later modules.
Everyday examples, shown in the picture: opinion polls, clinical trials of new medicines, sports analytics, weather forecasts, and A/B tests on websites. Ask: which of these have you met this week?

## Slide 4 [image-left, 1 placeholder]

Image: John Snow’s 1854 street map of Soho, with each cholera death marked and the Broad Street pump at the centre of the cluster
2 · Two stories about data
A map of deaths found the source of cholera
London, 1854. John Snow marked each cholera death in Soho on a street map.
The deaths clustered around one water pump on Broad Street. Its handle was removed.

Notes: Two stories, one good and one bad, before any definitions.
The good one. London, 1854, a cholera outbreak in Soho. John Snow marked each death on a street map. The deaths clustered around one water pump on Broad Street, and the pump's handle was removed.
The point for us: a simple picture of data pointed to the cause. No formula, no computer: just plotting the data. Remember this when we get to graphs; plotting first is a rule, not a nicety.

## Slide 5 [diagram, 1 diagram]

2 · Two stories about data · 1936
A huge biased sample lost to a small well-chosen one
Literary Digest
&asymp; 10 million ballots mailed
&asymp; 2.4 million returned (from phone books and car lists)
Predicted Landon would win: wrong
Gallup
&asymp; 50,000 people, better chosen
Predicted Roosevelt would win: right
Result: Roosevelt won about 61% of the popular vote and 46 of the 48 states. Bars drawn to scale.

Notes: The bad story. 1936, the Literary Digest magazine. Click one: it mailed about 10 million ballots, drawn largely from telephone directories and car-registration lists, and about 2.4 million came back. That is the shaded part of the bar.
Click two: it predicted that Alf Landon would beat Franklin D. Roosevelt. Roosevelt won with about 61% of the popular vote and 46 of the 48 states.
Click three: George Gallup used a much smaller but better-chosen sample, about 50,000 people. That is the thin sliver on the second row, drawn to the same scale. He correctly predicted Roosevelt's win.
This is the main idea of the first half of the lecture: a huge biased sample is worse than a small well-chosen one. How data are collected matters more than how much there is. We will see exactly what went wrong when we reach bias.

## Slide 6 [diagram, 1 diagram]

3 · Population, sample, parameter, statistic
We study a sample to learn about a population
Population
everyone we want
to know about
Parameter: &mu;, &sigma;
(usually unknown)
collect data from part of it
Sample
the part we measure
Statistic: x̄, s
the statistic estimates the parameter
Memory aid: Population – Parameter; Sample – Statistic.

Notes: Four words to keep apart. The population is the entire group we want to know about, for example all students at the university. The sample is the part we actually collect data from, for example 200 students who answered a survey.
A parameter is a number describing the population; it is usually unknown. We write the population mean as mu and the population standard deviation as sigma.
A statistic is a number computed from the sample, used to estimate the parameter: the sample mean x-bar and the sample standard deviation s. Last click: the arrow back is the whole of inferential statistics in one line.
Memory aid: P goes with P, population and parameter; S goes with S, sample and statistic.

## Slide 7 [diagram, 1 diagram]

4 · Types of variables
Every variable is categorical or numerical
Variable
Categorical
Numerical
Nominal
no order
blood type, country
Ordinal
natural order
low / medium / high
Discrete
counts
number of siblings
Continuous
measurements
height, time
Watch out: a postcode or a student ID is categorical. Averaging them means nothing.

Notes: Now the second question: what kind of data are they? Every variable is either categorical or numerical, and each splits in two.
Categorical variables put people into categories. Nominal means the categories have no order: blood type, favourite colour, country. Ordinal means they have a natural order: satisfaction rated low, medium or high, or year of study.
Numerical variables are numbers we can do arithmetic with. Discrete ones are counts in whole numbers: number of siblings, goals scored. Continuous ones are measurements on a scale: height, time, temperature.
The trap, on the caption: numbers are not always numerical data. A postcode or a student ID is categorical; the average student ID means nothing.

## Slide 8 [comparison]

5 · Levels of measurement
Only ratio data have a true zero
Nominal Ordinal Interval Ratio
Order? no yes yes yes
Equal intervals? no no yes yes
True zero? no no no yes
Example eye colour race finishing position temperature in °C weight, income, time
20 °C is not “twice as hot” as 10 °C; 20 kg is twice 10 kg.

Notes: A finer way to classify variables: four levels of measurement, each adding one property to the one before.
Nominal: no order, like eye colour. Ordinal adds order, like race finishing position; but the gap between first and second need not equal the gap between second and third. Interval adds equal intervals, like temperature in degrees Celsius. Ratio adds a true zero, like weight, income or time.
Why it matters, the line at the bottom: 20 degrees Celsius is not twice as hot as 10 degrees, because zero Celsius is not 'no temperature'. But 20 kilograms really is twice 10 kilograms. Ratios only make sense on a ratio scale.

## Slide 9 [section]

Where do the data come from?
How data are collected matters more than how much
Study design, sampling methods, and the biases that mislead.

Notes: Back to the first question, where do the data come from, now in detail. Sections 6 to 8 of the module.
The idea to carry through this part is the Literary Digest lesson said another way: the quality of the collection beats the quantity of data, every time.

## Slide 10 [diagram, 1 diagram]

6 · Observational studies and experiments
Only a randomised experiment can show cause and effect
Subjects
assigned
at random
Treatment group
Control group
gets a placebo
Compare outcomes
Double-blind: neither
subjects nor researchers
know who got what
An observational study only watches and measures, so it can show an association, not cause and effect.

Notes: Two ways to collect data. In an observational study, researchers observe and measure without assigning treatments, for example surveying students about sleep and grades. It can show an association, but not cause and effect.
In an experiment, researchers assign the treatments and compare outcomes. Click by click, the parts of a good experiment: subjects are assigned to groups at random, so the groups are alike apart from the treatment. One group is a control group for comparison, given a placebo where possible.
Then we compare the outcomes. Last click: blinding. Double-blind means neither the subjects nor the researchers know who got what.
The claim on the slide: only a well-designed randomised experiment can establish cause and effect. Hold on to that; it comes back at the very end with ice cream.

## Slide 11 [rows]

7 · Sampling methods
Pick a random method; avoid convenience samples
Every group of n has the same chance. Draw 100 student IDs at random.
A random sample from each group. 25 students from each year of study.
Randomly choose whole groups. Pick 5 lecture sections, survey everyone in them.
Every k-th after a random start. Every 20th name on the class list.
Whoever is easiest to reach: not random, avoid. Asking friends in the cafeteria.

Notes: Five ways to pick a sample, each with a campus example.
Simple random sample: every group of n individuals has the same chance of being chosen; draw 100 student IDs at random. Stratified: split the population into groups called strata and take a random sample from each; 25 students from each year of study.
Cluster: split into groups and randomly choose whole groups; randomly pick 5 lecture sections and survey everyone in them. Notice the difference from stratified: stratified samples within every group, cluster takes some groups entirely.
Systematic: every k-th individual from a list after a random start; every 20th name on the class list.
And the one to avoid, highlighted: a convenience sample, whoever is easiest to reach, like asking your friends in the cafeteria. It is not random.

## Slide 12 [bullets]

A bigger sample does not fix bias
Selection: the sampling leaves people out (1936: poorer voters).
Non-response: those who don’t reply differ.
Response: “Don’t you agree that…?”
Voluntary response: online polls, call-in shows.
More data only makes a biased answer look more precise.

Notes: Bias is a systematic error that pushes results away from the truth in one direction. Four kinds to recognise.
Selection bias: the way the sample is chosen leaves out part of the population. This is what sank the Literary Digest: its phone and car-registration lists left out poorer voters in 1936.
Non-response bias: the people who don't respond differ from those who do. Remember the Digest got about 2.4 million of 10 million back. Response bias: the question wording or setting pushes people towards an answer, like 'Don't you agree that...?'. Voluntary response bias: only people with strong opinions choose to take part; online polls and call-in shows. Think back to the online poll some of you answered.
The last point is the thesis again, a second way: a bigger sample does not fix bias; it only makes a biased answer look more precise. 2.4 million biased replies lost to about 50,000 well-chosen ones.

## Slide 13 [section]

What do the data say?
Plot first, then measure centre, spread and shape
Graphs, the mean and median, IQR and standard deviation, outliers, z-scores.

Notes: We know where data come from and what kind they are. The third question, and the longest part: what do the data say?
We will use one small data set, ten students' commute times, for almost everything that follows, so you can see each measure on the same numbers.

## Slide 14 [comparison]

9 · Graphs
Match the graph to the data, and plot first
Data Graph What it shows
One categorical variable bar chart (or pie chart) counts or percentages per category
One numerical variable histogram shape of the distribution
One numerical variable box plot five-number summary and outliers
Two numerical variables scatter plot direction, form, strength
A variable over time line graph trends

Notes: The kind of variable, from the second question, tells you the graph. One categorical variable: a bar chart, or a pie chart, showing counts or percentages per category. One numerical variable: a histogram for the shape of the distribution, or a box plot for the five-number summary and outliers; we will build a box plot shortly.
Two numerical variables: a scatter plot, showing the relationship's direction, form and strength. A variable over time: a line graph, showing trends.
The rule to remember: always plot the data before computing anything. John Snow did; the next slide shows why you must.

## Slide 15 [diagram, 1 diagram]

9 · Anscombe’s quartet, 1973
Same summary numbers, four different pictures
straight-line cloud
curve
line + one outlier
stack + one far point
Each set: 11 points, mean of x 9, mean of y &asymp; 7.50, correlation &asymp; 0.816, line y = 3 + 0.5x.

Notes: Anscombe's quartet, from 1973. Four small data sets, eleven points each. They have almost the same mean of x, 9; the same mean of y, about 7.50; the same correlation, about 0.816; and the same regression line, y equals 3 plus 0.5 x.
If you only looked at those numbers you would say the four data sets are the same. Click through the plots: a straight-line cloud; a curve; a straight line with a single outlier; and a vertical stack with one far point.
Last click: the same fitted line drawn through all four. It describes the first set well and the other three badly. Summary numbers can hide the story. Always plot first.

## Slide 16 [diagram, 1 diagram]

10 · Describing a distribution
Describe shape, centre, spread and anything unusual
symmetric
one peak, mirror halves
skewed right
long right tail: incomes
skewed left
long tail to the left
bimodal
two peaks
Centre: where the typical value is. Spread: how much values vary. Unusual: outliers, gaps.

Notes: Every description of a numerical variable covers four things: shape, centre, spread, and unusual features.
Shape first, one click each. Symmetric. Skewed right, which means a long tail to the right; incomes are the classic example. Skewed left, the mirror image. And one peak is called unimodal, two peaks bimodal.
Centre is where the typical value is; spread is how much values vary; unusual features are outliers and gaps. The next four slides give you numbers for centre and spread.

## Slide 17 [diagram, 1 diagram]

11 · Measures of centre
The outlier pulls the mean; the median resists
0
10
20
30
40
50
60
70
80
commute time (minutes), 10 students
76
mode 15
median 21
mean 26
without 76:
mean &asymp; 20.4, median 20
Mean x̄ = &Sigma;x / n = 260 / 10 = 26. Median: the middle of the ordered data, (20 + 22) / 2 = 21. Mode: most frequent.

Notes: Our data set from here on: commute times in minutes for 10 students: 12, 15, 15, 18, 20, 22, 25, 27, 30 and 76. Each dot is a student.
Click: the mode is the most frequent value, 15 minutes, which appears twice.
Click: the median is the middle value of the ordered data. With n = 10, an even number, we average the two middle values, 20 and 22, so the median is 21 minutes.
Click: the mean, x-bar equals sum of x over n. The sum is 260, n is 10, so the mean is 26 minutes. Notice it sits to the right of nine of the ten students: the 76 has dragged it.
Last click: remove the 76-minute commute. The mean drops to about 20.4; the median only to 20. The median is resistant to outliers; the mean is not. In a right-skewed distribution the mean is pulled above the median; in a left-skewed one, below. So use the median for skewed data such as house prices and incomes, and the mean for roughly symmetric data.

## Slide 18 [diagram, 1 diagram]

12 · Measures of spread
The IQR measures the middle half: 27 − 15 = 12 minutes
12
15
15
18
20
22
25
27
30
76
median 21
lower half: Q1 = 15
upper half: Q3 = 27
IQR = Q3 − Q1 = 27 − 15 = 12 minutes
Range = max − min = 76 − 12 = 64 minutes, very sensitive to outliers
Commute times, ordered. Q1 is the median of the lower half; Q3 the median of the upper half.

Notes: Centre is half the story; now spread. Here are the ten commute times in order.
Click: split the data at the median, 21. Q1 is the median of the lower half, 12, 15, 15, 18, 20, so Q1 is 15. Q3 is the median of the upper half, 22, 25, 27, 30, 76, so Q3 is 27.
Click: the interquartile range, IQR, is Q3 minus Q1, 27 minus 15, which is 12 minutes. It is the spread of the middle 50% of the data, so the 76 does not affect it.
Click: compare the range, maximum minus minimum: 76 minus 12 is 64 minutes. One unusual student sets the whole range; the range is very sensitive to outliers.

## Slide 19 [formula]

12 · Standard deviation
One outlier triples the standard deviation
s = &radic;( &Sigma;( x − x )² / ( n − 1) )
s roughly the typical distance of values from the mean
n − 1 for a sample; the sample mean sits closer to the data than the true mean
Commute: variance &asymp; 341.3, s &asymp; 18.5 min. Without the 76: s &asymp; 6.1 min.

Notes: The standard deviation, s, is roughly the typical distance of values from the mean. Read the formula from the inside out: take each value's distance from the mean, x minus x-bar; square it; add them all up; divide by n minus 1; take the square root.
The highlighted part: for a sample we divide by n minus 1, not n. This corrects for the sample mean being closer to the data than the true mean is.
For the commute data the variance, the value before the square root, is about 341.3, so s is about 18.5 minutes. Without the 76-minute value, s is about 6.1. One outlier triples the standard deviation. Like the mean, the SD is not resistant.

## Slide 20 [diagram, 1 diagram]

13 · Five-number summary, box plots and outliers
Beyond the 45-minute fence, the 76-minute commute is an outlier
-10
0
10
20
30
40
50
60
70
80
Q1
median
Q3
15
21
27
fence −3
fence 45
76: outlier
Five-number summary: 12, 15, 21, 27, 76. IQR 12, so 1.5 × IQR = 18: fences 15 − 18 = −3 and 27 + 18 = 45.

Notes: The five-number summary is minimum, Q1, median, Q3, maximum. For the commute data: 12, 15, 21, 27, 76. A box plot draws it.
Click one: the box runs from Q1, 15, to Q3, 27, with a line at the median, 21. The width of the box is the IQR.
Click two: the whiskers go to the most extreme values that are not outliers, here 12 and 30. How do we decide what is an outlier? The 1.5 times IQR rule.
Click three: 1.5 times the IQR is 1.5 times 12, which is 18. The lower fence is Q1 minus 18, 15 minus 18, which is minus 3. The upper fence is Q3 plus 18, 27 plus 18, which is 45. A value below Q1 minus 1.5 IQR or above Q3 plus 1.5 IQR is a suspected outlier.
Click four: 76 is beyond the 45 fence, so it is drawn as a separate dot: the 76-minute commute is an outlier.

## Slide 21 [formula]

14 · z-scores
A z-score counts standard deviations from the mean
z = ( x − mean) / SD
SD standard deviation; z > 0 above the mean, z < 0 below
use compare a hard test with an easy one
Exam mean 70, SD 8: z for 86 = (86 − 70) / 8 = 2

Notes: How unusual is a value? A z-score answers in one number: z equals the value minus the mean, divided by the standard deviation. It says how many standard deviations a value is above the mean, if positive, or below it, if negative.
Example: an exam has mean 70 and SD 8. A score of 86 has z = (86 minus 70) divided by 8, which is 16 over 8, which is 2: two standard deviations above the mean.
Why bother? z-scores let us compare values on different scales, for example a score on a hard test with a score on an easy one. The raw scores are not comparable; their z-scores are.

## Slide 22 [diagram, 1 diagram]

15 · The 68–95–99.7 rule
Bell-shaped data: 68% within 1 SD, 95% within 2, 99.7% within 3
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
86 (z = 2) beats
&asymp; 97.5% of the class
Exam: mean 70, SD 8. Only for roughly bell-shaped data; not for skewed data like the commute times.

Notes: For data with a roughly normal, bell-shaped distribution, there is a quick rule. Let's use the exam again: mean 70, SD 8. The axis is marked in steps of one SD.
Click: about 68% of values lie within 1 SD of the mean, so about 68% of scores are between 62 and 78.
Click: about 95% within 2 SDs, between 54 and 86. Click: about 99.7% within 3 SDs, between 46 and 94.
Last click: the score of 86, z equals 2. 95% are between 54 and 86, so 5% are outside, half of that above: a score of 86 is better than about 97.5% of the class.
The fence: the rule only applies to roughly bell-shaped data. It does not apply to strongly skewed data like the commute times.

## Slide 23 [diagram, 1 diagram]

16 · Correlation is not causation
Ice cream does not cause drowning; hot weather drives both
Ice-cream sales
Drownings
rise and fall together
Hot weather
confounding variable
Other non-causal reasons: reverse causation, coincidence (especially when many variables are searched).

Notes: Last idea. Two variables are associated, or correlated, when they tend to move together.
Click one, what we see: across a year, ice-cream sales and drownings rise and fall together. Does ice cream cause drowning? Ask the room.
Click two: no. Hot weather drives both: more people buy ice cream and more people swim. Hot weather is a confounding variable, a third variable that affects both variables being studied.
Other reasons for a correlation without causation: reverse causation, and coincidence, especially when many variables are searched. And recall section 6: only a randomised experiment can show cause and effect.

## Slide 24 [quiz]

Check your understanding · 1 of 6
Is “favourite colour” categorical or numerical, and at what level?
Categorical, nominal
Categorical, ordinal
Numerical, discrete
Numerical, continuous

Notes: Answer: categorical, nominal. Colours are categories with no natural order. Give the room 30 seconds, ask for a show of hands per option, then click to reveal.
Click once to mark the correct answer.

## Slide 25 [quiz]

Check your understanding · 2 of 6
A survey about exercise habits only asks people leaving a gym. What is the problem?
The sample is too small
Selection bias: gym-goers exercise more
Response bias from the wording
No problem: it is random

Notes: Answer: selection bias from a convenience sample; gym-goers exercise more than the population. Note the tempting wrong answer, 'too small': a bigger sample of gym-goers would be just as biased. Literary Digest again.
Click once to mark the correct answer.

## Slide 26 [quiz]

Check your understanding · 3 of 6
Find the mean and median of 2, 4, 4, 5, 10.
mean 5, median 4
mean 4, median 5
mean 5, median 5
mean 4, median 4

Notes: Answer: mean 5, median 4. The sum is 25 and n is 5, so the mean is 5. The middle of the ordered values is 4. The 10 pulls the mean above the median, just like the 76-minute commute.
Click once to mark the correct answer.

## Slide 27 [quiz]

Check your understanding · 4 of 6
Which is resistant to outliers: the mean or the median?
The mean
The median

Notes: Answer: the median. Recall the commute data: removing the 76 moved the mean from 26 to about 20.4, the median only from 21 to 20.
Click once to mark the correct answer.

## Slide 28 [quiz]

Check your understanding · 5 of 6
An exam has mean 70 and SD 8. What is the z-score of 82?
1
1.5
2
12

Notes: Answer: 1.5. z = (82 minus 70) / 8 = 12 / 8 = 1.5. The 12 option is the trap of forgetting to divide by the SD.
Click once to mark the correct answer.

## Slide 29 [quiz]

Check your understanding · 6 of 6
Ice-cream sales and drownings are correlated. Does ice cream cause drowning?
Yes: the correlation proves it
No: hot weather is a confounding variable
Yes, if the sample is big enough

Notes: Answer: no; hot weather is a confounding variable. Correlation is not causation, and a bigger sample does not change that.
Click once to mark the correct answer.

## Slide 30 [two-column]

Summary · next: Module 2, Probability
You can now ask three questions of any data set
Where from?
Population → parameter (&mu;, &sigma;); sample → statistic (x̄, s)
Collect at random; more biased data doesn’t help
What kind?
Categorical: nominal, ordinal
Numerical: discrete, continuous
What do they say?
Plot first; mean vs median; IQR, SD
1.5 × IQR; z; 68–95–99.7
Correlation is not causation

Notes: Here is what you now have. Statistics turns data into conclusions in the presence of variation, and you can now ask the three questions of any data set.
Where from: population goes with parameter, mu and sigma; sample goes with statistic, x-bar and s. How data are collected matters most: random sampling and randomised experiments. A bigger biased sample does not help: the Literary Digest, 1936. That is the main idea a third time.
What kind: categorical, nominal or ordinal; numerical, discrete or continuous.
What they say: always plot first, remember Anscombe. Centre: the mean is sensitive, the median resistant. Spread: range, IQR, SD. Outliers lie beyond Q1 minus 1.5 IQR or Q3 plus 1.5 IQR. z equals x minus the mean over the SD; for bell-shaped data, 68, 95, 99.7. And correlation is not causation: look for confounders.
Next module: probability, the language of uncertainty. You now read data the way John Snow read his map. Well done today.
