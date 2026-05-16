# 05 — Doctor Question Panel (Sticky Right Column)

The sticky right-side panel. Always visible as the user scrolls through the left column. A pre-populated list of doctor questions generated from the report's flagged markers, plus a secondary actions card below it. The user can check off questions during their appointment, add new ones from the marker expansion panels, and export the list.

---

## Purpose

- Make the appointment-preparation action persistent — always accessible, never hidden
- Pre-populate with specific, useful questions so the user has immediate value without any effort
- Let the user check off questions in real time during the appointment
- Export or copy the list for sending to the doctor in advance

---

## Layout

```
┌──────────────────────────────────────────┐
│  YOUR QUESTIONS            5 questions   │  ← header
├──────────────────────────────────────────┤
│                                          │
│  □ Is 2,000 IU daily enough for my       │
│    vitamin D?                            │
│    RE: VITAMIN D                         │
│                                          │
│  □ When should I retest — 3 months or 6?│
│    RE: VITAMIN D                         │
│                                          │
│  □ What's my 10-year cardiovascular      │
│    risk score?                           │
│    RE: LDL CHOLESTEROL                   │
│                                          │
│  □ Is diet and exercise right, or should │
│    we discuss medication?                │
│    RE: LDL CHOLESTEROL                   │
│                                          │
│  ✓ Would a full iron panel be useful?    │  ← checked (done)
│    RE: FERRITIN                          │
│                                          │
├──────────────────────────────────────────┤
│  [Export as PDF →              ]         │
│  [Copy to clipboard            ]         │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│  REPORT ACTIONS                          │
│  ↗ Share report                          │
│  ↓ Download PDF                          │
│  ⌫ Delete report                         │
└──────────────────────────────────────────┘
```

---

## Sticky positioning

```css
.rd-right {
  position: sticky;
  top: 88px;                           /* topbar 68px + 20px */
  max-height: calc(100vh - 108px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
```

The right column sticks in place as the user scrolls the left column. On very short viewports where the panel exceeds `max-height`, it becomes independently scrollable.

Animation: `.fade .d2` (panel enters slightly after the header card)

---

## PART 1 — Question panel card (`.question-panel`)

```css
.question-panel {
  background: var(--paper-elev);
  border: 1px solid var(--line-soft);
  border-radius: 14px;
  overflow: hidden;
}
```

### Panel header (`.qp-header`)

```css
.qp-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px 14px;
  border-bottom: 1px solid var(--line-soft);
}
```

**Label (`.qp-label`):**
```css
font-family: var(--mono);
font-size: 11px;
letter-spacing: 0.16em;
text-transform: uppercase;
color: var(--forest);
```
Content: `YOUR QUESTIONS`

**Count badge (`.qp-count`):**
```css
font-family: var(--mono);
font-size: 10px;
letter-spacing: 0.1em;
color: var(--forest);
background: rgba(31, 80, 65, 0.10);
padding: 4px 9px;
border-radius: 999px;
```
Content: `5 questions` (updates dynamically as questions are added/removed)

---

### Question list (`.qlist`)

```css
.qlist {
  padding: 0 20px;
}
```

---

### Question item (`.qitem`)

```css
.qitem {
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 0;
  border-bottom: 1px solid var(--line-soft);
}
.qitem:last-child { border-bottom: none; }
```

### Checkbox (`.qi-check`)

```css
.qi-check {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 1.5px solid var(--line);        /* #D9D3C4 */
  background: var(--paper);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 2px;
  transition: all 0.15s;
}
.qi-check:hover { border-color: var(--forest); }

/* Checked state */
.qi-check.checked {
  background: var(--forest);
  border-color: var(--forest);
}
.qi-check.checked::after {
  content: '';
  display: block;
  width: 10px;
  height: 6px;
  border-left: 2px solid var(--paper);
  border-bottom: 2px solid var(--paper);
  transform: rotate(-45deg) translateY(-1px);
}
```

### Text block (`.qi-text`)

```css
.qi-text { display: flex; flex-direction: column; gap: 4px; }
```

**Question (`.qi-q`):**
```css
.qi-q {
  font-family: var(--sans);
  font-size: 14px;
  line-height: 1.5;
  color: var(--ink-soft);
  transition: color 0.2s, text-decoration 0.2s;
}

/* Checked/done state */
.qitem.done .qi-q {
  text-decoration: line-through;
  color: var(--ink-faint);
}
```

