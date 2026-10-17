# Wireless 101 — Module 1: How Wireless Communication Works

- **Audience**: first-year undergraduates, no RF background; high-school algebra and logarithms.
- **Occasion and time**: 50-minute lecture (no Q&A inside the slot).
- **Goal**: students can trace a signal from a wave in space to data on a device — how far it travels, how fast it carries data, how many share the air — and do the core calculations.
- **Promise**: By the end you can trace a signal from a wave in space to data on a device — how far, how fast, how many.
- **Story**: a wireless link replaces a cable with a wave; one physics (frequency, path loss, decibels) sets range, one (modulation, Shannon) sets speed, and one (multiple access, cells, regulation) sets how many share.
- **Fence**: this is not "how to build a radio" or RF hardware — it is the shared physics every wireless system answers.
- **Look**: `data-theme="studio"` (deep teal + amber, the Wireless 101 teaching look), theme's own fonts (Instrument Serif / DM Sans / Space Mono), lang en. One accent (amber); diagrams stay amber + cream.
- **Sources**: wireless-101-module-1.md (the only source; every fact, number and formula is drawn from it — nothing invented).
- **Placeholders**: two image placeholders (antenna photo, spectrum/wireless photo) with captions; no invented facts.

| # | data-id | layout | claim (h2) | content and facts (source) | role | min |
|---|---|---|---|---|---|---|
| 1 | start | title | How Wireless Communication Works | sub = the promise; meta = first-year / no RF / 50 min | promise | 1 |
| 2 | objectives | agenda | By the end you can do six things | the 6 learning objectives | signpost | 1 |
| 3 | spine | diagram | Every wireless system answers the same three questions | How far / How fast / How many → topics; everyday systems caption | thesis, signpost | 2 |
| 4 | part1 | section | How far can the signal go? | part-one promise | signpost | 0.5 |
| 5 | wave | diagram | A radio wave links frequency and wavelength: λ = c / f | c ≈ 3×10⁸ m/s; animated sine, λ marked | evidence | 2 |
| 6 | freq | comparison | Higher frequency means a shorter wavelength | 5 freq/use/wavelength rows; quarter-wave 3.1 cm @2.4 GHz; higher f blocked more | evidence | 2 |
| 7 | spectrum | diagram | The spectrum runs 3 kHz to 300 GHz, in bands | 8 ITU bands; low=far+penetrate, high=bandwidth+short | evidence | 2 |
| 8 | db | formula | Decibels turn multiplication into addition | dB, dBm, dBi defs; dBm table 1W→1pW; +3≈×2, +10=×10, add/subtract | evidence | 2 |
| 9 | antenna | diagram | A directional antenna focuses the same power into a narrower beam | isotropic 0 dBi, dipole 2.15 dBi, directional; MIMO/beamforming | evidence, story | 2 |
| 10 | fspl-sphere | diagram | Even in empty space, power spreads over a growing sphere | 1/r²; doubling distance +6 dB; doubling frequency +6 dB | evidence | 2 |
| 11 | fspl | formula | Free-space path loss (FSPL) | FSPL=20log10(d)+20log10(f)+32.44; 2.4 GHz/100 m ≈ 80 dB | evidence | 2 |
| 12 | realworld | diagram | Real environments do four things to a signal | reflect / diffract / scatter / absorb | evidence | 2 |
| 13 | exponent | comparison | In the real world, path loss grows as dⁿ | 5 environments + n (free 2 … obstructed 4–6) | evidence | 1.5 |
| 14 | multipath | diagram | Multipath: the receiver gets several copies | direct + reflected, different times; fast fading 6 cm @2.4 GHz | evidence | 2 |
| 15 | fading | bullets | Fading, Doppler and the defences | fast/slow fading, delay spread/ISI, Doppler fd=v/λ (30 m/s→200 Hz), diversity/MIMO/ECC/OFDM | evidence | 2 |
| 16 | linkbudget | diagram | A link budget adds every gain and loss | P_r=P_t+G_t+G_r−L; Wi-Fi 100 m → −56 dBm; margin 34 dB vs −90 dBm | evidence, story | 2 |
| 17 | modulation | two-column | Modulation puts bits on a carrier | AM/ASK, FM/FSK, PSK, QAM | evidence | 1.5 |
| 18 | constellation | comparison | Denser constellations carry more bits per symbol | BPSK…4096-QAM, bits=log2(points); adaptive modulation; needs higher SNR | evidence | 2 |
| 19 | part2 | section | How fast, and how many share? | part-two promise | signpost | 0.5 |
| 20 | shannon | formula | Shannon sets the ceiling on the data rate | C=B·log2(1+SNR); 20 MHz/30 dB → 199 Mbit/s; two levers | evidence | 2 |
| 21 | ofdm | diagram | OFDM splits a wide channel into narrow subcarriers | robust to multipath; Wi-Fi a/g, 4G, 5G NR | evidence | 2 |
| 22 | part3 | section | How many can share the air? | part-three promise | signpost | 0.5 |
| 23 | access | comparison | Multiple access: how users share a channel | FDMA/TDMA/CDMA/OFDMA + example systems | evidence | 2 |
| 24 | duplex | two-column | Duplexing: sending and receiving at the same time | FDD vs TDD; Wi-Fi CSMA/CA | evidence | 1.5 |
| 25 | cells | diagram | Many small cells reuse frequencies | reuse multiplies capacity; handover; small cells/5G mmWave | evidence, story | 2 |
| 26 | spectrum-ctrl | two-column | Spectrum is a shared public resource, so it is regulated | licensed vs unlicensed; ITU/FCC/Ofcom; 2.4 GHz ISM; 6 GHz 1,200 MHz (2020) | evidence | 2 |
| 27 | systems | comparison | Same physics across the common systems | Bluetooth/Wi-Fi/4G/5G-mid/5G-mmWave table | evidence | 2 |
| 28 | summary | two-column | What to remember | the 9 summary points; next: Module 2 | contribution | 1.5 |
| 29 | quiz-a | rows | Check your understanding (1 of 2) | quiz Q1–Q3 with answers | question | 2 |
| 30 | quiz-b | rows | Check your understanding (2 of 2) | quiz Q4–Q6 with answers | question | 2 |

**Total**: 30 slides, ~50 minutes (diagrams carry the pacing; one slide ≈ one minute).
**Restatements of the story**: slide 1 (promise), slide 3 (three questions), slide 28 (summary).
**Animated diagrams (10)**: 3, 5, 7, 9, 10, 12, 14, 16, 21, 25.
