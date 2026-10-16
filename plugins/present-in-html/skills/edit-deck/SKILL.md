---
name: edit-deck
description: Open a Keynote Pro HTML deck in the visual click-and-type editor so the user can fix wording, speaker notes and the title themselves, then save the same file back. Use this whenever the user wants to edit, tweak, proofread, retype or correct text in an existing HTML deck by hand, asks for "the editor", "the UI editor" or "let me edit it myself", or wants to change speaker notes directly, even if they don't name the editor.
license: MIT (see LICENSE)
---

# Edit a deck in the browser editor

The Keynote Pro editor is one self-contained page. The user clicks text on a slide and types, edits speaker notes, finds and
replaces across slides and renames the deck; Save writes only the changed words back into the same `.html` file, so the
engine, theme and layout are untouched.

It edits **words**. New slides, layouts, charts, images and themes are structural: that is the `present-in-html` skill. If the
user's request is really structural, say so and do it there instead of opening the editor.

## 1. Find the deck

The path the user gave; otherwise the `.html` files in the working folder that contain `<!-- SLIDES:START -->`. Ask only if
there are several and nothing points to one.

## 2. Open it

```bash
bash <skill base dir>/scripts/open-editor.sh path/to/deck.html
```

The script copies the editor next to the deck as `kp-editor.html` (the editor only loads decks from its own folder, which keeps
a link from pointing it at someone else's file), serves that folder on `127.0.0.1` so the deck's images and fonts show, opens
the browser and prints the URL and the stop command. Run it in the background or let it return; the server keeps running.
If the deck's name has spaces or unusual characters, the script opens the editor without the deck and the user picks the
file with **Open deck**.

## 3. Tell the user how to use it (short)

- Click any text on the slide and type; changed slides get a dot in the list on the left.
- Speaker notes are in the box under the slide.
- Find and replace works across all slides.
- **Save** in Chrome or Edge: when the browser asks where, choose the same deck file to overwrite it. Safari and Firefox download
  a copy instead, which the user then moves over the original.
- Tell me when you're done.

## 4. When they are done

```bash
bash <skill base dir>/scripts/open-editor.sh --stop path/to/deck.html     # stops the server, removes kp-editor.html
node <skill base dir>/../present-in-html/keynote-pro/check.mjs path/to/deck.html
```

Run the checker because longer wording can overflow a slide. If a slide now overflows, name it and offer to shorten the text or
split the slide. Offer **review-deck** if they want the new wording checked against the audience and time slot.
