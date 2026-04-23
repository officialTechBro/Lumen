# 03 — How It Works

A three-step explainer section. Compresses the entire product experience into three named beats: **Upload → Read → Ask**. Each step has a small illustration, a monospace label, a serif headline, and two sentences of body copy.

---

## Purpose

- Reassure uncertain visitors that there's nothing to learn — the product is genuinely three steps
- Name each step memorably: **Upload / Read / Ask** — short enough to hold in one thought
- Leave the visitor pointed at the next section (the interactive sample) so they can see step 2 play out

This section is scannable. Nobody reads all three bodies. The labels + headlines do 80% of the work.

---

## Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  ● How it works                                                  │
│                                                                  │
│  Three steps. No jargon, no gatekeeping.                         │
│  Lumen reads your report the way a careful primary care          │
│  doctor would — then translates.                                 │
│                                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐                   │
│  │ [upload] │    │ [bars]   │    │ [list]   │                   │
│  │          │    │          │    │          │                   │
│  │ 01 UPLOAD│    │ 02 READ  │    │ 03 ASK   │                   │
│  │          │    │          │    │          │                   │
│  │ Drop the │    │ Each     │    │ Walk in  │                   │
│  │ PDF your │    │ number   │    │ prepared │                   │
│  │ clinic   │    │ explained│    │          │                   │
│  │ sent     │    │ like a   │    │ Lumen    │                   │
│  │          │    │ person   │    │ writes   │                   │
│  └──────────┘    └──────────┘    └──────────┘                   │
└──────────────────────────────────────────────────────────────────┘
```

- **ID anchor:** `#how`
- **Section padding:** 140px vertical (80px mobile)
- **Background:** Paper (`#F6F3EC`) — default, no tint
- **Top border:** `1px solid var(--line-soft)` — separates from hero

---

## Section header

Uses the shared `.section-head` pattern — max-width 820px, 72px margin-bottom.

### Eyebrow pill
- Shared `.eyebrow` component
- Copy: **"How it works"**

### Headline (H2)
- Font: Newsreader 500
- Size: `clamp(38px, 5.5vw, 68px)`
- Line-height: 1.04
- Letter-spacing: -0.03em
- Margin-top: 20px
- Structure:
  > "Three steps. [No jargon,] no gatekeeping."
- "No jargon," is in `.italic` — Newsreader italic 300, Forest `#1F5041`

### Sub
- Geist 400, 19px
- Color: `var(--ink-soft)`
- Max-width: 640px
- Margin-top: 24px
- Copy:
  > "Lumen reads your report the way a careful primary care doctor would — then translates. You stay in control of what your clinician sees."

---

## The three steps

Three equal-width cards in a CSS grid. Identical structure. Different illustrations and copy.

### Card container (`.step`)
- Background: `var(--paper-elev)` `#FBF8F1`
- Border: `1px solid var(--line-soft)`
- Border-radius: 12px
- Padding: 32px
- Transition: `all 0.2s ease`

### Hover
- `transform: translateY(-4px)`
- Border shifts to `var(--line)` (darker)
- Shadow: `0 20px 40px -30px rgba(26, 38, 32, 0.3)`

### Grid
- `display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px`
- Below 860px: single column

### Card anatomy

Every card has, in order from top to bottom:

1. **Illustration box** (`.step-viz`)
2. **Step label** (`.num`)
3. **Headline** (H3)
4. **Body copy**

#### 1. Illustration box
- Height: 140px
- Background: `var(--paper-warm)` `#EFEADF`
- Border: `1px solid var(--line-soft)`
- Border-radius: 8px
- Margin-bottom: 24px
- Inline SVG centered inside (see per-card specs below)
- SVG `preserveAspectRatio="xMidYMid meet"`, 100% width, 100% height, viewBox 300×140

#### 2. Step label
- Font: Geist Mono 500, 11px
- Tracking: 0.18em
- Color: `var(--forest)` `#1F5041`
- Margin-bottom: 24px
- Format: `01 — Upload` (zero-padded number, em dash, capitalized verb)

#### 3. Headline
- Font: Newsreader 500, 24px
- Line-height: 1.2
- Margin-bottom: 12px

#### 4. Body
- Font: Geist 400, 15px
- Line-height: 1.6
- Color: `var(--ink-soft)`

