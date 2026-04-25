'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';

type RowStatus = 'flag' | 'watch' | 'normal';

interface RowData {
  id: string;
  name: string;
  abbrev: string;
  bandLeft: number;
  bandRight: number;
  dotStatus: RowStatus;
  dotLeft: number;
  value: string;
  reference: string;
  whatItMeans: ReactNode;
  whyItMatters: string;
  askYourDoctor: string[];
}

const ROWS: RowData[] = [
  {
    id: 'vitamin-d',
    name: 'Vitamin D, 25-OH',
    abbrev: '25(OH)D',
    bandLeft: 36,
    bandRight: 0,
    dotStatus: 'flag',
    dotLeft: 24,
    value: '24 ng/mL',
    reference: 'Ref 30–100',
    whatItMeans: (
      <>
        Your vitamin D is <em style={{ fontStyle: 'italic' }}>mildly low</em>.
        Common, especially in winter or if you spend most days indoors.
      </>
    ),
    whyItMatters:
      'Vitamin D helps your body absorb calcium and supports immune function. Levels below 20 can contribute to fatigue and bone loss over years, not days.',
    askYourDoctor: [
      'Is 2,000 IU daily reasonable for me, or do I need a loading dose?',
      'When should I retest — 3 months or 6?',
      'Any diet or lifestyle changes worth pairing with the supplement?',
    ],
  },
  {
    id: 'ldl',
    name: 'LDL Cholesterol',
    abbrev: 'LDL-C',
    bandLeft: 0,
    bandRight: 55,
    dotStatus: 'flag',
    dotLeft: 72,
    value: '142 mg/dL',
    reference: 'Ref < 100',
    whatItMeans: (
      <>
        LDL is <em style={{ fontStyle: 'italic' }}>elevated</em>, not alarming.
        It&apos;s one of several numbers your doctor weighs before recommending
        action.
      </>
    ),
    whyItMatters:
      'LDL correlates with cardiovascular risk over decades. Guidelines treat the number alongside your age, blood pressure, family history, and other labs.',
    askYourDoctor: [
      "What's my 10-year cardiovascular risk score?",
      'Is diet and exercise the right first step, or should we discuss medication?',
      'Should I get an apoB or Lp(a) test for a clearer picture?',
    ],
  },
  {
    id: 'ferritin',
    name: 'Ferritin',
    abbrev: 'Iron stores',
    bandLeft: 14,
    bandRight: 14,
    dotStatus: 'watch',
    dotLeft: 22,
    value: '38 ng/mL',
    reference: 'Ref 30–300',
    whatItMeans: (
      <>
        In range, but on the <em style={{ fontStyle: 'italic' }}>low end</em>.
        Worth tracking if you&apos;ve been unusually tired.
      </>
    ),
    whyItMatters:
      "Ferritin reflects how much iron your body has stored. Many people feel symptoms before the number drops below 'normal' — it's reasonable to discuss.",
    askYourDoctor: [
      'Would a full iron panel (iron, TIBC, saturation) be useful?',
      'Any reason my stores dropped since last year?',
      'When should we re-check?',
    ],
  },
  {
    id: 'hba1c',
    name: 'Hemoglobin A1c',
    abbrev: 'HbA1c',
    bandLeft: 0,
    bandRight: 30,
    dotStatus: 'normal',
    dotLeft: 48,
    value: '5.4 %',
    reference: 'Ref < 5.7',
    whatItMeans: (
      <>
        Your 3-month blood sugar average looks{' '}
        <em style={{ fontStyle: 'italic' }}>healthy</em>. No action needed.
      </>
    ),
    whyItMatters:
      "A1c is the gold-standard read on diabetes risk. You're comfortably below the prediabetes threshold (5.7%). Most clinicians check this once a year.",
    askYourDoctor: [
      'Is annual re-testing the right cadence given my family history?',
    ],
  },
  {
    id: 'tsh',
    name: 'TSH',
    abbrev: 'Thyroid',
    bandLeft: 10,
    bandRight: 10,
    dotStatus: 'normal',
    dotLeft: 40,
    value: '2.1 μIU/mL',
    reference: 'Ref 0.4–4.0',
    whatItMeans: (
      <>
        Thyroid signal is{' '}
        <em style={{ fontStyle: 'italic' }}>right in the middle</em> of normal.
        Nothing to do here.
      </>
    ),
    whyItMatters:
      "TSH is your pituitary's thyroid thermostat. A mid-range value rules out both an under- and over-active thyroid for most purposes.",
    askYourDoctor: [
      'Is full thyroid testing (Free T4, T3) warranted given my symptoms?',
    ],
  },
];

