# 03 — Marker Groups

The core content of the report. 21 biomarkers organized into 6 collapsible clinical category groups. Groups with flagged markers are expanded by default; clean groups start collapsed. Each marker row expands inline to show a three-zone explanation panel.

---

## Purpose

- Present 21 markers without overwhelming — clinical grouping provides meaningful structure
- Prioritize the flagged content by expanding those groups on load
- Deliver the plain-English explanation, clinical rationale, and doctor questions inline — no page navigation required

---

## Layout overview

```
┌─────────────────────────────────────────────────────────────────┐
│  LIPIDS  4 markers  [1 flagged] [3 normal]               ▲      │  ← group header (expanded)
│  ─────────────────────────────────────────────────────────────  │
│  ● LDL Cholesterol [range bar=========●======] 142 mg/dL  Flag ›│  ← marker row (flagged)
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ PLAIN ENGLISH      │ WHY IT MATTERS     │ ASK YOUR DOCTOR  ││
│  │                    │                    │                  ││
│  │ Elevated, not      │ LDL correlates...  │ "What's my 10-yr ││
│  │ alarming.          │                    │  cardiovascular  ││
│  │                    │                    │  risk score?"    ││
│  │                    │                    │ + Add to questions│
│  └─────────────────────────────────────────────────────────────┘│
│  ○ HDL Cholesterol  [range bar ●===========] 58 mg/dL   Normal ›│
│  ○ Total Cholesterol [range bar====●========] 210 mg/dL  Watch  ›│
│  ○ Triglycerides    [range bar=●============] 88 mg/dL   Normal ›│
├─────────────────────────────────────────────────────────────────┤
│  METABOLIC  3 markers  [3 normal]                        ▼      │  ← group header (collapsed)
├─────────────────────────────────────────────────────────────────┤
│  THYROID  2 markers  [2 normal]                          ▼      │  ← collapsed
│  ...                                                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Groups container (`.marker-groups`)

```css
.marker-groups {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
```

Each group is its own card:

```css
.marker-group {
  background: var(--paper-elev);
  border: 1px solid var(--line-soft);
  border-radius: 14px;
  overflow: hidden;
}
```

Animation: `.fade .d3` through `.fade .d6` (each group staggered +1 delay class from the previous)

---

## Group header (`.group-header`)

```css
.group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: var(--paper-warm);
  border-bottom: 1px solid var(--line-soft);
  cursor: pointer;
  user-select: none;
  transition: background 0.15s;
}
.group-header:hover { background: var(--paper-elev); }

/* Collapsed group: no border-bottom (nothing below) */
.marker-group.collapsed .group-header {
  border-bottom: none;
  border-radius: 14px;
}
```

### Left — group identity (`.gh-left`)

```css
.gh-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.gh-name {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--ink);
}
.gh-count {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--ink-dim);
  letter-spacing: 0.1em;
}
```

Content: `LIPIDS` + `4 markers`

### Center — status summary pills (`.gh-pills`)

```css
.gh-pills {
  display: flex;
  gap: 6px;
  margin-left: auto;
  margin-right: 20px;
}
```

Compact `.pill` variants — same component, different padding:
```css
.pill.sm { padding: 3px 8px; font-size: 9px; }
```

Shown only when the group is **collapsed** — when expanded, the marker rows already show the status.

Examples:
- `1 flagged` — `.pill.flag.sm`
- `3 normal` — `.pill.ok.sm`
- `1 watch · 3 normal` — two pills

### Right — chevron (`.gh-chev`)

```css
.gh-chev {
  color: var(--ink-dim);
  transition: transform 0.25s ease;
}
/* Expanded */
.marker-group.expanded .gh-chev { transform: rotate(180deg); }
```

SVG: downward-pointing chevron `∨` — 14×14, path `M3 5 L8 11 L13 5`, strokeWidth 1.5, round caps, `currentColor`.

When group is expanded: rotates 180° (points up `∧`).

---

## The 6 groups — content and defaults

| Group name | Markers | Has flag | Default | Chevron default |
|---|---|---|---|---|
| LIPIDS | 4 | ✓ (LDL) | Expanded | ∧ (up) |
| METABOLIC | 3 | — | Collapsed | ∨ (down) |
| THYROID | 2 | — | Collapsed | ∨ |
| VITAMINS & MINERALS | 4 | ✓ (Vit D + Ferritin watch) | Expanded | ∧ |
| BLOOD COUNT | 4 | — | Collapsed | ∨ |
| KIDNEY & LIVER | 4 | — | Collapsed | ∨ |

---

## Marker list (`.marker-list`)

```css
.marker-list {
  /* Only visible when group is expanded */
  display: block;
}
.marker-group.collapsed .marker-list {
  display: none;
}
```

---

## Marker row (`.marker-row`)

```css
.marker-row {
  display: grid;
  grid-template-columns: 220px 1fr 180px 100px 28px;
  gap: 16px;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--line-soft);
  cursor: pointer;
  transition: background 0.12s;
}
.marker-row:last-of-type { border-bottom: none; }
.marker-row:hover { background: rgba(31, 80, 65, 0.02); }

