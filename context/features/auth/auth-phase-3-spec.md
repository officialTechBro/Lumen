# Auth Phase 3 — Connect Custom Auth Pages + Sidebar Profile

## Overview

Wire up the custom `/login` and `/signup` pages (already designed and built) to the NextAuth Credentials and Google providers from Phase 1 and Phase 2. Update the bottom of the dashboard sidebar to show the real authenticated user's avatar, name, and plan — replacing any mock data — with a sign-out dropdown.

The pages themselves do not need to be redesigned or rebuilt. This spec is purely about connecting them to auth logic, handling errors, and wiring up the sidebar user block.

---

## Requirements

### `/login` page
- Connect email/password form to `signIn("credentials", ...)`
- Connect "Continue with Google" button to `signIn("google", ...)`
- Display inline field errors from NextAuth and the API
- Show loading state on the primary CTA during the async call
- Handle the forgot password in-place swap (no page navigation)
- Route is already set in `auth.ts` via `pages.signIn: "/login"`

### `/signup` page
- Connect form to `POST /api/auth/register`
- After successful registration, auto sign-in with `signIn("credentials", ...)`
- Connect "Continue with Google" button to `signIn("google", ...)`
- Hit `POST /api/auth/check-email` on email field blur for inline availability check
- Display inline field errors
- Route is already set in `auth.ts` via `pages.newUser: "/signup"`

### Sidebar — bottom user block
- Replace mock user data with real session values
- Show avatar: Google `image` if available, otherwise initials from `fullName`
- Show `fullName` and plan badge (`isPro ? "Lumen+" : "Free plan"`)
- Clicking the block opens a dropdown with "Sign out"
- Clicking the avatar/name area navigates to `/dashboard/settings`

---

## `/login` page — connections

The page at `src/app/(auth)/login/page.tsx` is already designed per `01-login.md`. Make these connections:

### Email/password sign-in

```tsx
"use client"
import { signIn } from "next-auth/react"

async function handleEmailSignIn(e: React.FormEvent) {
  e.preventDefault()
  setLoading(true)
  setError(null)

  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,   // handle redirect manually for error display
  })

  if (result?.error) {
    // Map NextAuth error codes to inline field errors
    if (result.error === "CredentialsSignin") {
      // Could be wrong password OR unrecognised email
      // Check which field to highlight by attempting a user lookup
      setPasswordError("Incorrect password. Try again or reset it.")
    } else {
      setFormError("Something went wrong. Please try again.")
    }
    setLoading(false)
    return
  }

  // Success — redirect to dashboard
  router.push("/dashboard")
}
```

### Google sign-in

```tsx
async function handleGoogleSignIn() {
  await signIn("google", { callbackUrl: "/dashboard" })
}
```

### Error display

The design for inline errors is already in `01-login.md`. Map these cases:

| Error | Field highlighted | Message |
|---|---|---|
| `CredentialsSignin` | Password | `Incorrect password. Try again or reset it.` |
| Email not found | Email | `No account found with this email.` + `Sign up instead →` link |
| Network/server error | Below button | `Something went wrong. Please try again.` |

To distinguish "wrong password" from "email not found" without exposing whether an email exists in the database (security best practice), always show the password error message for any `CredentialsSignin` failure. The "No account found" message is only shown if you explicitly check the email first — only do this if the UX design requires it.

### Loading state

```tsx
// Primary button during sign-in
<button
  type="submit"
  disabled={loading}
  className={`btn-primary ${loading ? "loading" : ""}`}
>
  {loading ? "Signing in…" : "Sign in →"}
</button>
```

### Forgot password in-place swap

The forgot password flow swaps the form content without navigating. This is client-side UI state only — no API call in Phase 3. Wire up the state toggle:

```tsx
const [forgotMode, setForgotMode] = useState(false)

// When "Forgot password?" is clicked:
setForgotMode(true)

// Render the reset form instead of the login form when forgotMode === true
// "Back to sign in" resets: setForgotMode(false)
```

The actual password reset email functionality (calling an API, sending Resend emails) is **out of scope for Phase 3** — stub the submit button with a success state that shows the "Check your inbox." message after any email is entered.

---

## `/signup` page — connections

The page at `src/app/(auth)/signup/page.tsx` is already designed per `02-signup.md`. Make these connections:

### Email availability check (on blur)

```tsx
async function checkEmailAvailability(email: string) {
  if (!email || !isValidEmail(email)) return

  const res = await fetch("/api/auth/check-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
  const data = await res.json()

  if (!data.available) {
    setEmailError("An account with this email already exists.")
    setEmailErrorLink({ text: "Sign in instead →", href: "/login" })
  } else {
    setEmailError(null)
  }
}

// Wire to input onBlur:
<input
  type="email"
  onBlur={(e) => checkEmailAvailability(e.target.value)}
/>
```

### Registration + auto sign-in

```tsx
async function handleSignUp(e: React.FormEvent) {
  e.preventDefault()
  setLoading(true)
  setError(null)

  // 1. Submit to registration API
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, email, password, confirmPassword }),
  })

  const data = await res.json()

  if (!res.ok) {
    // Map API error messages to the right field
    if (data.error?.includes("email")) setEmailError(data.error)
    else if (data.error?.includes("password")) setPasswordError(data.error)
    else setFormError(data.error)
    setLoading(false)
    return
  }

  // 2. Auto sign-in after successful registration
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  })

  if (result?.error) {
    // Registration succeeded but auto sign-in failed — send to login
    router.push("/login?registered=true")
    return
  }

  // 3. Success — go to dashboard
  router.push("/dashboard")
}
```

### Show confirmation state after successful registration

The `02-signup.md` spec describes a confirmation state (envelope SVG + "Check your email"). Since Lumen auto signs in after registration (no email verification in Phase 3), skip the confirmation state and go directly to `/dashboard`.