const LEGEND: { status: RowStatus; label: string; strong: string; desc: string }[] = [
  {
    status: 'flag',
    label: 'Flag',
    strong: 'Something to raise now.',
    desc: "Out of range in a way that's worth a specific conversation with your clinician.",
  },
  {
    status: 'watch',
    label: 'Watch',
    strong: 'Trending, not urgent.',
    desc: 'In range or borderline, but the direction matters. Re-test on schedule.',
  },
  {
    status: 'normal',
    label: 'Normal',
    strong: 'Looks fine.',
    desc: "Within the lab's reference range and your personal history, if we have it.",
  },
];

const STATUS_PILL: Record<RowStatus, { bg: string; color: string }> = {
  flag: { bg: 'var(--coral-soft)', color: 'var(--coral)' },
  watch: { bg: 'rgba(61, 72, 66, 0.1)', color: 'var(--ink-soft)' },
  normal: { bg: 'var(--leaf-soft)', color: 'var(--leaf)' },
};

const SUMMARY = [
  { label: 'Read time', value: '11', unit: 'sec', isFlag: false },
  { label: 'Markers', value: '21', unit: '', isFlag: false },
  { label: 'In range', value: '18', unit: '', isFlag: false },
  { label: 'Flagged', value: '2', unit: '', isFlag: true },
];

const STAT_CELL_CLASS = ['', 'stat-cell-2', 'stat-cell-3', 'stat-cell-4'];

const MONO = 'var(--font-geist-mono)';
const MONO_LABEL = {
  fontFamily: MONO,
  fontSize: '10px',
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
};

function RangeViz({
  bandLeft,
  bandRight,
  dotStatus,
  dotLeft,
}: {
  bandLeft: number;
  bandRight: number;
  dotStatus: RowStatus;
  dotLeft: number;
}) {
  return (
    <div className="range-viz">
      <div className="range-track" />
      <div
        className="range-band"
        style={{ left: `${bandLeft}%`, right: `${bandRight}%` }}
      />
      <div
        className={`range-dot dot-${dotStatus}`}
        style={{ left: `${dotLeft}%` }}
      />
    </div>
  );
}

