# 07 — Trends Grid Card

A 3-column grid of six biomarker trend cells. Each cell shows the marker name, status pill, a sparkline chart, current value, unit, and reference range. This is the "Pro feature" — it only has meaning if the user has uploaded multiple reports.

---

## Purpose

- **Show change over time** — the single most valuable insight Lumen can provide beyond a single report read
- **Scan 6 markers at once** — the grid density lets the user assess their full tracked panel at a glance
- **Signal what needs attention vs what's stable** — status pills and sparkline colors do the work

---

## Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│  Trends  Last 6 reports · 2 yrs                       View all →    │
├──────────────────────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐         │
│  │ Vitamin D  Flag│  │ LDL       Flag │  │ HbA1c       OK │         │
│  │ [sparkline↓]   │  │ [sparkline↑]   │  │ [sparkline→]   │         │
│  │ 24  ng/mL      │  │ 142  mg/dL     │  │ 5.4  %         │         │
│  │          Ref30-│  │        Ref<100 │  │       Ref 0–5.7│         │
│  ├────────────────┤  ├────────────────┤  ├────────────────┤         │
│  │ TSH         OK │  │ HDL         OK │  │ Ferritin  Watch│         │
│  │ [sparkline→]   │  │ [sparkline→]   │  │ [sparkline↓]   │         │
│  │ 2.1  μIU/mL    │  │ 58   mg/dL     │  │ 38   ng/mL     │         │
│  │      Ref0.4–4.0│  │        Ref40–  │  │        Ref30–300│        │
│  └────────────────┘  └────────────────┘  └────────────────┘         │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Card container

Standard `.card`:
- Background: `var(--paper-elev)` `#FBF8F1`
- Border: 1px `var(--line-soft)`
- Border-radius: 14px
- `overflow: hidden`
- Animation: `.fade .d4`

### Card header (`.card-head`)
```css
.card-head {
  padding: 22px 26px 16px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
```
Left: **"Trends"** + count: **"Last 6 reports · 2 yrs"** in `.count` mono style
Right: **"View all →"** link in Forest mono

---

## Trends grid (`.trends-grid`)

```css
.trends-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--line-soft);
}
```

No explicit gap — spacing is handled by internal padding + borders between cells.

---

## Trend cell (`.trend-cell`)

```css
.trend-cell {
  padding: 22px 24px;
  border-right: 1px solid var(--line-soft);
  border-bottom: 1px solid var(--line-soft);
}
/* Remove right border on every 3rd cell */
.trend-cell:nth-child(3n) { border-right: none; }
/* Remove bottom border on last row */
.trend-cell:nth-last-child(-n+3) { border-bottom: none; }
```

The `nth-child` rules create a clean grid of internal dividers without any outer gap or extra CSS class.

### Cell anatomy (4 parts)

#### 1. Top row (`.tc-top`)
```css
.tc-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
```
- Left: `.tc-name` — Newsreader 500, 17px, tracking -0.01em — the marker name
- Right: Status pill (`.pill.ok` / `.pill.flag` / `.pill.watch`)

#### 2. Sparkline (`.tc-spark`)
```css
.tc-spark { margin: 6px -4px 12px; }
```
Negative horizontal margin (`-4px`) lets the sparkline bleed slightly past the cell padding — makes it feel full-width without changing the padding elsewhere.

`<Sparkline>` props: `values={t.values} status={t.status} refLow={t.refLow} refHigh={t.refHigh} width={260} height={52}`

The sparkline here is larger than in the flagged markers card: 260×52px vs 110×30px. The extra height lets the reference range band be visible.

#### 3. Bottom row (`.tc-bot`)
```css
.tc-bot {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
```

Left — current value:
- `.tc-v` — Newsreader 500, 26px, tracking -0.02em: the number
- `.tc-u` — Geist Mono 11px, Ink-dim, 4px left margin: the unit

Right — reference:
- Geist Mono 500, Ink-dim: `Ref 30–100` / `Ref < 100` / etc.

---

## The 6 trend cells — data

| # | Name | Unit | Values | Ref Low | Ref High | Current | Status |
|---|---|---|---|---|---|---|---|
| 1 | Vitamin D | ng/mL | 34, 32, 28, 29, 26, 24 | 30 | 100 | 24 | flag |
| 2 | LDL | mg/dL | 118, 124, 131, 135, 138, 142 | 0 | 100 | 142 | flag |
| 3 | HbA1c | % | 5.2, 5.3, 5.3, 5.4, 5.3, 5.4 | 0 | 5.7 | 5.4 | ok |
| 4 | TSH | μIU/mL | 2.4, 2.3, 2.0, 2.2, 2.1, 2.1 | 0.4 | 4.0 | 2.1 | ok |
| 5 | HDL | mg/dL | 54, 56, 58, 57, 59, 58 | 40 | 100 | 58 | ok |
| 6 | Ferritin | ng/mL | 72, 64, 58, 49, 44, 38 | 30 | 300 | 38 | watch |

Cell order (reading order, left-to-right, top-to-bottom):
Row 1: Vitamin D (flag) → LDL (flag) → HbA1c (ok)
Row 2: TSH (ok) → HDL (ok) → Ferritin (watch)

The two flagged markers lead the grid — most urgent first.

---

## Reference range display note

When `refHigh > 500` (like Ferritin where ref is 30–300 but could be higher), the display uses a dash: `Ref 30–—`. The sparkline's reference band is only drawn if `refHigh < 500` (a guard in the Sparkline component to prevent drawing a flat line for wide-ranging tests).

---

## Why this card works

- **Grid with internal borders, not gaps.** A grid with `gap: 24px` looks like a component list. A grid with internal borders and no outer padding looks like a medical data table — which is what it is. The inset border approach reinforces the "clinical record" aesthetic.
- **3 columns not 2 or 4.** Three columns fit 6 items in 2 rows — the ideal density. Two rows means both rows are visible without scrolling at standard viewport heights. Four columns would make each cell too narrow for the value + unit pair.
- **The sparkline takes up most of the cell height.** The chart isn't decorative — it's the headline. The current value is below it, reinforcing the story the chart already told. You see the direction before you read the number.
- **Negative margin on `.tc-spark`.** A 4px bleed on each side of the cell makes the sparkline feel flush with the cell's natural width, not padded inside it. Small detail, significant visual difference.
- **Flag markers listed first.** The grid order is not alphabetical or physiological — it's priority order. The user's attention should go to Vitamin D and LDL first. OK markers follow.


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
- @context/dashboard/05-hero-report.md
- @context/dashboard/06-flagged-markers.md
- @context/screenshots/dashboard-ui-1.png
- @context/screenshots/dashboard-ui-2.png
- @context/screenshots/dashboard-ui-3.png