/* Flagged row tint */
.marker-row.flag-row { background: rgba(200, 86, 58, 0.028); }
.marker-row.flag-row:hover { background: rgba(200, 86, 58, 0.048); }

/* Open state */
.marker-row.open { background: var(--paper-warm); }
```

### Column 1 — Marker name (`.mr-name`)

```css
.mr-name {
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: 10px;
  align-items: flex-start;
}
```

**Status dot (`.mr-dot`):**
```css
.mr-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  margin-top: 6px;             /* aligns with name baseline */
  flex-shrink: 0;
}
.mr-dot.flag  { background: var(--coral); }
.mr-dot.watch { background: var(--ink-soft); opacity: 0.5; }
.mr-dot.ok    { background: var(--leaf); opacity: 0.6; }
```

**Name block (`.mr-name-text`):**
```css
.mr-name-text { display: flex; flex-direction: column; gap: 3px; }
.mr-primary {
  font-family: var(--serif);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--ink);
  line-height: 1.2;
}
.mr-code {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--ink-dim);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

### Column 2 — Range bar (`.mr-range`)

```css
.mr-range {
  position: relative;
  height: 6px;
  border-radius: 999px;
  background: var(--line-soft);
}
.range-band {
  position: absolute;
  height: 100%;
  border-radius: 999px;
  background: var(--leaf-soft);
  opacity: 0.8;
}
.range-dot {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 999px;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 2.5px solid var(--paper-elev);  /* contrast halo */
}
.range-dot.ok    { background: var(--leaf); }
.range-dot.flag  { background: var(--coral); }
.range-dot.watch { background: var(--ink-soft); }
```

**How the band and dot positions work:**

The track represents the full measurable range of the biomarker. The green `range-band` occupies the reference range. The dot is positioned at the patient's value.

Example for LDL (ref < 100, value 142, scale 0–250):
- `range-band`: `left: 0; width: 40%` (0 to 100 on a 0–250 scale)
- `range-dot.flag`: `left: 57%` (142/250)

Example for Vitamin D (ref 30–100, value 24, scale 0–150):
- `range-band`: `left: 20%; width: 47%` (30 to 100 on 0–150 scale)
- `range-dot.flag`: `left: 16%` (24/150 — to the left of the green band)

### Column 3 — Value (`.mr-val`)

```css
.mr-val {
  text-align: right;
}
.mr-num {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.015em;
  color: var(--ink);
  line-height: 1;
}
.mr-unit {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-dim);
  margin-left: 3px;
}
.mr-ref {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--ink-dim);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: 4px;
  display: block;
}
```

### Column 4 — Status pill

Standard `.pill` component. See `00-index.md`.

### Column 5 — Chevron (`.mr-chev`)

```css
.mr-chev {
  color: var(--ink-faint);
  transition: transform 0.2s, color 0.2s;
}
.marker-row.open .mr-chev {
  transform: rotate(90deg);
  color: var(--forest);
}
```

SVG: right-pointing angle `›`, 14×14, path `M5 3 L11 8 L5 13`, strokeWidth 1.5, round caps.

On open: rotates 90° (points down) and colors Forest — indicates expansion, not navigation. (Different from the reports list chevron which slides horizontally to indicate navigation.)

---

## Marker expansion panel (`.marker-expand`)

```css
.marker-expand {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease, padding 0.3s ease;
  padding: 0 24px;
  background: var(--paper-warm);
  border-bottom: 1px solid var(--line-soft);
}
.marker-row.open ~ .marker-expand {
  max-height: 600px;
  padding: 24px 24px 28px;
}
```

### Inner grid (`.me-grid`)

```css
.me-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}
@media (max-width: 1100px) {
  .me-grid { grid-template-columns: 1fr; gap: 20px; }
}
```

Three zones — A, B, C.

### Zone A — Plain English (`.me-plain`)

**Label:**
```css
.me-label {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--forest);
  margin-bottom: 10px;
}
```
Content: `PLAIN ENGLISH`

**Text:**
```css
.me-plain-text {
  font-family: var(--serif);
  font-size: 19px;
  line-height: 1.4;
  letter-spacing: -0.01em;
  font-weight: 400;
  color: var(--ink-soft);
}
.me-plain-text .em {
  font-style: italic;
  font-weight: 300;
  color: var(--forest);
}
```

