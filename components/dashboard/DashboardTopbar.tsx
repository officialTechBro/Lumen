"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import type { DashboardTopbarProps } from "@/lib/types";

const CRUMBS: Record<string, string> = {
  "/dashboard": "Dashboard / Overview",
  "/dashboard/reports": "Dashboard / Reports",
  "/dashboard/markers": "Dashboard / Markers",
  "/dashboard/flagged": "Dashboard / Flagged",
  "/dashboard/questions": "Dashboard / Doctor Questions",
  "/dashboard/reminders": "Dashboard / Reminders",
  "/dashboard/upload": "Dashboard / New Upload",
  "/dashboard/settings": "Dashboard / Settings",
};

export default function DashboardTopbar({ onToggle }: DashboardTopbarProps) {
  const pathname = usePathname();
  const crumb = CRUMBS[pathname] ?? "Dashboard";
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button
          className="sidebar-toggle"
          onClick={onToggle}
          aria-label="Toggle sidebar"
          type="button"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M2 4h14M2 9h14M2 14h14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <span className="crumb">{crumb}</span>
      </div>

      <div className="topbar-right">
        <div className="topbar-search">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle
              cx="6"
              cy="6"
              r="4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>Search markers, reports…</span>
        </div>

        <button className="icobtn" title="Reminders" type="button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M8 2a4.5 4.5 0 0 0-4.5 4.5v2.25L2 10.5h12l-1.5-1.75V6.5A4.5 4.5 0 0 0 8 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.5 12.5a1.5 1.5 0 0 0 3 0"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="dot" />
        </button>

        <button
          className="icobtn"
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M3.4 12.6l.7-.7M11.9 4.1l.7-.7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M13 10a6 6 0 1 1-7-7 5 5 0 0 0 7 7z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
