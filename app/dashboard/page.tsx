import DashboardView from "@/components/dashboard/DashboardView";
import HeroReportCard from "@/components/dashboard/HeroReportCard";
import FlaggedMarkersCard from "@/components/dashboard/FlaggedMarkersCard";
import TrendsGridCard from "@/components/dashboard/TrendsGridCard";
import ReportsListCard from "@/components/dashboard/ReportsListCard";
import {
  getLatestReport,
  getFlaggedMarkers,
  getMarkerTrends,
  getRecentReports,
  getReportStats,
} from "@/lib/db/reports";
import { prisma } from "@/lib/prisma";

// TODO: replace with session.user.id once NextAuth is wired
async function getDemoUserId(): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: { email: "demo@lumen.health" },
    select: { id: true },
  });
  return user?.id ?? null;
}

function formatTrackedSince(date: Date | null): string | null {
  if (!date) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function DashboardPage() {
  const userId = await getDemoUserId();

  if (!userId) {
    return (
      <DashboardView totalReports={0} trackedSince={null} lastUploadedAt={null}>
        <p style={{ padding: "24px", color: "var(--ink-soft)" }}>
          Demo user not found.
        </p>
      </DashboardView>
    );
  }

  const [latestReport, flaggedMarkers, markerTrends, recentReports, stats] =
    await Promise.all([
      getLatestReport(userId),
      getFlaggedMarkers(userId),
      getMarkerTrends(userId),
      getRecentReports(userId),
      getReportStats(userId),
    ]);

  return (
    <DashboardView
      totalReports={stats.totalReports}
      trackedSince={formatTrackedSince(stats.trackedSince)}
      lastUploadedAt={latestReport?.uploadedAt.toISOString() ?? null}
    >
      <HeroReportCard report={latestReport} stats={stats} />
      <FlaggedMarkersCard markers={flaggedMarkers} />
      <TrendsGridCard trends={markerTrends} />
      <ReportsListCard reports={recentReports} stats={stats} />
    </DashboardView>
  );
}
