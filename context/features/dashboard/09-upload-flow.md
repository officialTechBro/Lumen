# 09 — Upload Flow

A full-page view replacing the home dashboard when the user clicks "Upload new report." Three sequential states: **Idle** (dropzone) → **In progress** (progress bar + step indicators) → **Done** (results summary + CTAs). The state transitions are animated and driven by a simulated progress timer.

---

## Purpose

- **Make uploading feel trivial** — the dropzone is large, welcoming, and the only thing on screen
- **Show the work happening** — four named steps with a progress bar so the user knows the system is doing something real, not just a spinner
- **Land on a confident result** — the "done" state gives the summary before the user even opens the report, building anticipation

---

## Outer container (`.upload-wrap`)

```css
.upload-wrap {
  max-width: 820px;
  margin: 0 auto;
  padding-top: 24px;
}
```

Centered column layout, narrower than the home dashboard grid. The upload flow is a focused task — the narrower width removes distraction.

Animation: `.fade .d1`

---

## Upload header (`.upload-head`)

```css
.upload-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}
```

Left: "← Back to dashboard" — `.btn .btn-ghost` — returns to home view
Right: `Upload · Step 1 of 1` — Geist Mono 500, Ink-dim

The "step 1 of 1" is intentionally minimal — no multi-step progress bar. The whole upload from drop to results is a single action from the user's perspective.

---

## Page headline (`.upload-title`)

```css
.upload-title {
  font-size: 56px;
  line-height: 1;
  letter-spacing: -0.035em;
  font-weight: 400;
  font-family: var(--serif);
  margin-bottom: 16px;
}
```

Content: `Upload a report. [We'll read it.]`
- `We'll read it.` in `.italic` (Newsreader 300 italic, Forest)
- Two sentences — the period after "report" creates a deliberate pause

---

## Sub (`.upload-sub`)

```css
.upload-sub {
  color: var(--ink-soft);
  font-size: 18px;
  line-height: 1.55;
  max-width: 560px;
  margin-bottom: 40px;
}
```

Content: `PDF, image, or phone photo. Quest, Labcorp, Kaiser, Mayo, or any major lab. Typical read time is under fifteen seconds.`

Three short sentences. Three reassurances. "Under fifteen seconds" is the specific number that reduces friction.

---

## STATE 1 — Idle (`.dropzone`)

Shown when `stage === "idle"`.

```css
.dropzone {
  background: var(--paper-elev);
  border: 1.5px dashed var(--line);
  border-radius: 16px;
  padding: 64px 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}
.dropzone:hover {
  border-color: var(--forest);
  background: rgba(31, 80, 65, 0.03);
}
```

### Icon well (`.dz-ico`)
```css
.dz-ico {
  width: 64px;
  height: 64px;
  border-radius: 999px;
  background: rgba(31, 80, 65, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}
```
Contains an upload SVG icon — 28×28, Forest stroke `#1F5041`:
- Arrow stem: M10 13 V4
- Arrow head: M6 8 L10 4 L14 8, round caps/joins
- Tray: M4 14 V16 H16 V14, round cap

### Title (`.dz-title`)
Newsreader 500, 24px, tracking -0.02em: **"Drop your lab report here"**

### Sub (`.dz-sub`)
Geist Mono 500, 11px, Ink-dim, tracking 0.14em, uppercase:
**"Or click to choose a file · PDF, PNG, JPG up to 20MB"**

### Trust line (`.dz-trust`)
```css
.dz-trust {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 28px;
  font-family: var(--mono);
  font-size: 10px;
  color: var(--ink-dim);
  letter-spacing: 0.12em;
  flex-wrap: wrap;
}
```
Three items:
- `· Encrypted in transit`
- `· Deleted on request`
- `· HIPAA-aligned`

Middle-dot prefixed, consistent with the marketing site's fine-print pattern.

### Simulate button
`.btn .btn-primary` at bottom of dropzone: **"Simulate upload →"** with `<Ico.arrowRight/>`
Triggers `start()` which initiates the progress animation. (In production this would be the real file picker / drop handler.)

---

## STATE 2 — In progress (`.upload-progress`)

Shown when `stage !== "idle" && stage !== "done"`.

```css
.upload-progress {
  background: var(--paper-elev);
  border: 1px solid var(--line-soft);
  border-radius: 16px;
  padding: 36px;
}
```

### File identity row (`.up-file`)
```css
.up-file {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}
```
- **Icon well (`.up-file-ico`):** 44×44, border-radius 10px, Paper-warm bg — contains document SVG
- **File name (`.up-file-name`):** Newsreader 500, 18px — `quest-results-2026-03-14.pdf`
- **File meta (`.up-file-size`):** Geist Mono, Ink-dim — `2.4 MB · Quest Diagnostics · Page 1 of 6`
- **Progress % (right-aligned):** Geist Mono, Forest — `{Math.round(progress)}%`

### Progress bar (`.up-bar`)
```css
.up-bar {
  height: 3px;
  background: var(--line-soft);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 40px;
}
.up-bar-fill {
  height: 100%;
  background: var(--forest);
  border-radius: 999px;
  transition: width 0.3s;
}
```
Fill width is `progress + "%"` — a 0–100 integer.

### Step indicators (`.up-steps`)

Four steps shown as a vertical list. Each step has three visual states: **inactive** (opacity 0.35), **active** (opacity 1, Forest accented dot), **done** (opacity 1, Forest filled dot with checkmark).

```css
.up-step {
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 16px;
  align-items: start;
  opacity: 0.35;
  transition: opacity 0.3s;
}
.up-step.active, .up-step.done { opacity: 1; }
```

