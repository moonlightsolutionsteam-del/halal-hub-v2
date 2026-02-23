
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, Mic, Video, PenTool, 
  Star, Tag, Users, AlertCircle,
  ArrowUpRight, PlusCircle, Settings,
  Clock, MapPin, CheckCircle2, TrendingUp,
  MessageSquare, Play, Film
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
    { label: "Audience", icon: Users, color: "text-slate-500", bg: "bg-slate-50" },
    { label: "Settings", icon: Settings, color: "text-slate-500", bg: "bg-slate-50" },
  ];

  return (
    <div className="p-8 space-y-8 bg-[#F8FBF9] min-h-screen">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-slate-900">Creative Studio Dashboard</h1>
        <p className="text-muted-foreground font-medium opacity-60">Manage your digital content, production pipeline, and audience growth.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl bg-white p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{kpi.label}</span>
              <kpi.icon className={`h-4 w-4 ${kpi.variant === 'destructive' ? 'text-red-400' : 'text-slate-300'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-black ${kpi.variant === 'destructive' ? 'text-red-600' : 'text-slate-800'}`}>
                {kpi.value}
              </div>
              <p className={`text-[10px] font-bold mt-1 uppercase tracking-tight ${kpi.variant === 'destructive' ? 'text-red-400' : 'text-slate-400'}`}>
                {kpi.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="p-8 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black">Active Production Projects</CardTitle>
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-6 h-10">
                Studio View <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Project / ID</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Lead</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Type</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentProjects.map((proj, i) => (
                    <TableRow key={i} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="px-8 py-5">
                        <div className="font-bold text-slate-800 text-sm">{proj.title}</div>
                        <div className="text-[9px] font-bold text-muted-foreground uppercase">{proj.id}</div>
                      </TableCell>
                      <TableCell className="font-bold text-slate-600 text-xs">{proj.lead}</TableCell>
                      <TableCell className="font-bold text-slate-500 text-sm">{proj.type}</TableCell>
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

          <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="px-0 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {quickActions.map((action, i) => (
                <button key={i} className="group flex flex-col items-center justify-center p-6 bg-slate-50/50 rounded-[2rem] hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-primary/10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-tighter text-center">{action.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Platform Growth</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              {[
                { name: "YouTube", status: "Bestseller", val: 95 },
                { name: "Podcast Subs", status: "Rising", val: 78 },
                { name: "Halal Hub Feed", status: "High Interest", val: 82 },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-500">{item.name}</span>
                    <span className="text-emerald-500">{item.status}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-primary transition-all`}
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-primary text-primary-foreground p-8 overflow-hidden relative">
            <Mic className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-black">Monetize Your Influence?</h3>
              <p className="text-sm font-medium opacity-80 leading-relaxed">
                Connect with halal brands for official sponsorships and grow your revenue by 40% this quarter.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs uppercase tracking-widest">Brand Deals</Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Latest Top Reel</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="p-4 bg-muted/30 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-white rounded-xl overflow-hidden shadow-sm">
                    <img src="https://picsum.photos/seed/reel/100/100" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800">Islamic Morning Routine</p>
                    <p className="text-[10px] text-muted-foreground font-bold">12k views • 4h ago</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-black">98% Positive</span>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] uppercase">Viral</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
