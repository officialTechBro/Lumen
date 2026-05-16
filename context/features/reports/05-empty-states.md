# 05 — Empty States

Three distinct empty states that replace the report table when there is nothing to show. Each has its own SVG illustration, heading, sub copy, and CTA. The states are: no reports uploaded yet, no search results, and no results for an active filter.

---

## Purpose

- Never leave the user staring at a blank table
- Give a clear, specific reason why nothing is showing
- Provide a direct, zero-friction path to the next action

---

## Shared container (`.empty-state`)

All three empty states use the same wrapper:

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 40px;
  background: var(--paper-elev);
  border: 1px solid var(--line-soft);
  border-radius: 14px;
  min-height: 360px;
  animation: fadeUp 0.6s ease forwards;
}
```

`min-height: 360px` ensures the empty state has visual presence — it doesn't collapse to a tiny message.

---

## Shared typography

### Heading (`.es-title`)
```css
.es-title {
  font-family: var(--serif);            /* Newsreader */
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin-bottom: 10px;
  line-height: 1.2;
}
```

### Sub (`.es-sub`)
```css
.es-sub {
  font-family: var(--sans);             /* Geist */
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
  max-width: 380px;
  margin-bottom: 28px;
}
```

### CTA spacing
28px below the sub paragraph.

---

## STATE A — No reports yet

Shown when the user has zero uploaded reports. This is the first-time user state.

```
             ┌─────────────────────────────────────┐
             │                                     │
             │         [blank document SVG]        │
             │                                     │
             │         No reports yet.             │
             │                                     │
             │   Upload your first lab report      │
             │   and Lumen will translate every    │
             │   marker into plain English.        │
             │                                     │
             │      [Upload your first report →]   │
             │                                     │
             └─────────────────────────────────────┘
```

### SVG illustration (`.es-icon`)

A blank document with a folded corner and three faint horizontal lines suggesting content.

```css
.es-icon {
  width: 64px;
  height: 72px;
  margin-bottom: 24px;
  color: var(--forest);
  opacity: 0.6;
}
```

SVG (viewBox `0 0 64 72`, fill none, `currentColor` stroke, strokeWidth 1.5, round caps/joins):
- Document outline: `M10 4 H42 L54 16 V68 H10 Z` (body)
- Folded corner: `M42 4 V16 H54` (top-right fold)
- Content lines: 3 horizontal paths at y=30, y=40, y=50, width 18–34, opacity 0.4
  - `M18 30 H46`, `M18 40 H42`, `M18 50 H36`

### Heading
`"No reports yet."`

No italic accent here — this state is honest and neutral, not brand-expressive.

### Sub
`Upload your first lab report and Lumen will translate every marker into plain English.`

### CTA
`.btn-primary` — `Upload your first report →`

On click: navigates to upload view.

---

## STATE B — No search results

Shown when the search input has text but no rows match.

```
             ┌─────────────────────────────────────┐
             │                                     │
             │      [magnifying glass + × SVG]     │
             │                                     │
             │   Nothing found for "vitamin c".    │
             │                                     │
             │   Try searching by lab name,        │
             │   marker name, or report type.      │
             │                                     │
             │           Clear search              │
             │                                     │
             └─────────────────────────────────────┘
```

### SVG illustration

A magnifying glass with a small `×` overlaid at the lens center — signals "searched but came up empty."

```css
.es-icon {
  width: 56px;
  height: 56px;
  margin-bottom: 24px;
  color: var(--ink-dim);
}
```

SVG (viewBox `0 0 56 56`, stroke `currentColor`, strokeWidth 1.5, round caps/joins):
- Lens circle: `cx=24 cy=24 r=14`
- Handle: `M34 34 L50 50`
- × inside lens: `M19 19 L29 29 M29 19 L19 29` (centered at cx=24 cy=24, 7px radius)

### Heading

Dynamic, uses the actual query string:
```
"Nothing found for "[query]"."
```

The quoted query is in Newsreader italic Forest to highlight the variable:
```jsx
<>Nothing found for <span className="italic">"{query}"</span>.</>
```

Where `.italic` = Newsreader italic 300, Forest `#1F5041`.

**Example rendered:** `Nothing found for "vitamin c".`

Max query length shown: 24 characters. If longer, truncate with `…` — `Nothing found for "follow-up metab…".`

### Sub
`Try searching by lab name, marker name, or report type.`

### CTA
`.btn-ghost` inline text link — `Clear search`

On click: clears the search input, restores all rows. No button styling — just a Forest-colored text link with underline on hover.

