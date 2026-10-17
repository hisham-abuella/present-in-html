## Slide 1 [title]

Wireless 101 · Module 1
How wireless communication works
By the end you will be able to say how far a signal goes, how fast it can carry data, and how many users can share the air.
[Presenter name] Wireless 101 [Date]

Notes: Welcome. This is the first module, and it has one job: give you the vocabulary and the arithmetic that every later module uses. Read the subtitle aloud. It is the promise for the next 45 minutes. Students with no radio background should not worry: we start from the physics they already know and build up.

## Slide 2 [agenda]

Every wireless system answers three questions
How far can the signal go? propagation, path loss, link budget
How fast can we send data? modulation, bandwidth, noise
How many users can share the air? multiple access, cells, regulation

Notes: This is the thesis of the whole module, and you will hear it three times. Everyday examples to name while you talk: Wi-Fi, cellular (4G and 5G), Bluetooth, GPS, broadcast radio and TV, RFID tags and satellite links. Each one answers the same three questions. The three parts of today's lecture follow these questions, in this order.

## Slide 3 [timeline]

From Maxwell's equations to 5G took more than a century
1865 Maxwell
Equations predict electromagnetic waves
1886–88 Hertz
Generates and detects radio waves in the lab
1901 Marconi
Receives a transatlantic radio signal
1979–83 1G
First analog cellular networks
1997 Wi-Fi
First IEEE 802.11 standard
2019 5G
First commercial 5G networks

Notes: Walk the timeline left to right. The key point is in the takeaway: each generation mainly changed how efficiently the same spectrum is used, not the physics. Other dates in the module's table: GSM 2G first call in Finland in 1991, Bluetooth 1.0 in 1999, and first commercial 4G LTE in Stockholm and Oslo in 2009. Note that Maxwell's 1865 equations to 2019 is about 150 years; the module's own takeaway says about 120, so quote the dates, not that number.

## Slide 4 [formula]

Wavelength is the speed of light divided by frequency
λ = c / f
λ wavelength, in metres
c speed of light, ≈ 3 × 10 8 m/s
f frequency, in hertz (Hz)
100 MHz → 3 m · 2.4 GHz → 12.5 cm · 28 GHz → about 1.07 cm

Notes: A radio wave travels at the speed of light, so its frequency and wavelength are linked by one formula. Work the first example aloud: 3 × 10⁸ divided by 100 × 10⁶ gives 3 metres, the size of FM radio. Then 2.4 GHz gives 12.5 cm, which is Wi-Fi and Bluetooth. The number to remember: higher frequency means shorter wavelength.

## Slide 5 [diagram, 1 diagram]

A radio wave is an oscillating electric and magnetic field
one wavelength, λ
travels at c ≈ 3 × 10⁸ m/s
f = oscillations per second (Hz)
Illustrative: a sine wave, not to scale in amplitude.

Notes: Click one: the wave draws itself from left to right. Click two: the distance between two peaks is one wavelength, lambda. Click three: the speed is the speed of light, and frequency counts oscillations per second. This is the only picture of a radio wave you need for the module. Ask: if frequency doubles, what happens to the peaks? They get closer together.

## Slide 6 [diagram, 1 diagram]

The radio spectrum runs from 3 kHz to 300 GHz
VLF
3–30 kHz
submarine
LF
30–300 kHz
navigation
MF
0.3–3 MHz
AM radio
HF
3–30 MHz
shortwave
VHF
30–300 MHz
FM, TV
UHF
0.3–3 GHz
cellular, GPS
SHF
3–30 GHz
Wi-Fi 5/6, radar
EHF
30–300 GHz
5G mmWave
low: travels far, penetrates walls, little bandwidth
high: lots of bandwidth, short reach
ITU bands. The trade-off to remember is on the arrow.

Notes: Click one: the bands appear. The spectrum is split into eight named bands by the ITU. Click two: the arrow draws. Click three: the trade-off. Low frequencies travel far and go through buildings, but carry little data. High frequencies carry lots of data but do not travel far. Ask the room which band their phone uses: the cellular band is UHF.

## Slide 7 [formula]

Decibels turn multiplying gains into adding them
dB = 10 · log₁₀ (P₂ / P₁)
dB ratio between two powers
dBm power relative to 1 mW: 10 · log₁₀(P / 1 mW)
dBi antenna gain relative to an ideal isotropic antenna

Notes: Signal powers in a real link range over many orders of magnitude, so we use a logarithmic scale. Three units: dB compares two powers, dBm is an absolute power relative to 1 milliwatt, and dBi is antenna gain relative to an ideal isotropic antenna. Keep the principle: in dB, gains and losses add and subtract. That is why link budgets are easy.

## Slide 8 [stats]

