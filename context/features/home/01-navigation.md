# 01 — Navigation

Sticky top bar. Present on every page. The only element in the layout that's both fixed-position and translucent — it floats over the hero with a blurred backdrop so the paper texture shows through.

---

## Purpose

Three jobs, in priority order:

1. **Anchor the brand.** Logo left, wordmark, always visible.
2. **Route to the top sections.** Quick-jump links to the five in-page anchors.
3. **Drive the primary action.** "Upload a report" CTA in the top-right corner — the same action repeated at the bottom of the page.

A secondary "Sign in" link sits next to the CTA for returning users. It's deliberately quiet (no button styling) so it doesn't compete with the primary action.

---

## Layout

```
┌────────────────────────────────────────────────────────────────────┐
│  [◉] Lumen    How it works  Sample  What you get  Pricing  FAQ    │
│                                            Sign in  [Upload a →]  │ 
└────────────────────────────────────────────────────────────────────┘
```

- **Height:** 72px fixed
- **Container:** same `max-width: 1280px` and 32px horizontal padding as the rest of the page
- **Structure:** `flex` with `justify-content: space-between`, `align-items: center`
- **Three zones:** brand (left) · nav links (center, flexed) · actions (right)

---

## Visual specs

### Container
- Background: `rgba(246, 243, 236, 0.82)` — Paper at 82% opacity
- Backdrop filter: `blur(10px) saturate(140%)`
- Bottom border: `1px solid var(--line-soft)` — `#E5DFD0`
- Position: `sticky; top: 0`
- z-index: `50`

### Brand mark
- 22 × 22px SVG circle + wave glyph
- Outline `#1F5041` (Forest), stroke-width `1.5`
- Wordmark: **"Lumen"** in Newsreader 500, 22px, tracking `-0.02em`
- Gap between mark and wordmark: 10px

### Nav links
- Font: Geist 400, 14.5px
- Color: `var(--ink-soft)` `#3D4842`
- Hover: `var(--ink)` `#1A2620`, no underline
- Gap between items: 36px
- **Hidden below 860px viewport** — replaced by hamburger on mobile (future)

### Sign-in link
- Font: Geist 400, 14.5px
- Color: `var(--ink-soft)`
- No underline, no button styling

### Primary CTA button
- Background: `var(--ink)` `#1A2620`
- Text: `var(--paper)` `#F6F3EC`, Geist 500, 14px
- Padding: **12px × 20px** (smaller than in-page buttons — this is a nav-scale button)
- Border radius: 999px (full pill)
- Contains: "Upload a report" + right-arrow `→` with 10px gap
- Hover: background shifts to `var(--forest)`, `translateY(-2px)`, soft green shadow
- Arrow micro-animation: `translateX(3px)` on hover

### Right zone
- `display: flex; align-items: center; gap: 16px`

---

## Navigation anchors

The five in-page links, in order:

| Label | Target | Section |
|---|---|---|
| How it works | `#how` | Three-step explainer |
| Sample report | `#sample` | Interactive sample |
| What you get | `#features` | Feature grid |
| Pricing | `#pricing` | Pricing tiers |
| Questions | `#faq` | FAQ accordion |

---

## States & responsiveness

| Breakpoint | Behavior |
|---|---|
| ≥ 860px | All nav links visible, CTA + Sign in on right |
| < 860px | Nav links hidden (CSS `display: none`), brand + CTA only visible |
| < 560px (future) | Replace "Upload a report" label with just icon + "Upload" |

The sign-in link does **not** collapse on mobile — it stays next to the CTA but can shrink to icon-only at narrow widths.

---

## Accessibility

- Logo link has `aria-label="Lumen — home"`
- SVG glyph has `aria-hidden="true"` (decorative; wordmark provides the label)
- Nav region wrapped in `<nav>` with implicit role
- Focus states: 2px `var(--forest)` outline offset 2px on all interactive elements
- Primary CTA has `aria-label="Upload a lab report"` if the visible label is ever replaced with an icon

---

## Copy

- Brand: `Lumen`
- Links: `How it works` · `Sample report` · `What you get` · `Pricing` · `Questions`
- Quiet link: `Sign in`
- CTA: `Upload a report →`

Notes on copy:
- The verb "Upload" is deliberate — clearer action than "Get started" or "Try free"
- "Questions" is softer than "FAQ" — matches the editorial voice
- Arrow character is a real `→` (U+2192), not ">"

## Reference
- @context/home/00-index.md
- @context/coding-standards.md
- @context/lumen-branding.md
- @context/lumen-project-overview.md
