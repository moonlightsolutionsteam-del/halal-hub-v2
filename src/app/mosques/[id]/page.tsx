
"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft, MapPin, Clock, Phone, Globe, Share2, Heart,
  CheckCircle2, Star, Navigation, ChevronRight,
  Moon, Sunrise, Sun, Sunset, Calendar, Users,
  BookOpen, Mic2, HeartHandshake, ShieldCheck, Camera,
  MessageSquare, Bell, Info, Baby, Wifi, ParkingSquare,
  Accessibility, Droplets, Coffee
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useSavedBusinesses } from "@/lib/saved-businesses-context"

const MOSQUES: Record<string, any> = {
  "1": {
    name: "Masjid Al-Noor",
    tagline: "A sanctuary of light and learning in the heart of Mumbai.",
    area: "Bandra West",
    city: "Mumbai",
    country: "India",
    fullAddress: "Hill Road, Bandra West, Mumbai, Maharashtra 400050",
    phone: "+91 22 2655 0001",
    website: "https://masjidalnoor.org",
    established: "1962",
    capacity: "3,000",
    verified: true,
    rating: 4.9,
    reviews: 312,
    imam: "Sheikh Hamza Al-Ansari",
    about: "Masjid Al-Noor is one of Mumbai's most cherished mosques, serving the local Muslim community for over six decades. Our vibrant center offers daily prayers, Quranic education, community events, and social welfare programs. We strive to be a welcoming home for every Muslim.",
    services: ["Jummah", "Quran Classes", "Nikah", "Eid Prayers", "Iftar", "Dawah"],
    facilities: [
      { label: "Wudu Areas", icon: Droplets },
      { label: "Sisters' Section", icon: Users },
      { label: "Children's Area", icon: Baby },
      { label: "Free Wifi", icon: Wifi },
      { label: "Parking", icon: ParkingSquare },
      { label: "Accessible", icon: Accessibility },
      { label: "Library", icon: BookOpen },
      { label: "Café", icon: Coffee },
    ],
    prayerTimes: [
      { name: "Fajr", time: "05:11 AM", icon: Sunrise },
      { name: "Dhuhr", time: "12:30 PM", icon: Sun },
      { name: "Asr", time: "04:00 PM", icon: Sunset },
      { name: "Maghrib", time: "07:15 PM", icon: Moon },
      { name: "Isha", time: "08:30 PM", icon: Moon },
      { name: "Jummah", time: "01:15 PM", icon: Mic2 },
    ],
    events: [
      { title: "Monthly Family Iftar", date: "Every 1st Friday", time: "7:00 PM", tag: "Community" },
      { title: "Quran Hifz Graduation", date: "July 20, 2026", time: "5:00 PM", tag: "Ceremony" },
      { title: "Islamic Finance Workshop", date: "July 27, 2026", time: "2:00 PM", tag: "Education" },
      { title: "Youth Sports Day", date: "August 3, 2026", time: "10:00 AM", tag: "Youth" },
    ],
    programs: [
      { title: "Weekend Quran School", desc: "Ages 5–16. Tajweed, memorization and Arabic language.", timing: "Sat & Sun 9–11 AM" },
      { title: "Adult Islamic Studies", desc: "Weekly circle on Fiqh, Hadith and Seerah with Sheikh Hamza.", timing: "Wed 7:30 PM" },
      { title: "Marriage Preparation", desc: "Pre-Nikah counselling sessions for couples.", timing: "By appointment" },
      { title: "Social Welfare Fund", desc: "Monthly zakat distribution and food bank.", timing: "Last Saturday" },
    ],
    imamBio: "Sheikh Hamza Al-Ansari is a graduate of Darul Uloom Deoband with 22 years of service. He specializes in Tafsir and family counselling and regularly delivers Khutbahs in English and Urdu.",
    reviews: [
      { user: "Zainab K.", rating: 5, text: "Masjid Al-Noor feels like home. The Jummah Khutbah is always relevant and inspiring. The facilities are well-maintained and the staff are welcoming." },
      { user: "Omar M.", rating: 5, text: "Enrolled my kids in the Quran school — the teachers are patient and knowledgeable. Highly recommend this masjid for families." },
    ],
    color: "bg-primary",
    accent: "bg-primary/5 text-primary",
  },
  "2": {
    name: "Jama Masjid Central",
    tagline: "Old Delhi's iconic spiritual landmark since 1656.",
    area: "Old Delhi",
    city: "New Delhi",
    country: "India",
    fullAddress: "Jama Masjid Rd, Old Delhi, New Delhi 110006",
    phone: "+91 11 2326 0823",
    website: "https://jamamasjid.in",
    established: "1656",
    capacity: "25,000",
    verified: true,
    rating: 4.8,
    reviews: 1250,
    imam: "Imam Syed Ahmed Bukhari",
    about: "Jama Masjid is India's largest mosque, commissioned by Mughal Emperor Shah Jahan and completed in 1656. It is a living UNESCO heritage site welcoming hundreds of thousands of worshippers and visitors annually. Our community programs span education, welfare, and interfaith dialogue.",
    services: ["Jummah", "Eid Prayers", "Nikah", "Dawah"],
    facilities: [
      { label: "Wudu Areas", icon: Droplets },
      { label: "Sisters' Section", icon: Users },
      { label: "Guided Tours", icon: Camera },
      { label: "Accessible", icon: Accessibility },
    ],
    prayerTimes: [
      { name: "Fajr", time: "05:05 AM", icon: Sunrise },
      { name: "Dhuhr", time: "12:25 PM", icon: Sun },
      { name: "Asr", time: "03:55 PM", icon: Sunset },
      { name: "Maghrib", time: "07:12 PM", icon: Moon },
      { name: "Isha", time: "08:25 PM", icon: Moon },
      { name: "Jummah", time: "01:00 PM", icon: Mic2 },
    ],
    events: [
      { title: "Eid Al-Adha Grand Prayer", date: "June 7, 2026", time: "6:30 AM", tag: "Eid" },
      { title: "Heritage Walk & Lecture", date: "July 15, 2026", time: "10:00 AM", tag: "Education" },
    ],
    programs: [
      { title: "Madrasa Islamia", desc: "Classical Islamic education for boys and girls.", timing: "Mon–Fri 8 AM" },
      { title: "Welfare Trust", desc: "Distributing food and essentials to those in need.", timing: "Weekly" },
    ],
    imamBio: "Imam Syed Ahmed Bukhari is the hereditary Shahi Imam, continuing a tradition of over 350 years.",
    reviews: [
      { user: "Fatima H.", rating: 5, text: "An awe-inspiring place. The architecture alone is worth the visit, and the spiritual atmosphere is unparalleled." },
    ],
    color: "bg-amber-600",
    accent: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  },
}

