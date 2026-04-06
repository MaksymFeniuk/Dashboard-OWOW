"use client"

<<<<<<< HEAD
import { useState, useMemo } from "react"
import {
  Search, Rocket, FlaskConical, Palette, Flag,
  Bug, Wrench, ChevronDown, ChevronUp, Star,
  Clock, Zap, Filter
} from "lucide-react"

type Category = "Release" | "Testing" | "Design" | "Milestone" | "Bugfix" | "Infrastructure"

interface Update {
  id: number
  title: string
  date: string
  rawDate: Date
  desc: string
  expandedDesc: string
  category: Category
  important: boolean
  author: string
  dotColor: string
  lineGlow: string
}

const CATEGORIES: { label: string; value: Category | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Release", value: "Release" },
  { label: "Milestone", value: "Milestone" },
  { label: "Testing", value: "Testing" },
  { label: "Design", value: "Design" },
  { label: "Bugfix", value: "Bugfix" },
  { label: "Infrastructure", value: "Infrastructure" },
]

const CATEGORY_META: Record<Category, { icon: React.ElementType; color: string; bg: string; border: string }> = {
  Release: { icon: Rocket, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/25" },
  Testing: { icon: FlaskConical, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/25" },
  Design: { icon: Palette, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/25" },
  Milestone: { icon: Flag, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/25" },
  Bugfix: { icon: Bug, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/25" },
  Infrastructure: { icon: Wrench, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/25" },
}

const updates: Update[] = [
  {
    id: 1,
    title: "Beta Release v1.0",
    date: "March 4, 2026",
    rawDate: new Date("2026-03-04"),
    desc: "First limited release made available to testers for feedback and validation.",
    expandedDesc: "The beta release was deployed to 50 selected testers across 3 regions. Initial feedback forms have been distributed. Feature freeze is now in effect for the current sprint. Critical bugs and P1 issues will be addressed in hotfix patches.",
    category: "Release",
    important: true,
    author: "Dev Team",
    dotColor: "bg-emerald-500",
    lineGlow: "shadow-emerald-500/40",
  },
  {
    id: 2,
    title: "Alpha V2 QA Initiated",
    date: "February 28, 2026",
    rawDate: new Date("2026-02-28"),
    desc: "Internal QA testing initiated for Alpha V2 with automated test suites.",
    expandedDesc: "Automated regression tests cover 78% of the codebase. Manual exploratory testing is being conducted in parallel. 12 issues were found and logged — 4 are marked as blockers for the Beta release.",
    category: "Testing",
    important: false,
    author: "QA Team",
    dotColor: "bg-blue-500",
    lineGlow: "shadow-blue-500/40",
  },
  {
    id: 3,
    title: "UI Redesign Approved",
    date: "February 15, 2026",
    rawDate: new Date("2026-02-15"),
    desc: "Client signed off on final dashboard mockups and new design system.",
    expandedDesc: "The client approved all 24 screens in the Figma mockup. Token-based design system was exported and the hand-off to the dev team was completed. A new component library has been bootstrapped from the approved tokens.",
    category: "Design",
    important: true,
    author: "Sarah K.",
    dotColor: "bg-purple-500",
    lineGlow: "shadow-purple-500/40",
  },
  {
    id: 4,
    title: "Sprint 2 Review Completed",
    date: "February 10, 2026",
    rawDate: new Date("2026-02-10"),
    desc: "Sprint 2 review session delivered on schedule — all story points completed.",
    expandedDesc: "Sprint 2 closed with 100% of committed user stories delivered. Velocity was 42 points — up from 35 on Sprint 1. Sprint 3 planning session has been scheduled for the following Monday.",
    category: "Milestone",
    important: false,
    author: "Project Manager",
    dotColor: "bg-amber-500",
    lineGlow: "shadow-amber-500/40",
  },
  {
    id: 5,
    title: "Auth Redirect Bugfix",
    date: "January 28, 2026",
    rawDate: new Date("2026-01-28"),
    desc: "Critical authentication redirect loop fixed before Alpha deploy.",
    expandedDesc: "A race condition in the auth middleware was causing infinite redirect loops for users with expired tokens. The root cause was isolated to the Next.js middleware chain. Hotfix deployed, all edge cases covered by regression tests.",
    category: "Bugfix",
    important: false,
    author: "Tom R.",
    dotColor: "bg-rose-500",
    lineGlow: "shadow-rose-500/40",
  },
  {
    id: 6,
    title: "CI/CD Pipeline Established",
    date: "January 18, 2026",
    rawDate: new Date("2026-01-18"),
    desc: "Automated deployment pipeline set up with GitHub Actions and Vercel integration.",
    expandedDesc: "The CI/CD pipeline now runs lint, type-check, unit tests, and E2E tests on every pull request. Deployment to staging happens automatically on merge to `main`. Average deploy time is 3m 20s.",
    category: "Infrastructure",
    important: false,
    author: "DevOps",
    dotColor: "bg-cyan-500",
    lineGlow: "shadow-cyan-500/40",
  },
  {
    id: 7,
    title: "Project Kickoff",
    date: "January 10, 2026",
    rawDate: new Date("2026-01-10"),
    desc: "Initial planning and sprint scoping completed with the full team.",
    expandedDesc: "Full team kickoff meeting with client stakeholders, design, and engineering leads. Project scope, timeline, and communication protocols were defined. Confluence and Linear boards were set up. Sprint 1 planning completed.",
    category: "Milestone",
    important: true,
    author: "Project Manager",
    dotColor: "bg-amber-500",
    lineGlow: "shadow-amber-500/40",
  },
]

function relativeTime(date: Date): string {
  const now = new Date("2026-03-28") // present in the project
  const diffDays = Math.round((now.getTime() - date.getTime()) / 86400000)
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 60) return "Last month"
  return `${Math.floor(diffDays / 30)} months ago`
}

export default function UpdatesPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All")
  const [search, setSearch] = useState("")
  const [expanded, setExpanded] = useState<number | null>(null)

  const filtered = useMemo(() => {
    return updates.filter(u => {
      const matchCat = activeCategory === "All" || u.category === activeCategory
      const matchSearch = u.title.toLowerCase().includes(search.toLowerCase()) ||
        u.desc.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [activeCategory, search])

  return (
    <div className="space-y-7 animate-fade-in max-w-3xl">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Project Updates</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {updates.length} events · {updates.filter(u => u.important).length} milestones
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-accent/30 border border-border/40 px-3.5 py-2 rounded-xl">
          <Zap className="h-3.5 w-3.5 text-emerald-400" />
          <span>Latest: <strong className="text-foreground">Beta Release v1.0</strong></span>
        </div>
=======
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { getProjectById } from "@/lib/mock-data"

export default function UpdatesPage() {
  const searchParams = useSearchParams()
  const projectId = searchParams.get('projectId')
  
  const project = useMemo(() => {
    if (!projectId) return null
    return getProjectById(projectId)
  }, [projectId])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const updates = project ? project.sprints.map(sprint => ({
    title: sprint.name,
    date: formatDate(sprint.startDate),
    desc: `${sprint.name} - ${sprint.progress}% complete`,
    color: sprint.status === 'Done' ? 'bg-emerald-500' : sprint.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-500',
    glow: sprint.status === 'Done' ? 'shadow-emerald-500/30' : sprint.status === 'In Progress' ? 'shadow-blue-500/30' : ''
  })) : [
    { title: "Beta Release", date: "March 4, 2026", desc: "First limited release made available to testers for feedback and validation.", color: "bg-emerald-500", glow: "shadow-emerald-500/30" },
    { title: "Alpha V2 Deploy", date: "February 28, 2026", desc: "Internal QA testing initiated for Alpha V2 with automated test suites.", color: "bg-blue-500", glow: "shadow-blue-500/30" },
    { title: "UI Redesign Approved", date: "February 15, 2026", desc: "Client signed off on final dashboard mockups and design system.", color: "bg-purple-500", glow: "shadow-purple-500/30" },
    { title: "Project Kickoff", date: "January 10, 2026", desc: "Initial planning and sprint scoping completed with the full team.", color: "bg-gray-500", glow: "" },
  ]

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Project Updates</h2>
        <p className="text-sm text-gray-500 mt-1">{project ? `Updates for ${project.name}` : 'A comprehensive timeline of major events, milestones, and releases.'}</p>
>>>>>>> Maksym-component-developer
      </div>

      {/* ── Search + Filter ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search updates…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-accent/30 border border-border/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/30 transition-all"
          />
        </div>
        <div className="flex items-center gap-1.5 bg-accent/30 border border-border/40 rounded-xl p-1 overflow-x-auto flex-shrink-0">
          <Filter className="h-3.5 w-3.5 text-muted-foreground ml-1.5 flex-shrink-0" />
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat.value
                  ? "bg-background text-foreground shadow-sm border border-border/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="glass-card-static p-6 md:p-9 relative">
        <div className="relative">
          {/* Gradient vertical line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-emerald-500/50 via-blue-500/20 to-transparent hidden md:block" />

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-4 rounded-2xl bg-accent/30 mb-4">
                <Search className="h-6 w-6 text-muted-foreground/50" />
              </div>
              <p className="text-sm font-medium text-foreground">No updates found</p>
              <button onClick={() => { setSearch(""); setActiveCategory("All") }} className="mt-3 text-xs text-blue-400 hover:underline">Clear filters</button>
            </div>
          ) : (
            <div className="space-y-0">
              {filtered.map((update, idx) => {
                const meta = CATEGORY_META[update.category]
                const Icon = meta.icon
                const isExpanded = expanded === update.id
                const isFirst = idx === 0 && activeCategory === "All" && !search

                return (
                  <div
                    key={update.id}
                    className="flex flex-col md:flex-row gap-4 relative z-10 py-5 first:pt-0 last:pb-0 animate-fade-in"
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    {/* Dot column */}
                    <div className="hidden md:flex flex-col items-center pt-1 flex-shrink-0 w-10">
                      <div className={`w-[10px] h-[10px] rounded-full ${update.dotColor} ring-4 ring-background shadow-lg ${update.lineGlow} transition-all duration-300 ${isExpanded ? "scale-125" : ""}`} />
                    </div>

                    {/* Content card */}
                    <div
                      className={`flex-1 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
                        ${update.important
                          ? "border-border/60 bg-accent/25 hover:bg-accent/40 hover:border-border/80"
                          : "border-border/30 bg-accent/15 hover:bg-accent/30 hover:border-border/50"
                        }
                        ${isExpanded ? "shadow-lg shadow-black/20 ring-1 ring-primary/15" : "hover:-translate-y-0.5"}
                      `}
                      onClick={() => setExpanded(isExpanded ? null : update.id)}
                    >
                      {/* Important milestone top bar */}
                      {update.important && (
                        <div className="h-[2px] bg-gradient-to-r from-amber-500/60 via-amber-400/30 to-transparent" />
                      )}

                      <div className="p-5">
                        {/* Top row */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            {/* Mobile dot */}
                            <div className={`w-2 h-2 rounded-full ${update.dotColor} mt-2 flex-shrink-0 md:hidden`} />

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                {/* Category badge */}
                                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border ${meta.color} ${meta.bg} ${meta.border}`}>
                                  <Icon className="h-2.5 w-2.5" />
                                  {update.category}
                                </span>

                                {/* Important star */}
                                {update.important && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full text-amber-400 bg-amber-500/10 border border-amber-500/20">
                                    <Star className="h-2.5 w-2.5 fill-current" />
                                    Key Milestone
                                  </span>
                                )}

                                {/* "Latest" tag for most recent */}
                                {isFirst && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full text-blue-400 bg-blue-500/10 border border-blue-500/20 animate-pulse-glow">
                                    <Zap className="h-2.5 w-2.5" />
                                    Latest
                                  </span>
                                )}
                              </div>

                              <h3 className={`text-base font-semibold transition-colors duration-200 ${isExpanded ? "text-blue-400" : "text-foreground"}`}>
                                {update.title}
                              </h3>
                            </div>
                          </div>

                          {/* Expand chevron */}
                          <div className="flex-shrink-0 p-1 rounded-lg text-muted-foreground/50 hover:text-muted-foreground transition-colors mt-0.5">
                            {isExpanded
                              ? <ChevronUp className="h-4 w-4" />
                              : <ChevronDown className="h-4 w-4" />
                            }
                          </div>
                        </div>

                        {/* Date + author + relative time */}
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <Clock className="h-3 w-3" />
                          <span>{update.date}</span>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span className="text-muted-foreground/60">{relativeTime(update.rawDate)}</span>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span>{update.author}</span>
                        </div>

                        {/* Summary desc */}
                        <p className="text-sm text-muted-foreground leading-relaxed">{update.desc}</p>

                        {/* Expandable detail */}
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-48 mt-4 opacity-100" : "max-h-0 opacity-0"}`}>
                          <div className="pt-4 border-t border-border/30">
                            <p className="text-sm text-muted-foreground leading-relaxed">{update.expandedDesc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
