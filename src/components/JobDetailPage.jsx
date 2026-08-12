import { JOBS, DEPT_COLORS, JOB_DETAILS } from "../data/constants";
import { Btn } from "./UI";

const HIRING_PROCESS = [
  "Application review (within 5 days)",
  "Intro call — 30 min",
  "Technical / skills interview — 60 min",
  "Team interviews — 90 min",
  "Offer",
];

function getJobDetails(jobTitle, deptName) {
  if (JOB_DETAILS[jobTitle]) return JOB_DETAILS[jobTitle];
  return {
    summary: `We're hiring a ${jobTitle} to join our growing ${deptName} team. You'll have real ownership, work on hard problems, and ship things people rely on.`,
    responsibilities: [
      "Drive key initiatives from planning through to delivery",
      "Collaborate closely with cross-functional teammates",
      "Bring your expertise to shape team decisions and standards",
      "Continuously improve our processes and output quality",
    ],
    requirements: [
      "3+ years of relevant experience",
      "Strong communication and ownership mindset",
      "Demonstrated ability to deliver in fast-moving environments",
      "Excitement about our mission and the problems we solve",
    ],
    nice: ["Remote work experience", "Early-stage startup background"],
  };
}

export default function JobDetailPage({ jobTitle, onApply, onBack }) {
  const job = JOBS.find(j => j.title === jobTitle);
  const color = job ? DEPT_COLORS[job.dept] : {};
  const d = getJobDetails(jobTitle, job?.dept);

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#111", background: "#fff" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Breadcrumb */}
        <button onClick={onBack} style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: 13, color: "#888", marginBottom: 32, padding: 0,
          display: "flex", alignItems: "center", gap: 6,
        }}>← All open roles</button>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          {job && (
            <span style={{
              display: "inline-block", fontSize: 11, fontWeight: 700,
              padding: "4px 12px", borderRadius: 99, marginBottom: 14,
              background: color.bg, color: color.text,
            }}>{job.dept}</span>
          )}
          <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 14 }}>
            {jobTitle || "General Application"}
          </h1>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "#888" }}>📍 Remote</span>
            <span style={{ fontSize: 13, color: "#888" }}>🕐 Full-time</span>
            <span style={{ fontSize: 13, color: "#888" }}>💰 Competitive + equity</span>
          </div>
        </div>

        <Btn onClick={onApply} variant="blue" style={{ marginBottom: 48 }}>
          Apply for this role →
        </Btn>

        {/* Body */}
        <div style={{ lineHeight: 1.75, fontSize: 15, color: "#333" }}>
          <p style={{ marginBottom: 32 }}>{d.summary}</p>

          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>What you'll do</h2>
          <ul style={{ paddingLeft: 20, marginBottom: 32 }}>
            {d.responsibilities.map((r, i) => (
              <li key={i} style={{ marginBottom: 8, color: "#444" }}>{r}</li>
            ))}
          </ul>

          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>What we're looking for</h2>
          <ul style={{ paddingLeft: 20, marginBottom: 32 }}>
            {d.requirements.map((r, i) => (
              <li key={i} style={{ marginBottom: 8, color: "#444" }}>{r}</li>
            ))}
          </ul>

          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>Nice to have</h2>
          <ul style={{ paddingLeft: 20, marginBottom: 40 }}>
            {d.nice.map((r, i) => (
              <li key={i} style={{ marginBottom: 8, color: "#444" }}>{r}</li>
            ))}
          </ul>

          {/* Hiring Process */}
          <div style={{ background: "#F9FAFB", borderRadius: 12, padding: "24px 20px", marginBottom: 40 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Our hiring process</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {HIRING_PROCESS.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%", background: "#111",
                    color: "#fff", fontSize: 11, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>{i + 1}</div>
                  <span style={{ fontSize: 13, color: "#555" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <Btn onClick={onApply} variant="blue">Apply for this role →</Btn>
        </div>
      </div>
    </div>
  );
}
