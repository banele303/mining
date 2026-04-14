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
  Map as MapIcon
} from "lucide-react";
import { useState } from "react";
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
  const { signOut } = useAuthActions();

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-slate-900 text-white transition-all duration-300 z-50 flex flex-col ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-black text-sm">S</div>
            <span className="font-black tracking-tighter text-lg uppercase">Southern</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-black text-sm">S</div>
        )}
      </div>

      {/* Sidebar Links */}
      <nav className="flex-1 py-6 px-3 flex flex-col gap-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
                isActive 
                  ? "bg-orange-500 text-white" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={20} className={isActive ? "text-white" : "group-hover:text-orange-400"} />
              {!collapsed && <span className="text-sm font-bold tracking-tight">{link.label}</span>}
              {collapsed && isActive && (
                <div className="absolute left-16 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none border border-white/10">
                  {link.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-3 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl transition-all"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!collapsed && <span className="text-sm font-bold">Collapse Sidebar</span>}
        </button>
        
        <button
          onClick={() => void signOut()}
          className="mt-2 w-full flex items-center gap-3 px-3 py-3 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-xl transition-all"
        >
          <LogOut size={20} />
          {!collapsed && <span className="text-sm font-bold">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
