## Slide 1 [title]

Wireless 101 · Module 1
How wireless communication works
By the end you can say how far a signal goes, how fast it can carry data and how many users can share the air, and work out the numbers.
Wireless 101 Module 1 50 minutes

Notes: (0.5 min) Welcome. Today we cover the whole of wireless in one sweep. You only need high-school algebra and logarithms.
The promise: by the end of this lecture you will answer three questions about any wireless system, from Bluetooth to satellites: how far, how fast, how many. You will also be able to do the arithmetic yourself: wavelengths, decibels, path loss, a link budget and the Shannon limit.

## Slide 2 [image-right, 1 placeholder]

Image: a collage of everyday wireless devices: a phone, a Wi-Fi router, Bluetooth earbuds, a GPS map, an FM radio, an RFID tag and a satellite dish.
Why wireless matters
A wireless link swaps the cable for a wave
An electromagnetic wave travelling through space does the job of the wire.
Wi-Fi, 4G and 5G, Bluetooth, GPS, broadcast radio and TV, RFID tags, satellite links.

Notes: (1.5 min) A wireless link replaces a cable with an electromagnetic wave travelling through space. That is the whole idea.
Ask the room: how many wireless systems have you used since you woke up? Expect Wi-Fi, the phone network, Bluetooth headphones, maybe GPS. Then add the less obvious ones on the slide: broadcast radio and TV, RFID tags on a bus card, satellite links.
They look very different, but the physics underneath is the same. That leads to the next slide.

## Slide 3 [agenda]

Every wireless system answers three questions
How far can the signal go? propagation · path loss · link budget
How fast can we send data? modulation · bandwidth · noise
How many users can share the air? multiple access · cells · regulation

Notes: (1 min) This is the map for today, and the main idea of the module: every wireless system answers the same three questions.
How far: propagation, path loss and the link budget. How fast: modulation, bandwidth and noise. How many: multiple access, cells and regulation.
Each slide from here on carries a small label, Part 1, 2 or 3, so you always know which question we are on. We come back to these three questions at the end.

## Slide 4 [diagram, 1 diagram]

A short history
About 120 years from equations to a phone in every pocket
1865
Maxwell
predicts EM waves
1886–88
Hertz makes
radio waves
1901
Marconi
transatlantic signal
1979–83
1G analog
Tokyo, AMPS
1991
2G GSM, digital
first call, Finland
1997
Wi-Fi
IEEE 802.11
1999
Bluetooth 1.0
2009
4G LTE
Stockholm, Oslo
2019
5G networks
first commercial
Not to scale. Each generation mainly changed how efficiently the same spectrum is used.

Notes: (1.5 min) Click 1: the physics. Maxwell published the equations predicting electromagnetic waves in 1865. Hertz generated and detected radio waves in the lab between 1886 and 1888. In 1901 Marconi received a transatlantic radio signal.
Click 2: the systems you use. 1G analog cellular: Tokyo 1979, AMPS in the US 1983. The first GSM call, 2G and digital, in Finland in 1991. The first IEEE 802.11 Wi-Fi standard in 1997. Bluetooth 1.0 in 1999. The first commercial 4G LTE network in Stockholm and Oslo in 2009, and the first commercial 5G networks in 2019.
The takeaway: about 120 years from equations to a phone in every pocket, and each generation mainly changed how efficiently the same spectrum is used. Keep that in mind when we reach modulation and multiple access.

## Slide 5 [diagram, 1 diagram]

Part 1 · How far
Wavelength and frequency are locked together: λ = c / f
λ = wavelength, peak to peak (m)
f = frequency: oscillations each second (Hz)
travels at c ≈ 3 × 10⁸ m/s

Notes: (2 min) A radio wave is an oscillating electric and magnetic field that travels at the speed of light, c, about 3 times 10 to the 8 metres per second.
Click 1: the wave draws. Click 2: the wavelength, lambda, is the distance between two peaks, in metres. Click 3: frequency, f, is how many oscillations pass each second, in hertz.
Because the wave always travels at c, the two are locked: lambda equals c divided by f. Double the frequency and the wavelength halves. This one formula is objective 1 of the module.

