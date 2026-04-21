'use client';

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { CheckCircle, ChevronRight, ChevronLeft, PlusCircle } from "lucide-react";
import ImageUploader from "@/components/ui/ImageUploader";

const ASSET_CATEGORIES = [
  { value: "mining",     label: "⛏️  Mining Asset",          desc: "Mining claims, mineral rights, exploration licenses, producing mines" },
  { value: "equipment", label: "🚜  Mining Equipment",       desc: "Excavators, haul trucks, drill rigs, crushers, processing plants" },
  { value: "plots",     label: "📐  Plot / Land",             desc: "Serviced or unserviced plots, erven, residential subdivisions" },
  { value: "commercial",label: "🏗️  Commercial Property",    desc: "Office parks, warehouses, retail centres, industrial sites" },
  { value: "farms",     label: "🌾  Farm / Agricultural",     desc: "Game farms, crop farms, smallholdings, agri-processing facilities" },
];

const sectors = ["Precious Metals", "Battery Metals", "Base Metals", "Bulk Commodities", "Energy Metals", "Industrial Minerals", "Specialty Metals", "Renewable Energy"];
const commodities: Record<string, string[]> = {
  "Precious Metals": ["Gold", "Silver", "Platinum", "Palladium"],
  "Battery Metals": ["Lithium", "Cobalt", "Nickel", "Graphite", "Manganese"],
  "Base Metals": ["Copper", "Zinc", "Lead", "Tin", "Aluminium"],
  "Bulk Commodities": ["Iron Ore", "Coal", "Manganese Ore", "Bauxite"],
  "Energy Metals": ["Uranium", "Thorium", "Rare Earth Elements"],
  "Industrial Minerals": ["Potash", "Phosphate", "Silica", "Kaolin", "Fluorite"],
  "Specialty Metals": ["Vanadium", "Tungsten", "Molybdenum", "Antimony"],
  "Renewable Energy": ["Solar", "Wind", "Geothermal", "Hydro"],
};
const stages = ["Exploration", "Advanced Exploration", "Development", "Production", "Care & Maintenance"];
const intentions = [
  { value: "sell",      label: "💰  I want to sell it" },
  { value: "invest",   label: "📈  I'm looking for investors / partners" },
  { value: "jv",       label: "🤝  Open to a joint venture" },
  { value: "lease",    label: "🔑  I want to lease it out" },
  { value: "buy",      label: "🔍  I'm looking to buy" },
  { value: "farmin",   label: "🌐  Farm-in / Farm-out arrangement" },
];
const continents = ["Africa", "Asia", "Australia", "Europe", "North America", "South America"];
const countries: Record<string, string[]> = {
  "Africa": ["South Africa", "Ghana", "Tanzania", "DRC", "Zambia", "Burkina Faso", "Mali", "Niger", "Ethiopia", "Botswana"],
  "Asia": ["China", "Indonesia", "Philippines", "Kazakhstan", "Mongolia", "India", "Vietnam", "Myanmar"],
  "Australia": ["Australia"],
  "Europe": ["Finland", "Sweden", "Norway", "Spain", "Serbia", "Greece", "Portugal"],
  "North America": ["Canada", "USA", "Mexico"],
  "South America": ["Chile", "Peru", "Brazil", "Argentina", "Colombia", "Bolivia"],
};

const STEPS = ["Asset Details", "Location & Price", "Media & Description", "Submit"];

type FormData = {
  assetCategory: string;
  title: string;
  commoditySector: string;
  commodity: string;
  stage: string;
  intention: string;
  continent: string;
  country: string;
  region: string;
  priceMin: string;
  priceMax: string;
  currency: string;
  description: string;
  highlights: string;
  ownerName: string;
  ownerCompany: string;
  ownerEmail: string;
  ownerPhone: string;
  featured: boolean;
};

const defaultForm: FormData = {
  assetCategory: "", title: "", commoditySector: "", commodity: "", stage: "", intention: "",
  continent: "", country: "", region: "", priceMin: "", priceMax: "", currency: "ZAR",
  description: "", highlights: "", ownerName: "", ownerCompany: "", ownerEmail: "", ownerPhone: "",
  featured: false,
};

