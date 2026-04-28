"use client";

import { useState, Fragment } from "react";
import Sparkline from "./Sparkline";
import type { FlaggedMarkerData } from "@/lib/db/reports";
import { getDeltaVariant, getDeltaIcon } from "@/lib/utils/marker-delta";

interface Props {
  markers: FlaggedMarkerData[];
}

function sparklineStatus(status: string): "flag" | "watch" | "ok" {
  if (status === "flagged" || status === "urgent") return "flag";
  if (status === "borderline") return "watch";
  return "ok";
}

function pillLabel(status: string): string {
  if (status === "flagged" || status === "urgent") return "Flag";
  if (status === "borderline") return "Watch";
  return "OK";
}

function pillClass(status: string): string {
  if (status === "flagged" || status === "urgent") return "pill flag";
  if (status === "borderline") return "pill watch";
  return "pill ok";
}

function formatDeltaLabel(delta: number | null, deltaDirection: string | null): string {
  if (delta == null || !deltaDirection || deltaDirection === "stable") return "";
  const abs = Math.abs(delta);
  const formatted = Number.isInteger(abs) ? String(abs) : abs.toFixed(1);
  return deltaDirection === "up" ? `+${formatted}` : `−${formatted}`;
}

function refLabel(min: number | null, max: number | null): string {
  if (min != null && max != null) return `Ref ${min}–${max}`;
  if (max != null) return `Ref < ${max}`;
  if (min != null) return `Ref > ${min}`;
  return "";
}

export default function FlaggedMarkersCard({ markers }: Props) {
  const [open, setOpen] = useState(markers.length > 0 ? 0 : -1);

  if (markers.length === 0) {
    return (
      <div className="card fade d3">
        <div className="card-head">
          <span className="card-title">
            <span>Needs attention</span>
            <span className="card-count">0 markers</span>
          </span>
          <a href="#" className="card-link" onClick={(e) => e.preventDefault()}>All markers →</a>
        </div>
        <div className="empty-flagged">
          <p>Nothing flagged. Your latest results look clear.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card fade d3">
      <div className="card-head">
        <span className="card-title">
          <span>Needs attention</span>
          <span className="card-count">{markers.length} marker{markers.length !== 1 ? "s" : ""}</span>
        </span>
        <a href="#" className="card-link" onClick={(e) => e.preventDefault()}>All markers →</a>
      </div>

      <div className="flagged-list">
        {markers.map((m, i) => {
          const variant = getDeltaVariant(m.name, m.deltaDirection);
          const icon = getDeltaIcon(variant);
          const deltaLabel = formatDeltaLabel(m.delta, m.deltaDirection);

          return (
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
                  <span className={`fr-dot ${sparklineStatus(m.status)}`} />
                  <div className="fr-name-text">
                    <div className="fr-n">{m.name}</div>
                    <div className="fr-c">{m.code}</div>
                  </div>
                </div>

                {/* Col 2 — Sparkline */}
                <div className="fr-spark">
                  <Sparkline
                    values={m.sparklineValues}
                    status={sparklineStatus(m.status)}
                    refLow={m.refLow ?? undefined}
                    refHigh={m.refHigh ?? undefined}
                    width={110}
                    height={30}
                  />
                </div>

                {/* Col 3 — Delta badge */}
                <div className="fr-delta">
                  {variant !== "new" && (
                    <span className={`chg chg-${variant}`}>
                      {icon}{deltaLabel ? <>&thinsp;{deltaLabel}</> : null}
                    </span>
                  )}
                </div>

                {/* Col 4 — Value */}
                <div className="fr-val">
                  <div>
                    <strong>{m.value}</strong>
                    {m.unit}
                  </div>
                  <div className="fr-ref">{refLabel(m.referenceMin, m.referenceMax)}</div>
                </div>

                {/* Col 5 — Status pill */}
                <div className="fr-pill">
                  <span className={pillClass(m.status)}>{pillLabel(m.status)}</span>
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
                  {/* Zone A + B — left column */}
                  <div>
                    <span className="fe-label">Plain English</span>
                    {m.isUrgent ? (
                      <div className="urgent-banner">
                        <strong>This value may require urgent attention.</strong>{" "}
                        Contact your doctor today or call 911 in an emergency.
                      </div>
                    ) : (
                      <p className="fe-plain">{m.explanation}</p>
                    )}
                    {m.confidence < 0.9 && (
                      <span className="confidence-warn">
                        AI CONFIDENCE {Math.round(m.confidence * 100)}% — verify value against original report
                      </span>
                    )}

                    {m.whyItMatters && (
                      <>
                        <span className="fe-label fe-label-gap">Why It Matters</span>
                        <p className="fe-plain fe-why">{m.whyItMatters}</p>
                      </>
                    )}
                  </div>

                  {/* Zone C — right column */}
                  <div>
                    <span className="fe-label">Ask Your Doctor</span>
                    {m.questions.length > 0 ? (
                      <ul className="fe-questions">
                        {m.questions.map((q) => (
                          <li key={q.id} className="fe-question-item">
                            <p className={`fe-q${q.isChecked ? " fe-q-checked" : ""}`}>
                              &ldquo;{q.text}&rdquo;
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="fe-q fe-q-empty">No questions generated for this marker.</p>
                    )}
                    <button type="button" className="btn btn-ghost btn-sm">
                      + Add to my questions
                    </button>
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
