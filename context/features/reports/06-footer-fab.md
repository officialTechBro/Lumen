# 06 — Table Footer + Floating Upload Button (FAB)

Two elements that live at the bottom of the Reports page. The table footer is a simple count line below the table. The FAB is a persistent floating action button pinned to the bottom-right corner of the viewport — always visible, always ready to start an upload.

---

## Purpose

**Table footer:**
- Confirm how many records are shown vs total in the archive
- Provide a "Load more" path if the archive exceeds the visible batch (20+ reports)

**FAB:**
- Keep the primary product action (upload) accessible at all times, even mid-scroll
- Never require the user to scroll back to the page header to start an upload

---

## TABLE FOOTER

### Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│  7 REPORTS SHOWN · 7 TOTAL                   [Load earlier reports →]│
└──────────────────────────────────────────────────────────────────────┘
```

Positioned 20px below the table's bottom border.

### Container (`.table-footer`)

```css
.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-dim);
}
```

### Left — count (`.tf-count`)

No additional CSS — inherits `.table-footer` styles.

Content: `7 REPORTS SHOWN · 7 TOTAL`

Separator: ` · ` (middle dot with spaces, U+00B7)

**Dynamic content:**
```
[shown] REPORTS SHOWN · [total] TOTAL
```

- `shown`: the number of rows currently visible (after any filtering/searching)
- `total`: the total number of reports in the user's account (unfiltered)

When a filter is active and `shown < total`:
- Content reads: `3 REPORTS SHOWN · 7 TOTAL` — makes it clear the list is filtered

### Right — load more (`.tf-load`)

Only rendered when `total > 20` (the user has more reports than one batch).

```css
.tf-load {
  /* .btn-secondary variant */
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  background: var(--paper-elev);
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-dim);
  cursor: pointer;
  transition: all 0.15s;
}
.tf-load:hover {
  border-color: var(--line);
  color: var(--ink);
}
```

Content: `Load earlier reports →`
The `→` is the right arrow character (U+2192), 12px, same color.

**Loading state** (after clicking):
- Text changes to: `Loading…`
- Color: Ink-faint
- Pointer-events: none

When the additional reports load, they append to the bottom of the table with a `fadeUp` animation.

---

## FLOATING ACTION BUTTON (FAB)

### Layout

```
                                              ┌────────────┐
                                              │  +         │ ← collapsed (52×52)
                                              └────────────┘

                                     ┌───────────────────────────┐
                                     │  +  Upload report          │ ← expanded (on hover)
                                     └───────────────────────────┘
```

Fixed at `bottom: 40px; right: 40px` — appears above the page scroll, always accessible.

### Container (`.fab`)

```css
.fab {
  position: fixed;
  bottom: 40px;
  right: 40px;
  height: 52px;
  width: 52px;
  border-radius: 999px;
  background: var(--ink);                   /* #1A2620 */
  color: var(--paper);                      /* #F6F3EC */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px -8px rgba(26, 38, 32, 0.35);
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  transition: width 0.2s ease, background 0.2s, transform 0.2s,
              box-shadow 0.2s, padding 0.2s;
  z-index: 15;
}
```

### Hover state — expanded

```css
.fab:hover {
  width: auto;
  padding: 0 20px 0 16px;
  background: var(--forest);               /* #1F5041 */
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 12px 32px -10px rgba(31, 80, 65, 0.4);
}
.fab:hover .fab-label {
  opacity: 1;
  width: auto;
  margin-left: 10px;
}
```

The button grows from a 52×52 circle to a pill shape with a text label. Width transitions from `52px` to `auto` via the padding expansion.

### Icon (`.fab-icon`)

```css
.fab-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
```

SVG (viewBox `0 0 20 20`, stroke `currentColor`, strokeWidth 1.8, round caps/joins):
- Horizontal: `M4 10 H16`
- Vertical: `M10 4 V16`

The `+` cross in Paper color, centered.

### Label (`.fab-label`)

```css
.fab-label {
  font-family: var(--sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--paper);
  opacity: 0;
  width: 0;
  overflow: hidden;
  transition: opacity 0.15s ease 0.05s, width 0.2s ease;
}
```

Content: `Upload report`

The label fades in with a slight `0.05s` delay after the width expansion begins — so it appears only once the button has opened up enough to show it.

### On click behavior
- Navigates to upload view (`setPage("upload")`)
- Add a brief press animation: `scale(0.97)` for 100ms, then release

### Z-index context

The FAB sits at `z-index: 15`. The preview panel is `z-index: 20`. This means:
- The FAB appears above the table and most page content
- But if the preview panel is open, the panel overlaps the FAB

On narrow viewports where the preview panel is full-width, the FAB can be temporarily hidden when the panel is open:
```css
.preview-panel.open ~ .fab { opacity: 0; pointer-events: none; }
```

---

## Responsive notes

**Table footer:**
- On viewports < 560px: the count and load-more button stack vertically (`flex-direction: column; align-items: flex-start; gap: 12px`)
- "Load earlier reports →" label shortens to `Load more →`

**FAB:**
- On viewports < 720px: the hover-expand label is suppressed (mobile has no hover). The button remains as a 52×52 circle with just the `+` icon.
- Touch devices: tap to navigate directly to upload (no expand animation)
- Bottom offset adjusts: `bottom: 24px; right: 24px` on mobile

---

## Copy reference

```
TABLE FOOTER
  COUNT      7 REPORTS SHOWN · 7 TOTAL
             (filtered: [N] REPORTS SHOWN · 7 TOTAL)
  LOAD MORE  Load earlier reports →
  LOADING    Loading…

FAB
  COLLAPSED  + (icon only)
  EXPANDED   + Upload report
```

---

## Why these elements work

**Table footer — count line:**
- **Mono uppercase, Ink-dim.** This is metadata, not content. The quiet treatment signals it's supplementary information, not a heading. It answers the question "is this all of them?" without demanding attention.
- **"Shown · Total" vs just "Total."** When a filter is active, showing `3 REPORTS SHOWN · 7 TOTAL` immediately communicates that the list is filtered. Without the shown count, a user might think they only have 3 reports.

**FAB — expand on hover:**
- **Why not a labeled button from the start?** A 52px circle is visually lightweight — it doesn't compete with the page content. A full-labeled button would feel heavy and permanent in the bottom-right corner of a data table.
- **Why not a tooltip?** Tooltips appear after a delay and disappear. The expand animation is instant (on hover) and feels more responsive. It also has more visual weight — the user can read it properly, not squint at a tooltip.
- **Forest on hover, Ink at rest.** The FAB at rest uses Ink — dark and solid, but not branded. On hover, it shifts to Forest — the primary brand accent. This is the same pattern as the primary button: Ink default, Forest hover. Consistent across the product.
- **`scale(1.02)` in the hover state.** The tiny scale-up on hover (combined with `translateY(-2px)`) creates a feeling of the button "lifting" toward the cursor — a physical affordance that makes it feel tappable.


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
- @context/reports/04-preview-panel.md
- @context/reports/05-empty-states.md
- @context/screenshots/reports-ui-1.png
- @context/screenshots/reports-ui-2.png
- @lib/mock-data.ts