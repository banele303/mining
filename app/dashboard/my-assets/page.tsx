'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Plus, Layers, ArrowUpRight, MapPin, Eye, MoreHorizontal } from "lucide-react";

export default function MyAssetsPage() {
  const listings = useQuery(api.listings.getListings, {});

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Asset Portfolio</h1>
          <p className="text-sm text-gray-500 mt-0.5">All your listed mineral assets and properties.</p>
        </div>
        <Link
          href="/sell"
          className="flex items-center gap-2 h-10 px-4 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus size={16} /> List New Asset
        </Link>
      </div>

      {/* Summary bar */}
      <div className="flex items-center gap-6 px-7 py-5 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">Total</span>
          <span className="text-lg font-bold text-gray-900">{listings?.length ?? "—"}</span>
        </div>
        <div className="w-px h-8 bg-gray-200" />
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">Active</span>
          <span className="text-lg font-bold text-emerald-600">{listings?.filter(l => l.status === "active").length ?? "—"}</span>
        </div>
        <div className="w-px h-8 bg-gray-200" />
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">Sold</span>
          <span className="text-lg font-bold text-gray-900">{listings?.filter(l => l.status === "sold").length ?? "—"}</span>
        </div>
        <div className="w-px h-8 bg-gray-200" />
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 font-medium">Total Views</span>
          <span className="text-lg font-bold text-gray-900">{listings?.reduce((s, l) => s + l.views, 0).toLocaleString() ?? "—"}</span>
        </div>
      </div>

      {/* Asset Grid */}
      {listings === undefined ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="h-40 bg-gray-100 animate-pulse" />
              <div className="p-6 space-y-2">
                <div className="h-4 bg-gray-100 animate-pulse rounded w-3/4" />
                <div className="h-3 bg-gray-100 animate-pulse rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-xl py-20 flex flex-col items-center gap-4 text-center">
          <div className="w-14 h-14 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
            <Layers size={24} className="text-gray-400" />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900">No assets yet</p>
            <p className="text-sm text-gray-500 mt-1 max-w-xs">Start building your portfolio by listing your first mineral asset.</p>
          </div>
          <Link href="/sell" className="flex items-center gap-2 h-10 px-5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black transition-colors mt-2">
            <Plus size={16} /> List First Asset
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map((l) => (
            <div key={l._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              {/* Image */}
              <div className="h-44 bg-gray-100 overflow-hidden relative">
                {l.coverImage ? (
                  <img src={l.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={l.title} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Layers size={28} className="text-gray-300" />
                  </div>
                )}
                {/* Status badge */}
                <div className="absolute top-3 right-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${
                    l.status === "active" ? "bg-emerald-500 text-white" : "bg-gray-700 text-white"
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                    <span className="capitalize">{l.status}</span>
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <p className="text-sm font-bold text-gray-900 leading-snug">{l.title}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                    <MapPin size={12} className="shrink-0" />
                    <span>{l.country}{l.region ? `, ${l.region}` : ""}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Asking price</p>
                    <p className="text-base font-bold text-gray-900">
                      {l.priceMin ? `$${(l.priceMin / 1_000_000).toFixed(1)}M` : "P.O.A"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Eye size={13} />
                    <span>{l.views.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 mt-1 border-t border-gray-100">
                  <Link
                    href={`/listing/${l._id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 h-10 bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <ArrowUpRight size={14} /> View
                  </Link>
                  <button className="w-10 h-10 flex items-center justify-center bg-gray-50 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-100 transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
