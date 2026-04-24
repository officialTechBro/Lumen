'use client';

import { useEffect, useRef } from 'react';

const QUOTES = [
  {
    quote:
      "I used to leave appointments realizing I'd nodded through half of it. Now I walk in with a page. My doctor said it was the best-prepared patient visit she'd had that month.",
    name: 'Hannah R.',
    context: 'Portland · annual physical',
    delay: '0.1s',
  },
  {
    quote:
      "The vitamin D thing had been flagged for three years and nobody explained it. Lumen did, in two sentences. I'm on a supplement now and my energy is back.",
    name: 'Marco D.',
    context: 'Brooklyn · routine bloodwork',
    delay: '0.2s',
  },
  {
    quote:
      "I'm a nurse. I recommend this to every patient who tells me they googled their results at 2am and spiraled. It's the opposite of WebMD — calm, specific, and grown-up.",
    name: 'Priya S., RN',
    context: 'Austin · clinical',
    delay: '0.35s',
  },
  {
    quote:
      "My dad is 74 and doesn't trust most tech. He trusts this because it looks like a medical report, not a feed. That's a real design choice and I noticed.",
    name: 'Evan K.',
    context: 'Chicago · parent care',
    delay: '0.5s',
  },
];

export function Testimonials() {
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
      ref={sectionRef}
      className="testimonials-section"
      style={{
        padding: '140px 0',
        background: 'var(--paper)',
        borderTop: '1px solid var(--line-soft)',
      }}
    >
      <div className="mx-auto max-w-7xl px-8 max-[719px]:px-5">
        {/* Header */}
        <div className="scroll-fade" style={{ maxWidth: '720px', marginBottom: '64px' }}>
          <div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-2"
            style={{ background: 'rgba(31, 80, 65, 0.08)' }}
          >
            <span className="eyebrow-dot" />
            <span
              className="text-[12px] font-medium uppercase tracking-[0.08em]"
              style={{ color: 'var(--forest)', fontFamily: 'var(--font-geist-mono)' }}
            >
              Why people use it
            </span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(38px, 5.5vw, 68px)',
              fontWeight: 400,
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              color: 'var(--ink)',
              marginTop: '20px',
            }}
          >
            Built for the{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--forest)' }}>
              twelve minutes
            </em>{' '}
            you actually get
            <br />
            with your doctor.
          </h2>
        </div>

        {/* Quote grid */}
        <div className="grid grid-cols-2 max-[860px]:grid-cols-1" style={{ gap: '32px' }}>
          {QUOTES.map(({ quote, name, context, delay }) => (
            <div
              key={name}
              className="scroll-fade quote-card"
              style={{
                transitionDelay: delay,
                background: 'var(--paper-elev)',
                border: '1px solid var(--line-soft)',
                borderRadius: '12px',
                padding: '40px 36px',
              }}
            >
              <blockquote
                style={{
                  margin: '0 0 24px 0',
                  fontFamily: 'var(--font-newsreader)',
                  fontSize: '24px',
                  fontWeight: 400,
                  lineHeight: 1.35,
                  letterSpacing: '-0.015em',
                  color: 'var(--ink)',
                }}
              >
                &ldquo;{quote}&rdquo;
              </blockquote>

              <div
                className="who"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderTop: '1px solid var(--line-soft)',
                  paddingTop: '20px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-newsreader)',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: 'var(--ink)',
                  }}
                >
                  {name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-dim)',
                  }}
                >
                  {context}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
