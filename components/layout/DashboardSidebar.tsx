'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Database, 
  PlusCircle, 
  UserCircle, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Map as MapIcon,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

const sidebarLinks = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Assets", href: "/dashboard/my-assets", icon: Database },
  { label: "List New Asset", href: "/sell", icon: PlusCircle },
  { label: "Market Analytics", href: "/dashboard/analytics", icon: TrendingUp },
  { label: "GIS Explorer", href: "/explore", icon: MapIcon },
  { label: "Profile", href: "/dashboard/profile", icon: UserCircle },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { signOut } = useAuthActions();

  // Handle auto-collapse on smaller desktop screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) setCollapsed(true);
      else setCollapsed(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-[60] md:hidden w-12 h-12 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-transform active:scale-90"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[55] md:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside 
        className={`fixed left-0 top-0 h-screen bg-slate-950 text-white transition-all duration-500 z-[56] flex flex-col border-r border-white/5 
          ${collapsed ? "w-[88px]" : "w-[280px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div className="h-24 flex items-center gap-4 px-7">
          <div className="w-10 h-10 rounded-xl bg-orange-500 shadow-lg shadow-orange-500/20 flex items-center justify-center shrink-0">
            <span className="font-black text-white text-lg">S</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-500">
              <span className="font-black text-xl tracking-tighter uppercase leading-none">Southern</span>
              <span className="text-[10px] font-bold text-orange-500 tracking-[0.2em] uppercase mt-1">Institutional</span>
            </div>
          )}
        </div>

        {/* Navigation Section */}
        <div className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto overflow-x-hidden scrollbar-hide">
          <p className={`px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 ${collapsed ? "text-center px-0" : ""}`}>
            {collapsed ? "•••" : "Main Navigation"}
          </p>
          
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group
                  ${isActive 
                    ? "bg-orange-500/10 text-orange-500 shadow-sm" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-r-full shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
                )}
                
                <Icon 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-colors shrink-0 ${isActive ? "text-orange-500" : "group-hover:text-white"}`} 
                />
                
                {!collapsed && (
                  <span className={`text-[13px] font-bold tracking-tight transition-all truncate animate-in fade-in slide-in-from-left-4 duration-300`}>
                    {link.label}
                  </span>
                )}

                {/* Tooltip for collapsed mode */}
                {collapsed && (
                  <div className="absolute left-20 px-3 py-2 bg-slate-900 text-white text-[11px] font-bold rounded-xl opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap z-50 pointer-events-none border border-white/10 shadow-2xl">
                    {link.label}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-6 mt-auto space-y-3 bg-gradient-to-t from-slate-950 to-transparent">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex w-full items-center gap-4 px-4 py-3 text-slate-500 hover:text-white transition-colors group"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            {!collapsed && <span className="text-xs font-black uppercase tracking-widest">Collapse View</span>}
          </button>
          
          <button
            onClick={() => void signOut()}
            className="w-full flex items-center gap-4 px-4 py-4 text-rose-500/70 hover:text-rose-400 hover:bg-rose-500/5 rounded-2xl transition-all group"
          >
            <LogOut size={20} />
            {!collapsed && <span className="text-[13px] font-black uppercase tracking-widest text-rose-500/80">Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

