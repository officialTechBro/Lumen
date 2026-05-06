import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';

const STATS = [
  { value: '94 panels',   label: 'of biomarkers explained in plain English.' },
  { value: '11 seconds',  label: 'average time to read a full lab report.' },
  { value: 'MD + PharmD', label: 'reviewed templates for top 100 markers.' },
];

interface Props {
  searchParams: Promise<{ verified?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const session = await auth();
  if (session) redirect('/dashboard');
  const { verified } = await searchParams;
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
          <span>Don&apos;t have an account?</span>
          <Link href="/signup" className="text-[var(--forest)] font-medium no-underline hover:underline">
            Create one →
          </Link>
        </div>
      </nav>

      {/* ── Body ────────────────────────────────────────────── */}
      <div className="min-h-[calc(100vh-68px)] flex items-center justify-center px-12 py-16">
        <div className="grid grid-cols-1 min-[960px]:grid-cols-[1fr_1.4fr] gap-10 min-[960px]:gap-16 items-start max-w-250 w-full">

          {/* ── Left rail — hidden on mobile ──────────────── */}
          <div className="hidden min-[960px]:block">
            <p className="fade d1 font-mono text-[11px] text-[var(--forest)] tracking-[0.18em] uppercase mb-7">
              SINCE FEB 2024
            </p>

            <h1 className="fade d1 font-display font-normal leading-[1.05] tracking-[-0.03em] mb-5" style={{ fontSize: 'clamp(30px, 2.8vw, 42px)' }}>
              Your health,<br />
              <em className="font-light italic text-[var(--forest)]">in plain English.</em>
            </h1>

            <p className="fade d2 text-[15px] text-[var(--ink-soft)] leading-[1.6] mb-8">
              Lab results explained, flagged, and turned into questions for your doctor.
            </p>

            <div className="fade d2 h-px bg-[var(--line-soft)] mb-8" />

            {/* Stats with Forest dots — matches signup feature list pattern */}
            <div className="flex flex-col gap-6 mb-8">
              {STATS.map((s, i) => (
                <div key={s.value} className={`fade d${i + 2} grid gap-3.5 items-start`} style={{ gridTemplateColumns: '16px 1fr' }}>
                  <div className="w-[7px] h-[7px] rounded-full bg-[var(--forest)] mt-2 shrink-0" />
                  <div>
                    <p className="font-display text-lg font-medium tracking-[-0.01em] mb-1">{s.value}</p>
                    <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="fade d5 h-px bg-[var(--line-soft)] mb-8" />

            {/* Quote — matches signup's free-plan callout box */}
            <div className="fade d5 bg-[var(--paper-warm)] border border-[var(--line-soft)] rounded-[10px] p-[16px_20px]">
              <p className="font-mono text-[10px] text-[var(--forest)] tracking-[0.14em] uppercase mb-3.5">
                FROM OUR USERS
              </p>
              <blockquote className="m-0 font-display text-[16px] italic font-light leading-[1.55] text-[var(--ink-soft)] mb-3">
                &ldquo;My LDL had been rising for two years. Nobody told me. Lumen showed me the trend.&rdquo;
              </blockquote>
              <p className="font-mono text-[10px] text-[var(--ink-dim)] tracking-[0.12em] uppercase">
                Marco D. · Brooklyn
              </p>
            </div>
          </div>

          {/* ── Right — form card ─────────────────────────── */}
          <div className="fade d1 bg-[var(--paper-elevated)] border border-[var(--line-soft)] rounded-2xl p-[48px_44px]">
            <LoginForm verified={verified === 'true'} />
          </div>

        </div>
      </div>

    </div>
  );
}
