import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAllReports } from "@/lib/db/reports";
import ReportsListClient from "@/components/reports/ReportsListClient";

const PER_PAGE = 20;

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/login");

  const { reports, total } = await getAllReports(userId, page, PER_PAGE);

  return (
    <div className="rp-page fade d1">
      <div className="rp-header">
        <h1 className="rp-title">
          Reports<span className="em-accent"> archive.</span>
        </h1>
        <p className="rp-sub">
          {total === 0
            ? "No reports yet. Upload your first lab result to get started."
            : `${total} report${total !== 1 ? "s" : ""} — full history`}
        </p>
      </div>

      {total === 0 ? (
        <div className="rp-empty">
          <p>Upload a lab report from the dashboard to see your history here.</p>
        </div>
      ) : (
        <ReportsListClient
          reports={reports}
          total={total}
          page={page}
          perPage={PER_PAGE}
        />
      )}
    </div>
  );
}