## Slide 6 [comparison]

Higher frequency, shorter wave: 2.4 GHz is 12.5 cm
Frequency Use Wavelength
100 MHz FM radio 3 m
900 MHz cellular 33 cm
2.4 GHz Wi-Fi, Bluetooth, microwaves 12.5 cm
5 GHz Wi-Fi 6 cm
28 GHz 5G millimetre wave about 1.07 cm

Notes: (1 min) Work one example out loud: 3 times 10 to the 8 divided by 2.4 times 10 to the 9 is 0.125 metres, 12.5 centimetres. Students can check the others at home.
Why it matters, two reasons. First, antenna size scales with wavelength: a quarter-wave antenna at 2.4 GHz is about 3.1 cm, which is why it fits inside a phone. Second, higher frequencies lose more energy and are blocked more easily by walls, bodies and rain. Hold on to that second point; it comes back on the next slide.

## Slide 7 [diagram, 1 diagram]

Part 1 · How far
Low bands travel far; high bands carry the bandwidth
3 kHz
300 GHz
VLF
3 kHz
to 30 kHz
LF
30 kHz
to 300 kHz
MF
300 kHz
to 3 MHz
HF
3 MHz
to 30 MHz
VHF
30 MHz
to 300 MHz
UHF
300 MHz
to 3 GHz
SHF
3 GHz
to 30 GHz
EHF
30 GHz
to 300 GHz
submarines
beacons
AM radio
shortwave
FM radio, TV
cellular, Wi-Fi
Wi-Fi, radar
mmWave 5G
Lower: farther, through walls, little bandwidth
Higher: lots of bandwidth, short range

Notes: (2 min) The ITU divides the radio spectrum, from 3 kHz to 300 GHz, into bands. Click 1: the eight bands, each ten times higher than the last.
Click 2: what lives where. VLF for submarine communication, LF for navigation beacons, MF for AM radio, HF for shortwave and amateur radio, VHF for FM radio, TV and air-band. UHF is the busy one: cellular, Wi-Fi at 2.4 GHz, Bluetooth and GPS. SHF holds Wi-Fi at 5 and 6 GHz, satellite and radar. EHF holds millimetre-wave 5G and radar.
Click 3: the trade-off to remember. Low frequencies travel far and penetrate buildings but carry little bandwidth; high frequencies carry lots of bandwidth but travel short distances. Almost every design decision in wireless is a position on this line.

## Slide 8 [formula]

Part 1 · How far
Decibels shrink a huge range of powers to small numbers
dBm = 10 · log 10 ( P / 1 mW)
dB a ratio: 10 · log 10 (P 2 / P 1 )
dBm absolute power, relative to 1 milliwatt
dBi antenna gain, relative to an ideal isotropic antenna
P the power you are converting
100 mW → 10 · log₁₀(100) = 20 dBm

Notes: (2 min) Signal powers in a link range over many orders of magnitude: a transmitter at 1 watt, a receiver at 0.000000001 milliwatt. Nobody wants to write those zeros, so engineers use a logarithmic scale.
Three units. dB is a ratio between two powers: 10 log10 of P2 over P1. dBm is an absolute power, measured against 1 milliwatt. dBi is antenna gain, measured against an ideal isotropic antenna; we meet it in two slides.
Worked example at the bottom: 100 mW is 100 times 1 mW, log10 of 100 is 2, times 10 is 20 dBm. This is quiz question 2, so make sure everyone follows it.

## Slide 9 [diagram, 1 diagram]

Part 1 · How far
On the dB scale, ×10 is just +10 dB
dBm
−90
1 pW
receiver
−30
1 µW
0
1 mW
+20
100 mW
+30
1 W
transmitter
+10 dB = ×10
+3 dB ≈ double · −3 dB ≈ half · in dB, gains and losses add

