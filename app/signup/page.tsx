import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SignupForm } from '@/components/auth/SignupForm';

const FEATURES = [
  { title: 'Explains every marker',       sub: 'In one plain sentence — no jargon, no diagnosis.' },
  { title: 'Flags what needs attention',  sub: 'Prioritized by clinical significance, not how alarming the word sounds.' },
  { title: 'Writes your doctor questions', sub: '2–4 specific questions for every flagged marker. Walk in prepared.' },
  { title: 'Tracks trends over time',     sub: 'Upload more than once and see how your markers are moving.' },
];

const FREE_ITEMS = [
  '3 lab translations / month',
  'All 94+ markers explained',
  'Doctor question generator',
];

export default async function SignupPage() {
  const session = await auth();
  if (session) redirect('/dashboard');
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
          <span>Already have an account?</span>
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
              WHY LUMEN?
            </p>

            <div className="flex flex-col gap-6 mb-10">
              {FEATURES.map((f, i) => (
                <div key={f.title} className={`fade d${i + 1} grid gap-3.5 items-start`} style={{ gridTemplateColumns: '16px 1fr' }}>
                  <div className="w-[7px] h-[7px] rounded-full bg-[var(--forest)] mt-2 shrink-0" />
                  <div>
                    <p className="font-display text-lg font-medium tracking-[-0.01em] mb-1">{f.title}</p>
                    <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{f.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="fade d5 h-px bg-[var(--line-soft)] mb-8" />

            <div className="fade d5 bg-[var(--paper-warm)] border border-[var(--line-soft)] rounded-[10px] p-[16px_20px]">
              <p className="font-mono text-[10px] text-[var(--forest)] tracking-[0.14em] uppercase mb-3.5">
                FREE PLAN INCLUDES
              </p>
              <div className="flex flex-col gap-2 mb-3">
                {FREE_ITEMS.map(item => (
                  <div key={item} className="text-sm text-[var(--ink-soft)] flex items-center gap-2.5">
                    <span className="font-mono text-[11px] text-[var(--ink-faint)]">—</span>
                    {item}
                  </div>
                ))}
              </div>
              <p className="font-mono text-[10px] text-[var(--ink-dim)] tracking-[0.12em] uppercase">
                No credit card required
              </p>
            </div>
          </div>

          {/* ── Right — form card ─────────────────────────── */}
          <div className="fade d1 bg-[var(--paper-elevated)] border border-[var(--line-soft)] rounded-2xl p-[48px_44px]">
            <SignupForm />
          </div>
        </div>
      </div>

    </div>
  );
}
