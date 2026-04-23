# Current Feature

<!-- Feature Name -->

## Status

Not Started

## Goals

<!-- Goals & requirements -->

## Notes

<!-- Any extra notes -->

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- ShadCN setup and global theme foundation — installed core ShadCN deps, wired Lumen brand palette (light + dark) via CSS variables, added /dashboard and /reports routes, loaded Newsreader font
- Home navigation — sticky translucent top bar, responsive hamburger menu (< 860px), dark/light mode toggle via next-themes
- Home hero section — two-column layout with fade-up animation, eyebrow pill, Newsreader headline with italic Forest accent, CTA row, meta strip, and layered card composition (raw slip + plain-English card at -4deg/+2deg)
- Home how it works section — three-card Upload → Read → Ask explainer with inline SVG illustrations (upload glyph, triaged bars with status dots, question list), scroll-triggered staggered fade-up, card hover lift, and radial gradient background blending into the hero
- Home sample report section — two-column layout (pitch panel + interactive report card), five expandable biomarker rows with range visualizations (track, in-range band, status dot), accordion expand/collapse with chevron rotation, Vitamin D expanded by default, per-row plain-English expansions with Why it matters / Ask your doctor columns, scroll-triggered fade-up
- Home features section — 3×2 grid of six feature cards (Context, Trends, Summary, Questions, Privacy, Clinician review), each with 40px icon well, Newsreader H3, body copy, and mono tag pushed to bottom; card hover lift; Tailwind responsive grid (3-col → 2-col at 1020px → 1-col at 720px); scroll-triggered staggered fade-up with per-row delay cascade
- Home trust callout — dark `#1A2620` rounded block (16px radius) with two-column layout; left: Mint eyebrow + "We explain. We do not diagnose." headline (italic Mint accent) + sub paragraph; right: four commitments with Mint dots, Newsreader labels, faint dividers; hardcoded dark-surface colors so it stays dark in both light and dark mode; single scroll-triggered fade; responsive 2-col → 1-col at 860px
