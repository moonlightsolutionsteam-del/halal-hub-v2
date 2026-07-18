"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, Briefcase, Clock, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

type Vendor = { id: string; name: string; category: string | null; contact: string | null; email: string | null; health: string | null; stage: string | null; onboarded_date: string | null }

function healthVariant(h: string | null) {
  if (h === "Healthy" || h === "Good") return "secondary" as const
  if (h === "At Risk") return "default" as const
  if (h === "Critical" || h === "Poor") return "destructive" as const
  return "outline" as const
}

function stageVariant(s: string | null) {
  if (s === "Active") return "secondary" as const
  if (s === "Onboarding") return "default" as const
  if (s === "Terminated") return "destructive" as const
  return "outline" as const
}

export default function TechVendorsPage() {
  const [vendors, setVendors] = React.useState<Vendor[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_vendors")
      .select("id, name, category, contact, email, health, stage, onboarded_date")
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data }) => { setVendors(data ?? []); setLoading(false) })
  }, [])

  const filtered = vendors.filter(v => {
    const q = search.toLowerCase()
    return !q || v.name.toLowerCase().includes(q) || (v.category ?? "").toLowerCase().includes(q) || (v.contact ?? "").toLowerCase().includes(q)
  })

  const active = vendors.filter(v => v.stage === "Active")
  const atRisk = vendors.filter(v => v.health === "At Risk" || v.health === "Critical" || v.health === "Poor")
  const healthy = vendors.filter(v => v.health === "Healthy" || v.health === "Good")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Tech Vendor Management</h1>
        <p className="text-muted-foreground">Manage relationships, contracts, and performance of external development teams.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle><Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : active.length}</div>
            <p className="text-xs text-muted-foreground">{vendors.length} total vendors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy</CardTitle><CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : healthy.length}</div>
            <p className="text-xs text-muted-foreground">Good SLA health</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle><AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${atRisk.length > 0 ? "text-destructive" : ""}`}>{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : atRisk.length}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle><Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : [...new Set(vendors.map(v => v.category).filter(Boolean))].length}</div>
            <p className="text-xs text-muted-foreground">Distinct vendor types</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Vendors</CardTitle>
            <Button><PlusCircle className="mr-2 h-4 w-4" />Add Vendor</Button>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search vendors..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead>Health</TableHead>
                  <TableHead className="hidden md:table-cell">Stage</TableHead>
                  <TableHead className="hidden lg:table-cell">Contact</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No vendors found.</TableCell></TableRow>
                ) : filtered.map(v => (
                  <TableRow key={v.id}>
                    <TableCell>
                      <div className="font-medium">{v.name}</div>
                      {v.email && <div className="text-xs text-muted-foreground">{v.email}</div>}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{v.category ?? "—"}</TableCell>
                    <TableCell><Badge variant={healthVariant(v.health)}>{v.health ?? "Unknown"}</Badge></TableCell>
                    <TableCell className="hidden md:table-cell"><Badge variant={stageVariant(v.stage)}>{v.stage ?? "—"}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell text-sm">{v.contact ?? "—"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Tasks</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Terminate Contract</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