Step dot (`.us-dot`) — 28×28, circle, border 1.5px:
```css
.us-dot {
  width: 28px; height: 28px;
  border-radius: 999px;
  border: 1.5px solid var(--line);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--mono); font-size: 11px; color: var(--ink-dim);
  background: var(--paper-elev);
}
.up-step.active .us-dot { border-color: var(--forest); color: var(--forest); background: rgba(31,80,65,.08); }
.up-step.done .us-dot   { background: var(--forest); color: var(--paper); border-color: var(--forest); }
```

Done state shows `✓`; active state shows the step number; inactive shows the step number at low opacity.

| Step | Title | Sub | Active when | Done when |
|---|---|---|---|---|
| 1 | Uploading | `Encrypted · 2.4MB` | immediately | progress ≥ 30 |
| 2 | Parsing the file | `Extracted 21 markers from 6 pages` | progress ≥ 30 | progress ≥ 65 |
| 3 | Reading each result | `Matching reference ranges, drafting explanations` | progress ≥ 65 | progress ≥ 95 |
| 4 | Drafting your questions | `For flagged markers only` | progress ≥ 95 | progress ≥ 100 |

Step text (`.us-t`): Newsreader 500, 17px
Step sub (`.us-s`): Geist Mono, Ink-dim

### Foot note
Below the steps, centered, 28px margin-top:
Geist Mono, Ink-dim: `"You can leave this page — we'll email when it's ready."`
Reduces user anxiety about navigating away.

### Progress animation timing
The simulated progress runs in four frames:
| Frame | Stage | Duration | Progress target |
|---|---|---|---|
| 1 | uploading | 600ms | 0→30% |
| 2 | parsing | 900ms | 30→65% |
| 3 | reading | 1200ms | 65→95% |
| 4 | done | 400ms | 95→100% |

Total: ~3.1 seconds. Fast enough to feel real, slow enough to show all four steps.

---

## STATE 3 — Done (`.upload-done`)

Shown when `stage === "done"`.

```css
.upload-done {
  background: var(--paper-elev);
  border: 1px solid var(--line-soft);
  border-radius: 16px;
  padding: 40px;
}
```

### Success badge (`.ud-badge`)
```css
.ud-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  background: rgba(31, 80, 65, 0.08);
  border-radius: 999px;
  margin-bottom: 24px;
  color: var(--forest);
}
```
Contains: checkmark circle SVG (24×24, Forest stroke) + `Read complete · 11.4 seconds` (Geist Mono)
The checkmark SVG: `<circle r=11>` + `<path d="M7 12 L11 16 L17 9">` with 1.8 strokeWidth round caps.

### Done headline (`.ud-title`)
```css
.ud-title {
  font-size: 46px;
  line-height: 1.02;
  letter-spacing: -0.03em;
  font-weight: 400;
  font-family: var(--serif);
  margin-bottom: 16px;
}
```
Content: `Your annual panel is [ready.]`
- `ready.` in `.italic` (Newsreader 300 italic, Forest)

### Sub (`.ud-sub`)
Geist 400, 17px, Ink-soft: `21 markers read. Two flagged for a conversation with your doctor. One worth keeping an eye on. The rest look good.`

### Summary strip (`.ud-summary`)
```css
.ud-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: var(--paper-warm);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 32px;
}
```
Four cells with left borders (first has none):

| Label | Value | Color |
|---|---|---|
| Markers | 21 | Ink |
| Normal | 18 | Leaf `#5A7A3F` |
| Watch | 1 | Ink-soft |
| Flagged | 2 | Coral `#C8563A` |

Each cell: label in Geist Mono Ink-dim · value in `.ud-v` (Newsreader 500, 36px, tracking -0.025em)

### Flagged markers summary (`.ud-flagged`)

```css
.ud-flagged {
  border: 1px solid var(--line-soft);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 32px;
}
```

Header (`.ud-flag-head`): `Flagged markers` — Geist Mono, Ink-dim, Paper-warm bg

Three rows (`.ud-flag-row`), grid `60px 1fr auto`, gap 16px:

| Status | Name (code) | Value |
|---|---|---|
| `Flag` pill | Vitamin D (25(OH)D) | **24** ng/mL · Ref 30–100 |
| `Flag` pill | LDL Cholesterol (LDL-C) | **142** mg/dL · Ref < 100 |
| `Watch` pill | Ferritin (Iron stores) | **38** ng/mL · Ref 30–300 |

Name (`.ud-flag-name`): Newsreader 500, 17px + code in mono Ink-dim
Value (`.ud-flag-val`): Mono — strong (Newsreader 500, 19px) + unit/range in mono

### Done CTAs (`.ud-ctas`)
```css
.ud-ctas { display: flex; gap: 10px; }
```
1. **"Open full report →"** — `.btn .btn-primary` — navigates to home (`onDone()`)
2. **"Upload another"** — `.btn .btn-secondary` — resets state to idle (`reset()`)

---

## Why this upload flow works

- **Dropzone dashed border.** Dashed = "drop something here." The universal visual metaphor for a drag-and-drop target. No label needed.
- **Four named steps, not a spinner.** "Extracting 21 markers from 6 pages" and "Matching reference ranges, drafting explanations" — these aren't fake progress labels. They tell the user exactly what the system is doing. Builds trust.
- **"You can leave this page."** Most apps beg you to stay. Telling the user they can leave reduces anxiety and paradoxically makes them trust the product more.
- **Done state re-states the flagged markers.** The user just spent 3 seconds watching a progress bar. Showing the flagged markers immediately gives them a reason to keep reading. The summary strip with color-coded values (Leaf for normal, Coral for flagged) communicates "mostly fine, two things to address" in a single glance.
- **`ready.` in italic Forest.** The upload done headline uses the exact same signature move as the marketing site, the home dashboard, and the hero report card. The brand voice is consistent from marketing through to the core product action.
