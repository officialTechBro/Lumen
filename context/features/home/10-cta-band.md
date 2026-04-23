# 10 — CTA Band (Final Conversion Block)

A centered, warmly-tinted final conversion section. The page's closing argument: a big italic headline, a one-line reframe, two buttons, and a tappable upload dropzone to make acting as frictionless as possible.

---

## Purpose

- **Re-offer the primary action** after the FAQ reassurances, to anyone who scrolled through without clicking
- **Reduce friction to almost zero** — the dropzone widget makes the visitor feel like they can begin without even leaving the page
- **Leave the page on a confident, generous note** with copy that doesn't pressure

This block is explicitly **not** a hard sell. No "limited time" nonsense, no "don't miss out." Just an invitation.

---

## Layout

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│                 Your next appointment,                         │
│                 ten minutes better.                            │
│                                                                │
│         Upload one report. See what Lumen does.                │
│         Keep going if it helps.                                │
│                                                                │
│         [Upload a report →]  [See the sample read]             │
│                                                                │
│         ┌──────────────────────────────────────────┐          │
│         │ [↑]  Drop a PDF, photo, or screenshot.   │          │
│         │      UP TO 20MB · ENCRYPTED · DELETE     │          │
│         └──────────────────────────────────────────┘          │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

- **ID anchor:** `#upload` — this is also the target for the nav's "Upload a report" CTA, the hero's CTA, and every other "upload" link on the page. So it's heavily scrolled-to.
- **Element:** uses a `<div>` not a `<section>` (since it's a closing band, not a content section)
- **Padding:** 140px vertical
- **Background:** `var(--paper-warm)` `#EFEADF` — same warm tint as the pricing section, bracketing the end of the marketing content
- **Top border:** 1px Line-soft
- **Text-align:** center (the whole block is centered)

---

## Anatomy

Four elements, stacked vertically, all centered:

1. **Big headline (H2)**
2. **Sub paragraph**
3. **Two buttons**
4. **Dropzone widget**

---

### 1. Big headline

- Font: Newsreader 400
- Size: `clamp(40px, 6vw, 84px)` — the largest H2 on the page, rivals the hero H1
- Line-height: 1
- Letter-spacing: -0.035em
- Max-width: 900px
- Margin: 0 auto 32px
- Animation: `.fade`
- Structure (two lines):
  > Your next appointment,
  > [ten minutes better.]
- `ten minutes better.` in italic Forest (the signature accent, one last time)

Using the same bold italic Forest move that appeared in the hero closes a frame. The page opens "in plain English" and closes "ten minutes better."

### 2. Sub paragraph

- Font: Geist 400, 19px
- Color: Ink-soft
- Max-width: 540px
- Margin: 0 auto 40px
- Animation: `.fade .d1`
- Copy:
  > "Upload one report. See what Lumen does. Keep going if it helps."

Three short sentences. No hedging, no urgency, no "transform your health journey." The third sentence — "Keep going if it helps" — is the permission-to-stop that paradoxically makes people more likely to continue.

### 3. Buttons

Container (`.btns`):
- `display: flex; gap: 12px; justify-content: center; flex-wrap: wrap`
- Animation: `.fade .d2`

Two buttons:
- **Primary:** `Upload a report →` — `.btn .btn-primary` with arrow micro-animation
- **Secondary:** `See the sample read` — `.btn .btn-secondary`, links back to `#sample`

The secondary button going *backward* (to a section the visitor has already seen) is intentional — it's a graceful off-ramp for anyone who wants another look before committing.

### 4. Dropzone widget (`.drop`)

The hook. Looks tappable, looks ready, looks trustworthy. Not a full form — just a visual affordance that when clicked triggers the real upload flow.

Container:
- Margin: 48px auto 0
- Max-width: 560px
- Text-align: left (breaks from parent's centered alignment)
- Padding: 20px 22px
- Border: 1.5px **dashed** `var(--line)` — the dashed border is critical. It reads as "drop target" instantly.
- Border-radius: 12px
- Background: `var(--paper-warm)` — same as the section, but the dashed border lifts it visually
- Display: `flex; align-items: center; gap: 16px`
- Transition: `all 0.2s ease`
- Animation: `.fade .d3`

Hover:
- Border color shifts to `var(--forest)`
- Background shifts to `rgba(31, 80, 65, 0.04)` — a faint forest wash

#### Dropzone anatomy

**Left — icon well (`.ico`)**
- 36 × 36px
- Border-radius: 8px (softly rectangular, not circle — feels file-like)
- Background: `var(--paper)`
- Border: 1px Line-soft
- `display: flex; align-items: center; justify-content: center`
- Flex-shrink: 0
- Contains: 18 × 18 inline SVG — an upload arrow
  - Upward arrow stem: M10 13 V4, 1.5 stroke Forest
  - Arrow head: M6 8 L10 4 L14 8, 1.5 stroke Forest, round caps/joins
  - Tray below: M4 14 V16 H16 V14, 1.5 stroke Forest, round caps

**Right — copy block (`.copy`)**
- `flex: 1`

Two lines of text:

1. **Title (`.t`)**
   - Font: Newsreader 500, 17px
   - Letter-spacing: -0.01em
   - Copy: **"Drop a PDF, photo, or screenshot."**

2. **Sub (`.s`)**
   - Font: Geist Mono 500, 10px
   - Tracking: 0.14em
   - Color: Ink-dim
   - Margin-top: 3px
   - Uppercase (from mono utility)
   - Copy: **"Up to 20MB · encrypted in transit · you control deletion"**

The sub is three quiet commitments, separated by middle dots — the same punctuation rhythm used in the pricing fine print and the header metadata. Creates a typographic motif across the page.

---

## Copy reference

```
H2          Your next appointment,
            ten minutes better.
            (italic forest: "ten minutes better.")

SUB         Upload one report. See what Lumen does.
            Keep going if it helps.

PRIMARY     Upload a report →
SECONDARY   See the sample read

DROPZONE
  TITLE     Drop a PDF, photo, or screenshot.
  SUB       Up to 20MB · encrypted in transit ·
            you control deletion
```

---

## Animation

Each element has a staggered `.fade` delay:
- H2: `.fade` (no delay)
- Sub: `.fade .d1` (0.1s)
- Buttons: `.fade .d2` (0.2s)
- Dropzone: `.fade .d3` (0.35s)

Total cascade time: ~1.25s. Slow enough to feel intentional, fast enough to not frustrate a quick scroller.

---

## Behavior notes

- Clicking the dropzone widget (anywhere on it) should open the file picker — same as the `Upload a report` button
- Supporting drag-and-drop onto the widget is ideal (wire it to the same upload handler with `dragover`/`drop` event listeners)
- The widget is **visual only** in the marketing page — the real upload happens in the app. But visually it should look and feel like a real dropzone

---

## Responsive

| Viewport | Adaptation |
|---|---|
| ≥ 720px | Everything centered, dropzone capped at 560px |
| < 720px | Container padding drops to 20px; buttons wrap if needed; dropzone fills container minus padding; headline clamps down smoothly |
| < 560px | Dropzone icon well shrinks to 32 × 32; title drops to 16px; sub line wraps to 2 lines (the middle dots become wrap points) |

---

## Why this section works

- **Mirrors the hero, doesn't repeat it.** The italic Forest accent on the closing phrase (`ten minutes better.`) echoes `in plain English` from the hero. Same typographic move, different words — bookends the page.
- **"Keep going if it helps"** is the most unusual line in the whole section. It's permission to stop, which paradoxically feels like a promise. No other health product trusts the visitor enough to say this.
- **The dropzone widget lowers perceived friction to near zero.** Even if the visitor doesn't drop anything, seeing a real-looking dropzone makes the first action feel concrete and doable — not an abstract "get started."
- **Three truth statements in the dropzone sub** (`Up to 20MB · encrypted in transit · you control deletion`) are the last words on the page before the footer. They work as a goodbye: here are three more specific, honest facts — now decide.
- **Background matches the pricing section.** Paper-warm tints at both the pricing and CTA sections create a visual "closing bracket" — the marketing content ends on the same tone it transitioned into at pricing.
