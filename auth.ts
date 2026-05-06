import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { authConfig } from "./auth.config"

// PrismaAdapter passes NextAuth's `name` field to prisma.user.create, but our
// schema uses `fullName`. Override createUser and updateUser to remap it.
const baseAdapter = PrismaAdapter(prisma)

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: {
    ...baseAdapter,
    createUser: async ({ name, ...data }: Parameters<NonNullable<typeof baseAdapter.createUser>>[0]) => {
      const user = await prisma.user.create({
        data: { ...data, fullName: name ?? null },
      })
      return { ...user, name: user.fullName }
    },
    updateUser: async ({ name, id, ...data }: Parameters<NonNullable<typeof baseAdapter.updateUser>>[0]) => {
      const user = await prisma.user.update({
        where: { id },
        data: { ...data, fullName: name ?? null },
      })
      return { ...user, name: user.fullName }
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    newUser: "/dashboard",
    error: "/login",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      // Allow Google sign-in to link to an existing email/password account
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        if (!email || !password) return null

        const user = await prisma.user.findUnique({ where: { email } })

        // No user found or signed up via Google (no password set)
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
