'use client';

import { useState, useCallback } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSearchParams, useRouter } from "next/navigation";
import ListingCard from "@/components/listings/ListingCard";
import { Search, SlidersHorizontal, Map, Star, ChevronDown, X } from "lucide-react";
import Link from "next/link";

// ─── Filter types ──────────────────────────────────────────────────────────────
type Filters = {
  continent: string;
  commoditySector: string;
  intention: string;
  stage: string;
  priceMin: number | undefined;
  priceMax: number | undefined;
  search: string;
};

const defaultFilters: Filters = {
  continent: "",
  commoditySector: "",
  intention: "",
  stage: "",
  priceMin: undefined,
  priceMax: undefined,
  search: "",
};

const continents = ["Africa", "Asia", "Australia", "Europe", "North America", "South America"];
const sectors = ["All Sectors", "Base Metals", "Precious Metals", "Battery Metals", "Bulk Commodities", "Specialty Metals", "Industrial Minerals", "Non-Renewable Energy", "Renewable Energy"];
const intentions = ["Sell", "Buy", "Joint Venture", "Farm-In/Out", "Lease"];
const stages = ["Exploration", "Advanced Exploration", "Development", "Production", "Care & Maintenance"];

// ─── Filter Modal ──────────────────────────────────────────────────────────────
function FilterModal({
  open, filters, onApply, onClose,
}: {
  open: boolean;
  filters: Filters;
  onApply: (f: Filters) => void;
  onClose: () => void;
}) {
  const [local, setLocal] = useState<Filters>(filters);

  if (!open) return null;

  const toggle = <K extends keyof Filters>(key: K, value: any) => {
    setLocal((prev) => ({ ...prev, [key]: prev[key] === value ? "" : value }));
  };

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="modal">
        <div className="modal-content">
          <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "var(--bg-surface)", zIndex: 2 }}>
            <h3 style={{ fontSize: "1.1rem" }}>Filters</h3>
            <button onClick={onClose} style={{ background: "var(--bg-surface-2)", border: "1px solid var(--border)", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-secondary)" }}>
              <X size={16} />
            </button>
          </div>

          <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Location */}
            <FilterSection title="Location">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                {continents.map((c) => (
                  <CheckboxItem key={c} label={c} checked={local.continent === c} onChange={() => toggle("continent", c)} />
                ))}
              </div>
            </FilterSection>

            <div className="divider" style={{ margin: 0 }} />

            {/* Commodity Sector */}
            <FilterSection title="Commodity Sector">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                {sectors.map((s) => {
                  const val = s === "All Sectors" ? "" : s;
                  return <CheckboxItem key={s} label={s} checked={local.commoditySector === val} onChange={() => setLocal((p) => ({ ...p, commoditySector: val }))} />;
                })}
              </div>
            </FilterSection>

            <div className="divider" style={{ margin: 0 }} />

            {/* Intention */}
            <FilterSection title="Intention">
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {intentions.map((i) => (
                  <button
                    key={i}
                    onClick={() => toggle("intention", i)}
                    style={{
                      padding: "0.4rem 0.875rem",
                      borderRadius: "99px",
                      border: `1px solid ${local.intention === i ? "var(--primary)" : "var(--border)"}`,
                      background: local.intention === i ? "var(--primary)" : "var(--bg-surface-2)",
                      color: local.intention === i ? "#fff" : "var(--text-secondary)",
                      fontSize: "0.82rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all var(--transition)",
                      fontFamily: "inherit",
                    }}
                  >{i}</button>
                ))}
              </div>
            </FilterSection>

            <div className="divider" style={{ margin: 0 }} />

            {/* Stage */}
            <FilterSection title="Project Stage">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {stages.map((s) => (
                  <CheckboxItem key={s} label={s} checked={local.stage === s} onChange={() => toggle("stage", s)} />
                ))}
              </div>
            </FilterSection>

            <div className="divider" style={{ margin: 0 }} />

            {/* Price Range */}
            <FilterSection title="Price Range (USD)">
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <input
                  type="number"
                  placeholder="Min price"
                  value={local.priceMin ?? ""}
                  onChange={(e) => setLocal((p) => ({ ...p, priceMin: e.target.value ? Number(e.target.value) : undefined }))}
                  className="input"
                  style={{ flex: 1 }}
                />
                <span style={{ color: "var(--text-muted)", flexShrink: 0 }}>to</span>
                <input
                  type="number"
                  placeholder="Max price"
                  value={local.priceMax ?? ""}
                  onChange={(e) => setLocal((p) => ({ ...p, priceMax: e.target.value ? Number(e.target.value) : undefined }))}
                  className="input"
                  style={{ flex: 1 }}
                />
              </div>
            </FilterSection>
          </div>

          {/* Footer actions */}
          <div style={{
            padding: "1.25rem 1.5rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            bottom: 0,
            background: "var(--bg-surface)",
          }}>
            <button
              onClick={() => setLocal(defaultFilters)}
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontFamily: "inherit", fontSize: "0.875rem", fontWeight: 500 }}
            >
              Clear Filter
            </button>
            <button className="btn btn-primary" onClick={() => { onApply(local); onClose(); }}>
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>{title}</h4>
      {children}
    </div>
  );
}

function CheckboxItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }} onClick={onChange}>
      <div className={`checkbox-custom ${checked ? "checked" : ""}`}>
        {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
      <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{label}</span>
    </label>
  );
}

// ─── Main List Page ────────────────────────────────────────────────────────────
export default function ListPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [searchInput, setSearchInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const listings = useQuery(api.listings.getListings, {
    continent: filters.continent || undefined,
    commoditySector: filters.commoditySector || undefined,
    intention: filters.intention || undefined,
    stage: filters.stage || undefined,
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    search: filters.search || undefined,
  });

  const activeFilterCount = [
    filters.continent,
    filters.commoditySector,
    filters.intention,
    filters.stage,
    filters.priceMin,
    filters.priceMax,
  ].filter(Boolean).length;

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, search: searchInput }));
  };

  const clearFilter = (key: keyof Filters) => {
    setFilters((prev) => ({ ...prev, [key]: key.startsWith("price") ? undefined : "" }));
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)" }}>
      {/* Filter bar */}
      <div style={{
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--border)",
        padding: "1rem 0",
        position: "sticky",
        top: "68px",
        zIndex: 90,
      }}>
        <div className="container">
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.875rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--primary)", display: "inline-block" }} />
            <Link href="/" style={{ color: "var(--text-muted)" }}>Home</Link>
            <span>›</span>
            <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>List</span>
          </div>

          {/* Pill filter buttons */}
          <div className="scroll-x" style={{ display: "flex", gap: "0.5rem", alignItems: "center", paddingBottom: "0.25rem" }}>
            <PillDropdown
              label="Location"
              value={filters.continent}
              options={continents}
              onSelect={(v) => setFilters((p) => ({ ...p, continent: v }))}
              onClear={() => clearFilter("continent")}
            />
            <PillDropdown
              label="Commodity"
              value={filters.commoditySector}
              options={sectors.filter((s) => s !== "All Sectors")}
              onSelect={(v) => setFilters((p) => ({ ...p, commoditySector: v }))}
              onClear={() => clearFilter("commoditySector")}
            />
            <PillDropdown
              label="Intention"
              value={filters.intention}
              options={intentions}
              onSelect={(v) => setFilters((p) => ({ ...p, intention: v }))}
              onClear={() => clearFilter("intention")}
            />
            <PillDropdown
              label="Stage"
              value={filters.stage}
              options={stages}
              onSelect={(v) => setFilters((p) => ({ ...p, stage: v }))}
              onClear={() => clearFilter("stage")}
            />
            <PillDropdown
              label="Price range"
              value={filters.priceMin || filters.priceMax ? `$${(filters.priceMin || 0).toLocaleString()} – $${(filters.priceMax || 0).toLocaleString()}` : ""}
              options={[]}
              onSelect={() => {}}
              onClear={() => setFilters((p) => ({ ...p, priceMin: undefined, priceMax: undefined }))}
              isPrice
              onPriceChange={(min, max) => setFilters((p) => ({ ...p, priceMin: min, priceMax: max }))}
              priceMin={filters.priceMin}
              priceMax={filters.priceMax}
            />

            <div style={{ width: "1px", height: "28px", background: "var(--border)", flexShrink: 0 }} />

            <button
              id="open-filters-modal"
              onClick={() => setModalOpen(true)}
              className={`pill-btn ${activeFilterCount > 0 ? "active" : ""}`}
              style={{ background: activeFilterCount > 0 ? "var(--primary)" : undefined, flexShrink: 0 }}
            >
              <SlidersHorizontal size={14} />
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            <Link href="/explore" className="pill-btn" style={{ flexShrink: 0 }}>
              <Map size={14} /> Map
            </Link>
          </div>

          {/* Search bar */}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.875rem" }}>
            <div style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              background: "var(--bg-surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "0 1rem",
              transition: "all var(--transition)",
            }}
              onFocusCapture={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
              onBlurCapture={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <Search size={16} color="var(--text-muted)" strokeWidth={2} />
              <input
                id="listings-search"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Eg. Gold exploration stage asset in Western Australia"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--text-primary)",
                  fontSize: "0.875rem",
                  fontFamily: "inherit",
                  padding: "0.75rem 0",
                }}
              />
              {searchInput && (
                <button onClick={() => { setSearchInput(""); setFilters((p) => ({ ...p, search: "" })); }}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}>
                  <X size={14} />
                </button>
              )}
            </div>
            <button id="listings-search-btn" className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
            <button id="save-search-btn" className="btn btn-ghost" style={{ gap: "0.4rem", display: "flex", alignItems: "center" }}>
              <Star size={14} /> Save Search
            </button>
          </div>
        </div>
      </div>

      {/* Results area */}
      <div className="container" style={{ padding: "2rem 1.5rem" }}>
        {/* Results header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
            {listings === undefined ? (
              <div className="skeleton" style={{ width: "160px", height: "18px" }} />
            ) : (
              <span>
                <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>{listings.length}</span> asset{listings.length !== 1 ? "s" : ""} found
                {filters.search && <span> for "<em style={{ color: "var(--primary-light)" }}>{filters.search}</em>"</span>}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={() => setFilters(defaultFilters)}
              style={{ background: "none", border: "none", color: "var(--primary-light)", fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}
            >
              Clear all filters ×
            </button>
          )}
        </div>

        {/* Loading */}
        {listings === undefined && (
          <div className="grid-listings">
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
                <div className="skeleton" style={{ height: "200px" }} />
                <div style={{ padding: "1.25rem", background: "var(--bg-card)", border: "1px solid var(--border)", borderTop: "none", borderBottomLeftRadius: "var(--radius-lg)", borderBottomRightRadius: "var(--radius-lg)" }}>
                  <div className="skeleton" style={{ height: "14px", width: "50%", marginBottom: "0.75rem" }} />
                  <div className="skeleton" style={{ height: "20px", width: "90%", marginBottom: "0.75rem" }} />
                  <div className="skeleton" style={{ height: "13px", width: "70%", marginBottom: "0.4rem" }} />
                  <div className="skeleton" style={{ height: "13px", width: "60%", marginBottom: "0.4rem" }} />
                  <div className="skeleton" style={{ height: "13px", width: "80%" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid */}
        {listings && listings.length > 0 && (
          <div className="grid-listings">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing as any} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {listings && listings.length === 0 && (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <h3 style={{ marginBottom: "0.5rem", color: "var(--text-secondary)" }}>No assets found</h3>
            <p style={{ fontSize: "0.875rem" }}>Try adjusting your filters or search terms</p>
            <button className="btn btn-ghost" style={{ marginTop: "1.5rem" }} onClick={() => setFilters(defaultFilters)}>
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <FilterModal
        open={modalOpen}
        filters={filters}
        onApply={(f) => setFilters(f)}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

// ─── Pill Dropdown component ───────────────────────────────────────────────────
function PillDropdown({
  label, value, options, onSelect, onClear, isPrice, onPriceChange, priceMin, priceMax,
}: {
  label: string;
  value: string;
  options: string[];
  onSelect: (v: string) => void;
  onClear: () => void;
  isPrice?: boolean;
  onPriceChange?: (min: number | undefined, max: number | undefined) => void;
  priceMin?: number;
  priceMax?: number;
}) {
  const [open, setOpen] = useState(false);
  const isActive = Boolean(value);

  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <button
        className={`pill-btn ${isActive ? "active" : ""}`}
        onClick={() => setOpen(!open)}
        style={isActive ? { background: "var(--primary)", borderColor: "var(--primary)", color: "#fff" } : {}}
      >
        {isActive ? value : label}
        {isActive
          ? <span onClick={(e) => { e.stopPropagation(); onClear(); setOpen(false); }} style={{ marginLeft: "0.25rem", opacity: 0.7 }}>×</span>
          : <ChevronDown size={12} style={{ opacity: 0.6 }} />
        }
      </button>

      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => setOpen(false)} />
          <div className="animate-slideDown" style={{
            position: "absolute", top: "calc(100% + 8px)", left: 0,
            background: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            minWidth: isPrice ? "280px" : "200px",
            boxShadow: "var(--shadow-elevated)",
            zIndex: 50,
            overflow: "hidden",
          }}>
            {isPrice ? (
              <div style={{ padding: "1rem" }}>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Price Range (USD)</p>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.75rem" }}>
                  <input type="number" placeholder="Min" value={priceMin ?? ""} onChange={(e) => onPriceChange?.(e.target.value ? Number(e.target.value) : undefined, priceMax)} className="input" style={{ flex: 1, padding: "0.5rem 0.75rem", fontSize: "0.82rem" }} />
                  <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>–</span>
                  <input type="number" placeholder="Max" value={priceMax ?? ""} onChange={(e) => onPriceChange?.(priceMin, e.target.value ? Number(e.target.value) : undefined)} className="input" style={{ flex: 1, padding: "0.5rem 0.75rem", fontSize: "0.82rem" }} />
                </div>
                <button className="btn btn-primary" style={{ width: "100%", padding: "0.5rem" }} onClick={() => setOpen(false)}>Apply</button>
              </div>
            ) : (
              <div style={{ maxHeight: "220px", overflowY: "auto" }}>
                {options.map((o) => (
                  <button key={o} onClick={() => { onSelect(o); setOpen(false); }} style={{
                    display: "block", width: "100%", textAlign: "left",
                    padding: "0.6rem 1rem",
                    background: value === o ? "rgba(212,132,10,0.08)" : "transparent",
                    color: value === o ? "var(--primary-light)" : "var(--text-secondary)",
                    fontSize: "0.875rem",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontWeight: value === o ? 600 : 400,
                    transition: "all var(--transition)",
                  }}
                    onMouseEnter={(e) => { if (value !== o) (e.currentTarget as HTMLElement).style.background = "var(--bg-surface-2)"; }}
                    onMouseLeave={(e) => { if (value !== o) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >{o}</button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
