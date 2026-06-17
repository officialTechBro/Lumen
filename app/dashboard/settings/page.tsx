import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getProfileData } from "@/lib/db/profile";
import { UserAvatar } from "@/components/ui/UserAvatar";
import ProfileNameEdit from "@/components/settings/ProfileNameEdit";
import NotificationToggles from "@/components/settings/NotificationToggles";
import ChangePasswordForm from "@/components/settings/ChangePasswordForm";
import DeleteAccountSection from "@/components/settings/DeleteAccountSection";

function formatMemberSince(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function SettingsPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/login");

  const data = await getProfileData(userId);
  if (!data) redirect("/login");

  const { user, hasPassword, totalReports, totalMarkers, flaggedCount, reportsByLab } = data;

  const maxLabCount = reportsByLab.length > 0
    ? Math.max(...reportsByLab.map((l) => l.count))
    : 1;

  const memberSince = formatMemberSince(user.createdAt);

  return (
    <div className="sett-page fade d1">
      {/* Page header */}
      <div className="sett-head">
        <h1 className="sett-h1">
          Your account, <em className="em-accent">managed.</em>
        </h1>
        <p className="sett-head-meta">
          {user.email} · Member since {memberSince}
        </p>
      </div>

      <div className="sett-grid">

        {/* ── Left column ── */}
        <div className="sett-col">

          {/* Profile */}
          <section className="sett-section">
            <p className="sett-eyebrow">PROFILE</p>
            <div className="sett-card">
              <div className="sett-identity">
                <UserAvatar image={user.image ?? null} fullName={user.fullName ?? null} size={72} />
                <div className="sett-identity-info">
                  <p className="sett-identity-name">{user.fullName ?? "My Account"}</p>
                  <p className="sett-identity-email">{user.email}</p>
                  <p className="sett-identity-since">Member since {memberSince}</p>
                  <span className={`pill ${user.isPro ? "pill-pro" : "pill-free"}`}>
                    {user.isPro ? "Lumen+" : "Free plan"}
                  </span>
                </div>
              </div>
              <div className="sett-divider" />
              <ProfileNameEdit initialName={user.fullName} />
            </div>
          </section>

          {/* Notifications */}
          <section className="sett-section">
            <p className="sett-eyebrow">NOTIFICATIONS</p>
            <div className="sett-card">
              {user.notificationPrefs ? (
                <NotificationToggles initialPrefs={user.notificationPrefs} />
              ) : (
                <p className="sett-toggle-desc" style={{ padding: "8px 0" }}>
                  Notification preferences not set up yet.
                </p>
              )}
            </div>
          </section>

        </div>

        {/* ── Right column ── */}
        <div className="sett-col">

          {/* Stats */}
          <section className="sett-section">
            <p className="sett-eyebrow">YOUR STATS</p>
            <div className="sett-card">
              <div className="sett-stats-grid">
                <div className="sett-stat">
                  <span className="sett-stat-v">{totalReports}</span>
                  <span className="sett-stat-l">Reports</span>
                </div>
                <div className="sett-stat">
                  <span className="sett-stat-v">{totalMarkers}</span>
                  <span className="sett-stat-l">Markers read</span>
                </div>
                <div className="sett-stat">
                  <span
                    className="sett-stat-v"
                    style={{ color: flaggedCount > 0 ? "var(--coral)" : "var(--ink-faint)" }}
                  >
                    {flaggedCount}
                  </span>
                  <span className="sett-stat-l">Flagged</span>
                </div>
                <div className="sett-stat">
                  <span className="sett-stat-v">{reportsByLab.length}</span>
                  <span className="sett-stat-l">Labs</span>
                </div>
              </div>

              {reportsByLab.length > 0 && (
                <>
                  <div className="sett-divider" />
                  <p className="sett-eyebrow-sm">BY LAB</p>
                  <div className="sett-lab-list">
                    {reportsByLab
                      .sort((a, b) => b.count - a.count)
                      .map((l) => (
                        <div key={l.lab} className="sett-lab-row">
                          <span className="sett-lab-name">{l.lab}</span>
                          <div className="sett-lab-bar-wrap">
                            <div
                              className="sett-lab-bar-fill"
                              style={{ width: `${(l.count / maxLabCount) * 100}%` }}
                            />
                          </div>
                          <span className="sett-lab-count">{l.count}</span>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Change password (email users only) */}
          {hasPassword && (
            <section className="sett-section">
              <p className="sett-eyebrow">CHANGE PASSWORD</p>
              <div className="sett-card">
                <ChangePasswordForm />
              </div>
            </section>
          )}

        </div>

        {/* ── Danger zone — spans both columns ── */}
        <section className="sett-section sett-section-full">
          <DeleteAccountSection />
        </section>

      </div>
    </div>
  );
}
