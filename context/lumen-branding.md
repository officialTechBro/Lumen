# Lumen — Branding Guide

**Your lab results, in plain English.**

A complete brand system for Lumen, a consumer health app that translates lab reports into understandable language, flags what matters, tracks trends over time, and tells users exactly what to ask their doctor.

---

## 1. Brand Identity

| | |
|---|---|
| **Name** | Lumen |
| **Tagline** | Your lab results, in plain English. |
| **One-line pitch** | Upload a lab report. Get every number explained, every flag prioritized, and the exact questions to ask your doctor. |
| **Category** | Consumer health literacy / patient empowerment |
| **Personality** | Clear. Trustworthy. Editorial. Calm. Capable. |

### Brand voice

- Plainspoken but not dumbed-down. Talks to adults.
- Reassuring without being syrupy. No "journey," no "wellness," no exclamation points.
- Confident. Uses periods. Short sentences. States facts.
- Honest about limits. Never diagnoses. Always defers to clinicians on treatment.

### Voice examples

✅ "Your vitamin D is mildly low. Common, especially in winter."
❌ "Oh no, your vitamin D could use a boost! 🌞 Let's get you glowing!"

✅ "Ask your doctor about LDL before considering medication."
❌ "We recommend you start taking a statin."

✅ "Your HbA1c is 5.4%. Well within the healthy range."
❌ "Great news superstar — your sugar levels are amazing!"

---

## 2. Color System

### Core neutrals

| Role | Hex | Usage |
|---|---|---|
| Paper | `#F6F3EC` | Primary background. Warm off-white. |
| Paper elevated | `#FBF8F1` | Card surfaces, elevated panels. |
| Paper warm | `#EFEADF` | Section backgrounds, trust strips. |
| Ink | `#1A2620` | Primary text. Near-black with a green cast. |
| Ink soft | `#3D4842` | Secondary text. |
| Ink dim | `#6B756F` | Tertiary text, captions. |
| Ink faint | `#A8ADA6` | Metadata, disabled states. |

### Accent

| Role | Hex | Usage |
|---|---|---|
| Forest | `#1F5041` | Primary brand color. Clinical trust. |
| Forest soft | `#2D6D5A` | Hover states, secondary accents. |
| Mint highlight | `#A8E6CF` | Italic accents on dark surfaces only. |

### Semantic

| Role | Hex | Usage |
|---|---|---|
| Coral | `#C8563A` | Flagged values, warnings. Warm, never alarming. |
| Coral soft | `#E8D4CC` | Flag backgrounds, soft alerts. |
| Leaf | `#5A7A3F` | Normal / healthy indicators. |
| Leaf soft | `#D7E0C6` | Success pill backgrounds. |

### Lines

| Role | Hex | Usage |
|---|---|---|
| Line | `#D9D3C4` | Card borders, dividers. |
| Line soft | `#E5DFD0` | Internal dividers, subtle separators. |

### Usage rules

- Paper occupies ~70% of every screen.
- Forest accent appears on ≤10% of visible pixels — key words, icons, primary CTAs.
- Coral only on flags and alerts. Never decorative.
- Dark surfaces (footer, featured pricing) use Ink as background with Paper as text.

---

## 3. Typography

### Typefaces

| Role | Family | Source | Weights |
|---|---|---|---|
| Display | Newsreader | Google Fonts | 300 italic, 400, 500 |
| Body / UI | Geist | Google Fonts | 400, 500, 600 |
| Data / labels | Geist Mono | Google Fonts | 400, 500 |

### Type scale

| Style | Size | Font | Properties |
|---|---|---|---|
| Hero | `clamp(48px, 7.5vw, 104px)` | Newsreader 400 | line-height 1, tracking -0.035em |
| Section title | `clamp(38px, 5.5vw, 68px)` | Newsreader 400 | line-height 1.04, tracking -0.03em |
| Card title | 22–26px | Newsreader 500 | line-height 1.15, tracking -0.02em |
| Body large | 19–20px | Geist 400 | line-height 1.55 |
| Body | 14.5–16px | Geist 400 | line-height 1.55 |
| Meta / label | 11–12px | Geist Mono 500 | uppercase, tracking 0.08–0.14em |

### The italic accent rule

Any 1–3 word phrase in headlines that carries the thesis is rendered in **Newsreader italic 300, Forest color**. This is the signature move of the brand.

Examples:
- "Your lab results, *in plain English.*"
- "Four things your patient portal *will never do.*"
- "From blood draw to *understanding, in ten seconds.*"

---

## 4. Logo & Mark

A 22×22 circle with a curved internal wave — suggests a droplet, a lens, and the letter "L". Forest outline with the wave filled solid.

```svg
<svg viewBox="0 0 22 22" fill="none">
  <circle cx="11" cy="11" r="10" stroke="#1F5041" stroke-width="1.5"/>
  <path d="M6 11 Q 11 5, 16 11 T 6 11" fill="#1F5041"/>
</svg>
```

