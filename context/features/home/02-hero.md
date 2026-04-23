# 02 — Hero

The most important section on the site. Sets the tone in a single glance: editorial, calm, clinical-but-warm, and already doing the product's job in the visual on the right.

---

## Purpose

Three jobs:

1. **State the positioning in six words** — "Your lab results, in plain English."
2. **Show the product working, before anyone clicks** — the layered preview cards on the right are the pitch.
3. **Drive toward either CTA or sample** — two-tiered action: primary (Upload a report) and secondary (See a sample).

The hero is designed so a visitor can bounce in the first 3 seconds and still get the whole pitch from the imagery alone.

---

## Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ● Now reading 94 common panels          ┌──────────────┐          │
│                                          │ Raw report   │          │
│  Your lab results,                       │ HGB  13.4    │          │
│  in plain English.                       │ LDL  142 H   │          │
│                                          │ ...          │          │
│  Upload any lab report — blood           └──────────────┘          │
│  panel, metabolic, thyroid, hormones.        ┌────────────────┐    │
│  Lumen explains every number, flags          │ Plain English  │    │
│  what matters...                             │ ● LDL — 142    │    │
│                                              │   higher than…│    │
│  [Upload a report →]  [See a sample]         │ ● Vit D — 22   │    │
│                                              │   mildly def…  │    │
│  ~10 sec · PDF · Clinician-reviewed          │ ✓ HbA1c — 5.4  │    │
│                                              └────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

**Grid:** Two columns on desktop, stacked on mobile.
- Desktop: `grid-template-columns: 1.3fr 0.9fr` · gap 80px · `align-items: end`
- Below 1020px: single column, 48px gap, visual stacks below copy

**Section padding:** `120px 0 140px` (top padding slightly less — nav already provides breathing room)

---

## Left column — the copy

### 1. Eyebrow pill
- Component: shared `.eyebrow` (see 00-index)
- Copy: **"Now reading 94 common panels"**
- Why: signals product maturity and scope without being loud
- Animation: `.fade .d1`

### 2. Headline (H1)
- Font: Newsreader, weight 400
- Size: `clamp(48px, 7.5vw, 104px)`
- Line-height: `1`
- Letter-spacing: `-0.035em`
- Structure: two lines
  - Line 1: **"Your lab results,"** — regular roman
  - Line 2: **"in plain English."** — Newsreader italic 300, Forest color `#1F5041`, sized at `0.95em` to balance visually
- Margin-top: 28px (from eyebrow)
- Animation: `.fade .d2`

### 3. Sub-headline
- Font: Geist 400
- Size: `clamp(18px, 1.6vw, 20px)`
- Line-height: 1.55
- Color: `var(--ink-soft)` `#3D4842`
- Max-width: 520px
- Margin-top: 32px
- Copy:
  > "Upload any lab report — blood panel, metabolic, thyroid, hormones. Lumen explains every number, flags what matters, and hands you the exact questions to ask your doctor. No hedging. No diagnoses. No fluff."
- Animation: `.fade .d3`

### 4. CTA row
- Two buttons, `flex-wrap: wrap`, 12px gap, 40px margin-top
- **Primary:** "Upload a report →" — `.btn .btn-primary` (Ink bg, Paper text)
- **Secondary:** "See a sample" — `.btn .btn-secondary` (transparent, Line border)
- Both link to in-page anchors (`#upload`, `#sample`)
- Animation: `.fade .d4`

### 5. Hero meta strip
Below the CTAs, 48px down. Three data points in a horizontal flex row with 40px gap, 13.5px text, Ink-dim color.

Each meta item has two lines:
- Top line (Newsreader 500, 20px, Ink): the value
- Bottom line (Geist Mono 11px, tracking 0.14em, uppercase): the label

The three items:

| Value | Label |
|---|---|
| `~10 sec` | `average parse time` |
| `PDF, image, or photo` | `we handle the format` |
| `Reviewed by clinicians` | `MD & PharmD` |

Animation: `.fade .d5`

---

## Right column — the visual (the pitch)

A **layered, slightly-rotated composition** showing the before-and-after of the product. Two cards overlap to create visual depth and storytelling in a single glance. This is the hero's best idea — don't flatten it.

**Container:** `.hero-stack` — `position: relative; min-height: 560px; padding-top: 20px`

### Card A — Raw report slip (back layer)
Meant to look like a receipt or printed lab strip. Monospace, cold, mechanical.

- **Position:** absolute, top 0, left 0
- **Width:** 68% of container
- **Rotation:** `-4deg`, origin top-left
- **Background:** `#FDFAF3` (slightly lighter than Paper — feels like receipt paper)
- **Shadow:** `0 30px 50px -30px rgba(26,38,32,.25), 0 1px 0 rgba(26,38,32,.04)`
- **Border-radius:** 6px
- **Padding:** 28px 30px
- **z-index:** 1
- **Font:** Geist Mono throughout

