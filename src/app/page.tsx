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
  { name: "Dining", icon: UtensilsCrossed, url: "/restaurants", color: "text-orange-500" },
  { name: "Butchers", icon: BeefIcon, url: "/categories", color: "text-red-500" },
  { name: "Map", icon: Map, url: "/travel", color: "text-blue-500" },
  { name: "Verifier", icon: ShieldCheck, url: "/verifier", color: "text-emerald-500" },
  { name: "Community", icon: Users, url: "/community", color: "text-purple-500" },
  { name: "Events", icon: Calendar, url: "/events", color: "text-amber-500" },
  { name: "Prayer", icon: Moon, url: "/prayer-times", color: "text-indigo-500" },
  { name: "More", icon: Grid, url: "/categories", color: "text-slate-500" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Compass className="h-6 w-6" />
          </div>
          <span className="text-xl md:text-2xl font-black text-primary font-headline tracking-tight">Halal Hub</span>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden md:flex relative w-64 lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search products, places..." 
              className="w-full bg-muted/50 border-none rounded-full pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
          <Button variant="ghost" size="icon" className="rounded-full md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/account/dashboard">
            <Avatar className="h-10 w-10 border-2 border-primary/10 hover:border-primary/30 transition-colors">
              <AvatarImage src="https://picsum.photos/seed/user/100/100" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-8 py-6 space-y-10 max-w-7xl">
        {/* Prayer Time Hero */}
        <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-primary/80 text-white p-8 md:p-12 shadow-2xl shadow-primary/30 group">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                 <Badge variant="outline" className="border-white/40 text-white bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest">Asr</Badge>
                 <span className="text-sm text-white/80 font-medium">Next Prayer In 01:22:45</span>
              </div>
              <div className="text-6xl md:text-8xl font-black tracking-tighter leading-none transition-transform duration-500 group-hover:scale-105 origin-left">
                4:28<span className="text-3xl font-light ml-2 opacity-80 uppercase">pm</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-base text-white/90 font-medium">
                <MapPin className="h-4 w-4" /> New York, NY
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-56 h-56 rounded-full border-8 border-white/10 flex items-center justify-center relative">
                <Moon className="w-24 h-24 text-white/20 fill-white/10 animate-pulse" />
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/20 animate-[spin_20s_linear_infinite]" />
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
        </section>

        {/* Quick Access Categories */}
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
                <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2.5rem] flex flex-col items-center justify-center p-6 bg-white hover:-translate-y-2">
                  <div className={`w-14 h-14 rounded-2xl bg-muted/50 shadow-inner flex items-center justify-center mb-3 transition-all duration-300 group-hover:bg-primary/10 group-hover:rotate-6`}>
                    <feature.icon className={`h-7 w-7 ${feature.color} transition-transform group-hover:scale-110`} />
                  </div>
                  <span className="text-xs font-black text-slate-700 text-center leading-tight group-hover:text-primary transition-colors">
                    {feature.name}
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Content Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Listings */}
          <section className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Top Rated Places</h2>
              <Badge variant="secondary" className="bg-accent/10 text-accent-foreground font-black">Verified</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <Card key={i} className="group overflow-hidden rounded-[2.5rem] border-none shadow-sm hover:shadow-xl transition-all duration-500 bg-white">
                  <div className="relative aspect-[16/9]">
                    <Image 
                      src={`https://picsum.photos/seed/feat${i}/800/450`} 
                      alt="Place" 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint="halal business"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Badge className="bg-white/95 backdrop-blur text-primary border-none font-black shadow-lg">Verified</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-xl font-black group-hover:text-primary transition-colors">Elite Steakhouse {i}</CardTitle>
                        <div className="flex items-center gap-1 font-medium text-muted-foreground text-sm">
                          <MapPin className="h-3.5 w-3.5" /> Downtown, New York
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-bold text-accent bg-accent/5 px-2 py-1 rounded-lg">
                        <Star className="h-4 w-4 fill-current" /> 4.9
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Activity Sidebar */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Community Feed</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="rounded-3xl border-none shadow-sm p-4 hover:shadow-md transition-all bg-white cursor-pointer group">
                  <div className="flex gap-4 items-center">
                    <div className="relative h-16 w-16 rounded-2xl overflow-hidden shrink-0">
                      <Image src={`https://picsum.photos/seed/feed${i}/200/200`} alt="Feed" fill className="object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="space-y-1 overflow-hidden">
                      <p className="text-sm font-bold text-slate-800 line-clamp-1">New Halal Grill Opening!</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">Check out the latest spot in Queens with authentic flavors.</p>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-primary pt-1">
                        <TrendingUp className="h-3 w-3" /> Trending
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              <Button variant="outline" className="w-full rounded-2xl font-bold py-6 border-2">View All Feed</Button>
            </div>
          </section>
        </div>

        {/* Platform Stats */}
        <section className="bg-primary/5 rounded-[3rem] p-8 md:p-12 text-center md:text-left">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Users", val: "142k+", icon: Users },
              { label: "Verified Places", val: "12k+", icon: CheckCircle2 },
              { label: "Daily Feed", val: "2.4k+", icon: MessageSquare },
              { label: "Countries", val: "45+", icon: Compass },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto md:mx-0">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-black text-slate-900">{stat.val}</div>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Nav (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t px-6 py-4 flex items-center justify-between z-[100] rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <Link href="/" className="flex flex-col items-center gap-1 text-primary">
          <div className="p-1 rounded-xl bg-primary/10">
            <HomeIcon className="h-6 w-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
        </Link>
        <Link href="/categories" className="flex flex-col items-center gap-1 text-muted-foreground">
          <Grid className="h-6 w-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Browse</span>
        </Link>
        <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white -translate-y-8 shadow-2xl shadow-primary/40 border-[6px] border-white active:scale-90 transition-transform">
          <Compass className="h-7 w-7" />
        </div>
        <Link href="/community" className="flex flex-col items-center gap-1 text-muted-foreground">
          <MessageSquare className="h-6 w-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Social</span>
        </Link>
        <Link href="/account/dashboard" className="flex flex-col items-center gap-1 text-muted-foreground">
          <User className="h-6 w-6" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
        </Link>
      </nav>
    </div>
  );
}

function HomeIcon(props: any) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
