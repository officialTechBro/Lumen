# 04 — Quick Preview Panel

A fixed-position slide-in panel that appears from the right edge of the viewport when a user hovers on a table row for 600ms or clicks it. Shows a summary of the selected report without navigating away from the list. Inspired by Linear's issue peek and GitHub's PR preview.

---

## Purpose

- Let power users scan any report's key facts without leaving the list
- Reduce "accidental navigation" — users can explore before committing to a full page load
- Surface the flagged markers immediately as a decision aid: "is this the report I want?"

---

## Layout

```
                         ┌──────────────────────────────┐
                         │  ×                           │ ← close button
                         │                              │
                         │  QUICK VIEW · 2 flags · 1 w  │ ← mono label
                         │                              │
                         │  Annual panel                │ ← serif title
                         │  Quest Diagnostics           │ ← mono sub
                         │  March 14, 2026              │
                         │                              │
                         │  ┌───────┬───────┬───────┬──┐│ ← summary grid
                         │  │  21   │Mar 14 │   2   │18││
                         │  │Markers│ Date  │ Flags │OK ││
                         │  └───────┴───────┴───────┴──┘│
                         │                              │
                         │  FLAGGED MARKERS             │ ← section label
                         │  ● Vitamin D   24 ng/mL  [F] │
                         │  ● LDL-C      142 mg/dL  [F] │
                         │  ● Ferritin    38 ng/mL  [W] │
                         │                              │
                         │  [Open full report →]        │
                         │  Close preview               │
                         └──────────────────────────────┘
```

---

## Panel container (`.preview-panel`)

```css
.preview-panel {
  position: fixed;
  top: 68px;                            /* below topbar */
  right: 0;
  width: 400px;
  height: calc(100vh - 68px);
  background: var(--paper-elev);        /* #FBF8F1 */
  border-left: 1px solid var(--line-soft);
  padding: 36px 32px;
  overflow-y: auto;
  z-index: 20;
  transform: translateX(100%);          /* hidden: off-screen right */
  transition: transform 0.25s ease;
  box-shadow: -20px 0 60px -20px rgba(26, 38, 32, 0.15);
}

/* Open state — toggled by JS */
.preview-panel.open {
  transform: translateX(0);
}
```

**Trigger logic:**
- Row hover for 600ms → set `hoveredRow`, start 600ms timer; if still hovering, open panel
- Row click → open panel immediately
- Clicking outside the panel or pressing `Escape` → close
- Clicking a different row while panel is open → updates panel content without closing (smooth content swap)

---

## Close button (`.preview-close`)

```css
.preview-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--paper-warm);
  border: 1px solid var(--line-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: var(--ink-dim);
  transition: all 0.15s;
}
.preview-close:hover {
  background: var(--paper);
  color: var(--ink);
  border-color: var(--line);
}
```

Character: `×` (U+00D7)

---

## Region A — Header (`.pv-header`)

```css
.pv-header {
  margin-bottom: 28px;
}
```

### Status label (`.pv-label`)

```css
.pv-label {
  font-family: var(--mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--forest);
  margin-bottom: 14px;
}
```

Content: `QUICK VIEW · 2 flags · 1 watch`

Separator: ` · ` (middle dot with spaces). Flag count in Coral if `> 0`, watch count in Ink-dim.

```jsx
// Dynamic label
`QUICK VIEW · ${report.flags} ${report.flags === 1 ? 'flag' : 'flags'} · ${report.watch} watch`
```

### Report title (`.pv-title`)

```css
.pv-title {
  font-family: var(--serif);
  font-size: 26px;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: 8px;
  color: var(--ink);
}
```

Content: report title — e.g. `Annual panel`

### Report sub (`.pv-sub`)

```css
.pv-sub {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-dim);
  line-height: 1.6;
}
```

Two lines:
- Line 1: lab provider — `Quest Diagnostics`
- Line 2: full date — `March 14, 2026`

---

## Region B — Summary grid (`.pv-summary`)

```css
.pv-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: var(--paper-warm);
  border-radius: 10px;
  border: 1px solid var(--line-soft);
  padding: 16px 0;
  margin-bottom: 28px;
}
```

Four equal cells. Internal left borders on cells 2–4:

```css
.pv-cell {
  padding: 0 16px;
  text-align: center;
}
.pv-cell + .pv-cell {
  border-left: 1px solid var(--line-soft);
}
```

Each cell:
- **Value (`.pv-val`):** Newsreader 500, 28px, tracking -0.02em
- **Label (`.pv-cell-label`):** Geist Mono 10px, Ink-dim, uppercase, tracking 0.12em, 4px margin-top

| Cell | Value | Color | Label |
|---|---|---|---|
| 1 | `21` | Ink | `Markers` |
| 2 | `Mar 14` | Ink-soft | `Date` |
| 3 | `2` | Coral `#C8563A` | `Flags` |
| 4 | `18` | Leaf `#5A7A3F` | `Normal` |

