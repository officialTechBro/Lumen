# 02 — AI Summary Band

A full-width tinted card immediately below the report header. Lumen speaking directly to the user in a single narrative paragraph about the whole report. Not a list — a considered sentence written the way a careful primary care doctor would speak.

---

## Purpose

- Give the user the "bottom line" before they read a single individual marker
- Establish the editorial voice of the product at its most direct
- Set emotional tone: "largely healthy, two things worth discussing" before showing any Coral flags

---

## Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│  LUMEN SUMMARY                                           Read more ↓   │
│                                                                        │
│  Your annual panel looks largely healthy, with two things worth        │
│  discussing at your next appointment. Your LDL cholesterol is          │
│  elevated — not alarming, but higher than the ideal target — and       │
│  your vitamin D is mildly low, which is common and straightforward     │
│  to address...                                                         │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Container (`.ai-summary`)

```css
.ai-summary {
  background: var(--paper-warm);        /* #EFEADF */
  border: 1px solid var(--line-soft);
  border-radius: 14px;
  padding: 28px 32px;
}
```

Animation: `.fade .d2`

---

## Header row (`.ais-head`)

```css
.ais-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
```

### Label (`.ais-label`)

```css
.ais-label {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--forest);
}
```

Content: `LUMEN SUMMARY`

### Toggle (`.ais-toggle`)

```css
.ais-toggle {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-dim);
  cursor: pointer;
  user-select: none;
  transition: color 0.15s;
}
.ais-toggle:hover { color: var(--ink-soft); }
```

Two states:
- Collapsed: `Read more ↓`
- Expanded: `Read less ↑`

Arrow characters: `↓` (U+2193) and `↑` (U+2191)

---

## Summary text (`.ais-text`)

```css
.ais-text {
  font-family: var(--serif);            /* Newsreader */
  font-size: 19px;
  line-height: 1.55;
  letter-spacing: -0.01em;
  font-weight: 400;
  color: var(--ink-soft);
  max-width: 740px;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

/* Collapsed: shows ~3 lines */
.ais-text.collapsed {
  max-height: 100px;           /* approximately 3 lines at 19px/1.55 */
  -webkit-mask-image: linear-gradient(
    to bottom,
    black 60%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    black 60%,
    transparent 100%
  );
}

/* Expanded: full text visible */
.ais-text.expanded {
  max-height: 600px;
  -webkit-mask-image: none;
  mask-image: none;
}
```

The gradient mask on the collapsed state creates a soft fade-out at the bottom — invites the user to read more without a hard truncation.

### The summary paragraph (full text)

> "Your annual panel looks largely healthy, with two things worth discussing at your next appointment. Your LDL cholesterol is elevated — not alarming, but higher than the ideal target — and your vitamin D is mildly low, which is common and straightforward to address. Everything else, including your blood sugar, thyroid, and kidney function, is within normal range. The ferritin result is worth monitoring on your next visit — it's technically in range but sitting on the lower end for your age group. Overall, this panel reflects a person in reasonable health with two specific, addressable data points."

**Five sentences:**
1. The headline verdict — "largely healthy, two things worth discussing"
2. The two flags named and contextualized — no alarm, just clarity
3. The good news — everything else normal
4. The watch item — ferritin, technically in range but worth noting
5. The closing reassurance

**Collapsed shows:** sentences 1–2 (first ~3 lines)
**Expanded shows:** all five sentences

### Typography note

The summary is rendered in Newsreader serif (not Geist sans). This is intentional: the AI summary is the editorial voice of Lumen speaking to the patient — a narrative paragraph, not a UI label. Serif rendering signals "read this carefully." Geist would make it feel like a system message.

---

## Interaction

**Collapsed → Expanded (click "Read more ↓"):**
1. `max-height: 100px → 600px` — smooth `0.3s ease`
2. Gradient mask fades out: `mask-image` transitions from gradient to `none`
3. Toggle text changes to `Read less ↑`

**Expanded → Collapsed (click "Read less ↑"):**
1. `max-height: 600px → 100px` — smooth `0.3s ease`
2. Gradient mask fades back in
3. Toggle text changes to `Read more ↓`

Default state: **collapsed** on page load (first 3 lines visible).

---

## Copy reference

```
LABEL        LUMEN SUMMARY
TOGGLE       Read more ↓  /  Read less ↑

FULL TEXT    Your annual panel looks largely healthy, with two
             things worth discussing at your next appointment.
             Your LDL cholesterol is elevated — not alarming, but
             higher than the ideal target — and your vitamin D is
             mildly low, which is common and straightforward to
             address. Everything else, including your blood sugar,
             thyroid, and kidney function, is within normal range.
             The ferritin result is worth monitoring on your next
             visit — it's technically in range but sitting on the
             lower end for your age group. Overall, this panel
             reflects a person in reasonable health with two
             specific, addressable data points.

COLLAPSED    Shows sentences 1–2 only (first ~3 lines)
```

---

## Why this section works

- **Paper-warm background, not Paper-elev.** The summary band uses the warmest tint on the page — `#EFEADF`. This visually separates it from the header card above (Paper-elev) and the marker groups below (mixed). The warmth signals: this is a human-generated interpretation, not raw data.
- **Newsreader serif for the summary text.** The AI summary is the only place on the page where a full editorial paragraph appears. Every other text element is metadata, labels, or data. The serif rendering elevates the summary to the same level as the headline — it's the product's considered opinion.
- **Gradient mask on collapsed state.** A hard truncation with "..." would look like a bug. A soft fade-out is an invitation — the user can see there's more text below the fold, and the fade signals "tap to read the rest" without a hard stop.
- **"Two things worth discussing" before any Coral flags.** The summary is positioned above the marker groups. The user reads "largely healthy" before they see any Coral. This is deliberate — it calibrates emotional response before presenting the detailed data. Lumen's job is to reduce anxiety, not create it.

##  References
- @context/lumen-project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md
- @context/lumen-branding.md
- @context/report/00-index.md
- @context/report/01-report-header.md
- @lib/mock-data.ts
- @context/screenshots/report-page-ui-1.png
- @context/screenshots/report-page-ui-2.png
- @context/screenshots/report-page-ui-3.png
- @context/screenshots/report-page-ui-4.png
- @context/screenshots/report-page-ui-5.png
- @context/screenshots/report-page-ui-6.png
- @context/screenshots/report-page-ui-7.png
