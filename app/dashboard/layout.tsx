import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/sidebar"
import { TopNav } from "@/components/layout/top-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#0a0a0f] text-white">
        <AppSidebar />
        <div className="flex w-full flex-col relative">
          {/* Subtle ambient gradient */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-[400px] -right-[300px] w-[800px] h-[800px] bg-blue-500/[0.03] rounded-full blur-[120px]" />
            <div className="absolute -bottom-[200px] -left-[200px] w-[600px] h-[600px] bg-purple-500/[0.02] rounded-full blur-[120px]" />
          </div>
          <TopNav />
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 relative z-10">
            <div className="mx-auto w-full max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
