# 04 — Page Header

The section directly below the topbar. Contains the user greeting, the main serif headline, a metadata line, and the two top-level CTAs. First element the user reads on the home screen.

---

## Purpose

- **Greet personally** — small mono eyebrow with first name, sets a human tone
- **State the product thesis one more time** — the same italic Forest accent phrase from the marketing site, now personalised
- **Orient with context** — when the last upload was and what report it was
- **Provide top-level actions** — "Share with doctor" + "Upload new report"

---

## Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  GOOD AFTERNOON, SARAH                                               │
│  Your health,                   [Share with doctor] [Upload new →]  │
│  in plain English.                                                   │
│  Last upload 4 days ago · Annual panel from Quest Diagnostics        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

```css
.page-head {
  margin: 32px 0 32px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}
```

`align-items: flex-end` aligns the button group to the bottom of the left text block — buttons sit level with the last line of the heading.

---

## Left block

### Greeting (`.greet`)
```css
.page-head .greet {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--forest);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 12px;
}
```
Content: `Good afternoon, Sarah` (first name only, extracted from `user.name`)
Time-of-day greeting: Good morning / Good afternoon / Good evening — based on local time.

### Headline (H1)
```css
.page-head h1 {
  font-size: 52px;
  line-height: 1;
  letter-spacing: -0.035em;
  font-weight: 400;
  font-family: var(--serif);
}
.page-head h1 .italic {
  font-size: 0.95em;  /* slightly smaller to optically balance */
}
```

Structure:
> "Your health, [in plain English.]"

- `in plain English.` is wrapped in `.italic` — Newsreader 300 italic, Forest `#1F5041`
- The `0.95em` italic size is intentional — italic Newsreader renders slightly larger optically, so the slight reduction keeps the two parts balanced on the baseline

### Meta line (`.meta`)
```css
.page-head .meta {
  color: var(--ink-soft);
  font-size: 15px;
  margin-top: 10px;
}
```
Content: `Last upload 4 days ago · Annual panel from Quest Diagnostics`
Uses `·` (middle dot U+00B7) as separator. Real values come from `latestReport.daysAgo` and `latestReport.lab`.

---

## Right block — CTAs

```css
/* wrapper */
display: flex; gap: 10px;
```

**Secondary button:** "Share with doctor"
- `.btn .btn-secondary`
- Paper-elev bg, Ink text, Line-soft border
- No icon

**Primary button:** "Upload new report →"
- `.btn .btn-primary`
- Ink bg, Paper text
- Arrow icon: `<Ico.arrowRight/>` — 12×12 SVG arrowhead
- On click: navigates to upload view (`setPage("upload")`)

---

## Animation

All elements in the page header use `.fade .d1` — all fade in together with the first delay tier (0.05s). Since they're a single semantic unit, staggering them individually would feel fidgety.

---

## Copy reference

```
GREETING       Good afternoon, [First name]
               (morning before 12pm, evening after 6pm)

H1             Your health,
               in plain English.    ← italic forest

META           Last upload [N] days ago · [Report title]
               from [Lab name]

BTN 1          Share with doctor
BTN 2          Upload new report →
```

---

## Data bindings

| Element | Source |
|---|---|
| First name | `user.name.split(" ")[0]` → "Sarah" |
| Days ago | `latestReport.daysAgo` → "4" |
| Report title | `latestReport.title` → "Annual panel" |
| Lab name | `latestReport.lab` → "Quest Diagnostics" |

---

## Why this page header works

- **"Your health, in plain English."** is the exact thesis from the marketing site, now spoken as a personal statement. The visitor already saw it on the landing page — finding it inside the app creates continuity and confirms they're in the right place.
- **`align-items: flex-end` on the outer flex.** The headline is three lines tall; the buttons are one line tall. Aligning to the bottom means the buttons sit next to the last line of the headline — a clean typographic relationship.
- **Time-of-day greeting.** Small detail, but it signals the app knows when you're using it — makes the product feel alive without being intrusive.
- **Middle-dot separator in meta.** Same as the marketing site's fine-print lines. Builds a consistent visual language across the entire product.

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
- @context/screenshots/dashboard-ui-1.png
- @context/screenshots/dashboard-ui-2.png
- @context/screenshots/dashboard-ui-3.png