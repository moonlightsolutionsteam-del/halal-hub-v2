
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

export default function CosmeticsSupportPage() {
  const activeTickets = [
    { id: "COS-TKT-101", subject: "Lab report verification status", status: "Under Review", date: "Nov 01, 2024", priority: "High" },
    { id: "COS-TKT-102", subject: "Updating ingredient list help", status: "Closed", date: "Oct 28, 2024", priority: "Medium" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-rose-600 font-black uppercase tracking-widest text-[10px]">
            <Headset className="h-3 w-3" /> Partner Success
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Brand Support Center</h1>
          <p className="text-muted-foreground font-medium">Get assistance with formulation audits, technical store issues, or marketing growth.</p>
        </div>
        <Button className="bg-rose-600 hover:bg-rose-700 rounded-full px-8 font-black shadow-lg shadow-rose-200 h-12 text-white">
          <MessageSquare className="mr-2 h-4 w-4" /> Open Support Ticket
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex flex-col justify-between group hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-rose-100">
              <div className="h-12 w-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-foreground">Lab & Audit</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">Help with lab report verification, ingredient analysis, and purity trust badges.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground ml-auto mt-6 group-hover:text-rose-600 transition-colors" />
            </Card>
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex flex-col justify-between group hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-rose-100">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                <LifeBuoy className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-foreground">Technical Help</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">Issues with your SKU manager, inventory sync, or marketplace payouts.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground ml-auto mt-6 group-hover:text-blue-600 transition-colors" />
            </Card>
          </div>

          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
            <CardHeader className="p-8 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black">Active Help Tickets</CardTitle>
              <Button variant="ghost" className="font-bold text-rose-600">All Tickets <ArrowUpRight className="ml-2 h-4 w-4" /></Button>
            </CardHeader>
            <CardContent className="p-0">
              {activeTickets.map((ticket) => (
                <div key={ticket.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/50 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-foreground">{ticket.id}</span>
                      <Badge variant="outline" className={
                        ticket.priority === 'High' ? 'bg-red-50 text-rose-600 border-none px-2 text-[9px] font-black' : 'bg-muted text-muted-foreground border-none px-2 text-[9px] font-black'
                      }>
                        {ticket.priority} PRIORITY
                      </Badge>
                    </div>
                    <p className="font-bold text-foreground text-base">{ticket.subject}</p>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Created: {ticket.date}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <Badge className={ticket.status === 'Closed' ? 'bg-muted text-muted-foreground border-none' : 'bg-blue-50 text-blue-600 border-none'}>
                      {ticket.status}
                    </Badge>
                    <Button size="icon" variant="ghost" className="rounded-xl"><ChevronRight className="h-5 w-5 text-muted-foreground" /></Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <section className="space-y-6">
            <h2 className="text-xl font-black px-2 text-foreground">Brand Knowledge Base</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Setting up your product Swatches",
                "Ingredient analysis criteria guide",
                "Lab audit preparation requirements",
                "Shipping standards for liquids",
              ].map((faq, i) => (
                <div key={i} className="p-6 rounded-[2rem] bg-card border border-border flex items-center justify-between group cursor-pointer hover:shadow-md transition-all">
                  <span className="text-sm font-bold text-foreground">{faq}</span>
                  <HelpCircle className="h-4 w-4 text-muted-foreground group-hover:text-rose-600 transition-colors" />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Zap className="h-24 w-24" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black font-headline">Live Concierge</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  Our beauty support agents are available Mon-Sat, 9AM to 6PM for urgent audit assistance.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-card/5 p-4 rounded-2xl border border-white/10">
                  <Phone className="h-5 w-5 text-rose-600" />
                  <span className="text-sm font-bold">+91 1800 555 0198</span>
                </div>
                <div className="flex items-center gap-4 bg-card/5 p-4 rounded-2xl border border-white/10">
                  <Mail className="h-5 w-5 text-rose-600" />
                  <span className="text-sm font-bold">beauty-support@halalhub.com</span>
                </div>
              </div>
              <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-2xl h-14 font-black text-xs uppercase tracking-widest shadow-xl">
                Chat With Us
              </Button>
            </div>
          </Card>

          <div className="p-8 bg-rose-50 rounded-[2.5rem] border-2 border-dashed border-rose-100 text-center space-y-4">
            <div className="h-12 w-12 bg-card rounded-full flex items-center justify-center mx-auto text-rose-600 shadow-sm">
              <Clock className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-rose-600 uppercase tracking-widest">Avg. Response Time</p>
            <p className="text-2xl font-black text-foreground">Under 1 Hour</p>
          </div>
        </div>
      </div>
    </div>
  );
}
