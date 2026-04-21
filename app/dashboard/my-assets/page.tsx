'use client';

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import {
  Plus, Layers, ArrowUpRight, MapPin, Eye, Pencil, Trash2,
  X, CheckCircle, AlertTriangle, DollarSign, Tag, Globe,
} from "lucide-react";
import ImageUploader from "@/components/ui/ImageUploader";

type Listing = {
  _id: Id<"listings">;
  title: string;
  status: string;
  coverImage?: string;
  country: string;
  region?: string;
  priceMin?: number;
  priceMax?: number;
  views: number;
  stage: string;
  intention: string;
  description: string;
  featured: boolean;
  ownerPhone?: string;
  phoneNumber?: string;
  images: string[];
};

// ─── Edit Modal ───────────────────────────────────────────────────────────────
function EditModal({ listing, onClose }: { listing: Listing; onClose: () => void }) {
  const updateListing = useMutation(api.listings.updateListing);
  const updateListingImages = useMutation(api.listings.updateListingImages);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [images, setImages] = useState<string[]>(listing.images || (listing.coverImage ? [listing.coverImage] : []));
  const [form, setForm] = useState({
    title: listing.title,
    description: listing.description,
    status: listing.status,
    stage: listing.stage,
    intention: listing.intention,
    country: listing.country,
    region: listing.region ?? "",
    priceMin: listing.priceMin?.toString() ?? "",
    priceMax: listing.priceMax?.toString() ?? "",
    ownerPhone: listing.ownerPhone ?? listing.phoneNumber ?? "",
    featured: listing.featured,
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        updateListing({
          id: listing._id,
          title: form.title,
          description: form.description,
          status: form.status,
          stage: form.stage,
          intention: form.intention,
          country: form.country,
          region: form.region || undefined,
          priceMin: form.priceMin ? Number(form.priceMin) : undefined,
          priceMax: form.priceMax ? Number(form.priceMax) : undefined,
          ownerPhone: form.ownerPhone || undefined,
          featured: form.featured,
        }),
        images.length > 0
          ? updateListingImages({ id: listing._id, images, coverImage: images[0] })
          : Promise.resolve(),
      ]);
      setSaved(true);
      setTimeout(onClose, 800);
    } finally {
      setSaving(false);
    }
  };

  const field = (label: string, key: keyof typeof form, type = "text", opts?: string[]) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</label>
      {opts ? (
        <select
          value={form[key] as string}
          onChange={(e) => setForm(p => ({ ...p, [key]: e.target.value }))}
          style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "0.6rem 0.875rem", fontSize: "0.875rem", fontFamily: "inherit", color: "#0F172A", outline: "none" }}
        >
          {opts.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input
          type={type}
          value={form[key] as string}
          onChange={(e) => setForm(p => ({ ...p, [key]: e.target.value }))}
          style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "0.6rem 0.875rem", fontSize: "0.875rem", fontFamily: "inherit", color: "#0F172A", outline: "none" }}
        />
      )}
    </div>
  );

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, backdropFilter: "blur(4px)" }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        zIndex: 201, background: "#fff", borderRadius: "20px",
        width: "min(640px, 95vw)", maxHeight: "88vh",
        display: "flex", flexDirection: "column",
        boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A" }}>Edit Asset</h2>
            <p style={{ fontSize: "0.8rem", color: "#64748B", marginTop: "0.1rem" }}>Changes saved immediately to the live listing.</p>
          </div>
          <button onClick={onClose} style={{ background: "#F1F5F9", border: "none", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <X size={16} color="#64748B" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "1.75rem 2rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.1rem", flex: 1 }}>
          {field("Title", "title")}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em" }}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
              rows={3}
              style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "0.6rem 0.875rem", fontSize: "0.875rem", fontFamily: "inherit", color: "#0F172A", outline: "none", resize: "vertical" }}
            />
          </div>

          {/* Image uploader */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em" }}>Photos</label>
            <p style={{ fontSize: "0.75rem", color: "#94A3B8", marginBottom: "0.25rem" }}>First image becomes the cover photo. Drag to reorder.</p>
            <ImageUploader value={images} onChange={setImages} maxFiles={15} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {field("Status", "status", "text", ["active", "pending", "sold", "draft"])}
            {field("Stage", "stage", "text", ["Exploration", "Advanced Exploration", "Development", "Production", "Care & Maintenance"])}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {field("Intention", "intention", "text", ["Sell", "Buy", "Joint Venture", "Farm-In/Out", "Lease"])}
            {field("Country", "country")}
          </div>
          {field("Region / Province", "region")}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {field("Min Price (R)", "priceMin", "number")}
            {field("Max Price (R)", "priceMax", "number")}
          </div>
          {field("Phone Number", "ownerPhone", "tel")}

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1rem", background: "rgba(254,243,199,0.35)", border: "1px solid #FEF3C7", borderRadius: "10px", marginTop: "0.5rem" }}>
            <input
              type="checkbox"
              id="edit-featured"
              checked={form.featured}
              onChange={(e) => setForm(p => ({ ...p, featured: e.target.checked }))}
              style={{ width: "1.1rem", height: "1.1rem", cursor: "pointer" }}
            />
            <label htmlFor="edit-featured" style={{ fontSize: "0.85rem", fontWeight: 700, color: "#92400E", cursor: "pointer" }}>
              ⭐ Featured Listing (Homepage)
            </label>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "1.25rem 2rem", borderTop: "1px solid #E2E8F0", display: "flex", justifyContent: "flex-end", gap: "0.75rem", background: "#FAFAFA" }}>
          <button onClick={onClose} style={{ padding: "0.6rem 1.25rem", borderRadius: "8px", border: "1px solid #E2E8F0", background: "#fff", fontFamily: "inherit", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", color: "#64748B" }}>
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ padding: "0.6rem 1.5rem", borderRadius: "8px", border: "none", background: saved ? "#10B981" : "linear-gradient(135deg,#10B981,#34D399)", color: "#fff", fontFamily: "inherit", fontSize: "0.875rem", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "0.4rem", opacity: saving ? 0.7 : 1, transition: "all 0.2s" }}
          >
            {saved ? <><CheckCircle size={15} /> Saved!</> : saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteModal({ listing, onClose }: { listing: Listing; onClose: () => void }) {
  const deleteListing = useMutation(api.listings.deleteListing);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await deleteListing({ id: listing._id });
    onClose();
  };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, backdropFilter: "blur(4px)" }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        zIndex: 201, background: "#fff", borderRadius: "20px",
        width: "min(440px, 92vw)", padding: "2rem",
        boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ width: "56px", height: "56px", background: "#FEF2F2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <AlertTriangle size={24} color="#EF4444" />
          </div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.5rem" }}>Delete Asset?</h2>
          <p style={{ fontSize: "0.875rem", color: "#64748B", lineHeight: 1.6 }}>
            <strong style={{ color: "#0F172A" }}>{listing.title}</strong> will be permanently removed from the platform. This cannot be undone.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "0.7rem", borderRadius: "10px", border: "1px solid #E2E8F0", background: "#fff", fontFamily: "inherit", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", color: "#64748B" }}>
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{ flex: 1, padding: "0.7rem", borderRadius: "10px", border: "none", background: "#EF4444", color: "#fff", fontFamily: "inherit", fontSize: "0.875rem", fontWeight: 700, cursor: deleting ? "not-allowed" : "pointer", opacity: deleting ? 0.7 : 1 }}
          >
            {deleting ? "Deleting…" : "Yes, Delete"}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────
