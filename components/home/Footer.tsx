'use client';

import { useEffect, useRef } from 'react';

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="scroll-fade"
      style={{
        background: '#1A2620',
        padding: '64px 32px 48px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '40px',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="10" stroke="#A8E6CF" strokeWidth="1.5" />
            <path d="M6 11 Q 11 5, 16 11 T 6 11" fill="#A8E6CF" />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-newsreader), Georgia, serif',
              fontWeight: 500,
              fontSize: '22px',
              letterSpacing: '-0.02em',
              color: '#F6F3EC',
            }}
          >
            Lumen
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'rgba(246, 243, 236, 0.1)',
            marginBottom: '32px',
          }}
        />

        {/* Legal row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '24px',
            fontFamily: 'var(--font-geist-mono), monospace',
            fontWeight: 500,
            fontSize: '10px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(246, 243, 236, 0.5)',
          }}
        >
          <span>© 2026 Lumen Health, Inc.</span>
          <span>Not a substitute for medical advice, diagnosis, or treatment.</span>
          <span>Made in Brooklyn &amp; Oakland</span>
        </div>
      </div>
    </footer>
  );
}
