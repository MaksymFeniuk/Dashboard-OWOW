import {
  Activity,
  Bell,
  FileText,
  FolderKanban,
  Home,
  type LucideIcon,
  Users,
} from "lucide-react"

export type DashboardNavItem = {
  title: string
  href: string
  icon: LucideIcon
}

export const dashboardNavItems: DashboardNavItem[] = [
  { title: "Overview", href: "/dashboard", icon: Home },
  { title: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { title: "Updates", href: "/dashboard/updates", icon: Bell },
  { title: "Progress", href: "/dashboard/progress", icon: Activity },
  { title: "Documents", href: "/dashboard/documents", icon: FileText },
  { title: "Team", href: "/dashboard/team", icon: Users },
]
