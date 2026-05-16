# Profile Page

## Overview

Create the profile/settings page for Lumen at `/dashboard/profile`. Displays user info, account stats, notification preferences, and account actions. Accessed by clicking the user profile block at the bottom of the dashboard sidebar.

---

## Requirements

- Create the page at `/dashboard/profile` route (protected — requires authentication)
- Display user info: full name, email, avatar (Google image or initials), account creation date, plan badge
- Show usage stats: total reports, total markers read, flagged count, reports by lab provider
- Add profile editing: update full name
- Add notification preferences: three toggles matching the `NotificationPreferences` model
- Add account actions: change password (email/password users only), delete account with confirmation
- Follow existing codebase patterns for data fetching and Server Components

---

## Sidebar — profile block link

The user profile block at the bottom of the dashboard sidebar (built in auth-phase-3) should navigate to `/dashboard/profile` when clicked.

Update `src/components/dashboard/Sidebar.tsx`:

```tsx
// The profile-link wrapping the avatar + name already exists from auth-phase-3.
// Confirm the href points to /dashboard/settings:

<Link href="/dashboard/settings" className="profile-link">
  <UserAvatar image={user?.image ?? null} fullName={user?.fullName ?? null} />
  <div className="profile-info">
    <span className="profile-name">{user?.fullName ?? "My Account"}</span>
    <span className="profile-plan">{user?.isPro ? "Lumen+" : "Free plan"}</span>
  </div>
</Link>
```

The `<SignOutButton />` next to it is unchanged.

---

## Data fetching

Create `src/lib/db/profile.ts`:

```ts
import { prisma } from "@/lib/prisma"

export async function getProfileData(userId: string) {
  const [user, reportStats, markerStats] = await Promise.all([

    // User info + notification preferences
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        image: true,
        isPro: true,
        password: true,       // null = Google OAuth user (no password section)
        createdAt: true,
        notificationPrefs: {
          select: {
            flaggedMarkerReminders: true,
            monthlyCheckInNudge: true,
            productUpdates: true,
          }
        }
      }
    }),

    // Report stats
    prisma.report.groupBy({
      by: ["labProvider"],
      where: { userId, status: "ready" },
      _count: { id: true },
    }),

    // Marker stats
    prisma.marker.aggregate({
      where: { report: { userId, status: "ready" } },
      _count: { id: true },
      _sum: { value: true },
    }),

  ])

  const totalReports = reportStats.reduce((sum, r) => sum + r._count.id, 0)
  const totalMarkers = markerStats._count.id ?? 0

  const flaggedCount = await prisma.marker.count({
    where: {
      report: { userId, status: "ready" },
      status: { in: ["flagged", "urgent"] },
    }
  })

  return {
    user,
    totalReports,
    totalMarkers,
    flaggedCount,
    reportsByLab: reportStats.map(r => ({
      lab: r.labProvider ?? "Unknown",
      count: r._count.id,
    })),
  }
}
```

---

## Page structure

```
/dashboard/settings
│
├── Page header
│   └── "Your account, [managed.]"  ← serif H1, italic forest accent
│
├── Section: Profile
│   ├── Avatar (Google image or initials)
│   ├── Full name (editable inline)
│   ├── Email (read-only)
│   ├── Member since (formatted date)
│   └── Plan badge (Free / Lumen+)
│
├── Section: Usage stats
│   ├── Total reports
│   ├── Total markers read
│   ├── Flagged markers
│   └── Reports by lab (breakdown)
│
├── Section: Notifications
│   ├── Flagged marker reminders toggle
│   ├── Monthly check-in nudge toggle
│   └── Product updates toggle
│
└── Section: Account actions
    ├── Change password (email users only — hidden for Google OAuth)
    └── Delete account (confirmation required)
```

---

## Page header

```tsx
<div className="page-head">
  <div>
    <h1 className="t-card-title">
      Your account, <em className="t-italic-accent">managed.</em>
    </h1>
    <p className="t-body" style={{ marginTop: 10 }}>
      {user.email} · Member since {format(user.createdAt, "MMMM yyyy")}
    </p>
  </div>
</div>
```

