export const meta = {
  name: 'publish-deck',
  description: 'Publish a reviewed presentation deck to GitHub Pages (Sonnet, with the publish-deck skill). Runs only with the user\'s approval of the repository name, public visibility and speaker notes.',
  phases: ['Publish'],
}

// args: { deck, repo, public: true, stripNotes: true|false, approved: true }
// Ask the user first: the repository name, that the site and its source will be public, and whether to remove the speaker
// notes (they are readable in the page source). A workflow cannot stop to ask, so it refuses to run without that approval.
const a = args || {}
const missing = [!a.deck && 'deck', !a.repo && 'repo', a.public !== true && 'public: true', typeof a.stripNotes !== 'boolean' && 'stripNotes',
  a.approved !== true && 'approved: true'].filter(Boolean)
if (missing.length) return `Not published. Ask the user, then pass: ${missing.join(', ')}.`

phase('Publish')
const out = await agent(`The user approved publishing.
Deck: ${a.deck}
Repository: ${a.repo} (new, public)
Strip speaker notes: ${a.stripNotes ? 'yes' : 'no'}
Outside files approved for publishing: ${a.allowOutside ? [].concat(a.allowOutside).join(', ') : 'none'}`, {
  agentType: 'present-in-html:deck-publisher', model: 'sonnet', label: `publish ${a.repo}`, stallMs: 1800000,
  schema: { type: 'object', required: ['url'], properties: { url: { type: 'string' }, slideLink: { type: 'string' }, notesStripped: { type: 'boolean' } } },
})
return out || 'Publishing failed: see the agent detail in /workflows.'
