"use client"

import dynamic from "next/dynamic"
import { Bell, Menu, MoonStar } from "lucide-react"

const DashboardMobileNav = dynamic(
  () =>
    import("@/components/layout/dashboard-mobile-nav").then(
      (module) => module.DashboardMobileNav
    ),
  {
    ssr: false,
    loading: () => (
      <button
        type="button"
        aria-label="Open navigation menu"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/70 text-muted-foreground lg:hidden"
      >
        <Menu className="h-[18px] w-[18px]" />
      </button>
    ),
  }
)

const NotificationDrawer = dynamic(
  () =>
    import("@/components/layout/notification-drawer").then(
      (module) => module.NotificationDrawer
    ),
  {
    ssr: false,
    loading: () => (
      <button
        type="button"
        aria-label="Open notifications"
        className="group relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/70 text-muted-foreground"
      >
        <Bell className="h-[18px] w-[18px]" />
      </button>
    ),
  }
)

const ModeToggle = dynamic(
  () => import("@/components/mode-toggle").then((module) => module.ModeToggle),
  {
    ssr: false,
    loading: () => (
      <button
        type="button"
        aria-label="Toggle theme"
        className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground"
      >
        <MoonStar className="h-[18px] w-[18px]" />
      </button>
    ),
  }
)

export function DashboardHeaderMobileNav() {
  return <DashboardMobileNav />
}

export function DashboardHeaderActions() {
  return (
    <>
      <NotificationDrawer />
      <ModeToggle />
    </>
  )
}
