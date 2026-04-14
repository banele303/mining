'use client';

import { useEffect, useRef, useState } from "react";

const stats = [
  { end: 4200, suffix: "+", label: "Regional Assets", icon: "🏔" },
  { end: 8, suffix: "", label: "Member Nations", icon: "🌍" },
  { end: 150, suffix: "B+", label: "Regional Value", prefix: "R", icon: "💎" },
  { end: 9000, suffix: "+", label: "Active Members", icon: "🤝" },
  { end: 420, suffix: "+", label: "Deals Closed", icon: "⚡" },
];

function useCounter(end: number, duration = 2200, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    let frame: number;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const t = Math.min((ts - startTime) / duration, 1);
      setCount(easeOut(t) * end);
      if (t < 1) frame = requestAnimationFrame(tick);
      else setCount(end);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, duration, started]);
  return count;
}

function StatCard({ stat, index, started }: { stat: typeof stats[0]; index: number; started: boolean }) {
  const raw = useCounter(stat.end, 2200, started);
  const display = Number(raw.toFixed(stat.end < 10 ? 1 : 0)).toLocaleString();

  return (
    <div
      className="group relative flex flex-col items-center justify-center p-6 lg:p-8 rounded-3xl bg-white border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-orange-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-3xl" />

      {/* Emoji icon */}
      <div className="text-3xl mb-4 select-none grayscale group-hover:grayscale-0 transition-all duration-300">
        {stat.icon}
      </div>

      {/* Counter */}
      <div className="text-4xl lg:text-5xl font-black leading-none mb-3 bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
        {stat.prefix || ""}{display}{stat.suffix}
      </div>

      {/* Label */}
      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 text-center group-hover:text-orange-500 transition-colors duration-300">
        {stat.label}
      </div>
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #D4840A 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
            Platform at a Glance
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Numbers That{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Define Our Market
            </span>
          </h2>
          <p className="mt-3 text-slate-500 text-base max-w-xl mx-auto">
            Southern Africa's most comprehensive and verified mining asset network.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} started={started} />
          ))}
        </div>

        {/* Bottom tagline */}
        <p className="mt-10 text-center text-xs text-slate-400 font-medium tracking-wide">
          Updated in real-time · Verified listings only · SADC-wide coverage
        </p>
      </div>
    </section>
  );
}
