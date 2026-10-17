# Model comparison: present-in-html, Wireless 101, Module 1

Run `20261016-000644` · Claude Code 2.1.301 (Claude Code) · plugin 3.1.0 (commit ae03c20) · Apple M4 Max, 64 GB · Ollama 0.40.5

Same prompt (`prompt.txt`), same source file, each model in its own new empty folder outside the repo. Runs one after another.

## Time and cost

| Model | Provider | Finished | Wall time | API time | Turns | Tool calls | Skill used | Input tok | Output tok | Cache read | Cost |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **haiku** `claude-haiku-5-5` | anthropic | yes | 7m 05s | 5m 22s | 37 | 35 | yes | 48 | 68k | 2.15M | $0.24 |
| **opus** `claude-opus-5-5` | anthropic | yes | 11m 44s | 9m 57s | 34 | 32 | yes | 40 | 63k | 1.92M | $2.88 |
| **qwen-local** `qwen3.8:27b-mlx` | ollama | timed out | 120m 00s | – | – | 19 | yes | 0 | 0 | 0 | $0 (local) |
| **sonnet** `claude-sonnet-5-5` | anthropic | yes | 5m 27s | 4m 24s | 29 | 27 | yes | 26 | 38k | 733k | $0.90 |

Cost is the CLI's API list-price figure for the whole run, background calls included (on a subscription it is what the same run would cost on the API). The judge's cost is not included.

## The deck (checker and counts)

| Model | Slides | 20–30 | Checker | Issues | Notes | Diagrams | Animated slides | Placeholders | Images | Quiz | Deck KB |
|---|---|---|---|---|---|---|---|---|---|---|---|
| haiku | 29 | yes | pass | 0 | 29/29 | 4 | 14 | 3 | 0 | yes | 178 |
| opus | 30 | yes | pass | 0 | 30/30 | 13 | 19 | 3 | 0 | yes | 218 |
| qwen-local | 21 | yes | pass | 0 | 3/21 | 1 | 7 | 6 | 0 | no | 143 |
| sonnet | 30 | yes | pass | 0 | 30/30 | 10 | 14 | 2 | 0 | yes | 193 |

## Judge scores (blind, claude-opus-5-5)

| Model | Accuracy | Coverage | Teaching | Visual | Diagrams | Notes | Reqs | **Overall /10** | Wrong claims (major) | Invented | UI issues (major) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| haiku | 4 | 4 | 4 | 3 | 3 | 5 | 5 | **7** | 5 (1) | 4 | 7 (1) |
| opus | 5 | 5 | 5 | 4 | 5 | 5 | 5 | **9** | 2 (0) | 5 | 4 (0) |
| qwen-local | 1 | 1 | 1 | 2 | 1 | 1 | 1 | **1** | 4 (4) | 10 | 8 (8) |
| sonnet | 5 | 5 | 4 | 4 | 4 | 5 | 5 | **9** | 0 (0) | 3 | 7 (0) |

## Findings per model

### haiku (`claude-haiku-5-5`)

This is a solid deck that follows the module closely, gets the numbers right and has excellent speaker notes. Fix three things before teaching from it tomorrow: the stray 'Fence:' label on slide 9, the overlapping timeline text on slide 3, and the double markers on the answers slide. There are four animated diagrams (wave, spectrum, link-budget chain, hex grid). The ideas that would gain most from a picture have none: a QAM constellation, multipath or fading, and FDMA/TDMA/OFDMA. The deck also has no Part 1 or Part 3 section dividers to match the three-question structure.

**Major mistakes**

- Slide 9 shows the stray label 'Fence:' in bold on a content bullet. Students would see it on screen and it would embarrass the lecturer.
- Slide 3's timeline text overlaps between columns ('electromagnetic' runs into the Hertz column).

**Wrong claims**

