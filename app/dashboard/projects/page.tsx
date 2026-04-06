<<<<<<< HEAD
"use client"

import { type ElementType, useMemo, useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  Filter,
  Flame,
  Minus,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react"

import { mockClients, type Status } from "@/lib/mock-data"

type CardMeta = {
  insight: string
  insightDetail: string
  priority: "high" | "medium"
  trend: "up" | "down" | "flat"
  progressColor: string
  accentColor: string
  insightColor: string
  insightBg: string
  insightIcon: ElementType
  ringColor: string
}

const CARD_META: Record<string, CardMeta> = {
  p1: {
    insight: "On track",
    insightDetail: "Checkout and account work are aligned with the current sprint plan.",
    priority: "high",
    trend: "up",
    progressColor: "from-blue-600 to-blue-400",
    accentColor: "from-blue-500",
    insightColor: "text-emerald-400",
    insightBg: "bg-emerald-500/10",
    insightIcon: CheckCircle2,
    ringColor: "#3b82f6",
  },
  p2: {
    insight: "Needs attention",
    insightDetail: "Leave management is moving, but downstream expense work is compressed.",
    priority: "medium",
    trend: "down",
    progressColor: "from-amber-600 to-orange-400",
    accentColor: "from-amber-500",
    insightColor: "text-amber-400",
    insightBg: "bg-amber-500/10",
    insightIcon: AlertTriangle,
    ringColor: "#f59e0b",
  },
  p3: {
    insight: "Delayed review",
    insightDetail: "CMS migration is blocked by stakeholder approval on the publishing flow.",
    priority: "high",
    trend: "down",
    progressColor: "from-rose-600 to-rose-400",
    accentColor: "from-rose-500",
    insightColor: "text-rose-400",
    insightBg: "bg-rose-500/10",
    insightIcon: AlertTriangle,
    ringColor: "#f43f5e",
  },
}

const SORT_OPTIONS = ["Default", "Progress", "Deadline", "Priority"] as const
const FILTER_OPTIONS: Array<"All" | Status> = [
  "All",
  "On Track",
  "Delayed",
  "At Risk",
]

const projects = mockClients[0]?.projects ?? []

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function getDaysLeft(deadline: string) {
  const today = new Date()
  const end = new Date(deadline)
  return Math.max(0, Math.ceil((end.getTime() - today.getTime()) / 86400000))
}

function CircularProgress({
  progress,
  color,
  size = 64,
}: {
  progress: number
  color: string
  size?: number
}) {
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (progress / 100) * circ
=======
import Link from "next/link"
import { ArrowRight, Calendar, LayoutDashboard } from "lucide-react"
import { mockClients } from "@/lib/mock-data"

export default function ProjectsPage() {
  const projects = mockClients[0]?.projects ?? []

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return { text: "text-emerald-400", dot: "bg-emerald-500" }
      case "Delayed":
        return { text: "text-rose-400", dot: "bg-rose-500" }
      case "At Risk":
        return { text: "text-amber-400", dot: "bg-amber-500" }
      case "Completed":
        return { text: "text-blue-400", dot: "bg-blue-500" }
      default:
        return { text: "text-gray-400", dot: "bg-gray-500" }
    }
  }
>>>>>>> Maksym-component-developer

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        className="text-accent/80"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000"
      />
    </svg>
  )
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"All" | Status>("All")
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]>("Default")
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let list =
      filter === "All"
        ? projects
        : projects.filter((project) => project.status === filter)

    if (sort === "Progress") {
      list = [...list].sort((a, b) => b.overallProgress - a.overallProgress)
    } else if (sort === "Deadline") {
      list = [...list].sort(
        (a, b) => getDaysLeft(a.deadline) - getDaysLeft(b.deadline)
      )
    } else if (sort === "Priority") {
      list = [...list].sort((a, b) => {
        const aPriority = CARD_META[a.id]?.priority === "high" ? 0 : 1
        const bPriority = CARD_META[b.id]?.priority === "high" ? 0 : 1
        return aPriority - bPriority
      })
    }

    return list
  }, [filter, sort])

  return (
    <div className="space-y-7 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Projects
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {projects.length} active engagements ·{" "}
            {projects.filter((project) => project.status === "At Risk").length} at
            risk
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 rounded-xl border border-border/40 bg-accent/30 p-1">
            <Filter className="ml-1.5 h-3.5 w-3.5 text-muted-foreground" />
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  filter === option
                    ? "border border-border/40 bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="group/sort relative">
            <button className="flex items-center gap-2 rounded-xl border border-border/40 bg-accent/30 px-3.5 py-2 text-xs text-muted-foreground transition-all duration-200 hover:border-border/60 hover:text-foreground">
              <span>
                Sort: <strong className="text-foreground">{sort}</strong>
              </span>
              <ChevronDown className="h-3 w-3" />
            </button>
            <div className="invisible absolute top-full right-0 z-50 mt-2 w-36 overflow-hidden rounded-xl border border-border/50 bg-popover opacity-0 shadow-xl shadow-black/30 transition-all duration-200 group-hover/sort:visible group-hover/sort:opacity-100">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => setSort(option)}
                  className={`w-full px-3.5 py-2.5 text-left text-xs transition-colors duration-150 ${
                    sort === option
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
<<<<<<< HEAD
        {filtered.map((project, idx) => {
          const meta = CARD_META[project.id]
          const InsightIcon = meta.insightIcon
          const isHovered = hoveredCard === project.id
          const isPriority = meta.priority === "high"
          const daysLeft = getDaysLeft(project.deadline)

          return (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`glass-card stagger-${idx + 1} relative flex cursor-pointer flex-col overflow-hidden animate-slide-up transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 ${
                isPriority ? "hover:ring-1 hover:ring-primary/30" : "hover:border-border/60"
              }`}
            >
              <div
                className={`absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${meta.accentColor} to-transparent`}
              />

              {isPriority && (
                <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-[9px] font-bold text-amber-400">
                  <Flame className="h-2.5 w-2.5" />
                  Priority
                </div>
              )}

              <div className="flex flex-1 flex-col p-6 pb-0">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1 pr-12">
                    <h3 className="truncate text-base leading-snug font-semibold text-foreground">
                      {project.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="mb-5 flex items-center gap-5">
                  <div className="relative flex-shrink-0">
                    <CircularProgress
                      progress={project.overallProgress}
                      color={meta.ringColor}
                      size={72}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[13px] font-bold text-foreground">
                        {project.overallProgress}%
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="h-3 w-3 flex-shrink-0" />
                      <span>{project.currentSprint}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 flex-shrink-0" />
                      <span>{formatDate(project.deadline)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
                      <span
                        className={`text-xs font-semibold ${
                          daysLeft < 40
                            ? "text-rose-400"
                            : daysLeft < 60
                              ? "text-amber-400"
                              : "text-emerald-400"
                        }`}
                      >
                        {daysLeft}d remaining
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`mb-5 flex items-start gap-2.5 rounded-xl border border-border/20 px-3.5 py-2.5 ${meta.insightBg}`}
                >
                  <InsightIcon
                    className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${meta.insightColor}`}
                  />
                  <div>
                    <span className={`text-[11px] font-bold ${meta.insightColor}`}>
                      {meta.insight}
                    </span>
                    <p className="mt-0.5 text-[10px] leading-relaxed text-muted-foreground">
                      {meta.insightDetail}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-accent/80">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${meta.progressColor} transition-all duration-1000`}
                      style={{ width: `${project.overallProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden border-t border-border/40">
                <div
                  className={`flex items-center justify-between px-6 py-3.5 transition-all duration-300 ${
                    isHovered ? "pointer-events-none -translate-y-full opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {meta.trend === "up" ? (
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                    ) : meta.trend === "down" ? (
                      <TrendingDown className="h-3.5 w-3.5 text-rose-400" />
                    ) : (
                      <Minus className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {meta.trend === "up"
                        ? "Trending up"
                        : meta.trend === "down"
                          ? "Trending down"
                          : "Stable"}
                    </span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/50" />
                </div>

                <div
                  className={`absolute inset-0 flex items-center gap-2 bg-background/50 px-6 transition-all duration-300 ${
                    isHovered ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
                  }`}
                >
                  <Link
                    href={`/dashboard/projects/${project.id}`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-95"
                  >
                    <Eye className="h-3.5 w-3.5" /> View
                  </Link>
                  <Link
                    href={`/dashboard/projects/${project.id}/analytics`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent/60 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground active:scale-95"
                  >
                    <BarChart2 className="h-3.5 w-3.5" /> Analytics
                  </Link>
                  <Link
                    href={`/dashboard/projects/${project.id}/demo`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent/60 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground active:scale-95"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" /> Demo
                  </Link>
                </div>
              </div>
            </div>
=======
        {projects.map((project, idx) => {
          const colors = getStatusColor(project.status)
          return (
            <Link
              key={project.id}
              href={`/dashboard?projectId=${project.id}`}
              className={`glass-card p-6 flex flex-col relative overflow-hidden animate-slide-up stagger-${idx + 1} group hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 cursor-pointer select-none`}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-base font-semibold text-white">{project.name}</h3>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                  <span className={`text-xs font-medium ${colors.text}`}>{project.status}</span>
                </div>
              </div>

              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  <span>Current: <strong className="text-white font-medium">{project.currentSprint}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Status: <strong className={`font-medium ${colors.text}`}>{project.status}</strong></span>
                </div>

                <div className="pt-4">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-white font-medium">{project.overallProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors.dot} rounded-full transition-all duration-1000`}
                      style={{ width: `${project.overallProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex justify-between items-center text-xs font-medium text-gray-500 group-hover:text-blue-400 transition-colors">
                <span>View Project</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
>>>>>>> Maksym-component-developer
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-2xl bg-accent/30 p-4">
            <Filter className="h-6 w-6 text-muted-foreground/50" />
          </div>
          <p className="text-sm font-medium text-foreground">
            No projects match this filter
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try selecting a different status
          </p>
          <button
            onClick={() => setFilter("All")}
            className="mt-4 text-xs text-blue-400 hover:underline"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  )
}