The key phrase inside the explanation gets inline italic Forest — the signature move applied at micro-scale.

**Explanations per flagged marker:**

| Marker | Explanation | Italic phrase |
|---|---|---|
| LDL Cholesterol | `"Elevated, [not alarming.] Worth a conversation."` | `not alarming.` |
| Vitamin D | `"Mildly low. [Common in winter] or if you're mostly indoors."` | `Common in winter` |
| Ferritin | `"In range but [on the low end.] Track it at your next visit."` | `on the low end.` |
| HDL | `"Good. [Higher is better] for HDL — you're in a healthy range."` | `Higher is better` |
| HbA1c | `"Well within normal. [No signs of prediabetes.]"` | `No signs of prediabetes.` |
| TSH | `"Right in the middle of normal. [Nothing to do here.]"` | `Nothing to do here.` |

### Zone B — Why it matters (`.me-why`)

**Label:** `WHY IT MATTERS`

**Text:**
```css
.me-why-text {
  font-family: var(--sans);
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--ink-soft);
}
```

**Content per flagged marker:**

**LDL:** `"LDL correlates with cardiovascular risk over decades. Clinical guidelines weigh it alongside your age, blood pressure, family history, and other markers — not as a standalone number."`

**Vitamin D:** `"Vitamin D helps your body absorb calcium and supports immune function. Levels below 20 can contribute to fatigue and bone loss over years, not days. The gap between 24 and 30 is small and addressable."`

**Ferritin:** `"Ferritin reflects how much iron your body has stored. Some people experience symptoms — fatigue, poor concentration — before their level drops below the reference minimum. Worth discussing with your context."`

### Zone C — Ask your doctor (`.me-ask`)

**Label:** `ASK YOUR DOCTOR`

**Questions:**
```css
.me-question {
  font-family: var(--serif);
  font-size: 16px;
  font-style: italic;
  font-weight: 300;
  line-height: 1.45;
  color: var(--forest);
  margin-bottom: 12px;
  padding-left: 0;
}
```

Questions in Newsreader italic 300, Forest — inside quotation marks:

**LDL questions:**
- `"What's my 10-year cardiovascular risk score given this LDL?"`
- `"Is diet and exercise the right first step, or should we discuss medication?"`

**Vitamin D questions:**
- `"Is 2,000 IU daily enough, or do I need a loading dose?"`
- `"When should I retest — 3 months or 6?"`

**Ferritin questions:**
- `"Would a full iron panel (iron, TIBC, saturation) be useful?"`

**Add to questions link (`.me-add`):**
```css
.me-add {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-dim);
  cursor: pointer;
  margin-top: 4px;
  transition: color 0.15s;
}
.me-add:hover { color: var(--forest); }
```

Content: `+ Add to questions`

Appears below each question. One click adds that specific question to the right panel's question list with a brief Forest pulse animation on the question panel.

---

## Interaction rules

- Only **one marker row** open at a time within a group (exclusive accordion)
- Clicking an open row closes it
- Clicking a different row closes the current one and opens the new one
- **Groups are independent** — one expanded marker in Lipids + one in Vitamins & Minerals can both be open simultaneously

### Group toggle:
- Click group header → toggles expanded/collapsed
- All child marker rows collapse when the group collapses (their open state is preserved — reopening the group restores the last open marker)

---

## Complete marker data table

All 21 markers across all 6 groups:

### LIPIDS (expanded by default)
| Name | Code | Value | Unit | Ref | Range dot | Status |
|---|---|---|---|---|---|---|
| LDL Cholesterol | LDL-C | 142 | mg/dL | < 100 | 57% (flag) | Flag |
| HDL Cholesterol | HDL-C | 58 | mg/dL | ≥ 40 | 40% (ok) | Normal |
| Total Cholesterol | Total-C | 210 | mg/dL | < 200 | 71% (watch) | Watch |
| Triglycerides | TG | 88 | mg/dL | < 150 | 23% (ok) | Normal |

### METABOLIC (collapsed)
| Name | Code | Value | Unit | Ref | Status |
|---|---|---|---|---|---|
| HbA1c | A1c | 5.4 | % | < 5.7 | Normal |
| Fasting Glucose | FBG | 94 | mg/dL | 70–99 | Normal |
| Insulin | INS | 7.2 | μIU/mL | 2–20 | Normal |

### THYROID (collapsed)
| Name | Code | Value | Unit | Ref | Status |
|---|---|---|---|---|---|
| TSH | TSH | 2.1 | μIU/mL | 0.4–4.0 | Normal |
| Free T4 | FT4 | 1.2 | ng/dL | 0.8–1.8 | Normal |