- slide 9 (major): "Fence: gain does not add energy. A directional antenna sends the same power into a narrower beam." → "Fence:" is a stray label, probably left over from a template or prompt. It means nothing to students. The bullet should read: "Gain does not create energy: a directional antenna focuses the same power into a narrower beam."
- slide 6 (minor): "Wi-Fi 5/6, radar" → The source says "Wi-Fi 5/6 GHz". Without "GHz", the label reads as the Wi-Fi 5 and Wi-Fi 6 generations, not the 5 and 6 GHz bands.
- slide 3 (minor): "Note that Maxwell's 1865 equations to 2019 is about 150 years; the module's own takeaway says about 120, so quote the dates, not that number." → The arithmetic is right (1865 to 2019 is 154 years), but the note tells the lecturer to ignore the module's own takeaway when it should just restate it. It also leaves out the takeaway's main point about efficiency. Better wording: 'more than a century'.
- slide 27 (minor): "At high SNR, which raises capacity more: bandwidth or SNR?" → The module asks about doubling bandwidth versus doubling SNR. The slide drops 'doubling', but the answer slide says 'Doubling bandwidth', so the question and answer no longer match.
- slide 29 (minor): "Summary: nine ideas to take away" → The slide shows three rows. Summary point 4 (real channels reflect, diffract, scatter and fade; multipath is the main enemy) is missing, so it does not show nine ideas.

**Not in the source**

- slide 9: "A high-gain antenna is not an amplifier: it concentrates the same power into a narrower beam, like a torch with a focused lens."
- slide 9: "Ask: why does a home router not use a dish? Because the signal has to go in all directions to reach phones around the room."
- slide 21: "Ask: why is the 1G row a frequency split? Because each call got its own frequency channel."
- slide 1: "It is the promise for the next 45 minutes." (and wrong)

**UI issues**

- slide 3 (major): In the Maxwell column, 'electromagnetic' runs into the Hertz column and overlaps 'radio waves'.
- slide 6 (minor): The band boxes are cramped. 'Wi-Fi 5/6, radar' runs past the SHF box border, and the range labels touch the box edges. The text is small for a projector.
- slide 28 (minor): Each answer has both a number and a bullet ('1. • 6 cm'). The list is also pushed left of the title margin.
- slide 9 (minor): The image placeholder caption sits on top of the decorative concentric lines, which makes it harder to read.
- slide 12 (minor): The image placeholder caption sits on top of the decorative concentric lines, which makes it harder to read.
- slide 23 (minor): The handover arc is a tiny curve near the A/B border and is easy to miss. It does not clearly show a user moving between cells.
- slide 2 (minor): The question headings wrap into narrow columns of 4–5 lines while the left half of the slide is empty.

**Strengths**

- All the worked numbers match the source: λ examples, the dBm table, FSPL ≈ 80 dB, the link budget (−56 dBm, 34 dB margin), Shannon ≈ 199 Mbit/s, the Doppler shift of 200 Hz, and the quiz answers.
- It follows the module's sections in order, and facts left off the slides (the full path-loss exponent table, ITU/FCC/Ofcom, the ISM and 6 GHz bands, the GSM/Bluetooth/LTE dates) are kept in the speaker notes.
- The speaker notes are strong. They give click-by-click cues, questions to ask the room, and arithmetic to work aloud, and they do not just repeat the slide.
- The animated link-budget chain and the bits-per-symbol chart show the key arithmetic clearly. The frequency-reuse hex grid uses a valid 3-cell pattern.
- It meets the requirements: 29 slides, quiz then answers then summary at the end, and the checker passes with 0 issues.

Deck: [output/deck.html](haiku/output/deck.html) · screenshots: [haiku/shots/](haiku/shots/) · transcript: [haiku/transcript.jsonl](haiku/transcript.jsonl)

### opus (`claude-opus-5-5`)

The deck is accurate, faithful to the source and ready to teach from, with no factual errors and correct, well-built animated diagrams. The only problems are small layout ones: a cramped agenda slide, a narrow bullet column on slide 15, faint antenna-gain steps in the link-budget diagram, and a summary slide that is slightly thinner than the module's own summary.

**Wrong claims**

- slide 21 (minor): "Rate grows only logarithmically, so MIMO adds antennas for parallel streams." → The source says standards add both spectrum and antennas (MIMO adds parallel streams) because SNR is a weak lever. The slide's 'so' ties MIMO to the SNR column, which makes it sound as if MIMO raises SNR. It doesn't: it adds parallel streams. A slight distortion, not a factual error.
- slide 6 (minor): "Wi-Fi, Bluetooth, microwaves" → The source says 'microwave ovens'. 'Microwaves' on its own could be read as microwave radiation in general.

**Not in the source**

- slide 7: "Click 1: the eight bands, each ten times higher than the last."
- slide 20: "That is a theoretical ceiling; no real radio reaches it."
- slide 21: "Slow symbols are long, so echoes from multipath do much less damage."
- slide 14: "It is why moving your phone a few centimetres can change the bars."
- slide 11: "Picture a balloon being blown up: the same paint spread over more surface."

