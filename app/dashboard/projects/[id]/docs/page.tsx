import { notFound } from "next/navigation"
import { getProjectById } from "@/lib/mock-data"
import { FileText, Download, ArrowLeft } from "lucide-react"
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
    Other: { bg: "bg-gray-500/10", text: "text-gray-400" },
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/projects/${p.id}`} className="p-2 rounded-lg hover:bg-white/[0.06] text-gray-500 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Documentation</h2>
          <p className="text-sm text-gray-500 mt-1">
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
                  <h3 className="text-sm font-semibold text-white leading-snug">{doc.title}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider mt-1 block ${config.text}`}>{doc.type}</span>
                </div>
              </div>

              <div className="flex-1 text-xs text-gray-500 mb-5">
                Last updated: {new Date(doc.lastUpdated).toLocaleDateString()}
              </div>

              <Link
                href={doc.url}
                className="w-full flex items-center justify-center gap-2 text-xs font-medium text-gray-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] py-2.5 rounded-xl transition-all border border-white/[0.04] hover:border-white/[0.08]"
              >
                <Download className="h-3.5 w-3.5" /> Download
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