Notes: (2 min) Click 1: the table from the module on one line. 1 W is 30 dBm, 100 mW is 20 dBm, 1 mW is 0 dBm, 1 microwatt is minus 30 dBm, 1 picowatt is minus 90 dBm. A whole link, transmitter to receiver, fits on one ruler.
Click 2: the step from 100 mW to 1 W is ten times the power, and on this scale it is just plus 10 dB. Minus 10 dB is one tenth.
Click 3: the rules of thumb to memorise. Plus 3 dB is about double the power, minus 3 dB about half. And the big one: in dB, gains and losses add and subtract instead of multiplying. That is why link budgets are easy, as you will see shortly.

## Slide 10 [image-left, 1 placeholder]

Image: real antennas side by side: a half-wave dipole, a Yagi, a flat patch and a dish.
Part 1 · How far
Antenna gain focuses power; it never creates it
Isotropic: equal in all directions, 0 dBi, a theoretical reference
Half-wave dipole: 2.15 dBi
Yagi, patch, dish: more gain, narrower beam
Arrays: MIMO and beamforming steer beams electronically

Notes: (2 min) An antenna converts electrical current into a radio wave when transmitting and back when receiving; the same antenna works both ways.
The isotropic antenna radiates equally in all directions. It is a theoretical reference, 0 dBi. A real half-wave dipole has a gain of 2.15 dBi.
The point to stress, and the common misconception: gain does not create energy. A directional antenna such as a Yagi, patch or dish focuses the same power into a narrower beam. More gain means a narrower beamwidth, like a torch with a tighter focus.
So: omnidirectional antennas suit phones and home routers; directional antennas suit point-to-point links and base-station sectors. Modern systems use arrays, MIMO and beamforming, to steer beams electronically. Module 2 covers this in depth.

## Slide 11 [diagram, 1 diagram]

Part 1 · How far
Even empty space costs about 80 dB over 100 m of Wi-Fi
FSPL (dB) = 20 · log₁₀(d) + 20 · log₁₀(f) + 32.44
d in km, f in MHz · example: Wi-Fi, d = 0.1 km, f = 2400 MHz
20 · log₁₀(0.1)
−20.0
+
20 · log₁₀(2400)
67.6
+
constant
32.44
=
path loss
≈ 80 dB
Double the distance → about +6 dB
Double the frequency → about +6 dB

Notes: (2.5 min) Even in empty space, power spreads over a growing sphere, so received power falls with distance. Picture a balloon being blown up: the same paint spread over more surface.
Click 1: the free-space path loss formula, with d in kilometres and f in megahertz. Click 2: plug in Wi-Fi at 2.4 GHz over 100 m. 20 log10 of 0.1 is minus 20.0. 20 log10 of 2400 is 67.6. Add the constant 32.44. Click 3: about 80 dB.
Click 4: two rules of thumb. Doubling the distance adds about 6 dB of loss; doubling the frequency also adds about 6 dB. You need the first one for quiz question 3.

## Slide 12 [diagram, 1 diagram]

Part 1 · How far
Real environments bend, bounce, scatter and swallow the signal
Reflection
buildings, ground, walls
Diffraction
rooftops, corners
Scattering
foliage, street signs
Absorption
weaker
concrete, water, bodies

Notes: (1.5 min) Real environments are not free space. Four things can happen, one per click.
Reflection: large flat surfaces such as buildings, the ground and walls bounce the signal. Diffraction: the signal bends around edges like rooftops and corners, which lets it reach shadowed areas; that is why you get some signal behind a building. Scattering: objects smaller than a wavelength, such as foliage and street signs, spray it in many directions. Absorption: materials such as concrete, water and human bodies soak up energy.
Link back to the wavelength table: at 2.4 GHz a wavelength is 12.5 cm, so a lot of everyday objects are "small" or "large" compared with it.

## Slide 13 [diagram, 1 diagram]

Part 1 · How far
Indoors and in cities, loss grows faster than in free space
1
2
3
4
5
6
exponent n
In building, line of sight
Free space
Urban cellular
Shadowed urban cellular
In building, obstructed
1.6–1.8
2
2.7–3.5
3–5
4–6
Path loss grows with distance as dⁿ.

