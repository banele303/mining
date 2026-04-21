'use client';

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Pickaxe } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleGoogle = () => {
    void signIn("google", { redirectTo: "/" });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-base)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      paddingTop: "clamp(6rem, 10vw, 8rem)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(212,132,10,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: "440px", position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>

          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>Welcome back</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Sign in to your account to continue</p>
        </div>

        {/* Card */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: "2rem", boxShadow: "var(--shadow-elevated)" }}>
          {/* OAuth buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <button id="signin-google" onClick={handleGoogle} className="btn btn-ghost" style={{ width: "100%", gap: "0.75rem", fontSize: "0.9rem" }}>
              <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/><path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            <span style={{ color: "var(--text-muted)", fontSize: "0.78rem", fontWeight: 500 }}>or sign in with email</span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          </div>

          {/* Email form */}
          <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="label">Email Address</label>
              <input id="signin-email" type="email" className="input" placeholder="john@company.com" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                <label className="label" style={{ marginBottom: 0 }}>Password</label>
                <Link href="/auth/forgot-password" style={{ fontSize: "0.78rem", color: "var(--primary-light)" }}>Forgot password?</Link>
              </div>
              <div style={{ position: "relative" }}>
                <input id="signin-password" type={show ? "text" : "password"} className="input" placeholder="Enter your password" style={{ paddingRight: "3rem" }} value={form.password} onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))} />
                <button type="button" onClick={() => setShow(!show)} style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button id="signin-submit" type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "0.5rem" }}>
              Sign In
            </button>
          </form>

          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "1.5rem" }}>
            Don't have an account?{" "}
            <Link href="/auth/sign-up" style={{ color: "var(--primary-light)", fontWeight: 600 }}>Join free</Link>
          </p>
        </div>

        <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "1.5rem" }}>
          By signing in you agree to our{" "}
          <Link href="#" style={{ color: "var(--text-secondary)" }}>Terms of Service</Link> and{" "}
          <Link href="#" style={{ color: "var(--text-secondary)" }}>Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