Three rules of thumb cover most link arithmetic
+3 dB ≈ double the power (−3 dB ≈ half)
+10 dB = ten times the power (−10 dB = one tenth)
0 dBm = 1 mW (30 dBm = 1 W, −30 dBm = 1 µW)

Notes: Put these three on the board and keep them there. Let students do the arithmetic: 20 dBm is 100 mW, because 20 is 10 plus 10, which is ten times ten times the 1 mW reference. Sanity check: 1 W is 30 dBm, which is about a thousand times 1 mW.

## Slide 9 [image-right, 1 placeholder]

Image placeholder: a half-wave dipole, a Yagi and a flat patch antenna side by side, labelled with their gains
Antenna gain focuses power; it does not create it
An antenna converts current into a radio wave, and back again.
Isotropic antenna: the 0 dBi reference. Half-wave dipole: 2.15 dBi.
Fence: gain does not add energy. A directional antenna sends the same power into a narrower beam.
Phones and home routers use omnidirectional antennas; point-to-point links use directional ones.

Notes: This is the idea students get wrong most often. A high-gain antenna is not an amplifier: it concentrates the same power into a narrower beam, like a torch with a focused lens. Ask: why does a home router not use a dish? Because the signal has to go in all directions to reach phones around the room. Modern systems steer beams electronically with arrays, MIMO and beamforming, which we meet in Module 2.

## Slide 10 [formula]

Free-space path loss grows with distance and frequency
FSPL (dB) = 20 · log₁₀ d
+ 20 · log₁₀ f + 32.44
d distance, in km
f frequency, in MHz
Each doubling of distance or frequency: +6 dB

Notes: Even in empty space the power spreads over a growing sphere, so received power falls with distance. Note the units: kilometres and megahertz. The two rules of thumb are the most useful part. Doubling distance costs 6 dB, and doubling frequency also costs 6 dB. Ask the room to predict the loss at 200 m before the next slide, then check.

## Slide 11 [big-number]

Wi-Fi at 2.4 GHz over 100 m loses about 80 dB
80 dB
Free-space path loss, worked: 20·log₁₀(0.1) = −20.0; 20·log₁₀(2400) = 67.6; −20.0 + 67.6 + 32.44 ≈ 80 dB.
Module 1, section 7 (worked example)

Notes: Walk the three terms on the board, then reveal the number. Note that 2.4 GHz is 2400 MHz in the formula, and 100 m is 0.1 km. The lesson: an 80 dB loss is a very large number, and the link still works, because the transmitter, antenna gains and receiver sensitivity are all designed around it. That is the next part of the module.

## Slide 12 [image-left, 1 placeholder]

Image placeholder: a city street with tall buildings, a corner and a parked car, to illustrate reflection and blocked paths
Real environments reflect, bend, scatter and absorb signals
Reflected by large flat surfaces: buildings, the ground, walls.
Diffracted around edges, reaching shadowed areas.
Scattered by objects smaller than a wavelength: foliage, street signs.
Absorbed by concrete, water and human bodies.
Path loss grows as dⁿ: n = 2 in free space, 2.7–3.5 urban cellular, 4–6 obstructed indoors.

Notes: Free space is the ideal. Real signals do four things, and the exponent n captures how strongly the environment changes the loss with distance. Read the exponent table in the notes: free space 2; in a building with line of sight 1.6 to 1.8; urban cellular 2.7 to 3.5; shadowed urban cellular 3 to 5; obstructed in a building 4 to 6. The bigger n is, the faster the signal dies.

## Slide 13 [bullets]

Multipath makes the signal fade over half a wavelength
Reflections give the receiver several delayed copies of the signal.
Copies in phase add up; copies out of phase cancel.
At 2.4 GHz, half a wavelength is about 6 cm: move that far and the signal can drop sharply.
Delay spread: echoes that arrive spread out in time overlap symbols.
Doppler: f d = v / λ. A car at 30 m/s receiving 2 GHz sees up to 200 Hz shift.

Notes: Multipath is the main enemy of a wireless link. Ask the room what happens when two copies of the same wave arrive in step and out of step. In step they add; out of step they cancel. Fast fading is that effect at small scale. Slow fading, from buildings and hills over tens of metres, is the other kind. Defences: diversity with several antennas, MIMO, error-correcting codes and OFDM, which we reach in Part 2. Doppler: 30 divided by 0.15 gives 200 Hz.

## Slide 14 [formula]

A link budget adds every gain and loss in decibels
P r (dBm) = P t + G t + G r − L
P t transmit power, dBm
G t , G r antenna gains, dBi
L losses, dB (path loss and others)
P r received power, dBm
Wi-Fi, 100 m: 20 + 2 + 2 − 80 = −56 dBm

Notes: This is the formula engineers use every day. Every term is in decibels, so it is simple addition. Gains add and losses subtract. Put the Wi-Fi example on the board: 20 dBm from the transmitter, plus 2 and 2 from the antennas, minus 80 dB of path loss, gives minus 56 dBm at the receiver.

