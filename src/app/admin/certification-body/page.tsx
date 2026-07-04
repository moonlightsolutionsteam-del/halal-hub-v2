"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ShieldCheck, Award, Users, FileText, 
  Search, Filter, MoreVertical, CheckCircle2,
  Calendar, Clock, Zap, ArrowUpRight,
  Landmark, Briefcase, Plus, Activity,
  Globe, LayoutGrid, Download, History,
  AlertTriangle, FlaskConical, Scale, Microscope,
  Settings, ExternalLink
} from "lucide-react"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function CertificationBodyDashboard() {
  const [activeTab, setActiveTab] = React.useState("dashboard")

  const clients = [
    { id: "CB-CL-001", name: "The Bosphorus Kitchen", vertical: "Dining", status: "Certified", expiry: "Dec 2024", rating: 4.9 },
    { id: "CB-CL-002", name: "Punjab Meats", vertical: "Butcher", status: "Renewal Pending", expiry: "Nov 2024", rating: 4.8 },
    { id: "CB-CL-003", name: "Pure Glow Beauty", vertical: "Cosmetics", status: "Certified", expiry: "Jan 2025", rating: 5.0 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-10 max-w-7xl pb-24 text-foreground">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Award className="h-3 w-3" /> Accredited Certification Body
          </div>
          <h1 className="text-4xl font-black font-headline text-foreground tracking-tight">Audit & Integrity Portal</h1>
          <p className="text-muted-foreground font-medium text-sm sm:text-lg italic max-w-2xl">Centralized management for business audits, certificate issuance, and compliance reporting.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl px-6 font-black border-2 h-14 bg-card shadow-sm gap-2">
            <History className="h-4 w-4 text-muted-foreground" /> Audit History
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-8 font-black shadow-lg shadow-primary/20 h-14 text-white">
            <Plus className="mr-2 h-4 w-4" /> New Certification
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex items-center justify-between bg-card p-2 rounded-2xl shadow-sm border overflow-x-auto no-scrollbar">
          <TabsList className="bg-transparent h-auto p-0 gap-1 flex justify-start min-w-max">
            {[
              { id: "dashboard", label: "Overview", icon: LayoutGrid },
              { id: "clients", label: "Managed Clients", icon: Users },
              { id: "audits", label: "Active Audits", icon: Microscope },
              { id: "certificates", label: "Certs Issued", icon: FileText },
              { id: "reports", label: "Compliance Reports", icon: Scale },
              { id: "billing", label: "Finance & Wallet", icon: Landmark }
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-primary px-6 py-2.5 font-bold transition-all shadow-none border-none whitespace-nowrap uppercase text-[10px] tracking-widest gap-2"
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-10 m-0 animate-in fade-in duration-500">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              { label: "Active Clients", value: "142", trend: "+12.4%", sub: "Monthly Growth", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Pending Audits", value: "8", trend: "High", sub: "Scheduled Week", icon: Microscope, color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Certs Issued", value: "842", trend: "99.8%", sub: "Validation Rate", icon: Award, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Net Revenue", value: "₹4.2M", trend: "+15.4%", sub: "Service Fees", icon: Landmark, color: "text-indigo-600", bg: "bg-indigo-50" },
            ].map((stat, i) => (
              <Card key={i} className="border-none shadow-sm rounded-[2.5rem] p-8 bg-card group hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">{stat.label}</span>
                    <div className="text-4xl font-black text-foreground tracking-tighter">{stat.value}</div>
                  </div>
                  <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="space-y-0.5 relative z-10">
                  <p className={cn("text-xs font-black uppercase", stat.color)}>{stat.trend}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{stat.sub}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <Card className="lg:col-span-8 rounded-[3rem] border-none shadow-sm bg-card overflow-hidden">
              <CardHeader className="p-10 border-b bg-muted/30 flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-black">Audit Pipeline</CardTitle>
                  <CardDescription className="italic font-medium text-base">Businesses currently undergoing verification audits.</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl font-black text-xs h-10 px-6 border-2 bg-card">Full Registry</Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow className="border-none">
                      <TableHead className="px-10 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Client / ID</TableHead>
                      <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Vertical</TableHead>
                      <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                      <TableHead className="text-right px-10 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client, i) => (
                      <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors group">
                        <TableCell className="px-10 py-6">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center font-black text-xs text-muted-foreground">
                              {client.name[0]}
                            </div>
                            <div>
                              <p className="font-black text-foreground text-sm tracking-tight">{client.name}</p>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">ID: {client.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-muted text-muted-foreground border-none font-black text-[9px] uppercase px-3 h-6 flex items-center w-fit">{client.vertical}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={cn(
                            "border-none font-black text-[9px] uppercase px-3 h-6 flex items-center w-fit",
                            client.status === 'Certified' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          )}>
                            {client.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-10">
                          <Button size="icon" variant="ghost" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"><ArrowUpRight className="h-4 w-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-10 space-y-8 relative overflow-hidden flex flex-col justify-between h-full">
                <div className="absolute top-0 right-0 p-6 opacity-5">
                  <Zap className="h-32 w-32 text-primary" />
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="h-16 w-16 bg-card/10 rounded-2xl flex items-center justify-center text-primary shadow-xl border border-white/10">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black tracking-tighter">Integrity Alert</h3>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed italic">
                      "3 clients have high-risk sourcing flags detected by the AI. Immediate manual audit required to maintain status."
                    </p>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 font-black uppercase text-xs tracking-widest shadow-xl relative z-10">
                  Open Risk Panel
                </Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        {["clients", "audits", "certificates", "reports", "billing"].map((tab) => (
          <TabsContent key={tab} value={tab} className="animate-in fade-in duration-500 m-0">
            <Card className="rounded-[3rem] border-none shadow-sm bg-card p-32 text-center space-y-8">
              <div className="h-24 w-24 rounded-[2rem] bg-muted flex items-center justify-center text-muted-foreground mx-auto shadow-inner">
                <Settings className="h-12 w-12 animate-spin-slow" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black text-foreground uppercase tracking-tighter">{tab.replace(/-/g, ' ')} Module</h3>
                <p className="text-muted-foreground font-medium max-w-md mx-auto italic text-lg leading-relaxed">
                  Advanced tactical control panel for certification lifecycle and organizational integrity audits.
                </p>
              </div>
              <Button variant="outline" className="rounded-2xl border-2 font-black px-12 h-14 uppercase text-xs tracking-[0.2em] hover:bg-muted">Refresh Dataset</Button>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Floating Return Button */}
      <Link href="/partner/portal">
        <button className="fixed bottom-8 right-8 w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group border-4 border-white active:scale-95">
          <div className="flex flex-col items-center">
            <ExternalLink className="h-6 w-6" />
            <span className="text-[8px] font-black uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Exit Portal</span>
          </div>
        </button>
      </Link>
    </div>
  )
}
