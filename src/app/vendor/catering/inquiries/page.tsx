
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  ClipboardList, Search, Filter, Phone,
  Mail, Calendar, ArrowUpRight, CheckCircle2,
  Clock, User, Info, MoreVertical, Reply,
  Zap, MessageSquare
} from "lucide-react";

export default function CateringInquiriesPage() {
  const [showArchiveModal, setShowArchiveModal] = useState(false)
  const [showAutoReplyModal, setShowAutoReplyModal] = useState(false)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [showCreateQuoteModal, setShowCreateQuoteModal] = useState(false)
  const [activeInquiry, setActiveInquiry] = useState<{ user: string; subject: string } | null>(null)

  const inquiries = [
    { id: "INQ-CAT-101", user: "Nadia Khan", subject: "Wedding Package Query", body: "We are planning a wedding for 400 people in January. Do you provide gender-segregated serving teams?", time: "2h ago", status: "Unread", priority: "High" },
    { id: "INQ-CAT-102", user: "Zaid Ali", subject: "Aqiqah Bulk Order", body: "Need to order full mutton degs for a home celebration. What is the minimum order size?", time: "5h ago", status: "Responded", priority: "Medium" },
    { id: "INQ-CAT-103", user: "Global Tech Inc.", subject: "Corporate Lunch", body: "Requesting a quote for 200 boxed meals. Must be strictly 100% certified halal.", time: "Yesterday", status: "Pending", priority: "High" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px]">
            <MessageSquare className="h-3 w-3" /> Event Concierge
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Guest Inquiries</h1>
          <p className="text-muted-foreground font-medium">Manage quote requests, dietary queries, and off-site event inquiries.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowArchiveModal(true)} className="rounded-full px-6 font-bold border-2 h-12">
            Archive Read
          </Button>
          <Button onClick={() => setShowAutoReplyModal(true)} className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 font-black shadow-lg shadow-blue-200 h-12 text-white">
            Auto-Reply AI
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-[2.5rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search messages..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white transition-all">All</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted border-border">Urgent</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted border-border">Unread</Badge>
          <Button variant="ghost" size="icon" className="rounded-full"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {inquiries.map((inq) => (
          <Card key={inq.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-blue-100">
            <div className="p-8 flex flex-col md:flex-row gap-10">
              <div className="md:w-48 shrink-0 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-muted rounded-2xl flex items-center justify-center text-blue-600 font-black text-xs shadow-sm">
                    {inq.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-black text-foreground">{inq.user}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{inq.time}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Badge className={
                    inq.priority === 'High' ? 'bg-rose-50 text-rose-600 border-none px-2 h-6 flex items-center text-[9px] font-black uppercase' : 'bg-muted text-muted-foreground border-none px-2 h-6 flex items-center text-[9px] font-black uppercase'
                  }>
                    {inq.priority} Priority
                  </Badge>
                  <Badge variant="outline" className="text-[9px] uppercase font-black tracking-tighter border-blue-200 text-blue-600 h-6 px-2 flex items-center">
                    {inq.status}
                  </Badge>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-black text-foreground tracking-tight">{inq.subject}</h3>
                  <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="h-5 w-5 text-muted-foreground" /></Button>
                </div>
                <p className="text-muted-foreground font-medium leading-relaxed italic text-base">
                  "{inq.body}"
                </p>
                <div className="pt-6 flex gap-3">
                  <Button onClick={() => { setActiveInquiry(inq); setShowReplyModal(true); }} className="rounded-2xl h-12 px-8 font-black uppercase text-[10px] tracking-widest bg-blue-600 text-white shadow-lg shadow-blue-200">
                    <Reply className="mr-2 h-4 w-4" /> Reply to Guest
                  </Button>
                  <Button variant="outline" onClick={() => { setActiveInquiry(inq); setShowCreateQuoteModal(true); }} className="rounded-2xl h-12 px-8 font-black uppercase text-[10px] tracking-widest border-2">
                    Create Quote
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Archive Modal */}
      <Dialog open={showArchiveModal} onOpenChange={setShowArchiveModal}>
        <DialogContent className="rounded-[2rem] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Archive Read Messages</DialogTitle>
            <DialogDescription>All read inquiries will be archived. You can retrieve them from the archive any time.</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1 h-12 rounded-2xl font-black" onClick={() => setShowArchiveModal(false)}>Cancel</Button>
            <Button className="flex-1 h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowArchiveModal(false)}>Archive All</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Auto-Reply AI Modal */}
      <Dialog open={showAutoReplyModal} onOpenChange={setShowAutoReplyModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Auto-Reply AI</DialogTitle>
            <DialogDescription>Configure AI-powered automatic replies for incoming inquiries.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Reply Tone</Label>
              <Input placeholder="e.g. Professional, Friendly" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Auto-Reply Template</Label>
              <Textarea placeholder="Thank you for contacting us. We will get back to you within 24 hours..." className="rounded-2xl bg-muted border-none font-medium min-h-[100px]" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Trigger Keywords</Label>
              <Input placeholder="e.g. halal, wedding, quote" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowAutoReplyModal(false)}>Enable Auto-Reply</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reply Modal */}
      <Dialog open={showReplyModal} onOpenChange={setShowReplyModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Reply to Guest</DialogTitle>
            <DialogDescription>Send a response to {activeInquiry?.user} regarding: {activeInquiry?.subject}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Your Reply</Label>
              <Textarea placeholder="Type your response here..." className="rounded-2xl bg-muted border-none font-medium min-h-[120px]" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Attach Proposal (optional)</Label>
              <Input placeholder="Proposal ID e.g. PROP-8824" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowReplyModal(false)}>Send Reply</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Quote Modal */}
      <Dialog open={showCreateQuoteModal} onOpenChange={setShowCreateQuoteModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Create Quote</DialogTitle>
            <DialogDescription>Generate a catering quote for {activeInquiry?.user}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Event Type</Label>
              <Input placeholder="e.g. Wedding, Corporate Lunch" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Guest Count</Label>
              <Input placeholder="e.g. 200" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Estimated Amount (₹)</Label>
              <Input placeholder="e.g. 90,000" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Event Date</Label>
              <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowCreateQuoteModal(false)}>Generate Quote</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
