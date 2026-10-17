## Slide 1 [title]

Wireless 101 · Module 1
How wireless communication works
50 minutes, no radio background needed

Notes: Welcome. Today is one lecture, six learning objectives, and no radio background assumed. You only need high-school algebra and logarithms.
Say the promise early: by the end you can reason about any wireless system with three questions.

## Slide 2 [agenda]

By the end you can answer three questions about any wireless system
How far can the signal go? propagation, path loss, link budget
How fast can we send data? modulation, bandwidth, noise
How many users can share the air? multiple access, cells, regulation

Notes: This is the main idea, said the first of three times: every wireless system answers how far, how fast and how many. These three questions structure the module.
Fence: we are not studying one product or one standard such as Wi-Fi or 5G. We study the shared physics underneath all of them.
Learning objectives to read out: convert frequency and wavelength; work in dB and dBm; compute free-space path loss and a link budget; describe reflection, multipath and fading; explain modulation and the Shannon limit; explain multiple access, duplexing, cells and regulation.

## Slide 3 [image-left, 1 placeholder]

Image: a phone, a Wi-Fi router, a GPS receiver and an RFID tag shown together
1 · Why wireless matters
A wireless link swaps a cable for a wave in space
Wi-Fi, 4G/5G, Bluetooth, GPS, broadcast radio and TV, RFID tags, satellite links.

Notes: A wireless link replaces a cable with an electromagnetic wave travelling through space.
Everyday examples: Wi-Fi, cellular 4G and 5G, Bluetooth, GPS, broadcast radio and TV, RFID tags and satellite links. Ask the room which of these they used today.
Image placeholder: a simple photo of several of these devices together.

## Slide 4 [timeline]

2 · A short history
From equations to a phone in every pocket in about 120 years
1865 Maxwell
Equations predict electromagnetic waves
1886–88 Hertz
Generates and detects radio waves in the lab
1901 Marconi
Transatlantic radio signal
1991 GSM
First 2G digital call, in Finland
2019 5G
First commercial networks

Notes: Walk the timeline: Maxwell publishes the equations in 1865. Hertz generates and detects radio waves in the lab in 1886 to 1888. Marconi receives a transatlantic signal in 1901.
Not on the slide, but part of the history: 1G analog cellular in 1979 to 1983 (Tokyo 1979, AMPS in the US 1983); first IEEE 802.11 Wi-Fi standard in 1997; Bluetooth 1.0 in 1999; first commercial 4G LTE network in Stockholm and Oslo in 2009.
Takeaway: about 120 years from equations to a phone in every pocket. Each generation mainly changed how efficiently the same spectrum is used.

## Slide 5 [diagram, 1 diagram]

3 · Radio waves
A radio wave is an oscillating field with wavelength λ = c / f
λ wavelength (metres)
f: oscillations per second (hertz)
c ≈ 3 × 10⁸ m/s

Notes: A radio wave is an oscillating electric and magnetic field that travels at the speed of light, c about 3 times 10 to the 8 metres per second.
Frequency f is oscillations per second, measured in hertz. Wavelength lambda is the distance between two peaks, in metres.
They are linked by lambda equals c over f. The diagram draws itself: first the wave, then the wavelength between two peaks, then the labels.

## Slide 6 [comparison]

3 · Radio waves
Higher frequency means shorter wavelength: 100 MHz is 3 m, 28 GHz about 1 cm
Frequency Use Wavelength
100 MHz FM radio 3 m
900 MHz Cellular 33 cm
2.4 GHz Wi-Fi, Bluetooth, microwave ovens 12.5 cm
5 GHz Wi-Fi 6 cm
28 GHz 5G millimetre wave about 1.07 cm

