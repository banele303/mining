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
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-center text-center pt-32 pb-24 md:pt-44 md:pb-32">

        {/* Live Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 mb-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-orange-400 text-[11px] md:text-xs font-black uppercase tracking-[0.25em] shadow-2xl">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500"></span>
          </span>
          Global Mining Project Network
        </div>

        {/* Headline */}
        <h1 className="text-[3.25rem] sm:text-7xl md:text-8xl lg:text-[110px] font-black text-white leading-[0.95] md:leading-[0.85] tracking-tight mb-10 font-outfit">
          The Hub of{" "}
          <br className="hidden lg:block" />
          <span className="bg-gradient-to-r from-orange-500 via-amber-300 to-orange-400 bg-clip-text text-transparent">
            Southern Mining
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-slate-300 text-base md:text-2xl max-w-3xl mb-14 leading-relaxed font-medium">
          Connecting institutional capital with verified mineral assets across the SADC region. The premier gateway for high-stakes mining project transactions.
        </p>

        {/* ── Search Bar ── */}
        <div className="w-full max-w-4xl group">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center sm:p-3 sm:rounded-full sm:bg-white/5 sm:border sm:border-white/10 sm:backdrop-blur-3xl sm:shadow-[0_0_80px_rgba(0,0,0,0.5)] group-hover:border-orange-500/30 transition-all duration-500">

            {/* Input row */}
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-3xl rounded-3xl sm:rounded-none sm:bg-transparent sm:border-0 sm:backdrop-blur-none flex-1 px-6 py-5 sm:py-0 sm:px-6">
              <Search className="text-orange-500 shrink-0" size={26} strokeWidth={2.5} />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search assets, commodities, locations..."
                className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 text-white text-lg md:text-xl placeholder:text-slate-500 font-bold min-w-0"
              />
            </div>

            {/* Button */}
            <Button
              onClick={handleSearch}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-[0.96] text-white font-black text-lg px-10 py-8 sm:py-7 sm:px-10 rounded-3xl sm:rounded-full shadow-2xl shadow-orange-500/30 shrink-0 transition-all duration-300 border-none h-auto"
            >
              Explore Assets
              <ArrowRight size={22} strokeWidth={3.5} />
            </Button>
          </div>

          {/* Region Tags */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {["Witwatersrand", "Copper Belt", "Kalahari", "Bushveld Complex"].map((region) => (
              <button
                key={region}
                onClick={() => setQuery(region)}
                className="flex items-center gap-2 text-[13px] text-slate-400 hover:text-orange-400 transition-all font-bold tracking-wide group/tag"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-orange-600/50 group-hover/tag:bg-orange-500 transition-colors" />
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {[
            { value: "R150B+", label: "Asset Value" },
            { value: "4,200+", label: "Projects" },
            { value: "8", label: "Nations" },
            { value: "9,000+", label: "Members" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-white font-outfit">{stat.value}</span>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-500/80 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
