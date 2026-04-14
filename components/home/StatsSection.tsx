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
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Number(start.toFixed(end < 10 ? 1 : 0)));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, started]);
  return count;
}

function StatCard({ stat, started }: { stat: typeof stats[0]; started: boolean }) {
  const count = useCounter(stat.end, 2000, started);
  return (
    <div className="stat-card">
      <div className="stat-number">
        {stat.prefix || ""}{count.toLocaleString()}{stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-sm" style={{ background: "var(--bg-surface)" }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1rem",
        }} className="stats-grid">
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} started={started} />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .stats-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 600px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}