**Header strip:**
- Mono 10px, tracking 0.18em, uppercase, Ink-dim color
- Copy: `"Raw report · Page 2 of 6"`
- Bottom: 1px dashed Line border, 10px padding-bottom, 18px margin-bottom

**Rows** (8 total, each `display:flex; justify-content:space-between`, 5px vertical padding, 12px text):
```
HGB             13.4 g/dL
LDL-C           142 mg/dL H     ← "H" in Coral, weight 500
HDL-C           58 mg/dL
TSH             2.1 mIU/L
Vit D, 25-OH    22 ng/mL  L     ← "L" in Coral, weight 500
HbA1c           5.4 %
ALT             28 U/L
Creat           0.9 mg/dL
```

**Fade-out effect:**
A bottom gradient overlay (`::after`) fades the bottom ~30% of the slip into Paper — makes it feel like the report continues off-screen.

### Card B — Plain English card (front layer)
The product's output, done right. Warm, serif-led, clearly organized.

- **Position:** absolute, top 170px, right 0
- **Width:** 82% of container
- **Rotation:** `+2deg`, origin top-right
- **Background:** `var(--paper-elev)` `#FBF8F1`
- **Border:** `1px solid var(--line-soft)`
- **Border-radius:** 14px
- **Padding:** 30px 32px
- **Shadow:** `0 40px 70px -30px rgba(26,38,32,.25), 0 2px 0 rgba(26,38,32,.03)`
- **z-index:** 2 (sits on top of raw slip)

**Header row** (`display:flex; justify-content:space-between; align-items:center`, 18px padding-bottom, Line-soft bottom border, 22px margin-bottom):
- Left: `"Lumen · Plain English"` — Geist Mono 10px, tracking 0.18em, uppercase, Ink-dim
- Right: `"2 flags · 6 normal"` — Geist Mono 10px in a Leaf-soft pill (Leaf text, `#D7E0C6` bg), 5px × 10px padding, 999px radius

**Marker items** (3 shown, each separated by Line-soft bottom border):

Each item has two parts:
1. **Row:** title + numeric
2. **Body:** plain-English explanation

Item 1 — **LDL Cholesterol** (flagged):
- Title row: serif 19px weight 500, with a 7px Coral dot prefix (flag bullet)
- Numeric: Mono 12px Ink-dim — `**142** · target <100` (the value in Ink, weight 500, 14px)
- Body (Geist 14px, line-height 1.55, Ink-soft):
  > "Your 'bad' cholesterol is [a bit higher than ideal]. Common and very manageable — usually addressed through diet, exercise, or medication depending on your risk."
- The bracketed phrase has a Leaf-soft background highlight (Ink text, 1px 6px padding, 3px radius)

Item 2 — **Vitamin D** (flagged):
- Same structure as item 1
- Numeric: `**22** · target 30–100`
- Body:
  > "You're [mildly deficient]. Very common, especially in winter. Most doctors recommend a supplement — ask yours about the right dose."
- Highlight has **warn variant** — Coral-soft bg, dark coral text `#8C3A26`

Item 3 — **HbA1c** (normal):
- Same structure but without the Coral bullet (use `.title.ok` to hide it)
- Numeric: `**5.4%** · normal`
- Body, no highlight:
  > "Your average blood sugar over the past 3 months is well within the healthy range. No signs of prediabetes."

---

## Animation

- Entire right column uses `.fade .d3` — fades in after headline and sub
- Cards are **not** individually animated inside — they fade in together as one composition
- The sibling `.fade` elements on the left cascade with `.d1 → .d5` (230ms stagger)

---

## Responsive behavior

| Viewport | Layout |
|---|---|
| ≥ 1020px | Two columns side by side, visual on right |
| < 1020px | Single column, visual drops below copy, gap becomes 48px |
| < 720px | Container padding drops to 20px; headline scales via clamp; meta strip wraps into 2 columns |
| < 560px | Raw slip rotation flattens to `-2deg`, Plain card to `+1deg` (less extreme on small screens) |

---

## Copy reference

```
EYEBROW       Now reading 94 common panels

HEADLINE      Your lab results,
              in plain English.        ← italic forest

SUB           Upload any lab report — blood panel, metabolic,
              thyroid, hormones. Lumen explains every number,
              flags what matters, and hands you the exact
              questions to ask your doctor. No hedging.
              No diagnoses. No fluff.

PRIMARY CTA   Upload a report →
SECONDARY CTA See a sample

META 1        ~10 sec / average parse time
META 2        PDF, image, or photo / we handle the format
META 3        Reviewed by clinicians / MD & PharmD
```

---

## Why this hero works

- **The visual is the thesis.** Two cards, one glance, no reading needed — "raw data → clear meaning." That's the entire product compressed into a single image.
- **The rotation is intentional.** Zero-rotation cards look like a template. The -4°/+2° tilt makes the composition feel handled, editorial, designed.
- **The italic forest accent on "in plain English"** is the signature that repeats across every headline on the site. Start it here.
- **The meta strip is quiet credibility.** Not testimonials, not trust badges — just three true facts about the product. More powerful than "trusted by 10,000 users."
