# Design references: style recipes and craft rules

Read this when you choose or tune a look, or when you make a custom theme (a new mood, or the user's own brand).
It complements `looks.md`: try a shipped theme first. Use a recipe here when none of them fits the mood.

The recipes are inspired by references on styles.refero.design. They describe moods, not companies. Never name a
real brand as the look, copy a logo, or promise "it looks like company X".

**How to use a recipe.** Paste the block into the deck's `<style id="kp-themes">`, just before
`/* LIBRARY:THEMES:START */`, and set `<html data-theme="..." data-fonts="">`. Do not paste it inside the LIBRARY block:
`add-look.mjs` rejects theme ids it does not know there. `upgrade.mjs` rebuilds this style, so paste the block again after
an upgrade. Each block fills every required token and passes the 4.5:1 contrast audit (ink, ink2 and brand-text on bg and
bg2; hero, bleed and code colours; `--on-brand` on `--hot` chips). If you change a colour, run `scripts/check.mjs` again.

**Signature rules** go inside the block, before `/* /THEME */`. The snippets below omit the scope: put
`[data-theme="name"] ` before each selector. Hero slides are `.slide:is([data-layout="title"],[data-layout="section"],[data-layout="closing"],[data-tone="hero"])`.
Add at most two.

**Fonts.** The last field of the `THEME:` comment is a Google Fonts stylesheet URL; the engine loads it when the deck opens
online. Offline, the fallbacks in each font stack are used, so always end the stack with a system face. Leave `data-fonts`
empty, or a pairing overrides the recipe's fonts. For a deck that must look the same with no internet, set
`data-fonts="system"`.

## 1. Style recipes

### Terminal on paper
Off-white paper, near-black type, mono labels, one green for wins. Precise and quiet.
```css
/* THEME:terminal-paper | Terminal on paper | #297a3a | https://fonts.googleapis.com/css2?family=Geist:wght@400..600&family=Geist+Mono:wght@400;500&display=swap */
html[data-theme="terminal-paper"]{
  --bg:#fafafa; --bg2:#f0f0f0; --ink:#171717; --ink2:#4d4d4d; --rule:#e5e5e5; --rule-strong:#171717;
  --brand:#171717; --brand-text:#297a3a; --on-brand:#fafafa; --hot:#297a3a;
  --hero-bg:#0a0a0a; --hero-ink:#fafafa; --hero-ink2:#a3a3a3; --hero-rule:#2e2e2e; --hero-brand:#4ade80;
  --bleed-bg:#171717; --bleed-ink:#fafafa;
  --f-display:"Geist","Inter",system-ui,sans-serif; --f-body:"Geist","Inter",system-ui,sans-serif; --f-mono:"Geist Mono","JetBrains Mono",ui-monospace,monospace;
  --w-display:500; --ls-display:-0.05em; --em-style:normal; --radius:6px; --chart-radius:2px; --letterbox:#0a0a0a;
  --code-bg:#f0f0f0; --code-ink:#171717; --c-kw:#7c3aed; --c-str:#297a3a; --c-num:#9a4708; --c-com:#5c5c5c; --c-fn:#0b62c4;
}
/* /THEME */
```
- Labels as terminal eyebrows: `.label{text-transform:uppercase;letter-spacing:.07em}`; a `▲` or `$` before the label text.
- Panels with a double hairline ring instead of a shadow: `box-shadow:0 0 0 1px rgba(0,0,0,.08),0 0 0 2px #fafafa`.
- Suits: tech talks, code, process, stats, launches. Nearest: `keynote-white`, `commit`.

### Warm cream editorial
Cream paper, light-weight sans headlines, a serif for reading, one electric blue used once or twice per slide.
```css
/* THEME:cream-editorial | Warm cream editorial | #0007cb | https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500&family=Source+Serif+4:opsz,wght@8..60,300;8..60,400&family=JetBrains+Mono:wght@400;500&display=swap */
html[data-theme="cream-editorial"]{
  --bg:#faf9f6; --bg2:#f1eee9; --ink:#111111; --ink2:#4f4f4f; --rule:#dedbd6; --rule-strong:#111111;
  --brand:#0007cb; --brand-text:#0007cb; --on-brand:#ffffff;
  --hero-bg:#f1eee9; --hero-ink:#111111; --hero-ink2:#4f4f4f; --hero-rule:#d3cec6; --hero-brand:#0007cb;
  --bleed-bg:#111111; --bleed-ink:#faf9f6;
  --f-display:"Inter Tight","Inter",system-ui,sans-serif; --f-body:"Source Serif 4",Georgia,serif; --f-mono:"JetBrains Mono",ui-monospace,monospace;
  --w-display:300; --ls-display:-0.03em; --em-style:normal; --radius:4px; --chart-radius:0px; --letterbox:#1a1917;
  --code-bg:#f1eee9; --code-ink:#111111; --c-kw:#0007cb; --c-str:#2d6a3e; --c-num:#8a4b00; --c-com:#5e5a54; --c-fn:#6a1b9a;
}
/* /THEME */
```
- Display at weight 300, line-height about 0.95. Never bold the headline. Radius 4px everywhere, no pills.
- No shadows and no section dividers: separate with the tone step `--bg` to `--bg2`. Mono labels at `letter-spacing:.1em`.
- Suits: essays, customer stories, quote, statement, two-column. Nearest: `editorial`.

### Midnight neon console
Near-black canvas, white type, one coral used like a status light. Panels look like keys on a keyboard.
```css
/* THEME:neon-console | Midnight neon console | #ff6363 | https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap */
html[data-theme="neon-console"]{
  --bg:#07080a; --bg2:#111214; --ink:#f2f2f2; --ink2:#9c9c9d; --rule:#2a2b2e; --rule-strong:#e6e6e6;
  --brand:#ff6363; --brand-text:#ff6363; --on-brand:#07080a; --rec-mix:22%;
  --hero-bg:#040506; --hero-ink:#ffffff; --hero-ink2:#9c9c9d; --hero-rule:#363739; --hero-brand:#ff6363;
  --bleed-bg:#ff6363; --bleed-ink:#07080a;
  --f-display:"Inter",system-ui,sans-serif; --f-body:"Inter",system-ui,sans-serif; --f-mono:"Geist Mono","JetBrains Mono",ui-monospace,monospace;
  --w-display:600; --ls-display:0em; --em-style:normal; --radius:16px; --chart-radius:6px; --letterbox:#000;
  --code-bg:#111214; --code-ink:#f2f2f2; --c-kw:#ff8a8a; --c-str:#59d499; --c-num:#ffc56b; --c-com:#8b8c8e; --c-fn:#56c2ff;
}
/* /THEME */
```
- Key-cap panels: `box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 0 0 1px rgba(255,255,255,.25),inset 0 -1px 0 rgba(0,0,0,.2)`.
- Hero wash: `background:radial-gradient(ellipse at 50% 26%,rgba(4,63,150,.55),rgba(6,18,37,.2) 60%,var(--hero-bg))`.
- Coral never as body text or links; one coral thing per slide. Suits: demos, product reveals, code. Nearest: `keynote-black`, `sentinel`.

### Parchment research
Warm off-white, warm near-black ink, deep teal accent, a serif italic for quotes. Calm and scholarly.
```css
/* THEME:parchment-research | Parchment research | #016a71 | https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@400;500&display=swap */
html[data-theme="parchment-research"]{
  --bg:#f7f7f4; --bg2:#eeede8; --ink:#26251e; --ink2:#5f5e58; --rule:#cdcdc9; --rule-strong:#26251e;
  --brand:#016a71; --brand-text:#016a71; --on-brand:#f7f7f4;
  --hero-bg:#26251e; --hero-ink:#f7f7f4; --hero-ink2:#b9b8b1; --hero-rule:#4a4940; --hero-brand:#5cc3c9;
  --bleed-bg:#016a71; --bleed-ink:#f7f7f4;
  --f-display:"Hanken Grotesk","Inter",system-ui,sans-serif; --f-body:"Hanken Grotesk","Inter",system-ui,sans-serif; --f-mono:"JetBrains Mono",ui-monospace,monospace;
  --w-display:400; --ls-display:-0.03em; --em-style:italic; --radius:8px; --chart-radius:2px; --letterbox:#1b1a15;
  --code-bg:#eeede8; --code-ink:#26251e; --c-kw:#9c3d00; --c-str:#1f6b4c; --c-num:#016a71; --c-com:#66655f; --c-fn:#a3204a;
}
/* /THEME */
```
- Quotes and ledes in the serif: `[data-theme="parchment-research"] :is(blockquote,.lede){font-family:"EB Garamond",Georgia,serif}`.
- No pure white and no pure black anywhere. Warm shadows only, and only on one mock-up per deck.
- Suits: research findings, references, quote, rows (claim, evidence, caveat). Nearest: `editorial`, `labbook`.

### Serif analytics on paper
White paper, a regular-weight serif headline, charts as one brown line. One peach panel per deck.
```css
/* THEME:serif-analytics | Serif analytics on paper | #5d2a1a | https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;1,8..60,400&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400&display=swap */
html[data-theme="serif-analytics"]{
  --bg:#ffffff; --bg2:#f2f2f3; --ink:#17191c; --ink2:#5b5f69; --rule:#e6e6e8; --rule-strong:#17191c;
  --brand:#5d2a1a; --brand-text:#5d2a1a; --on-brand:#fbe1d1; --s2:#a3a6af; --muted-bar:#d9dadd;
  --hero-bg:#fbe1d1; --hero-ink:#17191c; --hero-ink2:#5d2a1a; --hero-rule:#e8bfa6; --hero-brand:#5d2a1a;
  --bleed-bg:#5d2a1a; --bleed-ink:#fbe1d1;
  --f-display:"Source Serif 4",Georgia,serif; --f-body:"Inter",system-ui,sans-serif; --f-mono:"JetBrains Mono",ui-monospace,monospace;
  --w-display:400; --ls-display:-0.025em; --em-style:italic; --radius:24px; --chart-radius:4px; --letterbox:#17191c;
  --code-bg:#f2f2f3; --code-ink:#17191c; --c-kw:#5d2a1a; --c-str:#2f6b45; --c-num:#8a4b00; --c-com:#5f636c; --c-fn:#2c4f8a;
}
/* /THEME */
```
- Headline serif at 400 only; one phrase in italic. Hierarchy from size and half-step weights (Inter 450/500), not bold.
- Charts: one series, no gridlines, the line in `--brand`. Stats as floating white cards: `box-shadow:0 0 0 1px rgba(4,23,43,.05),0 20px 25px -5px rgba(0,0,0,.1)`.
- Suits: analytics reviews, chart, stats, big-number. Nearest: `notebook`, `partner`.

### Golden-hour editorial
Warm stone canvas, charcoal type, a wine fill and a violet emphasis. Deep lagoon green on hero slides; warm photos.
```css
/* THEME:golden-hour | Golden-hour editorial | #421d24 | https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap */
html[data-theme="golden-hour"]{
  --bg:#f2f0eb; --bg2:#e7e4dc; --ink:#292827; --ink2:#5a5855; --rule:#dcd9d2; --rule-strong:#292827;
  --brand:#421d24; --brand-text:#6a45ad; --on-brand:#ffffff; --hot:#6a45ad;
  --hero-bg:#0c4243; --hero-ink:#f2f0eb; --hero-ink2:#b5ccca; --hero-rule:#2c6263; --hero-brand:#d4c7ff;
  --bleed-bg:#421d24; --bleed-ink:#f2f0eb;
  --f-display:"Albert Sans","Inter",system-ui,sans-serif; --f-body:"Albert Sans","Inter",system-ui,sans-serif; --f-mono:"JetBrains Mono",ui-monospace,monospace;
  --w-display:500; --ls-display:-0.028em; --em-style:normal; --radius:16px; --chart-radius:6px; --letterbox:#1d0c10;
  --code-bg:#292827; --code-ink:#f2f0eb; --c-kw:#c9b8ff; --c-str:#9fd3b0; --c-num:#f2b880; --c-com:#a3a09a; --c-fn:#8fc8ff;
}
/* /THEME */
```
- Lilac chips: `.chip{background:#d4c7ff;border-color:#d4c7ff;color:var(--ink)}` (9.4:1). Full-bleed golden photos with translucent white panels (`rgba(255,255,255,.85)`).
- Tabular figures in stats. Hero rhythm: photo, cream, lagoon, then a wine closing.
- Suits: product stories, launches, people and culture decks. Nearest: `people`, `estate`.

### Industrial catalogue
Pale mint-grey paper, black hairline grid, thin type, zero radius. Amber only as a fill, like a warning label.
```css
/* THEME:industrial-catalogue | Industrial catalogue | #f0a800 | https://fonts.googleapis.com/css2?family=Inter+Tight:wght@200;300;400&family=Inter:wght@300;400&family=IBM+Plex+Mono:wght@400&display=swap */
html[data-theme="industrial-catalogue"]{
  --bg:#f6f8f7; --bg2:#eceeed; --ink:#000000; --ink2:#4d4d4d; --rule:#d9dbda; --rule-strong:#000000;
  --brand:#f0a800; --brand-text:#000000; --on-brand:#000000; --s2:#0f0e12; --hot:#f0a800;
  --hero-bg:#0f0e12; --hero-ink:#f6f8f7; --hero-ink2:#b2b2b2; --hero-rule:#3a393e; --hero-brand:#f0a800;
  --bleed-bg:#0f0e12; --bleed-ink:#f6f8f7;
  --f-display:"Inter Tight","Inter",system-ui,sans-serif; --f-body:"Inter",system-ui,sans-serif; --f-mono:"IBM Plex Mono",ui-monospace,monospace;
  --w-display:300; --ls-display:-0.02em; --em-style:normal; --radius:0px; --chart-radius:0px; --letterbox:#0f0e12;
  --code-bg:#0f0e12; --code-ink:#f6f8f7; --c-kw:#f0a800; --c-str:#9fd3a8; --c-num:#ffb59a; --c-com:#9a9a9a; --c-fn:#8ab4ff;
}
/* /THEME */
```
- Ruled bands, not boxes: `.kp-foot{border-top:1px solid var(--ink);padding-top:14px}`; 1px vertical rules between columns.
- Amber fill holds black text (10.3:1) but amber text on paper fails; that is why `--brand-text` is black. Spacing on 15/22/33/66px.
- Suits: product specs, materials, process, comparison. Nearest: `swiss`, `drawing`, `blueprint`.

### Midnight gallery
Charcoal canvas, a light high-contrast serif with roman and italic in one line, quiet violet, cyan only in charts.
```css
/* THEME:midnight-gallery | Midnight gallery | #847dff | https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@300;400&family=Roboto+Mono:wght@400;500&display=swap */
html[data-theme="midnight-gallery"]{
  --bg:#0f1011; --bg2:#1c1d1f; --ink:#f5f5f7; --ink2:#a3a3a4; --rule:#2e2e2e; --rule-strong:#cacaca;
  --brand:#847dff; --brand-text:#a7a2ff; --on-brand:#0f1011; --s2:#00b3dd; --rec-mix:24%;
  --hero-bg:#090a0b; --hero-ink:#f5f5f7; --hero-ink2:#a3a3a4; --hero-rule:#2e2e2e; --hero-brand:#a7a2ff;
  --bleed-bg:#847dff; --bleed-ink:#0f1011;
  --f-display:"Playfair Display",Georgia,serif; --f-body:"Inter",system-ui,sans-serif; --f-mono:"Roboto Mono",ui-monospace,monospace;
  --w-display:400; --ls-display:-0.01em; --em-style:italic; --radius:16px; --chart-radius:4px; --letterbox:#000;
  --code-bg:#1c1d1f; --code-ink:#f5f5f7; --c-kw:#b3aeff; --c-str:#9fe0b8; --c-num:#f2b880; --c-com:#8e8e90; --c-fn:#5fd0f0;
}
/* /THEME */
```
- Labels in mono caps with wide tracking: `.label{text-transform:uppercase;letter-spacing:.18em}`.
- One inverted stat card per deck: `background:#cacaca;color:#0f1011`. No shadows; surfaces step by tone.
- Suits: finance, investor updates, premium services, big-number. Nearest: `estate`, `keynote-black`.

### AI glow
Deep violet-black space, lilac-white type, medium-weight display, a gradient only on the headline accent.
```css
/* THEME:starlit-glow | AI glow | #9382ff | https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap */
html[data-theme="starlit-glow"]{
  --bg:#030014; --bg2:#0d0828; --ink:#f4f0ff; --ink2:#a8a6b7; --rule:#221c45; --rule-strong:#cdccd0;
  --brand:#5046e4; --brand-text:#9382ff; --on-brand:#ffffff; --s1:#9382ff; --rec-mix:24%;
  --hero-bg:#030014; --hero-ink:#ffffff; --hero-ink2:#a8a6b7; --hero-rule:#221c45; --hero-brand:#ba9cff;
  --bleed-bg:#10093a; --bleed-ink:#f4f0ff;
  --f-display:"Sora","Inter",system-ui,sans-serif; --f-body:"Inter",system-ui,sans-serif; --f-mono:"JetBrains Mono",ui-monospace,monospace;
  --w-display:500; --ls-display:-0.01em; --em-style:normal; --em-fill:linear-gradient(90deg,#e59cff 0%,#ba9cff 50%,#9cb2ff 100%);
  --radius:16px; --chart-radius:6px; --letterbox:#000;
  --code-bg:#0d0828; --code-ink:#f4f0ff; --c-kw:#c3a6ff; --c-str:#8fe3b0; --c-num:#ffb38a; --c-com:#8d8aa3; --c-fn:#7fc8ff;
}
/* /THEME */
```
- Rim-lit panels instead of borders: `box-shadow:inset 0 0 24px rgba(255,255,255,.05)`.
- Aurora divider: `height:1px;background:linear-gradient(90deg,transparent,#b7a4fb 50%,transparent)`. Optional star field on hero slides: two `radial-gradient(1px 1px at ...)` layers, very sparse.
- Gradient on text and thin lines only, never on fills. Suits: AI products, vision, demos. Nearest: `keynote-black`.

### Sticker pop
Bright white and sky blue, heavy display type, 1px black outlines on everything, many cheerful fills and no single accent.
```css
/* THEME:sticker-pop | Sticker pop | #5c4ade | https://fonts.googleapis.com/css2?family=Bowlby+One&family=Manrope:wght@500;700&family=JetBrains+Mono:wght@400;500&display=swap */
html[data-theme="sticker-pop"]{
  --bg:#ffffff; --bg2:#dceeff; --ink:#000000; --ink2:#3a3a3a; --rule:#000000; --rule-strong:#000000;
  --brand:#5c4ade; --brand-text:#5c4ade; --on-brand:#ffffff; --s2:#55db9c; --s3:#ffd731; --hot:#c2410c;
  --hero-bg:#dceeff; --hero-ink:#000000; --hero-ink2:#2b2b2b; --hero-rule:#000000; --hero-brand:#5c4ade;
  --bleed-bg:#000000; --bleed-ink:#ffffff;
  --f-display:"Bowlby One","Arial Black",sans-serif; --f-body:"Manrope","Inter",system-ui,sans-serif; --f-mono:"JetBrains Mono",ui-monospace,monospace;
  --w-display:400; --ls-display:0em; --em-style:normal; --radius:24px; --chart-radius:12px; --letterbox:#000;
  --code-bg:#000000; --code-ink:#ffffff; --c-kw:#c9b8ff; --c-str:#55db9c; --c-num:#ffd731; --c-com:#a0a0a0; --c-fn:#7cc0ff;
}
/* /THEME */
```
- Stickers: `.chip{border:1px solid #000;border-radius:999px;background:#ffd731;transform:rotate(-3deg);margin-inline:8px}`; vary fill (#55db9c, #e9ccff, #ffd731) and angle (keep it within 3deg, or chips at the edge leave the safe area). Black text on all of them.
- A black marquee band of uppercase Manrope 700 at `letter-spacing:.03em`. Display line-height about 0.9.
- Suits: consumer launches, events, schoolyard-style energy, title and statement. Nearest: `campaign`, `schoolyard`.

### Soft wellness
Warm oat paper, deep sage ink, a soft serif with rounded body type, big radii, peach as the warm second note (values composed, not taken from one reference).
```css
/* THEME:soft-wellness | Soft wellness | #3f7a5c | https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Nunito+Sans:wght@400;600;700&family=JetBrains+Mono:wght@400&display=swap */
html[data-theme="soft-wellness"]{
  --bg:#f6f4ee; --bg2:#e9eee4; --ink:#1f2a24; --ink2:#4c5a52; --rule:#d8ddd2; --rule-strong:#1f2a24;
  --brand:#3f7a5c; --brand-text:#2f6a4c; --on-brand:#ffffff; --s2:#e4a98a; --hot:#a4502e;
  --hero-bg:#2f5a45; --hero-ink:#f6f4ee; --hero-ink2:#c9d8cc; --hero-rule:#4c7560; --hero-brand:#f2c7ae;
  --bleed-bg:#3f7a5c; --bleed-ink:#ffffff;
  --f-display:"Fraunces",Georgia,serif; --f-body:"Nunito Sans","Inter",system-ui,sans-serif; --f-mono:"JetBrains Mono",ui-monospace,monospace;
  --w-display:400; --ls-display:-0.015em; --em-style:italic; --radius:28px; --chart-radius:10px; --letterbox:#1f2a24;
  --code-bg:#e9eee4; --code-ink:#1f2a24; --c-kw:#2f6a4c; --c-str:#8a3f1e; --c-num:#7a4e00; --c-com:#55625a; --c-fn:#2c4f8a;
}
/* /THEME */
```
- Tinted pill chips: `.chip{border-radius:999px;background:var(--bg2);border:0}`. Images with `border-radius:var(--radius)`.
- One soft blob behind hero titles: `radial-gradient(circle at 85% 20%,rgba(242,199,174,.35),transparent 45%)`.
- Suits: health, coaching, patient education, HR wellbeing. Nearest: `clinic`, `civic`.

## 2. Craft rules distilled from the references

- [ ] **One accent.** One chromatic colour carries emphasis; everything else is neutral. A second hue is allowed only as a fill
      with a clear job (a status, a single highlight card). Many fills at once is a deliberate playful mood, not a default.
- [ ] **Tinted neutrals.** Pick warm greys for warm moods and cool for cool. Never mix the two. Avoid pure #fff and #000 on
      paper looks; they read harsh at 1920 px.
- [ ] **Tight display, loose labels.** Headlines track from -0.01em to -0.05em; tighter as they get bigger. Mono or caps labels
      track +0.05em to +0.18em. Body stays at 0.
- [ ] **Display weight is a mood choice.** 300 (calm, editorial), 400 (serif, literary), 500 (modern, precise), 600-700 (loud).
      Pick one and keep it. Hierarchy comes from size, not from extra bold.
- [ ] **Scale ratio.** References use 1.2 (minor third) for UI; slides need more jump. The engine's 164/132/84/48/36/28 is about
      1.25-1.6 per step. Use at most three sizes per slide. Nothing the room reads under 28 px.
- [ ] **Display line-height 0.9-1.1.** Never above 1.1 for headlines; body 1.4-1.5.
- [ ] **Hairlines, not boxes.** 1px rules in `--rule` separate things. Use `--rule-strong` for one structural line (table head,
      footer). Prefer tone steps (`--bg` to `--bg2`) over borders and over shadows.
- [ ] **Shadows almost never.** At most one soft shadow, on one floating object (a mock-up, a stat card). Dark themes use inset
      rim light or 1px rings instead.
- [ ] **Gradients only with a job.** On headline `<em>` (`--em-fill`), a thin divider, or a hero wash. Never on text blocks or
      buttons.
- [ ] **Radius is a personality.** 0 (industrial, Swiss), 4-8 (editorial, technical), 16-28 (friendly, product). Pills (999px)
      only for chips. One radius family per deck.
- [ ] **Tabular figures** for numbers that line up: `font-variant-numeric:tabular-nums` on stats, tables, charts.
- [ ] **Mono for metadata.** Sources, labels, versions, dates in `--f-mono`, small and quiet in `--ink2`.
- [ ] **Charts quiet.** One highlighted series in `--brand`, the rest `--muted-bar`. Few or no gridlines.
- [ ] **Spacing rhythm.** Pick one base (4 or 8; some looks use 15/22/33/66) and stick to multiples. Generous margins: the
      engine's 120px side margin is the floor, not the target.
- [ ] **Contrast is not optional.** ink, ink2 and brand-text >= 4.5:1 on bg and bg2. If the accent is light (amber, coral on
      white), use it as a fill and give `--brand-text` a darker version or the ink. `.chip.hot` puts `--on-brand` text on
      `--hot`, so a pale `--hot` fails; keep pale tints as literal fills in a signature rule.

## 3. DESIGN.md template for a user's own brand

Refero documents each style as: summary, tokens (colours, typography, spacing and shapes), components, do's and don'ts,
surfaces, elevation, imagery, layout, an agent prompt guide, and a CSS quick start. Fill this slide-sized version, then write
the THEME block from it. Keep it in the deck folder as `DESIGN.md` if the user wants to reuse it.

```markdown
# <Theme label>: style reference
**Mood:** one line (e.g. "warm paper, precise type, one teal").   **Theme id:** <kebab-name>   **Mode:** light | dark

## Colours (all hex; ratios checked)
| Role | Token | Hex | Contrast |
| canvas / panel | --bg / --bg2 | | |
| text / secondary text | --ink / --ink2 | | >= 4.5 on bg and bg2 |
| hairline / strong rule | --rule / --rule-strong | | |
| accent fill / text on it | --brand / --on-brand | | >= 4.5 |
| accent as text | --brand-text | | >= 4.5 on bg and bg2 |
| hero slides | --hero-bg --hero-ink --hero-ink2 --hero-rule --hero-brand | | >= 4.5 on hero-bg |
| chart series, highlight | --s1 --s2 --s3 --muted-bar --hot | | --on-brand >= 4.5 on --hot |

## Typography
- Display: <Google font>, weight <--w-display>, tracking <--ls-display>, line-height ~1.0
- Body: <Google font> 400/500.   Mono (labels, sources, code): <font>
- Emphasis: --em-style (italic | normal), --em-fill (optional gradient)
- Arabic display (if needed): --f-ar-d
- Fonts URL (last field of the THEME comment): https://fonts.googleapis.com/css2?family=...

## Shape and spacing
- --radius (panels) <px>, --chart-radius <px>, --rule-w <1px | 2px>, chips <px | 999px>
- Spacing base <4 | 8> px; panel padding <px>

## Surfaces and elevation
- Levels: bg -> bg2 -> (card) ; shadows: none | one token <value>

## Signature (at most two, as scoped CSS)
- 1.
- 2.

## Imagery
- Photo style, illustration or none; icon stroke width; logo placement (title and closing only)

## Do / Don't
- Do: ...
- Don't: ...

## Slide fit
- Best layouts: ...   Avoid: ...   Nearest shipped look: ...
```

Sources: style references and the DESIGN.md format from https://styles.refero.design (Refero Styles).
