import Link from "next/link";

const RAW_ROWS = [
  { name: "HGB", value: "13.4 g/dL", flag: null },
  { name: "LDL-C", value: "142 mg/dL", flag: "H" },
  { name: "HDL-C", value: "58 mg/dL", flag: null },
  { name: "TSH", value: "2.1 mIU/L", flag: null },
  { name: "Vit D, 25-OH", value: "22 ng/mL", flag: "L" },
  { name: "HbA1c", value: "5.4 %", flag: null },
  { name: "ALT", value: "28 U/L", flag: null },
  { name: "Creat", value: "0.9 mg/dL", flag: null },
] as const;

const META = [
  { value: "~10 sec", label: "average parse time" },
  { value: "PDF, image, or photo", label: "we handle the format" },
  { value: "Reviewed by clinicians", label: "MD & PharmD" },
] as const;

export function Hero() {
  return (
    <section style={{ padding: "120px 0 140px" }}>
      <div className="mx-auto max-w-7xl px-8 max-[719px]:px-5 hero-grid">

        {/* ── Left column ── */}
        <div>
          {/* Eyebrow */}
          <div
            className="fade d1 inline-flex items-center gap-2 rounded-full px-3.5 py-2"
            style={{ background: "rgba(31, 80, 65, 0.08)" }}
          >
            <span className="eyebrow-dot" />
            <span
              className="text-forest text-[12px] font-medium uppercase tracking-[0.08em]"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Now reading 94 common panels
            </span>
          </div>

          {/* H1 */}
          <h1
            className="fade d2 font-display font-normal text-ink"
            style={{
              fontSize: "clamp(38px, 5.5vw, 68px)",
              lineHeight: 1,
              letterSpacing: "-0.035em",
              marginTop: "28px",
            }}
          >
            Your lab results,
            <br />
            <em
              className="text-forest"
              style={{ fontStyle: "italic", fontWeight: 300, fontSize: "0.90em" }}
            >
              in plain English.
            </em>
          </h1>

          {/* Sub-headline */}
          <p
            className="fade d3 text-ink-soft"
            style={{
              fontSize: "clamp(18px, 1.6vw, 20px)",
              lineHeight: 1.55,
              maxWidth: "520px",
              marginTop: "32px",
            }}
          >
            Upload any lab report - blood panel, metabolic, thyroid, hormones.
            Lumen explains every number, flags what matters, and hands you the
            exact questions to ask your doctor. No hedging. No diagnoses. No fluff.
          </p>

          {/* CTA row */}
          <div
            className="fade d4"
            style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "40px" }}
          >
            <Link
              href="#upload"
              className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-[26px] py-4 text-[15px] font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest hover:shadow-[0_8px_24px_-8px_rgba(31,80,65,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              Upload a report
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]"
              >
                →
              </span>
            </Link>
            <Link
              href="#sample"
              className="inline-flex items-center rounded-full border border-line px-[26px] py-4 text-[15px] font-medium text-ink transition-all duration-200 hover:border-ink hover:bg-paper-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              See a sample
            </Link>
          </div>

          {/* Meta strip */}
          <div className="fade d5 hero-meta" style={{ marginTop: "48px" }}>
            {META.map(({ value, label }) => (
              <div key={label}>
                <div
                  className="font-display text-ink"
                  style={{ fontSize: "20px", fontWeight: 500 }}
                >
                  {value}
                </div>
                <div
                  className="text-ink-dim"
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right column ── */}
        <div
          className="fade d3"
          style={{ position: "relative", minHeight: "560px", paddingTop: "20px" }}
        >
          {/* Card A — raw report slip */}
          <div
            className="hero-card-a"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "68%",
              transform: "rotate(-4deg)",
              transformOrigin: "top left",
              background: "var(--hero-raw-bg)",
              boxShadow:
                "0 30px 50px -30px rgba(26,38,32,.25), 0 1px 0 rgba(26,38,32,.04)",
              borderRadius: "6px",
              padding: "28px 30px",
              zIndex: 1,
              fontFamily: "var(--font-geist-mono)",
              overflow: "hidden",
            }}
          >
            {/* Header strip */}
            <div
              className="text-ink-dim"
              style={{
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                borderBottom: "1px dashed var(--line)",
                paddingBottom: "10px",
                marginBottom: "18px",
              }}
            >
              Raw report · Page 2 of 6
            </div>

            {/* Data rows */}
            {RAW_ROWS.map(({ name, value, flag }) => (
              <div
                key={name}
                className="text-ink"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  fontSize: "12px",
                }}
              >
                <span>{name}</span>
                <span>
                  {value}
                  {flag && (
                    <span
                      className="text-coral"
                      style={{ fontWeight: 500, marginLeft: "6px" }}
                    >
                      {flag}
                    </span>
                  )}
                </span>
              </div>
            ))}

            {/* Fade-out bottom */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "30%",
                background:
                  "linear-gradient(to bottom, transparent, var(--hero-raw-bg))",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Card B — Plain English */}
          <div
            className="hero-card-b"
            style={{
              position: "absolute",
              top: "145px",
              right: 0,
              width: "82%",
              transform: "rotate(2deg)",
              transformOrigin: "top right",
              background: "var(--paper-elevated)",
              border: "1px solid var(--line-soft)",
              borderRadius: "14px",
              padding: "30px 32px",
              boxShadow:
                "0 40px 70px -30px rgba(26,38,32,.25), 0 2px 0 rgba(26,38,32,.03)",
              zIndex: 2,
            }}
          >
            {/* Card header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "18px",
                borderBottom: "1px solid var(--line-soft)",
                marginBottom: "22px",
              }}
            >
              <span
                className="text-ink-dim"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Lumen · Plain English
              </span>
              <span
                className="text-leaf"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: "10px",
                  background: "var(--leaf-soft)",
                  padding: "5px 10px",
                  borderRadius: "999px",
                }}
              >
                2 flags · 6 normal
              </span>
            </div>

            {/* Item 1 — LDL (flagged, leaf highlight) */}
            <div
              style={{
                paddingBottom: "18px",
                borderBottom: "1px solid var(--line-soft)",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "var(--coral)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="font-display text-ink"
                    style={{ fontSize: "19px", fontWeight: 500 }}
                  >
                    LDL Cholesterol
                  </span>
                </div>
                <span
                  className="text-ink-dim"
                  style={{ fontFamily: "var(--font-geist-mono)", fontSize: "12px" }}
                >
                  <strong
                    className="text-ink"
                    style={{ fontWeight: 500, fontSize: "14px" }}
                  >
                    142
                  </strong>{" "}
                  · target &lt;100
                </span>
              </div>
              <p
                className="text-ink-soft"
                style={{ fontSize: "14px", lineHeight: 1.55, margin: 0 }}
              >
                Your &lsquo;bad&rsquo; cholesterol is{" "}
                <mark
                  className="text-ink"
                  style={{
                    background: "var(--leaf-soft)",
                    padding: "1px 6px",
                    borderRadius: "3px",
                  }}
                >
                  a bit higher than ideal
                </mark>
                . Common and very manageable - usually addressed through diet,
                exercise, or medication depending on your risk.
              </p>
            </div>

            {/* Item 2 — Vitamin D (flagged, coral highlight) */}
            <div
              style={{
                paddingBottom: "18px",
                borderBottom: "1px solid var(--line-soft)",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "var(--coral)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="font-display text-ink"
                    style={{ fontSize: "19px", fontWeight: 500 }}
                  >
                    Vitamin D
                  </span>
                </div>
                <span
                  className="text-ink-dim"
                  style={{ fontFamily: "var(--font-geist-mono)", fontSize: "12px" }}
                >
                  <strong
                    className="text-ink"
                    style={{ fontWeight: 500, fontSize: "14px" }}
                  >
                    22
                  </strong>{" "}
                  · target 30–100
                </span>
              </div>
              <p
                className="text-ink-soft"
                style={{ fontSize: "14px", lineHeight: 1.55, margin: 0 }}
              >
                You&rsquo;re{" "}
                <mark
                  style={{
                    background: "var(--coral-soft)",
                    color: "#8C3A26",
                    padding: "1px 6px",
                    borderRadius: "3px",
                  }}
                >
                  mildly deficient
                </mark>
                . Very common, especially in winter. Most doctors recommend a
                supplement - ask yours about the right dose.
              </p>
            </div>

            {/* Item 3 — HbA1c (normal, no bullet, no highlight) */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    className="font-display text-ink"
                    style={{ fontSize: "19px", fontWeight: 500 }}
                  >
                    HbA1c
                  </span>
                </div>
                <span
                  className="text-ink-dim"
                  style={{ fontFamily: "var(--font-geist-mono)", fontSize: "12px" }}
                >
                  <strong
                    className="text-ink"
                    style={{ fontWeight: 500, fontSize: "14px" }}
                  >
                    5.4%
                  </strong>{" "}
                  · normal
                </span>
              </div>
              <p
                className="text-ink-soft"
                style={{ fontSize: "14px", lineHeight: 1.55, margin: 0 }}
              >
                Your average blood sugar over the past 3 months is well within
                the healthy range. No signs of prediabetes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
