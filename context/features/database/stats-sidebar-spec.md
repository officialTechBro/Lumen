# Stats & Sidebar Spec

## Overview

Replace all mock/static data in the dashboard sidebar and stats strip with real values from the Neon database. This covers three areas:

1. **Page header stats** — "7 reports · tracked since Feb 2024"
2. **Sidebar nav badges** — live counts on Reports, Markers, Flagged, Doctor Q's, Reminders
3. **Sidebar recent reports list** — real report names with status-derived colored circles

Do not change any layout, spacing, or visual design — only replace the data source.

---

## Requirements

- Create `src/lib/db/sidebar.ts` with all sidebar-specific data functions
- All stats and counts fetched server-side in the dashboard layout or page
- Sidebar nav badge counts must stay in sync with the database in real time (revalidate on report upload, marker update, question check)
- Sidebar recent reports: each report shows a **colored circle** derived from the report's dominant marker status — Coral for flagged, amber for watch-only, Leaf for all-clear
- "View all reports" link under the sidebar reports list links to `/reports`
- Keep the star icon for the active nav item
- Do not add pagination to the sidebar reports list — show the 5 most recent only

---

## File to create

### `src/lib/db/sidebar.ts`

```ts
import { prisma } from "@/lib/prisma"

// All counts for the sidebar nav badges
// Used by: every nav item that shows a number
export async function getSidebarCounts(userId: string): Promise<SidebarCountsData>

// 5 most recent reports for the sidebar list
// Used by: sidebar "Recent reports" section
export async function getSidebarReports(userId: string): Promise<SidebarReportData[]>

// Stats for the page header meta line
// Used by: "7 reports · tracked since Feb 2024"
export async function getDashboardStats(userId: string): Promise<DashboardStatsData>
```

---

## Type definitions

```ts
// src/lib/db/sidebar.ts

export type SidebarCountsData = {
  reports: number        // total ready reports — shown on "Reports" nav item
  markers: number        // total markers across all reports — shown on "Markers" nav item
  flagged: number        // markers with status "flagged" or "urgent" — shown on "Flagged" nav item
  questions: number      // unchecked questions across all reports — shown on "Doctor Q's" nav item
  reminders: number      // undone reminders for this user — shown on "Reminders" nav item
}

export type SidebarReportData = {
  id: string
  title: string | null
  labProvider: string | null
  collectedAt: Date | null
  // Determines the colored circle in the sidebar
  // "flag" | "watch" | "ok"
  dominantStatus: "flag" | "watch" | "ok"
}

export type DashboardStatsData = {
  totalReports: number
  trackedSince: Date | null   // date of user's oldest report
}
```

---

## Queries

### `getSidebarCounts`

```ts
export async function getSidebarCounts(userId: string): Promise<SidebarCountsData> {
  const [reports, markers, flagged, questions, reminders] = await Promise.all([

    // Total ready reports
    prisma.report.count({
      where: { userId, status: "ready" }
    }),

    // Total markers across all ready reports
    prisma.marker.count({
      where: { report: { userId, status: "ready" } }
    }),

    // Flagged markers (flagged + urgent) across all ready reports
    prisma.marker.count({
      where: {
        report: { userId, status: "ready" },
        status: { in: ["flagged", "urgent"] }
      }
    }),

    // Unchecked questions across all reports
    prisma.question.count({
      where: {
        report: { userId },
        isChecked: false
      }
    }),

    // Undone reminders for this user
    prisma.reminder.count({
      where: { userId, isDone: false }
    })

  ])

  return { reports, markers, flagged, questions, reminders }
}
```

### `getSidebarReports`

```ts
export async function getSidebarReports(userId: string): Promise<SidebarReportData[]> {
  const reports = await prisma.report.findMany({
    where: { userId, status: "ready" },
    orderBy: { collectedAt: "desc" },
    take: 5,
    select: {
      id: true,
      title: true,
      labProvider: true,
      collectedAt: true,
      flagCount: true,
      watchCount: true
    }
  })

  return reports.map(r => ({
    id: r.id,
    title: r.title,
    labProvider: r.labProvider,
    collectedAt: r.collectedAt,
    // Derive dominant status for the colored circle
    dominantStatus:
      r.flagCount > 0 ? "flag" :
      r.watchCount > 0 ? "watch" :
      "ok"
  }))
}
```

### `getDashboardStats`

```ts
export async function getDashboardStats(userId: string): Promise<DashboardStatsData> {
  const [totalReports, oldest] = await Promise.all([
    prisma.report.count({
      where: { userId, status: "ready" }
    }),
    prisma.report.findFirst({
      where: { userId, status: "ready" },
      orderBy: { collectedAt: "asc" },
      select: { collectedAt: true }
    })
  ])

  return {
    totalReports,
    trackedSince: oldest?.collectedAt ?? null
  }
}
```

---

## Sidebar nav items — badge rendering

Each nav item shows its count badge using the `SidebarCountsData` response.

