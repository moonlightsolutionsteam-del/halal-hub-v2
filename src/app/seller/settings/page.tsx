// @ts-nocheck
"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useSeller } from "@/hooks/use-seller"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Settings, Store, CreditCard, FileText, Loader2,
  CheckCircle2, ChevronRight, ShieldCheck, AlertCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Section = "store" | "bank" | "docs" | null

export default function SellerSettingsPage() {
  const { seller, refresh } = useSeller()
  const { toast } = useToast()
  const [open, setOpen] = useState<Section>(null)
  const [saving, setSaving] = useState(false)

  // Store profile fields
  const [storeName, setStoreName] = useState(seller?.store_name ?? "")
  const [city, setCity] = useState(seller?.city ?? "")
  const [description, setDescription] = useState(seller?.description ?? "")

  // Bank fields
  const [bankAccount, setBankAccount] = useState(seller?.bank_account_number ?? "")
  const [bankIfsc, setBankIfsc] = useState(seller?.bank_ifsc ?? "")
  const [bankName, setBankName] = useState(seller?.bank_name ?? "")

  // Doc fields
  const [gstin, setGstin] = useState(seller?.gstin ?? "")
  const [pan, setPan] = useState(seller?.pan ?? "")

  function openSection(s: Section) {
    // Reset fields to current values when opening
    if (s === "store") {
      setStoreName(seller?.store_name ?? "")
      setCity(seller?.city ?? "")
      setDescription(seller?.description ?? "")
    } else if (s === "bank") {
      setBankAccount(seller?.bank_account_number ?? "")
      setBankIfsc(seller?.bank_ifsc ?? "")
      setBankName(seller?.bank_name ?? "")
    } else if (s === "docs") {
      setGstin(seller?.gstin ?? "")
      setPan(seller?.pan ?? "")
    }
    setOpen(s)
  }

  async function saveStore() {
    if (!seller) return
    setSaving(true)
    const { error } = await createClient()
      .from("mp_sellers")
      .update({ store_name: storeName.trim(), city: city.trim(), description: description.trim() || null })
      .eq("id", seller.id)
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" })
    else { toast({ title: "Store profile updated" }); refresh(); setOpen(null) }
    setSaving(false)
  }

  async function saveBank() {
    if (!seller) return
    setSaving(true)
    const { error } = await createClient()
      .from("mp_sellers")
      .update({
        bank_account_number: bankAccount.trim() || null,
        bank_ifsc: bankIfsc.trim() || null,
        bank_name: bankName.trim() || null,
      })
      .eq("id", seller.id)
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" })
    else { toast({ title: "Bank details saved" }); refresh(); setOpen(null) }
    setSaving(false)
  }

  async function saveDocs() {
    if (!seller) return
    setSaving(true)
    const { error } = await createClient()
      .from("mp_sellers")
      .update({ gstin: gstin.trim() || null, pan: pan.trim() || null })
      .eq("id", seller.id)
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" })
    else { toast({ title: "Documents updated" }); refresh(); setOpen(null) }
    setSaving(false)
  }

  if (!seller) return null

  const bankComplete = !!(seller.bank_account_number && seller.bank_ifsc && seller.bank_name)
  const docsComplete = !!(seller.gstin || seller.pan)

  const SECTIONS = [
    {
      key: "store" as Section,
      icon: Store,
      title: "Store Profile",
      desc: `${seller.store_name} · ${seller.city}`,
      complete: true,
    },
    {
      key: "bank" as Section,
      icon: CreditCard,
      title: "Bank Details",
      desc: bankComplete ? `${seller.bank_name} ····${seller.bank_account_number?.slice(-4)}` : "Required for payouts",
      complete: bankComplete,
      warning: !bankComplete,
    },
    {
      key: "docs" as Section,
      icon: FileText,
      title: "Business Documents",
      desc: docsComplete ? `${seller.gstin ? "GSTIN added" : ""}${seller.pan ? (seller.gstin ? " · PAN added" : "PAN added") : ""}` : "GSTIN / PAN",
      complete: docsComplete,
    },
  ]

  return (
    <div className="p-4 md:p-6 space-y-5">
      <div>
        <h1 className="text-xl font-black text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" /> Store Settings
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">Manage your store information and account details</p>
      </div>

      {/* Payout alert */}
      {!bankComplete && (
        <Card className="rounded-2xl border-none bg-amber-50 dark:bg-amber-950/20 shadow-none">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 dark:text-amber-400">
              Add your bank details so we can release payouts once your orders are delivered.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Settings sections */}
      <div className="space-y-2">
        {SECTIONS.map(({ key, icon: Icon, title, desc, complete, warning }) => (
          <Card
            key={key}
            className="rounded-2xl border-none shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => openSection(key)}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${complete ? "bg-primary/10" : "bg-muted"}`}>
                <Icon className={`h-5 w-5 ${complete ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-black text-foreground">{title}</p>
                  {warning && <AlertCircle className="h-3.5 w-3.5 text-amber-500" />}
                  {complete && !warning && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                </div>
                <p className="text-xs text-muted-foreground truncate">{desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Store info */}
      <Card className="rounded-2xl border-none bg-muted/40 shadow-none">
        <CardContent className="p-4 space-y-2 text-xs">
          <p className="font-black text-muted-foreground text-[10px] uppercase tracking-wide">Store Details</p>
          {[
            ["Store URL", `halalhub.co.in/shop/${seller.store_slug}`],
            ["Seller Type", seller.seller_type],
            ["Vertical", seller.category ?? "—"],
            ["Member since", new Date(seller.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })],
            ["Total Sales", String(seller.total_sales ?? 0)],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-muted-foreground">{k}</span>
              <span className="font-bold text-foreground capitalize">{v}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Halal declaration status */}
      <Card className="rounded-2xl border-none bg-emerald-50 dark:bg-emerald-950/20 shadow-none">
        <CardContent className="p-4 flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
          <div>
            <p className="text-sm font-black text-emerald-800 dark:text-emerald-300">Halal Pledge Signed</p>
            <p className="text-xs text-emerald-700/70 dark:text-emerald-400/70">
              Signed on {seller.halal_declaration_signed_at
                ? new Date(seller.halal_declaration_signed_at as unknown as string).toLocaleDateString("en-IN")
                : "—"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ── Inline edit panels ── */}

      {/* Store Profile */}
      {open === "store" && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end">
          <div className="bg-background w-full max-w-lg mx-auto rounded-t-3xl p-6 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <p className="text-base font-black">Edit Store Profile</p>
              <button onClick={() => setOpen(null)} className="text-muted-foreground text-xs font-bold">Cancel</button>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Store Name</label>
                <Input value={storeName} onChange={e => setStoreName(e.target.value)} className="rounded-xl" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">City</label>
                <Input value={city} onChange={e => setCity(e.target.value)} className="rounded-xl" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Description</label>
                <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="rounded-xl resize-none" maxLength={280} />
                <p className="text-[10px] text-right text-muted-foreground">{description.length}/280</p>
              </div>
            </div>
            <Button className="w-full rounded-xl font-bold" onClick={saveStore} disabled={saving || !storeName.trim()}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null} Save Changes
            </Button>
          </div>
        </div>
      )}

      {/* Bank Details */}
      {open === "bank" && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end">
          <div className="bg-background w-full max-w-lg mx-auto rounded-t-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-base font-black">Bank Details</p>
              <button onClick={() => setOpen(null)} className="text-muted-foreground text-xs font-bold">Cancel</button>
            </div>
            <Card className="rounded-2xl border-none bg-amber-50 dark:bg-amber-950/20 shadow-none">
              <CardContent className="p-3 text-xs text-amber-700 dark:text-amber-400 font-bold">
                Automated payouts via Razorpay coming soon — save your details now so you're ready.
              </CardContent>
            </Card>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Bank Name</label>
                <Input placeholder="e.g. State Bank of India" value={bankName} onChange={e => setBankName(e.target.value)} className="rounded-xl" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Account Number</label>
                <Input placeholder="Enter account number" value={bankAccount} onChange={e => setBankAccount(e.target.value)} className="rounded-xl font-mono" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">IFSC Code</label>
                <Input placeholder="SBIN0001234" value={bankIfsc} onChange={e => setBankIfsc(e.target.value.toUpperCase())} className="rounded-xl font-mono" />
              </div>
            </div>
            <Button className="w-full rounded-xl font-bold" onClick={saveBank} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null} Save Bank Details
            </Button>
          </div>
        </div>
      )}

      {/* Documents */}
      {open === "docs" && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end">
          <div className="bg-background w-full max-w-lg mx-auto rounded-t-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-base font-black">Business Documents</p>
              <button onClick={() => setOpen(null)} className="text-muted-foreground text-xs font-bold">Cancel</button>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">GSTIN</label>
                <Input placeholder="22AAAAA0000A1Z5" value={gstin} onChange={e => setGstin(e.target.value.toUpperCase())} maxLength={15} className="rounded-xl font-mono" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">PAN Number</label>
                <Input placeholder="ABCDE1234F" value={pan} onChange={e => setPan(e.target.value.toUpperCase())} maxLength={10} className="rounded-xl font-mono" />
              </div>
              <p className="text-xs text-muted-foreground">
                Document uploads (MSME cert, trade license) — our team will collect these via WhatsApp during verification.
              </p>
            </div>
            <Button className="w-full rounded-xl font-bold" onClick={saveDocs} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null} Save Documents
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
