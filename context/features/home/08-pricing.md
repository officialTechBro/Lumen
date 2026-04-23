# 08 — Pricing

A three-tier pricing grid with a featured (dark, inverted) middle tier. Covers the three real user behaviors: one-off read, annual self-user, household caregiver.

---

## Purpose

- **Make the economics obvious** — no tier comparison matrix, no asterisks, no hidden fees
- **Route each user type to the right plan** via their actual situation, not their "persona"
- **Drive toward the middle tier** via visual hierarchy (featured card) but without trashing the bookends

---

## Layout

```
┌────────────────────────────────────────────────────────────────┐
│  ● Pricing                                                     │
│                                                                │
│  Honest pricing, no upsells.                                   │
│  Pay per report if you get labs once a year...                 │
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ SINGLE READ  │  │ LUMEN ANNUAL │  │ HOUSEHOLD    │         │
│  │              │  │ ▸MOST CHOSEN │  │              │         │
│  │   $9         │  │   $48        │  │   $96        │         │
│  │   per report │  │   / year     │  │   / year     │         │
│  │              │  │              │  │              │         │
│  │ For the one- │  │ For anyone   │  │ For families │         │
│  │ off annual.. │  │ who retests..│  │ caregivers..│         │
│  │              │  │              │  │              │         │
│  │ ─ One lab... │  │ ─ Unlimited..│  │ ─ Up to 6... │         │
│  │ ─ Plain...   │  │ ─ Multi-...  │  │ ─ Shared...  │         │
│  │ ─ Doctor...  │  │ ─ Flagged... │  │ ─ Caregiver..│         │
│  │ ─ ...        │  │ ─ ...        │  │ ─ ...        │         │
│  │              │  │              │  │              │         │
│  │ [Upload]     │  │ [Start year] │  │ [Add house.] │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                │
│  HSA / FSA eligible · Cancel any time · No ads, ever           │
└────────────────────────────────────────────────────────────────┘
```

- **ID anchor:** `#pricing`
- **Section padding:** 140px vertical
- **Background:** `var(--paper-warm)` `#EFEADF` — warm tint differentiates from neighbors
- **Top border:** 1px Line-soft

---

## Section header

### Eyebrow
- Copy: **"Pricing"**

### Headline (H2)
- Standard sizing
- Structure:
  > "Honest pricing, [no upsells.]"
- `no upsells.` in italic Forest

### Sub
- Copy:
  > "Pay per report if you get labs once a year. Subscribe if you track things closely, or if you're caring for someone who does."

---

## Pricing grid

- `display: grid`
- `grid-template-columns: repeat(3, 1fr)`
- `gap: 24px`
- Below 1020px: single column (all three tiers stack)

---

## Pricing card (`.price`)

### Base container (Tier 1 & Tier 3)
- Background: `var(--paper-elev)` `#FBF8F1`
- Border: 1px `var(--line-soft)`
- Border-radius: 16px (larger than feature cards — these are more consequential)
- Padding: `40px 36px`
- Display: `flex; flex-direction: column`
- Position: relative (needed for ribbon absolute positioning)
- Transition: `all 0.2s ease`

### Hover state
- `translateY(-4px)`
- Border → `var(--line)` (darker)

### Featured variant (Tier 2, `.featured`)
- Background: `var(--ink)` `#1A2620`
- Text color: `var(--paper)` flipped
- Border: 1px `var(--ink)` (matches bg)
- Hover: border → `var(--forest)` (subtle)

### Card anatomy (in order, top to bottom)

1. **Ribbon** (featured card only)
2. **Name label** (tier name in mono)
3. **Price** (big serif number)
4. **Description** (2-line sales pitch)
5. **Feature list** (5 items)
6. **CTA button** (pushed to bottom via `margin-top: auto`)

---

### 1. Ribbon
- Only on featured card (`.featured .ribbon`)
- Position: absolute, top `-12px`, right `28px`
- Background: `var(--mint)` `#A8E6CF`
- Color: `var(--ink)`
- Font: Geist Mono 500, 10px
- Tracking: 0.18em
- Uppercase
- Padding: 6px 12px
- Border-radius: 999px
- Copy: **"Most chosen"**

### 2. Name
- Font: Geist Mono 500, 11px
- Tracking: 0.18em
- Color: `var(--forest)` (default) → `var(--mint)` (featured)
- Margin-bottom: 20px
- Uppercase

### 3. Price
- Font: Newsreader 400, 64px
- Letter-spacing: -0.04em
- Line-height: 1
- Margin-bottom: 4px
- Inside the price, a `<small>` for the unit:
  - Font: Geist 400, 14px
  - Color: Ink-dim (default) → `rgba(246, 243, 236, 0.6)` (featured)
  - Margin-left: 6px
  - Letter-spacing: 0

### 4. Description (`.desc`)
- Font: Geist 400, 15px
- Color: Ink-soft (default) → `rgba(246, 243, 236, 0.7)` (featured)
- Line-height: 1.5
- Margin-top: 12px
- Margin-bottom: 28px

### 5. Feature list (`<ul>`)
- `list-style: none; padding: 0; margin: 0 0 36px`
- `display: flex; flex-direction: column; gap: 12px`

