# UI Component Spec

## Overview

This phase should only cover the initial ShadCN setup and global theme foundation for the dashboard UI. Keep the implementation minimal and do not build the dashboard layout yet.

## Requirements

- Install and initialize ShadCN UI in the project.
- Set up the required base configuration for ShadCN components.
- Update `globals.css` so the color tokens match the website design system.
- Dashboard route at /dashboard
- Reports  route at /reports
- Add both light and dark theme variables in the global styles.
- Set **light mode as the default theme**.
- Ensure the dark mode palette is available and visually aligned with the website for later use.


## Global style guidance

The global theme should feel consistent with the website:

- **Light mode (default):** clean, bright, soft background tones, readable foreground text, subtle borders, and polished muted surfaces.
- **Dark mode:** deep navy / dark slate background, soft elevated surfaces, muted borders, and high-contrast text that still feels premium rather than harsh.
- Use semantic CSS variables for background, foreground, card, popover, primary, secondary, muted, accent, border, input, and ring values.
- Keep the palette modern, minimal, and suitable for a premium dashboard experience.


## References

- @context/lumen-project-overview.md
- @context/lumen-branding.md

