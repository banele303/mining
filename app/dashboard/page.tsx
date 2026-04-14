'use client';

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import Link from "next/link";
import { Plus, Eye, Trash2, Edit, MapPin, DollarSign, BarChart2, Layers } from "lucide-react";

const TABS = ["My Listings", "Saved Listings", "Profile"];

function formatPrice(min?: number, max?: number) {
  const fmt = (n: number) => {
    if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    return `$${n.toLocaleString()}`;
  };
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return "On Application";
}

export default function DashboardPage() {
  const [tab, setTab] = useState(0);

  // For demo — show all listings as "my listings"
  const listings = useQuery(api.listings.getListings, {});

  const stats = listings
    ? {
        total: listings.length,
        active: listings.filter((l) => l.status === "active").length,
        sold: listings.filter((l) => l.status === "sold").length,
        views: listings.reduce((sum, l) => sum + l.views, 0),
      }
    : { total: 0, active: 0, sold: 0, views: 0 };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      {/* Header */}
      <div style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)", padding: "2.5rem 0 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), var(--primary-light))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", fontWeight: 700, color: "#fff" }}>
                J
              </div>
              <div>
                <h1 style={{ fontSize: "1.4rem", marginBottom: "0.1rem" }}>John Smith</h1>
                <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>Mining Corp Ltd. · Seller & Buyer</p>
              </div>
            </div>
            <Link href="/sell" className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Plus size={16} /> List an Asset
            </Link>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.5rem" }} className="dash-stats">
            {[
              { icon: <Layers size={18} />, label: "Total Listings", value: stats.total },
              { icon: <BarChart2 size={18} />, label: "Active", value: stats.active, color: "#22C55E" },
              { icon: <DollarSign size={18} />, label: "Sold", value: stats.sold, color: "#F59E0B" },
              { icon: <Eye size={18} />, label: "Total Views", value: stats.views.toLocaleString() },
            ].map((s) => (
              <div key={s.label} style={{ background: "var(--bg-surface-2)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <div style={{ color: s.color || "var(--primary-light)" }}>{s.icon}</div>
                <div>
                  <p style={{ fontSize: "1.3rem", fontWeight: 800, color: s.color || "var(--text-primary)", lineHeight: 1.1 }}>{listings === undefined ? "..." : s.value}</p>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "0" }}>
            {TABS.map((t, i) => (
              <button
                key={t}
                id={`dashboard-tab-${t.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setTab(i)}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "none",
                  border: "none",
                  borderBottom: `2px solid ${tab === i ? "var(--primary)" : "transparent"}`,
                  color: tab === i ? "var(--primary-light)" : "var(--text-muted)",
                  fontWeight: tab === i ? 700 : 400,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all var(--transition)",
                }}
              >{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ padding: "2rem 1.5rem" }}>
        {/* MY LISTINGS */}
        {tab === 0 && (
          <div>
            {listings === undefined ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: "80px", borderRadius: "var(--radius-lg)" }} />)}
              </div>
            ) : listings.length === 0 ? (
              <div className="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
                <h3 style={{ marginBottom: "0.5rem" }}>No listings yet</h3>
                <p>Create your first mining asset listing to get started.</p>
                <Link href="/sell" className="btn btn-primary" style={{ marginTop: "1.5rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                  <Plus size={16} /> List an Asset
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {/* Table header */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 140px 120px 80px 100px 120px",
                  gap: "1rem",
                  padding: "0.75rem 1.25rem",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--text-muted)",
                  background: "var(--bg-surface)",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                }} className="dash-table">
                  <span>Title</span>
                  <span>Commodity</span>
                  <span>Location</span>
                  <span>Views</span>
                  <span>Status</span>
                  <span>Actions</span>
                </div>

                {listings.map((listing) => (
                  <div
                    key={listing._id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 140px 120px 80px 100px 120px",
                      gap: "1rem",
                      alignItems: "center",
                      padding: "1rem 1.25rem",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-lg)",
                      transition: "all var(--transition)",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-light)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                    className="dash-table"
                  >
                    {/* Title */}
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)", marginBottom: "0.2rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "280px" }}>
                        {listing.title}
                      </p>
                      <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{listing.stage}</p>
                    </div>

                    {/* Commodity */}
                    <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{listing.commodity}</p>

                    {/* Location */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <MapPin size={12} color="var(--text-muted)" />
                      <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{listing.country}</p>
                    </div>

                    {/* Views */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Eye size={12} color="var(--text-muted)" />
                      <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{listing.views}</p>
                    </div>

                    {/* Status */}
                    <span className={`badge ${listing.status === "sold" ? "badge-sold" : listing.status === "pending" ? "badge-pending" : "badge-active"}`}>
                      {listing.status}
                    </span>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <Link href={`/listing/${listing._id}`} className="btn btn-ghost btn-sm" style={{ padding: "0.35rem 0.6rem" }} title="View">
                        <Eye size={13} />
                      </Link>
                      <button className="btn btn-ghost btn-sm" style={{ padding: "0.35rem 0.6rem" }} title="Edit">
                        <Edit size={13} />
                      </button>
                      <button className="btn btn-ghost btn-sm" style={{ padding: "0.35rem 0.6rem", color: "#F87171" }} title="Delete">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SAVED LISTINGS */}
        {tab === 1 && (
          <div className="empty-state" style={{ paddingTop: "4rem" }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
            <h3 style={{ marginBottom: "0.5rem" }}>No saved listings yet</h3>
            <p>Bookmark assets you're interested in to track them here.</p>
            <Link href="/list" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>Browse Listings</Link>
          </div>
        )}

        {/* PROFILE */}
        {tab === 2 && (
          <div style={{ maxWidth: "600px" }}>
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h2 style={{ fontSize: "1.1rem" }}>Profile Settings</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div><label className="label">Full Name</label><input className="input" defaultValue="John Smith" /></div>
                <div><label className="label">Company</label><input className="input" defaultValue="Mining Corp Ltd." /></div>
              </div>
              <div><label className="label">Email</label><input type="email" className="input" defaultValue="john@miningcorp.com" /></div>
              <div><label className="label">Phone</label><input className="input" placeholder="+1 555 000 0000" /></div>
              <div><label className="label">Role</label>
                <select className="select" defaultValue="both">
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="both">Buyer & Seller</option>
                </select>
              </div>
              <button className="btn btn-primary" style={{ alignSelf: "flex-start" }}>Save Changes</button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dash-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .dash-table { grid-template-columns: 1fr auto auto !important; }
        }
        @media (max-width: 540px) {
          .dash-stats { grid-template-columns: 1fr 1fr !important; }
          .dash-table { grid-template-columns: 1fr auto !important; }
        }
      `}</style>
    </div>
  );
}
