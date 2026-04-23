# 04 — Sample Report

The most content-dense section on the page. A fully interactive sample of what Lumen produces — a styled "report card" with expandable rows, range visualizations, and on-click plain-language explanations. This is the section that closes the sale. Everything else is setup for this.

---

## Purpose

- **Prove the product works** without making the visitor upload anything
- **Demonstrate the information architecture** of a real Lumen report — summary stats, individual markers, plain-English explanations, doctor questions
- **Invite interaction** — tapping a row is the first "use" of the product, in-page

Don't skimp on content here. The section earns its complexity — every element is doing work.

---

## Layout

```
┌───────────────────────────────────────────────────────────────────────┐
│                                                                       │
│  ┌─────────────────┐   ┌────────────────────────────────────────┐    │
│  │ ● Sample report │   │  Annual panel — March 14, 2026    [pill]│    │
│  │                 │   │  PATIENT ID · 7A21K · QUEST             │    │
│  │ This is what    │   ├──────────────────────────────────────────│    │
│  │ a real Lumen    │   │  Read time  Markers  In range  Flagged │    │
│  │ read looks like.│   │    11 sec     21       18        2     │    │
│  │                 │   ├──────────────────────────────────────────│    │
│  │ Tap any flagged │   │  Vitamin D    ●━━━━━━━━━   24 ng/mL  ›│    │
│  │ row to see...   │   │  ┌─ expansion: what it means ─┐        │    │
│  │                 │   │  │ plain line + 2 columns     │        │    │
│  │ ┌──────────┐    │   │  │ Why it matters | Ask your  │        │    │
│  │ │Flag: ...│    │   │  │                | doctor    │        │    │
│  │ │Watch: …  │   │   │  └────────────────────────────┘        │    │
│  │ │Normal: … │   │   │  LDL Cholesterol  ━━━●━━━ 142         ›│    │
│  │ └──────────┘    │   │  Ferritin         ●━━━━━━ 38          ›│    │
│  │                 │   │  HbA1c            ━━━●━━━ 5.4%         ›│    │
│  │ (fine print)    │   │  TSH              ━━━●━━━ 2.1           ›│    │
│  └─────────────────┘   └────────────────────────────────────────┘    │
└───────────────────────────────────────────────────────────────────────┘
```

- **ID anchor:** `#sample`
- **Section padding:** 140px vertical
- **Background:** `var(--paper-warm)` `#EFEADF` — warmer tint distinguishes this from neighbors
- **Top border:** 1px Line-soft

---

## Container grid

