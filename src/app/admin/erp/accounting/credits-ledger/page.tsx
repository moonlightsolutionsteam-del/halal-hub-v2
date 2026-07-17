"use client"

import * as React from "react"
import { Search, Wallet, CircleDollarSign, BadgeCent, History, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"

type Ledger = { id: string; user_id: string; delta: number; reason: string; ref_id: string | null; ref_table: string | null; created_at: string | null }

function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) } catch { return d }
}

function sourceBadgeVariant(delta: number, reason: string) {
  const r = reason.toLowerCase()
  if (r.includes("expir")) return "outline" as const
  if (r.includes("refund") || r.includes("reversal")) return "outline" as const
  if (r.includes("promo") || r.includes("bonus") || r.includes("reward")) return "default" as const
  if (delta > 0) return "secondary" as const
  return "destructive" as const
}

function sourceLabel(delta: number, reason: string) {
  const r = reason.toLowerCase()
  if (r.includes("expir")) return "Expiration"
  if (r.includes("refund") || r.includes("reversal")) return "Reversal"
  if (r.includes("promo") || r.includes("bonus") || r.includes("reward")) return "Promotional"
  return delta > 0 ? "Credit" : "Usage"
}

export default function CreditsLedgerPage() {
  const [ledger, setLedger] = React.useState<Ledger[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("points_ledger")
      .select("id, user_id, delta, reason, ref_id, ref_table, created_at")
      .order("created_at", { ascending: false })
      .limit(300)
      .then(({ data }) => { setLedger(data ?? []); setLoading(false) })
  }, [])

  const totalCoins = ledger.reduce((s, t) => s + t.delta, 0)
  const now = new Date()
  const thisMonth = ledger.filter(t => {
    if (!t.created_at) return false
    const d = new Date(t.created_at)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
  const monthCredits = thisMonth.filter(t => t.delta > 0).reduce((s, t) => s + t.delta, 0)
  const monthUsage = thisMonth.filter(t => t.delta < 0).reduce((s, t) => s + Math.abs(t.delta), 0)
  const expirations = ledger.filter(t => t.reason.toLowerCase().includes("expir")).reduce((s, t) => s + Math.abs(t.delta), 0)

  const filtered = (items: Ledger[]) => items.filter(t => {
    const q = search.toLowerCase()
    return !q || t.reason.toLowerCase().includes(q) || t.user_id.toLowerCase().includes(q) || (t.ref_id ?? "").toLowerCase().includes(q)
  })

  const purchases = ledger.filter(t => t.delta > 0 && !t.reason.toLowerCase().includes("promo") && !t.reason.toLowerCase().includes("bonus") && !t.reason.toLowerCase().includes("reward"))
  const promos = ledger.filter(t => t.reason.toLowerCase().includes("promo") || t.reason.toLowerCase().includes("bonus") || t.reason.toLowerCase().includes("reward"))
  const usages = ledger.filter(t => t.delta < 0 && !t.reason.toLowerCase().includes("expir"))
  const reversals = ledger.filter(t => t.reason.toLowerCase().includes("refund") || t.reason.toLowerCase().includes("reversal"))

  function LedgerTable({ items }: { items: Ledger[] }) {
    const rows = filtered(items)
    return (
      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by reason, user ID, or ref..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden md:table-cell">Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="hidden md:table-cell">Ref</TableHead>
                  <TableHead className="text-right">Coins</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No transactions found.</TableCell></TableRow>
                ) : rows.map(t => (
                  <TableRow key={t.id}>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{fmtDate(t.created_at)}</TableCell>
                    <TableCell>
                      <div className="font-mono text-xs truncate max-w-[120px]">{t.user_id.slice(0, 12)}…</div>
                      <div className="text-xs text-muted-foreground md:hidden">{fmtDate(t.created_at)}</div>
                    </TableCell>
                    <TableCell><Badge variant={sourceBadgeVariant(t.delta, t.reason)}>{sourceLabel(t.delta, t.reason)}</Badge></TableCell>
                    <TableCell className="text-sm max-w-[200px] truncate">{t.reason}</TableCell>
                    <TableCell className="hidden md:table-cell font-mono text-xs">{t.ref_id ?? "—"}</TableCell>
                    <TableCell className={`text-right font-semibold tabular-nums ${t.delta > 0 ? "text-green-500" : "text-red-500"}`}>
                      {t.delta > 0 ? "+" : ""}{t.delta.toLocaleString("en-IN")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Credits Ledger</h1>
        <p className="text-muted-foreground">An immutable ledger tracking all Halal Coin transactions across the platform.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-sm font-medium">
            Total Coins in Circulation<Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : totalCoins.toLocaleString("en-IN")}</div>
            <p className="text-xs text-muted-foreground">Net balance all time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-sm font-medium">
            Credits Earned (Month)<CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : monthCredits.toLocaleString("en-IN")}</div>
            <p className="text-xs text-muted-foreground">Positive transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-sm font-medium">
            Credits Used (Month)<BadgeCent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : monthUsage.toLocaleString("en-IN")}</div>
            <p className="text-xs text-muted-foreground">Spent this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-sm font-medium">
            Expirations (All Time)<History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : expirations.toLocaleString("en-IN")}</div>
            <p className="text-xs text-muted-foreground">Includes promotional credits</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({loading ? "…" : ledger.length})</TabsTrigger>
          <TabsTrigger value="purchase">Credits ({loading ? "…" : purchases.length})</TabsTrigger>
          <TabsTrigger value="promotional">Promotional ({loading ? "…" : promos.length})</TabsTrigger>
          <TabsTrigger value="usage">Usage ({loading ? "…" : usages.length})</TabsTrigger>
          <TabsTrigger value="reversals">Reversals ({loading ? "…" : reversals.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4"><LedgerTable items={ledger} /></TabsContent>
        <TabsContent value="purchase" className="mt-4"><LedgerTable items={purchases} /></TabsContent>
        <TabsContent value="promotional" className="mt-4"><LedgerTable items={promos} /></TabsContent>
        <TabsContent value="usage" className="mt-4"><LedgerTable items={usages} /></TabsContent>
        <TabsContent value="reversals" className="mt-4"><LedgerTable items={reversals} /></TabsContent>
      </Tabs>
    </div>
  )
}
