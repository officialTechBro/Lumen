# 07 — Testimonials ("Why People Use It")

A 2×2 grid of four user quotes. Rare for a health product — most go with clinical-sounding "trusted by 50,000 patients" numbers. Lumen uses actual voices of four distinct user types, each addressing a different objection.

---

## Purpose

- Show that real humans — with specific, believable stories — use Lumen
- Cover four user archetypes in one section: **the underprepared patient, the ignored-result patient, the clinical recommender, the caregiver**
- Reinforce the brand voice by putting matching tone in the quotes themselves

This is a light section — a breather after the dark callout above, before the heavier pricing section below.

---

## Layout

```
┌────────────────────────────────────────────────────────────────┐
│  ● Why people use it                                           │
│                                                                │
│  Built for the twelve minutes you actually get                 │
│  with your doctor.                                             │
│                                                                │
│  ┌─────────────────────────┐  ┌─────────────────────────┐     │
│  │ "I used to leave        │  │ "The vitamin D thing    │     │
│  │  appointments           │  │  had been flagged for   │     │
│  │  realizing I'd nodded   │  │  three years and        │     │
│  │  through half of it..." │  │  nobody explained..."   │     │
│  │ ───────────             │  │ ───────────             │     │
│  │ Hannah R.         annual│  │ Marco D.       routine  │     │
│  └─────────────────────────┘  └─────────────────────────┘     │
│  ┌─────────────────────────┐  ┌─────────────────────────┐     │
│  │ "I'm a nurse. I         │  │ "My dad is 74 and       │     │
│  │  recommend this to..."  │  │  doesn't trust most..." │     │
│  │ ───────────             │  │ ───────────             │     │
│  │ Priya S., RN   clinical│  │ Evan K.    parent care  │     │
│  └─────────────────────────┘  └─────────────────────────┘     │
└────────────────────────────────────────────────────────────────┘
```

- **Section padding:** 140px vertical
- **Background:** Paper `#F6F3EC` (default)
- **Top border:** 1px Line-soft

---

## Section header

### Eyebrow
- Copy: **"Why people use it"**

### Headline (H2)
- Standard section sizing: `clamp(38px, 5.5vw, 68px)`
- Structure:
  > "Built for the [twelve minutes] you actually get with your doctor."
- `twelve minutes` in italic Forest — specific, pointed, memorable

No sub paragraph — the headline is the thesis, and quotes do the rest.

---

## The quotes grid

- `display: grid`
- `grid-template-columns: repeat(2, 1fr)`
- `gap: 32px`
- Below 860px: single column

---

## Quote card (`.quote`)

### Container
- Background: `var(--paper-elev)` `#FBF8F1`
- Border: 1px Line-soft
- Border-radius: 12px
- Padding: **40px 36px** (more generous than feature cards — breathing room for long quotes)

No hover lift on testimonial cards. They are static — these feel like quiet documents, not interactive cards.

### Anatomy
1. **Blockquote** — the quote itself
2. **"who" row** — name + context line

#### Blockquote
- Font: Newsreader 400 (regular weight — lighter than headlines to read well at 24px)
- Size: 24px
- Line-height: 1.35
- Letter-spacing: -0.015em
- Margin: 0 0 24px 0
- Wrapped in `<blockquote>` for semantics
- No quotation marks as CSS decoration — the real `"` characters are in the copy (straight quotes, not curly)

#### Who row (`.who`)
- `display: flex; justify-content: space-between; align-items: baseline`
- Top: `1px solid var(--line-soft)`, 20px padding-top

Left side:
- Font: Newsreader 500, 16px
- The person's name

Right side:
- Font: Geist Mono 500, 10px
- Tracking: 0.14em
- Color: Ink-dim
- Context line — city and reason they were using the product

---

## The four quotes — content

### Quote 1 — Hannah R., Portland

**Quote:**
> "I used to leave appointments realizing I'd nodded through half of it. Now I walk in with a page. My doctor said it was the best-prepared patient visit she'd had that month."

**Name:** Hannah R.
**Context:** Portland · annual physical

