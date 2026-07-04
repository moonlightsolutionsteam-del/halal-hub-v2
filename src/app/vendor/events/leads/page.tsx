
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, Search, Filter, Phone, 
  Mail, Calendar, ArrowUpRight, CheckCircle2,
  Clock, User, Info, MoreVertical, Reply,
  Zap, Plus
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function EventLeadsPage() {
  const leads = [
    { id: "LD-881", user: "Nadia Khan", subject: "Wedding Inquiry (Jan 2025)", body: "Interested in the Imperial Nikah package. Need info on segregation options.", time: "2h ago", status: "New", priority: "High" },
    { id: "LD-882", user: "Omar Farooq", subject: "Charity Fundraiser", body: "Looking for a venue for 500 guests in December. Is the catering hall available?", time: "5h ago", status: "Contacted", priority: "Medium" },
    { id: "LD-883", user: "Muslim Biz Hub", subject: "Networking Meet", body: "Requesting a quote for a monthly business meetup hall.", time: "Yesterday", status: "Proposal Sent", priority: "Low" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-purple-600 font-black uppercase tracking-widest text-[10px]">
            <MessageSquare className="h-3 w-3" /> Growth Pipeline
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Leads & Inquiries</h1>
          <p className="text-muted-foreground font-medium">Manage incoming venue queries, quote requests, and potential client messages.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            Archive Read
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-8 font-black shadow-lg shadow-purple-200 h-12 text-white">
            Auto-Reply AI
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-[2.5rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search inquiries..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer hover:bg-purple-600 hover:text-white transition-all">All</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted border-border">Urgent</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted border-border">New</Badge>
          <Button variant="ghost" size="icon" className="rounded-full"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {leads.map((lead) => (
          <Card key={lead.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-purple-100">
            <div className="p-8 flex flex-col md:flex-row gap-10">
              <div className="md:w-48 shrink-0 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-muted rounded-2xl flex items-center justify-center text-purple-600 font-black text-xs shadow-sm">
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
                  <Badge variant="outline" className="text-[9px] uppercase font-black tracking-tighter border-purple-200 text-purple-600 h-6 px-2 flex items-center">
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
                  <Button className="rounded-2xl h-12 px-8 font-black uppercase text-[10px] tracking-widest bg-purple-600 text-white shadow-lg shadow-purple-200">
                    <Reply className="mr-2 h-4 w-4" /> Reply to Lead
                  </Button>
                  <Button variant="outline" className="rounded-2xl h-12 px-8 font-black uppercase text-[10px] tracking-widest border-2">
                    Mark as Contacted
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
