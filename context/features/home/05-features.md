# 05 — Features ("What You Get")

A 3-column × 2-row grid of six feature cards. Each card has an icon, a headline, body copy, and a mono-labeled tag at the bottom. This section exists for the visitor who's still evaluating — they've seen the sample, now they want to know what else is in the box.

---

## Purpose

- **List the concrete capabilities** of Lumen beyond the core translation (trends, summaries, questions, data rules, clinician review)
- **Validate the core claim with specificity** — not "everything you need" but six named things
- **Provide a scanner's moment** — after the content-heavy sample report, give the eye a tidy, rhythmic grid

This section is optimized for skimming. Headlines carry the weight. Body copy is there for the hover-and-read visitor.

---

## Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  ● What you get                                                  │
│                                                                  │
│  Everything a careful reader would find — faster.                │
│  Lumen isn't a chatbot. It's a structured read of your labs...  │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                       │
│  │ [icon]   │  │ [icon]   │  │ [icon]   │                       │
│  │ Context  │  │ Trends   │  │ Summary  │                       │
│  │ ...      │  │ ...      │  │ ...      │                       │
│  │ mono-tag │  │ mono-tag │  │ mono-tag │                       │
│  └──────────┘  └──────────┘  └──────────┘                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                       │
│  │ [icon]   │  │ [icon]   │  │ [icon]   │                       │
│  │ Questions│  │ Privacy  │  │ Reviewed │                       │
│  │ ...      │  │ ...      │  │ ...      │                       │
│  │ mono-tag │  │ mono-tag │  │ mono-tag │                       │
│  └──────────┘  └──────────┘  └──────────┘                       │
└──────────────────────────────────────────────────────────────────┘
```

- **ID anchor:** `#features`
- **Section padding:** 140px vertical
- **Background:** Paper `#F6F3EC` (default)
- **Top border:** 1px Line-soft

---

## Section header

Standard `.section-head` — 820px max-width, 72px margin-bottom.

### Eyebrow
- Copy: **"What you get"**

### Headline (H2)
- Standard section H2 sizing: `clamp(38px, 5.5vw, 68px)`, Newsreader 500
- Structure:
  > "Everything a careful reader would find — [faster.]"
- `faster.` in italic Forest

### Sub
- Geist 400, 19px, Ink-soft, max-width 640px, 24px margin-top
- Copy:
  > "Lumen isn't a chatbot. It's a structured read of your labs, built to slot into the 12-minute appointment you actually get."

---

## The grid

- `display: grid`
- `grid-template-columns: repeat(3, 1fr)`
- `gap: 24px`
- Below 1020px: `repeat(2, 1fr)`
- Below 720px: `1fr` single column

---

## Feature card (`.feature`)

Every card is identical in structure.

### Container
- Background: `var(--paper-elev)` `#FBF8F1`
- Border: 1px `var(--line-soft)`
- Border-radius: 12px
- Padding: 32px
- Display: `flex; flex-direction: column; gap: 16px`
- Transition: `all 0.2s ease`

### Hover
- `translateY(-4px)`
- Border → `var(--line)` (darker)
- Shadow: `0 20px 40px -30px rgba(26, 38, 32, 0.2)`

### Anatomy

1. **Icon well (`.ico`)** — top
2. **Headline (H3)**
3. **Body copy**
4. **Mono tag (`.mono-tag`)** — bottom, pushed down by `margin-top: auto`

#### 1. Icon well
- 40 × 40px
- Border-radius: 999px (full circle)
- Background: `rgba(31, 80, 65, 0.08)` — faint forest tint
- Display: flex, center-center
- Contains: 20 × 20 inline SVG, 1.5 stroke, Forest stroke color, round line joins

#### 2. Headline
- Newsreader 500, 22px
- Line-height: 1.2
- (Inherits H3 defaults from global: letter-spacing -0.02em, weight 500)

#### 3. Body
- Geist 400, 14.5px
- Color: Ink-soft
- Line-height: 1.6

#### 4. Mono tag
- Geist Mono 500, 10px
- Tracking: 0.14em
- Color: Ink-dim
- Uppercase (inherent from mono utility)
- Padded at top: 16px padding + 1px Line-soft top border
- Pushed to bottom of card via `margin-top: auto` on parent flex

---

## The 6 cards — content

### Card 1 — Context per marker

**Icon:** Clock face
- Circle at (10,10) r=7, 1.5 stroke Forest
- Two clock hands: M10 6 L10 10 L13 12, 1.5 stroke, round caps

**Headline:** "Context, not just numbers."

**Body:**
> "Every marker comes with a one-line meaning, a plain explanation of what it does in your body, and what 'high' or 'low' actually implies at this level — not just a color."

**Mono tag:** `Per-marker explainer`

