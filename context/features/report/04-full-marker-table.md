# 04 — Full Marker Table

A flat, compact summary table below all the group sections — every one of the 21 markers in a single scannable view with value, reference range, delta from last report, and status. A secondary lens for power users who want to cross-reference or export the raw data.

---

## Purpose

- Give the user a single view of all 21 markers without category separation
- Surface the trend delta — the one piece of information not shown in the grouped view
- Provide export access (CSV) for users who track their own data

---

## Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│  ALL MARKERS  21 total            [Flagged only]  [Export CSV ↓]     │
├──────────────────────────────────────────────────────────────────────┤
│  MARKER              VALUE       REFERENCE    DELTA        STATUS    │
├──────────────────────────────────────────────────────────────────────┤
│  Vitamin D           24 ng/mL    30–100       ↓ −10       [Flagged] │
│  LDL Cholesterol     142 mg/dL   < 100        ↑ +24       [Flagged] │
│  Ferritin            38 ng/mL    30–300       ↓ −34       [Watch]   │
│  Total Cholesterol   210 mg/dL   < 200        ↑ +18       [Watch]   │
│  HbA1c               5.4 %       < 5.7        → stable    [Normal]  │
│  ...                                                                 │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Card container (`.full-table`)

```css
.full-table {
  background: var(--paper-elev);
  border: 1px solid var(--line-soft);
  border-radius: 14px;
  overflow: hidden;
}
```

---

## Toolbar (`.ft-toolbar`)

```css
.ft-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  background: var(--paper-warm);
  border-bottom: 1px solid var(--line-soft);
}
```

### Left — title

```css
.ft-title {
  display: flex;
  align-items: baseline;
  gap: 10px;
}
.ft-name {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--ink);
}
.ft-count {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--ink-dim);
  letter-spacing: 0.1em;
}
```

Content: `ALL MARKERS` + `21 total`

When "Flagged only" filter is active: count updates to `4 shown · 21 total`.

### Right — controls

```css
.ft-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

**Flagged only toggle (`.ft-filter`)**
```css
.ft-filter {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--paper-elev);
  color: var(--ink-dim);
  cursor: pointer;
  transition: all 0.15s;
}
.ft-filter:hover {
  border-color: var(--ink-dim);
  color: var(--ink);
}
.ft-filter.active {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
}
```

Content: `Flagged only`

When active: shows only the 4 rows with Flag or Watch status. All other rows animate out (`opacity 0, max-height 0`).

**Export CSV button (`.ft-export`)**
```css
/* .btn-secondary small variant */
padding: 6px 12px;
font-family: var(--mono);
font-size: 10px;
letter-spacing: 0.12em;
text-transform: uppercase;
```

Content: `Export CSV ↓`
Arrow: `↓` (U+2193)

On click: triggers CSV download of all 21 markers with columns: Marker, Code, Value, Unit, Reference, Delta, Status, Category.

---

## Column headers (`.ft-headers`)

```css
.ft-headers {
  display: grid;
  grid-template-columns: 1.8fr 0.8fr 0.9fr 0.8fr 0.8fr;
  gap: 16px;
  padding: 10px 24px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-dim);
  border-bottom: 1px solid var(--line-soft);
  background: var(--paper-warm);
}
```

Five columns: `MARKER` · `VALUE` · `REFERENCE` · `DELTA` · `STATUS`

---

## Table row (`.ft-row`)

```css
.ft-row {
  display: grid;
  grid-template-columns: 1.8fr 0.8fr 0.9fr 0.8fr 0.8fr;
  gap: 16px;
  align-items: center;
  padding: 12px 24px;
  border-bottom: 1px solid var(--line-soft);
  font-size: 14px;
  transition: background 0.12s, opacity 0.2s, max-height 0.2s;
}
.ft-row:last-child { border-bottom: none; }
.ft-row:hover { background: rgba(31, 80, 65, 0.02); }

/* Flagged row tint */
.ft-row.flag-row { background: rgba(200, 86, 58, 0.025); }
.ft-row.flag-row:hover { background: rgba(200, 86, 58, 0.045); }

