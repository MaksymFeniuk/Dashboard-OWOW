import Link from "next/link"
import {
  LogOut,
  Settings,
} from "lucide-react"
import { dashboardNavItems } from "@/components/layout/dashboard-nav"
import { DashboardMobileNav } from "@/components/layout/dashboard-mobile-nav"
import { NotificationDrawer } from "@/components/layout/notification-drawer"
import { ModeToggle } from "@/components/mode-toggle"
import { PageTransition } from "@/components/ui/page-transition"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[var(--bg-shell)] text-foreground">
      <aside className="hidden w-72 shrink-0 self-start border-r border-sidebar-border bg-[linear-gradient(180deg,var(--sidebar),color-mix(in_srgb,var(--sidebar)_82%,var(--bg-base)_18%))] text-sidebar-foreground shadow-[inset_-1px_0_0_rgba(255,255,255,0.03)] lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <div className="chrome-enter border-b border-sidebar-border px-6 py-7">
          <Link
            href="/dashboard"
            prefetch={false}
            aria-label="Open dashboard home"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-lg font-extrabold text-primary-foreground shadow-lg shadow-primary/20">
              O
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold tracking-tight text-sidebar-foreground">
                OWOW
              </span>
              <span className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Dashboard
              </span>
            </div>
          </Link>
        </div>

        <nav className="chrome-enter flex-1 px-4 py-5" style={{ animationDelay: "120ms" }}>
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/80">
            Navigation
          </p>
          <div className="chrome-stagger mt-3 space-y-1.5">
            {dashboardNavItems.map((item, index) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  className="chrome-enter flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  style={{ animationDelay: `${index * 60 + 200}ms` }}
                >
                  <Icon className="h-[18px] w-[18px]" />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="chrome-enter border-t border-sidebar-border px-4 py-4" style={{ animationDelay: "420ms" }}>
          <Link
            href="/dashboard/settings"
            prefetch={false}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Settings className="h-[18px] w-[18px]" />
            <span>Settings</span>
          </Link>

          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-sidebar-border/80 bg-sidebar-accent/60 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-xs font-semibold text-primary shadow-[0_10px_24px_rgba(37,99,235,0.16)]">
              JB
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                Josh Butcher
              </p>
              <p className="truncate text-[11px] text-muted-foreground">Acme Corp</p>
            </div>
            <Link
              href="/login"
              prefetch={false}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              aria-label="Log out"
            >
              <LogOut className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </aside>

      <div className="relative flex min-w-0 flex-1 flex-col bg-[var(--bg-base)]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-[260px] -top-[320px] h-[760px] w-[760px] rounded-full bg-blue-500/[0.03] blur-[120px]" />
          <div className="absolute -bottom-[180px] -left-[180px] h-[520px] w-[520px] rounded-full bg-cyan-500/[0.025] blur-[120px]" />
        </div>

        <header className="sticky top-0 z-30 border-b border-sidebar-border/90 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--sidebar)_94%,var(--bg-base)_6%),color-mix(in_srgb,var(--sidebar)_78%,var(--bg-base)_22%))] px-4 py-4 shadow-[inset_0_-1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl md:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="chrome-enter flex min-w-0 items-start gap-3">
              <DashboardMobileNav />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-300/80">
                  Client Portal
                </p>
                <h1 className="text-lg font-semibold text-foreground">
                  OWOW dashboard workspace
                </h1>
                <p className="mt-1 text-sm text-muted-foreground sm:hidden">
                  Progress-first client reporting
                </p>
              </div>
            </div>

            <div
              className="chrome-enter flex items-center gap-2"
              style={{ animationDelay: "120ms" }}
            >
              <NotificationDrawer />
              <ModeToggle />
            </div>
          </div>
        </header>

        <main className="relative z-10 flex-1 p-4 md:p-6 lg:p-8">
          <PageTransition className="motion-cascade mx-auto w-full max-w-7xl">
            {children}
          </PageTransition>
        </main>
      </div>
    </div>
  )
}
