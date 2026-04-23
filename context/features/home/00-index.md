# Lumen — Design Specs Index

This folder contains one spec file per home-page section. Each spec is standalone — paste a single file into Claude's design tool (or hand to a designer) and it has everything needed to rebuild that section from scratch.

## Files

| # | File | Section |
|---|---|---|
| 01 | `01-navigation.md` | Top navigation bar |
| 02 | `02-hero.md` | Hero — headline, CTAs, layered preview cards |
| 03 | `03-how-it-works.md` | 3-step explainer (Upload → Read → Ask) |
| 04 | `04-sample-report.md` | Interactive sample report with expandable rows |
| 05 | `05-features.md` | 6-card "What you get" grid |
| 06 | `06-trust-callout.md` | Dark callout — "What Lumen won't do" |
| 07 | `07-testimonials.md` | 4 user quotes in a 2×2 grid |
| 08 | `08-pricing.md` | 3-tier pricing (Single / Annual / Household) |
| 09 | `09-faq.md` | 8-item accordion FAQ |
| 10 | `10-cta-band.md` | Final CTA band with upload widget |
| 11 | `11-footer.md` | Dark footer with 5 link columns |

## Shared brand tokens (apply to every section)

### Colors
```
--paper:        #F6F3EC    (page background)
--paper-elev:   #FBF8F1    (card surface)
--paper-warm:   #EFEADF    (section tint, trust strips)
--ink:          #1A2620    (primary text, dark surfaces)
--ink-soft:     #3D4842    (secondary text)
--ink-dim:      #6B756F    (tertiary text, metadata)
--ink-faint:    #A8ADA6    (disabled, very faint)
--forest:       #1F5041    (primary accent — trust)
--forest-soft:  #2D6D5A    (hover states)
--mint:         #A8E6CF    (accent ON DARK surfaces only)
--coral:        #C8563A    (flags / warnings)
--coral-soft:   #E8D4CC    (flag backgrounds)
--leaf:         #5A7A3F    (normal / healthy)
--leaf-soft:    #D7E0C6    (success backgrounds)
--line:         #D9D3C4    (card borders)
--line-soft:    #E5DFD0    (internal dividers)
```

### Typography
```
Display:  Newsreader  (300 italic, 400, 500)
Body:     Geist       (400, 500, 600)
Data:     Geist Mono  (400, 500)
```

### Signature move
Any 1–3 word phrase in a headline that carries the thesis is rendered in **Newsreader italic 300, Forest (`#1F5041`)**. On dark surfaces, use Mint (`#A8E6CF`) instead.

### Spatial
- Base grid: **8px**
- Container max-width: **1280px**
- Container padding: **32px desktop / 20px mobile**
- Section vertical padding: **140px desktop / 80px mobile**
- Border radius: **12px cards**, **16px featured**, **999px pills/buttons**

### Motion
All sections use the same fade-up-on-scroll animation:
- `opacity: 0 → 1`
- `translateY(24px → 0)`
- `.9s ease`
- Staggered delays via `.d1 (0.1s) / .d2 (0.2s) / .d3 (0.35s) / .d4 (0.5s) / .d5 (0.65s)` helper classes
- Triggered by `IntersectionObserver` at `threshold: 0.12`, `rootMargin: "0px 0px -60px 0px"`

### Texture
Fixed fractal noise overlay on `body::before`, 5% opacity, `mix-blend-mode: multiply`. Applies globally — no section overrides.
