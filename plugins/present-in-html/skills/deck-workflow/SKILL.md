---
name: deck-workflow
description: Run the whole present-in-html deck workflow - plan the outline (Opus), build the HTML deck (Sonnet), review it against the audience, time slot and Winston's speaking rules plus an error check (Opus), fix, and publish to GitHub Pages (Sonnet) - or pick it up at any step with what the user already has (a request, a PLAN.md outline, or a finished deck). Use this when the user wants a deck made end to end, "plan, build, review and publish", a reviewed or checked deck, a deck taken all the way to a link, or to continue an earlier deck from where it stopped.
license: MIT (see LICENSE)
compatibility: Claude Code with dynamic workflows for the one-command run (the plugin's workflows and agents); without them, the same steps run as subagents. Node.js 18+, Playwright for the checker, gh for publishing.
---

# The deck workflow: plan, build, review, publish

Four steps, each done by the agent and model that suits it, handing off through files in one work folder:

| Step | Agent (model) | Skill it follows | Writes |
|---|---|---|---|
| 1. Plan | `deck-planner` (Opus) | present-in-html, sections 1 to 5 | `PLAN.md`: promise, story, fence, look, one row per slide |
| 2. Build | `deck-builder` (Sonnet) | present-in-html, section 6 | the deck, `shots/`, a clean checker run |
| 3. Review | `deck-reviewer` (Opus) | review-deck + the checker in every theme + plan vs. deck | `REVIEW.md`: PASS or FIX with blocking items |
| 3b. Fix | `deck-builder` (Sonnet) | applies the blocking items only; then review again (at most 2 rounds) | the fixed deck |
| 4. Publish | `deck-publisher` (Sonnet) | publish-deck | the live URL |

Planning and reviewing are judgment (Opus); building and publishing follow a written contract (Sonnet). The plan is what
the review checks the deck against, so the steps stay honest about each other.

## Start from wherever the user is

| The user has | Start at | Run |
|---|---|---|
| a topic, notes, files, data or links | plan | `make-deck` with the request |
| an outline they want kept | plan (the planner keeps their order and headings) | `make-deck` with the request and the outline file as material |
| a `PLAN.md` | build | `make-deck` with `{ folder, start: "build" }` |
| a finished deck | review | `make-deck` with `{ folder or deck, start: "review" }` |
| a reviewed deck | publish | `publish-deck` after their yes |
| a deck to reword by hand | anywhere | the edit-deck skill, then review again if the wording changed a lot |

`make-deck` also finds the start on its own: a deck in the folder means review, a `PLAN.md` means build, otherwise plan.

## How to run it

**1. Get what the plan needs.** The audience, the time slot, the goal, and the material (files, links, data). Ask in one
short message only for what is missing; the planner decides the look, slide count and layouts itself.

**2. Run `make-deck`** (`/present-in-html:make-deck`, a workflow): pass the arguments as an object, for example
`{ request: "Q3 board review", audience: "the board, non-technical", minutes: 12, goal: "approve 4 hires", material: ["q3.pdf"], folder: "q3-review" }`.
Add `stopAfter: "plan"` when the user wants to see the outline before anything is built; a plan over 15 slides stops there
on its own. To continue, run it again with `{ folder, start: "build" }`. It runs in the background: tell the user they can
follow it in `/workflows`.

**3. Report the result**: the deck path, the verdict, the review summary, and any blocking items left after two fix rounds.
Show the outline table from `PLAN.md` if the user has not seen it. Offer edit-deck for wording they want to change themselves.

**4. Publish only after an explicit yes.** Ask for the repository name, confirm the site and its source will be public, and
ask whether to remove the speaker notes (they are readable in the page source). Then run `publish-deck`
(`/present-in-html:publish-deck`) with `{ deck, repo, public: true, stripNotes, approved: true }`. A workflow cannot stop to
ask, which is why publishing is its own run and refuses to start without these.

## Without workflows

If dynamic workflows are turned off or unavailable, run the same steps yourself with the Agent tool, one after another,
each with its agent type and model: `present-in-html:deck-planner` (opus), then `present-in-html:deck-builder` (sonnet),
then `present-in-html:deck-reviewer` (opus); if the verdict is FIX, the builder in fix mode and the reviewer again, at most
twice; then, after the user's yes, `present-in-html:deck-publisher` (sonnet). Give each the work folder and the same
information the workflow passes (see `workflows/make-deck.js` in the plugin). Between steps, show the user the outline
and the verdict.
