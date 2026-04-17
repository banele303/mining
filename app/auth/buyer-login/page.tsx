'use client';

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, ShieldCheck, Zap, Globe, ArrowRight } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";

export default function BuyerLoginPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleGoogle = () => {
    void signIn("google", { redirectTo: "/marketplace" });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617", // deep slate 950
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--font-inter)",
    }}>
      {/* Dynamic Background */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.6, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 60%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(212, 132, 10, 0.15) 0%, transparent 60%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", height: "100%", backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.03\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')", zIndex: 0 }} />
      </div>

      <div style={{ width: "100%", maxWidth: "1000px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", position: "relative", zIndex: 10 }}>
        
        {/* Left Side: Value Prop */}
        <div className="hidden md:flex flex-col justify-center gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-bold uppercase tracking-widest mb-6">
              <ShieldCheck size={14} /> Buyer Portal
            </div>
            <h1 style={{ fontSize: "3rem", fontWeight: 900, color: "white", lineHeight: 1.1, fontFamily: "var(--font-outfit)" }}>
              Access the <br/> <span style={{ color: "transparent", WebkitTextStroke: "1px #38BDF8" }}>Exclusive</span> <br/> Marketplace.
            </h1>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { icon: <Globe size={20} className="text-sky-400" />, title: "Premium Assets", desc: "Access high-value plots, farms, and heavy equipment." },
              { icon: <Zap size={20} className="text-orange-400" />, title: "Instant Negotiation", desc: "Connect directly with verified sellers worldwide." }
            ].map((feature, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", shrink: 0 }}>
                  {feature.icon}
                </div>
                <div>
                  <h3 style={{ color: "white", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.25rem" }}>{feature.title}</h3>
                  <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.5 }}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div style={{ background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "24px", padding: "3rem", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2 style={{ color: "white", fontSize: "1.75rem", fontWeight: 800, fontFamily: "var(--font-outfit)" }}>Buyer Sign In</h2>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "0.5rem" }}>Enter your credentials to access the marketplace</p>
          </div>

          {/* OAuth */}
          <button onClick={handleGoogle} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", padding: "0.875rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }} className="hover:bg-white/10 hover:border-white/20">
            <svg width="20" height="20" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/><path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
            Sign in with Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "2rem 0" }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
            <span style={{ color: "#64748b", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Or email</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
          </div>

          {/* Form */}
          <form style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }} onSubmit={(e) => e.preventDefault()}>
            <div>
              <label style={{ display: "block", color: "#94a3b8", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem" }}>Work Email</label>
              <input type="email" placeholder="john@company.com" style={{ width: "100%", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "0.875rem 1rem", color: "white", outline: "none", fontSize: "0.95rem" }} className="focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} />
            </div>
            
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <label style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: 600 }}>Password</label>
                <Link href="#" style={{ color: "#38BDF8", fontSize: "0.8rem", fontWeight: 600 }}>Forgot?</Link>
              </div>
              <div style={{ position: "relative" }}>
                <input type={show ? "text" : "password"} placeholder="••••••••" style={{ width: "100%", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "0.875rem 1rem", color: "white", outline: "none", fontSize: "0.95rem" }} className="focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all" value={form.password} onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))} />
                <button type="button" onClick={() => setShow(!show)} style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", color: "#64748b", background: "none", border: "none", cursor: "pointer" }}>
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" style={{ width: "100%", background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)", color: "white", border: "none", borderRadius: "10px", padding: "1rem", fontSize: "1rem", fontWeight: 700, cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem", boxShadow: "0 10px 20px -5px rgba(2, 132, 199, 0.4)" }} className="hover:scale-[1.02] active:scale-[0.98] transition-transform">
              Access Marketplace <ArrowRight size={18} />
            </button>
          </form>
          
          <p style={{ textAlign: "center", color: "#64748b", fontSize: "0.85rem", marginTop: "2rem" }}>
            Don't have a buyer account? <Link href="/auth/sign-up" style={{ color: "white", fontWeight: 700 }}>Apply Now</Link>
          </p>
        </div>

      </div>
      
      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 768px) {
          .md\\:flex { display: none !important; }
        }
      `}</style>
    </div>
  );
}
