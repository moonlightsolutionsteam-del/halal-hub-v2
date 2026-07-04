"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Tag, Plus, Trash2, Edit2,
  TrendingUp, Users, Percent, Gift,
  Zap, ArrowRight, Beef, Star,
  Smartphone
} from "lucide-react";

export default function ButcherOffersPage() {
  const [showCreateOfferModal, setShowCreateOfferModal] = useState(false)
  const [showEditOfferModal, setShowEditOfferModal] = useState(false)
  const [showDeleteOfferModal, setShowDeleteOfferModal] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState<{ title: string; code: string } | null>(null)

  const activeOffers = [
    { id: 1, title: "Weekend Lamb Special", code: "LAMB20", discount: "20% OFF", type: "Specific Cut", status: "Active", used: 45 },
    { id: 2, title: "Bulk BBQ Pack", code: "BBQSEASON", discount: "₹500 OFF", type: "Bundle", status: "Active", used: 120 },
    { id: 3, title: "First Visit Coupon", code: "MEAT10", discount: "10% OFF", type: "New User", status: "Active", used: 850 },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-600 font-black uppercase tracking-widest text-[10px]">
            <Tag className="h-3 w-3" /> Promotion Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Offers & Coupons</h1>
          <p className="text-muted-foreground font-medium">Drive traffic to your shop with specialized discounts on premium cuts.</p>
        </div>
        <Button onClick={() => setShowCreateOfferModal(true)} className="bg-red-600 hover:bg-red-700 rounded-full px-8 font-black shadow-lg shadow-red-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Create New Offer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex items-center gap-6">
          <div className="h-14 w-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 shadow-inner">
            <TrendingUp className="h-7 w-7" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">Promo Impact</p>
            <p className="text-3xl font-black text-foreground">₹18.4k</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex items-center gap-6">
          <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
            <Users className="h-7 w-7" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">Redemptions</p>
            <p className="text-3xl font-black text-foreground">1,015</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 flex items-center gap-6 relative overflow-hidden">
          <div className="h-14 w-14 rounded-2xl bg-card/10 flex items-center justify-center text-red-600 relative z-10">
            <Zap className="h-7 w-7" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">Active Boosts</p>
            <p className="text-3xl font-black text-white">2 Live</p>
          </div>
          <div className="absolute -top-4 -right-4 h-24 w-24 bg-red-600/10 rounded-full blur-2xl" />
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-black px-2">Active Campaigns</h2>
        <div className="grid grid-cols-1 gap-4">
          {activeOffers.map((offer) => (
            <Card key={offer.id} className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden border-2 border-transparent hover:border-red-100 transition-all group">
              <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="flex items-center gap-8">
                  <div className="h-20 w-20 rounded-3xl bg-muted flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform shadow-inner">
                    {offer.type === 'Specific Cut' ? <Beef className="h-10 w-10" /> : <Gift className="h-10 w-10" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-black text-foreground">{offer.title}</h3>
                      <Badge className="bg-emerald-50 text-emerald-600 border-none px-3 text-[9px] font-black uppercase">ACTIVE</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase tracking-tighter">{offer.code}</span>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{offer.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-12 text-center md:text-right">
                  <div>
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Discount</p>
                    <p className="text-2xl font-black text-foreground">{offer.discount}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Used</p>
                    <p className="text-2xl font-black text-foreground">{offer.used}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => { setSelectedOffer(offer); setShowEditOfferModal(true); }} className="rounded-xl"><Edit2 className="h-4 w-4 text-muted-foreground" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => { setSelectedOffer(offer); setShowDeleteOfferModal(true); }} className="rounded-xl hover:text-red-600"><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Create New Offer Modal */}
      <Dialog open={showCreateOfferModal} onOpenChange={setShowCreateOfferModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Create New Offer</DialogTitle>
            <DialogDescription>Set up a new discount or promotional offer for your customers.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Offer Title</Label>
              <Input placeholder="e.g. Weekend Lamb Special" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Coupon Code</Label>
              <Input placeholder="e.g. LAMB20" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Discount Value</Label>
              <Input placeholder="e.g. 20% OFF or ₹500 OFF" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Offer Type</Label>
              <Input placeholder="e.g. Specific Cut, Bundle, New User" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Expiry Date</Label>
              <Input placeholder="e.g. 31 July 2026" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowCreateOfferModal(false)}>Create Offer</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Offer Modal */}
      <Dialog open={showEditOfferModal} onOpenChange={setShowEditOfferModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Edit Offer</DialogTitle>
            <DialogDescription>Update details for the "{selectedOffer?.title}" campaign.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Offer Title</Label>
              <Input defaultValue={selectedOffer?.title} className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Coupon Code</Label>
              <Input defaultValue={selectedOffer?.code} className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Discount Value</Label>
              <Input placeholder="e.g. 20% OFF or ₹500 OFF" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Expiry Date</Label>
              <Input placeholder="e.g. 31 July 2026" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowEditOfferModal(false)}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Offer Confirmation Modal */}
      <Dialog open={showDeleteOfferModal} onOpenChange={setShowDeleteOfferModal}>
        <DialogContent className="rounded-[2rem] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Delete Offer</DialogTitle>
            <DialogDescription>Are you sure you want to delete the "<strong>{selectedOffer?.title}</strong>" campaign? This cannot be undone.</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1 h-12 rounded-2xl font-black" onClick={() => setShowDeleteOfferModal(false)}>Cancel</Button>
            <Button className="flex-1 h-12 rounded-2xl font-black bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowDeleteOfferModal(false)}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
