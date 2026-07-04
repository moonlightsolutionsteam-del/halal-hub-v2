"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, Mic, Video, PenTool, 
  Star, Tag, Users, AlertCircle,
  ArrowUpRight, PlusCircle, Settings,
  Clock, MapPin, CheckCircle2, TrendingUp,
  MessageSquare, Play, Film, LayoutGrid
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { cn } from "@/lib/utils"

export default function CreativeDashboard() {
  const kpis = [
    { label: "Revenue (Month)", value: "₹65,000", trend: "+12.4%", icon: Wallet },
    { label: "Total Subscribers", value: "125k", trend: "+2.4k this week", icon: Users },
    { label: "Active Projects", value: "8", trend: "3 in production", icon: Video },
    { label: "Total Views", value: "1.2M", trend: "Last 30 days", icon: Play },
    { label: "Avg. Rating", value: "4.9", trend: "from 850 reviews", icon: Star },
    { label: "Campaigns", value: "4", trend: "Active sponsorships", icon: Tag },
    { label: "Comments", value: "450", trend: "+85 today", icon: MessageSquare },
    { label: "Storage Used", value: "82%", trend: "4.2TB / 5TB", icon: Film, variant: "warning" as const },
  ];

  const recentProjects = [
    { id: "PROJ-101", title: "Ramadan Vlog Series", lead: "Zaid Ali", type: "Video", status: "Editing" },
    { id: "PROJ-102", title: "Sunnah Podcast Ep 12", lead: "Omar Farooq", type: "Audio", status: "Published" },
    { id: "PROJ-103", title: "Islamic Art Workshop", lead: "Fatima K.", type: "Digital Art", status: "Planning" },
  ];

  const quickActions = [
    { label: "Upload Content", icon: PlusCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "New Project", icon: Video, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Podcast Mic", icon: Mic, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Analytics", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Audience", icon: Users, color: "text-muted-foreground", bg: "bg-muted" },
    { label: "Settings", icon: Settings, color: "text-muted-foreground", bg: "bg-muted" },
  ];

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-foreground uppercase tracking-tighter">Studio Control Room</h1>
        <p className="text-muted-foreground font-medium opacity-60">Manage your digital media ecosystem, production pipeline, and audience growth.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl bg-card p-2 group hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">{kpi.label}</span>
              <kpi.icon className={cn("h-4 w-4", kpi.variant === 'destructive' ? 'text-red-400' : 'text-muted-foreground group-hover:text-primary transition-colors')} />
            </CardHeader>
            <CardContent>
              <div className={cn("text-3xl font-black", kpi.variant === 'destructive' ? 'text-red-600' : 'text-foreground')}>
                {kpi.value}
              </div>
              <p className={cn("text-[10px] font-bold mt-1 uppercase tracking-tight", kpi.variant === 'destructive' ? 'text-red-400' : 'text-emerald-600')}>
                {kpi.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-card">
            <CardHeader className="p-8 flex flex-row items-center justify-between bg-muted/30 border-b">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black">Active Production Pipeline</CardTitle>
                <p className="text-sm font-medium text-muted-foreground">Content currently in editing or planning phases.</p>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-6 h-10 shadow-lg shadow-primary/20 text-white">
                Studio View <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Project / ID</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Lead</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Type</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentProjects.map((proj, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-8 py-5">
                        <div className="font-bold text-foreground text-sm">{proj.title}</div>
                        <div className="text-[9px] font-bold text-muted-foreground uppercase">{proj.id}</div>
                      </TableCell>
                      <TableCell className="font-bold text-muted-foreground text-xs">{proj.lead}</TableCell>
                      <TableCell className="font-bold text-muted-foreground text-sm">{proj.type}</TableCell>
                      <TableCell className="text-right px-8">
                        <Badge variant="outline" className="rounded-full px-4 text-[9px] font-black uppercase border-primary/20 text-primary bg-primary/5">
                          {proj.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="px-0 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {quickActions.map((action, i) => (
                <button key={i} className="group flex flex-col items-center justify-center p-6 bg-muted/50 rounded-[2rem] hover:bg-card hover:shadow-md transition-all border border-transparent hover:border-primary/10 shadow-inner">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-sm transition-transform group-hover:scale-110", action.bg, action.color)}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black text-foreground uppercase tracking-tighter text-center leading-tight">{action.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Platform Reach Velocity</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              {[
                { name: "YouTube", status: "Lead Platform", val: 95, color: "bg-red-500" },
                { name: "Podcast Subs", status: "Rising", val: 78, color: "bg-purple-500" },
                { name: "Halal Hub Feed", status: "Steady", val: 82, color: "bg-emerald-500" },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="text-emerald-500">{item.status}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full transition-all duration-1000", item.color)}
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-10 overflow-hidden relative">
            <Mic className="absolute -top-4 -right-4 h-24 w-24 opacity-10 text-primary" />
            <div className="relative z-10 space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-card/10 flex items-center justify-center text-primary shadow-xl border border-white/10">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight leading-tight">Monetize Content</h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed italic">
                  Connect with vetted halal brands for official sponsorships and grow your studio revenue by up to 40%.
                </p>
              </div>
              <Button variant="secondary" className="w-full rounded-2xl h-14 font-black text-xs uppercase tracking-widest shadow-2xl bg-card text-foreground hover:bg-muted">Browse Brand Deals</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
