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

export default function ExplorePage() {
  const listings = useQuery(api.listings.getListingsForMap);
  const [selected, setSelected] = useState<MapListing | null>(null);
  const [sectorFilter, setSectorFilter] = useState("");

  const sectors = Object.keys(SECTOR_COLORS);

  const filtered = listings
    ? listings.filter((l) => (!sectorFilter || l.commoditySector === sectorFilter) && l.latitude && l.longitude)
    : [];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)", padding: "1.5rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h1 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>🗺️ Explore Mining Assets</h1>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
                {filtered.length} assets plotted across the globe
              </p>
            </div>
            <Link href="/list" className="btn btn-ghost">← Back to List</Link>
          </div>

          {/* Sector filter pills */}
          <div className="scroll-x" style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", paddingBottom: "0.25rem" }}>
            <button
              className={`pill-btn ${!sectorFilter ? "active" : ""}`}
              onClick={() => setSectorFilter("")}
              style={!sectorFilter ? { background: "var(--primary)", borderColor: "var(--primary)", color: "#fff" } : {}}
            >
              All Sectors
            </button>
            {sectors.map((s) => (
              <button
                key={s}
                className="pill-btn"
                onClick={() => setSectorFilter(sectorFilter === s ? "" : s)}
                style={sectorFilter === s ? { background: SECTOR_COLORS[s], borderColor: SECTOR_COLORS[s], color: "#fff" } : {}}
              >
                {SECTOR_ICONS[s]} {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map + Sidebar */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 340px", overflow: "hidden", minHeight: "calc(100vh - 200px)" }} className="explore-grid">
        {/* Map */}
        <div style={{ position: "relative", background: "#0A1628", overflow: "hidden" }}>
          {listings === undefined ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Loading map data...
            </div>
          ) : (
            <svg
              viewBox="0 0 900 440"
              width="100%"
              height="100%"
              style={{ display: "block" }}
            >
              {/* Ocean */}
              <rect width="900" height="440" fill="#0A1628" />

              {/* Simplified continent shapes */}
              {/* North America */}
              <path d="M 80 60 L 230 45 L 260 70 L 275 95 L 265 145 L 245 175 L 220 215 L 200 240 L 175 230 L 155 240 L 130 225 L 105 200 L 90 165 L 70 130 L 65 90 Z" fill="#1a2a3a" stroke="#2a3a4a" strokeWidth="0.8" />
              {/* Central America */}
              <path d="M 175 240 L 195 260 L 185 280 L 175 270 Z" fill="#1a2a3a" stroke="#2a3a4a" strokeWidth="0.8" />
              {/* South America */}
              <path d="M 185 280 L 255 270 L 285 305 L 295 360 L 285 410 L 255 430 L 225 425 L 200 400 L 185 360 L 175 310 Z" fill="#1a2a3a" stroke="#2a3a4a" strokeWidth="0.8" />
              {/* Greenland */}
              <path d="M 245 20 L 300 15 L 310 40 L 295 60 L 265 55 L 248 38 Z" fill="#1a2a3a" stroke="#2a3a4a" strokeWidth="0.8" />
              {/* Europe */}
              <path d="M 410 55 L 465 45 L 485 65 L 490 90 L 475 110 L 455 120 L 430 115 L 415 100 L 405 80 Z" fill="#1a2a3a" stroke="#2a3a4a" strokeWidth="0.8" />
              {/* UK */}
              <path d="M 392 62 L 405 58 L 408 75 L 398 80 Z" fill="#1a2a3a" stroke="#2a3a4a" strokeWidth="0.8" />
              {/* Scandinavia */}
              <path d="M 440 30 L 470 25 L 468 55 L 450 65 L 438 50 Z" fill="#1a2a3a" stroke="#2a3a4a" strokeWidth="0.8" />
              {/* Africa */}
              <path d="M 415 140 L 490 120 L 525 145 L 545 185 L 548 240 L 535 295 L 515 340 L 490 365 L 460 360 L 435 335 L 415 290 L 405 240 L 405 190 Z" fill="#1a2a3a" stroke="#2a3a4a" strokeWidth="0.8" />
              {/* Middle East */}
              <path d="M 490 115 L 540 100 L 560 120 L 555 145 L 525 145 L 495 140 Z" fill="#1a2a3a" stroke="#2a3a4a" strokeWidth="0.8" />
              {/* Asia (simplified) */}
              <path d="M 490 45 L 700 35 L 740 65 L 760 100 L 755 150 L 720 185 L 670 200 L 610 195 L 555 180 L 540 145 L 555 100 L 540 75 L 490 90 Z" fill="#1a2a3a" stroke="#2a3a4a" strokeWidth="0.8" />
              {/* India */}
              <path d="M 600 165 L 640 155 L 660 195 L 640 235 L 615 225 L 598 195 Z" fill="#1a2a3a" stroke="#2a3a4a" strokeWidth="0.8" />
              {/* SE Asia */}
              <path d="M 690 185 L 740 175 L 760 205 L 745 225 L 715 220 L 695 205 Z" fill="#1a2a3a" stroke="#2a3a4a" strokeWidth="0.8" />
              {/* Russia / Siberia */}
              <path d="M 490 20 L 880 10 L 890 75 L 780 90 L 740 65 L 700 35 L 490 45 Z" fill="#1a2a3a" stroke="#2a3a4a" strokeWidth="0.8" />
              {/* Japan */}
              <path d="M 770 95 L 785 85 L 795 100 L 783 115 Z" fill="#1a2a3a" stroke="#2a3a4a" strokeWidth="0.8" />
              {/* Australia */}
              <path d="M 690 285 L 800 270 L 840 295 L 855 340 L 840 390 L 800 410 L 755 405 L 718 380 L 695 345 L 682 305 Z" fill="#1a2a3a" stroke="#2a3a4a" strokeWidth="0.8" />
              {/* New Zealand */}
              <path d="M 855 355 L 868 345 L 875 370 L 862 382 Z" fill="#1a2a3a" stroke="#2a3a4a" strokeWidth="0.8" />

              {/* Asset dots */}
              {filtered.map((listing) => {
                const { x, y } = latLngToXY(listing.latitude!, listing.longitude!);
                const color = SECTOR_COLORS[listing.commoditySector] || "var(--primary)";
                const isSelected = selected?._id === listing._id;

                return (
                  <g
                    key={listing._id}
                    onClick={() => setSelected(isSelected ? null : listing as MapListing)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Outer ring */}
                    <circle cx={x} cy={y} r={isSelected ? 14 : 10} fill={color} opacity={0.15} />
                    {/* Inner dot */}
                    <circle
                      cx={x} cy={y} r={isSelected ? 6 : 4}
                      fill={color}
                      stroke={isSelected ? "#fff" : color}
                      strokeWidth={isSelected ? 2 : 1}
                      opacity={0.9}
                    />
                  </g>
                );
              })}
            </svg>
          )}

          {/* Legend */}
          <div style={{
            position: "absolute", bottom: "1rem", left: "1rem",
            background: "rgba(7, 11, 20, 0.88)", backdropFilter: "blur(8px)",
            borderRadius: "var(--radius-lg)", padding: "0.875rem",
            border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "0.4rem",
          }}>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Commodity</p>
            {Object.entries(SECTOR_COLORS).slice(0, 5).map(([sector, color]) => (
              <div key={sector} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0 }} />
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{sector}</span>
              </div>
            ))}
          </div>

          {/* Selected popup */}
          {selected && (
            <div style={{
              position: "absolute", top: "1rem", left: "50%", transform: "translateX(-50%)",
              background: "rgba(11, 19, 32, 0.95)", backdropFilter: "blur(12px)",
              borderRadius: "var(--radius-lg)", padding: "1rem 1.25rem",
              border: "1px solid var(--border)", minWidth: "260px", maxWidth: "360px",
              boxShadow: "var(--shadow-elevated)",
              animation: "fadeInUp 0.2s ease",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.72rem", color: SECTOR_COLORS[selected.commoditySector], fontWeight: 700, textTransform: "uppercase" }}>
                  {selected.commoditySector}
                </span>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}>
                  <X size={14} />
                </button>
              </div>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "0.5rem", lineHeight: 1.3 }}>{selected.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", marginBottom: "0.875rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <Layers size={12} /> {selected.commodity}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  <MapPin size={12} /> {selected.country}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "var(--primary-light)", fontWeight: 600 }}>
                  <DollarSign size={12} /> {formatPrice(selected.priceMin, selected.priceMax)}
                </div>
              </div>
              <Link href={`/listing/${selected._id}`} className="btn btn-primary" style={{ width: "100%", display: "block", textAlign: "center", padding: "0.5rem" }}>
                View Listing →
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ background: "var(--bg-surface)", borderLeft: "1px solid var(--border)", overflowY: "auto" }}>
          <div style={{ padding: "1rem", borderBottom: "1px solid var(--border)", position: "sticky", top: 0, background: "var(--bg-surface)", zIndex: 2 }}>
            <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-muted)" }}>
              {filtered.length} assets on map
            </p>
          </div>
          {listings === undefined &&
            [...Array(5)].map((_, i) => (
              <div key={i} style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>
                <div className="skeleton" style={{ height: "14px", width: "80%", marginBottom: "0.5rem" }} />
                <div className="skeleton" style={{ height: "12px", width: "60%" }} />
              </div>
            ))
          }
          {filtered.map((listing) => (
            <div
              key={listing._id}
              onClick={() => setSelected(selected?._id === listing._id ? null : listing as MapListing)}
              style={{
                padding: "1rem",
                borderBottom: "1px solid var(--border)",
                cursor: "pointer",
                background: selected?._id === listing._id ? "rgba(212,132,10,0.06)" : "transparent",
                borderLeft: selected?._id === listing._id ? "2px solid var(--primary)" : "2px solid transparent",
                transition: "all var(--transition)",
              }}
              onMouseEnter={(e) => { if (selected?._id !== listing._id) (e.currentTarget as HTMLElement).style.background = "var(--bg-surface-2)"; }}
              onMouseLeave={(e) => { if (selected?._id !== listing._id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: SECTOR_COLORS[listing.commoditySector] || "var(--primary)", flexShrink: 0 }} />
                <span style={{ fontSize: "0.68rem", color: SECTOR_COLORS[listing.commoditySector] || "var(--primary)", fontWeight: 700, textTransform: "uppercase" }}>
                  {listing.commoditySector}
                </span>
              </div>
              <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.25rem", lineHeight: 1.3 }}>
                {listing.title}
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>📍 {listing.country}</p>
            </div>
          ))}
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
