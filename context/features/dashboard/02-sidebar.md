# 02 — Sidebar

The persistent left-side navigation. Brand mark at top, two nav groups (Library + Actions) in the middle, an upload CTA nudge above the footer, and a user profile row at the very bottom.

---

## Purpose

- **Anchor the brand** — the Lumen mark + wordmark is always visible, top-left
- **Route between views** — 8 nav buttons covering the full product (Dashboard, Reports, Markers, Flagged, Doctor Q's, Reminders, Upload, Settings)
- **Surface counts** — badge numbers on nav items tell the user what needs attention before they click
- **Nudge uploads** — the dashed-border CTA block keeps the primary product action visible without competing with the nav

---

## Layout

```
┌──────────────────────────────┐
│  ◉ Lumen                     │  ← brand (22px serif)
│                              │
│  LIBRARY                     │  ← group label (mono 10px)
│  ⌂ Dashboard                 │
│  ☰ Reports         7         │
│  ↗ Markers        23         │
│  ⚑ Flagged         2         │
│  ? Doctor Q's      3         │
│  🔔 Reminders      1         │
│                              │
│  ACTIONS                     │
│  ↑ Upload report             │
│  ⚙ Settings                  │
│                              │
│  ┌─────────────────────┐     │
│  │ New report?          │     │  ← dashed upload CTA
│  │ Drop a PDF · ~10 sec│     │
│  └─────────────────────┘     │
│                              │
│  [SC] Sarah Chen             │  ← profile row
│       Annual plan            │
└──────────────────────────────┘
```

---

## Container

```css
.sidebar {
  background: var(--paper-elev);       /* #FBF8F1 */
  border-right: 1px solid var(--line-soft);
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: sticky;
  top: 0;
  height: 100vh;
}
```

Width: 248px (set by the shell grid column)

---

## Brand block (`.brand`)

```css
.sidebar .brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--serif);     /* Newsreader */
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.02em;
  padding: 4px 8px;
}
```

- SVG mark: 22×22, Forest stroke `#1F5041`, same glyph as marketing site (circle + wave path)
- "Lumen" wordmark in Newsreader 500
- No hover state — this is not a link in the dashboard

---

## Nav group label (`.group-label`)

```css
.sidebar .group-label {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  color: var(--ink-dim);
  padding: 0 12px 8px;
  text-transform: uppercase;
}
```

Two groups:
1. **"Library"** — the data views
2. **"Actions"** — upload + settings

---

## Nav button (`.navbtn`)

```css
.sidebar .navbtn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 12px;
  border-radius: 8px;
  font-size: 14px;
  color: var(--ink-soft);
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: background 0.15s, color 0.15s;
}
.sidebar .navbtn:hover {
  background: var(--paper-warm);
  color: var(--ink);
}
.sidebar .navbtn.active {
  background: var(--ink);
  color: var(--paper);
}
```

### Icon well (`.ico`)
- 16×16px container, `flex-shrink: 0`
- Contains inline SVG icon (16×16 viewBox, 1.4 stroke, `currentColor` — inherits button color)

### Count badge (`.count`)
- `margin-left: auto` (pushes to right edge)
- Geist Mono, 10px, tracking 0.1em
- Default color: Ink-dim
- When button is active: `color: var(--mint)` `#A8E6CF` — Mint on dark background

### The 8 nav items

**Group: Library**
| ID | Label | Icon | Count |
|---|---|---|---|
| `home` | Dashboard | Home glyph | — |
| `reports` | Reports | Document glyph | 7 |
| `markers` | Markers | Trend glyph | 23 |
| `flags` | Flagged | Flag glyph | 2 |
| `questions` | Doctor Q's | Question mark circle | 3 |
| `reminders` | Reminders | Bell glyph | 1 |

**Group: Actions**
| ID | Label | Icon | Count |
|---|---|---|---|
| `upload` | Upload report | Upload arrow | — |
| `settings` | Settings | Gear glyph | — |

### Active state
Only one item is active at a time. Active item:
- Background: `var(--ink)` `#1A2620`
- Text + icon: `var(--paper)` `#F6F3EC`
- Count badge: `var(--mint)` `#A8E6CF`

---

## Upload CTA nudge (`.upload-cta`)

The dashed card nudge at the bottom of the nav group, before the profile.

```css
.sidebar .upload-cta {
  margin-top: auto;
  background: var(--paper-warm);
  border: 1px dashed var(--line);
  border-radius: 10px;
  padding: 18px;
  text-align: left;
  transition: all 0.2s;
}
.sidebar .upload-cta:hover {
  border-color: var(--forest);
  background: rgba(31, 80, 65, 0.04);
}
```

Content:
- **Title (`.t`):** "New report?" — Newsreader 500, 16px, tracking -0.01em, 4px bottom margin
- **Sub (`.s`):** "Drop a PDF · ~10 sec" — Geist Mono 500, 10px, tracking 0.14em, Ink-dim

`margin-top: auto` pushes it to the bottom of the flex column, above the profile. Clicking navigates to the upload view.

---

## Profile row (`.profile`)

The user identity block, always at the very bottom.

```css
.sidebar .profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 8px;
}
```

### Avatar
- 32×32px circle, `border-radius: 999px`
- Background: `var(--forest)` `#1F5041`
- Text: `var(--paper)`, Newsreader 500, 13px — user initials (`SC` for Sarah Chen)
- No image in v1 — initials-based avatar is the intended design

### Info block
- **Name (`.name`):** Geist 500, 13px
- **Plan (`.plan`):** Geist Mono 500, 9px, tracking 0.14em, Ink-dim, uppercase — shows `Annual plan`

---

## Icon set reference

All icons are 16×16 inline SVG, stroke-based (1.4 strokeWidth), `currentColor`, round line caps/joins.

| Name | Path description |
|---|---|
| `home` | House glyph — M3 10 L10 4 L17 10 V16 H12 V11 H8 V16 H3 Z |
| `report` | Document with fold + two text lines inside |
| `trend` | Trendline with two filled dots at turns |
| `flag` | Flag on pole — M5 3 V17 M5 4 H14 L12 7 L14 10 H5 |
| `question` | Circle with question mark arc + dot |
| `bell` | Bell with clapper arc |
| `upload` | Up arrow with tray — M10 13 V4 M6 8 L10 4 L14 8 + M4 14 V16 H16 |
| `settings` | Gear — circle + 8 stroke spokes |
| `search` | Magnifying glass — circle + diagonal line |
| `arrowRight` | H line + right arrowhead |
| `chevron` | Right-pointing angle — M8 5 L13 10 L8 15 |
| `up` / `down` | Up/down chevrons for delta indicators |

---

## Copy reference

```
BRAND        Lumen

GROUP 1      Library
  ITEMS      Dashboard · Reports (7) · Markers (23) ·
             Flagged (2) · Doctor Q's (3) · Reminders (1)

GROUP 2      Actions
  ITEMS      Upload report · Settings

CTA          New report?
             Drop a PDF · ~10 sec

PROFILE      SC avatar · Sarah Chen · Annual plan
```

---

## Why this sidebar works

- **Counts on every data view.** The visitor knows they have 2 flagged markers without opening the page — the sidebar informs passively.
- **Mint on active count badge.** The standard active state inverts to dark (Ink bg, Paper text). The count badge needs a tertiary color that works on Ink — Mint is the only color in the system that does.
- **Upload CTA is dashed, not solid.** The dashed border reads "drop zone" — a design cue borrowed from file upload conventions. It primes the user for the drag-and-drop metaphor.
- **`margin-top: auto` on the upload CTA.** This pushes the profile and CTA to the bottom regardless of how many nav items there are — a clean way to always anchor the identity at the footer of the sidebar.
- **Initials avatar, no photo.** Forest background, Paper initials. Deliberate — a photo would make the sidebar feel social. The initials treatment keeps it clinical and professional.

## Reference
- @context/lumen-project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md
- @context/lumen-branding.md
- @context/dashboard/00-index.md
- @context/dashboard/01-shell-layout.md