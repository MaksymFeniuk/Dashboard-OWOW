import {
  ArrowUpRight,
  FileText,
  MessageSquare,
  Clock,
  Maximize2,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { SmartAlerts } from "@/components/dashboard/smart-alerts"
import { BudgetChart } from "@/components/dashboard/budget-chart"
import { InteractiveTimeline } from "@/components/dashboard/interactive-timeline"

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── Welcome Header ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Good evening, Josh 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here&apos;s your project overview for today
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-accent/40 border border-border/40 px-3.5 py-2 rounded-xl">
          <Clock className="h-3.5 w-3.5" />
          <span>Last updated: March 28, 2026</span>
        </div>
      </div>

      {/* ── Smart Alerts ────────────────────────────────────────────── */}
      <SmartAlerts />

      {/* ── Main Grid ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── Timeline Card (col-span-2) ──────────────────────────── */}
        <div className="lg:col-span-2 glass-card p-7 relative flex flex-col gap-8 group hover:shadow-2xl hover:shadow-black/30 hover:border-border/60 transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20 transition-all duration-200 group-hover:ring-blue-500/40">
                <Zap className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-foreground">Project Timeline</h2>
                <p className="text-xs text-muted-foreground mt-0.5">E-commerce Redesign</p>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full ring-1 ring-blue-500/20">
              Sprint 3 / 5
            </span>
          </div>

          {/* Interactive Timeline */}
          <div className="pb-2">
            <InteractiveTimeline />
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Current Phase", value: "Building", accent: "text-blue-400" },
              { label: "Progress", value: "65%", accent: "text-emerald-400" },
              { label: "Deadline", value: "Jun 15, 2026", accent: "text-amber-400" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-accent/30 hover:bg-accent/50 rounded-xl px-4 py-3 border border-border/30 transition-all duration-200 cursor-default"
              >
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                  {item.label}
                </span>
                <span className={`text-sm font-bold mt-1.5 block ${item.accent}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Column ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-5">

          {/* Budget Chart Card */}
          <div className="glass-card p-7 flex flex-col relative overflow-hidden group hover:shadow-2xl hover:shadow-black/30 hover:border-border/60 transition-all duration-300 min-h-[320px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.05] rounded-full blur-[50px] pointer-events-none" />
            <div className="flex items-center gap-3 mb-5 relative">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20 transition-all duration-200 group-hover:ring-emerald-500/40">
                <ArrowUpRight className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-foreground">Budget</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Burn rate over time</p>
              </div>
            </div>
            <div className="flex-1 relative">
              <BudgetChart />
            </div>
          </div>

          {/* Communication Card */}
          <div className="glass-card p-7 group hover:shadow-2xl hover:shadow-black/30 hover:border-border/60 transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-purple-500/10 ring-1 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all duration-200">
                <MessageSquare className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-foreground">Communication</h2>
                <p className="text-xs text-muted-foreground mt-0.5">3 unread messages</p>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-[#4A154B] to-[#611f69] hover:from-[#5a1d5c] hover:to-[#7a2980] text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 hover:scale-[1.02] active:scale-[0.98]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
              </svg>
              Open Slack
            </button>
          </div>
        </div>

        {/* ── Recent Updates (Timeline feed) ─────────────────────── */}
        <div className="glass-card p-7 relative min-h-[360px] animate-slide-up stagger-2 group hover:shadow-2xl hover:shadow-black/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all duration-200">
                <Clock className="h-4 w-4 text-emerald-400" />
              </div>
              <h2 className="text-base font-semibold text-foreground">Recent Updates</h2>
            </div>
          </div>

          <div className="space-y-5 relative">
            {/* Gradient vertical line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/40 via-blue-500/20 to-transparent pointer-events-none" />

            {[
              { title: "Beta Release Deployed", date: "March 4, 2026", color: "bg-emerald-500", badge: "Release", badgeColor: "text-emerald-400 bg-emerald-500/10" },
              { title: "Alpha V2 Deployed", date: "Feb 28, 2026", color: "bg-blue-500", badge: "Deploy", badgeColor: "text-blue-400 bg-blue-500/10" },
              { title: "UI Redesign Approved", date: "Feb 15, 2026", color: "bg-muted-foreground/40", badge: "Approved", badgeColor: "text-muted-foreground bg-accent/60" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 relative z-10 group/item cursor-pointer">
                <div className={`w-[10px] h-[10px] rounded-full ${item.color} ring-4 ring-background flex-shrink-0 mt-1.5 transition-all duration-200 group-hover/item:scale-125 group-hover/item:ring-border/60`} />
                <div className="flex flex-col flex-1 pb-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-foreground font-medium group-hover/item:text-blue-400 transition-colors duration-200">
                      {item.title}
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">{item.date}</span>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/dashboard/updates"
            className="absolute bottom-6 right-6 p-2 rounded-lg hover:bg-accent/60 text-muted-foreground/50 hover:text-muted-foreground transition-all"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ── Documents (col-span-2) ──────────────────────────────── */}
        <div className="lg:col-span-2 glass-card p-7 relative min-h-[360px] animate-slide-up stagger-3 group hover:shadow-2xl hover:shadow-black/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 ring-1 ring-amber-500/20 group-hover:ring-amber-500/40 transition-all duration-200">
                <FileText className="h-4 w-4 text-amber-400" />
              </div>
              <h2 className="text-base font-semibold text-foreground">Documents</h2>
            </div>
            <Link
              href="/dashboard/documents"
              className="text-xs text-muted-foreground hover:text-blue-400 transition-colors flex items-center gap-1 hover:gap-1.5 duration-200"
            >
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-12 gap-4 text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mb-4 pb-3 border-b border-border/40">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Date</div>
            </div>

            <div className="space-y-1">
              {[
                { name: "Master Services Agreement", type: "PDF", date: "Jan 10, 2026" },
                { name: "Brand Guidelines v2", type: "PDF", date: "Feb 05, 2026" },
                { name: "Sprint Review Deck", type: "PPTX", date: "Feb 20, 2026" },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-4 items-center py-3 px-3 rounded-xl hover:bg-accent/40 transition-all duration-200 group/row cursor-pointer -mx-3 hover:scale-[1.005]"
                >
                  <div className="col-span-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/50 group-hover/row:bg-accent/80 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                      <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <span className="text-sm text-foreground font-medium truncate group-hover/row:text-blue-400 transition-colors duration-200">
                      {doc.name}
                    </span>
                  </div>
                  <div className="col-span-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      doc.type === "PDF"
                        ? "bg-red-500/10 text-red-400 ring-1 ring-red-500/20"
                        : "bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20"
                    }`}>
                      {doc.type}
                    </span>
                  </div>
                  <div className="col-span-3 text-xs text-muted-foreground">{doc.date}</div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/dashboard/documents"
            className="absolute bottom-6 right-6 p-2 rounded-lg hover:bg-accent/60 text-muted-foreground/50 hover:text-muted-foreground transition-all"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
