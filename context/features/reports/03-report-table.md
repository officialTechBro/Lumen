# 03 — Report Table

The core of the Reports page. A structured 7-column data table with a sticky Paper-warm header row, 7 report rows, and a navigation chevron. Each row is a clickable record that drives to the report detail view.

---

## Purpose

- Present all uploaded reports as scannable data records, not content cards
- Let the user assess date, lab, marker count, flag count, and status at a glance
- Navigate to a specific report with a single click

---

## Layout

```
┌────────────────────────────────────────────────────────────────────┐
│  REPORT           DATE       LAB      MK   FLAGS  STATUS        › │  ← header
├────────────────────────────────────────────────────────────────────┤
│  Annual panel     Mar 14,'26  Quest   21    2     [Flagged]      › │
│  [Latest]  #R-2026-03                                              │
│  Follow-up lipids Sep 02,'25  Labcorp  8    1     [Flagged]      › │
│  Annual panel     Mar 11,'25  Quest   19    1     [Watch]        › │
│  Thyroid check    Oct 22,'24  Kaiser   5    0     [All clear]    › │
│  Lipid panel      Jun 04,'24  Quest    6    1     [Flagged]      › │
│  Metabolic panel  Apr 19,'24  Quest   14    0     [All clear]    › │
│  Baseline         Feb 09,'24  Quest   18    0     [Watch]        › │
│  [First]   #R-2024-02                                              │
└────────────────────────────────────────────────────────────────────┘
```

---

## Table container (`.report-table`)

```css
.report-table {
  background: var(--paper-elev);        /* #FBF8F1 */
  border: 1px solid var(--line-soft);   /* #E5DFD0 */
  border-radius: 14px;
  overflow: hidden;
}
```

`overflow: hidden` with `border-radius: 14px` clips the sticky header row and the first/last row edges cleanly.

Animation: `.fade .d3`

---

## Column grid

Both the header row and every data row use the same 7-column grid:

```css
grid-template-columns: 2.2fr 1fr 0.9fr 0.6fr 0.7fr 1.1fr 32px;
gap: 16px;
```

| Column | fr value | Content | Typography |
|---|---|---|---|
| 1 — Report | `2.2fr` | Title + badge + ID | Newsreader serif |
| 2 — Date | `1fr` | Abbreviated date | Geist Mono |
| 3 — Lab | `0.9fr` | Lab provider name | Geist Mono |
| 4 — Markers | `0.6fr` | Integer count | Newsreader serif |
| 5 — Flags | `0.7fr` | Integer count | Newsreader serif |
| 6 — Status | `1.1fr` | Status pill | Mono pill |
| 7 — Chevron | `32px` | Navigation icon | SVG |

The `2.2fr` on the report title column ensures it never truncates — the title is the most identifying field.

---

## Header row (`.table-head`)

```css
.table-head {
  display: grid;
  grid-template-columns: 2.2fr 1fr 0.9fr 0.6fr 0.7fr 1.1fr 32px;
  gap: 16px;
  padding: 12px 28px;
  background: var(--paper-warm);        /* #EFEADF */
  border-bottom: 1px solid var(--line-soft);
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-dim);
  position: sticky;
  top: 68px;                            /* height of topbar */
  z-index: 2;
}
```

**Seven column labels:**
`REPORT` · `DATE` · `LAB` · `MARKERS` · `FLAGS` · `STATUS` · *(empty — chevron column)*

### Sort indicators

Columns `REPORT`, `DATE`, `LAB`, `MARKERS`, `FLAGS` are sortable.

Each sortable header cell wraps its label and an indicator icon:
```css
.th-sortable {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  user-select: none;
}
.th-sortable:hover .sort-icon { opacity: 1; color: var(--ink-soft); }
.th-sortable.asc  .sort-icon  { opacity: 1; color: var(--forest); }
.th-sortable.desc .sort-icon  { opacity: 1; color: var(--forest); }
.sort-icon { opacity: 0; transition: opacity 0.15s; font-size: 10px; }
```

States:
- Neutral: no icon visible
- Hover: `↕` appears in Ink-dim
- Sorted ascending: `↑` in Forest
- Sorted descending: `↓` in Forest

