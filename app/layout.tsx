import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mining Exchange | The Premier Marketplace for Verified Mining Assets",
  description:
    "The institutional-grade marketplace for buying, selling, and investing in mining projects across the globe. Browse verified mineral assets, agricultural land, and heavy equipment.",
  keywords: "mining assets, mines for sale, mining investment, mineral rights, commercial plots, Mining Exchange",
  openGraph: {
    title: "Mining Exchange | Global Mining & Asset Marketplace",
    description: "Browse verified mining projects and premium commercial assets globally.",
    type: "website",
    url: "https://miningexchange.com",
  },
};

import LayoutWrapper from "@/components/layout/LayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <ConvexClientProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
