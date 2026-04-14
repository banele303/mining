'use client';

import { useState } from "react";
import { Search, ArrowRight, MapPin } from "lucide-react";

export default function HeroSection() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      window.location.href = `/list?search=${encodeURIComponent(query)}`;
    }
  };

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#05080E]">

      {/* ── Background Image ── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/hero_dark.png")' }}
      >
        <div className="absolute inset-0 bg-[#05080E]/65" />
      </div>

      {/* ── Ambient Glow Blobs ── */}
      <div className="absolute top-[-100px] left-[-100px] w-[600px] h-[600px] rounded-full bg-orange-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 md:px-8 flex flex-col items-center text-center pt-28 pb-20 md:pt-36 md:pb-24">

        {/* Live Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-orange-400 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
          </span>
          Verified SADC Project Network
        </div>

        {/* Headline */}
        <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.0] md:leading-[0.92] tracking-tight mb-7">
          The Hub of{" "}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-orange-400 via-amber-200 to-orange-500 bg-clip-text text-transparent">
            Southern Mining
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-slate-300/80 text-base md:text-xl max-w-2xl mb-12 leading-relaxed font-medium">
          Connecting global capital with verified mineral assets across the SADC region — the specialized gateway for high-value mining project transactions.
        </p>

        {/* ── Search Bar ── */}
        <div className="w-full max-w-3xl">
          {/* Mobile: stacked layout. Desktop: pill layout */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center sm:p-2.5 sm:rounded-full sm:bg-white/8 sm:border sm:border-white/15 sm:backdrop-blur-xl sm:shadow-2xl transition-all">

            {/* Input row (mobile: its own card) */}
            <div className="flex items-center gap-3 bg-white/8 border border-white/15 backdrop-blur-xl rounded-2xl sm:rounded-none sm:bg-transparent sm:border-0 sm:backdrop-blur-none flex-1 px-5 py-4 sm:py-0 sm:px-4">
              <Search className="text-orange-500 shrink-0" size={22} strokeWidth={2.5} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search assets, commodities, locations..."
                className="flex-1 bg-transparent border-none outline-none text-white text-base md:text-lg placeholder:text-slate-500 font-medium min-w-0"
              />
            </div>

            {/* Button (full-width on mobile, auto on desktop) */}
            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-600 active:scale-[0.97] text-white font-black text-base px-8 py-4 sm:py-3.5 rounded-2xl sm:rounded-full shadow-xl shadow-orange-500/25 shrink-0 transition-all"
            >
              Explore Assets
              <ArrowRight size={18} strokeWidth={3} />
            </button>
          </div>

          {/* Region Tags */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["Witwatersrand", "Copper Belt", "Kalahari", "Bushveld Complex"].map((region) => (
              <button
                key={region}
                onClick={() => setQuery(region)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-orange-400 transition-colors font-medium"
              >
                <MapPin size={11} className="text-orange-600" />
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {[
            { value: "R150B+", label: "Asset Value" },
            { value: "4,200+", label: "Projects" },
            { value: "8", label: "Nations" },
            { value: "9,000+", label: "Members" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-black text-white">{stat.value}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-0.5">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
