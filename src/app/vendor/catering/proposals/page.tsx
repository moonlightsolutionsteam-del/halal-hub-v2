
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  FileText, Search, Filter, Plus,
  Download, Eye, CreditCard, Wallet,
  Calendar, ArrowUpRight, CheckCircle2,
  TrendingUp, History, Copy, Mail
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";

export default function CateringProposalsPage() {
  const [showCreateProposalModal, setShowCreateProposalModal] = useState(false)
  const [showMailModal, setShowMailModal] = useState(false)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [showCopyModal, setShowCopyModal] = useState(false)

  const proposals = [
    { id: "PROP-8821", customer: "Aisha Malik", event: "Nikah Gala", amount: "₹1,45,000", date: "Oct 28, 2024", status: "Sent" },
    { id: "PROP-8822", customer: "Zaid Khan", event: "Private BBQ", amount: "₹45,000", date: "Oct 30, 2024", status: "Approved" },
    { id: "PROP-8823", customer: "MedTech Co.", event: "Annual Dinner", amount: "₹2,10,000", date: "Nov 01, 2024", status: "Draft" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px]">
            <FileText className="h-3 w-3" /> Sales Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Proposals & Quotes</h1>
          <p className="text-muted-foreground font-medium">Create detailed quotes, manage contract approvals, and track conversion rates.</p>
        </div>
        <Button onClick={() => setShowCreateProposalModal(true)} className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 font-black shadow-lg shadow-blue-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Create Proposal
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-6">
          <div className="flex justify-between items-start">
            <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Projected Revenue</p>
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </div>
          <h2 className="text-5xl font-black tracking-tighter">₹4.2M</h2>
          <p className="text-xs font-bold text-muted-foreground uppercase">From 15 active proposals</p>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex flex-col justify-between group hover:shadow-md transition-all">
          <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Conversion Rate</p>
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-blue-600">68%</h2>
            <p className="text-xs font-bold text-emerald-600 uppercase">Top tier performance</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex flex-col justify-between group hover:shadow-md transition-all">
          <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Pending Signatures</p>
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-foreground">8</h2>
            <p className="text-xs font-bold text-amber-600 uppercase">Action required</p>
          </div>
        </Card>
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
        <CardHeader className="p-8 border-b flex flex-col md:flex-row items-center justify-between gap-4">
          <CardTitle className="text-xl font-black">Active Proposals</CardTitle>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search ID..." className="pl-9 h-11 rounded-2xl bg-muted border-none" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">ID / Date</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Customer & Event</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Estimate</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                <TableHead className="h-14 text-right px-8 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proposals.map((prop) => (
                <TableRow key={prop.id} className="border-border hover:bg-muted/50 transition-colors group">
                  <TableCell className="px-8 py-5">
                    <div className="font-black text-foreground text-xs">{prop.id}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">{prop.date}</div>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-foreground">{prop.customer}</p>
                    <p className="text-[10px] font-black text-blue-600 uppercase">{prop.event}</p>
                  </TableCell>
                  <TableCell className="font-black text-foreground">{prop.amount}</TableCell>
                  <TableCell>
                    <Badge className={
                      prop.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-none' :
                      prop.status === 'Sent' ? 'bg-blue-50 text-blue-600 border-none' : 'bg-muted text-muted-foreground border-none'
                    }>
                      {prop.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" onClick={() => setShowMailModal(true)} className="rounded-xl"><Mail className="h-4 w-4 text-muted-foreground" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => setShowDownloadModal(true)} className="rounded-xl"><Download className="h-4 w-4 text-muted-foreground" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => setShowCopyModal(true)} className="rounded-xl"><Copy className="h-4 w-4 text-muted-foreground" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Proposal Modal */}
      <Dialog open={showCreateProposalModal} onOpenChange={setShowCreateProposalModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Create Proposal</DialogTitle>
            <DialogDescription>Generate a new catering proposal or quote for a client.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Client Name</Label>
              <Input placeholder="e.g. Aisha Malik" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Event Type</Label>
              <Input placeholder="e.g. Nikah Gala" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Estimated Amount (₹)</Label>
              <Input placeholder="e.g. 1,45,000" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Event Date</Label>
              <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Guest Count</Label>
              <Input placeholder="e.g. 250" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowCreateProposalModal(false)}>Create Proposal</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Mail Modal */}
      <Dialog open={showMailModal} onOpenChange={setShowMailModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Send Proposal</DialogTitle>
            <DialogDescription>Email this proposal directly to the client.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Recipient Email</Label>
              <Input placeholder="client@email.com" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Message (optional)</Label>
              <Input placeholder="Personal note to attach..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowMailModal(false)}>Send Email</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Download Modal */}
      <Dialog open={showDownloadModal} onOpenChange={setShowDownloadModal}>
        <DialogContent className="rounded-[2rem] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Download Proposal</DialogTitle>
            <DialogDescription>Export initiated — you'll receive the proposal PDF via email shortly.</DialogDescription>
          </DialogHeader>
          <div className="pt-2">
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowDownloadModal(false)}>Got It</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Copy Modal */}
      <Dialog open={showCopyModal} onOpenChange={setShowCopyModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Duplicate Proposal</DialogTitle>
            <DialogDescription>Create a copy of this proposal for a new client or event.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">New Client Name</Label>
              <Input placeholder="e.g. Zainab Rafiq" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">New Event Date</Label>
              <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowCopyModal(false)}>Duplicate</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
