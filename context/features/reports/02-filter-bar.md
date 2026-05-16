# 02 — Filter + Search Bar

A single horizontal toolbar row. Left side: a row of toggleable filter pills. Right side: a search input that expands on focus and a sort dropdown. Lives between the page header and the report table.

---

## Purpose

- Let users narrow 7+ reports to the ones that matter right now (by status, lab, or year)
- Provide full-text search across report titles, labs, and marker names
- Offer sort control without a settings page

---

## Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  [All] [Flagged 2] [Watch 1] [All clear] [Quest 4] [2026 1] …      │
│                                    [Search reports…]  [Newest ▾]    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Container (`.filters-bar`)

```css
.filters-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
```

`flex-wrap: wrap` — pills overflow to a second line on narrow viewports rather than scrolling horizontally.

Animation: `.fade .d2`

---

## Filter pills (left group, `.filter-pills`)

```css
.filter-pills {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
```

### Base pill (`.filter-pill`)

```css
.filter-pill {
  font-family: var(--mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid var(--line);        /* #D9D3C4 */
  background: var(--paper-elev);        /* #FBF8F1 */
  color: var(--ink-dim);                /* #6B756F */
  cursor: pointer;
  user-select: none;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}
.filter-pill:hover {
  border-color: var(--ink-dim);
  color: var(--ink);
}
```

### Active state (`.filter-pill.active`)

```css
.filter-pill.active {
  background: var(--ink);              /* #1A2620 */
  color: var(--paper);                 /* #F6F3EC */
  border-color: var(--ink);
}
```

### Dismissible pill (pills with a count)

Pills that have a count badge also show a `×` dismiss glyph when active:

```css
.filter-pill .dismiss {
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.15s;
  margin-left: 2px;
  line-height: 1;
}
.filter-pill.active .dismiss {
  opacity: 0.75;
}
.filter-pill.active:hover .dismiss {
  opacity: 1;
}
```

Clicking the `×` removes only that filter (not all filters). Clicking the label text toggles the whole pill.

---

## The 10 filter pills

| Position | Label | Count display | Default |
|---|---|---|---|
| 1 | `All` | — | Active |
| 2 | `Flagged` | `2` | Inactive |
| 3 | `Watch` | `1` | Inactive |
| 4 | `All clear` | — | Inactive |
| 5 | `Quest` | `4` | Inactive |
| 6 | `Labcorp` | `1` | Inactive |
| 7 | `Kaiser` | `1` | Inactive |
| 8 | `2026` | `1` | Inactive |
| 9 | `2025` | `2` | Inactive |
| 10 | `2024` | `4` | Inactive |

**Count format:** the number follows the label with a single space — `FLAGGED 2`, `QUEST 4`, `2025 2`. It's part of the pill label string, not a separate badge element.

### Filter logic

- **All:** active when no specific filters are on. Selecting any other pill deactivates "All."
- **Status filters** (Flagged, Watch, All clear): mutually exclusive within the status group. Selecting "Flagged" deactivates "Watch" and "All clear."
- **Lab filters** (Quest, Labcorp, Kaiser): can stack — selecting Quest + Labcorp shows both.
- **Year filters** (2026, 2025, 2024): can stack.
- **Cross-group:** status + lab + year filters combine with AND logic (all conditions must match).

---

## Right group (`.filters-right`)

```css
.filters-right {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;                    /* pushes to the right edge */
}
```

### Search input (`.search-input`)

```css
.search-input {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--paper-elev);
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  padding: 8px 16px;
  width: 240px;
  transition: border-color 0.15s, width 0.3s ease;
  cursor: text;
}
.search-input:focus-within {
  border-color: var(--forest);
  width: 320px;
}
```

**Search icon:** magnifying glass SVG, 14×14, `color: var(--ink-dim)`, `flex-shrink: 0`

**Input element (inside):**
```css
input {
  font-family: var(--sans);
  font-size: 13px;
  color: var(--ink-dim);
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
}
input::placeholder { color: var(--ink-faint); }
input:focus { color: var(--ink); }
```

Placeholder: `Search reports…`

