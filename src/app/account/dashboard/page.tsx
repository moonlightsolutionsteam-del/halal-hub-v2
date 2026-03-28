
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, Clock, Star, Wallet, Settings, 
  Bell, ShieldCheck, MapPin, Award, 
  MessageSquare, UserCheck, Zap, TrendingUp,
  ChevronRight, Share2, Camera, Edit2,
  ArrowLeft, MoreVertical, Flame, ShoppingBag,
  Package, LayoutGrid, PlayCircle, Users,
  Info, Bookmark, CheckCircle2, ArrowRight, Store, PenTool
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog"
import Link from "next/link"
import Image from "next/image"

const FamilyTreeIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v8" />
    <path d="m16 12-4-4-4 4" />
    <rect width="8" height="4" x="8" y="12" rx="1" />
    <path d="M12 16v6" />
    <path d="M8 22h8" />
  </svg>
);

export default function UserDashboard() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white border-b px-4 h-14 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Link>
          <h1 className="font-bold text-lg">Profile</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://picsum.photos/seed/user-main/100/100" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Profile Hero Section */}
      <div className="relative">
        {/* Banner */}
        <div className="h-48 w-full relative overflow-hidden">
          <Image 
            src="https://picsum.photos/seed/nature-banner/1600/400" 
            alt="Banner" 
            fill 
            className="object-cover"
            priority
          />
        </div>

        {/* Profile Info Overlay */}
        <div className="container mx-auto max-w-4xl px-6 -mt-12 relative z-10">
          <div className="flex flex-col items-start gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
                <AvatarImage src="https://picsum.photos/seed/user-sa/200/200" />
                <AvatarFallback className="text-2xl font-black">SA</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex justify-between items-start w-full">
              <div className="space-y-0.5">
                <h2 className="text-2xl font-black text-slate-900">Super Admin</h2>
                <p className="text-sm font-medium text-slate-400">@admin</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-full bg-white border-slate-200 h-9 px-6 font-bold text-xs text-emerald-600 hover:bg-slate-50">
                  Edit profile
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-white border-slate-200 h-9 w-9 text-slate-400">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Link href="/family-tree">
              <Button className="w-full bg-[#E0F7FA] text-emerald-700 hover:bg-[#B2EBF2] font-black text-xs uppercase tracking-widest rounded-xl h-12 shadow-sm border-none gap-2">
                <FamilyTreeIcon className="h-4 w-4" /> Family Tree
              </Button>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#E0F7FA] text-emerald-700 hover:bg-[#B2EBF2] font-black text-xs uppercase tracking-widest rounded-xl h-12 shadow-sm border-none">
                  Go Pro
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-[2.5rem] p-8 border-none bg-white">
                <DialogHeader className="space-y-2">
                  <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">Upgrade to Pro</DialogTitle>
                  <DialogDescription className="font-medium text-slate-500 italic">
                    Choose your professional path in the Halal Ecosystem.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-4 pt-4">
                  <Link href="/vendor/creative/dashboard">
                    <Button className="w-full h-24 bg-blue-50 hover:bg-blue-100 text-blue-700 border-2 border-blue-100 rounded-3xl flex flex-col items-start px-6 group transition-all shadow-sm">
                      <div className="flex items-center gap-3 w-full">
                        <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <PenTool className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="font-black text-base tracking-tight">Join as Creator</span>
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Influencers & Scholars</span>
                        </div>
                        <ArrowRight className="h-5 w-5 ml-auto group-hover:translate-x-1 transition-transform text-blue-300" />
                      </div>
                    </Button>
                  </Link>
                  <Link href="/partner/onboarding/business/category">
                    <Button className="w-full h-24 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-2 border-emerald-100 rounded-3xl flex flex-col items-start px-6 group transition-all shadow-sm">
                      <div className="flex items-center gap-3 w-full">
                        <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <Store className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="font-black text-base tracking-tight">Register Business</span>
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Shops & Restaurants</span>
                        </div>
                        <ArrowRight className="h-5 w-5 ml-auto group-hover:translate-x-1 transition-transform text-emerald-300" />
                      </div>
                    </Button>
                  </Link>
                </div>
                <div className="pt-4 text-center">
                  <Link href="/partner/portal" className="text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-[0.2em] transition-colors">
                    Explore all partner types
                  </Link>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Social Stats */}
          <div className="flex items-center justify-around py-6 text-center border-b border-slate-100">
            <div className="space-y-0.5">
              <p className="text-base font-black text-slate-900">12</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Following</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-base font-black text-slate-900">5</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Followers</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-base font-black text-slate-900">4</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Family</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-base font-black text-slate-900">100</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Coins</p>
            </div>
          </div>

          {/* Membership Bar */}
          <div className="mt-6 bg-[#4E4B2E] rounded-2xl p-4 flex items-center justify-between text-white shadow-lg">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-amber-50/20 rounded-lg flex items-center justify-center">
                <Star className="h-4 w-4 text-amber-400 fill-current" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-black uppercase tracking-widest">Membership</p>
                <p className="text-[10px] opacity-70">Unlock Ad-free feature, widgets, etc.</p>
              </div>
            </div>
            <Button size="sm" className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-black h-8 px-4 rounded-full text-[10px]">
              Go &gt;
            </Button>
          </div>

          {/* Quick Tools Grid */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            {[
              { label: "Level", icon: Flame, color: "text-emerald-500", bg: "bg-emerald-50", badge: "Claim" },
              { label: "Wallet", icon: Wallet, color: "text-blue-500", bg: "bg-blue-50" },
              { label: "Store", icon: ShoppingBag, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Backpack", icon: Package, color: "text-teal-600", bg: "bg-teal-50", badge: "New" },
            ].map((tool, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="relative">
                  <div className={`h-14 w-14 rounded-2xl ${tool.bg} flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform shadow-sm`}>
                    <tool.icon className="h-6 w-6" />
                  </div>
                  {tool.badge && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase shadow-lg">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tool.label}</span>
              </div>
            ))}
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="activity" className="w-full mt-10">
            <TabsList className="bg-transparent h-10 w-full p-0 gap-8 justify-start border-b rounded-none mb-8">
              <TabsTrigger value="journey" className="px-0 pb-3 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent text-xs font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-slate-900 transition-all">Your Journey</TabsTrigger>
              <TabsTrigger value="activity" className="px-0 pb-3 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent text-xs font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-slate-900 transition-all">Activity</TabsTrigger>
              <TabsTrigger value="content" className="px-0 pb-3 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent text-xs font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-slate-900 transition-all">Content</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="m-0 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-24">
              {/* My Suggestions */}
              <section className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 px-2">My Suggestions</h3>
                <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden p-6 space-y-4">
                  {[
                    { 
                      name: "The Halal Grill & Bistro", 
                      status: "ADDED TO HUB", 
                      statusColor: "bg-emerald-50 text-emerald-600",
                      date: "Oct 12, 2023", 
                      points: "+50 Points Earned",
                      img: "food1"
                    },
                    { 
                      name: "Istanbul Spice Market", 
                      status: "VERIFICATION IN PROGRESS", 
                      statusColor: "bg-blue-50 text-blue-600",
                      date: "Oct 24, 2023", 
                      info: "Our team is verifying halal certificates",
                      img: "cat2"
                    }
                  ].map((suggestion, i) => (
                    <div key={i} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-start gap-4 group">
                      <div className="relative h-16 w-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
                        <Image src={`https://picsum.photos/seed/${suggestion.img}/200/200`} alt={suggestion.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <Badge className={`${suggestion.statusColor} border-none font-black text-[8px] uppercase tracking-widest h-5 px-2`}>{suggestion.status}</Badge>
                        <h4 className="text-sm font-black text-slate-900">{suggestion.name}</h4>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Submitted on {suggestion.date}</p>
                        {suggestion.points && <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{suggestion.points}</p>}
                        {suggestion.info && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-blue-500 italic">
                            <Info className="h-3 w-3" /> {suggestion.info}
                          </div>
                        )}
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-xl group-hover:bg-white shadow-none transition-all"><ChevronRight className="h-4 w-4" /></Button>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full font-black text-xs uppercase tracking-[0.2em] text-slate-400 h-12 hover:bg-slate-50">View All Suggestions</Button>
                </Card>
              </section>

              {/* My Reviews */}
              <section className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 px-2">My Reviews</h3>
                <div className="space-y-4">
                  {[
                    { business: "Karim's Restaurant", rating: 5, date: "2 days ago", text: "Authentic Mughlai taste! The kebabs were succulent and the biryani was flavorful. A must-visit." },
                    { business: "Al-Naseeb Meats", rating: 4, date: "1 week ago", text: "Fresh meat and very clean shop. The staff is helpful." }
                  ].map((review, i) => (
                    <Card key={i} className="rounded-[2.5rem] border-none shadow-sm bg-white p-6 space-y-3">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} className={`h-3.5 w-3.5 ${idx < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                      <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{review.text}"</p>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs font-black text-slate-900 uppercase tracking-tighter">{review.business}</span>
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{review.date}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              {/* My Check-ins */}
              <section className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 px-2">My Check-ins</h3>
                <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden p-2">
                  {[
                    { name: "Jama Masjid", date: "Today" },
                    { name: "Karim's Restaurant", date: "2 days ago" },
                    { name: "Al-Noor Islamic Center", date: "5 days ago" }
                  ].map((checkin, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50/50 rounded-2xl transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shadow-inner group-hover:scale-110 transition-transform">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-black text-slate-800">{checkin.name}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{checkin.date}</span>
                    </div>
                  ))}
                </Card>
              </section>

              {/* My Bookmarks */}
              <section className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 px-2">My Bookmarks</h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { name: "Khan Chacha", type: "Restaurant" },
                    { name: "Fatehpuri Masjid", type: "Mosque" }
                  ].map((bookmark, i) => (
                    <Card key={i} className="rounded-[2.5rem] border-none shadow-sm bg-white p-6 flex items-center justify-between group hover:shadow-md transition-all">
                      <div className="space-y-1">
                        <h4 className="text-base font-black text-slate-900">{bookmark.name}</h4>
                        <Badge variant="secondary" className="bg-slate-50 text-slate-400 border-none font-black text-[8px] uppercase tracking-widest px-2">{bookmark.type}</Badge>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50">
                        <Bookmark className="h-5 w-5 fill-current" />
                      </Button>
                    </Card>
                  ))}
                </div>
              </section>
            </TabsContent>

            <TabsContent value="content" className="m-0 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-24">
              {/* My Posts Section */}
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden p-8 space-y-6">
                <CardHeader className="p-0">
                  <CardTitle className="text-xl font-black">My Posts</CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  {[
                    { text: "Just had the most amazing biryani at Karim's! Highly recommend the Mutton Korma as well. A true taste of Old Delhi.", time: "3d ago", likes: 15, comments: 4 },
                    { text: "Reminder: 'Verily, with every hardship comes ease.' (Quran 94:5). A beautiful verse to reflect on during tough times.", time: "1w ago", likes: 58, comments: 12 },
                  ].map((post, i) => (
                    <div key={i} className="p-5 bg-slate-50/50 border border-slate-100 rounded-2xl space-y-3">
                      <p className="text-sm font-medium text-slate-600 leading-relaxed">{post.text}</p>
                      <div className="flex justify-between items-center text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        <span>{post.time}</span>
                        <div className="flex gap-4">
                          <span className="flex items-center gap-1.5"><Heart className="h-3 w-3" /> {post.likes}</span>
                          <span className="flex items-center gap-1.5"><MessageSquare className="h-3 w-3" /> {post.comments}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Media Grid */}
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden p-8 space-y-6">
                <CardHeader className="p-0">
                  <CardTitle className="text-xl font-black">Media</CardTitle>
                </CardHeader>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="aspect-square relative rounded-xl overflow-hidden shadow-sm hover:scale-105 transition-transform cursor-pointer">
                      <Image 
                        src={`https://picsum.photos/seed/media-${i}/400/400`} 
                        alt="Media" 
                        fill 
                        className="object-cover"
                        data-ai-hint="aesthetic nature"
                      />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Rolls Section */}
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden p-8 space-y-6">
                <CardHeader className="p-0">
                  <CardTitle className="text-xl font-black">Rolls</CardTitle>
                </CardHeader>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-[9/16] relative rounded-[1.5rem] overflow-hidden shadow-md group cursor-pointer">
                      <Image 
                        src={`https://picsum.photos/seed/roll-${i}/400/700`} 
                        alt="Roll" 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        data-ai-hint="vertical scenic landscape"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <PlayCircle className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
