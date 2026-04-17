import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <DashboardSidebar />
      
      {/* 
        The sidebar is fixed. 
        Desktop: pl-[88px] (collapsed) or pl-[280px] (expanded)
        We use a simpler approach: let the main container handle the responsive padding 
        that matches the sidebar's logic.
      */}
      <div className="flex-1 transition-all duration-500 md:pl-[88px] xl:pl-[280px]">
        <main className="min-h-screen">
          <div className="p-4 sm:p-6 lg:p-10 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
