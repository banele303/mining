import RealMap from "@/components/maps/RealMap";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function MapPreview() {
  return (
    <section className="section" style={{ background: "var(--bg-base)", position: "relative", overflow: "hidden" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "4rem", alignItems: "center" }} className="map-grid">
          {/* Text */}
          <div>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--primary)", marginBottom: "0.5rem" }}>
              Regional Coverage
            </p>
            <h2 style={{ marginBottom: "1rem" }}>Dominating the<br />Southern Africa Belt</h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "2rem", fontSize: "0.95rem" }}>
              Our platform offers a live, interactive GIS view of mining assets across the SADC region. Click on markers below to explore projects in the Witwatersrand Gold Basin, the Kalahari Copper Belt, and beyond.
            </p>

            {/* Region stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
              {[
                 { label: "South Africa", count: 850, color: "var(--primary)" },
                 { label: "Namibia", count: 320, color: "#22C55E" },
                 { label: "Botswana", count: 280, color: "#3B82F6" },
                 { label: "Zimbabwe", count: 210, color: "#8B5CF6" },
                 { label: "Mozambique", count: 190, color: "#F59E0B" },
                 { label: "Zambia", count: 160, color: "#EF4444" },
              ].map((d) => (
                <div key={d.label} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem", flex: 1 }}>{d.label}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.82rem", fontWeight: 600 }}>{d.count}+ assets</span>
                </div>
              ))}
            </div>

            <Link href="/explore" className="btn btn-primary btn-lg" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <MapPin size={18} /> Global Project Map
            </Link>
          </div>

          {/* Real Interactive Map */}
          <div style={{ position: "relative" }}>
             <RealMap height="650px" />

              {/* Overlay label */}
              <div style={{
                position: "absolute",
                bottom: "1.5rem", right: "1.5rem",
                background: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(12px)",
                borderRadius: "var(--radius-lg)",
                padding: "1rem 1.25rem",
                border: "1px solid var(--border)",
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
                boxShadow: "var(--shadow-elevated)",
                zIndex: 1000, // Above leaflet
              }}>
                <span style={{ fontWeight: 800, color: "var(--primary)" }}>2,100+</span> regional assets in <span style={{ fontWeight: 800, color: "var(--text-primary)" }}>8 nations</span>
              </div>
          </div>
        </div>
      </div>

            {/* Decorative glow */}
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "120%", height: "120%",
              background: "radial-gradient(ellipse, rgba(212,132,10,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: -1,
            }} />


      <style>{`
        @media (max-width: 900px) {
          .map-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