function Expansion({ row, isOpen }: { row: RowData; isOpen: boolean }) {
  return (
    <div className={`result-expansion${isOpen ? ' open' : ''}`}>
      <div className="text-forest" style={{ ...MONO_LABEL, marginBottom: '8px' }}>
        What it means
      </div>

      <p
        className="font-display text-ink"
        style={{
          fontSize: '19px',
          lineHeight: 1.4,
          letterSpacing: '-0.01em',
          marginBottom: '20px',
          fontWeight: 400,
        }}
      >
        {row.whatItMeans}
      </p>

      <div className="expansion-columns">
        <div>
          <div className="text-forest" style={{ ...MONO_LABEL, marginBottom: '10px' }}>
            Why it matters
          </div>
          <p className="text-ink-soft" style={{ fontSize: '14.5px', lineHeight: 1.55 }}>
            {row.whyItMatters}
          </p>
        </div>

        <div>
          <div className="text-forest" style={{ ...MONO_LABEL, marginBottom: '10px' }}>
            Ask your doctor
          </div>
          {row.askYourDoctor.map((q) => (
            <p key={q} className="ask-q">
              {q}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SampleReport() {
  const [expandedId, setExpandedId] = useState<string>('vitamin-d');
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

  function handleRowClick(id: string) {
    setExpandedId((prev) => (prev === id ? '' : id));
  }

  return (
    <section
      id="sample"
      ref={sectionRef}
      className="sample-section"
      style={{
        padding: '140px 0',
        background: 'var(--paper-warm)',
        borderTop: '1px solid var(--line-soft)',
      }}
    >
      <div className="mx-auto max-w-7xl px-8 max-[719px]:px-5">
        <div className="sample-grid">
          {/* ── Left: pitch panel ── */}
          <div className="scroll-fade d1">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-2"
              style={{ background: 'rgba(31, 80, 65, 0.08)' }}
            >
              <span className="eyebrow-dot" />
              <span
                className="text-forest text-[12px] font-medium uppercase tracking-[0.08em]"
                style={{ fontFamily: MONO }}
              >
                Sample report
              </span>
            </div>

            {/* Headline */}
            <h2
              className="font-display font-normal text-ink"
              style={{
                fontSize: 'clamp(32px, 4vw, 52px)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                marginTop: '20px',
              }}
            >
              This is what a{' '}
              <em className="text-forest" style={{ fontStyle: 'italic', fontWeight: 300 }}>
                real
              </em>{' '}
              Lumen read looks like.
            </h2>

            {/* Supporting paragraph */}
            <p
              className="text-ink-soft"
              style={{
                fontSize: '18px',
                lineHeight: 1.55,
                marginTop: '24px',
                marginBottom: '40px',
              }}
            >
              Tap any flagged row to see the plain-language explanation and the
              questions Lumen drafted for this patient&apos;s next visit.
            </p>

            {/* Legend */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                borderTop: '1px solid var(--line-soft)',
                paddingTop: '28px',
              }}
            >
              {LEGEND.map(({ status, label, strong, desc }) => (
                <div
                  key={status}
                  style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}
                >
                  <span
                    style={{
                      marginTop: '3px',
                      flexShrink: 0,
                      display: 'inline-block',
                      padding: '3px 10px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 500,
                      fontFamily: MONO,
                      letterSpacing: '0.06em',
                      background: STATUS_PILL[status].bg,
                      color: STATUS_PILL[status].color,
                    }}
                  >
                    {label}
                  </span>
                  <div>
                    <strong
                      className="font-display text-ink"
                      style={{
                        fontSize: '15px',
                        fontWeight: 500,
                        display: 'block',
                        marginBottom: '2px',
                      }}
                    >
                      {strong}
                    </strong>
                    <span className="text-ink-soft" style={{ fontSize: '14px', lineHeight: 1.5 }}>
                      {desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Fine print */}
            <p
              className="text-ink-dim"
              style={{
                ...MONO_LABEL,
                lineHeight: 1.6,
                marginTop: '40px',
              }}
            >
              This sample uses synthetic data from a composite anonymous patient.
              <br />
              Lumen does not provide medical advice or diagnose conditions.
            </p>
          </div>

          {/* ── Right: report card ── */}
          <div className="scroll-fade d2">
            <div
              style={{
                background: 'var(--paper-elevated)',
                border: '1px solid var(--line-soft)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 40px 80px -50px rgba(26,38,32,.3)',
              }}
            >
              {/* Region A — Header */}
              <div
                style={{
                  padding: '20px 24px',
                  background: 'var(--paper-warm)',
                  borderBottom: '1px solid var(--line-soft)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div>
                  <div
                    className="font-display text-ink"
                    style={{ fontWeight: 500, fontSize: '20px' }}
                  >
                    Annual panel — March 14, 2026
                  </div>
                  <div
                    className="text-ink-dim"
                    style={{ ...MONO_LABEL, marginTop: '4px' }}
                  >
                    PATIENT ID · 7A21K · QUEST DIAGNOSTICS
                  </div>
                </div>
                <span
                  style={{
                    flexShrink: 0,
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 500,
                    fontFamily: MONO,
                    letterSpacing: '0.06em',
                    background: 'rgba(61, 72, 66, 0.1)',
                    color: 'var(--ink-soft)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  2 flagged · 1 watch
                </span>
              </div>

              {/* Region B — Summary grid */}
              <div
                className="summary-stats"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  padding: '20px 24px',
                  borderBottom: '1px solid var(--line-soft)',
                }}
              >
                {SUMMARY.map(({ label, value, unit, isFlag }, i) => (
                  <div
                    key={label}
                    className={STAT_CELL_CLASS[i]}
                    style={{
                      borderLeft: i > 0 ? '1px solid var(--line-soft)' : 'none',
                      paddingLeft: i > 0 ? '16px' : '0',
                    }}
                  >
                    <div className="text-ink-dim" style={{ ...MONO_LABEL, marginBottom: '8px' }}>
                      {label}
                    </div>
                    <div
                      className="font-display"
                      style={{
                        fontSize: '28px',
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        color: isFlag ? 'var(--coral)' : 'var(--ink)',
                      }}
                    >
                      {value}
                      {unit && (
                        <small
                          style={{
                            fontSize: '12px',
                            color: 'var(--ink-dim)',
                            marginLeft: '4px',
                            fontFamily: 'var(--font-geist-sans)',
                            fontWeight: 400,
                          }}
                        >
                          {unit}
                        </small>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Region C — Result rows */}
              <div>
                {ROWS.map((row, i) => {
                  const isExpanded = expandedId === row.id;
                  const isLast = i === ROWS.length - 1;
                  return (
                    <div key={row.id}>
                      <div
                        className={`result-row${isExpanded ? ' expanded' : ''}`}
                        style={isLast ? { borderBottom: 'none' } : {}}
                        onClick={() => handleRowClick(row.id)}
                        role="button"
                        tabIndex={0}
                        aria-expanded={isExpanded}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleRowClick(row.id);
                          }
                        }}
                      >
                        {/* Column 1 — Name */}
                        <div className="row-name">
                          <div
                            className="font-display text-ink"
                            style={{ fontSize: '17px', fontWeight: 500 }}
                          >
                            {row.name}
                          </div>
                          <small
                            className="text-ink-dim"
                            style={{
                              display: 'block',
                              fontFamily: MONO,
                              fontSize: '10px',
                              letterSpacing: '0.14em',
                              marginTop: '3px',
                            }}
                          >
                            {row.abbrev}
                          </small>
                        </div>

                        {/* Column 2 — Range viz */}
                        <div className="row-range">
                          <RangeViz
                            bandLeft={row.bandLeft}
                            bandRight={row.bandRight}
                            dotStatus={row.dotStatus}
                            dotLeft={row.dotLeft}
                          />
                        </div>

                        {/* Column 3 — Value */}
                        <div className="row-val" style={{ textAlign: 'right' }}>
                          <strong
                            style={{
                              display: 'block',
                              fontFamily: MONO,
                              fontWeight: 500,
                              fontSize: '14px',
                              color: 'var(--ink)',
                              marginBottom: '2px',
                            }}
                          >
                            {row.value}
                          </strong>
                          <span
                            style={{
                              fontFamily: MONO,
                              fontSize: '13px',
                              color: 'var(--ink-soft)',
                            }}
                          >
                            {row.reference}
                          </span>
                        </div>

                        {/* Column 4 — Chevron */}
                        <div className={`result-chev row-chev${isExpanded ? ' open' : ''}`}>
                          ›
                        </div>
                      </div>

                      <Expansion row={row} isOpen={isExpanded} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