**Wordmark:** "Lumen" in Newsreader 500, tracking -0.02em, paired with the mark at 10px gap.

**Clear space:** Minimum clear space around the mark equals the height of the mark itself.

---

## 5. Spatial System

- **Base grid:** 8px (use multiples: 8, 16, 24, 32, 48, 64, 80, 120, 140)
- **Max container width:** 1280px
- **Horizontal padding:** 32px desktop, 20px mobile
- **Section vertical padding:** 140px desktop, 80px mobile
- **Card padding:** 32px desktop, 24px mobile

### Border radius

| Element | Radius |
|---|---|
| Cards | 12px |
| Featured cards | 16px |
| Pills, buttons, eyebrows | 999px |

---

## 6. Component Conventions

### Buttons

**Primary**
- Background: Ink · Text: Paper
- Radius: 999px · Padding: 16px × 26px
- Font: Geist 500, 15px
- Hover: background shifts to Forest, translateY(-2px), soft green shadow

**Secondary**
- Background: transparent · Text: Ink · Border: 1px Line
- Hover: border darkens to Ink, background shifts to Paper elevated

### Eyebrows (pill labels above headlines)

- Font: Geist Mono 12px · Color: Forest
- Background: `rgba(31, 80, 65, 0.08)`
- Padding: 8px × 14px · Radius: 999px
- Small pulsing Forest dot (6×6px) to the left

### Cards

- Background: Paper elevated
- Border: 1px Line soft
- Radius: 12px
- Hover: translateY(-4px), border darkens to Line, soft shadow `0 20px 40px -20px rgba(26,38,32,0.15)`

### Status pills

| State | Background | Text |
|---|---|---|
| Normal / OK | Leaf soft | Leaf |
| Flagged | Coral soft | Coral |
| Info | `rgba(31,80,65,0.08)` | Forest |

---

## 7. Motion

- **Page load:** staggered fade-up — opacity 0→1, translateY 24px→0, 0.9s ease, delays of 0.1s / 0.2s / 0.35s / 0.5s / 0.65s
- **Hover lift:** 0.2s ease, translateY(-2px) to (-4px) depending on element
- **Pulse on live indicators:** 2.5s ease-in-out infinite
- **Chart draw-in:** stroke-dasharray animation over 2–2.5s with cubic ease

### Do not use

- Auto-playing carousels
- Parallax scrolling
- Scroll-hijacking
- Spring-loaded bounces or "playful" physics

---

## 8. Texture

Subtle paper grain overlay across the whole interface — inline SVG fractal noise at **5% opacity**, fixed-positioned. Gives the product a printed-magazine quality that reinforces the editorial positioning without being noticeable.

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1000;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,...fractalNoise...");
}
```

---

## 9. Iconography

- **Stroke weight:** 1.5px
- **Style:** geometric, line-based, no fills except for subtle accents
- **Corners:** rounded (stroke-linecap: round, stroke-linejoin: round)
- **Color:** Forest for active/accent, Ink soft for default
- **Size:** 40×40px in cards, 14–18px inline

Avoid: filled icons, gradient icons, duotone, 3D renders, emoji.

---

## 10. Photography & Imagery

### Use

- Abstract macro shots of lab equipment, liquids, paper
- Editorial still lifes (stethoscope on linen, pill bottle with natural light)
- Data visualizations treated as hero imagery
- Hand-drawn medical line illustrations

### Avoid

- Stock photos of smiling people in lab coats
- Rounded cartoon illustrations or emoji mascots
- Diverse-team-pointing-at-laptop imagery
- Blue-hued "tech" photography
- AI-generated human faces

---

## 11. Do / Don't Summary

### Do

- Use italic serif accents on 1–3 key words per headline
- Let paper white breathe — 70% of the canvas
- Show real data (numbers, ranges, units) whenever possible
- Pair mono labels with serif titles for clinical-editorial tension
- Write in short declarative sentences

### Don't

- Purple / blue gradients
- Rounded cartoon illustrations or emoji mascots
- Stock photos of smiling people in lab coats
- Inter, Roboto, or Arial anywhere
- Exclamation points in UI copy
- Pure red `#FF0000` for flags — always use Coral
- Kelly green for success — always use Leaf

---

## 12. Quick Reference Card

```
BRAND
  Name       Lumen
  Tagline    Your lab results, in plain English.

COLORS
  Paper      #F6F3EC
  Ink        #1A2620
  Forest     #1F5041   (primary accent)
  Coral      #C8563A   (flags only)
  Leaf       #5A7A3F   (success)

TYPE
  Display    Newsreader (300 italic, 400, 500)
  Body       Geist (400, 500, 600)
  Data       Geist Mono (400, 500)

GRID
  Base       8px
  Container  1280px max
  Section    140px vertical padding

RADIUS
  Cards      12px
  Featured   16px
  Pills      999px

SIGNATURE
  Italic serif accent in Forest on 1–3 key
  words per headline. This is the one thing
  someone should recognize about Lumen.
```

---

*Last updated: April 2026*
