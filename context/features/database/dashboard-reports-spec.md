# Dashboard — Reports Spec

## Overview

Replace all dummy/mock report data displayed in the main content area of the Lumen dashboard with real data fetched from the Neon database via Prisma. This covers the **Hero Report Card**, the **Flagged Markers Card**, the **Trends Grid**, and the **Reports List Card**.

Currently these four cards all read from a mock data module. After this change, every value — report title, lab provider, marker counts, flag counts, sparkline values, trends — must come from the database.

Do not touch the right-column Question Panel or the Report Actions card yet. Those are covered in a separate spec.

---

## Requirements

- Create `src/lib/db/reports.ts` with all data-fetching functions
- Fetch data directly in the dashboard Server Component (no client-side `useEffect` / `fetch`)
- All functions receive the authenticated `userId` from the session — never expose cross-user data
- Hero Report Card border accent derived from the report's dominant marker status (flag → Coral, watch → amber, all clear → Leaf)
- Trends Grid sparklines use real per-marker historical values across all of the user's reports
- Flag count shown in Coral if `> 0`, Ink-faint if `= 0` — driven by real `Report.flagCount`
- Keep the current design exactly as-is. Do not change layout, spacing, or typography.

---

## File to create

### `src/lib/db/reports.ts`

Export the following functions:

```ts
// The latest report for the current user's active profile
// Used by: Hero Report Card
export async function getLatestReport(userId: string): Promise<LatestReportData | null>

// Up to 3 flagged/borderline markers across the latest report
// Includes per-marker sparkline history (values from last 6 reports)
// Used by: Flagged Markers Card
export async function getFlaggedMarkers(userId: string): Promise<FlaggedMarkerData[]>

// 6 tracked markers with their full value history across all reports
// Used by: Trends Grid
export async function getMarkerTrends(userId: string): Promise<MarkerTrendData[]>

// Last 7 reports for the current user's active profile, newest first
// Used by: Reports List Card
export async function getRecentReports(userId: string): Promise<RecentReportData[]>

// Aggregate stats for the page header meta line
// Used by: Page Header ("7 reports · tracked since Feb 2024")
export async function getReportStats(userId: string): Promise<ReportStatsData>
```

---

## Type definitions

```ts
// src/lib/db/reports.ts

export type LatestReportData = {
  id: string
  title: string | null
  labProvider: string | null
  collectedAt: Date | null
  patientId: string | null
  processingTime: number | null
  markerCount: number
  normalCount: number
  flagCount: number
  watchCount: number
  urgentFlag: boolean
  summary: string | null
  // For the meta strip in the hero card
  uploadedAt: Date
  processedAt: Date | null
  // For the donut chart
  donutSegments: {
    normal: number
    watch: number
    flagged: number
  }
}

export type FlaggedMarkerData = {
  id: string
  name: string
  code: string | null
  value: number
  unit: string
  referenceMin: number | null
  referenceMax: number | null
  status: string   // "flagged" | "borderline"
  delta: number | null
  deltaDirection: string | null   // "up" | "down" | "stable"
  explanation: string
  // For the expansion panel
  whyItMatters: string | null
  // Doctor questions tied to this marker (from Question model)
  questions: {
    id: string
    text: string
    isChecked: boolean
  }[]
  // Sparkline: last 6 values oldest → newest
  sparklineValues: number[]
}

export type MarkerTrendData = {
  name: string
  code: string | null
  unit: string
  status: string
  referenceMin: number | null
  referenceMax: number | null
  currentValue: number
  // All historical values for this marker, oldest → newest
  values: number[]
  // Dates of each data point (parallel array with values)
  dates: Date[]
}

export type RecentReportData = {
  id: string
  title: string | null
  labProvider: string | null
  collectedAt: Date | null
  markerCount: number
  flagCount: number
  watchCount: number
  status: string
  // "latest" | "first" | null — badge shown on row 1 and last row
  badge: "latest" | "first" | null
}

export type ReportStatsData = {
  totalReports: number
  trackedSince: Date | null   // date of oldest report
}
```

---

## Query notes

### `getLatestReport`

```ts
// Find the most recent ready report for the user
const report = await prisma.report.findFirst({
  where: { userId, status: "ready" },
  orderBy: { collectedAt: "desc" },
  include: {
    markers: {
      select: { status: true }
    }
  }
})

// Compute donut segments from markers array
// normal  = markers where status === "normal"
// watch   = markers where status === "borderline"
// flagged = markers where status === "flagged" || "urgent"
```

### `getFlaggedMarkers`

```ts
// Get the latest report, then pull markers with status flagged or borderline
// For each marker, fetch its historical values from all older reports (same userId, same marker name)
// Limit to most recent 6 data points for sparkline

const historicalValues = await prisma.marker.findMany({
  where: {
    name: marker.name,
    report: { userId, status: "ready" }
  },
  orderBy: { report: { collectedAt: "asc" } },
  select: { value: true, report: { select: { collectedAt: true } } },
  take: 6
})
```

### `getMarkerTrends`

```ts
// Fixed set of 6 markers to track by canonicalName
// Priority order: LDL Cholesterol, Vitamin D, HbA1c, TSH, HDL Cholesterol, Ferritin
// For each, fetch all values across all ready reports for the user

const TRACKED_MARKERS = [
  "LDL Cholesterol",
  "Vitamin D",
  "HbA1c",
  "TSH",
  "HDL Cholesterol",
  "Ferritin"
]
```

