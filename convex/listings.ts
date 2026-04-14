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
    return await ctx.db.get(args.id);
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
    const existing = await ctx.db.query("listings").first();
    if (existing) return "Already seeded";

    const samples = [
      {
        title: "Tier 1 Uranium Project with Significant Resource",
        slug: "tier-1-uranium-project-niger",
        description: "A world-class uranium project located in the Agadez region of Niger. The project hosts a JORC-compliant resource of 48Mlbs U3O8 and is one of the most significant undeveloped uranium deposits in Africa. The asset is drill-ready with all environmental permits in place.",
        highlights: ["JORC-compliant 48Mlbs U3O8 resource", "All environmental permits approved", "World-class infrastructure access", "Strategic location near operating mines"],
        commodity: "Uranium",
        commoditySector: "Energy Metals",
        commodityTags: ["Energy Metals", "Battery Metals"],
        country: "Niger",
        region: "Agadez",
        continent: "Africa",
        latitude: 17.0,
        longitude: 8.0,
        intention: "Sell",
        stage: "Advanced Exploration",
        priceMin: 5000000,
        priceMax: 6000000,
        currency: "USD",
        images: [],
        status: "sold",
        featured: false,
        ownerName: "James Thornton",
        ownerCompany: "Uranium Resources Group",
        ownerEmail: "j.thornton@urg.com",
        views: 234,
        createdAt: Date.now() - 86400000 * 10,
        updatedAt: Date.now(),
      },
      {
        title: "High-Grade Gold Project - Western Australia",
        slug: "high-grade-gold-project-western-australia",
        description: "Premium gold exploration asset in the highly prospective Murchison region of Western Australia. Historical drilling has returned exceptional grades including 12m @ 8.2g/t Au. Multiple undrilled targets remain to be tested.",
        highlights: ["12m @ 8.2g/t Au historical drill intercepts", "45,000ha tenement package", "Road accessible, grid power available", "Multiple priority targets identified"],
        commodity: "Gold",
        commoditySector: "Precious Metals",
        commodityTags: ["Precious Metals"],
        country: "Australia",
        region: "Western Australia",
        continent: "Australia",
        latitude: -28.0,
        longitude: 118.0,
        intention: "Sell",
        stage: "Exploration",
        priceMin: 2500000,
        priceMax: 4000000,
        currency: "USD",
        images: [],
        status: "active",
        featured: true,
        ownerName: "Sarah Maxwell",
        ownerCompany: "Goldfields Exploration Ltd",
        ownerEmail: "s.maxwell@gfe.com.au",
        views: 412,
        createdAt: Date.now() - 86400000 * 5,
        updatedAt: Date.now(),
      },
      {
        title: "Copper-Gold Porphyry Development Project - Peru",
        slug: "copper-gold-porphyry-peru",
        description: "One of South America's most advanced copper-gold porphyry projects. The asset has a PFS completed showing robust economics with a 25-year mine life. Located in a highly mining-friendly jurisdiction with excellent infrastructure.",
        highlights: ["PFS-stage with robust economics", "25-year mine life projected", "1.2Bt @ 0.45% Cu, 0.18g/t Au resource", "Excellent road, rail and port access"],
        commodity: "Copper",
        commoditySector: "Base Metals",
        commodityTags: ["Base Metals"],
        country: "Peru",
        region: "Cajamarca",
        continent: "South America",
        latitude: -7.0,
        longitude: -78.0,
        intention: "Joint Venture",
        stage: "Development",
        priceMin: 50000000,
        priceMax: 80000000,
        currency: "USD",
        images: [],
        status: "active",
        featured: true,
        ownerName: "Carlos Vega",
        ownerCompany: "Andean Copper Corp",
        ownerEmail: "c.vega@andeancopper.com",
        views: 899,
        createdAt: Date.now() - 86400000 * 2,
        updatedAt: Date.now(),
      },
      {
        title: "Lithium Brine Project - Atacama Salt Flat, Chile",
        slug: "lithium-brine-atacama-chile",
        description: "Exceptional lithium brine project in the world's most prolific lithium-producing district. Brine sampling has returned lithium concentrations of up to 1,450mg/L Li. The project is drill-ready and permits are in progress.",
        highlights: ["Located in Atacama Triangle", "1,450mg/L peak Li concentrations in brine", "12,000ha concession area", "Adjacent to SQM and Albemarle operations"],
        commodity: "Lithium",
        commoditySector: "Battery Metals",
        commodityTags: ["Battery Metals"],
        country: "Chile",
        region: "Atacama",
        continent: "South America",
        latitude: -23.5,
        longitude: -68.0,
        intention: "Sell",
        stage: "Exploration",
        priceMin: 8000000,
        priceMax: 15000000,
        currency: "USD",
        images: [],
        status: "active",
        featured: true,
        ownerName: "Andrés Rojas",
        ownerCompany: "LithiumAm SA",
        ownerEmail: "a.rojas@lithiumam.com",
        views: 567,
        createdAt: Date.now() - 86400000 * 1,
        updatedAt: Date.now(),
      },
      {
        title: "Operating Gold Mine — West Africa (Ghana)",
        slug: "operating-gold-mine-ghana",
        description: "A fully operational, cash-flowing gold mine in Ghana's prolific Ashanti Gold Belt. Current production of 35,000oz Au/year with significant extension potential from known resources. All permits, plant and equipment included.",
        highlights: ["35,000oz/year current production", "5-year remaining mine life (extensible)", "Modern 500ktpa processing plant", "Full permits, plant and infrastructure"],
        commodity: "Gold",
        commoditySector: "Precious Metals",
        commodityTags: ["Precious Metals"],
        country: "Ghana",
        region: "Ashanti",
        continent: "Africa",
        latitude: 6.7,
        longitude: -1.7,
        intention: "Sell",
        stage: "Production",
        priceMin: 25000000,
        priceMax: 40000000,
        currency: "USD",
        images: [],
        status: "active",
        featured: true,
        ownerName: "Kwame Asante",
        ownerCompany: "West Africa Gold Holdings",
        ownerEmail: "k.asante@wagh.com",
        views: 1204,
        createdAt: Date.now() - 86400000 * 7,
        updatedAt: Date.now(),
      },
      {
        title: "Iron Ore Mine — Pilbara Region, Australia",
        slug: "iron-ore-mine-pilbara",
        description: "A large-scale iron ore operation in Australia's Pilbara region, one of the world's highest-quality iron ore provinces. Producing 8Mt/year of 62% Fe lump and fines. Direct shipping ore with established rail and port logistics.",
        highlights: ["8Mt/year DSO production", "62% Fe high-grade product", "Dedicated rail spur to port", "1.2Bt JORC resource remaining"],
        commodity: "Iron Ore",
        commoditySector: "Bulk Commodities",
        commodityTags: ["Bulk Commodities"],
        country: "Australia",
        region: "Pilbara",
        continent: "Australia",
        latitude: -22.0,
        longitude: 118.5,
        intention: "Sell",
        stage: "Production",
        priceMin: 200000000,
        priceMax: 350000000,
        currency: "USD",
        images: [],
        status: "active",
        featured: false,
        ownerName: "Mark Harrison",
        ownerCompany: "Pilbara Iron Ltd",
        ownerEmail: "m.harrison@pilbarairon.com",
        views: 1871,
        createdAt: Date.now() - 86400000 * 14,
        updatedAt: Date.now(),
      },
      {
        title: "Cobalt-Nickel Laterite Project — Philippines",
        slug: "cobalt-nickel-laterite-philippines",
        description: "A substantial cobalt-nickel laterite project in the highly productive Palawan arc of the Philippines. The project covers 5,200ha of prospective terrain with a 32Mt @ 1.12% Ni, 0.09% Co resource and a Scoping Study completed.",
        highlights: ["32Mt @ 1.12% Ni, 0.09% Co resource", "Scoping Study completed (NPV $280M)", "All-weather road access", "Philippine Mining Act compliance"],
        commodity: "Nickel",
        commoditySector: "Battery Metals",
        commodityTags: ["Battery Metals"],
        country: "Philippines",
        region: "Palawan",
        continent: "Asia",
        latitude: 9.5,
        longitude: 118.5,
        intention: "Farm-In/Out",
        stage: "Development",
        priceMin: 15000000,
        priceMax: 28000000,
        currency: "USD",
        images: [],
        status: "active",
        featured: false,
        ownerName: "Ramon Cruz",
        ownerCompany: "Pacific Laterites Inc",
        ownerEmail: "r.cruz@pacificlaterites.com",
        views: 345,
        createdAt: Date.now() - 86400000 * 3,
        updatedAt: Date.now(),
      },
      {
        title: "Silver-Lead-Zinc VMS Deposit — Mexico",
        slug: "silver-lead-zinc-vms-mexico",
        description: "A high-grade silver-lead-zinc VMS deposit in the prolific Mexican Silver Belt. Historical mining records show exceptional grades from shallow workings. The project has never been drilled using modern techniques.",
        highlights: ["Multiple historical workings at surface", "Grades to 1,200g/t Ag, 12% Pb, 8% Zn", "Greenfield opportunity in proven belt", "No permits required for initial drilling"],
        commodity: "Silver",
        commoditySector: "Precious Metals",
        commodityTags: ["Precious Metals", "Base Metals"],
        country: "Mexico",
        region: "Durango",
        continent: "North America",
        latitude: 25.0,
        longitude: -105.0,
        intention: "Sell",
        stage: "Exploration",
        priceMin: 1200000,
        priceMax: 2000000,
        currency: "USD",
        images: [],
        status: "active",
        featured: false,
        ownerName: "Elena Gutiérrez",
        ownerCompany: "Mexico Silver Ventures",
        ownerEmail: "e.gutierrez@mexsilver.com",
        views: 178,
        createdAt: Date.now() - 86400000 * 6,
        updatedAt: Date.now(),
      },
    ];

    for (const sample of samples) {
      await ctx.db.insert("listings", sample as any);
    }

    return `Seeded ${samples.length} listings`;
  },
});
