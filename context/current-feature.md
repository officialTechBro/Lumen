# Current Feature: Home Testimonials

## Status

In Progress

## Goals

- Render a 2×2 grid of four quote cards under the heading "Why people use it"
- H2 headline: "Built for the twelve minutes you actually get with your doctor." — italic Forest on "twelve minutes"
- Each card: Newsreader blockquote (24px), divider line, name (Newsreader 500) + mono context tag (right-aligned)
- No hover lift — cards are static, document-like
- Four archetypes covered: Hannah R. (annual physical), Marco D. (routine bloodwork), Priya S. RN (clinical), Evan K. (parent care)
- Section background: Paper `#F6F3EC`, 1px Line-soft top border, 140px vertical padding
- Scroll-triggered staggered fade-up (d1–d4 delay cascade)
- Responsive: 2-col at ≥860px → 1-col below; blockquote drops to 22px and card padding tightens at <560px

## Notes

- No photos, no star ratings, no "verified" checkmarks — typography only
- Quotes use straight `"` characters (not CSS curly quote decoration)
- Mono context line format: `City · occasion` (e.g. "Portland · annual physical")
- Section is a visual breather after the dark Trust Callout, before Pricing
- Voice check: quotes must sound like real adults — no exclamation points, no "life-changing", no perfect grammar

## History

- Project setup and boilerplate cleanup
- ShadCN setup and global theme foundation — installed core ShadCN deps, wired Lumen brand palette (light + dark) via CSS variables, added /dashboard and /reports routes, loaded Newsreader font
- Home navigation — sticky translucent top bar, responsive hamburger menu (< 860px), dark/light mode toggle via next-themes
- Home hero section — two-column layout with fade-up animation, eyebrow pill, Newsreader headline with italic Forest accent, CTA row, meta strip, and layered card composition (raw slip + plain-English card at -4deg/+2deg)
- Home how it works section — three-card Upload → Read → Ask explainer with inline SVG illustrations (upload glyph, triaged bars with status dots, question list), scroll-triggered staggered fade-up, card hover lift, and radial gradient background blending into the hero
- Home sample report section — two-column layout (pitch panel + interactive report card), five expandable biomarker rows with range visualizations (track, in-range band, status dot), accordion expand/collapse with chevron rotation, Vitamin D expanded by default, per-row plain-English expansions with Why it matters / Ask your doctor columns, scroll-triggered fade-up
- Home features section — 3×2 grid of six feature cards (Context, Trends, Summary, Questions, Privacy, Clinician review), each with 40px icon well, Newsreader H3, body copy, and mono tag pushed to bottom; card hover lift; Tailwind responsive grid (3-col → 2-col at 1020px → 1-col at 720px); scroll-triggered staggered fade-up with per-row delay cascade
- Home trust callout — dark `#1A2620` rounded block (16px radius) with two-column layout; left: Mint eyebrow + "We explain. We do not diagnose." headline (italic Mint accent) + sub paragraph; right: four commitments with Mint dots, Newsreader labels, faint dividers; hardcoded dark-surface colors so it stays dark in both light and dark mode; single scroll-triggered fade; responsive 2-col → 1-col at 860px
