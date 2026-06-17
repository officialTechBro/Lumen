'use client';

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { RecentReportData } from "@/lib/db/reports";

interface Props {
  reports: RecentReportData[];
  total: number;
  page: number;
  perPage: number;
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

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3.5h10" />
      <path d="M5.5 3.5v-1a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1" />
      <path d="M3.5 3.5l.667 7.333a.5.5 0 0 0 .498.667h4.67a.5.5 0 0 0 .498-.667L10.5 3.5" />
      <path d="M5.5 6.5v3M8.5 6.5v3" />
    </svg>
  );
}

export default function ReportsListClient({ reports, total, page, perPage }: Props) {
  const router = useRouter();
  const [pendingDelete, setPendingDelete] = useState<{ id: string; title: string } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const totalPages = Math.ceil(total / perPage);

  async function handleDelete() {
    if (!pendingDelete) return;
    const { id } = pendingDelete;
    setPendingDelete(null);
    setDeletingId(id);

    try {
      await fetch(`/api/reports/${id}`, { method: "DELETE" });
    } finally {
      setDeletingId(null);
      startTransition(() => router.refresh());
    }
  }

  return (
    <>
      <div className="card">
        <div className="rp-reports-head">
          <span>Report</span>
          <span>Lab</span>
          <span>Date</span>
          <span>Markers</span>
          <span>Status</span>
          <span />
        </div>

        {reports.map((report) => (
          <div
            key={report.id}
            className={`rp-row${deletingId === report.id ? " rp-row-deleting" : ""}`}
            onClick={() => router.push(`/dashboard/reports/${report.id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") router.push(`/dashboard/reports/${report.id}`);
            }}
          >
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
              {report.flagCount === 0 && report.watchCount === 0 ? (
                <span className="pill ok">All clear</span>
              ) : (
                <>
                  {report.flagCount > 0 && <span className="pill flag">{report.flagCount} flag</span>}
                  {report.watchCount > 0 && <span className="pill watch">{report.watchCount} watch</span>}
                </>
              )}
            </div>

            <button
              type="button"
              className="rr-delete"
              aria-label={`Delete ${report.title ?? "report"}`}
              onClick={(e) => {
                e.stopPropagation();
                setPendingDelete({ id: report.id, title: report.title ?? "Lab panel" });
              }}
            >
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="rp-pagination">
          {page > 1 ? (
            <Link href={`?page=${page - 1}`} className="rpp-btn">← Previous</Link>
          ) : (
            <span className="rpp-btn rpp-disabled">← Previous</span>
          )}
          <span className="rpp-info">Page {page} of {totalPages}</span>
          {page < totalPages ? (
            <Link href={`?page=${page + 1}`} className="rpp-btn">Next →</Link>
          ) : (
            <span className="rpp-btn rpp-disabled">Next →</span>
          )}
        </div>
      )}

      {/* Confirmation toast */}
      {pendingDelete && (
        <div className="rp-confirm-toast" role="alertdialog" aria-modal="true" aria-labelledby="rct-title">
          <div className="rct-content">
            <p className="rct-title" id="rct-title">Delete this report?</p>
            <p className="rct-sub">&ldquo;{pendingDelete.title}&rdquo; and all its markers will be permanently removed.</p>
          </div>
          <div className="rct-actions">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setPendingDelete(null)}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger btn-sm" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}
