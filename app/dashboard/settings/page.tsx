import { BellRing, KeyRound, Mail, Save, ShieldCheck } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Settings
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage notifications and security settings for the client dashboard.
        </p>
      </div>

      <div className="grid gap-6">
        <section className="glass-card-static p-7">
          <div className="mb-6 flex items-start gap-3">
            <div className="rounded-xl bg-blue-500/10 p-2.5 ring-1 ring-blue-500/20">
              <BellRing className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Notifications
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Keep the essential alerts visible in email and inside the dashboard.
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {[
              {
                title: "Email updates",
                description:
                  "Receive milestone, release, and document-related updates by email.",
                defaultChecked: true,
              },
              {
                title: "Dashboard updates",
                description:
                  "Show release and project notifications in the header notification panel.",
                defaultChecked: true,
              },
            ].map((item) => (
              <label
                key={item.title}
                className="flex cursor-pointer items-start gap-4 rounded-2xl border border-border/50 bg-accent/20 px-4 py-4"
              >
                <input
                  type="checkbox"
                  defaultChecked={item.defaultChecked}
                  className="mt-1 h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </section>

        <section className="glass-card-static p-7">
          <div className="mb-6 flex items-start gap-3">
            <div className="rounded-xl bg-emerald-500/10 p-2.5 ring-1 ring-emerald-500/20">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Security
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Update the account email and password used to access the dashboard.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                Email address
              </label>
              <input
                type="email"
                defaultValue="josh@example.com"
                className="w-full rounded-xl border border-border/60 bg-accent/40 px-4 py-3 text-sm text-foreground transition-all focus:border-blue-500/30 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  <KeyRound className="h-3.5 w-3.5" />
                  Current password
                </label>
                <input
                  type="password"
                  defaultValue="password123"
                  className="w-full rounded-xl border border-border/60 bg-accent/40 px-4 py-3 text-sm text-foreground transition-all focus:border-blue-500/30 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  New password
                </label>
                <input
                  type="password"
                  placeholder="Enter a new password"
                  className="w-full rounded-xl border border-border/60 bg-accent/40 px-4 py-3 text-sm text-foreground transition-all placeholder:text-muted-foreground focus:border-blue-500/30 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Confirm new password
              </label>
              <input
                type="password"
                placeholder="Repeat the new password"
                className="w-full rounded-xl border border-border/60 bg-accent/40 px-4 py-3 text-sm text-foreground transition-all placeholder:text-muted-foreground focus:border-blue-500/30 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end border-t border-border/60 pt-6">
            <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-foreground shadow-lg shadow-blue-500/20 transition-all hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/30">
              <Save className="h-3.5 w-3.5" /> Save Changes
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
