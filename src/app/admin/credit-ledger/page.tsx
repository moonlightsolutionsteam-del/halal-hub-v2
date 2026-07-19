"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { IndianRupee, Search, Loader2, Plus, Minus, TrendingUp, TrendingDown } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

type LedgerEntry = {
  id: string
  vendor_id: string
  amount: number
  balance_after: number
  transaction_type: string
  description: string
  reference_id: string | null
  created_by: string | null
  created_at: string
  vendor: { name: string | null; email: string | null } | null
  actor: { name: string | null } | null
}

type Vendor = { id: string; name: string | null; email: string | null }

const TYPE_META: Record<string, { label: string; color: string }> = {
  credit_added: { label: "Credit Added",  color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  credit_spent: { label: "Credit Spent",  color: "bg-rose-100 text-rose-700 border-rose-200" },
  refund:       { label: "Refund",         color: "bg-blue-100 text-blue-700 border-blue-200" },
  adjustment:   { label: "Adjustment",     color: "bg-amber-100 text-amber-700 border-amber-200" },
  bonus:        { label: "Bonus",          color: "bg-violet-100 text-violet-700 border-violet-200" },
  penalty:      { label: "Penalty",        color: "bg-red-100 text-red-700 border-red-200" },
}

export default function CreditLedgerPage() {
  const { toast } = useToast()
  const [entries, setEntries] = useState<LedgerEntry[]>([])
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterVendor, setFilterVendor] = useState<string>("all")
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Form state
  const [form, setForm] = useState({
    vendor_id: "",
    amount: "",
    transaction_type: "credit_added",
    description: "",
  })

  async function load() {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from("credit_ledger")
      .select("*, vendor:profiles!credit_ledger_vendor_id_fkey(name, email), actor:profiles!credit_ledger_created_by_fkey(name)")
      .order("created_at", { ascending: false })
      .limit(300)
    setEntries(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
    const supabase = createClient()
    supabase
      .from("profiles")
      .select("id, name, email")
      .order("name")
      .limit(200)
      .then(({ data }) => setVendors(data ?? []))
  }, [])

  async function handleSubmit() {
    if (!form.vendor_id || !form.amount || !form.description) {
      toast({ title: "Missing fields", description: "Please fill all required fields.", variant: "destructive" })
      return
    }
    const amt = parseFloat(form.amount)
    if (isNaN(amt) || amt === 0) {
      toast({ title: "Invalid amount", variant: "destructive" })
      return
    }

    setSubmitting(true)
    const supabase = createClient()

    // Compute current balance for this vendor
    const { data: last } = await supabase
      .from("credit_ledger")
      .select("balance_after")
      .eq("vendor_id", form.vendor_id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    const currentBalance = last?.balance_after ?? 0
    const isDebit = ["credit_spent", "penalty"].includes(form.transaction_type)
    const signedAmount = isDebit ? -Math.abs(amt) : Math.abs(amt)
    const balanceAfter = currentBalance + signedAmount

    const { error } = await supabase.from("credit_ledger").insert({
      vendor_id: form.vendor_id,
      amount: signedAmount,
      balance_after: balanceAfter,
      transaction_type: form.transaction_type,
      description: form.description,
    })

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      // Log to audit trail
      await supabase.from("admin_actions").insert({
        action_type: "CREDIT_LEDGER_ENTRY",
        module: "credit_ledger",
        description: `${form.transaction_type} of ₹${Math.abs(amt).toFixed(2)} for vendor — ${form.description}`,
        admin_name: "Super Admin",
        admin_tier: "T1",
      })
      toast({ title: "Entry recorded", description: `Balance after: ₹${balanceAfter.toFixed(2)}` })
      setOpen(false)
      setForm({ vendor_id: "", amount: "", transaction_type: "credit_added", description: "" })
      load()
    }
    setSubmitting(false)
  }

  const filtered = entries.filter(e => {
    const q = search.toLowerCase()
    const matchSearch = !q ||
      (e.vendor?.name ?? "").toLowerCase().includes(q) ||
      (e.vendor?.email ?? "").toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.transaction_type.includes(q)
    const matchVendor = filterVendor === "all" || e.vendor_id === filterVendor
    return matchSearch && matchVendor
  })

  // Stats
  const totalCredits = entries.filter(e => e.amount > 0).reduce((s, e) => s + e.amount, 0)
  const totalDebits  = entries.filter(e => e.amount < 0).reduce((s, e) => s + Math.abs(e.amount), 0)
  const uniqueVendors = new Set(entries.map(e => e.vendor_id)).size

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-foreground">Credit Ledger</h1>
          <p className="text-sm text-muted-foreground font-medium">
            Immutable financial records. Entries cannot be edited or deleted.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl gap-2 font-bold">
              <Plus className="h-4 w-4" /> Add Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl max-w-md">
            <DialogHeader>
              <DialogTitle className="font-black">New Ledger Entry</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Vendor *</Label>
                <Select value={form.vendor_id} onValueChange={v => setForm(f => ({ ...f, vendor_id: v }))}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select vendor…" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendors.map(v => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.name ?? v.email ?? v.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Transaction Type *</Label>
                <Select value={form.transaction_type} onValueChange={v => setForm(f => ({ ...f, transaction_type: v }))}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TYPE_META).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Amount (₹) *</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                  className="rounded-xl"
                />
                <p className="text-xs text-muted-foreground">Enter positive value — sign is determined by transaction type.</p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Description *</Label>
                <Textarea
                  placeholder="Reason for this entry…"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="rounded-xl resize-none"
                  rows={3}
                />
              </div>

              <Button
                className="w-full rounded-xl font-bold"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Record Entry
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Credits", value: `₹${totalCredits.toFixed(2)}`, color: "text-emerald-600", icon: TrendingUp },
          { label: "Total Debits",  value: `₹${totalDebits.toFixed(2)}`,  color: "text-rose-600",    icon: TrendingDown },
          { label: "Vendors",       value: uniqueVendors,                   color: "text-primary",     icon: IndianRupee },
        ].map(({ label, value, color, icon: Icon }) => (
          <Card key={label} className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`h-9 w-9 rounded-xl flex items-center justify-center bg-muted ${color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className={`text-lg font-black ${color}`}>{value}</p>
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by vendor, description, type…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-11 rounded-xl"
          />
        </div>
        <Select value={filterVendor} onValueChange={setFilterVendor}>
          <SelectTrigger className="w-48 h-11 rounded-xl">
            <SelectValue placeholder="All vendors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All vendors</SelectItem>
            {vendors.map(v => (
              <SelectItem key={v.id} value={v.id}>{v.name ?? v.email ?? v.id}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Ledger Table */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <IndianRupee className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No ledger entries yet.</p>
          <p className="text-xs mt-1">Use "Add Entry" to record the first transaction.</p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium px-1">
            Showing {filtered.length} entr{filtered.length === 1 ? "y" : "ies"} — read-only, append-only
          </p>
          {filtered.map(e => {
            const isCredit = e.amount > 0
            const meta = TYPE_META[e.transaction_type] ?? { label: e.transaction_type, color: "bg-muted text-muted-foreground border-border" }
            const date = new Date(e.created_at).toLocaleString([], { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })
            return (
              <Card key={e.id} className="rounded-2xl border-none shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Amount indicator */}
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${isCredit ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                      {isCredit ? <Plus className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-black text-foreground">
                          {e.vendor?.name ?? e.vendor?.email ?? "Unknown Vendor"}
                        </span>
                        <Badge className={`text-[10px] px-2 py-0.5 border ${meta.color}`}>{meta.label}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{e.description}</p>
                      <p className="text-xs text-muted-foreground">{date}{e.actor?.name ? ` · by ${e.actor.name}` : ""}</p>
                    </div>

                    {/* Amount + balance */}
                    <div className="text-right shrink-0">
                      <p className={`text-base font-black ${isCredit ? "text-emerald-600" : "text-rose-600"}`}>
                        {isCredit ? "+" : ""}₹{e.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        Bal: ₹{e.balance_after.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
