'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export function CTABand() {
  const bandRef = useRef<HTMLElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          band.querySelectorAll<HTMLElement>('.scroll-fade').forEach((el) => {
            el.classList.add('in-view');
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(band);
    return () => observer.disconnect();
  }, []);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <section
      id="upload"
      aria-label="Upload your report"
      ref={bandRef}
      className="cta-band"
      style={{
        background: 'var(--paper-warm)',
        borderTop: '1px solid var(--line-soft)',
        padding: '140px 0',
        textAlign: 'center',
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,image/*"
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-8 max-[719px]:px-5">
        {/* H2 headline */}
        <h2
          className="scroll-fade font-display"
          style={{
            fontSize: 'clamp(40px, 6vw, 84px)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.035em',
            color: 'var(--ink)',
            maxWidth: '900px',
            margin: '0 auto 32px',
          }}
        >
          Your next appointment,{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--forest)' }}>
            ten minutes better.
          </em>
        </h2>

        {/* Sub paragraph */}
        <p
          className="scroll-fade"
          style={{
            fontFamily: 'var(--font-geist-sans)',
            fontSize: '19px',
            fontWeight: 400,
            lineHeight: 1.55,
            color: 'var(--ink-soft)',
            maxWidth: '540px',
            margin: '0 auto 40px',
            transitionDelay: '0.1s',
          }}
        >
          Upload one report. See what Lumen does. Keep going if it helps.
        </p>

        {/* Buttons */}
        <div
          className="scroll-fade"
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            transitionDelay: '0.2s',
          }}
        >
          <button
            onClick={openFilePicker}
            className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-[26px] py-4 text-[15px] font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest hover:shadow-[0_8px_24px_-8px_rgba(31,80,65,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Upload a report
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]"
            >
              →
            </span>
          </button>
          <Link
            href="#sample"
            className="inline-flex items-center rounded-full border border-line px-[26px] py-4 text-[15px] font-medium text-ink transition-all duration-200 hover:border-ink hover:bg-paper-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            See the sample read
          </Link>
        </div>

        {/* Dropzone widget */}
        <div
          className="scroll-fade cta-drop"
          onClick={openFilePicker}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') openFilePicker();
          }}
          aria-label="Drop a file or click to upload"
          style={{
            margin: '48px auto 0',
            maxWidth: '560px',
            textAlign: 'left',
            padding: '20px 22px',
            border: '1.5px dashed var(--line)',
            borderRadius: '12px',
            background: 'var(--paper-warm)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            transitionDelay: '0.35s',
          }}
        >
          {/* Icon well */}
          <div
            className="cta-drop-ico"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'var(--paper)',
              border: '1px solid var(--line-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <line
                x1="10" y1="13" x2="10" y2="4"
                stroke="var(--forest)" strokeWidth="1.5" strokeLinecap="round"
              />
              <polyline
                points="6,8 10,4 14,8"
                stroke="var(--forest)" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" fill="none"
              />
              <path
                d="M4 14 V16 H16 V14"
                stroke="var(--forest)" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" fill="none"
              />
            </svg>
          </div>

          {/* Copy block */}
          <div style={{ flex: 1 }}>
            <p
              className="cta-drop-title"
              style={{
                fontFamily: 'var(--font-newsreader)',
                fontSize: '17px',
                fontWeight: 500,
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
                color: 'var(--ink)',
                margin: 0,
              }}
            >
              Drop a PDF, photo, or screenshot.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--ink-dim)',
                marginTop: '3px',
                marginBottom: 0,
              }}
            >
              Up to 20MB · encrypted in transit · you control deletion
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
