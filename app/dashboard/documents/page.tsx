"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import {
  Search, Upload, Trash2, Download, Eye, Share2,
  FileText, FileImage, FileCode, File, Filter,
  ChevronDown, ChevronUp, Star, Clock, AlertTriangle,
  X, Check, SortAsc, SortDesc
} from "lucide-react"

type FileType = "PDF" | "PPTX" | "DOCX" | "FIGMA" | "XLSX"
type Category = "All" | "Legal" | "Design" | "Engineering" | "Reports"
type SortKey = "name" | "date" | "size"

interface Doc {
  id: number
  name: string
  type: FileType
  date: string
  rawDate: Date
  sizeMB: number
  sizeLabel: string
  category: Category
  important: boolean
  recent: boolean
  preview: string
}

const documents: Doc[] = [
  { id: 1, name: "Master Services Agreement (MSA)", type: "PDF", date: "Jan 10, 2026", rawDate: new Date("2026-01-10"), sizeMB: 2.4, sizeLabel: "2.4 MB", category: "Legal", important: true, recent: false, preview: "This agreement governs the terms of service between OWOW and the client. Covers deliverables, IP ownership, payment terms, and dispute resolution." },
  { id: 2, name: "Statement of Work – Q1", type: "PDF", date: "Jan 15, 2026", rawDate: new Date("2026-01-15"), sizeMB: 1.1, sizeLabel: "1.1 MB", category: "Legal", important: true, recent: false, preview: "Q1 scope definition including sprint milestones, acceptance criteria, and estimated delivery timeline through March 2026." },
  { id: 3, name: "Brand Guidelines v2", type: "PDF", date: "Feb 05, 2026", rawDate: new Date("2026-02-05"), sizeMB: 15.8, sizeLabel: "15.8 MB", category: "Design", important: false, recent: false, preview: "Updated brand system including typography scale, color tokens, spacing conventions, and component usage guidelines." },
  { id: 4, name: "Sprint 1 Review Deck", type: "PPTX", date: "Feb 20, 2026", rawDate: new Date("2026-02-20"), sizeMB: 5.2, sizeLabel: "5.2 MB", category: "Engineering", important: false, recent: false, preview: "Presentation slides from the Sprint 1 review session covering completed user stories, velocity metrics, and risks identified." },
  { id: 5, name: "QA Sign-off Report", type: "PDF", date: "Mar 01, 2026", rawDate: new Date("2026-03-01"), sizeMB: 0.6, sizeLabel: "600 KB", category: "Reports", important: false, recent: true, preview: "Sign-off document confirming successful QA pass for Alpha V2. 97% test coverage, 4 minor issues deferred to next sprint." },
  { id: 6, name: "Beta Release Notes", type: "PDF", date: "Mar 04, 2026", rawDate: new Date("2026-03-04"), sizeMB: 0.35, sizeLabel: "350 KB", category: "Reports", important: false, recent: true, preview: "Full changelog and known issues for Beta v1.0. Includes deployment instructions, rollback procedure, and feedback contact." },
]

const TYPE_META: Record<FileType, { bg: string; text: string; ring: string; icon: React.ElementType }> = {
  PDF:   { bg: "bg-red-500/10",    text: "text-red-400",    ring: "ring-red-500/20",    icon: FileText },
  PPTX:  { bg: "bg-amber-500/10",  text: "text-amber-400",  ring: "ring-amber-500/20",  icon: FileImage },
  DOCX:  { bg: "bg-blue-500/10",   text: "text-blue-400",   ring: "ring-blue-500/20",   icon: FileCode },
  FIGMA: { bg: "bg-purple-500/10", text: "text-purple-400", ring: "ring-purple-500/20", icon: FileImage },
  XLSX:  { bg: "bg-emerald-500/10",text: "text-emerald-400",ring: "ring-emerald-500/20",icon: File },
}

const CATEGORIES: Array<Category | "All"> = ["All", "Legal", "Design", "Engineering", "Reports"]

