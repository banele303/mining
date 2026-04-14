'use client';

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { CheckCircle, ChevronRight, ChevronLeft, Pickaxe } from "lucide-react";

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
const intentions = ["Sell", "Buy", "Joint Venture", "Farm-In/Out", "Lease"];
const continents = ["Africa", "Asia", "Australia", "Europe", "North America", "South America"];
const countries: Record<string, string[]> = {
  "Africa": ["South Africa", "Ghana", "Tanzania", "DRC", "Zambia", "Burkina Faso", "Mali", "Niger", "Ethiopia", "Botswana"],
  "Asia": ["China", "Indonesia", "Philippines", "Kazakhstan", "Mongolia", "India", "Vietnam", "Myanmar"],
  "Australia": ["Australia"],
  "Europe": ["Finland", "Sweden", "Norway", "Spain", "Serbia", "Greece", "Portugal"],
  "North America": ["Canada", "USA", "Mexico"],
  "South America": ["Chile", "Peru", "Brazil", "Argentina", "Colombia", "Bolivia"],
};

const STEPS = ["Asset Details", "Location & Price", "Description & Submit"];

type FormData = {
  // Step 1
  title: string;
  commoditySector: string;
  commodity: string;
  stage: string;
  intention: string;
  // Step 2
  continent: string;
  country: string;
  region: string;
  priceMin: string;
  priceMax: string;
  currency: string;
  // Step 3
  description: string;
  highlights: string;
  ownerName: string;
  ownerCompany: string;
  ownerEmail: string;
};

const defaultForm: FormData = {
  title: "", commoditySector: "", commodity: "", stage: "", intention: "",
  continent: "", country: "", region: "", priceMin: "", priceMax: "", currency: "USD",
  description: "", highlights: "", ownerName: "", ownerCompany: "", ownerEmail: "",
};

