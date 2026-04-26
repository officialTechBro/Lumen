"use client";

import { useState } from "react";
import DashboardTopbar from "./DashboardTopbar";

export default function DashboardShell({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`shell${sidebarOpen ? " sidebar-open" : ""}`}>
      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
          type="button"
        />
      )}
      {sidebar}
      <main className="main">
        <DashboardTopbar onToggle={() => setSidebarOpen((s) => !s)} />
        {children}
      </main>
    </div>
  );
}
