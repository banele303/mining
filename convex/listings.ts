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
        title: "Gold Project - Witwatersrand Basin",
        slug: "gold-project-witwatersrand-south-africa",
        description: "A strategic gold asset located in the world-renowned Witwatersrand Basin. This project features high-grade underground potential with historical data indicating 8.5g/t average. Includes existing shaft infrastructure and environmental clearance.",
        highlights: ["World-class gold jurisdiction", "Existing shaft infrastructure", "Proven high-grade reef system", "95,000oz/year production target"],
        commodity: "Gold",
        commoditySector: "Precious Metals",
        commodityTags: ["Precious Metals"],
        country: "South Africa",
        region: "Gauteng",
        continent: "Africa",
        latitude: -26.2041,
        longitude: 28.0473,
        intention: "Sell",
        stage: "Advanced Exploration",
        priceMin: 15000000,
        priceMax: 25000000,
        currency: "USD",
        images: [],
        coverImage: "https://images.unsplash.com/photo-1590486803833-ffc6dc08b6fe?q=80&w=1000",
        status: "active",
        featured: true,
        ownerName: "Robert Mbeki",
        ownerCompany: "Rand Gold Resources",
        ownerEmail: "robert@randgold.co.za",
        views: 1240,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: "Lithium Brine Asset - Erongo Region",
        slug: "lithium-brine-erongo-namibia",
        description: "Premium lithium exploration project in Namibia's Erongo region. Exceptional pegmatite formations with surface sampling returning up to 2.1% Li2O. Perfectly positioned for regional export through Walvis Bay.",
        highlights: ["High-grade pegmatite outcrops", "Strategic proximity to export ports", "20,000ha exclusive prospecting license", "All-weather road access"],
        commodity: "Lithium",
        commoditySector: "Battery Metals",
        commodityTags: ["Battery Metals", "Energy Metals"],
        country: "Namibia",
        region: "Erongo",
        continent: "Africa",
        latitude: -22.5597,
        longitude: 17.0832,
        intention: "Joint Venture",
        stage: "Exploration",
        priceMin: 4500000,
        priceMax: 7000000,
        currency: "USD",
        images: [],
        coverImage: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=1000",
        status: "active",
        featured: true,
        ownerName: "Johan van der Merwe",
        ownerCompany: "Namib Metals Ltd",
        ownerEmail: "johan@namibmetals.com",
        views: 850,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: "Copperbelt Development Asset",
        slug: "copperbelt-development-zambia",
        description: "An open-pit copper project in the prestigious Zambian Copperbelt. Historic resource estimates show 120Mt @ 0.85% Cu. Significant brownfield redevelopment opportunity with local community support.",
        highlights: ["Core Copperbelt location", "Large-scale open-pit potential", "Historic JORC resource data", "Established power and rail access"],
        commodity: "Copper",
        commoditySector: "Base Metals",
        commodityTags: ["Base Metals"],
        country: "Zambia",
        region: "Copperbelt",
        continent: "Africa",
        latitude: -12.8167,
        longitude: 28.2,
        intention: "Sell",
        stage: "Development",
        priceMin: 85000000,
        priceMax: 120000000,
        currency: "USD",
        images: [],
        coverImage: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=1000",
        status: "active",
        featured: true,
        ownerName: "Chanda Mwewa",
        ownerCompany: "Lumina Copper Zambia",
        ownerEmail: "mwewa@lumina.zm",
        views: 2100,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: "Diamonds Exploration - Jwaneng Corridor",
        slug: "diamond-exploration-botswana",
        description: "Exquisite diamond prospecting license within the highly productive Jwaneng Kimberlite Corridor. Airborne magnetics have identified four high-priority targets consistent with local producing pipes.",
        highlights: ["Adjacent to world's richest diamond mines", "4 verified magnetic anomalies", "Modern airborne survey data", "Fully permitted for maiden drilling"],
        commodity: "Diamonds",
        commoditySector: "Specialty Metals",
        commodityTags: ["Specialty Metals"],
        country: "Botswana",
        region: "Southern District",
        continent: "Africa",
        latitude: -24.6282,
        longitude: 25.9231,
        intention: "Farm-In/Out",
        stage: "Exploration",
        priceMin: 3000000,
        priceMax: 5000000,
        currency: "USD",
        images: [],
        coverImage: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=1000",
        status: "active",
        featured: false,
        ownerName: "Tshepo Modise",
        ownerCompany: "Kalahari Gems",
        ownerEmail: "tshepo@kalahari.bw",
        views: 620,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: "Graphite Project - Cabo Delgado",
        slug: "graphite-project-mozambique",
        description: "High-purity flake graphite deposit in Mozambique's Cabo Delgado province. Exceptional quality suitable for the EV battery supply chain. PFS confirms low operating costs and high recovery rates.",
        highlights: ["99.8% TGC purity potential", "PFS completed with strong NPV", "Lowest quartile production costs", "Environmentally social impact study approved"],
        commodity: "Graphite",
        commoditySector: "Battery Metals",
        commodityTags: ["Battery Metals", "Industrial Minerals"],
        country: "Mozambique",
        region: "Cabo Delgado",
        continent: "Africa",
        latitude: -12.9667,
        longitude: 40.55,
        intention: "Sell",
        stage: "Development",
        priceMin: 12000000,
        priceMax: 20000000,
        currency: "USD",
        images: [],
        coverImage: "https://images.unsplash.com/photo-1528642466245-28260135d962?q=80&w=1000",
        status: "active",
        featured: false,
        ownerName: "Mateus Silva",
        ownerCompany: "Lusa Carbon",
        ownerEmail: "silva@lusocarbon.mz",
        views: 430,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
    ];

    for (const sample of samples) {
      await ctx.db.insert("listings", sample as any);
    }
    return `Seeded ${samples.length} African listings successfully`;
  },
});
