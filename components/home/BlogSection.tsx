'use client';

import Link from "next/link";
import { ArrowRight, Calendar, User, ChevronRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    category: "Market Analysis",
    title: "The Future of Lithium Mining in Africa: 2026 Outlook",
    excerpt: "With global demand for EV batteries surging, Africa is positioned as the next frontier for high-grade lithium production.",
    author: "Dr. Marcus Chen",
    date: "April 15, 2026",
    image: "https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&fit=crop&q=80&w=800",
    readTime: "6 min read"
  },
  {
    id: 2,
    category: "Industry Insights",
    title: "Sustainable Farming: Integrating Solar in Large Scale Agriculture",
    excerpt: "How top agricultural producers are reducing overheads by 40% using integrated photovoltaic irrigation systems.",
    author: "Sarah Jenkins",
    date: "April 12, 2026",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
    readTime: "4 min read"
  },
  {
    id: 3,
    category: "Investment Guide",
    title: "Commercial Property Valuation in Emerging Mining Belts",
    excerpt: "Why logistics and commercial plots near new mineral discoveries are outperforming traditional urban centers.",
    author: "Robert Vance",
    date: "April 10, 2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    readTime: "5 min read"
  }
];

export default function BlogSection() {
  return (
    <section className="section" style={{ background: "var(--bg-surface)", paddingTop: "8rem", paddingBottom: "10rem" }}>
      <div className="container" style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "4rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ maxWidth: "600px" }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--primary)", marginBottom: "1rem" }}>
              Insights & Expertise
            </p>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Market Intelligence <br /> for Institutional Investors
            </h2>
          </div>
          <Link href="/blog" style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "0.75rem", 
            fontSize: "0.95rem", 
            fontWeight: 700, 
            color: "var(--text-primary)",
            textDecoration: "none",
            padding: "0.75rem 1.5rem",
            background: "#fff",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            transition: "all 0.2s ease"
          }} className="hover-lift">
            Explore All Insights <ArrowRight size={18} />
          </Link>
        </div>

        {/* Blog Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
          gap: "2.5rem" 
        }}>
          {blogPosts.map((post) => (
            <article key={post.id} style={{ 
              display: "flex", 
              flexDirection: "column",
              background: "#fff",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid var(--border)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }} className="group hover-lift hover-shadow">
              {/* Image Wrap with Padding */}
              <div style={{ padding: "1rem", paddingBottom: "0" }}>
                <div style={{ position: "relative", height: "220px", overflow: "hidden", borderRadius: "16px" }}>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    className="group-hover:scale-105"
                  />
                  <div style={{ 
                    position: "absolute", 
                    top: "1rem", 
                    left: "1rem",
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(4px)",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "8px",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--primary)"
                  }}>
                    {post.category}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Calendar size={13} /> {post.date}
                  </span>
                  <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--border)" }} />
                  <span>{post.readTime}</span>
                </div>

                <h3 style={{ 
                  fontSize: "1.35rem", 
                  fontWeight: 800, 
                  color: "#0F172A", 
                  lineHeight: 1.3, 
                  marginBottom: "1rem",
                  letterSpacing: "-0.01em"
                }}>
                  {post.title}
                </h3>

                <p style={{ 
                  fontSize: "0.95rem", 
                  color: "var(--text-secondary)", 
                  lineHeight: 1.6, 
                  marginBottom: "2rem",
                  display: "-webkit-box",
                  WebkitLineClamp: "3",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }}>
                  {post.excerpt}
                </p>

                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1.5rem", borderTop: "1px solid var(--bg-base)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--bg-base)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <User size={16} color="var(--text-muted)" />
                    </div>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#334155" }}>{post.author}</span>
                  </div>
                  <Link href={`/blog/${post.id}`} style={{ 
                    color: "var(--primary)", 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "0.25rem", 
                    fontSize: "0.85rem", 
                    fontWeight: 800,
                    textDecoration: "none"
                  }}>
                    Read Article <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        .hover-lift { transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .hover-lift:hover { transform: translateY(-8px); }
        .hover-shadow:hover { box-shadow: 0 30px 60px -12px rgba(0,0,0,0.12), 0 18px 36px -18px rgba(0,0,0,0.12); }
      `}</style>
    </section>
  );
}
