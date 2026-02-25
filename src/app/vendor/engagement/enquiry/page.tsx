
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, Search, Filter, Phone, 
  Mail, Calendar, ArrowUpRight, CheckCircle2,
  Clock, User, Info, MoreVertical, Reply
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function EngagementEnquiryPage() {
  const enquiries = [
    { id: "ENQ-101", user: "Zaid Ali", subject: "Group Booking Inquiry", body: "Looking to book for 20 people this Sunday. Do you have a dedicated prayer room?", time: "2h ago", status: "Unread", priority: "High" },
    { id: "ENQ-102", user: "Fatima S.", subject: "Halal Certificate Request", body: "Hi, can you share your latest HMC certificate for the new branch?", time: "5h ago", status: "Responded", priority: "Medium" },
    { id: "ENQ-103", user: "Omar Sheikh", subject: "Corporate Catering", body: "Need a quote for our office lunch on Dec 5th. Looking for 100% certified options...", time: "Yesterday", status: "Pending", priority: "High" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <MessageSquare className="h-3 w-3" /> Customer Concierge
          </div>
          <h1 className="text-3xl font-black font-headline">General Enquiries</h1>
          <p className="text-muted-foreground font-medium">Respond to direct messages, booking queries, and certification requests.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2">
            Archive Read
          </Button>
          <Button className="bg-primary rounded-full px-8 font-bold shadow-lg shadow-primary/20 h-12">
            Auto-Reply Settings
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search messages..." className="pl-9 h-12 rounded-2xl bg-white border-none shadow-sm" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all">All</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted">High Priority</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted">Unread</Badge>
          <Button variant="ghost" size="icon" className="rounded-full"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {enquiries.map((enq) => (
          <Card key={enq.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/10">
            <div className="p-8 flex flex-col md:flex-row gap-10">
              <div className="md:w-48 shrink-0 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-slate-50 rounded-2xl flex items-center justify-center text-primary font-black text-xs shadow-sm">
                    {enq.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">{enq.user}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{enq.time}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Badge className={
                    enq.priority === 'High' ? 'bg-rose-50 text-rose-600 border-none' : 'bg-slate-50 text-slate-600 border-none'
                  }>
                    {enq.priority} Priority
                  </Badge>
                  <Badge variant="outline" className="text-[10px] uppercase font-black tracking-tighter border-primary/20 text-primary">
                    {enq.status}
                  </Badge>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">{enq.subject}</h3>
                  <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="h-5 w-5 text-slate-300" /></Button>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed italic text-base">
                  "{enq.body}"
                </p>
                <div className="pt-6 flex gap-3">
                  <Button className="rounded-2xl h-12 px-8 font-black uppercase text-[10px] tracking-widest bg-primary">
                    <Reply className="mr-2 h-4 w-4" /> Reply to Zaid
                  </Button>
                  <Button variant="outline" className="rounded-2xl h-12 px-8 font-black uppercase text-[10px] tracking-widest border-2">
                    Mark as Read
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Info className="h-32 w-32" />
        </div>
        <div className="relative z-10 space-y-6">
          <h3 className="text-2xl font-black font-headline">Concierge Intelligence</h3>
          <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-2xl">
            Our AI analysis tags and prioritizes incoming enquiries based on urgency and topic (e.g., Booking vs. Certification). Use the "Priority" badges to manage your workflow during peak hours.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-10 w-10 bg-slate-800 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-black">U{i}</div>
              ))}
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">+12 other enquiries pending</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
