"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Eye, Users, Star, Handshake, ArrowUpRight, Bell,
  CheckCircle2, Zap, Briefcase, MapPin, TrendingUp,
  MessageSquare, UserPlus, Award, ChevronRight, Search,
  Globe, Lightbulb
} from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const CONNECTIONS = [
  { name: "Fatima Al-Rashid", role: "Marketing Director · Dubai", mutual: 12, avatar: "1" },
  { name: "Omar Siddiqui", role: "Founder · London", mutual: 8, avatar: "2" },
  { name: "Aisha Malik", role: "UX Designer · Toronto", mutual: 5, avatar: "3" },
]

const OPPORTUNITIES = [
  { title: "Senior Brand Consultant", company: "Halal Foods Co.", type: "Freelance", location: "Remote", match: 94 },
  { title: "Islamic Finance Advisor", company: "AmanaBank", type: "Full-time", location: "Dubai", match: 88 },
  { title: "Brand Strategy Lead", company: "Muslim Pro", type: "Contract", location: "Remote", match: 82 },
]

const ACTIVITY = [
  { text: "Amira Hassan viewed your profile", time: "2m ago", icon: Eye, color: "text-violet-600 bg-violet-50" },
  { text: "New connection request from Khalid Omar", time: "15m ago", icon: UserPlus, color: "text-blue-600 bg-blue-50" },
  { text: "Ibrahim Al-Farsi recommended you", time: "1h ago", icon: Star, color: "text-amber-600 bg-amber-50" },
  { text: "Nour Designs sent a collaboration invite", time: "3h ago", icon: Handshake, color: "text-emerald-600 bg-emerald-50" },
  { text: "Your profile appeared in 48 searches", time: "Today", icon: Search, color: "text-indigo-600 bg-indigo-50" },
]

