"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  HeartPulse, Activity, ShieldCheck, Plus, 
  ArrowLeft, Search, Filter, MoreVertical,
  Stethoscope, Pill, Apple, Droplets,
  Calendar, Clock, User, CheckCircle2,
  Zap, Sparkles, TrendingUp, ChevronRight, ArrowUpRight
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function FamilyHealthPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-10 max-w-6xl pb-24 text-foreground">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-emerald-600 transition-colors w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Hub
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-14 w-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 shadow-inner">
              <HeartPulse className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl font-black font-headline tracking-tight">Family Wellness</h1>
              <p className="text-muted-foreground font-medium text-lg italic">Ethical health tracking and spiritual wellness logs for the circle.</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl px-6 font-black border-2 h-14 bg-card shadow-sm gap-2">
            <Activity className="h-4 w-4 text-teal-600" /> Vitals History
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 rounded-2xl px-8 font-black shadow-lg shadow-teal-200 h-14 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add Medical Log
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Member Summaries */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Member Health Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Zaid (Age 8)", status: "Vaccination Up-to-date", progress: 100, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50", sub: "Next: Annual Checkup (Jan)" },
              { name: "Sarah (Age 5)", status: "Next Vaccination Due", progress: 85, icon: Clock, color: "text-amber-600", bg: "bg-amber-50", sub: "Polio Booster (Due Dec 12)" },
            ].map((member, i) => (
              <Card key={i} className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6 group hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-teal-100">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 border-4 border-border shadow-md group-hover:scale-105 transition-transform">
                      <AvatarImage src={`https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&auto=format&q=80`} />
                      <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-black text-foreground">{member.name}</h3>
                      <p className={cn("text-[10px] font-black uppercase tracking-widest", member.color)}>{member.status}</p>
                    </div>
                  </div>
                  <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shadow-inner", member.bg, member.color)}>
                    <member.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground tracking-widest px-1">
                    <span>Overall Health Purity</span>
                    <span className="text-foreground">{member.progress}%</span>
                  </div>
                  <Progress value={member.progress} className="h-2 bg-muted" />
                </div>
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{member.sub}</p>
                  <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8 bg-muted hover:bg-teal-50 text-muted-foreground hover:text-teal-600 transition-all"><ArrowUpRight className="h-4 w-4" /></Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Upcoming Medical Events */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-foreground px-2 tracking-tight">Upcoming Wellness Events</h2>
            <div className="space-y-4">
              {[
                { title: "Hijama Therapy Session", date: "Saturday, 10:00 AM", member: "Ibrahim", icon: Droplets, color: "text-blue-600", bg: "bg-blue-50" },
                { title: "Annual Eye Exam", date: "Nov 15, 02:30 PM", member: "Fatima", icon: Stethoscope, color: "text-purple-600", bg: "bg-purple-50" },
              ].map((evt, i) => (
                <Card key={i} className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden group hover:shadow-lg transition-all border-2 border-transparent hover:border-teal-100 cursor-pointer">
                  <div className="p-6 flex items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform", evt.bg, evt.color)}>
                        <evt.icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-foreground">{evt.title}</h3>
                        <p className="text-sm font-bold text-muted-foreground">{evt.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">For Member</p>
                        <p className="text-sm font-black text-foreground">{evt.member}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Nutrition & Resources */}
        <div className="lg:col-span-4 space-y-10">
          
          {/* Purity & Nutrition Score */}
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                <Apple className="h-7 w-7" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xl font-black text-foreground">Family Nutrition</h3>
                <p className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Organic Focus</p>
              </div>
            </div>
            <div className="space-y-6">
              {[
                { label: "Sunnah Foods", val: 82, color: "bg-emerald-500" },
                { label: "Sugar-Free Days", val: 65, color: "bg-blue-500" },
                { label: "Water Intake", val: 90, color: "bg-teal-500" },
              ].map((n, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                    <span>{n.label}</span>
                    <span className="text-foreground">{n.val}% Goal</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all duration-1000", n.color)} style={{ width: `${n.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full rounded-2xl h-12 border-2 font-black text-[10px] uppercase tracking-widest">Update Diet Log</Button>
          </Card>

          {/* AI Health Insight */}
          <Card className="rounded-[2.5rem] border-none bg-teal-600 text-white p-10 space-y-6 relative overflow-hidden shadow-2xl">
            <Sparkles className="absolute -top-4 -right-4 h-24 w-24 opacity-10 text-white" />
            <div className="h-14 w-14 rounded-2xl bg-card/10 flex items-center justify-center shadow-inner border border-white/10">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-2 relative z-10">
              <h4 className="text-2xl font-black tracking-tight leading-tight">Seasonal Health Tip</h4>
              <p className="text-sm text-teal-50 leading-relaxed font-medium italic">
                "Winter is approaching. Increase the intake of organic dates and honey for your family's natural immunity boost."
              </p>
            </div>
            <Link href="/family-tree/discovery">
              <Button className="w-full bg-card text-teal-600 hover:bg-teal-50 rounded-2xl font-black text-xs uppercase h-14 shadow-xl">Source Ingredients</Button>
            </Link>
          </Card>

          {/* Secure Pharmacy Link */}
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6">
            <h3 className="text-xl font-black text-foreground">Pharmacy Connect</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-2xl border border-transparent hover:border-teal-100 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-card rounded-xl flex items-center justify-center text-teal-600 shadow-sm group-hover:scale-110 transition-transform">
                    <Pill className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-foreground leading-none">Amanah Pharmacy</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase mt-1">Verified Partner</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-teal-600 transition-all" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
