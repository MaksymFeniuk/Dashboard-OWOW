"use client"

import { useMemo, useState, type ElementType } from "react"
import Link from "next/link"
import {
  Bell,
  CheckCheck,
  ChevronRight,
  FlaskConical,
  Rocket,
  ShieldAlert,
  Sparkles,
} from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type NotificationItem = {
  id: number
  title: string
  message: string
  time: string
  unread: boolean
  tone: string
  icon: ElementType
}

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "Beta Release Ready",
    message: "The latest staging release is ready for client review.",
    time: "2 min ago",
    unread: true,
    tone: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    icon: Rocket,
  },
  {
    id: 2,
    title: "QA Feedback Arrived",
    message: "Twelve QA notes were added to the current sprint checklist.",
    time: "19 min ago",
    unread: true,
    tone: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    icon: FlaskConical,
  },
  {
    id: 3,
    title: "Security Review Needed",
    message: "One authentication flow still needs approval before release.",
    time: "1 hour ago",
    unread: true,
    tone: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    icon: ShieldAlert,
  },
  {
    id: 4,
    title: "Design System Updated",
    message: "New color tokens and spacing notes were added for the team.",
    time: "Today",
    unread: true,
    tone: "border-violet-500/20 bg-violet-500/10 text-violet-400",
    icon: Sparkles,
  },
]

export function NotificationDrawer() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const unreadCount = useMemo(
    () => notifications.filter((item) => item.unread).length,
    [notifications]
  )

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((item) => ({ ...item, unread: false }))
    )
  }

  return (
    <Sheet>
      <SheetTrigger
        render={
          <button className="group relative rounded-xl p-2.5 text-gray-400 transition-colors hover:bg-white/[0.06] hover:text-white dark:text-muted-foreground dark:hover:bg-accent dark:hover:text-foreground" />
        }
      >
        <Bell className="h-[18px] w-[18px] group-hover:animate-[bellShake_360ms_ease-in-out]" />
        {unreadCount > 0 && (
          <>
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-[#0a0a0f] dark:bg-primary dark:ring-background" />
            <span className="absolute -right-1 -bottom-1 inline-flex min-w-5 items-center justify-center rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold text-white dark:bg-accent dark:text-foreground">
              {unreadCount}
            </span>
          </>
        )}
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full border-l border-white/[0.08] bg-[#11131b] p-0 text-white sm:max-w-md dark:border-border/70 dark:bg-[var(--bg-elevated)] dark:text-popover-foreground"
      >
        <SheetHeader className="border-b border-white/[0.08] px-6 py-5 dark:border-border/60">
          <div className="flex items-start justify-between gap-4 pr-10">
            <div>
              <SheetTitle className="text-lg">Notifications</SheetTitle>
              <SheetDescription className="mt-1 text-gray-400 dark:text-muted-foreground">
                Updates and alerts in a side menu, without leaving the page.
              </SheetDescription>
            </div>
            <button
              type="button"
              onClick={markAllAsRead}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:text-white dark:border-border/60 dark:bg-accent/40 dark:text-muted-foreground dark:hover:text-foreground"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-3">
            {notifications.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.05] dark:border-border/50 dark:bg-accent/20 dark:hover:border-border/80 dark:hover:bg-accent/35"
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 rounded-xl border p-2.5 ${item.tone}`}>
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-white dark:text-foreground">
                          {item.title}
                        </p>
                        {item.unread && (
                          <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-blue-500 dark:bg-primary" />
                        )}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-gray-400 dark:text-muted-foreground">
                        {item.message}
                      </p>
                      <p className="mt-3 text-xs text-gray-500 dark:text-muted-foreground">
                        {item.time}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="border-t border-white/[0.08] px-6 py-4 dark:border-border/60">
          <Link
            href="/dashboard/updates"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
          >
            Open full updates page
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
