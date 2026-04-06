<<<<<<< HEAD
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  TrendingUp,
  Zap,
} from "lucide-react"
import Link from "next/link"
import type { CSSProperties } from "react"

const timelineStats = [
  {
    label: "Current Phase",
    value: "Building",
    accent: "text-blue-400",
    tooltip: "Engineering is the active phase for the current delivery window.",
  },
  {
    label: "Progress",
    value: "65%",
    accent: "text-emerald-400",
    tooltip: "Project progress reflects the current sprint completion rate.",
  },
  {
    label: "Deadline",
    value: "Jun 15, 2026",
    accent: "text-amber-400",
    tooltip: "Latest committed delivery date for the current project scope.",
  },
]

const timelinePhases = [
  {
    label: "Design",
    date: "Oct - Dec 2025",
    status: "Complete",
    progress: 100,
    accent: "bg-blue-500",
    text: "text-blue-400",
    note: "Brand identity, wireframes, and design assets approved.",
  },
  {
    label: "UX",
    date: "Jan - Feb 2026",
    status: "Complete",
    progress: 100,
    accent: "bg-blue-500",
    text: "text-blue-400",
    note: "Prototype testing and iteration rounds wrapped successfully.",
  },
  {
    label: "Building",
    date: "Mar - May 2026",
    status: "In Progress",
    progress: 65,
    accent: "bg-emerald-500",
    text: "text-foreground",
    note: "Front-end and back-end delivery is moving through sprint 3 of 5.",
  },
  {
    label: "Testing",
    date: "Jun 2026",
    status: "Upcoming",
    progress: 0,
    accent: "bg-accent",
    text: "text-muted-foreground",
    note: "QA, load testing, and final client acceptance are queued next.",
  },
]

const budgetTrend = [
  { month: "Oct", spent: 8000 },
  { month: "Nov", spent: 22000 },
  { month: "Dec", spent: 38000 },
  { month: "Jan", spent: 52000 },
  { month: "Feb", spent: 68000 },
  { month: "Mar", spent: 75000 },
]

const recentUpdates = [
  {
    title: "Beta Release Deployed",
    date: "March 4, 2026",
    color: "bg-emerald-500",
    badge: "Release",
    badgeColor: "text-emerald-400 bg-emerald-500/10",
  },
  {
    title: "Alpha V2 Deployed",
    date: "Feb 28, 2026",
    color: "bg-blue-500",
    badge: "Deploy",
    badgeColor: "text-blue-400 bg-blue-500/10",
  },
  {
    title: "UI Redesign Approved",
    date: "Feb 15, 2026",
    color: "bg-muted-foreground/40",
    badge: "Approved",
    badgeColor: "text-muted-foreground bg-accent/60",
  },
]

const documents = [
  { name: "Master Services Agreement", type: "PDF", date: "Jan 10, 2026" },
  { name: "Brand Guidelines v2", type: "PDF", date: "Feb 05, 2026" },
  { name: "Sprint Review Deck", type: "PPTX", date: "Feb 20, 2026" },
]

const totalBudget = 150000
const currentSpent = budgetTrend[budgetTrend.length - 1].spent
const percentUsed = Math.round((currentSpent / totalBudget) * 100)
const remainingBudget = totalBudget - currentSpent
const chartHeight = 64
const chartWidth = 100
const maxSpent = Math.max(...budgetTrend.map((point) => point.spent))
const budgetChartPoints = budgetTrend
  .map((point, index) => {
    const x = (index / (budgetTrend.length - 1)) * chartWidth
    const y = chartHeight - (point.spent / maxSpent) * 52 - 6
    return `${x},${y}`
  })
  .join(" ")
const budgetAreaPoints = `0,${chartHeight} ${budgetChartPoints} ${chartWidth},${chartHeight}`
=======
"use client"

