import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar is fixed, so we need a placeholder to push content */}
      <DashboardSidebar />
      <div className="flex-1 transition-all duration-300">
        <main className="pl-20 md:pl-64 h-full">
          {/* Top header spacing handle if the sidebar is expanded/collapsed is handled by the fixed width of main padding */}
          <div className="p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
