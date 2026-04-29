import { prisma } from "@/lib/prisma";
import { getSidebarCounts } from "@/lib/db/sidebar";
import type { SidebarCountsData } from "@/lib/db/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardShell from "@/components/dashboard/DashboardShell";

// TODO: replace with session.user.id once NextAuth is wired
async function getDemoUserId(): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: { email: "demo@lumen.health" },
    select: { id: true },
  });
  return user?.id ?? null;
}

const EMPTY_COUNTS: SidebarCountsData = {
  reports: 0,
  markers: 0,
  flagged: 0,
  questions: 0,
  reminders: 0,
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const userId = await getDemoUserId();
  const counts = userId ? await getSidebarCounts(userId) : EMPTY_COUNTS;

  return (
    <DashboardShell sidebar={<DashboardSidebar counts={counts} />}>
      {children}
    </DashboardShell>
  );
}
