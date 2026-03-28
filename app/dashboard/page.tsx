import {
  ArrowUpRight,
  FileText,
  MessageSquare,
  Clock,
  Maximize2,
  Zap,
} from "lucide-react"
import Link from "next/link"

import { BudgetChart } from "@/components/dashboard/budget-chart"
import { InteractiveTimeline } from "@/components/dashboard/interactive-timeline"
import { SmartAlerts } from "@/components/dashboard/smart-alerts"
import { Reveal } from "@/components/ui/reveal"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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

export default function DashboardPage() {
  return (
    <TooltipProvider delay={120}>
      <div className="space-y-6 animate-fade-in">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Good evening, Josh
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Here&apos;s your project overview for today
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border/40 bg-accent/40 px-3.5 py-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>Last updated: March 28, 2026</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <SmartAlerts />
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2" delay={100}>
            <div className="glass-card relative flex flex-col gap-8 p-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="motion-glow rounded-xl bg-blue-500/10 p-2.5 ring-1 ring-blue-500/20 transition-all duration-200">
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
                <span className="rounded-full bg-blue-500/10 px-3 py-1.5 text-[10px] font-semibold text-blue-400 ring-1 ring-blue-500/20">
                  Sprint 3 / 5
                </span>
              </div>

              <div className="pb-2">
                <InteractiveTimeline />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {timelineStats.map((item) => (
                  <Tooltip key={item.label}>
                    <TooltipTrigger
                      render={
                        <div className="cursor-default rounded-xl border border-border/30 bg-accent/30 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/50 hover:shadow-lg hover:shadow-black/10" />
                      }
                    >
                      <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
                        {item.label}
                      </span>
                      <span className={`mt-1.5 block text-sm font-bold ${item.accent}`}>
                        {item.value}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{item.tooltip}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5">
            <Reveal delay={140}>
              <div className="glass-card relative flex min-h-[320px] flex-col overflow-hidden p-7">
                <div className="motion-glow pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-emerald-500/[0.05] blur-[50px]" />
                <div className="relative mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-500/10 p-2.5 ring-1 ring-emerald-500/20 transition-all duration-200">
                    <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-foreground">Budget</h2>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Burn rate over time
                    </p>
                  </div>
                </div>
                <div className="relative flex-1">
                  <BudgetChart />
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="glass-card p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-purple-500/10 p-2.5 ring-1 ring-purple-500/20 transition-all duration-200">
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

                <Tooltip>
                  <TooltipTrigger
                    render={
                      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4A154B] to-[#611f69] py-3 text-sm font-medium text-white shadow-lg shadow-purple-900/30 transition-all hover:scale-[1.02] hover:from-[#5a1d5c] hover:to-[#7a2980] hover:shadow-purple-900/50 active:scale-[0.98]" />
                    }
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
                    </svg>
                    Open Slack
                  </TooltipTrigger>
                  <TooltipContent>Open the team workspace in Slack.</TooltipContent>
                </Tooltip>
              </div>
            </Reveal>
          </div>

          <Reveal delay={220}>
            <div className="glass-card relative min-h-[360px] p-7">
              <div className="mb-7 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-500/10 p-2.5 ring-1 ring-emerald-500/20 transition-all duration-200">
                    <Clock className="h-4 w-4 text-emerald-400" />
                  </div>
                  <h2 className="text-base font-semibold text-foreground">
                    Recent Updates
                  </h2>
                </div>
              </div>

              <div className="relative space-y-5">
                <div className="pointer-events-none absolute top-2 bottom-2 left-[15px] w-px bg-gradient-to-b from-emerald-500/40 via-blue-500/20 to-transparent" />

                {recentUpdates.map((item) => (
                  <div
                    key={item.title}
                    className="group/item relative z-10 flex cursor-pointer gap-4"
                  >
                    <div
                      className={`mt-1.5 h-[10px] w-[10px] flex-shrink-0 rounded-full ${item.color} ring-4 ring-background transition-all duration-200 group-hover/item:scale-125 group-hover/item:ring-border/60`}
                    />
                    <div className="flex flex-1 flex-col pb-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-foreground transition-colors duration-200 group-hover/item:text-blue-400">
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
                    </div>
                  </div>
                ))}
              </div>

              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      href="/dashboard/updates"
                      className="absolute right-6 bottom-6 rounded-lg p-2 text-muted-foreground/50 transition-all hover:bg-accent/60 hover:text-muted-foreground"
                    />
                  }
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </TooltipTrigger>
                <TooltipContent>Open the full updates timeline.</TooltipContent>
              </Tooltip>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={260}>
            <div className="glass-card relative min-h-[360px] p-7">
              <div className="mb-7 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber-500/10 p-2.5 ring-1 ring-amber-500/20 transition-all duration-200">
                    <FileText className="h-4 w-4 text-amber-400" />
                  </div>
                  <h2 className="text-base font-semibold text-foreground">
                    Documents
                  </h2>
                </div>
                <Link
                  href="/dashboard/documents"
                  className="flex items-center gap-1 text-xs text-muted-foreground transition-colors duration-200 hover:gap-1.5 hover:text-blue-400"
                >
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
                  {documents.map((doc) => (
                    <div
                      key={doc.name}
                      className="group/row -mx-3 grid cursor-pointer grid-cols-12 items-center gap-4 rounded-xl px-3 py-3 transition-all duration-200 hover:scale-[1.005] hover:bg-accent/40"
                    >
                      <div className="col-span-6 flex items-center gap-3">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-accent/50 transition-colors duration-200 group-hover/row:bg-accent/80">
                          <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <span className="truncate text-sm font-medium text-foreground transition-colors duration-200 group-hover/row:text-blue-400">
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

              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      href="/dashboard/documents"
                      className="absolute right-6 bottom-6 rounded-lg p-2 text-muted-foreground/50 transition-all hover:bg-accent/60 hover:text-muted-foreground"
                    />
                  }
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </TooltipTrigger>
                <TooltipContent>Open the full documents page.</TooltipContent>
              </Tooltip>
            </div>
          </Reveal>
        </div>
      </div>
    </TooltipProvider>
  )
}
