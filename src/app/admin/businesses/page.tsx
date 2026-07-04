"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  CheckCircle2, XCircle, Clock, Search, Filter,
  Building2, MapPin, Phone, ShieldCheck, Eye,
  MessageSquare, ChevronDown, Star, AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

type SubmissionStatus = "pending" | "approved" | "rejected" | "info_requested"

interface Submission {
  id: string
  businessName: string
  category: string
  city: string
  country: string
  phone: string
  halalStatus: string
  status: SubmissionStatus
  submittedAt: string
  ownerName: string
  hasCert: boolean
  hasDocs: boolean
  reviewedBy?: string
}

const MOCK_SUBMISSIONS: Submission[] = [
  { id: "sub-001", businessName: "Al-Noor Restaurant", category: "Food & Dining", city: "Mumbai", country: "India", phone: "+91 99999 11111", halalStatus: "certified", status: "pending", submittedAt: "2026-07-03T08:30:00Z", ownerName: "Mohammed Farooq", hasCert: true, hasDocs: true },
  { id: "sub-002", businessName: "Bismillah Butchers", category: "Meat Shops", city: "London", country: "United Kingdom", phone: "+44 7700 900100", halalStatus: "certified", status: "pending", submittedAt: "2026-07-02T15:22:00Z", ownerName: "Yusuf Ali", hasCert: true, hasDocs: true },
  { id: "sub-003", businessName: "The Modest Boutique", category: "Fashion", city: "Toronto", country: "Canada", phone: "+1 416 555 0199", halalStatus: "not-applicable", status: "approved", submittedAt: "2026-07-01T10:00:00Z", ownerName: "Fatima Hassan", hasCert: false, hasDocs: true, reviewedBy: "Admin" },
  { id: "sub-004", businessName: "Halal Harvest Grocery", category: "Grocery", city: "Sydney", country: "Australia", phone: "+61 2 9999 9999", halalStatus: "self-declared", status: "info_requested", submittedAt: "2026-06-30T09:15:00Z", ownerName: "Ibrahim Malik", hasCert: false, hasDocs: false },
  { id: "sub-005", businessName: "Raza's Catering", category: "Catering", city: "Dubai", country: "UAE", phone: "+971 50 123 4567", halalStatus: "certified", status: "rejected", submittedAt: "2026-06-29T14:00:00Z", ownerName: "Raza Khan", hasCert: false, hasDocs: false, reviewedBy: "Admin" },
  { id: "sub-006", businessName: "Islamic Finance Partners", category: "Finance & Banking", city: "Kuala Lumpur", country: "Malaysia", phone: "+60 3 1234 5678", halalStatus: "certified", status: "pending", submittedAt: "2026-07-03T06:00:00Z", ownerName: "Dato Azman", hasCert: true, hasDocs: true },
]

