
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  UtensilsCrossed, Map, List, Store, User, Briefcase, 
  ShieldCheck, Users, Moon, MessageSquare, Newspaper, 
  Settings, BookOpen, Heart, HandHelping, Medal, 
  Gift, Calendar, Search, MapPin, Play
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

const FEATURES = [
  { name: "Food & Dining", icon: UtensilsCrossed },
  { name: "Meat & Butchers", icon: BeefIcon },
  { name: "Map", icon: Map },
  { name: "Directory", icon: List },
  { name: "Marketplace", icon: Store },
  { name: "Creators", icon: User },
  { name: "Professionals", icon: Briefcase },
  { name: "Halal Check", icon: ShieldCheck },
  { name: "Family", icon: Users },
  { name: "Prayer", icon: Moon },
  { name: "Chat", icon: MessageSquare },
  { name: "Feed", icon: Newspaper },
  { name: "Manage", icon: Briefcase },
  { name: "Blog", icon: BookOpen },
  { name: "Charity", icon: Heart },
  { name: "Volunteer", icon: HandHelping },
  { name: "My Journey", icon: Medal },
  { name: "Rewards", icon: Gift },
  { name: "Community", icon: Users },
  { name: "Events", icon: Calendar },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <CompassIcon className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold text-primary font-headline tracking-tight">HalalSphere</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search features..." 
              className="w-full bg-muted/50 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          <Button variant="ghost" size="icon" className="rounded-full"><Search className="h-5 w-5 md:hidden" /></Button>
          <Avatar className="h-10 w-10 border-2 border-primary/10">
            <AvatarImage src="https://picsum.photos/seed/user/100/100" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
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
              <div className="text-7xl font-black tracking-tighter">4:28<span className="text-3xl font-light ml-2 opacity-80">PM</span></div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-base text-white/90">
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

        {/* Discover Features Grid */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Discover Features</h2>
            <Button variant="link" className="text-primary font-bold">View All</Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {FEATURES.map((feature) => (
              <Link key={feature.name} href="#" className="group">
                <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2.5rem] aspect-square flex flex-col items-center justify-center p-4 bg-white hover:-translate-y-2">
                  <div className="w-20 h-20 rounded-full bg-[#F1F3F5] shadow-inner flex items-center justify-center mb-4 transition-colors group-hover:bg-primary/10">
                    <feature.icon className="h-10 w-10 text-primary transition-transform group-hover:scale-110" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 text-center leading-tight group-hover:text-primary transition-colors">
                    {feature.name}
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Reels */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Trending Community Reels</h2>
            <Button variant="ghost" className="text-sm font-bold">Explore</Button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="relative w-56 flex-shrink-0 aspect-[9/16] rounded-[2rem] overflow-hidden group snap-start shadow-lg">
                <Image 
                  src={`https://picsum.photos/seed/reel${i}/400/700`} 
                  alt="Reel" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  data-ai-hint="halal lifestyle video"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                   <div className="flex items-center gap-3 mb-2">
                     <Avatar className="h-8 w-8 border-2 border-white/50 shadow-md">
                        <AvatarImage src={`https://picsum.photos/seed/av${i}/50/50`} />
                        <AvatarFallback>U</AvatarFallback>
                     </Avatar>
                     <div className="flex flex-col">
                        <span className="text-xs text-white font-bold">@creator_{i}</span>
                        <span className="text-[10px] text-white/70">1.2k views</span>
                     </div>
                   </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                  <Play className="h-14 w-14 text-white fill-white drop-shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Info */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <Card className="rounded-3xl border-none shadow-sm p-6 flex items-center gap-6 bg-white hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <Calendar className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Upcoming Events</h3>
                <p className="text-sm text-muted-foreground">Global Halal Expo starts in 2 days</p>
                <Button variant="link" className="p-0 h-auto text-orange-600 font-bold text-xs">View Calendar</Button>
              </div>
           </Card>
           <Card className="rounded-3xl border-none shadow-sm p-6 flex items-center gap-6 bg-white hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <MessageSquare className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold">Community Chat</h3>
                <p className="text-sm text-muted-foreground">34 new messages in Professionals group</p>
                <Button variant="link" className="p-0 h-auto text-blue-600 font-bold text-xs">Join Discussion</Button>
              </div>
           </Card>
        </section>

        <div className="h-24" /> 
      </div>

      {/* Bottom Nav (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t px-8 py-4 flex items-center justify-between z-50">
        <Link href="/" className="flex flex-col items-center gap-1 text-primary">
          <HomeIcon className="h-6 w-6" />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="/restaurants" className="flex flex-col items-center gap-1 text-muted-foreground">
          <UtensilsCrossed className="h-6 w-6" />
          <span className="text-[10px]">Dining</span>
        </Link>
        <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white -translate-y-6 shadow-xl shadow-primary/40 border-4 border-white">
          <CompassIcon className="h-7 w-7" />
        </div>
        <Link href="/community" className="flex flex-col items-center gap-1 text-muted-foreground">
          <Users className="h-6 w-6" />
          <span className="text-[10px]">Social</span>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-1 text-muted-foreground">
          <User className="h-6 w-6" />
          <span className="text-[10px]">Me</span>
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
