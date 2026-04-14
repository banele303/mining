'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, User } from "lucide-react";
import { useConvexAuth, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";

const navLinks = [
  { label: "Browse Commodities", href: "/list?view=commodity" },
  { label: "Regional Locations", href: "/list?view=location" },
  { label: "Post Asset", href: "/sell" },
  { label: "Live Map", href: "/explore" },
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
      className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 ${
        transparentNav 
          ? "bg-transparent border-transparent" 
          : "bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-[72px] flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className={`w-11 h-11 md:w-12 md:h-12 flex items-center justify-center overflow-hidden rounded-xl border transition-all duration-300 ${
            transparentNav ? "bg-white/10 border-white/20" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain p-1" />
          </div>
          <span className={`text-lg md:text-xl font-black tracking-tighter transition-colors ${
            transparentNav ? "text-white" : "text-slate-900"
          }`}>
             SOUTHERN<span className="text-orange-500">MINES</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                pathname === link.href.split("?")[0]
                  ? "text-orange-500 bg-orange-50/10"
                  : transparentNav ? "text-white/90 hover:text-white hover:bg-white/10" : "text-slate-600 hover:text-orange-500 hover:bg-slate-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User / CTA Section */}
        <div className="hidden lg:flex items-center gap-4">
          {isLoading ? (
            <div className="w-24 h-9 bg-slate-200/50 rounded-lg animate-pulse" />
          ) : isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                transparentNav 
                  ? "bg-white/10 border-white/20 text-white" 
                  : "bg-slate-50 border-slate-200 text-slate-800"
              }`}>
                <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-amber-600 rounded-full flex items-center justify-center text-[11px] font-black text-white border-2 border-white shadow-sm">
                  {userInitial || <User size={14} />}
                </div>
                <span className="text-sm font-bold truncate max-w-[120px]">
                  {user?.name || "Account"}
                </span>
              </Link>
              <button
                onClick={() => void signOut()}
                className="p-2 text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-100 transition-colors"
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/sign-in" className={`px-4 py-2 text-sm font-bold ${transparentNav ? "text-white" : "text-slate-700"}`}>
                Log In
              </Link>
              <Link href="/auth/sign-up" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-orange-500/20 transition-all active:scale-95">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2.5 rounded-xl border transition-all ${
            transparentNav 
              ? "bg-white/10 border-white/20 text-white" 
              : "bg-slate-50 border-slate-200 text-slate-900"
          }`}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between p-4 rounded-xl text-base font-bold transition-all ${
                  pathname === link.href.split("?")[0]
                    ? "text-orange-600 bg-orange-50"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="mt-4 pt-4 border-t border-slate-100">
              {isLoading ? (
                <div className="h-14 bg-slate-100 rounded-xl animate-pulse" />
              ) : isAuthenticated ? (
                <div className="flex flex-col gap-3">
                  <Link 
                    href="/dashboard" 
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-600 rounded-full flex items-center justify-center text-lg font-black text-white border-2 border-white shadow-md">
                      {userInitial || <User size={24} />}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 text-lg">{user?.name || "Account"}</span>
                      <span className="text-sm text-slate-500">{user?.email}</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => { void signOut(); setMobileOpen(false); }}
                    className="flex items-center justify-center gap-2 p-4 w-full bg-rose-50 text-rose-600 font-bold rounded-xl border border-rose-100 hover:bg-rose-100 transition-colors"
                  >
                    <LogOut size={20} />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/auth/sign-in" onClick={() => setMobileOpen(false)} className="flex items-center justify-center p-4 w-full text-slate-700 font-bold rounded-xl bg-slate-100 hover:bg-slate-200 transition-all">
                    Log In
                  </Link>
                  <Link href="/auth/sign-up" onClick={() => setMobileOpen(false)} className="flex items-center justify-center p-4 w-full bg-orange-500 text-white font-bold rounded-xl shadow-xl shadow-orange-500/20 active:scale-[0.98] transition-all">
                    Create Free Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
