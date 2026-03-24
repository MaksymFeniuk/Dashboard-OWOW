import { Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 shadow-sm md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-sm font-medium">Project Overview</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative hidden md:flex">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
          <span className="sr-only">Notifications</span>
        </Button>
        <div className="flex items-center gap-3 border-l pl-4">
          <div className="flex flex-col items-end pr-2 text-sm hidden md:flex">
            <span className="font-medium text-foreground">Karim Massaoud</span>
            <span className="text-xs text-muted-foreground">karim@owow.io</span>
          </div>
          <Avatar className="h-8 w-8 cursor-pointer border">
            <AvatarImage src="" alt="Avatar" />
            <AvatarFallback>KM</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
