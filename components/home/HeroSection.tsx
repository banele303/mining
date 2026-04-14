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
        <p className="text-slate-400 text-base md:text-xl max-w-2xl mb-16 leading-relaxed font-medium">
          The SADC region's premier institutional marketplace for verified mineral assets and high-stakes mining ventures.
        </p>

        {/* ── BIG WIDTH, SMALL HEIGHT Search Bar ── */}
        <div className="w-full max-w-5xl group mb-20">
          <div className="relative flex items-center h-14 sm:h-16 w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl transition-all duration-500 group-focus-within:border-orange-500/50 group-focus-within:ring-4 group-focus-within:ring-orange-500/10 group-hover:bg-white/[0.08]">
            
            <div className="flex items-center gap-4 flex-1 h-full pl-6 md:pl-8">
              <Search className="text-slate-500 group-focus-within:text-orange-500 transition-colors" size={20} />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search by commodity, country or project name..."
                className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 text-white text-base md:text-lg placeholder:text-slate-500 font-semibold h-full px-0"
              />
            </div>

            <button
              onClick={handleSearch}
              className="h-[calc(100%-12px)] mr-1.5 px-6 sm:px-10 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-lg active:scale-95"
            >
              Search
            </button>
          </div>

          {/* Location Hints */}
          <div className="mt-6 flex flex-wrap justify-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
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
        </div>

        {/* ── Bottom Section: Minimal Trust ── */}
        <div className="w-full pt-10 border-t border-white/5 flex flex-wrap justify-center gap-x-16 gap-y-6">
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
