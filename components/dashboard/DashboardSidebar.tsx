import type { ReactNode } from "react";
import type { SidebarProps } from "@/lib/types";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import SidebarProfile from "./SidebarProfile";
import SidebarNavLink from "./SidebarNavLink";

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

        <SidebarNavLink href="/dashboard" icon={ICONS.home} exact>
          Dashboard
        </SidebarNavLink>

        <SidebarNavLink href="/dashboard/reports" icon={ICONS.reports} count={counts.reports}>
          Reports
        </SidebarNavLink>

        {/* Stat card: Markers / Flagged / Doctor Q's */}
        <div className="sidebar-stats">
          <div className="sstat">
            <span className="sstat-l">Markers</span>
            <span className="sstat-v">{counts.markers}</span>
          </div>
          <div className="sstat sstat-mid">
            <span className="sstat-l">Flagged</span>
            <span className="sstat-v sstat-coral">{counts.flagged}</span>
          </div>
          <div className="sstat">
            <span className="sstat-l">Dr. Q&apos;s</span>
            <span className="sstat-v">{counts.questions}</span>
          </div>
        </div>

        <SidebarNavLink href="/dashboard/reminders" icon={ICONS.reminders} count={counts.reminders > 0 ? counts.reminders : null}>
          Reminders
        </SidebarNavLink>

        <div className="group-label actions-label">Actions</div>

        <button type="button" className="navbtn">
          <span className="ico">{ICONS.upload}</span>
          Upload report
        </button>

        <SidebarNavLink href="/dashboard/settings" icon={ICONS.settings}>
          Settings
        </SidebarNavLink>
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