**Source label (`.qi-source`):**
```css
.qi-source {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-faint);
}
```
Format: `RE: VITAMIN D` / `RE: LDL CHOLESTEROL` / `RE: FERRITIN`

---

### The 5 pre-populated questions

Ordered by clinical priority (flag markers first, then watch):

| # | Question | Source | Default state |
|---|---|---|---|
| 1 | Is 2,000 IU daily enough for my vitamin D, or do I need a loading dose? | Vitamin D | Unchecked |
| 2 | When should I retest — 3 months or 6? | Vitamin D | Unchecked |
| 3 | What's my 10-year cardiovascular risk score given this LDL? | LDL Cholesterol | Unchecked |
| 4 | Is diet and exercise the right first step, or should we discuss medication? | LDL Cholesterol | Unchecked |
| 5 | Would a full iron panel (iron, TIBC, saturation) be useful? | Ferritin | Unchecked |

Row 5 in the layout diagram above is shown checked (as a state example) — default is all 5 unchecked.

---

### Adding questions

When the user clicks `+ Add to questions` in a marker expansion panel on the left:

1. The new question appears at the bottom of the list with a brief entrance animation:
   - `opacity: 0 → 1`, `translateY(8px → 0)`, `0.3s ease`
2. The count badge updates: `5 questions → 6 questions`
3. The question panel gets a brief Forest pulse:
   ```css
   @keyframes pulse {
     0%   { box-shadow: 0 0 0 0 rgba(31,80,65,.2); }
     70%  { box-shadow: 0 0 0 8px rgba(31,80,65,0); }
     100% { box-shadow: none; }
   }
   .question-panel.pulse { animation: pulse 0.4s ease; }
   ```

---

### CTA row (`.qp-ctas`)

```css
.qp-ctas {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 20px 20px;
  border-top: 1px solid var(--line-soft);
}
```

**Export as PDF →** — `.btn-primary` full-width
```css
background: var(--ink);
color: var(--paper);
font: Geist 500 14px;
padding: 12px 0;
border-radius: 999px;
text-align: center;
width: 100%;
```
Content: `Export as PDF →`

On click: generates a clean 1-page PDF containing:
- Report title, lab, date
- The checked + unchecked question list (checked items shown with strikethrough)
- Footer: "Prepared with Lumen · lumen.health"

**Copy to clipboard** — `.btn-secondary` full-width
```css
background: var(--paper-elev);
border: 1px solid var(--line-soft);
color: var(--ink);
padding: 11px 0;
border-radius: 999px;
text-align: center;
width: 100%;
```
Content: `Copy to clipboard`

On click:
- Copies all unchecked questions as plain text, one per line
- Button briefly changes: `Copy to clipboard → Copied! ✓` (Forest text, 1.5s), then resets

---

## PART 2 — Report actions card (`.report-actions`)

A secondary, smaller card below the question panel. Less prominent — it handles housekeeping, not the primary workflow.

```css
.report-actions {
  background: var(--paper-warm);
  border: 1px solid var(--line-soft);
  border-radius: 12px;
  padding: 16px 20px;
}
```

### Header

```css
.ra-label {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-dim);
  margin-bottom: 12px;
}
```
Content: `REPORT ACTIONS`

### Action links

```css
.ra-action {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 0;
  border-bottom: 1px solid var(--line-soft);
  font-family: var(--sans);
  font-size: 13px;
  color: var(--ink-soft);
  cursor: pointer;
  transition: color 0.15s;
}
.ra-action:last-child { border-bottom: none; }
.ra-action:hover { color: var(--ink); }
.ra-action.danger:hover { color: var(--coral); }
```

**Icon (`.ra-ico`):**
```css
width: 14px; height: 14px; flex-shrink: 0; color: currentColor;
```

Three actions:

| Icon | Label | Danger |
|---|---|---|
| Share nodes SVG | Share report | No |
| Download arrow SVG | Download PDF | No |
| Trash SVG | Delete report | Yes (Coral on hover) |

### Delete confirmation (inline, not modal)

When "Delete report" is clicked, it is replaced in-place with a confirmation block:

```css
.ra-confirm {
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ra-confirm-text {
  font-family: var(--sans);
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.5;
}
.ra-confirm-btns {
  display: flex;
  gap: 8px;
}
```

