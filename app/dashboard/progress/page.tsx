import Link from "next/link"
import { ArrowUpRight, CheckCircle2, Clock3, Flag, Wallet, Zap } from "lucide-react"
import type { CSSProperties } from "react"

import {
  progressHighlights,
  recentUpdates,
  timelinePhases,
  timelineStats,
  totalBudget,
} from "@/lib/dashboard-data"

export default function ProgressPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Progress
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A focused view of delivery status, milestones, and what comes next.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border/40 bg-accent/40 px-3.5 py-2 text-xs text-muted-foreground">
          <Clock3 className="h-3.5 w-3.5" />
          <span>Prepared for the Tuesday, April 8, 2026 meeting</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Active phase",
            value: timelineStats[0].value,
            note: "Engineering is the main focus this sprint.",
            icon: Zap,
            tone: "text-blue-400 bg-blue-500/10 ring-blue-500/20",
          },
          {
            label: "Overall progress",
            value: timelineStats[1].value,
            note: "Progress reflects the current sprint completion rate.",
            icon: CheckCircle2,
            tone: "text-emerald-400 bg-emerald-500/10 ring-emerald-500/20",
          },
          {
            label: "Deadline",
            value: timelineStats[2].value,
            note: "Client delivery target for the current scope.",
            icon: Flag,
            tone: "text-amber-400 bg-amber-500/10 ring-amber-500/20",
          },
          {
            label: "Total budget",
            value: `$${totalBudget.toLocaleString()}`,
            note: "Budget stays visible here without the removed burn-rate view.",
            icon: Wallet,
            tone: "text-violet-400 bg-violet-500/10 ring-violet-500/20",
          },
        ].map((item) => {
          const Icon = item.icon

          return (
            <div key={item.label} className="glass-card p-6">
              <div className="flex items-center gap-3">
                <div className={`rounded-xl p-2.5 ring-1 ${item.tone}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    {item.value}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {item.note}
              </p>
            </div>
          )
        })}
      </div>

      <div className="glass-card p-7">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-500/10 p-2.5 ring-1 ring-blue-500/20">
              <Zap className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Delivery timeline
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Shared view with the overview page for consistent reporting.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/projects"
            prefetch={false}
            className="hidden items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-blue-400 sm:flex"
          >
            Open projects <ArrowUpRight className="h-3 w-3" />
          </Link>
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

          <div className="relative grid gap-4 lg:grid-cols-4">
            {timelinePhases.map((phase, index) => (
              <div
                key={phase.label}
                className="timeline-phase pt-0 text-center"
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
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.2fr,0.8fr]">
        <div className="glass-card-static p-7">
          <h3 className="text-base font-semibold text-foreground">
            Meeting highlights
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            The main talking points to keep the April 8 review focused.
          </p>

          <div className="mt-5 grid gap-3">
            {progressHighlights.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border/40 bg-accent/20 px-4 py-4"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {item.value}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card-static p-7">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Recent delivery updates
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Small, high-signal updates that support the progress view.
              </p>
            </div>
            <Link
              href="/dashboard/updates"
              prefetch={false}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Open updates page"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {recentUpdates.map((item) => (
              <div key={item.title} className="flex gap-3">
                <div
                  className={`mt-1.5 h-[10px] w-[10px] flex-shrink-0 rounded-full ${item.color}`}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {item.title}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
