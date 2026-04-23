# 11 — Footer

The page's dark anchor. Five columns of navigation links, a brand block with the Mint version of the logo, and a bottom legal row. Serves the housekeeping role without looking like a housekeeper.

---

## Purpose

- **Close the page with weight.** A dark surface after all the warm paper grounds the whole page in seriousness.
- **Give the visitor quick routes** to Product, Company, Resources, and Legal — all without cluttering the main nav
- **Surface the legal disclaimer** ("Not a substitute for medical advice") one final time in an unambiguous place
- **Re-assert the brand** with the Lumen mark in Mint — a small flourish that pairs the footer with the dark trust callout above

---

## Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ┌────────────┐  ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌────────┐   │
│  │ ◉ Lumen    │  │ PRODUCT │ │ COMPANY │ │ RESOURCES│ │ LEGAL  │   │
│  │            │  │         │ │         │ │          │ │        │   │
│  │ Your lab   │  │ How     │ │ About   │ │ Guides   │ │ Privacy│   │
│  │ results,   │  │ Sample  │ │ Method. │ │ Clinical │ │ Terms  │   │
│  │ in plain   │  │ Features│ │ Review  │ │ Caregiver│ │ HIPAA  │   │
│  │ English.   │  │ Pricing │ │ Press   │ │ Questions│ │ Security│  │
│  │ Subscript- │  │ Panels  │ │ Careers │ │ Support  │ │ Data   │   │
│  │ ion-funded.│  │         │ │         │ │          │ │        │   │
│  └────────────┘  └─────────┘ └─────────┘ └──────────┘ └────────┘   │
│  ─────────────────────────────────────────────────────────────────  │
│  © 2026 Lumen · Not a substitute for medical advice · Brooklyn      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

- **Element:** `<footer>`
- **Padding:** 96px top, 48px bottom
- **Background:** `var(--ink)` `#1A2620`
- **Color:** `var(--paper)` `#F6F3EC` (inverted from page)
- **No top border** — seamless transition from the CTA band's warm paper straight into the ink of the footer (the contrast does the job)

---

## Container

Standard container: `max-width: 1280px`, 32px horizontal padding (20px mobile).

---

## Top section — 5 columns (`.cols`)

- `display: grid`
- `grid-template-columns: 1.3fr 1fr 1fr 1fr 1fr` — brand column is widest
- `gap: 48px`
- Padding-bottom: 56px
- Bottom border: `1px solid rgba(246, 243, 236, 0.1)` — a faint Paper divider
- Below 860px: `grid-template-columns: 1fr 1fr` with 40px gap — five items wrap into a 2-column stack

---

### Column 1 — Brand (`.brand-col`)

**Brand lockup**
- Same structure as the nav brand: 22 × 22 SVG mark + "Lumen" wordmark
- **Mark is Mint** (`#A8E6CF`) here, not Forest — this is the dark-surface variant:
  ```svg
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="10" stroke="#A8E6CF" stroke-width="1.5"/>
    <path d="M6 11 Q 11 5, 16 11 T 6 11" fill="#A8E6CF"/>
  </svg>
  ```
- Wordmark: "Lumen" in Newsreader 500, 22px, tracking -0.02em, color `var(--paper)`
- Gap between mark and wordmark: 10px
- Margin-bottom: 20px

**Tagline paragraph**
- Font: Geist 400, 14.5px
- Color: `rgba(246, 243, 236, 0.6)` — Paper at 60% opacity
- Max-width: 280px
- Line-height: 1.55
- Copy:
  > "Your lab results, in plain English. Subscription-funded, clinician-reviewed, and designed to be handed to your doctor."

---

### Columns 2–5 — Link columns

Each link column has the same structure: a mono heading + an unordered list of links.

#### Heading (`<h4>`)
- Font: Geist Mono 500, 11px
- Tracking: 0.18em
- Color: `var(--mint)` `#A8E6CF` — the brand accent, only used on dark surfaces
- Text-transform: uppercase
- Font-weight: 500
- Margin-bottom: 20px

#### List (`<ul>`)
- `list-style: none; padding: 0; margin: 0`
- `display: flex; flex-direction: column; gap: 12px`

