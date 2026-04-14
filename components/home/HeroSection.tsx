'use client';

import { useState } from "react";
import { Search, ArrowRight, MapPin } from "lucide-react";
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center pt-40 pb-28 md:pt-56 md:pb-40">

        {/* Live Badge */}
        <div className="inline-flex items-center gap-3 px-6 py-3 mb-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl text-orange-400 text-[11px] md:text-sm font-black uppercase tracking-[0.3em] shadow-2xl">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500"></span>
          </span>
          Exclusive SADC Mining Network
        </div>

        {/* Headline */}
        <h1 className="text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[120px] font-black text-white leading-[0.9] md:leading-[0.8] tracking-tight mb-12 font-outfit">
          The Future of{" "}
          <br className="hidden lg:block" />
          <span className="bg-gradient-to-r from-orange-500 via-amber-300 to-orange-400 bg-clip-text text-transparent">
            African Mining
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-slate-300 text-lg md:text-2xl max-w-4xl mb-16 leading-relaxed font-medium px-4 opacity-90">
          The premier institutional gateway connecting verified mineral assets with global capital across the SADC region. 
          Unlocking the potential of Southern Africa's mineral wealth.
        </p>

        {/* ── Search Bar ── */}
        <div className="w-full max-w-5xl group px-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:items-center p-2 md:p-2.5 rounded-[2.5rem] md:rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.6)] group-hover:border-orange-500/40 group-hover:shadow-orange-500/10 transition-all duration-700">

            {/* Input row */}
            <div className="flex items-center gap-4 flex-1 px-8 py-6 md:py-2 md:px-8">
              <Search className="text-orange-500 shrink-0" size={28} strokeWidth={2.5} />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search resources, commodities, mines..."
                className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 text-white text-xl md:text-2xl placeholder:text-slate-500 font-bold min-w-0"
              />
            </div>

            {/* Button */}
            <Button
              onClick={handleSearch}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-[0.98] text-white font-black text-lg md:text-xl px-12 py-9 md:py-6 md:px-14 rounded-[2rem] md:rounded-full shadow-2xl shadow-orange-500/40 shrink-0 transition-all duration-500 border-none h-auto"
            >
              Start Exploring
              <ArrowRight size={24} strokeWidth={3.5} />
            </Button>
          </div>

          {/* Region Tags */}
          <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4">
            {["Witwatersrand", "Copper Belt", "Kalahari", "Bushveld Complex", "Damara Belt"].map((region) => (
              <button
                key={region}
                onClick={() => setQuery(region)}
                className="flex items-center gap-2.5 text-[14px] text-slate-400 hover:text-white transition-all font-bold tracking-wider group/tag"
              >
                <div className="w-2 h-2 rounded-full border border-orange-600/50 group-hover/tag:bg-orange-500 group-hover/tag:border-orange-500 transition-all" />
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-28 flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-80">
          {[
            { value: "R150B+", label: "Asset Value" },
            { value: "4,200+", label: "Projects" },
            { value: "8", label: "Nations" },
            { value: "9,000+", label: "Members" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-black text-white font-outfit tracking-tight">{stat.value}</span>
              <span className="text-[12px] font-black uppercase tracking-[0.3em] text-orange-500/90 mt-2">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
