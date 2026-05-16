# 01 — Report Header Card

The identity and summary card at the very top of the report detail page. Establishes what report this is, where it came from, and the key stats — before the user reads a single translated marker.

---

## Purpose

- Anchor the user in the specific report they opened (name, lab, date)
- Show the big-picture stats at a glance (21 markers, 2 flagged, 11 sec)
- Provide navigation back and surface the three top-level actions (Share, Download, More)

---

## Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│  ← Back to reports              [Share] [Download PDF] [⋯ More]       │  ← nav strip
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  [Latest report] [2 flagged] [1 watch]                                 │  ← badges
│                                                                        │
│  Annual panel,          │  Markers  In range  Flagged  Read time      │
│  explained.             │    21        18        2       11 sec       │
│                         │                                              │
│  Quest Diagnostics      │  ──────────────────────────────────────────  │
│  March 14, 2026         │  Collected Mar 14 · Uploaded Mar 15         │
│  Patient ID 7A21K       │                                              │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Card container (`.report-header-card`)

```css
.report-header-card {
  background: var(--paper-elev);
  border: 1px solid var(--line-soft);
  border-radius: 16px;
  overflow: hidden;
}
```

16px radius (hero-level card — slightly larger than standard 14px).
Animation: `.fade .d1`

---

## Zone A — Nav strip (`.rh-nav`)

```css
.rh-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  background: var(--paper-warm);
  border-bottom: 1px solid var(--line-soft);
}
```

### Back link (`.rh-back`)

```css
.rh-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--forest);
  cursor: pointer;
  transition: opacity 0.15s;
  text-decoration: none;
}
.rh-back:hover { opacity: 0.75; }
```

Content: `← Back to reports`
Arrow: `←` character (U+2190), 12px, same color.

### Action buttons (`.rh-actions`)

```css
.rh-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

Three buttons:

**Share** — `.btn-secondary` small variant (9px 14px padding)
- Icon: share-nodes SVG — 14×14, two outer circles connected to a center circle with two lines
- Label: `Share`

**Download PDF** — `.btn-secondary` small
- Icon: download arrow SVG — 14×14, downward arrow + tray line at bottom
- Label: `Download PDF`

**More (`.rh-more`)** — icon-only button
```css
width: 32px; height: 32px;
border-radius: 8px;
background: var(--paper-elev);
border: 1px solid var(--line-soft);
display: flex; align-items: center; justify-content: center;
cursor: pointer;
transition: all 0.15s;
color: var(--ink-dim);
:hover { border-color: var(--line); color: var(--ink); }
```
Icon: `⋯` (three horizontal dots) or an ellipsis SVG, 14×14.

**More dropdown** (`.rh-dropdown`)
```css
position: absolute; top: calc(100% + 6px); right: 0;
background: var(--paper-elev);
border: 1px solid var(--line-soft);
border-radius: 8px;
padding: 6px;
min-width: 160px;
box-shadow: 0 8px 24px -8px rgba(26,38,32,.15);
z-index: 10;
```

Three options:
- `Re-run AI` — Geist 14px, Ink-soft, hover: Paper-warm bg
- `Report an error` — Geist 14px, Ink-soft
- `Delete report` — Geist 14px, Coral `#C8563A`, hover: Coral-soft bg

Each option: 9px 12px padding, 6px radius, cursor pointer.

---

## Zone B — Report body (`.rh-body`)

```css
.rh-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  padding: 28px 28px 24px;
  align-items: end;
}
```

Left column and right column with no gap — the right column's left border creates the visual divider.

### Left — Identity (`.rh-identity`)

**Badge row (`.rh-badges`)**
```css
display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap;
```

Three pills in order:
1. `.pill.new` — `Latest report`
2. `.pill.flag` — `2 flagged`
3. `.pill.watch` — `1 watch`

**Headline (H1)**
```css
h1 {
  font-family: var(--serif);
  font-size: 44px;
  line-height: 1;
  letter-spacing: -0.03em;
  font-weight: 400;
  margin: 0;
}
h1 .italic {
  font-style: italic;
  font-weight: 300;
  color: var(--forest);
  font-size: 0.95em;
}
```

Structure — two lines:
- Line 1: `Annual panel,` — regular roman
- Line 2: `explained.` — `.italic` (Newsreader italic 300, Forest)

The 0.95em size reduction on the italic balances the optical weight of italic Newsreader against the roman on line 1.

