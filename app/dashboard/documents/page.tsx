"use client"

import {
  startTransition,
  type ElementType,
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  Check,
  Clock,
  Eye,
  File,
  FileCode,
  FileImage,
  FileText,
  Filter,
  Search,
  Share2,
  SortAsc,
  SortDesc,
  Star,
  Trash2,
  Upload,
  X,
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
  {
    id: 1,
    name: "Master Services Agreement (MSA)",
    type: "PDF",
    date: "Jan 10, 2026",
    rawDate: new Date("2026-01-10"),
    sizeMB: 2.4,
    sizeLabel: "2.4 MB",
    category: "Legal",
    important: true,
    recent: false,
    preview:
      "This agreement covers deliverables, IP ownership, payment terms, and dispute resolution.",
  },
  {
    id: 2,
    name: "Statement of Work - Q1",
    type: "PDF",
    date: "Jan 15, 2026",
    rawDate: new Date("2026-01-15"),
    sizeMB: 1.1,
    sizeLabel: "1.1 MB",
    category: "Legal",
    important: true,
    recent: false,
    preview:
      "Q1 scope definition including sprint milestones, acceptance criteria, and delivery timing.",
  },
  {
    id: 3,
    name: "Brand Guidelines v2",
    type: "PDF",
    date: "Feb 05, 2026",
    rawDate: new Date("2026-02-05"),
    sizeMB: 15.8,
    sizeLabel: "15.8 MB",
    category: "Design",
    important: false,
    recent: false,
    preview:
      "Updated brand system including typography scale, color tokens, spacing rules, and UI usage notes.",
  },
  {
    id: 4,
    name: "Sprint 1 Review Deck",
    type: "PPTX",
    date: "Feb 20, 2026",
    rawDate: new Date("2026-02-20"),
    sizeMB: 5.2,
    sizeLabel: "5.2 MB",
    category: "Engineering",
    important: false,
    recent: false,
    preview:
      "Slides from the Sprint 1 review session covering completed stories, velocity, and current risks.",
  },
  {
    id: 5,
    name: "QA Sign-off Report",
    type: "PDF",
    date: "Mar 01, 2026",
    rawDate: new Date("2026-03-01"),
    sizeMB: 0.6,
    sizeLabel: "600 KB",
    category: "Reports",
    important: false,
    recent: true,
    preview:
      "Sign-off summary for Alpha V2 with coverage notes and deferred issues.",
  },
  {
    id: 6,
    name: "Beta Release Notes",
    type: "PDF",
    date: "Mar 04, 2026",
    rawDate: new Date("2026-03-04"),
    sizeMB: 0.35,
    sizeLabel: "350 KB",
    category: "Reports",
    important: false,
    recent: true,
    preview:
      "Release changelog, known issues, and deployment coordination notes for beta review.",
  },
]

const typeMeta: Record<
  FileType,
  { bg: string; text: string; ring: string; icon: ElementType }
> = {
  PDF: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    ring: "ring-red-500/20",
    icon: FileText,
  },
  PPTX: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    ring: "ring-amber-500/20",
    icon: FileImage,
  },
  DOCX: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    ring: "ring-blue-500/20",
    icon: FileCode,
  },
  FIGMA: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    ring: "ring-purple-500/20",
    icon: FileImage,
  },
  XLSX: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    ring: "ring-emerald-500/20",
    icon: File,
  },
}

const categories: Category[] = [
  "All",
  "Legal",
  "Design",
  "Engineering",
  "Reports",
]