Each `<li>`:
- Font: Geist 400, 14.5px
- Line-height: 1.5
- Color: Ink-soft (default) → `rgba(246, 243, 236, 0.85)` (featured)
- `display: flex; gap: 12px; align-items: flex-start`
- `::before` pseudo-element: 14px × 1px horizontal rule
  - Background: Forest (default) → Mint (featured)
  - Margin-top: 10px (baseline alignment)

### 6. CTA button
- Width: 100%
- Justify-content: center
- `margin-top: auto` (pushes to bottom)

On base cards: `.btn-secondary` styling
On featured card: `.btn-primary` override — background `var(--paper)`, text `var(--ink)`, hover background → `var(--mint)`

---

## The three tiers — content

### Tier 1 — Single Read

- **Name:** `Single read`
- **Price:** `$9` + `per report`
- **Description:** "For the one-off annual physical. No account required, no follow-ups nudging you."
- **Features:**
  1. One lab report, fully read
  2. Plain-language explanation for every marker
  3. Doctor-question checklist
  4. Downloadable one-page summary
  5. Report auto-deletes after 30 days
- **CTA:** `Upload a report` (links to `#upload`)
- **Animation:** `.fade .d1`

### Tier 2 — Lumen Annual ★ FEATURED

- **Ribbon:** `Most chosen`
- **Name:** `Lumen annual`
- **Price:** `$48` + `/ year`
- **Description:** "For anyone who retests a few times a year. Track trends, hold history, stay on top of anything flagged."
- **Features:**
  1. Unlimited reports, one patient
  2. Multi-report trends & timelines
  3. Flagged-marker reminders (opt-in)
  4. Priority support, 24-hour response
  5. Keep or delete history — your call
- **CTA:** `Start your year` (primary variant)
- **Animation:** `.fade .d2`

### Tier 3 — Household

- **Name:** `Household`
- **Price:** `$96` + `/ year`
- **Description:** "For families, caregivers, and anyone managing a parent's care alongside their own."
- **Features:**
  1. Up to 6 people, separate histories
  2. Shared dashboard (with permissions)
  3. Caregiver summaries, written for you
  4. Export anything, any time
  5. Priority support, 24-hour response
- **CTA:** `Add your household` (secondary variant)
- **Animation:** `.fade .d3`

---

## Fine print

Below the grid, centered, 56px margin-top:

- Class: `.fine` (Mono 10px, tracking 0.14em, Ink-dim, uppercase)
- Animation: `.fade` (no delay)
- Copy: **"HSA / FSA eligible in most US plans · Cancel any time · No ads, ever"**

Three truthful, specific commitments — each separated by a middle dot (`·`).

---

## Copy reference

```
EYEBROW         Pricing

H2              Honest pricing, no upsells.
                (italic forest: "no upsells.")

SUB             Pay per report if you get labs once a year.
                Subscribe if you track things closely, or if
                you're caring for someone who does.

TIER 1          SINGLE READ
  PRICE         $9 per report
  DESC          For the one-off annual physical. No account
                required, no follow-ups nudging you.
  FEATURES      One lab report, fully read
                Plain-language explanation for every marker
                Doctor-question checklist
                Downloadable one-page summary
                Report auto-deletes after 30 days
  CTA           Upload a report

TIER 2 ★        LUMEN ANNUAL ▸ MOST CHOSEN
  PRICE         $48 / year
  DESC          For anyone who retests a few times a year.
                Track trends, hold history, stay on top of
                anything flagged.
  FEATURES      Unlimited reports, one patient
                Multi-report trends & timelines
                Flagged-marker reminders (opt-in)
                Priority support, 24-hour response
                Keep or delete history — your call
  CTA           Start your year

TIER 3          HOUSEHOLD
  PRICE         $96 / year
  DESC          For families, caregivers, and anyone managing
                a parent's care alongside their own.
  FEATURES      Up to 6 people, separate histories
                Shared dashboard (with permissions)
                Caregiver summaries, written for you
                Export anything, any time
                Priority support, 24-hour response
  CTA           Add your household

FINE PRINT      HSA / FSA eligible in most US plans ·
                Cancel any time · No ads, ever
```

---

## Responsive

| Viewport | Adaptation |
|---|---|
| ≥ 1020px | 3-column grid, featured card in middle |
| < 1020px | Single column — Single, Annual, Household in that order |
| < 560px | Card padding tightens to 32px 28px, price drops to 56px |

On mobile stack, the featured card is NOT pulled to the top. Order stays: Single → Annual → Household. The ribbon still signals "Most chosen."

---

## Why this section works

- **Three truly different use cases, not three arbitrary price points.** One-off, individual annual, household. Each corresponds to a real behavior, not a manufactured upgrade path.
- **No "Enterprise — contact sales."** That fourth tier signals the product is more interested in B2B than in you. Its absence is a choice.
- **"No upsells" in the H2** is a promise the checklist honors. No greyed-out "coming soon" features in the Free tier. No "upgrade for AI!" nudges.
- **Mint ribbon on the featured card** is one of the only two spots on the site (footer brand, this ribbon) where Mint appears on a warm light surface. Used sparingly, it reads as a crown — not a sale sticker.
- **"No ads, ever"** in the fine print is a quiet jab at every free health app that monetizes with dark patterns. It builds trust in the brand at the exact moment the visitor is asking, "What's the catch?"
