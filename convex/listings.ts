import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ─── GENERATE UPLOAD URL ──────────────────────────────────────────────────────
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// ─── GET STORAGE URL ─────────────────────────────────────────────────────────
export const getStorageUrl = mutation({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId as any);
  },
});

// ─── UPDATE LISTING IMAGES ────────────────────────────────────────────────────
export const updateListingImages = mutation({
  args: {
    id: v.id("listings"),
    images: v.array(v.string()),
    coverImage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      images: args.images,
      coverImage: args.coverImage ?? args.images[0],
      updatedAt: Date.now(),
    });
  },
});

// Force sync: category support included at top of args
// ─── GET ALL LISTINGS (filtered + paginated) ─────────────────────────────────
export const getListings = query({
  args: {
    category: v.optional(v.string()),
    continent: v.optional(v.string()),
    commoditySector: v.optional(v.string()),
    intention: v.optional(v.string()),
    stage: v.optional(v.string()),
    priceMin: v.optional(v.number()),
    priceMax: v.optional(v.number()),
    search: v.optional(v.string()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let listings = await ctx.db.query("listings").collect();

    // "all" bypasses the default filter (used by dashboard)
    if (!args.status || args.status === "all") {
      if (args.status !== "all") {
        listings = listings.filter((l) => l.status === "active" || l.status === "sold");
      }
      // "all" → no filter, keep everything
    } else {
      listings = listings.filter((l) => l.status === args.status);
    }

    if (args.category) {
      listings = listings.filter((l) =>
        l.category?.toLowerCase() === args.category!.toLowerCase()
      );
    }

    if (args.continent) {
      listings = listings.filter((l) =>
        l.continent.toLowerCase() === args.continent!.toLowerCase()
      );
    }
    if (args.commoditySector) {
      listings = listings.filter((l) =>
        l.commoditySector.toLowerCase() === args.commoditySector!.toLowerCase()
      );
    }
    if (args.intention) {
      listings = listings.filter((l) =>
        l.intention.toLowerCase() === args.intention!.toLowerCase()
      );
    }
    if (args.stage) {
      listings = listings.filter((l) =>
        l.stage.toLowerCase().includes(args.stage!.toLowerCase())
      );
    }
    if (args.priceMin !== undefined) {
      listings = listings.filter(
        (l) => l.priceMax !== undefined && l.priceMax >= args.priceMin!
      );
    }
    if (args.priceMax !== undefined) {
      listings = listings.filter(
        (l) => l.priceMin !== undefined && l.priceMin <= args.priceMax!
      );
    }
    if (args.search) {
      const q = args.search.toLowerCase();
      listings = listings.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.commodity.toLowerCase().includes(q) ||
          l.country.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
      );
    }

    // Sort: featured first, then newest
    listings.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.createdAt - a.createdAt;
    });

    return listings;
  },
});

// ─── GET FEATURED LISTINGS ────────────────────────────────────────────────────
export const getFeaturedListings = query({
  args: {},
  handler: async (ctx) => {
    const featured = await ctx.db
      .query("listings")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();
    
    let results = featured.filter((l) => l.status === "active" || l.status === "pending");

    // Fallback: If no featured listings, just show the latest active/pending ones
    if (results.length === 0) {
      results = await ctx.db
        .query("listings")
        .order("desc")
        .take(12);
      
      results = results.filter(l => l.status === "active" || l.status === "pending");
    }

    return results.slice(0, 6);
  },
});

export const getGlobalStats = query({
  args: {},
  handler: async (ctx) => {
    const listings = await ctx.db.query("listings").collect();
    
    const nations = new Set(listings.map(l => l.country)).size;
    const mining = listings.filter(l => l.category === "Minerals" || l.category === "equipment").length;
    const farming = listings.filter(l => (l.category === "Land" || l.category === "Plots") && l.commoditySector?.toLowerCase().includes("farm")).length;
    const commercial = listings.filter(l => (l.category === "Land" || l.category === "Plots") && l.commoditySector?.toLowerCase().includes("commercial")).length;
    const total = listings.length;

    return {
      nations,
      mining,
      farming,
      commercial,
      total,
      investors: Math.floor(total * 1.5) + 12, // mock a relationship based on real data
    };
  },
});