---

## Section: Profile

Two-column card: avatar + identity on the left, edit form on the right.

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  [avatar 72px]   Sarah Chen                                   │
│                  demo@lumen.health                             │
│                  Member since February 2024                    │
│                  [Lumen+] plan badge                           │
│                                                                │
│  ──────────────────────────────────────────────────────────── │
│                                                                │
│  Full name                                                     │
│  [Sarah Chen                              ] [Save]            │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Avatar

Reuse the `<UserAvatar>` component from `src/components/ui/UserAvatar.tsx` (built in auth-phase-3). Render at 72×72px for this page.

```tsx
<UserAvatar
  image={user.image ?? null}
  fullName={user.fullName ?? null}
  size={72}
/>
```

### Full name edit

Client Component — inline edit with a save button:

```tsx
"use client"

// On save: PATCH /api/profile with { fullName }
// Show success state: "Saved." in Leaf color for 2s, then reset
// Show error state: inline Coral message below field
```

API route `PATCH /api/profile`:
```ts
// src/app/api/profile/route.ts
// Validate fullName is non-empty, max 100 chars
// await prisma.user.update({ where: { id: userId }, data: { fullName } })
// revalidatePath("/dashboard") — sidebar name updates
```

---

## Section: Usage stats

Four stat cells in a 2×2 grid (or 4-column on desktop), followed by a lab breakdown list.

```
┌────────────────────────────────────────────────────────────────┐
│  YOUR STATS                                                    │
│                                                                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │    7     │ │   147    │ │    4     │ │    3     │        │
│  │ Reports  │ │ Markers  │ │ Flagged  │ │   Labs   │        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
│                                                                │
│  BY LAB                                                        │
│  Quest Diagnostics ──────────────────── 5                     │
│  Labcorp ──────────── 1                                        │
│  Kaiser ────── 1                                               │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

Stat cell styling:
- Value: Newsreader 500, 36px, tracking -0.025em — same as the report summary strip
- Label: Geist Mono 10px, uppercase, tracking 0.14em, Ink-dim

`Flagged` value renders in Coral if `> 0`, Ink-faint if `= 0`.

Lab breakdown: each row is `lab name` + a proportional bar fill + count. Bar fill color: Forest at 20% opacity, full bar is Line-soft.

---

## Section: Notifications

Three toggles. Each toggle is a Client Component that calls `PATCH /api/profile/notifications` on change.

```
┌────────────────────────────────────────────────────────────────┐
│  NOTIFICATIONS                                                 │
│                                                                │
│  Flagged marker reminders                          [toggle ON] │
│  We'll remind you when a flag hasn't been          ────────── │
│  followed up on.                                               │
│                                                                │
│  Monthly check-in nudge                           [toggle ON] │
│  A gentle reminder to upload when it's been        ────────── │
│  a while.                                                      │
│                                                                │
│  Product updates                                 [toggle OFF] │
│  New features, improvements, and announcements.   ────────── │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

Toggle styling:
```css
/* Track */
.toggle-track {
  width: 36px; height: 20px;
  border-radius: 999px;
  background: var(--line);          /* off state */
  transition: background 0.2s;
  cursor: pointer;
}
.toggle-track.on { background: var(--forest); }

/* Thumb */
.toggle-thumb {
  width: 14px; height: 14px;
  border-radius: 999px;
  background: var(--paper);
  transform: translateX(3px);
  transition: transform 0.2s;
}
.toggle-track.on .toggle-thumb { transform: translateX(19px); }
```

API route `PATCH /api/profile/notifications`:
```ts
// Accept: { flaggedMarkerReminders?, monthlyCheckInNudge?, productUpdates? }
// Update only the fields provided (partial update)
// await prisma.notificationPreferences.update({ where: { userId }, data: { ...body } })
```

Optimistic UI — toggle updates immediately on click, reverts if the API call fails.

---

## Section: Account actions

### Change password (email/password users only)

Only render this section if `user.password !== null`. Hidden for Google OAuth users.

