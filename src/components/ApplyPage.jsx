import { useState, useEffect, useRef } from "react";
import { JOBS, APPLY_STEPS } from "../data/constants";
import { FocusInput, Field, FileUpload, Btn, ReviewRow } from "./UI";
import StepBar from "./StepBar";
import VideoIntro from "./VideoIntro";

function SuccessScreen({ firstName, role, onBack }) {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center", maxWidth: 460 }}>
        <div style={{ fontSize: 56, marginBottom: 24 }}>🎉</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>
          Application submitted!
        </h1>
        <p style={{ fontSize: 15, color: "#666", lineHeight: 1.7, marginBottom: 32 }}>
          Thanks, <strong>{firstName}</strong>! We've received your application for{" "}
          <strong>{role || "a general role"}</strong> and will be in touch within 5–7 business days.
        </p>
        <Btn onClick={onBack}>← Back to careers</Btn>
      </div>
    </div>
  );
}

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function ApplyPage({ preselectedRole, onBack }) {
  const [step, setStep]             = useState(0);
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors]         = useState({});

  // Stable session ID for this apply flow — persisted across re-renders
  const sessionId = useRef(
    sessionStorage.getItem("apply_session") || (() => {
      const id = crypto.randomUUID();
      sessionStorage.setItem("apply_session", id);
      return id;
    })()
  );

  // Fire-and-forget progress ping — never blocks the user
  const trackStep = (s, role) => {
    fetch(`${API}/api/progress`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: sessionId.current, step: s, role }),
    }).catch(() => {}); // silently ignore network errors
  };

  // Track the initial step on mount
  useEffect(() => {
    trackStep(0, preselectedRole || "");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    location: "", linkedin: "", portfolio: "",
    role: preselectedRole || "", resume: null, experience: "", whyUs: "",
    coverLetter: "", salary: "", startDate: "", referral: "", workAuth: "",
    videoBlob: null, videoUrl: null,
    consent: false,
  });

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!form.firstName.trim()) e.firstName = "Required";
      if (!form.lastName.trim())  e.lastName  = "Required";
      if (!form.email.trim())     e.email     = "Required";
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    }
    if (step === 1) {
      if (!form.role)       e.role       = "Please select a role";
      if (!form.resume)     e.resume     = "Please upload your resume";
      if (!form.experience) e.experience = "Required";
    }
    if (step === 3) {
      if (!form.consent) e.consent = "You must agree to continue";
    }
    return e;
  };

  const next = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const nextStep = step + 1;
    setStep(nextStep);
    trackStep(nextStep, form.role);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setStep(s => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setSubmitting(true);
    setSubmitError("");

    try {
      const body = new FormData();

      // Text fields
      const textFields = {
        firstName: form.firstName, lastName: form.lastName,
        email: form.email, phone: form.phone,
        location: form.location, linkedin: form.linkedin,
        portfolio: form.portfolio, role: form.role,
        experience: form.experience, whyUs: form.whyUs,
        coverLetter: form.coverLetter, salary: form.salary,
        startDate: form.startDate, referral: form.referral,
        workAuth: form.workAuth,
      };
      Object.entries(textFields).forEach(([k, v]) => body.append(k, v ?? ""));

      // File fields
      if (form.resume)    body.append("resume", form.resume);
      if (form.videoBlob) body.append("video",  form.videoBlob, "intro.webm");

      const res = await fetch(`${API}/api/applications`, { method: "POST", body });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Submission failed.");

      // Mark progress as complete
      fetch(`${API}/api/progress/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionId.current }),
      }).catch(() => {});

      sessionStorage.removeItem("apply_session");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <SuccessScreen firstName={form.firstName} role={form.role} onBack={onBack} />;
  }

  const twoCol = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 };

  const reviewSections = [
    {
      title: "Personal info",
      rows: [
        ["Name", `${form.firstName} ${form.lastName}`],
        ["Email", form.email], ["Phone", form.phone],
        ["Location", form.location], ["LinkedIn", form.linkedin],
        ["Portfolio", form.portfolio],
      ],
    },
    {
      title: "Experience",
      rows: [
        ["Role", form.role], ["Resume", form.resume?.name],
        ["Experience", form.experience], ["Why us", form.whyUs],
      ],
    },
    {
      title: "Details",
      rows: [
        ["Salary", form.salary], ["Start date", form.startDate],
        ["How found", form.referral], ["Work auth", form.workAuth],
        ["Video intro", form.videoUrl ? "Recorded ✓" : "Not recorded"],
        ["Cover letter", form.coverLetter
          ? form.coverLetter.slice(0, 120) + (form.coverLetter.length > 120 ? "…" : "")
          : ""],
      ],
    },
  ];

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", color: "#111", background: "#fff" }}>
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "48px 24px 80px" }}>

        <button onClick={onBack} style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: 13, color: "#888", marginBottom: 32, padding: 0,
          display: "flex", alignItems: "center", gap: 6,
        }}>← All open roles</button>

        <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 4 }}>
          Apply to join us
        </h1>
        <p style={{ fontSize: 14, color: "#aaa", marginBottom: 32 }}>
          Step {step + 1} of {APPLY_STEPS.length} — {APPLY_STEPS[step]}
        </p>

        <StepBar current={step} />

        {/* Step 0 — Your info */}
        {step === 0 && (
          <>
            <div style={twoCol}>
              <Field label="First name" required error={errors.firstName}>
                <FocusInput value={form.firstName} onChange={e => set("firstName", e.target.value)} placeholder="Jane" />
              </Field>
              <Field label="Last name" required error={errors.lastName}>
                <FocusInput value={form.lastName} onChange={e => set("lastName", e.target.value)} placeholder="Smith" />
              </Field>
            </div>
            <Field label="Email address" required error={errors.email}>
              <FocusInput type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="jane@example.com" />
            </Field>
            <Field label="Phone number">
              <FocusInput type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+1 (555) 000-0000" />
            </Field>
            <Field label="Current location">
              <FocusInput value={form.location} onChange={e => set("location", e.target.value)} placeholder="City, Country" />
            </Field>
            <Field label="LinkedIn profile">
              <FocusInput value={form.linkedin} onChange={e => set("linkedin", e.target.value)} placeholder="https://linkedin.com/in/yourname" />
            </Field>
            <Field label="Portfolio / website">
              <FocusInput value={form.portfolio} onChange={e => set("portfolio", e.target.value)} placeholder="https://yoursite.com" />
            </Field>
          </>
        )}

        {/* Step 1 — Experience */}
        {step === 1 && (
          <>
            <Field label="Role you're applying for" required error={errors.role}>
              <FocusInput as="select" value={form.role} onChange={e => set("role", e.target.value)}>
                <option value="">Select a role…</option>
                {JOBS.map(j => <option key={j.id} value={j.title}>{j.title} — {j.dept}</option>)}
                <option value="General Application">General Application</option>
              </FocusInput>
            </Field>
            <Field label="Resume / CV" required error={errors.resume}>
              <FileUpload value={form.resume} onChange={f => set("resume", f)} />
            </Field>
            <Field label="Years of relevant experience" required error={errors.experience}>
              <FocusInput as="select" value={form.experience} onChange={e => set("experience", e.target.value)}>
                <option value="">Select…</option>
                {["Less than 1 year", "1–2 years", "3–5 years", "6–10 years", "10+ years"].map(o => (
                  <option key={o}>{o}</option>
                ))}
              </FocusInput>
            </Field>
            <Field label="Why do you want to work here?">
              <FocusInput as="textarea" value={form.whyUs} onChange={e => set("whyUs", e.target.value)}
                style={{ resize: "vertical", minHeight: 120, lineHeight: 1.6 }}
                placeholder="Tell us what excites you about this role and our mission…" />
            </Field>
          </>
        )}

        {/* Step 2 — Final details */}
        {step === 2 && (
          <>
            <Field label="Cover letter">
              <FocusInput as="textarea" value={form.coverLetter} onChange={e => set("coverLetter", e.target.value)}
                style={{ resize: "vertical", minHeight: 160, lineHeight: 1.6 }}
                placeholder="Optional — use this space to tell us anything your resume doesn't…" />
            </Field>
            <Field label="Salary expectation">
              <FocusInput value={form.salary} onChange={e => set("salary", e.target.value)}
                placeholder="e.g. $120,000–$140,000 / year" />
            </Field>
            <Field label="Earliest start date">
              <FocusInput type="date" value={form.startDate} onChange={e => set("startDate", e.target.value)} />
            </Field>
            <Field label="How did you hear about us?">
              <FocusInput as="select" value={form.referral} onChange={e => set("referral", e.target.value)}>
                <option value="">Select…</option>
                {["LinkedIn", "Twitter / X", "Friend or colleague", "Job board", "Company blog", "Other"].map(o => (
                  <option key={o}>{o}</option>
                ))}
              </FocusInput>
            </Field>
            <Field label="Work authorization">
              <FocusInput as="select" value={form.workAuth} onChange={e => set("workAuth", e.target.value)}>
                <option value="">Select…</option>
                {["Authorized to work in my country", "Will require sponsorship", "Not sure yet"].map(o => (
                  <option key={o}>{o}</option>
                ))}
              </FocusInput>
            </Field>
            <Field label="Video introduction (optional)">
              <p style={{ fontSize: 13, color: "#888", marginBottom: 10, lineHeight: 1.6 }}>
                Record a short clip (up to 2 min) introducing yourself. Candidates who include a video are reviewed first.
              </p>
              <VideoIntro
                value={form.videoUrl}
                onSave={(blob, url) => { set("videoBlob", blob); set("videoUrl", url); }}
              />
            </Field>
          </>
        )}

        {/* Step 3 — Review */}
        {step === 3 && (
          <>
            {reviewSections.map(section => (
              <div key={section.title} style={{ background: "#F9FAFB", borderRadius: 12, padding: "22px 20px", marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
                  {section.title}
                </p>
                {section.rows.map(([label, value]) => <ReviewRow key={label} label={label} value={value} />)}
              </div>
            ))}

            {form.videoUrl && (
              <div style={{ background: "#F9FAFB", borderRadius: 12, padding: "22px 20px", marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
                  Video introduction
                </p>
                <video src={form.videoUrl} controls playsInline
                  style={{ width: "100%", borderRadius: 8, background: "#000", maxHeight: 260 }} />
              </div>
            )}

            <div style={{
              display: "flex", gap: 12, alignItems: "flex-start",
              padding: 16, background: "#FFFBEB",
              border: "1px solid #FDE68A", borderRadius: 10, marginBottom: 8,
            }}>
              <input type="checkbox" id="consent" checked={form.consent}
                onChange={e => set("consent", e.target.checked)}
                style={{ marginTop: 2, width: 16, height: 16, cursor: "pointer", flexShrink: 0 }} />
              <label htmlFor="consent" style={{ fontSize: 13, color: "#555", lineHeight: 1.6, cursor: "pointer" }}>
                I confirm the information I've provided is accurate and I agree to Arclight's{" "}
                <a href="#" style={{ color: "#2563EB" }}>Privacy Policy</a> regarding the
                processing of my personal data for recruitment purposes.
              </label>
            </div>
            {errors.consent && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.consent}</p>}
          </>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36, gap: 12 }}>
          {step > 0 ? (
            <Btn onClick={back} variant="outline">← Back</Btn>
          ) : <div />}
          {step < APPLY_STEPS.length - 1 ? (
            <Btn onClick={next}>Continue →</Btn>
          ) : (
            <Btn onClick={submit} variant="blue" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit application ✓"}
            </Btn>
          )}
        </div>
        {submitError && (
          <p style={{ fontSize: 13, color: "#EF4444", marginTop: 12, textAlign: "right" }}>
            ⚠️ {submitError}
          </p>
        )}

      </div>
    </div>
  );
}
