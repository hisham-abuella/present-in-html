# Speaking rules: Patrick Winston, "How to Speak" (MIT)

The review rubric. Patrick Winston taught "How to Speak" at MIT every January for decades; the 2018 lecture is on MIT
OpenCourseWare (https://ocw.mit.edu/courses/res-tll-005-how-to-speak-january-iap-2018/). His premise: success depends
largely on how well you speak, write and on the quality of your ideas, in that order, and speaking is a skill built from
knowledge and practice far more than talent. Each rule below says what to look for in a deck and what fix to suggest.
`deck-stats.mjs` flags the measurable ones; the rest need reading the slides and the notes.

Contents: start · during the talk · slides · make it memorable (the five S's) · persuading · stop · the 15 lessons in
short · coaching drafts

## 1. How to start

| Rule | Look for in the deck | Suggest |
|---|---|---|
| **Don't open with a joke.** People are still settling in and not ready for it. | The first spoken line in slide 1's notes is a joke or warm-up chatter. | Open with the promise instead; save the joke for the end. |
| **Empowerment promise.** Within the first minute, tell the audience what they will know or be able to do at the end. | A sentence in the first 1 to 2 slides (or their notes) that says what the audience gets: "By the end you'll know how to ..." | Write one, specific to this audience; make it the subtitle of the title slide or slide 2. |
| **Collaborators at the start, not the end.** | A team / thanks / acknowledgements slide among the last slides (`teamAtEnd`). | Move it to slide 2 or 3. |

## 2. During the talk

| Rule | Look for | Suggest |
|---|---|---|
| **Cycling.** Say the main idea several times (he suggests about three), because some of the audience is always drifting. | The core claim appears once only. Find the deck's one-sentence story and count how many slides restate it (title, middle, close). | Restate it at a section break and on the final slide, in the same words. |
| **Build a fence.** Say what your idea is *not*, so it is not confused with a similar one. | No slide or note that contrasts the idea with the nearest alternative. | Add a two-column or comparison slide: "This is not X; it differs because ...". |
| **Verbal punctuation.** Landmarks that let drifting listeners rejoin: an outline that returns, numbered parts, "now we come to ...". | `signposts`: agenda and section slides. A deck over about 10 slides with none. | An agenda slide that returns at each section break with `aria-current` on the current part, or section slides. |
| **Ask a question.** A question with the right difficulty, and wait for the answer (he suggests about seven seconds). | `questionSlides`: quiz layouts or titles that end in "?". Notes that say to pause. | One real question to the audience at a turn in the argument; a `quiz` slide for teaching. |

## 3. Slides

Slides are condiments for the speaker, not the main course: they should reflect what you say, not replace it.

| Rule | Look for | Suggest |
|---|---|---|
| **Not too many words.** If it doesn't fit in big type, it is too much. (The engine already refuses text under 28px.) | `wordySlides`: over about 40 words, excluding tables, code and sources. | Cut to the claim and its support; move the rest into the notes or split the slide. |
| **Don't read your slides.** The audience reads faster than you speak and stops listening. | `notesRepeatSlide`: notes that mostly repeat the slide's words. Bullets that are full sentences. | Notes should add what the slide doesn't say: the why, the example, the story. Shorten bullets to cues. |
| **Stay near the screen.** Divided attention between speaker and slide loses people. | Not visible in the file; mention it for the room. | Present next to the screen; use the presenter window (P) on a laptop beside it. |
| **No laser pointers.** They break eye contact and nobody can follow the dot. | Notes that say "point at ...". The engine has a laser (L): don't plan the talk around it. | Put the pointer in the slide: `data-highlight` on the bar that matters, a build that reveals one item, an arrow in the diagram. |
| **Remove clutter.** Logos, decorative pictures, frames and background noise compete with the idea. | Logos on every slide, stock or clip-art images that carry no meaning, decorative shapes. | Keep one meaningful picture per slide at most; drop the logo after the title slide. |
| **One complex slide is allowed** (he calls it a hapax legomenon): show the full mess once to make a point about complexity, then simplify. | A dense diagram the notes treat as something to explain line by line. | Keep it if the point is "this is complicated"; say that and move on. |
| **Props.** A physical object or live demo is remembered long after the slides. | Abstract mechanism explained only in words. | A prop, or a live demo on the slide (see the beyond-slides patterns in the present-in-html skill). |

## 4. Make it memorable: the five S's

For ideas that should be remembered and attributed to the speaker. Name which of these the deck has and which it lacks.

- **Symbol**: a visual the idea is tied to (a picture, a diagram, a recurring mark).
- **Slogan**: a short phrase that names the idea and can be repeated (it is also what cycling repeats).
- **Surprise**: something counterintuitive, where the common belief turns out to be wrong.
- **Salient idea**: the one idea that sticks out; not necessarily the most important, but the one people will repeat.
- **Story**: how it was done, how it works, why it matters, told as a story.

## 5. Persuading (job talks, pitches, proposals, research talks)

- Within the first **five minutes**, show the **vision** (the problem and why it matters, plus a new approach) and that
  you have **done something** (the steps you took and the result).
- End with your **contributions**: what you did, in your words, not a generic summary.

Look for: a vision slide and a result in the first five slides of a pitch or research talk; a contributions slide near the end.

## 6. How to stop

| Rule | Look for | Suggest |
|---|---|---|
| **The final slide stays up the longest, so make it work.** Not "Thank you", "Questions?", "The end" or a URL alone. | `weakFinalSlide`: a closing slide whose text is only thanks or questions. | A contributions slide (what we did / what you now know), or the one-sentence story with the ask. Questions can still be taken while it is up. |
| **Keep the promise.** Come back to the empowerment promise and show it was delivered. | The close does not echo the promise from slide 1 to 2. | Restate the promise as delivered on the final slide. |
| **Final words: salute, don't thank.** Thanking implies the audience did you a favour by staying. A joke at the very end is fine. | Notes on the last slide that end with "thank you". | End with a salute: "It's been great to be here with you; I hope ...". |

## 7. The 15 lessons in short

A widely shared summary of the lecture lists 15 lessons. Condensed, and marked by source: **W** = Winston says it in the
lecture; **R** = a reading of the lecture, not his words, still useful as a check.

| # | Lesson | | How the review uses it |
|---|---|---|---|
| 1 | Open with a promise, not a joke. | W | Empowerment promise in slide 1 to 2 (section 1). |
| 2 | You are too close to your idea to see what others don't know. | R | List the premises the deck takes for granted; flag terms and steps this audience lacks. |
| 3 | The first five minutes decide whether people keep listening. | W (job talks), R (all talks) | Read the slides in `firstFiveMinutes`: promise, relevance, a reason to listen. |
| 4 | Say the main idea three times, three ways. | W (cycling); "three ways" R | Find the thesis and count its restatements; vary them (a metaphor, an example, a question). |
| 5 | Fence the idea: say what it is not. | W | A contrast with the nearest alternative (section 2). |
| 6 | Verbal punctuation; pauses let an idea land. | W (landmarks); pauses R | Signposts in a longer talk; notes that mark where to pause. |
| 7 | Ask a question and wait (about seven seconds). | W | At least one real question where it fits the occasion. |
| 8 | Never read your slides. | W | `notesRepeatSlide`; bullets that are full sentences. |
| 9 | Boards slow you to the audience's speed; slides go too fast. | W | Whiteboard test: could the talk's skeleton be drawn as a few boxes and arrows? If not, the structure is unclear. |
| 10 | Inspire before you inform. | W (informing includes inspiring) | Is there one moment of wonder, surprise or a shift in view, early? |
| 11 | End with a contribution, not a summary. | W | Final slide = what the audience now has or what was done (section 6). |
| 12 | Don't end with "thank you". | W | `weakFinalSlide`; last words in the notes (section 6). |
| 13 | Story, then data. | R | Each key number has a short story, case or comparison that makes it tangible. |
| 14 | Communication decides how the world values your ideas. | W (paraphrased) | Why the review matters; no separate check. |
| 15 | Practice is what makes the skill. | W (knowledge, practice, a little talent) | Close the review with a rehearsal plan: timed run with the presenter window (P), out loud, then once more. |

## 8. Coaching drafts

When the review finds a miss in one of these, draft the fix from the deck's own words and facts (never new facts), at most
three options each, so the user can pick instead of starting from a blank page:

- **Openings**: three first lines that make a concrete promise to this audience.
- **The thesis three ways**: as a metaphor, as a real example, as a question the audience already asks.
- **Fences**: one "this is not ..." line per key claim, naming the misconception it removes.
- **Questions**: two or three questions to ask the room, hard enough to make people think.
- **Story for a number**: a one-line case or comparison that makes a key figure tangible.
- **Closings**: three final-slide lines in different registers (intriguing, challenging, hopeful), each a contribution, not thanks.

## Applying the rules

Judge every rule against this audience and occasion: a five-minute stand-up does not need an agenda, and a lecture needs
questions far more than a board update does. Report the rules that matter most for this deck first; don't list every rule
it passes.
