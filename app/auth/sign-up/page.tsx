'use client';

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Pickaxe, CheckCircle } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

const roles = [
  { value: "buyer", label: "🔍 Buyer", desc: "Looking to acquire assets" },
  { value: "seller", label: "💼 Seller", desc: "Want to list assets" },
  { value: "both", label: "🤝 Both", desc: "Buying and selling" },
];

export default function SignUpPage() {
  const { signIn } = useAuthActions();
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("both");
  const [form, setForm] = useState({ name: "", company: "", email: "", password: "" });

  const handleGoogle = () => {
    void signIn("google", { redirectTo: "/" });
  };

  const perks = [
    "List and manage unlimited assets",
    "Save searches and get instant alerts",
    "Direct access to verified vendors",
    "Real-time market intelligence",
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", display: "flex", alignItems: "stretch", position: "relative", overflow: "hidden" }}>
      {/* Left panel - only on large screens */}
      <div style={{ flex: "0 0 420px", background: "linear-gradient(135deg, #0A1628 0%, #0F1E35 100%)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "3rem", position: "relative" }} className="signup-left">
        {/* Glow */}
        <div style={{ position: "absolute", top: "30%", right: "-50px", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(212,132,10,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />



        <h2 style={{ fontSize: "1.75rem", marginBottom: "0.75rem", lineHeight: 1.2 }}>
          Join the World's Largest Mining Asset Marketplace
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "2rem", lineHeight: 1.7 }}>
          Connect with buyers, sellers, and investors across 54 countries. Free to join — always.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {perks.map((p) => (
            <div key={p} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <CheckCircle size={18} color="var(--primary-light)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
              <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{p}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "3rem", padding: "1.25rem", background: "rgba(212,132,10,0.06)", border: "1px solid rgba(212,132,10,0.15)", borderRadius: "var(--radius-lg)" }}>
          <p style={{ color: "var(--primary-light)", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.4rem" }}>12,000+ members</p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>From junior explorers to major mining companies worldwide</p>
        </div>
      </div>

      {/* Right panel - form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ width: "100%", maxWidth: "480px" }}>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Create your account</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
            Already have an account? <Link href="/auth/sign-in" style={{ color: "var(--primary-light)", fontWeight: 600 }}>Sign in</Link>
          </p>

          {/* OAuth */}
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <button id="signup-google" onClick={handleGoogle} className="btn btn-ghost" style={{ width: "100%", gap: "0.5rem", fontSize: "0.85rem" }}>
              <svg width="16" height="16" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/><path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
              Continue with Google
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>or with email</span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          </div>

          <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={(e) => e.preventDefault()}>
            {/* Role selector */}
            <div>
              <label className="label">I am a...</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {roles.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    style={{
                      flex: 1,
                      padding: "0.6rem 0.5rem",
                      borderRadius: "var(--radius)",
                      border: `1px solid ${role === r.value ? "var(--primary)" : "var(--border)"}`,
                      background: role === r.value ? "rgba(212,132,10,0.1)" : "var(--bg-surface-2)",
                      color: role === r.value ? "var(--primary-light)" : "var(--text-muted)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: "0.8rem",
                      fontWeight: role === r.value ? 700 : 400,
                      transition: "all var(--transition)",
                      textAlign: "center",
                    }}
                  >
                    <div>{r.label}</div>
                    <div style={{ fontSize: "0.68rem", opacity: 0.7, marginTop: "0.2rem" }}>{r.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label className="label">Full Name *</label>
                <input id="signup-name" required className="input" placeholder="John Smith" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <label className="label">Company</label>
                <input id="signup-company" className="input" placeholder="Mining Corp Ltd." value={form.company} onChange={(e) => setForm(p => ({ ...p, company: e.target.value }))} />
              </div>
            </div>

            <div>
              <label className="label">Email Address *</label>
              <input id="signup-email" required type="email" className="input" placeholder="john@company.com" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} />
            </div>

            <div>
              <label className="label">Password *</label>
              <div style={{ position: "relative" }}>
                <input id="signup-password" required type={show ? "text" : "password"} className="input" placeholder="Min. 8 characters" style={{ paddingRight: "3rem" }} value={form.password} onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))} />
                <button type="button" onClick={() => setShow(!show)} style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button id="signup-submit" type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "0.5rem" }}>
              Create Free Account
            </button>

            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
              By creating an account you agree to our{" "}
              <Link href="#" style={{ color: "var(--text-secondary)" }}>Terms of Service</Link> and{" "}
              <Link href="#" style={{ color: "var(--text-secondary)" }}>Privacy Policy</Link>
            </p>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .signup-left { display: none !important; } }
      `}</style>
    </div>
  );
}
