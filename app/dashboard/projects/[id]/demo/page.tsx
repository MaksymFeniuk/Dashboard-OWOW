import { notFound } from "next/navigation"
import { getProjectById } from "@/lib/mock-data"
import { MonitorPlay, ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function DemoPage({ params }: { params: Promise<{ id: string }> }) {
  const p = await params
  const project = getProjectById(p.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/projects/${p.id}`} className="p-2 rounded-lg hover:bg-white/[0.06] text-gray-500 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Demo Environment</h2>
          <p className="text-sm text-gray-500 mt-1">
            Access the live staging environment for <strong className="text-gray-300">{project.name}</strong>.
          </p>
        </div>
      </div>

      <div className="glass-card-static p-8 max-w-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500" />

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
            <MonitorPlay className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Staging Build</h3>
            <p className="text-sm text-gray-500 mt-1">
              This environment reflects the latest updates from the current sprint.
            </p>
          </div>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <span className="text-[11px] text-gray-600 uppercase tracking-wider block mb-1">URL</span>
          <span className="text-sm font-medium text-blue-400">{project.demoUrl}</span>
        </div>

        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 items-center gap-2 text-sm"
        >
          Open Demo <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  )
}
