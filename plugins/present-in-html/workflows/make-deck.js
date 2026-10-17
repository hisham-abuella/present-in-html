export const meta = {
  name: 'make-deck',
  description: 'Plan (Opus), build (Sonnet), review (Opus) and fix a presentation deck as one HTML file. Starts at any step: from a request, from a PLAN.md, or from a finished deck.',
  phases: ['Prepare', 'Plan', 'Build', 'Review', 'Fix'],
}

// args: a request string, or an object:
//   { request, audience, minutes, goal, material: [paths or links], folder, deck, start: 'plan'|'build'|'review', stopAfter: 'plan' }
// The work folder holds PLAN.md (outline), the deck, REVIEW.md and shots/. Publishing is a separate workflow (publish-deck),
// because it needs the user's yes and a workflow cannot stop to ask.
const a = typeof args === 'string' ? { request: args } : (args || {})
const AGENT = name => `present-in-html:${name}`
const brief = [
  a.request && `Request: ${a.request}`,
  a.audience && `Audience: ${a.audience}`,
  a.minutes && `Time slot: ${a.minutes} minutes`,
  a.goal && `Goal: ${a.goal}`,
  a.material?.length && `Material to use: ${[].concat(a.material).join(', ')}`,
].filter(Boolean).join('\n')

phase('Prepare')
const state = await agent(
  `Prepare the work folder for a presentation deck. Folder: ${a.folder || '(none given: create one in the current directory named after the request, lowercase with hyphens)'}.
Deck file: ${a.deck || '(none given: use the .html deck in the folder if there is exactly one, else deck.html)'}.
Create the folder if it does not exist. Do not create or change any other file. Report what is already there.`,
  {
    label: 'work folder', model: 'sonnet',
    schema: { type: 'object', required: ['folder', 'deck', 'hasPlan', 'hasDeck'], properties: {
      folder: { type: 'string', description: 'absolute path' }, deck: { type: 'string', description: 'absolute path of the deck file' },
      hasPlan: { type: 'boolean' }, hasDeck: { type: 'boolean' } } },
  },
)
if (!state) return 'Stopped: could not prepare the work folder.'
const start = a.start || (state.hasDeck ? 'review' : state.hasPlan ? 'build' : 'plan')
log(`Work folder ${state.folder}; starting at ${start}.`)
if (start === 'plan' && !brief) return 'Nothing to plan: pass a request (topic, audience, minutes, material) or start at build/review in a folder that has PLAN.md or a deck.'
if (start === 'review' && !state.hasDeck) return `No deck found in ${state.folder} to review.`
if (start === 'build' && !state.hasPlan) return `No PLAN.md in ${state.folder} to build from.`

let plan = null
if (start === 'plan') {
  phase('Plan')
  plan = await agent(`${brief}\n\nWork folder: ${state.folder}. Write ${state.folder}/PLAN.md.`, {
    agentType: AGENT('deck-planner'), model: 'opus', label: 'plan the outline',
    schema: { type: 'object', required: ['plan', 'slides', 'minutes'], properties: {
      plan: { type: 'string' }, promise: { type: 'string' }, story: { type: 'string' }, look: { type: 'string' },
      slides: { type: 'number' }, minutes: { type: 'number' }, placeholders: { type: 'array', items: { type: 'string' } } } },
  })
  if (!plan) return 'Stopped: planning failed.'
  if (a.stopAfter === 'plan' || plan.slides > 15)
    return { stoppedAfter: 'plan', reason: a.stopAfter === 'plan' ? 'asked to stop after the plan' : 'long deck: check the outline before building', ...plan,
      next: `Review ${plan.plan}, then run make-deck with { folder: "${state.folder}", start: "build" }.` }
}

if (start === 'plan' || start === 'build') {
  phase('Build')
  const built = await agent(`Build mode. Work folder: ${state.folder}. Build the deck at ${state.deck} from ${state.folder}/PLAN.md.`, {
    agentType: AGENT('deck-builder'), model: 'sonnet', label: 'build the deck', stallMs: 1800000,
  })
  if (!built) return 'Stopped: the build failed.'
}

let review = null
for (let round = 0; round <= 2; round++) {
  phase('Review')
  review = await agent(`Work folder: ${state.folder}. Deck: ${state.deck}. ${brief ? `\n${brief}` : 'Take the audience, time and goal from PLAN.md, or from the deck if there is no plan.'}
Write ${state.folder}/REVIEW.md.`, {
    agentType: AGENT('deck-reviewer'), model: 'opus', label: round ? `review again (round ${round + 1})` : 'review',
    schema: { type: 'object', required: ['verdict', 'blocking', 'review'], properties: {
      verdict: { type: 'string', enum: ['PASS', 'FIX'] }, blocking: { type: 'number' }, suggested: { type: 'number' },
      review: { type: 'string', description: 'path to REVIEW.md' }, summary: { type: 'string', description: 'two or three sentences' } } },
  })
  if (!review || review.verdict === 'PASS' || round === 2) break
  phase('Fix')
  const fixed = await agent(`Fix mode. Work folder: ${state.folder}. Deck: ${state.deck}. Apply the Blocking items in ${review.review}.`, {
    agentType: AGENT('deck-builder'), model: 'sonnet', label: `fix round ${round + 1}`, stallMs: 1800000,
  })
  if (!fixed) break
}

return {
  folder: state.folder, deck: state.deck, plan: plan?.plan || `${state.folder}/PLAN.md`,
  verdict: review?.verdict || 'not reviewed', blocking: review?.blocking, suggested: review?.suggested,
  review: review?.review, summary: review?.summary,
  next: review?.verdict === 'PASS'
    ? 'Ready. Open the deck in Chrome (F fullscreen, P presenter). To put it online, get the user\'s yes, then run publish-deck.'
    : 'Blocking items remain after two fix rounds: show them to the user before publishing.',
}