```
┌────────────────────────────────────────────────────────────────┐
│  CHANGE PASSWORD                                               │
│                                                                │
│  Current password                                              │
│  [                                        ]                   │
│                                                                │
│  New password                                                  │
│  [                                        ]                   │
│                                                                │
│  Confirm new password                                          │
│  [                                        ]                   │
│                                                                │
│  [Update password]                                            │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

API route `PATCH /api/profile/password`:
```ts
// 1. Verify currentPassword against stored hash with bcrypt.compare
// 2. Validate newPassword length >= 8
// 3. Validate newPassword === confirmPassword
// 4. Hash newPassword with bcrypt.hash(newPassword, 12)
// 5. Update user.password
// 6. Return 200 on success, 400 with error message on failure
```

On success: clear all three fields, show `"Password updated."` in Leaf color below the button for 3s.

On failure (wrong current password): Coral border on current password field + `"Current password is incorrect."` below it.

### Delete account

```
┌────────────────────────────────────────────────────────────────┐
│  DANGER ZONE                                                   │
│                                                                │
│  Delete account                          [Delete account]     │
│  This permanently deletes all your                            │
│  reports, markers, and data. Cannot                           │
│  be undone.                                                    │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

Danger zone card styling:
```css
.danger-zone {
  border: 1px solid var(--coral-soft);
  border-radius: 14px;
  padding: 24px 28px;
  background: var(--paper-elev);
}
.danger-zone .t-eyebrow { color: var(--coral); }
```

Delete button: `.btn-secondary` with `color: var(--coral); border-color: var(--coral-soft)` on hover.

**Confirmation — inline, not a modal:**

When "Delete account" is clicked, the button is replaced in-place with a confirmation block:

```tsx
<div className="delete-confirm">
  <p className="t-body-sm">
    Type <strong>delete my account</strong> to confirm.
  </p>
  <input
    type="text"
    placeholder="delete my account"
    className="input"
    value={confirmText}
    onChange={(e) => setConfirmText(e.target.value)}
  />
  <div className="confirm-btns">
    <button
      className="btn-danger"
      disabled={confirmText !== "delete my account"}
      onClick={handleDelete}
    >
      Permanently delete
    </button>
    <button className="btn-ghost" onClick={() => setConfirmMode(false)}>
      Cancel
    </button>
  </div>
</div>
```

The confirm button stays disabled until the user types `"delete my account"` exactly.

API route `DELETE /api/profile`:
```ts
// Cascade deletes all user data via Prisma onDelete: Cascade
// prisma.user.delete({ where: { id: userId } })
// Sign out the session after deletion
// Redirect to / (home page)
// Write audit log: action: "account.delete" before deleting
```

---

## Route protection

The page is inside `/dashboard/*` which is already protected by `src/proxy.ts` from auth-phase-1. No additional protection needed.

---

## Copy reference

```
PAGE H1         Your account, managed.
                (italic forest: "managed.")

SECTION LABELS  PROFILE · YOUR STATS · BY LAB ·
                NOTIFICATIONS · CHANGE PASSWORD · DANGER ZONE

STATS           Reports · Markers read · Flagged · Labs

NOTIFICATIONS
  Toggle 1      Flagged marker reminders
                We'll remind you when a flag hasn't been followed up on.
  Toggle 2      Monthly check-in nudge
                A gentle reminder to upload when it's been a while.
  Toggle 3      Product updates
                New features, improvements, and announcements.

DELETE
  Label         Delete account
  Sub           This permanently deletes all your reports, markers,
                and data. Cannot be undone.
  Confirm       Type "delete my account" to confirm.
  Btn           Permanently delete
  Cancel        Cancel

SUCCESS MSGS    Saved. · Password updated. · Account deleted.
ERROR MSGS      Current password is incorrect.
                Passwords do not match.
                Password must be at least 8 characters.
```

---

## References

- `auth-phase-3-spec.md` — `UserAvatar` component, sidebar profile block
- `lumen-seed-spec.md` — `NotificationPreferences` model fields
- `lumen-project-overview-updated.md` — full Prisma schema
- `src/lib/db/reports.ts` — follow same data-fetching pattern
