export default function Nav({ onLogoClick }) {
  return (
    <div style={{
      padding: "16px 32px", borderBottom: "1px solid #f0f0f0",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, background: "#fff", zIndex: 10,
    }}>
      <button
        onClick={onLogoClick}
        style={{
          fontSize: 17, fontWeight: 800, color: "#111",
          background: "none", border: "none", cursor: "pointer",
          letterSpacing: "-0.03em", padding: 0,
        }}
      >
        Arclight
      </button>
      <span style={{ fontSize: 13, color: "#aaa" }}>Careers</span>
    </div>
  );
}