**Sub block (`.rh-sub`)**
```css
.rh-sub {
  font-family: var(--sans);
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin-top: 14px;
}
```

Three lines:
- `Quest Diagnostics`
- `March 14, 2026`
- `Patient ID 7A21K` — Geist Mono 11px, Ink-dim, uppercase, tracking 0.1em

### Right — Stats (`.rh-stats`)

```css
.rh-stats {
  border-left: 1px solid var(--line-soft);
  padding-left: 28px;
  display: flex;
  flex-direction: column;
  gap: 0;
}
```

**Stats grid (`.rh-stats-grid`)**
```css
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 0;
margin-bottom: 0;
```

Four cells. Each cell (`rh-stat`):
```css
.rh-stat {
  padding: 0 16px 20px;
  border-right: 1px solid var(--line-soft);
}
.rh-stat:first-child { padding-left: 0; }
.rh-stat:last-child  { border-right: none; }
```

Inner structure:
- Label (`.rs-label`): Geist Mono 10px, Ink-dim, uppercase, tracking 0.12em, margin-bottom 8px
- Value (`.rs-val`): Newsreader 500, 32px, tracking -0.025em, line-height 1

| Label | Value | Color |
|---|---|---|
| `Markers` | `21` | Ink |
| `In range` | `18` | Leaf `#5A7A3F` |
| `Flagged` | `2` | Coral `#C8563A` |
| `Read time` | `11 sec` | Ink |

For "11 sec": the number `11` in Newsreader 500, 32px + `sec` in Geist Mono 12px, Ink-dim, 4px left margin, `vertical-align: middle`.

**Footer strip (`.rh-footer`)**
```css
.rh-footer {
  border-top: 1px solid var(--line-soft);
  padding-top: 14px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-dim);
  padding-left: 0;
}
```

Content: `COLLECTED MAR 14, 2026 · UPLOADED MAR 15, 2026 · PROCESSED IN 11.4 SEC`

Separators: ` · ` (middle dot U+00B7 with spaces).

---

## Responsive

| Viewport | Behavior |
|---|---|
| ≥ 960px | Two-column grid (identity left, stats right) |
| < 960px | Single column — badges + H1 + sub first, stats grid below, 4-column stats wraps to 2×2 |
| < 560px | H1 drops to `clamp(36px, 6vw, 44px)`; stats drop to 2-column grid |

---

## Copy reference

```
NAV
  BACK         ← Back to reports
  BTN 1        Share
  BTN 2        Download PDF
  BTN 3        ⋯ (icon) — dropdown: Re-run AI · Report an error · Delete report

BADGES         Latest report  ·  2 flagged  ·  1 watch

H1             Annual panel,
               explained.           ← italic forest

SUB            Quest Diagnostics
               March 14, 2026
               PATIENT ID 7A21K

STATS          Markers 21  ·  In range 18 (leaf)  ·  Flagged 2 (coral)  ·  Read time 11 sec

FOOTER         COLLECTED MAR 14, 2026 · UPLOADED MAR 15, 2026 ·
               PROCESSED IN 11.4 SEC
```

---

## Why this header works

- **`explained.` in italic Forest.** The same signature move from the marketing site, the home dashboard hero card, and the reports list headline. A user who has read these other screens recognizes the brand's thesis being restated in a new context: "this specific report, explained."
- **Stats on the right, identity on the left.** The user's first question is "what report is this?" — answered by the left column. Their second question is "how bad is it?" — answered immediately by the stats without scrolling. Both questions answered in one card.
- **Paper-warm nav strip.** The nav strip has a slightly warmer background than the body of the card. This creates a top-to-bottom lightening: nav (warmest) → body (cool white). The gradient isn't literal — it's achieved through tint choices — but it gives the card a sense of depth.
- **Actions in the nav strip, not the page header.** Report actions (Share, Download, Delete) live in the card's own nav strip rather than in the topbar. This scopes the actions to the report — they feel like they belong to this document, not to the app shell.


##  References
- @context/lumen-project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md
- @context/lumen-branding.md
- @context/report/00-index.md
- @lib/mock-data.ts
- @context/screenshots/report-page-ui-1.png
- @context/screenshots/report-page-ui-2.png
- @context/screenshots/report-page-ui-3.png
- @context/screenshots/report-page-ui-4.png
- @context/screenshots/report-page-ui-5.png
- @context/screenshots/report-page-ui-6.png
- @context/screenshots/report-page-ui-7.png
