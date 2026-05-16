---
name: Lumen Codebase Architecture
description: High-level architecture snapshot — dashboard fully scaffolded with mock data; no backend built yet
type: project
---

As of April 2026, the dashboard UI is fully implemented with mock data. No API routes, no Server Actions, no Prisma schema, no auth exist yet.

**Why:** MVP is in active UI scaffolding phase. The mock data layer (`lib/mock-data.ts`) will be replaced with real DB queries once Prisma is connected.

**How to apply:** Do not flag missing auth, missing API validation, or missing database layers — none of those features have been built yet. Audit focus is UI correctness, performance, and CSS/component quality.

Dashboard structure:
- app/dashboard/layout.tsx — wraps DashboardShell (client) with DashboardSidebar (server RSC prop)
- app/dashboard/page.tsx — RSC composing HeroReportCard, FlaggedMarkersCard, TrendsGridCard, ReportsListCard inside DashboardView
- components/dashboard/ — 12 components (see below)

RSC / client boundary:
- Server: DashboardSidebar, HeroReportCard, TrendsGridCard, ReportsListCard
- Client: DashboardShell, DashboardTopbar, DashboardPageHeader, DashboardView, SidebarProfile, FlaggedMarkersCard, UploadFlow, Sparkline

Data layer: lib/mock-data.ts — all mock, no Prisma. lib/types.ts — all shared types. lib/helpers.ts — pure utilities.
No tailwind.config.js (correct for v4). Tailwind configured via @theme in app/globals.css.
