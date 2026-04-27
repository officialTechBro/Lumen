"use client";

import { useState, Fragment } from "react";
import Sparkline from "./Sparkline";
import { MOCK_FLAGGED_MARKERS } from "@/lib/mock-data";

export default function FlaggedMarkersCard() {
  const [open, setOpen] = useState(0);

  return (
    <div className="card fade d3">
      <div className="card-head">
        <span className="card-title">
          <span>Needs attention</span>
          <span className="card-count">3 markers</span>
        </span>
        <a href="#" className="card-link" onClick={e => e.preventDefault()}>All markers →</a>
      </div>

      <div className="flagged-list">
        {MOCK_FLAGGED_MARKERS.map((m, i) => (
          <Fragment key={m.id}>
            <div
              className={`flagged-row${open === i ? " open" : ""}`}
              onClick={() => setOpen(open === i ? -1 : i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setOpen(open === i ? -1 : i)}
            >
              {/* Col 1 — Name */}
              <div className="fr-name">
                <span className={`fr-dot ${m.status}`} />
                <div className="fr-name-text">
                  <div className="fr-n">{m.name}</div>
                  <div className="fr-c">{m.code}</div>
                </div>
              </div>

              {/* Col 2 — Sparkline */}
              <div className="fr-spark">
                <Sparkline
                  values={m.trendValues}
                  status={m.status}
                  refLow={m.refLow ?? undefined}
                  refHigh={m.refHigh ?? undefined}
                  width={110}
                  height={30}
                />
              </div>

              {/* Col 3 — Delta badge */}
              <div className="fr-delta">
                <span className={`chg ${m.delta.dir}`}>
                  {m.delta.dir === "up" ? "↑" : "↓"}
                  &thinsp;
                  {m.delta.dir === "up" ? "+" : "−"}{m.delta.amount} {m.delta.period}
                </span>
              </div>

              {/* Col 4 — Value */}
              <div className="fr-val">
                <div>
                  <strong>{m.value}</strong>
                  {m.unit}
                </div>
                <div className="fr-ref">{m.refLabel}</div>
              </div>

              {/* Col 5 — Status pill */}
              <div className="fr-pill">
                <span className={`pill ${m.status}`}>
                  {m.status === "flag" ? "Flag" : "Watch"}
                </span>
              </div>

              {/* Col 6 — Chevron */}
              <div className="fr-chev">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M5 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {open === i && (
              <div className="flagged-expand">
                <div>
                  <div className="fe-label">Plain English</div>
                  <p className="fe-plain">{m.plainEnglish}</p>
                </div>
                <div>
                  <div className="fe-label">Ask Your Doctor</div>
                  <p className="fe-q">&ldquo;{m.doctorQuestion}&rdquo;</p>
                  <button type="button" className="btn btn-ghost btn-sm">
                    + Add to my questions
                  </button>
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
