## Slide 1 [title]

STATS 101 · Module 1
Data, samples and describing data
By the end of today you can say where data come from, what kind they are, and what they say.

Notes: Welcome to STATS 101. Today is Module 1: data, samples and describing data. You need nothing beyond high-school algebra.
Here is what you get from the next fifty minutes. By the end you will be able to look at any set of numbers and ask three questions: where did these data come from, what kind of data are they, and what do they actually say?
We finish with a short quiz so you can check yourself, and a one-slide summary to take away.

## Slide 2 [image-right, 1 placeholder]

Why statistics?
Statistics draws conclusions from data that vary
Descriptive statistics summarise the data we have: tables, graphs, averages. Most of today.
Inferential statistics use a sample to draw conclusions about a larger population, with a measure of uncertainty. Later modules.
Image: everyday statistics: an opinion poll, a weather forecast, a clinical trial

Notes: So what is statistics? It is the science of collecting, describing and drawing conclusions from data in the presence of variation and uncertainty. If every student had exactly the same commute, we would not need it.
There are two branches. Descriptive statistics summarise the data we have: tables, graphs, averages. That is most of today.
Inferential statistics go a step further: they use a sample to draw conclusions about a larger population, and they come with a measure of uncertainty. That comes in later modules.
You meet statistics every day: opinion polls, clinical trials of new medicines, sports analytics, weather forecasts, and the A/B tests that websites run on you. Ask the room: which of these did you come across this week?

## Slide 3 [process]

Today
Three questions run through today's lecture
Where do the data come from?
Populations, samples and study design
What kind of data are they?
Types of variables
What do the data say?
Graphs, centre, spread and shape

Notes: Three questions will run through the whole lecture.
First: where do the data come from? That covers populations and samples, and how a study was designed.
Second: what kind of data are they? Different types of variables need different tools.
Third: what do the data say? Graphs, and numbers for centre, spread and shape.
Watch the small label at the top of each slide: it tells you which of the three questions we are on.

## Slide 4 [image-left, 1 placeholder]

London, 1854
A map of deaths pointed to one water pump
During a cholera outbreak in Soho, John Snow marked each death on a street map.
The deaths clustered around one pump on Broad Street. The pump's handle was removed.
Image: John Snow's 1854 map of cholera deaths around the Broad Street pump

Notes: Let us start with two examples from history. London, 1854. There is a cholera outbreak in Soho.
John Snow takes a street map and marks each death on it. Look at the map: the deaths cluster around one water pump on Broad Street. The pump's handle was removed.
Nobody needed a formula here. A simple picture of data pointed to the cause. Keep that in mind: later today we will make a rule of it, always plot the data first.

## Slide 5 [diagram, 1 diagram]

United States, 1936
2.4 million replies lost to 50,000 well-chosen people
Digest mailed
phone books, car lists
about 10 million
Digest replies
predicted Landon
about 2.4 million: wrong
Gallup's sample
predicted Roosevelt
about 50,000: right
Bars to scale. Roosevelt won about 61% of the popular vote and 46 of the 48 states.

Notes: Second example: the United States, 1936. The Literary Digest magazine ran a huge poll on the presidential election.
It mailed about 10 million ballots, drawn largely from telephone directories and car-registration lists.
About 2.4 million came back, and the poll predicted that Alf Landon would beat Franklin D. Roosevelt.
George Gallup used a much smaller but better-chosen sample, about 50,000 people, and correctly predicted a Roosevelt win. The bars are to scale: Gallup's sample is a sliver next to the Digest's replies.
Roosevelt won with about 61% of the popular vote and 46 of the 48 states. Ask the room: in 1936, who was missing from lists of telephone and car owners?

## Slide 6 [statement]

The lesson of 1936
A huge biased sample is worse than a small, well-chosen one.

Notes: Here is the lesson, and it is the big idea of this whole module: a huge biased sample is worse than a small, well-chosen one.
How data are collected matters more than how much data there is. More data does not rescue a bad method; it only gives you a confidently wrong answer. We will meet this again when we talk about bias.

## Slide 7 [diagram, 1 diagram]

Where do the data come from?
We measure a sample to learn about a population
Population
all students at the university
Parameter: μ, σ
usually unknown
Sample
200 students who
answered a survey
Statistic: x̄, s
we collect data from part of it
the statistic estimates the parameter
Memory aid: Population goes with Parameter; Sample goes with Statistic.

