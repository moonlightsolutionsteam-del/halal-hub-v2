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
  ChevronRight, Share2, Camera, Edit2,
  ArrowLeft, MoreVertical, Flame, ShoppingBag,
  Package, LayoutGrid, PlayCircle, Users,
  Info, Bookmark, CheckCircle2, ArrowRight, Store, PenTool,
  Sparkles, Utensils, ClipboardList, Calendar,
  Trophy, Globe, Activity as ActivityIcon,
  Plus, Moon, BookOpen, HeartPulse, Gift
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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
    <div className="min-h-screen bg-background selection:bg-primary/10">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-muted border shadow-sm h-10 w-10 sm:h-12 sm:w-12 transition-all active:scale-90">
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            </Button>
          </Link>
          <div className="space-y-0.5">
            <h1 className="text-lg sm:text-2xl font-black font-headline text-foreground tracking-tight">Profile Hub</h1>
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] hidden sm:block">Verified Identity</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="rounded-2xl h-10 w-10 sm:h-12 sm:w-12 border shadow-sm hover:bg-muted relative group">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 h-2 w-2 sm:h-2.5 sm:w-2.5 bg-red-500 rounded-full border-2 border-white" />
          </Button>
          <Link href="/account/settings">
            <Button variant="ghost" size="icon" className="rounded-2xl h-10 w-10 sm:h-12 sm:w-12 border shadow-sm hover:bg-muted">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-2xl h-10 w-10 sm:h-12 sm:w-12 border shadow-sm hover:bg-muted">
            <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          </Button>
        </div>
      </header>

      {/* Profile Hero Section */}
      <div className="relative">
        {/* Banner */}
        <div className="h-[30vh] min-h-[300px] w-full relative overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&auto=format&q=80" 
            alt="Banner" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FBFBFB] via-transparent to-transparent" />
        </div>

        {/* Profile Info Overlay */}
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 -mt-20 sm:-mt-24 relative z-10">
          <div className="flex flex-col md:flex-row items-end gap-6 sm:gap-10">
            <div className="relative shrink-0">
              <div className="p-1.5 sm:p-2 bg-card rounded-[2rem] sm:rounded-[3rem] shadow-2xl">
                <Avatar className="h-28 w-28 sm:h-40 sm:w-48 rounded-[1.5rem] sm:rounded-[2.5rem] md:h-48 md:w-48">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/10.jpg" />
                  <AvatarFallback className="text-4xl font-black bg-emerald-50 text-emerald-600">SA</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute bottom-3 right-3 h-8 w-8 sm:h-10 sm:w-10 bg-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center border-4 border-white shadow-xl">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4 sm:gap-8 pb-4">
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tighter">Super Admin</h2>
                  <Badge className="bg-zinc-900 text-white border-none font-black text-[10px] uppercase tracking-widest px-3 h-6 sm:px-4 sm:h-7">ELITE MEMBER</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-muted-foreground font-bold">
                  <p className="text-sm sm:text-base text-emerald-600 font-black">@admin</p>
                  <p className="flex items-center gap-1.5 text-xs sm:text-sm"><MapPin className="h-3.5 w-3.5" /> Mumbai, MH</p>
                  <p className="flex items-center gap-1.5 text-xs sm:text-sm hidden sm:flex"><Calendar className="h-3.5 w-3.5" /> Joined May 2021</p>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <Link href="/account/settings">
                  <Button className="rounded-2xl bg-card border-2 border-border h-11 sm:h-14 px-5 sm:px-8 font-black text-xs uppercase tracking-widest text-emerald-600 hover:bg-muted shadow-sm transition-all active:scale-95">
                    <Edit2 className="h-4 w-4 mr-1.5 sm:mr-2" /> Edit
                  </Button>
                </Link>
                <Button variant="outline" size="icon" className="rounded-2xl bg-card border-2 border-border h-11 w-11 sm:h-14 sm:w-14 text-muted-foreground hover:text-primary hover:border-primary transition-all active:scale-95">
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Social Stats Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 py-6 sm:py-10 border-y border-border mt-8 sm:mt-12 bg-card/50 backdrop-blur-sm rounded-[1.5rem] sm:rounded-[2.5rem] px-5 sm:px-10 shadow-sm border border-white">
            {[
              { label: "Following", value: "12", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Followers", value: "5.4k", icon: Heart, color: "text-rose-600", bg: "bg-rose-50" },
              { label: "Family Circle", value: "4", icon: FamilyTreeIcon, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Hub Coins", value: "1,240", icon: Wallet, color: "text-amber-600", bg: "bg-amber-50" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-5 group cursor-default">
                <div className={cn("h-11 w-11 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                  <stat.icon className="h-5 w-5 sm:h-7 sm:w-7" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-foreground tracking-tighter leading-none">{stat.value}</p>
                  <p className="text-[9px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-0.5 sm:mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons Hub */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-10">
            <Link href="/family-tree">
              <Card className="rounded-[2rem] sm:rounded-[2.5rem] border-none shadow-sm bg-emerald-600 text-white p-5 sm:p-8 group hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden relative">
                <FamilyTreeIcon className="absolute -top-4 -right-4 h-32 w-32 opacity-10 group-hover:scale-110 transition-transform" />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-none uppercase">Family Tree</h3>
                    <p className="text-emerald-100 text-xs sm:text-sm font-medium">Manage lineage & shared board</p>
                  </div>
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl sm:rounded-3xl bg-card/20 flex items-center justify-center backdrop-blur-md shadow-xl group-hover:translate-x-2 transition-all shrink-0">
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                </div>
              </Card>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Card className="rounded-[2rem] sm:rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-5 sm:p-8 group hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden relative">
                  <Sparkles className="absolute -top-4 -right-4 h-32 w-32 opacity-10 group-hover:scale-110 transition-transform text-primary" />
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="space-y-1 sm:space-y-2">
                      <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-none uppercase">Go Pro</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm font-medium">Unlock premium hub tools</p>
                    </div>
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl sm:rounded-3xl bg-primary flex items-center justify-center shadow-xl group-hover:translate-x-2 transition-all shrink-0">
                      <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-[3rem] p-10 border-none bg-card shadow-3xl">
                <DialogHeader className="space-y-4">
                  <div className="h-16 w-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary mx-auto mb-2">
                    <Trophy className="h-8 w-8" />
                  </div>
                  <DialogTitle className="text-3xl font-black text-foreground text-center tracking-tight leading-tight">Elevate Your Presence</DialogTitle>
                  <DialogDescription className="text-center font-medium text-muted-foreground text-base leading-relaxed px-4">
                    Choose your professional path in the Halal Ecosystem and unlock specialized tools.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-4 pt-8">
                  <Link href="/vendor/creative/dashboard">
                    <Button className="w-full h-24 bg-blue-50 hover:bg-blue-100 text-blue-700 border-2 border-blue-100 rounded-[2rem] flex flex-col items-start px-8 group transition-all shadow-sm">
                      <div className="flex items-center gap-4 w-full">
                        <div className="h-12 w-12 bg-card rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
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
                        <div className="h-12 w-12 bg-card rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
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
                  <Link href="/partner/portal" className="text-[10px] font-black text-muted-foreground hover:text-primary uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2">
                    Explore all partner types <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Unified My Activity Hub */}
          <Tabs defaultValue="activity" className="w-full mt-10 sm:mt-20">
            <TabsList className="bg-transparent h-12 sm:h-14 w-full p-0 gap-8 sm:gap-12 justify-start border-b-2 rounded-none mb-8 sm:mb-12 overflow-x-auto no-scrollbar">
              <TabsTrigger value="activity" className="px-0 pb-3 sm:pb-4 h-full rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-muted-foreground data-[state=active]:text-foreground transition-all whitespace-nowrap">My Activity Hub</TabsTrigger>
              <TabsTrigger value="content" className="px-0 pb-3 sm:pb-4 h-full rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-muted-foreground data-[state=active]:text-foreground transition-all whitespace-nowrap">My Content</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="m-0 space-y-8 sm:space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-24">
              {/* Stats Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
                <Card className="rounded-[1.5rem] sm:rounded-[2rem] border-none shadow-sm bg-card p-5 sm:p-8 group hover:shadow-md transition-all">
                  <CardHeader className="p-0 pb-3 sm:pb-4">
                    <CardTitle className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Current Level</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-3 sm:space-y-4">
                    <div className="text-4xl sm:text-5xl font-black text-foreground tracking-tighter">12</div>
                    <div className="space-y-2">
                      <Progress value={84.5} className="h-2" />
                      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">8,450 / 10,000 XP to Level 13</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="rounded-[1.5rem] sm:rounded-[2rem] border-none shadow-sm bg-card p-5 sm:p-8 group hover:shadow-md transition-all">
                  <CardHeader className="p-0 pb-3 sm:pb-4">
                    <CardTitle className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Prayer Streak</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-3 sm:space-y-4">
                    <div className="text-4xl sm:text-5xl font-black text-orange-600 tracking-tighter">85 Days</div>
                    <div className="flex gap-1">
                      {['M','T','W','T','F','S','S'].map((d, i) => (
                        <div key={i} className={cn("h-7 sm:h-8 flex-1 rounded-lg sm:rounded-xl flex items-center justify-center text-[10px] font-black shadow-inner", i < 5 ? "bg-orange-500 text-white" : "bg-muted text-muted-foreground")}>{d}</div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="rounded-[1.5rem] sm:rounded-[2rem] border-none shadow-sm bg-card p-5 sm:p-8 group hover:shadow-md transition-all">
                  <CardHeader className="p-0 pb-3 sm:pb-4">
                    <CardTitle className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Hub Coins</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-4 sm:space-y-6">
                    <div className="text-4xl sm:text-5xl font-black text-amber-600 tracking-tighter">1,240</div>
                    <Button className="w-full h-11 rounded-xl bg-zinc-900 text-white font-black text-[10px] uppercase tracking-widest shadow-xl">Redeem Rewards</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Contributions */}
              <section className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-2xl font-black text-foreground tracking-tight">Recent Contributions</h3>
                  <Link href="/account/suggestions">
                    <Button variant="ghost" size="sm" className="font-black text-[10px] uppercase text-muted-foreground hover:text-primary tracking-widest">Manage All <ArrowRight className="h-3 w-3 ml-1" /></Button>
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
                    <Card key={i} className="rounded-[1.5rem] sm:rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden p-4 sm:p-8 group hover:shadow-xl transition-all border-2 border-transparent hover:border-primary/10">
                      <div className="flex gap-4 sm:gap-8 items-start">
                        <div className="relative h-16 w-16 sm:h-24 sm:w-24 rounded-2xl sm:rounded-[1.5rem] overflow-hidden shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-500">
                          <Image src={`https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop&auto=format&q=80`} alt={suggestion.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                          <div className="flex justify-between items-start">
                            <Badge className={`${suggestion.statusColor} border-2 font-black text-[8px] uppercase tracking-widest h-6 px-2 sm:px-3 rounded-full`}>{suggestion.status}</Badge>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl bg-muted shrink-0"><MoreVertical className="h-4 w-4 text-muted-foreground" /></Button>
                          </div>
                          <h4 className="text-base sm:text-xl font-black text-foreground truncate leading-tight">{suggestion.name}</h4>
                          <div className="flex flex-col gap-1">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Submitted: {suggestion.date}</p>
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

              {/* Achievements Timeline */}
              <section className="space-y-8 pt-4">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-2xl font-black text-foreground tracking-tight leading-none">Recent Achievements</h3>
                  <Button variant="ghost" className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">See All archive</Button>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Century Scans", desc: "100 successful product verifications in the AI Verifier.", date: "Oct 24", icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
                    { title: "Legacy Keeper", desc: "Successfully linked 5 generations in the Al-Sayed Family Tree.", date: "Oct 12", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
                    { title: "Hajj Spirit", desc: "Uploaded 10+ historical pilgrimage documents to the Archive.", date: "Sep 28", icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
                  ].map((milestone, i) => (
                    <div key={i} className="flex items-center gap-4 sm:gap-8 p-4 sm:p-8 bg-card rounded-[1.5rem] sm:rounded-[2.5rem] border border-transparent hover:border-border transition-all shadow-sm group">
                      <div className={cn("h-11 w-11 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform", milestone.bg, milestone.color)}>
                        <milestone.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="flex-1 space-y-0.5 sm:space-y-1 min-w-0">
                        <h4 className="text-base sm:text-xl font-black text-foreground leading-tight">{milestone.title}</h4>
                        <p className="text-xs sm:text-sm font-medium text-muted-foreground italic line-clamp-2">{milestone.desc}</p>
                      </div>
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest shrink-0">{milestone.date}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* My Reviews Summary */}
              <section className="space-y-6">
                <h3 className="text-2xl font-black text-foreground px-2 tracking-tight">Community Feedback</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { business: "Karim's Restaurant", rating: 5, date: "2 days ago", text: "Authentic Mughlai taste! The kebabs were succulent and the biryani was flavorful. A must-visit for families." },
                    { business: "Al-Naseeb Meats", rating: 4, date: "1 week ago", text: "Fresh meat and very clean shop. The staff is helpful and knowledgeable about sourcing." }
                  ].map((review, i) => (
                    <Card key={i} className="rounded-[1.5rem] sm:rounded-[2.5rem] border-none shadow-sm bg-card p-5 sm:p-10 space-y-4 sm:space-y-6 border-2 border-transparent hover:border-emerald-100/50 transition-all group">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1 bg-muted p-2 rounded-xl">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star key={idx} className={`h-3.5 w-3.5 ${idx < review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />
                          ))}
                        </div>
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{review.date}</span>
                      </div>
                      <p className="text-lg font-medium text-muted-foreground leading-relaxed italic border-l-4 border-emerald-50 pl-6 group-hover:border-emerald-200 transition-all">"{review.text}"</p>
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-xs font-black text-foreground uppercase tracking-tighter bg-muted px-4 py-1.5 rounded-full">{review.business}</span>
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
                  <h3 className="text-2xl font-black text-foreground px-2 tracking-tight">Social Timeline</h3>
                  <div className="space-y-6">
                    {[
                      { text: "Just had the most amazing biryani at Karim's! Highly recommend the Mutton Korma as well. A true taste of Old Delhi.", time: "3d ago", likes: 15, comments: 4, img: "food1" },
                      { text: "Reminder: 'Verily, with every hardship comes ease.' (Quran 94:5). A beautiful verse to reflect on during tough times.", time: "1w ago", likes: 58, comments: 12, img: "masjid1" },
                    ].map((post, i) => (
                      <Card key={i} className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden p-10 space-y-6 border-2 border-transparent hover:border-primary/10 transition-all">
                        <div className="flex gap-6">
                          <div className="flex-1 space-y-4">
                            <p className="text-lg font-medium text-muted-foreground leading-relaxed italic">"{post.text}"</p>
                            <div className="flex justify-between items-center pt-4 border-t border-border text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                              <span className="bg-muted px-3 py-1 rounded-full">{post.time}</span>
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
                    <h3 className="text-xl font-black text-foreground px-2">Visual Vault</h3>
                    <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="aspect-square relative rounded-2xl overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer group">
                            <Image 
                              src={`https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&auto=format&q=80`} 
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
                    <h3 className="text-xl font-black text-foreground px-2">Recent Rolls</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2].map(i => (
                        <div key={i} className="aspect-[9/16] relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer border-4 border-white ring-1 ring-slate-100">
                          <Image 
                            src={`https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=400&h=700&fit=crop&auto=format&q=80`} 
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