Notes: Worked examples of lambda equals c over f. For 100 MHz, 3 times 10 to the 8 divided by 10 to the 8 gives 3 m. Let students try 5 GHz themselves: it is 6 cm, which is quiz question 1.
Why it matters: antenna size scales with wavelength. A quarter-wave antenna at 2.4 GHz is about 3.1 cm. Higher frequencies also lose more energy and are blocked more easily by walls, bodies and rain.

## Slide 7 [comparison]

4 · The radio spectrum
The ITU splits 3 kHz–300 GHz into bands; the low ones reach far
Band Range Example uses
VLF 3–30 kHz Submarine communication
LF 30–300 kHz Navigation beacons
MF 300 kHz–3 MHz AM radio
HF 3–30 MHz Shortwave, amateur radio

Notes: The ITU divides the radio spectrum, 3 kHz to 300 GHz, into bands. You do not need to memorise them; notice that each decade of frequency has typical uses.
The low bands first: VLF for submarine communication, LF for navigation beacons, MF for AM radio, HF for shortwave and amateur radio.

## Slide 8 [comparison]

4 · The radio spectrum
The upper bands carry FM, TV, cellular, Wi-Fi, GPS, satellite and radar
Band Range Example uses
VHF 30–300 MHz FM radio, TV, air-band
UHF 300 MHz–3 GHz Cellular, Wi-Fi 2.4 GHz, Bluetooth, GPS
SHF 3–30 GHz Wi-Fi 5/6 GHz, satellite, radar
EHF 30–300 GHz Millimetre-wave 5G, radar

Notes: Point out UHF: cellular, 2.4 GHz Wi-Fi, Bluetooth and GPS all live there. Then SHF for 5 and 6 GHz Wi-Fi, satellite and radar, and EHF for millimetre-wave 5G and radar.

## Slide 9 [diagram, 1 diagram]

4 · The radio spectrum
Low frequencies travel far; high frequencies carry more bandwidth
Low frequency
Travels far
Penetrates buildings
Little bandwidth
High frequency
Lots of bandwidth
Short distances

Notes: Trade-off to remember: low frequencies travel far and penetrate buildings but carry little bandwidth. High frequencies carry lots of bandwidth but travel short distances.
This is the thesis restated a second way: range and speed pull against each other, which is why networks use many bands at once.

## Slide 10 [formula]

5 · Decibels
Decibels turn multiplying into adding
dB = 10 · log 10 ( P 2 / P 1 )
+3 dB about double the power (−3 dB: half)
+10 dB 10 times the power (−10 dB: one tenth)
Add gains and losses add and subtract instead of multiplying
Why powers span many orders of magnitude

Notes: Signal powers in a link range over many orders of magnitude: a transmitter at 1 W, a receiver at 0.000000001 mW. So engineers use a logarithmic scale.
dB equals 10 log10 of P2 over P1. Rules of thumb: plus 3 dB is about double, minus 3 dB about half, plus 10 dB is ten times, minus 10 dB one tenth.
In dB, gains and losses add and subtract instead of multiplying. This is why link budgets are easy; we use that in a few minutes.

## Slide 11 [comparison]

5 · Decibels
dBm anchors decibels to 1 mW: 0 dBm = 1 mW
Power dBm
1 W 30 dBm
100 mW 20 dBm
1 mW 0 dBm
1 µW −30 dBm
1 pW −90 dBm

Notes: dBm is absolute power relative to 1 milliwatt: dBm equals 10 log10 of P over 1 mW. dBi, used next, is antenna gain relative to an ideal isotropic antenna.
Read down the table: 1 W is 30 dBm, 100 mW is 20 dBm (quiz question 2), 1 mW is 0 dBm, 1 microwatt is minus 30 and 1 picowatt is minus 90 dBm. A receiver works at the bottom of this table.

## Slide 12 [diagram, 1 diagram]

6 · Antennas
Gain does not create energy: it focuses it into a narrower beam
Isotropic: 0 dBi
equal in all directions
Directional: more gain
same power, narrower beam
Omnidirectional suits phones and routers; directional suits point-to-point links and base-station sectors. Arrays (MIMO, beamforming) steer beams electronically.