## Slide 15 [diagram, 1 diagram]

Wi-Fi at 100 m arrives at −56 dBm, 34 dB above sensitivity
+20 dBm
transmit power
+2 dBi
transmit antenna
−80 dB
path loss
+2 dBi
receive antenna
−56 dBm
received power
Link margin = −56 − (−90) = 34 dB
sensitivity −90 dBm (example value); the margin absorbs walls, fading and bad days
Left to right: each block adds or subtracts in dB. Arrows draw in as the budget is built.

Notes: Click one: the five blocks. Clicks two to five: the arrows draw from transmitter to receiver, and the total is −56 dBm. Click six: compare with the receiver's sensitivity, −90 dBm in this example. The difference is the link margin, 34 dB. A link with no margin drops out the moment the environment gets worse, so margin is what you design for.

## Slide 16 [section]

Part 2
How fast can we send data?
Modulation, bandwidth and noise set the data rate.

Notes: We have covered how far a signal can go. Now the question is how many bits per second get through that link. The answer comes from how we put bits on the wave, and from a limit set by bandwidth and noise.

## Slide 17 [bullets]

Modulation changes a wave's amplitude, frequency or phase
Amplitude: AM (analog), ASK (digital).
Frequency: FM (analog), FSK (digital).
Phase: PSK (digital).
Amplitude and phase together: QAM (digital).
Bits per symbol = log₂(number of points in the constellation).

Notes: A pure carrier wave carries nothing. We modulate it by changing one property. Ask: how many bits does a symbol carry if there are 4 points? log base 2 of 4 is 2. Give the room a moment before the next slide: 2 points gives 1 bit, 16 points gives 4 bits, 256 points gives 8 bits.

## Slide 18 [chart, 1 placeholder]

Each extra bit doubles the points and needs a cleaner signal
More points per symbol means more bits, but the points sit closer together.
Bits per symbol for each scheme, Module 1 table (section 11). 256-QAM is used near the router; BPSK or QPSK at the edge of coverage.

Notes: Read the bars left to right. Each extra bit doubles the number of points in the constellation, and that is why the bars get taller. The catch is the dark side: denser constellations need a higher SNR, because the points are closer together. That is why modern radios adapt. Near the router you get 256-QAM; at the edge of coverage you drop to BPSK or QPSK. Mention Wi-Fi 6 uses 1024-QAM and Wi-Fi 7 uses 4096-QAM.

## Slide 19 [formula]

Shannon: bandwidth and SNR set the maximum data rate
C = B · log₂(1 + SNR)
C maximum error-free rate, bit/s
B bandwidth, in Hz
SNR as a linear ratio, not in dB
20 MHz, SNR 30 dB (ratio 1000): 20 × 10⁶ · log₂(1001) ≈ 199 Mbit/s per spatial stream

Notes: This is Shannon–Hartley, the most important formula in the module. C is the theoretical ceiling for error-free data. Be careful with SNR: the formula needs the linear ratio. 30 dB is a ratio of 1000. Work the example aloud: log base 2 of 1001 is about 9.97, times 20 million gives about 199 Mbit/s per spatial stream. That is a ceiling, not a typical speed.

## Slide 20 [bullets]

Bandwidth is the strongest lever; SNR helps only logarithmically
More bandwidth: the rate grows linearly with it.
More SNR: the rate grows only logarithmically.
New standards add wider channels and new bands, and MIMO adds parallel streams.
OFDM splits a wide channel into many narrow subcarriers, robust to multipath. Used by Wi-Fi (802.11a/g onward), 4G LTE and 5G NR.

Notes: Ask the room: which is better, doubling bandwidth or doubling SNR? Shannon says bandwidth, because doubling bandwidth doubles the rate, while doubling SNR adds only a little. This explains why every new standard grabs more spectrum. OFDM is the technique that makes wide channels survive multipath, and it is a bridge to the multiple-access part.

## Slide 21 [rows]

Four multiple-access schemes separate users
Separated by frequency: 1G AMPS
Separated by time slot: 2G GSM
Separated by code: 3G UMTS, IS-95
Separated by subcarriers and time: 4G LTE, 5G NR, Wi-Fi 6

Notes: Multiple access answers how many users share one channel. Each row is one way to separate them: frequency, time, code, or subcarriers. The highlighted row is the one you will meet most: 4G, 5G and Wi-Fi 6 all use OFDMA. Ask: why is the 1G row a frequency split? Because each call got its own frequency channel.

## Slide 22 [bullets]

Two-way links use FDD (separate frequencies) or TDD (taking turns)
FDD: separate frequencies for uplink and downlink, at the same time.
TDD: the same frequency, taking turns in time.
TDD makes it easy to shift capacity between uplink and downlink.
Wi-Fi uses CSMA/CA: devices listen before talking and back off if the channel is busy.

