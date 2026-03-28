import { Save } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your profile, preferences, and notifications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Settings Navigation */}
        <div className="md:col-span-3">
          <nav className="flex flex-col space-y-1">
            {[
              { label: "Profile", active: true },
              { label: "Notifications", active: false },
              { label: "Appearance", active: false },
              { label: "Security", active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${item.active
                    ? 'bg-blue-500/10 text-blue-400 relative'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-gray-300'
                  }
                `}
              >
                {item.active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-blue-500 rounded-r-full" />
                )}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="md:col-span-9 space-y-6">
          <div className="glass-card-static p-7">
            <h3 className="text-base font-semibold text-foreground mb-6">Profile Details</h3>

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">First Name</label>
                  <input
                    type="text"
                    defaultValue="Josh"
                    className="w-full bg-accent/40 border border-border/60 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Butcher"
                    className="w-full bg-accent/40 border border-border/60 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  defaultValue="josh@example.com"
                  className="w-full bg-accent/40 border border-border/60 rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/30 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Company</label>
                <input
                  type="text"
                  defaultValue="Acme Corp"
                  disabled
                  className="w-full bg-accent/30 border border-border/30 rounded-xl px-4 py-3 text-sm text-muted-foreground/80 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/60 flex justify-end">
              <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-foreground font-semibold py-2.5 px-5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 text-sm">
                <Save className="w-3.5 h-3.5" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