Notes: (1 min) Path loss grows with distance as d to the n, where n is the path-loss exponent. Free space is n equals 2, which is where the "plus 6 dB per doubling" rule comes from.
Click: the ranges. Urban cellular 2.7 to 3.5. Shadowed urban cellular 3 to 5. Inside a building with line of sight, 1.6 to 1.8, even lower than free space. Inside a building with obstructions, 4 to 6, the worst case on the chart.
Message: a bigger n means the signal dies off much faster with distance than our free-space calculation suggested.

## Slide 14 [diagram, 1 diagram]

Part 1 · How far
Echoes can add up or cancel out: that is fading
In phase: stronger
copy 1
copy 2
sum
Out of phase: weaker
copy 1
copy 2
sum
Move half a wavelength (about 6 cm at 2.4 GHz) and one turns into the other

Notes: (2 min) Because of reflections, the receiver gets several copies of the signal arriving at slightly different times. That is multipath.
Click 1: if the copies arrive in phase, peaks line up with peaks and the sum is stronger. Click 2: if they arrive out of phase, peaks meet troughs and the sum can almost vanish.
Click 3: the surprise. Signal strength can drop sharply when the receiver moves just half a wavelength, about 6 cm at 2.4 GHz. That is fast, or small-scale, fading. It is why moving your phone a few centimetres can change the bars.

## Slide 15 [bullets]

Multipath is the main enemy
Slow fading: buildings and hills, over tens of metres
Delay spread: late echoes overlap symbols
Doppler, f d = v / λ: 30 m/s at 2 GHz gives up to 200 Hz
Defences: diversity, MIMO, error-correcting codes, OFDM

Notes: (2 min) Three more effects, then the cure.
Slow fading, or shadowing: large obstacles such as buildings or hills cause slower changes over tens of metres. Delay spread: if echoes arrive spread out in time, one symbol overlaps the next; that is inter-symbol interference.
Doppler shift: motion changes the received frequency by f_d equals v over lambda. Worked example: a car at 30 m/s, that is 108 km/h, receiving a 2 GHz signal, wavelength 0.15 m. 30 divided by 0.15 is 200 Hz of shift at most.
Defences: diversity with several antennas, MIMO, error-correcting codes, and OFDM, which we meet in Part 2. So far: how far a signal goes. Next we turn that into one number we can design with.

## Slide 16 [formula]

Part 1 · How far
A link budget is just addition
P r = P t + G t + G r − L
P r received power (dBm)
P t transmit power (dBm)
G t , G r antenna gains, transmit and receive (dBi)
L losses, such as path loss (dB)

Notes: (1 min) Here is the payoff for learning decibels. A link budget adds up every gain and loss between transmitter and receiver.
Received power in dBm equals transmit power in dBm, plus transmit antenna gain, plus receive antenna gain, all in dBi, minus the losses in dB. No multiplication anywhere. Next slide: we run it for the same Wi-Fi link as before.

## Slide 17 [diagram, 1 diagram]

Part 1 · How far
Our Wi-Fi link arrives at −56 dBm, with 34 dB to spare
Transmit +20 dBm
Tx antenna +2 dBi
−80 dB
path loss
Rx antenna +2 dBi
Received −56 dBm
Receiver sensitivity −90 dBm (example value)
34 dB margin

Notes: (2.5 min) Walk it one click at a time, the room adding up with you.
Click 1: transmit power plus 20 dBm, that is 100 mW. Click 2: transmit antenna plus 2 dBi. Click 3: free-space path loss minus 80 dB, the number we calculated earlier; notice how it dwarfs everything else. Click 4: receive antenna plus 2 dBi. Received power: 20 plus 2 plus 2 minus 80 is minus 56 dBm.
Click 5: if the receiver needs at least minus 90 dBm, its sensitivity (an example value), the link margin is minus 56 minus minus 90, which is 34 dB. The margin absorbs walls, fading and bad days. A link with no margin will drop out.
That closes Part 1, how far. Part 2: once the signal arrives, how fast can it carry data?

## Slide 18 [diagram, 1 diagram]

