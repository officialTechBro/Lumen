import type { MarkerTrendData } from "@/lib/db/reports";
import { refRangeLabel } from "@/lib/helpers";
import Sparkline from "./Sparkline";

interface Props {
  trends: MarkerTrendData[];
}

export default function TrendsGridCard({ trends }: Props) {
  const hasEnoughData = trends.some((t) => t.values.length >= 2);

  return (
    <div className="card fade d4">
      <div className="card-head">
        <span className="card-title">
          <span>Trends</span>
          <span className="card-count">Last 6 reports · 2 yrs</span>
        </span>
        <a href="/dashboard/markers" className="card-link">View all →</a>
      </div>

      {!hasEnoughData ? (
        <p style={{ padding: "24px", color: "var(--ink-soft)", fontSize: "15px" }}>
          Upload a second report to see how your markers are moving.
        </p>
      ) : (
        <div className="trends-grid">
          {trends.map((trend) => (
            <div key={trend.name} className="trend-cell">
              <div className="tc-top">
                <span className="tc-name">{trend.name}</span>
                <span className={`pill ${trend.status}`}>
                  {trend.status === "flag" ? "Flagged" : trend.status === "watch" ? "Watch" : "OK"}
                </span>
              </div>

              <div className="tc-spark">
                <Sparkline
                  values={trend.values}
                  status={trend.status as "flag" | "watch" | "ok"}
                  refLow={trend.referenceMin ?? undefined}
                  refHigh={trend.referenceMax ?? undefined}
                  width={260}
                  height={52}
                />
              </div>

              <div className="tc-bot">
                <div>
                  <span className="tc-v">{trend.currentValue}</span>
                  <span className="tc-u">{trend.unit}</span>
                </div>
                <span className="tc-ref">
                  {refRangeLabel(trend.referenceMin, trend.referenceMax)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
