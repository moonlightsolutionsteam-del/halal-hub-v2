
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

export default function GroceryEnquiryPage() {
  const enquiries = [
    { id: "GRO-ENQ-101", user: "Zaid Ali", subject: "Bulk Order Inquiry", body: "Need to order 50kg of premium basmati rice for a community event next Saturday. Do you have wholesale pricing?", time: "2h ago", status: "Unread", priority: "High" },
    { id: "GRO-ENQ-102", user: "Fatima S.", subject: "Halal Sourcing Question", body: "Can you confirm the brand of chicken served at your meat counter is hand-slaughtered?", time: "5h ago", status: "Responded", priority: "High" },
    { id: "GRO-ENQ-103", user: "Omar Sheikh", subject: "Home Delivery Slot", body: "The app isn't showing delivery slots for my area today. Is there a technical issue?", time: "Yesterday", status: "Pending", priority: "Medium" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-[10px]">
            <MessageSquare className="h-3 w-3" /> Shopper Concierge
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">General Enquiries</h1>
          <p className="text-muted-foreground font-medium">Respond to direct messages, bulk order requests, and stock availability queries.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            Archive Read
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-8 font-black shadow-lg shadow-emerald-200 h-12 text-white">
            Concierge AI
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2.5rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search messages..." className="pl-9 h-11 rounded-2xl bg-slate-50 border-none font-medium" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer hover:bg-emerald-600 hover:text-white transition-all">All</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted">Urgent</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted">Unread</Badge>
          <Button variant="ghost" size="icon" className="rounded-full"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {enquiries.map((enq) => (
          <Card key={enq.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-emerald-100">
            <div className="p-8 flex flex-col md:flex-row gap-10">
              <div className="md:w-48 shrink-0 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-slate-50 rounded-2xl flex items-center justify-center text-emerald-600 font-black text-xs shadow-sm">
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
                  <Badge variant="outline" className="text-[10px] uppercase font-black tracking-tighter border-emerald-200 text-emerald-600">
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
                  <Button className="rounded-2xl h-12 px-8 font-black uppercase text-[10px] tracking-widest bg-emerald-600 text-white shadow-lg shadow-emerald-200">
                    <Reply className="mr-2 h-4 w-4" /> Reply to Shopper
                  </Button>
                  <Button variant="outline" className="rounded-2xl h-12 px-8 font-black uppercase text-[10px] tracking-widest border-2">
                    Mark Read
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
