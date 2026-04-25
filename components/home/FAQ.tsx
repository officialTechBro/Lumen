'use client';

import { useEffect, useRef, useState } from 'react';

const FAQS = [
  {
    q: 'What types of lab reports does Lumen support?',
    a: 'Most standard lab PDFs from major providers — Quest Diagnostics, LabCorp, Kaiser Permanente, and most hospital systems. If your report lists markers, values, and reference ranges, Lumen can read it.',
  },
  {
    q: 'Does Lumen replace my doctor?',
    a: 'No. Lumen explains what your numbers mean in plain English. It does not diagnose, prescribe, or recommend treatments. Think of it as a second read before your appointment, not a replacement for one.',
  },
  {
    q: 'How is my data protected?',
    a: 'Your reports are encrypted at rest and in transit using AES-256. We never sell your data to anyone, ever. You can delete your reports, your history, or your entire account at any time — no waiting period.',
  },
  {
    q: 'How accurate is the AI extraction?',
    a: 'For standard lab formats, marker extraction exceeds 97% accuracy. Each result includes a confidence indicator. If Lumen is uncertain about a value, it tells you — it will never guess silently.',
  },
  {
    q: 'What happens if a result looks urgent?',
    a: 'Certain critical thresholds — extreme potassium, elevated troponin, very high HbA1c — trigger hard-coded alerts that bypass the AI entirely. You see a clear message to contact your doctor or go to the ER. No model inference, no softening.',
  },
  {
    q: 'Can I track results over time?',
    a: "Yes, on Lumen Annual. Every upload is stored and each marker's history is available as a sparkline or full chart. You can see whether your LDL has been trending down, or whether your vitamin D is seasonal.",
  },
  {
    q: 'What is the Free plan, exactly?',
    a: 'Two full lab report reads. No card required, no trial timer. Every marker explained, every flag prioritized, doctor questions generated. Reports are stored for 30 days, then deleted unless you subscribe.',
  },
  {
    q: 'How long does a translation take?',
    a: 'Under ten seconds for most reports. Upload a PDF and your plain-English breakdown is ready before you finish reading this sentence. Extraction, analysis, and question generation happen in a single pass.',
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);

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

  const toggle = (i: number) => {
    setOpen((prev) => (prev === i ? null : i));
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="faq-section"
      style={{
        padding: '140px 0',
        background: 'var(--paper)',
        borderTop: '1px solid var(--line-soft)',
      }}
    >
      <div className="mx-auto max-w-7xl px-8 max-[719px]:px-5">
        {/* Section header — center-aligned */}
        <div className="scroll-fade" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-2"
            style={{ background: 'rgba(31, 80, 65, 0.08)' }}
          >
            <span className="eyebrow-dot" />
            <span
              className="text-[12px] font-medium uppercase tracking-[0.08em]"
              style={{ color: 'var(--forest)', fontFamily: 'var(--font-geist-mono)' }}
            >
              Questions
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
            Short answers.{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--forest)' }}>
              No legalese.
            </em>
          </h2>
        </div>

        {/* FAQ list */}
        <div
          className="scroll-fade"
          style={{ maxWidth: '900px', margin: '0 auto' }}
        >
          {FAQS.map((item, i) => (
            <div
              key={i}
              className="faq-item"
              style={{
                borderTop: i === 0 ? '1px solid var(--line-soft)' : undefined,
                borderBottom: '1px solid var(--line-soft)',
              }}
            >
              {/* Question row */}
              <button
                onClick={() => toggle(i)}
                className="faq-question"
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '24px',
                  padding: '24px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span
                  className="faq-q-text"
                  style={{
                    fontFamily: 'var(--font-newsreader)',
                    fontSize: '22px',
                    fontWeight: 500,
                    lineHeight: 1.3,
                    color: 'var(--ink)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.q}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '24px',
                    fontWeight: 400,
                    lineHeight: 1,
                    color: open === i ? 'var(--forest)' : 'var(--ink-dim)',
                    flexShrink: 0,
                    transition: 'transform 0.2s ease, color 0.2s ease',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    display: 'inline-block',
                    userSelect: 'none',
                  }}
                >
                  +
                </span>
              </button>

              {/* Answer */}
              <div
                style={{
                  maxHeight: open === i ? '400px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                  paddingBottom: open === i ? '24px' : '0',
                }}
              >
                <p
                  className="faq-a-text"
                  style={{
                    fontFamily: 'var(--font-geist-sans)',
                    fontSize: '16px',
                    lineHeight: 1.65,
                    color: 'var(--ink-soft)',
                    maxWidth: '720px',
                  }}
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
