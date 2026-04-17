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
  { id: "assets", label: "Mining Assets", icon: Layers },
  { id: "saved", label: "Watchlist", icon: Activity },
  { id: "settings", label: "Institutional Profile", icon: UserCircle }
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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* ── HEADER SECTION ── */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 py-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-orange-500/10 text-orange-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-orange-500/20">
              Institutional Account
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">
            Welcome, <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">{user?.name?.split(' ')[0] || "Director"}</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg max-w-xl">
            Monitor your mineral interests and manage global acquisition inquiries across the SADC region.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/sell" 
            className="flex items-center gap-3 bg-slate-900 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-slate-900/20 active:scale-95 group"
          >
            <Plus size={20} strokeWidth={3} className="group-hover:rotate-90 transition-transform" />
            List Asset
          </Link>
        </div>
      </div>

      {/* ── STATS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: "Active Assets", value: stats.active, icon: Briefcase, color: "orange", trend: "+2 this month" },
          { label: "Portfolio Value", value: listings ? "$142M" : "...", icon: DollarSign, color: "slate", trend: "Market Est." },
          { label: "Global Reach", value: stats.views.toLocaleString(), icon: Globe, color: "blue", trend: "Unique views" },
          { label: "Growth Index", value: "84.2", icon: BarChart3, color: "green", trend: "Institutional Tier" },
        ].map((s) => (
          <div key={s.label} className="relative overflow-hidden bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:border-orange-500/30 group">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 
              ${s.color === 'orange' ? 'bg-orange-50 text-orange-500' : 
                s.color === 'blue' ? 'bg-blue-50 text-blue-500' :
                s.color === 'green' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-500'
              }`}
            >
              <s.icon size={28} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900 tracking-tighter mb-1 font-outfit">
                {listings === undefined ? "—" : s.value}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter bg-slate-50 px-2 py-0.5 rounded-full">{s.trend}</span>
              </div>
            </div>
            {/* Subtle glow on hover */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-all" />
          </div>
        ))}
      </div>

      {/* ── MAIN WORKSPACE ── */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden min-h-[600px] flex flex-col">
        {/* Navigation & Toolbar */}
        <div className="p-6 md:p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white shrink-0">
          <div className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-2xl self-start border border-slate-100">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all 
                  ${activeTab === t.id 
                    ? "bg-white text-orange-500 shadow-lg shadow-orange-500/5 translate-y-[-1px]" 
                    : "text-slate-400 hover:text-slate-600"
                  }`}
              >
                <t.icon size={16} strokeWidth={3} />
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter portfolio..." 
                className="pl-12 pr-6 py-4 bg-slate-50 border border-transparent rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-orange-500/20 w-full md:w-72 transition-all shadow-inner"
              />
            </div>
            <button className="p-4 bg-slate-50 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-2xl transition-all border border-transparent hover:border-orange-500/10">
              <Filter size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-10">
          {activeTab === "assets" && (
            <div className="space-y-6">
              {listings === undefined ? (
                <div className="grid grid-cols-1 gap-4">
                  {[...Array(3)].map((_, i) => <div key={i} className="h-28 bg-slate-50 animate-pulse rounded-[32px]" />)}
                </div>
              ) : listings.length === 0 ? (
                <div className="py-24 flex flex-col items-center justify-center text-center max-w-md mx-auto animate-in zoom-in-95 duration-700">
                   <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-200 mb-8 border-2 border-dashed border-slate-100">
                      <Layers size={48} />
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tighter text-uppercase">Empty Portfolio</h3>
                   <p className="text-slate-500 mb-10 font-bold leading-relaxed">
                     Deploy your first mineral asset to the global institutional market. Connect with verified buyers and equity partners today.
                   </p>
                   <Link href="/sell" className="bg-orange-500 hover:bg-orange-600 text-white font-black px-10 py-5 rounded-2xl shadow-2xl shadow-orange-500/20 uppercase text-xs tracking-[0.2em] transition-all active:scale-95">
                    Initialize First Asset
                   </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5">
                  {listings.map((l) => (
                    <div key={l._id} className="group relative bg-white rounded-[32px] p-5 border border-slate-100 hover:border-orange-500/20 hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row items-center gap-8">
                       {/* Image Preview */}
                       <div className="w-full md:w-44 h-32 bg-slate-50 rounded-2xl overflow-hidden shrink-0 border border-slate-100 shadow-inner group-hover:scale-[1.02] transition-transform duration-500 flex items-center justify-center text-slate-300">
                          {l.coverImage ? (
                            <img src={l.coverImage.startsWith('http') ? l.coverImage : `https://images.unsplash.com/photo-1590486803833-ffc6dc08b6fe?q=80&w=400`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                          ) : (
                            <Layers size={24} />
                          )}
                       </div>

                       {/* Core Info */}
                       <div className="flex-1 min-w-0 py-2">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
                               {l.stage}
                            </span>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                               {l.commodity}
                            </span>
                          </div>
                          <h4 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight group-hover:text-orange-500 transition-colors truncate mb-1">
                             {l.title}
                          </h4>
                          <div className="flex items-center gap-4 text-slate-400 font-bold text-xs uppercase tracking-widest">
                             <div className="flex items-center gap-1.5">
                                <MapPin size={14} className="text-orange-400" />
                                {l.country}
                             </div>
                             <div className="flex items-center gap-1.5">
                                <Activity size={14} className="text-slate-400" />
                                {l.views.toLocaleString()} Views
                             </div>
                          </div>
                       </div>

                       {/* Financials & Status */}
                       <div className="flex flex-row md:flex-col items-center md:items-end gap-6 md:gap-2 shrink-0 px-4">
                          <div className="text-right">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Asking Range</p>
                             <p className="text-xl font-black text-slate-900 leading-none">
                                {l.priceMin ? `$${(l.priceMin / 1000000).toFixed(1)}M+` : "P.O.A"}
                             </p>
                          </div>
                          <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2
                             ${l.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-500/10' : 'bg-slate-50 text-slate-500 border border-slate-200'}
                          `}>
                             <div className={`w-2 h-2 rounded-full animate-pulse ${l.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                             {l.status}
                          </div>
                       </div>

                       {/* Actions */}
                       <div className="flex md:flex-col items-center justify-center gap-2 w-full md:w-auto md:border-l border-slate-50 md:pl-6">
                          <Link href={`/listing/${l._id}`} className="flex-1 md:flex-none p-4 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-100 rounded-2xl transition-all shadow-sm">
                             <ArrowUpRight size={22} strokeWidth={2.5} />
                          </Link>
                          <button className="flex-1 md:flex-none p-4 bg-slate-50 text-slate-400 hover:text-orange-500 hover:bg-orange-50 border border-transparent hover:border-orange-500/10 rounded-2xl transition-all shadow-sm">
                             <Edit size={22} strokeWidth={2.5} />
                          </button>
                          <button className="hidden md:flex p-4 bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 border border-transparent hover:border-rose-500/10 rounded-2xl transition-all shadow-sm">
                             <MoreHorizontal size={22} strokeWidth={2.5} />
                          </button>
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "saved" && (
             <div className="py-24 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center text-slate-300 mx-auto mb-6 border border-slate-100 shadow-inner">
                   <Activity size={32} />
                </div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-widest">No Active Watchlist</h3>
                <p className="text-slate-400 font-bold text-sm max-w-xs mx-auto mt-4 leading-relaxed">
                   Bookmark strategic projects across the market to monitor developments here.
                </p>
             </div>
          )}

          {activeTab === "settings" && (
             <div className="max-w-3xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="bg-slate-50/50 rounded-[40px] p-10 border border-slate-100 relative overflow-hidden">
                   <div className="relative z-10">
                      <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase leading-none">Institutional Profile</h3>
                      <p className="text-slate-500 font-bold text-sm mb-12">Manage your corporate credentials and verified representative details.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                         <div className="space-y-3">
                            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 ml-1">Identity/Company</label>
                            <div className="relative">
                               <input className="w-full pl-6 pr-6 py-5 bg-white border border-slate-200 rounded-[20px] focus:ring-[6px] focus:ring-orange-500/5 focus:border-orange-500/30 outline-none text-slate-900 font-black tracking-tight transition-all" defaultValue={user?.name || ""} />
                            </div>
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 ml-1">Verified Email</label>
                            <div className="relative">
                               <input className="w-full pl-6 pr-6 py-5 bg-white border border-slate-200 rounded-[20px] focus:ring-[6px] focus:ring-orange-500/5 focus:border-orange-500/30 outline-none text-slate-900 font-black tracking-tight transition-all opacity-50 cursor-not-allowed" defaultValue={user?.email || ""} readOnly />
                            </div>
                         </div>
                      </div>

                      <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
                        <button className="w-full sm:w-auto bg-slate-900 hover:bg-orange-600 text-white px-12 py-5 rounded-[20px] font-black uppercase text-xs tracking-[0.2em] transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                          Synchronize Profile
                        </button>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-[200px] leading-relaxed">
                          Verified status will be updated across all active assets.
                        </p>
                      </div>
                   </div>
                   
                   {/* Background element */}
                   <div className="absolute right-[-40px] top-[-40px] w-64 h-64 bg-white rounded-full border border-slate-50 z-0" />
                </div>
             </div>
          )}
        </div>

        {/* Workspace Footer */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
             © 2026 Southern Mines Institutional Platform
           </p>
           <div className="flex items-center gap-4 text-slate-400">
              <Link href="#" className="hover:text-orange-500 transition-colors uppercase font-black text-[9px] tracking-widest">Protocol</Link>
              <Link href="#" className="hover:text-orange-500 transition-colors uppercase font-black text-[9px] tracking-widest">Compliance</Link>
           </div>
        </div>
      </div>
    </div>
  );
}