**Clear button** — appears inside the input when text is present, right-aligned:
```css
.search-clear {
  font-size: 14px;
  color: var(--ink-faint);
  cursor: pointer;
  flex-shrink: 0;
  line-height: 1;
}
.search-clear:hover { color: var(--ink); }
```
Character: `×`

**Search scope:** report title, lab name, marker names within reports. Debounced 200ms.

### Sort dropdown (`.sort-btn`)

```css
.sort-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: var(--paper-elev);
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-dim);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
}
.sort-btn:hover {
  border-color: var(--line);
  color: var(--ink);
}
```

**Label:** `Newest ▾`
The `▾` is a downward-pointing small triangle (U+25BE), 10px, same color as label text.

**Dropdown menu (`.sort-menu`):**

```css
.sort-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--paper-elev);
  border: 1px solid var(--line-soft);
  border-radius: 8px;
  padding: 6px;
  min-width: 180px;
  box-shadow: 0 8px 24px -8px rgba(26, 38, 32, 0.15);
  z-index: 10;
  animation: fadeUp 0.15s ease;        /* shared fadeUp keyframe */
}
```

**Menu items:**

```css
.sort-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 12px;
  border-radius: 6px;
  font-family: var(--sans);
  font-size: 14px;
  color: var(--ink-soft);
  cursor: pointer;
  transition: background 0.1s;
}
.sort-option:hover    { background: var(--paper-warm); color: var(--ink); }
.sort-option.active   { color: var(--forest); font-weight: 500; }
.sort-option.active::after {
  content: '✓';
  font-size: 12px;
  color: var(--forest);
}
```

**Four options:**
| Label | Default |
|---|---|
| `Newest first` | Active (checkmark) |
| `Oldest first` | — |
| `Most flags` | — |
| `Lab name A–Z` | — |

Clicking an option closes the dropdown and updates the button label to the selected option + `▾`.

---

## States

### All filters cleared
- Only `All` is active
- Table shows all 7 rows

### Filter active (e.g. `Flagged`)
- `Flagged` pill goes Ink bg / Paper text
- `All` deactivates (returns to base style)
- Table shows only rows where `flags > 0` (rows 1, 2, 5)

### Search active
- Input expands to 320px
- Table rows filter live as user types
- Non-matching rows: `opacity 0` + `max-height 0` (smooth collapse)

### Combined filter + search
- Both active simultaneously
- Table shows rows that match ALL active criteria

---

## Copy reference

```
FILTER PILLS (left to right)
  All · Flagged 2 · Watch 1 · All clear ·
  Quest 4 · Labcorp 1 · Kaiser 1 ·
  2026 1 · 2025 2 · 2024 4

SEARCH PLACEHOLDER
  Search reports…

SORT BUTTON    Newest ▾

SORT OPTIONS
  Newest first  (default, checkmark)
  Oldest first
  Most flags
  Lab name A–Z
```

---

## Why this filter bar works

- **Pills instead of a filter panel.** A slide-out filter panel adds a modal layer to what should be a frictionless operation. Pills are always visible, always one click. The user can see what's active and toggle it off without opening anything.
- **"All" deactivates on any specific filter.** This prevents a confusing state where "All" and "Flagged" are both highlighted. The logic is: either you're seeing everything, or you've narrowed it.
- **Search expands on focus.** 240px is enough to show the placeholder. 320px is enough to type a marker name like "Vitamin D" or a lab like "Quest Diagnostics" without truncation. The expansion is smooth and signals the input is ready.
- **Sort as a separate pill button, not a column header.** Column-header sorting is fine for power users but invisible to casual users. A labelled pill button (`Newest ▾`) is immediately discoverable. Both can coexist — the pill sets the global sort, column headers offer targeted sorting per column.
- **`margin-left: auto` on `.filters-right`.** This pushes the search and sort to the right edge regardless of how many filter pills wrap — even if the pills expand to two lines, the right controls stay pinned right.

## References

- @context/lumen-project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md
- @context/lumen-branding.md
- @context/reports/00-index.md
- @context/reports/01-page-header.md
- @context/screenshots/reports-ui-1.png
- @context/screenshots/reports-ui-2.png
- @lib/mock-data.ts