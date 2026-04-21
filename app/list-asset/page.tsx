'use client';

import { useState } from "react";
import Link from "next/link";
import { useConvexAuth } from "convex/react";
import {
  Shield, Gavel, Users, TrendingUp, CheckCircle, ArrowRight,
  Star, Globe, Clock, Lock, FileText, Handshake, ChevronDown,
  Building2, DollarSign, Award, AlertCircle
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────
const PROCESS_STEPS = [
  {
    step: "01",
    icon: FileText,
    title: "Submit Your Asset",
    desc: "Fill out our structured listing form with asset details, location, pricing expectations, and supporting documents. Our team reviews every submission within 48 hours.",
    color: "#10B981",
  },
  {
    step: "02",
    icon: Shield,
    title: "Verification & Compliance",
    desc: "Our in-house legal team and due-diligence specialists verify ownership, title deeds, mining rights, and regulatory compliance before the listing goes live.",
    color: "#3B82F6",
  },
  {
    step: "03",
    icon: Globe,
    title: "Global Exposure",
    desc: "Your asset is published to our global network of qualified buyers, institutional investors, and joint-venture partners actively seeking opportunities in Africa and beyond.",
    color: "#8B5CF6",
  },
  {
    step: "04",
    icon: Handshake,
    title: "We Close the Deal",
    desc: "When an interested party makes contact, our dedicated deal-management team facilitates negotiations, coordinates site visits, and manages the full transaction process.",
    color: "#F59E0B",
  },
];

const SERVICES = [
  {
    icon: DollarSign,
    title: "10% Success Fee — Nothing Upfront",
    desc: "We only earn when you do. Our 10% fee is charged exclusively on successfully closed deals. Zero listing fees, zero monthly charges. Completely risk-free for the seller.",
    highlight: true,
  },
  {
    icon: Gavel,
    title: "Full Legal Support",
    desc: "Our panel of mining and commercial law specialists handles all agreements, title transfers, regulatory filings, and cross-border transaction requirements from start to finish.",
    highlight: false,
  },
  {
    icon: Users,
    title: "Verified Buyer Network",
    desc: "Every buyer on our platform is KYC-verified and has demonstrated investment capacity. No time-wasters — only serious, pre-qualified investors reach your listing.",
    highlight: false,
  },
  {
    icon: TrendingUp,
    title: "Valuation & Pricing Advisory",
    desc: "Our commodity analysts and market experts provide you with a data-driven valuation report to ensure your asset is priced competitively and attractively for buyers.",
    highlight: false,
  },
  {
    icon: Globe,
    title: "International Deal Structuring",
    desc: "From offshore vehicles to cross-border JV agreements, our team structures deals that are tax-efficient, legally sound, and compliant with multiple jurisdictions.",
    highlight: false,
  },
  {
    icon: Clock,
    title: "Dedicated Deal Manager",
    desc: "From the moment your listing goes live, you are assigned a personal deal manager who acts as your single point of contact throughout the entire transaction lifecycle.",
    highlight: false,
  },
];

const STATS = [
  { value: "R42B+", label: "Asset Value Listed" },
  { value: "340+", label: "Successful Transactions" },
  { value: "18", label: "Countries Represented" },
  { value: "48hr", label: "Average First Inquiry" },
];

const ASSET_TYPES = [
  { label: "Mining Claim", emoji: "⛏️" },
  { label: "Mineral Rights", emoji: "💎" },
  { label: "Commercial Land", emoji: "🏗️" },
  { label: "Agricultural Land", emoji: "🌾" },
  { label: "Exploration License", emoji: "🗺️" },
  { label: "Developed Mine", emoji: "🏭" },
  { label: "Heavy Equipment", emoji: "🚜" },
  { label: "Joint Venture", emoji: "🤝" },
];

const FAQS = [
  {
    q: "What types of assets can I list?",
    a: "We accept mining claims, mineral rights, exploration licenses, developed mines, commercial land, agricultural land, heavy equipment, and joint-venture opportunities across all commodity sectors.",
  },
  {
    q: "How is the 10% success fee calculated?",
    a: "The fee is 10% of the final agreed transaction value. It is only charged upon successful completion of the deal and transfer of funds. There are no hidden charges, retainers, or monthly fees.",
  },
  {
    q: "How long does it take to get my listing live?",
    a: "After you submit your asset details, our team completes due diligence within 48 working hours. Once verified and approved, your listing goes live on the platform immediately.",
  },
  {
    q: "Do I need a lawyer of my own?",
    a: "You are welcome to use your own legal counsel. Our in-house legal team works alongside your attorneys to ensure all parties are protected and the transaction is watertight.",
  },
  {
    q: "Can I list assets outside Africa?",
    a: "Yes. While our primary focus is African assets, we list opportunities across Asia, South America, and Oceania. Our buyer network is global and actively seeks international deals.",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        transition: "all var(--transition)",
        background: open ? "var(--bg-surface)" : "var(--bg-card)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 1.5rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
          textAlign: "left",
          gap: "1rem",
        }}
      >
        <span style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem", lineHeight: 1.4 }}>{q}</span>
        <ChevronDown
          size={18}
          color="var(--text-muted)"
          style={{ flexShrink: 0, transition: "transform 0.25s ease", transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>
      {open && (
        <div style={{ padding: "0 1.5rem 1.25rem", color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7 }}>
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Sign-In Gate ────────────────────────────────────────────────────────────
function SignInGate() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
      borderRadius: "var(--radius-xl)",
      padding: "clamp(2rem, 6vw, 4rem)",
      textAlign: "center",
      border: "1px solid rgba(16,185,129,0.2)",
      boxShadow: "0 0 60px rgba(16,185,129,0.08)",
      maxWidth: "560px",
      margin: "0 auto",
    }}>
      <div style={{
        width: "64px", height: "64px",
        background: "rgba(16,185,129,0.15)",
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 1.5rem",
        border: "1px solid rgba(16,185,129,0.3)",
      }}>
        <Lock size={28} color="#10B981" />
      </div>
      <h2 style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "0.75rem" }}>
        Create a Free Account to List
      </h2>
      <p style={{ color: "#94A3B8", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "2rem" }}>
        You need a verified seller account to submit your asset. Signing up is free and takes under 2 minutes.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <Link
          href="/auth/sign-up"
          style={{
            background: "linear-gradient(135deg, #10B981, #34D399)",
            color: "#fff",
            fontWeight: 700,
            padding: "0.875rem 2rem",
            borderRadius: "var(--radius-lg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            fontSize: "0.95rem",
            boxShadow: "0 4px 20px rgba(16,185,129,0.4)",
            transition: "all var(--transition)",
          }}
        >
          Create Free Account <ArrowRight size={16} />
        </Link>
        <Link
          href="/auth/sign-in"
          style={{
            color: "#94A3B8",
            fontWeight: 600,
            padding: "0.75rem 2rem",
            borderRadius: "var(--radius-lg)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            fontSize: "0.9rem",
            transition: "all var(--transition)",
          }}
        >
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ListAssetPage() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", paddingTop: "100px" }}>

      {/* ── Hero Banner ── */}
      <section style={{
        backgroundImage: "url('/list-asset-hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "5rem 0 6rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Dark overlay for legibility */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(2,6,23,0.82) 0%, rgba(15,23,42,0.75) 100%)",
          pointerEvents: "none",
        }} />
        {/* Glow orb */}
        <div style={{
          position: "absolute", top: "-100px", right: "10%",
          width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(16,185,129,0.12)",
            border: "1px solid rgba(16,185,129,0.25)",
            borderRadius: "99px",
            padding: "0.4rem 1rem",
            marginBottom: "1.5rem",
          }}>
            <Star size={13} color="#34D399" />
            <span style={{ color: "#34D399", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              No listing fees — success only
            </span>
          </div>

          <h1 style={{
            color: "#fff",
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
            maxWidth: "800px",
            margin: "0 auto 1.5rem",
          }}>
            List Your Asset.{" "}
            <span style={{
              background: "linear-gradient(135deg, #10B981, #34D399)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              We Handle the Rest.
            </span>
          </h1>

          <p style={{
            color: "#94A3B8",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            lineHeight: 1.7,
            maxWidth: "640px",
            margin: "0 auto 2.5rem",
          }}>
            From verified buyers to in-house legal support — Mining Exchange connects asset owners with the right investors and closes deals professionally, end to end.
          </p>

          {/* Stats row */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1rem",
          }}>
            {STATS.map((s) => (
              <div key={s.label} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "var(--radius-lg)",
                padding: "1rem 1.5rem",
                textAlign: "center",
                backdropFilter: "blur(8px)",
                minWidth: "120px",
              }}>
                <div style={{
                  fontSize: "1.6rem", fontWeight: 900,
                  background: "linear-gradient(135deg,#10B981,#34D399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                  marginBottom: "0.25rem",
                }}>{s.value}</div>
                <div style={{ color: "#64748B", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Hero CTA buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", marginTop: "2.5rem" }}>
            <Link
              href="/auth/sign-up"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "linear-gradient(135deg, #10B981, #34D399)",
                color: "#fff", fontWeight: 800,
                padding: "0.9rem 2rem", borderRadius: "99px",
                fontSize: "0.95rem",
                boxShadow: "0 8px 30px rgba(16,185,129,0.4)",
              }}
            >
              <ArrowRight size={16} /> Start Listing Now — Free
            </Link>
            <Link
              href="/auth/sign-in"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff", fontWeight: 700,
                padding: "0.9rem 2rem", borderRadius: "99px",
                fontSize: "0.95rem",
                backdropFilter: "blur(8px)",
              }}
            >
              Already a seller? Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section style={{ padding: "5rem 0", background: "var(--bg-base)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", marginBottom: "0.75rem" }}>
              What We Do For You
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.6 }}>
              We are not just a marketplace — we are your full-service deal partner.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}>
            {SERVICES.map((s) => (
              <div key={s.title} style={{
                background: s.highlight
                  ? "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)"
                  : "var(--bg-card)",
                border: s.highlight
                  ? "1px solid rgba(16,185,129,0.3)"
                  : "1px solid var(--border)",
                borderRadius: "var(--radius-xl)",
                padding: "2rem",
                position: "relative",
                transition: "all var(--transition)",
                boxShadow: s.highlight ? "0 0 40px rgba(16,185,129,0.08)" : "none",
              }}>
                {s.highlight && (
                  <div style={{
                    position: "absolute", top: "1rem", right: "1rem",
                    background: "rgba(16,185,129,0.15)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    borderRadius: "99px",
                    padding: "0.2rem 0.6rem",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "#34D399",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}>
                    Core Model
                  </div>
                )}
                <div style={{
                  width: "48px", height: "48px",
                  background: s.highlight ? "rgba(16,185,129,0.15)" : "var(--bg-surface-2)",
                  borderRadius: "var(--radius)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.25rem",
                  border: s.highlight ? "1px solid rgba(16,185,129,0.25)" : "1px solid var(--border)",
                }}>
                  <s.icon size={22} color={s.highlight ? "#10B981" : "var(--primary)"} />
                </div>
                <h3 style={{
                  fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem",
                  color: s.highlight ? "#fff" : "var(--text-primary)",
                }}>
                  {s.title}
                </h3>
                <p style={{ color: s.highlight ? "#94A3B8" : "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Asset-type quick-pick strip */}
          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>List your asset by type</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
              {ASSET_TYPES.map((a) => (
                <Link
                  key={a.label}
                  href="/auth/sign-up"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                    background: "var(--bg-surface-2)",
                    border: "1px solid var(--border)",
                    borderRadius: "99px",
                    padding: "0.5rem 1.1rem",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                    transition: "all var(--transition)",
                    textDecoration: "none",
                  }}
                >
                  <span>{a.emoji}</span> {a.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ padding: "5rem 0", background: "var(--bg-surface)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", marginBottom: "0.75rem" }}>
              How It Works
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "560px", margin: "0 auto" }}>
              Four steps from submission to successful deal close.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "2rem",
            position: "relative",
          }}>
            {PROCESS_STEPS.map((s, i) => (
              <div key={s.step} style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-xl)",
                padding: "2rem",
                position: "relative",
                transition: "all var(--transition)",
              }}>
                {/* Step number */}
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1.25rem",
                }}>
                  <span style={{
                    fontSize: "0.7rem", fontWeight: 900,
                    color: s.color, letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    background: `${s.color}18`,
                    border: `1px solid ${s.color}40`,
                    borderRadius: "99px",
                    padding: "0.2rem 0.65rem",
                  }}>
                    Step {s.step}
                  </span>
                </div>
                <div style={{
                  width: "44px", height: "44px",
                  background: `${s.color}15`,
                  borderRadius: "var(--radius)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1rem",
                  border: `1px solid ${s.color}30`,
                }}>
                  <s.icon size={20} color={s.color} />
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>{s.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.7 }}>{s.desc}</p>

                {i < PROCESS_STEPS.length - 1 && (
                  <div style={{
                    position: "absolute", right: "-1rem", top: "50%",
                    transform: "translateY(-50%)",
                    display: "none",
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* CTA after steps */}
          <div style={{ textAlign: "center", marginTop: "3rem", display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <Link
              href="/auth/sign-up"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "linear-gradient(135deg, #10B981, #34D399)",
                color: "#fff", fontWeight: 800,
                padding: "0.875rem 2rem", borderRadius: "99px",
                fontSize: "0.9rem",
                boxShadow: "0 6px 24px rgba(16,185,129,0.35)",
              }}
            >
              <ArrowRight size={16} /> List My Asset
            </Link>
            <Link
              href="/marketplace"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)", fontWeight: 700,
                padding: "0.875rem 2rem", borderRadius: "99px",
                fontSize: "0.9rem",
              }}
            >
              Browse Active Listings
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <section style={{ padding: "3rem 0", background: "#020617", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "2rem",
            justifyContent: "center", alignItems: "center",
          }}>
            {[
              { icon: Shield, text: "Legally Verified Listings" },
              { icon: Lock, text: "Secure & Confidential" },
              { icon: Award, text: "Certified Deal Managers" },
              { icon: Building2, text: "Institutional-Grade Process" },
              { icon: CheckCircle, text: "100% Transparent Fees" },
            ].map((t) => (
              <div key={t.text} style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                color: "#64748B",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}>
                <t.icon size={16} color="#10B981" />
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Sign-in gate ── */}
      <section style={{ padding: "5rem 0", background: "var(--bg-base)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", marginBottom: "0.75rem" }}>
              Ready to List Your Asset?
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "480px", margin: "0 auto" }}>
              {isAuthenticated
                ? "You're signed in. Click below to submit your asset for review."
                : "Sign in or create a free account to get started. The process takes less than 10 minutes."}
            </p>
          </div>

          {isLoading ? (
            <div style={{ maxWidth: "560px", margin: "0 auto" }}>
              <div className="skeleton" style={{ height: "200px", borderRadius: "var(--radius-xl)" }} />
            </div>
          ) : isAuthenticated ? (
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>Choose the type of asset you want to list:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", marginBottom: "2rem" }}>
                {ASSET_TYPES.map((a) => (
                  <Link
                    key={a.label}
                    href="/dashboard/listings/new"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "0.5rem",
                      background: "var(--bg-surface-2)",
                      border: "1px solid var(--border)",
                      borderRadius: "99px",
                      padding: "0.6rem 1.2rem",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      transition: "all var(--transition)",
                    }}
                  >
                    <span>{a.emoji}</span> {a.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/dashboard/list-asset"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.75rem",
                  background: "linear-gradient(135deg, #10B981, #34D399)",
                  color: "#fff", fontWeight: 800,
                  padding: "1rem 2.5rem",
                  borderRadius: "99px",
                  fontSize: "1rem",
                  boxShadow: "0 8px 30px rgba(16,185,129,0.35)",
                }}
              >
                Submit Your Asset <ArrowRight size={18} />
              </Link>
              <p style={{ marginTop: "1rem", color: "var(--text-muted)", fontSize: "0.82rem" }}>
                All prices in South African Rand (ZAR). Our team reviews submissions within 48 hours.
              </p>
            </div>
          ) : (
            <SignInGate />
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "5rem 0", background: "var(--bg-surface)", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", marginBottom: "0.5rem" }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: "var(--text-muted)" }}>Everything you need to know before listing.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {FAQS.map((f) => <FAQItem key={f.q} {...f} />)}
          </div>

          <div style={{
            marginTop: "2.5rem",
            background: "rgba(16,185,129,0.06)",
            border: "1px solid rgba(16,185,129,0.2)",
            borderRadius: "var(--radius-lg)",
            padding: "1.5rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "1rem",
          }}>
            <AlertCircle size={20} color="#10B981" style={{ flexShrink: 0, marginTop: "2px" }} />
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Still have questions? Reach out to our team at{" "}
              <a href="mailto:deals@miningexchange.co" style={{ color: "var(--primary)", fontWeight: 600 }}>
                deals@miningexchange.co
              </a>{" "}
              and a deal manager will respond within one business day.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
