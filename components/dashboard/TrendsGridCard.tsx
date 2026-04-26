import { MOCK_TREND_CELLS } from "@/lib/mock-data";
import type { TrendCell } from "@/lib/types";
import Sparkline from "./Sparkline";

function refRangeLabel(cell: TrendCell): string {
  if (cell.refHigh > 500) return `Ref ${cell.refLow}–—`;
  if (cell.refLow === 0) return `Ref < ${cell.refHigh}`;
  return `Ref ${cell.refLow}–${cell.refHigh}`;
}

export default function TrendsGridCard() {
  return (
    <div className="card fade d4">
      <div className="card-head">
        <span className="card-title">
          <span>Trends</span>
          <span className="card-count">Last 6 reports · 2 yrs</span>
        </span>
        <a href="#" className="card-link">View all →</a>
      </div>

      <div className="trends-grid">
        {MOCK_TREND_CELLS.map((cell) => (
          <div key={cell.id} className="trend-cell">
            <div className="tc-top">
              <span className="tc-name">{cell.name}</span>
              <span className={`pill ${cell.status}`}>
                {cell.status === "flag" ? "Flagged" : cell.status === "watch" ? "Watch" : "OK"}
              </span>
            </div>

            <div className="tc-spark">
              <Sparkline
                values={cell.values}
                status={cell.status}
                refLow={cell.refLow}
                refHigh={cell.refHigh}
                width={260}
                height={52}
              />
            </div>

            <div className="tc-bot">
              <div>
                <span className="tc-v">{cell.current}</span>
                <span className="tc-u">{cell.unit}</span>
              </div>
              <span className="tc-ref">{refRangeLabel(cell)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
