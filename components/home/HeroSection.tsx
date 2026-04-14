'use client';

import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";

export default function HeroSection() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      window.location.href = `/list?search=${encodeURIComponent(query)}`;
    }
  };

  return (
    <section className="relative min-h-screen min-h-[100dvh] -mt-[72px] flex items-center justify-center overflow-hidden bg-[#070B14]">
      {/* Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity duration-1000"
        style={{ backgroundImage: 'url("/images/hero_dark.png")' }}
      />

      {/* Aesthetic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/90 pointer-events-none" />
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212,132,10,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-4 pt-20 pb-12 text-center flex flex-col items-center">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] md:text-xs font-black uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          #1 SADC Mining Network
        </div>

        {/* Hero Typography */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight transition-all duration-500 max-w-4xl mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
          Unlocking the Southern Africa <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-orange-400 via-amber-200 to-orange-500 bg-clip-text text-transparent">Mining Corridor</span>
        </h1>

        <p className="text-base md:text-xl text-slate-300/80 max-w-2xl mb-12 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          The premier gateway for verified mining assets and operational projects across Africa's resource belts. Transact with confidence and regional expertise.
        </p>

        {/* Reimagined Search Experience */}
        <div className="w-full max-w-2xl px-2 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
          <div className="group relative flex flex-col md:flex-row items-stretch gap-2 bg-white/5 backdrop-blur-3xl p-2 md:p-1.5 rounded-2xl md:rounded-full border border-white/10 shadow-2xl transition-all duration-500 hover:border-orange-500/30 hover:bg-white/10">
            
            <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-0">
              <Search className="text-orange-400 shrink-0" size={20} strokeWidth={3} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search assets, locations, commodities..."
                className="flex-1 bg-transparent border-none outline-none text-white text-base placeholder:text-slate-500 w-full"
              />
            </div>

            <button 
              onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black px-8 py-3.5 md:py-4 rounded-xl md:rounded-full transition-all active:scale-[0.97] shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
            >
              Explore Assets
            </button>
          </div>

          {/* Quick Search Suggestions */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 opacity-60">
             <span className="text-xs text-slate-400 font-bold uppercase tracking-wider py-1">Trending:</span>
             {['Gold', 'Copper', 'Lithium', 'South Africa', 'Namibia'].map(tag => (
               <button 
                key={tag} 
                onClick={() => setQuery(tag)}
                className="text-[10px] md:text-xs text-slate-200 hover:text-orange-400 transition-colors bg-white/5 px-2.5 py-1 rounded-md border border-white/5"
              >
                 {tag}
               </button>
             ))}
          </div>
        </div>

        {/* Final Scroll Anchor */}
        <div className="mt-16 animate-bounce opacity-30">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </div>

      {/* Visual Fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
