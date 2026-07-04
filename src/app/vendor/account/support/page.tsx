"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Headset, MessageSquare, LifeBuoy, FileText, 
  HelpCircle, Search, ExternalLink, ArrowRight,
  Phone, Mail, Globe, Zap, Clock, ShieldCheck,
  ChevronRight, ArrowUpRight, CheckCircle2
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AccountSupportPage() {
  const activeTickets = [
    { id: "TKT-9921", subject: "Verification status pending", status: "Under Review", date: "Nov 01, 2024", priority: "High" },
    { id: "TKT-9922", subject: "Update menu photos request", status: "Closed", date: "Oct 28, 2024", priority: "Medium" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Headset className="h-3 w-3" /> Partner Success
          </div>
          <h1 className="text-3xl font-black font-headline text-foreground">Vendor Support Center</h1>
          <p className="text-muted-foreground font-medium">Get assistance with audits, technical issues, or marketplace growth.</p>
        </div>
        <Button className="bg-primary rounded-full px-8 font-black shadow-lg shadow-primary/20 h-12 text-white">
          <MessageSquare className="mr-2 h-4 w-4" /> Open Support Ticket
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex flex-col justify-between group hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-primary/10">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                <LifeBuoy className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-foreground">Technical Help</h3>
                <p className="text-sm text-muted-foreground font-medium">Issues with QR menus, table ordering, or your dashboard.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground ml-auto mt-6 group-hover:text-primary transition-colors" />
            </Card>
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex flex-col justify-between group hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-primary/10">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-foreground">Audit & Verification</h3>
                <p className="text-sm text-muted-foreground font-medium">Help with certificate uploads, re-audits, and trust badges.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground ml-auto mt-6 group-hover:text-primary transition-colors" />
            </Card>
          </div>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-8 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black">Active Tickets</CardTitle>
              <Button variant="ghost" className="font-bold text-primary">All Tickets <ArrowUpRight className="ml-2 h-4 w-4" /></Button>
            </CardHeader>
            <CardContent className="p-0">
              {activeTickets.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {activeTickets.map((ticket) => (
                    <div key={ticket.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/50 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-black text-foreground">{ticket.id}</span>
                          <Badge variant="outline" className={
                            ticket.priority === 'High' ? 'bg-rose-50 text-rose-600 border-none px-2 text-[9px] font-black' : 'bg-muted text-muted-foreground border-none px-2 text-[9px] font-black'
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
                </div>
              ) : (
                <div className="p-20 text-center space-y-4">
                  <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">No active tickets</p>
                </div>
              )}
            </CardContent>
          </Card>

          <section className="space-y-6">
            <h2 className="text-xl font-black px-2 text-foreground">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "How do I update my Halal certificate?",
                "What are the digital ordering fees?",
                "How to change settlement account?",
                "Troubleshoot QR code scanning",
              ].map((faq, i) => (
                <div key={i} className="p-6 rounded-[2rem] bg-card border border-border flex items-center justify-between group cursor-pointer hover:shadow-md transition-all">
                  <span className="text-sm font-bold text-foreground">{faq}</span>
                  <HelpCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
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
                  Our vendor support agents are available Mon-Sat, 9AM to 6PM for urgent assistance.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-card/5 p-4 rounded-2xl border border-white/10">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-sm font-bold">+91 1800 555 0198</span>
                </div>
                <div className="flex items-center gap-4 bg-card/5 p-4 rounded-2xl border border-white/10">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-sm font-bold">vendors@halalhub.com</span>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 font-black text-xs uppercase tracking-widest shadow-xl">
                Chat With Us
              </Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6">
            <h3 className="text-xl font-black text-foreground">Knowledge Base</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted border border-transparent hover:border-primary/10 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-bold text-foreground">Vendor Handbook</span>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted border border-transparent hover:border-primary/10 transition-all cursor-pointer group">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-bold text-foreground">Halal Compliance FAQ</span>
              </div>
            </div>
          </Card>

          <div className="p-8 bg-primary/5 rounded-[2.5rem] border-2 border-dashed border-primary/20 text-center space-y-4">
            <div className="h-12 w-12 bg-card rounded-full flex items-center justify-center mx-auto text-primary shadow-sm">
              <Clock className="h-6 w-6" />
            </div>
            <p className="text-xs font-bold text-primary uppercase tracking-widest">Avg. Response Time</p>
            <p className="text-2xl font-black text-foreground">Under 2 Hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
