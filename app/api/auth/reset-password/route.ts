import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const { token, password, confirmPassword } = body ?? {}

  if (!token || !password || !confirmPassword) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  }

  if (password !== confirmPassword) {
    return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 })
  }

  if (typeof password !== 'string' || password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
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
