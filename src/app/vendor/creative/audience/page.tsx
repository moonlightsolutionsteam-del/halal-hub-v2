"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, Search, Filter, TrendingUp, 
  MapPin, Globe, Star, Heart, 
  ChevronRight, ArrowLeft, MoreVertical,
  Zap, PieChart, BarChart3, UserCheck,
  UserPlus, Mail, Share2
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { cn } from "@/lib/utils"

const TOP_FANS = [
  { id: 1, name: "Aisha Malik", status: "Super Fan", engagement: 98, img: "av1" },
  { id: 2, name: "Zaid Ali", status: "Supporter", engagement: 85, img: "av2" },
  { id: 3, name: "Sarah Siddiqui", status: "Giver", engagement: 74, img: "av3" },
];

export default function CreativeAudiencePage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-10 max-w-6xl pb-24 text-foreground">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <Link href="/vendor/creative/dashboard" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
              <Users className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl font-black font-headline tracking-tight text-foreground">Subscriber Base</h1>
              <p className="text-muted-foreground font-medium text-lg italic">Understand your community and engage with your top supporters.</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl px-6 font-black border-2 h-14 bg-card shadow-sm gap-2">
            <Mail className="h-4 w-4 text-primary" /> Community Message
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-8 font-black shadow-lg shadow-primary/20 h-14 text-white">
            <UserPlus className="mr-2 h-4 w-4" /> Growth Campaigns
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Community", value: "125k", trend: "+2.4k", sub: "New This Week", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Retention Rate", value: "92%", trend: "High", sub: "Last 30 Days", icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Global Presence", value: "42", trend: "Countries", sub: "Top: UK, UAE", icon: Globe, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Loyalty Score", value: "A+", trend: "Elite", sub: "Network Trust", icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[2.5rem] p-8 bg-card group hover:shadow-xl transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">{stat.label}</span>
                <div className="text-4xl font-black text-foreground tracking-tighter">{stat.value}</div>
              </div>
              <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="space-y-0.5">
              <p className={cn("text-xs font-black uppercase", stat.color)}>{stat.trend}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{stat.sub}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* Demographic Map Card */}
          <Card className="rounded-[3rem] border-none shadow-sm bg-card overflow-hidden h-[450px] relative">
            <CardHeader className="p-5 sm:p-10 border-b bg-muted/30 flex flex-row items-center justify-between relative z-10">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-black">Audience Demographics</CardTitle>
                <CardDescription className="italic font-medium">Where your community is growing the fastest.</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl font-black text-xs h-9 bg-card">Full Map</Button>
            </CardHeader>
            <div className="absolute inset-0 flex items-center justify-center pt-24">
              <Globe className="h-64 w-64 text-card animate-spin-slow" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white/40" />
              <div className="relative z-10 grid grid-cols-2 gap-12">
                {[
                  { region: "Europe", count: "45k", perc: 85, color: "bg-blue-500" },
                  { region: "Middle East", count: "38k", perc: 72, color: "bg-emerald-500" },
                  { region: "South Asia", count: "24k", perc: 64, color: "bg-purple-500" },
                  { region: "N. America", count: "18k", perc: 45, color: "bg-amber-500" },
                ].map((reg, i) => (
                  <div key={i} className="space-y-2 text-center w-32">
                    <p className="text-sm font-black text-foreground">{reg.region}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{reg.count} Members</p>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all duration-1000", reg.color)} style={{ width: `${reg.perc}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Top Fans Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-foreground tracking-tight">Top Supporters</h3>
              <Zap className="h-5 w-5 text-amber-500 fill-current" />
            </div>
            <div className="space-y-6">
              {TOP_FANS.map((fan) => (
                <div key={fan.id} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-border shadow-md group-hover:scale-105 transition-transform">
                      <AvatarImage src={`https://picsum.photos/seed/fan-${fan.img}/100/100`} />
                      <AvatarFallback>{fan.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-black text-foreground">{fan.name}</p>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground border-none font-black text-[8px] uppercase tracking-widest px-2 h-5 flex items-center">{fan.status}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-primary">{fan.engagement}%</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">Engaged</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full font-black text-xs uppercase tracking-widest text-muted-foreground hover:text-primary h-12 rounded-xl border-2 border-dashed border-border">View Full Fan-base</Button>
          </Card>

          <Card className="rounded-[2.5rem] border-none bg-zinc-900 text-white p-10 space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Share2 className="h-24 w-24 text-primary" />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-card/10 flex items-center justify-center text-primary shadow-xl border border-white/10">
                <UserPlus className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black tracking-tight leading-tight">Subscriber Blast</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed italic">
                Send a personalized newsletter or "Notice Board" update to your entire 125k community.
              </p>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 font-black text-xs uppercase tracking-widest shadow-xl relative z-10">Compose Broadcast</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