### `getRecentReports`

```ts
// Fetch 7 most recent ready reports
// Add badge: first report in the user's history gets "first", most recent gets "latest"
const reports = await prisma.report.findMany({
  where: { userId, status: "ready" },
  orderBy: { collectedAt: "desc" },
  take: 7,
  select: {
    id: true,
    title: true,
    labProvider: true,
    collectedAt: true,
    flagCount: true,
    watchCount: true,
    status: true,
    _count: { select: { markers: true } }
  }
})
```

---

## Dashboard Server Component usage

```tsx
// src/app/dashboard/page.tsx (Server Component)

import {
  getLatestReport,
  getFlaggedMarkers,
  getMarkerTrends,
  getRecentReports,
  getReportStats
} from "@/lib/db/reports"
import { auth } from "@/lib/auth"

export default async function DashboardPage() {
  const session = await auth()
  const userId = session?.user?.id!

  // Parallel fetch — all four cards load simultaneously
  const [latestReport, flaggedMarkers, markerTrends, recentReports, stats] =
    await Promise.all([
      getLatestReport(userId),
      getFlaggedMarkers(userId),
      getMarkerTrends(userId),
      getRecentReports(userId),
      getReportStats(userId)
    ])

  return (
    <div className="home-grid">
      <HeroReportCard report={latestReport} />
      <FlaggedMarkersCard markers={flaggedMarkers} />
      <TrendsGrid trends={markerTrends} />
      <ReportsListCard reports={recentReports} stats={stats} />
    </div>
  )
}
```

---

## Hero Report Card — data mapping

| UI element | Source field |
|---|---|
| Badge `Latest report` | Always shown on this card |
| Badge `2 flagged` | `report.flagCount` |
| Badge `1 watch` | `report.watchCount` |
| H1 title | `report.title ?? "Lab panel"` |
| Sub line 1 | `report.labProvider` |
| Sub line 2 | `report.collectedAt` formatted as `"MMMM d, yyyy"` |
| Sub line 3 | `report.patientId ? "Patient ID " + report.patientId : null` |
| Stats strip — Markers | `report.markerCount` |
| Stats strip — In range | `report.normalCount` |
| Stats strip — Flagged | `report.flagCount` (Coral if > 0) |
| Stats strip — Read time | `report.processingTime ? report.processingTime + " sec" : "—"` |
| Footer strip | `collectedAt` · `uploadedAt` · `processingTime` |
| Donut chart | `report.donutSegments` |
| Summary paragraph | `report.summary` |

---

## Flagged Markers Card — data mapping

| UI element | Source field |
|---|---|
| Card count | `flaggedMarkers.length + " markers"` |
| Status dot | `marker.status === "flagged"` → Coral, `"borderline"` → Ink-soft |
| Marker name | `marker.name` |
| Marker code | `marker.code` |
| Sparkline | `marker.sparklineValues` (array of floats, oldest → newest) |
| Delta badge | `marker.delta` + `marker.deltaDirection` |
| Value | `marker.value` + `" " + marker.unit` |
| Reference | `"Ref " + (marker.referenceMin ?? "") + "–" + (marker.referenceMax ?? "")` |
| Status pill | `marker.status` |
| Expansion — Plain English | `marker.explanation` |
| Expansion — Why it matters | `marker.whyItMatters` |
| Expansion — Doctor questions | `marker.questions` |

---

## Trends Grid — data mapping

| UI element | Source field |
|---|---|
| Marker name | `trend.name` |
| Status pill | `trend.status` |
| Sparkline | `trend.values` (all historical, oldest → newest) |
| Current value | `trend.currentValue + " " + trend.unit` |
| Reference | `"Ref " + (trend.referenceMin ?? "") + "–" + (trend.referenceMax ?? "")` |

---

## Reports List — data mapping

| UI element | Source field |
|---|---|
| Row badge | `report.badge` (`"latest"` → Forest pill, `"first"` → Paper-warm pill) |
| Title | `report.title ?? "Lab panel"` |
| Report ID | Derived: `"#R-" + year + "-" + month` from `report.collectedAt` |
| Date | `report.collectedAt` formatted as `"MMM dd, ''yy"` |
| Lab | `report.labProvider ?? "—"` |
| Marker count | `report._count.markers` |
| Flag count | `report.flagCount` (Coral if > 0, Ink-faint if 0) |
| Status pill | Derived: flags > 0 → `"Flagged"`, watch > 0 → `"Watch"`, else → `"All clear"` |

---

## Empty states

Handle each card individually:

| Card | Empty condition | Message |
|---|---|---|
| Hero Report Card | `latestReport === null` | `"No reports yet. Upload your first lab report."` + upload CTA |
| Flagged Markers | `flaggedMarkers.length === 0` | `"Nothing flagged. Your latest results look clear."` (Leaf color) |
| Trends Grid | fewer than 2 reports | `"Upload a second report to see how your markers are moving."` |
| Reports List | `recentReports.length === 0` | `"No reports yet."` + upload CTA |

---

## References

- `src/lib/db/collections.ts` — follow the same pattern (server-side Prisma queries, typed return values, no client fetching)
- `src/app/dashboard/page.tsx` — the Server Component to update
- `src/components/dashboard/` — individual card components to wire up props
