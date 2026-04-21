'use client';

import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedListings from "@/components/home/FeaturedListings";
import BlogSection from "@/components/home/BlogSection";
import CommodityBrowser from "@/components/home/CommodityBrowser";
import MapPreview from "@/components/home/MapPreview";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";

const whyUs = [
  {
    icon: <Globe size={24} />,
    title: "Global Reach",
    description: "Access mining assets in 54+ countries across every continent, from junior explorers to major producers.",
  },
  {
    icon: <Shield size={24} />,
    title: "Verified Listings",
    description: "Every listing is reviewed by our expert team. All vendors are KYC-verified for your peace of mind.",
  },
  {
    icon: <Zap size={24} />,
    title: "Real-Time Updates",
    description: "Our platform updates in real-time. Get instant alerts when new assets matching your criteria are listed.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedListings />
      <CommodityBrowser />
      <MapPreview />

      {/* Why Mining Exchange */}
      <section className="bg-slate-50/50 border-b border-slate-100 relative overflow-hidden" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="container px-6 lg:px-8">
          <div className="text-center mb-20 md:mb-32">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500 mb-6">
              Why Choose Us
            </p>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              The Smartest Way to Transact<br className="hidden md:block" /> Mining Assets
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {whyUs.map((item) => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-[32px] transition-all duration-300 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/5 hover:-translate-y-2 group" style={{ padding: '2.5rem' }}>
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 border border-emerald-100 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-base leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BlogSection />

      {/* CTA Banner */}
      <section className="relative bg-slate-900 overflow-hidden border-t border-white/5" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
        {/* BG Image */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: 'url("/images/handshake.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
          pointerEvents: "none",
        }} />

        <div className="container relative z-10 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Ready to List Your <br className="hidden md:block" /> Mining Asset?
          </h2>
          <div className="w-full max-w-2xl mx-auto flex justify-center">
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed" style={{ textAlign: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem', marginBottom: '3rem', width: '100%' }}>
              Join the world's most trusted mining network. List your asset today and connect with thousands of qualified global buyers.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 w-full">
            <Link href="/dashboard/list-asset" className="btn btn-primary btn-xl">
              List an Asset Free <ArrowRight size={18} />
            </Link>
            <Link href="/marketplace" className="btn bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-5 text-lg rounded-2xl transition-all">
              Browse Listings
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
