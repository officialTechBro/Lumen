# 01 — Page Header

The top of the Reports page main content area. A two-part horizontal strip: a left text block with the serif headline and meta line, and a right-aligned primary CTA button.

---

## Purpose

- State where the user is and what they own ("Your lab history, 7 reports")
- Surface the primary action (upload a new report) without requiring a scroll
- Set the editorial tone for the page with the italic Forest accent on "explained."

---

## Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  Your lab history,                    [+ Upload new report]          │
│  explained.                                                          │
│                                                                      │
│  7 reports · tracked since Feb 2024                                  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Container (`.page-head`)

```css
.page-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 32px 0 28px;
  flex-wrap: wrap;
  gap: 20px;
}
```

`align-items: flex-end` — the button aligns to the bottom of the text block, sitting level with the meta line. Prevents the button floating at the vertical center of a tall headline.

Animation: `.fade .d1`

---

## Left block (`.ph-left`)

No explicit CSS needed — natural flex child, takes remaining space.

### Headline (H1)

```css
h1 {
  font-family: var(--serif);        /* Newsreader */
  font-size: clamp(40px, 4vw, 56px);
  line-height: 1;
  letter-spacing: -0.03em;
  font-weight: 400;
  margin: 0;
}
h1 .italic {
  font-style: italic;
  font-weight: 300;
  color: var(--forest);             /* #1F5041 */
  font-size: 0.95em;                /* optically balances italic Newsreader */
}
```

**Structure — two lines:**
- Line 1: `Your lab history,` — regular roman
- Line 2: `explained.` — wrapped in `.italic` (Newsreader italic 300, Forest)

The 0.95em size reduction on the italic line is intentional: Newsreader italic renders slightly larger optically, so the reduction keeps both lines visually balanced at the baseline.

### Meta line (`.ph-meta`)

```css
.ph-meta {
  font-family: var(--sans);         /* Geist */
  font-size: 15px;
  color: var(--ink-soft);           /* #3D4842 */
  margin-top: 12px;
}
```

**Content:** `7 reports · tracked since Feb 2024`

Separator: middle dot `·` (U+00B7) with a space on each side.

**Data bindings:**
| Token | Source | Example |
|---|---|---|
| Report count | `reports.length` | `7` |
| Tracked since | `reports[reports.length-1].date` formatted as `MMM YYYY` | `Feb 2024` |

---

## Right block — CTA (`.ph-right`)

```css
.ph-right {
  flex-shrink: 0;
}
```

**Button: `+ Upload new report`**

```css
/* .btn-primary */
display: inline-flex;
align-items: center;
gap: 8px;
padding: 11px 20px;
background: var(--ink);             /* #1A2620 */
color: var(--paper);                /* #F6F3EC */
font-family: var(--sans);
font-size: 14px;
font-weight: 500;
border-radius: 999px;
border: none;
cursor: pointer;
transition: all 0.2s;
```

Hover:
```css
background: var(--forest);          /* #1F5041 */
transform: translateY(-1px);
box-shadow: 0 10px 24px -10px rgba(31, 80, 65, 0.35);
```

**Icon:** `+` character (plain text, 16px) or a 14×14 SVG cross (two perpendicular 1.5px strokes, round caps, Paper color).

**On click:** navigates to upload view (`setPage("upload")`)

---

## Responsive

| Viewport | Behavior |
|---|---|
| ≥ 720px | Two items side by side, button right-aligned, baseline-aligned |
| < 720px | Stacks vertically — headline block above, button below, 16px gap |

On mobile the `flex-wrap: wrap` causes the button to drop to a new row. It remains left-aligned (not centered) to match the headline above.

---

## Copy reference

```
H1      Your lab history,
        explained.             ← Newsreader italic 300, Forest

META    7 reports · tracked since Feb 2024

BTN     + Upload new report
```

---

## Why this header works

- **"Explained." as the italic accent.** Not "organized" or "archived" — explained is the product's core verb. It appears here the same way it does in the hero dashboard card (`Annual panel, explained.`) — a deliberate echo that builds brand consistency inside the app.
- **`align-items: flex-end`.** The H1 is 3 lines tall including the meta. If the button aligned to center or top, it would float awkwardly. Baseline alignment to the meta line is the only relationship that feels intentional.
- **Count and tracked-since in the meta line.** Two facts that calibrate the user's expectations: how many records exist, and how long the history goes back. Useful context before seeing the table.

## References

- @context/lumen-project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md
- @context/lumen-branding.md
- @context/reports/00-index.md
- @context/screenshots/reports-ui-1.png
- @context/screenshots/reports-ui-2.png
- @lib/mock-data.ts
