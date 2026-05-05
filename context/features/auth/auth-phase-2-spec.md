# Auth Phase 2 — Email/Password Credentials Provider

## Overview

Add a Credentials provider for email/password authentication alongside the existing Google OAuth provider. This gives users who prefer not to use Google a native signup and login path.

Both providers must coexist. A user who signed up with Google should not be able to log in with email/password using the same address (and vice versa) — handle the "email already exists" conflict gracefully.

---

## Requirements

- `bcryptjs` is already installed — use it for hashing (not `bcrypt`, which requires native compilation)
- The `password String?` field is already in the `User` model from the updated schema — no new migration needed for that field
- Update `auth.config.ts` with a Credentials provider placeholder (edge-safe, `authorize: () => null`)
- Update `auth.ts` to override the Credentials provider with real bcrypt validation
- Create a registration API route at `POST /api/auth/register`
- Create a `POST /api/auth/check-email` helper route to validate email availability before form submission
- Custom sign-in and sign-up pages at `/login` and `/signup` — these were designed in the auth screen specs

---

## Registration API Route

### `POST /api/auth/register`

**Request body:**
```json
{
  "fullName": "Sarah Chen",
  "email": "sarah@example.com",
  "password": "mysecurepassword",
  "confirmPassword": "mysecurepassword"
}
```

**Validation (in order):**
1. All fields present and non-empty
2. `email` is a valid email format
3. `password` length ≥ 8 characters
4. `password === confirmPassword`
5. No existing `User` with that email (check `User.email`)

**On success:**
- Hash password with `bcryptjs.hash(password, 12)`
- Create `User` record with `fullName`, `email`, `password` (hashed)
- Create default `NotificationPreferences` record for the new user
- Create a default `Profile` record (`name: fullName, relationship: "self"`)
- Return `201` with `{ success: true, message: "Account created." }`

**On failure:**
- `400` — validation error with specific `{ error: string }` message
- `409` — email already registered: `{ error: "An account with this email already exists." }`
- `500` — unexpected server error: `{ error: "Something went wrong. Please try again." }`

```ts
// src/app/api/auth/register/route.ts

import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const { fullName, email, password, confirmPassword } = await req.json()

  // 1. Presence check
  if (!fullName || !email || !password || !confirmPassword) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    )
  }

  // 2. Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    )
  }

  // 3. Password length
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    )
  }

  // 4. Passwords match
  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: "Passwords do not match." },
      { status: 400 }
    )
  }

  // 5. Email uniqueness
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists." },
      { status: 409 }
    )
  }

  // Create user, default profile, and notification prefs atomically
  const hashed = await bcrypt.hash(password, 12)

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        fullName,
        email,
        password: hashed,
        emailVerified: null,  // set after email verification (future)
      },
    })

    await tx.profile.create({
      data: {
        name: fullName,
        relationship: "self",
        userId: user.id,
      },
    })

    await tx.notificationPreferences.create({
      data: {
        userId: user.id,
        flaggedMarkerReminders: true,
        monthlyCheckInNudge: true,
        productUpdates: false,
      },
    })
  })

  return NextResponse.json(
    { success: true, message: "Account created." },
    { status: 201 }
  )
}
```

---

## Email availability check route

### `POST /api/auth/check-email`

Called on blur from the email field on the signup page for inline validation (before the user submits the form).

**Request body:**
```json
{ "email": "sarah@example.com" }
```

**Response:**
```json
{ "available": true }
// or
{ "available": false, "error": "An account with this email already exists." }
```

```ts
// src/app/api/auth/check-email/route.ts

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ available: false }, { status: 400 })

  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true }
  })

  return NextResponse.json({
    available: !existing,
    error: existing ? "An account with this email already exists." : undefined,
  })
}
```

---

## `auth.config.ts` — add Credentials placeholder

```ts
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // Placeholder — real authorize logic is in auth.ts
    // This stub is required for the edge proxy to recognise the provider
    Credentials({
      authorize: async () => null,
    }),
  ],
}
```

---

## `auth.ts` — override Credentials with bcrypt validation

```ts
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",     // custom login page from the auth screen designs
    newUser: "/signup",   // redirect new Google users here on first sign-in
    error: "/login",      // show errors on the login page
  },
  providers: [
    // Override the placeholder with real bcrypt logic
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        if (!email || !password) return null

        const user = await prisma.user.findUnique({ where: { email } })

        // No user found or user signed up via Google (no password)
        if (!user || !user.password) return null

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) return null

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          image: user.image,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      if (token.id) session.user.id = token.id as string
      return session
    },
  },
})
```

---

## Custom auth pages

Phase 2 adds `pages.signIn: "/login"` — NextAuth's built-in page is replaced by the custom screens from the auth design specs.

The login page at `src/app/(auth)/login/page.tsx` and signup page at `src/app/(auth)/signup/page.tsx` must:

- Login: call `signIn("credentials", { email, password, redirectTo: "/dashboard" })`
- Login: call `signIn("google", { redirectTo: "/dashboard" })` for the Google button
- Signup: `POST /api/auth/register`, then `signIn("credentials", { email, password, redirectTo: "/dashboard" })`
- Handle inline field errors from the API response (never `alert()`, always inline below the field)
- Show loading state on the primary CTA button during the async call

---

## Provider conflict handling

A user who created an account with Google OAuth will not have a `password` field set. If they try to log in with email/password:

```ts
// In the Credentials authorize callback:
if (!user.password) return null
// → NextAuth returns a generic auth error
// → Login page shows: "Incorrect password. Try again or reset it."
```

A user who registered with email/password and then tries to sign in with Google using the same address:
- The Prisma adapter will link the Google account to the existing `User` record via the `Account` model
- This is the correct behavior — one `User`, multiple `Account` rows

---

## Audit log on register

After a successful registration, write an audit log entry:

```ts
await tx.auditLog.create({
  data: {
    userId: user.id,
    action: "account.create",
    entityType: "User",
    entityId: user.id,
  },
})
```

---

## Testing

```bash
# 1. Test registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Sarah Chen",
    "email": "demo@lumen.health",
    "password": "12345678",
    "confirmPassword": "12345678"
  }'
# Expected: { "success": true, "message": "Account created." }

# 2. Test duplicate email
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Sarah Chen",
    "email": "demo@lumen.health",
    "password": "12345678",
    "confirmPassword": "12345678"
  }'
# Expected: 409 { "error": "An account with this email already exists." }

# 3. Test password mismatch
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "12345678",
    "confirmPassword": "wrong"
  }'
# Expected: 400 { "error": "Passwords do not match." }

# 4. Test sign in with email/password
#    Navigate to /login, enter demo@lumen.health / 12345678
#    Expected: redirect to /dashboard

# 5. Test Google OAuth still works
#    Navigate to /login, click "Continue with Google"
#    Expected: Google consent, redirect to /dashboard

# 6. Test protection still works
#    Sign out, navigate to /dashboard
#    Expected: redirect to /login
```

---

## References

- Credentials provider: https://authjs.dev/getting-started/authentication/credentials
- Custom pages: https://authjs.dev/guides/pages/signin
- Provider conflict / account linking: https://authjs.dev/guides/account-linking
- Use Context7 to verify the latest NextAuth v5 Credentials conventions before implementing