Notes: Now some vocabulary, and the first of our three questions: where do the data come from?
The population is the entire group we want to know about, for example all students at the university. A number describing the population is a parameter: the population mean, written mu, and the population standard deviation, written sigma. We usually do not know them.
The sample is the part of the population we actually collect data from, say 200 students who answered a survey. A number computed from the sample is a statistic: the sample mean, x-bar, and the sample standard deviation, s.
We use the statistic to estimate the parameter. Memory aid: Population goes with Parameter, Sample goes with Statistic. P with P, S with S.

## Slide 8 [diagram, 1 diagram]

What kind of data are they?
Every variable is categorical or numerical
Variable
Categorical
Numerical
Nominal
no order
blood type, favourite
colour, country
Ordinal
natural order
satisfaction,
year of study
Discrete
counts
number of siblings,
goals scored
Continuous
measurements
height, time,
temperature
Watch out: a postcode or a student ID is categorical; averaging them means nothing.

Notes: Second question: what kind of data are they? Every variable is either categorical or numerical.
Categorical variables put individuals into categories. Nominal means the categories have no order: blood type, favourite colour, country. Ordinal means they have a natural order: satisfaction rated low, medium or high, or year of study.
Numerical variables are numbers. Discrete ones are counts, whole numbers, like number of siblings or goals scored. Continuous ones are measurements on a scale: height, time, temperature.
Watch out: numbers are not always numerical data. A postcode or a student ID is categorical. Averaging student IDs means nothing.

## Slide 9 [comparison]

What kind of data are they?
20 kg is twice 10 kg, but 20 °C is not twice as hot as 10 °C
Nominal Ordinal Interval Ratio
Order? no yes yes yes
Equal intervals? no no yes yes
True zero? no no no yes
Example eye colour race finishing position temperature in °C weight, income, time

Notes: Variables also have a level of measurement, and it decides which calculations make sense.
Nominal: no order, like eye colour. Ordinal: an order, but the gaps are not equal, like finishing position in a race. Interval: order and equal intervals, but no true zero, like temperature in degrees Celsius. Ratio: all three, including a true zero, like weight, income or time.
Ask the room: is 20 degrees Celsius twice as hot as 10 degrees? No. Celsius has no true zero, so twice makes no sense. But 20 kilograms really is twice 10 kilograms, because weight is ratio data.

## Slide 10 [two-column]

Only a randomised experiment can show cause and effect
Observational study
Observe without assigning treatments. Association, not causation.
Experiment
Assign treatments; compare outcomes
Control group + random assignment

Notes: Back to the first question: where do the data come from? There are two kinds of study.
In an observational study, researchers observe and measure without assigning treatments, for example surveying students about their sleep and their grades. It can show an association, but not cause and effect.
In an experiment, researchers assign the treatments and compare outcomes. A good experiment has a control group for comparison, random assignment so the groups are alike apart from the treatment, a placebo where possible, and blinding. Double-blind means that neither the subjects nor the researchers know who got what.
Only a well-designed randomised experiment can establish cause and effect. Hold on to that: we need it for the last idea of today.

## Slide 11 [diagram, 1 diagram]

Where do the data come from?
Random methods give everyone a fair chance; convenience does not
Simple random
same chance for any n
100 random IDs
Stratified
random from each group
25 per year of study
Cluster
pick whole groups
5 whole sections
Systematic
every k-th, random start
every 20th name
Convenience
easiest to reach
not random: avoid
Each panel: the same 20 people in 4 groups. Filled dots are the sample.

Notes: How do we choose a sample? Each panel shows the same population of 20 people in four groups, think of them as the four years of study. The filled dots are the people we pick.
Simple random sample: every group of n individuals has the same chance of being chosen, like drawing 100 student IDs at random.
Stratified sample: split the population into groups, called strata, and take a random sample from each, like 25 students from each year of study.
Cluster sample: split into groups and randomly choose whole groups, like picking 5 lecture sections at random and surveying everyone in them.
Systematic sample: choose every k-th individual from a list after a random start, like every 20th name on the class list.
Convenience sample: whoever is easiest to reach, like asking your friends in the cafeteria. It is not random. Avoid it.

## Slide 12 [bullets]

A bigger sample does not fix bias
Selection bias. The way the sample is chosen leaves out part of the population.
Non-response bias. The people who don't respond differ from those who do.
Response bias. Wording or setting pushes an answer: "Don't you agree that…?"
Voluntary response bias. Only people with strong opinions take part.
Size is no cure. A bigger biased sample only looks more precise.

