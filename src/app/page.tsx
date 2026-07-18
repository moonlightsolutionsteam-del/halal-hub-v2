"use client"

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Map, List, Store, Moon, MessageSquare, MessageCircle,
  Heart, Calendar, ChevronRight,
  Building2, Clock, Star, MapPin, Coins,
  PenTool, ShoppingCart, ArrowRight,
  Search, BookOpen, ShieldCheck, Mic,
  Users, Briefcase, Sparkles, Flame,
  Play, TrendingUp, Zap, Globe, HandHelping,
  Camera, Play as PlayIcon, Tag, Megaphone, HelpCircle, ThumbsUp,
  Award, BadgeCheck,
} from "lucide-react";
import { CreatePostModal } from "@/components/create-post-modal";
import { formatPrayerTime } from "@/lib/ummah-api";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePrayerSnapshot } from "@/lib/use-prayer-snapshot";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useSmartGreeting } from "@/hooks/use-smart-greeting";
import { FaithMomentCard } from "@/components/faith-moment-card";
import { useCapabilities } from "@/hooks/use-capabilities";

// ─── Types ───────────────────────────────────────────────────────────────────

type LiveBizType = { id: string; name: string; category: string; rating: number; image_url: string | null; city: string | null; halal_verified: boolean }
type FeedPostRow = { id: string; display_name: string | null; description: string | null; media_url: string | null; firebase_media_url: string | null; place_name: string | null; created_at: string }
type CreatorRow = { user_id: string; display_name: string | null; category: string | null; content_categories: string[] | null; profile?: { name: string | null; photo_url: string | null } | null }
type ProfessionalRow = { user_id: string; profession: string | null; availability: string | null; city: string | null; skills: string[] | null; bio: string | null; profile?: { name: string | null; photo_url: string | null } | null }
type CatalogItem = { id: string; name: string; price: number | null; image_url: string | null; business?: { name: string; image_url: string | null } | null }

