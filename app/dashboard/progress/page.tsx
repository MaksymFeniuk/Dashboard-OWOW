"use client"

import { useRef, useState } from "react"
import { CheckCircle2, ChevronLeft, ChevronRight, Clock, AlertCircle, Zap, FileText, Sparkles } from "lucide-react"
import { mockClients } from "@/lib/mock-data"

const PHASE_COLORS = {
  Research: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Design: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Development: 'bg-green-500/20 text-green-400 border-green-500/30',
  Testing: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Delivery: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
}

const CONTACT_TYPE_COLORS = {
  meeting: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  review: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  presentation: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  kickoff: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  other: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
}

const CONTACT_TYPE_ICONS = {
  meeting: Clock,
  review: AlertCircle,
  presentation: Zap,
  kickoff: Zap,
  other: Clock,
}

// Helper to get the primary phase of a sprint
const getPrimaryPhase = (stages?: string[]) => {
  if (!stages || stages.length === 0) return 'Development'
  return stages[0] as keyof typeof PHASE_COLORS
}

export default function ProgressPage() {
  const project = mockClients[0]?.projects[0]
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  if (!project) return <div>Project not found</div>

  // Calculate phase groups
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
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' })
  }

  const handleScrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' })
  }

  const sortedMilestones = [...project.milestones].sort((a, b) =>
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  )

  const sortedContacts = [...project.contactMoments].sort((a, b) =>
    new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  )

  const lastCompletedMilestoneIndex = project.milestones.findIndex(m => !m.completed)
  const progressPercentage = lastCompletedMilestoneIndex === -1 ? 100 : (lastCompletedMilestoneIndex / project.milestones.length) * 100

  const now = new Date()
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  const getAlertStatus = (dateTimeStr: string, isUpcoming?: boolean) => {
    const contactDate = new Date(dateTimeStr)
    if (contactDate < now) return { type: 'past', label: 'Past' }
    if (contactDate >= now && contactDate <= sevenDaysFromNow) return { type: 'coming-soon', label: 'Coming Soon' }
    if (isUpcoming) return { type: 'upcoming', label: 'Upcoming' }
    return { type: 'scheduled', label: 'Scheduled' }
  }

  // Calculate progress position on timeline
  const completedSprints = project.sprints.filter(s => s.status === 'Done').length
  const progressPositionPercent = completedSprints > 0 
    ? (completedSprints / project.sprints.length) * 100 
    : 0

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Project Progress</h1>
        <p className="mt-1 text-sm text-muted-foreground">Timeline, milestones, and contact moments for {project.name}</p>
      </div>

      {/* Timeline */}
      <div className="glass-card p-7">
        <div className="mb-6">
          <h2 className="text-base font-semibold text-foreground">Sprint Timeline</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{project.sprints.length} sprints</p>
        </div>

        <div className="relative">
          {canScrollLeft && <button onClick={handleScrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 p-1.5 rounded border border-border/40"><ChevronLeft className="h-4 w-4" /></button>}

          <div ref={scrollContainerRef} onScroll={handleScroll} className="overflow-x-auto scrollbar-hide">
            <div className="inline-block p-8 relative" style={{ minWidth: `${project.sprints.length * 200 + 64}px`, height: '280px' }}>
              {/* Start date label - below first segment */}
              <div 
                className="absolute text-xs text-muted-foreground font-semibold"
                style={{
                  left: '0px',
                  top: '198px',
                  transform: 'translateX(-50%)',
                }}
              >
                {new Date(project.projectStartDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
              </div>

              {/* End date label - below last segment */}
              <div 
                className="absolute text-xs text-muted-foreground font-semibold"
                style={{
                  left: `${project.sprints.length * 200}px`,
                  top: '198px',
                  transform: 'translateX(-50%)',
                }}
              >
                {new Date(project.projectEndDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
              </div>

              {/* Milestones - top section */}
              <div className="absolute top-8 left-12 right-8 h-24">
                {sortedMilestones.map((milestone) => {
                  const milestoneDate = new Date(milestone.dueDate)
                  const projectStart = new Date(project.projectStartDate)
                  const projectEnd = new Date(project.projectEndDate)
                  const totalDays = (projectEnd.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24)
                  const milestoneDays = (milestoneDate.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24)
                  const milestonePercent = (milestoneDays / totalDays) * 100

                  return (
                    <div
                      key={milestone.id}
                      className="absolute flex flex-col items-center"
                      style={{
                        left: `${milestonePercent}%`,
                        transform: 'translateX(-50%)',
                      }}
                    >
                      {/* Yellow vertical line */}
                      <div className="w-0.5 h-12 bg-yellow-400" />
                      {/* Yellow badge */}
                      <div className="bg-yellow-500/20 border border-yellow-500/40 px-2 py-1 rounded text-[10px] font-semibold text-yellow-300 whitespace-nowrap mt-1">
                        {milestone.title}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Main timeline - sprints section */}
              <div className="absolute top-40 left-8 right-8 h-24">
                {/* Background white/gray line */}
                <div className="absolute top-4 left-0 right-0 h-1 bg-slate-400/40" />
                
                {/* Green progress line */}
                <div
                  className="absolute top-4 left-0 h-1 bg-green-500 transition-all duration-500"
                  style={{ 
                    width: `${progressPositionPercent}%`,
                  }}
                />

                {/* Start vertical line */}
                <div className="absolute top-0 left-0 w-0.5 h-8 bg-slate-400/60" />

                {/* Sprint segments with dividers */}
                {project.sprints.map((sprint, i) => {
                  const segmentPosition = i * 200
                  const labelPosition = segmentPosition + 100 // Center of segment

                  return (
                    <div key={sprint.id}>
                      {/* Vertical divider line */}
                      <div
                        className="absolute top-0 w-0.5 h-8 bg-slate-400/60"
                        style={{ left: `${segmentPosition}px` }}
                      />
                      
                      {/* Sprint label - centered under middle of segment */}
                      <div
                        className="absolute text-[11px] font-semibold text-foreground mt-9"
                        style={{
                          left: `${labelPosition}px`,
                          transform: 'translateX(-50%)',
                        }}
                      >
                        Sprint {i + 1}
                      </div>
                    </div>
                  )
                })}

                {/* End vertical line */}
                <div className="absolute top-0 w-0.5 h-8 bg-slate-400/60" style={{ left: `${project.sprints.length * 200}px` }} />
              </div>

              {/* Phase bars - bottom section */}
              <div className="absolute left-8 right-8 h-12" style={{ bottom: '0px' }}>
                {phaseGroups.map((group) => {
                  const startPos = group.startIndex * 200
                  const width = (group.endIndex - group.startIndex + 1) * 200

                  return (
                    <div
                      key={group.phase}
                      className={`absolute h-full rounded-sm border text-xs font-semibold flex items-center justify-center ${PHASE_COLORS[group.phase as keyof typeof PHASE_COLORS]}`}
                      style={{
                        left: `${startPos}px`,
                        width: `${width}px`,
                      }}
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

      {/* Milestones and Contact Moments */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass-card p-7">
          <h2 className="text-base font-semibold text-foreground mb-4">Milestones</h2>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {sortedMilestones.map(milestone => (
              <div key={milestone.id} className="p-3 rounded-lg border border-border/40 bg-accent/20">
                <div className="flex items-start gap-3 mb-2">
                  <div className="flex-shrink-0 pt-0.5">
                    {milestone.completed ? (
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/40"><CheckCircle2 className="w-3 h-3 text-green-400" /></div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/40"><div className="w-2 h-2 rounded-full bg-amber-400" /></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground">{milestone.title}</h3>
                      {milestone.isNew && <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30"><span className="text-[10px] font-semibold text-blue-400">NEW</span></div>}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{new Date(milestone.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                  </div>
                </div>
                {milestone.relatedDocuments && milestone.relatedDocuments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {milestone.relatedDocuments.map(docId => {
                      const doc = project.documents.find(d => d.id === docId)
                      return doc ? (
                        <a key={doc.id} href={doc.url} className="flex items-center gap-2 px-2 py-1 rounded bg-background/40 hover:bg-background/60 text-xs group">
                          <FileText className="w-3 h-3 text-muted-foreground group-hover:text-foreground" />
                          <span className="truncate text-muted-foreground group-hover:text-foreground flex-1">{doc.title}</span>
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
          <h2 className="text-base font-semibold text-foreground mb-4">Contact Moments</h2>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {sortedContacts.map(contact => {
              const IconComponent = CONTACT_TYPE_ICONS[contact.type]
              const alertStatus = getAlertStatus(contact.dateTime, contact.isUpcoming)
              const contactDate = new Date(contact.dateTime)

              return (
                <div key={contact.id} className="p-3 rounded-lg border border-border/40 bg-accent/20">
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`flex-shrink-0 p-1 rounded mt-0.5 ${CONTACT_TYPE_COLORS[contact.type]}`}><IconComponent className="w-3.5 h-3.5" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-foreground">{contact.title}</h3>
                        {contact.isNew && <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30"><span className="text-[10px] font-semibold text-blue-400">NEW</span></div>}
                        {(alertStatus.type === 'coming-soon' || alertStatus.type === 'past' || alertStatus.type === 'upcoming') && (
                          <div className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${alertStatus.type === 'coming-soon' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : alertStatus.type === 'past' ? 'bg-slate-500/20 text-slate-400 border-slate-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'}`}>{alertStatus.label}</div>
                        )}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5 capitalize">{contact.type} · {contactDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1"><Clock className="w-2.5 h-2.5" /><span>{contactDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} UTC</span></div>
                      {contact.description && <div className="text-xs text-muted-foreground mt-1 line-clamp-1">{contact.description}</div>}
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
