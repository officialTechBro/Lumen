# Lumen Reports Page — Design Specs Index

One spec file per section of the Reports page. Each file is self-contained — paste it alone into Claude's design tool alongside `00-index.md` and it has everything needed to build that section.

---

## Files

| # | File | Section |
|---|---|---|
| 01 | `01-page-header.md` | Page heading, meta line, upload CTA |
| 02 | `02-filter-bar.md` | Filter pills, search input, sort dropdown |
| 03 | `03-report-table.md` | Column headers, all 7 report rows, chevron |
| 04 | `04-preview-panel.md` | Slide-in quick preview on row hover/click |
| 05 | `05-empty-states.md` | Three empty states: no reports, no search, no filter match |
| 06 | `06-footer-fab.md` | Table footer + floating upload button |

---

## Page context

- Route: /reports
The user arrives here by clicking **"Reports"** in the left sidebar (nav badge: `7`). The persistent shell — sidebar + topbar — is already rendered. This page fills only the **main content area**.

- Topbar breadcrumb: `DASHBOARD / REPORTS`
- Content area padding: `0 40px 60px`
- Page background: `var(--paper)` `#F6F3EC`

---

## Shared brand tokens

### Colors
```
--paper:        #F6F3EC    page background
--paper-elev:   #FBF8F1    card/table surface
--paper-warm:   #EFEADF    table header, tinted rows, panel bg
--ink:          #1A2620    primary text, active states, primary button
--ink-soft:     #3D4842    secondary text
--ink-dim:      #6B756F    metadata, timestamps, labels
--ink-faint:    #A8ADA6    disabled, de-emphasized zeros
--forest:       #1F5041    primary accent, links, active filters
--forest-soft:  #2D6D5A    hover accent
--mint:         #A8E6CF    accent on dark surfaces ONLY
--coral:        #C8563A    flagged — count numbers + pills
--coral-soft:   #E8D4CC    flag pill background
--leaf:         #5A7A3F    all-clear status
--leaf-soft:    #D7E0C6    all-clear pill background
--line:         #D9D3C4    borders, pill outlines
--line-soft:    #E5DFD0    subtle internal dividers
```

### Typography
```
Display / headings:  Newsreader  (300 italic, 400, 500)  — Google Fonts
Body / UI:           Geist       (400, 500, 600)          — Google Fonts
Data / labels:       Geist Mono  (400, 500)               — uppercase, 0.12–0.18em tracking
```

**Signature move:** 1–3 word italic phrase in serif headlines → Newsreader italic 300, Forest `#1F5041`.

### Spatial
```
Base grid:          8px
Content padding:    0 40px 60px
Table radius:       14px
Card radius:        14px
Button radius:      999px (all buttons and pills)
Table row padding:  20px 28px vertical/horizontal
```

### Status pill component
```css
font-family: var(--mono);
font-size: 10px;
text-transform: uppercase;
letter-spacing: 0.12em;
padding: 5px 10px;
border-radius: 999px;
font-weight: 500;
white-space: nowrap;

.pill.flag   — bg: #E8D4CC (coral-soft), color: #C8563A (coral)
.pill.watch  — bg: rgba(107,117,111,.12), color: #3D4842 (ink-soft)
.pill.ok     — bg: #D7E0C6 (leaf-soft), color: #5A7A3F (leaf)
.pill.new    — bg: rgba(31,80,65,.10),   color: #1F5041 (forest)
```

### Button component
```css
/* Primary */
background: var(--ink); color: var(--paper);
font: Geist 500, 14px; padding: 11px 18px; border-radius: 999px; border: none;
:hover → background: var(--forest), translateY(-1px)

/* Secondary */
background: var(--paper-elev); color: var(--ink);
border: 1px solid var(--line-soft);
:hover → border-color: var(--ink)

/* Ghost */
background: transparent; color: var(--ink-soft);
:hover → color: var(--ink)
```

### Animation (shared)
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: none; }
}
.fade    { animation: fadeUp 0.7s ease forwards; }
.d1      { animation-delay: 0.05s; }
.d2      { animation-delay: 0.12s; }
.d3      { animation-delay: 0.22s; }
```

---

## Report data reference (7 rows)

| # | Title | Badge | Date | Lab | Markers | Flags | Watch | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | Annual panel | Latest | Mar 14, '26 | Quest | 21 | 2 | 1 | Flagged |
| 2 | Follow-up lipids | — | Sep 02, '25 | Labcorp | 8 | 1 | 1 | Flagged |
| 3 | Annual panel | — | Mar 11, '25 | Quest | 19 | 1 | 2 | Watch |
| 4 | Thyroid check | — | Oct 22, '24 | Kaiser | 5 | 0 | 0 | All clear |
| 5 | Lipid panel | — | Jun 04, '24 | Quest | 6 | 1 | 0 | Flagged |
| 6 | Metabolic panel | — | Apr 19, '24 | Quest | 14 | 0 | 0 | All clear |
| 7 | Baseline | First | Feb 09, '24 | Quest | 18 | 0 | 1 | Watch |

---

## Design references

| Reference | What to borrow |
|---|---|
| **Linear** (Issues list) | Dense compact rows, filter pills, clean column headers |
| **Vercel** (Deployments) | Status pill + timestamp in one row without clutter |
| **Superhuman** (Email list) | Every row scannable in 0.3 sec — serif for subject, mono for meta |
| **Notion** (Database table) | Column header sort indicators, row hover states |
| **Apple Health** (Records) | Clinical context in status, not generic "Processed" |

- @context/lumen-project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md
- @context/lumen-branding.md
- @lib/mock-data.ts
- @context/screenshots/reports-ui-1.png
- @context/screenshots/reports-ui-2.png