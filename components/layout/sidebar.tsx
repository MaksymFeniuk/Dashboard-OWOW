"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  Home,
  FolderKanban,
  Bell,
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
<<<<<<< HEAD
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
=======
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockClients } from "@/lib/mock-data"
>>>>>>> Maksym-component-developer

const projectsNavItem = { title: "Projects", url: "/dashboard/projects", icon: FolderKanban }

export function AppSidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const projectId = searchParams.get('projectId')
  
  // Get the current project if one is selected
  const currentProject = React.useMemo(() => {
    if (!projectId) return null
    for (const client of mockClients) {
      const project = client.projects.find(p => p.id === projectId)
      if (project) return project
    }
    return null
  }, [projectId])

  return (
    <Sidebar variant="inset" className="bg-sidebar border-r border-sidebar-border text-sidebar-foreground shadow-[inset_-1px_0_0_rgba(255,255,255,0.02)]">
      <SidebarHeader className="h-24 flex flex-col justify-center px-6">
<<<<<<< HEAD
        <Link href="/dashboard" prefetch={false} className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-extrabold text-lg shadow-lg shadow-primary/20 transition-shadow group-hover:shadow-primary/40">
=======
        <Link href={currentProject ? `/dashboard?projectId=${projectId}` : "/dashboard/projects"} className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-extrabold text-lg shadow-lg shadow-blue-500/20 transition-shadow group-hover:shadow-blue-500/40">
>>>>>>> Maksym-component-developer
            O
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold tracking-tight">OWOW<span className="text-xs align-top font-normal text-muted-foreground ml-0.5">®</span></span>
            <span className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase mt-0.5">Dashboard</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
<<<<<<< HEAD
        <div className="px-5 mb-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/80">Menu</span>
        </div>
=======
>>>>>>> Maksym-component-developer
        <SidebarMenu className="px-3 space-y-0.5">
          {(() => {
            const isActive = pathname === projectsNavItem.url

            return (
              <SidebarMenuItem key={projectsNavItem.title}>
                <SidebarMenuButton
                  render={<Link href={projectsNavItem.url} />}
                  isActive={isActive}
<<<<<<< HEAD
=======
                  tooltip={projectsNavItem.title}
>>>>>>> Maksym-component-developer
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
<<<<<<< HEAD
                  <Link
                    href={item.url}
                    prefetch={false}
                    className="flex w-full items-center gap-3 text-sm font-medium"
                  >
                    <item.icon className={`h-[18px] w-[18px] ${isActive ? 'text-primary' : ''}`} />
                    <span>{item.title}</span>
                    {isActive && <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-50" />}
                  </Link>
=======
                  <projectsNavItem.icon className={`h-[18px] w-[18px] ${isActive ? 'text-blue-400' : ''}`} />
                  <span className="text-sm font-medium">{projectsNavItem.title}</span>
                  {isActive && <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-50" />}
>>>>>>> Maksym-component-developer
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })()}
        </SidebarMenu>

        {currentProject && (
          <>
            <div className="px-5 mt-4 mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-600 line-clamp-2">{currentProject.name}</span>
            </div>
            <SidebarMenu className="px-3 space-y-0.5">
              {[
                { title: "Overview", url: `/dashboard?projectId=${projectId}`, icon: Home },
                { title: "Updates", url: `/dashboard/updates?projectId=${projectId}`, icon: Bell },
                { title: "Documents", url: `/dashboard/documents?projectId=${projectId}`, icon: FileText },
                { title: "Team", url: `/dashboard/team?projectId=${projectId}`, icon: Users },
              ].map((item) => {
                const isActive = pathname === item.url.split('?')[0] && searchParams.get('projectId') === projectId

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
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
                      <item.icon className={`h-[18px] w-[18px] ${isActive ? 'text-blue-400' : ''}`} />
                      <span className="text-sm font-medium">{item.title}</span>
                      {isActive && <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-50" />}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </>
        )}
      </SidebarContent>

      <SidebarFooter className="p-3 space-y-1 mb-2">
        <SidebarMenu>
          <SidebarMenuItem>
<<<<<<< HEAD
            <SidebarMenuButton className="text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground py-5 px-3 rounded-xl transition-all duration-200">
              <Link
                href="/dashboard/settings"
                prefetch={false}
                className="flex w-full items-center gap-3 text-sm font-medium"
              >
                <Settings className="h-[18px] w-[18px]" />
                <span>Settings</span>
              </Link>
=======
            <SidebarMenuButton
              render={<Link href="/dashboard/settings" />}
              className="text-gray-400 hover:bg-white/[0.04] hover:text-gray-200 py-5 px-3 rounded-xl transition-all duration-200"
            >
              <Settings className="h-[18px] w-[18px]" />
              <span className="text-sm font-medium">Settings</span>
>>>>>>> Maksym-component-developer
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
<<<<<<< HEAD
            <Link
              href="/login"
              prefetch={false}
              className="p-1.5 rounded-lg hover:bg-sidebar-accent text-muted-foreground hover:text-sidebar-accent-foreground transition-colors"
=======
            <button
              onClick={() => router.push('/login')}
              className="p-1.5 rounded-lg hover:bg-white/[0.06] text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
>>>>>>> Maksym-component-developer
            >
              <LogOut className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
