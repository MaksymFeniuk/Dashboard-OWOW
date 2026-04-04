"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, Menu, Settings } from "lucide-react"

import { dashboardNavItems } from "@/components/layout/dashboard-nav"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function DashboardMobileNav() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger
        render={
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/70 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring lg:hidden" />
        }
      >
        <Menu className="h-[18px] w-[18px]" />
        <span className="sr-only">Open navigation menu</span>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-full border-r border-border/70 bg-[var(--bg-elevated)] p-0 text-foreground sm:max-w-sm"
      >
        <SheetHeader className="border-b border-border/60 px-6 py-5">
          <SheetTitle className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-lg font-extrabold text-primary-foreground shadow-lg shadow-primary/20">
              O
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg font-semibold">OWOW</span>
              <span className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Dashboard
              </span>
            </span>
          </SheetTitle>
          <SheetDescription>
            Navigate between the key client dashboard pages.
          </SheetDescription>
        </SheetHeader>

        <nav className="flex flex-1 flex-col gap-1 px-4 py-5">
          {dashboardNavItems.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-border/60 px-4 py-4">
          <Link
            href="/dashboard/settings"
            prefetch={false}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Settings className="h-[18px] w-[18px]" />
            <span>Settings</span>
          </Link>

          <Link
            href="/login"
            prefetch={false}
            className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <LogOut className="h-[18px] w-[18px]" />
            <span>Log out</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
