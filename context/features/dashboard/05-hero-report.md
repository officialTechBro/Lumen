# 05 — Hero Report Card

The first and largest card on the dashboard home. A two-column layout: left side has the report identity, plain-English summary, CTAs, and three metadata stats; right side has a donut chart showing the marker breakdown (normal / watch / flagged).

---

## Purpose

- **Surface the most recent report immediately** — no hunting, no clicks needed
- **Translate the report in one sentence** — so the user gets the gist before opening the full view
- **Show the donut summary** — a visual that communicates 18/1/2 at a glance
- **Drive to action** — "Open full report" and "Draft my questions" are the two things the user should do next

---

## Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌──────────────────────────────────┬──────────────────────────┐    │
│  │  [Latest report] [2 flagged] [1 watch]                      │    │
│  │                                  │  Summary · Mar 14  21 mk │    │
│  │  Annual panel,                   │                          │    │
│  │  explained.                      │       ┌────────┐         │    │
│  │                                  │       │ donut  │         │    │
│  │  Quest · March 14 · 21 markers   │       │  18    │         │    │
│  │  read in 11 seconds. Two need    │       │ NORMAL │         │    │
│  │  a conversation...               │       └────────┘         │    │
│  │                                  │                          │    │
│  │  [Open full report →] [Draft Qs] │  ● 18 normal             │    │
│  │                                  │  ● 1 watch               │    │
│  │  Tracked since  Total  Reminder  │  ● 2 flagged             │    │
│  │  Feb 2024       7      Jun 14    │                          │    │
│  └──────────────────────────────────┴──────────────────────────┘    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Container (`.hero-report`)

```css
.hero-report {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 0;
  background: var(--paper-elev);
  border: 1px solid var(--line-soft);
  border-radius: 16px;
  overflow: hidden;
}
```

- Two columns, no gap — the internal `border-right` on the left column creates the visual divider
- `overflow: hidden` with `border-radius: 16px` clips internal corners cleanly
- 16px radius (slightly larger than standard 14px cards — this is the hero element)
- Animation: `.fade .d2`

---

## Left column (`.hr-left`)

```css
.hr-left {
  padding: 36px 40px 36px;
  border-right: 1px solid var(--line-soft);
}
```

### Badge row (`.badges`)
```css
.badges {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
```
Three status pills in order:
1. `.pill.new` — `Latest report` (Forest-tint bg, Forest text)
2. `.pill.flag` — `2 flagged` (Coral-soft bg, Coral text)
3. `.pill.watch` — `1 watch` (grey tint bg, Ink-soft text)

### Headline (`.hr-title`)
```css
.hr-title {
  font-size: 44px;
  line-height: 1.02;
  letter-spacing: -0.03em;
  font-weight: 400;
  font-family: var(--serif);
}
```
Content: `Annual panel, [explained.]`
- Report title from `latestReport.title`
- `explained.` in `.italic` (Newsreader 300 italic, Forest)
- Two-line display: "Annual panel," on line 1, "explained." on line 2

### Subheading (`.hr-sub`)
```css
.hr-sub {
  color: var(--ink-soft);
  font-size: 16px;
  line-height: 1.55;
  margin-top: 16px;
  max-width: 480px;
}
```
Content: `Quest Diagnostics · March 14, 2026 · 21 markers read in 11 seconds. Two need a conversation with your doctor, one worth watching.`
- Lab, date, marker count — then a plain-English summary sentence
- The summary sentence is the product doing its job inline

### CTA row (`.hr-ctas`)
```css
.hr-ctas {
  display: flex;
  gap: 10px;
  margin-top: 28px;
  flex-wrap: wrap;
}
```
**Primary:** "Open full report →" — `.btn .btn-primary` with `<Ico.arrowRight/>`
**Secondary:** "Draft my questions" — `.btn .btn-secondary`

### Meta strip (`.hr-meta`)
```css
.hr-meta {
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 40px;
  margin-top: 40px;
  padding-top: 28px;
  border-top: 1px solid var(--line-soft);
}
```
Three data points:

| Label | Value | Source |
|---|---|---|
| `Tracked since` | `Feb 2024` | `summary.trackedSince` |
| `Total reports` | `7` | `summary.totalReports` |
| `Next reminder` | `Vitamin D retest — June 14` | `summary.nextReminder` |

