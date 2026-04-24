'use client';

import { useEffect, useRef } from 'react';

const COMMITMENTS = [
  {
    label: "We never say “you have X.”",
    body: "No condition labels, no prescriptions, no treatment recommendations. That’s your doctor’s job, and we don’t replace it.",
  },
  {
    label: "We show our sources.",
    body: "Every explanation links to the guideline or study it draws from — USPSTF, ADA, AHA, NIH. No anonymous health-blog copy.",
  },
  {
    label: "We don’t sell to insurers.",
    body: "Your results never touch a risk-scoring model, an advertiser, or a third party. Subscription-funded, on purpose.",
  },
  {
    label: "We defer to emergencies.",
    body: "If a value suggests an urgent issue, we say so plainly — and tell you to call your doctor or 911 instead of reading more.",
  },
];

export function TrustCallout() {
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const block = blockRef.current;
    if (!block) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          block.classList.add('in-view');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(block);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        padding: '140px 0',
        background: 'var(--paper)',
        borderTop: 'none',
      }}
    >
      <div className="mx-auto max-w-7xl px-8 max-[719px]:px-5">
        {/* Callout block */}
        <div
          ref={blockRef}
          className="scroll-fade"
          style={{
            background: '#1A2620',
            color: '#F6F3EC',
            borderRadius: '16px',
          }}
        >
          <div className="grid grid-cols-2 max-[860px]:grid-cols-1 items-start" style={{ padding: 'clamp(40px, 5vw, 72px) clamp(24px, 5vw, 56px)', gap: 'clamp(40px, 5vw, 64px)' }}>
            {/* Left — thesis */}
            <div>
              {/* Eyebrow */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-2"
                style={{ background: 'rgba(168, 230, 207, 0.12)' }}
              >
                <span className="trust-dot" />
                <span
                  className="text-[12px] font-medium uppercase tracking-[0.08em]"
                  style={{ color: 'var(--mint)', fontFamily: 'var(--font-geist-mono)' }}
                >
                  What Lumen won&apos;t do
                </span>
              </div>

              {/* Headline */}
              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: 400,
                  lineHeight: 1.05,
                  letterSpacing: '-0.025em',
                  color: '#F6F3EC',
                  marginTop: '20px',
                }}
              >
                We explain.{' '}
                <br />
                We do not{' '}
                <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--mint)' }}>
                  diagnose.
                </em>
              </h2>

              {/* Sub */}
              <p
                style={{
                  fontSize: '17px',
                  lineHeight: 1.6,
                  color: 'rgba(246, 243, 236, 0.7)',
                  marginTop: '24px',
                  maxWidth: '460px',
                }}
              >
                The line between useful context and medical advice is sharp, and we stay on our
                side of it. Your clinician diagnoses and treats. Lumen makes sure you walk in
                knowing what to ask.
              </p>
            </div>

            {/* Right — commitments */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {COMMITMENTS.map(({ label, body }, i) => (
                <li
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '28px 1fr',
                    gap: '16px',
                    alignItems: 'start',
                    paddingBottom: i < COMMITMENTS.length - 1 ? '20px' : undefined,
                    borderBottom:
                      i < COMMITMENTS.length - 1
                        ? '1px solid rgba(246, 243, 236, 0.12)'
                        : undefined,
                  }}
                >
                  {/* Mint dot */}
                  <span
                    style={{
                      display: 'block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '999px',
                      background: 'var(--mint)',
                      marginTop: '9px',
                      flexShrink: 0,
                    }}
                  />
                  {/* Text */}
                  <div>
                    <strong
                      className="font-display"
                      style={{
                        display: 'block',
                        fontSize: '18px',
                        fontWeight: 500,
                        color: '#F6F3EC',
                        marginBottom: '4px',
                      }}
                    >
                      {label}
                    </strong>
                    <span
                      style={{
                        fontSize: '14.5px',
                        lineHeight: 1.5,
                        color: 'rgba(246, 243, 236, 0.7)',
                      }}
                    >
                      {body}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
