# 06 — Trust Callout ("What Lumen Won't Do")

A dark rounded callout block that inverts the page palette. The single strongest trust moment on the site. Instead of listing what Lumen does (there are six cards above for that), this section lists what Lumen **refuses** to do. Restraint as a brand promise.

---

## Purpose

- Counter the instinctive skepticism any AI health product faces: "Is this thing going to tell me I have cancer?"
- Make four specific, unambiguous commitments the visitor can grade us on later
- Shift visual rhythm — a dark, enclosed block after many light sections, before we go back to light for testimonials

This is the section that answers the question the visitor would ask a lawyer if they could.

---

## Layout

A **single self-contained rounded block** — not a full-bleed section. It sits inside the container, surrounded by Paper whitespace.

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  ┌────────────────────────────────────────────────────────┐   │
│  │                                                        │   │
│  │  ● What Lumen won't do                                 │   │
│  │                                                        │   │
│  │  We explain.          │  ● We never say "you have X." │   │
│  │  We do not diagnose.  │    No condition labels...     │   │
│  │                       │                               │   │
│  │  The line between     │  ● We show our sources.       │   │
│  │  useful context and   │    Every explanation links... │   │
│  │  medical advice is    │                               │   │
│  │  sharp...             │  ● We don't sell to insurers. │   │
│  │                       │    Your results never touch...│   │
│  │                       │                               │   │
│  │                       │  ● We defer to emergencies.   │   │
│  │                       │    If a value suggests...     │   │
│  │                                                        │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

- **Section wrapper:** Uses the `<section>` tag but with inline style override `border-top: none` — no divider above, since the callout handles its own containment
- **Section padding:** 140px vertical (standard)
- **Background:** Paper (default)

---

## The callout block (`.trust`)

### Container
- Background: `var(--ink)` `#1A2620` — the darkest surface on the site
- Color: `var(--paper)` `#F6F3EC` (base text color flips)
- Border-radius: 16px (slightly larger than standard cards — this is a hero element)
- Padding: `72px 56px` desktop · `48px 32px` mobile
- Grid: `grid-template-columns: 1fr 1fr`, 64px gap, `align-items: center`
- Below 860px: single column, 32px gap

---

## Left column — the thesis

### Eyebrow (dark variant)
- Base `.eyebrow` component but recolored
- Background: `rgba(168, 230, 207, 0.12)` — faint Mint tint
- Text color: `var(--mint)` `#A8E6CF`
- Pulse dot: Mint
- Copy: **"What Lumen won't do"**

### Headline (H2)
- Size: `clamp(32px, 4vw, 52px)` — slightly smaller than standard section H2 (the callout is narrower)
- Line-height: 1.05
- Letter-spacing: -0.025em
- Color: `var(--paper)` (inverted)
- Margin-top: 20px
- Structure:
  > "We explain. We do not [diagnose.]"
