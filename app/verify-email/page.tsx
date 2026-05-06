import Link from 'next/link'
import { VerifyEmailActions } from '@/components/auth/VerifyEmailActions'

interface Props {
  searchParams: Promise<{ email?: string; error?: string }>
}

export default async function VerifyEmailPage({ searchParams }: Props) {
  const { email, error } = await searchParams

  return (
    <div className="min-h-screen bg-[var(--paper)] font-sans flex flex-col">

      {/* Nav */}
      <nav className="w-full h-[68px] bg-[var(--paper)] border-b border-[var(--line-soft)] flex items-center px-12 sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <svg viewBox="0 0 22 22" fill="none" className="w-[22px] h-[22px]" aria-hidden="true">
            <circle cx="11" cy="11" r="10" stroke="#1F5041" strokeWidth="1.5" />
            <path d="M6 11 Q 11 5, 16 11 T 6 11" fill="#1F5041" />
          </svg>
          <span className="font-display text-lg font-medium tracking-[-0.02em] text-[var(--ink)]">
            Lumen
          </span>
        </Link>
      </nav>

      {/* Body */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="fade w-full max-w-[480px]">

          {error === 'expired' ? (
            /* ── Expired token ── */
            <div className="bg-[var(--paper-elevated)] border border-[var(--line-soft)] rounded-2xl p-[48px_44px] text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[var(--coral-soft)] flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8563A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4M12 16h.01" />
                  </svg>
                </div>
              </div>
              <h1 className="font-display text-[28px] font-medium tracking-[-0.025em] leading-[1.1] mb-3 text-[var(--ink)]">
                Link expired.
              </h1>
              <p className="text-[15px] text-[var(--ink-soft)] leading-relaxed mb-8">
                This verification link is no longer valid. Request a new one below.
              </p>
              <VerifyEmailActions email={email} />
            </div>
          ) : error === 'invalid' ? (
            /* ── Invalid token ── */
            <div className="bg-[var(--paper-elevated)] border border-[var(--line-soft)] rounded-2xl p-[48px_44px] text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[var(--coral-soft)] flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8563A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4M12 16h.01" />
                  </svg>
                </div>
              </div>
              <h1 className="font-display text-[28px] font-medium tracking-[-0.025em] leading-[1.1] mb-3 text-[var(--ink)]">
                Invalid link.
              </h1>
              <p className="text-[15px] text-[var(--ink-soft)] leading-relaxed mb-8">
                This verification link is not valid or has already been used.
              </p>
              <VerifyEmailActions email={email} />
            </div>
          ) : (
            /* ── Default: check your email ── */
            <div className="bg-[var(--paper-elevated)] border border-[var(--line-soft)] rounded-2xl p-[48px_44px] text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(31,80,65,0.1)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1F5041" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 7 10-7" />
                  </svg>
                </div>
              </div>

              <p className="font-mono text-[11px] text-[var(--forest)] tracking-[0.14em] uppercase mb-3">
                One more step
              </p>

              <h1 className="font-display text-[28px] font-medium tracking-[-0.025em] leading-[1.1] mb-3 text-[var(--ink)]">
                Check your <em className="not-italic font-light italic text-[var(--forest)]">inbox.</em>
              </h1>

              <p className="text-[15px] text-[var(--ink-soft)] leading-relaxed mb-2">
                We sent a verification link to
              </p>
              {email && (
                <p className="font-mono text-[13px] text-[var(--ink)] font-medium mb-6">
                  {email}
                </p>
              )}
              {!email && (
                <p className="text-[15px] text-[var(--ink-soft)] mb-6">your email address.</p>
              )}

              <p className="text-[13px] text-[var(--ink-dim)] leading-relaxed mb-8">
                Click the link in the email to verify your account.
                It expires in 24 hours.
              </p>

              <VerifyEmailActions email={email} />
            </div>
          )}

          <p className="text-center text-[13px] text-[var(--ink-dim)] mt-6">
            Already verified?{' '}
            <Link href="/login" className="text-[var(--forest)] font-medium no-underline hover:underline">
              Sign in →
            </Link>
          </p>

        </div>
      </div>

    </div>
  )
}
