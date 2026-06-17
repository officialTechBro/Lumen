import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { resetLimiter, checkRateLimitWithRetry } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown"
  const { allowed, retryAfter } = await checkRateLimitWithRetry(resetLimiter, `reset:${ip}`)
  if (!allowed) {
    return NextResponse.json(
      { error: `Too many attempts. Please try again in ${retryAfter} seconds.` },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    )
  }

  const body = await req.json().catch(() => null)
  const { token, password, confirmPassword } = body ?? {}

  // Type checks first, before any string operations
  if (typeof token !== 'string' || typeof password !== 'string' || typeof confirmPassword !== 'string') {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  }

  if (!token || !password || !confirmPassword) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  }

  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
  }

  if (password !== confirmPassword) {
    return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 })
  }

  const record = await prisma.verificationToken.findUnique({
    where: { token },
  })

  if (!record || !record.identifier.startsWith('password-reset:')) {
    return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 })
  }

  if (record.expires < new Date()) {
    await prisma.verificationToken.delete({ where: { token } }).catch(() => null)
    return NextResponse.json({ error: 'Reset link has expired. Request a new one.' }, { status: 400 })
  }

  const email = record.identifier.replace('password-reset:', '')
  const user = await prisma.user.findUnique({ where: { email }, select: { id: true } })

  if (!user) {
    return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 12)

  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { password: hashed } }),
    prisma.verificationToken.delete({ where: { token } }),
  ])

  return NextResponse.json({ ok: true })
}