Notes: When samples mislead, we call it bias: a systematic error that pushes results away from the truth in one direction.
Selection bias: the way the sample is chosen leaves out part of the population. The Literary Digest's phone and car lists left out poorer voters in 1936.
Non-response bias: the people who do not respond differ from those who do.
Response bias: the question wording or the setting pushes people towards an answer. A question that starts 'Don't you agree that' is a giveaway.
Voluntary response bias: only people with strong opinions choose to take part, as in online polls and call-in shows.
And the big idea once more, in a new form: a bigger sample does not fix bias. It only makes a biased answer look more precise.

## Slide 13 [comparison]

The type of data picks the graph
Data Graph What it shows
One categorical variable Bar chart (or pie chart) Counts or percentages per category
One numerical variable Histogram Shape of the distribution
One numerical variable Box plot Five-number summary and outliers
Two numerical variables Scatter plot Relationship: direction, form, strength
A variable over time Line graph Trends

Notes: Third question: what do the data say? Start with a graph, and let the type of data choose it.
One categorical variable: a bar chart, or a pie chart, for counts or percentages per category. One numerical variable: a histogram shows the shape of the distribution, and a box plot shows the five-number summary and outliers.
Two numerical variables: a scatter plot shows the relationship, its direction, form and strength. A variable over time: a line graph shows trends.
The rule for all of them: always plot the data before computing anything. The next slide shows why.

## Slide 14 [diagram, 1 diagram]

What do the data say?
Always plot the data before computing anything
I
II
III
IV
straight-line cloud
a curve
line + one outlier
stack + one far point
Anscombe's quartet, 1973: 11 points each, mean of x 9, mean of y about 7.50, correlation about 0.816, line y = 3 + 0.5x.

Notes: Anscombe's quartet, from 1973: four small data sets of 11 points each.
They have almost the same summary numbers: the mean of x is 9, the mean of y is about 7.50, the correlation is about 0.816, and they share the same regression line, y equals 3 plus 0.5 x. Judged by the numbers alone, they are the same data.
Now look at the points. One is a straight-line cloud. One is a curve. One is a line with a single outlier. One is a vertical stack with one far point.
Summary numbers can hide what the data really look like. That is why we always plot the data before computing anything, just as John Snow did with his map.

## Slide 15 [diagram, 1 diagram]

What do the data say?
Describe a distribution by its shape, centre and spread
Symmetric
one peak, sides alike
Skewed right
long tail right: incomes
Skewed left
long tail to the left
Bimodal
two peaks
Then add unusual features: outliers and gaps.

Notes: Whenever you describe a numerical variable, cover four things: shape, centre, spread and unusual features. Start with shape.
Symmetric: one peak, and both sides look alike. One peak is called unimodal.
Skewed right: a long tail to the right. Incomes look like this.
Skewed left: the long tail is on the left.
Bimodal: two peaks instead of one.
After the shape, say where the centre is, how much the values spread, and whether there are outliers or gaps. The next slides give us numbers for centre and spread.

## Slide 16 [formula]

What do the data say?
The mean shares out the total; the median is the middle
x̄ = Σ x / n
x̄ the mean of the sample
Σ x the sum of all the values
n how many values there are
Median the middle of the ordered values
Mode the most frequent value
Commutes (min): 12, 15, 15, 18, 20, 22, 25, 27, 30, 76. Sum 260, n = 10: mean 26, median 21, mode 15.

Notes: Three measures of centre. The mean: add the values and divide by how many there are. In symbols, x-bar equals the sum of x divided by n.
The median is the middle value of the ordered data. With an even number of values, take the average of the two middle values. The mode is the most frequent value.
Our running example: the commute times, in minutes, of 10 students: 12, 15, 15, 18, 20, 22, 25, 27, 30 and 76. The sum is 260 and n is 10, so the mean is 26 minutes. The ordered middle values are 20 and 22, so the median is 21 minutes. And 15 appears twice, so the mode is 15 minutes.

## Slide 17 [diagram, 1 diagram]

What do the data say?
One long commute pulls the mean, but barely moves the median
0
10
20
30
40
50
60
70
80
minutes
mode 15
median 21
mean 26
without the 76:
mean ≈ 20.4, median 20
Use the median for skewed data such as house prices and incomes; the mean for roughly symmetric data.

Notes: Here are the ten commutes on a number line. The two stacked dots at 15 are the mode.
The median, 21, sits in the middle of the pack.
The mean, 26, is pulled to the right by one long commute. Ask the room: what happens if we remove the 76-minute commute?
The mean drops to about 20.4, but the median only to 20. The median is resistant to outliers; the mean is not.
In a right-skewed distribution the mean is pulled above the median; in a left-skewed one, below it. So use the median for skewed data such as house prices and incomes, and the mean for roughly symmetric data.

