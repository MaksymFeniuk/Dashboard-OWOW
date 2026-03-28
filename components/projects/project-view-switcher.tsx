import Link from "next/link"
import { ArrowUpRight, BarChart2, Eye } from "lucide-react"

type ProjectView = "view" | "analytics" | "demo"

const items = [
  {
    key: "view" as const,
    label: "View",
    icon: Eye,
    getHref: (id: string) => `/dashboard/projects/${id}`,
  },
  {
    key: "analytics" as const,
    label: "Analytics",
    icon: BarChart2,
    getHref: (id: string) => `/dashboard/projects/${id}/analytics`,
  },
  {
    key: "demo" as const,
    label: "Demo",
    icon: ArrowUpRight,
    getHref: (id: string) => `/dashboard/projects/${id}/demo`,
  },
]

export function ProjectViewSwitcher({
  projectId,
  current,
}: {
  projectId: string
  current: ProjectView
}) {
  return (
    <div className="glass-surface inline-flex w-full max-w-[540px] items-center gap-2 rounded-[24px] p-2">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = item.key === current

        return (
          <Link
            key={item.key}
            href={item.getHref(projectId)}
            className={`flex min-w-0 flex-1 items-center justify-center gap-2 rounded-[18px] px-4 py-3 text-sm font-semibold transition-all duration-200 ${
              isActive
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "text-muted-foreground hover:bg-accent/70 hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