import { ArrowUpRight, MessageSquare, Clock, FileText, TrendingUp, ArrowLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo, useEffect } from "react"
import { getProjectById } from "@/lib/mock-data"
>>>>>>> Maksym-component-developer

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectId = searchParams.get('projectId')
  
  // Redirect to projects page if no projectId is selected
  useEffect(() => {
    if (!projectId) {
      router.push('/dashboard/projects')
    }
  }, [projectId, router])
  
  // Don't render anything while redirecting
  if (!projectId) {
    return null
  }
  
  const project = useMemo(() => {
    if (!projectId) return null
    return getProjectById(projectId)
  }, [projectId])

  // Format date helper
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }



  // Get phase labels from sprints
  const phases = useMemo(() => {
    if (!project) return []
    return project.sprints.slice(0, 4).map(sprint => ({
      label: sprint.name.split(':')[0].trim(),
      done: sprint.status === 'Done',
      active: sprint.status === 'In Progress' || sprint.status === 'Review'
    }))
  }, [project])

  const progressValue = project ? `${project.overallProgress}%` : '0%'
  const currentPhase = project ? project.sprints.find(s => s.status === 'In Progress')?.name.split(':')[0].trim() || 'Building' : 'Building'

  return (
    <div className="space-y-6 animate-fade-in">
<<<<<<< HEAD
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Good evening, Josh
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s your project overview for today
          </p>
=======
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-2">
        <div className="flex items-center gap-4">
          {projectId && (
            <button onClick={() => router.push('/dashboard/projects')} className="p-2 rounded-lg hover:bg-white/[0.08] transition-colors text-gray-400 hover:text-white cursor-pointer">
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Good evening, Josh
            </h1>
            <p className="text-sm text-gray-500 mt-1">{project ? `Your overview for ${project.name}` : "Here's your project overview for today"}</p>
          </div>
>>>>>>> Maksym-component-developer
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border/40 bg-accent/40 px-3.5 py-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>Last updated: March 28, 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="glass-card relative flex flex-col gap-8 p-7 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-500/10 p-2.5 ring-1 ring-blue-500/20">
                <Zap className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Project Timeline
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  E-commerce Redesign
                </p>
              </div>
            </div>
<<<<<<< HEAD
            <span className="rounded-full bg-blue-500/10 px-3 py-1.5 text-[10px] font-semibold text-blue-400 ring-1 ring-blue-500/20">
              Sprint 3 / 5
            </span>
          </div>

          <div className="relative">
            <div className="absolute left-5 right-5 top-[18px] h-1.5 rounded-full bg-accent/80">
              <div
                className="timeline-progress-fill h-full rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400/60"
                style={
                  {
                    "--timeline-fill-width": "65%",
                    "--timeline-delay": "160ms",
                  } as CSSProperties
                }
              />
            </div>

            <div className="relative grid gap-4 sm:grid-cols-4">
              {timelinePhases.map((phase, index) => (
                <div
                  key={phase.label}
                  className="timeline-phase pt-0 text-center sm:pt-0"
                  style={
                    {
                      "--timeline-delay": `${index * 160 + 260}ms`,
                    } as CSSProperties
                  }
                >
                  <div className="timeline-phase-marker mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full ring-4 ring-background">
                    <div
                      className={`h-9 w-9 rounded-full ${phase.accent} flex items-center justify-center`}
                    >
                      {phase.progress === 100 ? (
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      ) : (
                        <span className="text-xs font-bold text-white">
                          {phase.progress}%
                        </span>
                      )}
                    </div>
                  </div>
                  <p className={`text-xs font-semibold ${phase.text}`}>
                    {phase.label}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground/70">
                    {phase.date}
                  </p>
                  <div className="timeline-phase-card mt-3 rounded-xl border border-border/30 bg-accent/25 px-3 py-3 text-left">
                    <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-wide text-muted-foreground">
                      <span>{phase.status}</span>
                      <span>{phase.progress}%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-accent/80">
                      <div
                        className={`timeline-phase-meter h-full rounded-full ${
                          phase.progress === 100
                            ? "bg-blue-500"
                            : phase.progress > 0
                              ? "bg-emerald-500"
                              : "bg-muted-foreground/40"
                        }`}
                        style={
                          {
                            "--timeline-fill-width": `${phase.progress}%`,
                            "--timeline-delay": `${index * 160 + 420}ms`,
                          } as CSSProperties
                        }
                      />
                    </div>
                    <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                      {phase.note}
                    </p>
                  </div>
=======
            <span className="text-xs text-gray-500 bg-white/[0.04] px-3 py-1 rounded-full">{project?.name || 'E-commerce Redesign'}</span>
          </div>

          {/* Timeline Progress */}
          <div className="relative mb-10">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400/50 rounded-full transition-all duration-1000" style={{ width: progressValue }} />
            </div>

            <div className="relative flex justify-between">
              {(phases.length > 0 ? phases : [
                { label: "Design", active: true, done: true },
                { label: "UX", active: true, done: true },
                { label: "Building", active: true, done: false },
                { label: "Testing", active: false, done: false },
              ]).map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full z-10 ring-4 ring-[#0a0a0f] transition-all
                    ${step.done ? 'bg-blue-500 shadow-lg shadow-blue-500/30' :
                      step.active ? 'bg-blue-500 animate-pulse-glow' :
                      'bg-white/10'}`}
                  />
                  <span className={`text-xs font-medium ${step.active ? 'text-white' : 'text-gray-600'}`}>
                    {step.label}
                  </span>
>>>>>>> Maksym-component-developer
                </div>
              ))}
            </div>
          </div>

<<<<<<< HEAD
          <div className="grid grid-cols-3 gap-3">
            {timelineStats.map((item, index) => (
              <div
                key={item.label}
                title={item.tooltip}
                className="timeline-stat rounded-xl border border-border/30 bg-accent/30 px-4 py-3 transition-colors hover:bg-accent/45"
                style={
                  {
                    "--timeline-delay": `${index * 120 + 640}ms`,
                  } as CSSProperties
                }
              >
                <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </span>
                <span className={`mt-1.5 block text-sm font-bold ${item.accent}`}>
                  {item.value}
                </span>
=======
          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Current Phase", value: currentPhase },
              { label: "Progress", value: progressValue },
              { label: "Deadline", value: project ? formatDate(project.deadline) : "Jun 15, 2026" },
            ].map((item, i) => (
              <div key={i} className="bg-white/[0.03] rounded-xl px-4 py-3">
                <span className="text-[11px] text-gray-500 uppercase tracking-wider block">{item.label}</span>
                <span className="text-sm text-white font-semibold mt-1 block">{item.value}</span>
>>>>>>> Maksym-component-developer
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="glass-card relative flex min-h-[320px] flex-col overflow-hidden p-7">
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-500/[0.05] blur-[50px]" />
            <div className="relative mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-500/10 p-2.5 ring-1 ring-emerald-500/20">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-foreground">Budget</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Burn rate over time
                </p>
              </div>
            </div>
<<<<<<< HEAD

            <div className="relative flex flex-1 flex-col">
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="mb-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                    Total Budget
                  </p>
                  <p className="text-3xl font-bold tracking-tight text-foreground">
                    ${totalBudget.toLocaleString()}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                      {percentUsed}% used
                    </span>
                    <span className="text-xs text-muted-foreground">on track</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="mb-1 text-[11px] text-muted-foreground">Remaining</p>
                  <p className="text-lg font-semibold text-foreground">
                    ${remainingBudget.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-accent/80">
                <div
                  className="budget-progress-fill h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                  style={
                    {
                      "--budget-fill-width": `${percentUsed}%`,
                      "--budget-delay": "180ms",
                    } as CSSProperties
                  }
                />
              </div>

              <div className="grid flex-1 grid-cols-[1fr_auto] gap-4">
                <div className="min-h-[160px] rounded-2xl border border-border/30 bg-accent/20 p-4">
                  <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="h-full w-full"
                    preserveAspectRatio="none"
                    aria-label="Budget spending trend chart"
                  >
                    <defs>
                      <linearGradient id="budget-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {[16, 32, 48].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        x2={chartWidth}
                        y1={y}
                        y2={y}
                        stroke="rgba(255,255,255,0.06)"
                        strokeDasharray="2 3"
                      />
                    ))}
                    <polygon
                      points={budgetAreaPoints}
                      fill="url(#budget-area)"
                      className="budget-chart-area"
                      style={
                        {
                          "--budget-delay": "260ms",
                        } as CSSProperties
                      }
                    />
                    <polyline
                      points={budgetChartPoints}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      pathLength="100"
                      className="budget-chart-line"
                      style={
                        {
                          "--budget-delay": "340ms",
                        } as CSSProperties
                      }
                    />
                    {budgetTrend.map((point, index) => {
                      const x = (index / (budgetTrend.length - 1)) * chartWidth
                      const y = chartHeight - (point.spent / maxSpent) * 52 - 6

                      return (
                        <circle
                          key={point.month}
                          cx={x}
                          cy={y}
                          r="1.9"
                          fill="#10b981"
                          stroke="var(--background)"
                          strokeWidth="0.9"
                          className="budget-chart-point"
                          style={
                            {
                              "--budget-delay": `${index * 110 + 520}ms`,
                            } as CSSProperties
                          }
                        />
                      )
                    })}
                  </svg>

                  <div className="mt-3 grid grid-cols-6 text-[10px] text-muted-foreground">
                    {budgetTrend.map((point) => (
                      <span key={point.month}>{point.month}</span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2 text-right text-[10px] text-muted-foreground">
                  <span>$75k</span>
                  <span>$50k</span>
                  <span>$25k</span>
                  <span>$0</span>
                </div>
              </div>
=======
            <div className="relative">
              <div className="text-3xl font-bold text-white tracking-tight">$150,000</div>
>>>>>>> Maksym-component-developer
            </div>
          </div>

          <div className="glass-card p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-purple-500/10 p-2.5 ring-1 ring-purple-500/20">
                <MessageSquare className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-foreground">
                  Communication
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  3 unread messages
                </p>
              </div>
            </div>
<<<<<<< HEAD

            <a
              href="https://slack.com"
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4A154B] to-[#611f69] py-3 text-sm font-medium text-white shadow-lg shadow-purple-900/30 transition-all hover:from-[#5a1d5c] hover:to-[#7a2980]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
              </svg>
=======
            <button className="w-full bg-gradient-to-r from-[#4A154B] to-[#611f69] hover:from-[#5a1d5c] hover:to-[#7a2980] text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-purple-900/20 cursor-pointer">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>
>>>>>>> Maksym-component-developer
              Open Slack
            </a>
          </div>
        </div>

        <div className="glass-card relative min-h-[360px] p-7">
          <div className="mb-7 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-500/10 p-2.5 ring-1 ring-emerald-500/20">
                <Clock className="h-4 w-4 text-emerald-400" />
              </div>
              <h2 className="text-base font-semibold text-foreground">
                Recent Updates
              </h2>
            </div>
            <button onClick={() => router.push(`/dashboard/updates${projectId ? `?projectId=${projectId}` : ''}`)} className="text-xs text-gray-500 hover:text-blue-400 hover:bg-white/[0.05] hover:border-blue-500/30 transition-all flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border border-white/[0.06]">
              View all <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>

          <div className="relative space-y-5">
            <div className="pointer-events-none absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-emerald-500/40 via-blue-500/20 to-transparent" />

<<<<<<< HEAD
            {recentUpdates.map((item) => (
              <div key={item.title} className="relative z-10 flex gap-4">
                <div
                  className={`mt-1.5 h-[10px] w-[10px] flex-shrink-0 rounded-full ${item.color} ring-4 ring-background`}
                />
                <div className="flex flex-1 flex-col pb-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {item.title}
                    </span>
                    <span
                      className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <span className="mt-1 text-xs text-muted-foreground">
                    {item.date}
                  </span>
=======
            {project ? (
              project.sprints.slice(0, 3).map((sprint, i) => (
                <div key={i} className="flex gap-5 relative z-10 group cursor-pointer">
                  <div className={`w-[10px] h-[10px] rounded-full ${sprint.status === 'Done' ? 'bg-emerald-500' : sprint.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-600'} ring-4 ring-[#0a0a0f] flex-shrink-0 mt-1.5 group-hover:ring-white/10 transition-all`} />
                  <div className="flex flex-col flex-1 pb-1">
                    <span className="text-sm text-white font-medium group-hover:text-blue-400 transition-colors">{sprint.name}</span>
                    <span className="text-xs text-gray-500 mt-1">{formatDate(sprint.startDate)}</span>
                  </div>
>>>>>>> Maksym-component-developer
                </div>
              ))
            ) : (
              <>
                {[
                  { title: "Beta Release", date: "March 4, 2026", color: "bg-emerald-500" },
                  { title: "Alpha V2 Deploy", date: "Feb 28, 2026", color: "bg-blue-500" },
                  { title: "UI Redesign Approved", date: "Feb 15, 2026", color: "bg-gray-600" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 relative z-10 group cursor-pointer">
                    <div className={`w-[10px] h-[10px] rounded-full ${item.color} ring-4 ring-[#0a0a0f] flex-shrink-0 mt-1.5 group-hover:ring-white/10 transition-all`} />
                    <div className="flex flex-col flex-1 pb-1">
                      <span className="text-sm text-white font-medium group-hover:text-blue-400 transition-colors">{item.title}</span>
                      <span className="text-xs text-gray-500 mt-1">{item.date}</span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
<<<<<<< HEAD

          <Link
            href="/dashboard/updates"
            prefetch={false}
            className="absolute bottom-6 right-6 rounded-lg p-2 text-muted-foreground/50 transition-all hover:bg-accent/60 hover:text-muted-foreground"
            aria-label="Open the full updates timeline"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
=======
>>>>>>> Maksym-component-developer
        </div>

        <div className="glass-card relative min-h-[360px] p-7 lg:col-span-2">
          <div className="mb-7 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-500/10 p-2.5 ring-1 ring-amber-500/20">
                <FileText className="h-4 w-4 text-amber-400" />
              </div>
              <h2 className="text-base font-semibold text-foreground">Documents</h2>
            </div>
<<<<<<< HEAD
            <Link
              href="/dashboard/documents"
              prefetch={false}
              className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-blue-400"
            >
=======
            <button onClick={() => router.push(`/dashboard/documents${projectId ? `?projectId=${projectId}` : ''}`)} className="text-xs text-gray-500 hover:text-blue-400 hover:bg-white/[0.05] hover:border-blue-500/30 transition-all flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border border-white/[0.06]">
>>>>>>> Maksym-component-developer
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="w-full">
            <div className="mb-4 grid grid-cols-12 gap-4 border-b border-border/40 pb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Date</div>
            </div>

            <div className="space-y-1">
<<<<<<< HEAD
              {documents.map((doc) => (
                <div
                  key={doc.name}
                  className="group/row -mx-3 grid grid-cols-12 items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-accent/40"
                >
                  <div className="col-span-6 flex items-center gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-accent/50">
                      <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <span className="truncate text-sm font-medium text-foreground">
                      {doc.name}
                    </span>
                  </div>
                  <div className="col-span-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        doc.type === "PDF"
                          ? "bg-red-500/10 text-red-400 ring-1 ring-red-500/20"
                          : "bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20"
                      }`}
                    >
                      {doc.type}
                    </span>
                  </div>
                  <div className="col-span-3 text-xs text-muted-foreground">
                    {doc.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/dashboard/documents"
            prefetch={false}
            className="absolute bottom-6 right-6 rounded-lg p-2 text-muted-foreground/50 transition-all hover:bg-accent/60 hover:text-muted-foreground"
            aria-label="Open the full documents page"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
=======
              {project ? (
                project.documents.slice(0, 3).map((doc, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-4 items-center py-3 px-3 rounded-xl hover:bg-white/[0.03] transition-colors group cursor-pointer -mx-3">
                    <div className="col-span-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                        <FileText className="h-3.5 w-3.5 text-gray-500" />
                      </div>
                      <span className="text-sm text-white font-medium truncate group-hover:text-blue-400 transition-colors">{doc.title}</span>
                    </div>
                    <div className="col-span-3">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full
                        ${doc.type === 'PRD'
                          ? 'bg-red-500/10 text-red-400'
                          : doc.type === 'Migration'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-blue-500/10 text-blue-400'
                        }`}
                      >
                        {doc.type}
                      </span>
                    </div>
                    <div className="col-span-3 text-xs text-gray-500">{formatDate(doc.lastUpdated)}</div>
                  </div>
                ))
              ) : (
                <>
                  {[
                    { name: "Master Services Agreement", type: "PDF", date: "Jan 10, 2026" },
                    { name: "Brand Guidelines v2", type: "PDF", date: "Feb 05, 2026" },
                    { name: "Sprint Review Deck", type: "PPTX", date: "Feb 20, 2026" },
                  ].map((doc, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-4 items-center py-3 px-3 rounded-xl hover:bg-white/[0.03] transition-colors group cursor-pointer -mx-3">
                      <div className="col-span-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0">
                          <FileText className="h-3.5 w-3.5 text-gray-500" />
                        </div>
                        <span className="text-sm text-white font-medium truncate group-hover:text-blue-400 transition-colors">{doc.name}</span>
                      </div>
                      <div className="col-span-3">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full
                          ${doc.type === 'PDF'
                            ? 'bg-red-500/10 text-red-400'
                            : 'bg-blue-500/10 text-blue-400'
                          }`}
                        >
                          {doc.type}
                        </span>
                      </div>
                      <div className="col-span-3 text-xs text-gray-500">{doc.date}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
>>>>>>> Maksym-component-developer
        </div>
      </div>
    </div>
  )
}
