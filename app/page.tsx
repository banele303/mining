'use client';

import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedListings from "@/components/home/FeaturedListings";
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

      {/* Why MineXchange */}
      <section className="section" style={{ background: "var(--bg-surface)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--primary)", marginBottom: "0.5rem" }}>
              Why Choose Us
            </p>
            <h2>The Smartest Way to Transact<br />Mining Assets</h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }} className="why-grid">
            {whyUs.map((item) => (
              <div key={item.title} style={{
                background: "var(--bg-surface-2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                transition: "all var(--transition)",
              }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--primary)";
                  el.style.boxShadow = "var(--shadow-glow)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--border)";
                  el.style.boxShadow = "none";
                }}
              >
                <div style={{
                  width: "52px", height: "52px",
                  background: "rgba(212,132,10,0.12)",
                  border: "1px solid rgba(212,132,10,0.2)",
                  borderRadius: "var(--radius)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--primary-light)",
                  marginBottom: "1.25rem",
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>{item.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) { .why-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* CTA Banner */}
      <section style={{
        position: "relative",
        background: "var(--bg-surface-2)",
        overflow: "hidden",
        padding: "6rem 0",
        borderTop: "1px solid var(--border)",
      }}>
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

        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h2 style={{ marginBottom: "1rem", fontSize: "2.5rem" }}>Ready to List Your Mining Asset?</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginBottom: "3rem", maxWidth: "600px", margin: "0 auto 3rem" }}>
            Join the world's most trusted mining network. List your asset today and connect with thousands of qualified global buyers.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/sell" className="btn btn-primary btn-xl">
              List an Asset Free <ArrowRight size={18} />
            </Link>
            <Link href="/list" className="btn btn-ghost btn-xl" style={{ border: "2px solid var(--border)" }}>
              Browse Listings
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
