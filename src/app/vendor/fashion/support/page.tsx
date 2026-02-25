
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Headset, MessageSquare, LifeBuoy, ShieldCheck,
  Search, ExternalLink, ArrowRight, Phone,
  Mail, Clock, Zap, BookOpen, ChevronRight,
  ArrowUpRight, CheckCircle2, HelpCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function FashionSupportPage() {
  const activeTickets = [
    { id: "FSH-TKT-101", subject: "Modesty standards verification audit", status: "Under Review", date: "Nov 01, 2024", priority: "High" },
    { id: "FSH-TKT-102", subject: "Updating lookbook gallery layout", status: "Closed", date: "Oct 28, 2024", priority: "Medium" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-pink-600 font-black uppercase tracking-widest text-[10px]">
            <Headset className="h-3 w-3" /> Partner Success
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Brand Support Center</h1>
          <p className="text-muted-foreground font-medium">Get assistance with brand compliance, technical store issues, or marketing growth.</p>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700 rounded-full px-8 font-black shadow-lg shadow-pink-200 h-12 text-white">
          <MessageSquare className="mr-2 h-4 w-4" /> Open Support Ticket
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 flex flex-col justify-between group hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-pink-100">
              <div className="h-12 w-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900">Modesty Standards</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">Help with silhouette verification, fabric opacity audits, and ethical sourcing.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-300 ml-auto mt-6 group-hover:text-pink-600 transition-colors" />
            </Card>
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 flex flex-col justify-between group hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-pink-100">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                <LifeBuoy className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900">Technical Store Help</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">Issues with your SKU manager, inventory sync, or payment payouts.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-300 ml-auto mt-6 group-hover:text-blue-600 transition-colors" />
            </Card>
          </div>

          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="p-8 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black">Active Help Tickets</CardTitle>
              <Button variant="ghost" className="font-bold text-pink-600">All Tickets <ArrowUpRight className="ml-2 h-4 w-4" /></Button>
            </CardHeader>
            <CardContent className="p-0">
              {activeTickets.map((ticket) => (
                <div key={ticket.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-slate-900">{ticket.id}</span>
                      <Badge variant="outline" className={
                        ticket.priority === 'High' ? 'bg-red-50 text-rose-600 border-none px-2 text-[9px] font-black' : 'bg-slate-50 text-slate-600 border-none px-2 text-[9px] font-black'
                      }>
                        {ticket.priority} PRIORITY
                      </Badge>
                    </div>
                    <p className="font-bold text-slate-700 text-base">{ticket.subject}</p>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Created: {ticket.date}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <Badge className={ticket.status === 'Closed' ? 'bg-slate-100 text-slate-400 border-none' : 'bg-blue-50 text-blue-600 border-none'}>
                      {ticket.status}
                    </Badge>
                    <Button size="icon" variant="ghost" className="rounded-xl"><ChevronRight className="h-5 w-5 text-slate-300" /></Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <section className="space-y-6">
            <h2 className="text-xl font-black px-2 text-slate-900">Brand Knowledge Base</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Setting up your lookbook layout",
                "Modesty silhouettes criteria guide",
                "Syncing inventory with global hubs",
                "Shipping and packaging standards",
              ].map((faq, i) => (
                <div key={i} className="p-6 rounded-[2rem] bg-white border border-slate-100 flex items-center justify-between group cursor-pointer hover:shadow-md transition-all">
                  <span className="text-sm font-bold text-slate-700">{faq}</span>
                  <HelpCircle className="h-4 w-4 text-slate-300 group-hover:text-pink-600 transition-colors" />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Zap className="h-24 w-24" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black font-headline">Live Concierge</h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">
                  Our brand support agents are available Mon-Sat, 9AM to 6PM for urgent operational assistance.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <Phone className="h-5 w-5 text-pink-600" />
                  <span className="text-sm font-bold">+91 1800 555 0198</span>
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <Mail className="h-5 w-5 text-pink-600" />
                  <span className="text-sm font-bold">fashion-support@halalhub.com</span>
                </div>
              </div>
              <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white rounded-2xl h-14 font-black text-xs uppercase tracking-widest shadow-xl">
                Chat With Us
              </Button>
            </div>
          </Card>

          <div className="p-8 bg-pink-50 rounded-[2.5rem] border-2 border-dashed border-pink-100 text-center space-y-4">
            <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center mx-auto text-pink-600 shadow-sm">
              <Clock className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-pink-600 uppercase tracking-widest">Avg. Response Time</p>
            <p className="text-2xl font-black text-slate-900">Under 1 Hour</p>
          </div>
        </div>
      </div>
    </div>
  );
}
