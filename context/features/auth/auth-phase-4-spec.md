# Auth Phase 4 — Sign-Out Functionality & Marketing Nav Auth State

## Overview

Wire up sign-out in two places:

1. **Dashboard sidebar** — the sign-out button already exists in the sidebar UI. Connect it to `signOut()`.
2. **Marketing home page nav** — the top navigation CTA is currently static. Make it auth-aware:
   - **Signed out:** show existing `Upload a report →` button (no change)
   - **Signed in:** replace with a `Dashboard` button + `Sign out` link side by side

Both are small, targeted changes. No layout, design, or copy changes to any existing page.

---

## Requirements

- Wire the existing sidebar sign-out button to `signOut({ callbackUrl: "/login" })`
- Read auth state in the marketing home page nav (Server Component)
- When signed in, show `Dashboard` button + `Sign out` link in the nav
- When signed out, show the existing `Upload a report →` button (unchanged)
- Sign out from the marketing nav redirects to `/` (home), not `/login`
- Sign out from the dashboard sidebar redirects to `/login`
- No new pages, no layout changes, no design changes anywhere

---

## 1. Dashboard sidebar — sign-out button

### What exists

The `<SignOutButton />` component was created in Phase 3 at `src/components/dashboard/SignOutButton.tsx`. It is already rendered inside the sidebar's profile block. It currently has the visual styling but no `onClick` handler connected.

### What to do

Ensure the `onClick` calls `signOut` with the correct `callbackUrl`:

```tsx
// src/components/dashboard/SignOutButton.tsx
"use client"
import { signOut } from "next-auth/react"

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="signout-btn"
      title="Sign out"
      aria-label="Sign out"
    >
      {/* Exit/door SVG icon — 16×16, currentColor stroke, 1.5 strokeWidth */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Door frame */}
        <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
        {/* Arrow pointing right (exit) */}
        <path d="M10 11l3-3-3-3" />
        <path d="M13 8H6" />
      </svg>
    </button>
  )
}
```

### Sidebar profile block — final structure

The full bottom-of-sidebar block for reference, with both the profile link and the sign-out button:

```tsx
// Inside src/components/dashboard/Sidebar.tsx

<div className="profile">
  {/* Left: avatar + name/plan — links to settings */}
  <Link href="/dashboard/settings" className="profile-link">
    <UserAvatar
      image={user?.image ?? null}
      fullName={user?.fullName ?? null}
    />
    <div className="profile-info">
      <span className="profile-name">
        {user?.fullName ?? "My Account"}
      </span>
      <span className="profile-plan">
        {user?.isPro ? "Lumen+" : "Free plan"}
      </span>
    </div>
  </Link>

  {/* Right: sign-out button */}
  <SignOutButton />
</div>
```

CSS for the profile link (the left portion only):

```css
.profile-link {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 8px;
  transition: background 0.15s;
}
.profile-link:hover { background: var(--paper-warm); }
```

After sign-out: NextAuth clears the session cookie and redirects to `/login`.

---

## 2. Marketing home page nav — auth-aware CTA

### What exists

The top navigation in `src/app/(marketing)/page.tsx` (or wherever the home page nav lives) currently has a static "Upload a report →" primary button on the right side. It is not auth-aware.

### What to do

The nav is a Server Component — read the session server-side and conditionally render the right CTA group.

### Server Component — read session

```tsx
// src/app/(marketing)/page.tsx  (or the nav component it uses)
import { auth } from "@/auth"

export default async function HomePage() {
  const session = await auth()
  const isSignedIn = !!session?.user

  return (
    <>
      <MarketingNav isSignedIn={isSignedIn} />
      {/* rest of home page */}
    </>
  )
}
```

If the nav is extracted into its own component (e.g. `src/components/marketing/MarketingNav.tsx`), pass `isSignedIn` as a prop and keep that component a Server Component.

### Nav CTA — conditional render

