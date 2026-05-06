import type { ReactNode } from "react";
import type { SidebarProps } from "@/lib/types";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import SidebarProfile from "./SidebarProfile";

const ICONS: Record<string, ReactNode> = {
  home: (
    <svg viewBox="0 0 20 20" fill="none" width={16} height={16} stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10 L10 4 L17 10 V16 H12 V11 H8 V16 H3 Z" />
    </svg>
  ),
  reports: (
    <svg viewBox="0 0 20 20" fill="none" width={16} height={16} stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 3 H13 L16 6 V17 H4 Z M13 3 V6 H16 M7 10 H13 M7 13 H11" />
    </svg>
  ),
  markers: (
    <svg viewBox="0 0 20 20" fill="none" width={16} height={16} stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 15 L7 9 L12 12 L18 5" />
      <circle cx="7" cy="9" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  flags: (
    <svg viewBox="0 0 20 20" fill="none" width={16} height={16} stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3 V17 M5 4 H14 L12 7 L14 10 H5" />
    </svg>
  ),
  questions: (
    <svg viewBox="0 0 20 20" fill="none" width={16} height={16} stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8" />
      <path d="M7.5 8 Q7.5 5.5 10 5.5 Q12.5 5.5 12.5 8 Q12.5 10 10 10.5 V12.5" />
      <circle cx="10" cy="14.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  reminders: (
    <svg viewBox="0 0 20 20" fill="none" width={16} height={16} stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3 C6 3 5 7 5 10 L4 14 H16 L15 10 C15 7 14 3 10 3 Z" />
      <path d="M8 14 Q8 17 10 17 Q12 17 12 14" />
      <path d="M10 3 V2" />
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 20 20" fill="none" width={16} height={16} stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13 V4 M6 8 L10 4 L14 8" />
      <path d="M4 14 V16 H16 V14" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 20 20" fill="none" width={16} height={16} stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="3" />
      <path d="M10 2 V4 M10 16 V18 M2 10 H4 M16 10 H18 M4.4 4.4 L5.8 5.8 M14.2 14.2 L15.6 15.6 M4.4 15.6 L5.8 14.2 M14.2 5.8 L15.6 4.4" />
    </svg>
  ),
};

export default async function DashboardSidebar({ counts }: SidebarProps) {
  const session = await auth();
  const userId = session?.user?.id;

  let isPro = false;
  if (userId) {
    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { isPro: true },
    });
    isPro = dbUser?.isPro ?? false;
  }

  return (
    <aside className="sidebar">
      {/* Brand */}
      <Link href="/" className="brand">
        <svg viewBox="0 0 22 22" fill="none" width={22} height={22} aria-hidden>
          <circle cx="11" cy="11" r="10" stroke="var(--forest)" strokeWidth="1.5" />
          <path d="M6 11 Q 11 5, 16 11 T 6 11" fill="var(--forest)" />
        </svg>
        <span>Lumen</span>
      </Link>

      {/* Nav */}
      <nav className="sidebar-nav">
        <div className="group-label">Library</div>

        <button className="navbtn active">
          <span className="ico">{ICONS.home}</span>
          Dashboard
        </button>

        <button className="navbtn">
          <span className="ico">{ICONS.reports}</span>
          Reports
          <span className="count">{counts.reports}</span>
        </button>

        <button className="navbtn">
          <span className="ico">{ICONS.markers}</span>
          Markers
          <span className="count">{counts.markers}</span>
        </button>

        <button className="navbtn">
          <span className="ico">{ICONS.flags}</span>
          Flagged
          <span className="count">{counts.flagged}</span>
        </button>

        <button className="navbtn">
          <span className="ico">{ICONS.questions}</span>
          {"Doctor Q's"}
          {counts.questions > 0 && <span className="count">{counts.questions}</span>}
        </button>

        <button className="navbtn">
          <span className="ico">{ICONS.reminders}</span>
          Reminders
          {counts.reminders > 0 && <span className="count">{counts.reminders}</span>}
        </button>

        <div className="group-label actions-label">Actions</div>

        <button className="navbtn">
          <span className="ico">{ICONS.upload}</span>
          Upload report
        </button>

        <button className="navbtn">
          <span className="ico">{ICONS.settings}</span>
          Settings
        </button>
      </nav>

      <SidebarProfile
        image={session?.user?.image ?? null}
        fullName={session?.user?.name ?? null}
        email={session?.user?.email ?? null}
        isPro={isPro}
      />
    </aside>
  );
}
