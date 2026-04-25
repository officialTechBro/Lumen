function PlaceholderCard({ label }: { label: string }) {
  return (
    <div
      style={{
        background: "var(--paper-elevated)",
        border: "1px solid var(--line-soft)",
        borderRadius: 12,
        padding: "32px",
        minHeight: 180,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--ink-faint)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="home-grid">
      <PlaceholderCard label="Hero Report" />
      <PlaceholderCard label="Flagged Markers" />
      <PlaceholderCard label="Trends Grid" />
      <PlaceholderCard label="Reports List" />
    </div>
  );
}
