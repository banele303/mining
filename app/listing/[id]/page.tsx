'use client';

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin, Layers, Pickaxe, DollarSign, ArrowLeft,
  Mail, Phone, Share2, Bookmark, Eye, ChevronRight, X
} from "lucide-react";

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

function InquiryModal({ listingId, listingTitle, onClose }: { listingId: string; listingTitle: string; onClose: () => void }) {
  const submitInquiry = useMutation(api.listings.submitInquiry);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await submitInquiry({
      listingId: listingId as Id<"listings">,
      senderName: form.name,
      senderEmail: form.email,
      senderPhone: form.phone || undefined,
      message: form.message,
    });
    setSubmitting(false);
    setDone(true);
  };

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="modal">
        <div className="modal-content" style={{ maxWidth: "520px" }}>
          <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{ fontSize: "1.05rem" }}>Make an Inquiry</h3>
            <button onClick={onClose} style={{ background: "var(--bg-surface-2)", border: "1px solid var(--border)", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-secondary)" }}>
              <X size={16} />
            </button>
          </div>

          {done ? (
            <div style={{ padding: "3rem", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <h3 style={{ marginBottom: "0.5rem" }}>Inquiry Sent!</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>The vendor will be in touch shortly.</p>
              <button className="btn btn-primary" onClick={onClose} style={{ marginTop: "1.5rem" }}>Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ background: "rgba(212,132,10,0.06)", border: "1px solid rgba(212,132,10,0.15)", borderRadius: "var(--radius)", padding: "0.75rem 1rem", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                Enquiring about: <span style={{ color: "var(--primary-light)", fontWeight: 600 }}>{listingTitle}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label">Full Name *</label>
                  <input required className="input" placeholder="John Smith" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Email *</label>
                  <input required type="email" className="input" placeholder="john@company.com" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="label">Phone (Optional)</label>
                <input className="input" placeholder="+1 555 000 0000" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
              </div>
              <div>
                <label className="label">Message *</label>
                <textarea required className="textarea" placeholder="I am interested in this asset and would like to know more about..." value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} />
              </div>
              <button type="submit" className="btn btn-primary btn-lg" disabled={submitting} style={{ width: "100%" }}>
                {submitting ? "Sending..." : "Send Inquiry"}
              </button>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
                Your details will only be shared with the asset owner.
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default function ListingDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const listing = useQuery(api.listings.getListingById, { id: id as Id<"listings"> });
  const incrementViews = useMutation(api.listings.incrementViews);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useEffect(() => {
    if (listing) incrementViews({ id: id as Id<"listings"> });
  }, [listing?._id]);

  if (listing === undefined) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-base)", padding: "3rem 0" }}>
        <div className="container">
          <div className="skeleton" style={{ height: "40px", width: "200px", marginBottom: "2rem" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem" }}>
            <div>
              <div className="skeleton" style={{ height: "400px", borderRadius: "var(--radius-lg)", marginBottom: "1.5rem" }} />
              <div className="skeleton" style={{ height: "24px", width: "60%", marginBottom: "1rem" }} />
              <div className="skeleton" style={{ height: "16px", width: "100%", marginBottom: "0.5rem" }} />
              <div className="skeleton" style={{ height: "16px", width: "80%" }} />
            </div>
            <div className="skeleton" style={{ height: "400px", borderRadius: "var(--radius-lg)" }} />
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-base)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⛏️</div>
          <h2>Asset Not Found</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>This listing may have been removed or sold.</p>
          <Link href="/list" className="btn btn-primary">Browse All Assets</Link>
        </div>
      </div>
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
  const icons: Record<string, string> = { "Precious Metals": "🏆", "Battery Metals": "⚡", "Base Metals": "🔩", "Bulk Commodities": "📦", "Energy Metals": "☢️", "Industrial Minerals": "🏗️", "Specialty Metals": "⚙️", "Renewable Energy": "☀️" };
  const imgBg = colors[listing.commoditySector] || "linear-gradient(135deg, #1C2333, #2A3A52)";
  const imgIcon = icons[listing.commoditySector] || "⛏️";

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      {/* Breadcrumb */}
      <div style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)", padding: "0.875rem 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--primary)", display: "inline-block" }} />
          <Link href="/" style={{ color: "var(--text-muted)" }}>Home</Link>
          <ChevronRight size={12} />
          <Link href="/list" style={{ color: "var(--text-muted)" }}>List</Link>
          <ChevronRight size={12} />
          <span style={{ color: "var(--text-secondary)" }}>{listing.title.substring(0, 40)}...</span>
        </div>
      </div>

      <div className="container" style={{ padding: "2.5rem 1.5rem" }}>
        {/* Back button */}
        <Link href="/list" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.5rem", transition: "color var(--transition)" }}
          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"}
          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"}
        >
          <ArrowLeft size={15} /> Back to Listings
        </Link>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2.5rem", alignItems: "start" }} className="detail-grid">
          {/* LEFT COLUMN */}
          <div>
            {/* Hero Image */}
            <div style={{
              background: imgBg,
              borderRadius: "var(--radius-xl)",
              height: "360px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "5rem",
              marginBottom: "2rem",
              position: "relative",
              overflow: "hidden",
              border: "1px solid var(--border)",
            }}>
              {listing.coverImageUrl ? (
                <img 
                  src={listing.coverImageUrl} 
                  alt={listing.title} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              ) : (
                imgIcon
              )}
              {/* Status */}
              <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
                <span className={`badge ${listing.status === "sold" ? "badge-sold" : listing.status === "pending" ? "badge-pending" : "badge-active"}`} style={{ fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "currentColor" }} />
                  {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                </span>
              </div>
              {/* Views */}
              <div style={{ position: "absolute", top: "1rem", right: "1rem", display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", borderRadius: "99px", padding: "0.25rem 0.75rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                <Eye size={12} /> {listing.views.toLocaleString()} views
              </div>
            </div>

            {/* Tags + Title */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.875rem" }}>
              {listing.commodityTags.map((tag) => (
                <span key={tag} className="badge badge-sector">{tag}</span>
              ))}
            </div>
            <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "1.5rem", lineHeight: 1.25 }}>{listing.title}</h1>

            {/* Key stats row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "1.25rem",
              marginBottom: "2rem",
            }} className="stats-row">
              {[
                { icon: <Layers size={16} />, label: "Commodity", value: listing.commodity },
                { icon: <MapPin size={16} />, label: "Location", value: [listing.region, listing.country].filter(Boolean).join(", ") },
                { icon: <Pickaxe size={16} />, label: "Stage", value: listing.stage },
                { icon: <DollarSign size={16} />, label: "Price Range", value: formatPrice(listing.priceMin, listing.priceMax, listing.currency), highlight: true },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{s.label}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: s.highlight ? "var(--primary-light)" : "var(--text-primary)", fontWeight: 600, fontSize: "0.9rem" }}>
                    <span style={{ color: "var(--primary)", flexShrink: 0 }}>{s.icon}</span>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            {listing.description && (
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.15rem", marginBottom: "1rem" }}>About this Asset</h2>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.85, fontSize: "0.95rem" }}>{listing.description}</p>
              </div>
            )}

            {/* Highlights */}
            {listing.highlights && listing.highlights.length > 0 && (
              <div style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "1.5rem",
                marginBottom: "2rem",
              }}>
                <h2 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Key Highlights</h2>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {listing.highlights.map((h, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                      <span style={{ color: "var(--primary)", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Additional details */}
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
              <h2 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Asset Details</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { label: "Continent", value: listing.continent },
                  { label: "Country", value: listing.country },
                  { label: "Region", value: listing.region || "—" },
                  { label: "Project Stage", value: listing.stage },
                  { label: "Intention", value: listing.intention },
                  { label: "Commodity", value: listing.commodity },
                  { label: "Sector", value: listing.commoditySector },
                  { label: "Currency", value: listing.currency },
                ].map((d) => (
                  <div key={d.label} style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{d.label}</span>
                    <span style={{ color: "var(--text-primary)", fontSize: "0.9rem", fontWeight: 500 }}>{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Contact card */}
          <div style={{ position: "sticky", top: "88px" }}>
            <div style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              boxShadow: "var(--shadow-card)",
            }}>
              {/* Price header */}
              <div style={{
                background: "linear-gradient(135deg, rgba(212,132,10,0.15), rgba(245,158,11,0.08))",
                borderBottom: "1px solid var(--border)",
                padding: "1.5rem",
              }}>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Asking Price</p>
                <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary-light)" }}>
                  {formatPrice(listing.priceMin, listing.priceMax, listing.currency)}
                </p>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                  <span className="badge badge-commodity">{listing.intention}</span>
                  <span className="badge badge-commodity">{listing.stage}</span>
                </div>
              </div>

              {/* Vendor info */}
              {listing.ownerName && (
                <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.1rem", fontWeight: 700, color: "#fff", flexShrink: 0,
                  }}>
                    {listing.ownerName.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.9rem" }}>{listing.ownerName}</p>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{listing.ownerCompany || "Verified Vendor"}</p>
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <button
                  id="make-inquiry-btn"
                  className="btn btn-primary btn-lg"
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                  onClick={() => setInquiryOpen(true)}
                >
                  <Mail size={18} /> Make an Inquiry
                </button>
                <button className="btn btn-ghost" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <Bookmark size={16} /> Save this Asset
                </button>
                <button
                  className="btn btn-ghost"
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                >
                  <Share2 size={16} /> Share Listing
                </button>
              </div>

              <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid var(--border)", background: "var(--bg-surface-2)" }}>
                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "center", lineHeight: 1.6 }}>
                  🔒 Your inquiry is confidential. We only share your details with the verified asset owner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {inquiryOpen && (
        <InquiryModal
          listingId={listing._id}
          listingTitle={listing.title}
          onClose={() => setInquiryOpen(false)}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
          .stats-row { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .stats-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