**UI issues**

- slide 3 (minor): The agenda's left half is empty, while the three questions are squeezed into a narrow column and wrap onto 3–4 lines ('How many / users can / share the / air?'). The layout feels unbalanced and cramped.
- slide 15 (minor): Bullets wrap too early in a narrow column even though the right half of the slide is empty. It is also missing the 'Part 1 · How far' label that the slides around it carry.
- slide 17 (minor): In the link-budget staircase, the +2 dBi transmit and receive antenna gains show no visible step up, so the diagram doesn't show the gains being added. Only the −80 dB drop and the margin bracket read clearly.
- slide 30 (minor): The summary leaves out the FSPL ≈ 80 dB figure and the 'multipath is the main enemy' point from the module's summary list. They appear only in the notes.

**Strengths**

- Every number checks out against the source: wavelengths, dBm table, FSPL worked example (−20.0 + 67.6 + 32.44 ≈ 80 dB), link budget (−56 dBm, 34 dB margin), Doppler 200 Hz, Shannon 199 Mbit/s, bits per symbol, history dates, band edges and regulatory figures.
- Follows the module's sections 1–18 in order, and the three-question framing (how far / how fast / how many) runs through the whole deck as Part labels.
- The diagrams are accurate and add real value. The dB ruler is drawn to a consistent linear scale. The ASK/FSK/PSK waveforms actually encode 1 0 1 1 0, with phase flips where the bit changes. The QPSK/16-QAM/64-QAM constellations have the right point counts. The hex frequency-reuse grid has no two adjacent cells with the same letter. The path-loss exponent bars are placed correctly on the axis.
- Speaker notes are detailed and timed, give click-by-click cues, add analogies and audience prompts, and link back to the quiz questions without just repeating the slide.
- Image placeholders carry specific captions saying what picture should go there.
- 30 slides, quiz (3 slides) then summary at the end, and the checker passes with 0 issues.

Deck: [output/deck.html](opus/output/deck.html) · screenshots: [opus/shots/](opus/shots/) · transcript: [opus/transcript.jsonl](opus/transcript.jsonl)

### qwen-local (`qwen3.8:27b-mlx`)

This deck can't be used. It is the stock template with only the footer changed. It has no wireless content, no quiz, no summary, no relevant diagrams or captioned image placeholders, and almost no speaker notes. It would have to be rebuilt from scratch.

**Major mistakes**

- The deck is the unmodified present-in-html template. Only the footer was changed to 'Wireless 101 — Module 1'. None of the module content is on any slide.
- No coverage at all: no λ = c/f, no decibels or dBm, no FSPL, no link budget, no modulation, no Shannon, no multiple access, no cells, no regulation.
- No quiz and no summary slide at the end, both of which were required.
- 20 of 21 slides have no speaker notes, or only template notes. The checker warns about this, and the deck was presented as passing anyway.
- The only diagram is the template's Input→Process→Result placeholder. There are no wireless diagrams.
- The slides show made-up business data (revenue, users, pricing, a team), which would embarrass the lecturer.

**Wrong claims**

- slide 1 (major): "Decks that look designed" → The title slide should introduce 'Wireless 101 — Module 1: How Wireless Communication Works'. This is template text that was never replaced.
- slide 2 (major): "Why this matters 5 min What we built 10 min What we learned 10 min Questions 5 min" → The agenda should list the module's sections (why wireless matters, history, waves, spectrum, decibels, antennas, path loss, link budget, modulation, Shannon, multiple access, cells, regulation). It also adds up to 30 minutes, not 50.
- slide 12 (major): "Revenue by quarter" → Made-up template finance data that has nothing to do with wireless communication.
- slide 19 (major): "Input Process Result" → This is the template's placeholder diagram. It should be a wireless diagram, for example a wave or wavelength, a link budget chain or multipath.

**Not in the source**

- slide 10: "98 %" (and wrong)
- slide 11: "4.2 M Users this quarter" (and wrong)
- slide 11: "38 % Faster than last year" (and wrong)
- slide 11: "12 Countries live" (and wrong)
- slide 12: "Q1 12 Q2 18 Q3 21 Q4 29" (and wrong)
- slide 13: "Price $0 $12 per seat Talk to us" (and wrong)
- slide 14: "Aug Launch Public release in six regions." (and wrong)
- slide 16: "Design is not how it looks. It is how it works ." (and wrong)
- slide 18: "Amira Khalil Product" (and wrong)
- slide 20: "Vendor quote, 14 August Installation cost for option B." (and wrong)

