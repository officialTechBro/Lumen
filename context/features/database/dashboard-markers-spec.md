# Dashboard — Markers Spec

## Overview

Replace all dummy/mock marker data displayed in the dashboard's **Flagged Markers Card** and individual marker expansion panels with real data from the Neon database via Prisma. This includes the expandable rows, sparkline values, delta badges, plain-English explanations, "Why it matters" copy, and the doctor question list per marker.

This spec is the marker-level complement to `dashboard-reports-spec.md`. Where that spec covers report-level data (title, lab, flag counts), this spec covers what lives *inside* the expanded rows — the clinical content per biomarker.

Do not add the full Report Detail page yet. That is a separate spec. This only covers what is visible on the dashboard home screen.

---

## Requirements

- Add marker-specific functions to `src/lib/db/reports.ts` (or create `src/lib/db/markers.ts` if the file becomes too large)
- Fetch data directly in server components — no client-side fetching for this data
- All functions receive `userId` from the session — never expose cross-user markers
- Sparkline status color derived from `Marker.status`: `flagged/urgent` → Coral, `borderline` → Ink-soft, `normal` → Leaf
- Delta badge color derived from `Marker.deltaDirection` + clinical context:
  - LDL/Total Cholesterol going `up` → Coral (bad)
  - Vitamin D/Ferritin going `down` → neutral grey (bad but different framing)
  - Any marker going `stable` or improving → Leaf
- Keep the current design exactly as-is

---

## File to update

### `src/lib/db/reports.ts` — add or update `getFlaggedMarkers`

The function already exists from `dashboard-reports-spec.md`. Ensure it returns all fields needed for the expanded panel:

```ts
export type FlaggedMarkerData = {
  id: string
  name: string
  code: string | null
  category: string | null
  value: number
  unit: string
  referenceMin: number | null
  referenceMax: number | null
  status: string                  // "flagged" | "borderline" | "urgent"
  isUrgent: boolean
  delta: number | null
  deltaDirection: string | null   // "up" | "down" | "stable"
  explanation: string             // plain-English one-liner (Zone A)
  whyItMatters: string | null     // clinical context paragraph (Zone B)
  confidence: number              // 0–1, shown as a small confidence indicator if < 0.90
  // Doctor questions tied to this marker
  questions: {
    id: string
    text: string
    priority: number
    isChecked: boolean
    addedBy: string               // "ai" | "user"
  }[]
  // Historical values for sparkline — max 6 data points, oldest → newest
  sparklineValues: number[]
  // Reference band boundaries for the sparkline chart
  refLow: number | null
  refHigh: number | null
}
```

---

## Query — building the sparkline

```ts
// For each flagged marker in the latest report,
// fetch the last 6 values for that marker across all of the user's reports.

async function getSparklineValues(
  markerName: string,
  userId: string,
  excludeReportId: string  // exclude the current report (it's already the last point)
): Promise<number[]> {
  const history = await prisma.marker.findMany({
    where: {
      name: markerName,
      report: {
        userId,
        status: "ready",
        id: { not: excludeReportId }
      }
    },
    orderBy: {
      report: { collectedAt: "asc" }
    },
    select: { value: true },
    take: 5   // 5 historical + 1 current = 6 points total
  })

  return [...history.map(m => m.value), /* currentValue appended by caller */]
}
```

---

## Query — fetching questions per marker

```ts
// Questions are tied to a Report, not to a Marker directly.
// Filter by relatedTo field (marker name string) within the current report.

const questions = await prisma.question.findMany({
  where: {
    reportId: latestReport.id,
    relatedTo: marker.name
  },
  orderBy: { priority: "asc" },
  select: {
    id: true,
    text: true,
    priority: true,
    isChecked: true,
    addedBy: true
  }
})
```

---

## Flagged Markers Card — expanded panel data mapping

### Zone A — Plain English

| UI element | Source field |
|---|---|
| Label | `"PLAIN ENGLISH"` — static |
| Explanation text | `marker.explanation` |
| Italic accent phrase | Derived by the AI during translation — stored in `explanation`. Wrap the key phrase in `<em>` on render if your component supports it, otherwise render as-is. |

### Zone B — Why it matters

