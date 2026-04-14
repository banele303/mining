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
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#05080E] pt-20 pb-16">
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
      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center mt-8 md:mt-0">
        
        {/* Premium Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 md:px-5 py-2 rounded-full bg-white/5 border border-white/10 text-orange-400 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] mb-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          Verified SADC Project Network
        </div>

        {/* High-Impact Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] md:leading-[0.95] tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
          The Hub of <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-amber-500">Southern Mining</span>
        </h1>

        <p className="text-sm sm:text-base md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 md:mb-12 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 px-2">
           Connecting global capital with verified mineral assets across the SADC region. The specialized gateway for high-value mining project transactions.
        </p>

        {/* Premium Search Bar */}
        <div className="w-full max-w-3xl mx-auto px-2 md:px-0 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
          <div className="group relative bg-white/5 border border-white/20 p-1.5 md:p-3 rounded-2xl md:rounded-full backdrop-blur-3xl shadow-2xl flex flex-col md:flex-row gap-2 transition-all duration-500 hover:border-orange-500/50 hover:bg-white/10">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-0">
              <Search className="text-orange-500 shrink-0" size={22} strokeWidth={3} />
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search assets..."
                className="w-full bg-transparent border-none outline-none text-white text-base md:text-lg placeholder:text-slate-400 font-medium"
              />
            </div>
            <button 
              onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-full transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-3 group/btn whitespace-nowrap active:scale-[0.98]"
            >
              Secure Projects
              <ArrowRight size={20} strokeWidth={3} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Contextual Cues */}
          <div className="mt-8 hidden md:flex flex-wrap justify-center gap-6 opacity-40 group">
             {['Copper Belt', 'Witwatersrand', 'Kalahari Copper', 'Bushveld'].map(loc => (
               <div key={loc} className="flex items-center gap-2 text-xs text-white font-bold uppercase tracking-widest hover:opacity-100 transition-opacity cursor-default">
                  <MousePointer2 size={12} className="text-orange-500 shrink-0" />
                  {loc}
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Visual Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
    </section>
  );
}