**UI issues**

- slide 1 (major): Placeholder text on the title slide ('Your Name', 'Role or team', 'present-in-html template').
- slide 3 (major): Section slide shows the placeholder line 'A one-line promise for this section.'
- slide 7 (major): Image placeholder has no caption saying what image should go there; the text describes how the template works.
- slide 8 (major): Image placeholder has no caption; the text is template filler.
- slide 9 (major): Full-bleed slide shows raw HTML in the text ('<img class="bleed" ...>').
- slide 17 (major): A JavaScript code slide in a wireless lecture.
- slide 18 (major): A team slide with made-up people.
- slide 21 (major): Closing slide shows the placeholder 'you@example.com'.

**Strengths**

- 21 slides, inside the 20–30 range.
- The template looks clean, with good contrast and nothing cut off or overlapping.
- The footer was updated with the course and module title.

Deck: [output/deck.html](qwen-local/output/deck.html) · screenshots: [qwen-local/shots/](qwen-local/shots/) · transcript: [qwen-local/transcript.jsonl](qwen-local/transcript.jsonl)

### sonnet (`claude-sonnet-5-5`)

This deck is accurate, complete and faithful to the module, and it is essentially ready to teach from. There are no wrong or invented facts. What needs fixing is small layout polish: the overlapping label on slide 12, the loose reflection and scattering diagram on slide 15, the cramped stats on slide 18, the touching chart labels on slide 21, and the mixed fonts in the table headers. A few source details, such as the regulators and the ISM and 6 GHz bands, appear only in the notes. The summary slide also leaves out the decibel and fading points.

**Not in the source**

- slide 25: "Same letter = same frequencies, reused by cells far enough apart (illustrative labels)."
- slide 2: "Fence: we are not studying one product or one standard such as Wi-Fi or 5G. We study the shared physics underneath all of them."
- slide 7: "notice that each decade of frequency has typical uses."

**UI issues**

- slide 12 (minor): The 'Isotropic: 0 dBi' label sits on top of the outer circle, and 'equal in all directions' overlaps the bottom of the circle.
- slide 15 (minor): The reflected ray bounces off the building back toward the 'Reflected' label rather than reaching Rx. Scattering is only a text label with nothing drawn. The 'absorbed' ray just stops inside the box. The diagram shows the four mechanisms only loosely.
- slide 18 (minor): The large stat '10s of m' almost touches 'ISI' in the next column, so the row looks cramped.
- slide 21 (minor): The x-axis labels '1024-QAM' and '4096-QAM' run into each other.
- slide 25 (minor): The hex grid is ragged: the bottom row has 10 cells and the top row has 9. The handover arrow runs off the grid into empty space.
- slide 6 (minor): Table headers mix fonts: 'Frequency' is in a sans font and 'Use'/'Wavelength' are in a serif. The same thing happens in every comparison table (slides 7, 8, 11, 16, 23, 27).
- slide 27 (minor): The speaker notes contain two paragraphs that each start with 'Notes:', which looks like a generation artefact.

**Strengths**

- Every number, formula and worked example checks out against the source: λ table, dBm table, FSPL 80 dB, link budget −56 dBm with a 34 dB margin, Shannon 199 Mbit/s, Doppler 200 Hz and the path-loss exponents.
- The slides follow all 16 source sections in order, with the quiz (6 questions over 2 slides) and then the summary at the end, as the request asked.
- The 'how far / how fast / how many' theme opens the deck, comes back mid-deck and closes it in the summary.
- The diagrams that build up on click are well chosen: the wave with a λ bracket, the doubling-distance arcs, the link-budget chain, the AM/FM/PSK waveforms, FDD vs TDD and the hex reuse grid. The reuse lettering never puts the same letter in adjacent cells.
- The speaker notes are full scripts. Details moved off the slides (the extra timeline dates, the 2.15 dBi dipole, the ITU/FCC/Ofcom regulators, the ISM band and the 6 GHz band) are kept in the notes, and the notes point ahead to the matching quiz questions.
- The checker passes with 0 issues on 30 slides, and the image placeholder on slide 3 has a caption.

Deck: [output/deck.html](sonnet/output/deck.html) · screenshots: [sonnet/shots/](sonnet/shots/) · transcript: [sonnet/transcript.jsonl](sonnet/transcript.jsonl)
