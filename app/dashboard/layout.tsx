import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <DashboardSidebar />
      <main className="main">{children}</main>
    </div>
  );
}
