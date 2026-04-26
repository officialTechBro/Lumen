import { MOCK_REPORT_ROWS } from "@/lib/mock-data";
import type { ReportRow } from "@/lib/types";

function StatusPills({ row }: { row: ReportRow }) {
  if (row.flagged === 0 && row.watch === 0) {
    return <span className="pill ok">All clear</span>;
  }
  return (
    <>
      {row.flagged > 0 && (
        <span className="pill flag">{row.flagged} flag</span>
      )}
      {row.watch > 0 && (
        <span className="pill watch">{row.watch} watch</span>
      )}
    </>
  );
}

export default function ReportsListCard() {
  return (
    <div className="card fade d5">
      <div className="card-head">
        <span className="card-title">
          <span>Recent reports</span>
          <span className="card-count">7 total</span>
        </span>
        <a href="#" className="card-link">Archive →</a>
      </div>

      <div className="reports-head">
        <span>Report</span>
        <span>Lab</span>
        <span>Date</span>
        <span>Markers</span>
        <span>Status</span>
        <span />
      </div>

      {MOCK_REPORT_ROWS.map((row) => (
        <div key={row.id} className="report-row">
          <div>
            <div className="rr-title">
              {row.title}
              {row.badge && <span className="pill new">{row.badge}</span>}
            </div>
            <div className="rr-sub">#{row.reportCode}</div>
          </div>

          <div className="rr-sub">{row.lab}</div>
          <div className="rr-sub">{row.date}</div>

          <div className="rr-markers">{row.markers}</div>

          <div className="rr-status">
            <StatusPills row={row} />
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
