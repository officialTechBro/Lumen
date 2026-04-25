export default function DashboardSidebar() {
  return (
    <aside className="sidebar">
      {/* Lumen lockup */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <svg viewBox="0 0 22 22" fill="none" width={22} height={22} aria-hidden>
          <circle cx="11" cy="11" r="10" stroke="var(--forest)" strokeWidth="1.5" />
          <path d="M6 11 Q 11 5, 16 11 T 6 11" fill="var(--forest)" />
        </svg>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 17,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
          }}
        >
          Lumen
        </span>
      </div>

      {/* Nav placeholder — sidebar spec TBD */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {["Home", "Reports", "Trends", "Settings"].map((label) => (
          <div
            key={label}
            style={{
              padding: "9px 12px",
              borderRadius: 8,
              fontSize: 14,
              color: "var(--ink-soft)",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
            }}
          >
            {label}
          </div>
        ))}
      </nav>
    </aside>
  );
}
