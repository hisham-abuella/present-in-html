---
name: publish-deck
description: Publish an HTML slide deck (Keynote Pro) with its images, video and narration to GitHub Pages so it has a public link to share, or update or take down a deck already published there. Use this whenever the user wants to publish, host, deploy, share online, send a link to, or put on GitHub Pages their slides or presentation, even if they only say "make it shareable" or "get me a URL".
license: MIT (see LICENSE)
---

# Publish a deck to GitHub Pages

A Keynote Pro deck is a static HTML file plus the local files it points to, so GitHub Pages serves it as is, at
`https://<user>.github.io/<repo>/`, and every slide keeps its own link (`.../#pricing`).

## 1. Say what becomes public, and get a yes

Publishing is hard to undo (pages get cached and indexed), so before creating a repo or pushing tell the user:
- On a free GitHub plan, Pages needs a **public** repository: anyone can read the deck's source.
- **Speaker notes are inside the HTML**, readable with View Source. If they hold anything private, publish with
  `--strip-notes` (only the published copy loses them; the user's deck is untouched).
- Every image, video and audio file the deck uses is published too.

Confirm the repository name too (default: the deck's name, lowercase with hyphens, e.g. `q3-board-review`).

## 2. Build the site folder

```bash
gh auth status        # must be logged in; if not, ask the user to run:  ! gh auth login
node <skill base dir>/scripts/build-site.mjs deck.html --out <scratch>/site [--strip-notes]
node <skill base dir>/scripts/build-site.mjs a.html b.html --out <scratch>/site     # several decks + an index page
```

The script copies the deck (as `index.html` when there is one), every local file it references, the narration folder, and
adds `.nojekyll`. Because everything copied becomes public, it only takes web file types from inside the deck's folder, never
hidden files, and follows symlinks to check where they really point. It stops and lists anything missing or refused instead
of publishing. For a file outside the deck's folder (an image in `../assets/`), the better fix is to copy it next to the deck;
pass `--allow-outside` only after checking with the user that every listed file is meant to be public (it is copied into
`_ext/`). Never use it to get past a refusal you have not read. Build in a scratch location, not the user's project, and
leave working files (`parts/`, `shots/`, `kp-editor.html`) out.

## 3. Push and turn on Pages

New repository (the default; it keeps the deck separate from the user's code):

```bash
cd <scratch>/site
git init -q -b main && git add -A && git commit -qm "Publish <deck title>"
gh repo create <repo> --public --source . --push --description "<deck title> (slides)"
OWNER=$(gh api user --jq .login)
gh api -X POST "repos/$OWNER/<repo>/pages" -f 'source[branch]=main' -f 'source[path]=/' \
  || gh api -X PUT "repos/$OWNER/<repo>/pages" -f 'source[branch]=main' -f 'source[path]=/'
```

Into an existing repository instead: push the site folder to a `gh-pages` branch (`git push <remote-url> HEAD:gh-pages` from the
site folder) so their `main` stays untouched, and enable Pages with `source[branch]=gh-pages`.

## 4. Wait for the build and check it

```bash
until s=$(gh api "repos/$OWNER/<repo>/pages/builds/latest" --jq .status 2>/dev/null); [ "$s" = built ] || [ "$s" = errored ]; do sleep 10; done; echo "$s"
URL=$(gh api "repos/$OWNER/<repo>/pages" --jq .html_url); curl -sI "$URL" | head -1
```

Expect `built` and `200` (a new site can take another minute to answer). On `errored`, read
`gh api repos/$OWNER/<repo>/pages/builds/latest --jq .error.message`. Open the URL and confirm the title slide and an image load.

## 5. Deliver

The URL; a direct link to one or two key slides (`$URL#<data-id>`); that **P** presenter view and the other keys work online;
that the source is public, and whether notes were stripped.

**Update later**: rebuild the site folder from the current deck, copy it over a clone of the repo, commit and push; Pages
rebuilds by itself (repeat step 4). **Take it down**: `gh api -X DELETE repos/$OWNER/<repo>/pages` turns Pages off and keeps the
repo; delete the repo only if the user asks.
