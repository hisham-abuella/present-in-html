# Wireless 101 — Module 1: How Wireless Communication Works

**Course:** Wireless 101 (introductory, first-year undergraduate, no prior RF background)
**Class length:** 50 minutes
**Prerequisites:** high-school algebra and logarithms

## Learning objectives

By the end of this module students can:

1. Explain what a radio wave is and convert between frequency and wavelength.
2. Work in decibels: convert between watts, milliwatts and dBm, and add gains and losses.
3. Calculate free-space path loss and a simple link budget.
4. Describe how real environments (reflection, multipath, fading) change a signal.
5. Explain how bits are put onto a carrier (modulation) and why data rate is limited (Shannon).
6. Explain how many users share the spectrum (multiple access, duplexing, cells) and who regulates it.

---

## 1. Why wireless matters

- A wireless link replaces a cable with an electromagnetic wave travelling through space.
- Everyday examples: Wi-Fi, cellular (4G/5G), Bluetooth, GPS, broadcast radio and TV, RFID tags, satellite links.
- Every one of these systems answers the same three questions, which structure this module:
  1. **How far** can the signal go? (propagation, path loss, link budget)
  2. **How fast** can we send data? (modulation, bandwidth, noise)
  3. **How many** users can share the air? (multiple access, cells, regulation)

## 2. A short history

| Year | Milestone |
|---|---|
| 1865 | James Clerk Maxwell publishes the equations predicting electromagnetic waves |
| 1886–1888 | Heinrich Hertz generates and detects radio waves in the lab |
| 1901 | Guglielmo Marconi receives a transatlantic radio signal |
| 1979–1983 | First-generation (1G) analog cellular networks (Tokyo 1979, AMPS in the US 1983) |
| 1991 | First GSM (2G, digital) call, in Finland |
| 1997 | First IEEE 802.11 (Wi-Fi) standard |
| 1999 | Bluetooth 1.0 specification |
| 2009 | First commercial 4G LTE network (Stockholm and Oslo) |
| 2019 | First commercial 5G networks |

Takeaway: about 120 years from equations to a phone in every pocket; each generation mainly changed *how efficiently* the same spectrum is used.

## 3. Radio waves: frequency and wavelength

- A radio wave is an oscillating electric and magnetic field that travels at the speed of light, **c ≈ 3 × 10⁸ m/s**.
- **Frequency (f)**: oscillations per second, in hertz (Hz).
- **Wavelength (λ)**: distance between two peaks, in metres.
- They are linked by **λ = c / f**.

Worked examples:

| Frequency | Use | Wavelength |
|---|---|---|
| 100 MHz | FM radio | 3 m |
| 900 MHz | cellular | 33 cm |
| 2.4 GHz | Wi-Fi, Bluetooth, microwave ovens | 12.5 cm |
| 5 GHz | Wi-Fi | 6 cm |
| 28 GHz | 5G millimetre wave | about 1.07 cm |

Why it matters: antenna size scales with wavelength (a quarter-wave antenna at 2.4 GHz is about 3.1 cm), and higher frequencies lose more energy and are blocked more easily by walls, bodies and rain.

## 4. The radio spectrum

The ITU divides the radio spectrum (3 kHz to 300 GHz) into bands:

| Band | Range | Example uses |
|---|---|---|
| VLF | 3–30 kHz | submarine communication |
| LF | 30–300 kHz | navigation beacons |
| MF | 300 kHz–3 MHz | AM radio |
| HF | 3–30 MHz | shortwave, amateur radio |
| VHF | 30–300 MHz | FM radio, TV, air-band |
| UHF | 300 MHz–3 GHz | cellular, Wi-Fi 2.4 GHz, Bluetooth, GPS |
| SHF | 3–30 GHz | Wi-Fi 5/6 GHz, satellite, radar |
| EHF | 30–300 GHz | millimetre-wave 5G, radar |