| UI element | Source field |
|---|---|
| Label | `"WHY IT MATTERS"` — static |
| Paragraph | `marker.whyItMatters ?? "No additional context available for this marker."` |

### Zone C — Ask your doctor

| UI element | Source field |
|---|---|
| Label | `"ASK YOUR DOCTOR"` — static |
| Questions list | `marker.questions` sorted by `priority` ascending |
| Question text | `question.text` — rendered in Newsreader italic Forest |
| `+ Add to questions` | Client action: calls `PATCH /api/questions/[id]/toggle` or creates a new question record |
| Checked state | `question.isChecked` — if true, render with strikethrough |

---

## Delta badge — color logic

The `deltaDirection` field tells you the direction, but the *clinical meaning* of that direction differs per marker. Implement a helper:

```ts
// src/lib/utils/marker-delta.ts

type DeltaVariant = "up-bad" | "down-bad" | "stable" | "new"

const INVERTED_MARKERS = [
  // Markers where going DOWN is bad
  "Vitamin D", "HDL Cholesterol", "Ferritin", "Vitamin B12",
  "Magnesium", "Hemoglobin", "Hematocrit", "eGFR", "Platelets"
]

export function getDeltaVariant(
  markerName: string,
  direction: string | null
): DeltaVariant {
  if (!direction) return "new"
  if (direction === "stable") return "stable"
  const isInverted = INVERTED_MARKERS.includes(markerName)
  if (direction === "up") return isInverted ? "stable" : "up-bad"
  if (direction === "down") return isInverted ? "down-bad" : "stable"
  return "stable"
}
```

Map variant to badge styling:

| Variant | Background | Text | Icon |
|---|---|---|---|
| `up-bad` | `coral-soft` | `coral` | `↑` |
| `down-bad` | `rgba(107,117,111,.12)` | `ink-soft` | `↓` |
| `stable` | `leaf-soft` | `leaf` | `→` |
| `new` | `transparent` | `ink-faint` | `—` |

---

## Confidence indicator

If `marker.confidence < 0.90`, show a small warning below the marker name in the expanded panel:

```tsx
{marker.confidence < 0.90 && (
  <span className="confidence-warn">
    {/* Mono 10px, Ink-dim, uppercase */}
    AI CONFIDENCE {Math.round(marker.confidence * 100)}% — verify value against original report
  </span>
)}
```

This is important for photo-captured reports where OCR confidence may be lower.

---

## Urgent marker handling

If `marker.isUrgent === true`, the expansion panel shows a different Zone A:

```tsx
{marker.isUrgent ? (
  <div className="urgent-banner">
    {/* Coral bg, Paper text, full width */}
    <strong>This value may require urgent attention.</strong>
    {" "}Contact your doctor today or call 911 in an emergency.
  </div>
) : (
  <p className="me-plain-text">{marker.explanation}</p>
)}
```

The `isUrgent` flag is set by the hard-coded safety rail during AI processing — it bypasses the LLM explanation entirely.

---

## `+ Add to questions` — mutation

When the user clicks `+ Add to questions` next to a doctor question in the expansion panel:

```ts
// PATCH /api/questions/[id] — toggle isChecked
// POST /api/questions — create a new question if addedBy === "user"

// Optimistic UI: immediately add the question to the right-column Question Panel
// Revalidate: revalidatePath("/dashboard") after mutation
```

---

## Empty state — no flagged markers

```tsx
{flaggedMarkers.length === 0 && (
  <div className="empty-flagged">
    {/* Leaf color, centered, 48px padding */}
    <p>Nothing flagged. Your latest results look clear.</p>
  </div>
)}
```

This should only appear if the user has at least one report. If there are no reports at all, the parent Hero Report Card's empty state takes precedence and the Flagged Markers Card is not rendered.

---

## References

- `src/lib/db/reports.ts` — add `getFlaggedMarkers` update here
- `src/lib/utils/marker-delta.ts` — new helper for delta variant logic
- `src/components/dashboard/FlaggedMarkersCard.tsx` — wire up the new props
- `src/components/dashboard/MarkerExpandPanel.tsx` — the three-zone expansion panel
- `dashboard-reports-spec.md` — parent spec this one extends
