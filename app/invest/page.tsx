'use client';

import { Suspense } from "react";
import MarketplaceContent from "@/app/marketplace/page";

// This page specifically filters for "Investment" opportunities
export default function InvestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg-base)]"></div>}>
      <div style={{ paddingTop: '80px' }}>
        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
            Investment <span className="text-emerald-500">Opportunities</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Explore high-yield mining projects seeking capital, joint venture partners, and strategic investors.
          </p>
        </div>
        <MarketplaceContent initialCategory="Investment" />
      </div>
    </Suspense>
  );
}
