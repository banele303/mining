'use client';

import { useEffect, useRef, useState } from "react";
import { Globe, Shield, Activity, Users, FileCheck, Zap } from "lucide-react";

const stats = [
  { 
    end: 4200, 
    suffix: "+", 
    label: "Regional Assets", 
    icon: <Globe size={28} />, 
    color: "from-emerald-400 to-teal-500",
    glow: "rgba(16, 185, 129, 0.2)"
  },
  { 
    end: 8, 
    suffix: "", 
    label: "Member Nations", 
    icon: <Shield size={28} />, 
    color: "from-blue-400 to-indigo-500",
    glow: "rgba(59, 130, 246, 0.2)"
  },
  { 
    end: 150, 
    suffix: "B+", 
    label: "Regional Value", 
    prefix: "R", 
    icon: <Activity size={28} />, 
    color: "from-amber-400 to-orange-500",
    glow: "rgba(245, 158, 11, 0.2)"
  },
  { 
    end: 9000, 
    suffix: "+", 
    label: "Active Members", 
    icon: <Users size={28} />, 
    color: "from-purple-400 to-pink-500",
    glow: "rgba(168, 85, 247, 0.2)"
  },
  { 
    end: 420, 
    suffix: "+", 
    label: "Deals Closed", 
    icon: <FileCheck size={28} />, 
    color: "from-emerald-400 to-emerald-600",
    glow: "rgba(16, 185, 129, 0.2)"
  },
];

function useCounter(end: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    let frame: number;
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
    
    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const t = Math.min((ts - startTime) / duration, 1);
      setCount(easeOutQuart(t) * end);
      if (t < 1) frame = requestAnimationFrame(tick);
      else setCount(end);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, duration, started]);
  return count;
}

function StatCard({ stat, started }: { stat: typeof stats[0]; started: boolean }) {
  const raw = useCounter(stat.end, 2000, started);
  const display = Number(raw.toFixed(stat.end < 10 ? 1 : 0)).toLocaleString();

  return (
    <div 
      className="group relative flex flex-col items-center justify-center p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.05] hover:border-white/10 hover:-translate-y-2 overflow-hidden h-full"
    >
      {/* Background Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at center, ${stat.glow} 0%, transparent 70%)` 
        }} 
      />

      {/* Icon Wrapper */}
      <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} mb-8 text-white shadow-lg shadow-black/20 transform group-hover:scale-110 transition-transform duration-500`}>
        {stat.icon}
      </div>

      {/* Number */}
      <div className="relative">
        <h3 className="text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight flex items-baseline">
          <span className="opacity-50 text-2xl mr-1">{stat.prefix}</span>
          {display}
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${stat.color} text-3xl ml-1`}>
            {stat.suffix}
          </span>
        </h3>
      </div>

      {/* Label */}
      <p className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase mt-2 group-hover:text-slate-300 transition-colors duration-300">
        {stat.label}
      </p>

      {/* Bottom Accent Line */}
      <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color} w-0 group-hover:w-full transition-all duration-700 ease-in-out opacity-50`} />
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setStarted(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[#020617] w-full overflow-hidden" 
      style={{ paddingTop: '10rem', paddingBottom: '10rem' }}
    >
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-24 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 animate-fadeIn">
            <Zap size={14} className="text-emerald-500 fill-emerald-500" />
            <span className="text-emerald-500 text-[11px] font-black tracking-[0.2em] uppercase">
              Platform at a Glance
            </span>
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
            Numbers That <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">
              Define Our Market
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
            Connecting the world's most valuable assets through the industry's largest 
            verified digital mining network.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} started={started} />
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm tracking-wide">Secure Network</span>
              <span className="text-slate-500 text-xs tracking-tight">End-to-end encryption</span>
            </div>
            <div className="flex flex-col border-l border-white/10 pl-8">
              <span className="text-white font-bold text-sm tracking-wide">Global Support</span>
              <span className="text-slate-500 text-xs tracking-tight">24/7 dedicated desk</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium italic">
            * Data updated daily based on real-time market activity
          </div>
        </div>
      </div>
    </section>
  );
}

