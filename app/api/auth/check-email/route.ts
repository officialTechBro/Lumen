import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ available: false }, { status: 400 })

  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  })

  return NextResponse.json({
    available: !existing,
    error: existing ? "An account with this email already exists." : undefined,
  })
}
