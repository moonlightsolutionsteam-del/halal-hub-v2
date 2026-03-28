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
    <div className="min-h-screen bg-[#FBFBFB]">
      {/* Profile Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b px-6 h-20 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-slate-50 border shadow-sm h-12 w-12">
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
          </Link>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black font-headline text-slate-900 tracking-tight">Creator Profile</h1>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Verified Impact Hub</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-2xl h-12 w-12 border shadow-sm">
            <Share2 className="h-5 w-5 text-slate-600" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-2xl h-12 w-12 border shadow-sm">
            <MoreVertical className="h-5 w-5 text-slate-600" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative">
        {/* Banner */}
        <div className="h-[35vh] min-h-[300px] w-full relative overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/creator-banner/1600/600" 
            alt="Creator Banner" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Profile Info Overlay */}
        <div className="container mx-auto max-w-5xl px-6 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row items-end gap-8 pb-8">
            <div className="relative shrink-0">
              <Avatar className="h-40 w-40 border-[6px] border-white shadow-2xl rounded-[3rem]">
                <AvatarImage src="https://picsum.photos/seed/creator-main/300/300" />
                <AvatarFallback className="text-4xl font-black">HA</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-2 right-2 h-10 w-10 bg-blue-600 rounded-2xl flex items-center justify-center border-4 border-white shadow-xl">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
            </div>
            
            <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-6 pb-2">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-4xl font-black text-white md:text-slate-900 drop-shadow-sm font-headline tracking-tight">Shaykh Hamza</h2>
                  <Badge className="bg-blue-50 text-blue-600 border-none font-black text-[10px] uppercase tracking-widest px-4 h-7">Islamic Scholar</Badge>
                </div>
                <div className="flex items-center gap-4 text-slate-400 font-bold">
                  <p className="text-sm">@hamza_legacy</p>
                  <span className="h-1 w-1 rounded-full bg-slate-200" />
                  <p className="text-sm flex items-center gap-1.5"><MapPin className="h-4 w-4" /> London, UK</p>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Button className="flex-1 md:flex-none h-14 px-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-200 transition-all active:scale-95">
                  Follow
                </Button>
                <Button variant="outline" className="flex-1 md:flex-none h-14 px-8 rounded-2xl border-2 font-black uppercase text-xs tracking-widest bg-white hover:bg-slate-50 transition-all">
                  <MessageSquare className="h-4 w-4 mr-2" /> Message
                </Button>
                <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-2 bg-white text-amber-500 shadow-sm">
                  <Zap className="h-6 w-6 fill-current" />
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-10 border-y border-slate-100">
            {[
              { label: "Followers", value: "125k", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Reach", value: "1.2M", icon: Play, color: "text-purple-600", bg: "bg-purple-50" },
              { label: "Engagement", value: "8.4%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Awards", value: "12", icon: Award, color: "text-amber-600", bg: "bg-amber-50" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-default">
                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{stat.value}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="reels" className="w-full mt-10">
            <TabsList className="bg-transparent h-12 w-full p-0 gap-10 justify-start border-b rounded-none mb-10 overflow-x-auto no-scrollbar">
              <TabsTrigger value="reels" className="px-0 pb-4 h-full rounded-none border-b-4 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent text-sm font-black uppercase tracking-[0.2em] text-slate-400 data-[state=active]:text-slate-900 transition-all">Reels</TabsTrigger>
              <TabsTrigger value="feed" className="px-0 pb-4 h-full rounded-none border-b-4 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent text-sm font-black uppercase tracking-[0.2em] text-slate-400 data-[state=active]:text-slate-900 transition-all">Feed</TabsTrigger>
              <TabsTrigger value="podcasts" className="px-0 pb-4 h-full rounded-none border-b-4 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent text-sm font-black uppercase tracking-[0.2em] text-slate-400 data-[state=active]:text-slate-900 transition-all">Podcasts</TabsTrigger>
              <TabsTrigger value="about" className="px-0 pb-4 h-full rounded-none border-b-4 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent text-sm font-black uppercase tracking-[0.2em] text-slate-400 data-[state=active]:text-slate-900 transition-all">About</TabsTrigger>
            </TabsList>

            <TabsContent value="reels" className="m-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-24">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <Card key={i} className="group rounded-[2.5rem] border-none shadow-sm overflow-hidden aspect-[9/16] relative cursor-pointer hover:shadow-2xl transition-all duration-500">
                    <Image 
                      src={`https://picsum.photos/seed/reel-${i}/400/700`} 
                      alt="Reel" 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 border border-white/30">
                        <PlayCircle className="h-8 w-8 fill-current" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 space-y-2">
                      <p className="text-white font-bold text-sm line-clamp-2 leading-snug drop-shadow-md">The beauty of patience in difficult times... #Sabr</p>
                      <div className="flex items-center gap-3 text-[10px] font-black text-white/80 uppercase tracking-tighter">
                        <span className="flex items-center gap-1"><Heart className="h-3 w-3 fill-rose-500 text-rose-500" /> 12.4k</span>
                        <span className="flex items-center gap-1"><Play className="h-3 w-3 fill-current" /> 150k</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="feed" className="m-0 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-24">
              <div className="grid grid-cols-1 gap-8">
                {[1, 2].map(i => (
                  <Card key={i} className="rounded-[3rem] border-none shadow-sm bg-white overflow-hidden p-10 flex flex-col md:flex-row gap-10 hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-blue-50">
                    <div className="relative w-full md:w-80 aspect-square rounded-[2rem] overflow-hidden shrink-0 shadow-lg">
                      <Image src={`https://picsum.photos/seed/post-${i}/600/600`} alt="Post" fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div className="space-y-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Lessons from the Seerah</h3>
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Published on Oct 24, 2024</p>
                          </div>
                          <Button variant="ghost" size="icon" className="rounded-xl"><Bookmark className="h-5 w-5 text-slate-300" /></Button>
                        </div>
                        <p className="text-slate-600 text-lg font-medium leading-relaxed line-clamp-3">
                          The life of the Prophet (PBUH) is a beacon of hope for all humanity. In this week's lesson, we explore the depth of his compassion toward those who sought to harm him...
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-10 border-t border-slate-50">
                        <div className="flex gap-8">
                          <button className="flex items-center gap-2.5 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-colors">
                            <Heart className="h-5 w-5" /> 2.4k
                          </button>
                          <button className="flex items-center gap-2.5 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-blue-500 transition-colors">
                            <MessageSquare className="h-5 w-5" /> 156
                          </button>
                        </div>
                        <Button variant="ghost" className="font-black text-xs uppercase tracking-widest text-blue-600">Read Article <ArrowRight className="ml-2 h-4 w-4" /></Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="podcasts" className="m-0 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <Card key={i} className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 group hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-100">
                    <div className="flex items-center gap-8">
                      <div className="h-24 w-24 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                        <Image src={`https://picsum.photos/seed/pod-${i}/200/200`} alt="Pod" fill className="object-cover opacity-20" />
                        <Mic className="h-10 w-10 relative z-10" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Episode {i}</p>
                        <h3 className="text-xl font-black text-slate-900 truncate leading-tight">Faith in the Modern Age</h3>
                        <div className="flex items-center gap-4 mt-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> 45:00</span>
                          <span>•</span>
                          <span>12.4k Listens</span>
                        </div>
                      </div>
                      <Button size="icon" className="h-12 w-12 rounded-full bg-slate-900 text-white shadow-xl hover:bg-blue-600 transition-all shrink-0">
                        <Play className="h-5 w-5 fill-current" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about" className="m-0 grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-24">
              <div className="lg:col-span-8 space-y-12">
                <section className="space-y-6">
                  <h3 className="text-2xl font-black text-slate-900">The Mission</h3>
                  <p className="text-xl text-slate-600 font-medium leading-relaxed italic">
                    "My goal is to bridge the gap between traditional Islamic wisdom and the complexities of modern life. Through storytelling and scholarly insights, we aim to inspire a generation of confident, ethical Muslims."
                  </p>
                </section>

                <section className="space-y-6">
                  <h3 className="text-2xl font-black text-slate-900">Featured Collaborations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { name: "The Bosphorus Kitchen", type: "Dining Partner", img: "food1" },
                      { name: "Modest Attire Co.", type: "Fashion Partner", img: "fashion1" },
                    ].map((collab, i) => (
                      <Card key={i} className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden group border-2 border-transparent hover:border-blue-100 transition-all cursor-pointer">
                        <div className="p-6 flex items-center gap-6">
                          <div className="relative h-16 w-16 rounded-2xl overflow-hidden shadow-md shrink-0">
                            <Image src={`https://picsum.photos/seed/${collab.img}/200/200`} alt="Collab" fill className="object-cover" />
                          </div>
                          <div>
                            <p className="text-lg font-black text-slate-900">{collab.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{collab.type}</p>
                          </div>
                          <ArrowUpRight className="h-5 w-5 text-slate-300 ml-auto group-hover:text-blue-600 transition-colors" />
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>
              </div>

              <div className="lg:col-span-4 space-y-10">
                <Card className="rounded-[3rem] border-none shadow-sm bg-white p-10 space-y-8">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Support the Work</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    If you benefit from this content, consider supporting our studio with Hub Coins to help us produce more high-fidelity media.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border-2 border-blue-100">
                      <div className="flex items-center gap-3">
                        <Wallet className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-black text-blue-900">Your Wallet</span>
                      </div>
                      <span className="text-lg font-black text-blue-600">100 Coins</span>
                    </div>
                    <Button className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black uppercase text-xs tracking-widest shadow-xl hover:bg-blue-600 transition-all">Gift 50 Coins</Button>
                  </div>
                </Card>

                <Card className="rounded-[3rem] border-none bg-slate-900 text-white p-10 space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <ShieldCheck className="h-32 w-32" />
                  </div>
                  <div className="relative z-10 space-y-4">
                    <div className="h-14 w-14 rounded-3xl bg-white/10 flex items-center justify-center text-blue-400 border border-white/10 shadow-2xl">
                      <ShieldCheck className="h-8 w-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-black tracking-tight">Verified Scholar</h4>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        This creator has been verified for scholarly accuracy by the Halal Hub content board.
                      </p>
                    </div>
                    <Button variant="outline" className="w-full h-12 rounded-xl border-white/20 text-white hover:bg-white/10 font-black text-[10px] uppercase tracking-widest">View Credentials</Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
