import { randomBytes } from 'crypto'
import { prisma } from '@/lib/prisma'

export async function createVerificationToken(email: string): Promise<string> {
  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  })

  await prisma.verificationToken.create({
    data: { identifier: email, token, expires },
  })

  return token
}

export async function createPasswordResetToken(email: string): Promise<string> {
  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
  const identifier = `password-reset:${email}`

  await prisma.verificationToken.deleteMany({
    where: { identifier },
  })

  await prisma.verificationToken.create({
    data: { identifier, token, expires },
  })

  return token
}
