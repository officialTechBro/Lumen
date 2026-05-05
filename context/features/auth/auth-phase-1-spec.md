# Auth Phase 1 — NextAuth v5 + Google Provider

## Overview

Set up NextAuth v5 with the Prisma adapter and Google OAuth. Use NextAuth's default pages for initial testing. Protect all `/dashboard/*` routes and redirect unauthenticated users to sign-in.

This is a health product handling sensitive data — the auth layer must be rock solid before any report or marker data is exposed.

---

## Requirements

- Install `next-auth@beta` and `@auth/prisma-adapter`
- Set up the **split auth config pattern** for edge compatibility
- Add **Google OAuth** provider
- Protect `/dashboard/*` routes using Next.js middleware proxy
- Redirect unauthenticated users to sign-in
- Extend the `Session` type to include `user.id` (needed by every DB query)

---

## Files to create

| File | Purpose |
|---|---|
| `src/auth.config.ts` | Edge-compatible config — providers only, no Prisma adapter |
| `src/auth.ts` | Full config with Prisma adapter and JWT strategy |
| `src/app/api/auth/[...nextauth]/route.ts` | Export GET and POST handlers from `auth.ts` |
| `src/proxy.ts` | Route protection with redirect logic |
| `src/types/next-auth.d.ts` | Extend `Session` with `user.id` |

---

## `src/auth.config.ts`

Edge-compatible. Providers only — no Prisma import here (Prisma cannot run on the edge runtime).

```ts
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
}
```

---

## `src/auth.ts`

Full config. Imports Prisma adapter. Uses JWT session strategy (required by the split pattern).

```ts
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      // Persist user.id into the JWT on first sign-in
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      // Expose user.id on the session so Server Components can use it
      if (token.id) session.user.id = token.id as string
      return session
    },
  },
})
```

---

## `src/app/api/auth/[...nextauth]/route.ts`

```ts
import { handlers } from "@/auth"

export const { GET, POST } = handlers
```

---

## `src/proxy.ts`

Protects `/dashboard` and all sub-routes. Unauthenticated users are redirected to the NextAuth sign-in page. Must be at `src/proxy.ts` (same level as `src/app/`).

```ts
import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

export const { auth: proxy } = NextAuth(authConfig)

export const config = {
  matcher: ["/dashboard/:path*"],
}
```

> **Note:** Use `export const proxy = auth(...)` as a named export, not a default export. The file must be named `proxy.ts` at `src/` level, not `middleware.ts`.

---

## `src/types/next-auth.d.ts`

Extends the default Session type so TypeScript knows `session.user.id` exists.

```ts
import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}
```

---

## Prisma schema models required

These NextAuth adapter models must exist in `schema.prisma` before running auth. They were added in the updated project overview schema — verify they are present:

```prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

And on the `User` model:
```prisma
emailVerified  DateTime?
image          String?
accounts       Account[]
sessions       Session[]
```

Run `npx prisma migrate dev --name add-nextauth-models` after confirming the schema.

---

## Environment variables

Add to `.env.local`:

```env
AUTH_SECRET=                  # generate with: openssl rand -base64 32
AUTH_GOOGLE_ID=               # from Google Cloud Console
AUTH_GOOGLE_SECRET=           # from Google Cloud Console
```

### Setting up Google OAuth credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Navigate to **APIs & Services → Credentials**
4. Click **Create Credentials → OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Add **Authorized redirect URIs**:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-domain.com/api/auth/callback/google`
7. Copy the Client ID and Client Secret into `.env.local`

---

## Key gotchas

- Use `next-auth@beta` — `@latest` installs v4 which has a completely different API
- The proxy file must be at `src/proxy.ts`, not `src/middleware.ts`
- Use `session: { strategy: 'jwt' }` — the split config pattern requires JWT, not database sessions
- Do **not** set a custom `pages.signIn` in phase 1 — use NextAuth's built-in page for testing
- The `AUTH_SECRET` env var is required in production; NextAuth will warn without it in development
- Google requires the consent screen to be configured in Cloud Console even for development
- `user.image` is populated from the Google account avatar — the `User` model must have `image String?`

---

## Testing

```bash
# 1. Start dev server
npm run dev

# 2. Visit a protected route — should redirect to sign-in
open http://localhost:3000/dashboard

# 3. Should land on NextAuth's default sign-in page at:
#    http://localhost:3000/api/auth/signin

# 4. Click "Sign in with Google"
# 5. Complete Google OAuth flow
# 6. Should redirect back to /dashboard after successful auth

# 7. Verify session is available in a Server Component:
#    const session = await auth()
#    console.log(session?.user?.id)   // should be the Prisma User.id cuid
```

---

## References

- NextAuth v5 edge compatibility: https://authjs.dev/getting-started/installation#edge-compatibility
- Prisma adapter: https://authjs.dev/getting-started/adapters/prisma
- Google provider: https://authjs.dev/getting-started/authentication/oauth
- Use Context7 to verify the latest NextAuth v5 conventions before implementing