- `diagnose.` in italic — but **Mint color** `#A8E6CF`, not Forest (because we're on a dark surface)
- Font weight for italic: 300 (same as light-theme italic accents)

### Supporting paragraph
- Geist 400, 17px
- Color: `rgba(246, 243, 236, 0.7)` — Paper at 70% opacity
- Line-height: 1.6
- Margin-top: 24px
- Max-width: 460px
- Copy:
  > "The line between useful context and medical advice is sharp, and we stay on our side of it. Your clinician diagnoses and treats. Lumen makes sure you walk in knowing what to ask."

---

## Right column — the four commitments

A `<ul>` with 4 items. Each item is a grid row with a Mint dot marker and a text block.

### UL container
- `list-style: none; padding: 0; margin: 0`
- `display: flex; flex-direction: column; gap: 20px`

### LI item
- `display: grid; grid-template-columns: 28px 1fr; gap: 16px; align-items: start`
- Padding-bottom: 20px
- Bottom: `1px solid rgba(246, 243, 236, 0.12)` — faint Paper divider
- Last item: no border, no padding-bottom

#### The dot marker
- 8 × 8px circle
- Background: `var(--mint)` `#A8E6CF`
- Border-radius: 999px
- Margin-top: 9px (aligns with the baseline of the first line of text)

#### The text block
Two parts stacked:

1. **Strong label** (`<strong>`)
   - Newsreader 500, 18px
   - Color: `var(--paper)` (full white)
   - Display: block
   - Margin-bottom: 4px

2. **Supporting sentence** (`<span>`)
   - Geist 400, 14.5px
   - Color: `rgba(246, 243, 236, 0.7)`
   - Line-height: 1.5

---

## The 4 commitments — content

### Commitment 1
- **Label:** "We never say 'you have X.'"
- **Body:** "No condition labels, no prescriptions, no treatment recommendations. That's your doctor's job, and we don't replace it."

### Commitment 2
- **Label:** "We show our sources."
- **Body:** "Every explanation links to the guideline or study it draws from — USPSTF, ADA, AHA, NIH. No anonymous health-blog copy."

### Commitment 3
- **Label:** "We don't sell to insurers."
- **Body:** "Your results never touch a risk-scoring model, an advertiser, or a third party. Subscription-funded, on purpose."

### Commitment 4
- **Label:** "We defer to emergencies."
- **Body:** "If a value suggests an urgent issue, we say so plainly — and tell you to call your doctor or 911 instead of reading more."

---

## Animation

Single `.fade` on the entire callout wrapper. The whole block fades in as one composition — no internal stagger (it would feel busy on a dark surface).

---

## Dark-surface color mappings

When elements appear inside `.trust`, their accent colors shift:

| Light surface | Dark surface (inside `.trust`) |
|---|---|
| Forest `#1F5041` | Mint `#A8E6CF` |
| Ink-soft body text | Paper at 70% opacity |
| Line-soft borders | `rgba(246, 243, 236, 0.12)` |
| Paper-elev backgrounds | `rgba(168, 230, 207, 0.12)` for tint pills |

This is the pattern for every dark section on the site (this callout, the featured pricing card, the footer).

---

## Responsive

| Viewport | Adaptation |
|---|---|
| ≥ 860px | Two columns, 64px gap |
| < 860px | Single column, 32px gap, headline drops to smaller clamp value, right column appears below left |
| < 560px | Padding reduces to 40px 24px, bullet dot and text gap stay intact (the 28px+16px grid) |

---

## Copy reference

```
EYEBROW     What Lumen won't do

H2          We explain. We do not diagnose.
            (italic mint: "diagnose.")

SUB         The line between useful context and medical advice
            is sharp, and we stay on our side of it. Your
            clinician diagnoses and treats. Lumen makes sure
            you walk in knowing what to ask.

LI 1        We never say "you have X."
            No condition labels, no prescriptions, no treatment
            recommendations. That's your doctor's job, and we
            don't replace it.

LI 2        We show our sources.
            Every explanation links to the guideline or study
            it draws from — USPSTF, ADA, AHA, NIH. No anonymous
            health-blog copy.

LI 3        We don't sell to insurers.
            Your results never touch a risk-scoring model, an
            advertiser, or a third party. Subscription-funded,
            on purpose.

LI 4        We defer to emergencies.
            If a value suggests an urgent issue, we say so
            plainly — and tell you to call your doctor or 911
            instead of reading more.
```

---

## Why this section works

- **Inversion is the whole idea.** Every competitor's "trust" section is sunny and light with green checkmarks. Ours is a dark, enclosed box — visually quieter, textually harder.
- **"What Lumen won't do"** is a better headline than "Privacy" or "Our commitment" because it names a specific angle: restraint. The visitor immediately knows what's coming.
- **Named, specific lists.** "USPSTF, ADA, AHA, NIH" — four real acronyms that signal the team knows what they're doing. Much stronger than "peer-reviewed sources."
- **Mint instead of Forest** on dark surfaces isn't cosmetic — it's accessibility. Forest doesn't hit WCAG contrast ratios against Ink; Mint does.
- **The italic-accent signature carries through.** "Diagnose." in italic Mint is the same move as "In plain English" in italic Forest in the hero. The brand stays recognizable even when the palette flips.
