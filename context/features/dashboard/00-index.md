# Lumen Dashboard — Design Specs Index

One spec file per dashboard section. Each file is self-contained — paste it alone into Claude's design tool and it has everything needed to rebuild that section.

## Files

| # | File | Section |
|---|---|---|
| 01 | `01-shell-layout.md` | The two-column grid shell (sidebar + main area) |
| 02 | `02-sidebar.md` | Left navigation sidebar with nav groups, upload CTA, profile |
| 03 | `03-topbar.md` | Sticky top bar (breadcrumb, search, icon buttons) |
| 04 | `04-page-header.md` | Page heading (greeting, headline, meta, CTA row) |
| 05 | `05-hero-report.md` | Hero report card (latest report + donut chart) |
| 06 | `06-flagged-markers.md` | Flagged markers card with expandable rows |
| 07 | `07-trends-grid.md` | Trends grid with sparkline charts |
| 08 | `08-reports-list.md` | Recent reports table |
| 09 | `09-upload-flow.md` | Upload flow: dropzone → progress → done |

---

## Shared brand tokens

### Colors
```
--paper:        #F6F3EC    page background
--paper-elev:   #FBF8F1    card surfaces, sidebar
--paper-warm:   #EFEADF    sidebar, tinted panels, expanded rows
--ink:          #1A2620    primary text, active nav, dark surfaces
--ink-soft:     #3D4842    secondary text
--ink-dim:      #6B756F    metadata, labels, dim text
--ink-faint:    #A8ADA6    disabled, placeholders
--forest:       #1F5041    primary accent
--forest-soft:  #2D6D5A    hover accent
--mint:         #A8E6CF    accent on dark surfaces only
--coral:        #C8563A    flagged values
--coral-soft:   #E8D4CC    flag backgrounds
--leaf:         #5A7A3F    normal / healthy
--leaf-soft:    #D7E0C6    normal backgrounds
--line:         #D9D3C4    borders, dividers
--line-soft:    #E5DFD0    subtle internal dividers
```

### Typography
```
Display / headings:  Newsreader  (300 italic, 400, 500)
Body / UI:           Geist       (400, 500, 600) — base 15px in app
Data / labels:       Geist Mono  (400, 500) — always uppercase, 0.12–0.18em tracking
```

**Signature move:** key italic phrases in headings use Newsreader italic 300, Forest color — e.g. *"in plain English."*, *"explained."*, *"ready."*

### Spatial system
```
Base grid:           8px
Shell sidebar:       248px fixed
Main area padding:   0 40px 60px (right/bottom)
Card radius:         14px (standard), 16px (hero), 10–12px (inner elements)
Card border:         1px solid var(--line-soft)
Card bg:             var(--paper-elev)
Gap between cards:   24px
```

### Animation
All cards/sections use the same `fadeUp` keyframe:
```css
@keyframes fadeUp { to { opacity: 1; transform: none; } }
.fade { opacity: 0; transform: translateY(12px); animation: fadeUp .7s ease forwards; }
```
Stagger delays: `.d1 (0.05s)` · `.d2 (0.12s)` · `.d3 (0.22s)` · `.d4 (0.32s)` · `.d5 (0.42s)` · `.d6 (0.52s)`

### Pill component
```
font: Geist Mono 500, 10px, uppercase, 0.14em tracking
padding: 5px 9px, border-radius: 999px

.ok    — bg: leaf-soft,    text: leaf
.flag  — bg: coral-soft,   text: coral
.watch — bg: rgba(107,117,111,.12), text: ink-soft
.new   — bg: rgba(31,80,65,.1),     text: forest
```

### Buttons
```
.btn-primary   — bg: ink,        text: paper,    hover: forest bg, translateY(-1px)
.btn-secondary — bg: paper-elev, text: ink,      border: 1px line-soft, hover: ink border
.btn-ghost     — bg: transparent, text: ink-soft, hover: ink text
All: Geist 500, 13.5px, padding 11px 18px, radius 999px
```

### Mock data reference (user: Sarah Chen, Annual plan)
```
Latest report: Annual panel · Quest Diagnostics · March 14, 2026
21 markers: 18 normal · 1 watch · 2 flagged
Tracked since: Feb 2024 · 7 total reports
Flagged: Vitamin D (24 ng/mL), LDL-C (142 mg/dL), Ferritin watch (38 ng/mL)
```
