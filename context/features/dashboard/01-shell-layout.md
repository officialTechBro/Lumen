# 01 — Shell Layout

The outermost layout grid that holds every other element. Two columns: a fixed left sidebar and a scrollable main content area. The sidebar never scrolls; the main area scrolls independently.
route: /dashboard

---

## Purpose

Establish the spatial contract for the entire dashboard. Every other component is a child of either the sidebar or the main area. The shell is invisible — it doesn't have its own background or border — but its proportions drive everything.

---

## Structure

```
┌──────────────────────────────────────────────────────────────────┐
│ .shell (2-column grid, full viewport height)                     │
│                                                                  │
│  ┌──────────┐  ┌────────────────────────────────────────────┐   │
│  │ .sidebar │  │ .main                                      │   │
│  │ 248px    │  │ flex: 1                                    │   │
│  │ sticky   │  │ padding: 0 40px 60px                       │   │
│  │ 100vh    │  │                                            │   │
│  │          │  │ [Topbar — sticky at top of .main]          │   │
│  │          │  │ [Page header]                              │   │
│  │          │  │ [Cards — .home-grid]                       │   │
│  │          │  │                                            │   │
│  └──────────┘  └────────────────────────────────────────────┘   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## CSS

```css
.shell {
  display: grid;
  grid-template-columns: 248px 1fr;
  min-height: 100vh;
}
```

Body defaults:
- `background: var(--paper)` `#F6F3EC`
- `font-family: Geist, system-ui, sans-serif`
- `font-size: 15px`
- `line-height: 1.5`
- `-webkit-font-smoothing: antialiased`

Paper grain overlay on `body::before`: fixed, inset 0, 5% opacity, `mix-blend-mode: multiply` — same as the marketing site.

---

## Sidebar column

```css
.sidebar {
  background: var(--paper-elev);   /* #FBF8F1 */
  border-right: 1px solid var(--line-soft);
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}
```

Key behaviors:
- `position: sticky; top: 0; height: 100vh` — sidebar stays in viewport while main area scrolls
- `overflow-y: auto` — if sidebar items overflow on a short viewport, it becomes scrollable independently
- Paper-elev background (`#FBF8F1`) is one step warmer than the main Paper (`#F6F3EC`) — creates a soft left-to-right lightening
- 1px Line-soft right border is the only visible divider between sidebar and main

---

## Main column

```css
.main {
  padding: 0 40px 60px;
  max-width: 1320px;
  width: 100%;
}
```

Key behaviors:
- No `overflow: hidden` — content scrolls normally
- 40px horizontal padding + max-width 1320px keeps cards at a comfortable reading width on wide monitors
- 60px bottom padding gives breathing room at the bottom of the content
- The `.topbar` inside `.main` uses its own sticky positioning to float above the card grid

---

## Home content grid (`.home-grid`)

All four home page cards sit in a single-column flex container with 24px gaps:

```css
.home-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 8px;
}
```

Cards stack vertically in the order:
1. Hero Report card (full width)
2. Flagged Markers card (full width)
3. Trends Grid card (full width)
4. Reports List card (full width)

The split layout (`.home-split`) for side-by-side cards:
```css
.home-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
@media (max-width: 1200px) { .home-split { grid-template-columns: 1fr; } }
```

---

## Responsive notes

The shell currently has no responsive breakpoints — it's designed for desktop (≥ 1024px) as a first pass. Future mobile treatment:
- Sidebar collapses to a drawer (off-canvas) triggered by a hamburger button in the topbar
- Main area takes full width with 20px padding
- Cards reflow to single column (already done via the flex grid)

## Reference
- @context/lumen-project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md
- @context/lumen-branding.md
- @context/dashboard/00-index.md
