'use client';

import { useEffect, useRef, useState } from "react";
import { Globe, Shield, Activity, Users, FileCheck } from "lucide-react";

const stats = [
  { end: 4200, suffix: "+", label: "Regional Assets", icon: <Globe size={40} className="text-emerald-500" /> },
  { end: 8, suffix: "", label: "Member Nations", icon: <Shield size={40} className="text-emerald-500" /> },
  { end: 150, suffix: "B+", label: "Regional Value", prefix: "R", icon: <Activity size={40} className="text-emerald-500" /> },
  { end: 9000, suffix: "+", label: "Active Members", icon: <Users size={40} className="text-emerald-500" /> },
  { end: 420, suffix: "+", label: "Deals Closed", icon: <FileCheck size={40} className="text-emerald-500" /> },
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

function StatCard({ stat, started }: { stat: typeof stats[0]; started: boolean }) {
  const raw = useCounter(stat.end, 2200, started);
  const display = Number(raw.toFixed(stat.end < 10 ? 1 : 0)).toLocaleString();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 bg-white rounded-3xl shadow-xl border border-gray-100 hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center w-full mx-auto" style={{ padding: '4rem 2rem' }}>
      {/* Icon Wrapper */}
      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-emerald-50 mb-10">
        {stat.icon}
      </div>

      {/* Number */}
      <h3 className="text-5xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-normal">
        {stat.prefix || ""}{display}{stat.suffix}
      </h3>

      {/* Label */}
      <p className="text-sm font-bold text-gray-400 tracking-widest uppercase leading-loose mt-2">
        {stat.label}
      </p>
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
    <section ref={sectionRef} className="bg-gray-50 flex flex-col items-center justify-center w-full relative border-b border-gray-100 py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto lg:px-8 flex flex-col items-center justify-center w-full">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-32 mx-auto w-full">
          <span className="px-8 py-3 bg-emerald-100 text-emerald-700 rounded-full text-sm font-black tracking-widest uppercase mb-10 inline-block">
            Platform at a Glance
          </span>
          <h2 className="text-5xl lg:text-7xl font-black text-gray-900 mb-10 tracking-tight leading-tight max-w-4xl">
            Numbers That <br className="hidden md:block"/><span className="text-emerald-500">Define Our Market</span>
          </h2>
          <p className="text-2xl text-gray-500 max-w-3xl leading-loose">
            The global industry's most comprehensive and verified mining asset network.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 w-full">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
