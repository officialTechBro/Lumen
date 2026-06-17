import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getReportById } from "@/lib/db/reports";
import ReportMarkersAccordion from "@/components/reports/ReportMarkersAccordion";

function formatDate(date: Date | null): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatTime(seconds: number | null): string {
  if (!seconds) return "—";
  return `${seconds.toFixed(1)}s`;
}

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/login");

  const report = await getReportById(userId, id);
  if (!report) notFound();

  const normalCount = report.markers.filter((m) => m.status === "normal").length;
  const watchCount = report.markers.filter((m) => m.status === "borderline").length;
  const flaggedCount = report.markers.filter(
    (m) => m.status === "flagged" || m.status === "urgent" || m.isUrgent
  ).length;

  return (
    <div className="rd-page fade d1">
      {/* Back link */}
      <Link href="/dashboard/reports" className="rd-back">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M9 2.5L4.5 7L9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        All reports
      </Link>

      {/* Header */}
      <div className="rd-header">
        <div className="rd-header-left">
          <div className="rd-badges">
            {report.urgentFlag && <span className="pill flag">Urgent</span>}
            {report.labProvider && <span className="pill info">{report.labProvider}</span>}
          </div>
          <h1 className="rd-title">
            {report.title ?? "Lab panel"}
            <span className="em-accent"> — results.</span>
          </h1>
          <div className="rd-meta-strip">
            <span>{formatDate(report.collectedAt)}</span>
            {report.patientId && (
              <>
                <span className="rd-dot">·</span>
                <span>ID {report.patientId}</span>
              </>
            )}
            {report.processingTime && (
              <>
                <span className="rd-dot">·</span>
                <span>Read in {formatTime(report.processingTime)}</span>
              </>
            )}
          </div>
        </div>

        <div className="rd-stat-strip">
          <div className="rd-stat">
            <span className="rd-stat-v">{report.markers.length}</span>
            <span className="rd-stat-l">Total</span>
          </div>
          <div className="rd-stat">
            <span className="rd-stat-v" style={{ color: "var(--leaf)" }}>{normalCount}</span>
            <span className="rd-stat-l">Normal</span>
          </div>
          <div className="rd-stat">
            <span className="rd-stat-v" style={{ color: "var(--ink-dim)" }}>{watchCount}</span>
            <span className="rd-stat-l">Watch</span>
          </div>
          <div className="rd-stat">
            <span className="rd-stat-v" style={{ color: "var(--coral)" }}>{flaggedCount}</span>
            <span className="rd-stat-l">Flagged</span>
          </div>
        </div>
      </div>

      {/* Two-column body */}
      <div className="rd-body">
        {/* Left column: markers */}
        <div className="rd-main">
          {report.markers.length > 0 && (
            <section className="rd-section">
              <h2 className="rd-section-title">Biomarkers</h2>
              <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <ReportMarkersAccordion markers={report.markers} />
              </div>
            </section>
          )}
        </div>

        {/* Right column: AI summary + doctor's questions */}
        <aside className="rd-aside">
          {report.summary && (
            <div className="rd-summary">
              <div className="rd-summary-label">AI SUMMARY</div>
              <p className="rd-summary-text">{report.summary}</p>
            </div>
          )}

          {report.questions.length > 0 && (
            <section className="rd-section">
              <h2 className="rd-section-title">Doctor&apos;s questions</h2>
              <div className="card rd-questions">
                {report.questions.map((q, i) => (
                  <div key={q.id} className={`rd-question${q.isChecked ? " rd-question-done" : ""}`}>
                    <span className="rd-q-num">{i + 1}</span>
                    <p className="rd-q-text">{q.text}</p>
                    {q.relatedTo && <span className="rd-q-tag">{q.relatedTo}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
