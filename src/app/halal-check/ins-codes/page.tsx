
"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, ChevronDown, ChevronUp, Info } from "lucide-react"
import { INS_CODES, STATUS_CONFIG, type HalalStatus, type ECode } from "../data"

const CATEGORIES = ["All", ...Array.from(new Set(INS_CODES.map(e => e.category)))]

function StatusBadge({ status }: { status: HalalStatus }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span className={cn("inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full border", cfg.color, cfg.bg, cfg.border)}>
      {cfg.icon} {cfg.label}
    </span>
  )
}

function InsCodeCard({ e }: { e: ECode }) {
  const [open, setOpen] = useState(false)
  const cfg = STATUS_CONFIG[e.status]

  return (
    <div className={cn("rounded-2xl border bg-card overflow-hidden transition-all", open && "shadow-soft")}>
      <button onClick={() => setOpen(p => !p)} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors">
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-black", cfg.bg, cfg.color)}>
          {cfg.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black font-mono">{e.code}</span>
            <span className="text-[10px] text-muted-foreground truncate">— {e.name}</span>
          </div>
          <p className="text-[10px] text-muted-foreground truncate">{e.category} · {e.source}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <StatusBadge status={e.status} />
          {open ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
        </div>
      </button>

      {open && (
        <div className={cn("px-4 pb-4 pt-1 border-t space-y-2", cfg.border)}>
          <p className="text-xs text-muted-foreground leading-relaxed">{e.description}</p>
          <div className={cn("rounded-xl border px-3 py-2.5", cfg.bg, cfg.border)}>
            <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Halal Assessment</p>
            <p className={cn("text-xs font-medium", cfg.color)}>{e.detail}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function InsCodesPage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [statusFilter, setStatusFilter] = useState<HalalStatus | "All">("All")

  const filtered = useMemo(() => {
    return INS_CODES.filter(e => {
      const matchesQuery = !query || e.code.toLowerCase().includes(query.toLowerCase()) || e.name.toLowerCase().includes(query.toLowerCase())
      const matchesCat = category === "All" || e.category === category
      const matchesStatus = statusFilter === "All" || e.status === statusFilter
      return matchesQuery && matchesCat && matchesStatus
    })
  }, [query, category, statusFilter])

  return (
    <div className="max-w-2xl mx-auto pb-32">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border/40">
        <Link href="/halal-check" className="w-9 h-9 rounded-xl border border-border/50 flex items-center justify-center hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-base font-black">INS Code Directory</h1>
          <p className="text-[10px] text-muted-foreground">{INS_CODES.length} INS codes · International Numbering System</p>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Status filter */}
        <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
          {(["All", "Halal", "Haram", "Mashbooh", "Unknown"] as const).map(s => {
            const isActive = statusFilter === s
            const cfg = s !== "All" ? STATUS_CONFIG[s] : null
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s as any)}
                className={cn(
                  "shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-black transition-all",
                  isActive
                    ? s === "All" ? "bg-primary text-white border-primary" : cn(cfg!.bg, cfg!.color, cfg!.border)
                    : "border-border/50 text-muted-foreground hover:bg-muted"
                )}
              >
                {cfg ? cfg.icon : "All"} {s}
              </button>
            )
          })}
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search INS code or name…"
            className="pl-10 h-12 rounded-2xl border-border/60 text-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "shrink-0 px-3 py-1.5 rounded-xl border text-[10px] font-black transition-all",
                category === cat ? "bg-foreground text-background border-foreground" : "border-border/50 text-muted-foreground hover:bg-muted"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-start gap-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl px-3.5 py-3">
          <Info className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-[10px] text-blue-700 dark:text-blue-400 leading-relaxed">
            INS (International Numbering System) codes are used internationally, particularly in Asian countries, as alternatives to European E-codes. The same additive may have both an E-code and an INS number.
          </p>
        </div>

        <p className="text-[10px] text-muted-foreground">{filtered.length} of {INS_CODES.length} codes</p>

        <div className="space-y-2">
          {filtered.map(e => <InsCodeCard key={e.code} e={e} />)}
          {filtered.length === 0 && (
            <div className="text-center py-12 space-y-2">
              <Search className="h-8 w-8 text-muted-foreground mx-auto" />
              <p className="text-sm font-black text-muted-foreground">No codes match your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
