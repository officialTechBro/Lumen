# Current Feature: Home — How It Works

## Status

In Progress

## Goals

- Render a three-card "Upload → Read → Ask" section with `#how` anchor at correct scroll position
- Section header: eyebrow pill ("How it works"), H2 with italic Forest accent on "No jargon,", and sub copy
- Three equal-width cards in a CSS grid (single column below 860px) with hover lift (translateY -4px)
- Each card: illustration box (140px, inline SVG), step label (Geist Mono, Forest), H3 headline, body copy
- Correct inline SVGs per card: upload glyph (Step 1), triaged bars with status dots (Step 2), question list (Step 3)
- Fade-up-on-scroll animation with staggered delays (0.1s / 0.2s / 0.35s) on the three cards
- Background: Paper `#F6F3EC`, top border `1px solid var(--line-soft)`, 140px vertical padding (80px mobile)

## Notes

- Section padding: 140px vertical desktop, 80px mobile
- Background: Paper (`#F6F3EC`) — no tint, top border `1px solid var(--line-soft)`
- Section header max-width: 820px, 72px margin-bottom; sub max-width 640px
- H2 size: `clamp(38px, 5.5vw, 68px)`, Newsreader 500, line-height 1.04, tracking -0.03em
- "No jargon," → Newsreader italic 300, Forest `#1F5041`
- Card grid: `repeat(3, 1fr)`, gap 32px; single column below 860px
- Card: Paper-elev `#FBF8F1` bg, 1px Line-soft border, 12px radius, 32px padding
- Card hover: translateY(-4px), border → `var(--line)`, shadow `0 20px 40px -30px rgba(26,38,32,0.3)`
- Illustration box: 140px height, Paper-warm `#EFEADF` bg, 1px Line-soft border, 8px radius, SVG viewBox 300×140
- Step label: Geist Mono 500, 11px, tracking 0.18em, Forest, format `01 — Upload`
- H3: Newsreader 500, 24px, line-height 1.2, margin-bottom 12px
- Body: Geist 400, 15px, line-height 1.6, Ink-soft

## History

- Project setup and boilerplate cleanup
- ShadCN setup and global theme foundation — installed core ShadCN deps, wired Lumen brand palette (light + dark) via CSS variables, added /dashboard and /reports routes, loaded Newsreader font
- Home navigation — sticky translucent top bar, responsive hamburger menu (< 860px), dark/light mode toggle via next-themes
- Home hero section — two-column layout with fade-up animation, eyebrow pill, Newsreader headline with italic Forest accent, CTA row, meta strip, and layered card composition (raw slip + plain-English card at -4deg/+2deg)
