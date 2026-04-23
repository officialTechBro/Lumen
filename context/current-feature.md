# Current Feature: ShadCN Setup & Global Theme Foundation

## Status

In Progress

## Goals

- Install and initialize ShadCN UI in the project
- Set up the required base configuration for ShadCN components
- Update `globals.css` so the color tokens match the Lumen design system
- Add a dashboard route at `/dashboard`
- Add a reports route at `/reports`
- Add both light and dark theme variables in the global styles
- Set light mode as the default theme
- Ensure the dark mode palette is available and visually aligned with the website for later use

## Notes

- This phase is minimal — do not build the dashboard layout yet, only the ShadCN setup and theme foundation
- Light mode (default): clean, bright, soft background tones (`#F6F3EC` paper), readable foreground, subtle borders
- Dark mode: deep navy / dark slate background, soft elevated surfaces, muted borders, high-contrast text — premium, not harsh
- Use semantic CSS variables for: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `border`, `input`, `ring`
- Brand colors to incorporate: Forest `#1F5041` (primary), Coral `#C8563A` (flags), Leaf `#5A7A3F` (success), Ink `#1A2620` (text)
- Tailwind v4 — no `tailwind.config.js`; all config in CSS via `@theme` directive

## History

- Project setup and boilerplate cleanup
