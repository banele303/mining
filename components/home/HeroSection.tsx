'use client';

import Link from "next/link";
import { useState } from "react";
import { Search, ArrowRight, MousePointer2 } from "lucide-react";

export default function HeroSection() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      window.location.href = `/list?search=${encodeURIComponent(query)}`;
    }
  };

  return (
    <section className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#05080E]">
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: 'url("/images/hero_dark.png")' }}
      >
        <div className="absolute inset-0 bg-[#05080E]/60 backdrop-blur-[2px]" />
      </div>

      {/* Modern Gradient Accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/20 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-500/10 blur-[100px] rounded-full translate-y-1/2 pointer-events-none" />
      
      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-6 py-12 text-center">
        
        {/* Premium Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-orange-400 text-[11px] font-black uppercase tracking-[0.2em] mb-10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          Verified SADC Project Network
        </div>

        {/* High-Impact Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
          The Hub of <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-amber-500">Southern Mining</span>
        </h1>

        <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
           Connecting global capital with verified mineral assets across the SADC region. The specialized gateway for high-value mining project transactions.
        </p>

        {/* Premium Search Bar */}
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
          <div className="group relative bg-white/5 border border-white/20 p-2 md:p-3 rounded-2xl md:rounded-full backdrop-blur-3xl shadow-2xl flex flex-col md:flex-row gap-3 transition-all duration-500 hover:border-orange-500/50 hover:bg-white/10">
            <div className="flex-1 flex items-center gap-4 px-4 py-2 md:py-0">
              <Search className="text-orange-500" size={24} strokeWidth={3} />
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search assets, locations, commodities..."
                className="w-full bg-transparent border-none outline-none text-white text-lg placeholder:text-slate-500 font-medium"
              />
            </div>
            <button 
              onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-5 rounded-xl md:rounded-full transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-3 group/btn whitespace-nowrap"
            >
              Secure Projects
              <ArrowRight size={20} strokeWidth={3} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Contextual Cues */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 opacity-30 group">
             {['Copper Belt', 'Witwatersrand', 'Kalahari Copper', 'Bushveld'].map(loc => (
               <div key={loc} className="flex items-center gap-2 text-xs text-white font-bold uppercase tracking-widest hover:opacity-100 transition-opacity cursor-default">
                  <MousePointer2 size={12} className="text-orange-500" />
                  {loc}
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Visual Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#05080E] to-transparent" />
    </section>
  );
}
