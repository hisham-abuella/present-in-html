# Wireless 101, Module 1: How Wireless Communication Works

- **Audience**: first-year undergraduates with high-school algebra and logarithms; no radio background
- **Occasion and time**: a 50-minute lecture; the deck is paced to about 45.5 minutes, leaving time for questions and the quiz
- **Goal**: students can explain a radio wave, convert frequency and wavelength, work in decibels, compute free-space path loss and a link budget, and explain modulation, Shannon's limit, multiple access and cells
- **Promise**: By the end you will be able to say how far a signal goes, how fast it can carry data, and how many users can share the air
- **Story**: every wireless system answers three questions (how far, how fast, how many), and the same physics sets all three answers
- **Fence**: a stronger signal is not the same as a higher gain. Antenna gain focuses power into a beam; it creates no energy
- **Look**: `data-theme="spectrum"` (library look for electrical and wireless engineering, with formula and diagram layouts); `data-fonts` left empty so the theme's own pairing (`plexcond`) is used; English, left to right
- **Sources**: `wireless-101-module-1.md` (this folder), all sections
- **Placeholders**: presenter name and date on the title slide; two photos (antennas, urban street) are image placeholders with captions

| # | data-id | layout | claim (the slide's h2) | content and facts (with source) | role | min |
|---|---|---|---|---|---|---|
| 1 | start | title | How Wireless Communication Works | Subtitle = the promise; course and presenter placeholders (module intro) | promise | 0.5 |
| 2 | agenda | agenda | Every wireless system answers three questions | How far, how fast, how many; the three parts of the module (module section 1) | signpost | 1 |
| 3 | history | timeline | From Maxwell's equations to 5G took more than a century | 1865 Maxwell; 1886–88 Hertz; 1901 Marconi; 1979–83 1G; 1997 Wi-Fi 802.11; 2019 first 5G (module section 2) | story | 1.5 |
| 4 | wavelength | formula | Wavelength is the speed of light divided by frequency | λ = c / f, c ≈ 3 × 10⁸ m/s; 100 MHz gives 3 m; 2.4 GHz gives 12.5 cm (section 3) | evidence | 2 |
| 5 | wave | diagram | A radio wave is an oscillating electric and magnetic field | Animated sine wave with one wavelength bracketed; c ≈ 3 × 10⁸ m/s (section 3) | thesis | 2 |
| 6 | spectrum | diagram | The spectrum runs from 3 kHz to 300 GHz | ITU bands VLF to EHF with example uses; trade-off line: low frequencies go far with little bandwidth, high frequencies carry bandwidth but reach less far (section 4) | fence | 2 |
| 7 | decibels | formula | Decibels turn multiplying gains into adding them | dB = 10·log₁₀(P₂/P₁); dBm = 10·log₁₀(P/1 mW); dBi (section 5) | evidence | 2 |
| 8 | rules | stats | Three rules of thumb cover most link arithmetic | +3 dB ≈ double; +10 dB = ten times; 0 dBm = 1 mW (section 5) | story | 2 |
| 9 | antennas | image-right | Antenna gain focuses power; it does not create it | Antenna converts current to wave and back; isotropic 0 dBi; half-wave dipole 2.15 dBi; directional vs omnidirectional (section 6). Image placeholder: antennas of different types | fence | 1.5 |
| 10 | fspl | formula | Free-space path loss grows with distance and frequency | FSPL (dB) = 20·log₁₀(d) + 20·log₁₀(f) + 32.44, d in km, f in MHz; doubling distance or frequency adds about 6 dB (section 7) | evidence | 2 |
| 11 | fspl-number | big-number | Wi-Fi at 2.4 GHz over 100 m loses about 80 dB | Worked example: −20.0 + 67.6 + 32.44 ≈ 80 dB (section 7) | evidence | 1.5 |
| 12 | real | image-left | Real environments reflect, bend, scatter and absorb signals | Reflection, diffraction, scattering, absorption; path loss ∝ dⁿ with n = 2 free space, 2.7–3.5 urban cellular, 4–6 obstructed indoors (section 8). Image placeholder: a city street with buildings | evidence | 2 |
| 13 | multipath | bullets | Multipath makes the signal fade over half a wavelength | Multipath copies add or cancel; about 6 cm at 2.4 GHz; delay spread; Doppler f_d = v/λ, 30 m/s car at 2 GHz gives up to 200 Hz (section 9) | story | 2 |
| 14 | budget-formula | formula | A link budget adds every gain and loss in decibels | P_r (dBm) = P_t + G_t + G_r − L; example 20 + 2 + 2 − 80 = −56 dBm (section 10) | evidence | 1.5 |
| 15 | budget-flow | diagram | Wi-Fi at 100 m arrives at −56 dBm, 34 dB above sensitivity | +20 dBm, +2 dBi, −80 dB, +2 dBi, −56 dBm; sensitivity −90 dBm (example value); margin 34 dB; margin absorbs walls, fading and bad days (section 10) | story | 2 |
| 16 | part2 | section | Part 2: how fast can we send data? | Modulation, bandwidth and noise set the data rate (sections 11 and 12) | signpost | 0.5 |
| 17 | modulation | bullets | Modulation changes amplitude, frequency or phase to carry bits | AM/ASK, FM/FSK, PSK, QAM; bits per symbol = log₂(points) (section 11) | evidence | 1.5 |
| 18 | constellation | chart | Each extra bit doubles the points and needs a cleaner signal | Column chart of bits per symbol: BPSK 1, QPSK 2, 16-QAM 4, 64-QAM 6, 256-QAM 8, 1024-QAM 10, 4096-QAM 12 (section 11); adaptive modulation: 256-QAM near the router | evidence | 1.5 |
| 19 | shannon | formula | Shannon: bandwidth and SNR set the maximum data rate | C = B·log₂(1 + SNR), SNR as a linear ratio; 20 MHz, SNR 30 dB (ratio 1000) gives about 199 Mbit/s per spatial stream (section 12) | evidence | 2 |
| 20 | levers | bullets | Bandwidth is the strongest lever; SNR helps only logarithmically | Rate grows linearly with bandwidth and logarithmically with SNR; OFDM subcarriers used by 802.11a/g, LTE, 5G NR; MIMO adds streams (section 12) | story | 1 |
| 21 | access | rows | Four multiple-access schemes separate users | FDMA (1G AMPS), TDMA (2G GSM, 8 slots per 200 kHz carrier), CDMA (3G UMTS, IS-95), OFDMA (4G LTE, 5G NR, Wi-Fi 6) (section 13) | evidence | 1.5 |
| 22 | duplex | bullets | Two-way links use FDD (separate frequencies) or TDD (taking turns) | FDD vs TDD; TDD shifts uplink/downlink capacity easily; Wi-Fi uses CSMA/CA, listen before talking and back off (section 13) | evidence | 1.5 |
| 23 | cells | diagram | Small cells reuse frequencies, so capacity multiplies | Cell grid with frequency reuse (letters illustrative); handover as a user moves; smaller cells mean more reuse (section 14). | evidence | 2 |
| 24 | regulation | two-column | Regulators split spectrum into licensed and unlicensed bands | Licensed: operator buys exclusive rights, cellular. Unlicensed: anyone within power rules, Wi-Fi and Bluetooth. ITU coordinates; FCC (US), Ofcom (UK); 2.4 GHz ISM band 2.400–2.4835 GHz; 1,200 MHz of 6 GHz opened in 2020 (section 15) | evidence | 1.5 |
| 25 | systems | rows | Same physics, different trade-offs across five systems | Bluetooth 2.4 GHz about 10 m; Wi-Fi 2.4, 5, 6 GHz tens of metres indoors; 4G LTE; 5G mid-band about 3.5 GHz; 5G mmWave 24–40 GHz about 100–300 m line of sight (section 16) | evidence | 1.5 |
| 26 | quiz-1 | bullets | Quiz (1 of 2): check your understanding | Questions 1 to 3 from section 18; answers in notes and on slide 28 | question | 1.5 |
| 27 | quiz-2 | bullets | Quiz (2 of 2): check your understanding | Questions 4 to 6 from section 18 | question | 1.5 |
| 28 | answers | bullets | Answers | Answers from section 18, revealed one per click | evidence | 1 |
| 29 | summary | two-column | Summary: nine ideas to take away | Section 17 summary items, grouped as how far, how fast, how many; the last line is what students now have | contribution | 1.5 |

**Total**: 29 slides, about 45.5 minutes (91% of the slot; the rest is for questions).
**Restatements of the story**: slides 2 (agenda), 16 (part 2 signpost), 29 (summary), each said a different way.
