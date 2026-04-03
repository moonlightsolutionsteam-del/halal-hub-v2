
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, Star, Wallet, Bell, ShieldCheck, 
  MapPin, Award, MessageSquare, UserCheck, 
  Zap, TrendingUp, ChevronRight, Share2, 
  Camera, Edit2, ArrowLeft, MoreVertical, 
  Flame, ShoppingBag, Package, LayoutGrid, 
  PlayCircle, Users, Info, Bookmark, 
  CheckCircle2, ArrowRight, Store, PenTool,
  Video, Mic, Play, Film, Globe,
  HeartPulse, UserPlus, Crown, AlertTriangle,
  Target, Megaphone, Gauge, Briefcase,
  BarChart, Sliders, Image as ImageIcon,
  Clock, ArrowUpRight
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function CreatorProfilePage() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#FBFBFB] selection:bg-blue-500/10">
      {/* Profile Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b px-6 h-20 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-slate-50 border shadow-sm h-12 w-12 transition-transform active:scale-90">
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
          </Link>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black font-headline text-slate-900 tracking-tight">Creator Profile</h1>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Verified Impact Hub</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Dashboard Entry for Owners */}
          <Link href="/vendor/creative/dashboard">
            <Button variant="outline" className="hidden md:flex rounded-2xl h-12 px-6 border-2 font-black uppercase text-[10px] tracking-widest bg-white hover:bg-slate-50 gap-2 shadow-sm">
              <LayoutGrid className="h-4 w-4" /> Enter Studio Dashboard
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-2xl h-12 w-12 border shadow-sm hover:bg-slate-50">
            <Share2 className="h-5 w-5 text-slate-600" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-2xl h-12 w-12 border shadow-sm hover:bg-slate-50">
            <MoreVertical className="h-5 w-5 text-slate-600" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative">
        {/* Banner */}
        <div className="h-[45vh] min-h-[400px] w-full relative overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/creator-banner/1600/800" 
            alt="Creator Banner" 
            fill 
            className="object-cover transition-transform duration-[10s] group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FBFBFB] via-[#FBFBFB]/20 to-transparent" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Profile Info Overlay */}
        <div className="container mx-auto max-w-5xl px-6 -mt-32 relative z-10">
          <div className="flex flex-col md:flex-row items-end gap-10 pb-12">
            <div className="relative shrink-0">
              <div className="p-2 bg-white rounded-[3.5rem] shadow-2xl">
                <Avatar className="h-48 w-48 rounded-[3rem]">
                  <AvatarImage src="https://picsum.photos/seed/creator-main/400/400" />
                  <AvatarFallback className="text-4xl font-black bg-blue-50 text-blue-600">HA</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute bottom-4 right-4 h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center border-4 border-white shadow-xl animate-bounce-slow">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8 pb-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-5xl font-black text-slate-900 drop-shadow-sm font-headline tracking-tighter">Shaykh Hamza</h2>
                  <Badge className="bg-blue-600 text-white border-none font-black text-[10px] uppercase tracking-widest px-5 h-8 shadow-lg shadow-blue-200">ISLAMIC SCHOLAR</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-slate-400 font-bold">
                  <p className="text-base text-blue-600/80 font-black">@hamza_legacy</p>
                  <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" /> London, UK
                  </div>
                  <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-xs text-slate-500">
                    <Globe className="h-3.5 w-3.5 text-slate-400" /> iman-hub.com
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <Button className="flex-1 md:flex-none h-16 px-12 rounded-[1.5rem] bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-sm tracking-widest shadow-2xl shadow-blue-200 transition-all active:scale-95">
                  Follow Creator
                </Button>
                <Button variant="outline" className="flex-1 md:flex-none h-16 px-10 rounded-[1.5rem] border-2 border-slate-200 font-black uppercase text-sm tracking-widest bg-white hover:bg-slate-50 transition-all shadow-sm">
                  <MessageSquare className="h-5 w-5 mr-2" /> Message
                </Button>
                <Button variant="outline" size="icon" className="h-16 w-16 rounded-[1.5rem] border-2 border-slate-200 bg-white text-amber-500 shadow-sm hover:text-amber-600 transition-all">
                  <Zap className="h-7 w-7 fill-current" />
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-12 border-y border-slate-100 bg-white/50 backdrop-blur-sm rounded-[3rem] px-10 shadow-sm border border-white">
            {[
              { label: "Followers", value: "125k", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Total Reach", value: "1.2M", icon: Play, color: "text-purple-600", bg: "bg-purple-50" },
              { label: "Engagement", value: "8.4%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Studio Rating", value: "4.9", icon: Award, color: "text-amber-600", bg: "bg-amber-50" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center sm:items-start gap-3 group cursor-default text-center sm:text-left">
                <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                  <stat.icon className="h-7 w-7" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{stat.value}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="reels" className="w-full mt-16">
            <TabsList className="bg-transparent h-14 w-full p-0 gap-12 justify-start border-b-2 rounded-none mb-12 overflow-x-auto no-scrollbar">
              <TabsTrigger value="reels" className="px-0 pb-4 h-full rounded-none border-b-4 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent text-sm font-black uppercase tracking-[0.2em] text-slate-400 data-[state=active]:text-slate-900 transition-all">Reels</TabsTrigger>
              <TabsTrigger value="feed" className="px-0 pb-4 h-full rounded-none border-b-4 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent text-sm font-black uppercase tracking-[0.2em] text-slate-400 data-[state=active]:text-slate-900 transition-all">Feed</TabsTrigger>
              <TabsTrigger value="podcasts" className="px-0 pb-4 h-full rounded-none border-b-4 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent text-sm font-black uppercase tracking-[0.2em] text-slate-400 data-[state=active]:text-slate-900 transition-all">Podcasts</TabsTrigger>
              <TabsTrigger value="about" className="px-0 pb-4 h-full rounded-none border-b-4 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent text-sm font-black uppercase tracking-[0.2em] text-slate-400 data-[state=active]:text-slate-900 transition-all">About</TabsTrigger>
            </TabsList>

            <TabsContent value="reels" className="m-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-24">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <Card key={i} className="group rounded-[3rem] border-none shadow-sm overflow-hidden aspect-[9/16] relative cursor-pointer hover:shadow-2xl transition-all duration-700">
                    <Image 
                      src={`https://picsum.photos/seed/reel-media-${i}/400/700`} 
                      alt="Reel" 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 border border-white/30 shadow-2xl">
                        <PlayCircle className="h-10 w-10 fill-current" />
                      </div>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 space-y-3">
                      <p className="text-white font-black text-sm line-clamp-2 leading-snug drop-shadow-md tracking-tight">The beauty of patience in difficult times... #Sabr</p>
                      <div className="flex items-center gap-4 text-[10px] font-black text-white/80 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" /> 12.4k</span>
                        <span className="flex items-center gap-1.5"><Play className="h-3.5 w-3.5 fill-current" /> 150k</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="feed" className="m-0 space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-24">
              <div className="grid grid-cols-1 gap-10">
                {[1, 2].map(i => (
                  <Card key={i} className="rounded-[3.5rem] border-none shadow-sm bg-white overflow-hidden p-12 flex flex-col md:flex-row gap-12 hover:shadow-2xl transition-all duration-700 border border-transparent hover:border-blue-100 group/post">
                    <div className="relative w-full md:w-96 aspect-square rounded-[2.5rem] overflow-hidden shrink-0 shadow-2xl">
                      <Image src={`https://picsum.photos/seed/post-hub-${i}/800/800`} alt="Post" fill className="object-cover group-hover/post:scale-105 transition-transform duration-1000" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-4">
                      <div className="space-y-8">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight group-hover/post:text-blue-600 transition-colors">Lessons from the Seerah</h3>
                            <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em]">Published on Oct 24, 2024</p>
                          </div>
                          <Button variant="ghost" size="icon" className="rounded-2xl h-12 w-12 bg-slate-50 hover:bg-blue-50 text-slate-300 hover:text-blue-600 transition-all"><Bookmark className="h-6 w-6" /></Button>
                        </div>
                        <p className="text-slate-600 text-xl font-medium leading-relaxed line-clamp-3 italic">
                          "The life of the Prophet (PBUH) is a beacon of hope for all humanity. In this week's lesson, we explore the depth of his compassion toward those who sought to harm him..."
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-12 border-t-2 border-slate-50">
                        <div className="flex gap-10">
                          <button className="flex items-center gap-3 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors">
                            <Heart className="h-6 w-6" /> 2.4k
                          </button>
                          <button className="flex items-center gap-3 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-blue-500 transition-colors">
                            <MessageSquare className="h-6 w-6" /> 156
                          </button>
                        </div>
                        <Button variant="ghost" className="font-black text-xs uppercase tracking-widest text-blue-600 hover:bg-blue-50 px-6 h-12 rounded-xl">Read Full Article <ArrowUpRight className="ml-2 h-4 w-4" /></Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="podcasts" className="m-0 space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <Card key={i} className="rounded-[3rem] border-none shadow-sm bg-white p-10 group hover:shadow-2xl transition-all border border-transparent hover:border-blue-100">
                    <div className="flex items-center gap-10">
                      <div className="h-32 w-32 rounded-[2.5rem] bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                        <Image src={`https://picsum.photos/seed/pod-media-${i}/300/300`} alt="Pod" fill className="object-cover opacity-20" />
                        <Mic className="h-12 w-12 relative z-10 drop-shadow-lg" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-4">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Episode {i}</p>
                          <h3 className="text-2xl font-black text-slate-900 truncate leading-tight tracking-tight">Faith in the Modern Age</h3>
                        </div>
                        <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-blue-500" /> 45:00</span>
                          <span className="h-1 w-1 bg-slate-200 rounded-full" />
                          <span>12.4k Listens</span>
                        </div>
                      </div>
                      <Button size="icon" className="h-16 w-16 rounded-full bg-slate-900 text-white shadow-2xl hover:bg-blue-600 hover:scale-110 transition-all shrink-0">
                        <Play className="h-7 w-7 fill-current ml-1" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about" className="m-0 grid grid-cols-1 lg:grid-cols-12 gap-16 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-24">
              <div className="lg:col-span-8 space-y-16">
                <section className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="h-1 w-12 bg-blue-600 rounded-full" />
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">The Mission</h3>
                  </div>
                  <p className="text-2xl text-slate-600 font-medium leading-relaxed italic border-l-8 border-blue-50 pl-10">
                    "My goal is to bridge the gap between traditional Islamic wisdom and the complexities of modern life. Through storytelling and scholarly insights, we aim to inspire a generation of confident, ethical Muslims."
                  </p>
                </section>

                <section className="space-y-10">
                  <div className="flex items-center gap-4">
                    <div className="h-1 w-12 bg-emerald-600 rounded-full" />
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Verified Collaborations</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {[
                      { name: "The Bosphorus Kitchen", type: "Dining Partner", img: "food1", color: "text-orange-600", bg: "bg-orange-50" },
                      { name: "Modest Attire Co.", type: "Fashion Partner", img: "fashion1", color: "text-pink-600", bg: "bg-pink-50" },
                    ].map((collab, i) => (
                      <Card key={i} className="rounded-[3rem] border-none shadow-sm bg-white overflow-hidden group border border-transparent hover:border-emerald-100 hover:shadow-xl transition-all duration-500 cursor-pointer">
                        <div className="p-8 flex items-center gap-8">
                          <div className="relative h-20 w-20 rounded-[1.5rem] overflow-hidden shadow-2xl shrink-0 border-2 border-white ring-4 ring-slate-50">
                            <Image src={`https://picsum.photos/seed/collab-logo-${collab.img}/200/200`} alt="Collab" fill className="object-cover" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-xl font-black text-slate-900 tracking-tight">{collab.name}</p>
                            <Badge className={cn("border-none font-black text-[9px] uppercase tracking-widest px-3 h-6", collab.bg, collab.color)}>{collab.type}</Badge>
                          </div>
                          <ArrowUpRight className="h-6 w-6 text-slate-200 ml-auto group-hover:text-emerald-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-4 space-y-12">
                <Card className="rounded-[3.5rem] border-none shadow-2xl bg-white p-12 space-y-10 border border-slate-50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-5">
                    <Wallet className="h-32 w-32 text-blue-600" />
                  </div>
                  <div className="space-y-2 relative z-10">
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Support the Work</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                      If you benefit from this content, consider supporting our studio with Hub Coins to help us produce more high-fidelity media.
                    </p>
                  </div>
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center justify-between p-6 bg-blue-50 rounded-[2rem] border-2 border-blue-100 shadow-inner group cursor-pointer hover:bg-blue-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-md transition-transform group-hover:rotate-12">
                          <Wallet className="h-6 w-6" />
                        </div>
                        <span className="text-sm font-black text-blue-900 uppercase tracking-widest">My Wallet</span>
                      </div>
                      <span className="text-xl font-black text-blue-600">100</span>
                    </div>
                    <Button className="w-full h-16 rounded-[1.5rem] bg-slate-900 text-white font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:bg-blue-600 transition-all active:scale-95">
                      Gift 50 Hub Coins
                    </Button>
                  </div>
                </Card>

                <Card className="rounded-[3.5rem] border-none bg-slate-900 text-white p-12 space-y-8 relative overflow-hidden shadow-2xl group">
                  <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                    <ShieldCheck className="h-48 w-48 text-blue-400" />
                  </div>
                  <div className="relative z-10 space-y-6">
                    <div className="h-16 w-16 rounded-[1.5rem] bg-white/10 flex items-center justify-center text-blue-400 border border-white/10 shadow-3xl">
                      <Crown className="h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-3xl font-black tracking-tighter text-blue-400">Verified Authority</h4>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed italic">
                        This creator has been verified for scholarly accuracy by the Halal Hub content board.
                      </p>
                    </div>
                    <Button variant="outline" className="w-full h-14 rounded-2xl border-white/20 text-white hover:bg-white/10 font-black text-[10px] uppercase tracking-widest">
                      View Scholar Profile
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Floating Action for Mobile Owners */}
      <Link href="/vendor/creative/dashboard" className="md:hidden fixed bottom-24 right-6 z-50">
        <Button className="h-16 w-16 rounded-full bg-slate-900 text-white shadow-2xl border-4 border-white active:scale-90 transition-transform">
          <LayoutGrid className="h-8 w-8" />
        </Button>
      </Link>
    </div>
  )
}