```tsx
// src/components/marketing/MarketingNav.tsx

type Props = {
  isSignedIn: boolean
}

export function MarketingNav({ isSignedIn }: Props) {
  return (
    <nav>
      {/* ... existing logo, nav links ... */}

      <div className="nav-actions">
        {isSignedIn ? (
          // Signed-in state: Dashboard button + Sign out link
          <>
            <Link href="/dashboard" className="btn btn-primary nav-cta">
              Dashboard →
            </Link>
            <SignOutFromMarketingButton />
          </>
        ) : (
          // Signed-out state: existing button — no change
          <Link href="#upload" className="btn btn-primary nav-cta">
            Upload a report →
          </Link>
        )}
      </div>
    </nav>
  )
}
```

### Sign-out from marketing nav — Client Component

The sign-out button must be a Client Component (calls `signOut` from `next-auth/react`). Keep it as a minimal wrapper so the nav itself stays a Server Component:

```tsx
// src/components/marketing/SignOutFromMarketingButton.tsx
"use client"
import { signOut } from "next-auth/react"

export function SignOutFromMarketingButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="nav-signout"
    >
      Sign out
    </button>
  )
}
```

Note: `callbackUrl: "/"` — signing out from the marketing page returns the user to the home page, not to `/login`. This matches the expected behavior: the user is already on the marketing site, so keep them there.

### Nav CTA styling — signed-in state

The existing nav CTA is already styled as `.btn .btn-primary .nav-cta`. The Dashboard button reuses this class with no changes.

The "Sign out" link sits next to it as a quiet secondary action:

```css
/* Already exists in nav styles — verify these are present */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* New — sign out link in the marketing nav */
.nav-signout {
  font-family: var(--sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--ink-soft);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.15s;
  text-decoration: none;
}
.nav-signout:hover { color: var(--ink); }
```

### Visual result

**Signed out (existing, unchanged):**
```
[◉ Lumen]  How it works  Sample  Pricing  FAQ     [Upload a report →]
```

**Signed in:**
```
[◉ Lumen]  How it works  Sample  Pricing  FAQ     [Dashboard →]  Sign out
```

The nav links (How it works, Sample, Pricing, FAQ) are unchanged in both states.

---

## File summary

| File | Change |
|---|---|
| `src/components/dashboard/SignOutButton.tsx` | Add `onClick={() => signOut({ callbackUrl: "/login" })}` |
| `src/app/(marketing)/page.tsx` | Read session with `await auth()`, pass `isSignedIn` to nav |
| `src/components/marketing/MarketingNav.tsx` | Accept `isSignedIn` prop, conditionally render CTA group |
| `src/components/marketing/SignOutFromMarketingButton.tsx` | New Client Component — `signOut({ callbackUrl: "/" })` |

---

## Behavior summary

| Location | Signed out | Signed in |
|---|---|---|
| Dashboard sidebar | Sign-out button visible (was already there) | Clicking signs out → `/login` |
| Marketing nav | `Upload a report →` button (unchanged) | `Dashboard →` button + `Sign out` link |
| Marketing nav sign out | N/A | Clears session → stays on `/` |
| Dashboard sidebar sign out | N/A | Clears session → `/login` |

---

## Testing

```
1. Sign in via /login
   → Verify redirect to /dashboard
   → Verify sidebar sign-out button is visible

2. Click sidebar sign-out button
   → Verify session is cleared
   → Verify redirect to /login

3. Navigate to / (home page) while signed out
   → Verify nav shows "Upload a report →" (no change)

4. Sign in, then navigate to / (home page)
   → Verify nav shows "Dashboard →" and "Sign out"

5. Click "Dashboard →" in the marketing nav
   → Verify redirect to /dashboard

6. Click "Sign out" in the marketing nav
   → Verify session is cleared
   → Verify user stays on / (home page, not redirected to /login)

7. After signing out via marketing nav, refresh /
   → Verify nav reverts to "Upload a report →"

8. Visit /dashboard while signed out
   → Verify redirect to /login (proxy still works)
```

---

## References

- `auth-phase-1-spec.md` — NextAuth setup, `auth()` export
- `auth-phase-3-spec.md` — sidebar profile block, `SignOutButton` component
- `src/auth.ts` — `signOut` export
- `src/proxy.ts` — dashboard route protection (unchanged)
