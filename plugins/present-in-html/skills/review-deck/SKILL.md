---
name: review-deck
description: Review the content of an HTML slide deck (Keynote Pro) against its target audience and the time available to present it — timing per slide from the speaker notes, audience fit (assumed knowledge, jargon, depth, tone), story and structure, one claim per slide, numbers and sources, and the close. Use this whenever the user asks to review, critique, sanity-check, tighten or rehearse a deck, asks "is this right for my audience", "will this fit in 20 minutes", "is it too long", or is preparing for a talk, pitch, lecture or review, even if they don't say "review".
license: MIT (see LICENSE)
---

# Review a deck for its audience and time slot

The output is a review the user can act on: a verdict, the timing, the problems in order of importance and concrete fixes per
slide. Leave the deck unchanged during the review, so the user decides what changes; offer to apply the fixes at the end and,
when they accept, edit following the `present-in-html` skill and re-run its checker.

## 1. Know the target

You need the **audience** (who, and what they already know), the **time** (slot in minutes; is Q&A inside it?) and the
**goal** (what they should know, decide or do at the end). Take them from the conversation or the deck: `data-duration` on
`<main class="deck">` is the slot, and the title slide and notes often name the event. Ask in one short message only for what
is missing; without the audience and time there is nothing to review against.

## 2. Get the numbers

```bash
node <skill base dir>/scripts/deck-stats.mjs deck.html            # per slide: layout, words on slide, words in notes, builds, est. time
node <skill base dir>/scripts/deck-stats.mjs deck.html --wpm 110  # teaching, a second language, a slow speaker
```

Time is estimated from the speaker notes at 130 words per minute (110 for teaching or translation, 150 for a fast pitch).
Slides without notes count 45 s each, which is a guess: say so. Backup slides (from the appendix on) and `data-skip` slides
are not timed. Then read the whole deck yourself, visible text **and** notes: the numbers point at problems, reading explains them.

## 3. What to look for

**Time**: the estimate against the slot, leaving room for Q&A if it is inside (finish at 85 to 90% of the slot). A slide far
longer than the rest is usually two slides. If over, say what to cut or move to backup and how many minutes that saves; if well
under, say what this audience is missing, not how to pad.

**Audience fit**: terms and acronyms they may not know (name each, with its slide); too much mechanism for executives or too
little evidence for experts, reviewers and investors; whether the deck leads with what this audience cares about first (a board:
the decision and the money; students: the why and an example; investors: traction, market, the ask; engineers: how it works
and the trade-offs); tone, formality and language (an Arabic deck keeps one dialect and reads right to left).

**Story and slides**: the one-sentence story is clear by slide 2 or 3; the titles alone read as an argument; each title is a
claim ("Revenue grew 18%") not a topic ("Revenue"); one idea per slide and at most 5 bullets; no point made twice; section
breaks in a long deck; the close asks for something specific that matches the goal.

**Facts**: every number has a source (notes, `.src` or `<figcaption>`) and numbers agree across slides; no placeholders left
("TBC", "illustrative", "lorem"); notes on every timed slide work as a script.

## 4. Write the review

Use this structure and keep it tight:

1. **Verdict**: one or two sentences. Ready, small fixes, or restructure, for *this* audience and slot.
2. **Timing**: estimate vs. slot, the assumptions (wpm, slides without notes) and the plan to hit the slot.
3. **Top fixes**, most important first, at most 7. Each: slide number and title, what is wrong for this audience, the concrete
   fix (rewrite the title as ..., cut ..., define ..., move to backup, split, add the source for ...).
4. **Per-slide notes**, one line each, only for slides not covered above.
5. One line offering to apply the fixes.

Quote the deck's own words when pointing at a problem. Don't invent facts for a fix: if a number or source is needed, say so
and leave it to the user.
