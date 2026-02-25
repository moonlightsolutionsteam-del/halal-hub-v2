
"use client"

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

export default function FinanceLeadsPage() {
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
          <h1 className="text-3xl font-black font-headline text-slate-900">Investor Leads</h1>
          <p className="text-muted-foreground font-medium">Manage incoming investment queries, SME fund applications, and client enquiries.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            Archive Read
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-8 font-black shadow-lg shadow-indigo-200 h-12 text-white">
            Auto-Response AI
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2.5rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search leads by name or subject..." className="pl-9 h-11 rounded-2xl bg-slate-50 border-none font-medium" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer hover:bg-indigo-600 hover:text-white transition-all">All</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted border-slate-200">Urgent</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted border-slate-200">New</Badge>
          <Button variant="ghost" size="icon" className="rounded-full"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {leads.map((lead) => (
          <Card key={lead.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-indigo-100">
            <div className="p-8 flex flex-col md:flex-row gap-10">
              <div className="md:w-48 shrink-0 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-xs shadow-sm">
                    {lead.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">{lead.user}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{lead.time}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Badge className={
                    lead.priority === 'High' ? 'bg-rose-50 text-rose-600 border-none px-2 h-6 flex items-center text-[9px] font-black uppercase' : 'bg-slate-50 text-slate-600 border-none px-2 h-6 flex items-center text-[9px] font-black uppercase'
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
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">{lead.subject}</h3>
                  <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="h-5 w-5 text-slate-300" /></Button>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed italic text-base">
                  "{lead.body}"
                </p>
                <div className="pt-6 flex gap-3">
                  <Button className="rounded-2xl h-12 px-8 font-black uppercase text-[10px] tracking-widest bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                    <Reply className="mr-2 h-4 w-4" /> Reply to Lead
                  </Button>
                  <Button variant="outline" className="rounded-2xl h-12 px-8 font-black uppercase text-[10px] tracking-widest border-2">
                    Send Prospectus
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
