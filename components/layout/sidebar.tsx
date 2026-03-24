"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FolderKanban, FileText, MonitorPlay, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Projects", url: "/dashboard/projects", icon: FolderKanban },
  { title: "Documents", url: "/dashboard/documents", icon: FileText },
  { title: "Demos", url: "/dashboard/demos", icon: MonitorPlay },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="h-16 flex items-center justify-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            O
          </div>
          OWOW
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-4 py-4 space-y-1">
          {navItems.map((item) => {
             // simplified active state check
             const isActive = pathname === item.url || (item.url !== '/dashboard' && pathname.startsWith(item.url))

             return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton isActive={isActive} tooltip={item.title}>
                  <Link href={item.url} className="flex w-full items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link href="/dashboard/settings" className="flex w-full items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
