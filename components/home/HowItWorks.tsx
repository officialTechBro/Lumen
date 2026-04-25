'use client';

import { useEffect, useRef } from 'react';

function UploadViz() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 140"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* Document card */}
      <rect x="110" y="28" width="80" height="100" rx="6" fill="#FBF8F1" stroke="#E5DFD0" strokeWidth="1" />
      {/* Placeholder text lines */}
      <line x1="122" y1="64" x2="178" y2="64" stroke="#E5DFD0" strokeWidth="2" strokeLinecap="round" />
      <line x1="122" y1="76" x2="178" y2="76" stroke="#E5DFD0" strokeWidth="2" strokeLinecap="round" />
      <line x1="122" y1="88" x2="178" y2="88" stroke="#E5DFD0" strokeWidth="2" strokeLinecap="round" />
      <line x1="122" y1="100" x2="170" y2="100" stroke="#E5DFD0" strokeWidth="2" strokeLinecap="round" />
      <line x1="122" y1="112" x2="178" y2="112" stroke="#E5DFD0" strokeWidth="2" strokeLinecap="round" />
      <line x1="122" y1="120" x2="158" y2="120" stroke="#E5DFD0" strokeWidth="2" strokeLinecap="round" />
      {/* Forest upload circle — centered at card top edge */}
      <circle cx="150" cy="40" r="14" fill="#1F5041" />
      {/* White upward arrow */}
      <line x1="150" y1="48" x2="150" y2="34" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="144" y1="41" x2="150" y2="33" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="156" y1="41" x2="150" y2="33" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ReadViz() {
  const bars = [
    { y: 20,  fillWidth: 140, dotCx: 180, dotFill: '#5A7A3F' }, // normal — leaf
    { y: 48,  fillWidth: 195, dotCx: 235, dotFill: '#C8563A' }, // flagged — coral
    { y: 76,  fillWidth: 115, dotCx: 155, dotFill: '#1A2620' }, // watch — ink
    { y: 104, fillWidth: 80,  dotCx: 120, dotFill: '#1A2620' }, // watch — ink
  ];

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 140"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {bars.map(({ y, fillWidth, dotCx, dotFill }) => (
        <g key={y}>
          {/* Track */}
          <rect x="40" y={y} width="220" height="10" rx="5" fill="#E5DFD0" />
          {/* Fill */}
          <rect x="40" y={y} width={fillWidth} height="10" rx="5" fill="#D7E0C6" />
          {/* Status dot with paper-elev ring */}
          <circle cx={dotCx} cy={y + 5} r="8" fill={dotFill} stroke="#FBF8F1" strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
}

function AskViz() {
  const items = [
    { y: 24, text: '→ What could be causing the low D?' },
    { y: 56, text: '→ Should I retest in 3 months?' },
    { y: 88, text: '→ Is supplementation enough, or...?' },
  ];

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 140"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {items.map(({ y, text }) => (
        <g key={y}>
          <rect x="40" y={y} width="220" height="24" rx="4" fill="#FBF8F1" stroke="#E5DFD0" strokeWidth="1" />
          <text
            x="52"
            y={y + 15.5}
            fontFamily="'Geist Mono', monospace"
            fontSize="10"
            fill="#6B756F"
          >
            {text}
          </text>
        </g>
      ))}
    </svg>
  );
}

const STEPS = [
  {
    num: '01 — Upload',
    headline: 'Drop the PDF your clinic sent.',
    body: 'Works with results from Quest, Labcorp, Kaiser, and every major hospital system. Photos of printed reports work too. We support 94 panels and counting.',
    Viz: UploadViz,
  },
  {
    num: '02 — Read',
    headline: 'Each number, explained like a person.',
    body: "We tell you what it measures, what your result means in context, and whether it's normal, worth watching, or worth asking about. Two sentences, not a textbook chapter.",
    Viz: ReadViz,
  },
  {
    num: '03 — Ask',
    headline: 'Walk into your appointment prepared.',
    body: 'Lumen writes a short, specific list of questions for your clinician - the kind that would take an hour of searching to come up with. Save it, print it, or hand them your phone.',
    Viz: AskViz,
  },
];

const DELAYS = ['0.1s', '0.2s', '0.35s'];

export function HowItWorks() {
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
      id="how"
      ref={sectionRef}
      className="how-section"
      style={{
        padding: '140px 0',
        background: `
          radial-gradient(ellipse 90% 55% at 50% 35%, var(--paper-warm) 0%, transparent 70%),
          radial-gradient(ellipse 50% 60% at 100% 100%, rgba(31, 80, 65, 0.04) 0%, transparent 70%),
          var(--paper)
        `.trim(),
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
              How it works
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
            Three steps.{' '}
            <em className="text-forest" style={{ fontStyle: 'italic', fontWeight: 300 }}>
              No jargon,
            </em>{' '}
            no gatekeeping.
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
            Lumen reads your report the way a careful primary care doctor would - then
            translates. You stay in control of what your clinician sees.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 gap-8 min-[861px]:grid-cols-3">
          {STEPS.map(({ num, headline, body, Viz }, i) => (
            <div key={num} className="scroll-fade" style={{ transitionDelay: DELAYS[i] }}>
              <div
                className="step-card"
                style={{
                  background: 'var(--paper-elevated)',
                  border: '1px solid var(--line-soft)',
                  borderRadius: '12px',
                  padding: '32px',
                  height: '100%',
                }}
              >
                {/* Illustration box */}
                <div
                  style={{
                    height: '140px',
                    background: 'var(--paper-warm)',
                    border: '1px solid var(--line-soft)',
                    borderRadius: '8px',
                    marginBottom: '24px',
                    overflow: 'hidden',
                  }}
                >
                  <Viz />
                </div>

                {/* Step label */}
                <div
                  className="text-forest"
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    marginBottom: '24px',
                  }}
                >
                  {num}
                </div>

                {/* Headline */}
                <h3
                  className="font-display text-ink"
                  style={{
                    fontSize: '24px',
                    fontWeight: 500,
                    lineHeight: 1.2,
                    marginBottom: '12px',
                  }}
                >
                  {headline}
                </h3>

                {/* Body */}
                <p className="text-ink-soft" style={{ fontSize: '15px', lineHeight: 1.6 }}>
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
