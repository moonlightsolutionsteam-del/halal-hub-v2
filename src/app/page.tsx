import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  UtensilsCrossed, Map, List, Store, User, Briefcase, 
  ShieldCheck, Users, Moon, MessageSquare, Newspaper, 
  Settings, BookOpen, Heart, HandHelping, Medal, 
  Gift, Calendar, Search, MapPin, Play, Grid, ArrowRight,
  TrendingUp, Star, Compass, Info, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

const QUICK_FEATURES = [
  { name: "Dining", icon: UtensilsCrossed, url: "/restaurants", color: "text-orange-500", bg: "bg-orange-50" },
  { name: "Butchers", icon: BeefIcon, url: "/categories", color: "text-red-500", bg: "bg-red-50" },
  { name: "Map", icon: Map, url: "/travel", color: "text-blue-500", bg: "bg-blue-50" },
  { name: "Verifier", icon: ShieldCheck, url: "/verifier", color: "text-emerald-500", bg: "bg-emerald-50" },
  { name: "Community", icon: Users, url: "/community", color: "text-purple-500", bg: "bg-purple-50" },
  { name: "Events", icon: Calendar, url: "/events", color: "text-amber-500", bg: "bg-amber-50" },
  { name: "Prayer", icon: Moon, url: "/prayer-times", color: "text-indigo-500", bg: "bg-indigo-50" },
  { name: "More", icon: Grid, url: "/categories", color: "text-slate-500", bg: "bg-slate-50" },
];

export default function Home() {
  return (
    <div className="space-y-10">
      {/* Prayer Time Hero */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-primary text-white p-8 md:p-12 shadow-2xl shadow-primary/20 group">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
               <Badge variant="outline" className="border-white/40 text-white bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest">Asr</Badge>
               <span className="text-sm text-white/80 font-medium">Next Prayer In 01:22:45</span>
            </div>
            <div className="text-7xl md:text-9xl font-black tracking-tighter leading-none transition-transform duration-500 group-hover:scale-105 origin-left">
              4:28<span className="text-3xl font-light ml-2 opacity-80 uppercase">pm</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-base text-white/90 font-medium">
              <MapPin className="h-4 w-4" /> New York, NY
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="w-64 h-64 rounded-full border-2 border-white/20 border-dashed absolute animate-[spin_30s_linear_infinite]" />
            <Moon className="w-32 h-32 text-white/20 fill-white/10" />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      </section>

      {/* Discovery Hub */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Discovery Hub</h2>
          <Link href="/categories" className="text-sm font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all">
            All Verticals <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
          {QUICK_FEATURES.map((feature) => (
            <Link key={feature.name} href={feature.url} className="group">
              <Card className="border-none shadow-none hover:shadow-xl transition-all duration-300 rounded-[3rem] flex flex-col items-center justify-center p-6 bg-white hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-full ${feature.bg} flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110`}>
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <span className="text-xs font-black text-slate-700 text-center leading-tight">
                  {feature.name}
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900">Top Rated Places</h2>
            <Badge className="bg-accent/10 text-accent-foreground border-none font-bold">Verified</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Card key={i} className="group overflow-hidden rounded-[2.5rem] border-none shadow-sm hover:shadow-xl transition-all bg-white">
                <div className="relative aspect-[4/3]">
                  <Image 
                    src={`https://picsum.photos/seed/feat${i}/800/600`} 
                    alt="Place" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 backdrop-blur text-primary border-none font-bold">Verified</Badge>
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <CardTitle className="text-xl font-black">Elite Steakhouse {i}</CardTitle>
                  <div className="flex items-center gap-1 font-medium text-muted-foreground text-sm">
                    <MapPin className="h-3.5 w-3.5" /> Downtown, New York
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900">Community Feed</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="rounded-3xl border-none shadow-sm p-4 hover:shadow-md transition-all bg-white cursor-pointer group">
                <div className="flex gap-4 items-center">
                  <div className="relative h-16 w-16 rounded-2xl overflow-hidden shrink-0">
                    <Image src={`https://picsum.photos/seed/feed${i}/200/200`} alt="Feed" fill className="object-cover" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-800">New Halal Grill Opening!</p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-primary">
                      <TrendingUp className="h-3 w-3" /> Trending
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
