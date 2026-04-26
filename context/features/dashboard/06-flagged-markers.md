# 06 — Flagged Markers Card ("Needs Attention")

A card listing the three markers that need the user's attention. Each row shows the marker's name, a sparkline trend, a delta badge, the current value vs reference, a status pill, and a chevron. Clicking a row expands it to show a plain-English explanation and a suggested doctor question.

---

## Purpose

- **Surface the three most important numbers** without the user having to open the full report
- **Show trend direction** — a sparkline next to each marker tells the story of where the value has been going, not just where it is today
- **Give the next action** — the expanded panel offers a ready-to-use question for the user's doctor appointment

---

## Layout

```
┌────────────────────────────────────────────────────────────────────┐
│  Needs attention  3 markers                      All markers →     │
├────────────────────────────────────────────────────────────────────┤
│  ● Vitamin D      [sparkline↓]   ↓ −10   24 ng/mL  Ref 30–100   [Flag]  ›  │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  PLAIN ENGLISH                 │  ASK YOUR DOCTOR           │   │
│  │  Mildly low. Common in winter. │  "Is 2,000 IU daily…?"    │   │
│  │                                │  + Add to my questions     │   │
│  └─────────────────────────────────────────────────────────────┘   │
│  ● LDL Cholesterol [sparkline↑]  ↑ +24  142 mg/dL  Ref <100  [Flag]  ›  │
│  ● Ferritin        [sparkline↓]  ↓ −34   38 ng/mL  Ref 30–300 [Watch] ›  │
└────────────────────────────────────────────────────────────────────┘
```

---

## Card container

Standard `.card` pattern:
- Background: `var(--paper-elev)` `#FBF8F1`
- Border: 1px `var(--line-soft)`
- Border-radius: 14px
- `overflow: hidden`
- Animation: `.fade .d3`

### Card header (`.card-head`)
```css
.card-head {
  padding: 22px 26px 16px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
}
```
Left: title + count badge
- `.t` — Newsreader 500, 20px, tracking -0.015em: **"Needs attention"**
- `.count` inside `.t` — Geist Mono 11px, Ink-dim, tracking 0.14em, uppercase: **"3 markers"**

Right: link
- `.link` — Geist Mono 10px, Forest, tracking 0.14em, uppercase: **"All markers →"**
- Hover: Ink color

---

## Flagged list (`.flagged-list`)

```css
.flagged-list {
  border-top: 1px solid var(--line-soft);
}
```

Contains three marker rows + their optional expansion panels.

---

## Marker row (`.flagged-row`)

```css
.flagged-row {
  display: grid;
  grid-template-columns: 200px 130px 120px 140px 80px 28px;
  gap: 20px;
  align-items: center;
  padding: 18px 26px;
  border-bottom: 1px solid var(--line-soft);
  cursor: pointer;
  transition: background 0.12s;
}
.flagged-row:hover { background: rgba(31, 80, 65, 0.03); }
.flagged-row.open  { background: rgba(31, 80, 65, 0.04); }
```

Six columns left to right:

### Column 1 — Name (`.fr-name`)
```css
.fr-name {
  display: flex;
  align-items: center;
  gap: 12px;
}
```
- **Status dot:** 8×8px circle, `flex-shrink: 0`
  - `.dot.flag` — background: Coral `#C8563A`
  - `.dot.watch` — background: Ink-soft, 50% opacity
- **Name text (`.n`):** Newsreader 500, 17px, tracking -0.01em
- **Code text (`.c`):** below the name, Geist Mono style, Ink-dim

Data:
| Marker | Name | Code | Status |
|---|---|---|---|
| 1 | Vitamin D | 25(OH)D | flag |
| 2 | LDL Cholesterol | LDL-C | flag |
| 3 | Ferritin | Ferritin | watch |

### Column 2 — Sparkline (`.fr-spark`)
A `<Sparkline>` component, 110×30px.
See sparkline spec below.

### Column 3 — Delta badge (`.fr-delta`)
```css
.chg {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 999px;
}
.chg.up   { background: var(--coral-soft); color: var(--coral); }
.chg.down { background: rgba(107,117,111,.12); color: var(--ink-soft); }
```

A pill badge with an arrow icon + delta string:
| Marker | Dir | Badge | Icon |
|---|---|---|---|
| Vitamin D | down | `↓ −10 in 2 yrs` | `<Ico.down/>` |
| LDL-C | up | `↑ +24 in 2 yrs` | `<Ico.up/>` |
| Ferritin | down | `↓ −34 in 2 yrs` | `<Ico.down/>` |

`.chg.up` (rising, bad for LDL) = Coral-soft/Coral — it's going the wrong way.
`.chg.down` (falling, bad for VitD/Ferritin) = neutral grey — falling markers that were high need different context.

### Column 4 — Value (`.fr-val`)
```css
.fr-val {
  text-align: right;
  font-family: var(--mono);
  font-size: 12px;
  color: var(--ink-dim);
}
.fr-val strong {
  font-family: var(--serif);
  font-size: 19px;
  color: var(--ink);
  font-weight: 500;
  margin-right: 2px;
  letter-spacing: -0.01em;
}
.fr-val .r {
  font-size: 10px;
  letter-spacing: 0.14em;
  margin-top: 3px;
  text-transform: uppercase;
}
```
- Strong value in large serif, unit in small mono inline
- Reference range on a second line (`.r`): `Ref 30–100` etc.

