'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BarChart3, TrendingUp, Eye, DollarSign, Globe, ArrowUpRight } from "lucide-react";

export default function AnalyticsPage() {
  const listings = useQuery(api.listings.getListings, {});

  const totalViews = listings?.reduce((s, l) => s + l.views, 0) ?? 0;
  const active = listings?.filter((l) => l.status === "active").length ?? 0;
  const totalValue = listings?.reduce((s, l) => s + (l.priceMin ?? 0), 0) ?? 0;
  const countries = [...new Set(listings?.map((l) => l.country).filter(Boolean) ?? [])];

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Market Analytics</h1>
        <p className="text-sm text-gray-500 mt-0.5">Portfolio performance and market intelligence overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Views",     value: totalViews.toLocaleString(), icon: Eye,       change: "+12% vs last month" },
          { label: "Active Listings", value: active,                      icon: BarChart3, change: `of ${listings?.length ?? 0} total` },
          { label: "Portfolio Value", value: `$${(totalValue / 1_000_000).toFixed(0)}M`,  icon: DollarSign, change: "Market estimate" },
          { label: "Markets Covered", value: countries.length,            icon: Globe,     change: "Countries" },
        ].map((k, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-7 shadow-sm flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{k.label}</span>
              <div className="w-9 h-9 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center">
                <k.icon size={17} className="text-gray-400" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{listings === undefined ? "—" : k.value}</p>
              <p className="text-xs text-gray-400 mt-1">{k.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Top Performing Assets */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-7 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900">Top Performing Assets</h2>
            <p className="text-xs text-gray-500 mt-0.5">Ranked by engagement and view count</p>
          </div>
          <TrendingUp size={18} className="text-gray-400" />
        </div>

        <div className="flex flex-col divide-y divide-gray-100">
          {listings === undefined ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between px-7 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg animate-pulse" />
                  <div className="space-y-1.5">
                    <div className="h-3.5 w-40 bg-gray-100 animate-pulse rounded" />
                    <div className="h-3 w-24 bg-gray-100 animate-pulse rounded" />
                  </div>
                </div>
                <div className="h-3 w-16 bg-gray-100 animate-pulse rounded" />
              </div>
            ))
          ) : (
            [...(listings ?? [])]
              .sort((a, b) => b.views - a.views)
              .slice(0, 6)
              .map((l, i) => (
                <div key={l._id} className="flex items-center justify-between px-7 py-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-gray-400 w-5 text-center">#{i + 1}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{l.title}</p>
                      <p className="text-xs text-gray-500">{l.country} · {l.commodity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-semibold text-gray-900">{l.views.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">views</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      l.status === "active" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-gray-100 text-gray-600"
                    }`}>{l.status}</span>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      {/* Geographic Spread */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-7 py-5 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-900">Geographic Spread</h2>
          <p className="text-xs text-gray-500 mt-0.5">Asset distribution across markets</p>
        </div>
        <div className="p-7 flex flex-wrap gap-2">
          {listings === undefined ? (
            [...Array(6)].map((_, i) => <div key={i} className="h-8 w-24 bg-gray-100 animate-pulse rounded-full" />)
          ) : (
            countries.map((country) => {
              const count = listings.filter((l) => l.country === country).length;
              return (
                <div key={country} className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full">
                  <Globe size={13} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">{country}</span>
                  <span className="text-xs font-bold text-gray-400">{count}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
