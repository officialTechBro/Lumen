import DashboardView from "@/components/dashboard/DashboardView";
import HeroReportCard from "@/components/dashboard/HeroReportCard";
import FlaggedMarkersCard from "@/components/dashboard/FlaggedMarkersCard";
import TrendsGridCard from "@/components/dashboard/TrendsGridCard";
import ReportsListCard from "@/components/dashboard/ReportsListCard";

export default function DashboardPage() {
  return (
    <DashboardView>
      <HeroReportCard />
      <FlaggedMarkersCard />
      <TrendsGridCard />
      <ReportsListCard />
    </DashboardView>
  );
}
