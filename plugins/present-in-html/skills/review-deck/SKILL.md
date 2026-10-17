---
name: review-deck
description: Review the content of an HTML slide deck (present-in-html) against its target audience and the time available to present it — timing per slide from the speaker notes, audience fit (assumed knowledge, jargon, depth, tone), story and structure, numbers and sources, and Patrick Winston's MIT "How to Speak" rules (empowerment promise, cycling, verbal punctuation, slide crimes, the five S's, how to stop). Use this whenever the user asks to review, critique, sanity-check, tighten or rehearse a deck, asks "is this right for my audience", "will this fit in 20 minutes", "is it too long", or is preparing for a talk, pitch, lecture or review, or mentions Winston or MIT speaking rules, even if they don't say "review".
license: MIT (see LICENSE)
compatibility: Node.js 18+ for scripts/deck-stats.mjs.
---

# Review a deck for its audience and time slot

The output is a review the user can act on: a verdict, the timing, the problems in order of importance and concrete fixes per
slide. The reference for how a talk should work is Patrick Winston's "How to Speak" (MIT): `references/winston.md` has his
rules, each with what to look for in a deck and the fix to suggest. Leave the deck unchanged during the review, so the user decides what changes; offer to apply the fixes at the end and,
when they accept, edit following the `present-in-html` skill and re-run its checker.

**Part of the deck workflow** (plan, build, review, publish; the `deck-workflow` skill runs it end to end). This is the
review step. A user can start here with any finished deck; after the review, the fixes go back to the build step, and a
deck that passes can go on to publish-deck.

## 1. Know the target

You need the **audience** (who, and what they already know), the **time** (slot in minutes; is Q&A inside it?) and the
**goal** (what they should know, decide or do at the end). Take them from the conversation or the deck: `data-duration` on
`<main class="deck">` is the slot, and the title slide and notes often name the event. Ask in one short message only for what
is missing; without the audience and time there is nothing to review against.

## 2. Get the numbers

```bash
node <skill base dir>/scripts/deck-stats.mjs deck.html            # per slide: layout, words, notes, builds, est. time + speaking checks
node <skill base dir>/scripts/deck-stats.mjs deck.html --wpm 110  # teaching, a second language, a slow speaker
```

Time is estimated from the speaker notes at 130 words per minute (110 for teaching or translation, 150 for a fast pitch).
Slides without notes count 45 s each, which is a guess: say so. Backup slides (from the appendix on) and `data-skip` slides
are not timed. The speaking checks at the end (wordy slides, notes that repeat the slide, a thank-you or questions final
slide, the team slide at the end, signposts, question slides) are heuristics that name slides to read, not verdicts. Then read
the whole deck yourself, visible text **and** notes: the numbers point at problems, reading explains them.

## 3. What to look for

**Time**: the estimate against the slot, leaving room for Q&A if it is inside (finish at 85 to 90% of the slot). A slide far
longer than the rest is usually two slides. If over, say what to cut or move to backup and how many minutes that saves; if well
under, say what this audience is missing, not how to pad.

**Audience fit**: terms and acronyms they may not know (name each, with its slide); too much mechanism for executives or too
little evidence for experts, reviewers and investors; whether the deck leads with what this audience cares about first (a board:
the decision and the money; students: the why and an example; investors: traction, market, the ask; engineers: how it works
and the trade-offs); tone, formality and language (an Arabic deck keeps one dialect and reads right to left).

**Story and slides**: the one-sentence story is clear by slide 2 or 3; the titles alone read as an argument; each title is a
claim ("Revenue grew 18%") not a topic ("Revenue"); one idea per slide and at most 5 bullets; supporting points are not made
twice (the main idea should be, see cycling below); the close asks for something specific that matches the goal.

**Speaking rules (Winston)**: read `references/winston.md` and check the deck against it, weighted for the occasion:
- *Start*: no opening joke; an empowerment promise in the first minute; collaborators at the start, not the end.
- *During*: the main idea cycles (restated about three times); a fence says what it is not; verbal punctuation (an agenda
  that returns, section slides) in a longer talk; at least one real question to the audience where it fits.
- *Slides*: few words, notes that add to the slide rather than repeat it (so the speaker won't read), no clutter, the pointer
  built into the slide instead of a laser, one meaningful picture, a prop or live demo for an abstract idea.
- *Memorable*: which of the five S's (symbol, slogan, surprise, salient idea, story) the deck has.
- *Persuading* (pitch, job or research talk): vision and something done within the first five minutes; contributions at the end.
- *Stop*: the final slide is contributions or the story with the ask, not "Thank you" or "Questions?"; it keeps the
  promise; the last words salute the audience rather than thank them.
- *Also* (section 7 of the reference): premises this audience lacks, the first five minutes (`firstFiveMinutes`), one moment
  that inspires, a story for each key number, and whether the skeleton would fit on a whiteboard.

**Facts**: every number has a source (notes, `.src` or `<figcaption>`) and numbers agree across slides; no placeholders left
("TBC", "illustrative", "lorem"); notes on every timed slide work as a script.

## 4. Write the review

Use this structure and keep it tight:

1. **Verdict**: one or two sentences. Ready, small fixes, or restructure, for *this* audience and slot.
2. **Timing**: estimate vs. slot, the assumptions (wpm, slides without notes) and the plan to hit the slot.
3. **Speaking rules**: a short scorecard, one line per area (start, during, slides, memorable, stop; plus persuading when it
   applies): met, or what is missing with the slide number. Put the misses that matter most into the top fixes.
4. **Top fixes**, most important first, at most 7. Each: slide number and title, what is wrong for this audience, the concrete
   fix (rewrite the title as ..., cut ..., define ..., move to backup, split, add the source for ...).
5. **Coaching drafts** for the biggest misses only (reference section 8): e.g. three openings with a promise, three
   closings, the thesis three ways. Drafted from the deck's own facts.
6. **Per-slide notes**, one line each, only for slides not covered above.
7. **Rehearsal**: one line: a timed run out loud with the presenter window (P), then once more.
8. One line offering to apply the fixes.

Quote the deck's own words when pointing at a problem. Don't invent facts for a fix: if a number or source is needed, say so
and leave it to the user.