// ─── GET LISTING BY ID ────────────────────────────────────────────────────────
export const getListingById = query({
  args: { id: v.id("listings") },
  handler: async (ctx, args) => {
    const listing = await ctx.db.get(args.id);
    if (!listing) return null;

    // Resolve all images first
    const imageUrls = await Promise.all(
      (listing.images || []).map(async (imgId) => {
        if (!imgId) return null;
        if (imgId.startsWith("http")) return imgId;
        try {
          return await ctx.storage.getUrl(imgId);
        } catch (e) {
          return null;
        }
      })
    );

    const filteredImageUrls = imageUrls.filter((url): url is string => !!url);

    // Resolve cover image
    let coverImageUrl = null;
    if (listing.coverImage) {
      if (listing.coverImage.startsWith("http")) {
        coverImageUrl = listing.coverImage;
      } else {
        coverImageUrl = await ctx.storage.getUrl(listing.coverImage);
      }
    }

    // Fallback: if no coverImageUrl, use the first image from the array
    if (!coverImageUrl && filteredImageUrls.length > 0) {
      coverImageUrl = filteredImageUrls[0];
    }

    return { 
      ...listing, 
      coverImageUrl, 
      imageUrls: filteredImageUrls 
    };
  },
});

// ─── GET LISTING BY SLUG ──────────────────────────────────────────────────────
export const getListingBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("listings")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// ─── GET LISTINGS FOR MAP ─────────────────────────────────────────────────────
export const getListingsForMap = query({
  args: {},
  handler: async (ctx) => {
    const listings = await ctx.db.query("listings").collect();
    return listings
      .filter((l) => l.status === "active" && l.latitude && l.longitude)
      .map((l) => ({
        _id: l._id,
        title: l.title,
        latitude: l.latitude,
        longitude: l.longitude,
        commodity: l.commodity,
        commoditySector: l.commoditySector,
        country: l.country,
        priceMin: l.priceMin,
        priceMax: l.priceMax,
      }));
  },
});

// ─── GET LISTINGS BY SECTOR ───────────────────────────────────────────────────
export const getListingsBySector = query({
  args: { sector: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("listings")
      .withIndex("by_sector", (q) => q.eq("commoditySector", args.sector))
      .collect();
  },
});

// ─── INCREMENT VIEWS ──────────────────────────────────────────────────────────
export const incrementViews = mutation({
  args: { id: v.id("listings") },
  handler: async (ctx, args) => {
    const listing = await ctx.db.get(args.id);
    if (listing) {
      await ctx.db.patch(args.id, { views: listing.views + 1 });
    }
  },
});

// ─── CREATE LISTING ───────────────────────────────────────────────────────────
export const createListing = mutation({
  args: {
    ownerPhone: v.optional(v.string()),
    title: v.string(),
    description: v.string(),
    category: v.optional(v.string()),
    highlights: v.array(v.string()), // list of features
    commodity: v.string(),
    commoditySector: v.string(),
    commodityTags: v.array(v.string()),
    country: v.string(),
    region: v.optional(v.string()),
    continent: v.string(),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
    intention: v.string(),
    stage: v.string(),
    priceMin: v.optional(v.number()),
    priceMax: v.optional(v.number()),
    currency: v.string(),
    images: v.array(v.string()),
    ownerName: v.optional(v.string()),
    ownerCompany: v.optional(v.string()),
    ownerEmail: v.optional(v.string()),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    const slug = args.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      + "-" + Date.now();

    const id = await ctx.db.insert("listings", {
      ...args,
      slug,
      coverImage: args.images[0],
      status: "pending",
      views: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return id;
  },
});

// ─── SUBMIT INQUIRY ───────────────────────────────────────────────────────────
export const submitInquiry = mutation({
  args: {
    listingId: v.id("listings"),
    senderName: v.string(),
    senderEmail: v.string(),
    senderPhone: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("inquiries", {
      ...args,
      status: "new",
      createdAt: Date.now(),
    });
  },
});

// ─── DELETE LISTING ───────────────────────────────────────────────────────────
export const deleteListing = mutation({
  args: { id: v.id("listings") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// ─── UPDATE LISTING ───────────────────────────────────────────────────────────
export const updateListing = mutation({
  args: {
    id: v.id("listings"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(v.string()),
    priceMin: v.optional(v.float64()),
    priceMax: v.optional(v.float64()),
    featured: v.optional(v.boolean()),
    stage: v.optional(v.string()),
    intention: v.optional(v.string()),
    region: v.optional(v.string()),
    country: v.optional(v.string()),
    ownerPhone: v.optional(v.string()),
    phoneNumber: v.optional(v.string()), // temporarily keep for transition
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const patch = Object.fromEntries(
      Object.entries(fields).filter(([, val]) => val !== undefined)
    );
    await ctx.db.patch(id, { ...patch, updatedAt: Date.now() });
  },
});
