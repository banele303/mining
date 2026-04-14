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
  title: "Southern Mines | Southern Africa's Leading Mining Asset Marketplace",
  description:
    "The specialized marketplace for buying, selling and leasing mining projects in Southern Africa. Browse verified mining assets in South Africa, Namibia, Botswana, Zimbabwe, and Mozambique.",
  keywords: "mining assets South Africa, mines for sale Namibia, gold mines Botswana, mining projects Southern Africa, Southern Africa mining marketplace",
  openGraph: {
    title: "Southern Mines | Southern Africa Mining Marketplace",
    description: "Browse thousands of mining projects across Southern Africa.",
    type: "website",
    url: "https://southernmines.com",
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