Notes: An antenna converts electrical current into a radio wave when transmitting and back when receiving; the same antenna works both ways.
The isotropic antenna radiates equally in all directions. It is a theoretical reference, 0 dBi. A half-wave dipole has a gain of 2.15 dBi.
Gain does not create energy. A directional antenna such as a Yagi, patch or dish focuses the same power into a narrower beam. More gain means narrower beamwidth.
Fence: gain is not extra power, it is a redistribution.

## Slide 13 [formula]

7 · Propagation
Even in empty space, signal power falls with distance
FSPL = 20·log 10 ( d ) + 20·log 10 ( f ) + 32.44
d, f distance in km, frequency in MHz
Worked 2.4 GHz, 100 m: −20.0 + 67.6 + 32.44 ≈ 80 dB
×2 d doubling distance adds about 6 dB
×2 f doubling frequency adds about 6 dB

Notes: Even in empty space, power spreads over a growing sphere, so received power falls with distance.
Free-space path loss in dB is 20 log10 of d plus 20 log10 of f plus 32.44, with d in kilometres and f in megahertz.
Worked example, Wi-Fi at 2.4 GHz over 100 m: 20 log10 of 0.1 is minus 20.0; 20 log10 of 2400 is 67.6; add 32.44 and you get about 80 dB.
Rules of thumb: doubling the distance adds about 6 dB, and doubling the frequency also adds about 6 dB. That is quiz question 3.

## Slide 14 [diagram, 1 diagram]

7 · Propagation
The same power spreads over a bigger sphere, so each doubling costs 6 dB
Tx
d
2d: +6 dB

Notes: Picture the transmitter at the left. The wave spreads out over a sphere. At distance d the power is spread over some area; at distance 2d the area is larger, so each unit of area gets less.
In decibels, that doubling of distance is about 6 dB of extra loss. Click to draw the first arc, then the second.

## Slide 15 [diagram, 1 diagram]

8 · Propagation in the real world
Real signals are reflected, diffracted, scattered and absorbed
Tx
Rx
Reflected
Diffracted over the roof
Absorbed
Scattered: foliage, signs

Notes: Real environments are not free space. A signal can be reflected by large flat surfaces such as buildings, the ground and walls.
Diffracted around edges such as rooftops and corners, which lets signals reach shadowed areas. Scattered by objects smaller than a wavelength, such as foliage and street signs. Absorbed by materials such as concrete, water and human bodies.
Click through: reflection first, then diffraction over the roof, then absorption and scattering.

## Slide 16 [comparison]

8 · Propagation in the real world
Path loss grows as dⁿ, and the exponent n depends on where you are
Environment Path-loss exponent n
Free space 2
Urban cellular 2.7–3.5
Shadowed urban cellular 3–5
In building, line of sight 1.6–1.8
In building, obstructed 4–6

Notes: Path loss grows with distance as d to the power n, where n is the path-loss exponent. Free space is n equals 2.
Urban cellular is 2.7 to 3.5, shadowed urban 3 to 5. Inside buildings it is 1.6 to 1.8 with line of sight and 4 to 6 when obstructed. A bigger n means the signal dies faster with distance.

## Slide 17 [diagram, 1 diagram]

9 · Multipath and fading
Reflections deliver several copies of the signal, and they add up or cancel
Tx
Rx
Direct copy
Reflected copy: arrives later
Another reflected copy
Defences: diversity (several antennas), MIMO, error-correcting codes, OFDM.

Notes: Because of reflections, the receiver gets several copies of the signal arriving at slightly different times. That is multipath.
The copies add in phase, which is stronger, or out of phase, which is weaker. Click to see the direct path, then the reflected copies.
Defences, shown in the caption: diversity with several antennas, MIMO, error-correcting codes, and OFDM, which we meet in the Shannon section.

