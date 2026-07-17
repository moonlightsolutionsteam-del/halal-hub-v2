"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShieldCheck, Search, CheckCircle, XCircle, Loader2, Building2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface PendingBusiness {
  id: string
  name: string
  category: string | null
  subcategory: string | null
  city: string | null
  country: string | null
  created_at: string | null
  halal_verified: boolean | null
}

export default function AdminVerificationCenter() {
  const [pending, setPending] = useState<PendingBusiness[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [actioning, setActioning] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from("businesses")
      .select("id, name, category, subcategory, city, country, created_at, halal_verified")
      .eq("status", "pending")
      .order("created_at", { ascending: false })
    setPending(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function updateStatus(id: string, status: "active" | "rejected") {
    setActioning(id)
    const supabase = createClient()
    await supabase.from("businesses").update({ status }).eq("id", id)
    await load()
    setActioning(null)
  }

  const filtered = pending.filter((b) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      b.name.toLowerCase().includes(q) ||
      b.category?.toLowerCase().includes(q) ||
      b.city?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <ShieldCheck className="h-3 w-3" /> Trust & Compliance
          </div>
          <h1 className="text-xl sm:text-3xl font-black font-headline">Pending Verifications</h1>
          <p className="text-muted-foreground font-medium">Review submitted business credentials for platform certification.</p>
        </div>
        <div className="flex gap-3">
          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm font-bold">Loading...</span>
            </div>
          ) : (
            <Badge className={`${pending.length > 0 ? "bg-amber-500" : "bg-emerald-500"} rounded-full px-4 h-10 flex items-center font-bold`}>
              {pending.length} PENDING
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-6">
        {[
          { label: "Pending Review", value: loading ? "—" : pending.length, color: "text-amber-500" },
          { label: "Categories", value: loading ? "—" : new Set(pending.map(b => b.category)).size, color: "text-blue-500" },
          { label: "Showing", value: loading ? "—" : filtered.length, color: "text-primary" },
        ].map((s, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl p-4">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{s.label}</p>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden">
        <CardHeader className="p-6 border-b">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <CardTitle>Queue (Newest First)</CardTitle>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search businesses..."
                className="pl-9 h-10 rounded-2xl bg-muted/30 border-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-bold">Loading queue...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground">
              <CheckCircle className="h-10 w-10 text-emerald-500" />
              <div className="text-center">
                <p className="font-black text-foreground">
                  {search ? "No results match your search." : "Verification Queue is Empty"}
                </p>
                <p className="text-sm font-medium">
                  {search ? "" : "All submitted businesses have been reviewed."}
                </p>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-none bg-muted/5">
                  <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest">Business</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest">Category</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest">Location</TableHead>
                  <TableHead className="font-black uppercase text-[10px] tracking-widest">Submitted</TableHead>
                  <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((biz) => (
                  <TableRow key={biz.id} className="hover:bg-muted/5 border-muted/20">
                    <TableCell className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-black shadow-sm">
                          <Building2 className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-black text-foreground text-sm">{biz.name}</p>
                          <p className="text-[10px] text-muted-foreground">{biz.subcategory ?? "—"}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-muted-foreground">{biz.category ?? "—"}</TableCell>
                    <TableCell className="text-sm font-medium text-muted-foreground">
                      {[biz.city, biz.country].filter(Boolean).join(", ") || "—"}
                    </TableCell>
                    <TableCell className="text-xs font-medium text-muted-foreground">
                      {biz.created_at ? new Date(biz.created_at).toLocaleDateString() : "—"}
                    </TableCell>
                    <TableCell className="text-right px-8">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-wider gap-1.5 h-8"
                          disabled={actioning === biz.id}
                          onClick={() => updateStatus(biz.id, "active")}
                        >
                          {actioning === biz.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle className="h-3 w-3" />}
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="rounded-xl hover:bg-red-50 hover:text-red-600 font-black text-[10px] uppercase tracking-wider gap-1.5 h-8"
                          disabled={actioning === biz.id}
                          onClick={() => updateStatus(biz.id, "rejected")}
                        >
                          <XCircle className="h-3 w-3" /> Reject
                        </Button>
                      </div>
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
