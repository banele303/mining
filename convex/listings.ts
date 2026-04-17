import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ─── GET ALL LISTINGS (filtered + paginated) ─────────────────────────────────
export const getListings = query({
  args: {
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

    // Only show active listings by default
    if (!args.status) {
      listings = listings.filter((l) => l.status === "active" || l.status === "sold");
    } else {
      listings = listings.filter((l) => l.status === args.status);
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
    return featured.filter((l) => l.status === "active").slice(0, 6);
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
    title: v.string(),
    description: v.string(),
    highlights: v.array(v.string()),
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
      featured: false,
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

// ─── SEED SAMPLE DATA ─────────────────────────────────────────────────────────
export const seedListings = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data for a fresh seed with images
    const existing = await ctx.db.query("listings").collect();
    for (const doc of existing) {
      await ctx.db.delete(doc._id);
    }

    const samples = [
      {
        title: "Premium Commercial Plot - Sandton",
        slug: "premium-commercial-plot-sandton",
        description: "A highly sought-after commercial plot in the heart of Sandton, perfect for a high-rise development.",
        highlights: ["Zoned Commercial", "2 Hectares", "Prime Location"],
        commodity: "Commercial Land",
        commoditySector: "Real Estate",
        commodityTags: ["Zoned Commercial", "2 Hectares"],
        country: "South Africa",
        region: "Johannesburg",
        continent: "Africa",
        intention: "Sell",
        stage: "Development",
        priceMin: 4500000,
        currency: "USD",
        images: ["/generated/plot_sandton_1776410063875.png"],
        coverImage: "/generated/plot_sandton_1776410063875.png",
        status: "active",
        featured: true,
        views: 120,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: "Citrus Export Farm",
        slug: "citrus-export-farm-cape",
        description: "A sprawling citrus export farm with secured irrigation rights.",
        highlights: ["Export Ready", "Irrigation Rights", "Operational"],
        commodity: "Agricultural",
        commoditySector: "Farming",
        commodityTags: ["Export Ready", "Irrigation Rights"],
        country: "South Africa",
        region: "Western Cape",
        continent: "Africa",
        intention: "Sell",
        stage: "Production",
        priceMin: 12200000,
        currency: "USD",
        images: ["/generated/citrus_farm_1776410081613.png"],
        coverImage: "/generated/citrus_farm_1776410081613.png",
        status: "active",
        featured: true,
        views: 340,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: "Caterpillar 797F Haul Truck",
        slug: "cat-797f-haul-truck",
        description: "Well-maintained 2018 model Caterpillar 797F.",
        highlights: ["2018 Model", "12,000 hrs", "Full Service History"],
        commodity: "Heavy Machinery",
        commoditySector: "Mining Equipment",
        commodityTags: ["2018 Model", "12,000 hrs"],
        country: "Australia",
        region: "Pilbara",
        continent: "Australia",
        intention: "Sell",
        stage: "Production", 
        priceMin: 2100000,
        currency: "USD",
        images: ["/generated/haul_truck_1776410101512.png"],
        coverImage: "/generated/haul_truck_1776410101512.png",
        status: "active",
        featured: true,
        views: 89,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: "Komatsu PC200 Excavator",
        slug: "komatsu-pc200",
        description: "Ready to deploy 2021 model excavator.",
        highlights: ["2021 Model", "Ready to deploy"],
        commodity: "Construction Fleet",
        commoditySector: "Heavy Equipment",
        commodityTags: ["2021 Model", "Ready to deploy"],
        country: "UAE",
        region: "Dubai",
        continent: "Asia",
        intention: "Sell",
        stage: "Production",
        priceMin: 145000,
        currency: "USD",
        images: ["/generated/excavator_1776410118063.png"],
        coverImage: "/generated/excavator_1776410118063.png",
        status: "active",
        featured: true,
        views: 210,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: "Logistics Hub Land",
        slug: "logistics-hub-land-nairobi",
        description: "Flat terrain near highway, perfect for logistics hub.",
        highlights: ["Near Highway", "Flat Terrain"],
        commodity: "Commercial Land",
        commoditySector: "Real Estate",
        commodityTags: ["Near Highway", "Flat Terrain"],
        country: "Kenya",
        region: "Nairobi",
        continent: "Africa",
        intention: "Sell",
        stage: "Development",
        priceMin: 8900000,
        currency: "USD",
        images: ["/generated/logistics_land_1776410134835.png"],
        coverImage: "/generated/logistics_land_1776410134835.png",
        status: "active",
        featured: false,
        views: 15,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: "Sandvik Underground Drill",
        slug: "sandvik-drill",
        description: "Electric drill, very low hours.",
        highlights: ["Electric", "Low hours"],
        commodity: "Heavy Machinery",
        commoditySector: "Mining Equipment",
        commodityTags: ["Electric", "Low hours"],
        country: "Canada",
        region: "Sudbury",
        continent: "North America",
        intention: "Sell",
        stage: "Production",
        priceMin: 850000,
        currency: "USD",
        images: ["/generated/sandvik_drill_1776410162092.png"],
        coverImage: "/generated/sandvik_drill_1776410162092.png",
        status: "active",
        featured: false,
        views: 42,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: "Macadamia Nut Orchard",
        slug: "macadamia-orchard",
        description: "High yield orchard with processing plant.",
        highlights: ["High Yield", "Processing Plant"],
        commodity: "Agricultural",
        commoditySector: "Farming",
        commodityTags: ["High Yield", "Processing Plant"],
        country: "South Africa",
        region: "Mpumalanga",
        continent: "Africa",
        intention: "Sell",
        stage: "Production",
        priceMin: 6500000,
        currency: "USD",
        images: ["/generated/macadamia_orchard_1776410186750.png"],
        coverImage: "/generated/macadamia_orchard_1776410186750.png",
        status: "active",
        featured: true,
        views: 110,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: "Volvo A45G Articulated Hauler",
        slug: "volvo-a45g",
        description: "High payload hauler.",
        highlights: ["2020 Model", "41,000 kg Payload"],
        commodity: "Heavy Machinery",
        commoditySector: "Mining Equipment",
        commodityTags: ["2020 Model", "41,000 kg Payload"],
        country: "Kenya",
        region: "Mombasa",
        continent: "Africa",
        intention: "Sell",
        stage: "Production",
        priceMin: 320000,
        currency: "USD",
        images: ["/generated/volvo_hauler_1776410203989.png"],
        coverImage: "/generated/volvo_hauler_1776410203989.png",
        status: "active",
        featured: false,
        views: 22,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: "Coastal Resort Development Land",
        slug: "coastal-resort-land",
        description: "Beachfront property with approved plans.",
        highlights: ["Beachfront", "Approved Plans"],
        commodity: "Commercial Land",
        commoditySector: "Real Estate",
        commodityTags: ["Beachfront", "Approved Plans"],
        country: "Tanzania",
        region: "Zanzibar",
        continent: "Africa",
        intention: "Sell",
        stage: "Development",
        priceMin: 18500000,
        currency: "USD",
        images: ["/generated/coastal_land_1776410221906.png"],
        coverImage: "/generated/coastal_land_1776410221906.png",
        status: "active",
        featured: false,
        views: 450,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: "Atlas Copco Pit Viper",
        slug: "atlas-copco-pit-viper",
        description: "Rotary Drill in excellent condition.",
        highlights: ["Rotary Drill", "Excellent Condition"],
        commodity: "Heavy Machinery",
        commoditySector: "Mining Equipment",
        commodityTags: ["Rotary Drill", "Excellent Condition"],
        country: "Chile",
        region: "Atacama",
        continent: "South America",
        intention: "Sell",
        stage: "Production",
        priceMin: 1400000,
        currency: "USD",
        images: ["/generated/pit_viper_1776410237655.png"],
        coverImage: "/generated/pit_viper_1776410237655.png",
        status: "active",
        featured: false,
        views: 12,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
    ];

    for (const sample of samples) {
      await ctx.db.insert("listings", sample as any);
    }
    return `Seeded ${samples.length} listings successfully`;
  },
});
