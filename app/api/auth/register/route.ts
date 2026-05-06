import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { fullName, email, password } = await req.json()

    // 1. Presence check
    if (!fullName || !email || !password) {
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
    // if (password !== confirmPassword) {
    //   return NextResponse.json(
    //     { error: "Passwords do not match." },
    //     { status: 400 }
    //   )
    // }

    // 5. Email uniqueness
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      )
    }

    const hashed = await bcrypt.hash(password, 12)

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName,
          email,
          password: hashed,
          emailVerified: null,
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

    return NextResponse.json(
      { success: true, message: "Account created." },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
