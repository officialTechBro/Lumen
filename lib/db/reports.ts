import { prisma } from "@/lib/prisma";

export type FlaggedMarkerData = {
  id: string;
  name: string;
  code: string | null;
  category: string | null;
  value: number;
  unit: string;
  referenceMin: number | null;
  referenceMax: number | null;
  status: string;
  isUrgent: boolean;
  delta: number | null;
  deltaDirection: string | null;
  explanation: string;
  whyItMatters: string | null;
  confidence: number;
  questions: {
    id: string;
    text: string;
    priority: number;
    isChecked: boolean;
    addedBy: string;
  }[];
  sparklineValues: number[];
  refLow: number | null;
  refHigh: number | null;
};

async function getSparklineValues(
  markerName: string,
  userId: string,
  excludeReportId: string,
  currentValue: number
): Promise<number[]> {
  const history = await prisma.marker.findMany({
    where: {
      name: markerName,
      report: {
        userId,
        status: "ready",
        id: { not: excludeReportId },
      },
    },
    orderBy: {
      report: { collectedAt: "asc" },
    },
    select: { value: true },
    take: 5,
  });

  return [...history.map((m) => m.value), currentValue];
}

export async function getFlaggedMarkers(
  userId: string
): Promise<FlaggedMarkerData[]> {
  const latestReport = await prisma.report.findFirst({
    where: { userId, status: "ready" },
    orderBy: { collectedAt: "desc" },
    select: { id: true },
  });

  if (!latestReport) return [];

  const markers = await prisma.marker.findMany({
    where: {
      reportId: latestReport.id,
      status: { in: ["flagged", "borderline", "urgent"] },
    },
    orderBy: [
      { isUrgent: "desc" },
      { status: "asc" },
      { name: "asc" },
    ],
    select: {
      id: true,
      name: true,
      code: true,
      category: true,
      value: true,
      unit: true,
      referenceMin: true,
      referenceMax: true,
      status: true,
      isUrgent: true,
      delta: true,
      deltaDirection: true,
      explanation: true,
      whyItMatters: true,
      confidence: true,
    },
  });

  return Promise.all(
    markers.map(async (marker) => {
      const [sparklineValues, questions] = await Promise.all([
        getSparklineValues(marker.name, userId, latestReport.id, marker.value),
        prisma.question.findMany({
          where: {
            reportId: latestReport.id,
            relatedTo: marker.name,
          },
          orderBy: { priority: "asc" },
          select: {
            id: true,
            text: true,
            priority: true,
            isChecked: true,
            addedBy: true,
          },
        }),
      ]);

      return {
        ...marker,
        sparklineValues,
        questions,
        refLow: marker.referenceMin,
        refHigh: marker.referenceMax,
      };
    })
  );
}
