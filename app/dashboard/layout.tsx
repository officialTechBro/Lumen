import { auth } from "@/auth";
import { getSidebarCounts } from "@/lib/db/sidebar";
import type { SidebarCountsData } from "@/lib/db/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardShell from "@/components/dashboard/DashboardShell";

const EMPTY_COUNTS: SidebarCountsData = {
  reports: 0,
  markers: 0,
  flagged: 0,
  questions: 0,
  reminders: 0,
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const userId = session?.user?.id;
  const counts = userId ? await getSidebarCounts(userId) : EMPTY_COUNTS;

  return (
    <DashboardShell sidebar={<DashboardSidebar counts={counts} />}>
      {children}
    </DashboardShell>
  );
}