Notes: Duplexing is how one device both sends and receives. FDD uses two frequencies, one for each direction, so both happen at once. TDD uses one frequency and switches turns, which is easy to rebalance. Wi-Fi does not schedule users at all; it uses listen-before-talk, so it is a different kind of sharing.

## Slide 23 [diagram, 1 diagram]

Small cells reuse frequencies, so capacity multiplies
A
B
C
B
C
B
C
Many small cells, not one tower
Each cell has its own low-power base station.
Cells far enough apart can reuse the same frequencies.
As a user moves, the session hands over to the next cell.
Smaller cells mean more reuse, so more capacity.
Illustrative: the letters are frequency groups; the same letter marks cells far enough apart to reuse it.

Notes: Click one: the grid of cells. Click two: a handover path draws between two cells. Click three: the text. The idea is that a single powerful tower covers a city poorly, while many small, low-power cells let the same frequencies be reused. More reuse means more capacity. That is why dense cities use small cells and 5G millimetre-wave sites. The letters are only a picture of reuse; real plans depend on the network.

## Slide 24 [two-column]

Regulators split spectrum into licensed and unlicensed bands
Licensed
An operator buys exclusive rights, often at auction. Predictable and interference-managed.
Example: cellular networks
Unlicensed
Anyone may transmit within power rules. Free, but shared and congested.
Example: Wi-Fi, Bluetooth, many IoT devices

Notes: Spectrum is a limited public resource, so it is regulated. The ITU coordinates globally, and national regulators allocate locally, for example the FCC in the United States and Ofcom in the United Kingdom. The 2.4 GHz ISM band runs from 2.400 to 2.4835 GHz and is shared by Wi-Fi, Bluetooth and microwave ovens. In 2020 the FCC opened 1,200 MHz of the 6 GHz band, from 5.925 to 7.125 GHz, for unlicensed use, which Wi-Fi 6E and Wi-Fi 7 use.

## Slide 25 [rows]

Same physics, different trade-offs across five systems
2.4 GHz · about 10 m (typical) · unlicensed
2.4, 5, 6 GHz · tens of metres indoors · unlicensed
600 MHz – 2.6 GHz (varies by country) · hundreds of metres to km · licensed
about 3.5 GHz · hundreds of metres · licensed
24–40 GHz · about 100–300 m, line of sight · licensed

Notes: Each row is the same physics from this module. Frequency sets range and penetration. Bandwidth and SNR set speed. The access scheme and licensing set how many can share. Ask: why does mmWave reach only 100 to 300 m? Because its frequency is high, and high frequencies lose more and are blocked more easily.

## Slide 26 [rows]

Quiz
Check your understanding (1 of 2)
What is the wavelength of a 5 GHz signal?
Convert 100 mW to dBm.
A link has 70 dB of path loss at 50 m. About how much at 100 m in free space?

Notes: Give the room two minutes to work these on paper, then move on. Answers are on the answers slide, and in the notes here: question 1 is 6 cm; question 2 is 20 dBm; question 3 is about 76 dB, because doubling distance adds about 6 dB.

## Slide 27 [rows]

Quiz
Check your understanding (2 of 2)
QPSK or 64-QAM: which carries more bits per symbol, and at what cost?
At high SNR, which raises capacity more: bandwidth or SNR?
Which multiple-access technique do 4G and 5G use?

Notes: Take a show of hands on question 5 before you reveal it. Answers: question 4 is 64-QAM, 6 bits against 2, and it needs a higher SNR. Question 5 is doubling bandwidth. Question 6 is OFDMA.

## Slide 28 [bullets]

Answers
6 cm
20 dBm
About 76 dB
64-QAM: 6 bits vs 2; needs more SNR
Doubling bandwidth
OFDMA

Notes: Reveal one answer per click, and let students check their own work. For question 3, the answer uses the module's rule that doubling the distance adds about 6 dB, which takes 70 dB at 50 m to about 76 dB at 100 m.

## Slide 29 [rows]

Summary: nine ideas to take away
λ = c / f · 0 dBm = 1 mW · FSPL ≈ 80 dB at 100 m, +6 dB per doubling · keep a link margin
Denser modulation needs more SNR · C = B · log₂(1 + SNR): bandwidth is the strongest lever
FDMA → TDMA → CDMA → OFDMA · FDD vs TDD · cells reuse frequencies · licensed and unlicensed bands

Notes: Close on the three questions. How far: a link budget decides it, and margin protects it. How fast: bandwidth is the strongest lever. How many: multiple access and cells share the air. You now have the vocabulary and the arithmetic. Next module we go deeper into antennas and propagation: radiation patterns, MIMO and beamforming. Well done, everyone, and I look forward to seeing you in Module 2.
