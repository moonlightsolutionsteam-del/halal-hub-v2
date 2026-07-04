"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Map, List, Store, User, Briefcase,
  ShieldCheck, Users, Moon, MessageSquare, Newspaper,
  Settings, BookOpen, Heart, HandHelping, Medal,
  Gift, Calendar, Globe, Play, ChevronRight,
  Building2, Clock, Star, Coins, MapPin,
  Wallet, PenTool, ShoppingCart, ShieldCheck as ShieldCheckIcon,
  GraduationCap, ArrowRight,
  CircleDot, CalendarCheck, HelpCircle, Navigation2, FileSignature, HandCoins
} from "lucide-react";
import { formatPrayerTime } from "@/lib/ummah-api";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePrayerSnapshot } from "@/lib/use-prayer-snapshot";

const FEATURE_GROUPS = [
  {
    label: "Explore",
    items: [
      { name: "Directory", icon: List, url: "/categories" },
      { name: "Map", icon: Map, url: "/map" },
      { name: "Events", icon: Calendar, url: "/events" },
      { name: "Halal Check", icon: ShieldCheckIcon, url: "/halal-check" },
    ],
  },
  {
    label: "Social",
    items: [
      { name: "Feed", icon: Newspaper, url: "/feed" },
      { name: "Community", icon: Globe, url: "/community" },
      { name: "Chat", icon: MessageSquare, url: "/messages" },
      { name: "Blog", icon: BookOpen, url: "/blog" },
      { name: "Creators", icon: PenTool, url: "/creators" },
      { name: "Professionals", icon: Briefcase, url: "/professionals" },
    ],
  },
  {
    label: "Faith & Giving",
    items: [
      { name: "Prayer", icon: Moon, url: "/prayer-times" },
      { name: "Quran", icon: BookOpen, url: "/quran" },
      { name: "Tasbeeh", icon: CircleDot, url: "/prayer/tasbeeh" },
      { name: "99 Names", icon: Star, url: "/asma-ul-husna" },
      { name: "Jummah", icon: CalendarCheck, url: "/prayer/jummah" },
      { name: "Ask Imam", icon: HelpCircle, url: "/prayer/ask-imam" },
      { name: "Hajj Hub", icon: Navigation2, url: "/prayer/hajj" },
      { name: "Shahadah", icon: FileSignature, url: "/prayer/shahadah" },
      { name: "Zakat", icon: Coins, url: "/zakat" },
      { name: "Charity", icon: Heart, url: "/charity" },
      { name: "Volunteer", icon: HandHelping, url: "/volunteer" },
      { name: "Donate", icon: HandCoins, url: "/prayer/donation" },
      { name: "Mosques", icon: Building2, url: "/mosques" },
    ],
  },
  {
    label: "Shop",
    items: [
      { name: "Marketplace", icon: Store, url: "/marketplace" },
      { name: "Hub Store", icon: ShoppingCart, url: "/store" },
    ],
  },
  {
    label: "You",
    items: [
      { name: "My Journey", icon: Medal, url: "/account/dashboard" },
      { name: "Rewards", icon: Gift, url: "/rewards" },
      { name: "Wallet", icon: Wallet, url: "/account/wallet" },
      { name: "Family", icon: Users, url: "/family-tree" },
    ],
  },
  {
    label: "Business",
    items: [
      { name: "Manage", icon: Settings, url: "/partner/portal" },
    ],
  },
];

