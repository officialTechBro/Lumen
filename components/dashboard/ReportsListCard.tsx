import type { RecentReportData, ReportStatsData } from "@/lib/db/reports";

interface Props {
  reports: RecentReportData[];
  stats: ReportStatsData;
}

function formatDate(date: Date | null): string {
  if (!date) return "—";
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  return `${month} ${day}, '${year}`;
}

function reportCode(date: Date | null): string {
  if (!date) return "—";
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `R-${year}-${month}`;
}

function StatusPills({ report }: { report: RecentReportData }) {
  if (report.flagCount === 0 && report.watchCount === 0) {
    return <span className="pill ok">All clear</span>;
  }
  return (
    <>
      {report.flagCount > 0 && (
        <span className="pill flag">{report.flagCount} flag</span>
      )}
      {report.watchCount > 0 && (
        <span className="pill watch">{report.watchCount} watch</span>
      )}
    </>
  );
}

export default function ReportsListCard({ reports, stats }: Props) {
  if (reports.length === 0) {
    return (
      <div className="card fade d5">
        <div className="card-head">
          <span className="card-title">
            <span>Recent reports</span>
            <span className="card-count">0 total</span>
          </span>
          <a href="/reports" className="card-link">Archive →</a>
        </div>
        <p style={{ padding: "24px", color: "var(--ink-soft)", fontSize: "15px" }}>
          No reports yet.
        </p>
      </div>
    );
  }

  return (
    <div className="card fade d5">
      <div className="card-head">
        <span className="card-title">
          <span>Recent reports</span>
          <span className="card-count">{stats.totalReports} total</span>
        </span>
        <a href="/reports" className="card-link">Archive →</a>
      </div>

      <div className="reports-head">
        <span>Report</span>
        <span>Lab</span>
        <span>Date</span>
        <span>Markers</span>
        <span>Status</span>
        <span />
      </div>

      {reports.map((report) => (
        <div key={report.id} className="report-row">
          <div>
            <div className="rr-title">
              {report.title ?? "Lab panel"}
              {report.badge && (
                <span className="pill new">
                  {report.badge === "latest" ? "Latest" : "First"}
                </span>
              )}
            </div>
            <div className="rr-sub">#{reportCode(report.collectedAt)}</div>
          </div>

          <div className="rr-sub">{report.labProvider ?? "—"}</div>
          <div className="rr-sub">{formatDate(report.collectedAt)}</div>

          <div className="rr-markers">{report.markerCount}</div>

          <div className="rr-status">
            <StatusPills report={report} />
          </div>

          <div className="rr-chev">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M5 2.5L9.5 7L5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
