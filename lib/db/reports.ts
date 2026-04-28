import { prisma } from "@/lib/prisma";

export type LatestReportData = {
  id: string;
  title: string | null;
  labProvider: string | null;
  collectedAt: Date | null;
  patientId: string | null;
  processingTime: number | null;
  markerCount: number;
  normalCount: number;
  flagCount: number;
  watchCount: number;
  urgentFlag: boolean;
  summary: string | null;
  uploadedAt: Date;
  processedAt: Date | null;
  donutSegments: { normal: number; watch: number; flagged: number };
};

export type MarkerTrendData = {
  name: string;
  code: string | null;
  unit: string;
  status: string;
  referenceMin: number | null;
  referenceMax: number | null;
  currentValue: number;
  values: number[];
  dates: Date[];
};

export type RecentReportData = {
  id: string;
  title: string | null;
  labProvider: string | null;
  collectedAt: Date | null;
  markerCount: number;
  flagCount: number;
  watchCount: number;
  status: string;
  badge: "latest" | "first" | null;
};

export type ReportStatsData = {
  totalReports: number;
  trackedSince: Date | null;
};

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

export async function getLatestReport(
  userId: string
): Promise<LatestReportData | null> {
  const report = await prisma.report.findFirst({
    where: { userId, status: "ready" },
    orderBy: { collectedAt: "desc" },
    include: {
      markers: { select: { status: true } },
    },
  });

  if (!report) return null;

  const normal = report.markers.filter((m) => m.status === "normal").length;
  const watch = report.markers.filter((m) => m.status === "borderline").length;
  const flagged = report.markers.filter(
    (m) => m.status === "flagged" || m.status === "urgent"
  ).length;

  return {
    id: report.id,
    title: report.title,
    labProvider: report.labProvider,
    collectedAt: report.collectedAt,
    patientId: report.patientId,
    processingTime: report.processingTime,
    markerCount: report.markers.length,
    normalCount: normal,
    flagCount: report.flagCount,
    watchCount: report.watchCount,
    urgentFlag: report.urgentFlag,
    summary: report.summary,
    uploadedAt: report.uploadedAt,
    processedAt: report.processedAt,
    donutSegments: { normal, watch, flagged },
  };
}

const TRACKED_MARKERS = [
  "LDL Cholesterol",
  "Vitamin D",
  "HbA1c",
  "TSH",
  "HDL Cholesterol",
  "Ferritin",
];

function toUiStatus(dbStatus: string): string {
  if (dbStatus === "flagged" || dbStatus === "urgent") return "flag";
  if (dbStatus === "borderline") return "watch";
  return "ok";
}

export async function getMarkerTrends(
  userId: string
): Promise<MarkerTrendData[]> {
  const allHistory = await Promise.all(
    TRACKED_MARKERS.map((markerName) =>
      prisma.marker.findMany({
        where: {
          name: markerName,
          report: { userId, status: "ready" },
        },
        orderBy: { report: { collectedAt: "asc" } },
        select: {
          value: true,
          unit: true,
          code: true,
          status: true,
          referenceMin: true,
          referenceMax: true,
          report: { select: { collectedAt: true } },
        },
      })
    )
  );

  const results: MarkerTrendData[] = [];
  for (let i = 0; i < TRACKED_MARKERS.length; i++) {
    const history = allHistory[i];
    if (history.length === 0) continue;
    const latest = history[history.length - 1];
    results.push({
      name: TRACKED_MARKERS[i],
      code: latest.code,
      unit: latest.unit,
      status: toUiStatus(latest.status),
      referenceMin: latest.referenceMin,
      referenceMax: latest.referenceMax,
      currentValue: latest.value,
      values: history.map((h) => h.value),
      dates: history.map((h) => h.report.collectedAt as Date),
    });
  }
  return results;
}

export async function getRecentReports(
  userId: string
): Promise<RecentReportData[]> {
  const [reports, oldest] = await Promise.all([
    prisma.report.findMany({
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
        _count: { select: { markers: true } },
      },
    }),
    prisma.report.findFirst({
      where: { userId, status: "ready" },
      orderBy: { collectedAt: "asc" },
      select: { id: true },
    }),
  ]);

  return reports.map((report, i) => ({
    id: report.id,
    title: report.title,
    labProvider: report.labProvider,
    collectedAt: report.collectedAt,
    markerCount: report._count.markers,
    flagCount: report.flagCount,
    watchCount: report.watchCount,
    status: report.status,
    badge:
      i === 0 ? "latest" : report.id === oldest?.id ? "first" : null,
  }));
}

export async function getReportStats(
  userId: string
): Promise<ReportStatsData> {
  const [totalReports, oldest] = await Promise.all([
    prisma.report.count({ where: { userId, status: "ready" } }),
    prisma.report.findFirst({
      where: { userId, status: "ready" },
      orderBy: { collectedAt: "asc" },
      select: { collectedAt: true },
    }),
  ]);

  return {
    totalReports,
    trackedSince: oldest?.collectedAt ?? null,
  };
}
