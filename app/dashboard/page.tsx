import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import HeroReportCard from "@/components/dashboard/HeroReportCard";
import FlaggedMarkersCard from "@/components/dashboard/FlaggedMarkersCard";
import TrendsGridCard from "@/components/dashboard/TrendsGridCard";
import ReportsListCard from "@/components/dashboard/ReportsListCard";

export default function DashboardPage() {
  return (
    <>
      <DashboardPageHeader />
      <div className="home-grid">
        <HeroReportCard />
        <FlaggedMarkersCard />
        <TrendsGridCard />
        <ReportsListCard />
      </div>
    </>
  );
}
