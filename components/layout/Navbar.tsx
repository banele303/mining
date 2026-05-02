'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, User, ChevronRight, PlusCircle } from "lucide-react";
import { useConvexAuth, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";

export default function Navbar() {
  const { signOut } = useAuthActions();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navLinks = [
    { label: "Marketplace", href: "/marketplace" },
    { label: "Buy Mine & Equipment", href: "/for-sale" },
    { label: "Invest", href: "/invest" },
    { label: "Our Team", href: "/team" },
  ];

  const isListAsset = pathname === "/list-asset";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transparentNav = isHome && !scrolled;
  const { isAuthenticated, isLoading } = useConvexAuth();
  const user = useQuery(api.users.viewer);

  const userInitial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email
    ? user.email.charAt(0).toUpperCase()
    : "";

  return (
    <header
      style={{ minHeight: "100px", padding: "0.5rem 0" }}
      className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 flex items-center ${
        transparentNav
          ? "bg-transparent"
          : "bg-[#020617] bg-opacity-95 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
      }`}
    >
      <div 
        className="w-full mx-auto flex items-center justify-between" 
        style={{ maxWidth: '1600px', paddingLeft: 'clamp(2rem, 5vw, 6rem)', paddingRight: 'clamp(2rem, 5vw, 6rem)' }}
      >

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <img 
            src="/miningExchange.png" 
            alt="Mining Exchange" 
            className="h-16 w-auto object-contain rounded-md transform group-hover:scale-105 transition-transform duration-300" 
          />
        </Link>

        <nav className="hidden lg:flex flex-1 justify-center items-center gap-6 xl:gap-10 px-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href.split("?")[0];
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: isActive ? "#34D399" : "#FFFFFF", padding: "1.5rem 0" }}
                className={`text-[15px] font-bold uppercase tracking-[0.1em] transition-colors hover:-translate-y-0.5`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* List Asset — highlighted CTA */}
          <Link
            href="/list-asset"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 1rem",
              borderRadius: "99px",
              background: isListAsset ? "#10B981" : "rgba(16,185,129,0.12)",
              border: "1px solid rgba(16,185,129,0.35)",
              color: isListAsset ? "#fff" : "#34D399",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              transition: "all 0.2s ease",
            }}
          >
            <PlusCircle size={14} />
            List Asset
          </Link>
        </nav>

        {/* ── Desktop Auth ── */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          {isLoading ? (
            <div className="w-24 h-12 rounded-full bg-white/10 animate-pulse" />
          ) : isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                style={{ color: "white" }}
                className="flex items-center bg-white/10 hover:bg-white/20 border border-white/10 p-1 rounded-full transition-all"
                title={user?.name || "Dashboard"}
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {userInitial || <User size={16} />}
                </div>
              </Link>
              <button
                onClick={() => void signOut()}
                className="w-12 h-12 flex items-center justify-center text-slate-300 hover:text-rose-400 hover:bg-rose-500/20 bg-white/5 border border-white/10 rounded-full transition-all"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/auth/buyer-login"
                style={{ color: "white", padding: "0.625rem 1.5rem" }}
                className="text-sm font-bold text-sky-400 hover:text-sky-300 transition-colors border border-sky-400/30 rounded-full hover:bg-sky-400/10"
              >
                Buyer Login
              </Link>
              <Link
                href="/auth/sign-in"
                style={{ color: "white" }}
                className="text-sm font-bold hover:text-emerald-400 transition-colors px-2 py-2"
              >
                Seller Login
              </Link>
              <Link
                href="/auth/sign-up"
                style={{ color: "white", padding: "0.875rem 2rem" }}
                className="bg-emerald-500 hover:bg-emerald-600 text-sm font-bold uppercase tracking-widest rounded-full shadow-lg shadow-emerald-500/30 transition-all active:scale-95 border border-emerald-400"
              >
                Join Free
              </Link>
            </div>
          )}
        </div>

        {/* ── Mobile Toggle ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden w-11 h-11 flex items-center justify-center bg-white/10 border border-white/20 rounded-full text-white transition-colors mr-2"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile Menu Overlay ── */}
      <div 
        className={`lg:hidden fixed inset-0 top-[100px] bg-slate-950/60 backdrop-blur-sm z-[998] transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile Menu Drawer ── */}
      <div 
        className={`lg:hidden fixed top-[100px] left-0 w-full bg-white border-b border-slate-200 z-[999] transition-all duration-500 transform shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-y-auto ${
          mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
        style={{ maxHeight: 'calc(100vh - 100px)' }}
      >
        <div className="flex flex-col gap-8 py-8" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
          <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 px-2">Navigation Gateway</div>
          
          <div className="grid grid-cols-1 gap-2.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href.split("?")[0];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between rounded-lg font-bold text-[15px] transition-all ${
                    isActive
                      ? "bg-gray-100 text-emerald-600 border border-gray-200 shadow-sm"
                      : "text-gray-600 bg-gray-50 border border-gray-100 hover:bg-gray-200/40"
                  }`}
                  style={{ padding: '0.875rem 1.25rem' }}
                >
                  {link.label}
                  <ChevronRight size={18} className={isActive ? "text-emerald-500" : "text-gray-400"} />
                </Link>
              );
            })}

            {/* List Asset */}
            <Link
              href="/list-asset"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between rounded-lg font-bold text-[15px] transition-all ${
                isListAsset
                  ? "bg-emerald-500 text-white border border-emerald-400 shadow-lg shadow-emerald-500/20"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}
              style={{ padding: '0.875rem 1.25rem' }}
            >
              <span className="flex items-center gap-2">
                <PlusCircle size={18} />
                List Your Asset
              </span>
              <ChevronRight size={18} />
            </Link>
          </div>

          <div className="h-px bg-slate-100 my-4" />
          
          <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 px-2">Membership & Tools</div>

          {isLoading ? (
            <div className="h-16 bg-slate-50 rounded-2xl animate-pulse" />
          ) : isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
                style={{ padding: '1rem 1.25rem' }}
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-xl font-black text-white shrink-0 shadow-lg shadow-emerald-500/20">
                  {userInitial || <User size={24} />}
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-900 font-black text-lg">My Dashboard</span>
                </div>
              </Link>
              <button
                onClick={() => { void signOut(); setMobileOpen(false); }}
                className="flex items-center gap-4 w-full text-[15px] font-bold text-gray-500 bg-red-50 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors border border-red-100"
                style={{ padding: '0.875rem 1.25rem' }}
              >
                <LogOut size={20} className="text-gray-400" />
                <span>Sign Out Account</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/auth/sign-up"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-5 rounded-2xl bg-emerald-500 text-white font-black text-lg shadow-xl shadow-emerald-500/20 active:scale-95 transition-all"
              >
                Join the Network
              </Link>
              <Link
                href="/auth/buyer-login"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-center w-full py-5 rounded-2xl font-black text-base active:scale-95 transition-all bg-sky-50 text-sky-600 border border-sky-200`}
              >
                Buyer Login
              </Link>
              <Link
                href="/auth/sign-in"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-center w-full py-5 rounded-2xl font-black text-base active:scale-95 transition-all ${
                  transparentNav ? "bg-slate-100 text-slate-900" : "bg-white border border-slate-200 text-slate-900"
                }`}
              >
                Seller Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