Trade-off to remember: **low frequencies travel far and penetrate buildings but carry little bandwidth; high frequencies carry lots of bandwidth but travel short distances.**

## 5. Decibels: the language of wireless

Signal powers in a link range over many orders of magnitude (a transmitter at 1 W, a receiver at 0.000000001 mW), so engineers use a logarithmic scale.

- Ratio in decibels: **dB = 10 · log₁₀(P₂ / P₁)**
- Absolute power relative to 1 milliwatt: **dBm = 10 · log₁₀(P / 1 mW)**
- Antenna gain relative to an ideal isotropic antenna: **dBi**

| Power | dBm |
|---|---|
| 1 W | 30 dBm |
| 100 mW | 20 dBm |
| 1 mW | 0 dBm |
| 1 µW | −30 dBm |
| 1 pW | −90 dBm |

Rules of thumb:

- +3 dB ≈ double the power; −3 dB ≈ half.
- +10 dB = 10 times the power; −10 dB = one tenth.
- In dB, gains and losses **add and subtract** instead of multiplying — this is why link budgets are easy.

## 6. Antennas

- An antenna converts electrical current into a radio wave (transmit) and back (receive); the same antenna works both ways.
- The **isotropic antenna** radiates equally in all directions; it is a theoretical reference (0 dBi).
- A **half-wave dipole** has a gain of 2.15 dBi.
- Gain does not create energy: a directional antenna (Yagi, patch, dish) **focuses** the same power into a narrower beam. More gain = narrower beamwidth.
- Omnidirectional antennas suit phones and home routers; directional antennas suit point-to-point links and base-station sectors.
- Modern systems use antenna arrays (MIMO, beamforming) to steer beams electronically.

## 7. Propagation: free-space path loss

Even in empty space, power spreads over a growing sphere, so received power falls with distance.

**Free-space path loss (FSPL), with d in km and f in MHz:**

> FSPL (dB) = 20 · log₁₀(d) + 20 · log₁₀(f) + 32.44

Worked example — Wi-Fi at 2.4 GHz over 100 m:

- 20 · log₁₀(0.1) = −20.0
- 20 · log₁₀(2400) = 67.6
- FSPL = −20.0 + 67.6 + 32.44 ≈ **80 dB**

Rules of thumb:

- Doubling the distance adds about 6 dB of loss.
- Doubling the frequency also adds about 6 dB of loss.

## 8. Propagation in the real world

Real environments are not free space. A signal can be:

- **Reflected** by large flat surfaces (buildings, the ground, walls).
- **Diffracted** around edges (rooftops, corners), which lets signals reach "shadowed" areas.
- **Scattered** by objects smaller than a wavelength (foliage, street signs).
- **Absorbed** by materials (concrete, water, human bodies).

Path loss grows with distance as dⁿ, where n is the **path-loss exponent**:

| Environment | Path-loss exponent n |
|---|---|
| Free space | 2 |
| Urban cellular | 2.7–3.5 |
| Shadowed urban cellular | 3–5 |
| In building, line of sight | 1.6–1.8 |
| In building, obstructed | 4–6 |

## 9. Multipath and fading

- Because of reflections, the receiver gets **several copies** of the signal arriving at slightly different times (**multipath**).
- The copies add up in phase (stronger) or out of phase (weaker), so signal strength can drop sharply when the receiver moves just half a wavelength — at 2.4 GHz, about 6 cm. This is **fast (small-scale) fading**.
- **Slow fading (shadowing)**: large obstacles such as buildings or hills cause slower changes over tens of metres.
- **Delay spread**: if echoes arrive spread out in time, symbols overlap (inter-symbol interference).
- **Doppler shift**: motion changes the received frequency by f_d = v / λ. Example: a car at 30 m/s (108 km/h) receiving a 2 GHz signal (λ = 0.15 m) sees up to 200 Hz shift.
- Defences: diversity (several antennas), MIMO, error-correcting codes, and OFDM (Section 12).

## 10. Link budget

