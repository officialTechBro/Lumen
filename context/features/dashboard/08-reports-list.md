# 08 — Reports List Card

A table-style list of the user's recent lab reports. Six rows, each showing report title, lab provider, date, marker count, status pills, and a hover chevron. The first row (latest report) is the primary click target.

---

## Purpose

- **Give the user a scannable history** of everything they've uploaded to Lumen
- **Surface status at a glance** — flag/watch/clear pills on every row
- **Drive to report detail** — every row is clickable, opening the full translated report

---

## Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│  Recent reports  7 total                              Archive →      │
├──────────────────────────────────────────────────────────────────────┤
│  REPORT           LAB        DATE         MK    STATUS              │
├──────────────────────────────────────────────────────────────────────┤
│  Annual panel     Quest      Mar 14, 2026  21   [2 flag] [1 watch] ›│
│  [Latest]                                                             │
│  Follow-up        Labcorp    Sep 02, 2025   8   [1 flag] [1 watch] ›│
│  Annual panel     Quest      Mar 11, 2025  19   [1 flag] [2 watch] ›│
│  Thyroid check    Kaiser     Oct 22, 2024   5   [All clear]        ›│
│  Lipid panel      Quest      Jun 04, 2024   6   [1 flag]           ›│
│  Baseline         Quest      Feb 09, 2024  18   [1 watch]          ›│
│  [First]                                                              │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Card container

Standard `.card`:
- Background: `var(--paper-elev)` `#FBF8F1`
- Border: 1px `var(--line-soft)`
- Border-radius: 14px
- `overflow: hidden`
- Animation: `.fade .d5`

### Card header (`.card-head`)
Left: **"Recent reports"** + count **"7 total"** in `.count` mono
Right: **"Archive →"** link in Forest mono

---

## Column header row (`.reports-head`)

```css
.reports-head {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 0.7fr 1.3fr 28px;
  gap: 20px;
  padding: 12px 26px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  color: var(--ink-dim);
  text-transform: uppercase;
  border-top: 1px solid var(--line-soft);
  border-bottom: 1px solid var(--line-soft);
  background: var(--paper-warm);
}
```

Six column headers (matching data row columns):
`Report` · `Lab` · `Date` · `Markers` · `Status` · (empty — chevron column)

Paper-warm background tints the header row to visually distinguish it from data rows — same tinting pattern as the report card's summary band.

---

## Report row (`.report-row`)

```css
.report-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 0.7fr 1.3fr 28px;
  gap: 20px;
  align-items: center;
  padding: 18px 26px;
  border-bottom: 1px solid var(--line-soft);
  cursor: pointer;
  transition: background 0.12s;
}
.report-row:last-child { border-bottom: none; }
.report-row:hover { background: rgba(31, 80, 65, 0.03); }
```

Same 6-column grid as the header. The last row has no bottom border.

### Column 1 — Report identity
Two lines:
- `.rr-title` — Newsreader 500, 17px, tracking -0.01em: report title + optional badge
- `.rr-sub` — Geist Mono 11.5px, Ink-dim, tracking 0.12em: `#R-2026-03` — the report ID in uppercase

Badge pill (`.pill.new`) appears inline after the title on rows 1 and 6:
- Row 1 (latest): badge text **"Latest"**
- Row 6 (first ever): badge text **"First"**

### Column 2 — Lab
`.rr-sub` mono style: `Quest` / `Labcorp` / `Kaiser`

### Column 3 — Date
`.rr-sub` mono style: `Mar 14, 2026` etc.

### Column 4 — Markers (`.rr-markers`)
Newsreader 500, 19px, tracking -0.01em: the integer count of markers in that report.

### Column 5 — Status (`.rr-status`)
```css
.rr-status { display: flex; gap: 6px; flex-wrap: wrap; }
```
Shows 1–2 pills depending on the report's content:
- If `flagged > 0`: `.pill.flag` with text `{N} flag`
- If `watch > 0`: `.pill.watch` with text `{N} watch`
- If both 0: `.pill.ok` with text `All clear`

### Column 6 — Chevron (`.rr-chev`)
```css
.rr-chev { color: var(--ink-faint); transition: transform 0.15s; }
.report-row:hover .rr-chev {
  transform: translateX(2px);
  color: var(--forest);
}
```
`<Ico.chevron/>` — 14×14 SVG right-pointing angle.
On hover: moves 2px right and colors Forest. The horizontal nudge (not rotation) gives a "click to go" affordance.

---

## The 6 report rows — data

| # | Title | Lab | Date | Markers | Flagged | Watch | Badge |
|---|---|---|---|---|---|---|---|
| 1 | Annual panel | Quest | Mar 14, 2026 | 21 | 2 | 1 | Latest |
| 2 | Follow-up | Labcorp | Sep 02, 2025 | 8 | 1 | 1 | — |
| 3 | Annual panel | Quest | Mar 11, 2025 | 19 | 1 | 2 | — |
| 4 | Thyroid check | Kaiser | Oct 22, 2024 | 5 | 0 | 0 | — |
| 5 | Lipid panel | Quest | Jun 04, 2024 | 6 | 1 | 0 | — |
| 6 | Baseline | Quest | Feb 09, 2024 | 18 | 0 | 1 | First |

---

## Click behavior

Only the first row (latest report) has an `onClick` handler in the current implementation:
```jsx
onClick={() => i===0 && onOpen && onOpen()}
```
All rows have `cursor: pointer` — in a full build, every row would navigate to that report's detail view.

---

## Why this card works

- **Two different column types for identity.** The report title uses serif (Newsreader) — it's the name of a thing. The lab, date, and ID use mono — they're metadata, not prose. The typographic switch is doing semantic work.
- **Horizontal chevron nudge instead of rotation.** In the flagged markers card, chevrons rotate 90° to indicate expansion. Here, they slide 2px right to indicate navigation. The different motion communicates the different action.
- **"First" and "Latest" badges.** These are the only two reports with special identity. Flagging the first upload acknowledges the user's history with the product; flagging the latest makes it scannable at the top.
- **`flex-wrap` on status pills.** A report with 2 flags and 3 watches would overflow a fixed width. `flex-wrap` lets the pills stack naturally at any column width.
- **`.rr-sub` mono class reused for lab, date, and ID.** All three are metadata fields — using the same class means they get identical treatment. Consistent, not just similar.
