import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createPasswordResetToken } from '@/lib/verification'
import { sendPasswordResetEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.toLowerCase().trim() : null

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  // Always return 200 — never reveal whether the email exists
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, password: true },
    })

    if (user?.password) {
      const token = await createPasswordResetToken(email)
      await sendPasswordResetEmail(email, token)
    }
  } catch (err) {
    console.error('[forgot-password]', err)
  }

  return NextResponse.json({ ok: true })
}
