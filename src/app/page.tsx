"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  UtensilsCrossed, Map, List, Store, User, Briefcase, 
  ShieldCheck, Users, Moon, MessageSquare, Newspaper, 
  Settings, BookOpen, Heart, HandHelping, Medal, 
  Gift, Calendar, Globe, Play, ChevronRight,
  Search, Eye, Building2, Star, Clock
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const BeefIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.5 2a2.5 2.5 0 0 0-2.5 2.5V6a3 3 0 0 0 3 3h1a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3h-1a3 3 0 0 1-3-3v-1.5" />
    <path d="M15 22a7 7 0 0 0 7-7c0-2.5-2-4.5-4.5-4.5h-1a2.5 2.5 0 0 0-2.5 2.5V15a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-1" />
    <circle cx="15" cy="15" r="1" />
  </svg>
);

const FEATURES = [
  { name: "Food & Dining", icon: UtensilsCrossed, url: "/restaurants" },
  { name: "Meat & Butchers", icon: BeefIcon, url: "/categories" },
  { name: "Map", icon: Map, url: "/travel" },
  { name: "Directory", icon: List, url: "/categories" },
  { name: "Marketplace", icon: Store, url: "/categories" },
  { name: "Creators", icon: User, url: "/community" },
  { name: "Professionals", icon: Briefcase, url: "/categories" },
  { name: "Halal Check", icon: ShieldCheck, url: "/verifier" },
  { name: "Family", icon: Users, url: "/categories" },
  { name: "Prayer", icon: Moon, url: "/prayer-times" },
  { name: "Chat", icon: MessageSquare, url: "/community" },
  { name: "Feed", icon: Newspaper, url: "/community" },
  { name: "Manage", icon: Settings, url: "/partner/portal" },
  { name: "Blog", icon: BookOpen, url: "/community" },
  { name: "Charity", icon: Heart, url: "/categories", highlight: true },
  { name: "Volunteer", icon: HandHelping, url: "/categories" },
  { name: "My Journey", icon: Medal, url: "/account/dashboard" },
  { name: "Rewards", icon: Gift, url: "/account/dashboard" },
  { name: "Community", icon: Globe, url: "/community" },
  { name: "Events", icon: Calendar, url: "/events" },
];

export default function Home() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : "--:--";
  const formattedDate = time ? time.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : "---";

  return (
    <div className="space-y-12 py-4 px-2 max-w-6xl mx-auto">
      <div className="space-y-1 text-center sm:text-left">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Assalamualaikum, Super</h1>
        <p className="text-sm font-bold text-muted-foreground">{formattedDate}</p>
      </div>

      <Card className="relative overflow-hidden border-none rounded-[2.5rem] bg-gradient-to-br from-primary to-emerald-400 text-white shadow-2xl shadow-primary/20">
        <div className="absolute top-0 right-0 p-8 opacity-20">
          <Moon className="h-32 w-32" />
        </div>
        <CardContent className="p-8 space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-black uppercase tracking-widest opacity-80">Next Prayer: Asr</p>
            <div className="flex items-end gap-3">
              <span className="text-6xl font-black tabular-nums">{formattedTime.split(' ')[0]}</span>
              <span className="text-2xl font-bold mb-2 uppercase">{formattedTime.split(' ')[1]}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold bg-white/20 backdrop-blur-md w-fit px-4 py-2 rounded-full">
            <Clock className="h-4 w-4" />
            <span>Asr starts in 2h 30m</span>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-black">Discover Features</h2>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4 sm:gap-6">
          {FEATURES.map((feature) => (
            <Link key={feature.name} href={feature.url} className="group flex flex-col items-center gap-2">
              <div className={cn(
                "w-12 h-12 sm:w-16 sm:h-16 rounded-3xl flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:-translate-y-1",
                feature.highlight ? "bg-accent text-accent-foreground" : "bg-white text-primary"
              )}>
                <feature.icon className="h-6 w-6 sm:h-8 sm:h-8 stroke-[2]" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-slate-600 text-center line-clamp-1 px-1">
                {feature.name}
              </span>
            </Link>
          ))}
        </div>
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
                <div className="flex items-center gap-2 text-slate-700">
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
          <Button variant="link" className="text-primary font-bold">View All</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: "Halal Food", hint: "halal platter", img: "https://picsum.photos/seed/food1/400/400" },
            { title: "Islamic Art", hint: "islamic art", img: "https://picsum.photos/seed/art1/400/400" },
            { title: "Street Food", hint: "street food", img: "https://picsum.photos/seed/street1/400/400" },
            { title: "Fine Dining", hint: "luxury restaurant", img: "https://picsum.photos/seed/lux1/400/400" },
          ].map((item, i) => (
            <div key={i} className="relative aspect-square rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm">
              <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform" data-ai-hint={item.hint} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="text-white font-bold text-sm">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-black">Trending Reels</h2>
          <Button variant="link" className="text-primary font-bold">More</Button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="min-w-[180px] sm:min-w-[220px] aspect-[9/16] rounded-[2.5rem] border-none shadow-sm overflow-hidden relative group shrink-0">
              <Image src={`https://picsum.photos/seed/reel${i}/400/700`} alt="Reel" fill className="object-cover" data-ai-hint="halal cooking" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform">
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
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black px-2">Halal Hub Growth</h2>
        <Card className="rounded-[2.5rem] border-none shadow-sm p-2">
          {[
            { label: "Total Users", value: "1.2M", icon: Users, trend: "+12.4%", color: "text-blue-500", bg: "bg-blue-50" },
            { label: "Active Entities", value: "45,892", icon: Building2, trend: "+2.1k today", color: "text-primary", bg: "bg-emerald-50" },
            { label: "Verified Certificates", value: "12,554", icon: ShieldCheck, trend: "99.9% Audit", color: "text-amber-500", bg: "bg-amber-50" },
            { label: "Community Posts", value: "482,091", icon: MessageSquare, trend: "+1.2k hourly", color: "text-purple-500", bg: "bg-purple-50" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30 rounded-3xl transition-colors group">
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", stat.bg)}>
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
                <div>
                  <p className="text-base font-black text-slate-900 leading-tight">{stat.value}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">{stat.label}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn("text-[10px] font-black uppercase", stat.color)}>{stat.trend}</p>
                <ChevronRight className="h-4 w-4 ml-auto mt-1 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}
