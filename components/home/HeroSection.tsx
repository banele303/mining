'use client';

import { useState } from "react";
import { Search, MapPin, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      window.location.href = `/list?search=${encodeURIComponent(query)}`;
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-[#020617] overflow-hidden pt-20">
      
      {/* ── Background Layer ── */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105"
          style={{ backgroundImage: 'url("/images/hero_dark.png")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#020617]/40 to-[#020617]" />
      </div>

      {/* ── Decorative Elements ── */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* ── Content Wrapper ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col items-center text-center">
        
        {/* Floating Badge */}
        <div className="animate-fadeIn flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md text-emerald-400 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] mb-12 shadow-sm">
          <Globe size={14} className="animate-pulse" />
          Connecting Global Capital to Southern Africa
        </div>

        {/* Master Headline */}
        <h1 className="text-[3rem] sm:text-6xl md:text-8xl font-black text-white leading-[1.05] tracking-tight mb-8 font-outfit">
          Discover the Next <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-500">
            Mining & Agricultural Frontier
          </span>
        </h1>

        {/* Minimal Subhead */}
        <p className="text-slate-400 text-base md:text-xl max-w-2xl mb-24 leading-relaxed font-medium">
          The SADC region's premier institutional marketplace for verified mineral assets, agricultural farms, and heavy equipment.
        </p>

        {/* ── UNIFIED SLEEK SEARCH BAR (Marketplace style) ── */}
        <div className="w-full max-w-4xl relative px-4" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "100px", padding: "0.75rem", display: "flex", gap: "1rem", backdropFilter: "blur(12px)" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", paddingLeft: "1.25rem", gap: "1rem", color: "#64748b" }}>
              <Search size={22} />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search by asset type, location or keyword..." 
                style={{ width: "100%", background: "transparent", border: "none", color: "white", outline: "none", fontSize: "1.05rem", padding: "0.5rem 0" }} 
              />
            </div>
            <button 
              onClick={handleSearch}
              style={{ background: "#38BDF8", color: "#020617", border: "none", borderRadius: "100px", padding: "0.75rem 2rem", fontWeight: 700, fontSize: "1rem", cursor: "pointer", transition: "all 0.2s" }} 
              className="hover:bg-sky-400"
            >
              Search
            </button>
          </div>
        </div>

        {/* Location Hints */}
        <div className="mb-10 flex flex-wrap justify-center gap-8 opacity-60 hover:opacity-100 transition-opacity">
          {["South Africa", "Namibia", "Botswana", "Zimbabwe", "Zambia"].map((loc) => (
            <button 
              key={loc}
              onClick={() => setQuery(loc)}
              className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-emerald-400 transition-colors tracking-widest uppercase"
            >
              <MapPin size={10} />
              {loc}
            </button>
          ))}
        </div>

        {/* ── Bottom Section: Minimal Trust ── */}
        <div className="w-full pt-10 border-t border-white/5 flex flex-wrap justify-center gap-x-16 gap-y-6 mt-10">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-white">4.2K+</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Verified Assets</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-white">R150B</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Total Pipeline</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-black text-white">100%</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">SADC Coverage</span>
          </div>
        </div>
      </div>

      {/* Decorative Shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] to-transparent" />
    </section>
  );
}
