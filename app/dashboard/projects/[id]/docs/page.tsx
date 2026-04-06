import { notFound } from "next/navigation"
import { getProjectById } from "@/lib/mock-data"
import { FileText, ArrowLeft, Link2 } from "lucide-react"
import Link from "next/link"

export default async function DocumentationPage({ params }: { params: Promise<{ id: string }> }) {
  const p = await params
  const project = getProjectById(p.id)

  if (!project) {
    notFound()
  }

  const typeColors: Record<string, { bg: string; text: string }> = {
    PRD: { bg: "bg-blue-500/10", text: "text-blue-400" },
    Planning: { bg: "bg-emerald-500/10", text: "text-emerald-400" },
    Migration: { bg: "bg-amber-500/10", text: "text-amber-400" },
    Other: { bg: "bg-gray-500/10", text: "text-muted-foreground" },
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/projects/${p.id}`} className="p-2 rounded-lg hover:bg-accent/80 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Documentation</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Important documents for <strong className="text-gray-300">{project.name}</strong>.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {project.documents.map((doc, idx) => {
          const config = typeColors[doc.type] || typeColors.Other
          return (
            <div key={doc.id} className={`glass-card p-6 flex flex-col animate-slide-up stagger-${idx + 1}`}>
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-xl ${config.bg} flex-shrink-0`}>
                  <FileText className={`h-5 w-5 ${config.text}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground leading-snug">{doc.title}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider mt-1 block ${config.text}`}>{doc.type}</span>
                </div>
              </div>

              <div className="flex-1 text-xs text-muted-foreground mb-5">
                Last updated: {new Date(doc.lastUpdated).toLocaleDateString()}
              </div>

              <div className="w-full rounded-xl border border-border/40 bg-accent/30 px-3 py-2.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Link2 className="h-3.5 w-3.5" />
                  Shared inside the dashboard
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
