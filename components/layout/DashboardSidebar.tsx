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
  TrendingUp,
  Map as MapIcon,
  Menu,
  X,
  ChevronDown
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const { signOut } = useAuthActions();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Workspace Switcher / Header */}
      <div className="px-4 h-16 flex items-center border-b border-gray-200">
        <div className="flex items-center justify-between w-full p-1.5 hover:bg-gray-100 rounded-md cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center shrink-0">
              <span className="font-bold text-white text-[10px]">S</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 truncate">Southern Institutional</span>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 flex flex-col gap-1 overflow-y-auto">
        <p className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Dashboard
        </p>
        
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm
                ${isActive 
                  ? "bg-gray-100 text-black font-medium" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <Icon 
                size={18} 
                className={isActive ? "text-black" : "text-gray-500"} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Footer / User Profile */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={() => void signOut()}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"
        >
          <LogOut size={18} className="text-gray-500" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center shrink-0">
            <span className="font-bold text-white text-xs">S</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">Southern</span>
        </div>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-md"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={`fixed top-14 left-0 bottom-0 w-64 bg-white z-40 transform transition-transform duration-200 ease-in-out md:hidden border-r border-gray-200
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar (Sticky, takes up layout space) */}
      <aside className="hidden md:flex flex-col sticky top-0 w-64 h-screen border-r border-gray-200 shrink-0">
        <SidebarContent />
      </aside>
    </>
  );
}
