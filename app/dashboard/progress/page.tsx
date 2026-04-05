"use client"

import { useEffect, useRef, useState } from "react"
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Zap,
} from "lucide-react"
import { type Client, type Project } from "@/lib/mock-data"

type DashboardSnapshot = {
  clients: Client[]
}

const PHASE_COLORS = {
  Research: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Design: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Development: "bg-green-500/20 text-green-400 border-green-500/30",
  Testing: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Delivery: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
}

const CONTACT_TYPE_COLORS = {
  meeting: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  review: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  presentation: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  kickoff: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  other: "bg-slate-500/20 text-slate-400 border-slate-500/30",
}

const CONTACT_TYPE_ICONS = {
  meeting: Clock,
  review: AlertCircle,
  presentation: Zap,
  kickoff: Zap,
  other: Clock,
}

const getPrimaryPhase = (stages?: string[]) => {
  if (!stages || stages.length === 0) return "Development"
  return stages[0] as keyof typeof PHASE_COLORS
}

export default function ProgressPage() {
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProject() {
      try {
        setIsLoading(true)
        const response = await fetch("/api/dashboard", {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error("Failed to load project")
        }

        const data = (await response.json()) as DashboardSnapshot
        setProject(data.clients[0]?.projects[0] ?? null)
        setError(null)
      } catch (loadError) {
        if ((loadError as DOMException).name === "AbortError") {
          return
        }

        setError("Unable to load project progress right now.")
      } finally {
        setIsLoading(false)
      }
    }

    loadProject()

    return () => controller.abort()
  }, [])

  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading project progress...</div>
  }

  if (error) {
    return <div className="text-sm text-muted-foreground">{error}</div>
  }

  if (!project) return <div className="text-sm text-muted-foreground">Project not found</div>

  const getPhaseGroups = () => {
    const groups: Array<{ phase: string; startIndex: number; endIndex: number }> = []
    let currentPhase = getPrimaryPhase(project.sprints[0]?.stages)
    let startIndex = 0

    for (let i = 1; i <= project.sprints.length; i++) {
      const nextPhase = i < project.sprints.length ? getPrimaryPhase(project.sprints[i]?.stages) : null

      if (nextPhase !== currentPhase) {
        groups.push({ phase: currentPhase, startIndex, endIndex: i - 1 })
        currentPhase = nextPhase || currentPhase
        startIndex = i
      }
    }

    return groups
  }

  const phaseGroups = getPhaseGroups()

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const handleScrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" })
  }

  const handleScrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" })
  }

  const sortedMilestones = [...project.milestones].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  )

  const sortedContacts = [...project.contactMoments].sort(
    (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  )

  const now = new Date()
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  const getAlertStatus = (dateTimeStr: string, isUpcoming?: boolean) => {
    const contactDate = new Date(dateTimeStr)
    if (contactDate < now) return { type: "past", label: "Past" }
    if (contactDate >= now && contactDate <= sevenDaysFromNow) {
      return { type: "coming-soon", label: "Coming Soon" }
    }
    if (isUpcoming) return { type: "upcoming", label: "Upcoming" }
    return { type: "scheduled", label: "Scheduled" }
  }

  const completedSprints = project.sprints.filter((sprint) => sprint.status === "Done").length
  const progressPositionPercent =
    completedSprints > 0 ? (completedSprints / project.sprints.length) * 100 : 0

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Project Progress
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Timeline, milestones, and contact moments for {project.name}
        </p>
      </div>

      <div className="glass-card p-7">
        <div className="mb-6">
          <h2 className="text-base font-semibold text-foreground">Sprint Timeline</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{project.sprints.length} sprints</p>
        </div>

        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={handleScrollLeft}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded border border-border/40 bg-background/80 p-1.5"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={handleScrollRight}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded border border-border/40 bg-background/80 p-1.5"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="overflow-x-auto scrollbar-hide"
          >
            <div
              className="relative inline-block p-8"
              style={{ minWidth: `${project.sprints.length * 200 + 64}px`, height: "280px" }}
            >
              <div
                className="absolute text-xs font-semibold text-muted-foreground"
                style={{ left: "0px", top: "0px" }}
              >
                {new Date(project.projectStartDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
              </div>

              <div
                className="absolute text-xs font-semibold text-muted-foreground"
                style={{ right: "0px", top: "0px" }}
              >
                {new Date(project.projectEndDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
              </div>

              <div className="absolute left-12 right-8 top-8 h-24">
                {sortedMilestones.map((milestone) => {
                  const milestoneDate = new Date(milestone.dueDate)
                  const projectStart = new Date(project.projectStartDate)
                  const projectEnd = new Date(project.projectEndDate)
                  const totalDays =
                    (projectEnd.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24)
                  const milestoneDays =
                    (milestoneDate.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24)
                  const milestonePercent = (milestoneDays / totalDays) * 100

                  const isCompleted = milestone.completed
                  const lineColor = isCompleted ? "bg-green-500" : "bg-yellow-400"
                  const badgeBg = isCompleted ? "bg-green-500/20" : "bg-yellow-500/20"
                  const badgeBorder = isCompleted ? "border-green-500/40" : "border-yellow-500/40"
                  const badgeText = isCompleted ? "text-green-300" : "text-yellow-300"

                  return (
                    <div
                      key={milestone.id}
                      className="absolute flex -translate-x-1/2 flex-col items-center"
                      style={{ left: `${milestonePercent}%` }}
                    >
                      <div
                        className={`${badgeBg} ${badgeBorder} ${badgeText} whitespace-nowrap rounded border px-2 py-1 text-[10px] font-semibold`}
                      >
                        {milestone.title}
                      </div>
                      <div className={`w-0.5 ${lineColor}`} style={{ height: "128px" }} />
                    </div>
                  )
                })}
              </div>

              <div className="absolute left-8 right-8 top-40 h-24">
                <div className="absolute left-0 right-0 top-4 h-1 bg-slate-400/40" />

                <div
                  className="absolute left-0 top-4 h-1 bg-green-500 transition-all duration-500"
                  style={{ width: `${progressPositionPercent}%` }}
                />

                <div className="absolute left-0 top-0 h-8 w-0.5 bg-slate-400/60" />

                {project.sprints.map((sprint, index) => {
                  const segmentPosition = index * 200
                  const labelPosition = segmentPosition + 100

                  return (
                    <div key={sprint.id}>
                      <div
                        className="absolute top-0 h-8 w-0.5 bg-slate-400/60"
                        style={{ left: `${segmentPosition}px` }}
                      />
                      <div
                        className="absolute mt-9 text-[11px] font-semibold text-foreground"
                        style={{ left: `${labelPosition}px`, transform: "translateX(-50%)" }}
                      >
                        Sprint {index + 1}
                      </div>
                    </div>
                  )
                })}

                <div
                  className="absolute top-0 h-8 w-0.5 bg-slate-400/60"
                  style={{ left: `${project.sprints.length * 200}px` }}
                />
              </div>

              <div className="absolute left-8 right-8 h-12" style={{ bottom: "0px" }}>
                {phaseGroups.map((group) => {
                  const startPos = group.startIndex * 200
                  const width = (group.endIndex - group.startIndex + 1) * 200

                  return (
                    <div
                      key={group.phase}
                      className={`absolute flex h-full items-center justify-center rounded-sm border text-xs font-semibold ${PHASE_COLORS[group.phase as keyof typeof PHASE_COLORS]}`}
                      style={{ left: `${startPos}px`, width: `${width}px` }}
                    >
                      {group.phase}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass-card p-7">
          <h2 className="mb-4 text-base font-semibold text-foreground">Milestones</h2>
          <div className="max-h-[400px] space-y-2 overflow-y-auto">
            {sortedMilestones.map((milestone) => (
              <div key={milestone.id} className="rounded-lg border border-border/40 bg-accent/20 p-3">
                <div className="mb-2 flex items-start gap-3">
                  <div className="flex-shrink-0 pt-0.5">
                    {milestone.completed ? (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-green-500/40 bg-green-500/20">
                        <CheckCircle2 className="h-3 w-3 text-green-400" />
                      </div>
                    ) : (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/20">
                        <div className="h-2 w-2 rounded-full bg-amber-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground">{milestone.title}</h3>
                      {milestone.isNew && (
                        <div className="inline-flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/20 px-2 py-0.5">
                          <span className="text-[10px] font-semibold text-blue-400">NEW</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {new Date(milestone.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                {milestone.relatedDocuments && milestone.relatedDocuments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {milestone.relatedDocuments.map((docId) => {
                      const doc = project.documents.find((document) => document.id === docId)

                      return doc ? (
                        <a
                          key={doc.id}
                          href={doc.url}
                          className="group flex items-center gap-2 rounded bg-background/40 px-2 py-1 text-xs hover:bg-background/60"
                        >
                          <FileText className="h-3 w-3 text-muted-foreground group-hover:text-foreground" />
                          <span className="flex-1 truncate text-muted-foreground group-hover:text-foreground">
                            {doc.title}
                          </span>
                        </a>
                      ) : null
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-7">
          <h2 className="mb-4 text-base font-semibold text-foreground">Contact Moments</h2>
          <div className="max-h-[400px] space-y-2 overflow-y-auto">
            {sortedContacts.map((contact) => {
              const IconComponent = CONTACT_TYPE_ICONS[contact.type]
              const alertStatus = getAlertStatus(contact.dateTime, contact.isUpcoming)
              const contactDate = new Date(contact.dateTime)

              return (
                <div key={contact.id} className="rounded-lg border border-border/40 bg-accent/20 p-3">
                  <div className="mb-2 flex items-start gap-3">
                    <div className={`mt-0.5 flex-shrink-0 rounded p-1 ${CONTACT_TYPE_COLORS[contact.type]}`}>
                      <IconComponent className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground">{contact.title}</h3>
                        {contact.isNew && (
                          <div className="inline-flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/20 px-1.5 py-0.5">
                            <span className="text-[10px] font-semibold text-blue-400">NEW</span>
                          </div>
                        )}
                        {(alertStatus.type === "coming-soon" ||
                          alertStatus.type === "past" ||
                          alertStatus.type === "upcoming") && (
                          <div
                            className={`rounded-full border px-1.5 py-0.5 text-[10px] font-semibold ${
                              alertStatus.type === "coming-soon"
                                ? "border-amber-500/30 bg-amber-500/20 text-amber-400"
                                : alertStatus.type === "past"
                                  ? "border-slate-500/30 bg-slate-500/20 text-slate-400"
                                  : "border-green-500/30 bg-green-500/20 text-green-400"
                            }`}
                          >
                            {alertStatus.label}
                          </div>
                        )}
                      </div>
                      <div className="mt-0.5 text-[10px] capitalize text-muted-foreground">
                        {contact.type} |{" "}
                        {contactDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-2.5 w-2.5" />
                        <span>
                          {contactDate.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          UTC
                        </span>
                      </div>
                      {contact.description && (
                        <div className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                          {contact.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