Animation: `.fade .d1`

### Card 2 — Trends

**Icon:** Trendline with two dots
- Path: M3 14 L7 10 L11 13 L17 5, 1.5 stroke Forest, round joins
- Two filled Forest circles at (7,10) and (11,13), r=1.5

**Headline:** "Trends across every visit."

**Body:**
> "Upload two or more reports and Lumen shows how each marker has moved. Subtle drift matters — your clinician will thank you for catching it."

**Mono tag:** `Multi-report timeline`

Animation: `.fade .d2`

### Card 3 — One-page summary

**Icon:** Document with a folded corner
- Path M5 4 H13 L16 7 V16 H5 Z (document outline), 1.5 stroke Forest
- Path M13 4 V7 H16 (folded corner hint)
- Two horizontal lines inside representing text (x=8→13 at y=11, x=8→12 at y=13.5)

**Headline:** "A one-page summary."

**Body:**
> "A printable, plain-text summary you can hand to your doctor, family member, or a second-opinion specialist. The whole picture in sixty seconds of reading."

**Mono tag:** `PDF & share link`

Animation: `.fade .d3`

### Card 4 — Auto-generated questions

**Icon:** Circle with a question-mark-like arc
- Circle at (10,10) r=7, 1.5 stroke Forest
- Path M7 9 A3 3 0 0 1 13 9 V11 A3 3 0 0 1 7 11 Z — forms a stylized "?"

**Headline:** "Questions drafted for your appointment."

**Body:**
> "For every flagged marker, Lumen writes 2–4 specific, non-leading questions. Ask what matters. Don't leave the exam room wishing you'd said something."

**Mono tag:** `Auto-generated, editable`

Animation: `.fade .d1` (second row — delays reset for the second cascade)

### Card 5 — Privacy / data rules

**Icon:** Folder / calendar hybrid
- Rect (4,4) → (16,16) rounded 2, 1.5 stroke Forest
- Top horizontal line + two verticals at x=8, x=12 (tabs or calendar marks)
- One short horizontal inside (8→12 at y=12) with round caps

**Headline:** "Your data, your rules."

**Body:**
> "Reports are encrypted at rest and deleted on request. We never sell data to insurers, pharmacies, advertisers, or anyone else. Ever. Read the fine print — there isn't much."

**Mono tag:** `HIPAA-aligned storage`

Animation: `.fade .d2`

### Card 6 — Clinician review

**Icon:** Plus sign within a circle
- Cross: path M4 10 H16 M10 4 V16, 1.5 stroke Forest, round caps
- Circle at (10,10) r=7, 1.5 stroke Forest

**Headline:** "Reviewed by clinicians."

**Body:**
> "Every explanation template is drafted with a practicing MD and reviewed by a clinical pharmacist. Updates are logged. The receipts are on our methodology page."

**Mono tag:** `MD + PharmD reviewed`

Animation: `.fade .d3`

---

## Copy reference

```
EYEBROW       What you get

H2            Everything a careful reader would find — faster.
              (italic forest: "faster.")

SUB           Lumen isn't a chatbot. It's a structured read of
              your labs, built to slot into the 12-minute
              appointment you actually get.

CARD 1
  TITLE       Context, not just numbers.
  BODY        Every marker comes with a one-line meaning...
  TAG         Per-marker explainer

CARD 2
  TITLE       Trends across every visit.
  BODY        Upload two or more reports and Lumen shows...
  TAG         Multi-report timeline

CARD 3
  TITLE       A one-page summary.
  BODY        A printable, plain-text summary you can hand...
  TAG         PDF & share link

CARD 4
  TITLE       Questions drafted for your appointment.
  BODY        For every flagged marker, Lumen writes 2–4...
  TAG         Auto-generated, editable

CARD 5
  TITLE       Your data, your rules.
  BODY        Reports are encrypted at rest and deleted...
  TAG         HIPAA-aligned storage

CARD 6
  TITLE       Reviewed by clinicians.
  BODY        Every explanation template is drafted with...
  TAG         MD + PharmD reviewed
```

---

## Why this section works

- **Six is the right number.** Three looks thin after a content-heavy sample report. Nine would look desperate. Six fills a clean 3×2 grid.
- **The mono tag at the bottom is load-bearing.** It gives each card a little "receipt of truth" that's visually consistent even when headlines vary in length.
- **Icons are all stroke-based, 1.5px, Forest.** No duotone, no fills, no gradients. Visual consistency > visual variety at this density.
- **Card order is not random.** Progression: what you see per marker → across time → as a deliverable → for the next appointment → how data's handled → who's behind it. Each card answers a likely follow-up question from the previous one.
- **"Your data, your rules"** is intentionally combative for what's usually a dull privacy section. The brand voice shows up even in compliance copy.
