
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, Search, Filter, Phone, 
  Mail, Calendar, ArrowUpRight, CheckCircle2,
  Clock, User, Info, MoreVertical, Reply,
  Zap
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CosmeticsEnquiryPage() {
  const enquiries = [
    { id: "ENQ-COS-101", user: "Sara Malik", subject: "Wholesale Inquiry", body: "Interested in stocking your glow serum at my boutique in London. Do you have bulk pricing tiers?", time: "2h ago", status: "Unread", priority: "High" },
    { id: "ENQ-COS-102", user: "Zaid Ali", subject: "Ingredient Verification", body: "Hi, can you confirm if the foundation base contains any animal-derived enzymes? My client has strict requirements.", time: "5h ago", status: "Responded", priority: "High" },
    { id: "ENQ-COS-103", user: "Emma K.", subject: "Collab Interest", body: "Love your branding! Would love to feature your rose water toner in my upcoming modest skincare vlog.", time: "Yesterday", status: "Pending", priority: "Medium" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-rose-600 font-black uppercase tracking-widest text-[10px]">
            <MessageSquare className="h-3 w-3" /> Brand Concierge
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Direct Enquiries</h1>
          <p className="text-muted-foreground font-medium">Respond to wholesale requests, ingredient queries, and influencer collaboration interests.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            Archive Read
          </Button>
          <Button className="bg-rose-600 hover:bg-rose-700 rounded-full px-8 font-black shadow-lg shadow-rose-200 h-12 text-white">
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
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer bg-rose-50 text-rose-600 border-none">All</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted border-border">High Priority</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted border-border">Unread</Badge>
          <Button variant="ghost" size="icon" className="rounded-full"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {enquiries.map((enq) => (
          <Card key={enq.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-rose-100">
            <div className="p-8 flex flex-col md:flex-row gap-10">
              <div className="md:w-48 shrink-0 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 font-black text-xs shadow-sm">
                    {enq.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-black text-foreground">{enq.user}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{enq.time}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Badge className={
                    enq.priority === 'High' ? 'bg-rose-50 text-rose-600 border-none px-2 h-6 flex items-center text-[9px] font-black uppercase' : 'bg-muted text-muted-foreground border-none px-2 h-6 flex items-center text-[9px] font-black uppercase'
                  }>
                    {enq.priority} Priority
                  </Badge>
                  <Badge variant="outline" className="text-[9px] uppercase font-black tracking-tighter border-rose-200 text-rose-600 h-6 px-2 flex items-center">
                    {enq.status}
                  </Badge>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-black text-foreground tracking-tight">{enq.subject}</h3>
                  <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="h-5 w-5 text-muted-foreground" /></Button>
                </div>
                <p className="text-muted-foreground font-medium leading-relaxed italic text-base">
                  "{enq.body}"
                </p>
                <div className="pt-6 flex gap-3">
                  <Button className="rounded-2xl h-12 px-8 font-black uppercase text-[10px] tracking-widest bg-rose-600 text-white shadow-lg shadow-rose-200">
                    <Reply className="mr-2 h-4 w-4" /> Reply to Lead
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