## Slide 18 [stats]

9 · Multipath and fading
Moving a few centimetres can sharply change the signal
6 cm Fast fading: half a wavelength at 2.4 GHz
10s of m Slow fading (shadowing): buildings, hills
ISI Delay spread: echoes spread in time, symbols overlap
200 Hz Doppler: car at 30 m/s, 2 GHz signal

Notes: Fast, or small-scale, fading: signal strength can drop sharply when the receiver moves just half a wavelength. At 2.4 GHz that is about 6 cm.
Slow fading, or shadowing: large obstacles such as buildings or hills cause slower changes over tens of metres.
Delay spread: if echoes arrive spread out in time, symbols overlap. That is inter-symbol interference.
Doppler shift: motion changes the received frequency by f_d equals v over lambda. A car at 30 m/s, 108 km/h, receiving a 2 GHz signal with lambda 0.15 m sees up to 200 Hz of shift.

## Slide 19 [diagram, 1 diagram]

10 · Link budget
A link budget just adds up gains and losses: −56 dBm arrives with 34 dB to spare
P_received = P_transmit + G_transmit + G_receive − Losses
Transmit power
+20 dBm
Tx antenna gain
+2 dBi
Path loss (FSPL)
−80 dB
Rx antenna gain
+2 dBi
Received power
−56 dBm
Sensitivity −90 dBm (example value)
Link margin: −56 − (−90) = 34 dB

Notes: A link budget adds up every gain and loss between transmitter and receiver: received power in dBm equals transmit power plus transmit gain plus receive gain minus losses.
Worked example, Wi-Fi at 100 m in free space: plus 20 dBm transmit power (100 mW), plus 2 dBi at each antenna, minus 80 dB free-space path loss. Received power is minus 56 dBm.
If the receiver needs at least minus 90 dBm, its sensitivity (an example value), the link margin is minus 56 minus minus 90, which is 34 dB.
The margin absorbs walls, fading and bad days. A link with no margin will drop out. This is the answer to how far.

## Slide 20 [diagram, 1 diagram]

11 · Modulation
To carry bits, change the carrier's amplitude, frequency or phase
Amplitude
AM (analog), ASK (digital)
Frequency
FM (analog), FSK (digital)
Phase
PSK (digital)
Amplitude and phase together: QAM (digital)

Notes: A pure carrier wave carries no information. We modulate it by changing one of its properties.
Amplitude gives AM for analog and ASK for digital. Frequency gives FM and FSK. Phase gives PSK. Amplitude and phase together give QAM.
The diagram draws one waveform per property. Illustrative sketches, not to scale.

## Slide 21 [chart, 1 placeholder]

11 · Modulation
Denser constellations carry more bits per symbol, but need a cleaner signal
Bits per symbol = log₂(points). Radios adapt: 256-QAM near the router, BPSK or QPSK at the edge.
Source: Wireless 101 Module 1. 1024-QAM is Wi-Fi 6, 4096-QAM is Wi-Fi 7.

Notes: Each distinct symbol carries log base 2 of the number of constellation points in bits. BPSK has 2 points and 1 bit; QPSK 4 points and 2 bits; 16-QAM 4 bits; 64-QAM 6 bits; 256-QAM 8; 1024-QAM in Wi-Fi 6 gives 10; 4096-QAM in Wi-Fi 7 gives 12.
The catch: denser constellations put points closer together, so they need a higher SNR. Modern radios use adaptive modulation: 256-QAM near the router, BPSK or QPSK at the edge of coverage.
This is quiz question 4.

## Slide 22 [formula]

12 · Bandwidth, noise and the Shannon limit
Shannon: bandwidth is the strongest lever for data rate
C = B · log 2 (1 + SNR )
Worked 20 MHz, SNR 30 dB (ratio 1000): ≈ 199 Mbit/s per stream
More B rate grows linearly
More SNR rate grows only logarithmically
OFDM many narrow subcarriers: robust to multipath