```tsx
// src/components/dashboard/Sidebar.tsx (Server Component)

import { getSidebarCounts, getSidebarReports } from "@/lib/db/sidebar"

const counts = await getSidebarCounts(userId)
const recentReports = await getSidebarReports(userId)
```

Nav item badge render rules:

| Nav item | Badge value | Show badge when |
|---|---|---|
| Dashboard | — | Never |
| Reports | `counts.reports` | Always |
| Markers | `counts.markers` | Always |
| Flagged | `counts.flagged` | Always |
| Doctor Q's | `counts.questions` | `> 0` only |
| Reminders | `counts.reminders` | `> 0` only |
| Upload report | — | Never |
| Settings | — | Never |

Badge is hidden (not shown as `0`) for Doctor Q's and Reminders when the count is zero — these are action-oriented items that should only draw attention when there's something to act on.

---

## Sidebar reports list — colored circle

Each of the 5 recent reports in the sidebar shows a **colored circle** (not a star icon — stars are reserved for the active nav item).

```tsx
// Circle color mapping:
const circleColor = {
  flag:  "var(--coral)",       // #C8563A — has flagged markers
  watch: "#C8853A",            // amber — watch-only, no flags
  ok:    "var(--leaf)",        // #5A7A3F — all clear
}

// Render:
<span
  className="report-circle"
  style={{ background: circleColor[report.dominantStatus] }}
/>
```

Circle sizing: 8×8px, `border-radius: 999px`, `flex-shrink: 0`.

Report title in the sidebar:
- Font: Geist 400, 13px, Ink-soft
- Truncate at 1 line with `text-overflow: ellipsis`
- If `report.title` is null: fall back to `report.labProvider ?? "Lab panel"`

"View all reports" link below the list:
```tsx
<Link href="/reports" className="sidebar-link-all">
  View all reports →
</Link>
```

Styling: Geist Mono 10px, tracking 0.12em, uppercase, Forest color, hover: underline.

---

## Page header stats — meta line

The meta line below the dashboard H1:

```tsx
// src/components/dashboard/PageHeader.tsx

const stats = await getDashboardStats(userId)

// Format: "7 reports · tracked since Feb 2024"
const trackedSince = stats.trackedSince
  ? format(stats.trackedSince, "MMM yyyy")   // date-fns
  : null

const metaLine = trackedSince
  ? `${stats.totalReports} reports · tracked since ${trackedSince}`
  : `${stats.totalReports} reports`
```

If `totalReports === 0`: render `"No reports yet"` instead of the count line.

---

## Revalidation strategy

Counts and sidebar data must stay fresh after these mutations:

| Event | Revalidate |
|---|---|
| Report uploaded (status → `"ready"`) | `revalidatePath("/dashboard")` |
| Report deleted | `revalidatePath("/dashboard")`, `revalidatePath("/reports")` |
| Question checked/unchecked | `revalidatePath("/dashboard")` |
| Reminder marked done | `revalidatePath("/dashboard")` |

Use Next.js `revalidatePath` in the relevant Server Actions or API route handlers.

---

## Dashboard layout — fetch order

Sidebar data and page header stats should be fetched in the **dashboard layout** (`src/app/dashboard/layout.tsx`) so they are available to all dashboard sub-pages (not just home), and so the sidebar stays in sync across the Reports page, Markers page, etc.

```tsx
// src/app/dashboard/layout.tsx (Server Component)

import { getSidebarCounts, getSidebarReports, getDashboardStats } from "@/lib/db/sidebar"
import { auth } from "@/lib/auth"

export default async function DashboardLayout({ children }) {
  const session = await auth()
  const userId = session?.user?.id!

  const [counts, sidebarReports, stats] = await Promise.all([
    getSidebarCounts(userId),
    getSidebarReports(userId),
    getDashboardStats(userId)
  ])

  return (
    <div className="shell">
      <Sidebar counts={counts} recentReports={sidebarReports} />
      <main className="main">
        <Topbar />
        <PageHeader stats={stats} />
        {children}
      </main>
    </div>
  )
}
```

---

## Empty states

| Location | Empty condition | Behavior |
|---|---|---|
| Sidebar reports list | `sidebarReports.length === 0` | Show `"No reports yet"` in Ink-faint, no colored circles |
| Doctor Q's badge | `counts.questions === 0` | Hide badge entirely (do not show `0`) |
| Reminders badge | `counts.reminders === 0` | Hide badge entirely |
| Stats meta line | `stats.totalReports === 0` | Show `"No reports yet"` instead of count |

---

## References

- `src/lib/db/reports.ts` — parallel file for report-level queries, follow the same pattern
- `src/components/dashboard/Sidebar.tsx` — wire up `counts` and `recentReports` props
- `src/components/dashboard/PageHeader.tsx` — wire up `stats` prop
- `src/app/dashboard/layout.tsx` — fetch location for sidebar data
- `dashboard-reports-spec.md` — spec for the main content area cards
