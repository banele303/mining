import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  listings: defineTable({
    title: v.string(),
    slug: v.string(),
    category: v.optional(v.string()), // "Investment" | "Acquisition" | "Minerals" | "Land" | "Plots"
    description: v.string(),
    highlights: v.array(v.string()),

    // Commodity
    commodity: v.string(),
    commoditySector: v.string(), // "Precious Metals" | "Battery Metals" | etc.
    commodityTags: v.array(v.string()),

    // Location
    country: v.string(),
    region: v.optional(v.string()),
    continent: v.string(), // "Africa" | "Asia" | "Australia" | "Europe" | "North America" | "South America"
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),

    // Transaction
    intention: v.string(), // "Sell" | "Buy" | "Joint Venture" | "Farm-In/Out" | "Lease"
    stage: v.string(),     // "Exploration" | "Advanced Exploration" | "Development" | "Production" | "Care & Maintenance"

    // Pricing
    priceMin: v.optional(v.number()),
    priceMax: v.optional(v.number()),
    currency: v.string(), // "USD" by default

    // Media
    images: v.array(v.string()), // storage IDs
    coverImage: v.optional(v.string()),

    // Status
    status: v.string(), // "active" | "sold" | "pending" | "draft"
    featured: v.boolean(),
    views: v.number(),

    // Relations
    ownerId: v.optional(v.string()),
    ownerName: v.optional(v.string()),
    ownerCompany: v.optional(v.string()),
    ownerEmail: v.optional(v.string()),
    ownerPhone: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_featured", ["featured"])
    .index("by_continent", ["continent"])
    .index("by_sector", ["commoditySector"])
    .index("by_owner", ["ownerId"])
    .index("by_slug", ["slug"]),

  // Custom user profile data (linked to auth users)
  profiles: defineTable({
    userId: v.id("users"),
    company: v.optional(v.string()),
    role: v.string(), // "buyer" | "seller" | "both" | "admin"
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  inquiries: defineTable({
    listingId: v.id("listings"),
    senderName: v.string(),
    senderEmail: v.string(),
    senderPhone: v.optional(v.string()),
    message: v.string(),
    status: v.string(), // "new" | "read" | "replied"
    createdAt: v.number(),
  }).index("by_listing", ["listingId"]),

  savedListings: defineTable({
    userId: v.string(),
    listingId: v.id("listings"),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_listing", ["userId", "listingId"]),

  savedSearches: defineTable({
    userId: v.string(),
    name: v.string(),
    filters: v.string(), // JSON stringified filters
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});