/* Hidden when filter active */
.ft-row.hidden {
  opacity: 0;
  max-height: 0;
  padding: 0 24px;
  overflow: hidden;
  pointer-events: none;
}
```

### Column 1 — Marker name

```css
.ft-marker {
  font-family: var(--sans);
  font-size: 14px;
  color: var(--ink);
}
```

Just the marker name — no code, no dot. Clean and minimal.

### Column 2 — Value

```css
.ft-val {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--ink-soft);
  font-weight: 500;
}
```

Format: `24 ng/mL` — value + space + unit, all in mono.

### Column 3 — Reference

```css
.ft-ref {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--ink-dim);
  letter-spacing: 0.06em;
}
```

Format examples: `30–100` · `< 100` · `≥ 40` · `0.4–4.0`

### Column 4 — Delta badge (`.ft-delta`)

```css
.ft-delta {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 999px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  font-weight: 500;
  white-space: nowrap;
}
```

Three delta variants:

**Rising, bad (`.delta-up`)** — value increased past the reference:
```css
background: var(--coral-soft);   /* #E8D4CC */
color: var(--coral);              /* #C8563A */
```
Icon: `↑` (U+2191) + value: `↑ +24`

**Falling, bad (`.delta-down`)** — value decreased below reference:
```css
background: rgba(107, 117, 111, 0.12);
color: var(--ink-soft);           /* #3D4842 */
```
Icon: `↓` (U+2193) + value: `↓ −10`

**Stable (`.delta-stable`)** — within range, minimal change:
```css
background: var(--leaf-soft);    /* #D7E0C6 */
color: var(--leaf);               /* #5A7A3F */
```
Icon: `→` (U+2192) + label: `→ stable`

**No prior data (`.delta-new`)** — first time this marker has appeared:
```css
background: transparent;
color: var(--ink-faint);
```
Content: `—` (em dash, no badge styling)

### Column 5 — Status pill

Standard compact `.pill` — same as marker groups.

---

## Complete data for all 21 rows

Rows are sorted: flagged first, watch second, normal last (within each category order).

| Marker | Value | Unit | Ref | Delta | Dir | Status |
|---|---|---|---|---|---|---|
| Vitamin D | 24 | ng/mL | 30–100 | −10 | ↓ down | Flag |
| LDL Cholesterol | 142 | mg/dL | < 100 | +24 | ↑ up | Flag |
| Ferritin | 38 | ng/mL | 30–300 | −34 | ↓ down | Watch |
| Total Cholesterol | 210 | mg/dL | < 200 | +18 | ↑ up | Watch |
| HbA1c | 5.4 | % | < 5.7 | stable | → | Normal |
| HDL Cholesterol | 58 | mg/dL | ≥ 40 | +4 | ↑ (good) | Normal |
| Triglycerides | 88 | mg/dL | < 150 | −8 | → stable | Normal |
| Fasting Glucose | 94 | mg/dL | 70–99 | +2 | → stable | Normal |
| TSH | 2.1 | μIU/mL | 0.4–4.0 | −0.2 | → stable | Normal |
| Free T4 | 1.2 | ng/dL | 0.8–1.8 | stable | → | Normal |
| Vitamin B12 | 420 | pg/mL | 200–900 | +40 | → stable | Normal |
| Magnesium | 2.1 | mg/dL | 1.7–2.2 | stable | → | Normal |
| Insulin | 7.2 | μIU/mL | 2–20 | −0.8 | → stable | Normal |
| Hemoglobin | 14.2 | g/dL | 12–17.5 | +0.2 | → stable | Normal |
| Hematocrit | 42 | % | 36–50 | stable | → | Normal |
| WBC | 6.8 | k/μL | 4–11 | −0.4 | → stable | Normal |
| Platelets | 248 | k/μL | 150–400 | +12 | → stable | Normal |
| Creatinine | 0.9 | mg/dL | 0.6–1.2 | stable | → | Normal |
| eGFR | 96 | mL/min | > 60 | −2 | → stable | Normal |
| ALT | 28 | U/L | 7–56 | +3 | → stable | Normal |
| AST | 22 | U/L | 10–40 | −1 | → stable | Normal |

**Note on HDL delta direction:** HDL going up is good (higher is better for HDL). The delta badge for HDL should use `.delta-stable` styling even though it's `↑ +4` — the rise is not concerning. Context determines the color, not just the direction.

---

## Filter behavior ("Flagged only")

When active, the 4 non-normal rows are shown and all 17 normal rows collapse:

Visible rows when filter active:
1. Vitamin D (Flag)
2. LDL Cholesterol (Flag)
3. Ferritin (Watch)
4. Total Cholesterol (Watch)

Collapse animation:
```css
.ft-row.hidden {
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
  max-height: 0;
  overflow: hidden;
  border-bottom: none;
  transition: all 0.2s ease;
}
```

All transitions fire simultaneously — rows collapse to zero height while fading out.

---

## Copy reference

```
TOOLBAR
  TITLE        ALL MARKERS  21 total
               (filtered: 4 shown · 21 total)
  FILTER       Flagged only
  EXPORT       Export CSV ↓

COLUMN HEADERS
  Marker · Value · Reference · Delta · Status

DELTA FORMATS
  ↑ +24    (up, bad)     coral-soft / coral
  ↓ −10    (down, bad)   grey tint / ink-soft
  → stable (stable, ok)  leaf-soft / leaf
  —        (no prior)    transparent / ink-faint
```

---

## Why this table works

- **Sorted by priority, not alphabetically.** Flagged rows first, watch rows second, normal rows last. The user scans from most-important to least-important. Alphabetical order would bury the flags in the middle.
- **Delta as a pill, not a raw number.** `↑ +24` in a Coral-soft pill is immediately readable. A raw `+24` in a column cell requires the user to interpret it. The pill does the interpretation for them.
- **"Flagged only" toggle instead of a search.** The most likely secondary action after reading the groups is "just show me what's wrong again." One pill click surfaces the 4 relevant rows. A search bar would require typing.
- **Flat mono for values in this table (vs serif in the groups).** In the marker groups, the value (`142`) is the hero — it gets Newsreader 22px. In the flat table, it's one of five pieces of information in a dense row — it gets Geist Mono 13px. The context determines the typographic weight.
- **Export CSV includes the delta.** A user tracking their own health over time in a spreadsheet needs the delta column. Most lab result exports skip this. Including it makes the export genuinely useful.


 ## References
 
- @context/ai-interaction.md
- @context/current-feature.md
- @context/lumen-branding.md
- @context/report/00-index.md
- @context/report/01-report-header.md
- @context/report/02-ai-summary.md
- @context/report/03-marker-groups.md
- @lib/mock-data.ts
- @context/screenshots/report-page-ui-1.png
- @context/screenshots/report-page-ui-2.png
- @context/screenshots/report-page-ui-3.png
- @context/screenshots/report-page-ui-4.png
- @context/screenshots/report-page-ui-5.png
- @context/screenshots/report-page-ui-6.png
- @context/screenshots/report-page-ui-7.png