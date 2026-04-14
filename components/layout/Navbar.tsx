'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Pickaxe, LogOut, User } from "lucide-react";
import { useConvexAuth, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";

const navLinks = [
  { label: "Browse by Commodity", href: "/list?view=commodity" },
  { label: "Browse by Location", href: "/list?view=location" },
  { label: "List an Asset", href: "/sell" },
  { label: "Explore", href: "/explore" },
];

export default function Navbar() {
  const { signOut } = useAuthActions();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transparentNav = isHome && !scrolled;
  const textColor = transparentNav ? "#FFFFFF" : "var(--text-primary)";
  const logoColor = transparentNav ? "#FFFFFF" : "var(--text-primary)";

  const { isAuthenticated, isLoading } = useConvexAuth();
  const user = useQuery(api.users.viewer);

  const userInitial = user?.name 
    ? user.name.charAt(0).toUpperCase() 
    : user?.email 
      ? user.email.charAt(0).toUpperCase() 
      : "";
  
  useEffect(() => {
    console.log("Navbar Auth State Update:", { isAuthenticated, isLoading, pathname });
  }, [isAuthenticated, isLoading, pathname]);

  return (
    <header
      id="navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 999,
        background: transparentNav
          ? "transparent"
          : scrolled
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(255, 255, 255, 0.8)",
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        backdropFilter: transparentNav ? "none" : "blur(20px)",
        WebkitBackdropFilter: transparentNav ? "none" : "blur(20px)",
        transition: "all 0.3s ease",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", height: "68px" }}>
        {/* Logo - Icon Only & Large */}
        <Link href="/" id="nav-logo" style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginRight: "3rem", flexShrink: 0 }}>
          <div style={{
            width: "48px", height: "48px",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
            transition: "all 0.4s ease",
          }}>
            <img src="/images/logo.png" alt="Southern Mines Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <span style={{ 
            fontSize: "1.25rem", 
            fontWeight: 800, 
            letterSpacing: "-0.02em",
            color: textColor,
            fontFamily: "var(--font-inter)"
          }}>
            SOUTHERN<span style={{ color: "var(--primary)" }}>MINES</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1 }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              id={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: pathname === link.href.split("?")[0] ? "var(--primary)" : textColor,
                transition: "all var(--transition)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--primary)";
                if (!transparentNav) (e.currentTarget as HTMLElement).style.background = "var(--bg-surface-2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  pathname === link.href.split("?")[0] ? "var(--primary)" : textColor;
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginLeft: "auto" }} className="desktop-cta">
          {isLoading ? (
            <div style={{ width: "100px", height: "30px", background: "var(--bg-surface-2)", borderRadius: "var(--radius-sm)", animation: "pulse 2s infinite" }} />
          ) : isAuthenticated ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Link href="/dashboard" style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "0.4rem 0.875rem",
                borderRadius: "99px",
                background: transparentNav ? "rgba(255,255,255,0.15)" : "var(--bg-surface-2)",
                border: `1px solid ${transparentNav ? "rgba(255,255,255,0.3)" : "var(--border)"}`,
                color: textColor,
                fontSize: "0.85rem",
                fontWeight: 600,
                transition: "all var(--transition)",
              }}>
                <div style={{
                  width: "28px", height: "28px", 
                  background: "linear-gradient(135deg, var(--primary), #D97706)", 
                  borderRadius: "50%", 
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  border: "2px solid #fff"
                }}>
                  {userInitial || <User size={14} />}
                </div>
                <span style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user?.name || "Account"}
                </span>
              </Link>
              <button
                onClick={() => void signOut()}
                className="btn btn-ghost btn-sm"
                style={{ color: "#EF4444", borderColor: "rgba(239, 68, 68, 0.2)", background: "rgba(239, 68, 68, 0.05)" }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <Link href="/auth/sign-in" id="nav-signin" style={{ color: textColor, fontWeight: 600, fontSize: "0.9rem" }}>
                Sign In
              </Link>
              <Link href="/auth/sign-up" id="nav-join" className="btn btn-primary btn-sm" style={{ padding: "0.5rem 1.5rem" }}>
                Join Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          id="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            marginLeft: "auto",
            background: "var(--bg-surface-2)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            padding: "0.5rem",
            cursor: "pointer",
            color: "var(--text-primary)",
          }}
          aria-label="Toggle menu"
          className="mobile-toggle"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="animate-slideDown" style={{
          background: "var(--bg-surface)",
          borderTop: "1px solid var(--border)",
          padding: "1rem",
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "block",
                padding: "0.875rem 1rem",
                borderRadius: "var(--radius)",
                color: "var(--text-secondary)",
                fontSize: "0.95rem",
                fontWeight: 500,
                marginBottom: "0.25rem",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ padding: "0.75rem 0 0", display: "flex", gap: "0.75rem", flexDirection: "column" }}>
            {isLoading ? (
              <div style={{ height: "40px", background: "var(--bg-surface-2)", borderRadius: "var(--radius)", animation: "pulse 2s infinite" }} />
            ) : isAuthenticated ? (
              <>
                <Link href="/dashboard" className="btn btn-ghost" style={{ width: "100%", justifyContent: "flex-start", gap: "0.75rem" }}>
                  <div style={{
                    width: "32px", height: "32px", 
                    background: "linear-gradient(135deg, var(--primary), #D97706)", 
                    borderRadius: "50%", 
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff",
                    fontSize: "0.9rem",
                    fontWeight: 700
                  }}>
                    {userInitial || <User size={18} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{user?.name || "My Account"}</div>
                    {user?.email && <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{user.email}</div>}
                  </div>
                </Link>
                <button
                  onClick={() => void signOut()}
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center", gap: "0.75rem" }}
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </>
            ) : (
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <Link href="/auth/sign-in" className="btn btn-ghost" style={{ flex: 1 }}>Sign In</Link>
                <Link href="/auth/sign-up" className="btn btn-primary" style={{ flex: 1 }}>Join Free</Link>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