const FALLBACK = MOSQUES["1"]

export default function MosqueProfilePage() {
  const { id } = useParams()
  const mosque = MOSQUES[String(id)] ?? FALLBACK
  const [activeTab, setActiveTab] = useState("overview")
  const { isSaved, toggleSaved } = useSavedBusinesses()
  const { toast } = useToast()
  const entityId = `mosque-${id}`
  const saved = isSaved(entityId)
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mosque.name + " " + mosque.fullAddress)}`

  const handleSave = () => {
    toggleSaved({ id: entityId, name: mosque.name, category: "Mosque", location: mosque.city })
    toast({ title: saved ? "Removed" : "Saved", description: saved ? `${mosque.name} removed from saved.` : `${mosque.name} saved.` })
  }

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    try {
      if (navigator.share) { await navigator.share({ title: mosque.name, url }) }
      else { await navigator.clipboard.writeText(url); toast({ title: "Link copied" }) }
    } catch {}
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* Sticky nav */}
      <div className="bg-card/90 backdrop-blur-md sticky top-0 z-40 border-b">
        <div className="container mx-auto max-w-5xl px-4 h-16 flex items-center justify-between">
          <Link href="/mosques" className="flex items-center gap-2 text-sm font-black text-muted-foreground hover:text-primary group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Mosques
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-2xl" onClick={handleShare}><Share2 className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="rounded-2xl text-rose-500" onClick={handleSave}><Heart className={saved ? "h-4 w-4 fill-rose-500" : "h-4 w-4"} /></Button>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              <Button className={`${mosque.color} text-white rounded-2xl font-black text-xs px-5 h-9 hidden sm:flex`}>
                <Navigation className="h-3.5 w-3.5 mr-1.5" /> Directions
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <Image src={`https://picsum.photos/seed/mosque-${id}/1200/600`} alt={mosque.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 container mx-auto max-w-5xl">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={`${mosque.color} text-white border-none font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full`}>Mosque</Badge>
                {mosque.verified && (
                  <Badge variant="outline" className="bg-white/10 backdrop-blur text-emerald-400 border-emerald-400/40 font-black text-[10px] px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Verified
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white font-headline tracking-tight">{mosque.name}</h1>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="h-3.5 w-3.5" />
                <span className="text-sm font-medium">{mosque.area}, {mosque.city}</span>
                <span className="text-white/40">·</span>
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-black text-white">{mosque.rating}</span>
                <span className="text-sm text-white/60">({mosque.reviews.length})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-6 space-y-6">
        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-3">
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="w-full rounded-2xl h-12 font-black text-xs flex-col gap-0.5 border-2">
              <Navigation className="h-4 w-4 mb-0.5" /> Directions
            </Button>
          </a>
          <a href={`tel:${mosque.phone.replace(/[^+\d]/g, "")}`}>
            <Button variant="outline" className="w-full rounded-2xl h-12 font-black text-xs flex-col gap-0.5 border-2">
              <Phone className="h-4 w-4 mb-0.5" /> Call
            </Button>
          </a>
          <Button variant="outline" className="w-full rounded-2xl h-12 font-black text-xs flex-col gap-0.5 border-2">
            <Bell className="h-4 w-4 mb-0.5" /> Notify Me
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card border rounded-2xl h-12 p-1 shadow-sm w-full overflow-x-auto flex justify-start">
            {["overview", "prayer-times", "programs", "events", "reviews"].map(tab => (
              <TabsTrigger key={tab} value={tab} className="rounded-xl px-5 font-bold text-xs h-full capitalize data-[state=active]:bg-primary data-[state=active]:text-white shrink-0">
                {tab === "prayer-times" ? "Prayer Times" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6 animate-in fade-in duration-300">
            {/* About */}
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-4">
              <h2 className="font-black text-lg flex items-center gap-2"><Info className="h-4 w-4 text-primary" /> About</h2>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">{mosque.about}</p>
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { label: "Est.", value: mosque.established },
                  { label: "Capacity", value: mosque.capacity },
                  { label: "Reviews", value: mosque.reviews.length },
                ].map(stat => (
                  <div key={stat.label} className="text-center p-3 bg-muted rounded-2xl">
                    <p className="font-black text-base text-foreground">{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Services */}
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-4">
              <h2 className="font-black text-lg flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Services</h2>
              <div className="flex flex-wrap gap-2">
                {mosque.services.map((s: string) => (
                  <span key={s} className="text-xs font-bold px-3 py-1.5 bg-primary/10 text-primary rounded-full">{s}</span>
                ))}
              </div>
            </Card>

            {/* Facilities */}
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-4">
              <h2 className="font-black text-lg flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Facilities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {mosque.facilities.map(({ label, icon: Icon }: { label: string, icon: any }) => (
                  <div key={label} className="flex flex-col items-center gap-2 p-3 bg-muted rounded-2xl text-center">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-[11px] font-bold text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Imam */}
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-4">
              <h2 className="font-black text-lg flex items-center gap-2"><Mic2 className="h-4 w-4 text-primary" /> Lead Imam</h2>
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14 rounded-2xl bg-primary/10 shrink-0">
                  <AvatarFallback className="text-base font-black bg-primary/10 text-primary rounded-2xl">
                    {mosque.imam.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="font-black text-sm text-foreground">{mosque.imam}</p>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">{mosque.imamBio}</p>
                </div>
              </div>
            </Card>

            {/* Contact */}
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-4">
              <h2 className="font-black text-lg flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> Contact & Location</h2>
              <div className="space-y-3">
                {[
                  { icon: MapPin, label: "Address", value: mosque.fullAddress, href: mapsUrl },
                  { icon: Phone, label: "Phone", value: mosque.phone, href: `tel:${mosque.phone.replace(/[^+\d]/g, "")}` },
                  { icon: Globe, label: "Website", value: mosque.website, href: mosque.website },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                     className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted transition-colors group">
                    <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{label}</p>
                      <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{value}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                  </a>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Prayer Times */}
          <TabsContent value="prayer-times" className="space-y-6 animate-in fade-in duration-300">
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-4">
              <h2 className="font-black text-lg flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Today's Prayer Times</h2>
              <div className="space-y-2">
                {mosque.prayerTimes.map(({ name, time, icon: Icon }: { name: string, time: string, icon: any }) => (
                  <div key={name} className="flex items-center justify-between p-4 bg-muted rounded-2xl hover:bg-primary/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-black text-sm text-foreground">{name}</span>
                    </div>
                    <span className="font-black text-sm text-primary">{time}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground font-medium text-center pt-2">Times shown are approximate. Please verify locally for exact timings.</p>
            </Card>
            <Card className="rounded-[2rem] border-none shadow-sm bg-primary/5 border border-primary/10 p-6 flex items-center gap-4">
              <Bell className="h-8 w-8 text-primary shrink-0" />
              <div className="flex-1">
                <p className="font-black text-sm text-foreground">Prayer Time Alerts</p>
                <p className="text-xs text-muted-foreground font-medium">Get notified before each Adhan from this mosque.</p>
              </div>
              <Button className="rounded-2xl h-10 px-5 font-black text-xs bg-primary text-white shrink-0">Enable</Button>
            </Card>
          </TabsContent>

          {/* Programs */}
          <TabsContent value="programs" className="space-y-4 animate-in fade-in duration-300">
            <div className="space-y-3">
              {mosque.programs.map((prog: any) => (
                <Card key={prog.title} className="rounded-[2rem] border-none shadow-sm bg-card p-5 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="font-black text-sm text-foreground">{prog.title}</p>
                      <p className="text-xs text-muted-foreground font-medium">{prog.desc}</p>
                    </div>
                    <Badge variant="outline" className="rounded-full text-[10px] font-bold shrink-0 border-primary/20 text-primary">{prog.timing}</Badge>
                  </div>
                  <Button variant="outline" className="rounded-2xl h-9 w-full font-bold text-xs border-2 mt-1">Learn More</Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events */}
          <TabsContent value="events" className="space-y-4 animate-in fade-in duration-300">
            <div className="space-y-3">
              {mosque.events.map((event: any) => (
                <Card key={event.title} className="rounded-[2rem] border-none shadow-sm bg-card p-5">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-2xl flex flex-col items-center justify-center shrink-0">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-black text-sm text-foreground">{event.title}</p>
                      <p className="text-xs text-muted-foreground font-medium">{event.date} · {event.time}</p>
                      <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold px-2 py-0.5 rounded-full">{event.tag}</Badge>
                    </div>
                    <Button variant="outline" className="rounded-2xl h-9 px-4 font-bold text-xs shrink-0 border-2">RSVP</Button>
                  </div>
                </Card>
              ))}
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-muted p-5 text-center space-y-3">
              <p className="text-sm font-black text-foreground">Want to host an event here?</p>
              <Button className="rounded-2xl h-10 px-6 font-black text-xs bg-primary text-white">Request Space</Button>
            </Card>
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews" className="space-y-6 animate-in fade-in duration-300">
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 flex items-center gap-8">
              <div className="text-center shrink-0">
                <p className="text-5xl font-black text-foreground">{mosque.rating}</p>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-[10px] text-muted-foreground font-bold mt-1">{mosque.reviews.length} reviews</p>
              </div>
              <div className="flex-1 space-y-2">
                {[5,4,3,2,1].map(star => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground w-3">{star}</span>
                    <div className="h-2 bg-muted rounded-full flex-1 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: star === 5 ? "88%" : star === 4 ? "9%" : "3%" }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <div className="space-y-3">
              {mosque.reviews.map((r: any, i: number) => (
                <Card key={i} className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 rounded-2xl bg-primary/10">
                        <AvatarFallback className="text-xs font-black bg-primary/10 text-primary rounded-2xl">{r.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="font-black text-sm text-foreground">{r.user}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(r.rating)].map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium italic leading-relaxed">"{r.text}"</p>
                </Card>
              ))}
            </div>
            <Button variant="outline" className="w-full rounded-2xl h-12 font-black text-xs border-2">
              <MessageSquare className="h-4 w-4 mr-2" /> Write a Review
            </Button>
          </TabsContent>
        </Tabs>
      </div>

      {/* Mobile CTA */}
      <div className="sm:hidden fixed bottom-20 left-4 right-4 z-30">
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
          <Button className="w-full bg-primary text-white rounded-2xl h-14 font-black text-sm">
            <Navigation className="h-4 w-4 mr-2" /> Get Directions
          </Button>
        </a>
      </div>
    </div>
  )
}
