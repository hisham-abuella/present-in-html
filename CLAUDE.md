# Claude Code Rules for This Project

## General Rules

1. **Only modify what is explicitly requested** - Do not make changes to parts of the code that were not specifically asked about.

2. **Verify changes after making them** - Always check that modifications work correctly before considering a task complete.

3. **Preserve existing functionality** - When fixing one issue, ensure you don't break other parts that were working fine.

4. **Keep changes minimal** - Use the smallest possible change to achieve the desired result.

## CSS/Styling Rules

1. **Avoid `!important` flags** - They cause specificity issues and make debugging harder.

2. **Test layout changes thoroughly** - Layout CSS can have unexpected cascading effects.

3. **Don't change title slides** - Title slides with vertical centering should not be modified unless specifically requested.

4. **Preserve slide dimensions** - The 16:9 aspect ratio and slide frame should remain unchanged.

## HTML/Content Rules

1. **Don't restructure HTML** - Only modify content, not the underlying structure unless asked.

2. **Keep emoji icons inside their containers** - Feature cards should always have icons and text together.

## Before Making Changes

- Read the relevant code section first
- Understand how it currently works
- Make targeted changes only
- Verify the change doesn't break related functionality

## Repository Layout

- `plugins/present-in-html/` is the installable plugin (five skills, four agents, two workflows). Only files they need at runtime go there.
- `keynote-pro/` is the engine's source. Edit the engine there, never in the plugin copy, then run `scripts/build-plugin.sh`
  to sync the plugin (`--check` reports drift).
- Extras (gallery, sample decks, build tools, evals, legacy formats) stay outside the plugin folder.
