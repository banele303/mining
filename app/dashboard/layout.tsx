import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />
      <main className="flex-1 min-w-0 flex flex-col p-4 md:p-6 lg:p-8" style={{ paddingTop: "clamp(6rem, 10vw, 7rem)" }}>
        <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm w-full max-w-7xl mx-auto overflow-hidden" style={{ padding: '2.5rem' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