export default function ProfessionalDashboardPage() {
  const [showBoostModal, setShowBoostModal] = useState(false)
  const profileCompletion = 74

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <Users className="h-3 w-3" /> Pro Network
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Good morning, Yusuf</h1>
          <p className="text-sm font-bold text-muted-foreground">Your professional presence is growing. Here's what's happening.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl font-bold h-11 border-2 border-violet-200 text-violet-600 hover:bg-violet-50" onClick={() => setShowBoostModal(true)}>
            <Zap className="h-4 w-4 mr-2" /> Boost Profile
          </Button>
          <Link href="/vendor/professional/opportunities">
            <Button className="bg-violet-600 hover:bg-violet-700 rounded-2xl font-black h-11 text-white">
              <Search className="h-4 w-4 mr-2" /> Find Opportunities
            </Button>
          </Link>
        </div>
      </div>

      {/* Profile Completion Banner */}
      <Card className="rounded-[2rem] border-none shadow-sm bg-gradient-to-r from-violet-600 to-violet-700 text-white p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex items-center gap-4 flex-1">
            <Avatar className="h-16 w-16 ring-4 ring-white/30">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format&q=80" />
              <AvatarFallback className="bg-white/20 text-white font-black text-xl">YQ</AvatarFallback>
            </Avatar>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-black text-lg">Profile Completion</p>
                <Badge className="bg-white/20 text-white border-none font-black text-xs">{profileCompletion}%</Badge>
              </div>
              <Progress value={profileCompletion} className="h-2 bg-white/20 [&>div]:bg-white" />
              <p className="text-sm text-white/80 font-medium">Add your portfolio to reach 90% and unlock Premium visibility</p>
            </div>
          </div>
          <Link href="/vendor/professional/portfolio">
            <Button className="bg-white text-violet-700 hover:bg-white/90 rounded-2xl font-black h-11 shrink-0">
              Complete Profile <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Profile Views", value: "1,284", sub: "+38% this week", icon: Eye, color: "bg-violet-50 text-violet-600" },
          { label: "Connections", value: "347", sub: "+12 pending", icon: Users, color: "bg-blue-50 text-blue-600" },
          { label: "Recommendations", value: "29", sub: "3 new", icon: Star, color: "bg-amber-50 text-amber-600" },
          { label: "Opportunities", value: "18", sub: "Matched for you", icon: Briefcase, color: "bg-emerald-50 text-emerald-600" },
        ].map((s) => (
          <Card key={s.label} className="rounded-[2rem] border-none shadow-sm bg-card p-6">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{s.label}</p>
                <p className="text-2xl font-black">{s.value}</p>
                <p className="text-[10px] font-bold text-violet-600">{s.sub}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-lg font-black flex items-center gap-2">
                <Bell className="h-5 w-5 text-violet-600" /> Recent Activity
              </h2>
              <Badge className="bg-violet-50 text-violet-600 border-none font-black text-xs">5 new</Badge>
            </div>
            <div className="divide-y divide-border">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-center gap-4 p-5 hover:bg-muted/30 transition-colors">
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${a.color}`}>
                    <a.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground">{a.text}</p>
                    <p className="text-[11px] font-medium text-muted-foreground">{a.time}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </div>
              ))}
            </div>
          </Card>

          {/* Opportunities */}
          <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-lg font-black flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-violet-600" /> Top Opportunities for You
              </h2>
              <Link href="/vendor/professional/opportunities">
                <Button size="sm" variant="ghost" className="font-bold text-violet-600 hover:bg-violet-50 rounded-xl">
                  View All <ArrowUpRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="divide-y divide-border">
              {OPPORTUNITIES.map((o, i) => (
                <div key={i} className="p-5 flex items-center gap-4 hover:bg-muted/30 transition-colors group">
                  <div className="h-12 w-12 bg-violet-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Briefcase className="h-5 w-5 text-violet-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-foreground text-sm">{o.title}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-[11px] font-bold text-muted-foreground">{o.company}</span>
                      <Badge className="bg-violet-50 text-violet-600 border-none font-black text-[9px]">{o.type}</Badge>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground">
                        <MapPin className="h-3 w-3" />{o.location}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-lg font-black text-violet-600">{o.match}%</p>
                    <p className="text-[9px] font-black uppercase text-muted-foreground">Match</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Connection Suggestions */}
          <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-base font-black flex items-center gap-2">
                <Users className="h-4 w-4 text-violet-600" /> People You May Know
              </h2>
            </div>
            <div className="divide-y divide-border">
              {CONNECTIONS.map((c, i) => (
                <div key={i} className="p-4 flex items-center gap-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format&q=80`} />
                    <AvatarFallback className="bg-violet-50 text-violet-600 font-black text-xs">
                      {c.name.split(" ").map(n => n[0]).join("").slice(0,2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-foreground truncate">{c.name}</p>
                    <p className="text-[10px] font-bold text-muted-foreground truncate">{c.role}</p>
                    <p className="text-[10px] font-bold text-violet-600">{c.mutual} mutual</p>
                  </div>
                  <Button size="sm" variant="outline" className="rounded-xl font-black text-[10px] h-8 border-violet-200 text-violet-600 hover:bg-violet-50 shrink-0">
                    Connect
                  </Button>
                </div>
              ))}
            </div>
            <div className="p-4">
              <Link href="/vendor/professional/network">
                <Button variant="ghost" className="w-full rounded-2xl font-bold text-violet-600 hover:bg-violet-50 text-sm">
                  View All Suggestions
                </Button>
              </Link>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-3">
            <h2 className="text-base font-black">Quick Actions</h2>
            {[
              { label: "Share Profile", icon: Globe, href: "/vendor/professional/profile" },
              { label: "Add Portfolio Work", icon: TrendingUp, href: "/vendor/professional/portfolio" },
              { label: "Request Recommendation", icon: Star, href: "/vendor/professional/recommendations" },
              { label: "Get Verified", icon: Award, href: "/vendor/professional/verification" },
            ].map((action) => (
              <Link key={action.label} href={action.href}>
                <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-violet-50 hover:text-violet-600 transition-colors group cursor-pointer">
                  <div className="h-8 w-8 bg-muted rounded-xl flex items-center justify-center group-hover:bg-violet-100 transition-colors">
                    <action.icon className="h-4 w-4 text-muted-foreground group-hover:text-violet-600 transition-colors" />
                  </div>
                  <span className="text-sm font-bold">{action.label}</span>
                  <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                </div>
              </Link>
            ))}
          </Card>

          {/* Verified Banner */}
          <Card className="rounded-[2rem] border-none shadow-sm bg-gradient-to-br from-amber-50 to-orange-50 p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-600" />
              <p className="font-black text-amber-900 text-sm">Get Verified</p>
            </div>
            <p className="text-xs font-bold text-amber-700 leading-relaxed">
              Verified professionals get 3× more profile views and appear first in search results.
            </p>
            <Link href="/vendor/professional/verification">
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-black h-10 text-xs">
                Start Verification
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* Boost Profile Modal */}
      <Dialog open={showBoostModal} onOpenChange={setShowBoostModal}>
        <DialogContent className="rounded-[2rem] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black flex items-center gap-2">
              <Zap className="h-5 w-5 text-violet-600" /> Boost Your Profile
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            {[
              { plan: "1 Week Boost", price: "£9", benefit: "3× more views, top of search" },
              { plan: "1 Month Boost", price: "£29", benefit: "10× reach, featured badge" },
              { plan: "3 Month Boost", price: "£69", benefit: "Maximum visibility + analytics" },
            ].map((p) => (
              <div key={p.plan} className="flex items-center justify-between p-4 rounded-2xl border-2 border-border hover:border-violet-300 cursor-pointer transition-colors">
                <div>
                  <p className="font-black text-sm">{p.plan}</p>
                  <p className="text-[11px] font-medium text-muted-foreground">{p.benefit}</p>
                </div>
                <p className="font-black text-violet-600 text-lg">{p.price}</p>
              </div>
            ))}
            <Button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setShowBoostModal(false)}>
              Activate Boost
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
