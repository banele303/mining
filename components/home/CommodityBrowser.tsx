'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const commodities = [
  { icon: "🏆", label: "Precious Metals", description: "Gold, Silver, Platinum, Palladium", color: "#F59E0B", href: "/list?sector=Precious+Metals" },
  { icon: "⚡", label: "Battery Metals", description: "Lithium, Cobalt, Nickel, Graphite", color: "#3B82F6", href: "/list?sector=Battery+Metals" },
  { icon: "🔩", label: "Base Metals", description: "Copper, Zinc, Lead, Tin", color: "#22C55E", href: "/list?sector=Base+Metals" },
  { icon: "📦", label: "Bulk Commodities", description: "Iron Ore, Coal, Manganese", color: "#8B5CF6", href: "/list?sector=Bulk+Commodities" },
  { icon: "🏗️", label: "Industrial Minerals", description: "Potash, Phosphate, Silica, Kaolin", color: "#EF4444", href: "/list?sector=Industrial+Minerals" },
  { icon: "☢️", label: "Energy Metals", description: "Uranium, Thorium, Rare Earths", color: "#F97316", href: "/list?sector=Energy+Metals" },
  { icon: "♻️", label: "Specialty Metals", description: "Vanadium, Tungsten, Molybdenum", color: "#06B6D4", href: "/list?sector=Specialty+Metals" },
  { icon: "☀️", label: "Renewable Energy", description: "Solar, Wind, Geothermal Sites", color: "#84CC16", href: "/list?sector=Renewable+Energy" },
];

export default function CommodityBrowser() {
  return (
    <section className="section" style={{ background: "var(--bg-base)" }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--primary)", marginBottom: "0.5rem" }}>
              Browse by Sector
            </p>
            <h2>Explore Mining Commodities</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "0.5rem", fontSize: "0.95rem" }}>
              Find assets across every commodity sector worldwide
            </p>
          </div>
          <Link href="/list" className="btn btn-ghost" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            View All Assets <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
        }} className="commodity-grid">
          {commodities.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              id={`commodity-${c.label.toLowerCase().replace(/\s+/g, "-")}`}
              style={{ textDecoration: "none" }}
            >
              <div style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "1.5rem",
                transition: "all var(--transition)",
                cursor: "pointer",
                height: "100%",
              }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = c.color + "66";
                  el.style.background = c.color + "0A";
                  el.style.transform = "translateY(-3px)";
                  el.style.boxShadow = `0 8px 32px ${c.color}20`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border)";
                  el.style.background = "var(--bg-card)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                <div style={{
                  width: "48px", height: "48px",
                  background: c.color + "18",
                  borderRadius: "var(--radius)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.5rem",
                  marginBottom: "1rem",
                  border: `1px solid ${c.color}30`,
                }}>
                  {c.icon}
                </div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.35rem", color: "var(--text-primary)" }}>
                  {c.label}
                </h3>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                  {c.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) { .commodity-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 700px) { .commodity-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 420px) { .commodity-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