// ─── Shared input styles ──────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%", background: "#F8FAFC", border: "1px solid #E2E8F0",
  borderRadius: "8px", padding: "0.65rem 0.875rem", fontSize: "0.875rem",
  fontFamily: "inherit", color: "#0F172A", outline: "none",
  boxSizing: "border-box",
};
const labelStyle: React.CSSProperties = {
  fontSize: "0.75rem", fontWeight: 700, color: "#64748B",
  textTransform: "uppercase", letterSpacing: "0.06em",
  display: "block", marginBottom: "0.4rem",
};
const sectionStyle: React.CSSProperties = {
  display: "flex", flexDirection: "column", gap: "1.25rem",
};

export default function ListAssetDashboardPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [images, setImages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();
  const createListing = useMutation(api.listings.createListing);

  const set = (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const intentionLabel = intentions.find(i => i.value === form.intention)?.label ?? form.intention;
      await createListing({
        title: form.title,
        description: form.description,
        highlights: form.highlights.split("\n").filter(Boolean),
        commodity: form.commodity || form.commoditySector || form.assetCategory,
        commoditySector: form.commoditySector || form.assetCategory,
        commodityTags: [form.assetCategory, form.commoditySector].filter(Boolean),
        country: form.country,
        region: form.region || undefined,
        continent: form.continent,
        intention: intentionLabel,
        stage: form.stage || "N/A",
        priceMin: form.priceMin ? Number(form.priceMin) : undefined,
        priceMax: form.priceMax ? Number(form.priceMax) : undefined,
        currency: form.currency,
        images,
        ownerName: form.ownerName || undefined,
        ownerCompany: form.ownerCompany || undefined,
        ownerEmail: form.ownerEmail || undefined,
        ownerPhone: form.ownerPhone || undefined,
        featured: form.featured,
      });
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (done) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center", gap: "1.5rem" }}>
        <div style={{ width: "80px", height: "80px", background: "rgba(16,185,129,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(16,185,129,0.25)" }}>
          <CheckCircle size={40} color="#10B981" />
        </div>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.5rem" }}>Listing Submitted!</h1>
          <p style={{ color: "#64748B", lineHeight: 1.7, maxWidth: "440px" }}>
            Your asset is under review. Our team will verify and publish it within 24–48 hours. You'll receive an email confirmation shortly.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => { setForm(defaultForm); setImages([]); setStep(0); setDone(false); }}
            style={{ padding: "0.7rem 1.5rem", borderRadius: "10px", border: "1px solid #E2E8F0", background: "#fff", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", color: "#334155" }}
          >
            List Another Asset
          </button>
          <button
            onClick={() => router.push("/dashboard/my-assets")}
            style={{ padding: "0.7rem 1.5rem", borderRadius: "10px", border: "none", background: "#10B981", color: "#fff", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
          >
            View My Assets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", paddingBottom: "1.5rem", borderBottom: "1px solid #F1F5F9" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
            <div style={{ width: "28px", height: "28px", background: "linear-gradient(135deg,#10B981,#34D399)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PlusCircle size={15} color="#fff" />
            </div>
            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#10B981", textTransform: "uppercase", letterSpacing: "0.1em" }}>New Listing</span>
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>List Your Asset</h1>
          <p style={{ fontSize: "0.875rem", color: "#64748B", marginTop: "0.25rem" }}>Fill in the details below. Your listing will be reviewed within 48 hours.</p>
        </div>
      </div>

      {/* Stepper */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0", overflowX: "auto", paddingBottom: "0.5rem" }}>
        {STEPS.map((label, i) => (
          <div key={label} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", flexShrink: 0 }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.8rem", fontWeight: 800,
                background: i < step ? "#10B981" : i === step ? "#0F172A" : "#F1F5F9",
                color: i <= step ? "#fff" : "#94A3B8",
                border: i === step ? "2px solid #0F172A" : "2px solid transparent",
                transition: "all 0.2s",
              }}>
                {i < step ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: "0.7rem", fontWeight: i === step ? 700 : 500, color: i === step ? "#0F172A" : "#94A3B8", whiteSpace: "nowrap" }}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: "2px", background: i < step ? "#10B981" : "#E2E8F0", margin: "0 0.5rem", marginBottom: "1.2rem", transition: "background 0.3s" }} />
            )}
          </div>
        ))}
      </div>

      {/* Form card */}
      <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "2rem", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>

        {/* STEP 0 — Asset Details */}
        {step === 0 && (
          <div style={sectionStyle}>
            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.25rem" }}>Asset Details</h2>
              <p style={{ fontSize: "0.85rem", color: "#64748B" }}>Start by choosing what type of asset you are listing.</p>
            </div>

            {/* Asset category selector */}
            <div>
              <label style={labelStyle}>Asset Category *</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem" }}>
                {ASSET_CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, assetCategory: cat.value, commoditySector: "", commodity: "" }))}
                    style={{
                      textAlign: "left", padding: "1rem", borderRadius: "10px", cursor: "pointer",
                      border: `2px solid ${form.assetCategory === cat.value ? "#10B981" : "#E2E8F0"}`,
                      background: form.assetCategory === cat.value ? "rgba(16,185,129,0.06)" : "#F8FAFC",
                      fontFamily: "inherit", transition: "all 0.15s",
                    }}
                  >
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.2rem" }}>{cat.label}</div>
                    <div style={{ fontSize: "0.72rem", color: "#94A3B8", lineHeight: 1.4 }}>{cat.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={labelStyle}>Listing Title *</label>
              <input style={inputStyle} required placeholder="E.g. High-Grade Gold Project — Limpopo, South Africa" value={form.title} onChange={set("title")} />
            </div>

            {/* Mining-specific fields */}
            {form.assetCategory === "mining" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Commodity Sector *</label>
                  <select style={inputStyle} value={form.commoditySector} onChange={(e) => setForm((p) => ({ ...p, commoditySector: e.target.value, commodity: "" }))}>
                    <option value="">Select sector...</option>
                    {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Primary Commodity *</label>
                  <select style={inputStyle} value={form.commodity} onChange={set("commodity")} disabled={!form.commoditySector}>
                    <option value="">Select commodity...</option>
                    {(commodities[form.commoditySector] || []).map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            )}

            {/* Commercial / Farm / Plots / Equipment — property/asset sub-type */}
            {(form.assetCategory === "commercial" || form.assetCategory === "farms" || form.assetCategory === "plots" || form.assetCategory === "equipment") && (
              <div>
                <label style={labelStyle}>
                  {form.assetCategory === "equipment" ? "Equipment Type" : "Property Sub-type"}
                </label>
                <select style={inputStyle} value={form.commoditySector} onChange={(e) => setForm((p) => ({ ...p, commoditySector: e.target.value }))}>
                  <option value="">Select type...</option>
                  {form.assetCategory === "equipment"   && ["Excavator / Shovel", "Haul Truck / Dump Truck", "Drill Rig", "Crusher / Screening Plant", "Processing / Milling Plant", "Conveyor System", "Underground Loader (LHD)", "Dragline", "Grader / Dozer", "Water Bowser", "Blasting Equipment", "Exploration Equipment", "Wash Plant", "Other Large Equipment"].map((o) => <option key={o} value={o}>{o}</option>)}
                  {form.assetCategory === "commercial" && ["Office Park", "Warehouse / Industrial", "Retail Centre", "Mixed-Use Development", "Hotel / Hospitality", "Data Centre", "Logistics Hub"].map((o) => <option key={o} value={o}>{o}</option>)}
                  {form.assetCategory === "farms"      && ["Crop Farm", "Game Farm", "Cattle Farm", "Dairy Farm", "Smallholding", "Wine Estate", "Agri-Processing", "Poultry Farm"].map((o) => <option key={o} value={o}>{o}</option>)}
                  {form.assetCategory === "plots"      && ["Residential Plot", "Commercial Plot", "Industrial Erf", "Agricultural Subdivision", "Coastal / Resort Plot", "Mixed-Use Erf"].map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            )}

            {/* Equipment extra fields */}
            {form.assetCategory === "equipment" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Make / Brand</label>
                  <input style={inputStyle} placeholder="E.g. Caterpillar, Komatsu, Sandvik" value={form.commodity} onChange={set("commodity")} />
                </div>
                <div>
                  <label style={labelStyle}>Model / Year</label>
                  <input style={inputStyle} placeholder="E.g. CAT 793F — 2019" value={form.stage} onChange={set("stage")} />
                </div>
              </div>
            )}

            {form.assetCategory === "mining" && (
              <div>
                <label style={labelStyle}>Project Stage *</label>
                <select style={inputStyle} value={form.stage} onChange={set("stage")}>
                  <option value="">Select stage...</option>
                  {stages.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            )}

            {/* Intention — plain English */}
            <div>
              <label style={labelStyle}>What are you looking to do? *</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {intentions.map((i) => (
                  <button
                    key={i.value}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, intention: i.value }))}
                    style={{
                      textAlign: "left", padding: "0.75rem 1rem", borderRadius: "8px", cursor: "pointer",
                      border: `1.5px solid ${form.intention === i.value ? "#10B981" : "#E2E8F0"}`,
                      background: form.intention === i.value ? "rgba(16,185,129,0.06)" : "#F8FAFC",
                      fontFamily: "inherit", fontSize: "0.875rem", fontWeight: form.intention === i.value ? 700 : 500,
                      color: form.intention === i.value ? "#065F46" : "#334155",
                      transition: "all 0.15s",
                    }}
                  >
                    {i.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 1 — Location & Price */}
        {step === 1 && (
          <div style={sectionStyle}>
            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.25rem" }}>Location & Price</h2>
              <p style={{ fontSize: "0.85rem", color: "#64748B" }}>Where is the asset located and what is the asking price?</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Continent *</label>
                <select style={inputStyle} value={form.continent} onChange={(e) => setForm((p) => ({ ...p, continent: e.target.value, country: "" }))}>
                  <option value="">Select continent...</option>
                  {continents.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Country *</label>
                <select style={inputStyle} value={form.country} onChange={set("country")} disabled={!form.continent}>
                  <option value="">Select country...</option>
                  {(countries[form.continent] || []).map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Region / Province / State</label>
              <input style={inputStyle} placeholder="E.g. Limpopo, Atacama, Western Australia..." value={form.region} onChange={set("region")} />
            </div>

            <div>
              <label style={labelStyle}>Currency</label>
              <select style={{ ...inputStyle, maxWidth: "240px" }} value={form.currency} onChange={set("currency")}>
                <option value="ZAR">ZAR — South African Rand</option>
                <option value="USD">USD — US Dollar</option>
                <option value="AUD">AUD — Australian Dollar</option>
                <option value="CAD">CAD — Canadian Dollar</option>
                <option value="GBP">GBP — British Pound</option>
                <option value="EUR">EUR — Euro</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Asking Price Range ({form.currency || "ZAR"})</label>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <input type="number" style={inputStyle} placeholder="Minimum" value={form.priceMin} onChange={set("priceMin")} />
                <span style={{ color: "#94A3B8", flexShrink: 0, fontSize: "0.85rem" }}>to</span>
                <input type="number" style={inputStyle} placeholder="Maximum" value={form.priceMax} onChange={set("priceMax")} />
              </div>
              <p style={{ fontSize: "0.73rem", color: "#94A3B8", marginTop: "0.4rem" }}>Leave blank for "Price on Application"</p>
            </div>
          </div>
        )}

        {/* STEP 2 — Media & Description */}
        {step === 2 && (
          <div style={sectionStyle}>
            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.25rem" }}>Media & Description</h2>
              <p style={{ fontSize: "0.85rem", color: "#64748B" }}>Upload photos and write a compelling description to attract buyers.</p>
            </div>

            <div>
              <label style={labelStyle}>Asset Photos (up to 15)</label>
              <p style={{ fontSize: "0.75rem", color: "#94A3B8", marginBottom: "0.75rem" }}>First image becomes the cover photo shown in search results. Drag to reorder.</p>
              <ImageUploader value={images} onChange={setImages} maxFiles={15} />
            </div>

            <div>
              <label style={labelStyle}>Asset Description *</label>
              <textarea
                required
                style={{ ...inputStyle, minHeight: "160px", resize: "vertical" }}
                placeholder="Describe the asset — geology, historical work, resource estimates, infrastructure, access, permits, environmental status, etc."
                value={form.description}
                onChange={set("description")}
              />
            </div>

            <div>
              <label style={labelStyle}>Key Highlights (one per line)</label>
              <textarea
                style={{ ...inputStyle, minHeight: "110px", resize: "vertical" }}
                placeholder={"JORC-compliant 1.2Bt resource\nAll environmental permits approved\nRoad and rail access\nAdjacent to producing mine"}
                value={form.highlights}
                onChange={set("highlights")}
              />
            </div>
          </div>
        )}

        {/* STEP 3 — Review & Submit */}
        {step === 3 && (
          <div style={sectionStyle}>
            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", marginBottom: "0.25rem" }}>Contact & Submit</h2>
              <p style={{ fontSize: "0.85rem", color: "#64748B" }}>Add your contact details so qualified buyers can reach you directly.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Your Name</label>
                <input style={inputStyle} placeholder="John Smith" value={form.ownerName} onChange={set("ownerName")} />
              </div>
              <div>
                <label style={labelStyle}>Company</label>
                <input style={inputStyle} placeholder="Mining Corp Ltd." value={form.ownerCompany} onChange={set("ownerCompany")} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Contact Email</label>
                <input type="email" style={inputStyle} placeholder="john@company.com" value={form.ownerEmail} onChange={set("ownerEmail")} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" style={inputStyle} placeholder="+27 82 123 4567" value={form.ownerPhone} onChange={set("ownerPhone")} />
              </div>
            </div>

            {/* Featured toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1.25rem", background: "rgba(254,243,199,0.5)", border: "1px solid #FEF3C7", borderRadius: "12px" }}>
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) => setForm(p => ({ ...p, featured: e.target.checked }))}
                style={{ width: "1.25rem", height: "1.25rem", cursor: "pointer" }}
              />
              <label htmlFor="featured" style={{ fontSize: "0.9rem", fontWeight: 700, color: "#92400E", cursor: "pointer" }}>
                ⭐ Mark as Featured Listing (Show on Homepage)
              </label>
            </div>

            {/* Summary preview */}
            <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 800, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em" }}>Listing Summary</p>
              {[
                ["Title", form.title],
                ["Commodity", `${form.commodity} (${form.commoditySector})`],
                ["Stage", form.stage],
                ["Intention", form.intention],
                ["Location", `${form.country}${form.region ? `, ${form.region}` : ""}`],
                ["Price", form.priceMin ? `${form.currency} ${Number(form.priceMin).toLocaleString()} – ${form.priceMax ? Number(form.priceMax).toLocaleString() : "open"}` : "Price on Application"],
                ["Contact", `${form.ownerEmail}${form.ownerPhone ? ` | ${form.ownerPhone}` : ""}`],
                ["Featured", form.featured ? "Yes ⭐" : "No"],
                ["Photos", `${images.length} uploaded`],
              ].map(([k, v]) => v && (
                <div key={k} style={{ display: "flex", gap: "0.5rem", fontSize: "0.85rem" }}>
                  <span style={{ color: "#94A3B8", fontWeight: 600, minWidth: "80px" }}>{k}:</span>
                  <span style={{ color: "#0F172A", fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nav buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #F1F5F9" }}>
          <button
            onClick={() => setStep((p) => p - 1)}
            disabled={step === 0}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.65rem 1.25rem", borderRadius: "8px", border: "1px solid #E2E8F0", background: "#fff", fontSize: "0.875rem", fontWeight: 600, cursor: step === 0 ? "not-allowed" : "pointer", fontFamily: "inherit", color: "#64748B", opacity: step === 0 ? 0.4 : 1 }}
          >
            <ChevronLeft size={16} /> Previous
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((p) => p + 1)}
              style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.65rem 1.5rem", borderRadius: "8px", border: "none", background: "#0F172A", color: "#fff", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
            >
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.7rem 2rem", borderRadius: "8px", border: "none", background: submitting ? "#94A3B8" : "linear-gradient(135deg,#10B981,#34D399)", color: "#fff", fontSize: "0.9rem", fontWeight: 800, cursor: submitting ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: submitting ? "none" : "0 4px 16px rgba(16,185,129,0.35)" }}
            >
              {submitting ? "Submitting…" : "Submit Listing →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
