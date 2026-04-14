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
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* ── Content Wrapper ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col items-center text-center">
        
        {/* Floating Badge */}
        <div className="animate-fadeIn flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md text-orange-400 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] mb-12 shadow-sm">
          <Globe size={14} className="animate-pulse" />
          Connecting Global Capital to Southern Africa
        </div>

        {/* Master Headline */}
        <h1 className="text-[3rem] sm:text-6xl md:text-8xl font-black text-white leading-[1.05] tracking-tight mb-8 font-outfit">
          Discover the Next <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-orange-500">
            Mining Frontier
          </span>
        </h1>

        {/* Minimal Subhead */}
        <p className="text-slate-400 text-base md:text-xl max-w-2xl mb-24 leading-relaxed font-medium">
          The SADC region's premier institutional marketplace for verified mineral assets and high-stakes mining ventures.
        </p>

        {/* ── UNIFIED SLEEK SEARCH PILL ── */}
        <div className="w-full max-w-4xl relative mt-4 mb-16">
          <div className="relative flex items-center h-16 sm:h-20 w-full rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl transition-all duration-500 focus-within:border-orange-500/80 focus-within:bg-slate-950/40 focus-within:ring-4 focus-within:ring-orange-500/20">
            
            <Search className="text-slate-300 shrink-0 ml-6 sm:ml-8" size={24} />
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search resources, projects, or locations..."
              className="flex-1 bg-transparent border-none outline-none text-white text-base sm:text-xl placeholder:text-slate-400 font-semibold h-full px-4 sm:px-6 w-full"
            />

            <button
              onClick={handleSearch}
              className="h-[calc(100%-16px)] mr-2 sm:mr-2.5 px-8 sm:px-12 rounded-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold text-sm sm:text-lg transition-all duration-300 shadow-xl shadow-orange-500/25 active:scale-95 shrink-0"
            >
              Search Assets
            </button>
            
          </div>
        </div>

        {/* Location Hints */}
        <div className="mb-10 flex flex-wrap justify-center gap-8 opacity-60 hover:opacity-100 transition-opacity">
          {["South Africa", "Namibia", "Botswana", "Zimbabwe", "Zambia"].map((loc) => (
            <button 
              key={loc}
              onClick={() => setQuery(loc)}
              className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-orange-400 transition-colors tracking-widest uppercase"
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
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] to-transparent" />
    </section>
  );
}
