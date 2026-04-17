'use client';

import Link from "next/link";
import { MapPin, Layers, Pickaxe, DollarSign, ArrowUpRight } from "lucide-react";

type Listing = {
  _id: string;
  title: string;
  commodity: string;
  commoditySector: string;
  commodityTags: string[];
  country: string;
  region?: string;
  stage: string;
  intention: string;
  priceMin?: number;
  priceMax?: number;
  currency: string;
  status: string;
  coverImage?: string;
  images: string[];
  featured: boolean;
};

function formatPrice(min?: number, max?: number, currency = "USD") {
  const symbolMap: Record<string, string> = { ZAR: "R", USD: "$", AUD: "A$", CAD: "C$", GBP: "£", EUR: "€" };
  const symbol = symbolMap[currency] || "$";
  const fmt = (n: number) => {
    if (n >= 1_000_000_000) return `${symbol}${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `${symbol}${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${symbol}${(n / 1_000).toFixed(0)}K`;
    return `${symbol}${n.toLocaleString()}`;
  };
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  if (max) return `Up to ${fmt(max)}`;
  return "Price on Application";
}


function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    active: { label: "Active", className: "badge-active" },
    sold: { label: "Sold", className: "badge-sold" },
    pending: { label: "Pending", className: "badge-pending" },
  };
  const config = map[status] || map.active;
  return (
    <span className={`badge ${config.className}`} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "currentColor", flexShrink: 0 }} />
      {config.label}
    </span>
  );
}

// Placeholder image with mining gradient
function PlaceholderImage({ sector }: { sector: string }) {
  const images: Record<string, string> = {
    "Precious Metals": "/images/gold.png",
    "Battery Metals": "/images/lithium.png",
    "Base Metals": "/images/copper.png",
    "Bulk Commodities": "/images/iron.png",
  };
  const imgPath = images[sector];

  if (imgPath) {
    return (
      <div style={{
        width: "100%", height: "100%",
        backgroundImage: `url("${imgPath}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "transform 0.5s ease",
      }} className="listing-image" />
    );
  }

  const colors: Record<string, string> = {
    "Precious Metals": "linear-gradient(135deg, #78350F, #D97706)",
    "Battery Metals": "linear-gradient(135deg, #1E3A5F, #2563EB)",
    "Base Metals": "linear-gradient(135deg, #064E3B, #059669)",
    "Bulk Commodities": "linear-gradient(135deg, #3B1F6E, #7C3AED)",
    "Energy Metals": "linear-gradient(135deg, #7C2D12, #EA580C)",
    "Industrial Minerals": "linear-gradient(135deg, #1C1917, #57534E)",
    "Specialty Metals": "linear-gradient(135deg, #0C4A6E, #0891B2)",
    "Renewable Energy": "linear-gradient(135deg, #14532D, #16A34A)",
  };
  const bg = colors[sector] || "linear-gradient(135deg, #F1F5F9, #E2E8F0)";
  const icons: Record<string, string> = {
    "Precious Metals": "🏆", "Battery Metals": "⚡", "Base Metals": "🔩",
    "Bulk Commodities": "📦", "Energy Metals": "☢️", "Industrial Minerals": "🏗️",
    "Specialty Metals": "⚙️", "Renewable Energy": "☀️",
  };
  return (
    <div style={{
      width: "100%", height: "100%",
      background: bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "2.5rem",
    }}>
      {icons[sector] || "⛏️"}
    </div>
  );
}

export default function ListingCard({ listing }: { listing: Listing }) {
  const price = formatPrice(listing.priceMin, listing.priceMax, listing.currency);
  const location = [listing.region, listing.country].filter(Boolean).join(", ");

  return (
    <Link href={`/listing/${listing._id}`} style={{ textDecoration: "none", display: "block" }}>
      <article
        id={`listing-${listing._id}`}
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "var(--shadow-card)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.transform = "translateY(-6px)";
          el.style.borderColor = "var(--primary)";
          el.style.boxShadow = "var(--shadow-elevated), 0 0 20px rgba(212,132,10,0.15)";
          const img = el.querySelector('.listing-image') as HTMLElement;
          if (img) img.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.transform = "translateY(0)";
          el.style.borderColor = "var(--border)";
          el.style.boxShadow = "var(--shadow-card)";
          const img = el.querySelector('.listing-image') as HTMLElement;
          if (img) img.style.transform = "scale(1)";
        }}
      >
        {/* Image wrapper with padding */}
        <div style={{ padding: "0.75rem", paddingBottom: 0 }}>
          <div style={{ 
            position: "relative", 
            height: "220px", 
            overflow: "hidden", 
            flexShrink: 0,
            borderRadius: "var(--radius)",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)",
          }}>
            {listing.images && listing.images.length > 0 ? (
              <img 
                src={listing.images[0]} 
                alt={listing.title} 
                className="listing-image"
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
              />
            ) : listing.coverImage ? (
              <img 
                src={listing.coverImage} 
                alt={listing.title} 
                className="listing-image"
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
              />
            ) : (
              <PlaceholderImage sector={listing.commoditySector} />
            )}

            {/* Status badge */}
            <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem" }}>
              <StatusBadge status={listing.status} />
            </div>

            {/* Featured badge */}
            {listing.featured && (
              <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}>
                <span className="badge" style={{ background: "rgba(212,132,10,0.9)", color: "#fff", backdropFilter: "blur(4px)" }}>
                  ⭐ Featured
                </span>
              </div>
            )}

            {/* Intention badge */}
            <div style={{ position: "absolute", bottom: "0.75rem", right: "0.75rem" }}>
              <span style={{
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(4px)",
                color: "var(--text-secondary)",
                fontSize: "0.7rem",
                fontWeight: 600,
                padding: "0.2rem 0.5rem",
                borderRadius: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>{listing.intention}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {/* Sector tags */}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {listing.commodityTags.slice(0, 2).map((tag) => (
              <span key={tag} className="badge badge-sector" style={{ fontSize: "0.68rem" }}>{tag}</span>
            ))}
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: "0.975rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {listing.title}
          </h3>

          {/* Meta rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
            <MetaRow icon={<Layers size={14} />} value={listing.commodity} />
            <MetaRow icon={<MapPin size={14} />} value={location} />
            <MetaRow icon={<Pickaxe size={14} />} value={listing.stage} />
            <MetaRow icon={<DollarSign size={14} />} value={price} highlight />
          </div>

          {/* View details */}
          <div style={{
            display: "flex", alignItems: "center", gap: "0.25rem",
            color: "var(--primary-light)",
            fontSize: "0.82rem",
            fontWeight: 600,
            marginTop: "0.25rem",
          }}>
            View Details <ArrowUpRight size={14} />
          </div>
        </div>
      </article>
    </Link>
  );
}

function MetaRow({ icon, value, highlight }: { icon: React.ReactNode; value: string; highlight?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span style={{ color: highlight ? "var(--primary)" : "var(--text-muted)", flexShrink: 0 }}>{icon}</span>
      <span style={{
        fontSize: "0.82rem",
        color: highlight ? "var(--primary-light)" : "var(--text-secondary)",
        fontWeight: highlight ? 700 : 400,
      }}>{value}</span>
    </div>
  );
}