- `display: grid`
- `grid-template-columns: 1fr 1.15fr` — right column slightly wider (it's the showpiece)
- `gap: 56px`
- `align-items: start`
- Below 1020px: single column, 40px gap

---

## Left column — the pitch panel

### Eyebrow
- Shared `.eyebrow` with copy: **"Sample report"**

### Headline (H2)
- Custom size (smaller than standard section H2): `clamp(32px, 4vw, 52px)`
- Line-height: 1.05
- Letter-spacing: -0.03em
- Margin-top: 20px
- Structure:
  > "This is what a [real] Lumen read looks like."
- `real` in italic Forest (the signature accent)

### Supporting paragraph
- Geist 400, 18px
- Color: Ink-soft
- Line-height: 1.55
- Margin-top: 24px, margin-bottom: 40px
- Copy:
  > "Tap any flagged row to see the plain-language explanation and the questions Lumen drafted for this patient's next visit."

### Legend (`.report-legend`)
Three rows explaining the three status pills used in the report. Each row: pill + text block with a serif "strong" label and a sans explanation.

Container: `display:flex; flex-direction:column; gap: 14px`. Top border 1px Line-soft, 28px padding-top.

Each legend item (`.li`):
- `display: flex; gap: 14px; align-items: flex-start`
- The pill has 3px top margin to align with text baseline

Legend content:

**Flag** (Coral-soft pill, Coral text)
> **Something to raise now.** Out of range in a way that's worth a specific conversation with your clinician.

**Watch** (neutral grey pill, Ink-soft text)
> **Trending, not urgent.** In range or borderline, but the direction matters. Re-test on schedule.

**Normal** (Leaf-soft pill, Leaf text)
> **Looks fine.** Within the lab's reference range and your personal history, if we have it.

### Fine print footer
Below the legend, 40px margin-top, `.fine` typography (Mono 10px, tracking 0.14em, uppercase, Ink-dim):
> This sample uses synthetic data from a composite anonymous patient.
> Lumen does not provide medical advice or diagnose conditions.

---

## Right column — the report card

A tall, single card with several distinct regions stacked vertically. This is the star of the page.

### Container (`.report-card`)
- Background: `var(--paper-elev)` `#FBF8F1`
- Border: 1px Line-soft
- Border-radius: 16px
- `overflow: hidden` (crucial — keeps internal dividers flush)
- Shadow: `0 40px 80px -50px rgba(26,38,32,.3)`

### Region A — Header
- Padding: 24px 28px
- Background: `var(--paper-warm)` (slightly darker than card body — feels like a report header band)
- Bottom: 1px Line-soft
- Layout: `flex; justify-content: space-between; align-items: center`

Left side:
- Title: **"Annual panel — March 14, 2026"** (Newsreader 500, 20px)
- Subtitle: **"PATIENT ID · 7A21K · QUEST DIAGNOSTICS"** (Mono 10px, tracking 0.14em, Ink-dim, 4px top margin)

Right side:
- Status pill: **"2 flagged · 1 watch"** (Watch variant — neutral grey)

### Region B — Summary grid
- Padding: 28px
- Grid: 4 equal columns, no gap, internal Line-soft left borders on columns 2–4
- Bottom: 1px Line-soft

Each cell (`.cell`):
- 16px horizontal padding (first cell no left padding)
- Label on top (Mono 10px, tracking 0.14em, Ink-dim, 8px margin-bottom)
- Value below (Newsreader 500, 28px, tracking -0.02em)
- Value's unit suffix in `<small>` — Geist 12px, Ink-dim, 4px left margin (breaks the mono treatment)

Content:
| Label | Value |
|---|---|
| `Read time` | `11` + small `sec` |
| `Markers` | `21` |
| `In range` | `18` |
| `Flagged` | `2` (in Coral color) |

### Region C — Result rows

Five rows, each representing one biomarker. Rows are clickable to expand.

#### Row structure (`.result-row`)
- Padding: 20px 28px
- Bottom: 1px Line-soft (last row: none)
- Grid: `200px 1fr 140px 72px` columns, 24px gap, `align-items: center`
- Cursor pointer, background transition 0.15s on hover
- Hover: `rgba(31, 80, 65, 0.03)` background
- Expanded state: `rgba(31, 80, 65, 0.04)` background, chevron rotates 90° and colors Forest

#### Row columns, left to right:

**Column 1 — Name**
- Serif 500, 17px
- Below the name: `<small>` with Mono 10px, tracking 0.14em, Ink-dim — 3px top margin

**Column 2 — Range visualization (`.range-viz`)**
- Height: 6px, 999px radius, Line-soft background (full-width track)
- Inside: a Leaf-soft colored band showing the "in range" portion (`.range-band`, absolute-positioned with left/right percentages)
- On top: a dot indicator (`.range-dot`) at the patient's position
  - Default dot: Ink background, 3px Paper-elev stroke ring, 1px Ink outer ring shadow
  - `.flag` variant: Coral bg + Coral outer ring
  - `.watch` variant: Ink-soft bg + Ink-soft outer ring
- Dot sizing: 14×14, positioned with `translate(-50%, -50%)` and a `left: X%` value

**Column 3 — Value (`.val`)**
- Right-aligned
- Strong (the number + unit): Geist Mono 500, 14px, Ink, displayed as block with 2px bottom margin
- Below: Mono 13px, Ink-soft — the reference range (`Ref 30–100` etc.)

**Column 4 — Chevron (`.chev`)**
- Right-aligned, 18px, Ink-faint color
- Character: `›` (U+203A)
- Transition: `transform 0.2s`
- Expanded: `rotate(90deg)` and color Forest

#### Row expansion (`.result-expansion`)

Sibling element immediately following each row. Collapsed by default; expanded when its preceding row has `.expanded` class.

- Padding: 0 28px (closed) → 24px 28px 28px (open)
- Max-height: 0 → 600px
- Transition: `max-height 0.3s ease, padding 0.3s ease`
- Background: `var(--paper-warm)` (continuation of header tint)
- Bottom: 1px Line-soft

**Content structure inside expansion:**

1. A small mono label: `WHAT IT MEANS` — Mono 10px, Forest, tracking 0.14em, 8px margin-bottom
2. A "plain-language" sentence — Newsreader 400, 19px, line-height 1.4, letter-spacing -0.01em, 20px margin-bottom
   - The key phrase inside is italicized with inline `style="font-style:italic"` to get the italic serif without Forest color shift
3. A 2-column grid (`.grid`) below, 28px gap, collapses to 1 column under 720px:

**Left column — "Why it matters"**
- Mono label in Forest
- Geist 14.5px, Ink-soft, line-height 1.55 — one paragraph explaining the physiological meaning

**Right column — "Ask your doctor"**
- Mono label in Forest
- 1–3 questions, each as its own `<p>` with:
  - Font: Geist 14.5px, Ink-soft, line-height 1.55, 8px margin-bottom
  - Left padding 14px
  - Before the text, a `::before` pseudo-element: a 6px × 1px Forest horizontal rule at top 10px — acts as a bullet

---

## The 5 rows — content

### Row 1 — Vitamin D, 25-OH (Flag — EXPANDED BY DEFAULT)

| Field | Value |
|---|---|
| Name | `Vitamin D, 25-OH` |
| Small | `25(OH)D` |
| Band | left: 36%, right: 0% (target range is the right end of scale) |
| Dot | `.flag` at `left: 24%` (below range) |
| Value | `24 ng/mL` |
| Reference | `Ref 30–100` |

**Expansion content:**
- WHAT IT MEANS: "Your vitamin D is *mildly low*. Common, especially in winter or if you spend most days indoors."
- WHY IT MATTERS: "Vitamin D helps your body absorb calcium and supports immune function. Levels below 20 can contribute to fatigue and bone loss over years, not days."
- ASK YOUR DOCTOR:
  - Is 2,000 IU daily reasonable for me, or do I need a loading dose?
  - When should I retest — 3 months or 6?
  - Any diet or lifestyle changes worth pairing with the supplement?

### Row 2 — LDL Cholesterol (Flag)

| Field | Value |
|---|---|
| Name | `LDL Cholesterol` |
| Small | `LDL-C` |
| Band | left: 0%, right: 55% (target range is the left end) |
| Dot | `.flag` at `left: 72%` (above range) |
| Value | `142 mg/dL` |
| Reference | `Ref < 100` |

**Expansion content:**
- WHAT IT MEANS: "LDL is *elevated*, not alarming. It's one of several numbers your doctor weighs before recommending action."
- WHY IT MATTERS: "LDL correlates with cardiovascular risk over decades. Guidelines treat the number alongside your age, blood pressure, family history, and other labs."
- ASK YOUR DOCTOR:
  - What's my 10-year cardiovascular risk score?
  - Is diet and exercise the right first step, or should we discuss medication?
  - Should I get an apoB or Lp(a) test for a clearer picture?

### Row 3 — Ferritin (Watch)

| Field | Value |
|---|---|
| Name | `Ferritin` |
| Small | `Iron stores` |
| Band | left: 14%, right: 14% (wide middle) |
| Dot | `.watch` at `left: 22%` (low end of range) |
| Value | `38 ng/mL` |
| Reference | `Ref 30–300` |

**Expansion content:**
- WHAT IT MEANS: "In range, but on the *low end*. Worth tracking if you've been unusually tired."
- WHY IT MATTERS: "Ferritin reflects how much iron your body has stored. Many people feel symptoms before the number drops below 'normal' — it's reasonable to discuss."
- ASK YOUR DOCTOR:
  - Would a full iron panel (iron, TIBC, saturation) be useful?
  - Any reason my stores dropped since last year?
  - When should we re-check?

### Row 4 — Hemoglobin A1c (Normal)

| Field | Value |
|---|---|
| Name | `Hemoglobin A1c` |
| Small | `HbA1c` |
| Band | left: 0%, right: 30% |
| Dot | default (Ink) at `left: 48%` |
| Value | `5.4 %` |
| Reference | `Ref < 5.7` |

**Expansion content:**
- WHAT IT MEANS: "Your 3-month blood sugar average looks *healthy*. No action needed."
- WHY IT MATTERS: "A1c is the gold-standard read on diabetes risk. You're comfortably below the prediabetes threshold (5.7%). Most clinicians check this once a year."
- ASK YOUR DOCTOR:
  - Is annual re-testing the right cadence given my family history?

### Row 5 — TSH (Normal)

| Field | Value |
|---|---|
| Name | `TSH` |
| Small | `Thyroid` |
| Band | left: 10%, right: 10% (wide range) |
| Dot | default at `left: 40%` |
| Value | `2.1 μIU/mL` |
| Reference | `Ref 0.4–4.0` |

**Expansion content:**
- WHAT IT MEANS: "Thyroid signal is *right in the middle* of normal. Nothing to do here."
- WHY IT MATTERS: "TSH is your pituitary's thyroid thermostat. A mid-range value rules out both an under- and over-active thyroid for most purposes."
- ASK YOUR DOCTOR:
  - Is full thyroid testing (Free T4, T3) warranted given my symptoms?

---

## Interaction behavior

- On page load: **Row 1 (Vitamin D) is expanded by default**. This is crucial — a new visitor instantly sees the full experience without having to click.
- On row click: close any currently-expanded row, then expand the clicked row (unless it was already open — in which case just close it).
- Only one row open at a time.
- Smooth height transition: `max-height: 0 → 600px` over 0.3s.
- Chevron rotates 90° with a color shift to Forest.
- Row background subtly tints (0.04 Forest) when expanded.

---

## Animation

- Section header elements: `.fade`, `.fade .d1`, `.fade .d2`, `.fade .d3` for cascade
- Report card: `.fade .d2`
- Fine-print footer: `.fade .d4`

Rows themselves are **not** scroll-animated — they're revealed as a single unit when the card fades in.

---

## Responsive

| Viewport | Adaptation |
|---|---|
| ≥ 1020px | 2-column grid (pitch | report) |
| < 1020px | Single column — pitch panel above, report below |
| < 720px | Result rows restructure: name + value stack, range-viz full-width, chevron becomes smaller. Grid inside expansion collapses to 1 column |
| < 560px | Summary stats (region B) drop to 2×2 grid instead of 4×1 |

---

## Why this section works

- **It's the product.** Everything before this section describes Lumen. This section *is* Lumen — a real-feeling sample that behaves like the app.
- **The expanded-by-default row** removes the "what happens when I click" friction. First-time visitors see the payoff immediately.
- **The range visualization is legible in 0.3 seconds.** A colored band, a dot, a status color. Anyone can parse it without reading numbers.
- **Three distinct status colors** (Coral/neutral/Ink) match the three-pill legend on the left. Everything cross-references.
- **The header's mono ID string** (`7A21K · QUEST DIAGNOSTICS`) adds credibility. It feels like a real medical document, not a mockup.
