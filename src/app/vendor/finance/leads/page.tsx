
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare, Search, Filter, Phone,
  Mail, Calendar, ArrowUpRight, CheckCircle2,
  Clock, User, Info, MoreVertical, Reply,
  Zap, Plus, Target
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function FinanceLeadsPage() {
  const [showArchiveModal, setShowArchiveModal] = useState(false)
  const [showAutoResponseModal, setShowAutoResponseModal] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showReplyModal, setShowReplyModal] = useState<string | null>(null)
  const [showProspectusModal, setShowProspectusModal] = useState<string | null>(null)

  const leads = [
    { id: "LD-FIN-101", user: "Hamza Ali", subject: "Sukuk Investment Query", body: "Interested in the Real Estate Sukuk Tier 1. Requesting full prospectus and Shariah board fatwa details.", time: "2h ago", status: "New", priority: "High" },
    { id: "LD-FIN-102", user: "Zaid Hussain", subject: "SME Fund Application", body: "We are a halal food startup looking for Mudabarah growth capital. Our pitch deck is ready for review.", time: "5h ago", status: "Contract Sent", priority: "High" },
    { id: "LD-FIN-103", user: "Sara Malik", subject: "Family Savings Plan", body: "Hi, do you offer educational savings plans for children that are strictly zero-interest?", time: "Yesterday", status: "Follow-up", priority: "Medium" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-[10px]">
            <Target className="h-3 w-3" /> High Net Worth Pipeline
          </div>
          <h1 className="text-3xl font-black font-headline text-foreground">Investor Leads</h1>
          <p className="text-muted-foreground font-medium">Manage incoming investment queries, SME fund applications, and client enquiries.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12" onClick={() => setShowArchiveModal(true)}>
            Archive Read
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-8 font-black shadow-lg shadow-indigo-200 h-12 text-white" onClick={() => setShowAutoResponseModal(true)}>
            Auto-Response AI
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-[2.5rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search leads by name or subject..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer hover:bg-indigo-600 hover:text-white transition-all">All</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted border-border">Urgent</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted border-border">New</Badge>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowFilterModal(true)}><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {leads.map((lead) => (
          <Card key={lead.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-indigo-100">
            <div className="p-8 flex flex-col md:flex-row gap-10">
              <div className="md:w-48 shrink-0 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-xs shadow-sm">
                    {lead.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-black text-foreground">{lead.user}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{lead.time}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Badge className={
                    lead.priority === 'High' ? 'bg-rose-50 text-rose-600 border-none px-2 h-6 flex items-center text-[9px] font-black uppercase' : 'bg-muted text-muted-foreground border-none px-2 h-6 flex items-center text-[9px] font-black uppercase'
                  }>
                    {lead.priority} Priority
                  </Badge>
                  <Badge variant="outline" className="text-[9px] uppercase font-black tracking-tighter border-indigo-200 text-indigo-600 h-6 px-2 flex items-center">
                    {lead.status}
                  </Badge>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-black text-foreground tracking-tight">{lead.subject}</h3>
                  <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="h-5 w-5 text-muted-foreground" /></Button>
                </div>
                <p className="text-muted-foreground font-medium leading-relaxed italic text-base">
                  "{lead.body}"
                </p>
                <div className="pt-6 flex gap-3">
                  <Button className="rounded-2xl h-12 px-8 font-black uppercase text-[10px] tracking-widest bg-indigo-600 text-white shadow-lg shadow-indigo-200" onClick={() => setShowReplyModal(lead.id)}>
                    <Reply className="mr-2 h-4 w-4" /> Reply to Lead
                  </Button>
                  <Button variant="outline" className="rounded-2xl h-12 px-8 font-black uppercase text-[10px] tracking-widest border-2" onClick={() => setShowProspectusModal(lead.id)}>
                    Send Prospectus
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Archive Read Modal */}
      <Dialog open={showArchiveModal} onOpenChange={setShowArchiveModal}>
        <DialogContent className="rounded-[2rem] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Archive Read Leads?</DialogTitle>
            <DialogDescription>All leads marked as read will be moved to the archive. This action can be undone.</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1 h-12 rounded-2xl font-black border-2" onClick={() => setShowArchiveModal(false)}>Cancel</Button>
            <Button className="flex-1 h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowArchiveModal(false)}>Confirm Archive</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Auto-Response AI Modal */}
      <Dialog open={showAutoResponseModal} onOpenChange={setShowAutoResponseModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Auto-Response AI</DialogTitle>
            <DialogDescription>Configure the AI to automatically respond to incoming investor leads.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Response Tone</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="formal">Formal — Institutional</SelectItem>
                  <SelectItem value="friendly">Friendly — Approachable</SelectItem>
                  <SelectItem value="concise">Concise — Direct</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Auto-Respond to Lead Types</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="Select lead types" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="all">All Leads</SelectItem>
                  <SelectItem value="new">New Leads Only</SelectItem>
                  <SelectItem value="high">High Priority Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Custom Signature</Label>
              <Input placeholder="e.g. HalalHub Finance Team" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowAutoResponseModal(false)}>Enable Auto-Response</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Filter Modal */}
      <Dialog open={showFilterModal} onOpenChange={setShowFilterModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Filter Leads</DialogTitle>
            <DialogDescription>Narrow down your lead pipeline by status, priority, and date.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Status</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contract">Contract Sent</SelectItem>
                  <SelectItem value="followup">Follow-up</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Priority</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="All priorities" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Date Range</Label>
              <div className="grid grid-cols-2 gap-3">
                <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowFilterModal(false)}>Apply Filters</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reply to Lead Modal */}
      <Dialog open={!!showReplyModal} onOpenChange={() => setShowReplyModal(null)}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Reply to Lead</DialogTitle>
            <DialogDescription>Compose a response to the investor inquiry.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Subject</Label>
              <Input placeholder="Re: Investment Inquiry" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Message</Label>
              <Textarea placeholder="Write your response here..." className="rounded-2xl bg-muted border-none font-bold resize-none" rows={5} />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Schedule Send</Label>
              <Input type="datetime-local" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowReplyModal(null)}>Send Reply</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Prospectus Modal */}
      <Dialog open={!!showProspectusModal} onOpenChange={() => setShowProspectusModal(null)}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Send Prospectus</DialogTitle>
            <DialogDescription>Select the relevant product prospectus to share with this investor.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Prospectus Document</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="Select prospectus" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="sukuk">Real Estate Sukuk Tier 1 Prospectus</SelectItem>
                  <SelectItem value="sme">SME Mudarabah Growth Prospectus</SelectItem>
                  <SelectItem value="savings">Halal Savings Account Guide</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Delivery Email</Label>
              <Input placeholder="investor@example.com" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Personal Note (optional)</Label>
              <Textarea placeholder="Add a personal message..." className="rounded-2xl bg-muted border-none font-bold resize-none" rows={3} />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowProspectusModal(null)}>Send Prospectus</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
