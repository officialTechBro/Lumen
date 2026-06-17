'use client';

import { useState } from "react";
import type { ReportDetailData } from "@/lib/db/reports";

type Marker = ReportDetailData["markers"][number];

function statusLabel(status: string, isUrgent: boolean): string {
  if (isUrgent) return "Urgent";
  if (status === "flagged") return "Flagged";
  if (status === "borderline") return "Watch";
  return "Normal";
}

function statusPillClass(status: string, isUrgent: boolean): string {
  if (isUrgent || status === "flagged" || status === "urgent") return "pill flag";
  if (status === "borderline") return "pill watch";
  return "pill ok";
}

function refRange(min: number | null, max: number | null, unit: string): string {
  if (min == null && max == null) return "—";
  if (min == null || min === 0) return `< ${max} ${unit}`;
  if (max == null || max > 500) return `> ${min} ${unit}`;
  return `${min}–${max} ${unit}`;
}

interface GroupProps {
  title: string;
  markers: Marker[];
  openId: string | null;
  onToggle: (id: string) => void;
}

function MarkerGroup({ title, markers, openId, onToggle }: GroupProps) {
  if (markers.length === 0) return null;

  return (
    <div className="rm-group">
      <div className="rm-group-label">{title}</div>
      {markers.map((marker) => {
        const isOpen = openId === marker.id;
        return (
          <div key={marker.id} className={`rm-row${isOpen ? " rm-row-open" : ""}`}>
            <button
              type="button"
              className="rm-row-trigger"
              onClick={() => onToggle(marker.id)}
              aria-expanded={isOpen}
            >
              <div className="rm-name-col">
                <span className="rm-name">{marker.name}</span>
                {marker.code && <span className="rm-code">{marker.code}</span>}
              </div>
              <div className="rm-val-col">
                <span className="rm-value">{marker.value}</span>
                <span className="rm-unit">{marker.unit}</span>
              </div>
              <div className="rm-ref-col">
                <span className="rm-ref">{refRange(marker.referenceMin, marker.referenceMax, marker.unit)}</span>
              </div>
              <div className="rm-pill-col">
                <span className={statusPillClass(marker.status, marker.isUrgent)}>
                  {statusLabel(marker.status, marker.isUrgent)}
                </span>
              </div>
              <div className="rm-chev-col">
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                  aria-hidden="true"
                  style={{ transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s ease" }}
                >
                  <path d="M5 2.5L9.5 7L5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>

            {isOpen && (
              <div className="rm-expand">
                {marker.isUrgent && (
                  <div className="urgent-banner">
                    Contact your doctor or go to the ER — this value requires immediate attention.
                  </div>
                )}
                <div className="rm-expand-grid">
                  <div>
                    <div className="rm-expand-label">PLAIN ENGLISH</div>
                    <p className="rm-expand-text">{marker.explanation}</p>
                  </div>
                  {marker.whyItMatters && (
                    <div>
                      <div className="rm-expand-label">WHY IT MATTERS</div>
                      <p className="rm-expand-text">{marker.whyItMatters}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface Props {
  markers: ReportDetailData["markers"];
}

export default function ReportMarkersAccordion({ markers }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  function handleToggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  const urgent = markers.filter((m) => m.isUrgent);
  const flagged = markers.filter((m) => !m.isUrgent && (m.status === "flagged" || m.status === "urgent"));
  const borderline = markers.filter((m) => m.status === "borderline");
  const normal = markers.filter((m) => m.status === "normal");

  return (
    <div className="rm-accordion">
      <MarkerGroup title="Urgent" markers={urgent} openId={openId} onToggle={handleToggle} />
      <MarkerGroup title="Flagged" markers={flagged} openId={openId} onToggle={handleToggle} />
      <MarkerGroup title="To Watch" markers={borderline} openId={openId} onToggle={handleToggle} />
      <MarkerGroup title="Normal" markers={normal} openId={openId} onToggle={handleToggle} />
    </div>
  );
}
