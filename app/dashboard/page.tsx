import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import HeroReportCard from "@/components/dashboard/HeroReportCard";

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
        <PlaceholderCard label="Flagged Markers" />
        <PlaceholderCard label="Trends Grid" />
        <PlaceholderCard label="Reports List" />
      </div>
    </>
  );
}
