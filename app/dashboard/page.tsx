'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import Link from "next/link";
import { 
  Plus, 
  Eye, 
  Trash2, 
  Edit, 
  MapPin, 
  DollarSign, 
  BarChart2, 
  Layers, 
  Search,
  Filter,
  ArrowUpRight
} from "lucide-react";

const TABS = ["My Listings", "Saved Listings", "Profile"];

function formatPrice(min?: number, max?: number) {
  const fmt = (n: number) => {
    if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    return `$${n.toLocaleString()}`;
  };
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return "On Application";
}

export default function DashboardPage() {
  const [tab, setTab] = useState(0);
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
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Welcome back, <span className="text-orange-500">{user?.name || "Member"}</span>
          </h1>
          <p className="text-slate-500 font-medium">Manage your mining portfolio and market activities.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm text-sm font-bold text-slate-600">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Live Market: Operational
          </div>
          <Link href="/sell" className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-slate-900/10 active:scale-95">
            <Plus size={18} strokeWidth={3} />
            List Asset
          </Link>
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Listings", value: stats.active, icon: Layers, color: "orange" },
          { label: "Market Success", value: stats.sold, icon: DollarSign, color: "green" },
          { label: "Project Views", value: stats.views.toLocaleString(), icon: Eye, color: "blue" },
          { label: "Growth Rate", value: "+12.4%", icon: BarChart2, color: "amber" },
        ].map((s) => (
          <div key={s.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-orange-200 transition-colors">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${s.color}-50 text-${s.color}-500 group-hover:scale-110 transition-transform`}>
              <s.icon size={24} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">{listings === undefined ? "..." : s.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Tabs & Search */}
        <div className="border-b border-slate-100 bg-slate-50/30 p-2 md:p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex p-1 bg-slate-100 rounded-xl self-start">
            {TABS.map((t, i) => (
              <button
                key={t}
                onClick={() => setTab(i)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  tab === i ? "bg-white text-orange-500 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                placeholder="Search listings..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 w-full md:w-64 transition-all"
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Dynamic View Area */}
        <div className="p-4 md:p-6 min-h-[400px]">
          {tab === 0 && (
            <div className="space-y-4">
              {listings === undefined ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-slate-50 animate-pulse rounded-2xl" />)}
                </div>
              ) : listings.length === 0 ? (
                <div className="flex flex-col items-center justify-center pt-20 pb-20 text-center animate-in fade-in zoom-in-95 duration-500">
                   <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
                      <Layers size={32} />
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 mb-2">No listings found</h3>
                   <p className="text-slate-500 max-w-xs mb-6 font-medium">You haven't posted any mining assets yet. Start reaching global buyers today.</p>
                   <Link href="/sell" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-orange-500/10">
                    Create New Listing
                   </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <th className="pb-4 pl-2">Project Details</th>
                        <th className="pb-4">Region</th>
                        <th className="pb-4">Stage</th>
                        <th className="pb-4">Views</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4 text-right pr-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {listings.map((l) => (
                        <tr key={l._id} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 pl-2">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center text-slate-400 text-xs shrink-0">
                                  {l.images?.[0] ? <img src={l.images[0]} className="w-full h-full object-cover" /> : <Layers size={20} />}
                               </div>
                               <div>
                                 <p className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{l.title}</p>
                                 <p className="text-xs text-slate-400 font-medium italic">{l.commodity}</p>
                               </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-1.5 text-slate-500 font-bold text-sm">
                              <MapPin size={14} className="text-orange-400" />
                              {l.country}
                            </div>
                          </td>
                          <td className="py-4">
                            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{l.stage}</span>
                          </td>
                          <td className="py-4">
                            <span className="text-sm font-black text-slate-700">{l.views.toLocaleString()}</span>
                          </td>
                          <td className="py-4">
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                              l.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${l.status === 'active' ? 'bg-green-500' : 'bg-orange-500'}`} />
                              {l.status}
                            </div>
                          </td>
                          <td className="py-4 text-right pr-2">
                             <div className="flex items-center justify-end gap-2">
                               <Link href={`/listing/${l._id}`} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all">
                                 <ArrowUpRight size={18} />
                               </Link>
                               <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all">
                                 <Edit size={18} />
                               </button>
                               <button className="p-2 text-rose-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                                 <Trash2 size={18} />
                               </button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {tab === 1 && (
             <div className="flex flex-col items-center justify-center pt-20 pb-20 text-center animate-in fade-in duration-500">
               <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
                  <DollarSign size={32} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-2">No saved assets</h3>
               <p className="text-slate-500 max-w-xs mb-6 font-medium">Bookmark projects while browsing to keep them here for quick access.</p>
               <Link href="/list" className="text-orange-500 font-bold text-sm hover:underline">
                 Start Browsing Market
               </Link>
             </div>
          )}

          {tab === 2 && (
             <div className="max-w-2xl mx-auto py-8">
                <div className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
                   <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    <UserCircle size={24} className="text-orange-500" />
                    Security & Account
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Display Name</label>
                         <input className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold" defaultValue={user?.name || ""} />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Email Address</label>
                         <input className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 outline-none font-bold opacity-60" defaultValue={user?.email || ""} readOnly />
                      </div>
                   </div>
                   <button className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold active:scale-95 transition-all shadow-lg shadow-slate-900/10">
                    Update Account
                   </button>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

function UserCircle({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"/><path d="M12 16a4 4 0 0 0-4-4h0a4 4 0 0 0 4 4z"/><path d="M8 21a4 4 0 0 1 8 0"/>
    </svg>
  );
}