### VITAMINS & MINERALS (expanded by default)
| Name | Code | Value | Unit | Ref | Range dot | Status |
|---|---|---|---|---|---|---|
| Vitamin D | 25(OH)D | 24 | ng/mL | 30–100 | 16% (flag, left of band) | Flag |
| Ferritin | FER | 38 | ng/mL | 30–300 | 3% (watch, low end) | Watch |
| Vitamin B12 | B12 | 420 | pg/mL | 200–900 | 32% (ok) | Normal |
| Magnesium | Mg | 2.1 | mg/dL | 1.7–2.2 | 80% (ok) | Normal |

### BLOOD COUNT (collapsed)
| Name | Code | Value | Unit | Ref | Status |
|---|---|---|---|---|---|
| Hemoglobin | HGB | 14.2 | g/dL | 12–17.5 | Normal |
| Hematocrit | HCT | 42 | % | 36–50 | Normal |
| WBC | WBC | 6.8 | k/μL | 4–11 | Normal |
| Platelets | PLT | 248 | k/μL | 150–400 | Normal |

### KIDNEY & LIVER (collapsed)
| Name | Code | Value | Unit | Ref | Status |
|---|---|---|---|---|---|
| Creatinine | CREAT | 0.9 | mg/dL | 0.6–1.2 | Normal |
| eGFR | eGFR | 96 | mL/min | > 60 | Normal |
| ALT | ALT | 28 | U/L | 7–56 | Normal |
| AST | AST | 22 | U/L | 10–40 | Normal |

---

## Copy reference

```
GROUP HEADERS (+ default state)
  LIPIDS  4 markers              Expanded
  METABOLIC  3 markers           Collapsed  [3 normal]
  THYROID  2 markers             Collapsed  [2 normal]
  VITAMINS & MINERALS  4 markers Expanded
  BLOOD COUNT  4 markers         Collapsed  [4 normal]
  KIDNEY & LIVER  4 markers      Collapsed  [4 normal]

EXPANSION ZONE LABELS
  PLAIN ENGLISH  ·  WHY IT MATTERS  ·  ASK YOUR DOCTOR
  + Add to questions

PLAIN ENGLISH (flagged markers)
  LDL:      Elevated, not alarming. Worth a conversation.
  Vit D:    Mildly low. Common in winter or if you're mostly indoors.
  Ferritin: In range but on the low end. Track it at your next visit.

DOCTOR QUESTIONS
  LDL 1:    "What's my 10-year cardiovascular risk score?"
  LDL 2:    "Is diet and exercise right, or should we discuss meds?"
  VitD 1:   "Is 2,000 IU daily enough, or do I need a loading dose?"
  VitD 2:   "When should I retest — 3 months or 6?"
  Ferritin: "Would a full iron panel be useful?"
```

---

## Why this section works

- **Groups not a flat table.** "Is my thyroid okay?" maps directly to the Thyroid group. Users search for meaning by body system, not alphabetically by marker name.
- **Flagged groups expanded, clean groups collapsed.** Expand the signal, hide the noise. A user with 2 flags doesn't need to scan 18 normal rows to find them. Collapse by default is respectful of the user's attention.
- **Exclusive accordion within groups, independent across groups.** One open marker per group keeps the vertical space manageable. But allowing both the Lipids and Vitamins groups to each show an expanded marker simultaneously lets the user compare across systems.
- **Newsreader italic Forest in the plain-English text.** `"Elevated, [not alarming.]"` — the italic Forest phrase is the most reassuring part of the sentence. Visually drawing attention to it reduces anxiety. The design does emotional work.
- **`+ Add to questions` below every doctor question.** The user never has to retype or copy-paste. One click surfaces the question in the sticky right panel, ready for the appointment. The friction is essentially zero.
- **Flag-row Coral tint (`rgba(200,86,58,.028)`).** So faint it's barely perceptible — but it creates a subtle warmth on flagged rows that the eye picks up without consciously registering. It doesn't alarm; it orients.

 ## References
 
- @context/ai-interaction.md
- @context/current-feature.md
- @context/lumen-branding.md
- @context/report/00-index.md
- @context/report/01-report-header.md
- @context/report/02-ai-summary.md
- @lib/mock-data.ts
- @context/screenshots/report-page-ui-1.png
- @context/screenshots/report-page-ui-2.png
- @context/screenshots/report-page-ui-3.png
- @context/screenshots/report-page-ui-4.png
- @context/screenshots/report-page-ui-5.png
- @context/screenshots/report-page-ui-6.png
- @context/screenshots/report-page-ui-7.png