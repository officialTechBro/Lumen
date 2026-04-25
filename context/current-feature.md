# Current Feature: Home CTA Band

## Status

In Progress

## Goals

- Render a centered `<div id="upload">` closing band with `var(--paper-warm)` background and 1px top border
- Big H2 headline: "Your next appointment, *ten minutes better.*" — italic Forest on last phrase, `clamp(40px, 6vw, 84px)`, max-width 900px
- Sub paragraph: Geist 400, 19px, Ink-soft, max-width 540px, three short sentences
- Two buttons: primary "Upload a report →" and secondary "See the sample read" (links to `#sample`)
- Dropzone widget (`.drop`): dashed 1.5px `var(--line)` border, 12px radius, flex row with icon well + copy block; hover shifts border to Forest and faint forest background wash
- Icon well: 36×36px, 8px radius, Paper bg, 1px Line-soft border; 18×18 inline SVG upload arrow in Forest
- Copy block: Newsreader 500 17px title + Geist Mono 500 10px uppercase sub with three trust statements
- Staggered `.fade` animation: H2 → .d1 → .d2 → .d3
- Clicking the dropzone (or "Upload a report") opens file picker; wire `dragover`/`drop` events
- Responsive: ≥720px centered; <720px container padding drops to 20px; <560px icon well 32×32, title 16px

## Notes

- `id="upload"` — this is the anchor target for the nav CTA, hero CTA, and all other upload links on the page
- Uses `<div>` not `<section>` (closing band, not content section)
- 140px vertical padding
- Background `var(--paper-warm)` — matches pricing section to bracket the end of marketing content
- Dropzone is **visual only** on the marketing page; the actual upload happens in the app
- "Keep going if it helps" is the key unusual copy line — permission-to-stop framing
- The dropzone sub copy: "Up to 20MB · encrypted in transit · you control deletion" — three trust statements, middle-dot separated

## History

- Project setup and boilerplate cleanup
- ShadCN setup and global theme foundation — installed core ShadCN deps, wired Lumen brand palette (light + dark) via CSS variables, added /dashboard and /reports routes, loaded Newsreader font
- Home navigation — sticky translucent top bar, responsive hamburger menu (< 860px), dark/light mode toggle via next-themes
- Home hero section — two-column layout with fade-up animation, eyebrow pill, Newsreader headline with italic Forest accent, CTA row, meta strip, and layered card composition (raw slip + plain-English card at -4deg/+2deg)
- Home how it works section — three-card Upload → Read → Ask explainer with inline SVG illustrations (upload glyph, triaged bars with status dots, question list), scroll-triggered staggered fade-up, card hover lift, and radial gradient background blending into the hero
- Home sample report section — two-column layout (pitch panel + interactive report card), five expandable biomarker rows with range visualizations (track, in-range band, status dot), accordion expand/collapse with chevron rotation, Vitamin D expanded by default, per-row plain-English expansions with Why it matters / Ask your doctor columns, scroll-triggered fade-up
- Home features section — 3×2 grid of six feature cards (Context, Trends, Summary, Questions, Privacy, Clinician review), each with 40px icon well, Newsreader H3, body copy, and mono tag pushed to bottom; card hover lift; Tailwind responsive grid (3-col → 2-col at 1020px → 1-col at 720px); scroll-triggered staggered fade-up with per-row delay cascade
- Home trust callout — dark `#1A2620` rounded block (16px radius) with two-column layout; left: Mint eyebrow + "We explain. We do not diagnose." headline (italic Mint accent) + sub paragraph; right: four commitments with Mint dots, Newsreader labels, faint dividers; hardcoded dark-surface colors so it stays dark in both light and dark mode; single scroll-triggered fade; responsive 2-col → 1-col at 860px
- Home testimonials — 2×2 quote card grid; italic Forest "twelve minutes" headline; four archetypes (patient, ignored-result patient, clinician, caregiver); Newsreader blockquote + divider + serif name / mono context tag; staggered scroll-triggered fade-up (d1–d4); responsive 2-col → 1-col at 860px, tighter padding/font at 560px
- Home pricing section — two-tier centered grid (Free + Lumen Annual); Free: ₦0 forever, 2 lab reports; Annual: ₦9,999/year, unlimited reports; featured dark card (#1A2620) with Mint "Most chosen" ribbon, inverted text stays dark in both modes; feature list items with ::before horizontal rule (Forest/Mint); staggered scroll-triggered fade-up; 2-col centered at 880px max-width → 1-col stack at ≤680px, tighter card padding at ≤560px
- Home FAQ section — 8-item exclusive accordion; purely typographic with ruled 1px Line-soft borders; center-aligned header with "Questions" eyebrow pill + Newsreader H2 "Short answers. No legalese." (italic Forest accent); ASCII + toggle (Geist Mono, Ink-dim → Forest, rotates 45deg on open); inline-style max-height 0→400px collapse with 0.3s ease; max-width 900px list, answers capped at 720px; scroll-triggered fade-up; responsive font reduction at ≤560px
