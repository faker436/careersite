import { useState, useRef } from "react";

const INPUT_BASE = {
  width: "100%",
  padding: "10px 14px",
  fontSize: 14,
  border: "1px solid #e0e0e0",
  borderRadius: 8,
  outline: "none",
  fontFamily: "inherit",
  color: "#111",
  background: "#fff",
  boxSizing: "border-box",
};

export function FocusInput({ as: Tag = "input", style, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <Tag
      {...props}
      style={{ ...INPUT_BASE, borderColor: focused ? "#2563EB" : "#e0e0e0", ...style }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

export function Field({ label, required, error, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6 }}>
        {label} {required && <span style={{ color: "#EF4444" }}>*</span>}
      </label>
      {children}
      {error && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{error}</p>}
    </div>
  );
}

export function FileUpload({ value, onChange }) {
  const ref = useRef();
  return (
    <div
      onClick={() => ref.current.click()}
      style={{
        border: "1.5px dashed #d0d0d0", borderRadius: 10, padding: "24px 16px",
        textAlign: "center", cursor: "pointer",
        background: value ? "#F0FDF4" : "#FAFAFA", transition: "background 0.15s",
      }}
      onMouseEnter={e => { if (!value) e.currentTarget.style.background = "#F5F5F5"; }}
      onMouseLeave={e => { if (!value) e.currentTarget.style.background = "#FAFAFA"; }}
    >
      <input ref={ref} type="file" accept=".pdf,.doc,.docx" style={{ display: "none" }}
        onChange={e => onChange(e.target.files[0])} />
      {value ? (
        <>
          <div style={{ fontSize: 22, marginBottom: 6 }}>✅</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#166534" }}>{value.name}</div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>Click to replace</div>
        </>
      ) : (
        <>
          <div style={{ fontSize: 22, marginBottom: 6 }}>📎</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#555" }}>Upload your resume</div>
          <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>PDF, DOC, DOCX — max 5 MB</div>
        </>
      )}
    </div>
  );
}

export function Btn({ children, onClick, variant = "primary", style, disabled }) {
  const base = {
    padding: "12px 26px", borderRadius: 10, fontSize: 14,
    fontWeight: 600, cursor: disabled ? "default" : "pointer",
    border: "none", transition: "opacity 0.15s", opacity: disabled ? 0.5 : 1,
  };
  const variants = {
    primary: { background: "#111",    color: "#fff" },
    blue:    { background: "#2563EB", color: "#fff" },
    outline: { background: "transparent", color: "#555", border: "1px solid #e0e0e0" },
  };
  return (
    <button disabled={disabled} onClick={onClick}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.opacity = "0.82"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = disabled ? "0.5" : "1"; }}>
      {children}
    </button>
  );
}

export function ReviewRow({ label, value }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", gap: 16, padding: "11px 0", borderBottom: "1px solid #F0F0F0" }}>
      <div style={{ fontSize: 13, color: "#888", width: 140, flexShrink: 0 }}>{label}</div>
      <div style={{ fontSize: 13, color: "#111", wordBreak: "break-word" }}>{value}</div>
    </div>
  );
}
