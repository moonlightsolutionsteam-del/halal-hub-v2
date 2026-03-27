
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Heart, Clock, Star, Wallet, Settings, 
  Bell, ShieldCheck, MapPin, Award, 
  MessageSquare, UserCheck, Zap, TrendingUp,
  ChevronRight, Share2, Camera, Edit2
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function UserDashboard() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="container mx-auto p-6 space-y-10 max-w-6xl pb-24">
      {/* Profile Hero Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-primary/10 shadow-2xl transition-transform group-hover:scale-105 duration-500">
              <AvatarImage src="https://picsum.photos/seed/user-john/400/400" />
              <AvatarFallback className="text-3xl font-black">JD</AvatarFallback>
            </Avatar>
            <Button size="icon" className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-slate-900 text-white border-4 border-white shadow-xl hover:scale-110 transition-transform">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h1 className="text-4xl font-black font-headline tracking-tighter text-slate-900">Salam, John Doe</h1>
              <Badge className="bg-primary text-white border-none font-black px-4 py-1 rounded-full text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20">Elite Member</Badge>
            </div>
            <p className="text-muted-foreground font-medium text-lg italic max-w-md">"Exploring the best of halal living since June 2023. Proud contributor to the Global Ummah directory."</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm font-bold text-slate-400 uppercase tracking-widest pt-2">
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> New York, USA</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Joined 1.2 years ago</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/account/settings">
            <Button variant="outline" className="rounded-2xl px-6 font-black border-2 h-12 gap-2 bg-white hover:bg-slate-50">
              <Settings className="h-4 w-4" /> Settings
            </Button>
          </Link>
          <Button variant="outline" size="icon" className="rounded-2xl border-2 h-12 w-12 bg-white relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Stats & Progress */}
        <div className="lg:col-span-4 space-y-8">
          {/* Wallet Card */}
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-primary text-white p-10 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
            <Wallet className="absolute -top-4 -right-4 h-48 w-48 opacity-10 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Rewards Balance</p>
                <h2 className="text-6xl font-black tracking-tighter">1,250 <span className="text-sm font-bold opacity-60 uppercase">Coins</span></h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end text-xs font-black uppercase tracking-widest">
                  <span className="opacity-60">Tier Progress</span>
                  <span>750 to VIP</span>
                </div>
                <Progress value={65} className="h-2 bg-white/20" />
              </div>
              <Button className="w-full h-14 rounded-2xl bg-white text-primary hover:bg-slate-100 font-black uppercase text-xs tracking-widest shadow-2xl shadow-black/10">
                Redeem Rewards
              </Button>
            </div>
          </Card>

          {/* Achievement Badges */}
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Top Badges</h3>
              <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-primary p-0">View All</Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Gourmet", icon: Zap, color: "text-orange-500", bg: "bg-orange-50" },
                { label: "Guide", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
                { label: "Helper", icon: Award, color: "text-blue-500", bg: "bg-blue-50" },
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center gap-3 group">
                  <div className={`h-16 w-16 rounded-[1.5rem] ${badge.bg} flex items-center justify-center ${badge.color} shadow-inner group-hover:scale-110 transition-transform`}>
                    <badge.icon className="h-8 w-8" />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{badge.label}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Impact Stats */}
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black uppercase tracking-tighter">Your Hub Impact</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              {[
                { label: "Reviews Posted", value: "24", icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-50" },
                { label: "Check-ins", value: "142", icon: UserCheck, color: "text-blue-500", bg: "bg-blue-50" },
                { label: "Entities Verified", value: "8", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-transparent hover:border-primary/10 transition-all group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-bold text-slate-600">{stat.label}</span>
                  </div>
                  <span className="text-lg font-black text-slate-900">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Activity & Bookmarks */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Activity Timeline */}
          <Card className="rounded-[3rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-10 border-b bg-slate-50/30 flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-black text-slate-900">Recent Activity</CardTitle>
                <CardDescription className="text-base font-medium italic">Tracking your journey across the halal ecosystem.</CardDescription>
              </div>
              <Button variant="outline" className="rounded-xl border-2 font-black text-xs h-10 px-6 bg-white shadow-sm">View Timeline</Button>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
              {[
                { text: "Left a 5-star review for 'The Bosphorus Kitchen'", sub: "Verified Purchase", icon: Star, color: "text-amber-500", time: "2 hours ago", bg: "bg-amber-50" },
                { text: "Checked in at 'Al-Barakah Butchers'", sub: "Brooklyn, NY", icon: UserCheck, color: "text-blue-500", time: "Yesterday", bg: "bg-blue-50" },
                { text: "Earned 'Trust Scout' badge", sub: "For 5 successful verifications", icon: Award, color: "text-emerald-500", time: "3 days ago", bg: "bg-emerald-50" },
                { text: "Saved 'Global Tajweed Hub' to education", sub: "Category: Learning", icon: Heart, color: "text-rose-500", time: "Oct 28, 2024", bg: "bg-rose-50" },
              ].map((activity, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className={`h-14 w-14 rounded-2xl ${activity.bg} flex items-center justify-center ${activity.color} shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                    <activity.icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1 space-y-1 border-b border-slate-50 pb-6 group-last:border-none group-last:pb-0">
                    <div className="flex justify-between items-start">
                      <p className="text-lg font-black text-slate-800 leading-tight">{activity.text}</p>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest whitespace-nowrap">{activity.time}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">{activity.sub}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Bookmarked Entities Grid */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Bookmarked Hubs</h2>
              <Button variant="link" className="text-primary font-black uppercase text-xs tracking-widest">Manage All</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {[
                { name: "Royal Halal Suites", cat: "Hotel", loc: "Manhattan, NY", rate: 4.9, img: "hotel1" },
                { name: "Iman Knowledge Acad.", cat: "Education", loc: "London, UK", rate: 4.8, img: "edu1" },
              ].map((fav, i) => (
                <Card key={i} className="group rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-primary/10">
                  <div className="relative aspect-video">
                    <img src={`https://picsum.photos/seed/${fav.img}/800/400`} alt={fav.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-white/90 backdrop-blur-md text-primary font-black border-none shadow-xl px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest">Verified</Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardHeader className="p-8 pb-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">{fav.cat}</p>
                        <div className="flex items-center gap-1 text-sm font-black text-amber-500">
                          <Star className="h-4 w-4 fill-current" /> {fav.rate}
                        </div>
                      </div>
                      <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors leading-tight">{fav.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                        <MapPin className="h-4 w-4 text-primary" /> {fav.loc}
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="px-8 pb-8 pt-0">
                    <Button variant="ghost" className="w-full rounded-xl font-black uppercase text-[10px] tracking-widest group-hover:bg-primary group-hover:text-white transition-all">View Hub Profile</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function UserIcon(props: any) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