A link budget adds up every gain and loss between transmitter and receiver:

> P_received (dBm) = P_transmit (dBm) + G_transmit (dBi) + G_receive (dBi) − Losses (dB)

Worked example (Wi-Fi, 100 m, free space):

| Item | Value |
|---|---|
| Transmit power | +20 dBm (100 mW) |
| Transmit antenna gain | +2 dBi |
| Receive antenna gain | +2 dBi |
| Free-space path loss | −80 dB |
| **Received power** | **−56 dBm** |

If the receiver needs at least −90 dBm (its **sensitivity**; example value), the **link margin** is −56 − (−90) = **34 dB**. The margin absorbs walls, fading and bad days. A link with no margin will drop out.

## 11. Modulation: putting bits on a wave

A pure carrier wave carries no information; we **modulate** it by changing one of its properties:

- **Amplitude** — AM (analog), ASK (digital)
- **Frequency** — FM (analog), FSK (digital)
- **Phase** — PSK (digital)
- **Amplitude and phase together** — QAM (digital)

Each distinct symbol carries a number of bits, log₂(number of points in the constellation):

| Scheme | Points | Bits per symbol |
|---|---|---|
| BPSK | 2 | 1 |
| QPSK | 4 | 2 |
| 16-QAM | 16 | 4 |
| 64-QAM | 64 | 6 |
| 256-QAM | 256 | 8 |
| 1024-QAM (Wi-Fi 6) | 1024 | 10 |
| 4096-QAM (Wi-Fi 7) | 4096 | 12 |

The catch: denser constellations put points closer together, so they need a cleaner signal (higher SNR). Modern radios use **adaptive modulation** — 256-QAM near the router, BPSK or QPSK at the edge of coverage.

## 12. Bandwidth, noise and the Shannon limit

- **Signal-to-noise ratio (SNR)**: how much stronger the signal is than the background noise, usually in dB.
- **Shannon–Hartley theorem** — the maximum error-free data rate of a channel:

> C = B · log₂(1 + SNR)   (C in bit/s, B in Hz, SNR as a linear ratio)

Worked example: a 20 MHz Wi-Fi channel with SNR = 30 dB (a ratio of 1000):
C = 20 × 10⁶ · log₂(1001) ≈ 20 × 10⁶ × 9.97 ≈ **199 Mbit/s** per spatial stream (theoretical ceiling).

Two levers for more speed: **more bandwidth** (rate grows linearly) or **more SNR** (rate grows only logarithmically). This is why new standards keep adding spectrum (wider channels, new bands) and antennas (MIMO adds parallel streams).

**OFDM** splits a wide channel into many narrow subcarriers, each modulated slowly; this makes it robust to multipath. Wi-Fi (since 802.11a/g), 4G LTE and 5G NR all use OFDM.

## 13. Sharing the air: multiple access and duplexing

**Multiple access** — how many users share a channel:

| Technique | Users are separated by | Example system |
|---|---|---|
| FDMA | frequency | 1G AMPS |
| TDMA | time slot | 2G GSM (8 time slots per 200 kHz carrier) |
| CDMA | code | 3G UMTS (WCDMA), IS-95 |
| OFDMA | groups of subcarriers and time | 4G LTE, 5G NR, Wi-Fi 6 |

**Duplexing** — how one device both sends and receives:

- **FDD (frequency-division duplex)**: separate frequencies for uplink and downlink, at the same time.
- **TDD (time-division duplex)**: the same frequency, taking turns in time; easy to shift capacity between uplink and downlink.

**Wi-Fi** shares the channel differently: devices listen before talking (CSMA/CA) and back off if the channel is busy.

## 14. The cellular concept

- Instead of one powerful tower covering a city, divide the area into many small **cells**, each with a low-power base station.
- **Frequency reuse**: cells far enough apart can reuse the same frequencies, multiplying total capacity.
- **Handover**: as a user moves, the call or data session passes from one cell to the next without dropping.
- Smaller cells = more reuse = more capacity; this is why dense cities use small cells and 5G millimetre-wave sites.