Each item structure:
- Label: Geist Mono 500, color Ink-dim, margin-bottom 4px
- Value (`.v`): Newsreader 500, 22px, tracking -0.015em

The "Next reminder" value uses `font-size: 15px; letter-spacing: 0` override — it's a longer string, so it downsizes gracefully.

---

## Right column (`.hr-right`)

```css
.hr-right {
  padding: 36px;
  background: var(--paper-warm);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

Background: `var(--paper-warm)` `#EFEADF` — the warmer tint distinguishes the summary panel from the copy panel.

Contains a single `.hr-summary` block, max-width 280px:

### Summary header (`.hr-sum-head`)
```css
.hr-sum-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
```
Left: `Summary · Mar 14` — Mono, Ink-dim
Right: `21 markers` — Mono, Ink-dim

### Donut chart (`.hr-donut`)
A 120×120 SVG donut chart. Three concentric arc segments on a base circle:

```
Base ring:   stroke #E5DFD0 (Line-soft), strokeWidth 14
Normal arc:  stroke #D7E0C6 (Leaf-soft), (18/21) × 314 dasharray, starts at -90°
Watch arc:   stroke #6B756F (Ink-dim), 30% opacity, (1/21) × 314
Flag arc:    stroke #C8563A (Coral), (2/21) × 314
```

Center text (two elements):
- `18` — Newsreader, 26px, weight 500, fill Ink
- `NORMAL` — Geist Mono, 8px, letter-spacing 1.5, fill Ink-dim

Calculation: arc circumference = 2π×50 ≈ 314px

Each arc uses `strokeDashoffset` to chain them sequentially:
- Normal: offset 0 (starts at top)
- Watch: offset = `-(18/21) × 314`
- Flag: offset = `-(19/21) × 314`
All arcs use `transform="rotate(-90 60 60)"` to start at 12 o'clock.

### Legend (`.hr-legend`)
```css
.hr-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  color: var(--ink-soft);
  padding-top: 16px;
  border-top: 1px solid var(--line-soft);
}
```
Three rows, each `display:flex; align-items:center; gap:10px`:

| Dot color | Label |
|---|---|
| `#D7E0C6` (Leaf-soft) | 18 normal |
| `rgba(107,117,111,.5)` | 1 watch |
| `#C8563A` (Coral) | 2 flagged |

Dots: 10×10px, `border-radius: 999px`

---

## Data bindings

| Element | Source |
|---|---|
| Report title | `latestReport.title` → "Annual panel" |
| Lab | `latestReport.lab` → "Quest Diagnostics" |
| Date | `latestReport.date` → "March 14, 2026" |
| Marker count | `latestReport.markers` → 21 |
| Normal count | `latestReport.normal` → 18 |
| Watch count | `latestReport.watch` → 1 |
| Flagged count | `latestReport.flagged` → 2 |
| Tracked since | `summary.trackedSince` → "Feb 2024" |
| Total reports | `summary.totalReports` → 7 |
| Next reminder | `summary.nextReminder` |

---

## Why this card works

- **Two-column layout divides job and proof.** The left side says what the report means in words; the right side shows it in a data viz. A user who skips reading gets the answer from the donut. A user who skips the chart gets it from the sub-heading.
- **`explained.` in italic Forest** — the signature move applied to the report title makes the brand's thesis visible even inside the app. Not just on the marketing page.
- **Donut shows proportions, not drama.** 18/21 in Leaf-soft is 86% of the circle. The user sees immediately that most things are fine. The Coral slice is small. The visual leads with calm, not alarm.
- **Meta strip uses `grid-template-columns: repeat(3, auto)`.** Auto-sized columns mean the grid adjusts to the longest value without needing fixed pixel widths. The "Next reminder" string is long — auto handles it.
- **Paper-warm on the right column** creates a subtle differentiation between "interpretation" (white left) and "data" (warm right) — even though they're in the same card.


## Reference
- @context/lumen-project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md
- @context/lumen-branding.md
- @context/dashboard/00-index.md
- @context/dashboard/01-shell-layout.md
- @context/dashboard/02-sidebar.md
- @context/dashboard/03-topbar.md
- @context/dashboard/04-page-header.md
- @context/screenshots/dashboard-ui-1.png
- @context/screenshots/dashboard-ui-2.png
- @context/screenshots/dashboard-ui-3.png