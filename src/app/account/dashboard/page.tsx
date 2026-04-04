"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, Clock, Star, Wallet, Settings, 
  Bell, ShieldCheck, MapPin, Award, 
  MessageSquare, UserCheck, Zap, TrendingUp,
  ChevronRight, Share2, Camera, Edit2,
  ArrowLeft, MoreVertical, Flame, ShoppingBag,
  Package, LayoutGrid, PlayCircle, Users,
  Info, Bookmark, CheckCircle2, ArrowRight, Store, PenTool,
  Sparkles, Utensils, ClipboardList, Calendar,
  Trophy, Globe, Activity as ActivityIcon
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

const FamilyTreeIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v8" />
    <path d="m16 12-4-4-4 4" />
    <rect width="8" height="4" x="8" y="12" rx="1" />
    <path d="M12 16v6" />
    <path d="M8 22h8" />
  </svg>
);

export default function UserDashboard() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#FBFBFB] selection:bg-primary/10">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b px-6 h-20 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-slate-50 border shadow-sm h-12 w-12 transition-all active:scale-90">
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
          </Link>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black font-headline text-slate-900 tracking-tight">Profile Hub</h1>
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Verified Identity</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-2xl h-12 w-12 border shadow-sm hover:bg-slate-50 relative group">
            <Bell className="h-5 w-5 text-slate-600 group-hover:text-primary transition-colors" />
            <span className="absolute top-3.5 right-3.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white" />
          </Button>
          <Link href="/account/settings">
            <Button variant="ghost" size="icon" className="rounded-2xl h-12 w-12 border shadow-sm hover:bg-slate-50">
              <Settings className="h-5 w-5 text-slate-600" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-2xl h-12 w-12 border shadow-sm hover:bg-slate-50">
            <MoreVertical className="h-5 w-5 text-slate-600" />
          </Button>
        </div>
      </header>

      {/* Profile Hero Section */}
      <div className="relative">
        {/* Banner */}
        <div className="h-[30vh] min-h-[300px] w-full relative overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/user-banner-sa/1600/600" 
            alt="Banner" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FBFBFB] via-transparent to-transparent" />
        </div>

        {/* Profile Info Overlay */}
        <div className="container mx-auto max-w-5xl px-6 -mt-24 relative z-10">
          <div className="flex flex-col md:flex-row items-end gap-10">
            <div className="relative shrink-0">
              <div className="p-2 bg-white rounded-[3rem] shadow-2xl">
                <Avatar className="h-40 w-48 rounded-[2.5rem] md:h-48 md:w-48">
                  <AvatarImage src="https://picsum.photos/seed/user-sa/400/400" />
                  <AvatarFallback className="text-4xl font-black bg-emerald-50 text-emerald-600">SA</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute bottom-4 right-4 h-10 w-10 bg-emerald-500 rounded-2xl flex items-center justify-center border-4 border-white shadow-xl">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
            </div>
            
            <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8 pb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Super Admin</h2>
                  <Badge className="bg-slate-900 text-white border-none font-black text-[10px] uppercase tracking-widest px-4 h-7">ELITE MEMBER</Badge>
                </div>
                <div className="flex items-center gap-6 text-slate-400 font-bold">
                  <p className="text-base text-emerald-600 font-black">@admin</p>
                  <p className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4" /> New York, NY</p>
                  <p className="flex items-center gap-2 text-sm"><Calendar className="h-4 w-4" /> Joined May 2021</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Link href="/account/settings">
                  <Button className="rounded-2xl bg-white border-2 border-slate-100 h-14 px-8 font-black text-xs uppercase tracking-widest text-emerald-600 hover:bg-slate-50 shadow-sm transition-all active:scale-95">
                    <Edit2 className="h-4 w-4 mr-2" /> Edit profile
                  </Button>
                </Link>
                <Button variant="outline" size="icon" className="rounded-2xl bg-white border-2 border-slate-100 h-14 w-14 text-slate-400 hover:text-primary hover:border-primary transition-all active:scale-95">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Social Stats Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-slate-100 mt-12 bg-white/50 backdrop-blur-sm rounded-[2.5rem] px-10 shadow-sm border border-white">
            {[
              { label: "Following", value: "12", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Followers", value: "5.4k", icon: Heart, color: "text-rose-600", bg: "bg-rose-50" },
              { label: "Family Circle", value: "4", icon: FamilyTreeIcon, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Hub Coins", value: "1,240", icon: Wallet, color: "text-amber-600", bg: "bg-amber-50" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-5 group cursor-default">
                <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                  <stat.icon className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{stat.value}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons Hub */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <Link href="/family-tree">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-emerald-600 text-white p-8 group hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden relative">
                <FamilyTreeIcon className="absolute -top-4 -right-4 h-32 w-32 opacity-10 group-hover:scale-110 transition-transform" />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight leading-none uppercase">Family Tree</h3>
                    <p className="text-emerald-100 text-sm font-medium">Manage lineage & shared board</p>
                  </div>
                  <div className="h-14 w-14 rounded-3xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-xl group-hover:translate-x-2 transition-all">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                </div>
              </Card>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 group hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden relative">
                  <Sparkles className="absolute -top-4 -right-4 h-32 w-32 opacity-10 group-hover:scale-110 transition-transform text-primary" />
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black tracking-tight leading-none uppercase">Go Pro</h3>
                      <p className="text-slate-400 text-sm font-medium">Unlock premium hub tools</p>
                    </div>
                    <div className="h-14 w-14 rounded-3xl bg-primary flex items-center justify-center shadow-xl group-hover:translate-x-2 transition-all">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-[3rem] p-10 border-none bg-white shadow-3xl">
                <DialogHeader className="space-y-4">
                  <div className="h-16 w-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary mx-auto mb-2">
                    <Trophy className="h-8 w-8" />
                  </div>
                  <DialogTitle className="text-3xl font-black text-slate-900 text-center tracking-tight leading-tight">Elevate Your Presence</DialogTitle>
                  <DialogDescription className="text-center font-medium text-slate-500 text-base leading-relaxed px-4">
                    Choose your professional path in the Halal Ecosystem and unlock specialized tools.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-4 pt-8">
                  <Link href="/vendor/creative/dashboard">
                    <Button className="w-full h-24 bg-blue-50 hover:bg-blue-100 text-blue-700 border-2 border-blue-100 rounded-[2rem] flex flex-col items-start px-8 group transition-all shadow-sm">
                      <div className="flex items-center gap-4 w-full">
                        <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <PenTool className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="font-black text-lg tracking-tight leading-none mb-1">Join as Creator</span>
                          <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Influencers & Scholars</span>
                        </div>
                        <ArrowRight className="h-5 w-5 ml-auto group-hover:translate-x-2 transition-transform text-blue-300" />
                      </div>
                    </Button>
                  </Link>
                  <Link href="/partner/onboarding/business/category">
                    <Button className="w-full h-24 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-2 border-emerald-100 rounded-[2rem] flex flex-col items-start px-8 group transition-all shadow-sm">
                      <div className="flex items-center gap-4 w-full">
                        <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <Store className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="font-black text-lg tracking-tight leading-none mb-1">Register Business</span>
                          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Shops & Restaurants</span>
                        </div>
                        <ArrowRight className="h-5 w-5 ml-auto group-hover:translate-x-2 transition-transform text-emerald-300" />
                      </div>
                    </Button>
                  </Link>
                </div>
                <div className="pt-8 text-center">
                  <Link href="/partner/portal" className="text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2">
                    Explore all partner types <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Family Moments Layer */}
          <div className="mt-16 space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h3 className="font-black text-sm uppercase tracking-widest text-slate-900">Family Moments</h3>
              </div>
              <Link href="/family-tree">
                <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-slate-400 hover:text-primary tracking-tighter">View Hub <ChevronRight className="h-3 w-3 ml-1" /></Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Dinner planned tonight 🍽️", sub: "7:30 PM @ The Halal Grill", color: "bg-orange-50 text-orange-700", border: "border-orange-100", icon: Utensils, url: "/family-tree/events" },
                { label: "3 tasks pending", sub: "Assigned to Ibrahim & Fatima", color: "bg-blue-50 text-blue-700", border: "border-blue-100", icon: ClipboardList, url: "/family-tree/board" },
                { label: "Weekend outing coming up", sub: "Islamic Expo on Saturday", color: "bg-purple-50 text-purple-700", border: "border-purple-100", icon: Calendar, url: "/family-tree/events" },
                { label: "New place saved nearby", sub: "Sunnah Organic Mart", color: "bg-emerald-50 text-emerald-700", border: "border-emerald-100", icon: MapPin, url: "/family-tree/discovery" },
              ].map((moment, i) => (
                <Link key={i} href={moment.url}>
                  <Card className={cn("rounded-[2rem] border-2 shadow-none p-6 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer group h-full", moment.color, moment.border)}>
                    <div className="flex flex-col gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-white/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                        <moment.icon className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-black text-[15px] leading-tight tracking-tight">{moment.label}</p>
                        <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">{moment.sub}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Tools Grid */}
          <section className="mt-16 space-y-6">
            <h3 className="font-black text-sm uppercase tracking-widest text-slate-900 px-2">Utility Toolkit</h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
              {[
                { label: "Level", icon: Flame, color: "text-orange-500", bg: "bg-orange-50", badge: "Claim" },
                { label: "Wallet", icon: Wallet, color: "text-blue-500", bg: "bg-blue-50" },
                { label: "Store", icon: ShoppingBag, color: "text-emerald-600", bg: "bg-emerald-50" },
                { label: "Backpack", icon: Package, color: "text-teal-600", bg: "bg-teal-50", badge: "New" },
                { label: "Analytics", icon: TrendingUp, color: "text-indigo-500", bg: "bg-indigo-50" },
                { label: "Badges", icon: Award, color: "text-purple-500", bg: "bg-purple-50" },
                { label: "Network", icon: Globe, color: "text-sky-500", bg: "bg-sky-50" },
                { label: "Vitals", icon: ActivityIcon, color: "text-rose-500", bg: "bg-rose-50" },
              ].map((tool, i) => (
                <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer">
                  <div className="relative">
                    <div className={`h-16 w-16 rounded-[1.5rem] ${tool.bg} flex items-center justify-center ${tool.color} group-hover:scale-110 transition-all duration-500 shadow-sm border border-white group-hover:shadow-lg`}>
                      <tool.icon className="h-7 w-7" />
                    </div>
                    {tool.badge && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] font-black px-2 py-0.5 rounded-lg uppercase shadow-xl ring-2 ring-white">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">{tool.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Membership Bar */}
          <div className="mt-16 bg-slate-900 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-[10s]">
              <Trophy className="h-64 w-64 text-primary" />
            </div>
            <div className="flex items-center gap-8 relative z-10 text-center md:text-left flex-col md:flex-row">
              <div className="h-20 w-20 bg-primary/20 backdrop-blur-xl rounded-[1.5rem] flex items-center justify-center border border-white/10 shadow-2xl">
                <Star className="h-10 w-10 text-primary fill-current" />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-primary">Premium Tier</p>
                <h3 className="text-3xl font-black tracking-tight leading-none">The Hub Membership</h3>
                <p className="text-sm font-medium text-slate-400 italic">Unlock ad-free experience, exclusive widgets, and priority trust audits.</p>
              </div>
            </div>
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-black h-16 px-12 rounded-2xl text-xs uppercase tracking-widest mt-8 md:mt-0 shadow-2xl relative z-10 transition-all active:scale-95">
              Upgrade Hub <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="activity" className="w-full mt-20">
            <TabsList className="bg-transparent h-14 w-full p-0 gap-12 justify-start border-b-2 rounded-none mb-12 overflow-x-auto no-scrollbar">
              <TabsTrigger value="journey" className="px-0 pb-4 h-full rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-sm font-black uppercase tracking-[0.2em] text-slate-400 data-[state=active]:text-slate-900 transition-all">Your Journey</TabsTrigger>
              <TabsTrigger value="activity" className="px-0 pb-4 h-full rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-sm font-black uppercase tracking-[0.2em] text-slate-400 data-[state=active]:text-slate-900 transition-all">Marketplace Activity</TabsTrigger>
              <TabsTrigger value="content" className="px-0 pb-4 h-full rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-sm font-black uppercase tracking-[0.2em] text-slate-400 data-[state=active]:text-slate-900 transition-all">My Content</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="m-0 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
              {/* My Suggestions */}
              <section className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Recent Contributions</h3>
                  <Link href="/account/suggestions">
                    <Button variant="ghost" size="sm" className="font-black text-[10px] uppercase text-slate-400 hover:text-primary tracking-widest">Manage All <ArrowRight className="h-3 w-3 ml-1" /></Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { 
                      name: "The Halal Grill & Bistro", 
                      status: "LIVE ON HUB", 
                      statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
                      date: "Oct 12, 2023", 
                      points: "+50 Points Earned",
                      img: "food1"
                    },
                    { 
                      name: "Istanbul Spice Market", 
                      status: "AUDIT IN PROGRESS", 
                      statusColor: "bg-blue-50 text-blue-600 border-blue-100",
                      date: "Oct 24, 2023", 
                      info: "Awaiting final certificates",
                      img: "grocery1"
                    }
                  ].map((suggestion, i) => (
                    <Card key={i} className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden p-8 group hover:shadow-xl transition-all border-2 border-transparent hover:border-primary/10">
                      <div className="flex gap-8 items-start">
                        <div className="relative h-24 w-24 rounded-[1.5rem] overflow-hidden shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-500">
                          <Image src={`https://picsum.photos/seed/${suggestion.img}/300/300`} alt={suggestion.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 space-y-3 min-w-0">
                          <div className="flex justify-between items-start">
                            <Badge className={`${suggestion.statusColor} border-2 font-black text-[8px] uppercase tracking-widest h-6 px-3 rounded-full`}>{suggestion.status}</Badge>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl bg-slate-50"><MoreVertical className="h-4 w-4 text-slate-300" /></Button>
                          </div>
                          <h4 className="text-xl font-black text-slate-900 truncate leading-tight">{suggestion.name}</h4>
                          <div className="flex flex-col gap-1">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Submitted: {suggestion.date}</p>
                            {suggestion.points && <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">{suggestion.points}</p>}
                            {suggestion.info && (
                              <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-500 italic mt-1">
                                <Info className="h-3 w-3" /> {suggestion.info}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              {/* My Reviews Summary */}
              <section className="space-y-6">
                <h3 className="text-2xl font-black text-slate-900 px-2 tracking-tight">Engagement Integrity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { business: "Karim's Restaurant", rating: 5, date: "2 days ago", text: "Authentic Mughlai taste! The kebabs were succulent and the biryani was flavorful. A must-visit for families." },
                    { business: "Al-Naseeb Meats", rating: 4, date: "1 week ago", text: "Fresh meat and very clean shop. The staff is helpful and knowledgeable about sourcing." }
                  ].map((review, i) => (
                    <Card key={i} className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-6 border-2 border-transparent hover:border-emerald-100/50 transition-all group">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1 bg-slate-50 p-2 rounded-xl">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star key={idx} className={`h-3.5 w-3.5 ${idx < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                          ))}
                        </div>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{review.date}</span>
                      </div>
                      <p className="text-lg font-medium text-slate-600 leading-relaxed italic border-l-4 border-emerald-50 pl-6 group-hover:border-emerald-200 transition-all">"{review.text}"</p>
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-xs font-black text-slate-900 uppercase tracking-tighter bg-slate-50 px-4 py-1.5 rounded-full">{review.business}</span>
                        <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-emerald-600 p-0 h-auto hover:bg-transparent hover:underline">Edit Feedback</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            </TabsContent>

            <TabsContent value="content" className="m-0 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
              {/* My Posts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-8">
                  <h3 className="text-2xl font-black text-slate-900 px-2 tracking-tight">Social Timeline</h3>
                  <div className="space-y-6">
                    {[
                      { text: "Just had the most amazing biryani at Karim's! Highly recommend the Mutton Korma as well. A true taste of Old Delhi.", time: "3d ago", likes: 15, comments: 4, img: "food1" },
                      { text: "Reminder: 'Verily, with every hardship comes ease.' (Quran 94:5). A beautiful verse to reflect on during tough times.", time: "1w ago", likes: 58, comments: 12, img: "masjid1" },
                    ].map((post, i) => (
                      <Card key={i} className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden p-10 space-y-6 border-2 border-transparent hover:border-primary/10 transition-all">
                        <div className="flex gap-6">
                          <div className="flex-1 space-y-4">
                            <p className="text-lg font-medium text-slate-600 leading-relaxed italic">"{post.text}"</p>
                            <div className="flex justify-between items-center pt-4 border-t border-slate-50 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                              <span className="bg-slate-50 px-3 py-1 rounded-full">{post.time}</span>
                              <div className="flex gap-6">
                                <button className="flex items-center gap-2 hover:text-rose-500 transition-colors"><Heart className="h-4 w-4" /> {post.likes}</button>
                                <button className="flex items-center gap-2 hover:text-primary transition-colors"><MessageSquare className="h-4 w-4" /> {post.comments}</button>
                                <button className="flex items-center gap-2 hover:text-primary transition-colors"><Share2 className="h-4 w-4" /></button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-10">
                  {/* Media Grid */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900 px-2">Visual Vault</h3>
                    <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8">
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="aspect-square relative rounded-2xl overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer group">
                            <Image 
                              src={`https://picsum.photos/seed/media-sa-${i}/400/400`} 
                              alt="Media" 
                              fill 
                              className="object-cover group-hover:brightness-75 transition-all"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Plus className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full mt-6 rounded-xl border-2 font-black text-[10px] uppercase tracking-widest">Open Full Gallery</Button>
                    </Card>
                  </div>

                  {/* Rolls Preview */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900 px-2">Recent Rolls</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2].map(i => (
                        <div key={i} className="aspect-[9/16] relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer border-4 border-white ring-1 ring-slate-100">
                          <Image 
                            src={`https://picsum.photos/seed/roll-sa-${i}/400/700`} 
                            alt="Roll" 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <PlayCircle className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
