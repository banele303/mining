'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ListingCard from "@/components/listings/ListingCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedListings() {
  const listings = useQuery(api.listings.getFeaturedListings);

  return (
    <section className="section" style={{ background: "var(--bg-surface)" }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--primary)", marginBottom: "0.5rem" }}>
              ⭐ Featured
            </p>
            <h2>Premium Mining Assets</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "0.5rem", fontSize: "0.95rem" }}>
              Handpicked, high-quality projects from verified vendors
            </p>
          </div>
          <Link href="/list" className="btn btn-ghost" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            Browse All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Loading skeletons */}
        {listings === undefined && (
          <div className="grid-listings">
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
                <div className="skeleton" style={{ height: "200px" }} />
                <div style={{ padding: "1.25rem", background: "var(--bg-card)", border: "1px solid var(--border)", borderTop: "none", borderBottomLeftRadius: "var(--radius-lg)", borderBottomRightRadius: "var(--radius-lg)" }}>
                  <div className="skeleton" style={{ height: "14px", width: "60%", marginBottom: "0.75rem" }} />
                  <div className="skeleton" style={{ height: "18px", width: "90%", marginBottom: "0.5rem" }} />
                  <div className="skeleton" style={{ height: "14px", width: "75%", marginBottom: "0.4rem" }} />
                  <div className="skeleton" style={{ height: "14px", width: "65%" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Listings grid */}
        {listings && listings.length > 0 && (
          <div className="grid-listings">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing as any} />
            ))}
          </div>
        )}

        {/* Empty fallback */}
        {listings && listings.length === 0 && (
          <div className="empty-state">
            <p style={{ fontSize: "1rem", color: "var(--text-muted)" }}>No featured listings yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
