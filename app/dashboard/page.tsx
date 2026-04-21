'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import Link from "next/link";
import { 
  Plus, DollarSign, BarChart3, Layers, Search,
  Filter, Briefcase, Activity, Globe, MoreHorizontal, ArrowUpRight, TrendingUp,
  ArrowLeft
} from "lucide-react";
import NewListingForm from "@/components/dashboard/NewListingForm";

export default function DashboardPage() {
  const [view, setView] = useState<"overview" | "create">("overview");
  const [activeTab, setActiveTab] = useState("assets");
  const [searchQuery, setSearchQuery] = useState("");
  const listings = useQuery(api.listings.getListings, {});
  const user = useQuery(api.users.viewer);

  const stats = listings
    ? {
        active: listings.filter((l) => l.status === "active").length,
        views: listings.reduce((sum, l) => sum + l.views, 0),
      }
    : { active: 0, views: 0 };

  const filtered = listings?.filter((l) =>
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.country?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (view === "create") {
    return (
      <div className="flex flex-col gap-12 min-h-full">
        <div className="flex items-center justify-between border-b border-gray-100 pb-8">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setView("overview")}
              className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Create New Listing</h1>
              <p className="text-gray-500 font-medium">Follow the steps below to publish your asset to the marketplace.</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <NewListingForm onComplete={() => setView("overview")} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full" style={{ gap: '2rem' }}>

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ paddingBottom: '1.5rem', borderBottom: '1px solid #f1f5f9' }}>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Overview</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Welcome back, {user?.name?.split(" ")[0] || "Director"} — here's your portfolio summary.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/analytics"
            className="flex items-center bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            style={{ height: '2.75rem', padding: '0 1.25rem', gap: '0.625rem' }}
          >
            <TrendingUp size={16} /> Analytics
          </Link>
          <button
            onClick={() => setView("create")}
            className="flex items-center bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-black transition-colors shadow-sm"
            style={{ height: '2.75rem', padding: '0 1.25rem', gap: '0.625rem' }}
          >
            <Plus size={16} /> List Asset
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: '1.25rem' }}>
        {[
          { label: "Active Assets",   value: listings ? stats.active          : "—", icon: Briefcase,  trend: "+2 this month" },
          { label: "Portfolio Value", value: listings ? "$142M"               : "—", icon: DollarSign, trend: "Market est."  },
          { label: "Global Views",   value: listings ? stats.views.toLocaleString() : "—", icon: Globe, trend: "Unique views" },
          { label: "Growth Index",   value: listings ? "84.2"                : "—", icon: BarChart3,  trend: "Inst. tier"   },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col hover:shadow-md transition-shadow" style={{ padding: '1.75rem', gap: '1.25rem' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{s.label}</span>
              <div className="w-9 h-9 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center">
                <s.icon size={17} className="text-gray-400" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 tracking-tight">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Asset Table ── */}
      <div className="flex flex-col flex-1" style={{ gap: '1.5rem' }}>

        {/* Tab bar */}
        <div className="flex items-center border-b border-gray-200" style={{ gap: '1rem' }}>
          {[
            { id: "assets",  label: "Mining Assets" },
            { id: "watchlist", label: "Watchlist" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`relative text-sm font-bold transition-colors
                ${activeTab === t.id ? "text-emerald-600" : "text-gray-500 hover:text-gray-700"}`}
              style={{ padding: '0.75rem 1.25rem', marginBottom: '-1px' }}
            >
              {t.label}
              {activeTab === t.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Filter row */}
        {activeTab === "assets" && (
          <div className="flex flex-col sm:flex-row" style={{ gap: '1rem' }}>
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute text-gray-400" style={{ left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or location..."
                className="w-full bg-white border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition shadow-sm"
                style={{ height: '3rem', paddingLeft: '3rem', paddingRight: '1rem' }}
              />
            </div>
            <button className="flex items-center bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm" style={{ height: '3rem', padding: '0 1.5rem', gap: '0.625rem' }}>
              <Filter size={16} /> Filter
            </button>
          </div>
        )}

        {/* Table */}
        {activeTab === "assets" && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

            {/* Table header */}
            <div className="grid grid-cols-12 border-b border-gray-100 bg-gray-50" style={{ padding: '1rem 1.5rem', gap: '1rem' }}>
              <div className="col-span-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Asset</div>
              <div className="col-span-3 hidden md:block text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</div>
              <div className="col-span-2 hidden md:block text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</div>
              <div className="col-span-7 md:col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Status</div>
            </div>

            {/* Rows */}
            {listings === undefined ? (
              <div className="flex flex-col">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="grid grid-cols-12 border-b border-gray-100 last:border-0 items-center" style={{ padding: '1.25rem 1.5rem', gap: '1rem' }}>
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg animate-pulse shrink-0" />
                      <div className="space-y-2 flex-1">
                        <div className="h-3.5 bg-gray-100 animate-pulse rounded w-3/4" />
                        <div className="h-3 bg-gray-100 animate-pulse rounded w-1/2" />
                      </div>
                    </div>
                    <div className="col-span-3 hidden md:block h-3 bg-gray-100 animate-pulse rounded w-2/3" />
                    <div className="col-span-2 hidden md:block h-3 bg-gray-100 animate-pulse rounded w-1/2" />
                    <div className="col-span-7 md:col-span-2 flex justify-end">
                      <div className="h-6 w-16 bg-gray-100 animate-pulse rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered?.length === 0 ? (
              <div className="flex flex-col items-center gap-3 text-center" style={{ padding: '6rem 2rem' }}>
                <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
                  <Layers size={20} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">No assets found</p>
                  <p className="text-sm text-gray-500 mt-0.5">Try adjusting your search or list a new asset.</p>
                </div>
                <button
                  onClick={() => setView("create")}
                  className="mt-2 flex items-center gap-2 h-9 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black transition-colors"
                >
                  <Plus size={15} /> List Asset
                </button>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-gray-100">
                {filtered?.map((l) => (
                  <Link
                    key={l._id}
                    href={`/listing/${l._id}`}
                    className="grid grid-cols-12 hover:bg-gray-50 transition-colors items-center group"
                    style={{ padding: '1.25rem 1.5rem', gap: '1rem' }}
                  >
                    {/* Asset */}
                    <div className="col-span-5 flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
                        {l.coverImage ? (
                          <img src={l.coverImage} className="w-full h-full object-cover" alt={l.title} />
                        ) : (
                          <Layers size={16} className="text-gray-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{l.title}</p>
                        <p className="text-xs text-gray-500 truncate">{l.commodity}</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="col-span-3 hidden md:flex items-center text-sm text-gray-600">
                      {l.country}
                    </div>

                    {/* Price */}
                    <div className="col-span-2 hidden md:flex items-center text-sm font-semibold text-gray-900">
                      {l.priceMin ? `$${(l.priceMin / 1_000_000).toFixed(1)}M` : "P.O.A"}
                    </div>

                    {/* Status + action */}
                    <div className="col-span-7 md:col-span-2 flex items-center justify-end gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        l.status === "active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : "bg-gray-100 text-gray-600 border border-gray-200"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${l.status === "active" ? "bg-emerald-500" : "bg-gray-400"}`} />
                        <span className="capitalize">{l.status}</span>
                      </span>
                      <span className="hidden md:flex w-7 h-7 items-center justify-center rounded-md text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all">
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Watchlist empty state */}
        {activeTab === "watchlist" && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-center gap-3 text-center" style={{ padding: '6rem 2rem' }}>
            <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
              <Activity size={20} className="text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Watchlist empty</p>
              <p className="text-sm text-gray-500 mt-0.5 max-w-xs">Bookmark strategic projects from the marketplace to track them here.</p>
            </div>
            <Link href="/marketplace" className="mt-2 flex items-center gap-2 h-9 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black transition-colors" style={{ height: '2.5rem', padding: '0 1.25rem', gap: '0.5rem' }}>
              Browse Marketplace
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
