'use client';

import { useEffect, useRef } from 'react';

const TIERS = [
  {
    name: 'Free',
    price: '₦0',
    unit: 'forever',
    description:
      'Start here. Two full report reads, no card required. See what Lumen does before committing.',
    features: [
      '2 lab reports, fully read',
      'Plain-language explanation for every marker',
      'Doctor-question checklist',
      'Reports stored for 30 days',
      'No account required',
    ],
    cta: 'Get started free',
    ctaHref: '#upload',
    featured: false,
    delay: '0.1s',
  },
  {
    name: 'Lumen annual',
    price: '₦9,999',
    unit: '/ year',
    description:
      'For anyone who retests regularly or wants to track markers over time. Unlimited reports, full history.',
    features: [
      'Unlimited lab reports',
      'Multi-report trends & timelines',
      'Flagged-marker reminders (opt-in)',
      'Priority support, 24-hour response',
      'Keep or delete history — your call',
    ],
    cta: 'Start your year',
    ctaHref: '#upload',
    featured: true,
    delay: '0.2s',
  },
];

export function Pricing() {
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
      id="pricing"
      ref={sectionRef}
      className="pricing-section"
      style={{
        padding: '140px 0',
        background: 'var(--paper-warm)',
        borderTop: '1px solid var(--line-soft)',
      }}
    >
      <div className="mx-auto max-w-7xl px-8 max-[719px]:px-5">
        {/* Section header */}
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
              Pricing
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
            Honest pricing,{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--forest)' }}>
              no upsells.
            </em>
          </h2>

          <p
            style={{
              fontSize: '19px',
              lineHeight: 1.55,
              color: 'var(--ink-soft)',
              marginTop: '20px',
            }}
          >
            Start free with two full report reads. Subscribe when you&rsquo;re ready to track
            things closely.
          </p>
        </div>

        {/* Pricing grid */}
        <div className="pricing-grid">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`scroll-fade price-card${tier.featured ? ' featured' : ''}`}
              style={{ transitionDelay: tier.delay }}
            >
              {/* Ribbon — featured only */}
              {tier.featured && (
                <div
                  className="ribbon"
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '28px',
                    background: '#A8E6CF',
                    color: '#1A2620',
                    fontFamily: 'var(--font-geist-mono)',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    padding: '6px 12px',
                    borderRadius: '999px',
                  }}
                >
                  Most chosen
                </div>
              )}

              {/* Tier name */}
              <div
                style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: tier.featured ? '#A8E6CF' : 'var(--forest)',
                  marginBottom: '20px',
                }}
              >
                {tier.name}
              </div>

              {/* Price */}
              <div
                className="price-num"
                style={{
                  fontFamily: 'var(--font-newsreader)',
                  fontSize: '64px',
                  fontWeight: 400,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: tier.featured ? '#F6F3EC' : 'var(--ink)',
                  marginBottom: '4px',
                }}
              >
                {tier.price}
                <small
                  style={{
                    fontFamily: 'var(--font-geist-sans)',
                    fontSize: '14px',
                    fontWeight: 400,
                    letterSpacing: 0,
                    marginLeft: '6px',
                    color: tier.featured ? 'rgba(246, 243, 236, 0.6)' : 'var(--ink-dim)',
                  }}
                >
                  {tier.unit}
                </small>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.5,
                  color: tier.featured ? 'rgba(246, 243, 236, 0.7)' : 'var(--ink-soft)',
                  marginTop: '12px',
                  marginBottom: '28px',
                }}
              >
                {tier.description}
              </p>

              {/* Feature list */}
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 36px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {tier.features.map((feat) => (
                  <li
                    key={feat}
                    className={tier.featured ? 'feat-item featured-item' : 'feat-item'}
                    style={{
                      fontSize: '14.5px',
                      lineHeight: 1.5,
                      color: tier.featured ? 'rgba(246, 243, 236, 0.85)' : 'var(--ink-soft)',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                    }}
                  >
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {tier.featured ? (
                <a
                  href={tier.ctaHref}
                  className="price-cta-primary"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    marginTop: 'auto',
                    padding: '16px 26px',
                    borderRadius: '999px',
                    fontFamily: 'var(--font-geist-sans)',
                    fontSize: '15px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    background: '#F6F3EC',
                    color: '#1A2620',
                    border: '1px solid transparent',
                    transition: 'background 0.2s ease, transform 0.2s ease',
                  }}
                >
                  {tier.cta}
                </a>
              ) : (
                <a
                  href={tier.ctaHref}
                  className="price-cta-secondary"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    marginTop: 'auto',
                    padding: '16px 26px',
                    borderRadius: '999px',
                    fontFamily: 'var(--font-geist-sans)',
                    fontSize: '15px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    background: 'transparent',
                    color: 'var(--ink)',
                    border: '1px solid var(--line)',
                    transition:
                      'background 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
                  }}
                >
                  {tier.cta}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Fine print */}
        <p
          className="scroll-fade"
          style={{
            marginTop: '56px',
            textAlign: 'center',
            fontFamily: 'var(--font-geist-mono)',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--ink-dim)',
          }}
        >
          Cancel any time &middot; No hidden fees &middot; No ads, ever
        </p>
      </div>
    </section>
  );
}
