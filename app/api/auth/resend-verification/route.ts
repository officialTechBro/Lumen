import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createVerificationToken } from "@/lib/verification"
import { sendVerificationEmail } from "@/lib/email"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 })
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
