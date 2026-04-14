'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, User, LayoutDashboard, Globe } from "lucide-react";
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
      className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${
        transparentNav 
          ? "bg-transparent py-6" 
          : "bg-slate-900/95 backdrop-blur-2xl border-b border-white/5 py-3 shadow-2xl"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo - Large & Impactful */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl border transition-all duration-700 overflow-hidden ${
            transparentNav ? "bg-white/10 border-white/20" : "bg-orange-500 border-orange-400 shadow-lg shadow-orange-500/20"
          }`}>
            <img src="/images/logo.png" alt="Southern Mines" className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white leading-none">
              SOUTHERN<span className="text-orange-500">MINES</span>
            </span>
            <span className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${
              transparentNav ? "text-orange-400" : "text-white/40"
            }`}>SADC Regional Hub</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                pathname === link.href.split("?")[0]
                  ? "text-orange-500 bg-orange-500/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User Actions */}
        <div className="hidden lg:flex items-center gap-6">
          {isLoading ? (
             <div className="w-10 h-10 bg-white/5 rounded-full animate-pulse" />
          ) : isAuthenticated ? (
            <div className="flex items-center gap-4">
               <Link href="/dashboard" className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white group hover:bg-white/10 transition-all">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-black text-[11px] text-white">
                    {userInitial || <User size={14} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black truncate max-w-[100px]">{user?.name || "Client"}</span>
                    <span className="text-[10px] font-bold text-orange-400 uppercase tracking-tighter">Dashboard</span>
                  </div>
               </Link>
               <button onClick={() => void signOut()} className="p-3 text-white/40 hover:text-rose-400 transition-colors">
                 <LogOut size={20} />
               </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
               <Link href="/auth/sign-in" className="text-white font-black text-xs uppercase tracking-widest px-4">Log In</Link>
               <Link href="/auth/sign-up" className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-xl shadow-orange-500/20 active:scale-95 transition-all">
                 Join Network
               </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="lg:hidden w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl text-white"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-white/5 shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
           {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between p-4 bg-white/5 rounded-2xl text-white font-black uppercase tracking-widest text-sm"
            >
              {link.label}
              <Globe size={18} className="text-orange-500" />
            </Link>
          ))}
          
          <div className="h-px bg-white/5 my-2" />
          
          {isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-4 p-4 bg-orange-500 rounded-2xl text-white">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center font-black text-xl">
                  {userInitial || <User size={24} />}
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-lg">{user?.name || "Client"}</span>
                  <span className="text-xs text-white/70 font-bold uppercase tracking-widest flex items-center gap-1">
                    Enter Dashboard <LayoutDashboard size={14} />
                  </span>
                </div>
              </Link>
              <button 
                onClick={() => { void signOut(); setMobileOpen(false); }}
                className="p-4 w-full bg-white/5 text-rose-400 font-black uppercase tracking-widest text-sm rounded-2xl"
              >
                Sign Out Terminal
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
               <Link href="/auth/sign-in" onClick={() => setMobileOpen(false)} className="p-4 bg-white/5 text-white font-black uppercase tracking-widest text-xs text-center rounded-2xl">Log In</Link>
               <Link href="/auth/sign-up" onClick={() => setMobileOpen(false)} className="p-4 bg-orange-500 text-white font-black uppercase tracking-widest text-xs text-center rounded-2xl">Join Now</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