Part 2 · How fast
To carry bits, change the wave's amplitude, frequency or phase
Carrier
no information
Amplitude
AM · ASK
Frequency
FM · FSK
Phase
PSK
The bits 1 0 1 1 0, sent three ways. QAM changes amplitude and phase together.

Notes: (1.5 min) Part 2, how fast. Click 1: a pure carrier wave carries no information; it repeats forever. We modulate it by changing one of its properties.
Click 2: amplitude. Analog is AM, digital is ASK: big wave for a 1, small wave for a 0. Click 3: frequency. Analog FM, digital FSK. Click 4: phase. Digital PSK: the wave flips over when the bit changes.
Change amplitude and phase together and you get QAM, the workhorse of modern Wi-Fi and cellular. That is the next slide.

## Slide 19 [diagram, 1 diagram]

Part 2 · How fast
More points per symbol means more bits, and less room for noise
QPSK · 4 points
2 bits per symbol
16-QAM · 16 points
4 bits per symbol
64-QAM · 64 points
6 bits per symbol
Bits = log₂(points): BPSK 1 · 256-QAM 8 · 1024-QAM (Wi-Fi 6) 10 · 4096-QAM (Wi-Fi 7) 12

Notes: (2 min) Each distinct symbol carries log2 of the number of points in the constellation. Each dot is one allowed combination of amplitude and phase.
Click 1: QPSK, 4 points, 2 bits per symbol. Click 2: 16-QAM, 16 points, 4 bits. Click 3: 64-QAM, 64 points, 6 bits. Click 4: the rest of the ladder: BPSK 1 bit, 256-QAM 8, 1024-QAM in Wi-Fi 6 gives 10, 4096-QAM in Wi-Fi 7 gives 12.
The catch: look how the dots crowd together. Denser constellations put points closer, so a little noise makes the receiver pick the wrong one. They need a cleaner signal, a higher SNR. So modern radios use adaptive modulation: 256-QAM near the router, BPSK or QPSK at the edge of coverage. This is quiz question 4.

## Slide 20 [formula]

Part 2 · How fast
Shannon sets the speed limit of every channel
C = B · log 2 (1 + SNR)
C maximum error-free data rate (bit/s)
B bandwidth (Hz)
SNR signal-to-noise ratio, as a linear ratio
20 MHz, SNR 30 dB (×1000): 20 × 10⁶ · log₂(1001) ≈ 199 Mbit/s

Notes: (2 min) Signal-to-noise ratio, SNR, says how much stronger the signal is than the background noise, usually in dB.
The Shannon–Hartley theorem gives the maximum error-free data rate of a channel: C equals B times log2 of 1 plus SNR. C in bits per second, B in hertz, and careful: SNR as a linear ratio, not in dB.
Worked example: a 20 MHz Wi-Fi channel with SNR of 30 dB, a ratio of 1000. log2 of 1001 is about 9.97, so C is about 199 Mbit/s per spatial stream. That is a theoretical ceiling; no real radio reaches it.

## Slide 21 [two-column]

Part 2 · How fast
Bandwidth is the strongest lever for speed
More bandwidth
Rate grows linearly, so standards add wider channels and new bands.
More SNR
Rate grows only logarithmically, so MIMO adds antennas for parallel streams.
OFDM
Many narrow, slow subcarriers resist multipath. Used by Wi-Fi, 4G LTE and 5G NR.

Notes: (1.5 min) Read the formula again. Bandwidth multiplies everything, so rate grows linearly with it. SNR sits inside a logarithm, so more SNR helps only slowly. That is why new standards keep adding spectrum, wider channels and new bands, and antennas: MIMO adds parallel streams. This is quiz question 5.
Third column: OFDM splits a wide channel into many narrow subcarriers, each modulated slowly. Slow symbols are long, so echoes from multipath do much less damage. Wi-Fi since 802.11a/g, 4G LTE and 5G NR all use OFDM.
That closes Part 2. Part 3: how many users can share the air?

## Slide 22 [diagram, 1 diagram]