Notes: SNR, the signal-to-noise ratio, is how much stronger the signal is than the background noise, usually in dB. The Shannon–Hartley theorem gives the maximum error-free data rate: C equals B times log2 of 1 plus SNR, C in bit/s, B in Hz, SNR as a linear ratio.
Worked example: a 20 MHz Wi-Fi channel with SNR 30 dB, a ratio of 1000. C is 20 times 10 to the 6 times log2 of 1001, about 9.97, so about 199 Mbit/s per spatial stream. This is a theoretical ceiling.
Two levers: more bandwidth, where rate grows linearly, or more SNR, where it grows only logarithmically. That is why new standards keep adding spectrum and antennas; MIMO adds parallel streams. Quiz question 5.
OFDM splits a wide channel into many narrow subcarriers, each modulated slowly, which makes it robust to multipath. Wi-Fi since 802.11a/g, 4G LTE and 5G NR all use OFDM. This is the answer to how fast.

## Slide 23 [comparison]

13 · Sharing the air
Multiple access separates users by frequency, time, code or subcarriers
Technique Users separated by Example system
FDMA Frequency 1G AMPS
TDMA Time slot 2G GSM (8 slots per 200 kHz carrier)
CDMA Code 3G UMTS (WCDMA), IS-95
OFDMA Subcarrier groups and time 4G LTE, 5G NR, Wi-Fi 6

Notes: Multiple access is how many users share a channel. FDMA separates them by frequency, as in 1G AMPS. TDMA by time slot, as in 2G GSM with 8 time slots per 200 kHz carrier. CDMA by code, as in 3G UMTS and IS-95. OFDMA by groups of subcarriers and time, as in 4G LTE, 5G NR and Wi-Fi 6.
Quiz question 6 asks which one 4G and 5G use. This is the start of the answer to how many.

## Slide 24 [diagram, 1 diagram]

13 · Sharing the air
Duplexing: send and receive on two frequencies, or on one by taking turns
FDD: frequency-division
TDD: time-division
Uplink: own frequency
Downlink: own frequency
at the same time
Up
Down
Up
Down
same frequency, taking turns
Wi-Fi shares differently: devices listen before talking (CSMA/CA) and back off if the channel is busy.

Notes: Duplexing is how one device both sends and receives. FDD, frequency-division duplex, uses separate frequencies for uplink and downlink, at the same time.
TDD, time-division duplex, uses the same frequency and takes turns in time. It is easy to shift capacity between uplink and downlink.
Wi-Fi shares the channel differently: devices listen before talking, CSMA/CA, and back off if the channel is busy.

## Slide 25 [diagram, 1 diagram]

14 · The cellular concept
Many small cells reuse frequencies, so capacity multiplies
A
B
C
A
B
C
A
B
C
C
A
B
C
A
B
C
A
B
A
B
C
A
B
C
A
B
C
A
Handover: the session passes from cell to cell
Same letter = same frequencies, reused by cells far enough apart (illustrative labels).

Notes: Instead of one powerful tower covering a city, divide the area into many small cells, each with a low-power base station.
Frequency reuse: cells far enough apart can reuse the same frequencies, multiplying total capacity. The letters on the diagram are illustrative: same letter means the same frequencies.
Handover: as a user moves, the call or data session passes from one cell to the next without dropping.
Smaller cells mean more reuse and more capacity; that is why dense cities use small cells and 5G millimetre-wave sites.

## Slide 26 [two-column]

15 · Who controls the spectrum
Spectrum is a limited, shared public resource, so it is regulated
Licensed
Operator buys exclusive rights, often at auction
Cellular networks
Predictable, interference-managed
Unlicensed
Anyone may transmit within power rules
Wi-Fi, Bluetooth, many IoT devices
Free, but shared and congested

