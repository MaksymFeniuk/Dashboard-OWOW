import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  Wallet,
  Zap,
} from "lucide-react"
import Link from "next/link"
import type { CSSProperties } from "react"

import {
  overviewDocuments,
  recentUpdates,
  timelinePhases,
  timelineStats,
  totalBudget,
} from "@/lib/dashboard-data"

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Good evening, Josh
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s your project overview for today.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border/40 bg-accent/40 px-3.5 py-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>Last updated: April 4, 2026</span>
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
                  Project timeline
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
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${phase.accent}`}
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
                </div>
              ))}
            </div>
          </div>

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
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="glass-card relative overflow-hidden p-7">
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-violet-500/[0.08] blur-[50px]" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-violet-500/10 p-2.5 ring-1 ring-violet-500/20">
                    <Wallet className="h-4 w-4 text-violet-400" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-foreground">
                      Total budget
                    </h2>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Budget summary for the client meeting
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-3xl font-bold tracking-tight text-foreground">
                  ${totalBudget.toLocaleString()}
                </p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  Detailed budget breakdowns and burn-rate charts were removed to
                  keep the overview focused.
                </p>
              </div>

              <Link
                href="/dashboard/progress"
                prefetch={false}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Open the progress page"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
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

            <a
              href="https://slack.com"
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4A154B] to-[#611f69] py-3 text-sm font-medium text-white shadow-lg shadow-purple-900/30 transition-all hover:from-[#5a1d5c] hover:to-[#7a2980]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
              </svg>
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
                Recent updates
              </h2>
            </div>
          </div>

          <div className="relative space-y-5">
            <div className="pointer-events-none absolute bottom-2 left-[15px] top-2 w-px bg-gradient-to-b from-emerald-500/40 via-blue-500/20 to-transparent" />

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
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/dashboard/updates"
            prefetch={false}
            className="absolute bottom-6 right-6 rounded-lg p-2 text-muted-foreground/50 transition-all hover:bg-accent/60 hover:text-muted-foreground"
            aria-label="Open the full updates timeline"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="glass-card relative min-h-[360px] p-7 lg:col-span-2">
          <div className="mb-7 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-500/10 p-2.5 ring-1 ring-amber-500/20">
                <FileText className="h-4 w-4 text-amber-400" />
              </div>
              <h2 className="text-base font-semibold text-foreground">Documents</h2>
            </div>
            <Link
              href="/dashboard/documents"
              prefetch={false}
              className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-blue-400"
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
              {overviewDocuments.map((doc) => (
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
        </div>
      </div>
    </div>
  )
}
