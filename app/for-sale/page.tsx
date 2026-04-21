'use client';

import { Suspense } from "react";
import MarketplaceContent from "@/app/marketplace/page";

// This page specifically filters for "For Sale" assets
export default function ForSalePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg-base)]"></div>}>
      <div style={{ paddingTop: '80px' }}>
        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
            Assets <span className="text-emerald-500">For Sale</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Browse premium mining projects, commercial land, and equipment available for immediate acquisition.
          </p>
        </div>
        {/* We can pass initial filters here if we refactor MarketplaceContent to accept props, 
            but for now, we'll use the search params approach or just render the marketplace with a specific focus. */}
        <MarketplaceContent initialIntention="Sell" />
      </div>
    </Suspense>
  );
}
