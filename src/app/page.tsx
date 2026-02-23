import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  UtensilsCrossed, Map, List, Store, User, Briefcase, 
  ShieldCheck, Users, Moon, MessageSquare, Newspaper, 
  Settings, BookOpen, Heart, HandHelping, Medal, 
  Gift, Calendar, Search, MapPin, Play, Grid, ArrowRight,
  TrendingUp, Star, Compass
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
  { name: "Food & Dining", icon: UtensilsCrossed, url: "/restaurants" },
  { name: "Meat & Butchers", icon: BeefIcon, url: "/categories" },
  { name: "Map View", icon: Map, url: "/travel" },
  { name: "Halal Check", icon: ShieldCheck, url: "/verifier" },
  { name: "Community", icon: Users, url: "/community" },
  { name: "Events", icon: Calendar, url: "/events" },
  { name: "Prayer Guide", icon: Moon, url: "/prayer-times" },
  { name: "All Categories", icon: Grid, url: "/categories" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-24 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <CompassIcon className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold text-primary font-headline tracking-tight">Halal Hub</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search products, places..." 
              className="w-full bg-muted/50 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          <Button variant="ghost" size="icon" className="rounded-full md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/account/dashboard">
            <Avatar className="h-10 w-10 border-2 border-primary/10">
              <AvatarImage src="https://picsum.photos/seed/user/100/100" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-12 max-w-5xl">
        {/* Prayer Time Hero */}
        <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-primary/80 text-white p-10 shadow-2xl shadow-primary/30">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                 <Badge variant="outline" className="border-white/40 text-white bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-wider">Asr</Badge>
                 <span className="text-sm text-white/80 font-medium">Next Prayer In 01:22:45</span>
              </div>
              <div className="text-7xl font-black tracking-tighter leading-none">4:28<span className="text-3xl font-light ml-2 opacity-80 uppercase">pm</span></div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-base text-white/90 font-medium">
                <MapPin className="h-4 w-4" /> New York, NY, USA
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-48 h-48 rounded-full border-8 border-white/10 flex items-center justify-center">
                <Moon className="w-24 h-24 text-white/20 fill-white/10" />
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
        </section>

        {/* Quick Access Categories */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Discovery Hub</h2>
            <Link href="/categories" className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
              All Verticals <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
            {QUICK_FEATURES.map((feature) => (
              <Link key={feature.name} href={feature.url} className="group">
                <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2.5rem] flex flex-col items-center justify-center p-6 bg-white hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl bg-[#F1F3F5] shadow-inner flex items-center justify-center mb-3 transition-colors group-hover:bg-primary/10">
                    <feature.icon className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
                  </div>
                  <span className="text-xs font-black text-slate-700 text-center leading-tight group-hover:text-primary transition-colors">
                    {feature.name}
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Listings */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Featured Listings</h2>
            <Badge variant="secondary" className="bg-accent/10 text-accent-foreground font-black px-4 py-1">Community Top-Rated</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="group overflow-hidden rounded-[2.5rem] border-none shadow-sm hover:shadow-xl transition-all duration-500 bg-white">
                <div className="relative aspect-video">
                  <Image 
                    src={`https://picsum.photos/seed/feat${i}/600/400`} 
                    alt="Place" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint="halal business"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 backdrop-blur text-primary border-none font-black shadow-lg">Verified</Badge>
                  </div>
                </div>
                <CardHeader className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-black group-hover:text-primary transition-colors">Elite Steakhouse {i}</CardTitle>
                      <CardDescription className="flex items-center gap-1 font-medium mt-1">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> Downtown, NY
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-bold text-accent">
                      <Star className="h-4 w-4 fill-current" /> 4.9
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Rewards CTA */}
        <section className="bg-accent rounded-[3rem] p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-accent/30 border-4 border-white/20">
          <div className="relative z-10 space-y-4 max-w-md text-center md:text-left">
            <h2 className="text-4xl font-black text-slate-900 leading-tight">Join Our Rewards Community</h2>
            <p className="text-slate-800/80 font-bold">Earn Halal Hub coins for every review, verification, and community contribution.</p>
            <Button size="lg" className="rounded-full px-8 bg-slate-900 text-white hover:bg-slate-800 shadow-xl border-none">
              Start Earning Now
            </Button>
          </div>
          <div className="relative z-10 flex -space-x-4">
            {[1, 2, 3, 4].map(i => (
              <Avatar key={i} className="h-16 w-14 border-4 border-white shadow-lg ring-4 ring-accent">
                <AvatarImage src={`https://picsum.photos/seed/usr${i}/100/100`} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            ))}
            <div className="h-16 w-16 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center font-black text-accent text-sm ring-4 ring-accent">
              +12k
            </div>
          </div>
          <TrendingUp className="absolute -bottom-10 -right-10 h-64 w-64 text-white/10 rotate-12" />
        </section>
      </div>

      {/* Bottom Nav (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t px-8 py-4 flex items-center justify-between z-50 rounded-t-[2.5rem] shadow-2xl">
        <Link href="/" className="flex flex-col items-center gap-1 text-primary">
          <HomeIcon className="h-6 w-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
        </Link>
        <Link href="/categories" className="flex flex-col items-center gap-1 text-muted-foreground">
          <Grid className="h-6 w-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Browse</span>
        </Link>
        <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white -translate-y-6 shadow-2xl shadow-primary/40 border-4 border-white">
          <CompassIcon className="h-7 w-7" />
        </div>
        <Link href="/community" className="flex flex-col items-center gap-1 text-muted-foreground">
          <MessageSquare className="h-6 w-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Social</span>
        </Link>
        <Link href="/account/dashboard" className="flex flex-col items-center gap-1 text-muted-foreground">
          <User className="h-6 w-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Me</span>
        </Link>
      </nav>
    </div>
  );
}

function CompassIcon(props: any) {
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
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    )
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
