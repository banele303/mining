'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import Link from "next/link";
import { 
  Plus, 
  MapPin, 
  DollarSign, 
  BarChart3, 
  Layers, 
  Search,
  Filter,
  ArrowUpRight,
  UserCircle,
  Briefcase,
  Activity,
  Globe,
  MoreHorizontal
} from "lucide-react";

const TABS = [
  { id: "assets", label: "Mining Assets" },
  { id: "saved", label: "Watchlist" },
  { id: "settings", label: "Profile" }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("assets");
  const [searchQuery, setSearchQuery] = useState("");
  const listings = useQuery(api.listings.getListings, {});
  const user = useQuery(api.users.viewer);

  const stats = listings
    ? {
        total: listings.length,
        active: listings.filter((l) => l.status === "active").length,
        sold: listings.filter((l) => l.status === "sold").length,
        views: listings.reduce((sum, l) => sum + l.views, 0),
      }
    : { total: 0, active: 0, sold: 0, views: 0 };

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* ── PAGE HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Overview
          </h1>
          <p className="text-[13px] text-gray-500">
            Manage your mineral interests and acquisition inquiries.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
            View Analytics
          </button>
          <Link 
            href="/sell" 
            className="h-10 px-5 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-900 transition-colors shadow-sm flex items-center gap-2"
          >
            <Plus size={18} />
            List Asset
          </Link>
        </div>
      </div>

      {/* ── STATS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Assets", value: stats.active, icon: Briefcase },
          { label: "Portfolio Value", value: listings ? "$142M" : "...", icon: DollarSign },
          { label: "Global Views", value: stats.views.toLocaleString(), icon: Globe },
          { label: "Growth Index", value: "84.2", icon: BarChart3 },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium text-gray-500">{s.label}</span>
              <s.icon size={16} className="text-gray-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-gray-900 tracking-tight">
                {listings === undefined ? "—" : s.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── MAIN WORKSPACE ── */}
      <div className="flex flex-col gap-4">
        
        {/* Tabs */}
        <div className="border-b border-gray-200 flex gap-6">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`pb-3 text-[13px] font-medium transition-colors relative
                ${activeTab === t.id 
                  ? "text-black" 
                  : "text-gray-500 hover:text-gray-900"
                }
              `}
            >
              {t.label}
              {activeTab === t.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-2">
          {activeTab === "assets" && (
            <div className="flex flex-col gap-4">
              
              {/* Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:max-w-md">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search assets..." 
                    className="w-full h-11 pl-11 pr-4 bg-white border border-gray-200 rounded-md text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-shadow shadow-sm"
                  />
                </div>
                <button className="h-11 px-6 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                  <Filter size={16} />
                  Filter
                </button>
              </div>

              {/* Asset List */}
              {listings === undefined ? (
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                      <div className="w-12 h-12 bg-gray-100 animate-pulse rounded-md shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-100 animate-pulse rounded w-1/4" />
                        <div className="h-3 bg-gray-100 animate-pulse rounded w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : listings.length === 0 ? (
                <div className="border border-dashed border-gray-300 rounded-lg py-20 flex flex-col items-center justify-center text-center bg-gray-50/50">
                   <div className="w-12 h-12 bg-white shadow-sm border border-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-4">
                      <Layers size={20} />
                   </div>
                   <h3 className="text-[14px] font-semibold text-gray-900 mb-1">No assets found</h3>
                   <p className="text-[13px] text-gray-500 mb-6 max-w-sm">
                     You haven't listed any mining or institutional assets yet. Create your first listing to reach global buyers.
                   </p>
                   <Link href="/sell" className="h-9 px-4 bg-black text-white text-[13px] font-medium rounded-md hover:bg-gray-900 transition-colors shadow-sm flex items-center gap-2">
                    <Plus size={16} />
                    Create Listing
                   </Link>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 px-4 md:px-6 lg:px-8 py-4 border-b border-gray-200 bg-gray-50 text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-6 md:col-span-5">Asset Name</div>
                    <div className="col-span-3 hidden md:block">Location</div>
                    <div className="col-span-3 hidden md:block">Price</div>
                    <div className="col-span-6 md:col-span-1 text-right">Status</div>
                  </div>
                  
                  {/* Rows */}
                  <div className="flex flex-col">
                    {listings.map((l) => (
                      <Link 
                        key={l._id} 
                        href={`/listing/${l._id}`}
                        className="grid grid-cols-12 gap-4 px-4 md:px-6 lg:px-8 py-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors items-center group"
                      >
                        <div className="col-span-6 md:col-span-5 flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center">
                            {l.coverImage ? (
                              <img src={l.coverImage.startsWith('http') ? l.coverImage : `https://images.unsplash.com/photo-1590486803833-ffc6dc08b6fe?q=80&w=400`} className="w-full h-full object-cover" />
                            ) : (
                              <Layers size={16} className="text-gray-400" />
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[13px] font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">{l.title}</span>
                            <span className="text-[12px] text-gray-500 truncate">{l.commodity}</span>
                          </div>
                        </div>

                        <div className="col-span-3 hidden md:flex items-center gap-1.5 text-[13px] text-gray-500">
                          {l.country}
                        </div>

                        <div className="col-span-3 hidden md:flex flex-col justify-center">
                          <span className="text-[13px] font-medium text-gray-900">
                            {l.priceMin ? `$${(l.priceMin / 1000000).toFixed(1)}M` : "P.O.A"}
                          </span>
                        </div>

                        <div className="col-span-6 md:col-span-1 flex items-center justify-end gap-3">
                          <div className={`px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide flex items-center gap-2
                            ${l.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-600 border border-gray-200'}
                          `}>
                            <div className={`w-2 h-2 rounded-full ${l.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                            <span className="capitalize">{l.status}</span>
                          </div>
                          <button className="text-gray-400 hover:text-gray-900 p-1 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "saved" && (
            <div className="border border-dashed border-gray-300 rounded-lg py-20 flex flex-col items-center justify-center text-center bg-gray-50/50">
              <div className="w-12 h-12 bg-white shadow-sm border border-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-4">
                <Activity size={20} />
              </div>
              <h3 className="text-[14px] font-semibold text-gray-900 mb-1">Watchlist Empty</h3>
              <p className="text-[13px] text-gray-500 max-w-sm">
                Save strategic projects from the marketplace to monitor their developments and pricing updates here.
              </p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-[14px] font-semibold text-gray-900">Institutional Profile</h3>
                <p className="text-[13px] text-gray-500 mt-1">Manage your corporate credentials and identity details.</p>
              </div>
              
              <div className="p-6 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-medium text-gray-700">Identity / Company</label>
                    <input 
                      className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] text-gray-900 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-shadow shadow-sm" 
                      defaultValue={user?.name || ""} 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-medium text-gray-700">Verified Email</label>
                    <input 
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-[13px] text-gray-500 cursor-not-allowed" 
                      defaultValue={user?.email || ""} 
                      readOnly 
                    />
                    <p className="text-[11px] text-gray-500">Your email is verified via your authentication provider.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                  <button className="h-9 px-4 bg-black text-white text-[13px] font-medium rounded-md hover:bg-gray-900 transition-colors shadow-sm">
                    Save Changes
                  </button>
                  <button className="h-9 px-4 bg-white border border-gray-200 text-gray-700 text-[13px] font-medium rounded-md hover:bg-gray-50 transition-colors shadow-sm">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