export default function SellPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();
  const createListing = useMutation(api.listings.createListing);

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [key]: e.target.value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await createListing({
      title: form.title,
      description: form.description,
      highlights: form.highlights.split("\n").filter(Boolean),
      commodity: form.commodity,
      commoditySector: form.commoditySector,
      commodityTags: [form.commoditySector],
      country: form.country,
      region: form.region || undefined,
      continent: form.continent,
      intention: form.intention,
      stage: form.stage,
      priceMin: form.priceMin ? Number(form.priceMin) : undefined,
      priceMax: form.priceMax ? Number(form.priceMax) : undefined,
      currency: form.currency,
      images: [],
      ownerName: form.ownerName || undefined,
      ownerCompany: form.ownerCompany || undefined,
      ownerEmail: form.ownerEmail || undefined,
    });
    setSubmitting(false);
    setDone(true);
  };

  if (done) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-base)" }}>
        <div style={{ textAlign: "center", maxWidth: "480px", padding: "2rem" }}>
          <div style={{ width: "80px", height: "80px", background: "rgba(34,197,94,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", border: "2px solid rgba(34,197,94,0.3)" }}>
            <CheckCircle size={40} color="#22C55E" />
          </div>
          <h1 style={{ marginBottom: "0.75rem" }}>Listing Submitted!</h1>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2rem" }}>
            Your asset has been submitted for review. Our team will verify it and publish it within 24–48 hours. You'll receive an email confirmation shortly.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button className="btn btn-ghost" onClick={() => { setForm(defaultForm); setStep(0); setDone(false); }}>List Another</button>
            <button className="btn btn-primary" onClick={() => router.push("/list")}>Browse Listings</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", paddingBottom: "5rem" }}>
      {/* Header */}
      <div style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border)", padding: "3rem 0 2rem" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <div style={{ width: "32px", height: "32px", background: "linear-gradient(135deg, var(--primary), var(--primary-light))", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Pickaxe size={18} color="#fff" />
            </div>
            <span style={{ color: "var(--primary-light)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>List an Asset</span>
          </div>
          <h1 style={{ marginBottom: "0.5rem" }}>Reach Global Mining Buyers</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>List your mining asset and connect with qualified investors worldwide — free to submit.</p>
        </div>
      </div>

      <div className="container" style={{ padding: "3rem 1.5rem", maxWidth: "720px" }}>
        {/* Stepper */}
        <div className="step-bar" style={{ marginBottom: "2.5rem" }}>
          {STEPS.map((label, i) => (
            <div key={label} className="step-item">
              <div className={`step-circle ${i < step ? "done" : i === step ? "active" : ""}`}>
                {i < step ? "✓" : i + 1}
              </div>
              {i < STEPS.length - 1 && <div className={`step-line ${i < step ? "done" : ""}`} />}
              <span className={`step-label ${i === step ? "active" : ""}`}>{label}</span>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: "2rem" }}>
          {/* STEP 1 */}
          {step === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h2 style={{ fontSize: "1.15rem", marginBottom: "0.25rem" }}>Asset Details</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "-0.25rem" }}>Tell us about the mining project you want to list.</p>

              <div>
                <label className="label">Listing Title *</label>
                <input required className="input" placeholder="Eg. High-Grade Gold Project — Western Australia" value={form.title} onChange={set("title")} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label">Commodity Sector *</label>
                  <select className="select" value={form.commoditySector} onChange={(e) => setForm((p) => ({ ...p, commoditySector: e.target.value, commodity: "" }))}>
                    <option value="">Select sector...</option>
                    {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Primary Commodity *</label>
                  <select className="select" value={form.commodity} onChange={set("commodity")} disabled={!form.commoditySector}>
                    <option value="">Select commodity...</option>
                    {(commodities[form.commoditySector] || []).map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label">Project Stage *</label>
                  <select className="select" value={form.stage} onChange={set("stage")}>
                    <option value="">Select stage...</option>
                    {stages.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Intention *</label>
                  <select className="select" value={form.intention} onChange={set("intention")}>
                    <option value="">Select intention...</option>
                    {intentions.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h2 style={{ fontSize: "1.15rem", marginBottom: "0.25rem" }}>Location & Price</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "-0.25rem" }}>Where is the asset located and what is the asking price?</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label">Continent *</label>
                  <select className="select" value={form.continent} onChange={(e) => setForm((p) => ({ ...p, continent: e.target.value, country: "" }))}>
                    <option value="">Select continent...</option>
                    {continents.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Country *</label>
                  <select className="select" value={form.country} onChange={set("country")} disabled={!form.continent}>
                    <option value="">Select country...</option>
                    {(countries[form.continent] || []).map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="label">Region / State / Province</label>
                <input className="input" placeholder="Eg. Western Australia, Atacama, Ashanti..." value={form.region} onChange={set("region")} />
              </div>

              <div>
                <label className="label" style={{ marginBottom: "0.75rem" }}>Asking Price Range (USD)</label>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <input type="number" className="input" placeholder="Minimum price ($)" value={form.priceMin} onChange={set("priceMin")} />
                  <span style={{ color: "var(--text-muted)", flexShrink: 0 }}>to</span>
                  <input type="number" className="input" placeholder="Maximum price ($)" value={form.priceMax} onChange={set("priceMax")} />
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>Leave blank for "Price on Application"</p>
              </div>

              <div>
                <label className="label">Currency</label>
                <select className="select" value={form.currency} onChange={set("currency")}>
                  <option value="USD">USD — US Dollar</option>
                  <option value="AUD">AUD — Australian Dollar</option>
                  <option value="CAD">CAD — Canadian Dollar</option>
                  <option value="GBP">GBP — British Pound</option>
                  <option value="EUR">EUR — Euro</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h2 style={{ fontSize: "1.15rem", marginBottom: "0.25rem" }}>Description & Submit</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "-0.25rem" }}>Help buyers understand why this asset is exceptional.</p>

              <div>
                <label className="label">Asset Description *</label>
                <textarea required className="textarea" style={{ minHeight: "160px" }} placeholder="Describe the asset — geology, historical work, resource estimates, infrastructure, access, permits, etc." value={form.description} onChange={set("description")} />
              </div>

              <div>
                <label className="label">Key Highlights (one per line)</label>
                <textarea className="textarea" style={{ minHeight: "110px" }} placeholder={"JORC-compliant 1.2Bt resource\nAll environmental permits approved\nRoad and rail access\n..."} value={form.highlights} onChange={set("highlights")} />
              </div>

              <div className="divider" />
              <h3 style={{ fontSize: "1rem" }}>Your Contact Details</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="label">Your Name</label>
                  <input className="input" placeholder="John Smith" value={form.ownerName} onChange={set("ownerName")} />
                </div>
                <div>
                  <label className="label">Company</label>
                  <input className="input" placeholder="Mining Corp Ltd." value={form.ownerCompany} onChange={set("ownerCompany")} />
                </div>
              </div>
              <div>
                <label className="label">Contact Email</label>
                <input type="email" className="input" placeholder="john@company.com" value={form.ownerEmail} onChange={set("ownerEmail")} />
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
            <button
              className="btn btn-ghost"
              onClick={() => setStep((p) => p - 1)}
              disabled={step === 0}
              style={{ display: "flex", alignItems: "center", gap: "0.4rem", opacity: step === 0 ? 0.4 : 1 }}
            >
              <ChevronLeft size={16} /> Previous
            </button>

            {step < STEPS.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={() => setStep((p) => p + 1)}
                style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                Continue <ChevronRight size={16} />
              </button>
            ) : (
              <button
                className="btn btn-primary btn-lg"
                onClick={handleSubmit}
                disabled={submitting}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                {submitting ? "Submitting..." : "Submit Listing →"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
