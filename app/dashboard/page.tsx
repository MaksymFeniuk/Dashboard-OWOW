import { Maximize2, ArrowUpRight, MessageSquare, Clock, FileText, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Good evening, Josh
          </h1>
          <p className="text-sm text-gray-500 mt-1">Here&apos;s your project overview for today</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="h-3.5 w-3.5" />
          <span>Last updated: March 24, 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Timeline Card */}
        <div className="lg:col-span-2 glass-card p-7 relative flex flex-col justify-between min-h-[260px]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <TrendingUp className="h-4 w-4 text-blue-400" />
              </div>
              <h2 className="text-base font-semibold text-white">Project Timeline</h2>
            </div>
            <span className="text-xs text-gray-500 bg-white/[0.04] px-3 py-1 rounded-full">E-commerce Redesign</span>
          </div>

          {/* Timeline Progress */}
          <div className="relative mb-10">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400/50 w-3/4 rounded-full transition-all duration-1000" />
            </div>

            <div className="relative flex justify-between">
              {[
                { label: "Design", active: true, done: true },
                { label: "UX", active: true, done: true },
                { label: "Building", active: true, done: false },
                { label: "Testing", active: false, done: false },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full z-10 ring-4 ring-[#0a0a0f] transition-all
                    ${step.done ? 'bg-blue-500 shadow-lg shadow-blue-500/30' :
                      step.active ? 'bg-blue-500 animate-pulse-glow' :
                      'bg-white/10'}`}
                  />
                  <span className={`text-xs font-medium ${step.active ? 'text-white' : 'text-gray-600'}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Current Phase", value: "Building" },
              { label: "Progress", value: "65%" },
              { label: "Deadline", value: "Jun 15, 2026" },
            ].map((item, i) => (
              <div key={i} className="bg-white/[0.03] rounded-xl px-4 py-3">
                <span className="text-[11px] text-gray-500 uppercase tracking-wider block">{item.label}</span>
                <span className="text-sm text-white font-semibold mt-1 block">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-5">
          {/* Budget Card */}
          <div className="glass-card p-7 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/[0.06] rounded-full blur-[40px]" />
            <div className="flex items-center gap-3 mb-4 relative">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
              <h2 className="text-base font-semibold text-white">Budget</h2>
            </div>
            <div className="relative">
              <div className="text-3xl font-bold text-white tracking-tight">$150,000</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">50% used</span>
                <span className="text-xs text-gray-500">on track</span>
              </div>
            </div>
          </div>

          {/* Communication Card */}
          <div className="glass-card p-7 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <MessageSquare className="h-4 w-4 text-purple-400" />
              </div>
              <h2 className="text-base font-semibold text-white">Communication</h2>
            </div>
            <button className="w-full bg-gradient-to-r from-[#4A154B] to-[#611f69] hover:from-[#5a1d5c] hover:to-[#7a2980] text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-purple-900/20">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>
              Open Slack
            </button>
          </div>
        </div>

        {/* Project Updates */}
        <div className="glass-card p-7 relative min-h-[380px] animate-slide-up stagger-2">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Clock className="h-4 w-4 text-emerald-400" />
              </div>
              <h2 className="text-base font-semibold text-white">Recent Updates</h2>
            </div>
          </div>

          <div className="space-y-6 relative">
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/40 via-blue-500/20 to-transparent" />

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
          </div>

          <button className="absolute bottom-6 right-6 text-gray-600 hover:text-gray-400 transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Documents */}
        <div className="lg:col-span-2 glass-card p-7 relative min-h-[380px] animate-slide-up stagger-3">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <FileText className="h-4 w-4 text-amber-400" />
              </div>
              <h2 className="text-base font-semibold text-white">Documents</h2>
            </div>
            <button className="text-xs text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-1">
              View all <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-12 gap-4 text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-5 pb-3 border-b border-white/[0.04]">
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
            </div>
          </div>

          <button className="absolute bottom-6 right-6 text-gray-600 hover:text-gray-400 transition-colors">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