```css
.es-link {
  font-family: var(--sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--forest);
  text-decoration: none;
  cursor: pointer;
}
.es-link:hover { text-decoration: underline; }
```

---

## STATE C — No filter results

Shown when one or more filter pills are active but no rows match the combination.

```
             ┌─────────────────────────────────────┐
             │                                     │
             │         [filter funnel SVG]         │
             │                                     │
             │     No flagged reports.             │
             │   (or "No Kaiser reports." etc.)    │
             │                                     │
             │   Remove the filter to see          │
             │   all reports.                      │
             │                                     │
             │         [Clear filters]             │
             │                                     │
             └─────────────────────────────────────┘
```

### SVG illustration

A funnel/filter icon with an empty output — wide input at top, narrow output at bottom, nothing coming out.

```css
.es-icon {
  width: 52px;
  height: 52px;
  margin-bottom: 24px;
  color: var(--ink-dim);
}
```

SVG (viewBox `0 0 52 52`, stroke `currentColor`, strokeWidth 1.5, round caps/joins):
- Funnel: `M8 10 L22 28 V44 L30 40 V28 L44 10 Z`
- Horizontal input bar (top): `M6 10 H46`
- Small × at the bottom: `M24 46 L28 50 M28 46 L24 50` — signals empty output

### Heading

Dynamic, uses the active filter label:

```
"No [filter label] reports."
```

The filter label is in Newsreader italic Forest:
```jsx
<>No <span className="italic">{activeFilterLabel}</span> reports.</>
```

**Examples:**
- `No flagged reports.` — when `Flagged` filter is active with 0 matches
- `No Kaiser reports.` — when `Kaiser` filter is active with 0 matches
- `No 2023 reports.` — when a year filter is active with 0 matches
- `No flagged Quest reports.` — when both `Flagged` and `Quest` are active with 0 matches

For combined filters, join them: `[first filter] [second filter]` in italic.

### Sub
`Remove the filter to see all reports.`

### CTA
`.btn-secondary` — `Clear filters`

On click: deactivates all filter pills, re-activates "All", restores all rows.

```css
/* .btn-secondary */
display: inline-flex;
align-items: center;
padding: 10px 20px;
background: var(--paper);
border: 1px solid var(--line);
border-radius: 999px;
font-size: 14px;
font-weight: 500;
color: var(--ink);
cursor: pointer;
transition: all 0.2s;
:hover { border-color: var(--ink); }
```

---

## Transition between states

When switching from a populated table to an empty state (or between empty states), use a quick cross-fade:

```css
.table-area {
  transition: opacity 0.2s ease;
}
.table-area.transitioning {
  opacity: 0;
}
```

1. Set `.transitioning` (fade out over 0.2s)
2. After 200ms: swap content (table ↔ empty state)
3. Remove `.transitioning` (fade in over 0.2s)

This prevents the jarring jump from a full table to a centered empty state.

---

## Copy reference

```
STATE A — No reports yet
  TITLE    No reports yet.
  SUB      Upload your first lab report and Lumen will
           translate every marker into plain English.
  CTA      Upload your first report →

STATE B — No search results
  TITLE    Nothing found for "[query]".
           (italic forest: the query string in quotes)
  SUB      Try searching by lab name, marker name, or
           report type.
  LINK     Clear search

STATE C — No filter match
  TITLE    No [filter label] reports.
           (italic forest: the filter label)
  SUB      Remove the filter to see all reports.
  BTN      Clear filters
```

---

## Why these empty states work

- **Three distinct states, not one generic message.** "No results" is useless. "Nothing found for 'vitamin c'" + "Try searching by lab name" gives the user a specific diagnosis and a specific fix. The specificity is the trust signal.
- **Dynamic heading with the query/filter in italic Forest.** Quoting the user's own input back to them confirms the system understood what they typed. The italic Forest accent makes it scannable — the user doesn't need to read the whole sentence to find their query.
- **Different CTA styles per state.** State A uses a primary button (active, onboarding, big moment). State B uses a ghost link (lightweight, "just undo this"). State C uses a secondary button (a real action — clearing all filters — that deserves slightly more weight than a text link). The button style matches the friction level of the action.
- **Consistent container across all three states.** Same background, border, radius, and minimum height. The empty state area occupies the same visual space as the populated table — it doesn't collapse or shift the page layout.


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
- @context/screenshots/reports-ui-1.png
- @context/screenshots/reports-ui-2.png
- @lib/mock-data.ts