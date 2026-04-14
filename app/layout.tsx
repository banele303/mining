import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ConvexClientProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
