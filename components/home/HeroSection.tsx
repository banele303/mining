'use client';

import Link from "next/link";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export default function HeroSection() {
  const [query, setQuery] = useState("");

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      marginTop: "-68px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      background: "#070B14", // Dark background for hero section
    }}>
      {/* Background Image with Overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: 'url("/images/hero_dark.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.45, // Much clearer as requested
      }} />

      {/* Dark Gradient Overlay for readability */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, rgba(7, 11, 20, 0.7) 0%, rgba(7, 11, 20, 0.3) 50%, rgba(7, 11, 20, 0.8) 100%)",
        pointerEvents: "none",
      }} />

      {/* Grid texture overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(212,132,10,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,132,10,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
        opacity: 0.3,
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "4rem 1.5rem" }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "rgba(212,132,10,0.15)",
          border: "1px solid rgba(212,132,10,0.3)",
          borderRadius: "99px",
          padding: "0.4rem 1.25rem",
          fontSize: "0.85rem",
          fontWeight: 700,
          color: "var(--primary-light)",
          marginBottom: "2rem",
          animation: "fadeInUp 0.5s ease both",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--primary-light)", display: "inline-block", animation: "ping-dot 2s infinite" }} />
          #1 Southern Africa Mining Hub
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: "-0.04em",
          color: "#FFFFFF",
          marginBottom: "1.5rem",
          animation: "fadeInUp 0.6s ease 0.1s both",
          textShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}>
          Gateway to the SADC<br />
          <span className="text-gold">Mining Corridor</span>
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)",
          color: "rgba(255, 255, 255, 0.85)",
          maxWidth: "700px",
          margin: "0 auto 3.5rem",
          lineHeight: 1.6,
          fontWeight: 500,
          animation: "fadeInUp 0.6s ease 0.2s both",
        }}>
          The dedicated marketplace for verified mining assets across the SADC belts. Transact with confidence in Southern Africa's most active resource sectors.
        </p>

        {/* Search Bar */}
        <div style={{
          display: "flex",
          maxWidth: "800px",
          margin: "0 auto 3.5rem",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "var(--radius-xl)",
          padding: "0.75rem",
          backdropFilter: "blur(24px)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          animation: "fadeInUp 0.6s ease 0.3s both",
        }}>
          <div style={{ display: "flex", alignItems: "center", flex: 1, gap: "1rem", padding: "0 1.5rem" }}>
            <Search size={22} color="rgba(255,255,255,0.6)" strokeWidth={2} style={{ flexShrink: 0 }} />
            <input
              id="hero-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search assets in SA, Namibia, Botswana..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#FFFFFF",
                fontSize: "1.1rem",
                fontFamily: "inherit",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  window.location.href = `/list?search=${encodeURIComponent(query)}`;
                }
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link href="/list" className="btn btn-primary" style={{ borderRadius: "var(--radius-lg)", padding: "0.8rem 2.5rem", fontSize: "1rem" }}>
              Search
            </Link>
          </div>
        </div>

        {/* Stats Pills - Dark Style */}
        <div style={{
          display: "flex",
          gap: "1.25rem",
          justifyContent: "center",
          flexWrap: "wrap",
          animation: "fadeInUp 0.6s ease 0.4s both",
        }}>
          {[
            { value: "R150B+", label: "Assets Listed" },
            { value: "8", label: "Regional Nations" },
            { value: "4,200+", label: "Verified Projects" },
            { value: "9,000+", label: "Stakeholders" },
          ].map((s) => (
            <div key={s.label} style={{
              display: "flex", alignItems: "center", gap: "0.6rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "99px",
              padding: "0.5rem 1.25rem",
              backdropFilter: "blur(8px)",
            }}>
              <span style={{ fontWeight: 800, color: "var(--primary-light)", fontSize: "1rem" }}>{s.value}</span>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", fontWeight: 500 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade into white background */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "150px",
        background: "linear-gradient(to bottom, transparent, #FFFFFF)",
        pointerEvents: "none",
      }} />
    </section>
  );
}