export default function DocumentsPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<Category | "All">("All")
  const [sortKey, setSortKey] = useState<SortKey>("date")
  const [sortAsc, setSortAsc] = useState(false)
  const [previewId, setPreviewId] = useState<number | null>(null)
  const [showUpload, setShowUpload] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadCategory, setUploadCategory] = useState<Category>("Reports")
  const [uploadedDocs, setUploadedDocs] = useState<Doc[]>([])
  const [deletedIds, setDeletedIds] = useState<number[]>([])
  const [docDeleteConfirm, setDocDeleteConfirm] = useState<number | null>(null)
  const [hydrated, setHydrated] = useState(false)

  // Load persisted data after mount (avoids SSR/client hydration mismatch)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("owow_uploaded_docs")
      if (raw) {
        setUploadedDocs(
          (JSON.parse(raw) as Array<Doc & { rawDate: string }>).map(d => ({
            ...d,
            rawDate: new Date(d.rawDate),
          }))
        )
      }
    } catch { /* ignore */ }
    try {
      const raw = localStorage.getItem("owow_deleted_ids")
      if (raw) setDeletedIds(JSON.parse(raw))
    } catch { /* ignore */ }
    setHydrated(true)
  }, [])

  const deleteDoc = useCallback((id: number) => {
    setDeletedIds(prev => [...prev, id])
    setDocDeleteConfirm(null)
    if (previewId === id) setPreviewId(null)
  }, [previewId])

  // Persist uploads and deletes across refreshes (only after hydration)
  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem("owow_uploaded_docs", JSON.stringify(uploadedDocs))
  }, [uploadedDocs, hydrated])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem("owow_deleted_ids", JSON.stringify(deletedIds))
  }, [deletedIds, hydrated])

  const confirmUpload = useCallback(() => {
    if (!uploadFile) return
    const ext = uploadFile.name.split(".").pop()?.toUpperCase() as FileType | undefined
    const newDoc: Doc = {
      id: Date.now(),
      name: uploadFile.name.replace(/\.[^/.]+$/, ""),
      type: (["PDF","PPTX","DOCX","XLSX"].includes(ext ?? "") ? ext : "PDF") as FileType,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      rawDate: new Date(),
      sizeMB: uploadFile.size / 1024 / 1024,
      sizeLabel: uploadFile.size > 1048576
        ? `${(uploadFile.size / 1048576).toFixed(1)} MB`
        : `${Math.round(uploadFile.size / 1024)} KB`,
      category: uploadCategory,
      important: false,
      recent: true,
      preview: "Newly uploaded document.",
    }
    setUploadedDocs(prev => [newDoc, ...prev])
    setShowUpload(false)
    setUploadFile(null)
    setUploadCategory("Reports")
  }, [uploadFile, uploadCategory])

  const allDocs = useMemo(() => [...uploadedDocs, ...documents], [uploadedDocs])

  const filtered = useMemo(() => {
    let list = allDocs.filter(d => {
      const matchCat = category === "All" || d.category === category
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.category.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch && !deletedIds.includes(d.id)
    })
    list = [...list].sort((a, b) => {
      let cmp = 0
      if (sortKey === "name") cmp = a.name.localeCompare(b.name)
      else if (sortKey === "date") cmp = a.rawDate.getTime() - b.rawDate.getTime()
      else if (sortKey === "size") cmp = a.sizeMB - b.sizeMB
      return sortAsc ? cmp : -cmp
    })
    return list
  }, [search, category, sortKey, sortAsc])

  const previewDoc = documents.find(d => d.id === previewId)

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(a => !a)
    else { setSortKey(key); setSortAsc(false) }
  }

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k
      ? sortAsc ? <SortAsc className="h-3 w-3 text-blue-400" /> : <SortDesc className="h-3 w-3 text-blue-400" />
      : <SortAsc className="h-3 w-3 text-muted-foreground/40" />

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Project Documents</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {documents.length} files · {documents.filter(d => d.recent).length} added recently
          </p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          <Upload className="h-4 w-4" /> Upload File
        </button>
      </div>


      {/* ── Search + Filters + Sort ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text" placeholder="Search documents…" value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-accent/30 border border-border/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/30 transition-all"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Category filter pills */}
        <div className="flex items-center gap-1.5 bg-accent/30 border border-border/40 rounded-xl p-1 overflow-x-auto flex-shrink-0">
          <Filter className="h-3.5 w-3.5 text-muted-foreground ml-1.5 flex-shrink-0" />
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                category === cat ? "bg-background text-foreground shadow-sm border border-border/40" : "text-muted-foreground hover:text-foreground"
              }`}
            >{cat}</button>
          ))}
        </div>
      </div>

      {/* ── Document Table ── */}
      <div className="glass-card-static rounded-2xl overflow-hidden">
        {/* Column headers */}
        <div className="grid grid-cols-12 gap-4 text-[10px] text-muted-foreground font-semibold uppercase tracking-widest px-6 py-4 border-b border-border/30 bg-accent/10">
          <button onClick={() => toggleSort("name")} className="col-span-5 flex items-center gap-1.5 text-left hover:text-foreground transition-colors">
            Document <SortIcon k="name" />
          </button>
          <div className="col-span-2">Type</div>
          <button onClick={() => toggleSort("date")} className="col-span-2 flex items-center gap-1.5 hover:text-foreground transition-colors">
            Date <SortIcon k="date" />
          </button>
          <button onClick={() => toggleSort("size")} className="col-span-1 flex items-center gap-1.5 hover:text-foreground transition-colors">
            Size <SortIcon k="size" />
          </button>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border/20">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-4 rounded-2xl bg-accent/30 mb-3">
                <Search className="h-5 w-5 text-muted-foreground/50" />
              </div>
              <p className="text-sm font-medium text-foreground">No documents found</p>
              <button onClick={() => { setSearch(""); setCategory("All") }} className="mt-2 text-xs text-blue-400 hover:underline">Clear filters</button>
            </div>
          ) : filtered.map(doc => {
            const meta = TYPE_META[doc.type] ?? { bg: "bg-accent/40", text: "text-muted-foreground", ring: "ring-border/30", icon: File }
            const Icon = meta.icon
            const isPreview = previewId === doc.id

            return (
              <div key={doc.id} className="animate-fade-in">
                {/* Main row */}
                <div
                  className={`grid grid-cols-12 gap-4 items-center px-6 py-4 transition-all duration-200 group cursor-pointer
                    ${isPreview ? "bg-accent/40" : "hover:bg-accent/25"}
                    ${doc.important ? "border-l-2 border-amber-500/50" : "border-l-2 border-transparent"}
                  `}
                  onClick={() => setPreviewId(isPreview ? null : doc.id)}
                >
                  {/* File icon + name */}
                  <div className="col-span-5 flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl ${meta.bg} ring-1 ${meta.ring} flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-105`}>
                      <Icon className={`h-4 w-4 ${meta.text}`} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`text-sm font-medium truncate transition-colors duration-200 ${isPreview ? "text-blue-400" : "text-foreground group-hover:text-blue-400"}`}>
                          {doc.name}
                        </span>
                        {doc.important && <Star className="h-3 w-3 text-amber-400 fill-current flex-shrink-0" />}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-muted-foreground">{doc.category}</span>
                        {doc.recent && (
                          <span className="flex items-center gap-0.5 text-[9px] font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded-full">
                            <Clock className="h-2 w-2" /> Recent
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Type badge */}
                  <div className="col-span-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ring-1 ${meta.bg} ${meta.text} ${meta.ring}`}>
                      {doc.type}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="col-span-2 text-xs text-muted-foreground">{doc.date}</div>

                  {/* Size */}
                  <div className="col-span-1 text-xs text-muted-foreground">{doc.sizeLabel}</div>

                  {/* Actions (appear on hover) */}
                  <div suppressHydrationWarning className="col-span-2 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button suppressHydrationWarning title="Preview" onClick={e => { e.stopPropagation(); setPreviewId(isPreview ? null : doc.id) }}
                      className="p-1.5 rounded-lg hover:bg-blue-500/10 text-muted-foreground hover:text-blue-400 transition-all">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button suppressHydrationWarning title="Download" onClick={e => e.stopPropagation()}
                      className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-muted-foreground hover:text-emerald-400 transition-all">
                      <Download className="h-3.5 w-3.5" />
                    </button>
                    <button suppressHydrationWarning title="Share" onClick={e => e.stopPropagation()}
                      className="p-1.5 rounded-lg hover:bg-purple-500/10 text-muted-foreground hover:text-purple-400 transition-all">
                      <Share2 className="h-3.5 w-3.5" />
                    </button>

                    {docDeleteConfirm === doc.id ? (
                      <div className="flex items-center gap-1 ml-1" onClick={e => e.stopPropagation()}>
                        <span className="text-[10px] text-rose-400 font-semibold whitespace-nowrap">Sure?</span>
                        <button suppressHydrationWarning title="Confirm delete" onClick={e => { e.stopPropagation(); deleteDoc(doc.id) }}
                          className="p-1.5 rounded-lg bg-rose-500/15 text-rose-400 hover:bg-rose-500/30 transition-all">
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button suppressHydrationWarning title="Cancel" onClick={e => { e.stopPropagation(); setDocDeleteConfirm(null) }}
                          className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-all">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button suppressHydrationWarning title="Delete document" onClick={e => { e.stopPropagation(); setDocDeleteConfirm(doc.id) }}
                        className="p-1.5 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-400 transition-all ml-1">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                </div>


                {/* Inline Preview Panel */}
                {isPreview && (
                  <div className="px-6 pb-5 bg-accent/20 border-t border-border/20 animate-fade-in">
                    <div className="flex items-start gap-4 pt-4">
                      <div className={`w-12 h-12 rounded-xl ${meta.bg} ring-1 ${meta.ring} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`h-5 w-5 ${meta.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground mb-1">{doc.name}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{doc.preview}</p>
                        <div className="flex items-center gap-3 mt-4">
                          <button className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">
                            <Download className="h-3.5 w-3.5" /> Download
                          </button>
                          <button className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-lg bg-accent/60 text-muted-foreground hover:text-foreground hover:bg-accent active:scale-95 transition-all">
                            <Share2 className="h-3.5 w-3.5" /> Share Link
                          </button>
                          <span className="text-[10px] text-muted-foreground ml-auto">{doc.sizeLabel} · {doc.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Upload Modal ── */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => { setShowUpload(false); setUploadFile(null) }}>
          <div className="bg-popover border border-border/60 rounded-2xl p-8 shadow-2xl w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-foreground">Upload Document</h3>
              <button onClick={() => { setShowUpload(false); setUploadFile(null) }} className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-all">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Hidden real file input */}
            <input
              id="file-upload-input"
              type="file"
              accept=".pdf,.pptx,.ppt,.docx,.doc,.xlsx,.xls"
              className="hidden"
              onChange={e => setUploadFile(e.target.files?.[0] ?? null)}
            />

            {/* Clickable drop zone */}
            <label
              htmlFor="file-upload-input"
              className={`flex flex-col items-center justify-center text-center border-2 border-dashed rounded-xl p-10 cursor-pointer transition-all group ${
                uploadFile ? "border-primary/50 bg-primary/5" : "border-border/50 hover:border-primary/40 hover:bg-accent/20"
              }`}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); setUploadFile(e.dataTransfer.files?.[0] ?? null) }}
            >
              {uploadFile ? (
                <>
                  <div className="p-3 rounded-xl bg-primary/10 mb-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground mb-1 break-all">{uploadFile.name}</p>
                  <p className="text-xs text-muted-foreground">{(uploadFile.size / 1024 / 1024).toFixed(2)} MB · Click to change file</p>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors mb-3" />
                  <p className="text-sm font-medium text-foreground mb-1">Drop a file or click to browse</p>
                  <p className="text-xs text-muted-foreground">PDF, PPTX, DOCX, XLSX · Max 50 MB</p>
                </>
              )}
            </label>

            {/* Category selector */}
            <div className="mt-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                {(["Legal", "Design", "Engineering", "Reports"] as Category[]).map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setUploadCategory(cat)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200 border ${
                      uploadCategory === cat
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-accent/30 border-border/40 text-muted-foreground hover:text-foreground hover:border-border/70"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={() => { setShowUpload(false); setUploadFile(null) }} className="flex-1 py-2.5 rounded-xl border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-border transition-all">
                Cancel
              </button>
              <button
                disabled={!uploadFile}
                onClick={confirmUpload}
                className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              >
                {uploadFile ? "Upload File" : "Select a file first"}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ── Delete Confirm Modal ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setDeleteConfirm(false)}>
          <div className="bg-popover border border-rose-500/20 rounded-2xl p-8 shadow-2xl w-full max-w-sm mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-rose-500/10">
                <AlertTriangle className="h-5 w-5 text-rose-400" />
              </div>
              <h3 className="text-base font-semibold text-foreground">Delete Project?</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              This will permanently delete the project and all associated documents. <strong className="text-rose-400">This action cannot be undone.</strong>
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(false)} className="flex-1 py-2.5 rounded-xl border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-border transition-all">
                Cancel
              </button>
              <button
                onClick={() => setDeleteConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="h-4 w-4" /> Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
