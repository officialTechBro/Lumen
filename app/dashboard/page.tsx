import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import HeroReportCard from "@/components/dashboard/HeroReportCard";
import FlaggedMarkersCard from "@/components/dashboard/FlaggedMarkersCard";
import TrendsGridCard from "@/components/dashboard/TrendsGridCard";

function PlaceholderCard({ label }: { label: string }) {
  return (
    <div className="placeholder-card">
      <span className="placeholder-card-label">{label}</span>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <>
      <DashboardPageHeader />
      <div className="home-grid">
        <HeroReportCard />
        <FlaggedMarkersCard />
        <TrendsGridCard />
        <PlaceholderCard label="Reports List" />
      </div>
    </>
  );
}
