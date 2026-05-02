'use client';

import Link from "next/link";
import { Pickaxe, Globe, Mail } from "lucide-react";

const commodityLinks = [
  { label: "Precious Metals", href: "/list?sector=Precious+Metals" },
  { label: "Battery Metals", href: "/list?sector=Battery+Metals" },
  { label: "Base Metals", href: "/list?sector=Base+Metals" },
  { label: "Bulk Commodities", href: "/list?sector=Bulk+Commodities" },
  { label: "Industrial Minerals", href: "/list?sector=Industrial+Minerals" },
  { label: "Renewable Energy", href: "/list?sector=Renewable+Energy" },
];

const locationLinks = [
  { label: "South Africa", href: "/list?country=South+Africa" },
  { label: "Namibia", href: "/list?country=Namibia" },
  { label: "Botswana", href: "/list?country=Botswana" },
  { label: "Zimbabwe", href: "/list?country=Zimbabwe" },
  { label: "Mozambique", href: "/list?country=Mozambique" },
  { label: "Zambia", href: "/list?country=Zambia" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "List an Asset", href: "/dashboard/list-asset" },
  { label: "Explore Map", href: "/explore" },
  { label: "Sign In", href: "/auth/sign-in" },
  { label: "Join Free", href: "/auth/sign-up" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer style={{
      background: "var(--bg-surface)",
      borderTop: "1px solid var(--border)",
      paddingTop: "4rem",
    }}>
      <div className="container">
        {/* Top row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "3rem",
          paddingBottom: "3rem",
          borderBottom: "1px solid var(--border)",
        }} className="footer-grid">
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
              <img src="/miningExchange.png" alt="Mining Exchange Logo" className="rounded-md" style={{ height: "64px", width: "auto", objectFit: "contain" }} />
              <span style={{ fontWeight: 800, fontSize: "1.35rem", letterSpacing: "-0.02em" }}>
                Mining <span className="text-emerald-500">Exchange</span>
              </span>
            </Link>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: "320px" }}>
              The world's leading institutional marketplace for mining asset transactions. Connecting global capital to high-growth mineral and agricultural opportunities.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              {[
                { icon: <Globe size={16} />, href: "#", label: "Twitter" },
                { icon: <Globe size={16} />, href: "#", label: "LinkedIn" },
                { icon: <Globe size={16} />, href: "#", label: "Website" },
                { icon: <Mail size={16} />, href: "mailto:hello@southernmines.com", label: "Email" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: "36px", height: "36px",
                    background: "var(--bg-surface-2)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text-muted)",
                    transition: "all var(--transition)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--primary)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-surface-2)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Commodity */}
          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "1rem" }}>
              Browse by Commodity
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {commodityLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} style={{ color: "var(--text-secondary)", fontSize: "0.875rem", transition: "color var(--transition)" }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "var(--primary-light)"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "1rem" }}>
              Browse by Location
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {locationLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} style={{ color: "var(--text-secondary)", fontSize: "0.875rem", transition: "color var(--transition)" }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "var(--primary-light)"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "1rem" }}>
              Company
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} style={{ color: "var(--text-secondary)", fontSize: "0.875rem", transition: "color var(--transition)" }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "var(--primary-light)"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"}
                  >{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.5rem 0",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
            © {new Date().getFullYear()} Mining Exchange. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
              <Link key={t} href="#" style={{ color: "var(--text-muted)", fontSize: "0.82rem", transition: "color var(--transition)" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"}
              >{t}</Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