export default function Home() {
  const [time, setTime] = useState<Date | null>(null);
  const { prayerData, loading: prayerLoading, error: prayerError, countdown, nextPrayerName, nextPrayerTime, locationName, timeFormat } = usePrayerSnapshot();

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time ? time.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : "---";

  return (
    <div className="space-y-8 sm:space-y-12 py-4 px-3 sm:px-4 max-w-6xl mx-auto">
      <div className="space-y-1 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">Assalamualaikum, Super</h1>
        <p className="text-sm font-bold text-muted-foreground">{formattedDate}</p>
      </div>

      <Link href="/prayer-times" className="block">
        <Card className="relative overflow-hidden border-none rounded-[2.5rem] bg-gradient-to-br from-primary via-primary to-emerald-400 text-white shadow-soft-lg transition-transform duration-250 hover:-translate-y-0.5">
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-emerald-300/30 blur-3xl" />
          <svg className="absolute right-0 bottom-0 h-full w-40 opacity-[0.08]" viewBox="0 0 160 200" fill="none" preserveAspectRatio="xMaxYMax slice">
            <path d="M80 0C40 0 20 40 20 80V200H140V80C140 40 120 0 80 0Z" fill="white" />
          </svg>
          <div className="absolute top-6 right-6 opacity-15">
            <Moon className="h-24 w-24" />
          </div>
          <CardContent className="relative p-5 sm:p-8 space-y-3 sm:space-y-4">
            {prayerLoading ? (
              <div className="space-y-3">
                <div className="h-4 w-40 bg-white/20 rounded-full animate-pulse" />
                <div className="h-14 w-56 bg-white/20 rounded-2xl animate-pulse" />
              </div>
            ) : prayerError || !prayerData ? (
              <div className="space-y-1">
                <p className="text-sm font-black uppercase tracking-widest opacity-80">Prayer Times Unavailable</p>
                <p className="text-sm font-bold opacity-90">Tap to open Prayer Times and set your location</p>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-black uppercase tracking-widest opacity-80">Next Prayer: {nextPrayerName}</p>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl sm:text-6xl font-black tabular-nums">
                      {String(countdown.hours).padStart(2, "0")}:{String(countdown.minutes).padStart(2, "0")}:{String(countdown.seconds).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
                  <span className="flex items-center gap-2 bg-card/20 backdrop-blur-md w-fit px-4 py-2 rounded-full">
                    <Clock className="h-4 w-4" />
                    {nextPrayerName} at {nextPrayerTime ? formatPrayerTime(nextPrayerTime, timeFormat) : "--:--"}
                  </span>
                  <span className="flex items-center gap-1.5 bg-card/20 backdrop-blur-md w-fit px-4 py-2 rounded-full">
                    <MapPin className="h-4 w-4" />
                    {locationName}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </Link>

      <section className="space-y-8">
        <h2 className="text-xl font-black px-2">Discover Features</h2>
        {FEATURE_GROUPS.map((group) => (
          <div key={group.label} className="space-y-3">
            <p className="text-[11px] font-black uppercase text-muted-foreground tracking-widest px-2">{group.label}</p>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4 sm:gap-6">
              {group.items.map((feature) => (
                <Link key={feature.name} href={feature.url} className="group flex flex-col items-center gap-2">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-3xl flex items-center justify-center bg-card text-primary transition-all duration-250 shadow-soft ring-1 ring-white/40 dark:ring-white/5 group-hover:shadow-soft-md group-hover:-translate-y-1">
                    <feature.icon className="h-6 w-6 sm:h-8 sm:h-8 stroke-[2]" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-muted-foreground text-center line-clamp-1 px-1">
                    {feature.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black px-2">My Journey</h2>
        <Card className="rounded-[2.5rem] border-none shadow-sm p-6 space-y-6">
          {[
            { label: "Prayer Streak", icon: Moon, value: 85, color: "bg-primary", valLabel: "85 Days" },
            { label: "Charity Goal", icon: Heart, value: 42, color: "bg-red-400", valLabel: "$420" },
            { label: "Community Score", icon: Globe, value: 92, color: "bg-blue-400", valLabel: "Level 12" },
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center text-sm font-bold">
                <div className="flex items-center gap-2 text-foreground">
                  <item.icon className="h-4 w-4 text-primary" />
                  {item.label}
                </div>
                <span className="text-primary">{item.valLabel}</span>
              </div>
              <Progress value={item.value} className="h-2" />
            </div>
          ))}
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-black">Quick Picks</h2>
          <Link href="/feed"><Button variant="link" className="text-primary font-bold">View All</Button></Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: "Halal Food", hint: "halal platter", img: "https://picsum.photos/seed/food1/400/400" },
            { title: "Islamic Art", hint: "islamic art", img: "https://picsum.photos/seed/art1/400/400" },
            { title: "Street Food", hint: "street food", img: "https://picsum.photos/seed/street1/400/400" },
            { title: "Fine Dining", hint: "luxury restaurant", img: "https://picsum.photos/seed/lux1/400/400" },
          ].map((item, i) => (
            <Link key={i} href="/feed" className="relative aspect-square rounded-[2rem] overflow-hidden group cursor-pointer shadow-soft hover:shadow-soft-md transition-shadow duration-250 block">
              <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint={item.hint} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="text-white font-bold text-sm">{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-black">Trending Reels</h2>
          <Link href="/feed"><Button variant="link" className="text-primary font-bold">More</Button></Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {[1, 2, 3].map((i) => (
            <Link key={i} href="/feed" className="min-w-[180px] sm:min-w-[220px] aspect-[9/16] rounded-[2.5rem] border-none shadow-soft hover:shadow-soft-md transition-shadow duration-250 overflow-hidden relative group shrink-0 block">
              <Image src={`https://picsum.photos/seed/reel${i}/400/700`} alt="Reel" fill className="object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint="halal cooking" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 bg-card/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform">
                  <Play className="h-6 w-6 fill-current" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-white">
                  <AvatarImage src={`https://picsum.photos/seed/av${i}/100/100`} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="text-[10px] font-bold text-white shadow-sm">@creator_{i}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-black">Halal Professionals</h2>
          <Link href="/professionals"><Button variant="link" className="text-primary font-bold text-xs">View All</Button></Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {[
            { name: "Dr. Aisha Rahman", role: "General Physician", specialty: "Healthcare", rating: 4.9, reviews: 142, img: "https://picsum.photos/seed/pro1/200/200", verified: true },
            { name: "Ustadh Ibrahim", role: "Islamic Scholar", specialty: "Education", rating: 5.0, reviews: 88, img: "https://picsum.photos/seed/pro2/200/200", verified: true },
            { name: "Mufti Yusuf Ali", role: "Shariah Advisor", specialty: "Finance", rating: 4.8, reviews: 61, img: "https://picsum.photos/seed/pro3/200/200", verified: true },
            { name: "Arch. Fatima Hassan", role: "Interior Designer", specialty: "Creative", rating: 4.7, reviews: 34, img: "https://picsum.photos/seed/pro4/200/200", verified: false },
            { name: "Br. Hassan Malik", role: "Halal Auditor", specialty: "Certification", rating: 4.9, reviews: 207, img: "https://picsum.photos/seed/pro5/200/200", verified: true },
          ].map((pro, i) => (
            <Link key={i} href="/professionals" className="min-w-[160px] shrink-0 group">
              <Card className="rounded-[2rem] border-none shadow-soft hover:shadow-soft-md transition-all duration-250 overflow-hidden group-hover:-translate-y-0.5">
                <CardContent className="p-0">
                  <div className="relative h-28 w-full bg-gradient-to-br from-primary/20 to-emerald-100 dark:from-primary/10 dark:to-emerald-900/20 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full overflow-hidden border-4 border-card shadow-lg relative">
                      <Image src={pro.img} alt={pro.name} fill className="object-cover" data-ai-hint="professional headshot" />
                    </div>
                    {pro.verified && (
                      <div className="absolute top-2 right-2 h-6 w-6 bg-primary rounded-full flex items-center justify-center">
                        <ShieldCheck className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-1">
                    <p className="text-xs font-black text-foreground leading-tight line-clamp-1">{pro.name}</p>
                    <p className="text-[10px] font-bold text-muted-foreground line-clamp-1">{pro.role}</p>
                    <div className="flex items-center gap-1 pt-1">
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      <span className="text-[10px] font-black text-foreground">{pro.rating}</span>
                      <span className="text-[10px] text-muted-foreground font-medium">({pro.reviews})</span>
                    </div>
                    <span className="inline-block text-[9px] font-black px-2 py-0.5 rounded-full bg-primary/10 text-primary">{pro.specialty}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-black">Nearby Mosques</h2>
          <Link href="/categories?type=mosque"><Button variant="link" className="text-primary font-bold text-xs">View All</Button></Link>
        </div>
        <div className="space-y-3">
          {[
            { name: "Masjid Al-Noor", area: "Bandra West, Mumbai", distance: "0.4 km", nextPrayer: "Asr at 4:15 PM", capacity: 500, services: ["Quran Classes", "Jummah", "Iftar"], verified: true },
            { name: "Jama Masjid Central", area: "Old Delhi", distance: "1.2 km", nextPrayer: "Asr at 4:17 PM", capacity: 2000, services: ["Jummah", "Eid Prayers", "Nikah"], verified: true },
            { name: "Masjid Ibrahim", area: "Andheri East, Mumbai", distance: "2.1 km", nextPrayer: "Asr at 4:14 PM", capacity: 300, services: ["Quran Classes", "Dawah"], verified: false },
          ].map((mosque, i) => (
            <Link key={i} href="/categories?type=mosque" className="block group">
              <Card className="rounded-[2rem] border-none shadow-soft hover:shadow-soft-md transition-all duration-250">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Moon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-black text-foreground leading-tight">{mosque.name}</p>
                      {mosque.verified && <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />}
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{mosque.area}</span>
                      <span className="text-primary font-black">{mosque.distance}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                      <Clock className="h-3 w-3" />{mosque.nextPrayer}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {mosque.services.map(s => (
                        <span key={s} className="text-[9px] font-black px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{s}</span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors mt-1 shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black px-2">Features for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: ShieldCheck, color: "text-primary", bg: "from-primary/20 to-emerald-100 dark:from-primary/10 dark:to-emerald-900/20", title: "Halal Verification", desc: "Instantly verify halal status of any product, restaurant, or supplier with our AI-powered scanner.", url: "/halal-check", cta: "Try Now" },
            { icon: MapPin, color: "text-blue-500", bg: "from-blue-100 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/10", title: "Halal Map", desc: "Find halal businesses, mosques, prayer rooms, and Islamic centres near you on an interactive map.", url: "/map", cta: "Explore Map" },
            { icon: GraduationCap, color: "text-purple-500", bg: "from-purple-100 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/10", title: "Islamic Learning", desc: "Access Quran recitations, Hadith collections, and Islamic courses from certified scholars.", url: "/quran", cta: "Start Learning" },
            { icon: Heart, color: "text-red-500", bg: "from-red-100 to-rose-50 dark:from-red-900/20 dark:to-rose-900/10", title: "Charity & Zakat", desc: "Calculate your Zakat, donate to verified causes, and track your sadaqah in one place.", url: "/charity", cta: "Give Now" },
            { icon: Calendar, color: "text-amber-600", bg: "from-amber-100 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/10", title: "Islamic Events", desc: "Discover local Islamic conferences, Ramadan iftars, Eid gatherings, and community events.", url: "/events", cta: "Browse Events" },
            { icon: Coins, color: "text-emerald-600", bg: "from-emerald-100 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/10", title: "Shariah Finance", desc: "Find Shariah-compliant banks, investment products, and get guidance from certified advisors.", url: "/categories?type=finance", cta: "Learn More" },
          ].map((feat, i) => (
            <Link key={i} href={feat.url} className="group block">
              <Card className={`rounded-[2rem] border-none shadow-soft hover:shadow-soft-md transition-all duration-250 overflow-hidden group-hover:-translate-y-0.5 bg-gradient-to-br ${feat.bg}`}>
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <feat.icon className={cn("h-7 w-7", feat.color)} />
                    <div className="flex items-center gap-1 text-xs font-black text-muted-foreground group-hover:text-foreground transition-colors">
                      {feat.cta} <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-foreground text-sm">{feat.title}</p>
                    <p className="text-[11px] font-medium text-muted-foreground leading-relaxed line-clamp-2">{feat.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black px-2">Halal Hub Growth</h2>
        <Card className="rounded-[2.5rem] border-none shadow-sm p-2">
          {[
            { label: "Total Users", value: "1.2M", icon: Users, trend: "+12.4%", color: "text-blue-500", bg: "bg-blue-500/10", url: "/community" },
            { label: "Active Entities", value: "45,892", icon: Building2, trend: "+2.1k today", color: "text-primary", bg: "bg-primary/10", url: "/categories" },
            { label: "Verified Certificates", value: "12,554", icon: ShieldCheck, trend: "99.9% Audit", color: "text-amber-500", bg: "bg-amber-500/10", url: "/verifier" },
            { label: "Community Posts", value: "482,091", icon: MessageSquare, trend: "+1.2k hourly", color: "text-purple-500", bg: "bg-purple-500/10", url: "/feed" },
          ].map((stat, i) => (
            <Link key={i} href={stat.url} className="flex items-center justify-between p-4 hover:bg-muted/30 rounded-3xl transition-colors group">
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", stat.bg)}>
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
                <div>
                  <p className="text-base font-black text-foreground leading-tight">{stat.value}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">{stat.label}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn("text-[10px] font-black uppercase", stat.color)}>{stat.trend}</p>
                <ChevronRight className="h-4 w-4 ml-auto mt-1 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
        </Card>
      </section>
    </div>
  );
}
