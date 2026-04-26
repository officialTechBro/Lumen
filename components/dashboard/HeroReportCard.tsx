import { MOCK_HERO_REPORT, MOCK_SUMMARY } from "@/lib/mock-data";
import { donutArcLen } from "@/lib/helpers";

const CIRC = 314;

export default function HeroReportCard() {
  const r = MOCK_HERO_REPORT;
  const s = MOCK_SUMMARY;

  const total = r.normal + r.watch + r.flagged;
  const normalLen = donutArcLen(r.normal, total);
  const watchLen = donutArcLen(r.watch, total);
  const flagLen = donutArcLen(r.flagged, total);
  const watchOffset = -normalLen;
  const flagOffset = -(normalLen + watchLen);

  return (
    <div className="hero-report fade d2">
      {/* Left column */}
      <div className="hr-left">
        <div className="badges">
          <span className="pill new">Latest report</span>
          <span className="pill flag">{r.flagged} flagged</span>
          <span className="pill watch">{r.watch} watch</span>
        </div>

        <h2 className="hr-title">
          {r.title},{" "}
          <span className="italic">explained.</span>
        </h2>

        <p className="hr-sub">{r.sub}</p>

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
            <div className="v">{s.trackedSince}</div>
          </div>
          <div className="hr-meta-item">
            <div className="lbl">Total reports</div>
            <div className="v">{s.totalReports}</div>
          </div>
          <div className="hr-meta-item">
            <div className="lbl">Next reminder</div>
            <div className="v long">{s.nextReminder}</div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="hr-right">
        <div className="hr-summary">
          <div className="hr-sum-head">
            <span>Summary · {r.shortDate}</span>
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
              {r.normal}
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
              <span>{r.normal} normal</span>
            </div>
            <div className="hr-legend-row">
              <span className="hr-legend-dot watch" />
              <span>{r.watch} watch</span>
            </div>
            <div className="hr-legend-row">
              <span className="hr-legend-dot flag" />
              <span>{r.flagged} flagged</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
