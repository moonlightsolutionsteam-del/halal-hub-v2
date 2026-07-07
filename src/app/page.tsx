"use client"

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Map, List, Store, Moon, MessageSquare,
  Heart, Calendar, ChevronRight,
  Building2, Clock, Star, MapPin, Coins,
  PenTool, ShoppingCart, ArrowRight,
  Search, BookOpen, ShieldCheck, Mic,
  Users, Briefcase, Sparkles, Flame,
  Play, TrendingUp, Zap, Globe, HandHelping,
} from "lucide-react";
import { formatPrayerTime } from "@/lib/ummah-api";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePrayerSnapshot } from "@/lib/use-prayer-snapshot";

// ─── Static data ─────────────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  { name: "Directory", icon: List,        url: "/categories",    color: "text-primary",    bg: "bg-primary/10" },
  { name: "Prayer",    icon: Moon,        url: "/prayer-times",  color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-950/40" },
  { name: "Map",       icon: Map,         url: "/map",           color: "text-sky-500",    bg: "bg-sky-50 dark:bg-sky-950/40" },
  { name: "Events",    icon: Calendar,    url: "/events",        color: "text-amber-500",  bg: "bg-amber-50 dark:bg-amber-950/40" },
  { name: "Feed",      icon: Flame,       url: "/feed",          color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/40" },
  { name: "Mosques",   icon: Building2,   url: "/mosques",       color: "text-teal-500",   bg: "bg-teal-50 dark:bg-teal-950/40" },
  { name: "Shop",      icon: ShoppingCart,url: "/marketplace",   color: "text-rose-500",   bg: "bg-rose-50 dark:bg-rose-950/40" },
  { name: "Charity",   icon: Heart,       url: "/charity",       color: "text-red-500",    bg: "bg-red-50 dark:bg-red-950/40" },
  { name: "Creators",  icon: PenTool,     url: "/creators",      color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/40" },
];

const FEATURED_BANNERS = [
  {
    id: 0,
    tag: "Top Pick · Restaurants",
    title: "Discover Mumbai's\nBest Halal Dining",
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

const RECOMMENDED = [
  { name: "Istanbul Grill House", cat: "Turkish Restaurant", rating: 4.9, dist: "0.4 km", open: true, badge: "Halal Certified", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&auto=format&q=80", url: "/categories/food", category: "Food" },
  { name: "Noor Health Clinic", cat: "Healthcare", rating: 4.8, dist: "1.1 km", open: true, badge: "Verified", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop&auto=format&q=80", url: "/categories/healthcare", category: "Healthcare" },
  { name: "Amanah Islamic Bank", cat: "Shariah Finance", rating: 4.9, dist: "0.8 km", open: true, badge: "AAOIFI Cert", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&auto=format&q=80", url: "/entities/fin1", category: "Finance" },
  { name: "Modest Attire Co.", cat: "Fashion Boutique", rating: 4.7, dist: "2.3 km", open: false, badge: "New", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop&auto=format&q=80", url: "/categories/fashion", category: "Fashion" },
  { name: "Al-Madina Feast", cat: "Arabic & Levantine", rating: 4.8, dist: "0.9 km", open: true, badge: "Top Rated", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&auto=format&q=80", url: "/categories/food", category: "Food" },
  { name: "Sunnah Fresh Mart", cat: "Organic Grocery", rating: 4.6, dist: "1.4 km", open: true, badge: "Organic", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&auto=format&q=80", url: "/categories/grocery", category: "Grocery" },
  { name: "Halal Journeys", cat: "Travel & Umrah", rating: 4.9, dist: "3.2 km", open: true, badge: "Featured", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop&auto=format&q=80", url: "/categories/travel", category: "Travel" },
  { name: "Grand Halal Ballroom", cat: "Event Venue", rating: 4.9, dist: "1.8 km", open: true, badge: "Premium", img: "https://images.unsplash.com/photo-1497644083578-611b798c60f3?w=400&h=300&fit=crop&auto=format&q=80", url: "/categories/events", category: "Events" },
];

const EVENTS = [
  { title: "Islamic Finance Summit 2026", date: "Sat 12 Jul", time: "10:00 AM", location: "Manhattan, NY", type: "Networking", going: 234, img: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=250&fit=crop&auto=format&q=80" },
  { title: "Quran & Seerah Intensive", date: "Sun 13 Jul", time: "9:00 AM", location: "Brooklyn, NY", type: "Education", going: 158, img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop&auto=format&q=80" },
  { title: "Community Iftar Gathering", date: "Fri 18 Jul", time: "7:30 PM", location: "Queens, NY", type: "Community", going: 412, img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=250&fit=crop&auto=format&q=80" },
];

const COMMUNITY_POSTS = [
  { avatar: "https://randomuser.me/api/portraits/men/21.jpg", name: "Ahmad K.", handle: "@ahmadkhan", time: "2h ago", text: "Just tried the new Turkish spot on 5th Ave — absolutely 🔥 The lamb köfte is unreal. Definitely halal certified.", likes: 142, replies: 23, tag: "Food Review" },
  { avatar: "https://randomuser.me/api/portraits/women/35.jpg", name: "Fatima H.", handle: "@fatimah", time: "4h ago", text: "Question for the community: best Shariah-compliant investment options in 2026? Looking for REIT alternatives.", likes: 89, replies: 47, tag: "Finance" },
  { avatar: "https://randomuser.me/api/portraits/men/55.jpg", name: "Yusuf T.", handle: "@yusuft", time: "6h ago", text: "Alhamdulillah — our community volunteer day planted 200 trees in Queens! Jazakallah khair to everyone who joined 🌱", likes: 312, replies: 61, tag: "Community" },
];

const PROFESSIONALS = [
  { name: "Dr. Aisha Rahman", role: "General Physician", specialty: "Healthcare", rating: 4.9, reviews: 142, open: true, img: "https://randomuser.me/api/portraits/women/44.jpg", verified: true },
  { name: "Ustadh Ibrahim", role: "Islamic Scholar", specialty: "Education", rating: 5.0, reviews: 88, open: true, img: "https://randomuser.me/api/portraits/men/33.jpg", verified: true },
  { name: "Mufti Yusuf Ali", role: "Shariah Advisor", specialty: "Finance", rating: 4.8, reviews: 61, open: false, img: "https://randomuser.me/api/portraits/men/52.jpg", verified: true },
  { name: "Arch. Fatima Hassan", role: "Interior Designer", specialty: "Creative", rating: 4.7, reviews: 34, open: true, img: "https://randomuser.me/api/portraits/women/29.jpg", verified: false },
  { name: "Br. Hassan Malik", role: "Halal Auditor", specialty: "Certification", rating: 4.9, reviews: 207, open: true, img: "https://randomuser.me/api/portraits/men/14.jpg", verified: true },
];

const MARKETPLACE = [
  { name: "Pure Argan Oil", price: "₹28", orig: "₹45", tag: "38% off", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&auto=format&q=80" },
  { name: "Medjool Dates Box", price: "₹19", orig: "₹24", tag: "Popular", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=300&h=300&fit=crop&auto=format&q=80" },
  { name: "Halal Protein Blend", price: "₹42", orig: "₹55", tag: "New", img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=300&fit=crop&auto=format&q=80" },
  { name: "Oud Bakhoor Set", price: "₹35", orig: "₹50", tag: "Top Seller", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=300&fit=crop&auto=format&q=80" },
];

const CREATORS = [
  { name: "Halal.Chef", avatar: "https://randomuser.me/api/portraits/women/12.jpg", tag: "Food" },
  { name: "ModestMoments", avatar: "https://randomuser.me/api/portraits/women/8.jpg", tag: "Fashion" },
  { name: "IslaamicFinance", avatar: "https://randomuser.me/api/portraits/men/19.jpg", tag: "Finance" },
  { name: "TravelWithNur", avatar: "https://randomuser.me/api/portraits/women/38.jpg", tag: "Travel" },
  { name: "Quran.Daily", avatar: "https://randomuser.me/api/portraits/men/47.jpg", tag: "Faith" },
  { name: "HalalFoodie", avatar: "https://randomuser.me/api/portraits/women/62.jpg", tag: "Food" },
];

const BLOGS = [
  { title: "The Complete Guide to Halal Investing in 2026", category: "Finance", readTime: "8 min", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&h=400&fit=crop&auto=format&q=80", hot: true },
  { title: "Top 10 Halal Restaurants in Mumbai", category: "Food", readTime: "5 min", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop&auto=format&q=80", hot: false },
  { title: "How to Plan a Halal-Friendly Family Trip", category: "Travel", readTime: "6 min", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=250&fit=crop&auto=format&q=80", hot: false },
];

const STATS = [
  { label: "Active Businesses", value: "45,892", icon: Building2, color: "text-primary", bg: "bg-primary/10", url: "/categories" },
  { label: "Community Members", value: "1.2M", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", url: "/community" },
  { label: "Verified Certificates", value: "12,554", icon: ShieldCheck, color: "text-amber-500", bg: "bg-amber-500/10", url: "/categories" },
  { label: "Community Posts", value: "482K", icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-500/10", url: "/feed" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Home() {
  const [time, setTime] = useState<Date | null>(null);
  const [bannerIdx, setBannerIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
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

  const formattedDate = time
    ? time.toLocaleDateString([], { weekday: "short", day: "numeric", month: "long" })
    : "---";

  const filteredRecs = activeCategory === "All"
    ? RECOMMENDED
    : RECOMMENDED.filter(r => r.category === activeCategory);

  const banner = FEATURED_BANNERS[bannerIdx];

  return (
    <div className="pb-8 max-w-2xl lg:max-w-6xl mx-auto overflow-x-hidden">

      {/* ── 1. GREETING + SEARCH ─────────────────────────────────────────── */}
      <div className="px-4 pt-5 pb-3 space-y-4">
        <div className="space-y-0.5">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{formattedDate}</p>
          <h1 className="text-2xl font-black text-foreground tracking-tight">Assalamualaikum, Super ✨</h1>
        </div>

        <Link href="/search" className="block">
          <div className="flex items-center gap-3 bg-card border border-border/60 rounded-2xl px-4 py-3.5 shadow-sm hover:shadow-md transition-shadow">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground flex-1 font-medium">
              Restaurants, mosques, events…
            </span>
            <div className="h-7 w-px bg-border" />
            <Mic className="h-4 w-4 text-muted-foreground shrink-0" />
          </div>
        </Link>
      </div>

      {/* ── 2. PRAYER WIDGET (COMPACT) ────────────────────────────────────── */}
      <div className="px-4 pb-4">
        <Link href="/prayer-times" className="block">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary to-emerald-500 text-white px-5 py-4 flex items-center justify-between shadow-md hover:shadow-lg transition-shadow">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
            <div className="absolute right-10 bottom-0 opacity-[0.08]">
              <Moon className="h-16 w-16" />
            </div>
            <div className="relative space-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Next Prayer</p>
              {prayerLoading ? (
                <div className="h-6 w-36 bg-white/20 rounded animate-pulse" />
              ) : !prayerData ? (
                <p className="text-sm font-black">Tap to set location</p>
              ) : (
                <p className="text-lg font-black tabular-nums">
                  {nextPrayerName} · {String(countdown.hours).padStart(2, "0")}:{String(countdown.minutes).padStart(2, "0")}:{String(countdown.seconds).padStart(2, "0")}
                </p>
              )}
            </div>
            <div className="relative text-right space-y-0.5">
              {!prayerLoading && prayerData && (
                <p className="text-[11px] font-bold opacity-75">
                  {nextPrayerTime ? formatPrayerTime(nextPrayerTime, timeFormat) : "--:--"}
                </p>
              )}
              <div className="flex items-center gap-1 justify-end text-[10px] font-bold opacity-60">
                <MapPin className="h-3 w-3" />
                {locationName || "Set location"}
              </div>
              <div className="text-[10px] font-bold opacity-50">All Prayer Times →</div>
            </div>
          </div>
        </Link>
      </div>

      {/* ── 3. QUICK ACTIONS ──────────────────────────────────────────────── */}
      <div className="px-4 pb-5">
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1 lg:justify-between lg:overflow-x-visible">
          {QUICK_ACTIONS.map((action) => (
            <Link key={action.name} href={action.url} className="flex flex-col items-center gap-2 min-w-[56px] group">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md",
                action.bg
              )}>
                <action.icon className={cn("h-6 w-6", action.color)} />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground text-center leading-tight">{action.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── 4. FEATURED BANNER (AUTO-ROTATING EDITORIAL) ──────────────────── */}
      <div className="px-4 pb-6">
        <div
          className="relative rounded-3xl overflow-hidden h-56 cursor-pointer shadow-lg"
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
            <div className="absolute inset-0 flex flex-col justify-end p-5 space-y-2">
              <Badge className="w-fit bg-white/20 backdrop-blur-md text-white border-white/30 text-[10px] font-black uppercase tracking-wider">
                {banner.tag}
              </Badge>
              <h2 className="text-xl font-black text-white leading-tight whitespace-pre-line">
                {banner.title}
              </h2>
              <p className="text-xs font-bold text-white/80">{banner.sub}</p>
              <div className="flex items-center justify-between pt-1">
                <div className="inline-flex items-center gap-1.5 bg-white text-primary text-xs font-black px-4 py-2 rounded-full">
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

      {/* ── 5. RECOMMENDED FOR YOU ────────────────────────────────────────── */}
      <section className="pb-6">
        <div className="px-4 flex items-center justify-between mb-3">
          <div className="space-y-0.5">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Personalised</p>
            <h2 className="text-lg font-black">Recommended for You</h2>
          </div>
          <Link href="/categories">
            <div className="flex items-center gap-1 text-primary text-xs font-black">
              See All <ChevronRight className="h-3 w-3" />
            </div>
          </Link>
        </div>

        {/* Category filter pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-3">
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

        {/* Business cards */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 pb-1 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-x-visible">
          {filteredRecs.map((biz, i) => (
            <Link key={i} href={biz.url} className="shrink-0 w-48 lg:w-auto group">
              <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5">
                <div className="relative h-28 overflow-hidden">
                  <Image src={biz.img} alt={biz.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-2 left-2">
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-white">
                      {biz.badge}
                    </span>
                  </div>
                  <div className={cn(
                    "absolute top-2 right-2 h-2 w-2 rounded-full",
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
                    <div className="flex items-center gap-0.5 text-[10px] text-muted-foreground font-bold">
                      <MapPin className="h-2.5 w-2.5" />{biz.dist}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {/* See all card */}
          <Link href="/categories" className="shrink-0 w-24 lg:hidden flex flex-col items-center justify-center gap-2 text-primary group">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-black text-center leading-tight">View All</span>
          </Link>
        </div>
      </section>

      {/* ── 6. NEARBY EVENTS ──────────────────────────────────────────────── */}
      <section className="px-4 pb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="space-y-0.5">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">This Week</p>
            <h2 className="text-lg font-black">Events Near You</h2>
          </div>
          <Link href="/events">
            <div className="flex items-center gap-1 text-primary text-xs font-black">
              All Events <ChevronRight className="h-3 w-3" />
            </div>
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-x-visible">
          {EVENTS.map((ev, i) => (
            <Link key={i} href="/events" className="shrink-0 w-64 lg:w-auto group">
              <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5">
                <div className="relative h-32 overflow-hidden">
                  <Image src={ev.img} alt={ev.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] font-black px-2.5 py-1 rounded-full bg-amber-400 text-black">
                      {ev.type}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-xs font-black text-white leading-tight line-clamp-2">{ev.title}</p>
                  </div>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-foreground">
                      <Calendar className="h-3 w-3 text-primary" />
                      {ev.date} · {ev.time}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {ev.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-black text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {ev.going}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 7. COMMUNITY PULSE ────────────────────────────────────────────── */}
      <section className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-0.5">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              Live Activity
            </p>
            <h2 className="text-lg font-black">Community Pulse</h2>
          </div>
          <Link href="/feed">
            <div className="flex items-center gap-1 text-primary text-xs font-black">
              Open Feed <ChevronRight className="h-3 w-3" />
            </div>
          </Link>
        </div>
        <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
          {COMMUNITY_POSTS.map((post, i) => (
            <Link key={i} href="/feed" className="block group">
              <div className="rounded-2xl bg-card border border-border/50 p-4 hover:shadow-md transition-shadow space-y-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-9 w-9 shrink-0 ring-2 ring-primary/20">
                    <AvatarImage src={post.avatar} />
                    <AvatarFallback>{post.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-foreground">{post.name}</span>
                      <span className="text-[10px] text-muted-foreground font-medium">{post.handle}</span>
                      <span className="text-[10px] text-muted-foreground ml-auto">{post.time}</span>
                    </div>
                    <p className="text-xs font-medium text-foreground/80 mt-1.5 leading-relaxed line-clamp-2">{post.text}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                    {post.tag}
                  </span>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground">
                    <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{post.likes}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{post.replies}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <Link href="/feed" className="block lg:col-span-2">
            <div className="rounded-2xl border border-dashed border-border text-center py-4 text-xs font-black text-primary hover:bg-primary/5 transition-colors">
              Join the conversation →
            </div>
          </Link>
        </div>
      </section>

      {/* ── 8. CREATOR SPOTLIGHT (STORIES-STYLE) ─────────────────────────── */}
      <section className="pb-6">
        <div className="px-4 flex items-center justify-between mb-4">
          <div className="space-y-0.5">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Original Content</p>
            <h2 className="text-lg font-black">Creator Spotlight</h2>
          </div>
          <Link href="/creators">
            <div className="flex items-center gap-1 text-primary text-xs font-black">
              All Creators <ChevronRight className="h-3 w-3" />
            </div>
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 pb-1 lg:flex-wrap lg:gap-6 lg:overflow-x-visible">
          {CREATORS.map((creator, i) => (
            <Link key={i} href="/creators" className="flex flex-col items-center gap-2 min-w-[72px] group">
              <div className="relative p-0.5 rounded-full bg-gradient-to-br from-primary via-emerald-400 to-teal-300">
                <div className="p-0.5 rounded-full bg-background">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={creator.avatar} />
                    <AvatarFallback>{creator.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="text-center space-y-0.5">
                <p className="text-[10px] font-black text-foreground line-clamp-1 leading-tight">{creator.name}</p>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">{creator.tag}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 9. FEATURED PROFESSIONALS ─────────────────────────────────────── */}
      <section className="pb-6">
        <div className="px-4 flex items-center justify-between mb-4">
          <div className="space-y-0.5">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Verified Experts</p>
            <h2 className="text-lg font-black">Featured Professionals</h2>
          </div>
          <Link href="/professionals">
            <div className="flex items-center gap-1 text-primary text-xs font-black">
              View All <ChevronRight className="h-3 w-3" />
            </div>
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 pb-1 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-x-visible">
          {PROFESSIONALS.map((pro, i) => (
            <Link key={i} href="/professionals" className="shrink-0 w-44 lg:w-auto group">
              <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5">
                <div className="relative h-28 bg-gradient-to-br from-primary/10 to-emerald-50 dark:to-emerald-950/20 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full overflow-hidden border-4 border-background shadow-md relative">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={pro.img} className="object-cover" />
                      <AvatarFallback>{pro.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  {pro.verified && (
                    <div className="absolute top-2 right-2 h-6 w-6 bg-primary rounded-full flex items-center justify-center shadow-sm">
                      <ShieldCheck className="h-3 w-3 text-white" />
                    </div>
                  )}
                  <div className={cn(
                    "absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-black px-2 py-0.5 rounded-full",
                    pro.open ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400" : "bg-muted text-muted-foreground"
                  )}>
                    {pro.open ? "Available Now" : "Unavailable"}
                  </div>
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-xs font-black text-foreground leading-tight line-clamp-1">{pro.name}</p>
                  <p className="text-[10px] font-bold text-muted-foreground line-clamp-1">{pro.role}</p>
                  <div className="flex items-center justify-between pt-0.5">
                    <div className="flex items-center gap-1">
                      <Star className="h-2.5 w-2.5 text-amber-400 fill-amber-400" />
                      <span className="text-[10px] font-black">{pro.rating}</span>
                    </div>
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-primary/10 text-primary">{pro.specialty}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 10. MARKETPLACE PICKS ─────────────────────────────────────────── */}
      <section className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-0.5">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Deals & Trending</p>
            <h2 className="text-lg font-black">Marketplace Picks</h2>
          </div>
          <Link href="/marketplace">
            <div className="flex items-center gap-1 text-primary text-xs font-black">
              Shop All <ChevronRight className="h-3 w-3" />
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {MARKETPLACE.map((item, i) => (
            <Link key={i} href="/marketplace" className="group">
              <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5">
                <div className="relative aspect-square overflow-hidden">
                  <Image src={item.img} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-2 right-2">
                    <span className={cn(
                      "text-[9px] font-black px-2 py-0.5 rounded-full",
                      item.tag.includes("%") ? "bg-red-500 text-white" : "bg-primary text-white"
                    )}>
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-xs font-black text-foreground line-clamp-1">{item.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-primary">{item.price}</span>
                    <span className="text-[10px] font-bold text-muted-foreground line-through">{item.orig}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 11. BLOG HIGHLIGHTS ───────────────────────────────────────────── */}
      <section className="px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-0.5">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Knowledge & Stories</p>
            <h2 className="text-lg font-black">Featured Reading</h2>
          </div>
          <Link href="/blog">
            <div className="flex items-center gap-1 text-primary text-xs font-black">
              All Articles <ChevronRight className="h-3 w-3" />
            </div>
          </Link>
        </div>
        <div className="space-y-3">
          {/* Large featured article */}
          <Link href="/blog" className="block group">
            <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="relative h-44 overflow-hidden">
                <Image src={BLOGS[0].img} alt={BLOGS[0].title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                {BLOGS[0].hot && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-orange-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full">
                    <Flame className="h-2.5 w-2.5" />Trending
                  </div>
                )}
                <div className="absolute bottom-3 left-4 right-4 space-y-1">
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white">{BLOGS[0].category}</span>
                  <p className="text-sm font-black text-white leading-tight">{BLOGS[0].title}</p>
                  <p className="text-[10px] text-white/70 font-bold">{BLOGS[0].readTime} read</p>
                </div>
              </div>
            </div>
          </Link>
          {/* Two smaller articles */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {BLOGS.slice(1).map((blog, i) => (
              <Link key={i} href="/blog" className="group">
                <div className="rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5">
                  <div className="relative h-24 overflow-hidden">
                    <Image src={blog.img} alt={blog.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-3 space-y-1">
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-primary/10 text-primary">{blog.category}</span>
                    <p className="text-[11px] font-black text-foreground leading-tight line-clamp-2">{blog.title}</p>
                    <p className="text-[9px] font-bold text-muted-foreground">{blog.readTime} read</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. FAITH & GIVING STRIP ──────────────────────────────────────── */}
      <section className="px-4 pb-6">
        <div className="mb-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Spiritual Tools</p>
          <h2 className="text-lg font-black">Faith & Giving</h2>
        </div>
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { icon: BookOpen, label: "Quran",   url: "/quran",     color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
            { icon: Coins,    label: "Zakat",   url: "/zakat",     color: "text-amber-600",   bg: "bg-amber-50 dark:bg-amber-950/30" },
            { icon: Heart,    label: "Charity", url: "/charity",   color: "text-rose-500",    bg: "bg-rose-50 dark:bg-rose-950/30" },
            { icon: HandHelping, label: "Volunteer", url: "/volunteer", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30" },
          ].map((item) => (
            <Link key={item.label} href={item.url} className="group flex flex-col items-center gap-2">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md", item.bg)}>
                <item.icon className={cn("h-6 w-6", item.color)} />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground text-center">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 13. PLATFORM STATS ────────────────────────────────────────────── */}
      <section className="px-4 pb-6">
        <div className="rounded-2xl border border-border/50 bg-card divide-y divide-border/50 overflow-hidden shadow-sm">
          <div className="px-4 py-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <p className="text-sm font-black">Halal Hub at a Glance</p>
          </div>
          {STATS.map((stat, i) => (
            <Link key={i} href={stat.url} className="flex items-center gap-4 px-4 py-3.5 hover:bg-muted/30 transition-colors group">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", stat.bg)}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-foreground">{stat.value}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">{stat.label}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      {/* ── 14. EXPLORE ALL FEATURES ──────────────────────────────────────── */}
      <section className="px-4 pb-2">
        <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-emerald-50 dark:from-primary/10 dark:to-emerald-950/20 border border-primary/10 p-5 text-center space-y-4">
          <div className="space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-black text-foreground">Explore the Full Ecosystem</h3>
            <p className="text-xs font-medium text-muted-foreground leading-relaxed">
              Business Directory · Professionals · Creators · Community · Prayer & Faith · Marketplace · Events · Blogs · Rewards · Wallet · Family
            </p>
          </div>
          <Link href="/explore" className="block">
            <div className="inline-flex items-center gap-2 bg-primary text-white text-sm font-black px-6 py-3 rounded-2xl hover:opacity-90 transition-opacity">
              Browse Everything <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}
