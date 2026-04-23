# Current Feature

Home — Sample Report Section (04)

## Status

In Progress

## Goals

- Render a two-column layout (pitch panel left, report card right) that collapses to single column below 1020px
- Build the report card with three regions: header (title + status pill), summary grid (4 stats), and 5 expandable result rows
- Implement range visualization per row: track, in-range band, and status dot (flag/watch/normal variants)
- Row 1 (Vitamin D) expanded by default on page load; accordion behavior — only one row open at a time
- Smooth height transition (max-height 0 → 600px, 0.3s) with chevron rotation on expand
- Left column: eyebrow, headline with italic Forest accent, supporting paragraph, 3-item status legend, fine-print footer
- Expansion panel per row: "WHAT IT MEANS" sentence, two-column "Why it matters" / "Ask your doctor" layout
- Scroll-triggered fade-up animation matching existing section pattern
- Responsive: rows restructure at <720px, summary grid drops to 2×2 at <560px
- Background: `var(--paper-warm)` with top border 1px Line-soft

## Notes

- Section ID: `#sample`
- Section padding: 140px vertical
- Report card background: `var(--paper-elev)` `#FBF8F1`; border-radius 16px; overflow hidden
- Container grid: `1fr 1.15fr`, 56px gap
- Summary grid: 4 equal columns, no gap, Line-soft left borders on columns 2–4
- Result row grid: `200px 1fr 140px 72px`, 24px gap
- Row hover: `rgba(31, 80, 65, 0.03)`; expanded: `rgba(31, 80, 65, 0.04)`
- Expansion background: `var(--paper-warm)`
- Fine print: Mono 10px, tracking 0.14em, uppercase, Ink-dim
- Rows are NOT individually scroll-animated — card fades in as a unit
- Full row/expansion content for all 5 markers defined in spec

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- ShadCN setup and global theme foundation — installed core ShadCN deps, wired Lumen brand palette (light + dark) via CSS variables, added /dashboard and /reports routes, loaded Newsreader font
- Home navigation — sticky translucent top bar, responsive hamburger menu (< 860px), dark/light mode toggle via next-themes
- Home hero section — two-column layout with fade-up animation, eyebrow pill, Newsreader headline with italic Forest accent, CTA row, meta strip, and layered card composition (raw slip + plain-English card at -4deg/+2deg)
- Home how it works section — three-card Upload → Read → Ask explainer with inline SVG illustrations (upload glyph, triaged bars with status dots, question list), scroll-triggered staggered fade-up, card hover lift, and radial gradient background blending into the hero
