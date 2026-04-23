# 03 — Topbar

A sticky top bar within the main content area. Shows the current page breadcrumb on the left, search and action icon buttons on the right. Fades to transparent at the bottom so it doesn't hard-cut over the content below.

---

## Purpose

- **Orient the user** — mono breadcrumb always says where they are (e.g. `Dashboard / Overview`)
- **Provide global search** — access to markers, reports by keyword
- **Surface quick actions** — notifications bell (with unread dot) and settings gear

---

## Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ DASHBOARD / OVERVIEW                  [Search…] [🔔·] [⚙]       │
└──────────────────────────────────────────────────────────────────┘
```

- Height: natural (padding-based, ~52px total)
- Width: full width of `.main` area
- Position: `sticky; top: 0; z-index: 5`

---

## Container (`.topbar`)

```css
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 0 8px;
  position: sticky;
  top: 0;
  z-index: 5;
  background: linear-gradient(
    to bottom,
    var(--paper) 70%,
    rgba(246, 243, 236, 0)
  );
}
```

The gradient fade is key — the top 70% is solid Paper (`#F6F3EC`), then it fades to transparent. This means text in the cards below shows through gradually as you scroll, creating a soft "peek" instead of a hard clip.

---

## Left — Breadcrumb (`.crumb`)

```css
.topbar .crumb {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-dim);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
```

Breadcrumb strings per page:
| Page | Breadcrumb |
|---|---|
| home | `Dashboard / Overview` |
| reports | `Dashboard / Reports` |
| markers | `Dashboard / Markers` |
| flags | `Dashboard / Flagged` |
| questions | `Dashboard / Doctor questions` |
| reminders | `Dashboard / Reminders` |
| upload | `Dashboard / New upload` |
| settings | `Dashboard / Settings` |

---

## Right group (`.right`)

```css
.topbar .right {
  display: flex;
  align-items: center;
  gap: 12px;
}
```

Three elements: search input, bell button, settings button.

### Search input (`.search`)

```css
.topbar .search {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--paper-elev);
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  padding: 8px 16px;
  width: 280px;
  font-size: 13px;
  color: var(--ink-dim);
}
.topbar .search:hover { border-color: var(--line); }
```

- Left: magnifying glass SVG icon — 14×14, Ink-dim color
- Placeholder text: `Search markers, reports…`
- Not an `<input>` in the current implementation — visually styled as one, clicking would open a search modal in a real build
- 280px width, full pill shape (999px radius)

### Icon buttons (`.icobtn`)

```css
.topbar .icobtn {
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid var(--line-soft);
  background: var(--paper-elev);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-soft);
  transition: all 0.15s;
  position: relative;
}
.topbar .icobtn:hover {
  border-color: var(--line);
  color: var(--ink);
}
```

Two icon buttons:

**Bell (notifications)**
- Icon: Bell SVG glyph, 16×16
- Has a notification dot (`.dot`):
  ```css
  .icobtn .dot {
    position: absolute;
    top: 8px; right: 9px;
    width: 6px; height: 6px;
    border-radius: 999px;
    background: var(--coral);  /* #C8563A */
  }
  ```
  The Coral dot signals an unread notification. No count number — just presence/absence.
- `title="Reminders"` tooltip on hover

**Settings gear**
- Icon: Settings SVG glyph, 16×16
- No dot
- `title="Settings"` tooltip

---

## Copy reference

```
BREADCRUMB    DASHBOARD / OVERVIEW
SEARCH        Search markers, reports…
BELL TITLE    Reminders
GEAR TITLE    Settings
```

---

## Why this topbar works

- **Gradient fade instead of solid border.** A hard-edged topbar would feel like a browser toolbar — institutional. The gradient lets the content breathe through while still giving the breadcrumb a clean read.
- **Coral notification dot, no count.** In most dashboards, a badge number reads as "you're behind." A simple dot reads as "something's new" — softer, less alarming. Right for a health app.
- **Mono breadcrumb, not a page title.** The page title is the big serif `<h1>` in the page header below. The breadcrumb is just wayfinding — it earns its small, dim treatment.
- **280px search input.** Wide enough to type a marker name ("Vitamin D") or a lab ("Quest") without truncation, but not so wide it pushes the icon buttons off-screen at standard viewport widths.
