import type { LatestReportData, ReportStatsData } from "@/lib/db/reports";
import { donutArcLen } from "@/lib/helpers";

interface Props {
  report: LatestReportData | null;
  stats: ReportStatsData;
}

const CIRC = 314;

function formatLongDate(date: Date | null): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatShortDate(date: Date | null): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

function formatTrackedSince(date: Date | null): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(date);
}

export default function HeroReportCard({ report, stats }: Props) {
  if (!report) {
    return (
      <div className="hero-report fade d2">
        <div className="hr-left">
          <p style={{ color: "var(--ink-soft)" }}>
            No reports yet. Upload your first lab report.
          </p>
        </div>
      </div>
    );
  }

  const { normal, watch, flagged } = report.donutSegments;
  const total = normal + watch + flagged;

  const normalLen = donutArcLen(normal, total);
  const watchLen = donutArcLen(watch, total);
  const flagLen = donutArcLen(flagged, total);
  const watchOffset = -normalLen;
  const flagOffset = -(normalLen + watchLen);

  const subLine = [
    report.labProvider,
    formatLongDate(report.collectedAt),
    report.patientId ? `Patient ID ${report.patientId}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="hero-report fade d2">
      {/* Left column */}
      <div className="hr-left">
        <div className="badges">
          <span className="pill new">Latest report</span>
          {report.flagCount > 0 && (
            <span className="pill flag">{report.flagCount} flagged</span>
          )}
          {report.watchCount > 0 && (
            <span className="pill watch">{report.watchCount} watch</span>
          )}
        </div>

        <h2 className="hr-title">
          {report.title ?? "Lab panel"},{" "}
          <span className="italic">explained.</span>
        </h2>

        <p className="hr-sub">{subLine}</p>

        <div className="hr-ctas">
          <button className="btn btn-primary" type="button">
            Open full report →
          </button>
          <button className="btn btn-secondary" type="button">
            Draft my questions
          </button>
        </div>

        <div className="hr-meta">
          <div className="hr-meta-item">
            <div className="lbl">Tracked since</div>
            <div className="v">{formatTrackedSince(stats.trackedSince)}</div>
          </div>
          <div className="hr-meta-item">
            <div className="lbl">Total reports</div>
            <div className="v">{stats.totalReports}</div>
          </div>
          <div className="hr-meta-item">
            <div className="lbl">Read time</div>
            <div className="v">
              {report.processingTime != null ? `${report.processingTime} sec` : "—"}
            </div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="hr-right">
        <div className="hr-summary">
          <div className="hr-sum-head">
            <span>Summary · {formatShortDate(report.collectedAt)}</span>
            <span>{total} markers</span>
          </div>

          <svg className="hr-donut" width={120} height={120} viewBox="0 0 120 120" aria-hidden="true">
            {/* Base ring */}
            <circle cx={60} cy={60} r={50} fill="none" stroke="#E5DFD0" strokeWidth={14} />
            {/* Normal arc */}
            <circle
              cx={60} cy={60} r={50}
              fill="none"
              stroke="#D7E0C6"
              strokeWidth={14}
              strokeDasharray={`${normalLen} ${CIRC}`}
              strokeDashoffset={0}
              transform="rotate(-90 60 60)"
            />
            {/* Watch arc */}
            <circle
              cx={60} cy={60} r={50}
              fill="none"
              stroke="#6B756F"
              strokeWidth={14}
              strokeDasharray={`${watchLen} ${CIRC}`}
              strokeDashoffset={watchOffset}
              transform="rotate(-90 60 60)"
              opacity={0.3}
            />
            {/* Flagged arc */}
            <circle
              cx={60} cy={60} r={50}
              fill="none"
              stroke="#C8563A"
              strokeWidth={14}
              strokeDasharray={`${flagLen} ${CIRC}`}
              strokeDashoffset={flagOffset}
              transform="rotate(-90 60 60)"
            />
            {/* Center: count */}
            <text
              x={60} y={56}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-display)"
              fontSize={26}
              fontWeight={500}
              fill="#1A2620"
            >
              {normal}
            </text>
            {/* Center: label */}
            <text
              x={60} y={71}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-mono)"
              fontSize={8}
              letterSpacing={1.5}
              fill="#6B756F"
            >
              NORMAL
            </text>
          </svg>

          <div className="hr-legend">
            <div className="hr-legend-row">
              <span className="hr-legend-dot normal" />
              <span>{normal} normal</span>
            </div>
            <div className="hr-legend-row">
              <span className="hr-legend-dot watch" />
              <span>{watch} watch</span>
            </div>
            <div className="hr-legend-row">
              <span className="hr-legend-dot flag" />
              <span>{flagged} flagged</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