Email verification is a future enhancement. When it is added, swap step 3 above to show the confirmation state instead of redirecting.

### Google sign-up

```tsx
async function handleGoogleSignUp() {
  await signIn("google", { callbackUrl: "/dashboard" })
}
```

### Password strength indicator

The strength bar in `02-signup.md` is visual-only — wire it to the password field value:

```tsx
function getPasswordStrength(password: string): "weak" | "fair" | "strong" {
  if (password.length < 6) return "weak"
  if (password.length < 10) return "fair"
  return "strong"
}

const strength = getPasswordStrength(password)
// Apply .strength-bar.weak / .fair / .strong class to the bar
```

### Error display

| Error source | Field | Message |
|---|---|---|
| `check-email` 409 | Email | `An account with this email already exists.` + `Sign in instead →` |
| API 400 — email format | Email | `Enter a valid email address.` |
| API 400 — password length | Password | `Password must be at least 8 characters.` |
| API 400 — passwords don't match | Confirm password | `Passwords do not match.` |
| Auto sign-in failure | Below button | `Account created. Redirecting to sign in…` then push to `/login?registered=true` |
| Network error | Below button | `Something went wrong. Please try again.` |

---

## Sidebar — user block

The sidebar bottom block is in `src/components/dashboard/Sidebar.tsx`. It is a Server Component — fetch the session server-side.

### Data source

```tsx
// src/components/dashboard/Sidebar.tsx (Server Component)
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

const session = await auth()
const userId = session?.user?.id!

// Fetch isPro from the database — not stored in the JWT
const user = await prisma.user.findUnique({
  where: { id: userId },
  select: { fullName: true, image: true, isPro: true }
})
```

### Avatar component

Create a reusable `<UserAvatar>` component at `src/components/ui/UserAvatar.tsx`:

```tsx
// src/components/ui/UserAvatar.tsx

type Props = {
  image: string | null
  fullName: string | null
  size?: number   // px, default 32
}

export function UserAvatar({ image, fullName, size = 32 }: Props) {
  if (image) {
    return (
      <img
        src={image}
        alt={fullName ?? "User"}
        width={size}
        height={size}
        style={{ borderRadius: "999px", objectFit: "cover" }}
      />
    )
  }

  // Generate initials from fullName
  const initials = fullName
    ? fullName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?"

  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "999px",
        background: "var(--forest)",     // #1F5041
        color: "var(--paper)",            // #F6F3EC
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--serif)",       // Newsreader
        fontSize: size * 0.4,
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {initials}
    </span>
  )
}
```

### Sidebar user block render

```tsx
// Inside Sidebar.tsx — bottom of the flex column

<div className="profile">
  <Link href="/dashboard/settings">
    <UserAvatar image={user?.image ?? null} fullName={user?.fullName ?? null} />
    <div className="profile-info">
      <span className="profile-name">{user?.fullName ?? "My Account"}</span>
      <span className="profile-plan">
        {user?.isPro ? "Lumen+" : "Free plan"}
      </span>
    </div>
  </Link>
  <SignOutButton />
</div>
```

### Sign-out button

The sign-out must be a Client Component (it uses `signOut` from `next-auth/react`):

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
    >
      {/* Sign-out icon — door/exit SVG, 16×16, currentColor stroke */}
    </button>
  )
}
```

Styling:
```css
.signout-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid var(--line-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-dim);
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
  margin-left: auto;
}
.signout-btn:hover {
  border-color: var(--line);
  color: var(--ink);
}
```

### Profile block CSS

```css
.profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.15s;
}
.profile:hover { background: var(--paper-warm); }

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;   /* prevents overflow */
}
.profile-name {
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 500;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.profile-plan {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-dim);
}
```

---

## Route configuration summary

| Route | Page file | Auth state |
|---|---|---|
| `/login` | `src/app/(auth)/login/page.tsx` | Public — redirect to `/dashboard` if already signed in |
| `/signup` | `src/app/(auth)/signup/page.tsx` | Public — redirect to `/dashboard` if already signed in |
| `/dashboard/*` | Protected by `src/proxy.ts` | Redirect to `/login` if not signed in |

### Redirect already-signed-in users away from auth pages

```tsx
// src/app/(auth)/login/page.tsx and signup/page.tsx (Server Component wrapper)
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const session = await auth()
  if (session) redirect("/dashboard")

  return <LoginForm />  // the Client Component with the form
}
```

---

## Testing

```
1. Visit /login — verify custom page renders (not NextAuth default)
2. Sign in with email/password (demo@lumen.health / 12345678)
   → Verify redirect to /dashboard
3. Sign out via sidebar button
   → Verify redirect to /login
4. Sign in with Google
   → Verify Google OAuth flow and redirect to /dashboard
5. Visit /login while already signed in
   → Verify redirect to /dashboard (already authenticated)
6. Visit /signup, fill in the form
   → Verify inline email availability check fires on blur
   → Verify account creation and auto sign-in to /dashboard
7. Visit /signup while already signed in
   → Verify redirect to /dashboard
8. Check sidebar user block:
   → Google user: shows Google avatar image
   → Email user: shows initials in Forest circle
   → Name truncates correctly if long
   → Plan badge shows "Lumen+" or "Free plan"
9. Visit /dashboard without a session
   → Verify redirect to /login
```

---

## References

- `01-login.md` — login page design spec (already built)
- `02-signup.md` — signup page design spec (already built)
- `auth-phase-1-spec.md` — NextAuth setup + Google provider
- `auth-phase-2-spec.md` — Credentials provider + registration API
- `src/auth.ts` — `signIn`, `signOut`, `auth` exports
- `src/proxy.ts` — route protection
