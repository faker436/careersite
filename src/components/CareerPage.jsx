import { useState } from "react";
import { JOBS, PERKS, VALUES, DEPARTMENTS, DEPT_COLORS, TEAM_MEMBERS } from "../data/constants";
import { Btn } from "./UI";

export default function CareerPage({ onApply }) {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? JOBS : JOBS.filter(j => j.dept === filter);

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#111", background: "#fff" }}>

      {/* Hero */}
      <section style={{ padding: "80px 24px 64px", textAlign: "center", borderBottom: "1px solid #f0f0f0" }}>
        <span style={{
          display: "inline-block", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "#2563EB", background: "#EFF6FF",
          padding: "4px 14px", borderRadius: 99, marginBottom: 24,
        }}>We're hiring</span>
        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 800,
          lineHeight: 1.12, letterSpacing: "-0.035em",
          maxWidth: 600, margin: "0 auto 20px",
        }}>
          Build things that{" "}
          <span style={{ color: "#2563EB", borderBottom: "3px solid #2563EB", paddingBottom: 2 }}>
            actually matter
          </span>
        </h1>
        <p style={{ fontSize: 17, color: "#666", maxWidth: 460, margin: "0 auto 36px", lineHeight: 1.7 }}>
          We're a small team solving large problems. If you want ownership, depth,
          and colleagues who push you — you're in the right place.
        </p>
        <Btn onClick={() => document.getElementById("open-roles").scrollIntoView({ behavior: "smooth" })}>
          See open roles →
        </Btn>
      </section>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderBottom: "1px solid #f0f0f0" }}>
        {[
          { num: "48", label: "Team members" },
          { num: "12", label: "Open roles" },
          { num: "19", label: "Countries" },
        ].map((s, i) => (
          <div key={s.label} style={{
            padding: "32px 24px", textAlign: "center",
            borderRight: i < 2 ? "1px solid #f0f0f0" : "none",
          }}>
            <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em" }}>{s.num}</div>
            <div style={{ fontSize: 13, color: "#999", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Perks */}
      <section style={{ padding: "56px 24px", borderBottom: "1px solid #f0f0f0", maxWidth: 960, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", marginBottom: 28 }}>
          What we offer
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {PERKS.map(p => (
            <div key={p.title} style={{ background: "#F9FAFB", borderRadius: 12, padding: "20px 20px 22px" }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{p.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 5 }}>{p.title}</div>
              <div style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Open Roles */}
      <section id="open-roles" style={{ padding: "56px 24px", borderBottom: "1px solid #f0f0f0", maxWidth: 960, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", marginBottom: 24 }}>
          Open roles
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {DEPARTMENTS.map(dept => (
            <button key={dept} onClick={() => setFilter(dept)} style={{
              padding: "6px 16px", borderRadius: 99, fontSize: 13, cursor: "pointer",
              border: "1px solid", transition: "all 0.15s",
              borderColor: filter === dept ? "#111" : "#e0e0e0",
              background: filter === dept ? "#111" : "transparent",
              color: filter === dept ? "#fff" : "#666",
              fontWeight: filter === dept ? 700 : 400,
            }}>{dept}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.length === 0 ? (
            <p style={{ textAlign: "center", color: "#bbb", padding: "40px 0" }}>
              No open roles in this department right now.
            </p>
          ) : filtered.map(job => {
            const color = DEPT_COLORS[job.dept];
            return (
              <div
                key={job.id}
                onClick={() => onApply(job.title)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: 16, padding: "18px 20px", border: "1px solid #f0f0f0",
                  borderRadius: 12, cursor: "pointer", transition: "all 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#ddd"; e.currentTarget.style.background = "#fafafa"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#f0f0f0"; e.currentTarget.style.background = "#fff"; }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 5 }}>{job.title}</div>
                  <div style={{ display: "flex", gap: 14 }}>
                    <span style={{ fontSize: 12, color: "#999" }}>📍 {job.location}</span>
                    <span style={{ fontSize: 12, color: "#999" }}>🕐 {job.type}</span>
                  </div>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: "4px 12px",
                  borderRadius: 99, whiteSpace: "nowrap",
                  background: color.bg, color: color.text,
                }}>{job.dept}</span>
                <span style={{ fontSize: 18, color: "#ccc" }}>→</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "56px 24px", borderBottom: "1px solid #f0f0f0", maxWidth: 960, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", marginBottom: 28 }}>
          What we believe
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
          {VALUES.map(v => (
            <div key={v.label}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#ddd", marginBottom: 8 }}>{v.roman}</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{v.label}</div>
              <div style={{ fontSize: 13, color: "#777", lineHeight: 1.65 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "56px 24px", borderBottom: "1px solid #f0f0f0", maxWidth: 960, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", marginBottom: 28 }}>
          The team
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 16 }}>
          {TEAM_MEMBERS.map(p => (
            <div key={p.name} style={{ textAlign: "center" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: p.color, color: p.text,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, fontWeight: 700, margin: "0 auto 8px",
              }}>{p.initials}</div>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: "#999" }}>{p.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ padding: "72px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>
          Don't see a perfect fit?
        </h2>
        <p style={{ fontSize: 15, color: "#777", marginBottom: 28 }}>
          We're always looking for exceptional people. Tell us what you'd build here.
        </p>
        <Btn onClick={() => onApply("")} variant="outline">
          ✉️ Send a general application
        </Btn>
      </section>
    </div>
  );
}
