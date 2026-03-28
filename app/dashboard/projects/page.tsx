"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  ArrowUpRight, Eye, BarChart2, Clock, Calendar,
  AlertTriangle, CheckCircle2, TrendingUp, TrendingDown,
  Filter, ChevronDown, Sparkles, Flame, Minus
} from "lucide-react"

const projects = [
  {
    id: "ecommerce-redesign",
    title: "E-commerce Redesign",
    description: "Full-stack storefront rebuild with new design system and checkout flow.",
    status: "In Progress",
    insight: "On track",
    insightDetail: "All milestones met. Next: API integration sprint.",
    progress: 65,
    priority: "high",
    sprint: "Sprint 3 / 5",
    deadline: "Jun 15, 2026",
    daysLeft: 79,
    trend: "up",
    dotColor: "bg-blue-500",
    progressColor: "from-blue-600 to-blue-400",
    accentColor: "from-blue-500",
    insightColor: "text-emerald-400",
    insightBg: "bg-emerald-500/10",
    insightIcon: CheckCircle2,
    ringColor: "#3b82f6",
  },
  {
    id: "mobile-app-beta",
    title: "Mobile App Beta",
    description: "iOS & Android client portal app with push notifications and offline mode.",
    status: "On Track",
    insight: "Ahead of schedule",
    insightDetail: "Sprint velocity 20% higher than baseline.",
    progress: 80,
    priority: "medium",
    sprint: "Sprint 5 / 6",
    deadline: "Apr 30, 2026",
    daysLeft: 33,
    trend: "up",
    dotColor: "bg-emerald-500",
    progressColor: "from-emerald-600 to-emerald-400",
    accentColor: "from-emerald-500",
    insightColor: "text-emerald-400",
    insightBg: "bg-emerald-500/10",
    insightIcon: TrendingUp,
    ringColor: "#10b981",
  },
  {
    id: "marketing-site-v2",
    title: "Marketing Site V2",
    description: "Redesign and migration to new CMS — content team approval pending.",
    status: "At Risk",
    insight: "Delayed — needs review",
    insightDetail: "CMS migration blocked by content team sign-off. 2-week slip likely.",
    progress: 25,
    priority: "high",
    sprint: "Sprint 2 / 5",
    deadline: "May 20, 2026",
    daysLeft: 53,
    trend: "down",
    dotColor: "bg-rose-500",
    progressColor: "from-rose-600 to-rose-400",
    accentColor: "from-rose-500",
    insightColor: "text-rose-400",
    insightBg: "bg-rose-500/10",
    insightIcon: AlertTriangle,
    ringColor: "#f43f5e",
  },
]

const SORT_OPTIONS = ["Default", "Progress", "Deadline", "Priority"]
const FILTER_OPTIONS = ["All", "In Progress", "On Track", "At Risk"]