## 15. Who controls the spectrum

- Spectrum is a limited, shared public resource, so it is regulated.
- **ITU** (International Telecommunication Union) coordinates globally; national regulators allocate locally, e.g. the **FCC** (United States) and **Ofcom** (United Kingdom).
- **Licensed spectrum**: an operator buys exclusive rights (often at auction) — cellular networks. Predictable, interference-managed.
- **Unlicensed spectrum**: anyone may transmit if they follow power rules — Wi-Fi, Bluetooth, many IoT devices. Free, but shared and congested.
- The **2.4 GHz ISM band** (2.400–2.4835 GHz) is used by Wi-Fi, Bluetooth and microwave ovens.
- In 2020 the FCC opened 1,200 MHz of the 6 GHz band (5.925–7.125 GHz) for unlicensed use, used by Wi-Fi 6E and Wi-Fi 7.

## 16. Putting it together: comparing common systems

| System | Typical bands | Typical range | Spectrum |
|---|---|---|---|
| Bluetooth | 2.4 GHz | about 10 m (typical) | unlicensed |
| Wi-Fi | 2.4, 5, 6 GHz | tens of metres indoors | unlicensed |
| 4G LTE | 600 MHz – 2.6 GHz (varies by country) | hundreds of metres to kilometres | licensed |
| 5G mid-band | about 3.5 GHz | hundreds of metres | licensed |
| 5G mmWave | 24–40 GHz | about 100–300 m, line of sight | licensed |

Each row is the same physics from this module: frequency sets range and penetration, bandwidth and SNR set speed, and the access scheme and licensing set how many can share.

## 17. Summary

1. Radio waves: λ = c / f; higher frequency = smaller antennas, more bandwidth, shorter range.
2. Decibels turn multiplication into addition; 0 dBm = 1 mW, +3 dB ≈ ×2, +10 dB = ×10.
3. FSPL ≈ 80 dB for 100 m at 2.4 GHz; each doubling of distance adds 6 dB.
4. Real channels reflect, diffract, scatter and fade; multipath is the main enemy.
5. Link budget: P_r = P_t + G_t + G_r − L; keep a margin.
6. Modulation packs bits per symbol; denser constellations need more SNR.
7. Shannon: C = B · log₂(1 + SNR) — bandwidth is the strongest lever.
8. FDMA → TDMA → CDMA → OFDMA; FDD vs TDD; cells reuse frequencies.
9. Regulators split spectrum into licensed and unlicensed bands.

**Next module (Module 2):** Antennas and propagation in depth — radiation patterns, MIMO and beamforming.

## 18. Check your understanding (quiz)

1. What is the wavelength of a 5 GHz signal? *(Answer: 6 cm)*
2. Convert 100 mW to dBm. *(Answer: 20 dBm)*
3. A link has 70 dB of path loss at 50 m. Roughly how much is it at 100 m in free space? *(Answer: about 76 dB)*
4. Which carries more bits per symbol, QPSK or 64-QAM, and what does it cost? *(Answer: 64-QAM, 6 vs 2 bits; it needs a higher SNR)*
5. Using Shannon, which raises capacity more: doubling bandwidth or doubling SNR at high SNR? *(Answer: doubling bandwidth)*
6. Name the multiple-access technique used by 4G and 5G. *(Answer: OFDMA)*

## Glossary

- **Carrier** — the unmodulated radio wave that carries the signal.
- **dBm** — power in decibels relative to 1 milliwatt.
- **dBi** — antenna gain relative to an isotropic antenna.
- **FSPL** — free-space path loss.
- **Link margin** — received power minus receiver sensitivity.
- **MIMO** — multiple-input multiple-output; several antennas on each end.
- **OFDM / OFDMA** — orthogonal frequency-division multiplexing / multiple access.
- **SNR** — signal-to-noise ratio.
