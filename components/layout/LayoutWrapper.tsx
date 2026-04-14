'use client';

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {/* The Hero section needs to go to the very top, so we only apply top padding on non-home pages if needed, or let individual pages handle it. 
           Since globals.css removed body padding, we apply it here for non-home pages. */}
      <div className={pathname === '/' ? "" : "pt-[64px]"}>
        {children}
      </div>
      <Footer />
    </>
  );
}
