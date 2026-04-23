'use client';

import { useEffect, useRef } from 'react';

const DELAYS = ['0.1s', '0.2s', '0.35s'];

const CARDS = [
  {
    headline: 'Context, not just numbers.',
    body: "Every marker comes with a one-line meaning, a plain explanation of what it does in your body, and what 'high' or 'low' actually implies at this level — not just a color.",
    tag: 'Per-marker explainer',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
        stroke="#1F5041" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="7" />
        <path d="M10 6 L10 10 L13 12" />
      </svg>
    ),
  },
  {
    headline: 'Trends across every visit.',
    body: 'Upload two or more reports and Lumen shows how each marker has moved. Subtle drift matters — your clinician will thank you for catching it.',
    tag: 'Multi-report timeline',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
        stroke="#1F5041" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14 L7 10 L11 13 L17 5" />
        <circle cx="7" cy="10" r="1.5" fill="#1F5041" stroke="none" />
        <circle cx="11" cy="13" r="1.5" fill="#1F5041" stroke="none" />
      </svg>
    ),
  },
  {
    headline: 'A one-page summary.',
    body: 'A printable, plain-text summary you can hand to your doctor, family member, or a second-opinion specialist. The whole picture in sixty seconds of reading.',
    tag: 'PDF & share link',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
        stroke="#1F5041" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 4 H13 L16 7 V16 H5 Z" />
        <path d="M13 4 V7 H16" />
        <line x1="8" y1="11" x2="13" y2="11" />
        <line x1="8" y1="13.5" x2="12" y2="13.5" />
      </svg>
    ),
  },
  {
    headline: 'Questions drafted for your appointment.',
    body: "For every flagged marker, Lumen writes 2–4 specific, non-leading questions. Ask what matters. Don’t leave the exam room wishing you’d said something.",
    tag: 'Auto-generated, editable',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
        stroke="#1F5041" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="7" />
        <path d="M7.5 8.5 A2.5 2.5 0 0 1 12.5 8.5 C12.5 10 10 10.5 10 12" />
        <circle cx="10" cy="14" r="0.75" fill="#1F5041" stroke="none" />
      </svg>
    ),
  },
  {
    headline: 'Your data, your rules.',
    body: "Reports are encrypted at rest and deleted on request. We never sell data to insurers, pharmacies, advertisers, or anyone else. Ever. Read the fine print — there isn't much.",
    tag: 'HIPAA-aligned storage',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
        stroke="#1F5041" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="12" height="12" rx="2" />
        <line x1="4" y1="8" x2="16" y2="8" />
        <line x1="8" y1="4" x2="8" y2="8" />
        <line x1="12" y1="4" x2="12" y2="8" />
        <line x1="8" y1="12" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    headline: 'Reviewed by clinicians.',
    body: 'Every explanation template is drafted with a practicing MD and reviewed by a clinical pharmacist. Updates are logged. The receipts are on our methodology page.',
    tag: 'MD + PharmD reviewed',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
        stroke="#1F5041" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="7" />
        <path d="M4 10 H16 M10 4 V16" />
      </svg>
    ),
  },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.querySelectorAll<HTMLElement>('.scroll-fade').forEach((el) => {
            el.classList.add('in-view');
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="features-section"
      style={{
        padding: '140px 0',
        background: 'var(--paper)',
        borderTop: '1px solid var(--line-soft)',
      }}
    >
      <div className="mx-auto max-w-7xl px-8 max-[719px]:px-5">
        {/* Section header */}
        <div className="scroll-fade" style={{ maxWidth: '820px', marginBottom: '72px' }}>
          <div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-2"
            style={{ background: 'rgba(31, 80, 65, 0.08)' }}
          >
            <span className="eyebrow-dot" />
            <span
              className="text-forest text-[12px] font-medium uppercase tracking-[0.08em]"
              style={{ fontFamily: 'var(--font-geist-mono)' }}
            >
              What you get
            </span>
          </div>

          <h2
            className="font-display font-normal text-ink"
            style={{
              fontSize: 'clamp(38px, 5.5vw, 68px)',
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              marginTop: '20px',
            }}
          >
            Everything a careful reader would find —{' '}
            <em className="text-forest" style={{ fontStyle: 'italic', fontWeight: 300 }}>
              faster.
            </em>
          </h2>

          <p
            className="text-ink-soft"
            style={{
              fontSize: '19px',
              lineHeight: 1.55,
              maxWidth: '640px',
              marginTop: '24px',
            }}
          >
            Lumen isn&apos;t a chatbot. It&apos;s a structured read of your labs, built to slot into the
            12-minute appointment you actually get.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 gap-6 min-[720px]:grid-cols-2 min-[1020px]:grid-cols-3">
          {CARDS.map(({ headline, body, tag, icon }, i) => (
            <div
              key={headline}
              className="scroll-fade"
              style={{ transitionDelay: DELAYS[i % 3] }}
            >
              <div
                className="feature-card"
                style={{
                  background: 'var(--paper-elevated)',
                  border: '1px solid var(--line-soft)',
                  borderRadius: '12px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  height: '100%',
                }}
              >
                {/* Icon well */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '999px',
                    background: 'rgba(31, 80, 65, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>

                {/* Headline */}
                <h3
                  className="font-display text-ink"
                  style={{
                    fontSize: '22px',
                    fontWeight: 500,
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {headline}
                </h3>

                {/* Body */}
                <p
                  className="text-ink-soft"
                  style={{ fontSize: '14.5px', lineHeight: 1.6, flex: 1 }}
                >
                  {body}
                </p>

                {/* Mono tag */}
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--line-soft)',
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-dim)',
                  }}
                >
                  {tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
