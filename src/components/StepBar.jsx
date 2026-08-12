import { APPLY_STEPS } from "../data/constants";

export default function StepBar({ current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
      {APPLY_STEPS.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div
            key={step}
            style={{ display: "flex", alignItems: "center", flex: i < APPLY_STEPS.length - 1 ? 1 : "none" }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, flexShrink: 0,
                background: done ? "#2563EB" : active ? "#111" : "#F0F0F0",
                color: done || active ? "#fff" : "#aaa",
              }}>
                {done ? "✓" : i + 1}
              </div>
              <div style={{
                fontSize: 11, fontWeight: 600, marginTop: 4, whiteSpace: "nowrap",
                color: active ? "#111" : done ? "#2563EB" : "#bbb",
              }}>
                {step}
              </div>
            </div>
            {i < APPLY_STEPS.length - 1 && (
              <div style={{
                flex: 1, height: 1.5, margin: "0 8px", marginBottom: 18,
                background: done ? "#2563EB" : "#E8E8E8",
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
