# Lumen

**AI-Powered Lab Result Translator** that turns confusing medical reports into plain-English explanations, flags, trends, and doctor-ready questions.


## Context Files

Read the following to get the full context of the project

- @context/lumen-project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md
- @context/lumen-branding.md

## Important: Non-standard Next.js version

This project uses Next.js 16 — APIs, conventions, and file structure may differ from training data. Before writing any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices.

## Commands

```bash
npm run dev      # start dev server (Turbopack)
npm run build    # production build
npm run lint     # ESLint
```

## Architecture

- **Framework**: Next.js 16 (App Router) with React 19, TypeScript, Tailwind CSS v4
- **App directory**: `app/` at the project root (not `src/app/`)
- **Styling**: Tailwind v4 via `@import "tailwindcss"` in `app/globals.css` — no `tailwind.config.js`; configuration lives in CSS or `postcss.config.mjs`
- **Fonts**: Geist Sans and Geist Mono loaded via `next/font/google` in `app/layout.tsx`, exposed as CSS variables `--font-geist-sans` / `--font-geist-mono`
- **Hydration**: `suppressHydrationWarning` is set on `<body>` to suppress mismatches caused by browser extensions