**Addresses:** The "I blank out in my doctor's office" pain. Shows the product's value is in preparation, not during the appointment.

Animation: `.fade .d1`

### Quote 2 — Marco D., Brooklyn

**Quote:**
> "The vitamin D thing had been flagged for three years and nobody explained it. Lumen did, in two sentences. I'm on a supplement now and my energy is back."

**Name:** Marco D.
**Context:** Brooklyn · routine bloodwork

**Addresses:** The "nobody actually explains the flagged values" pain. Shows the product catches things that rushed appointments miss. Ends with a real outcome.

Animation: `.fade .d2`

### Quote 3 — Priya S., RN, Austin

**Quote:**
> "I'm a nurse. I recommend this to every patient who tells me they googled their results at 2am and spiraled. It's the opposite of WebMD — calm, specific, and grown-up."

**Name:** Priya S., RN
**Context:** Austin · clinical

**Addresses:** Credibility. A clinician endorsing it is the strongest social proof. The "opposite of WebMD" phrasing does competitive positioning without naming a competitor directly.

Animation: `.fade .d3`

### Quote 4 — Evan K., Chicago

**Quote:**
> "My dad is 74 and doesn't trust most tech. He trusts this because it looks like a medical report, not a feed. That's a real design choice and I noticed."

**Name:** Evan K.
**Context:** Chicago · parent care

**Addresses:** The skeptical older-demographic angle and the caregiver use case. Also compliments the design directly, which signals that the audience is sophisticated.

Animation: `.fade .d4`

---

## Copy reference

```
EYEBROW    Why people use it

H2         Built for the twelve minutes you actually get
           with your doctor.
           (italic forest: "twelve minutes")

QUOTE 1    "I used to leave appointments realizing I'd nodded
           through half of it. Now I walk in with a page. My
           doctor said it was the best-prepared patient visit
           she'd had that month."
           Hannah R. · Portland · annual physical

QUOTE 2    "The vitamin D thing had been flagged for three
           years and nobody explained it. Lumen did, in two
           sentences. I'm on a supplement now and my energy
           is back."
           Marco D. · Brooklyn · routine bloodwork

QUOTE 3    "I'm a nurse. I recommend this to every patient
           who tells me they googled their results at 2am and
           spiraled. It's the opposite of WebMD — calm,
           specific, and grown-up."
           Priya S., RN · Austin · clinical

QUOTE 4    "My dad is 74 and doesn't trust most tech. He trusts
           this because it looks like a medical report, not
           a feed. That's a real design choice and I noticed."
           Evan K. · Chicago · parent care
```

---

## Voice notes

Every quote sounds like a real adult speaking naturally — that's the test. If it sounds like marketing copy ("Lumen transformed my health journey!"), it's wrong. Red flags to avoid:

- Exclamation points
- "Amazing" / "incredible" / "life-changing"
- Perfect grammar that sounds written rather than spoken
- The product name used more than once per quote
- Hedging ("It's pretty good!") — quotes should be confident

Every quote:
- Sounds like it came from a specific person in a specific context
- Has a small real detail (vitamin D, 2am, age 74, "that month")
- Starts mid-thought — no "I was so worried about my lab results, and then..."
- Ends with a landing line that's short

---

## Responsive

| Viewport | Adaptation |
|---|---|
| ≥ 860px | 2×2 grid |
| < 860px | Single column, all four stack vertically |
| < 560px | Quote blockquote drops to 22px (from 24px), padding tightens to 32px 28px |

---

## Why this section works

- **Four archetypes, not four glowing fans.** A patient, a patient with a history, a clinician, a caregiver — each one answers a different question the visitor is asking in their head.
- **Mono context line balances the serif name.** Typographic tension: the name feels warm and human (serif), the context feels clinical and specific (mono). Together: warm professional.
- **No photos.** No stock-photo faces, no "verified" checkmarks, no star ratings. The testimonial card is just typography — which is more trustworthy because it's harder to fake and easier to read.
- **"That's a real design choice and I noticed"** (quote 4) is a wink to any designer or product person evaluating the site. Small, but it lands.
