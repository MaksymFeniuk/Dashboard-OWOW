import { Search, Bell } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

export function TopNav() {
  return (
    <header className="flex h-16 w-full items-center px-4 md:px-8 bg-transparent border-b border-border/40">
      <div className="flex flex-1 items-center gap-4">
        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors [&>svg]:w-5 [&>svg]:h-5" />

        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search anything..."
            className="w-full bg-accent/50 border border-border/50 text-foreground placeholder:text-muted-foreground pl-10 h-10 rounded-xl focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:border-primary/30 text-sm transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-4">
        <ModeToggle />
        <Link href="/dashboard/updates" className="relative p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-background" />
        </Link>
      </div>
    </header>
  )
}

