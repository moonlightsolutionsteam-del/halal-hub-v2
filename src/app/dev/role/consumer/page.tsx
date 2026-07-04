
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, Moon, Globe, MapPin, 
  Search, UtensilsCrossed, ShieldCheck, 
  MessageSquare, Star, Clock, 
  ChevronRight, Sparkles, Zap
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ConsumerRolePage() {
  return (
    <div className="container mx-auto p-6 space-y-10 max-w-5xl pb-24">
      <div className="space-y-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
          <UserIcon className="h-3 w-3" /> Lifestyle Mode
        </div>
        <h1 className="text-4xl font-black text-foreground tracking-tight">Your Halal Journey</h1>
        <p className="text-muted-foreground font-medium">Explore, track, and grow with the global community.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 rounded-[2.5rem] border-none shadow-sm bg-primary text-white p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Moon className="h-32 w-32" />
          </div>
          <div className="relative z-10 space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Next Prayer in 42m</p>
              <h2 className="text-6xl font-black tracking-tighter">Asr Prayer</h2>
              <div className="flex items-center gap-2 text-sm font-bold bg-card/20 w-fit px-4 py-1.5 rounded-full backdrop-blur-md">
                <MapPin className="h-4 w-4" /> New York, NY
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
              <div>
                <p className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-1">Prayer Streak</p>
                <p className="text-3xl font-black">85 Days</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-1">Community Rank</p>
                <p className="text-3xl font-black">Level 12</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6">
          <h3 className="text-xl font-black text-foreground">Personal Goals</h3>
          <div className="space-y-6">
            {[
              { label: "Charity Target", val: 65, color: "bg-red-400", sub: "$420 / $1000" },
              { label: "Quran Reading", val: 42, color: "bg-blue-400", sub: "Para 12 of 30" },
              { label: "Daily Steps", val: 88, color: "bg-emerald-400", sub: "8.2k / 10k" },
            ].map((goal, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-muted-foreground">{goal.label}</span>
                  <span className="text-foreground">{goal.sub}</span>
                </div>
                <Progress value={goal.val} className={`h-1.5 ${goal.color}`} />
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full rounded-2xl h-12 border-2 font-black text-[10px] uppercase tracking-widest">Edit My Goals</Button>
        </Card>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-black text-foreground px-2">Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "The Bosphorus Kitchen", cat: "Dining", loc: "0.5m away", rate: 4.8, img: "food1" },
            { name: "Al-Barakah Meats", cat: "Butcher", loc: "1.2m away", rate: 4.9, img: "meat1" },
            { name: "Islamic Expo 2024", cat: "Event", loc: "In 2 days", rate: 5.0, img: "eventpic1" },
          ].map((item, i) => (
            <Card key={i} className="group rounded-[2rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 cursor-pointer border-2 border-transparent hover:border-primary/10">
              <div className="relative aspect-video">
                <Image src={`https://picsum.photos/seed/${item.img}/600/400`} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <Badge className="absolute top-4 left-4 bg-card/90 backdrop-blur-md text-primary font-black border-none px-3 shadow-lg">Verified</Badge>
              </div>
              <CardContent className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-tighter">{item.cat}</p>
                    <h4 className="text-lg font-black text-foreground leading-tight group-hover:text-primary transition-colors">{item.name}</h4>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-black text-amber-500">
                    <Star className="h-4 w-4 fill-current" /> {item.rate}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {item.loc}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-foreground">Community Buzz</h3>
            <Button variant="ghost" size="sm" className="text-primary font-bold">See All</Button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-muted hover:bg-muted transition-colors cursor-pointer group">
                <div className="h-10 w-10 rounded-xl bg-card flex items-center justify-center text-primary font-black text-xs shadow-sm group-hover:scale-110 transition-transform">U{i}</div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-bold text-foreground line-clamp-1">New halal steakhouse just opened in Brooklyn! 🥩</p>
                  <div className="flex items-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-tighter">
                    <span>@user_{i}</span>
                    <span>•</span>
                    <span>2h ago</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Zap className="h-32 w-32 text-primary" />
          </div>
          <div className="space-y-4 relative z-10">
            <div className="h-14 w-14 rounded-2xl bg-card/10 flex items-center justify-center text-primary shadow-xl border border-white/10">
              <Sparkles className="h-8 w-8" />
            </div>
            <h3 className="text-3xl font-black font-headline">Unlock Premium Hub</h3>
            <p className="text-muted-foreground font-medium leading-relaxed italic">
              Get detailed ingredient reports, zero ads, and 2x loyalty rewards points on every scan.
            </p>
          </div>
          <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase text-xs tracking-widest shadow-2xl mt-8 relative z-10">
            Upgrade Now
          </Button>
        </Card>
      </div>
    </div>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