Cell 3 (Flags): Coral value if `> 0`, Ink-faint if `= 0`.
Cell 4 (Normal): Leaf color always — it's always positive.

---

## Region C — Flagged markers list (`.pv-flagged`)

```css
.pv-flagged {
  margin-bottom: 32px;
}

.pv-section-label {
  font-family: var(--mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--ink-dim);
  margin-bottom: 12px;
}
```

Section label: `FLAGGED MARKERS`

Shows max 3 markers: flags first (sorted by severity), then watch.

### Marker row (`.pv-marker`)

```css
.pv-marker {
  display: grid;
  grid-template-columns: 16px 1fr auto auto;
  gap: 10px;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--line-soft);
}
.pv-marker:last-child { border-bottom: none; }
```

**Col 1 — Status dot:**
```css
.pv-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  flex-shrink: 0;
}
.pv-dot.flag  { background: var(--coral); }
.pv-dot.watch { background: var(--ink-soft); opacity: 0.5; }
```

**Col 2 — Name (`.pv-mname`):**
Newsreader 500, 15px, tracking -0.01em, Ink

**Col 3 — Value (`.pv-mval`):**
Geist Mono 500, 12px, Ink-soft — `24 ng/mL`

**Col 4 — Status pill:**
Compact `.pill` — same as table, but 9px font, 4px 8px padding.

The 3 rows (for report #1 — Annual panel):

| Dot | Name | Value | Pill |
|---|---|---|---|
| Coral | Vitamin D | 24 ng/mL | `Flagged` |
| Coral | LDL Cholesterol | 142 mg/dL | `Flagged` |
| Grey | Ferritin | 38 ng/mL | `Watch` |

---

## Region D — CTAs (`.pv-ctas`)

```css
.pv-ctas {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
```

**Primary button:** `Open full report →`
- `.btn-primary` — full-width, Ink bg, Paper text
- On click: navigate to report detail view, close preview panel

**Ghost link:** `Close preview`
- `.btn-ghost` — full-width text-align center, Ink-soft color
- On click: close panel (same as `×` button)
- `font-size: 14px`, no background, no border

---

## Content swap animation

When the user clicks a different row while the panel is already open, the panel content updates without sliding out and back in:

```css
.pv-content {
  transition: opacity 0.15s ease;
}
.pv-content.swapping {
  opacity: 0;
}
```

1. Set `.swapping` (fade out, 0.15s)
2. After 150ms: update content
3. Remove `.swapping` (fade back in, 0.15s)

Total swap duration: ~300ms. Smooth, not jarring.

---

## Backdrop (optional)

On smaller viewports (< 1200px) where the panel overlaps the table significantly, a semi-transparent backdrop can be added:

```css
.preview-backdrop {
  position: fixed;
  inset: 68px 0 0 0;
  background: rgba(26, 38, 32, 0.2);
  z-index: 19;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s;
}
.preview-backdrop.visible {
  opacity: 1;
  pointer-events: all;
}
```

Clicking the backdrop closes the panel.

---

## Copy reference

```
LABEL        QUICK VIEW · [N] flag[s] · [N] watch

TITLE        [Report title]              e.g. Annual panel
LAB          [Lab name]                  e.g. Quest Diagnostics
DATE         [Full date]                 e.g. March 14, 2026

SUMMARY
  Cell 1     [N] Markers
  Cell 2     [MMM DD] Date
  Cell 3     [N] Flags           (Coral if > 0)
  Cell 4     [N] Normal          (always Leaf)

SECTION LBL  FLAGGED MARKERS

MARKER ROWS  (up to 3)
  [dot] [name]   [value unit]   [pill]

CTA 1        Open full report →
CTA 2        Close preview

CLOSE BTN    ×
```

---

## Why this panel works

- **Slide-in, not modal.** A modal dims the page and breaks the list context. A slide-in panel lets the user keep the table visible on the left while previewing on the right — they maintain spatial context.
- **600ms hover delay.** Immediately triggering on hover would open the panel constantly as the user moves the mouse. A 600ms delay means it only opens when the user pauses intentionally over a row.
- **Content swap without close/reopen.** If the panel closed and re-opened on every row click, the animation would be distracting. Swapping the content in-place with a quick fade is smoother — the panel stays open, the information updates.
- **Four-cell summary grid.** Markers / Date / Flags / Normal — the four most useful quick-reference facts about a report. Laid out identically to the hero report card on the home dashboard, so the pattern is already familiar.
- **Flagged markers list, not all 21 markers.** Showing all markers would make the panel too long and require its own scroll. Only the flagged and watch markers are shown — they're the reason the user would want to peek at this report in the first place.


## References

- @context/lumen-project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md
- @context/lumen-branding.md
- @context/reports/00-index.md
- @context/reports/01-page-header.md
- @context/reports/02-filter-bar.md
- @context/reports/03-report-table.md
- @context/screenshots/reports-ui-1.png
- @context/screenshots/reports-ui-2.png
- @lib/mock-data.ts