"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tag, Plus, Trash2, Edit2, Gift, Bed } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Offer = {
  id: string; title: string; discount_type: string
  discount_value: number | null; code: string | null; valid_until: string | null; status: string
}

const EMPTY_FORM = { title: "", code: "", discount_type: "percentage", discount_value: "", valid_until: "" }

export default function HotelOffersPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [businessId, setBusinessId] = useState<string | null>(null)
  const [offers, setOffers] = useState<Offer[]>([])
  const [showCreateOfferModal, setShowCreateOfferModal] = useState(false)
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null)
  const [deletingOffer, setDeletingOffer] = useState<Offer | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!user?.uid) return
    const supabase = createClient()
    ;(supabase as any).from("businesses").select("id").eq("owner_id", user.uid).limit(1)
      .then(({ data }: { data: { id: string }[] | null }) => {
        const biz = data?.[0]
        setBusinessId(biz?.id ?? null)
        if (biz) loadOffers(biz.id)
      })
  }, [user?.uid])

  function loadOffers(bizId: string) {
    const supabase = createClient()
    ;(supabase as any).from("business_offers").select("*").eq("business_id", bizId)
      .order("created_at", { ascending: false })
      .then(({ data }: { data: Offer[] | null }) => setOffers(data ?? []))
  }

  async function createOffer() {
    if (!businessId || !form.title.trim()) return
    setSaving(true)
    const supabase = createClient()
    const { error } = await (supabase as any).from("business_offers").insert({
      business_id: businessId, title: form.title, code: form.code || null,
      discount_type: form.discount_type,
      discount_value: form.discount_value ? parseFloat(form.discount_value) : null,
      valid_until: form.valid_until || null,
    })
    setSaving(false)
    if (error) { toast({ variant: "destructive", title: "Couldn't create offer", description: error.message }); return }
    setForm(EMPTY_FORM); setShowCreateOfferModal(false); loadOffers(businessId)
  }

  async function saveEdit() {
    if (!editingOffer || !businessId) return
    setSaving(true)
    const supabase = createClient()
    const { error } = await (supabase as any).from("business_offers").update({
      title: form.title, code: form.code || null, discount_type: form.discount_type,
      discount_value: form.discount_value ? parseFloat(form.discount_value) : null,
      valid_until: form.valid_until || null,
    }).eq("id", editingOffer.id)
    setSaving(false)
    if (error) { toast({ variant: "destructive", title: "Couldn't update offer", description: error.message }); return }
    setEditingOffer(null); loadOffers(businessId)
  }

  async function deleteOffer() {
    if (!deletingOffer || !businessId) return
    const supabase = createClient()
    const { error } = await (supabase as any).from("business_offers").delete().eq("id", deletingOffer.id)
    if (error) { toast({ variant: "destructive", title: "Couldn't delete offer", description: error.message }); return }
    setDeletingOffer(null); loadOffers(businessId)
  }

  function openEdit(offer: Offer) {
    setForm({ title: offer.title, code: offer.code ?? "", discount_type: offer.discount_type, discount_value: offer.discount_value?.toString() ?? "", valid_until: offer.valid_until ?? "" })
    setEditingOffer(offer)
  }

  function discountLabel(o: Offer) {
    if (o.discount_type === "percentage") return `${o.discount_value ?? 0}% OFF`
    if (o.discount_type === "flat") return `₹${o.discount_value ?? 0} OFF`
    return "BOGO"
  }

  if (!businessId) {
    return <div className="p-8 text-center text-muted-foreground">Register your property to manage offers.</div>
  }

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sky-600 font-black uppercase tracking-widest text-[10px]">
            <Tag className="h-3 w-3" /> Revenue Boost
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Promotional Offers</h1>
          <p className="text-muted-foreground font-medium">Create targeted discounts for seasonal stays or multi-night bookings.</p>
        </div>
        <Button onClick={() => { setForm(EMPTY_FORM); setShowCreateOfferModal(true) }} className="bg-sky-600 hover:bg-sky-700 rounded-full px-8 font-black shadow-lg shadow-sky-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Create Offer
        </Button>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-black px-2">{offers.length} Offer{offers.length !== 1 ? "s" : ""}</h2>
        {offers.length === 0 ? (
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-16 text-center text-muted-foreground">No offers yet.</Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {offers.map((offer) => (
              <Card key={offer.id} className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden border-2 border-transparent hover:border-sky-100 transition-all group">
                <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-10">
                  <div className="flex items-center gap-8">
                    <div className="h-20 w-20 rounded-3xl bg-muted flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform shadow-inner">
                      {offer.discount_type === "bogo" ? <Gift className="h-10 w-10" /> : <Bed className="h-10 w-10" />}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-black text-foreground">{offer.title}</h3>
                        <Badge className={offer.status === "active" ? "bg-emerald-50 text-emerald-600 border-none px-3 text-[9px] font-black uppercase" : "bg-muted text-muted-foreground border-none px-3 text-[9px] font-black uppercase"}>
                          {offer.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        {offer.code && <span className="text-xs font-black text-sky-600 bg-sky-50 px-3 py-1 rounded-full uppercase tracking-tighter">{offer.code}</span>}
                        {offer.valid_until && <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Until {offer.valid_until}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-12 text-center md:text-right">
                    <div>
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Discount</p>
                      <p className="text-2xl font-black text-foreground">{discountLabel(offer)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(offer)} className="rounded-xl"><Edit2 className="h-4 w-4 text-muted-foreground" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeletingOffer(offer)} className="rounded-xl hover:text-red-600"><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={showCreateOfferModal} onOpenChange={setShowCreateOfferModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Create New Offer</DialogTitle>
            <DialogDescription>Set up a new discount for your guests.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2"><Label className="font-black text-xs uppercase tracking-widest">Offer Title</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Winter Staycation" className="h-12 rounded-2xl bg-muted border-none font-bold" /></div>
            <div className="space-y-2"><Label className="font-black text-xs uppercase tracking-widest">Coupon Code</Label>
              <Input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} placeholder="e.g. WINTER24" className="h-12 rounded-2xl bg-muted border-none font-bold" /></div>
            <div className="space-y-2"><Label className="font-black text-xs uppercase tracking-widest">Discount Value</Label>
              <Input value={form.discount_value} onChange={e => setForm(f => ({ ...f, discount_value: e.target.value }))} type="number" placeholder="e.g. 20" className="h-12 rounded-2xl bg-muted border-none font-bold" /></div>
            <div className="space-y-2"><Label className="font-black text-xs uppercase tracking-widest">Expiry Date</Label>
              <Input value={form.valid_until} onChange={e => setForm(f => ({ ...f, valid_until: e.target.value }))} type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" /></div>
            <Button disabled={saving || !form.title.trim()} className="w-full h-12 rounded-2xl font-black bg-sky-600 hover:bg-sky-700 text-white" onClick={createOffer}>{saving ? "Creating..." : "Create Offer"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingOffer} onOpenChange={(open) => !open && setEditingOffer(null)}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader><DialogTitle className="text-xl font-black">Edit Offer</DialogTitle><DialogDescription>Update details for "{editingOffer?.title}".</DialogDescription></DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2"><Label className="font-black text-xs uppercase tracking-widest">Offer Title</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="h-12 rounded-2xl bg-muted border-none font-bold" /></div>
            <div className="space-y-2"><Label className="font-black text-xs uppercase tracking-widest">Coupon Code</Label>
              <Input value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} className="h-12 rounded-2xl bg-muted border-none font-bold" /></div>
            <div className="space-y-2"><Label className="font-black text-xs uppercase tracking-widest">Discount Value</Label>
              <Input value={form.discount_value} onChange={e => setForm(f => ({ ...f, discount_value: e.target.value }))} type="number" className="h-12 rounded-2xl bg-muted border-none font-bold" /></div>
            <div className="space-y-2"><Label className="font-black text-xs uppercase tracking-widest">Expiry Date</Label>
              <Input value={form.valid_until} onChange={e => setForm(f => ({ ...f, valid_until: e.target.value }))} type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" /></div>
            <Button disabled={saving} className="w-full h-12 rounded-2xl font-black bg-sky-600 hover:bg-sky-700 text-white" onClick={saveEdit}>{saving ? "Saving..." : "Save Changes"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deletingOffer} onOpenChange={(open) => !open && setDeletingOffer(null)}>
        <DialogContent className="rounded-[2rem] max-w-sm">
          <DialogHeader><DialogTitle className="text-xl font-black">Delete Offer</DialogTitle><DialogDescription>Delete "<strong>{deletingOffer?.title}</strong>"? This cannot be undone.</DialogDescription></DialogHeader>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1 h-12 rounded-2xl font-black" onClick={() => setDeletingOffer(null)}>Cancel</Button>
            <Button className="flex-1 h-12 rounded-2xl font-black bg-sky-600 hover:bg-sky-700 text-white" onClick={deleteOffer}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
