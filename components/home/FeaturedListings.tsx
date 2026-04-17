'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ListingCard from "@/components/listings/ListingCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Seeded mock data to display the diverse portfolio
const mockFeaturedListings = [
  {
    _id: "mock-1",
    title: "Premium Commercial Plot - Sandton",
    commodity: "Commercial Land",
    commoditySector: "Real Estate",
    commodityTags: ["Zoned Commercial", "2 Hectares"],
    country: "South Africa",
    region: "Johannesburg",
    stage: "Ready for Development",
    intention: "For Sale",
    priceMin: 4500000,
    currency: "USD",
    status: "active",
    images: ["https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=800"],
    featured: true,
  },
  {
    _id: "mock-2",
    title: "Citrus Export Farm",
    commodity: "Agricultural",
    commoditySector: "Farming",
    commodityTags: ["Export Ready", "Irrigation Rights"],
    country: "South Africa",
    region: "Western Cape",
    stage: "Operational",
    intention: "For Sale",
    priceMin: 12200000,
    currency: "USD",
    status: "active",
    images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800"],
    featured: true,
  },
  {
    _id: "mock-3",
    title: "Caterpillar 797F Haul Truck",
    commodity: "Heavy Machinery",
    commoditySector: "Mining Equipment",
    commodityTags: ["2018 Model", "12,000 hrs"],
    country: "Australia",
    region: "Pilbara",
    stage: "Used - Good Condition",
    intention: "For Sale",
    priceMin: 2100000,
    currency: "USD",
    status: "active",
    images: ["https://images.unsplash.com/photo-1581451556094-1b033d4346eb?auto=format&fit=crop&q=80&w=800"],
    featured: true,
  },
  {
    _id: "mock-4",
    title: "Komatsu PC200 Excavator",
    commodity: "Construction Fleet",
    commoditySector: "Heavy Equipment",
    commodityTags: ["2021 Model", "Ready to deploy"],
    country: "UAE",
    region: "Dubai",
    stage: "Used - Excellent",
    intention: "For Sale",
    priceMin: 145000,
    currency: "USD",
    status: "active",
    images: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800"],
    featured: true,
  }
];

export default function FeaturedListings() {
  const dbListings = useQuery(api.listings.getFeaturedListings);
  
  const listings = (dbListings && dbListings.length > 0) ? dbListings : mockFeaturedListings;

  return (
    <section className="section" style={{ background: "var(--bg-surface)" }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--primary)", marginBottom: "0.5rem" }}>
              ⭐ Featured
            </p>
            <h2>Premium Assets</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "0.5rem", fontSize: "0.95rem" }}>
              Handpicked, high-quality projects from verified vendors
            </p>
          </div>
          <Link href="/list" className="btn btn-ghost" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            Browse All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Loading skeletons */}
        {dbListings === undefined && (
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
