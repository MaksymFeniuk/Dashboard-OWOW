import { Download, FileText, File } from "lucide-react"

export default function DocumentsPage() {
  const documents = [
    { name: "Master Services Agreement (MSA)", type: "PDF", date: "Jan 10, 2026", size: "2.4 MB" },
    { name: "Statement of Work (SOW) - Q1", type: "PDF", date: "Jan 15, 2026", size: "1.1 MB" },
    { name: "Brand Guidelines v2", type: "PDF", date: "Feb 05, 2026", size: "15.8 MB" },
    { name: "Sprint 1 Review Deck", type: "PPTX", date: "Feb 20, 2026", size: "5.2 MB" },
    { name: "QA Sign-off Report", type: "PDF", date: "Mar 01, 2026", size: "600 KB" },
    { name: "Beta Release Notes", type: "PDF", date: "Mar 04, 2026", size: "350 KB" },
  ]

  const typeConfig: Record<string, { bg: string; text: string }> = {
    PDF: { bg: "bg-red-500/10", text: "text-red-400" },
    PPTX: { bg: "bg-amber-500/10", text: "text-amber-400" },
    DOCX: { bg: "bg-blue-500/10", text: "text-blue-400" },
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Project Documents</h2>
        <p className="text-sm text-muted-foreground mt-1">All contracts, specifications, and reports relative to the project.</p>
      </div>

      <div className="glass-card-static p-7">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-4 pb-4 border-b border-border/40 px-3">
          <div className="col-span-5 md:col-span-6">Document</div>
          <div className="col-span-2">Type</div>
          <div className="col-span-3 md:col-span-2">Date</div>
          <div className="hidden md:block md:col-span-2 text-right">Action</div>
        </div>

        {/* Rows */}
        <div className="space-y-1">
          {documents.map((doc, idx) => {
            const config = typeConfig[doc.type] || { bg: "bg-gray-500/10", text: "text-muted-foreground" }
            return (
              <div key={idx} className="grid grid-cols-12 gap-4 items-center py-3.5 px-3 rounded-xl hover:bg-accent/40 transition-colors group cursor-pointer">
                <div className="col-span-5 md:col-span-6 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                    <FileText className={`h-4 w-4 ${config.text}`} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm text-foreground font-medium truncate group-hover:text-blue-400 transition-colors">{doc.name}</span>
                    <span className="text-[11px] text-muted-foreground/80 md:hidden">{doc.size}</span>
                  </div>
                </div>

                <div className="col-span-2">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${config.bg} ${config.text}`}>
                    {doc.type}
                  </span>
                </div>

                <div className="col-span-3 md:col-span-2 flex flex-col">
                  <span className="text-xs text-muted-foreground">{doc.date}</span>
                  <span className="text-[11px] text-muted-foreground/80 hidden md:block">{doc.size}</span>
                </div>

                <div className="hidden md:flex md:col-span-2 justify-end">
                  <button className="p-2 text-muted-foreground hover:text-foreground bg-accent/50 hover:bg-accent/90 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
