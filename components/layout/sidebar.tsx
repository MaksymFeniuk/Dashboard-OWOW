"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  FolderKanban,
  Bell,
  DollarSign,
  FileText,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  TrendingUp,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const navItems = [
  { title: "Overview", url: "/dashboard", icon: Home },
  { title: "Projects", url: "/dashboard/projects", icon: FolderKanban },
  { title: "Updates", url: "/dashboard/updates", icon: Bell },
  { title: "Budget", url: "/dashboard/budget", icon: DollarSign },  
  { title: "Team", url: "/dashboard/team", icon: Users },
  { title: "Documents", url: "/dashboard/documents", icon: FileText },
  { title: "Progress", url: "/dashboard/progress", icon: TrendingUp },

] as const

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" className="bg-sidebar border-r border-sidebar-border text-sidebar-foreground shadow-[inset_-1px_0_0_rgba(255,255,255,0.02)]">
      <SidebarHeader className="h-24 flex flex-col justify-center px-6">
        <Link href="/dashboard" prefetch={false} className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-extrabold text-lg shadow-lg shadow-primary/20 transition-shadow group-hover:shadow-primary/40">
            O
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold tracking-tight">OWOW<span className="text-xs align-top font-normal text-muted-foreground ml-0.5">®</span></span>
            <span className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase mt-0.5">Dashboard</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <div className="px-5 mb-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/80">Menu</span>
        </div>
        <SidebarMenu className="px-3 space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.url || (item.url !== '/dashboard' && pathname.startsWith(item.url))

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={isActive}
                  className={`
                    relative py-5 px-3 rounded-xl transition-all duration-200
                    ${isActive
                      ? 'bg-primary/12 text-primary hover:bg-primary/18 ring-1 ring-primary/15'
                      : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
                  )}
                  <Link
                    href={item.url}
                    prefetch={false}
                    className="flex w-full items-center gap-3 text-sm font-medium"
                  >
                    <item.icon className={`h-[18px] w-[18px] ${isActive ? 'text-primary' : ''}`} />
                    <span>{item.title}</span>
                    {isActive && <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-50" />}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-3 space-y-1 mb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground py-5 px-3 rounded-xl transition-all duration-200">
              <Link
                href="/dashboard/settings"
                prefetch={false}
                className="flex w-full items-center gap-3 text-sm font-medium"
              >
                <Settings className="h-[18px] w-[18px]" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="border-t border-sidebar-border pt-4 mt-2 mx-2">
          <div className="flex items-center gap-3 px-1">
            <Avatar className="h-9 w-9 ring-2 ring-border/70">
              <AvatarFallback className="bg-primary/20 text-primary text-xs">JB</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-medium text-sm text-sidebar-foreground truncate">Josh Butcher</span>
              <span className="text-[11px] text-muted-foreground truncate">Acme Corp</span>
            </div>
            <Link
              href="/login"
              prefetch={false}
              className="p-1.5 rounded-lg hover:bg-sidebar-accent text-muted-foreground hover:text-sidebar-accent-foreground transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
