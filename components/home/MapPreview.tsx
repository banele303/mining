import RealMap from "@/components/maps/RealMap";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function MapPreview() {
  return (
    <section className="section" id="map-section" style={{ background: "var(--bg-base)", position: "relative", overflow: "hidden" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "2rem", alignItems: "center" }} className="map-grid">
          {/* Text */}
          <div style={{ zIndex: 2 }}>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--primary)", marginBottom: "0.5rem" }}>
              Regional Coverage
            </p>
            <h2 style={{ marginBottom: "1.25rem", fontSize: "clamp(1.75rem, 5vw, 2.5rem)" }}>Dominating the<br />Southern Africa Belt</h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "2rem", fontSize: "0.95rem" }}>
              Our platform offers a live, interactive GIS view of mining assets across the SADC region. Explore projects in the Witwatersrand Gold Basin, the Kalahari Copper Belt, and beyond.
            </p>

            {/* Region stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "2.5rem" }}>
              {[
                 { label: "South Africa", count: 850, color: "var(--primary)" },
                 { label: "Namibia", count: 320, color: "#22C55E" },
                 { label: "Botswana", count: 280, color: "#3B82F6" },
                 { label: "Zimbabwe", count: 210, color: "#8B5CF6" },
                 { label: "Mozambique", count: 190, color: "#F59E0B" },
                 { label: "Zambia", count: 160, color: "#EF4444" },
              ].map((d) => (
                <div key={d.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem", flex: 1 }}>{d.label}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.82rem", fontWeight: 700 }}>{d.count}+ assets</span>
                </div>
              ))}
            </div>

            <Link href="/explore" className="btn btn-primary btn-lg" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", width: "100%", justifyContent: "center" }}>
              <MapPin size={18} /> Global Project Map
            </Link>
          </div>

          {/* Real Interactive Map */}
          <div style={{ position: "relative" }} className="map-view-container">
             <RealMap height="450px" />

              {/* Overlay label */}
              <div style={{
                position: "absolute",
                bottom: "1rem", left: "1rem", right: "1rem",
                background: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(12px)",
                borderRadius: "var(--radius-lg)",
                padding: "0.85rem 1rem",
                border: "1px solid var(--border)",
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                boxShadow: "var(--shadow-elevated)",
                zIndex: 1000, 
                display: "flex",
                justifyContent: "center",
                textAlign: "center"
              }} className="map-overlay-label">
                <span>
                  <strong style={{ color: "var(--primary)" }}>2,100+</strong> regional assets in <strong style={{ color: "var(--text-primary)" }}>8 nations</strong>
                </span>
              </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .map-grid { gap: 3rem !important; }
        }
        @media (max-width: 900px) {
          .map-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          #map-section .btn { width: auto !important; padding: 0.8rem 2rem !important; }
        }
        @media (min-width: 901px) {
          .map-view-container { min-height: 600px; }
          #map-section .btn { width: auto !important; }
        }
        @media (max-width: 640px) {
          .map-overlay-label { bottom: 0.5rem !important; left: 0.5rem !important; right: 0.5rem !important; font-size: 0.75rem !important; padding: 0.6rem !important; }
        }
      `}</style>
    </section>
  );
}
