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
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between gap-8">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center overflow-hidden transition-all ${
            transparentNav ? "bg-white/10 border-white/20" : "bg-orange-500 border-orange-400 shadow-lg shadow-orange-500/30"
          }`}>
            <img src="/images/logo.png" alt="Southern Mines" className="w-full h-full object-contain p-1.5 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-black tracking-tight text-white font-outfit">SOUTHERN<span className="text-orange-500">MINES</span></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-400/90 mt-0.5">SADC Regional Hub</span>
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
                className={`relative px-4 py-2 rounded-lg text-[15px] font-bold transition-all duration-300 ${
                  isActive
                    ? "text-orange-400 bg-orange-500/10"
                    : transparentNav 
                      ? "text-white hover:text-orange-400" 
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

      {/* ── Mobile Menu Overlay ── */}
      <div 
        className={`lg:hidden fixed inset-0 top-[80px] bg-slate-950/60 backdrop-blur-sm z-[998] transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile Menu Drawer ── */}
      <div 
        className={`lg:hidden fixed top-[80px] left-0 w-full bg-slate-950 border-b border-white/8 z-[999] transition-all duration-500 transform shadow-2xl ${
          mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-3">
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-400 mb-2 px-4">Navigation</div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href.split("?")[0];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-5 py-4 rounded-2xl font-bold text-base transition-all ${
                    isActive
                      ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                      : "text-slate-200 bg-white/5 border border-white/5 hover:bg-white/10"
                  }`}
                >
                  {link.label}
                  <ChevronRight size={18} className={isActive ? "text-orange-500" : "text-slate-600"} />
                </Link>
              );
            })}
          </div>

          <div className="h-px bg-white/10 my-4" />
          
          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-400 mb-2 px-4">Account</div>

          {isLoading ? (
            <div className="h-16 bg-white/5 rounded-2xl animate-pulse" />
          ) : isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-4 px-5 py-5 bg-white/5 border border-white/10 rounded-2xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center text-xl font-black text-white shrink-0 shadow-lg shadow-orange-500/20">
                  {userInitial || <User size={24} />}
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-black text-lg">{user?.name || "Account"}</span>
                  <span className="text-xs text-slate-400 font-medium truncate max-w-[200px]">{user?.email}</span>
                </div>
              </Link>
              <button
                onClick={() => { void signOut(); setMobileOpen(false); }}
                className="flex items-center justify-center gap-2 w-full px-5 py-4 bg-rose-500/10 text-rose-400 rounded-2xl font-black text-sm border border-rose-500/20 active:scale-95 transition-all"
              >
                <LogOut size={18} />
                Sign Out Terminal
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/auth/sign-up"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-5 rounded-2xl bg-orange-500 text-white font-black text-lg shadow-xl shadow-orange-500/20 active:scale-95 transition-all"
              >
                Join Network
              </Link>
              <Link
                href="/auth/sign-in"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-base active:scale-95 transition-all"
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
