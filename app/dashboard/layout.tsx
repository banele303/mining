import DashboardSidebar from "@/components/layout/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      <DashboardSidebar />
      <main className="flex-1 min-w-0 flex flex-col bg-[#FAFAFA]">
        <div className="flex-1 p-6 lg:p-10 max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