---

## The three steps — content

### Step 1 — Upload

**Illustration:** Document + upload glyph
- Rectangle card (110,28 → 190,128, radius 6) — Paper-elev fill, Line stroke
- Six horizontal placeholder lines inside representing text
- A solid Forest circle (cx=150 cy=40 r=14) sitting centered at the top edge of the card, containing a white upward-arrow glyph (stroke-width 1.8, line-cap round)

Visual metaphor: a document being pushed into the app.

**Label:** `01 — Upload`
**Headline:** "Drop the PDF your clinic sent."
**Body:**
> "Works with results from Quest, Labcorp, Kaiser, and every major hospital system. Photos of printed reports work too. We support 94 panels and counting."

### Step 2 — Read

**Illustration:** Four horizontal bars with colored status dots
- 4 stacked bar pairs (grey track + colored progress fill) with a colored circle at the end indicating status
- Bar 1: 170/220 filled (Leaf-soft over Line-soft), Leaf dot (`#5A7A3F`) at x=180 — normal
- Bar 2: 110/220 filled, Coral dot (`#C8563A`) at x=235 — flagged
- Bar 3: 150/220 filled, Ink dot at x=155 — watch
- Bar 4: 130/220 filled, Ink dot at x=120 — watch
- All dots have a 2px Paper-elev stroke ring (contrast from the bar)

Visual metaphor: a triaged list — some normal, some flagged, some watching.

**Label:** `02 — Read`
**Headline:** "Each number, explained like a person."
**Body:**
> "We tell you what it measures, what your result means in context, and whether it's normal, worth watching, or worth asking about. Two sentences, not a textbook chapter."

### Step 3 — Ask

**Illustration:** Three stacked question boxes
- 3 rounded rectangles (40,24 → 260,48 and same x-range stacked at y=56 and y=88, radius 4)
- Fill: Paper-elev, stroke: Line
- Each contains Geist Mono 10px text in Ink-dim with a `→` prefix:
  - `→ What could be causing the low D?`
  - `→ Should I retest in 3 months?`
  - `→ Is supplementation enough, or...?`

Visual metaphor: a ready-to-go question list.

**Label:** `03 — Ask`
**Headline:** "Walk into your appointment prepared."
**Body:**
> "Lumen writes a short, specific list of questions for your clinician — the kind that would take an hour of searching to come up with. Save it, print it, or hand them your phone."

---

## Animation

Standard fade-up-on-scroll. Each card staggered:
- Card 1: `.fade .d1` (0.1s delay)
- Card 2: `.fade .d2` (0.2s delay)
- Card 3: `.fade .d3` (0.35s delay)

The section header (eyebrow + H2 + sub) uses a single `.fade` — no internal stagger needed.

---

## Copy reference

```
EYEBROW    How it works

H2         Three steps. No jargon, no gatekeeping.
           (italic forest: "No jargon,")

SUB        Lumen reads your report the way a careful primary
           care doctor would — then translates. You stay in
           control of what your clinician sees.

STEP 01    UPLOAD
TITLE      Drop the PDF your clinic sent.
BODY       Works with results from Quest, Labcorp, Kaiser, and
           every major hospital system. Photos of printed
           reports work too. We support 94 panels and counting.

STEP 02    READ
TITLE      Each number, explained like a person.
BODY       We tell you what it measures, what your result means
           in context, and whether it's normal, worth watching,
           or worth asking about. Two sentences, not a textbook
           chapter.

STEP 03    ASK
TITLE      Walk into your appointment prepared.
BODY       Lumen writes a short, specific list of questions for
           your clinician — the kind that would take an hour of
           searching to come up with. Save it, print it, or
           hand them your phone.
```

---

## Why this section works

- **Verb-first step names.** Upload, Read, Ask. Every word is a verb the visitor can do. Nothing abstract ("Analyze" or "Discover"), nothing marketing-y ("Transform your health").
- **Illustrations are information, not decoration.** The middle card literally shows what triage looks like. The third card literally shows a question list. A visitor who only looks at the pictures still understands the product.
- **"No jargon, no gatekeeping"** — the italic accent phrase doubles as brand values. Not just what the product does, but what it refuses to do.
- **Card hover lift is consistent** with the feature grid later on — same 4px translate, same shadow. Builds a visual system.
