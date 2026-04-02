"use client"

import { Search, Bell } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
<<<<<<< HEAD
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
=======
import { useRouter } from "next/navigation"
>>>>>>> Maksym-component-developer

export function TopNav() {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full shrink-0 items-center border-b border-border/70 bg-[var(--bg-elevated)] px-4 backdrop-blur-xl md:px-8">
      <div className="flex flex-1 items-center gap-4">
<<<<<<< HEAD
        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors [&>svg]:w-5 [&>svg]:h-5" />
=======
        <SidebarTrigger className="-ml-1 text-gray-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors cursor-pointer [&>svg]:w-5 [&>svg]:h-5" />
>>>>>>> Maksym-component-developer

        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search anything..."
            className="h-10 w-full rounded-xl border border-border/70 bg-card/95 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:border-primary/40 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-4">
<<<<<<< HEAD
        <ModeToggle />
        <Link
          href="/dashboard/updates"
          prefetch={false}
          className="relative p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-background" />
        </Link>
=======
>>>>>>> Maksym-component-developer
      </div>
    </header>
  )
}