## Slide 18 [stats]

What do the data say?
The range is 64 minutes, but the middle half spans only 12
64 min Range: 76 − 12
12 min IQR: 27 − 15, the middle 50%
18.5 min Standard deviation

Notes: Centre is only half the picture; spread is the other half. Same ten commutes.
The range is the maximum minus the minimum: 76 minus 12, 64 minutes. It is very sensitive to outliers, because it uses only the two most extreme values.
The interquartile range uses the quartiles. Q1 is the median of the lower half: 12, 15, 15, 18, 20 gives 15. Q3 is the median of the upper half: 22, 25, 27, 30, 76 gives 27. The IQR is 27 minus 15, 12 minutes: the spread of the middle 50%.
The standard deviation is roughly the typical distance of values from the mean. For the commutes it is about 18.5 minutes. The next slide shows how it is calculated.

## Slide 19 [formula]

What do the data say?
One outlier triples the standard deviation
s = √( Σ( x − x̄ )² / ( n − 1) )
s the sample standard deviation
x − x̄ a value's distance from the mean
s ² the variance (before the root)
n − 1 divide by n − 1 for a sample
Commutes: variance ≈ 341.3, s ≈ 18.5 min. Without the 76: s ≈ 6.1 min.

Notes: This is the formula for the sample standard deviation. Take each value's distance from the mean, square it, add them all up, divide by n minus 1, and take the square root. Before the square root, the number is called the variance.
For the commutes the variance is about 341.3, so s is about 18.5 minutes. Without the 76-minute value, s is about 6.1 minutes. One outlier triples the standard deviation.
Why n minus 1 and not n? For a sample, the sample mean is closer to the data than the true mean is, and dividing by n minus 1 corrects for that.

## Slide 20 [diagram, 1 diagram]

What do the data say?
The 76-minute commute lies beyond the cut-off: it is an outlier
0
10
20
30
40
50
60
70
80
minutes
Q1 15
median 21
Q3 27
12
30
lower cut-off −3
upper cut-off 45
76: outlier
Five-number summary 12, 15, 21, 27, 76. 1.5 × IQR = 18, so the cut-offs are −3 and 45.

Notes: Five numbers summarise a distribution: the minimum, Q1, the median, Q3 and the maximum. For the commutes: 12, 15, 21, 27 and 76. A box plot draws them.
The box runs from Q1, 15, to Q3, 27, with a line at the median, 21.
The whiskers reach to the most extreme values that are not outliers: here 12 and 30.
How do we decide what counts as an outlier? The 1.5 times IQR rule. The IQR is 12, and 1.5 times 12 is 18. The lower cut-off is Q1 minus 18: 15 minus 18 is minus 3. The upper cut-off is Q3 plus 18: 27 plus 18 is 45. A value below the lower cut-off or above the upper cut-off is a suspected outlier.
The 76-minute commute is far above 45, so it is an outlier, drawn as a separate dot.

## Slide 21 [formula]

What do the data say?
A z-score counts standard deviations from the mean
z = ( x − mean) / SD
z SDs above (+) or below (−) the mean
x the value
mean the mean of the data
SD the standard deviation
Exam with mean 70, SD 8. A score of 86: z = (86 − 70) / 8 = 2, two SDs above the mean.

Notes: How unusual is a value? A z-score answers that. z equals the value minus the mean, divided by the standard deviation.
It says how many standard deviations a value is above the mean, when it is positive, or below the mean, when it is negative.
Example: an exam has mean 70 and standard deviation 8. A score of 86 has z equal to 86 minus 70, divided by 8, which is 2: two standard deviations above the mean.
Because z-scores count in standard deviations, they let us compare values on different scales, for example a score on a hard test against a score on an easy one.

## Slide 22 [diagram, 1 diagram]

What do the data say?
In a bell curve, 68% lie within 1 SD, 95% within 2, 99.7% within 3
46
54
62
70
78
86
94
about 68%
about 95%
about 99.7%
86: z = 2
better than about 97.5%
Exam scores, mean 70, SD 8. The rule needs roughly bell-shaped data; it does not fit skewed data like the commutes.

Notes: For data with a roughly normal, bell-shaped distribution, there is a handy rule. Here are the exam scores again: mean 70, standard deviation 8.
About 68% of values lie within 1 SD of the mean: between 62 and 78.
About 95% lie within 2 SDs: between 54 and 86.
About 99.7% lie within 3 SDs: between 46 and 94.
So a score of 86, which is z equal to 2, is better than about 97.5% of the class: the 95% in the middle, plus half of the 5% left over, the lower tail.
One warning: the rule only applies to roughly bell-shaped data. It does not apply to strongly skewed data like our commute times.

