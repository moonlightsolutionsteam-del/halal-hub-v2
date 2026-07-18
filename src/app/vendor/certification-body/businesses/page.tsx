"use client"

import { useEffect, useState, useCallback } from "react"
import { Search, Users, CheckCircle2, Clock, AlertTriangle, Loader2, Building2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type BusinessRecord = {
  id: string
  business_name: string
  certificate_number: string
  halal_standard: string | null
  scope_of_certification: string | null
  issue_date: string
  expiry_date: string
  status: string
}

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  expiring_soon: "bg-amber-50 text-amber-700 border-amber-200",
  expired: "bg-red-50 text-red-700 border-red-200",
  revoked: "bg-red-100 text-red-900 border-red-300",
  suspended: "bg-orange-50 text-orange-600 border-orange-200",
}

export default function ManagedBusinessesPage() {
  const [records, setRecords] = useState<BusinessRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [bodyId, setBodyId] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const supabase = createClient()

  const load = useCallback(async () => {
    setLoading(true)
    const { data: body } = await supabase
      .from("certification_bodies")
      .select("id")
      .eq("status", "approved")
      .limit(1)
      .single()

    const id = body?.id ?? null
    setBodyId(id)
    if (!id) { setLoading(false); return }

    const { data } = await supabase
      .from("halal_certificates")
      .select("id,business_name,certificate_number,halal_standard,scope_of_certification,issue_date,expiry_date,status")
      .eq("certification_body_id", id)
      .order("business_name", { ascending: true })

    const today = new Date()
    const in30 = new Date(Date.now() + 30 * 86400000)
    const updated = (data ?? []).map(c => {
      if (c.status === "active") {
        const exp = new Date(c.expiry_date)
        if (exp <= today) return { ...c, status: "expired" }
        if (exp <= in30) return { ...c, status: "expiring_soon" }
      }
      return c
    })
    setRecords(updated)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = records.filter(r =>
    !search ||
    r.business_name.toLowerCase().includes(search.toLowerCase()) ||
    r.certificate_number.toLowerCase().includes(search.toLowerCase())
  )

  const active = records.filter(r => r.status === "active").length
  const expiring = records.filter(r => r.status === "expiring_soon").length
  const expired = records.filter(r => r.status === "expired" || r.status === "revoked").length
  const uniqueBusinesses = new Set(records.map(r => r.business_name)).size

  return (
    <div className="p-4 sm:p-8 space-y-6 bg-background min-h-screen pb-24">
      <div className="space-y-1">
        <div className="text-[10px] font-black uppercase tracking-widest text-blue-600">Certification Hub</div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Managed Clients</h1>
        <p className="text-muted-foreground font-medium text-sm">All businesses with certificates issued by your body.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Clients", value: uniqueBusinesses, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Active Certs", value: active, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Expiring Soon", value: expiring, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Expired / Revoked", value: expired, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
        ].map((s, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-sm bg-card">
            <CardContent className="p-5 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${s.bg}`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-black text-foreground">{s.value}</p>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-3xl border-none shadow-sm bg-card overflow-hidden">
        <CardHeader className="p-6 border-b">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="font-black text-base">All Certified Businesses</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or cert number..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : (
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow className="border-none">
                  <TableHead className="px-8 h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Business</TableHead>
                  <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Certificate No.</TableHead>
                  <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden md:table-cell">Standard</TableHead>
                  <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Expiry</TableHead>
                  <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground font-medium">
                      {bodyId ? "No businesses with issued certificates yet." : "No approved certification body linked."}
                    </TableCell>
                  </TableRow>
                ) : filtered.map(r => (
                  <TableRow key={r.id} className="border-border hover:bg-muted/40 transition-colors">
                    <TableCell className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-black text-sm text-foreground">{r.business_name}</p>
                          {r.scope_of_certification && (
                            <p className="text-[10px] text-muted-foreground font-medium max-w-[200px] truncate">{r.scope_of_certification}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs font-bold text-muted-foreground hidden sm:table-cell">{r.certificate_number}</TableCell>
                    <TableCell className="text-xs font-bold text-muted-foreground hidden md:table-cell">{r.halal_standard ?? "—"}</TableCell>
                    <TableCell className="text-sm font-bold text-muted-foreground hidden sm:table-cell">{r.expiry_date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-black text-[9px] uppercase px-3 ${STATUS_STYLES[r.status] ?? ""}`}>
                        {r.status.replace("_", " ")}
                      </Badge>
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
