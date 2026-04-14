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
      style={{ minHeight: "100px", padding: "1rem 0" }}
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
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden transition-all ${
            transparentNav ? "bg-white/10" : "bg-orange-500 shadow-md"
          }`}>
            <img src="/images/logo.png" alt="Southern Mines" className="w-full h-full object-contain p-2 transform group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl md:text-3xl font-black tracking-tight text-white font-outfit" style={{ color: "white" }}>
              SOUTHERN<span className="text-orange-500">MINES</span>
            </span>
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-orange-400 mt-1">
              SADC Regional Hub
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href.split("?")[0];
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: isActive ? "#F59E0B" : "#FFFFFF", padding: "1.5rem 0" }}
                className={`text-[15px] font-bold uppercase tracking-[0.1em] transition-colors hover:-translate-y-0.5`}
              >
                {link.label}
              </Link>
            );
          })}
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
                className="flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/10 p-2 px-6 rounded-full transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {userInitial || <User size={16} />}
                </div>
                <span className="text-base font-bold leading-none pt-[1px]">{user?.name || "Dashboard"}</span>
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
                href="/auth/sign-in"
                style={{ color: "white" }}
                className="text-sm font-bold hover:text-orange-400 transition-colors px-4 py-2"
              >
                Log In
              </Link>
              <Link
                href="/auth/sign-up"
                style={{ color: "white", padding: "0.875rem 2rem" }}
                className="bg-orange-500 hover:bg-orange-600 text-sm font-bold uppercase tracking-widest rounded-full shadow-lg shadow-orange-500/30 transition-all active:scale-95 border border-orange-400"
              >
                Join Free
              </Link>
            </div>
          )}
        </div>

        {/* ── Mobile Toggle ── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden w-11 h-11 flex items-center justify-center bg-white/10 border border-white/20 rounded-full text-white transition-colors"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile Menu Overlay ── */}
      <div 
        className={`lg:hidden fixed inset-0 top-[76px] bg-slate-950/60 backdrop-blur-sm z-[998] transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile Menu Drawer ── */}
      <div 
        className={`lg:hidden fixed top-[76px] left-0 w-full bg-white border-b border-slate-200 z-[999] transition-all duration-500 transform shadow-[0_20px_40px_rgba(0,0,0,0.1)] ${
          mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl w-full mx-auto px-6 py-8 flex flex-col gap-4">
          <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 px-2">Navigation Gateway</div>
          
          <div className="grid grid-cols-1 gap-2.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href.split("?")[0];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-base transition-all ${
                    isActive
                      ? "bg-orange-50 text-orange-600 border border-orange-200"
                      : "text-slate-700 bg-slate-50 border border-slate-100 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                  <ChevronRight size={18} className={isActive ? "text-orange-500" : "text-slate-400"} />
                </Link>
              );
            })}
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
                className="flex items-center gap-4 px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center text-xl font-black text-white shrink-0 shadow-lg shadow-orange-500/20">
                  {userInitial || <User size={24} />}
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-900 font-black text-lg">{user?.name || "My Dashboard"}</span>
                  <span className="text-sm text-slate-500 font-medium truncate max-w-[200px]">{user?.email}</span>
                </div>
              </Link>
              <button
                onClick={() => { void signOut(); setMobileOpen(false); }}
                className="flex items-center justify-center gap-2 w-full px-5 py-4 bg-rose-50 text-rose-600 rounded-2xl font-black text-sm border border-rose-100 active:scale-95 transition-all"
              >
                <LogOut size={18} />
                Sign Out Account
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/auth/sign-up"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-5 rounded-2xl bg-orange-500 text-white font-black text-lg shadow-xl shadow-orange-500/20 active:scale-95 transition-all"
              >
                Join the Network
              </Link>
              <Link
                href="/auth/sign-in"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-center w-full py-5 rounded-2xl font-black text-base active:scale-95 transition-all ${
                  transparentNav ? "bg-slate-100 text-slate-900" : "bg-white border border-slate-200 text-slate-900"
                }`}
              >
                Existing Member Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
