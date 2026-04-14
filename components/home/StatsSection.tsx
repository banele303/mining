'use client';

import { useEffect, useRef, useState } from "react";

const stats = [
  { end: 4200, suffix: "+", label: "Regional Assets" },
  { end: 8, suffix: "", label: "Member Nations" },
  { end: 150, suffix: "B+", label: "Regional Value", prefix: "R" },
  { end: 9000, suffix: "+", label: "Active Members" },
  { end: 420, suffix: "+", label: "Deals Closed" },
];

function useCounter(end: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const currentCount = percentage * end;
      setCount(currentCount);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, started]);

  return count;
}

function StatCard({ stat, started }: { stat: typeof stats[0]; started: boolean }) {
  const count = useCounter(stat.end, 2000, started);
  const displayCount = Number(count.toFixed(stat.end < 10 ? 1 : 0)).toLocaleString();

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="text-3xl md:text-5xl font-black bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-transparent leading-none mb-3">
        {stat.prefix || ""}{displayCount}{stat.suffix}
      </div>
      <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-400 text-center">
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
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-slate-50/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