## Slide 23 [diagram, 1 diagram]

Correlation is not causation
Ice-cream sales and drownings rise together, but hot weather drives both
Ice-cream sales
Drownings
rise and fall together
Hot weather
confounding variable
not cause and effect
Other reasons for a correlation without causation: reverse causation, and coincidence when many variables are searched.

Notes: The last idea of today. Two variables are associated, or correlated, when they tend to move together.
Across a year, ice-cream sales and drownings rise and fall together. Ask the room: does ice cream cause drowning?
No. Hot weather drives both. Hot weather is a confounding variable: a third variable that affects both of the variables we are studying.
So the link is real, but it is not cause and effect. Other reasons for a correlation without causation are reverse causation, and coincidence, especially when many variables are searched.
Only a randomised experiment, the kind we saw earlier, can show cause and effect.

## Slide 24 [quiz]

Check your understanding · 1 of 6
Is "favourite colour" categorical or numerical, and at what level?
Categorical, nominal
Categorical, ordinal
Numerical, discrete
Numerical, continuous

Notes: Give the room about twenty seconds, then to reveal.
Answer: categorical, nominal. Colours are categories with no natural order.

## Slide 25 [quiz]

Check your understanding · 2 of 6
A survey on exercise only asks people leaving a gym. What is the problem?
Response bias from the wording
Selection bias from a convenience sample
Non-response bias
The sample is too small

Notes: Give the room a moment, then to reveal.
Answer: selection bias from a convenience sample. Gym-goers exercise more than the population, so the survey overstates how much people exercise. And asking more people at the gym would not help.

## Slide 26 [quiz]

Check your understanding · 3 of 6
Find the mean and median of 2, 4, 4, 5, 10.
Mean 4, median 5
Mean 5, median 5
Mean 5, median 4
Mean 4, median 4

Notes: Let them work it out on paper, then to reveal.
Answer: mean 5, median 4. The sum is 25 and there are 5 values, so the mean is 5. The middle of the ordered values is 4. The 10 pulls the mean above the median.

## Slide 27 [quiz]

Check your understanding · 4 of 6
Which is resistant to outliers: the mean or the median?
The mean
The median
Both
Neither

Notes: Quick one: hands up for each option, then to reveal.
Answer: the median. Remember the commutes: removing the 76 moved the mean from 26 to about 20.4, but the median only from 21 to 20.

## Slide 28 [quiz]

Check your understanding · 5 of 6
An exam has mean 70 and SD 8. What is the z-score of 82?
1
1.5
2
12

Notes: Give them twenty seconds, then to reveal.
Answer: 1.5. z equals 82 minus 70, divided by 8: 12 divided by 8 is 1.5. The score is one and a half standard deviations above the mean. If anyone chose 12, they forgot to divide by the SD.

## Slide 29 [quiz]

Check your understanding · 6 of 6
Ice-cream sales and drownings are correlated. Does ice cream cause drowning?
Yes: the correlation is strong
No: hot weather drives both
Yes: sales come first
No: drowning causes sales

Notes: Last question. to reveal.
Answer: no. Hot weather is a confounding variable that drives both. Correlation is not causation.

## Slide 30 [two-column]

You can now turn data into conclusions, despite variation
Collecting data
Population → parameter (μ, σ); sample → statistic (x̄, s)
Categorical or numerical; variable types and levels
Random samples + randomised experiments; bias matters
Describing data
Always plot first (Anscombe)
Centre: mean, median, mode. Spread: range, IQR, SD
Outliers: below Q1−1.5×IQR or above Q3+1.5×IQR
z = (x − mean) / SD; bell-shaped: 68–95–99.7
Correlation ≠ causation

Notes: Here is what you now have. Statistics turns data into conclusions in the presence of variation, and you can now ask the three questions.
Where do the data come from: a population described by parameters, a sample described by statistics, and whether the sample and the study were random. What kind of data are they: categorical or numerical, and at what level.
What do the data say: plot first, then centre and spread, outliers with the 1.5 times IQR rule, z-scores, and the 68, 95, 99.7 rule for bell-shaped data. And never read cause into a correlation without looking for a confounder.
Above all: how data are collected matters more than how much there is. A huge biased sample loses to a small, well-chosen one.
Next time, Module 2: probability, the language of uncertainty. You came in today with no statistics, and you leave able to question the next poll you read. Well done, all of you.