Confirmation text: `"Are you sure? This can't be undone."`

Two buttons:
- `Delete` — `.btn-primary` small variant but with `background: var(--coral)` override, text: Paper
- `Cancel` — `.btn-ghost` small, Ink-soft — restores the action link

No modal. No dimmed backdrop. The replacement happens in-place within the actions card — contained and low-drama.

---

## Interaction summary

| Action | Behavior |
|---|---|
| Click checkbox | Toggle done state — strikethrough + Ink-faint on text |
| Click `+ Add to questions` (from left column) | Append question, pulse panel, update count |
| Click `Export as PDF →` | Generate PDF of question list |
| Click `Copy to clipboard` | Copy unchecked questions as plain text, flash "Copied! ✓" |
| Click `Share report` | Opens share sheet / copy link |
| Click `Download PDF` | Downloads the translated report as PDF |
| Click `Delete report` | In-place confirmation swap |
| Click `Delete` (confirm) | Delete report, navigate back to reports list |
| Click `Cancel` (confirm) | Restores the action link, no deletion |

---

## Copy reference

```
QUESTION PANEL
  LABEL        YOUR QUESTIONS
  COUNT        5 questions

  Q1           Is 2,000 IU daily enough for my vitamin D,
               or do I need a loading dose?
               RE: VITAMIN D

  Q2           When should I retest — 3 months or 6?
               RE: VITAMIN D

  Q3           What's my 10-year cardiovascular risk score
               given this LDL?
               RE: LDL CHOLESTEROL

  Q4           Is diet and exercise the right first step,
               or should we discuss medication?
               RE: LDL CHOLESTEROL

  Q5           Would a full iron panel (iron, TIBC,
               saturation) be useful?
               RE: FERRITIN

  CTA 1        Export as PDF →
  CTA 2        Copy to clipboard
  COPIED       Copied! ✓

REPORT ACTIONS
  LABEL        REPORT ACTIONS
  ACTION 1     Share report
  ACTION 2     Download PDF
  ACTION 3     Delete report

DELETE CONFIRM
  TEXT         Are you sure? This can't be undone.
  CONFIRM      Delete
  CANCEL       Cancel
```

---

## Why this panel works

- **Pre-populated, not empty.** A user arriving at an empty question list would feel like the product failed. Five auto-generated questions from the two flagged markers means the user has immediate value — they can export the list without clicking anything. The product did the work.
- **Sticky, always visible.** The question list is the appointment-preparation tool. If it disappeared on scroll, the user would have to hunt for it. Keeping it sticky means they can scroll through 21 markers and the list is always there — accumulating, ready to export.
- **Checkbox strikethrough during the appointment.** The interaction model is: user sits in the doctor's office, opens Lumen on their phone, checks off questions as they get answered. The strikethrough is satisfying and clear — done vs not done without any ambiguity.
- **`+ Add to questions` in the marker groups maps to this panel.** The two sides of the page (left: marker explanations / right: question list) are connected by a single click. The pulse animation on the panel confirms the action landed. No tooltip, no confirmation dialog — just evidence.
- **In-place delete confirmation.** Showing a modal for "Delete report" would feel disproportionate to the action — it's a common interaction in a product that handles medical data. The inline confirmation within the actions card is lower-drama, still safe. The `Cancel` link looks and behaves differently from the `Delete` button — no accidental taps.
- **"Copied! ✓" flash on the clipboard button.** The most useful feedback for a copy action is immediate and temporary. The button changes text for 1.5 seconds, then resets. No toast notification needed — the button IS the notification.



 ## References
 
- @context/ai-interaction.md
- @context/current-feature.md
- @context/lumen-branding.md
- @context/report/00-index.md
- @context/report/01-report-header.md
- @context/report/02-ai-summary.md
- @context/report/03-marker-groups.md
- @context/report/04-full-marker-table.md
- @lib/mock-data.ts
- @context/screenshots/report-page-ui-1.png
- @context/screenshots/report-page-ui-2.png
- @context/screenshots/report-page-ui-3.png
- @context/screenshots/report-page-ui-4.png
- @context/screenshots/report-page-ui-5.png
- @context/screenshots/report-page-ui-6.png
- @context/screenshots/report-page-ui-7.png