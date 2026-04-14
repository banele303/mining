'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Layers, DollarSign, X } from "lucide-react";

const SECTOR_COLORS: Record<string, string> = {
  "Precious Metals": "#F59E0B",
  "Battery Metals": "#3B82F6",
  "Base Metals": "#22C55E",
  "Bulk Commodities": "#8B5CF6",
  "Energy Metals": "#F97316",
  "Industrial Minerals": "#78716C",
  "Specialty Metals": "#06B6D4",
  "Renewable Energy": "#84CC16",
};

const SECTOR_ICONS: Record<string, string> = {
  "Precious Metals": "🏆",
  "Battery Metals": "⚡",
  "Base Metals": "🔩",
  "Bulk Commodities": "📦",
  "Energy Metals": "☢️",
  "Industrial Minerals": "🏗️",
  "Specialty Metals": "⚙️",
  "Renewable Energy": "☀️",
};

type MapListing = {
  _id: string;
  title: string;
  latitude?: number;
  longitude?: number;
  commodity: string;
  commoditySector: string;
  country: string;
  priceMin?: number;
  priceMax?: number;
};

function formatPrice(min?: number, max?: number) {
  const fmt = (n: number) => {
    if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    return `$${n.toLocaleString()}`;
  };
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return "Price on Application";
}

// Convert lat/lng to SVG viewBox 0 0 900 440 proportions
function latLngToXY(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * 900;
  const y = ((90 - lat) / 180) * 440;
  return { x, y };
}

import RealMap from "@/components/maps/RealMap";

export default function ExplorePage() {
  const listings = useQuery(api.listings.getListingsForMap);
  const [sectorFilter, setSectorFilter] = useState("");

  const sectors = Object.keys(SECTOR_COLORS);

  const filtered = (listings || [])
    .filter((l) => (!sectorFilter || l.commoditySector === sectorFilter) && l.latitude && l.longitude);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: "#020617", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "2rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h1 style={{ fontSize: "1.75rem", marginBottom: "0.25rem", color: "white", fontWeight: 900 }}>🌍 Africa Live GIS</h1>
              <p style={{ color: "#64748b", fontSize: "0.95rem", fontWeight: 500 }}>
                Monitoring {filtered.length} active mining projects across the continent
              </p>
            </div>
            <Link href="/" className="btn btn-ghost" style={{ color: "white", borderColor: "rgba(255,255,255,0.1)" }}>← Close Gateway</Link>
          </div>

          {/* Sector filter pills */}
          <div className="scroll-x" style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem", paddingBottom: "0.25rem" }}>
            <button
              className={`pill-btn ${!sectorFilter ? "active" : ""}`}
              onClick={() => setSectorFilter("")}
              style={!sectorFilter ? { background: "var(--primary)", borderColor: "var(--primary)", color: "#fff" } : { color: "#94a3b8", background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}
            >
              Universal View
            </button>
            {sectors.map((s) => (
              <button
                key={s}
                className="pill-btn"
                onClick={() => setSectorFilter(sectorFilter === s ? "" : s)}
                style={sectorFilter === s ? { background: SECTOR_COLORS[s], borderColor: SECTOR_COLORS[s], color: "#fff" } : { color: "#94a3b8", background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}
              >
                {SECTOR_ICONS[s]} {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Implementation */}
      <div style={{ flex: 1, position: "relative" }}>
        <RealMap listings={filtered as any[]} height="calc(100vh - 180px)" />
        
        {/* Floating Sidebar/Overlay (Simplified) */}
        <div style={{ 
          position: "absolute", 
          top: "1.5rem", 
          right: "1.5rem", 
          width: "320px", 
          maxHeight: "80vh",
          background: "rgba(15, 23, 42, 0.9)", 
          backdropFilter: "blur(12px)", 
          border: "1px solid rgba(255,255,255,0.1)", 
          borderRadius: "1.25rem",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }} className="hidden md:flex">
          <div style={{ padding: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
             <p style={{ color: "white", fontWeight: 800, fontSize: "0.95rem" }}>Active Operations</p>
             <p style={{ color: "#64748b", fontSize: "0.75rem", fontWeight: 600 }}>Real-time satellite tracking</p>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "0.5rem" }}>
            {filtered.slice(0, 20).map((l) => (
              <Link 
                href={`/listing/${l._id}`} 
                key={l._id}
                style={{ 
                  display: "block", 
                  padding: "0.875rem 1rem", 
                  borderRadius: "0.75rem", 
                  textDecoration: "none",
                  transition: "all 0.2s"
                }}
                className="hover:bg-white/5"
              >
                <p style={{ color: "white", fontSize: "0.825rem", fontWeight: 700, marginBottom: "2px" }}>{l.title}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: SECTOR_COLORS[l.commoditySector] }} />
                  <p style={{ color: "#64748b", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase" }}>{l.country}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .explore-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
