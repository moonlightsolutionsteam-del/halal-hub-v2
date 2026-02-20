
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Utensils, ShoppingBag, Tent, Shirt, Clock, CheckCircle, Compass, 
  Coins, CalendarDays, Users, GraduationCap, Map, HeartPulse, 
  BookOpen, Building2, Briefcase, HandHeart, Baby, Newspaper, 
  Megaphone, Radio, Tv, Gamepad2, Play, Star, MapPin, 
  ArrowRight, Info, Search
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SERVICES = [
  { name: "Food Dining", icon: Utensils, color: "bg-emerald-100 text-emerald-600" },
  { name: "Halal Market", icon: ShoppingBag, color: "bg-blue-100 text-blue-600" },
  { name: "Hajj", icon: Tent, color: "bg-amber-100 text-amber-600" },
  { name: "Clothing", icon: Shirt, color: "bg-purple-100 text-purple-600" },
  { name: "Prayer Times", icon: Clock, color: "bg-rose-100 text-rose-600" },
  { name: "Halal Status", icon: CheckCircle, color: "bg-green-100 text-green-600" },
  { name: "Qibla", icon: Compass, color: "bg-indigo-100 text-indigo-600" },
  { name: "Zakat", icon: Coins, color: "bg-yellow-100 text-yellow-600" },
  { name: "Events", icon: CalendarDays, color: "bg-sky-100 text-sky-600" },
  { name: "Community", icon: Users, color: "bg-orange-100 text-orange-600" },
  { name: "Education", icon: GraduationCap, color: "bg-teal-100 text-teal-600" },
  { name: "Travel", icon: Map, color: "bg-cyan-100 text-cyan-600" },
  { name: "Health", icon: HeartPulse, color: "bg-red-100 text-red-600" },
  { name: "Bookstore", icon: BookOpen, color: "bg-lime-100 text-lime-600" },
  { name: "Real Estate", icon: Building2, color: "bg-slate-100 text-slate-600" },
  { name: "Jobs", icon: Briefcase, color: "bg-zinc-100 text-zinc-600" },
  { name: "Charity", icon: HandHeart, color: "bg-pink-100 text-pink-600" },
  { name: "Kids", icon: Baby, color: "bg-fuchsia-100 text-fuchsia-600" },
  { name: "News", icon: Newspaper, color: "bg-gray-100 text-gray-600" },
  { name: "Marketing", icon: Megaphone, color: "bg-violet-100 text-violet-600" },
  { name: "Radio", icon: Radio, color: "bg-emerald-100 text-emerald-600" },
  { name: "Streaming", icon: Tv, color: "bg-blue-100 text-blue-600" },
  { name: "Games", icon: Gamepad2, color: "bg-rose-100 text-rose-600" },
  { name: "Other", icon: Info, color: "bg-gray-100 text-gray-600" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Compass className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-primary font-headline">HalalHub</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon"><Search className="h-5 w-5" /></Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://picsum.photos/seed/user/100/100" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-8 max-w-2xl">
        {/* Greeting */}
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-slate-800">Assalamu'alaikum, User</h1>
          <p className="text-muted-foreground text-sm">Welcome back</p>
          <p className="text-[10px] text-muted-foreground uppercase mt-1 tracking-widest font-bold">Tuesday, Oct 24, 2023</p>
        </div>

        {/* Prayer Time Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-white p-8 shadow-xl shadow-primary/20">
          <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
               <Badge variant="outline" className="border-white/40 text-white bg-white/10 px-3 py-1 text-xs">Asr</Badge>
               <span className="text-xs text-white/80">Next Prayer</span>
            </div>
            <div className="text-6xl font-black mb-1">4:28<span className="text-2xl font-normal ml-1">PM</span></div>
            <div className="flex items-center gap-2 text-sm text-white/90">
              <MapPin className="h-3 w-3" /> New York, NY, USA
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
        </section>

        {/* Services Grid */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold">Discover Services</h2>
          <div className="grid grid-cols-4 gap-y-6 gap-x-2">
            {SERVICES.map((service) => (
              <Link key={service.name} href="#" className="flex flex-col items-center gap-2 group">
                <div className={`w-12 h-12 rounded-2xl ${service.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-medium text-center text-slate-600 line-clamp-1">{service.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Info Cards */}
        <section className="grid grid-cols-1 gap-3">
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Prayer Times</h3>
                  <p className="text-[10px] text-muted-foreground">Next: Maghrib at 5:58 PM</p>
                </div>
              </div>
              <span className="text-xs font-bold text-orange-600">03:12:45</span>
            </CardContent>
          </Card>
          <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Coins className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Zakat Information</h3>
                  <p className="text-[10px] text-muted-foreground">Calculate your zakat dues</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600">Go to Zakat</span>
            </CardContent>
          </Card>
        </section>

        {/* Gallery Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Islamic Gallery</h2>
            <Link href="#" className="text-xs text-primary font-bold">See All</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
             <div className="aspect-square relative rounded-2xl overflow-hidden group">
                <Image src="https://picsum.photos/seed/gall1/400/400" alt="Gallery" fill className="object-cover group-hover:scale-110 transition-transform duration-500" data-ai-hint="islamic food" />
             </div>
             <div className="aspect-square relative rounded-2xl overflow-hidden group">
                <Image src="https://picsum.photos/seed/art1/400/400" alt="Gallery" fill className="object-cover group-hover:scale-110 transition-transform duration-500" data-ai-hint="islamic calligraphy" />
             </div>
             <div className="aspect-square relative rounded-2xl overflow-hidden group">
                <Image src="https://picsum.photos/seed/gall3/400/400" alt="Gallery" fill className="object-cover group-hover:scale-110 transition-transform duration-500" data-ai-hint="middle eastern market" />
             </div>
             <div className="aspect-square relative rounded-2xl overflow-hidden group">
                <Image src="https://picsum.photos/seed/gall4/400/400" alt="Gallery" fill className="object-cover group-hover:scale-110 transition-transform duration-500" data-ai-hint="modern restaurant" />
             </div>
          </div>
        </section>

        {/* Trending Reels */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Trending Reels</h2>
            <Link href="#" className="text-xs text-primary font-bold">See All</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative w-40 flex-shrink-0 aspect-[9/16] rounded-3xl overflow-hidden group">
                <Image 
                  src={`https://picsum.photos/seed/reel${i}/400/700`} 
                  alt="Reel" 
                  fill 
                  className="object-cover"
                  data-ai-hint="vertical video"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                   <div className="flex items-center gap-2 mb-2">
                     <Avatar className="h-5 w-5 border border-white">
                        <AvatarImage src={`https://picsum.photos/seed/av${i}/50/50`} />
                        <AvatarFallback>U</AvatarFallback>
                     </Avatar>
                     <span className="text-[10px] text-white font-bold">@creator{i}</span>
                   </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="h-10 w-10 text-white fill-white" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Creators */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Featured Creators</h2>
            <Link href="#" className="text-xs text-primary font-bold">See All</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((i) => (
               <Card key={i} className="border-none shadow-sm text-center">
                 <CardContent className="p-6 space-y-3">
                   <Avatar className="h-16 w-16 mx-auto border-4 border-primary/20">
                     <AvatarImage src={`https://picsum.photos/seed/creator${i}/100/100`} />
                     <AvatarFallback>CR</AvatarFallback>
                   </Avatar>
                   <div className="space-y-1">
                     <h3 className="text-sm font-bold">Amina Jafari</h3>
                     <p className="text-[10px] text-muted-foreground">Lifestyle & Food</p>
                   </div>
                   <Button size="sm" variant="outline" className="h-8 rounded-full text-xs">Follow</Button>
                 </CardContent>
               </Card>
            ))}
          </div>
        </section>

        {/* Platform Stats */}
        <section className="bg-primary/5 rounded-3xl p-6 space-y-6">
           <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <h2 className="font-bold text-primary">Platform Highlights</h2>
           </div>
           <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-amber-500" />
                  <span className="text-sm font-bold">1,247</span>
                  <span className="text-xs text-muted-foreground">Total Mosques</span>
                </div>
                <Badge variant="secondary" className="bg-amber-50 text-amber-600 text-[10px]">Verified</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-bold">15,892</span>
                  <span className="text-xs text-muted-foreground">Community Members</span>
                </div>
                <Badge variant="secondary" className="bg-blue-50 text-blue-600 text-[10px]">Live</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <HandHeart className="h-5 w-5 text-rose-500" />
                  <span className="text-sm font-bold">$3,554</span>
                  <span className="text-xs text-muted-foreground">Charity Raised</span>
                </div>
                <Badge variant="secondary" className="bg-rose-50 text-rose-600 text-[10px]">Today</Badge>
              </div>
           </div>
        </section>

        <div className="h-20" /> {/* Spacer for bottom nav */}
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-3 flex items-center justify-between z-50">
        <Link href="/" className="flex flex-col items-center gap-1 text-primary">
          <HomeIcon className="h-5 w-5" />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="/restaurants" className="flex flex-col items-center gap-1 text-muted-foreground">
          <Utensils className="h-5 w-5" />
          <span className="text-[10px]">Food</span>
        </Link>
        <Link href="/prayer-times" className="flex flex-col items-center gap-1 text-muted-foreground">
          <Clock className="h-5 w-5" />
          <span className="text-[10px]">Prayer</span>
        </Link>
        <Link href="/community" className="flex flex-col items-center gap-1 text-muted-foreground">
          <Users className="h-5 w-5" />
          <span className="text-[10px]">Social</span>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-1 text-muted-foreground">
          <Avatar className="h-5 w-5">
            <AvatarImage src="https://picsum.photos/seed/user/50/50" />
          </Avatar>
          <span className="text-[10px]">Profile</span>
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
