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
  ChevronsUpDown,
  Compass
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

const sidebarLinks = [
  { group: "Platform", links: [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Market Analytics", href: "/dashboard/analytics", icon: TrendingUp },
    { label: "GIS Explorer", href: "/explore", icon: MapIcon },
  ]},
  { group: "My Assets", links: [
    { label: "Asset Portfolio", href: "/dashboard/my-assets", icon: Database },
    { label: "List New Asset", href: "/sell", icon: PlusCircle },
  ]},
  { group: "Account", links: [
    { label: "Profile", href: "/dashboard/profile", icon: UserCircle },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ]}
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
    <div className="flex flex-col h-full bg-[#FAFAFA] text-[#111827]">
      {/* Workspace Switcher / Header */}
      <div className="px-3 pt-4 pb-2">
        <div className="flex items-center justify-between w-full px-2 py-2 hover:bg-gray-200/50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-black shadow-sm flex items-center justify-center shrink-0">
              <Compass size={14} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold tracking-tight text-gray-900 leading-none">Southern Mines</span>
              <span className="text-[11px] font-medium text-gray-500 mt-0.5">Institutional</span>
            </div>
          </div>
          <ChevronsUpDown size={14} className="text-gray-400" />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3 py-4 flex flex-col gap-6 overflow-y-auto">
        {sidebarLinks.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <p className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              {section.group}
            </p>
            
            {section.links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all text-[13px] group
                    ${isActive 
                      ? "bg-gray-200/60 text-black font-semibold shadow-sm" 
                      : "text-gray-600 hover:bg-gray-200/40 hover:text-gray-900 font-medium"
                    }
                  `}
                >
                  <Icon 
                    size={16} 
                    className={`transition-colors ${isActive ? "text-black" : "text-gray-400 group-hover:text-gray-600"}`} 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {link.label}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer / User Profile */}
      <div className="p-3">
        <button
          onClick={() => void signOut()}
          className="w-full flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors group"
        >
          <LogOut size={16} className="text-gray-400 group-hover:text-red-500 transition-colors" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-black flex items-center justify-center shrink-0">
            <Compass size={14} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-900 tracking-tight">Southern Mines</span>
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
        className={`fixed top-14 left-0 bottom-0 w-[260px] bg-[#FAFAFA] z-40 transform transition-transform duration-200 ease-in-out md:hidden border-r border-gray-200 shadow-xl
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar (Sticky, takes up layout space) */}
      <aside className="hidden md:flex flex-col sticky top-0 w-[260px] h-screen border-r border-gray-200 shrink-0 bg-[#FAFAFA]">
        <SidebarContent />
      </aside>
    </>
  );
}
