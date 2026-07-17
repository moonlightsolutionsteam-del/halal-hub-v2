"use client"

import * as React from "react"
import { Search, FileText, Percent, TrendingUp, AlertTriangle, Download, PlusCircle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

const GST_RATE = 0.18

type Invoice = { id: string; invoice_id: string | null; vendor: string; amount: number | null; date: string | null; status: string | null }

function fmt(n: number) { return `₹${n.toLocaleString("en-IN")}` }
function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) } catch { return d }
}

const hsnSacData = [
  { code: "996331", description: "Services by restaurants, cafes and like eating joints…", gstRate: "5%" },
  { code: "0207", description: "Meat and edible offal of poultry", gstRate: "0%" },
  { code: "4901", description: "Printed books, brochures, leaflets…", gstRate: "0%" },
  { code: "9983", description: "Online marketplace / aggregator services", gstRate: "18%" },
]

export default function TaxesGstPage() {
  const [invoices, setInvoices] = React.useState<Invoice[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_invoices")
      .select("id, invoice_id, vendor, amount, date, status")
      .order("date", { ascending: false })
      .limit(200)
      .then(({ data }) => { setInvoices(data ?? []); setLoading(false) })
  }, [])

  const now = new Date()
  const thisMonth = invoices.filter(inv => {
    if (!inv.date) return false
    const d = new Date(inv.date)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })

  const totalTaxableMonth = thisMonth.reduce((s, i) => s + (i.amount ?? 0), 0)
  const gstCollectedMonth = Math.round(totalTaxableMonth * GST_RATE)
  const paid = invoices.filter(i => i.status === "Paid")
  const gstOnPaid = Math.round(paid.reduce((s, i) => s + (i.amount ?? 0), 0) * GST_RATE)
  const itc = Math.round(gstOnPaid * 0.4)
  const pending = invoices.filter(i => i.status !== "Paid" && i.status !== "Filed")

  const filtered = invoices.filter(inv => {
    const q = search.toLowerCase()
    return !q || inv.vendor.toLowerCase().includes(q) || (inv.invoice_id ?? "").toLowerCase().includes(q)
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Taxes & GST Management</h1>
        <p className="text-muted-foreground">Manage GST collection, payments, and filings.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GST Collected (Month)</CardTitle><Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : fmt(gstCollectedMonth)}</div>
            <p className="text-xs text-muted-foreground">{loading ? "—" : thisMonth.length} invoices @ 18%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GST on Paid Invoices</CardTitle><Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : fmt(gstOnPaid)}</div>
            <p className="text-xs text-muted-foreground">On vendor payouts & expenses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Est. Input Tax Credit</CardTitle><TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : fmt(itc)}</div>
            <p className="text-xs text-muted-foreground">Available for this period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unfiled Invoices</CardTitle><AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${pending.length > 0 ? "text-destructive" : ""}`}>{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : pending.length}</div>
            <p className="text-xs text-muted-foreground">Pending GST filing</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>GST Invoices</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline"><Download className="mr-2 h-4 w-4" />Export for CA</Button>
              <Button><PlusCircle className="mr-2 h-4 w-4" />Generate Report</Button>
            </div>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by invoice ID or vendor..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Taxable Amount</TableHead>
                  <TableHead>GST (18%)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No invoices found.</TableCell></TableRow>
                ) : filtered.slice(0, 50).map(inv => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-mono text-sm">{inv.invoice_id ?? inv.id.slice(0, 8)}</TableCell>
                    <TableCell className="font-medium">{inv.vendor}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{fmtDate(inv.date)}</TableCell>
                    <TableCell className="tabular-nums">{fmt(inv.amount ?? 0)}</TableCell>
                    <TableCell className="tabular-nums font-semibold">{fmt(Math.round((inv.amount ?? 0) * GST_RATE))}</TableCell>
                    <TableCell>
                      <Badge variant={inv.status === "Paid" || inv.status === "Filed" ? "secondary" : inv.status === "Overdue" ? "destructive" : "outline"}>
                        {inv.status ?? "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>HSN/SAC Codes</CardTitle>
            <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" />Add Code</Button>
          </div>
          <CardDescription>Manage HSN (for goods) and SAC (for services) codes used on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>GST Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hsnSacData.map(c => (
                <TableRow key={c.code}>
                  <TableCell className="font-mono text-sm">{c.code}</TableCell>
                  <TableCell className="text-sm">{c.description}</TableCell>
                  <TableCell><Badge variant="outline">{c.gstRate}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
