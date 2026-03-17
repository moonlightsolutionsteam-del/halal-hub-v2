
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Video, Mic, Play, Users, 
  Star, TrendingUp, MessageSquare, Plus,
  ArrowUpRight, PlusCircle, Settings,
  Zap, Sparkles, Share2, Wallet,
  CheckCircle2, Film
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

export default function CreatorRolePage() {
  const kpis = [
    { label: "Earnings (Month)", value: "₹65,000", trend: "+12.4%", icon: Wallet },
    { label: "Total Reach", value: "1.2M", trend: "Last 30 days", icon: Play },
    { label: "Subscribers", value: "125k", trend: "+2.4k this week", icon: Users },
    { label: "Active Deals", value: "4", icon: TagIcon },
  ];

  return (
    <div className="container mx-auto p-6 space-y-10 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px]">
            <Video className="h-3 w-3" /> Impact Studio
          </div>
          <h1 className="text-4xl font-black font-headline text-slate-900 tracking-tight">Creator Dashboard</h1>
          <p className="text-muted-foreground font-medium text-lg">Manage your content, brand deals, and audience growth.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-8 font-black border-2 h-14">
            Studio Settings
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 font-black shadow-lg shadow-blue-200 h-14 text-white">
            <Plus className="mr-2 h-4 w-4" /> Upload Content
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[2rem] bg-white p-2 group hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{kpi.label}</span>
              <kpi.icon className="h-4 w-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900 tracking-tighter">{kpi.value}</div>
              <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase tracking-tight">{kpi.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="p-8 flex flex-row items-center justify-between border-b">
              <CardTitle className="text-xl font-black">Production Pipeline</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600 font-black text-[10px] uppercase tracking-widest">Manage All <ArrowUpRight className="ml-1 h-3 w-3" /></Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableBody>
                  {[
                    { title: "Ramadan Morning Routine", type: "Reel", status: "Editing", deadline: "In 2 days" },
                    { title: "Halal Food Tour: Delhi", type: "Vlog", status: "Planning", deadline: "Dec 15" },
                    { title: "Podcast Ep 12: Modern Fiqh", type: "Audio", status: "Published", deadline: "Done" },
                  ].map((proj, i) => (
                    <TableRow key={i} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="px-8 py-6">
                        <p className="font-black text-slate-900 text-base">{proj.title}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{proj.type}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none font-black text-[9px] uppercase px-3">{proj.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right px-8 font-black text-slate-400 text-xs">
                        {proj.deadline}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-12 overflow-hidden relative">
            <Zap className="absolute -bottom-4 -right-4 h-48 w-48 opacity-10 text-blue-600" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-4xl font-black tracking-tight">Monetize Your Influence</h2>
                  <p className="text-slate-400 font-medium text-lg leading-relaxed">
                    Connect with 100+ verified halal brands looking for authentic creators like you.
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-16 px-10 font-black uppercase text-sm tracking-widest shadow-2xl">
                  Browse Brand Deals
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                  <p className="text-3xl font-black text-emerald-400">12</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Leads</p>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                  <p className="text-3xl font-black text-blue-400">₹45k</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pending Payout</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
            <h3 className="text-xl font-black text-slate-900">Audience Insights</h3>
            <div className="space-y-6">
              {[
                { label: "Male / Female", current: "42% / 58%", val: 58 },
                { label: "Engagement Rate", current: "8.4%", val: 84 },
                { label: "Growth Retention", current: "92%", val: 92 },
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-500">{stat.label}</span>
                    <span className="text-blue-600">{stat.current}</span>
                  </div>
                  <Progress value={stat.val} className="h-1.5 bg-slate-50" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Latest Collaboration</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="p-4 bg-blue-50/50 rounded-2xl border-2 border-blue-100 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-blue-600 font-black text-xs shadow-sm">BK</div>
                  <div>
                    <p className="text-sm font-black text-slate-800">Bosphorus Kitchen</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Campaign: Winter Special</p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 font-medium italic line-clamp-2 leading-relaxed">
                  "Deliver 1x High-Fidelity Reel showcasing the new Wagyu platter. Target reach: 50k views..."
                </p>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-[10px] h-9 uppercase">Update Draft</Button>
                  <Button size="sm" variant="ghost" className="flex-1 rounded-xl font-black text-[10px] h-9 uppercase">Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42l-8.704-8.704Z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  )
}
