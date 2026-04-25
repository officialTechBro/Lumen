# Current Feature

## Status

Not Started

## Goals

<!-- List goals here -->

## Notes

<!-- Add notes here -->

## History

- Signup page — `/signup` route; server component page with sticky auth nav, two-column layout (feature rail left hidden on mobile / form card right); `WHY LUMEN?` feature list with Forest dots + free plan callout in left rail; `SignupForm` client component with Google OAuth button, full name/email/password fields, on-blur email validation (valid checkmark, coral error, taken + sign-in link), password show/hide toggle, 3-segment strength bar (weak/fair/strong), loading state with pulsing spinner, in-place success confirmation state (envelope icon, resend link); staggered fade-up entrance; responsive grid-cols-1 → grid-cols-[1fr_1.4fr] at 960px; extracted `lib/types.ts` and `lib/helpers.ts` for shared types and utility functions; added rules to coding-standards.md

- Audit quick wins — fixed broken `var(--paper-elev)` CSS token in Testimonials (transparent card bug), normalized `var(--font-newsreader)` → `var(--font-display)` in Testimonials, replaced index-based `key` props with stable string keys in FAQ/TrustCallout/SampleReport/HowItWorks, added `prefers-reduced-motion` CSS override in globals.css, changed CTABand root from `<div>` to `<section aria-label>`, added `id="trust"` to TrustCallout, documented intentional `DELAYS i % 3` pattern in Features; updated Pricing from ₦ to USD ($0 free / $79/yr)

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
- Home CTA band — `<div id="upload">` closing conversion block on `var(--paper-warm)`; Newsreader H2 `clamp(40px,6vw,84px)` with italic Forest "ten minutes better." accent; Geist 19px sub with permission-to-stop copy; primary upload button (opens file picker) + secondary "See the sample read" link to `#sample`; dashed-border dropzone widget (flex row: 36×36 icon well with SVG upload arrow + Newsreader title / Geist Mono uppercase trust sub); Forest hover wash on dropzone; staggered scroll-fade (0 / 0.1s / 0.2s / 0.35s); responsive collapse at ≤560px (32×32 icon well, 16px title)
- Home footer — minimal dark `#1A2620` footer; centered Mint SVG mark + Newsreader "Lumen" wordmark (Paper); faint 1px Paper 10% divider; legal row (Geist Mono 500, 10px, uppercase, Paper 50%): © 2026 Lumen Health, Inc. · disclaimer · Made in Brooklyn & Oakland; flex-wrap centering, responsive on all viewports; scroll-triggered fade-up; hardcoded dark-surface colors
