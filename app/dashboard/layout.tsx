import { SidebarProvider } from "@/components/ui/sidebar"
import { PageTransition } from "@/components/ui/page-transition"
import { AppSidebar } from "@/components/layout/sidebar"
import { TopNav } from "@/components/layout/top-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[var(--bg-shell)] text-foreground transition-colors duration-300">
        <AppSidebar />
        <div className="relative flex w-full flex-col bg-[var(--bg-base)]">
          {/* Subtle ambient gradient */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-[400px] -right-[300px] h-[800px] w-[800px] rounded-full bg-blue-500/[0.03] blur-[120px]" />
            <div className="absolute -bottom-[200px] -left-[200px] h-[600px] w-[600px] rounded-full bg-purple-500/[0.02] blur-[120px]" />
          </div>
          <TopNav />
          <main className="relative z-10 flex-1 p-4 md:p-6 lg:p-8">
            <PageTransition className="mx-auto w-full max-w-7xl">
              {children}
            </PageTransition>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
