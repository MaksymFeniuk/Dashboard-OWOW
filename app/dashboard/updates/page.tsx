export default function UpdatesPage() {
  const updates = [
    { title: "Beta Release", date: "March 4, 2026", desc: "First limited release made available to testers for feedback and validation.", color: "bg-emerald-500", glow: "shadow-emerald-500/30" },
    { title: "Alpha V2 Deploy", date: "February 28, 2026", desc: "Internal QA testing initiated for Alpha V2 with automated test suites.", color: "bg-blue-500", glow: "shadow-blue-500/30" },
    { title: "UI Redesign Approved", date: "February 15, 2026", desc: "Client signed off on final dashboard mockups and design system.", color: "bg-purple-500", glow: "shadow-purple-500/30" },
    { title: "Project Kickoff", date: "January 10, 2026", desc: "Initial planning and sprint scoping completed with the full team.", color: "bg-gray-500", glow: "" },
  ]

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Project Updates</h2>
        <p className="text-sm text-muted-foreground mt-1">A comprehensive timeline of major events, milestones, and releases.</p>
      </div>

      <div className="glass-card-static p-8 md:p-10">
        <div className="space-y-0 relative">
          {/* Gradient vertical line */}
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-emerald-500/40 via-blue-500/20 via-purple-500/10 to-transparent hidden md:block" />

          {updates.map((update, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-5 relative z-10 group py-6 first:pt-0 last:pb-0">
              {/* Dot */}
              <div className="hidden md:flex items-start pt-1.5">
                <div className={`w-[10px] h-[10px] rounded-full ${update.color} ring-4 ring-[#0a0a0f] flex-shrink-0 ${update.glow ? `shadow-lg ${update.glow}` : ''}`} />
              </div>

              {/* Content card */}
              <div className="flex-1 bg-accent/30 rounded-xl p-5 border border-border/40 hover:bg-accent/50 hover:border-border/80 transition-all cursor-pointer group-hover:-translate-y-0.5">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-2 h-2 rounded-full ${update.color} md:hidden`} />
                  <span className="text-xs text-muted-foreground font-medium">{update.date}</span>
                </div>
                <h3 className="text-foreground font-semibold text-base group-hover:text-blue-400 transition-colors">{update.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{update.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
