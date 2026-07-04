
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Tag, Plus, Trash2, Edit2,
  TrendingUp, Users, Calendar, Clock,
  CheckCircle2, Sparkles, Percent, Gift,
  Zap, ArrowRight, CookingPot
} from "lucide-react";

export default function CateringOffersPage() {
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false)
  const [showBoostModal, setShowBoostModal] = useState(false)
  const [showEditOfferModal, setShowEditOfferModal] = useState(false)
  const [showDeleteOfferModal, setShowDeleteOfferModal] = useState(false)

  const activeOffers = [
    { id: 1, title: "Winter Wedding Discount", code: "WINTERWED", discount: "₹10,000 OFF", type: "Full Service", status: "Active", expires: "Dec 31, 2024", used: 8 },
    { id: 2, title: "Early Bird Booking", code: "EARLYHUB", discount: "Free Desserts", type: "First Quote", status: "Active", expires: "Ongoing", used: 42 },
    { id: 3, title: "Corporate Lunch Deal", code: "CORP20", discount: "15% OFF", type: "Over 100 Pax", status: "Expired", expires: "Oct 30, 2024", used: 15 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px]">
            <Tag className="h-3 w-3" /> Growth & Revenue
          </div>
          <h1 className="text-3xl font-black font-headline text-foreground">Campaigns & Promos</h1>
          <p className="text-muted-foreground font-medium">Create targeted discounts for seasonal weddings or corporate bulk bookings.</p>
        </div>
        <Button onClick={() => setShowNewCampaignModal(true)} className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 font-black shadow-lg shadow-blue-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">Campaign Impact</p>
            <h2 className="text-3xl font-black text-foreground">₹85,000</h2>
            <p className="text-xs font-bold text-emerald-600 uppercase">+12% Conversion</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-4">
          <div className={`h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-inner`}>
            <Users className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">Claims</p>
            <h2 className="text-3xl font-black text-foreground">65</h2>
            <p className="text-xs font-bold text-blue-600 uppercase">This Quarter</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-4 relative overflow-hidden">
          <Sparkles className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
          <div className="space-y-4 relative z-10">
            <p className="text-xs font-black uppercase tracking-widest opacity-80">Venue Visibility</p>
            <h2 className="text-xl font-black leading-snug">Feature your catering on the Hub Main Guide.</h2>
            <Button variant="secondary" onClick={() => setShowBoostModal(true)} className="w-full rounded-xl font-black text-[10px] uppercase h-10 bg-blue-600 text-white border-none">Boost Visibility</Button>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-black px-2">Active Event Promos</h2>
        <div className="grid grid-cols-1 gap-6">
          {activeOffers.map((offer) => (
            <Card key={offer.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-blue-100">
              <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-8">
                  <div className={`h-20 w-20 rounded-3xl ${offer.status === 'Active' ? 'bg-blue-50 text-blue-600' : 'bg-muted text-muted-foreground'} flex items-center justify-center shadow-inner`}>
                    {offer.title.includes('Wedding') ? <CookingPot className="h-10 w-10" /> : <Percent className="h-10 w-10" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-black text-foreground">{offer.title}</h3>
                      <Badge className={offer.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-none px-3' : 'bg-muted text-muted-foreground border-none px-3'}>
                        {offer.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter">{offer.code}</span>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{offer.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-10">
                  <div className="text-center md:text-right">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Discount</p>
                    <p className="text-2xl font-black text-foreground">{offer.discount}</p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Claims</p>
                    <p className="text-2xl font-black text-foreground">{offer.used}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setShowEditOfferModal(true)} className="rounded-xl"><Edit2 className="h-4 w-4 text-muted-foreground" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => setShowDeleteOfferModal(true)} className="rounded-xl hover:text-rose-500"><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* New Campaign Modal */}
      <Dialog open={showNewCampaignModal} onOpenChange={setShowNewCampaignModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">New Campaign</DialogTitle>
            <DialogDescription>Create a targeted promotional campaign for your catering services.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Campaign Title</Label>
              <Input placeholder="e.g. Winter Wedding Special" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Promo Code</Label>
              <Input placeholder="e.g. WINTER24" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Discount / Offer</Label>
              <Input placeholder="e.g. ₹10,000 OFF or Free Desserts" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Applies To</Label>
              <Input placeholder="e.g. Full Service, Over 100 Pax" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Expiry Date</Label>
              <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowNewCampaignModal(false)}>Launch Campaign</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Boost Visibility Modal */}
      <Dialog open={showBoostModal} onOpenChange={setShowBoostModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Boost Visibility</DialogTitle>
            <DialogDescription>Feature your catering services on the Halal Hub Main Guide to reach more customers.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Boost Duration</Label>
              <Input placeholder="e.g. 30 days, 3 months" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Target Region</Label>
              <Input placeholder="e.g. Manhattan, New York" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <p className="text-sm text-muted-foreground font-medium">Our team will review and activate your boost within 24 hours.</p>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowBoostModal(false)}>Request Boost</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Offer Modal */}
      <Dialog open={showEditOfferModal} onOpenChange={setShowEditOfferModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Edit Campaign</DialogTitle>
            <DialogDescription>Update the details of this promotional offer.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Campaign Title</Label>
              <Input placeholder="Campaign title" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Discount / Offer</Label>
              <Input placeholder="e.g. ₹10,000 OFF" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Expiry Date</Label>
              <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowEditOfferModal(false)}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Offer Confirmation Modal */}
      <Dialog open={showDeleteOfferModal} onOpenChange={setShowDeleteOfferModal}>
        <DialogContent className="rounded-[2rem] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Delete Campaign</DialogTitle>
            <DialogDescription>Are you sure you want to delete this promotional campaign? This cannot be undone.</DialogDescription>
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
