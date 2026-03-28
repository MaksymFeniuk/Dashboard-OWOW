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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  { title: "Overview", url: "/dashboard", icon: Home },
  { title: "Projects", url: "/dashboard/projects", icon: FolderKanban },
  { title: "Updates", url: "/dashboard/updates", icon: Bell },
  { title: "Budget", url: "/dashboard/budget", icon: DollarSign },
  { title: "Documents", url: "/dashboard/documents", icon: FileText },
  { title: "Team", url: "/dashboard/team", icon: Users },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" className="bg-[#0d0d14] border-r border-white/[0.04] text-white !border-r-white/[0.04]">
      <SidebarHeader className="h-24 flex flex-col justify-center px-6">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-extrabold text-lg shadow-lg shadow-blue-500/20 transition-shadow group-hover:shadow-blue-500/40">
            O
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold tracking-tight">OWOW<span className="text-xs align-top font-normal text-gray-500 ml-0.5">®</span></span>
            <span className="text-[11px] font-medium text-gray-500 tracking-widest uppercase mt-0.5">Dashboard</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <div className="px-5 mb-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-600">Menu</span>
        </div>
        <SidebarMenu className="px-3 space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.url || (item.url !== '/dashboard' && pathname.startsWith(item.url))

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={isActive}
                  tooltip={item.title}
                  className={`
                    relative py-5 px-3 rounded-xl transition-all duration-200
                    ${isActive
                      ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/15'
                      : 'text-gray-400 hover:bg-white/[0.04] hover:text-gray-200'
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-500 rounded-r-full" />
                  )}
                  <Link href={item.url} className="flex w-full items-center gap-3 text-sm font-medium">
                    <item.icon className={`h-[18px] w-[18px] ${isActive ? 'text-blue-400' : ''}`} />
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
            <SidebarMenuButton className="text-gray-400 hover:bg-white/[0.04] hover:text-gray-200 py-5 px-3 rounded-xl transition-all duration-200">
              <Link href="/dashboard/settings" className="flex w-full items-center gap-3 text-sm font-medium">
                <Settings className="h-[18px] w-[18px]" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="border-t border-white/[0.06] pt-4 mt-2 mx-2">
          <div className="flex items-center gap-3 px-1">
            <Avatar className="h-9 w-9 ring-2 ring-white/10">
              <AvatarImage src="https://github.com/shadcn.png" alt="Josh Butcher" />
              <AvatarFallback className="bg-blue-500/20 text-blue-400 text-xs">JB</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-medium text-sm text-white truncate">Josh Butcher</span>
              <span className="text-[11px] text-gray-500 truncate">Acme Corp</span>
            </div>
            <Link href="/login" className="p-1.5 rounded-lg hover:bg-white/[0.06] text-gray-500 hover:text-gray-300 transition-colors">
              <LogOut className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