export default function DocumentsPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<Category>("All")
  const [sortKey, setSortKey] = useState<SortKey>("date")
  const [sortAsc, setSortAsc] = useState(false)
  const [previewId, setPreviewId] = useState<number | null>(null)
  const [showUpload, setShowUpload] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadCategory, setUploadCategory] = useState<Category>("Reports")
  const [uploadedDocs, setUploadedDocs] = useState<Doc[]>([])
  const [deletedIds, setDeletedIds] = useState<number[]>([])
  const [docDeleteConfirm, setDocDeleteConfirm] = useState<number | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    let nextUploadedDocs: Doc[] = []
    let nextDeletedIds: number[] = []

    try {
      const rawUploads = localStorage.getItem("owow_uploaded_docs")
      if (rawUploads) {
        nextUploadedDocs = (
          JSON.parse(rawUploads) as Array<Doc & { rawDate: string }>
        ).map((doc) => ({
          ...doc,
          rawDate: new Date(doc.rawDate),
        }))
      }
    } catch {}

    try {
      const rawDeleted = localStorage.getItem("owow_deleted_ids")
      if (rawDeleted) {
        nextDeletedIds = JSON.parse(rawDeleted)
      }
    } catch {}

    startTransition(() => {
      setUploadedDocs(nextUploadedDocs)
      setDeletedIds(nextDeletedIds)
      setHydrated(true)
    })
  }, [])

  useEffect(() => {
    if (!hydrated) {
      return
    }

    localStorage.setItem("owow_uploaded_docs", JSON.stringify(uploadedDocs))
  }, [uploadedDocs, hydrated])

  useEffect(() => {
    if (!hydrated) {
      return
    }

    localStorage.setItem("owow_deleted_ids", JSON.stringify(deletedIds))
  }, [deletedIds, hydrated])

  const allDocs = useMemo(() => [...uploadedDocs, ...documents], [uploadedDocs])

  const filteredDocs = useMemo(() => {
    const baseList = allDocs.filter((doc) => {
      const matchesCategory = category === "All" || doc.category === category
      const matchesSearch =
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.category.toLowerCase().includes(search.toLowerCase())

      return matchesCategory && matchesSearch && !deletedIds.includes(doc.id)
    })

    return [...baseList].sort((a, b) => {
      let comparison = 0

      if (sortKey === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortKey === "date") {
        comparison = a.rawDate.getTime() - b.rawDate.getTime()
      } else {
        comparison = a.sizeMB - b.sizeMB
      }

      return sortAsc ? comparison : -comparison
    })
  }, [allDocs, category, deletedIds, search, sortAsc, sortKey])

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc((current) => !current)
      return
    }

    setSortKey(key)
    setSortAsc(false)
  }

  function deleteDoc(id: number) {
    setDeletedIds((current) => [...current, id])
    setDocDeleteConfirm(null)

    if (previewId === id) {
      setPreviewId(null)
    }
  }

  function confirmUpload() {
    if (!uploadFile) {
      return
    }

    const extension = uploadFile.name.split(".").pop()?.toUpperCase() as
      | FileType
      | undefined

    const newDoc: Doc = {
      id: Date.now(),
      name: uploadFile.name.replace(/\.[^/.]+$/, ""),
      type: (["PDF", "PPTX", "DOCX", "XLSX"].includes(extension ?? "")
        ? extension
        : "PDF") as FileType,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      rawDate: new Date(),
      sizeMB: uploadFile.size / 1024 / 1024,
      sizeLabel:
        uploadFile.size > 1048576
          ? `${(uploadFile.size / 1048576).toFixed(1)} MB`
          : `${Math.round(uploadFile.size / 1024)} KB`,
      category: uploadCategory,
      important: false,
      recent: true,
      preview:
        "Newly uploaded document. Downloads are disabled, so files stay inside the dashboard flow.",
    }

    setUploadedDocs((current) => [newDoc, ...current])
    setShowUpload(false)
    setUploadFile(null)
    setUploadCategory("Reports")
  }

  function shareLabel(name: string) {
    return `Shared link for ${name}`
  }

  function renderSortIcon(column: SortKey) {
    if (sortKey === column) {
      return sortAsc ? (
        <SortAsc className="h-3 w-3 text-blue-400" />
      ) : (
        <SortDesc className="h-3 w-3 text-blue-400" />
      )
    }

    return <SortAsc className="h-3 w-3 text-muted-foreground/40" />
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Project Documents
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {filteredDocs.length} visible file
            {filteredDocs.length === 1 ? "" : "s"} and downloads disabled for a
            cleaner client view.
          </p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95"
        >
          <Upload className="h-4 w-4" /> Upload File
        </button>
      </div>

      <div className="glass-card-static rounded-2xl p-4 md:p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search documents"
              className="w-full rounded-xl border border-border/40 bg-accent/30 py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
            {search ? (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto rounded-xl border border-border/40 bg-accent/30 p-1">
            <Filter className="ml-1 h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  category === item
                    ? "border border-border/40 bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card-static overflow-hidden rounded-2xl">
        <div className="hidden grid-cols-12 gap-4 border-b border-border/30 bg-accent/10 px-6 py-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground md:grid">
          <button
            onClick={() => toggleSort("name")}
            className="col-span-5 flex items-center gap-1.5 text-left transition-colors hover:text-foreground"
          >
            Document {renderSortIcon("name")}
          </button>
          <div className="col-span-2">Type</div>
          <button
            onClick={() => toggleSort("date")}
            className="col-span-2 flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            Date {renderSortIcon("date")}
          </button>
          <button
            onClick={() => toggleSort("size")}
            className="col-span-1 flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            Size {renderSortIcon("size")}
          </button>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="divide-y divide-border/20">
          {filteredDocs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-3 rounded-2xl bg-accent/30 p-4">
                <Search className="h-5 w-5 text-muted-foreground/50" />
              </div>
              <p className="text-sm font-medium text-foreground">
                No documents found
              </p>
              <button
                onClick={() => {
                  setSearch("")
                  setCategory("All")
                }}
                className="mt-2 text-xs text-blue-400 hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filteredDocs.map((doc) => {
              const meta = typeMeta[doc.type]
              const Icon = meta.icon
              const isPreviewOpen = previewId === doc.id

              return (
                <div key={doc.id} className="animate-fade-in">
                  <div
                    className={`group cursor-pointer px-5 py-4 transition-all duration-200 md:px-6 ${
                      isPreviewOpen ? "bg-accent/40" : "hover:bg-accent/25"
                    } ${
                      doc.important
                        ? "border-l-2 border-amber-500/50"
                        : "border-l-2 border-transparent"
                    }`}
                    onClick={() =>
                      setPreviewId(isPreviewOpen ? null : doc.id)
                    }
                  >
                    <div className="flex flex-col gap-4 md:grid md:grid-cols-12 md:items-center md:gap-4">
                      <div className="md:col-span-5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ring-1 ${meta.bg} ${meta.ring}`}
                          >
                            <Icon className={`h-4 w-4 ${meta.text}`} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={`truncate text-sm font-medium ${
                                  isPreviewOpen
                                    ? "text-blue-400"
                                    : "text-foreground"
                                }`}
                              >
                                {doc.name}
                              </span>
                              {doc.important ? (
                                <Star className="h-3 w-3 flex-shrink-0 fill-current text-amber-400" />
                              ) : null}
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              <span className="text-[10px] text-muted-foreground">
                                {doc.category}
                              </span>
                              {doc.recent ? (
                                <span className="flex items-center gap-1 rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-bold text-blue-400">
                                  <Clock className="h-2 w-2" />
                                  Recent
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ${meta.bg} ${meta.text} ${meta.ring}`}
                        >
                          {doc.type}
                        </span>
                      </div>

                      <div className="text-xs text-muted-foreground md:col-span-2">
                        {doc.date}
                      </div>

                      <div className="text-xs text-muted-foreground md:col-span-1">
                        {doc.sizeLabel}
                      </div>

                      <div className="flex items-center gap-1 md:col-span-2 md:justify-end">
                        <button
                          title="Preview"
                          onClick={(event) => {
                            event.stopPropagation()
                            setPreviewId(isPreviewOpen ? null : doc.id)
                          }}
                          className="rounded-lg p-1.5 text-muted-foreground transition-all hover:bg-blue-500/10 hover:text-blue-400"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          title={shareLabel(doc.name)}
                          onClick={(event) => event.stopPropagation()}
                          className="rounded-lg p-1.5 text-muted-foreground transition-all hover:bg-purple-500/10 hover:text-purple-400"
                        >
                          <Share2 className="h-3.5 w-3.5" />
                        </button>

                        {docDeleteConfirm === doc.id ? (
                          <div
                            className="ml-1 flex items-center gap-1"
                            onClick={(event) => event.stopPropagation()}
                          >
                            <span className="text-[10px] font-semibold text-rose-400">
                              Sure?
                            </span>
                            <button
                              title="Confirm delete"
                              onClick={() => deleteDoc(doc.id)}
                              className="rounded-lg bg-rose-500/15 p-1.5 text-rose-400 transition-all hover:bg-rose-500/30"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                            <button
                              title="Cancel"
                              onClick={() => setDocDeleteConfirm(null)}
                              className="rounded-lg p-1.5 text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            title="Delete document"
                            onClick={(event) => {
                              event.stopPropagation()
                              setDocDeleteConfirm(doc.id)
                            }}
                            className="ml-1 rounded-lg p-1.5 text-muted-foreground transition-all hover:bg-rose-500/10 hover:text-rose-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {isPreviewOpen ? (
                    <div className="border-t border-border/20 bg-accent/20 px-5 pb-5 md:px-6">
                      <div className="flex items-start gap-4 pt-4">
                        <div
                          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ring-1 ${meta.bg} ${meta.ring}`}
                        >
                          <Icon className={`h-5 w-5 ${meta.text}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="mb-1 text-sm font-semibold text-foreground">
                            {doc.name}
                          </p>
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {doc.preview}
                          </p>
                          <div className="mt-4 flex flex-wrap items-center gap-3">
                            <button className="flex items-center gap-1.5 rounded-lg bg-accent/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground active:scale-95">
                              <Share2 className="h-3.5 w-3.5" /> Share Link
                            </button>
                            <span className="text-xs text-muted-foreground">
                              Downloads are disabled on this dashboard.
                            </span>
                            <span className="ml-auto text-[10px] text-muted-foreground">
                              {doc.sizeLabel} • {doc.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              )
            })
          )}
        </div>
      </div>

      {showUpload ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm animate-fade-in"
          onClick={() => {
            setShowUpload(false)
            setUploadFile(null)
          }}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-border/60 bg-popover p-8 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-base font-semibold text-foreground">
                Upload Document
              </h3>
              <button
                onClick={() => {
                  setShowUpload(false)
                  setUploadFile(null)
                }}
                className="rounded-lg p-1.5 text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <input
              id="file-upload-input"
              type="file"
              accept=".pdf,.pptx,.ppt,.docx,.doc,.xlsx,.xls"
              className="hidden"
              onChange={(event) =>
                setUploadFile(event.target.files?.[0] ?? null)
              }
            />

            <label
              htmlFor="file-upload-input"
              className={`group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-all ${
                uploadFile
                  ? "border-primary/50 bg-primary/5"
                  : "border-border/50 hover:border-primary/40 hover:bg-accent/20"
              }`}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault()
                setUploadFile(event.dataTransfer.files?.[0] ?? null)
              }}
            >
              {uploadFile ? (
                <>
                  <div className="mb-3 rounded-xl bg-primary/10 p-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <p className="mb-1 break-all text-sm font-semibold text-foreground">
                    {uploadFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(uploadFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </>
              ) : (
                <>
                  <Upload className="mb-3 h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
                  <p className="mb-1 text-sm font-medium text-foreground">
                    Drop a file or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, PPTX, DOCX, XLSX
                  </p>
                </>
              )}
            </label>

            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Category
              </p>
              <div className="flex flex-wrap gap-2">
                {(["Legal", "Design", "Engineering", "Reports"] as Exclude<
                  Category,
                  "All"
                >[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setUploadCategory(item)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                      uploadCategory === item
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border/40 bg-accent/30 text-muted-foreground hover:border-border/70 hover:text-foreground"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => {
                  setShowUpload(false)
                  setUploadFile(null)
                }}
                className="flex-1 rounded-xl border border-border/50 py-2.5 text-sm text-muted-foreground transition-all hover:border-border hover:text-foreground"
              >
                Cancel
              </button>
              <button
                disabled={!uploadFile}
                onClick={confirmUpload}
                className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {uploadFile ? "Upload File" : "Select a file first"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
