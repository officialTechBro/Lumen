# Lumen Report Detail — Design Specs Index

One spec file per section of the Full Report Detail page. Each file is self-contained — paste it alongside `00-index.md` into Claude's design tool and it has everything needed to build that section.

---

## Files

| # | File | Section |
|---|---|---|
| 01 | `01-report-header.md` | Report identity card — nav, badges, H1, stats strip |
| 02 | `02-ai-summary.md` | AI narrative summary band with read-more toggle |
| 03 | `03-marker-groups.md` | 6 collapsible clinical groups, marker rows, expansion panels |
| 04 | `04-full-marker-table.md` | Flat table of all 21 markers with delta + filter |
| 05 | `05-question-panel.md` | Sticky right-column doctor question list + actions |

---

## Page context

- Route: /reports/:id
- User arrived from: Reports list → row 1 click (Annual panel · Quest · Mar 14, 2026)
- Persistent shell (sidebar + topbar) already rendered
- Topbar breadcrumb: `REPORTS / ANNUAL PANEL · MAR 14`
- Content area padding: `32px 40px 80px`
- Page background: `var(--paper)` `#F6F3EC`

---

## Master layout

```css
.report-detail {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 32px;
  align-items: start;
}

.rd-left {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

.rd-right {
  position: sticky;
  top: 88px;                      /* topbar 68px + 20px breathing room */
  max-height: calc(100vh - 108px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
```

---

## Shared brand tokens

### Colors
```
--paper:        #F6F3EC    page background
--paper-elev:   #FBF8F1    card surfaces
--paper-warm:   #EFEADF    tinted panels, expanded rows, sidebar bg
--ink:          #1A2620    primary text, headings
--ink-soft:     #3D4842    secondary text, body copy
--ink-dim:      #6B756F    metadata, labels, captions
--ink-faint:    #A8ADA6    disabled, de-emphasized
--forest:       #1F5041    primary accent, italic headlines, links
--forest-soft:  #2D6D5A    hover accent
--mint:         #A8E6CF    accent on dark surfaces ONLY
--coral:        #C8563A    flagged values
--coral-soft:   #E8D4CC    flag backgrounds, flag row tint
--leaf:         #5A7A3F    normal values
--leaf-soft:    #D7E0C6    normal backgrounds
--line:         #D9D3C4    borders
--line-soft:    #E5DFD0    subtle internal dividers
```

### Typography
```
Display / headings:  Newsreader  (300 italic, 400, 500)
Body / UI:           Geist       (400, 500, 600)
Data / labels:       Geist Mono  (400, 500) — uppercase, 0.12–0.18em tracking
```

**Signature move:** 1–3 word key phrase in serif heading → Newsreader italic 300, Forest `#1F5041`

### Spatial
```
Card radius:         14px (standard), 12px (secondary), 16px (hero)
Card border:         1px solid var(--line-soft)
Card padding:        28px 32px (standard cards)
Row padding:         16px 0 (marker rows within groups)
Content gap:         24px between sections
Right panel width:   340px
```

### Status pill
```css
font: Geist Mono 500, 10px, uppercase, 0.12em tracking
padding: 5px 10px, radius: 999px

.pill.flag   — bg: #E8D4CC,  text: #C8563A
.pill.watch  — bg: rgba(107,117,111,.12), text: #3D4842
.pill.ok     — bg: #D7E0C6,  text: #5A7A3F
.pill.new    — bg: rgba(31,80,65,.10), text: #1F5041
```

### Buttons
```css
.btn-primary   — bg: #1A2620 (ink), text: #F6F3EC, radius: 999px, 11px 18px
                 hover: bg #1F5041 (forest), translateY(-1px)
.btn-secondary — bg: #FBF8F1, text: #1A2620, border: 1px #E5DFD0
                 hover: border #D9D3C4
.btn-ghost     — bg: transparent, text: #6B756F
                 hover: text #1A2620
```

### Animation
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: none; }
}
.fade { animation: fadeUp 0.7s ease forwards; opacity: 0; }
.d1 { animation-delay: 0.05s; }
.d2 { animation-delay: 0.12s; }
.d3 { animation-delay: 0.22s; }
.d4 { animation-delay: 0.32s; }
.d5 { animation-delay: 0.42s; }
.d6 { animation-delay: 0.52s; }
```

---

## Report data reference (Annual panel · Quest · Mar 14, 2026)

### Report identity
```
Title:          Annual panel
Lab:            Quest Diagnostics
Date:           March 14, 2026
Patient ID:     7A21K
Collected:      March 14, 2026
Uploaded:       March 15, 2026
Processing:     11.4 seconds
Total markers:  21
In range:       18
Flagged:        2 (Vitamin D, LDL Cholesterol)
Watch:          1 (Ferritin)
```

### 6 marker groups

| Group | Count | Flagged | Default |
|---|---|---|---|
| Lipids | 4 | 1 (LDL) | Expanded |
| Metabolic | 3 | 0 | Collapsed |
| Thyroid | 2 | 0 | Collapsed |
| Vitamins & Minerals | 4 | 1 flag + 1 watch (Vit D, Ferritin) | Expanded |
| Blood Count | 4 | 0 | Collapsed |
| Kidney & Liver | 4 | 0 | Collapsed |

### Key flagged markers
```
Vitamin D:        24 ng/mL    Ref 30–100    Flag
LDL Cholesterol:  142 mg/dL   Ref < 100     Flag
Ferritin:         38 ng/mL    Ref 30–300    Watch
```

### Pre-generated doctor questions (5)
```
1. Is 2,000 IU daily enough for my vitamin D, or do I need a loading dose?  → Vitamin D
2. When should I retest — 3 months or 6?                                    → Vitamin D
3. What's my 10-year cardiovascular risk score given this LDL?              → LDL Cholesterol
4. Is diet and exercise the right first step, or should we discuss meds?    → LDL Cholesterol
5. Would a full iron panel be useful given my ferritin trend?               → Ferritin
```

---

## Design references

| Reference | What to borrow |
|---|---|
| **Linear** (issue detail) | Sticky metadata sidebar, master-detail layout |
| **Stripe** (payment detail) | Receipt feeling — everything about this event in one page |
| **Apple Health PDF** | Clinical grouping, clear hierarchy |
| **NYT health articles** | Serif typography making clinical content feel trustworthy |
| **Bloomberg terminal** | Dense tabular data that's still readable |


##  References
- @context/lumen-project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md
- @context/lumen-branding.md
- @lib/mock-data.ts
- @context/screenshots/report-page-ui-1.png
- @context/screenshots/report-page-ui-2.png
- @context/screenshots/report-page-ui-3.png
- @context/screenshots/report-page-ui-4.png
- @context/screenshots/report-page-ui-5.png
- @context/screenshots/report-page-ui-6.png
- @context/screenshots/report-page-ui-7.png
