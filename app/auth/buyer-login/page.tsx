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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 md:p-12 relative overflow-hidden font-sans" style={{ paddingTop: "clamp(6rem, 10vw, 8rem)" }}>
      
      {/* ── Dynamic Background ── */}
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        {/* Glow Top Left */}
        <div className="absolute -top-[10%] -left-[10%] w-[40vw] h-[40vw] bg-sky-500/15 blur-[80px] rounded-full" />
        {/* Glow Bottom Right */}
        <div className="absolute -bottom-[10%] -right-[10%] w-[40vw] h-[40vw] bg-orange-500/15 blur-[80px] rounded-full" />
        {/* Subtle Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }} 
        />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 relative z-10">
        
        {/* ── Left Side: Value Prop ── */}
        <div className="hidden md:flex flex-col justify-center gap-12 py-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm shadow-sky-500/10">
              <ShieldCheck size={16} /> 
              Buyer Portal
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight">
              Access the <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600">Exclusive</span> <br/> 
              Marketplace.
            </h1>
          </div>

          <div className="flex flex-col gap-6">
            {[
              { icon: <Globe size={24} className="text-sky-400" />, title: "Premium Assets", desc: "Access high-value plots, farms, and heavy equipment seamlessly." },
              { icon: <Zap size={24} className="text-orange-400" />, title: "Instant Negotiation", desc: "Connect directly with verified sellers worldwide with zero friction." }
            ].map((feature, i) => (
              <div key={i} className="flex gap-6 items-start bg-white/5 border border-white/10 p-8 rounded-[28px] backdrop-blur-sm hover:bg-white/10 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 shadow-inner flex items-center justify-center shrink-0">
                  {feature.icon}
                </div>
                <div className="flex flex-col pt-1">
                  <h3 className="text-white text-lg font-bold mb-1 tracking-tight">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Side: Form Card ── */}
        <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 sm:p-10 lg:p-12 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
          
          <div className="text-center mb-10">
            <h2 className="text-white text-3xl font-black tracking-tight mb-2">Buyer Sign In</h2>
            <p className="text-slate-400 text-sm font-medium">Enter your credentials to access the marketplace</p>
          </div>

          {/* OAuth Button */}
          <button 
            onClick={handleGoogle} 
            className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white text-[15px] font-semibold transition-all active:scale-[0.98]"
          >
            <svg width="20" height="20" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/><path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
            Sign in with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Or email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-sm font-semibold ml-1">Work Email</label>
              <input 
                type="email" 
                placeholder="john@company.com" 
                className="w-full bg-black/20 border border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-5 py-4 text-white text-[15px] placeholder:text-slate-600 outline-none transition-all shadow-inner"
                value={form.email} 
                onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-slate-400 text-sm font-semibold">Password</label>
                <Link href="#" className="text-sky-400 hover:text-sky-300 transition-colors text-xs font-bold">Forgot?</Link>
              </div>
              <div className="relative">
                <input 
                  type={show ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full bg-black/20 border border-white/10 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-5 py-4 text-white text-[15px] placeholder:text-slate-600 outline-none transition-all shadow-inner pr-12"
                  value={form.password} 
                  onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))} 
                />
                <button 
                  type="button" 
                  onClick={() => setShow(!show)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {show ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full mt-2 bg-gradient-to-br from-sky-500 to-sky-700 hover:from-sky-400 hover:to-sky-600 text-white border border-sky-400/20 rounded-xl py-4 text-[15px] font-bold flex justify-center items-center gap-2 shadow-[0_10px_20px_-10px_rgba(2,132,199,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Access Marketplace <ArrowRight size={18} />
            </button>
          </form>
          
          <p className="text-center text-slate-500 text-sm mt-8 font-medium">
            Don't have a buyer account? <Link href="/auth/sign-up" className="text-white hover:text-sky-400 transition-colors font-bold ml-1">Apply Now</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
