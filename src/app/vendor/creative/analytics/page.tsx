
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, BarChart3, PieChart, Activity, 
  ArrowUpRight, ArrowDownRight, Search, Filter,
  Clock, Calendar, Globe, Zap, Smartphone,
  Play, MousePointer2, Users, ArrowLeft,
  Download, Share2
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function CreativeAnalyticsPage() {
  return (
    <div className="container mx-auto p-6 space-y-10 max-w-6xl pb-24 text-slate-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <Link href="/vendor/creative/dashboard" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <TrendingUp className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl font-black font-headline tracking-tight text-slate-900">Growth & Insights</h1>
              <p className="text-muted-foreground font-medium text-lg italic">Data-driven performance analysis across the global Hub network.</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl px-6 font-black border-2 h-14 bg-white shadow-sm gap-2">
            <Download className="h-4 w-4 text-slate-400" /> Export PDF
          </Button>
          <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-8 font-black shadow-lg h-14 text-white">
            <Share2 className="mr-2 h-4 w-4" /> Share Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Main Chart Placeholder */}
          <Card className="rounded-[3rem] border-none shadow-sm bg-white overflow-hidden h-[500px] flex items-center justify-center text-slate-300 font-medium italic p-10 relative">
            <div className="absolute top-10 left-10 space-y-1">
              <h3 className="text-2xl font-black text-slate-900">Reach Velocity</h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Impressions vs Engagement</p>
            </div>
            <div className="text-center space-y-4">
              <BarChart3 className="h-32 w-32 mx-auto opacity-10" />
              <p className="text-xl max-w-sm mx-auto">[ High-Fidelity Interaction Chart: Engagement Flux ]</p>
            </div>
            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <div className="flex gap-8">
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase text-slate-400">Monthly Reach</p>
                  <p className="text-2xl font-black text-slate-900">1.2M</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase text-slate-400">Total Interactions</p>
                  <p className="text-2xl font-black text-primary">842k</p>
                </div>
              </div>
              <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] px-3 h-6 flex items-center">+12% GROWTH</Badge>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-8">
              <h3 className="text-xl font-black flex items-center gap-2"><Smartphone className="h-5 w-5 text-blue-500" /> Source Traffic</h3>
              <div className="space-y-6">
                {[
                  { label: "Studio Feed", val: 65, color: "bg-blue-500" },
                  { label: "Community Shares", val: 25, color: "bg-purple-500" },
                  { label: "External Links", val: 10, color: "bg-emerald-500" },
                ].map((s, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <span>{s.label}</span>
                      <span className="text-slate-900">{s.val}%</span>
                    </div>
                    <Progress value={s.val} className={cn("h-1.5", s.color.replace('bg-', 'bg-opacity-20 bg-'))} />
                  </div>
                ))}
              </div>
            </Card>
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-8">
              <h3 className="text-xl font-black flex items-center gap-2"><Clock className="h-5 w-5 text-amber-500" /> Peak Engagement</h3>
              <div className="space-y-6">
                {[
                  { label: "Morning (Fajr-Dhuhr)", val: 15, color: "bg-slate-200" },
                  { label: "Afternoon (Asr-Maghrib)", val: 42, color: "bg-amber-400" },
                  { label: "Night (Isha-Midnight)", val: 43, color: "bg-slate-900" },
                ].map((s, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <span>{s.label}</span>
                      <span className="text-slate-900">{s.val}%</span>
                    </div>
                    <Progress value={s.val} className={cn("h-1.5", s.color)} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-10 space-y-8 relative overflow-hidden">
            <Zap className="absolute top-0 right-0 p-4 h-24 w-24 opacity-10 text-primary" />
            <div className="relative z-10 space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center text-primary shadow-xl border border-white/10">
                <Activity className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black font-headline">Retention Insight</h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed italic">
                  "Your educational series has a 94% retention rate in the first 30 seconds. Consider expanding your 'Sunnah Living' vlog category."
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Top Performing Format</p>
                <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px] px-4 h-7 flex items-center uppercase tracking-widest">STUDIO REELS</Badge>
              </div>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-8">
            <h3 className="text-xl font-black text-slate-900">Interaction Points</h3>
            <div className="space-y-6">
              {[
                { name: "Saves", val: "12.4k", color: "text-blue-600", bg: "bg-blue-50" },
                { name: "Comments", val: "1.2k", color: "text-purple-600", bg: "bg-purple-50" },
                { name: "Profile Clicks", val: "45k", color: "text-emerald-600", bg: "bg-emerald-50" },
                { name: "Shares", val: "8.5k", color: "text-rose-600", bg: "bg-rose-50" },
              ].map((point, i) => (
                <div key={i} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-4">
                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform", point.bg, point.color)}>
                      <MousePointer2 className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-black text-slate-700">{point.name}</span>
                  </div>
                  <span className="text-lg font-black text-slate-900">{point.val}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
