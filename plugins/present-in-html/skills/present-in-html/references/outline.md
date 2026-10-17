# The outline (PLAN.md)

The contract between planning and building. Whoever builds the deck follows it slide by slide, and the review compares the
finished deck against it, so every field is concrete: no "TBD" except facts the user still has to supply.

## Format

```markdown
# <Deck title>

- **Audience**: who, and what they already know
- **Occasion and time**: event, slot in minutes, whether Q&A is inside the slot
- **Goal**: what the audience should know, decide or do at the end
- **Promise**: By the end you will ... (said on slide 1 or 2)
- **Story**: the whole argument in one sentence
- **Fence**: what the idea is not (the nearest alternative it could be confused with)
- **Look**: data-theme, data-fonts (empty = the theme's own), lang/dir, one line on why
- **Sources**: each file or link used, one per line
- **Placeholders**: facts still missing, or "none"

| # | data-id | layout | claim (the slide's h2) | content and facts (with source) | role | min |
|---|---|---|---|---|---|---|
| 1 | start | title | ... | subtitle = the promise | promise | 0.5 |
| 2 | agenda | agenda | ... | the parts | signpost | 0.5 |
| ... |
| n | close | closing | ... | what the audience now has, or the ask | contribution | 1 |

**Total**: n slides, about N minutes (finish at 85 to 90% of the slot when Q&A is inside it).
**Restatements of the story**: slides a, b, c (three, said three different ways).
```

## Rules for filling it in

- **Claim**: a sentence that states something ("Revenue grew 18%"), not a topic ("Revenue"). The titles alone, read in
  order, tell the story.
- **Content and facts**: only from the user's material, each with its source; anything missing is a named placeholder.
- **Role**, one or more per slide: promise, signpost, thesis (a restatement of the story), fence, evidence, story (an
  example or case that makes a number tangible), question (to the room), contribution, backup.
- **Layout**: one from `references/looks.md`; no more than two bullet slides in a row.
- **Minutes**: about one per slide for a talk, 1.5 to 2 for a lecture; the total fits the slot.
- **Required roles**: a promise in slides 1 to 2, the story restated three times, a fence, a contribution or the ask
  as the last slide (never "Thank you" or "Questions?"), and signposts when the talk is longer than about 10 minutes.
- Backup slides go last with role `backup`; they start with an appendix slide and are not counted in the time.
