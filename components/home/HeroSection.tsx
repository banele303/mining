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
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#020617] overflow-hidden pt-[140px] pb-20 md:pt-44 md:pb-32">
      
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
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center" style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}>
        
        {/* Floating Badge */}
        <div className="animate-fadeIn flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-emerald-400 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] mb-10 shadow-lg" style={{ padding: '0.875rem 1.5rem' }}>
          <Globe size={14} className="animate-pulse" />
          Connecting Global Capital to High-Growth Assets
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
          The world's premier institutional marketplace for verified mineral assets, agricultural farms, and heavy equipment.
        </p>

        {/* ── UNIFIED SLEEK SEARCH BAR (Marketplace style) ── */}
        <div className="w-full max-w-4xl relative px-4 mt-8 mb-8">
          <div className="max-w-[750px] mx-auto bg-white/[0.03] border border-white/10 rounded-[32px] sm:rounded-full p-2 sm:p-3 flex flex-col sm:flex-row gap-4 sm:gap-2 backdrop-blur-xl shadow-2xl">
            <div className="flex-1 flex items-center px-4 sm:pl-6 gap-3 text-slate-400">
              <Search size={20} className="shrink-0" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search by asset type, location or keyword..." 
                className="w-full bg-transparent border-none text-white outline-none text-sm sm:text-base py-3 sm:py-0"
              />
            </div>
            <button 
              onClick={handleSearch}
              className="bg-sky-400 hover:bg-sky-300 text-[#020617] font-bold py-3 sm:py-4 px-8 rounded-[24px] sm:rounded-full transition-all active:scale-[0.98] shadow-lg shadow-sky-500/20"
            >
              Search
            </button>
          </div>
        </div>

        {/* Location Hints */}
        <div className="mb-12 flex flex-wrap justify-center gap-4 sm:gap-8 opacity-60 hover:opacity-100 transition-opacity">
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
        <div className="w-full pt-12 border-t border-white/5 flex flex-wrap justify-center gap-x-8 sm:gap-x-16 gap-y-8 mt-12 mb-10">
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