Notes: The ITU, International Telecommunication Union, coordinates globally. National regulators allocate locally, for example the FCC in the United States and Ofcom in the United Kingdom.
Licensed spectrum: an operator buys exclusive rights, often at auction. That is how cellular networks work. It is predictable and interference-managed.
Unlicensed spectrum: anyone may transmit if they follow power rules, as with Wi-Fi, Bluetooth and many IoT devices. It is free but shared and congested.
The 2.4 GHz ISM band, 2.400 to 2.4835 GHz, is used by Wi-Fi, Bluetooth and microwave ovens. In 2020 the FCC opened 1,200 MHz of the 6 GHz band, 5.925 to 7.125 GHz, for unlicensed use, used by Wi-Fi 6E and Wi-Fi 7.

## Slide 27 [comparison]

16 · Putting it together
Each system is the same physics: frequency sets range, bandwidth and SNR set speed
System Typical bands Typical range Spectrum
Bluetooth 2.4 GHz about 10 m Unlicensed
Wi-Fi 2.4, 5, 6 GHz tens of metres indoors Unlicensed
4G LTE 600 MHz–2.6 GHz hundreds of m to km Licensed
5G mid-band about 3.5 GHz hundreds of metres Licensed
5G mmWave 24–40 GHz about 100–300 m, line of sight Licensed

Notes: Each row is the same physics from this module: frequency sets range and penetration, bandwidth and SNR set speed, and the access scheme and licensing set how many can share. This is the main idea a third time.
Notes: Bluetooth range is about 10 m (typical); 4G LTE bands vary by country, 600 MHz to 2.6 GHz; 5G mmWave is about 100 to 300 m and needs line of sight.

## Slide 28 [two-column]

Check your understanding · 1 of 2
Quiz: wavelength, dBm and path loss
Questions
What is the wavelength of a 5 GHz signal?
Convert 100 mW to dBm.
A link has 70 dB of path loss at 50 m. Roughly how much at 100 m in free space?
Answers
6 cm
20 dBm
About 76 dB

Notes: Give them a minute per question before clicking to reveal the answers.
1: lambda equals c over f, 3 times 10 to the 8 over 5 times 10 to the 9, which is 6 cm. 2: 100 mW is 20 dBm. 3: doubling the distance adds about 6 dB, so 70 plus 6 is about 76 dB.

## Slide 29 [two-column]

Check your understanding · 2 of 2
Quiz: modulation, Shannon and access
Questions
QPSK or 64-QAM: more bits per symbol, and the cost?
Shannon: double bandwidth or double SNR?
Multiple access in 4G and 5G?
Answers
64-QAM: 6 vs 2 bits; needs a higher SNR
Doubling bandwidth
OFDMA

Notes: Again, a minute per question, then reveal.
4: 64-QAM carries 6 bits per symbol versus 2 for QPSK, but needs a higher SNR. 5: doubling bandwidth, because rate grows linearly with bandwidth but only logarithmically with SNR. 6: OFDMA.

## Slide 30 [rows]

Summary
You can now answer how far, how fast and how many
λ = c / f; FSPL ≈ 80 dB at 100 m, 2.4 GHz; each doubling adds 6 dB. P_r = P_t + G_t + G_r − L: keep a margin.
C = B · log₂(1 + SNR)
Bandwidth is the strongest lever; denser constellations need more SNR.
FDMA → TDMA → CDMA → OFDMA; FDD vs TDD; cells reuse frequencies; licensed vs unlicensed.

Notes: Close by restating the idea: how far, how fast, how many. Decibels turn multiplication into addition: 0 dBm is 1 mW, plus 3 dB is about times 2, plus 10 dB is times 10. Real channels reflect, diffract, scatter and fade; multipath is the main enemy.
Next module, Module 2: antennas and propagation in depth, covering radiation patterns, MIMO and beamforming.
You now have the toolkit to size up any wireless link. Go and try it on your own phone. Well done, everyone.