const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  active: { bg: "#D1FAE5", color: "#065F46" },
  pending: { bg: "#FEF3C7", color: "#92400E" },
  sold: { bg: "#DBEAFE", color: "#1E40AF" },
  draft: { bg: "#F1F5F9", color: "#475569" },
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MyAssetsPage() {
  const listings = useQuery(api.listings.getListings, { status: "all" });
  const [editTarget, setEditTarget] = useState<Listing | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Listing | null>(null);

  const total = listings?.length ?? 0;
  const active = listings?.filter(l => l.status === "active").length ?? 0;
  const sold = listings?.filter(l => l.status === "sold").length ?? 0;
  const totalViews = listings?.reduce((s, l) => s + l.views, 0) ?? 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>Asset Portfolio</h1>
          <p style={{ fontSize: "0.875rem", color: "#64748B", marginTop: "0.25rem" }}>Manage, edit, and track all your listed assets.</p>
        </div>
        <Link
          href="/dashboard/list-asset"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1.25rem", background: "#0F172A", color: "#fff", borderRadius: "10px", fontSize: "0.875rem", fontWeight: 700, textDecoration: "none" }}
        >
          <Plus size={16} /> List New Asset
        </Link>
      </div>

      {/* Stats bar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1px", background: "#E2E8F0", borderRadius: "12px", overflow: "hidden", border: "1px solid #E2E8F0" }}>
        {[
          { label: "Total Assets", value: total, icon: Layers, color: "#0F172A" },
          { label: "Active", value: active, icon: CheckCircle, color: "#10B981" },
          { label: "Sold", value: sold, icon: Tag, color: "#3B82F6" },
          { label: "Total Views", value: totalViews.toLocaleString(), icon: Eye, color: "#8B5CF6" },
        ].map((s) => (
          <div key={s.label} style={{ flex: "1 1 120px", background: "#fff", padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#64748B", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              <s.icon size={13} color={s.color} />
              {s.label}
            </div>
            <span style={{ fontSize: "1.5rem", fontWeight: 900, color: s.color, lineHeight: 1 }}>{listings === undefined ? "—" : s.value}</span>
          </div>
        ))}
      </div>

      {/* Asset Grid */}
      {listings === undefined ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ background: "#F8FAFC", borderRadius: "14px", overflow: "hidden", border: "1px solid #E2E8F0" }}>
              <div style={{ height: "160px", background: "#F1F5F9", animation: "pulse 1.5s infinite" }} />
              <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ height: "14px", background: "#E2E8F0", borderRadius: "6px", width: "70%" }} />
                <div style={{ height: "12px", background: "#E2E8F0", borderRadius: "6px", width: "50%" }} />
              </div>
            </div>
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div style={{ background: "#FAFAFA", border: "2px dashed #E2E8F0", borderRadius: "16px", padding: "4rem 2rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <div style={{ width: "56px", height: "56px", background: "#F1F5F9", border: "1px solid #E2E8F0", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Layers size={24} color="#94A3B8" />
          </div>
          <div>
            <p style={{ fontSize: "1rem", fontWeight: 700, color: "#0F172A" }}>No assets yet</p>
            <p style={{ fontSize: "0.875rem", color: "#64748B", marginTop: "0.25rem" }}>Start building your portfolio by listing your first asset.</p>
          </div>
          <Link href="/dashboard/list-asset" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.65rem 1.5rem", background: "#0F172A", color: "#fff", borderRadius: "10px", fontSize: "0.875rem", fontWeight: 700, textDecoration: "none", marginTop: "0.5rem" }}>
            <Plus size={16} /> List First Asset
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {listings.map((l) => {
            const statusStyle = STATUS_COLORS[l.status] ?? STATUS_COLORS.draft;
            return (
              <div key={l._id} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", transition: "box-shadow 0.2s" }}>
                {/* Image */}
                <div style={{ height: "160px", background: "#F1F5F9", position: "relative", overflow: "hidden" }}>
                  {l.coverImage ? (
                    <img src={l.coverImage} alt={l.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Layers size={28} color="#CBD5E1" />
                    </div>
                  )}
                  <span style={{ position: "absolute", top: "0.75rem", right: "0.75rem", padding: "0.2rem 0.6rem", borderRadius: "99px", fontSize: "0.7rem", fontWeight: 700, background: statusStyle.bg, color: statusStyle.color, textTransform: "capitalize" }}>
                    {l.status}
                  </span>
                  {l.featured && (
                    <span style={{ position: "absolute", top: "0.75rem", left: "0.75rem", padding: "0.2rem 0.6rem", borderRadius: "99px", fontSize: "0.7rem", fontWeight: 700, background: "#FEF3C7", color: "#92400E" }}>
                      ⭐ Featured
                    </span>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div>
                    <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.3 }}>{l.title}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.3rem", color: "#64748B", fontSize: "0.78rem" }}>
                      <MapPin size={11} />
                      <span>{l.country}{l.region ? `, ${l.region}` : ""}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontSize: "0.7rem", color: "#94A3B8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Asking Price</p>
                      <p style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A" }}>
                        {l.priceMin ? `R${(l.priceMin / 1_000_000).toFixed(1)}M` : "P.O.A"}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#94A3B8", fontSize: "0.78rem" }}>
                      <Eye size={12} />
                      <span>{l.views.toLocaleString()} views</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: "flex", gap: "0.5rem", paddingTop: "0.75rem", borderTop: "1px solid #F1F5F9" }}>
                    <Link
                      href={`/listing/${l._id}`}
                      style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem", padding: "0.55rem", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600, color: "#334155", textDecoration: "none" }}
                    >
                      <ArrowUpRight size={13} /> View
                    </Link>
                    <button
                      onClick={() => setEditTarget(l as unknown as Listing)}
                      style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem", padding: "0.55rem", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600, color: "#1D4ED8", cursor: "pointer", fontFamily: "inherit" }}
                    >
                      <Pencil size={13} /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteTarget(l as unknown as Listing)}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0.55rem 0.75rem", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "8px", cursor: "pointer", fontFamily: "inherit" }}
                      title="Delete asset"
                    >
                      <Trash2 size={14} color="#EF4444" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      {editTarget && <EditModal listing={editTarget} onClose={() => setEditTarget(null)} />}
      {deleteTarget && <DeleteModal listing={deleteTarget} onClose={() => setDeleteTarget(null)} />}
    </div>
  );
}
