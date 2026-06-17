import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createVerificationToken } from "@/lib/verification"
import { sendVerificationEmail } from "@/lib/email"
import { resendLimiter, checkRateLimitWithRetry } from "@/lib/rate-limit"

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown"

  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 })
    }

    const { allowed, retryAfter } = await checkRateLimitWithRetry(resendLimiter, `resend:${ip}:${email}`)
    if (!allowed) {
      return NextResponse.json(
        { error: `Too many attempts. Please try again in ${retryAfter} seconds.` },
        { status: 429, headers: { "Retry-After": String(retryAfter) } },
      )
    }

    const user = await prisma.user.findUnique({ where: { email } })

    // Return 200 regardless of whether the user exists to prevent email enumeration
    if (!user || user.emailVerified) {
      return NextResponse.json({ success: true })
    }

    const token = await createVerificationToken(email)
    await sendVerificationEmail(email, token)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
