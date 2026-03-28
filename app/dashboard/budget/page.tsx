import { DollarSign, TrendingUp, AlertCircle, BarChart3 } from "lucide-react"

export default function BudgetPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Budget Overview</h2>
        <p className="text-sm text-muted-foreground mt-1">Financial transparency and project burn rate.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Total Budget */}
        <div className="glass-card p-7 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/[0.06] rounded-full blur-[30px] group-hover:bg-emerald-500/[0.1] transition-colors" />
          <div className="flex items-center gap-3 mb-6 relative">
            <div className="p-2.5 rounded-xl bg-emerald-500/10">
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Total Budget</span>
          </div>
          <div className="relative">
            <div className="text-3xl font-bold text-foreground tracking-tight">$150,000</div>
            <div className="text-xs text-muted-foreground mt-2">Allocated for Q1 — Q2</div>
          </div>
        </div>

        {/* Amount Spent */}
        <div className="glass-card p-7 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/[0.06] rounded-full blur-[30px] group-hover:bg-blue-500/[0.1] transition-colors" />
          <div className="flex items-center gap-3 mb-6 relative">
            <div className="p-2.5 rounded-xl bg-blue-500/10">
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Amount Spent</span>
          </div>
          <div className="relative">
            <div className="text-3xl font-bold text-foreground tracking-tight">$75,000</div>
            <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full mt-2 inline-block">50% Utilized</span>
          </div>
        </div>

        {/* Remaining */}
        <div className="glass-card p-7 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/[0.06] rounded-full blur-[30px] group-hover:bg-amber-500/[0.1] transition-colors" />
          <div className="flex items-center gap-3 mb-6 relative">
            <div className="p-2.5 rounded-xl bg-amber-500/10">
              <AlertCircle className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Remaining</span>
          </div>
          <div className="relative">
            <div className="text-3xl font-bold text-foreground tracking-tight">$75,000</div>
            <div className="text-xs text-muted-foreground mt-2">On track with estimates</div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="lg:col-span-3 glass-card-static p-7">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-purple-500/10">
              <BarChart3 className="w-4 h-4 text-purple-400" />
            </div>
            <h2 className="text-base font-semibold text-foreground">Cost Breakdown</h2>
          </div>

          <div className="space-y-4">
            {[
              { phase: "Design & UX", allocated: "$40,000", spent: "$40,000", percent: 100, color: "bg-blue-500" },
              { phase: "Frontend Development", allocated: "$60,000", spent: "$25,000", percent: 41, color: "bg-emerald-500" },
              { phase: "Backend Development", allocated: "$30,000", spent: "$10,000", percent: 33, color: "bg-purple-500" },
              { phase: "QA & Testing", allocated: "$20,000", spent: "$0", percent: 0, color: "bg-gray-600" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col gap-3 p-5 rounded-xl bg-accent/30 border border-border/40 hover:bg-accent/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 md:w-1/4">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    <span className="font-medium text-sm text-foreground">{item.phase}</span>
                  </div>

                  <div className="flex gap-8 md:w-1/3">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground/80 uppercase tracking-wider">Allocated</span>
                      <span className="text-sm text-foreground font-medium">{item.allocated}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground/80 uppercase tracking-wider">Spent</span>
                      <span className="text-sm text-foreground font-medium">{item.spent}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:w-1/3">
                    <div className="flex-1 h-1.5 bg-accent/80 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.percent}%` }} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground w-10 text-right">{item.percent}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