// ─── Static data ─────────────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  { name: "Directory", icon: List,         url: "/categories",    color: "text-primary",    bg: "bg-primary/10" },
  { name: "Prayer",    icon: Moon,         url: "/prayer-times",  color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-950/40" },
  { name: "Map",       icon: Map,          url: "/map",           color: "text-sky-500",    bg: "bg-sky-50 dark:bg-sky-950/40" },
  { name: "Events",    icon: Calendar,     url: "/events",        color: "text-amber-500",  bg: "bg-amber-50 dark:bg-amber-950/40" },
  { name: "Feed",      icon: Flame,        url: "/feed",          color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/40" },
  { name: "Mosques",   icon: Building2,    url: "/mosques",       color: "text-teal-500",   bg: "bg-teal-50 dark:bg-teal-950/40" },
  { name: "Shop",      icon: ShoppingCart, url: "/marketplace",   color: "text-rose-500",   bg: "bg-rose-50 dark:bg-rose-950/40" },
  { name: "Charity",   icon: Heart,        url: "/charity",       color: "text-red-500",    bg: "bg-red-50 dark:bg-red-950/40" },
];

const FEATURED_BANNERS = [
  {
    id: 0,
    tag: "Top Pick · Restaurants",
    title: "Discover India's\nBest Halal Dining",
    sub: "50+ verified halal restaurants near you",
    cta: "Explore Restaurants",
    url: "/categories/food",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=500&fit=crop&auto=format&q=80",
    accent: "from-black/80 via-black/40 to-transparent",
  },
  {
    id: 1,
    tag: "Islamic Travel",
    title: "Plan Your Halal\nGetaway Today",
    sub: "Umrah packages, halal resorts & more",
    cta: "Browse Travel",
    url: "/categories/travel",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop&auto=format&q=80",
    accent: "from-black/80 via-black/40 to-transparent",
  },
  {
    id: 2,
    tag: "Modest Fashion · New",
    title: "Explore the Latest\nModest Collections",
    sub: "Designer abayas, hijabs & occasion wear",
    cta: "Shop Fashion",
    url: "/categories/fashion",
    img: "https://images.unsplash.com/photo-1612307057748-b44842539a29?w=800&h=500&fit=crop&auto=format&q=80",
    accent: "from-black/70 via-black/30 to-transparent",
  },
  {
    id: 3,
    tag: "Events This Week",
    title: "Islamic Conferences\n& Community Events",
    sub: "Networking, knowledge & connections",
    cta: "View Events",
    url: "/events",
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=500&fit=crop&auto=format&q=80",
    accent: "from-black/80 via-black/40 to-transparent",
  },
];

const CATEGORIES = ["All", "Food", "Healthcare", "Fashion", "Finance", "Travel", "Grocery", "Events"];

const HOME_COMPOSER_ACTIONS = [
  { icon: Camera,        label: "Photo",      type: "photo",          tint: "bg-blue-50 dark:bg-blue-950/30",    iconColor: "text-blue-600 dark:text-blue-400" },
  { icon: PlayIcon,      label: "Video",      type: "video",          tint: "bg-purple-50 dark:bg-purple-950/30",iconColor: "text-purple-600 dark:text-purple-400" },
  { icon: MessageCircle, label: "Discussion", type: "discussion",      tint: "bg-sky-50 dark:bg-sky-950/30",      iconColor: "text-sky-600 dark:text-sky-400" },
  { icon: Star,          label: "Review",     type: "review",          tint: "bg-amber-50 dark:bg-amber-950/30",  iconColor: "text-amber-600 dark:text-amber-400" },
  { icon: Calendar,      label: "Event",      type: "event",           tint: "bg-violet-50 dark:bg-violet-950/30",iconColor: "text-violet-600 dark:text-violet-400" },
  { icon: ThumbsUp,      label: "Recommend",  type: "recommendation",  tint: "bg-teal-50 dark:bg-teal-950/30",    iconColor: "text-teal-600 dark:text-teal-400" },
  { icon: Tag,           label: "Offer",      type: "offer",           tint: "bg-orange-50 dark:bg-orange-950/30",iconColor: "text-orange-600 dark:text-orange-400" },
  { icon: Megaphone,     label: "Update",     type: "business_update", tint: "bg-emerald-50 dark:bg-emerald-950/30",iconColor: "text-emerald-600 dark:text-emerald-400" },
  { icon: HelpCircle,    label: "Question",   type: "question",        tint: "bg-indigo-50 dark:bg-indigo-950/30",iconColor: "text-indigo-600 dark:text-indigo-400" },
];

const FAITH_TOOLS = [
  { icon: BookOpen, label: "Quran", desc: "Read & recite daily", url: "/quran", gradient: "from-emerald-600 to-emerald-800" },
  { icon: Coins, label: "Zakat", desc: "Calculate your obligation", url: "/zakat", gradient: "from-amber-500 to-amber-700" },
  { icon: Heart, label: "Charity", desc: "Give & make an impact", url: "/charity", gradient: "from-rose-500 to-rose-700" },
  { icon: HandHelping, label: "Volunteer", desc: "Serve the community", url: "/volunteer", gradient: "from-sky-500 to-sky-700" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mapCategory(category: string): string {
  const c = (category || "").toLowerCase()
  if (c.includes("food") || c.includes("dining") || c.includes("restaurant")) return "Food"
  if (c.includes("health")) return "Healthcare"
  if (c.includes("fashion") || c.includes("modest")) return "Fashion"
  if (c.includes("finance") || c.includes("banking")) return "Finance"
  if (c.includes("travel") || c.includes("tourism")) return "Travel"
  if (c.includes("grocery")) return "Grocery"
  if (c.includes("event")) return "Events"
  return "Food"
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return "just now"
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function getInitials(name: string | null | undefined): string {
  if (!name) return "H"
  return name.trim().split(/\s+/).map((w: string) => w[0]).slice(0, 2).join("").toUpperCase()
}

// ─── Component ────────────────────────────────────────────────────────────────

// Reusable section header
function SectionHeader({ eyebrow, title, linkLabel, linkUrl }: { eyebrow: string; title: string; linkLabel?: string; linkUrl?: string }) {
  return (
    <div className="px-4 flex items-center justify-between mb-3">
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground">{eyebrow}</p>
        <h2 className="text-lg font-black text-foreground leading-tight">{title}</h2>
      </div>
      {linkLabel && linkUrl && (
        <Link href={linkUrl}>
          <div className="flex items-center gap-0.5 text-primary text-xs font-black">
            {linkLabel} <ChevronRight className="h-3 w-3" />
          </div>
        </Link>
      )}
    </div>
  )
}

export default function Home() {
  const [time, setTime] = useState<Date | null>(null);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  // Live data
  const [liveBizList, setLiveBizList] = useState<LiveBizType[]>([]);
  const [feedPosts, setFeedPosts] = useState<FeedPostRow[]>([]);
  const [creators, setCreators] = useState<CreatorRow[]>([]);
  const [professionals, setProfessionals] = useState<ProfessionalRow[]>([]);
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [liveStats, setLiveStats] = useState<{ businesses: number; members: number; posts: number; creators: number } | null>(null);

  const [composerOpen, setComposerOpen] = useState(false);
  const [composerType, setComposerType] = useState<string | null>(null);
  const openComposer = (type?: string) => { setComposerType(type ?? null); setComposerOpen(true); };

  const { user } = useAuth();
  const { hasCapability } = useCapabilities();
  const { text: greetingText, subtext: greetingSubtext } = useSmartGreeting(user?.name, user?.uid);
  const { prayerData, loading: prayerLoading, countdown, nextPrayerName, nextPrayerTime, locationName, timeFormat } = usePrayerSnapshot();
  const bannerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    bannerRef.current = setInterval(() => {
      setBannerIdx(i => (i + 1) % FEATURED_BANNERS.length);
    }, 5000);
    return () => { if (bannerRef.current) clearInterval(bannerRef.current); };
  }, []);

  useEffect(() => {
    if (!user?.uid) return
    const supabase = createClient()
    ;supabase.rpc("bump_streak", { p_streak_type: "daily_checkin" })
  }, [user?.uid]);

  // ── Live data fetches (all parallel) ────────────────────────────────────────
  useEffect(() => {
    const supabase = createClient()

    // Businesses for Recommended section
    supabase
      .from("businesses")
      .select("id, name, category, rating, image_url, city, halal_verified")
      .eq("status", "active")
      .order("rating", { ascending: false })
      .limit(16)
      .then(({ data }) => { if (data?.length) setLiveBizList(data as LiveBizType[]) })

    // Community Pulse — latest feed posts
    ;supabase
      .from("feed_posts")
      .select("id, display_name, description, media_url, firebase_media_url, place_name, created_at")
      .order("created_at", { ascending: false })
      .limit(4)
      .then(({ data }: { data: FeedPostRow[] | null }) => { if (data?.length) setFeedPosts(data) })

    // Creator Spotlight — activated creators joined with profiles
    ;supabase
      .from("creator_profiles")
      .select("user_id, display_name, category, content_categories, profiles(name, photo_url)")
      .order("created_at", { ascending: false })
      .limit(8)
      .then(({ data }: { data: any[] | null }) => {
        if (data?.length) setCreators(data.map((r: any) => ({ ...r, profile: r.profiles })))
      })

    // Featured Professionals
    ;supabase
      .from("professional_profiles")
      .select("user_id, profession, availability, city, skills, bio, profiles(name, photo_url)")
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }: { data: any[] | null }) => {
        if (data?.length) setProfessionals(data.map((r: any) => ({ ...r, profile: r.profiles })))
      })

    // Marketplace Picks — catalog items with business images
    ;supabase
      .from("business_catalog_items")
      .select("id, name, price, image_url, businesses(name, image_url)")
      .not("price", "is", null)
      .order("created_at", { ascending: false })
      .limit(4)
      .then(({ data }: { data: any[] | null }) => {
        if (data?.length) setCatalogItems(data.map((r: any) => ({ ...r, business: r.businesses })))
      })

    // Live stats
    Promise.all([
      supabase.from("businesses").select("id", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("feed_posts").select("id", { count: "exact", head: true }),
      supabase.from("creator_profiles").select("user_id", { count: "exact", head: true }),
    ]).then(([biz, mem, posts, cre]) => {
      setLiveStats({
        businesses: (biz as any).count ?? 0,
        members: (mem as any).count ?? 0,
        posts: (posts as any).count ?? 0,
        creators: (cre as any).count ?? 0,
      })
    })
  }, []);

  const formattedDate = time
    ? time.toLocaleDateString([], { weekday: "short", day: "numeric", month: "long" })
    : "---";

  const baseRecs = liveBizList.length > 0
    ? liveBizList.map(b => ({
        name: b.name,
        cat: b.category,
        rating: b.rating ?? 4.5,
        open: true,
        badge: b.halal_verified ? "Halal Certified" : "Verified",
        img: b.image_url || "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&auto=format&q=80",
        url: `/entities/${b.id}`,
        category: mapCategory(b.category ?? ""),
      }))
    : []

  const filteredRecs = activeCategory === "All"
    ? baseRecs
    : baseRecs.filter(r => r.category === activeCategory);

  const banner = FEATURED_BANNERS[bannerIdx];

  const STATS_CONFIG = [
    { label: "Active Businesses", value: liveStats ? liveStats.businesses.toLocaleString() : "…", icon: Building2, color: "text-primary", bg: "bg-primary/10", url: "/categories" },
    { label: "Community Members", value: liveStats ? liveStats.members.toLocaleString() : "…", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", url: "/community" },
    { label: "Community Posts", value: liveStats ? liveStats.posts.toLocaleString() : "…", icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-500/10", url: "/feed" },
    { label: "Active Creators", value: liveStats ? liveStats.creators.toLocaleString() : "…", icon: Sparkles, color: "text-amber-500", bg: "bg-amber-500/10", url: "/creators" },
  ];

  return (
    <>
    <div className="pb-12 overflow-x-hidden">

      {/* ── 1. HERO COMMAND CENTER ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden mx-4 mt-4 rounded-[2rem] bg-gradient-to-br from-zinc-900 via-emerald-950 to-zinc-900">
        {/* Geometric glow orbs */}
        <div className="absolute top-0 right-0 w-56 h-56 bg-emerald-500/20 rounded-full blur-3xl -translate-y-16 translate-x-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/25 rounded-full blur-2xl translate-y-10 -translate-x-10 pointer-events-none" />
        {/* Islamic star pattern overlay */}
        <div className="absolute inset-0 opacity-[0.055] pointer-events-none" aria-hidden>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="istar" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
                <path d="M32 4L36.2 20.8L53 24L36.2 27.2L32 44L27.8 27.2L11 24L27.8 20.8Z" fill="white"/>
                <circle cx="32" cy="24" r="3.5" fill="white" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#istar)"/>
          </svg>
        </div>

        <div className="relative px-6 pt-7 pb-6 space-y-4">
          {/* Date + greeting */}
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.35em] text-white/40">{formattedDate}</p>
            <h1 className="text-[2rem] font-black text-white tracking-tight leading-tight mt-1">{greetingText}</h1>
            {greetingSubtext && <p className="text-xs font-bold text-emerald-400 mt-1">{greetingSubtext}</p>}
          </div>

          {/* Prayer countdown pill */}
          <Link href="/prayer-times">
            <div className="inline-flex items-center gap-3 bg-white/[0.08] border border-white/10 rounded-2xl px-4 py-2.5 hover:bg-white/[0.12] transition-colors">
              <Moon className="h-4 w-4 text-emerald-400 shrink-0" />
              {prayerLoading ? (
                <div className="h-4 w-40 bg-white/20 rounded animate-pulse" />
              ) : !prayerData ? (
                <p className="text-sm font-black text-white/70">Tap to set your location</p>
              ) : (
                <div className="flex items-baseline gap-2.5">
                  <span className="text-sm font-black text-white/70">{nextPrayerName}</span>
                  <span className="text-base font-black text-emerald-400 tabular-nums tracking-tight">
                    {String(countdown.hours).padStart(2, "0")}:{String(countdown.minutes).padStart(2, "0")}:{String(countdown.seconds).padStart(2, "0")}
                  </span>
                  {nextPrayerTime && (
                    <span className="text-[11px] text-white/35 font-bold">{formatPrayerTime(nextPrayerTime, timeFormat)}</span>
                  )}
                </div>
              )}
              <ChevronRight className="h-3.5 w-3.5 text-white/25 shrink-0 ml-auto" />
            </div>
          </Link>

          {/* Search bar */}
          <Link href="/search" className="block">
            <div className="flex items-center gap-3 bg-white/[0.08] border border-white/10 rounded-2xl px-4 py-3 hover:bg-white/[0.12] transition-colors">
              <Search className="h-4 w-4 text-white/35 shrink-0" />
              <span className="text-sm text-white/35 flex-1 font-medium">Restaurants, mosques, events…</span>
              <div className="h-4 w-px bg-white/15" />
              <Mic className="h-4 w-4 text-white/35 shrink-0" />
            </div>
          </Link>
        </div>
      </div>

      {/* ── 2. QUICK ACTION GRID ──────────────────────────────────────────── */}
      <div className="px-4 pt-5 pb-1">
        <div className="grid grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action) => (
            <Link key={action.name} href={action.url} className="group">
              <div className={cn(
                "rounded-2xl py-4 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 group-hover:-translate-y-0.5",
                action.bg
              )}>
                <action.icon className={cn("h-6 w-6", action.color)} />
                <span className={cn("text-[10px] font-black leading-none", action.color)}>{action.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Capabilities strip (pro users only) ───────────────────────────── */}
      {user && (hasCapability("creator") || hasCapability("professional") || hasCapability("business_owner")) && (
        <div className="px-4 pt-4 flex flex-wrap gap-2">
          {hasCapability("creator") && (
            <Link href="/vendor/creative/dashboard">
              <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 text-[10px] font-black px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-800">
                <Sparkles className="h-3 w-3" /> Creator Studio
              </div>
            </Link>
          )}
          {hasCapability("professional") && (
            <Link href="/vendor/professional/dashboard">
              <div className="flex items-center gap-1.5 bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 text-[10px] font-black px-3 py-1.5 rounded-full border border-violet-200 dark:border-violet-800">
                <Briefcase className="h-3 w-3" /> Professional
              </div>
            </Link>
          )}
          {hasCapability("business_owner") && (
            <Link href="/partner/portal">
              <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-[10px] font-black px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                <Store className="h-3 w-3" /> My Business
              </div>
            </Link>
          )}
        </div>
      )}

      {/* ── 3. POST COMPOSER ──────────────────────────────────────────────── */}
      <div className="mx-4 mt-4 bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3">
          <button onClick={() => openComposer()}>
            <Avatar className="h-10 w-10 shrink-0 border-2 border-card shadow-sm ring-1 ring-primary/20">
              {user?.photoURL && <AvatarImage src={user.photoURL} />}
              <AvatarFallback className="bg-primary/10 text-primary font-black text-sm">
                {getInitials(user?.name)}
              </AvatarFallback>
            </Avatar>
          </button>
          <button
            onClick={() => openComposer()}
            className="flex-1 text-left bg-muted hover:bg-muted/80 transition-colors rounded-2xl px-4 py-2.5 text-sm text-muted-foreground font-medium"
          >
            Share something with the Ummah…
          </button>
        </div>
        <div className="overflow-x-auto no-scrollbar px-4 pb-4">
          <div className="flex items-center gap-2 w-max">
            {HOME_COMPOSER_ACTIONS.map(({ icon: Icon, label, type, tint, iconColor }) => (
              <button
                key={label}
                onClick={() => openComposer(type)}
                className={cn(
                  "flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full whitespace-nowrap border border-transparent transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0",
                  tint, iconColor
                )}
              >
                <Icon className="h-3.5 w-3.5" /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. FEATURED EDITORIAL BANNER ──────────────────────────────────── */}
      <div className="px-4 pt-5 pb-1">
        <div
          className="relative rounded-3xl overflow-hidden h-64 lg:h-72 cursor-pointer shadow-lg"
          onClick={() => { if (bannerRef.current) clearInterval(bannerRef.current); }}
        >
          <Link href={banner.url} className="block h-full">
            <Image
              src={banner.img}
              alt={banner.title}
              fill
              className="object-cover transition-all duration-700"
              priority
            />
            <div className={cn("absolute inset-0 bg-gradient-to-t", banner.accent)} />
            <div className="absolute inset-0 flex flex-col justify-end p-6 space-y-2">
              <Badge className="w-fit bg-white/20 backdrop-blur-md text-white border-white/30 text-[10px] font-black uppercase tracking-wider">
                {banner.tag}
              </Badge>
              <h2 className="text-2xl font-black text-white leading-tight whitespace-pre-line tracking-tight">
                {banner.title}
              </h2>
              <p className="text-xs font-bold text-white/75">{banner.sub}</p>
              <div className="flex items-center justify-between pt-1">
                <div className="inline-flex items-center gap-1.5 bg-white text-primary text-xs font-black px-4 py-2 rounded-full shadow-lg">
                  {banner.cta} <ArrowRight className="h-3 w-3" />
                </div>
                <div className="flex gap-1.5">
                  {FEATURED_BANNERS.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.preventDefault(); setBannerIdx(i); }}
                      className={cn(
                        "rounded-full transition-all duration-300",
                        i === bannerIdx ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* ── 4. FAITH MOMENT ───────────────────────────────────────────────── */}
      <div className="pt-5">
        <FaithMomentCard />
      </div>

      {/* ── 5. RECOMMENDED FOR YOU ────────────────────────────────────────── */}
      <section className="pt-5 pb-1">
        <SectionHeader eyebrow="Personalised" title="Recommended for You" linkLabel="See All" linkUrl="/categories" />

        {/* Category filter pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "shrink-0 px-4 py-1.5 rounded-full text-xs font-black transition-all duration-200",
                activeCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/30"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2-column card grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 px-4">
          {filteredRecs.slice(0, 8).map((biz, i) => (
            <Link key={i} href={biz.url} className="group">
              <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5">
                <div className="relative h-36 overflow-hidden">
                  <Image src={biz.img} alt={biz.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-2 left-2">
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-white">
                      {biz.badge}
                    </span>
                  </div>
                  <div className={cn(
                    "absolute top-2 right-2 h-2 w-2 rounded-full ring-2 ring-background",
                    biz.open ? "bg-green-400" : "bg-red-400"
                  )} />
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-xs font-black text-foreground leading-tight line-clamp-1">{biz.name}</p>
                  <p className="text-[10px] font-bold text-muted-foreground line-clamp-1">{biz.cat}</p>
                  <div className="flex items-center justify-between pt-0.5">
                    <div className="flex items-center gap-1">
                      <Star className="h-2.5 w-2.5 text-amber-400 fill-amber-400" />
                      <span className="text-[10px] font-black">{biz.rating}</span>
                    </div>
                    {(biz as any).dist && (
                      <div className="flex items-center gap-0.5 text-[10px] text-muted-foreground font-bold">
                        <MapPin className="h-2.5 w-2.5" />{(biz as any).dist}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 6. COMMUNITY PULSE ────────────────────────────────────────────── */}
      <section className="px-4 pt-8 pb-1">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-muted-foreground flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Live Activity
            </p>
            <h2 className="text-lg font-black text-foreground">Community Pulse</h2>
          </div>
          <Link href="/feed">
            <div className="flex items-center gap-0.5 text-primary text-xs font-black">
              Open Feed <ChevronRight className="h-3 w-3" />
            </div>
          </Link>
        </div>
        <div className="space-y-3">
          {feedPosts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border text-center py-8 text-xs font-black text-muted-foreground">
              No posts yet — be the first to share!
            </div>
          ) : feedPosts.slice(0, 2).map((post, i) => (
            <Link key={post.id ?? i} href="/feed" className="block group">
              <div className="rounded-2xl bg-card border border-border/50 p-4 hover:shadow-md transition-shadow space-y-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-9 w-9 shrink-0 ring-2 ring-primary/20">
                    <AvatarFallback>{getInitials(post.display_name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-foreground">{post.display_name || "Halal Hub Member"}</span>
                      <span className="text-[10px] text-muted-foreground ml-auto">{timeAgo(post.created_at)}</span>
                    </div>
                    <p className="text-xs font-medium text-foreground/80 mt-1.5 leading-relaxed line-clamp-2">{post.description || "Shared a moment with the community."}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  {post.place_name ? (
                    <span className="text-[9px] font-black px-2.5 py-1 rounded-full bg-primary/10 text-primary flex items-center gap-1">
                      <MapPin className="h-2.5 w-2.5" />{post.place_name}
                    </span>
                  ) : (
                    <span className="text-[9px] font-black px-2.5 py-1 rounded-full bg-primary/10 text-primary">Community</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
          <Link href="/feed" className="block">
            <div className="rounded-2xl border border-dashed border-border text-center py-3.5 text-xs font-black text-primary hover:bg-primary/5 transition-colors">
              Join the conversation →
            </div>
          </Link>
        </div>
      </section>

      {/* ── 7. UPCOMING EVENTS ────────────────────────────────────────────── */}
      <section className="pt-8 pb-1 px-4">
        <SectionHeader eyebrow="This Week" title="Events Near You" />
        <div className="rounded-2xl border border-dashed border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/20 p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center mx-auto">
            <Calendar className="h-6 w-6 text-amber-500" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-black text-foreground">Events Coming Soon</p>
            <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
              Community events will appear here once members and businesses start posting. Be the first to host one!
            </p>
          </div>
          <Link href="/partner/portal">
            <div className="inline-flex items-center gap-1.5 bg-amber-500 text-white text-xs font-black px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
              <PenTool className="h-3.5 w-3.5" /> Post an Event
            </div>
          </Link>
        </div>
      </section>

      {/* ── 8. CREATOR SPOTLIGHT ──────────────────────────────────────────── */}
      <section className="pt-8 pb-1">
        <SectionHeader eyebrow="Original Content" title="Creator Spotlight" linkLabel="All Creators" linkUrl="/creators" />
        {creators.length === 0 ? (
          <div className="px-4">
            <div className="rounded-2xl border border-dashed border-border text-center py-6 space-y-2">
              <Sparkles className="h-6 w-6 text-muted-foreground mx-auto" />
              <p className="text-xs font-black text-muted-foreground">No creators yet</p>
              <Link href="/account/capabilities/creator">
                <span className="text-xs font-black text-primary">Become a Creator →</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 pb-1">
            {creators.map((creator) => {
              const name = creator.display_name || creator.profile?.name || "Creator"
              const tag = creator.content_categories?.[0] || creator.category || "Content"
              const photoUrl = creator.profile?.photo_url
              return (
                <Link key={creator.user_id} href="/creators" className="flex flex-col items-center gap-2 min-w-[72px] group">
                  <div className="relative p-0.5 rounded-full bg-gradient-to-br from-primary via-emerald-400 to-teal-300">
                    <div className="p-0.5 rounded-full bg-background">
                      <Avatar className="h-14 w-14">
                        {photoUrl && <AvatarImage src={photoUrl} />}
                        <AvatarFallback>{getInitials(name)}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <div className="text-center space-y-0.5">
                    <p className="text-[10px] font-black text-foreground line-clamp-1 leading-tight">{name}</p>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">{tag}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {/* ── 9. FEATURED PROFESSIONALS ─────────────────────────────────────── */}
      <section className="pt-8 pb-1">
        <SectionHeader eyebrow="Verified Experts" title="Featured Professionals" linkLabel="View All" linkUrl="/professionals" />
        {professionals.length === 0 ? (
          <div className="px-4">
            <div className="rounded-2xl border border-dashed border-border text-center py-6 space-y-2">
              <Briefcase className="h-6 w-6 text-muted-foreground mx-auto" />
              <p className="text-xs font-black text-muted-foreground">No professionals listed yet</p>
              <Link href="/account/capabilities/professional">
                <span className="text-xs font-black text-primary">List Your Services →</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-1 lg:grid lg:grid-cols-5 lg:gap-3 lg:overflow-x-visible">
            {professionals.map((pro) => {
              const name = pro.profile?.name || "Professional"
              const isAvailable = pro.availability === "available"
              const photoUrl = pro.profile?.photo_url
              return (
                <Link key={pro.user_id} href="/professionals" className="shrink-0 w-44 lg:w-auto group">
                  <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5">
                    <div className="relative h-28 bg-gradient-to-br from-primary/10 to-emerald-50 dark:to-emerald-950/20 flex items-center justify-center">
                      <Avatar className="h-16 w-16 border-4 border-background shadow-md">
                        {photoUrl && <AvatarImage src={photoUrl} className="object-cover" />}
                        <AvatarFallback>{getInitials(name)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute top-2 right-2 h-6 w-6 bg-primary rounded-full flex items-center justify-center shadow-sm">
                        <ShieldCheck className="h-3 w-3 text-white" />
                      </div>
                      <div className={cn(
                        "absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-black px-2 py-0.5 rounded-full whitespace-nowrap",
                        isAvailable ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400" : "bg-muted text-muted-foreground"
                      )}>
                        {isAvailable ? "Available Now" : "Busy"}
                      </div>
                    </div>
                    <div className="p-3 space-y-1">
                      <p className="text-xs font-black text-foreground leading-tight line-clamp-1">{name}</p>
                      <p className="text-[10px] font-bold text-muted-foreground line-clamp-1">{pro.profession || "Professional"}</p>
                      {pro.skills?.[0] && (
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-primary/10 text-primary">{pro.skills[0]}</span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {/* ── 10. MARKETPLACE PICKS ─────────────────────────────────────────── */}
      <section className="px-4 pt-8 pb-1">
        <SectionHeader eyebrow="Deals & Trending" title="Marketplace Picks" linkLabel="Shop All" linkUrl="/marketplace" />
        {catalogItems.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border text-center py-6 space-y-2">
            <ShoppingCart className="h-6 w-6 text-muted-foreground mx-auto" />
            <p className="text-xs font-black text-muted-foreground">No products listed yet</p>
            <Link href="/partner/portal">
              <span className="text-xs font-black text-primary">List Your Products →</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {catalogItems.map((item) => {
              const img = item.image_url || item.business?.image_url
              return (
                <Link key={item.id} href="/marketplace" className="group">
                  <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      {img && <Image src={img} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />}
                      {!img && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ShoppingCart className="h-8 w-8 text-muted-foreground/40" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-primary text-white">New</span>
                      </div>
                    </div>
                    <div className="p-3 space-y-1">
                      <p className="text-xs font-black text-foreground line-clamp-1">{item.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-primary">
                          {item.price != null ? `$${item.price.toFixed(2)}` : "—"}
                        </span>
                      </div>
                      {item.business?.name && (
                        <p className="text-[9px] text-muted-foreground font-bold line-clamp-1">{item.business.name}</p>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {/* ── 10b. HALAL CERTIFICATION ──────────────────────────────────────── */}
      <section className="px-4 pt-8 pb-1">
        <SectionHeader eyebrow="Trust & Compliance" title="Halal Certification" linkLabel="View All Bodies" linkUrl="/certification-bodies" />
        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-zinc-900 relative">
          {/* Pattern */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cert-star" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M24 3L27.2 15.6L40 18L27.2 20.4L24 33L20.8 20.4L8 18L20.8 15.6Z" fill="white"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cert-star)"/>
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl -translate-y-8 translate-x-8 pointer-events-none" />

          <div className="relative p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-11 w-11 rounded-2xl bg-emerald-400/20 flex items-center justify-center shrink-0">
                <Award className="h-6 w-6 text-emerald-300" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400">CICOT Recognised · 52 Countries</p>
                <p className="text-base font-black text-white leading-tight">146 Halal Certification Bodies</p>
                <p className="text-[11px] text-white/55 font-medium leading-relaxed">
                  Browse globally recognised certifiers, apply for certification, or claim your body's profile.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link href="/certification-bodies">
                <div className="flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 transition-colors text-white text-xs font-black px-3 py-2.5 rounded-2xl">
                  <BadgeCheck className="h-3.5 w-3.5" /> Browse Bodies
                </div>
              </Link>
              <Link href="/vendor/verification">
                <div className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-black px-3 py-2.5 rounded-2xl border border-white/15">
                  <ShieldCheck className="h-3.5 w-3.5" /> Apply for Certification
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10c. DISCOVER ON MAP ──────────────────────────────────────────── */}
      <section className="px-4 pt-8 pb-1">
        <SectionHeader eyebrow="Near You" title="Discover on Map" linkLabel="Open Map" linkUrl="/map" />
        <Link href="/map">
          <div className="relative rounded-3xl overflow-hidden h-44 bg-gradient-to-br from-sky-500 to-indigo-600 group active:scale-[0.98] transition-transform">
            {/* OSM tile preview */}
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=72.7,18.9,73.1,19.3&layer=mapnik&marker=19.076,72.8777"
              className="absolute inset-0 w-full h-full opacity-70 pointer-events-none"
              style={{ border: 0 }}
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 via-transparent to-transparent" />
            {/* CTA content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
              <div>
                <p className="text-white font-black text-base leading-tight">Halal places around you</p>
                <p className="text-white/70 text-xs font-medium mt-0.5">Restaurants · Mosques · Meat shops & more</p>
              </div>
              <div className="flex items-center gap-1.5 bg-white text-sky-700 font-black text-xs px-3 py-2 rounded-full shadow-lg">
                <MapPin className="h-3.5 w-3.5" /> Explore
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* ── 11. FAITH & GIVING ────────────────────────────────────────────── */}
      <section className="px-4 pt-8 pb-1">
        <SectionHeader eyebrow="Spiritual Tools" title="Faith & Giving" />
        <div className="grid grid-cols-2 gap-3">
          {FAITH_TOOLS.map((item) => (
            <Link key={item.label} href={item.url} className="group">
              <div className={cn(
                "rounded-2xl p-5 bg-gradient-to-br space-y-8 relative overflow-hidden transition-all active:scale-95 group-hover:-translate-y-0.5",
                item.gradient
              )}>
                {/* Faint circle decoration */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />
                <item.icon className="h-7 w-7 text-white relative" />
                <div className="relative">
                  <p className="text-base font-black text-white leading-tight">{item.label}</p>
                  <p className="text-[11px] font-medium text-white/65 mt-0.5">{item.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 12. FEATURED READING ──────────────────────────────────────────── */}
      <section className="px-4 pt-8 pb-1">
        <SectionHeader eyebrow="Community Stories" title="From the Feed" linkLabel="Open Feed" linkUrl="/feed" />
        {feedPosts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border text-center py-6 space-y-2">
            <BookOpen className="h-6 w-6 text-muted-foreground mx-auto" />
            <p className="text-xs font-black text-muted-foreground">Community posts will appear here</p>
            <Link href="/feed">
              <span className="text-xs font-black text-primary">Go to Feed →</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Hero post — first item with a media URL if available */}
            {(() => {
              const hero = feedPosts.find(p => p.media_url || p.firebase_media_url) ?? feedPosts[0]
              const heroImg = hero.media_url || hero.firebase_media_url
              return (
                <Link href="/feed" className="block group">
                  <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
                    {heroImg ? (
                      <div className="relative h-48 overflow-hidden">
                        <Image src={heroImg} alt={hero.description || "Community post"} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                        <div className="absolute top-3 left-3 flex items-center gap-1 bg-primary text-white text-[9px] font-black px-2.5 py-1 rounded-full">
                          <Flame className="h-2.5 w-2.5" />Latest
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
                          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white">
                            {hero.display_name || "Community"}
                          </span>
                          <p className="text-base font-black text-white leading-tight line-clamp-2">{hero.description || "Shared something with the community."}</p>
                          <p className="text-[10px] text-white/65 font-bold">{timeAgo(hero.created_at)}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 space-y-2">
                        <div className="flex items-center gap-1 text-[9px] font-black text-primary">
                          <Flame className="h-2.5 w-2.5" />Latest Post
                        </div>
                        <p className="text-base font-black text-foreground leading-tight">{hero.description || "Shared something with the community."}</p>
                        <p className="text-[10px] text-muted-foreground font-bold">{hero.display_name || "Community"} · {timeAgo(hero.created_at)}</p>
                      </div>
                    )}
                  </div>
                </Link>
              )
            })()}

            {/* Supporting cards — up to 2 more */}
            {feedPosts.filter((_, i) => i > 0).slice(0, 2).length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {feedPosts.filter((_, i) => i > 0).slice(0, 2).map((post) => {
                  const img = post.media_url || post.firebase_media_url
                  return (
                    <Link key={post.id} href="/feed" className="group">
                      <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5">
                        {img ? (
                          <div className="relative h-28 overflow-hidden">
                            <Image src={img} alt={post.description || "Post"} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>
                        ) : (
                          <div className="h-28 bg-gradient-to-br from-primary/10 to-emerald-50 dark:to-emerald-950/20 flex items-center justify-center">
                            <MessageSquare className="h-8 w-8 text-primary/30" />
                          </div>
                        )}
                        <div className="p-3 space-y-1">
                          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-primary/10 text-primary">{post.display_name || "Community"}</span>
                          <p className="text-[11px] font-black text-foreground leading-tight line-clamp-2">{post.description || "Shared a moment."}</p>
                          <p className="text-[9px] font-bold text-muted-foreground">{timeAgo(post.created_at)}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── 13. PLATFORM STATS ────────────────────────────────────────────── */}
      <section className="px-4 pt-8 pb-1">
        <SectionHeader eyebrow="By the Numbers" title="Halal Hub at a Glance" />
        <div className="grid grid-cols-2 gap-3">
          {STATS_CONFIG.map((stat, i) => (
            <Link key={i} href={stat.url} className="group">
              <div className="rounded-2xl bg-card border border-border/50 p-5 space-y-4 hover:shadow-md transition-shadow group-hover:-translate-y-0.5">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.bg)}>
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
                <div>
                  <p className={cn("text-3xl font-black tracking-tight tabular-nums", stat.color)}>{stat.value}</p>
                  <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-0.5">{stat.label}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 14. CLOSING CTA ───────────────────────────────────────────────── */}
      <div className="px-4 pt-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-zinc-900">
          {/* Same star pattern */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="istar2" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
                  <path d="M32 4L36.2 20.8L53 24L36.2 27.2L32 44L27.8 27.2L11 24L27.8 20.8Z" fill="white"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#istar2)"/>
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -translate-y-12 translate-x-12 pointer-events-none" />
          <div className="relative px-6 py-10 text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
            <div className="space-y-1.5">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">The Complete Muslim Life App</p>
              <h3 className="text-2xl font-black text-white leading-tight tracking-tight">
                India's Halal<br />Super-App
              </h3>
            </div>
            <p className="text-[11px] text-zinc-500 font-medium leading-relaxed max-w-xs mx-auto">
              Directory · Prayer · Community · Events · Creators · Professionals · Marketplace · Family · Faith
            </p>
            <Link href="/explore">
              <div className="inline-flex items-center gap-2 bg-primary text-white text-sm font-black px-7 py-3 rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
                Explore Everything <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>
      </div>

    </div>

    <CreatePostModal
      open={composerOpen}
      initialType={composerType as any}
      onClose={() => setComposerOpen(false)}
      onPosted={() => setComposerOpen(false)}
    />
    </>
  );
}
