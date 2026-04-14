'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, User, ChevronRight } from "lucide-react";
import { useConvexAuth, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";

const navLinks = [
  { label: "Commodities", href: "/list?view=commodity" },
  { label: "Locations", href: "/list?view=location" },
  { label: "Post Asset", href: "/sell" },
  { label: "Live GIS", href: "/explore" },
];

export default function Navbar() {
  const { signOut } = useAuthActions();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
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
      className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${
        transparentNav
          ? "bg-transparent"
          : "bg-slate-950/95 backdrop-blur-2xl border-b border-white/8 shadow-2xl"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-6">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center overflow-hidden transition-all ${
            transparentNav ? "bg-white/10 border-white/20" : "bg-orange-500 border-orange-400 shadow-lg shadow-orange-500/30"
          }`}>
            <img src="/images/logo.png" alt="Southern Mines" className="w-full h-full object-contain p-1.5 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tighter text-white">SOUTHERN<span className="text-orange-500">MINES</span></span>
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-orange-400 mt-0.5">SADC Regional Hub</span>
          </div>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href.split("?")[0];
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-orange-400 bg-orange-500/10"
                    : "text-slate-300 hover:text-white hover:bg-white/8"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Desktop Auth ── */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {isLoading ? (
            <div className="w-32 h-10 rounded-xl bg-white/5 animate-pulse" />
          ) : isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 bg-white/8 hover:bg-white/12 border border-white/10 px-4 py-2 rounded-xl text-white transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-[11px] font-black text-white shrink-0">
                  {userInitial || <User size={12} />}
                </div>
                <span className="text-sm font-bold truncate max-w-[100px]">{user?.name || "Account"}</span>
              </Link>
              <button
                onClick={() => void signOut()}
                className="p-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/sign-in"
                className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/auth/sign-up"
                className="text-sm font-black text-white bg-orange-500 hover:bg-orange-600 px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all active:scale-95"
              >
                Join Network
              </Link>
            </>
          )}
        </div>

        {/* ── Mobile Toggle ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden w-11 h-11 flex items-center justify-center bg-white/8 border border-white/15 rounded-xl text-white transition-colors hover:bg-white/15"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-950 border-t border-white/8">
          <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href.split("?")[0];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                    isActive
                      ? "bg-orange-500/10 text-orange-400"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                  <ChevronRight size={16} className="text-slate-500" />
                </Link>
              );
            })}

            <div className="h-px bg-white/8 my-2" />

            {isLoading ? (
              <div className="h-14 bg-white/5 rounded-xl animate-pulse" />
            ) : isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-4 px-4 py-4 bg-white/5 border border-white/10 rounded-xl"
                >
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-lg font-black text-white shrink-0">
                    {userInitial || <User size={20} />}
                  </div>
                  <div>
                    <p className="text-white font-bold">{user?.name || "Account"}</p>
                    <p className="text-xs text-slate-400">{user?.email}</p>
                  </div>
                </Link>
                <button
                  onClick={() => { void signOut(); setMobileOpen(false); }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-rose-500/10 text-rose-400 rounded-xl font-semibold text-sm"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3 mt-1">
                <Link
                  href="/auth/sign-in"
                  onClick={() => setMobileOpen(false)}
                  className="text-center py-3.5 rounded-xl bg-white/5 text-white font-semibold text-sm"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/sign-up"
                  onClick={() => setMobileOpen(false)}
                  className="text-center py-3.5 rounded-xl bg-orange-500 text-white font-black text-sm shadow-lg shadow-orange-500/25"
                >
                  Join Network
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
