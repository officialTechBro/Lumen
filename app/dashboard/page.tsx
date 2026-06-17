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
import { redirect } from "next/navigation";
import { auth } from "@/auth";

function formatTrackedSince(date: Date | null): string | null {
  if (!date) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect("/login");

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