---

## Data row (`.report-row`)

```css
.report-row {
  display: grid;
  grid-template-columns: 2.2fr 1fr 0.9fr 0.6fr 0.7fr 1.1fr 32px;
  gap: 16px;
  align-items: center;
  padding: 20px 28px;
  border-bottom: 1px solid var(--line-soft);
  cursor: pointer;
  transition: background 0.12s;
}
.report-row:last-child {
  border-bottom: none;
}
.report-row:hover {
  background: rgba(31, 80, 65, 0.025);  /* very faint forest tint */
}
```

---

## Column 1 — Report identity (`.rr-identity`)

```css
.rr-identity {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
```

### Title line (`.rr-title`)

```css
.rr-title {
  font-family: var(--serif);            /* Newsreader */
  font-size: 17px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--ink);
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.2;
}
```

**Optional inline badge** — appears after the title for rows 1 and 7:

```css
.rr-badge {
  font-family: var(--mono);
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  padding: 3px 8px;
  border-radius: 999px;
  font-weight: 500;
  white-space: nowrap;
}
.rr-badge.latest {
  background: rgba(31, 80, 65, 0.10);   /* forest tint */
  color: var(--forest);
}
.rr-badge.first {
  background: var(--paper-warm);
  color: var(--ink-dim);
}
```

| Row | Title | Badge |
|---|---|---|
| 1 | Annual panel | `Latest` (forest tint) |
| 2–6 | Various | None |
| 7 | Baseline | `First` (paper-warm tint) |

### ID line (`.rr-id`)

```css
.rr-id {
  font-family: var(--mono);
  font-size: 10.5px;
  color: var(--ink-dim);
  letter-spacing: 0.10em;
  text-transform: uppercase;
}
```

Format: `#R-YYYY-MM` — report ID derived from year and sequence.

All 7 IDs:
| Row | ID |
|---|---|
| 1 | `#R-2026-03` |
| 2 | `#R-2025-09` |
| 3 | `#R-2025-03` |
| 4 | `#R-2024-10` |
| 5 | `#R-2024-06` |
| 6 | `#R-2024-04` |
| 7 | `#R-2024-02` |

---

## Column 2 — Date (`.rr-date`)

```css
.rr-date {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--ink-dim);
  letter-spacing: 0.08em;
}
```

**Format:** `Mar 14, '26` — abbreviated 3-letter month, day, 2-digit year with apostrophe prefix.

All 7 dates: `Mar 14, '26` · `Sep 02, '25` · `Mar 11, '25` · `Oct 22, '24` · `Jun 04, '24` · `Apr 19, '24` · `Feb 09, '24`

---

## Column 3 — Lab (`.rr-lab`)

```css
.rr-lab {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--ink-soft);
  letter-spacing: 0.06em;
}
```

All 7 values: `Quest` · `Labcorp` · `Quest` · `Kaiser` · `Quest` · `Quest` · `Quest`

---

## Column 4 — Marker count (`.rr-markers`)

```css
.rr-markers {
  font-family: var(--serif);            /* Newsreader */
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--ink);
}
```

All 7 counts: `21` · `8` · `19` · `5` · `6` · `14` · `18`

The large serif numeral gives this column visual weight — it's a meaningful data point, not metadata.

---

## Column 5 — Flag count (`.rr-flags`)

```css
.rr-flags {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.01em;
}
/* Coral if flags > 0 */
.rr-flags.has-flags  { color: var(--coral); }        /* #C8563A */
/* Faint if flags = 0 */
.rr-flags.no-flags   { color: var(--ink-faint); }    /* #A8ADA6 */
```

All 7 counts: `2` (coral) · `1` (coral) · `1` (coral) · `0` (faint) · `1` (coral) · `0` (faint) · `0` (faint)

**Why Coral on the number, not just the pill?**
A Coral numeral is faster to read than a pill. At a glance, any non-faint number in the flags column signals "check this row." The status pill in column 6 is the secondary confirmation, not the primary signal.

---

## Column 6 — Status pill (`.rr-status`)

