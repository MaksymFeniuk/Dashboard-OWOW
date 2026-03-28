import { mockClients } from "@/lib/mock-data"
import { MonitorPlay, ExternalLink } from "lucide-react"

export default function GlobalDemosPage() {
  const client = mockClients[0]

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Demo Environments</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Access the live staging environments for all your active projects.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {client.projects.map((project, idx) => (
          <div key={project.id} className={`glass-card p-7 flex flex-col relative overflow-hidden animate-slide-up stagger-${idx + 1}`}>
            {/* Top gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500" />

            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                <MonitorPlay className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">{project.name}</h3>
                <span className="text-xs text-muted-foreground">Staging Build</span>
              </div>
            </div>

            <div className="flex-1 mb-6">
              <span className="text-[11px] text-muted-foreground/80 uppercase tracking-wider block mb-1">Environment URL</span>
              <span className="text-sm font-medium text-gray-300 truncate block" title={project.demoUrl}>
                {project.demoUrl}
              </span>
            </div>

            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-foreground font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 flex items-center justify-center gap-2 text-sm"
            >
              Open Demo <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