| Marker | Value | Unit | Reference |
|---|---|---|---|
| Vitamin D | 24 | ng/mL | Ref 30–100 |
| LDL-C | 142 | mg/dL | Ref < 100 |
| Ferritin | 38 | ng/mL | Ref 30–300 |

### Column 5 — Status pill
Standard `.pill` — `.flag` or `.watch` variant.

### Column 6 — Chevron (`.fr-chev`)
```css
.fr-chev { color: var(--ink-faint); transition: transform 0.2s; }
.flagged-row.open .fr-chev { transform: rotate(90deg); color: var(--forest); }
```
Character: `<Ico.chevron/>` — 14×14 SVG, right-pointing angle.
Rotates 90° and colors Forest when row is expanded.

---

## Expansion panel (`.flagged-expand`)

Appears immediately after the open row. Not animated via max-height — it appears/disappears via conditional render (`open===i`).

```css
.flagged-expand {
  background: var(--paper-warm);
  padding: 24px 26px 26px;
  border-bottom: 1px solid var(--line-soft);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
}
```

Two columns:

### Left — Plain English (`.fe-plain`)
```css
.fe-plain {
  font-family: var(--serif);
  font-size: 19px;
  line-height: 1.4;
  letter-spacing: -0.01em;
}
```
- Label above: Geist Mono, Forest, tracking 0.14em: `PLAIN ENGLISH`
- The explanation sentence in Newsreader 400

| Marker | Explanation |
|---|---|
| Vitamin D | "Mildly low. Common in winter." |
| LDL-C | "Elevated, not alarming. Worth a conversation." |
| Ferritin | "In range but on the low end. Track it." |

### Right — Doctor question (`.fe-q`)
```css
.fe-q {
  font-family: var(--serif);
  font-size: 17px;
  line-height: 1.45;
  font-style: italic;
  font-weight: 300;
  color: var(--forest);
}
```
- Label above: Geist Mono, Forest, tracking 0.14em: `ASK YOUR DOCTOR`
- Question in Newsreader 300 italic, Forest color — rendered with quotation marks
- Ghost button below: `+ Add to my questions` — `.btn .btn-ghost`, Forest accent

| Marker | Question |
|---|---|
| Vitamin D | "Is 2,000 IU daily enough, or do I need a loading dose?" |
| LDL-C | "What's my 10-year cardiovascular risk score?" |
| Ferritin | "Would a full iron panel be useful?" |

---

## Sparkline component

Used in both this card (30px height, 110px width) and the Trends Grid (52px height, 260px width).

```jsx
function Sparkline({ values, status, refLow, refHigh, height=36, width=130 }) {
  // 1. Normalize values to SVG coordinates
  // 2. Build SVG path for line and area fill
  // 3. Optionally show reference range as a subtle green band
  // 4. End dot with pulsing outer ring
}
```

**Colors by status:**
| Status | Stroke | Fill |
|---|---|---|
| `flag` | `#C8563A` (Coral) | `#E8D4CC` (Coral-soft) |
| `watch` | `#6B756F` (Ink-soft) | `rgba(107,117,111,.15)` |
| `ok` | `#5A7A3F` (Leaf) | `#D7E0C6` (Leaf-soft) |

**Reference band:**
If `refLow` and `refHigh` are provided, a `<rect>` fills the area representing the healthy range with `rgba(90,122,63,.08)` — a very faint Leaf tint.

**End dot:**
- Solid circle at the last data point, `r=3`, fill = status color
- Outer ring: `r=5`, fill none, stroke = status color, opacity 0.3 — creates a subtle "halo"

**Trend data:**
| Marker | Values (oldest → newest) |
|---|---|
| Vitamin D | 34, 32, 28, 29, 26, 24 — steady decline |
| LDL-C | 118, 124, 131, 135, 138, 142 — steady rise |
| Ferritin | 72, 64, 58, 49, 44, 38 — steady decline |

---

## Interaction

- Only one row is open at a time (`open` state is a single index)
- Clicking an open row closes it (sets `open` to -1)
- Clicking a different row closes the current one and opens the new one
- State initialized to `0` — Vitamin D is open by default on first render

---

## Why this card works

- **Sparklines before numbers.** The eye reads the trend shape before it reads the number. A person sees "this is going down" before they see "24 ng/mL." Visual communication precedes cognitive.
- **Delta badge color is directional, not just status.** LDL going up gets Coral (bad). Vitamin D going down gets neutral grey (also bad, but different context). The colors match the *problem*, not just the direction.
- **Plain English + Doctor Question side by side.** The two-column expansion mirrors the product's core promise: understand it, then act on it. Not one without the other.
- **Newsreader italic for the doctor question.** The question is rendered the same way as italic accent phrases in headlines — Forest, italic, 300 weight. It signals "this is Lumen speaking" with the same visual voice.
- **`+ Add to my questions` ghost button.** Low commitment, clear action. The user can save the question to their "Doctor Q's" list with one click without leaving the dashboard home.

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
- @context/screenshots/dashboard-ui-1.png
- @context/screenshots/dashboard-ui-2.png
- @context/screenshots/dashboard-ui-3.png