Part 3 · How many
Users can be split by frequency, time, code, or all of them
FDMA
by frequency
1G AMPS
TDMA
by time slot
2G GSM
CDMA
by code
3G UMTS, IS-95
OFDMA
subcarriers and time
4G, 5G, Wi-Fi 6
In each box time runs left to right and frequency bottom to top; each shade is one user.

Notes: (2 min) Part 3, how many. Multiple access is how many users share a channel. Picture a party where everyone wants to talk.
Click 1: FDMA separates users by frequency, each gets their own strip: 1G AMPS. Click 2: TDMA separates them by time slot, taking turns: 2G GSM, with 8 time slots per 200 kHz carrier. Click 3: CDMA lets everyone talk at once over the whole channel, separated by code, like conversations in different languages: 3G UMTS (WCDMA) and IS-95. Click 4: OFDMA hands out small tiles of subcarriers and time: 4G LTE, 5G NR and Wi-Fi 6. This is quiz question 6.

## Slide 23 [two-column]

Part 3 · How many
A radio must both talk and listen
FDD
Separate frequencies for uplink and downlink, at the same time.
TDD
One frequency, taking turns in time; capacity shifts easily between up and down.
Wi-Fi
Listen before talking (CSMA/CA) and back off if the channel is busy.

Notes: (1 min) Duplexing is how one device both sends and receives.
FDD, frequency-division duplex: separate frequencies for uplink and downlink, used at the same time, like a two-lane road. TDD, time-division duplex: the same frequency, taking turns in time, like a one-lane bridge with traffic lights; it is easy to shift capacity between uplink and downlink.
Wi-Fi shares the channel differently: devices listen before talking, CSMA/CA, and back off if the channel is busy, much like polite conversation in a seminar.

## Slide 24 [diagram, 1 diagram]

Part 3 · How many
Many small cells reuse the same frequencies
One powerful tower
B
A
C
A
C
B
A
C
B
A
C
B
A
C
B
A
B
A
C
Same letter = same frequencies
handover

Notes: (1.5 min) Click 1: the naive design, one powerful tower covering a whole city. Everyone shares one set of frequencies.
Click 2: the cellular concept. Divide the area into many small cells, each with a low-power base station. Cells far enough apart can reuse the same frequencies, here every cell marked A, multiplying total capacity.
Click 3: handover. As a user moves, the call or data session passes from one cell to the next without dropping.
Smaller cells mean more reuse and more capacity; that is why dense cities use small cells and 5G millimetre-wave sites.

## Slide 25 [image-right, 1 placeholder]

Image: a home Wi-Fi router next to a microwave oven, both working in the 2.4 GHz ISM band.
Part 3 · How many
Spectrum is shared, so regulators decide who may use it
ITU coordinates globally; the FCC (US) and Ofcom (UK) allocate locally
Licensed: exclusive, often auctioned; cellular
Unlicensed: anyone within power rules; Wi-Fi, Bluetooth
2020: FCC opened 1,200 MHz at 6 GHz for Wi-Fi 6E and 7

Notes: (1 min) Spectrum is a limited, shared public resource, so it is regulated. The ITU, the International Telecommunication Union, coordinates globally; national regulators allocate locally, for example the FCC in the United States and Ofcom in the United Kingdom.
Licensed spectrum: an operator buys exclusive rights, often at auction. That is cellular: predictable and interference-managed. Unlicensed spectrum: anyone may transmit if they follow power rules. That is Wi-Fi, Bluetooth and many IoT devices: free, but shared and congested.
The 2.4 GHz ISM band, 2.400 to 2.4835 GHz, is used by Wi-Fi, Bluetooth and microwave ovens, which is why the picture shows a router next to a microwave. In 2020 the FCC opened 1,200 MHz of the 6 GHz band, 5.925 to 7.125 GHz, for unlicensed use, used by Wi-Fi 6E and Wi-Fi 7.

## Slide 26 [comparison]