#### Link (`<li><a>`)
- Font: Geist 400, 14.5px
- Color: `rgba(246, 243, 236, 0.72)` — Paper at 72% opacity
- No underline
- Hover: color → `var(--paper)` full opacity, no underline added

---

### Column contents

#### Column 2 — **Product**
- How it works → `#how`
- Sample report → `#sample`
- Features → `#features`
- Pricing → `#pricing`
- Supported panels → (external page, future)

#### Column 3 — **Company**
- About
- Methodology
- Clinical review
- Press
- Careers

#### Column 4 — **Resources**
- Reading guides
- For clinicians
- For caregivers
- Questions → `#faq`
- Support

#### Column 5 — **Legal**
- Privacy
- Terms
- HIPAA
- Security
- Data request

---

## Bottom section — legal row (`.legal`)

Below the 5-column top section, separated by the 1px faint divider.

- Padding-top: 32px
- Display: `flex; justify-content: space-between; gap: 24px`
- Flex-wrap: wrap
- Font: Geist Mono 500, 10px
- Tracking: 0.14em
- Uppercase
- Color: `rgba(246, 243, 236, 0.5)` — Paper at 50% opacity

Three items, left → middle → right:

1. `© 2026 Lumen Health, Inc.`
2. `Not a substitute for medical advice, diagnosis, or treatment.`
3. `Made in Brooklyn & Oakland`

On narrow viewports: items wrap to new lines but keep the 24px gap.

---

## Copy reference

```
BRAND BLOCK
  Mark            Mint-colored Lumen glyph
  Wordmark        Lumen
  Tagline         Your lab results, in plain English.
                  Subscription-funded, clinician-reviewed,
                  and designed to be handed to your doctor.

COLUMN HEADINGS
  PRODUCT
  COMPANY
  RESOURCES
  LEGAL

PRODUCT
  How it works
  Sample report
  Features
  Pricing
  Supported panels

COMPANY
  About
  Methodology
  Clinical review
  Press
  Careers

RESOURCES
  Reading guides
  For clinicians
  For caregivers
  Questions
  Support

LEGAL
  Privacy
  Terms
  HIPAA
  Security
  Data request

BOTTOM ROW
  © 2026 Lumen Health, Inc.
  Not a substitute for medical advice, diagnosis,
  or treatment.
  Made in Brooklyn & Oakland
```

---

## Dark-surface accent rules (footer-specific)

Same rules as the Trust callout (section 06):

| Surface element | Color |
|---|---|
| Primary accent (headings, mark) | `var(--mint)` `#A8E6CF` |
| Secondary accent | N/A |
| Body text | `rgba(246, 243, 236, 0.72)` |
| Tagline text | `rgba(246, 243, 236, 0.6)` |
| Fine legal text | `rgba(246, 243, 236, 0.5)` |
| Dividers | `rgba(246, 243, 236, 0.1)` |

No Forest on dark surfaces. Ever. Forest on Ink fails WCAG contrast.

---

## Responsive

| Viewport | Adaptation |
|---|---|
| ≥ 860px | 5-column grid |
| < 860px | 2-column grid: Brand + Product on row 1, Company + Resources on row 2, Legal on row 3 (or stacks to 2×3 depending on order) |
| < 560px | Legal row breaks into stacked lines, each centered or left-aligned |

---

## Why this section works

- **"Made in Brooklyn & Oakland"** is a small, specific, human line in a sea of legal boilerplate. It signals the company is small, thoughtful, and comfortable saying so.
- **Mint mark, Mint column headings.** Keeps the footer visually consistent with the trust callout — they're both dark rooms in the same house.
- **Only two text opacities in the body** — headings at full Mint, body at 72%. Restraint. Every opacity value is a design decision, not a random hierarchy ramp.
- **The tagline paragraph is only 26 words.** It refuses to be a "mission statement." Three clauses, three real commitments, end.
- **Five columns, not three.** Three is lazy (Product/Company/Legal). Five lets us break out Resources (for clinicians, caregivers, support) — signals Lumen thinks about its users beyond the transaction.
- **"Data request" in Legal** is a small but pointed inclusion. It tells the user they can ask for their data back or erased — before they ever have to ask whether that's possible.
