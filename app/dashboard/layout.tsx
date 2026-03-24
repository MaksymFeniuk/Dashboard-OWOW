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
      <div className="flex min-h-screen w-full bg-muted/20">
        <AppSidebar />
        <div className="flex w-full flex-col">
          <TopNav />
          <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-6xl space-y-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
