import DashboardView from "@/components/dashboard/DashboardView";
import HeroReportCard from "@/components/dashboard/HeroReportCard";
import FlaggedMarkersCard from "@/components/dashboard/FlaggedMarkersCard";
import TrendsGridCard from "@/components/dashboard/TrendsGridCard";
import ReportsListCard from "@/components/dashboard/ReportsListCard";
import { getFlaggedMarkers } from "@/lib/db/reports";
import { prisma } from "@/lib/prisma";

// TODO: replace with session user once NextAuth is wired
async function getDemoUserId(): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: { email: "demo@lumen.health" },
    select: { id: true },
  });
  return user?.id ?? null;
}

export default async function DashboardPage() {
  const userId = await getDemoUserId();
  const markers = userId ? await getFlaggedMarkers(userId) : [];

  return (
    <DashboardView>
      <HeroReportCard />
      <FlaggedMarkersCard markers={markers} />
      <TrendsGridCard />
      <ReportsListCard />
    </DashboardView>
  );
}
