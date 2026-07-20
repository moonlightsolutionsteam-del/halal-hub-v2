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
  Plus, Moon, BookOpen, HeartPulse, Gift,
  Briefcase, Lock, ExternalLink
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAuth } from "@/hooks/use-auth"
import { useCapabilities } from "@/hooks/use-capabilities"
import { createClient } from "@/lib/supabase/client"

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

function getInitials(name: string | null | undefined): string {
  if (!name) return '?'
  return name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase()
}

function formatJoinDate(date: any): string {
  try {
    const d = new Date(date)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
  } catch { return '' }
}

type SuggestionRow = { id: string; place_name: string; category: string | null; status: string | null; created_at: string | null }
type MyReviewRow = { id: string; rating: number; body: string | null; created_at: string | null; businesses: { name: string } | null }

export default function UserDashboard() {
  const [mounted, setMounted] = React.useState(false)
  const { user, loading } = useAuth()
  const { capabilities, hasCapability, getCapability, loading: capsLoading } = useCapabilities()
  const [suggestions, setSuggestions] = React.useState<SuggestionRow[]>([])
  const [checkInCount, setCheckInCount] = React.useState<number | null>(null)
  const [savedCount, setSavedCount] = React.useState<number | null>(null)
  const [suggestionCount, setSuggestionCount] = React.useState<number | null>(null)
  const [myReviews, setMyReviews] = React.useState<MyReviewRow[]>([])
  const [myBusinesses, setMyBusinesses] = React.useState<Array<{ id: string; name: string; category: string; status: string; image_url: string | null }>>([])

  React.useEffect(() => {
    if (!user?.uid) return
    const supabase = createClient()
    ;supabase.from("businesses").select("id, name, category, status, image_url")
      .eq("owner_id", user.uid).order("created_at", { ascending: false })
      .then(({ data }: { data: any[] | null }) => { if (data) setMyBusinesses(data) })
  }, [user?.uid])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!user?.uid) return
    const supabase = createClient()
    ;supabase.from("suggestions").select("id, place_name, category, status, created_at")
      .eq("user_id", user.uid).order("created_at", { ascending: false }).limit(4)
      .then(({ data }: { data: SuggestionRow[] | null }) => { if (data) setSuggestions(data) })
    ;supabase.from("suggestions").select("id", { count: "exact", head: true })
      .eq("user_id", user.uid)
      .then(({ count }: { count: number | null }) => setSuggestionCount(count ?? 0))
    ;supabase.from("check_ins").select("id", { count: "exact", head: true })
      .eq("user_id", user.uid)
      .then(({ count }: { count: number | null }) => setCheckInCount(count ?? 0))
    ;supabase.from("saved_businesses").select("id", { count: "exact", head: true })
      .eq("user_id", user.uid)
      .then(({ count }: { count: number | null }) => setSavedCount(count ?? 0))
    ;supabase.from("business_reviews").select("id, rating, body, created_at, businesses(name)")
      .eq("user_id", user.uid).order("created_at", { ascending: false }).limit(4)
      .then(({ data }: { data: MyReviewRow[] | null }) => { if (data) setMyReviews(data) })
  }, [user?.uid])

  if (!mounted || loading) return null

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
                  {user?.photoURL && <AvatarImage src={user.photoURL} />}
                  <AvatarFallback className="text-4xl font-black bg-emerald-50 text-emerald-600">{getInitials(user?.name)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute bottom-3 right-3 h-8 w-8 sm:h-10 sm:w-10 bg-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center border-4 border-white shadow-xl">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4 sm:gap-8 pb-4">
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tighter">{user?.name ?? 'My Profile'}</h2>
                  <Badge className="bg-zinc-900 text-white border-none font-black text-[10px] uppercase tracking-widest px-3 h-6 sm:px-4 sm:h-7">ELITE MEMBER</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-muted-foreground font-bold">
                  <p className="text-sm sm:text-base text-emerald-600 font-black">@{user?.name?.split(' ')[0].toLowerCase() ?? 'user'}</p>
                  {user?.city && <p className="flex items-center gap-1.5 text-xs sm:text-sm"><MapPin className="h-3.5 w-3.5" /> {user.city}</p>}
                  {user?.createdAt && <p className="flex items-center gap-1.5 text-xs sm:text-sm hidden sm:flex"><Calendar className="h-3.5 w-3.5" /> Joined {formatJoinDate(user.createdAt)}</p>}
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
              { label: "Check-ins", value: (checkInCount ?? 0).toLocaleString(), icon: MapPin, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Saved Places", value: (savedCount ?? 0).toLocaleString(), icon: Heart, color: "text-rose-600", bg: "bg-rose-50" },
              { label: "Suggestions", value: (suggestionCount ?? 0).toLocaleString(), icon: Sparkles, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Hub Coins", value: (user?.halalCoinsBalance ?? 0).toLocaleString(), icon: Wallet, color: "text-amber-600", bg: "bg-amber-50" },
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

          {/* ── Action Buttons Hub ─────────────────────────────────────── */}
          <div className="mt-6 sm:mt-10">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">

              {/* Family Tree */}
              <Link href="/family-tree">
                <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-emerald-600 p-5 sm:p-7 h-[130px] sm:h-[150px] flex flex-col justify-between group cursor-pointer hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-black uppercase tracking-widest text-emerald-100/70">Lineage</p>
                    <h3 className="text-lg sm:text-xl font-black text-white leading-tight">Family Tree</h3>
                    <p className="text-xs font-medium text-emerald-100/60">Manage lineage & shared board</p>
                  </div>
                  <FamilyTreeIcon className="absolute -bottom-2 -right-2 h-20 w-20 text-white/10 group-hover:text-white/15 transition-colors" />
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors self-end">
                    <ChevronRight className="h-4 w-4 text-white" />
                  </div>
                </div>
              </Link>

              {/* Go Pro */}
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-zinc-900 p-5 sm:p-7 h-[130px] sm:h-[150px] flex flex-col justify-between group cursor-pointer hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-zinc-900/20">
                    <div className="space-y-0.5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Capabilities</p>
                      <h3 className="text-lg sm:text-xl font-black text-white leading-tight">Go Pro</h3>
                      <p className="text-xs font-medium text-zinc-400">Unlock premium hub tools</p>
                    </div>
                    <div className="absolute -bottom-2 -right-2 h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <Zap className="h-8 w-8 text-primary/30" />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/30 self-end">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-lg rounded-3xl p-0 overflow-hidden border-none">
                  <div className="bg-zinc-900 px-6 pt-6 pb-5">
                    <DialogHeader>
                      <DialogTitle className="text-white text-xl font-black">Unlock Your Capabilities</DialogTitle>
                      <DialogDescription className="text-zinc-400 text-sm font-medium mt-1">One Halal Hub identity. Multiple powers. Activate what you need.</DialogDescription>
                    </DialogHeader>
                  </div>
                  <div className="p-4 space-y-2.5">

                    {/* Consumer — always active */}
                    <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-black text-foreground">Consumer</p>
                          <Badge className="bg-primary/15 text-primary border-none font-black text-[9px] uppercase px-2 h-4">Active</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground font-medium mt-0.5">Browse, save, review, check in</p>
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    </div>

                    {/* Creator */}
                    {hasCapability("creator") ? (
                      <Link href="/vendor/creative/dashboard">
                        <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 p-4 flex items-center gap-3 group hover:border-blue-400 transition-all cursor-pointer">
                          <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-black text-foreground">Creator</p>
                              <Badge className="bg-blue-100 text-blue-700 border-none font-black text-[9px] uppercase px-2 h-4">Active</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground font-medium mt-0.5">Open Creator Studio</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 transition-colors shrink-0" />
                        </div>
                      </Link>
                    ) : getCapability("creator")?.status === "pending" ? (
                      <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-4 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                          <Sparkles className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-black text-foreground">Creator</p>
                            <Badge className="bg-amber-100 text-amber-700 border-none font-black text-[9px] uppercase px-2 h-4">Pending</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground font-medium mt-0.5">Under review</p>
                        </div>
                      </div>
                    ) : (
                      <Link href="/account/capabilities/creator">
                        <div className="rounded-2xl border-2 border-dashed border-border bg-card p-4 flex items-center gap-3 group hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all cursor-pointer">
                          <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                            <Sparkles className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-black text-muted-foreground group-hover:text-foreground transition-colors">Creator</p>
                            <p className="text-xs text-muted-foreground font-medium mt-0.5">Share content · Grow following</p>
                          </div>
                          <div className="h-6 w-6 rounded-full bg-muted group-hover:bg-blue-600 transition-colors flex items-center justify-center shrink-0">
                            <Plus className="h-3 w-3 text-muted-foreground group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      </Link>
                    )}

                    {/* Professional */}
                    {hasCapability("professional") ? (
                      <Link href="/vendor/professional/dashboard">
                        <div className="rounded-2xl border-2 border-violet-200 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/30 p-4 flex items-center gap-3 group hover:border-violet-400 transition-all cursor-pointer">
                          <div className="h-10 w-10 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                            <Briefcase className="h-5 w-5 text-violet-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-black text-foreground">Professional</p>
                              <Badge className="bg-violet-100 text-violet-700 border-none font-black text-[9px] uppercase px-2 h-4">Active</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground font-medium mt-0.5">Open Professional Dashboard</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-violet-600 transition-colors shrink-0" />
                        </div>
                      </Link>
                    ) : getCapability("professional")?.status === "pending" ? (
                      <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-4 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                          <Briefcase className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-black text-foreground">Professional</p>
                            <Badge className="bg-amber-100 text-amber-700 border-none font-black text-[9px] uppercase px-2 h-4">Pending Review</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground font-medium mt-0.5">24–48h approval</p>
                        </div>
                      </div>
                    ) : (
                      <Link href="/account/capabilities/professional">
                        <div className="rounded-2xl border-2 border-dashed border-border bg-card p-4 flex items-center gap-3 group hover:border-violet-400 hover:bg-violet-50/50 dark:hover:bg-violet-950/20 transition-all cursor-pointer">
                          <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-violet-100 transition-colors">
                            <Briefcase className="h-5 w-5 text-muted-foreground group-hover:text-violet-600 transition-colors" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-black text-muted-foreground group-hover:text-foreground transition-colors">Professional</p>
                            <p className="text-xs text-muted-foreground font-medium mt-0.5">Offer services · Receive bookings</p>
                          </div>
                          <div className="h-6 w-6 rounded-full bg-muted group-hover:bg-violet-600 transition-colors flex items-center justify-center shrink-0">
                            <Plus className="h-3 w-3 text-muted-foreground group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      </Link>
                    )}

                    {/* Business Owner */}
                    <div className="rounded-2xl border-2 border-border bg-card p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                            <Store className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-black text-foreground">Business Owner</p>
                              {myBusinesses.length > 0 && (
                                <Badge className="bg-emerald-100 text-emerald-700 border-none font-black text-[9px] uppercase px-2 h-4">{myBusinesses.length} {myBusinesses.length === 1 ? "Business" : "Businesses"}</Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground font-medium mt-0.5">Manage listings, orders & analytics</p>
                          </div>
                        </div>
                        <Link href="/partner/onboarding/business/category">
                          <Button size="sm" className="rounded-xl bg-primary text-white font-black text-xs h-8 px-3 shadow-sm shrink-0">
                            <Plus className="h-3 w-3 mr-1" /> Add
                          </Button>
                        </Link>
                      </div>
                      {myBusinesses.length > 0 && (
                        <div className="space-y-1.5">
                          {myBusinesses.slice(0, 2).map(biz => (
                            <Link key={biz.id} href="/partner/portal">
                              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
                                <div className="h-8 w-8 rounded-lg overflow-hidden bg-border shrink-0">
                                  {biz.image_url
                                    ? <img src={biz.image_url} alt={biz.name} className="h-full w-full object-cover" />
                                    : <div className="h-full w-full flex items-center justify-center"><Store className="h-3.5 w-3.5 text-muted-foreground" /></div>
                                  }
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-black text-foreground truncate">{biz.name}</p>
                                  <p className="text-[10px] text-muted-foreground truncate">{biz.category}</p>
                                </div>
                                <Badge className={cn("text-[9px] font-black border-none px-2 h-4 shrink-0", biz.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700")}>
                                  {biz.status === "active" ? "Live" : "Pending"}
                                </Badge>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </DialogContent>
              </Dialog>

            </div>
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
                    <div className="text-4xl sm:text-5xl font-black text-amber-600 tracking-tighter">{(user?.halalCoinsBalance ?? 0).toLocaleString()}</div>
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
                {suggestions.length === 0 ? (
                  <Card className="rounded-[2rem] border-none shadow-sm bg-card p-10 flex flex-col items-center gap-4 text-center">
                    <MapPin className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-bold text-muted-foreground">No suggestions yet</p>
                    <Link href="/suggest"><Button className="rounded-xl h-11 px-8 font-black text-xs bg-primary text-white">Suggest a Place</Button></Link>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {suggestions.map((s) => {
                      const statusMap: Record<string, { label: string; color: string }> = {
                        pending:  { label: "AUDIT IN PROGRESS", color: "bg-blue-50 text-blue-600 border-blue-100" },
                        approved: { label: "LIVE ON HUB",       color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
                        rejected: { label: "NOT LISTED",        color: "bg-red-50 text-red-600 border-red-100" },
                      }
                      const st = statusMap[s.status ?? "pending"] ?? statusMap["pending"]
                      const date = new Date(s.created_at ?? "").toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })
                      return (
                        <Card key={s.id} className="rounded-[1.5rem] sm:rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden p-4 sm:p-8 group hover:shadow-xl transition-all border-2 border-transparent hover:border-primary/10">
                          <div className="flex gap-4 sm:gap-8 items-start">
                            <div className="h-14 w-14 sm:h-20 sm:w-20 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 shadow-inner">
                              <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                            </div>
                            <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                              <Badge className={`${st.color} border-2 font-black text-[8px] uppercase tracking-widest h-6 px-2 sm:px-3 rounded-full`}>{st.label}</Badge>
                              <h4 className="text-base sm:text-xl font-black text-foreground truncate leading-tight">{s.place_name}</h4>
                              <div className="flex flex-col gap-1">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Submitted: {date}</p>
                                {s.category && <p className="text-[10px] font-bold text-muted-foreground capitalize">{s.category}</p>}
                                {s.status === "approved" && <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">+50 Points Earned</p>}
                              </div>
                            </div>
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                )}
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
                {myReviews.length === 0 ? (
                  <Card className="rounded-[2rem] border-none shadow-sm bg-card p-10 flex flex-col items-center gap-4 text-center">
                    <Star className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-bold text-muted-foreground">You haven't reviewed any businesses yet</p>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myReviews.map((review) => (
                      <Card key={review.id} className="rounded-[1.5rem] sm:rounded-[2.5rem] border-none shadow-sm bg-card p-5 sm:p-10 space-y-4 sm:space-y-6 border-2 border-transparent hover:border-emerald-100/50 transition-all group">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-1 bg-muted p-2 rounded-xl">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Star key={idx} className={`h-3.5 w-3.5 ${idx < review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />
                            ))}
                          </div>
                          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                            {new Date(review.created_at ?? "").toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                          </span>
                        </div>
                        {review.body && <p className="text-lg font-medium text-muted-foreground leading-relaxed italic border-l-4 border-emerald-50 pl-6 group-hover:border-emerald-200 transition-all">"{review.body}"</p>}
                        <div className="flex justify-between items-center pt-4">
                          <span className="text-xs font-black text-foreground uppercase tracking-tighter bg-muted px-4 py-1.5 rounded-full">{review.businesses?.name ?? "Business"}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
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