function CircularProgress({ progress, color, size = 64 }: { progress: number; color: string; size?: number }) {
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (progress / 100) * circ
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="currentColor" strokeWidth="4" fill="none" className="text-accent/80" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        stroke={color} strokeWidth="4" fill="none"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000"
      />
    </svg>
  )
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All")
  const [sort, setSort] = useState("Default")
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let list = filter === "All" ? projects : projects.filter(p => p.status === filter)
    if (sort === "Progress") list = [...list].sort((a, b) => b.progress - a.progress)
    else if (sort === "Deadline") list = [...list].sort((a, b) => a.daysLeft - b.daysLeft)
    else if (sort === "Priority") list = [...list].sort((a, b) => (a.priority === "high" ? -1 : 1))
    return list
  }, [filter, sort])

  return (
    <div className="space-y-7 animate-fade-in">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Projects</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {projects.length} active engagements · {projects.filter(p => p.status === "At Risk").length} at risk
          </p>
        </div>

        {/* Filter + Sort Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Filter pills */}
          <div className="flex items-center gap-1.5 bg-accent/30 border border-border/40 rounded-xl p-1">
            <Filter className="h-3.5 w-3.5 text-muted-foreground ml-1.5" />
            {FILTER_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200 ${
                  filter === opt
                    ? "bg-background text-foreground shadow-sm border border-border/40"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="relative group/sort">
            <button className="flex items-center gap-2 text-xs px-3.5 py-2 rounded-xl bg-accent/30 border border-border/40 text-muted-foreground hover:text-foreground hover:border-border/60 transition-all duration-200">
              <span>Sort: <strong className="text-foreground">{sort}</strong></span>
              <ChevronDown className="h-3 w-3" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-36 bg-popover border border-border/50 rounded-xl shadow-xl shadow-black/30 z-50 overflow-hidden invisible group-hover/sort:visible opacity-0 group-hover/sort:opacity-100 transition-all duration-200">
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => setSort(opt)}
                  className={`w-full text-left text-xs px-3.5 py-2.5 transition-colors duration-150 ${
                    sort === opt
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Project Cards ── */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, idx) => {
          const InsightIcon = project.insightIcon
          const isHovered = hoveredCard === project.id
          const isPriority = project.priority === "high"

          return (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`glass-card relative flex flex-col overflow-hidden cursor-pointer transition-all duration-300 animate-slide-up
                hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1
                ${isPriority ? "hover:ring-1 hover:ring-primary/30" : "hover:border-border/60"}
                stagger-${idx + 1}
              `}
            >
              {/* Top gradient accent line */}
              <div className={`absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${project.accentColor} to-transparent`} />

              {/* Priority badge */}
              {isPriority && (
                <div className="absolute top-4 right-4 flex items-center gap-1 text-[9px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-full">
                  <Flame className="h-2.5 w-2.5" />
                  Priority
                </div>
              )}

              <div className="p-6 pb-0 flex-1 flex flex-col">
                {/* Card header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex-1 min-w-0 pr-12">
                    <h3 className="text-base font-semibold text-foreground leading-snug truncate">{project.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{project.description}</p>
                  </div>
                </div>

                {/* Circular progress + stats */}
                <div className="flex items-center gap-5 mb-5">
                  <div className="relative flex-shrink-0">
                    <CircularProgress progress={project.progress} color={project.ringColor} size={72} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[13px] font-bold text-foreground">{project.progress}%</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="h-3 w-3 flex-shrink-0" />
                      <span>{project.sprint}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 flex-shrink-0" />
                      <span>{project.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      <span className={`text-xs font-semibold ${
                        project.daysLeft < 40 ? "text-rose-400" :
                        project.daysLeft < 60 ? "text-amber-400" : "text-emerald-400"
                      }`}>
                        {project.daysLeft}d remaining
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Insight */}
                <div className={`flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl ${project.insightBg} border border-border/20 mb-5`}>
                  <InsightIcon className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${project.insightColor}`} />
                  <div>
                    <span className={`text-[11px] font-bold ${project.insightColor}`}>{project.insight}</span>
                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{project.insightDetail}</p>
                  </div>
                </div>

                {/* Mini progress bar */}
                <div className="mb-6">
                  <div className="h-1.5 w-full bg-accent/80 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${project.progressColor} rounded-full transition-all duration-1000`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer: default + hover quick actions */}
              <div className="relative border-t border-border/40 overflow-hidden">
                {/* Default footer */}
                <div className={`flex items-center justify-between px-6 py-3.5 transition-all duration-300 ${
                  isHovered ? "opacity-0 -translate-y-full" : "opacity-100"
                }`}>
                  <div className="flex items-center gap-1.5">
                    {project.trend === "up"
                      ? <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                      : project.trend === "down"
                      ? <TrendingDown className="h-3.5 w-3.5 text-rose-400" />
                      : <Minus className="h-3.5 w-3.5 text-muted-foreground" />
                    }
                    <span className="text-xs text-muted-foreground">
                      {project.trend === "up" ? "Trending up" : project.trend === "down" ? "Trending down" : "Stable"}
                    </span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/50" />
                </div>

                {/* Hover quick actions */}
                <div className={`absolute inset-0 flex items-center gap-2 px-6 transition-all duration-300 bg-background/50 ${
                  isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
                }`}>
                  <Link
                    href={`/dashboard/projects/${project.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
                  >
                    <Eye className="h-3.5 w-3.5" /> View
                  </Link>
                  <Link
                    href={`/dashboard/projects/${project.id}/docs`}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 rounded-lg bg-accent/60 text-muted-foreground hover:text-foreground hover:bg-accent active:scale-95 transition-all"
                  >
                    <BarChart2 className="h-3.5 w-3.5" /> Analytics
                  </Link>
                  <Link
                    href={`/dashboard/projects/${project.id}/demo`}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 rounded-lg bg-accent/60 text-muted-foreground hover:text-foreground hover:bg-accent active:scale-95 transition-all"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" /> Demo
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="p-4 rounded-2xl bg-accent/30 mb-4">
            <Filter className="h-6 w-6 text-muted-foreground/50" />
          </div>
          <p className="text-sm font-medium text-foreground">No projects match this filter</p>
          <p className="text-xs text-muted-foreground mt-1">Try selecting a different status</p>
          <button onClick={() => setFilter("All")} className="mt-4 text-xs text-blue-400 hover:underline">
            Clear filter
          </button>
        </div>
      )}
    </div>
  )
}
