import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { checkEmailLimiter, checkRateLimit } from "@/lib/rate-limit"

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown"
  if (!await checkRateLimit(checkEmailLimiter, `check-email:${ip}`)) {
    // Return available:true on rate-limit so the form doesn't block the user
    return NextResponse.json({ available: true }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  const email = typeof body?.email === "string" ? body.email.toLowerCase().trim() : null
  if (!email) return NextResponse.json({ available: false }, { status: 400 })

  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  })

  // No error message — only return the boolean so this can't be used as an enumeration oracle
  return NextResponse.json({ available: !existing })
}