Putting it together
Every system is the same physics, tuned differently
System Typical bands Typical range Spectrum
Bluetooth 2.4 GHz about 10 m unlicensed
Wi-Fi 2.4, 5, 6 GHz tens of metres indoors unlicensed
4G LTE 600 MHz – 2.6 GHz hundreds of m to km licensed
5G mid-band about 3.5 GHz hundreds of metres licensed
5G mmWave 24–40 GHz about 100–300 m, line of sight licensed

Notes: (1 min) This is the main idea for the second time, now with real systems. Each row is the same physics from this module: frequency sets range and penetration, bandwidth and SNR set speed, and the access scheme and licensing set how many can share.
Read down the bands and the ranges together: Bluetooth at 2.4 GHz reaches about 10 m typically; 4G LTE, as low as 600 MHz (bands vary by country), reaches hundreds of metres to kilometres; 5G mmWave at 24 to 40 GHz reaches about 100 to 300 m, and only with line of sight. That is the spectrum trade-off from Part 1, live.

## Slide 27 [rows]

Check your understanding · 1 of 3
Three quick ones on how far
What is the wavelength of a 5 GHz signal?
6 cm
Convert 100 mW to dBm.
20 dBm
70 dB of path loss at 50 m: roughly how much at 100 m in free space?
About 76 dB

Notes: (2 min) Give the room about 20 seconds per question to work it out with a neighbour, then click to reveal.
Q1: lambda equals c over f, 3 times 10 to the 8 over 5 times 10 to the 9, is 6 cm. Q2: 10 log10 of 100 is 20 dBm. Q3: going from 50 to 100 m doubles the distance, which adds about 6 dB in free space, so about 76 dB.

## Slide 28 [rows]

Check your understanding · 2 of 3
Two on how fast
QPSK or 64-QAM: which carries more bits per symbol, and at what cost?
64-QAM, 6 bits against 2; it needs a higher SNR
At high SNR, which raises capacity more: doubling bandwidth or doubling SNR?
Doubling bandwidth

Notes: (1 min) Q4: 64-QAM carries 6 bits per symbol against 2 for QPSK, but its points sit closer together, so it needs a higher SNR. Q5: doubling bandwidth, because in Shannon's formula bandwidth multiplies the rate while SNR sits inside a logarithm.

## Slide 29 [quiz]

Check your understanding · 3 of 3
Which multiple-access technique do 4G and 5G use?
FDMA
TDMA
CDMA
OFDMA

Notes: (1 min) Take a show of hands for each option before clicking. Answer: OFDMA, groups of subcarriers and time, used by 4G LTE, 5G NR and Wi-Fi 6. FDMA was 1G, TDMA was 2G GSM, CDMA was 3G.

## Slide 30 [two-column]

Summary
You can now answer how far, how fast and how many
How far
λ = c / f
+3 dB ≈ ×2, +10 dB = ×10
P r = P t + G t + G r − L; keep a margin
How fast
Denser constellations need more SNR
C = B · log₂(1 + SNR)
Bandwidth is the strongest lever
How many
FDMA → TDMA → CDMA → OFDMA
FDD or TDD; cells reuse frequencies
Licensed and unlicensed bands

Notes: (1 min) The main idea for the third time: every wireless system answers three questions, and you now have the tools for each.
How far: lambda equals c over f, so higher frequency means smaller antennas, more bandwidth and shorter range. Decibels turn multiplication into addition: 0 dBm is 1 mW, plus 3 dB about doubles, plus 10 dB is ten times. Free-space loss is about 80 dB for 100 m at 2.4 GHz, plus 6 dB per doubling of distance. Real channels reflect, diffract, scatter and fade; multipath is the main enemy. And the link budget adds it all up; keep a margin.
How fast: modulation packs bits per symbol, denser constellations need more SNR, and Shannon says bandwidth is the strongest lever. How many: FDMA to TDMA to CDMA to OFDMA, FDD versus TDD, cells reuse frequencies, and regulators split spectrum into licensed and unlicensed bands.
Next module, Module 2: antennas and propagation in depth, radiation patterns, MIMO and beamforming. You walked in with no radio background; you are walking out able to size a real link on paper. Well done, and see you next week.
