"use client"

import * as React from "react"
import { Loader2, Search, FolderOpen, ShieldCheck, Clock, AlertTriangle, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"

type Doc = {
  id: string
  employee_name: string
  doc_type: string
  file_name: string | null
  file_url: string | null
  uploaded_by: string | null
  verified: boolean | null
  expiry_date: string | null
  created_at: string | null
}

function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) } catch { return d }
}

function isExpiringSoon(expiry: string | null) {
  if (!expiry) return false
  const diff = new Date(expiry).getTime() - Date.now()
  return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000
}

function isExpired(expiry: string | null) {
  if (!expiry) return false
  return new Date(expiry) < new Date()
}

function initials(name: string) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()
}

export default function DocumentsPage() {
  const [docs, setDocs] = React.useState<Doc[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [verifiedFilter, setVerifiedFilter] = React.useState("all")

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_employee_documents")
      .select("id, employee_name, doc_type, file_name, file_url, uploaded_by, verified, expiry_date, created_at")
      .order("created_at", { ascending: false })
      .limit(300)
      .then(({ data }) => { setDocs(data ?? []); setLoading(false) })
  }, [])

  const filtered = docs.filter(d => {
    const q = search.toLowerCase()
    const ms = !q || d.employee_name.toLowerCase().includes(q) || d.doc_type.toLowerCase().includes(q) || (d.file_name ?? "").toLowerCase().includes(q)
    const tf = typeFilter === "all" || d.doc_type === typeFilter
    const vf = verifiedFilter === "all"
      || (verifiedFilter === "verified" && d.verified)
      || (verifiedFilter === "pending" && !d.verified)
    return ms && tf && vf
  })

  const verified = docs.filter(d => d.verified)
  const expiringSoon = docs.filter(d => isExpiringSoon(d.expiry_date))
  const expired = docs.filter(d => isExpired(d.expiry_date))
  const docTypes = [...new Set(docs.map(d => d.doc_type).filter(Boolean))]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Document Vault</h1>
        <p className="text-muted-foreground">Centralized storage for all employee documents and compliance records.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle><FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : docs.length}</div>
            <p className="text-xs text-muted-foreground">{docTypes.length} document types</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle><ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : verified.length}</div>
            <p className="text-xs text-muted-foreground">{docs.length ? Math.round(verified.length / docs.length * 100) : 0}% verified</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle><Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : expiringSoon.length}</div>
            <p className="text-xs text-muted-foreground">Within 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired</CardTitle><AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : expired.length}</div>
            <p className="text-xs text-muted-foreground">Renewal required</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by employee or document type..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[170px]"><SelectValue placeholder="Doc Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {docTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={verifiedFilter} onValueChange={setVerifiedFilter}>
              <SelectTrigger className="w-full sm:w-[140px]"><SelectValue placeholder="Verified" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Unverified</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Document</TableHead>
                  <TableHead className="hidden md:table-cell">File</TableHead>
                  <TableHead className="hidden lg:table-cell">Uploaded By</TableHead>
                  <TableHead className="hidden lg:table-cell">Expiry</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead><span className="sr-only">Open</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No documents uploaded yet.</TableCell></TableRow>
                ) : filtered.map(d => (
                  <TableRow key={d.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">{initials(d.employee_name)}</AvatarFallback></Avatar>
                        <span className="font-medium text-sm">{d.employee_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-sm">{d.doc_type}</TableCell>
                    <TableCell className="hidden md:table-cell text-xs text-muted-foreground font-mono truncate max-w-[160px]">{d.file_name ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{d.uploaded_by ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell text-sm">
                      {d.expiry_date ? (
                        <span className={isExpired(d.expiry_date) ? "text-destructive font-medium" : isExpiringSoon(d.expiry_date) ? "text-amber-600 font-medium" : "text-muted-foreground"}>
                          {fmtDate(d.expiry_date)}
                        </span>
                      ) : "—"}
                    </TableCell>
                    <TableCell>
                      {d.verified
                        ? <Badge variant="secondary">Verified</Badge>
                        : <Badge variant="outline">Pending</Badge>}
                    </TableCell>
                    <TableCell>
                      {d.file_url && (
                        <Button size="icon" variant="ghost" asChild>
                          <a href={d.file_url} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" /></a>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
