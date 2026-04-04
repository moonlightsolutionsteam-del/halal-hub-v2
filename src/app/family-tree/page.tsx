
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Network, Users, ShieldCheck, GitBranch, 
  ArrowUpRight, Clock, MapPin, UserPlus,
  Search, Filter, ChevronRight, History,
  Database, Share2, Info, CheckCircle2,
  Trash2, Edit2, Zap, AlertCircle, FileText,
  Upload, MoreVertical, ClipboardList, Calendar,
  Star, Heart, Sparkles, Plus, Settings,
  Target, Utensils, MapIcon, Globe, Download,
  Lock, Wallet, SwitchCamera, MessageSquare,
  Image as ImageIcon, HeartPulse
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function FamilyTreePage() {
  const [activeTab, setActiveTab] = React.useState("hub")
  const [mounted, setMounted] = React.useState(false)
  const [isKidsMode, setIsKidsMode] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={cn("container mx-auto p-6 space-y-10 max-w-6xl pb-24 transition-all duration-700", isKidsMode ? "bg-amber-50/30" : "bg-[#FBFBFB]")}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-[10px]">
            <Network className="h-3 w-3" /> Unified Family Ecosystem
          </div>
          <h1 className="text-4xl font-black font-headline text-slate-900 tracking-tight">
            {isKidsMode ? "Family Fun Zone 🌟" : "Family Hub & Lineage"}
          </h1>
          <p className="text-muted-foreground font-medium text-lg italic max-w-2xl">
            {isKidsMode ? "Play, learn, and grow with your family every day!" : "A high-fidelity space for daily coordination and the preservation of your ancestral legacy."}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl px-6 font-black border-2 h-14 bg-white shadow-sm gap-2" onClick={() => setIsKidsMode(!isKidsMode)}>
            <SwitchCamera className="h-4 w-4 text-emerald-600" /> {isKidsMode ? "Parent View" : "Kids Mode"}
          </Button>
          <Link href="/family-tree/setup">
            <Button variant="outline" className="rounded-2xl px-8 font-black border-2 h-14 bg-white shadow-sm hover:bg-slate-50 transition-all">
              <Settings className="h-4 w-4 mr-2" /> Hub Settings
            </Button>
          </Link>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-white border rounded-2xl h-16 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="hub" className="rounded-xl px-10 font-black text-xs uppercase tracking-widest h-full data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all">Family Hub</TabsTrigger>
          <TabsTrigger value="legacy" className="rounded-xl px-10 font-black text-xs uppercase tracking-widest h-full data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all">Legacy & Roots</TabsTrigger>
        </TabsList>

        {/* Tab 1: Family Hub (Coordination) */}
        <TabsContent value="hub" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {/* Family Moments Highlight Layer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Dinner planned tonight 🍽️", sub: "7:30 PM @ The Halal Grill", color: "bg-orange-50 text-orange-700", border: "border-orange-100", icon: Utensils, url: "/family-tree/events" },
              { label: "3 tasks pending", sub: "Assigned to Ibrahim & Fatima", color: "bg-blue-50 text-blue-700", border: "border-blue-100", icon: ClipboardList, url: "/family-tree/board" },
              { label: "New messages", sub: "Latest from Zaid & Fatima", color: "bg-emerald-50 text-emerald-700", border: "border-emerald-100", icon: MessageSquare, url: "/family-tree/chat" },
              { label: "Health Alert", sub: "Sarah's vaccination due soon", color: "bg-teal-50 text-teal-700", border: "border-teal-100", icon: HeartPulse, url: "/family-tree/health" },
            ].map((moment, i) => (
              <Link key={i} href={moment.url}>
                <Card className={cn("rounded-3xl border shadow-none p-5 transition-all hover:shadow-md cursor-pointer group h-full", moment.color, moment.border)}>
                  <div className="flex gap-4 items-center">
                    <div className="h-10 w-10 rounded-2xl bg-white/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <moment.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-black text-[13px] leading-tight">{moment.label}</p>
                      <p className="text-[10px] font-bold opacity-70 uppercase tracking-tight line-clamp-1">{moment.sub}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Chat Preview */}
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-8 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner group-hover:scale-110 transition-transform">
                    <MessageSquare className="h-7 w-7" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-2xl font-black text-slate-900">Family Chat</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Discussion</p>
                  </div>
                </div>
                <Link href="/family-tree/chat">
                  <Button variant="ghost" size="icon" className="rounded-2xl bg-slate-50 h-10 w-10"><ArrowUpRight className="h-5 w-5 text-emerald-600" /></Button>
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Fatima", text: "Added the grocery list...", time: "10:30 AM" },
                  { name: "Zaid", text: "Don't forget the chocolate milk! 🍫", time: "11:02 AM" }
                ].map((msg, i) => (
                  <div key={i} className="flex gap-3 items-start p-3 bg-slate-50/50 rounded-2xl">
                    <Avatar className="h-8 w-8 border-2 border-white">
                      <AvatarImage src={`https://picsum.photos/seed/${msg.name}/50/50`} />
                      <AvatarFallback>{msg.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-slate-900">{msg.name}</p>
                      <p className="text-xs text-slate-500 truncate italic">"{msg.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Expenses Summary Widget */}
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-8 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-110 transition-transform">
                    <Wallet className="h-7 w-7" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-2xl font-black text-slate-900">Expenses</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Shared spending</p>
                  </div>
                </div>
                <Link href="/family-tree/expenses">
                  <Button variant="ghost" size="icon" className="rounded-2xl bg-slate-50 h-10 w-10"><ArrowUpRight className="h-5 w-5 text-blue-600" /></Button>
                </Link>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Spent This Month</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-black text-slate-900 tracking-tighter">₹12,450</p>
                  <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] px-2">↓ 12%</Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">Recent: Groceries 🛒</span>
                  <span className="text-slate-900">₹850</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">Recent: Dinner 🍽️</span>
                  <span className="text-slate-900">₹1,200</span>
                </div>
              </div>
            </Card>

            {/* Shared Board Preview */}
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-8 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner group-hover:scale-110 transition-transform">
                    <ClipboardList className="h-7 w-7" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-2xl font-black text-slate-900">Family Board</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Shared tasks</p>
                  </div>
                </div>
                <Link href="/family-tree/board">
                  <Button variant="ghost" size="icon" className="rounded-2xl bg-slate-50 h-10 w-10"><ArrowUpRight className="h-5 w-5 text-emerald-600" /></Button>
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Buy Groceries", assigned: "Fatima", priority: true, time: "Due Today" },
                  { title: "Plan Outing", assigned: "Ibrahim", priority: false, time: "Oct 12" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-3xl border border-transparent hover:border-emerald-100 hover:bg-white hover:shadow-md transition-all cursor-pointer group/item">
                    <div className="flex items-center gap-5">
                      <div className={cn(
                        "h-4 w-4 rounded-full border-2",
                        item.priority ? "bg-amber-100 border-amber-500 animate-pulse" : "bg-white border-slate-200"
                      )} />
                      <p className="text-base font-black text-slate-800 truncate">{item.title}</p>
                    </div>
                    <span className="text-[10px] font-black text-slate-300 uppercase bg-white px-3 py-1 rounded-full shadow-sm">{item.time}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Health & Wellness Tracker */}
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-8 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-3xl bg-teal-50 flex items-center justify-center text-teal-600 shadow-inner group-hover:scale-110 transition-transform">
                    <HeartPulse className="h-7 w-7" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-2xl font-black text-slate-900">Wellness</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Health Tracker</p>
                  </div>
                </div>
                <Link href="/family-tree/health">
                  <Button variant="ghost" size="icon" className="rounded-2xl bg-slate-50 h-10 w-10"><ArrowUpRight className="h-5 w-5 text-teal-600" /></Button>
                </Link>
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">
                    <span>Sarah's Vaccination</span>
                    <span className="text-rose-600">Due in 5d</span>
                  </div>
                  <Progress value={85} className="h-2 bg-slate-50" />
                </div>
                <div className="p-4 bg-teal-50 rounded-2xl flex items-center gap-3">
                  <Activity className="h-4 w-4 text-teal-600" />
                  <p className="text-[10px] font-bold text-teal-800 uppercase tracking-widest">Last Hijama: Oct 12 (Ibrahim)</p>
                </div>
              </div>
            </Card>

            {/* Moments Gallery Preview */}
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-8 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-3xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-inner group-hover:scale-110 transition-transform">
                    <ImageIcon className="h-7 w-7" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-2xl font-black text-slate-900">Gallery</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Shared moments</p>
                  </div>
                </div>
                <Link href="/family-tree/gallery">
                  <Button variant="ghost" size="icon" className="rounded-2xl bg-slate-50 h-10 w-10"><ArrowUpRight className="h-5 w-5 text-purple-600" /></Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map(i => (
                  <div key={i} className="aspect-video relative rounded-2xl overflow-hidden shadow-sm group/media cursor-pointer">
                    <Image src={`https://picsum.photos/seed/moment-${i}/400/300`} alt="Moment" fill className="object-cover group-hover/media:scale-110 transition-transform duration-700" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Heritage Kitchen Preview */}
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-8 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-3xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-inner group-hover:scale-110 transition-transform">
                    <Utensils className="h-7 w-7" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-2xl font-black text-slate-900">Kitchen</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Heritage Vault</p>
                  </div>
                </div>
                <Link href="/family-tree/kitchen">
                  <Button variant="ghost" size="icon" className="rounded-2xl bg-slate-50 h-10 w-10"><ArrowUpRight className="h-5 w-5 text-amber-600" /></Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { img: "recipe-1", label: "Grandma's Biryani" },
                  { img: "recipe-2", label: "Friday Kunafa" }
                ].map((recipe, i) => (
                  <div key={i} className="aspect-square relative rounded-2xl overflow-hidden group/recipe cursor-pointer shadow-md">
                    <Image src={`https://picsum.photos/seed/${recipe.img}/400/400`} alt={recipe.label} fill className="object-cover group-hover/recipe:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover/recipe:opacity-90 transition-opacity" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-[10px] font-black text-white uppercase tracking-tighter leading-tight line-clamp-1">{recipe.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 2: Legacy & Roots (Preservation) */}
        <TabsContent value="legacy" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Verified Lineage Overview */}
            <Card className="md:col-span-2 rounded-[3rem] border-none shadow-sm bg-slate-900 text-white p-12 relative overflow-hidden flex flex-col justify-between min-h-[350px]">
              <FamilyTreeIcon className="absolute -top-4 -right-4 h-64 w-64 opacity-10 text-emerald-400" />
              <div className="relative z-10 space-y-10">
                <div className="space-y-3">
                  <Badge className="bg-emerald-500 text-white border-none font-black text-xs uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-2xl">OFFICIAL LINEAGE</Badge>
                  <h2 className="text-7xl font-black tracking-tighter drop-shadow-2xl">Al-Sayed Family</h2>
                  <Link href="/family-tree/lineage/roots" className="flex items-center gap-2 text-sm font-bold bg-white/10 backdrop-blur-xl w-fit px-6 py-2.5 rounded-full border border-white/10 hover:bg-white/20 transition-all shadow-2xl">
                    <MapPin className="h-4 w-4 text-emerald-400" /> Root Origin: Old Delhi, India <ArrowUpRight className="h-3 w-3 opacity-40" />
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-10">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-1">Total Nodes</p>
                    <p className="text-4xl font-black tracking-tighter">124</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-1">Generations</p>
                    <p className="text-4xl font-black tracking-tighter">5</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-1">Verified %</p>
                    <p className="text-4xl font-black text-emerald-400 tracking-tighter">92%</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pending Connections */}
            <Card className="rounded-[3rem] border-none shadow-sm bg-white p-10 space-y-10 flex flex-col justify-between group">
              <div className="space-y-8">
                <div className="flex items-center justify-between px-2">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Connections</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Awaiting Verification</p>
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px] px-4 py-1.5 rounded-full">3 PENDING</Badge>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Ahmed Abdullah", role: "Cousin (Claim)", time: "2h ago", img: "con1" },
                    { name: "Sara Malik", role: "Spouse (Verify)", time: "1d ago", img: "con2" },
                  ].map((conn, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-[2rem] border border-transparent hover:border-emerald-100 hover:bg-white hover:shadow-lg transition-all duration-500 cursor-pointer group/conn">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-md group-hover/conn:scale-105 transition-transform">
                          <AvatarImage src={`https://picsum.photos/seed/${conn.img}/100/100`} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-base font-black text-slate-800 leading-tight">{conn.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-tighter">{conn.role}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-200 group-hover/conn:text-emerald-600 group-hover/conn:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
              <Button variant="ghost" className="w-full font-black text-xs uppercase tracking-widest text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 h-14 rounded-2xl border-2 border-dashed border-slate-100">View All Requests</Button>
            </Card>
          </div>

          {/* Interactive Map Section */}
          <section className="space-y-8">
            <div className="flex items-center justify-between px-4">
              <div className="space-y-1">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Lineage Map</h2>
                <p className="text-sm font-medium text-slate-400 italic">Visual generational hierarchy spanning 5 centuries.</p>
              </div>
              <Link href="/family-tree/map">
                <Button variant="outline" className="rounded-2xl font-black text-xs uppercase tracking-[0.2em] border-2 h-14 px-10 bg-white hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm">
                  <Globe className="h-4 w-4 mr-2" /> Full Screen View
                </Button>
              </Link>
            </div>
            <Card className="rounded-[4rem] border-none shadow-xl bg-white h-[600px] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:32px:32px] opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-transparent to-white/40" />
              
              <div className="relative z-10 flex flex-col items-center gap-16 scale-110 sm:scale-100 transition-transform duration-1000 group-hover:scale-[1.02]">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-28 w-28 border-8 border-white shadow-2xl ring-4 ring-emerald-500/20">
                      <AvatarImage src="https://picsum.photos/seed/root/200/200" />
                      <AvatarFallback>RA</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-emerald-500 rounded-2xl flex items-center justify-center border-4 border-white shadow-xl">
                      <ShieldCheck className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-2xl font-black text-slate-900 tracking-tight">Dr. Ibrahim Al-Sayed</p>
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px] uppercase tracking-[0.2em] px-5 py-1.5 rounded-full shadow-sm">HEAD OF LINEAGE</Badge>
                  </div>
                </div>
                <div className="h-24 w-px bg-slate-200 relative">
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[400px] h-px bg-slate-200" />
                </div>
                <div className="grid grid-cols-3 gap-32">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex flex-col items-center gap-4 relative">
                      <div className="h-20 w-px bg-slate-200 absolute -top-20" />
                      <Avatar className="h-20 w-20 border-4 border-white shadow-2xl ring-2 ring-slate-50 group-hover:scale-110 transition-transform duration-500">
                        <AvatarImage src={`https://picsum.photos/seed/child${i}/150/150`} />
                        <AvatarFallback>C</AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <p className="text-sm font-black text-slate-700">Member {i}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Direct Node</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="absolute top-10 right-10 flex flex-col gap-3">
                <Button size="icon" variant="secondary" className="h-12 w-12 rounded-2xl bg-white/80 backdrop-blur-md shadow-xl border border-white hover:bg-white"><Plus className="h-5 w-5" /></Button>
                <Button size="icon" variant="secondary" className="h-12 w-12 rounded-2xl bg-white/80 backdrop-blur-md shadow-xl border border-white hover:bg-white"><Filter className="h-5 w-5" /></Button>
              </div>
            </Card>
          </section>

          {/* Audit & Preservation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[3rem] border-none shadow-sm overflow-hidden bg-white">
                <CardHeader className="p-10 border-b flex flex-row items-center justify-between bg-slate-50/30">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-black">History & Audits</CardTitle>
                    <p className="text-sm font-medium text-slate-400">Chronological verification and edit history.</p>
                  </div>
                  <Link href="/family-tree/lineage/history">
                    <Button variant="ghost" size="icon" className="rounded-2xl h-12 w-12 bg-white shadow-sm border hover:bg-slate-50"><History className="h-5 w-5 text-slate-400" /></Button>
                  </Link>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-50">
                    {[
                      { user: "Super Admin", action: "verified 'Hassan Al-Sayed' lineage claim.", time: "2h ago", icon: ShieldCheck, color: "text-emerald-500" },
                      { user: "System", action: "detected a potential duplicate in 'Delhi Branch'.", time: "5h ago", icon: AlertCircle, color: "text-amber-500" },
                      { user: "You", action: "added a new document to 'Grandfather records'.", time: "Yesterday", icon: FileText, color: "text-blue-500" },
                    ].map((log, i) => (
                      <div key={i} className="p-8 flex items-center gap-6 hover:bg-slate-50/50 transition-all cursor-default group">
                        <div className={`h-12 w-12 rounded-2xl ${log.color} bg-opacity-10 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform`}>
                          <log.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1 space-y-0.5">
                          <p className="text-base text-slate-600 font-medium leading-tight">
                            <span className="font-black text-slate-900">{log.user}</span> {log.action}
                          </p>
                          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{log.time}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical className="h-5 w-5 text-slate-300" /></Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[3rem] border-none shadow-sm bg-white p-10 space-y-8 group">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-900">Legacy Records</h3>
                  <Link href="/family-tree/lineage/documents">
                    <Button variant="ghost" size="sm" className="text-xs font-black uppercase text-emerald-600">View Vault</Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Birth Certificate - 1945", type: "PDF", size: "1.2 MB" },
                    { name: "Family Hajj Record", type: "JPG", size: "4.5 MB" },
                    { name: "Property Deed (Historical)", type: "PDF", size: "850 KB" },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-transparent hover:border-emerald-100 hover:bg-white hover:shadow-lg transition-all duration-500 cursor-pointer group/doc">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover/doc:text-emerald-600 shadow-sm transition-colors duration-500">
                          <FileText className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-800 leading-tight group-hover/doc:text-emerald-600 transition-colors">{doc.name}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">{doc.type} • {doc.size}</p>
                        </div>
                      </div>
                      <Download className="h-4 w-4 text-slate-300 group-hover/doc:text-emerald-600 transition-all" />
                    </div>
                  ))}
                </div>
                <Link href="/family-tree/lineage/documents">
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl h-16 font-black uppercase text-xs tracking-widest shadow-2xl group-hover:scale-[1.02] transition-transform">
                    <Upload className="h-4 w-4 mr-2" /> Upload Legacy
                  </Button>
                </Link>
              </Card>

              {/* Security Badge */}
              <Card className="rounded-[3rem] border-none bg-emerald-50 p-10 space-y-6 relative overflow-hidden border-2 border-emerald-100 shadow-inner">
                <Lock className="absolute -top-4 -right-4 h-24 w-24 opacity-10 text-emerald-600" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shadow-md">
                    <ShieldCheck className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h4 className="text-lg font-black text-emerald-900 uppercase tracking-tighter">Heritage Trust</h4>
                </div>
                <p className="text-xs font-medium text-emerald-800 leading-relaxed relative z-10">
                  Your lineage data is encrypted and only visible to confirmed family members. We follow strict theological data privacy standards.
                </p>
                <Button variant="outline" className="w-full rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 border-emerald-200 h-12 bg-white text-emerald-700 relative z-10 hover:bg-emerald-50">Read Privacy Charter</Button>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