const STATUS_CONFIG: Record<SubmissionStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { label: "Pending Review", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400", icon: <Clock className="h-3 w-3" /> },
  approved: { label: "Approved", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400", icon: <CheckCircle2 className="h-3 w-3" /> },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400", icon: <XCircle className="h-3 w-3" /> },
  info_requested: { label: "Info Requested", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400", icon: <MessageSquare className="h-3 w-3" /> },
}

const HALAL_LABELS: Record<string, string> = {
  "certified": "Certified",
  "self-declared": "Self-Declared",
  "halal-friendly": "Halal-Friendly",
  "not-applicable": "N/A",
}

export default function BusinessSubmissionsPage() {
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<SubmissionStatus | "all">("all")
  const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS)
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = submissions.filter(s => {
    const matchSearch = !search || s.businessName.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "all" || s.status === filterStatus
    return matchSearch && matchStatus
  })

  function updateStatus(id: string, status: SubmissionStatus) {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status, reviewedBy: "Admin" } : s))
    setSelected(null)
  }

  const counts = {
    pending: submissions.filter(s => s.status === "pending").length,
    approved: submissions.filter(s => s.status === "approved").length,
    rejected: submissions.filter(s => s.status === "rejected").length,
    info_requested: submissions.filter(s => s.status === "info_requested").length,
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline text-foreground">Business Submissions</h1>
          <p className="text-sm font-bold text-muted-foreground">Review and approve new business listing applications.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl h-10 font-bold border-2 gap-2 text-xs uppercase tracking-widest">
            <Filter className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(["pending", "approved", "info_requested", "rejected"] as SubmissionStatus[]).map(s => {
          const cfg = STATUS_CONFIG[s]
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(prev => prev === s ? "all" : s)}
              className={cn(
                "p-5 rounded-[2rem] border-2 text-left transition-all",
                filterStatus === s ? "border-primary bg-primary/5" : "border-transparent bg-card shadow-soft hover:shadow-soft-md"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black", cfg.color)}>
                  {cfg.icon} {cfg.label}
                </div>
              </div>
              <p className="text-3xl font-black text-foreground">{counts[s]}</p>
            </button>
          )
        })}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search business name or city..." className="pl-11 h-11 rounded-2xl border-none shadow-soft bg-card" />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 && (
          <Card className="rounded-[2rem] border-none shadow-soft">
            <CardContent className="p-12 text-center">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground opacity-40 mb-4" />
              <p className="font-black text-foreground">No submissions found</p>
              <p className="text-sm text-muted-foreground font-medium mt-1">Try adjusting your search or filter.</p>
            </CardContent>
          </Card>
        )}

        {filtered.map(sub => {
          const cfg = STATUS_CONFIG[sub.status]
          const isExpanded = selected === sub.id
          return (
            <Card key={sub.id} className={cn("rounded-[2rem] border-2 shadow-soft transition-all", isExpanded ? "border-primary/20" : "border-transparent")}>
              <CardContent className="p-0">
                <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start gap-3 flex-wrap">
                      <p className="font-black text-foreground text-base">{sub.businessName}</p>
                      <div className={cn("flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black", cfg.color)}>
                        {cfg.icon} {cfg.label}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs font-bold text-muted-foreground">
                      <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{sub.category}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{sub.city}, {sub.country}</span>
                      <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" />{HALAL_LABELS[sub.halalStatus] || sub.halalStatus}</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Submitted by <span className="font-bold text-foreground">{sub.ownerName}</span> · {new Date(sub.submittedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex gap-1.5">
                      {sub.hasCert && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-[10px] font-black text-emerald-700 dark:text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" /> Cert
                        </div>
                      )}
                      {sub.hasDocs && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-[10px] font-black text-blue-700 dark:text-blue-400">
                          <CheckCircle2 className="h-3 w-3" /> Docs
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl"
                      onClick={() => setSelected(isExpanded ? null : sub.id)}
                    >
                      <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
                    </Button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t p-6 bg-muted/30 rounded-b-[2rem] space-y-4 animate-in fade-in duration-200">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                      <div><p className="font-black text-muted-foreground uppercase tracking-wider mb-1">Phone</p><p className="font-bold text-foreground">{sub.phone}</p></div>
                      <div><p className="font-black text-muted-foreground uppercase tracking-wider mb-1">Halal Status</p><p className="font-bold text-foreground">{HALAL_LABELS[sub.halalStatus]}</p></div>
                      <div><p className="font-black text-muted-foreground uppercase tracking-wider mb-1">Has Certificate</p><p className="font-bold text-foreground">{sub.hasCert ? "Yes" : "No"}</p></div>
                      <div><p className="font-black text-muted-foreground uppercase tracking-wider mb-1">Has Documents</p><p className="font-bold text-foreground">{sub.hasDocs ? "Yes" : "No"}</p></div>
                      {sub.reviewedBy && <div><p className="font-black text-muted-foreground uppercase tracking-wider mb-1">Reviewed By</p><p className="font-bold text-foreground">{sub.reviewedBy}</p></div>}
                    </div>

                    {sub.status === "pending" && (
                      <div className="flex flex-wrap gap-3 pt-2">
                        <Button
                          onClick={() => updateStatus(sub.id, "approved")}
                          className="rounded-2xl h-10 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs gap-2"
                        >
                          <CheckCircle2 className="h-4 w-4" /> Approve Listing
                        </Button>
                        <Button
                          onClick={() => updateStatus(sub.id, "info_requested")}
                          variant="outline"
                          className="rounded-2xl h-10 px-6 border-2 font-black text-xs gap-2"
                        >
                          <MessageSquare className="h-4 w-4" /> Request More Info
                        </Button>
                        <Button
                          onClick={() => updateStatus(sub.id, "rejected")}
                          variant="outline"
                          className="rounded-2xl h-10 px-6 border-2 border-red-200 text-red-600 hover:bg-red-50 font-black text-xs gap-2 dark:border-red-900 dark:hover:bg-red-950/30"
                        >
                          <XCircle className="h-4 w-4" /> Reject
                        </Button>
                      </div>
                    )}

                    {sub.status !== "pending" && (
                      <div className="flex gap-3 pt-2">
                        <Button
                          onClick={() => updateStatus(sub.id, "pending")}
                          variant="outline"
                          className="rounded-2xl h-10 px-6 border-2 font-black text-xs"
                        >
                          Reset to Pending
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
