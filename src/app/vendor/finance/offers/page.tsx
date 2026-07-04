"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tag, Plus, Trash2, Edit2,
  TrendingUp, Users, Percent, Gift,
  Landmark, ShieldCheck, Sparkles, BarChart3
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function FinanceOffersPage() {
  const [showNewOfferModal, setShowNewOfferModal] = useState(false)
  const [showRunAuditModal, setShowRunAuditModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState<number | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null)

  const activeOffers = [
    { id: 1, title: "Zero-Fee Account Opening", code: "ZEROFEE", discount: "0% Fee", type: "New Member", status: "Active", expires: "Ongoing", used: 340 },
    { id: 2, title: "Halal Savings Boost", code: "SAVE15", discount: "+1.5% Profit", type: "Savings Account", status: "Active", expires: "Mar 31, 2025", used: 128 },
    { id: 3, title: "Ramadan Investment Drive", code: "INVEST30", discount: "₹300 Bonus", type: "Seasonal", status: "Expired", expires: "Apr 10, 2024", used: 720 },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-[10px]">
            <Tag className="h-3 w-3" /> Client Acquisition
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Rates & Offers</h1>
          <p className="text-muted-foreground font-medium">Promote Shariah-compliant products with targeted campaigns and limited-time rates.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-8 font-black shadow-lg shadow-indigo-200 h-12 text-white" onClick={() => setShowNewOfferModal(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Offer
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">Assets Under Mgmt</p>
            <h2 className="text-3xl font-black text-foreground">₹82M</h2>
            <p className="text-xs font-bold text-emerald-600 uppercase">+22% YTD</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
            <Users className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">Offer Claims</p>
            <h2 className="text-3xl font-black text-foreground">1,188</h2>
            <p className="text-xs font-bold text-blue-600 uppercase">This Quarter</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-4 relative overflow-hidden">
          <BarChart3 className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
          <div className="space-y-4 relative z-10">
            <p className="text-xs font-black uppercase tracking-widest opacity-80">Shariah Audit</p>
            <h2 className="text-xl font-black leading-snug">Verify all offers comply with Islamic finance standards.</h2>
            <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] uppercase h-10 bg-indigo-600 text-white border-none" onClick={() => setShowRunAuditModal(true)}>Run Audit</Button>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-black px-2">Active Offers</h2>
        <div className="grid grid-cols-1 gap-6">
          {activeOffers.map((offer) => (
            <Card key={offer.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-indigo-100">
              <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-8">
                  <div className={`h-20 w-20 rounded-3xl ${offer.status === 'Active' ? 'bg-indigo-50 text-indigo-600' : 'bg-muted text-muted-foreground'} flex items-center justify-center shadow-inner`}>
                    {offer.type === 'Savings Account' ? <Landmark className="h-10 w-10" /> : offer.type === 'Seasonal' ? <Gift className="h-10 w-10" /> : <Percent className="h-10 w-10" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-black text-foreground">{offer.title}</h3>
                      <Badge className={offer.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-none px-3' : 'bg-muted text-muted-foreground border-none px-3'}>
                        {offer.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-tighter">{offer.code}</span>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{offer.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-10">
                  <div className="text-center md:text-right">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Benefit</p>
                    <p className="text-2xl font-black text-foreground">{offer.discount}</p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Claims</p>
                    <p className="text-2xl font-black text-foreground">{offer.used}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setShowEditModal(offer.id)}><Edit2 className="h-4 w-4 text-muted-foreground" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-xl hover:text-rose-500" onClick={() => setShowDeleteModal(offer.id)}><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* New Offer Modal */}
      <Dialog open={showNewOfferModal} onOpenChange={setShowNewOfferModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">New Offer</DialogTitle>
            <DialogDescription>Create a new Shariah-compliant promotional offer for your products.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Offer Title</Label>
              <Input placeholder="e.g. Eid Investment Bonus" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Promo Code</Label>
              <Input placeholder="e.g. EID2025" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Offer Type</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="new-member">New Member</SelectItem>
                  <SelectItem value="savings">Savings Account</SelectItem>
                  <SelectItem value="seasonal">Seasonal</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Benefit / Discount</Label>
              <Input placeholder="e.g. +1.5% Profit or ₹500 Bonus" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Expiry Date</Label>
              <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowNewOfferModal(false)}>Create Offer</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Run Audit Modal */}
      <Dialog open={showRunAuditModal} onOpenChange={setShowRunAuditModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Run Shariah Audit</DialogTitle>
            <DialogDescription>Verify that all active offers comply with Islamic finance standards.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Audit Scope</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="Select scope" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="active">Active Offers Only</SelectItem>
                  <SelectItem value="all">All Offers (including expired)</SelectItem>
                  <SelectItem value="new">New Offers Added This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Reviewing Board Member</Label>
              <Input placeholder="e.g. Sheikh Hassan Al-Farouqi" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="p-4 bg-muted rounded-2xl text-xs text-muted-foreground font-medium leading-relaxed">
              The audit will check all offers for interest-based elements, ambiguity (gharar), and compliance with AAOIFI standards.
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowRunAuditModal(false)}>Start Audit</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Offer Modal */}
      <Dialog open={!!showEditModal} onOpenChange={() => setShowEditModal(null)}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Edit Offer</DialogTitle>
            <DialogDescription>Update the details of this promotional offer.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Offer Title</Label>
              <Input placeholder="Offer title..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Benefit / Discount</Label>
              <Input placeholder="e.g. +1.5% Profit" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Status</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">New Expiry Date</Label>
              <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowEditModal(null)}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Offer Confirmation Modal */}
      <Dialog open={!!showDeleteModal} onOpenChange={() => setShowDeleteModal(null)}>
        <DialogContent className="rounded-[2rem] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Remove Offer?</DialogTitle>
            <DialogDescription>This will permanently remove this offer from your catalog. This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1 h-12 rounded-2xl font-black border-2" onClick={() => setShowDeleteModal(null)}>Cancel</Button>
            <Button className="flex-1 h-12 rounded-2xl font-black bg-rose-600 hover:bg-rose-700 text-white" onClick={() => setShowDeleteModal(null)}>Remove</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