See shared `.pill` spec in `00-index.md`.

| Row | Flags | Watch | Pill variant | Text |
|---|---|---|---|---|
| 1 | 2 | 1 | `.pill.flag` | `Flagged` |
| 2 | 1 | 1 | `.pill.flag` | `Flagged` |
| 3 | 1 | 2 | `.pill.flag` | `Flagged` |
| 4 | 0 | 0 | `.pill.ok` | `All clear` |
| 5 | 1 | 0 | `.pill.flag` | `Flagged` |
| 6 | 0 | 0 | `.pill.ok` | `All clear` |
| 7 | 0 | 1 | `.pill.watch` | `Watch` |

**Pill status logic:**
- Any `flags > 0` → `.pill.flag` (Coral-soft bg, Coral text)
- `flags = 0` and `watch > 0` → `.pill.watch` (grey tint, Ink-soft)
- `flags = 0` and `watch = 0` → `.pill.ok` (Leaf-soft bg, Leaf text)

---

## Column 7 — Chevron (`.rr-chev`)

```css
.rr-chev {
  color: var(--ink-faint);
  transition: transform 0.15s, color 0.15s;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.report-row:hover .rr-chev {
  transform: translateX(2px);
  color: var(--forest);
}
```

**SVG:** right-pointing angle `›` — 14×14 viewBox, path `M5 3 L11 8 L5 13`, strokeWidth 1.5, stroke `currentColor`, fill none, round caps/joins.

The chevron slides **2px right** on hover (not rotates). Horizontal movement signals navigation; rotation signals expansion. Different motion = different action.

---

## All 7 rows — complete data

| # | Title | Badge | ID | Date | Lab | MK | FL | Watch | Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Annual panel | Latest | #R-2026-03 | Mar 14, '26 | Quest | 21 | 2 | 1 | Flagged |
| 2 | Follow-up lipids | — | #R-2025-09 | Sep 02, '25 | Labcorp | 8 | 1 | 1 | Flagged |
| 3 | Annual panel | — | #R-2025-03 | Mar 11, '25 | Quest | 19 | 1 | 2 | Flagged |
| 4 | Thyroid check | — | #R-2024-10 | Oct 22, '24 | Kaiser | 5 | 0 | 0 | All clear |
| 5 | Lipid panel | — | #R-2024-06 | Jun 04, '24 | Quest | 6 | 1 | 0 | Flagged |
| 6 | Metabolic panel | — | #R-2024-04 | Apr 19, '24 | Quest | 14 | 0 | 0 | All clear |
| 7 | Baseline | First | #R-2024-02 | Feb 09, '24 | Quest | 18 | 0 | 1 | Watch |

---

## Interaction

- **Click row:** navigate to report detail view
- **Hover row 600ms:** triggers preview panel (see `04-preview-panel.md`)
- **Click sortable header:** sort table by that column; click again to reverse
- **Active sort:** header cell shows `↑` or `↓` in Forest; column values sort accordingly

---

## Why this table works

- **Table not cards.** Reports are medical records, not content items. A table communicates archive — authoritative, scannable, clinical. Cards would make it feel like a social feed.
- **Serif for names, mono for metadata.** Report title in Newsreader gives it identity. Dates, IDs, lab names in Geist Mono treat them as data. The typographic split is semantic, not decorative.
- **Two serif columns (Markers + Flags).** Both are meaningful numbers. Both get large Newsreader 500 treatment. The visual weight signals their importance over the metadata columns.
- **"Latest" and "First" badges on rows 1 and 7.** These are the only two special-identity rows — the newest and oldest record. No badge on anything in between avoids visual clutter while still anchoring the timeline.
- **"All clear" in Leaf-soft, not grey.** A clean report is good news. Leaf green acknowledges that. Grey is neutral — Leaf is positive. The product should feel like it notices when things are fine.

## References

- @context/lumen-project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md
- @context/lumen-branding.md
- @context/reports/00-index.md
- @context/reports/01-page-header.md
- @context/reports/02-filter-bar.md
- @context/screenshots/reports-ui-1.png
- @context/screenshots/reports-ui-2.png
- @lib/mock-data.ts