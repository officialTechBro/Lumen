import Link from 'next/link';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

interface Props {
  searchParams: Promise<{ token?: string }>
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams;

  return (
    <div className="min-h-screen bg-[var(--paper)] font-sans">

      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className="w-full h-[68px] bg-[var(--paper)] border-b border-[var(--line-soft)] flex items-center justify-between px-12 sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-2.5 no-underline text-[var(--forest)]">
          <svg viewBox="0 0 22 22" fill="none" className="w-[22px] h-[22px]" aria-hidden="true">
            <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 11 Q 11 5, 16 11 T 6 11" fill="currentColor" />
          </svg>
          <span className="font-display text-lg font-medium tracking-[-0.02em] text-[var(--ink)]">
            Lumen
          </span>
        </Link>
        <div className="flex items-center gap-2 text-sm text-[var(--ink-soft)]">
          <span>Remember it now?</span>
          <Link href="/login" className="text-[var(--forest)] font-medium no-underline hover:underline">
            Sign in →
          </Link>
        </div>
      </nav>

      {/* ── Body ────────────────────────────────────────────── */}
      <div className="min-h-[calc(100vh-68px)] flex items-center justify-center px-12 py-16">
        <div className="grid grid-cols-1 min-[960px]:grid-cols-[1fr_1.4fr] gap-10 min-[960px]:gap-16 items-start max-w-250 w-full">

          {/* ── Left rail — hidden on mobile ──────────────── */}
          <div className="hidden min-[960px]:block">
            <p className="fade d1 font-mono text-[11px] text-[var(--forest)] tracking-[0.18em] uppercase mb-7">
              ACCOUNT SECURITY
            </p>

            <h1 className="fade d1 font-display font-normal leading-[1.05] tracking-[-0.03em] mb-5" style={{ fontSize: 'clamp(30px, 2.8vw, 42px)' }}>
              A fresh start,<br />
              <em className="font-light italic text-[var(--forest)]">just like that.</em>
            </h1>

            <p className="fade d2 text-[15px] text-[var(--ink-soft)] leading-[1.6] mb-8">
              Choose a strong password. You&apos;ll be back to your health data in seconds.
            </p>

            <div className="fade d2 h-px bg-[var(--line-soft)] mb-8" />

            <div className="fade d3 bg-[var(--paper-warm)] border border-[var(--line-soft)] rounded-[10px] p-[16px_20px]">
              <p className="font-mono text-[10px] text-[var(--forest)] tracking-[0.14em] uppercase mb-3.5">
                GOOD TO KNOW
              </p>
              <p className="text-[14px] text-[var(--ink-soft)] leading-[1.6]">
                Your reset link expires in <strong>1 hour</strong>. Once you save a new password, the link is invalidated.
              </p>
            </div>
          </div>

          {/* ── Right — form card ─────────────────────────── */}
          <div className="fade d1 bg-[var(--paper-elevated)] border border-[var(--line-soft)] rounded-2xl p-[48px_44px]">
            {token ? (
              <ResetPasswordForm token={token} />
            ) : (
              <div className="text-center py-4">
                <div className="flex justify-center mb-6">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h2 className="font-display text-[30px] font-medium tracking-[-0.025em] leading-[1.1] mb-3">
                  Invalid reset link.
                </h2>
                <p className="text-[15px] text-[var(--ink-soft)] leading-relaxed mb-8">
                  This link is missing a token. Request a new one from the sign-in page.
                </p>
                <Link
                  href="/login"
                  className="inline-block px-6 py-3 bg-[var(--ink)] text-[var(--paper)] font-medium text-sm rounded-full no-underline hover:bg-[var(--forest)] transition-colors"
                >
                  Back to sign in →
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
