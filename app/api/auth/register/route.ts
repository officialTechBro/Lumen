import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { createVerificationToken } from "@/lib/verification"
import { sendVerificationEmail } from "@/lib/email"
import { registerLimiter, checkRateLimitWithRetry } from "@/lib/rate-limit"

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown"
  const { allowed, retryAfter } = await checkRateLimitWithRetry(registerLimiter, `register:${ip}`)
  if (!allowed) {
    return NextResponse.json(
      { error: `Too many attempts. Please try again in ${retryAfter} seconds.` },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    )
  }

  try {
    const { fullName, email, password } = await req.json()

    // 1. Presence + type check
    if (!fullName || typeof fullName !== "string" || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      )
    }

    // 1b. Name length
    if (fullName.trim().length === 0 || fullName.trim().length > 100) {
      return NextResponse.json(
        { error: "Name must be between 1 and 100 characters." },
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

    // 4. Email uniqueness
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      )
    }

    const hashed = await bcrypt.hash(password, 12)

    const requireVerification = process.env.REQUIRE_EMAIL_VERIFICATION !== "false"

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName,
          email,
          password: hashed,
          emailVerified: requireVerification ? null : new Date(),
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

      await tx.auditLog.create({
        data: {
          userId: user.id,
          action: "account.create",
          entityType: "User",
          entityId: user.id,
        },
      })
    })

    if (requireVerification) {
      const token = await createVerificationToken(email)
      await sendVerificationEmail(email, token)
    }

    return NextResponse.json(
      { success: true, pendingVerification: requireVerification },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
