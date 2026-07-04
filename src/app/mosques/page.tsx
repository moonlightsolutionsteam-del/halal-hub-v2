"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search, MapPin, Clock, ShieldCheck, ChevronRight,
  Moon, Filter, LocateFixed, Phone, Globe, Calendar,
  BookOpen, Users, Heart, Star, Navigation
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const SERVICES = ["All", "Jummah", "Quran Classes", "Nikah", "Eid Prayers", "Iftar", "Dawah", "Hajj Prep"]

const MOSQUES = [
  {
    id: "m1",
    name: "Masjid Al-Noor",
    area: "Bandra West, Mumbai",
    city: "Mumbai",
    country: "India",
    distance: "0.4 km",
    nextPrayer: { name: "Maghrib", time: "7:15 PM" },
    capacity: 500,
    services: ["Jummah", "Quran Classes", "Iftar", "Nikah"],
    phone: "+91 98765 43210",
    website: "masjidalnoor.in",
    verified: true,
    rating: 4.9,
    reviews: 214,
    imam: "Mufti Abdullah Qasmi",
    languages: ["Urdu", "Hindi", "Arabic"],
    established: "1987",
    img: "https://picsum.photos/seed/mosque1/600/300",
    featured: true,
  },
  {
    id: "m2",
    name: "Jama Masjid Central",
    area: "Old Delhi",
    city: "Delhi",
    country: "India",
    distance: "1.2 km",
    nextPrayer: { name: "Maghrib", time: "7:17 PM" },
    capacity: 2000,
    services: ["Jummah", "Eid Prayers", "Nikah", "Hajj Prep"],
    phone: "+91 11 2326 0000",
    website: "jamamasjid.in",
    verified: true,
    rating: 4.8,
    reviews: 1042,
    imam: "Imam Syed Ahmed Bukhari",
    languages: ["Urdu", "Hindi", "Arabic", "English"],
    established: "1656",
    img: "https://picsum.photos/seed/mosque2/600/300",
    featured: true,
  },
  {
    id: "m3",
    name: "Masjid Ibrahim",
    area: "Andheri East, Mumbai",
    city: "Mumbai",
    country: "India",
    distance: "2.1 km",
    nextPrayer: { name: "Maghrib", time: "7:14 PM" },
    capacity: 300,
    services: ["Jummah", "Quran Classes", "Dawah"],
    phone: "+91 98100 00000",
    website: "",
    verified: false,
    rating: 4.6,
    reviews: 58,
    imam: "Maulana Haroon Rashid",
    languages: ["Urdu", "Hindi"],
    established: "2002",
    img: "https://picsum.photos/seed/mosque3/600/300",
    featured: false,
  },
  {
    id: "m4",
    name: "Islamic Centre of London",
    area: "Regent's Park",
    city: "London",
    country: "United Kingdom",
    distance: "4.5 km",
    nextPrayer: { name: "Isha", time: "10:30 PM" },
    capacity: 1800,
    services: ["Jummah", "Eid Prayers", "Quran Classes", "Nikah", "Iftar", "Dawah"],
    phone: "+44 20 7724 3363",
    website: "iclondon.net",
    verified: true,
    rating: 4.9,
    reviews: 3210,
    imam: "Dr. Ahmad Al-Dubayan",
    languages: ["Arabic", "English", "Urdu", "French"],
    established: "1977",
    img: "https://picsum.photos/seed/mosque4/600/300",
    featured: true,
  },
  {
    id: "m5",
    name: "Masjid Al-Falah",
    area: "Deira",
    city: "Dubai",
    country: "UAE",
    distance: "0.8 km",
    nextPrayer: { name: "Isha", time: "9:45 PM" },
    capacity: 800,
    services: ["Jummah", "Quran Classes", "Eid Prayers", "Hajj Prep"],
    phone: "+971 4 295 0000",
    website: "",
    verified: true,
    rating: 4.7,
    reviews: 432,
    imam: "Sheikh Mohammed Al-Rashid",
    languages: ["Arabic", "English", "Urdu"],
    established: "1995",
    img: "https://picsum.photos/seed/mosque5/600/300",
    featured: false,
  },
  {
    id: "m6",
    name: "Blue Mosque (Sultan Ahmed)",
    area: "Fatih",
    city: "Istanbul",
    country: "Turkey",
    distance: "8.3 km",
    nextPrayer: { name: "Isha", time: "10:00 PM" },
    capacity: 10000,
    services: ["Jummah", "Eid Prayers", "Dawah"],
    phone: "+90 212 518 1319",
    website: "sultanahmetcamii.org",
    verified: true,
    rating: 5.0,
    reviews: 8921,
    imam: "Sheikh Mustafa Cagrici",
    languages: ["Turkish", "Arabic", "English"],
    established: "1616",
    img: "https://picsum.photos/seed/mosque6/600/300",
    featured: true,
  },
  {
    id: "m7",
    name: "Masjid Wilayah Persekutuan",
    area: "Jalan Duta",
    city: "Kuala Lumpur",
    country: "Malaysia",
    distance: "3.2 km",
    nextPrayer: { name: "Isha", time: "9:30 PM" },
    capacity: 17000,
    services: ["Jummah", "Eid Prayers", "Quran Classes", "Nikah", "Hajj Prep"],
    phone: "+60 3 6203 3333",
    website: "masjidwilayah.gov.my",
    verified: true,
    rating: 4.8,
    reviews: 2105,
    imam: "Datuk Seri Nooh Gadot",
    languages: ["Malay", "Arabic", "English"],
    established: "1997",
    img: "https://picsum.photos/seed/mosque7/600/300",
    featured: false,
  },
  {
    id: "m8",
    name: "Dar al-Hijrah Islamic Centre",
    area: "Falls Church",
    city: "Virginia",
    country: "United States",
    distance: "12.4 km",
    nextPrayer: { name: "Isha", time: "10:15 PM" },
    capacity: 3000,
    services: ["Jummah", "Eid Prayers", "Quran Classes", "Nikah", "Iftar", "Dawah"],
    phone: "+1 703 536 1694",
    website: "daralhijrah.net",
    verified: true,
    rating: 4.7,
    reviews: 1876,
    imam: "Imam Mahmoud Sulaiman",
    languages: ["Arabic", "English", "Urdu", "Somali"],
    established: "1983",
    img: "https://picsum.photos/seed/mosque8/600/300",
    featured: false,
  },
]

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "Jummah": <Moon className="h-3 w-3" />,
  "Quran Classes": <BookOpen className="h-3 w-3" />,
  "Eid Prayers": <Star className="h-3 w-3" />,
  "Nikah": <Heart className="h-3 w-3" />,
  "Iftar": <Users className="h-3 w-3" />,
  "Dawah": <Globe className="h-3 w-3" />,
  "Hajj Prep": <Navigation className="h-3 w-3" />,
}

export default function MosquesPage() {
  const [search, setSearch] = useState("")
  const [activeService, setActiveService] = useState("All")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = MOSQUES.filter(m => {
    const matchSearch = !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.area.toLowerCase().includes(search.toLowerCase()) ||
      m.city.toLowerCase().includes(search.toLowerCase())
    const matchService = activeService === "All" || m.services.includes(activeService)
    return matchSearch && matchService
  })

  const featured = filtered.filter(m => m.featured)
  const nearby = filtered.slice(0, 3)
  const all = filtered

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-8 pb-24">

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-foreground flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Moon className="h-5 w-5 text-primary" />
          </div>
          Mosques
        </h1>
        <p className="text-sm font-medium text-muted-foreground pl-1">Discover mosques nearby and across the globe.</p>
      </div>

      {/* Search + Locate */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, area or city..."
            className="pl-11 h-12 rounded-2xl border-none shadow-soft bg-card font-medium"
          />
        </div>
        <Button variant="outline" className="h-12 px-4 rounded-2xl border-2 font-bold gap-2 shrink-0">
          <LocateFixed className="h-4 w-4 text-primary" /> Nearby
        </Button>
      </div>

      {/* Service filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {SERVICES.map(s => (
          <button
            key={s}
            onClick={() => setActiveService(s)}
            className={cn(
              "shrink-0 px-4 py-2 rounded-2xl text-xs font-black transition-all",
              activeService === s
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "bg-card text-muted-foreground shadow-soft hover:bg-muted"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Nearby section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-foreground flex items-center gap-2">
            <LocateFixed className="h-4 w-4 text-primary" /> Nearby
          </h2>
          <span className="text-xs font-bold text-muted-foreground">{nearby.length} found</span>
        </div>
        <div className="space-y-3">
          {nearby.map(mosque => (
            <NearbyCard
              key={mosque.id}
              mosque={mosque}
              expanded={expandedId === mosque.id}
              onToggle={() => setExpandedId(expandedId === mosque.id ? null : mosque.id)}
            />
          ))}
        </div>
      </section>

      {/* Featured mosques */}
      {featured.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-black text-foreground flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" /> Featured
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {featured.map(mosque => (
              <FeaturedCard key={mosque.id} mosque={mosque} />
            ))}
          </div>
        </section>
      )}

      {/* All mosques */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-foreground">All Mosques</h2>
          <span className="text-xs font-bold text-muted-foreground">{all.length} listed</span>
        </div>
        {all.length === 0 ? (
          <Card className="rounded-[2rem] border-none shadow-soft">
            <CardContent className="p-12 text-center">
              <Moon className="h-10 w-10 mx-auto text-muted-foreground opacity-30 mb-3" />
              <p className="font-black text-foreground">No mosques found</p>
              <p className="text-xs text-muted-foreground font-medium mt-1">Try a different search or filter.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {all.map(mosque => (
              <AllCard key={mosque.id} mosque={mosque} />
            ))}
          </div>
        )}
      </section>

      {/* List your mosque CTA */}
      <Card className="rounded-[2.5rem] border-none shadow-xl bg-gradient-to-br from-primary to-emerald-500 text-white overflow-hidden">
        <CardContent className="p-8 space-y-4">
          <Moon className="h-8 w-8 text-white/80" />
          <h3 className="text-xl font-black">Is your Masjid listed?</h3>
          <p className="text-sm text-white/80 font-medium leading-relaxed">
            Register your mosque on Halal Hub to reach your community, share prayer times, and manage donations all in one place.
          </p>
          <Link href="/partner/onboarding/business/category">
            <Button className="h-12 px-8 rounded-2xl bg-white text-primary hover:bg-white/90 font-black text-sm shadow-lg">
              List Your Mosque
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

type Mosque = typeof MOSQUES[number]

function NearbyCard({ mosque, expanded, onToggle }: { mosque: Mosque; expanded: boolean; onToggle: () => void }) {
  return (
    <Card className={cn(
      "rounded-[2rem] border-2 shadow-soft transition-all",
      expanded ? "border-primary/20" : "border-transparent"
    )}>
      <CardContent className="p-0">
        <button className="w-full text-left p-5 flex items-start gap-4" onClick={onToggle}>
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <Moon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-black text-foreground text-sm">{mosque.name}</p>
              {mosque.verified && <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />}
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{mosque.area}</span>
              <span className="font-black text-primary">{mosque.distance}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
              <Clock className="h-3 w-3" /> Next: {mosque.nextPrayer.name} at {mosque.nextPrayer.time}
            </div>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {mosque.services.slice(0, 3).map(s => (
                <span key={s} className="flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {SERVICE_ICONS[s]} {s}
                </span>
              ))}
              {mosque.services.length > 3 && (
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-muted text-muted-foreground">+{mosque.services.length - 3}</span>
              )}
            </div>
          </div>
          <ChevronRight className={cn("h-4 w-4 text-muted-foreground shrink-0 mt-1 transition-transform", expanded && "rotate-90")} />
        </button>

        {expanded && (
          <div className="border-t px-5 pb-5 pt-4 space-y-4 bg-muted/20 rounded-b-[2rem] animate-in fade-in duration-200">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><p className="font-black text-muted-foreground uppercase tracking-wider text-[9px] mb-0.5">Imam</p><p className="font-bold text-foreground">{mosque.imam}</p></div>
              <div><p className="font-black text-muted-foreground uppercase tracking-wider text-[9px] mb-0.5">Capacity</p><p className="font-bold text-foreground">{mosque.capacity.toLocaleString()} people</p></div>
              <div><p className="font-black text-muted-foreground uppercase tracking-wider text-[9px] mb-0.5">Languages</p><p className="font-bold text-foreground">{mosque.languages.join(", ")}</p></div>
              <div><p className="font-black text-muted-foreground uppercase tracking-wider text-[9px] mb-0.5">Est.</p><p className="font-bold text-foreground">{mosque.established}</p></div>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
              <span className="font-black text-foreground">{mosque.rating}</span>
              <span className="text-muted-foreground font-medium">({mosque.reviews} reviews)</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {mosque.phone && (
                <a href={`tel:${mosque.phone}`}>
                  <Button size="sm" className="rounded-xl h-9 px-4 bg-primary hover:bg-primary/90 text-white font-black text-xs gap-1.5">
                    <Phone className="h-3.5 w-3.5" /> Call
                  </Button>
                </a>
              )}
              <Button size="sm" variant="outline" className="rounded-xl h-9 px-4 border-2 font-black text-xs gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Directions
              </Button>
              {mosque.website && (
                <a href={`https://${mosque.website}`} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="rounded-xl h-9 px-4 border-2 font-black text-xs gap-1.5">
                    <Globe className="h-3.5 w-3.5" /> Website
                  </Button>
                </a>
              )}
              <Link href={`/mosques/${mosque.id}`}>
                <Button size="sm" variant="outline" className="rounded-xl h-9 px-4 border-2 font-black text-xs gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" /> View Profile
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function FeaturedCard({ mosque }: { mosque: Mosque }) {
  return (
    <Link href={`/mosques/${mosque.id}`} className="min-w-[280px] shrink-0 block">
      <Card className="rounded-[2rem] border-none shadow-soft hover:shadow-soft-md transition-all overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-36 w-full bg-gradient-to-br from-primary/30 to-emerald-200 dark:from-primary/20 dark:to-emerald-900/30 flex items-center justify-center overflow-hidden">
            <Moon className="h-20 w-20 text-primary/20" />
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-amber-400 rounded-full">
              <Star className="h-3 w-3 text-white fill-white" />
              <span className="text-[10px] font-black text-white">Featured</span>
            </div>
            {mosque.verified && (
              <div className="absolute top-3 right-3 h-7 w-7 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <ShieldCheck className="h-3.5 w-3.5 text-white" />
              </div>
            )}
          </div>
          <div className="p-4 space-y-2">
            <p className="font-black text-foreground text-sm leading-tight">{mosque.name}</p>
            <p className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />{mosque.city}, {mosque.country}
            </p>
            <div className="flex items-center gap-1.5">
              <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
              <span className="text-xs font-black text-foreground">{mosque.rating}</span>
              <span className="text-[10px] text-muted-foreground font-medium">({mosque.reviews})</span>
            </div>
            <div className="flex flex-wrap gap-1 pt-1">
              {mosque.services.slice(0, 2).map(s => (
                <span key={s} className="text-[9px] font-black px-2 py-0.5 rounded-full bg-primary/10 text-primary">{s}</span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function AllCard({ mosque }: { mosque: Mosque }) {
  return (
    <Link href={`/mosques/${mosque.id}`} className="block">
    <Card className="rounded-[2rem] border-none shadow-soft hover:shadow-soft-md transition-all">
      <CardContent className="p-5 flex items-start gap-4">
        <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
          <Moon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-black text-foreground text-sm">{mosque.name}</p>
            {mosque.verified && <ShieldCheck className="h-3 w-3 text-primary shrink-0" />}
          </div>
          <p className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" />{mosque.area}, {mosque.country}
          </p>
          <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <Clock className="h-3 w-3" />{mosque.nextPrayer.name} {mosque.nextPrayer.time}
            </span>
            <span className="text-primary font-black">{mosque.distance}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {mosque.services.map(s => (
              <span key={s} className="flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {SERVICE_ICONS[s]} {s}
              </span>
            ))}
          </div>
        </div>
        <div className="shrink-0 text-right space-y-1">
          <div className="flex items-center gap-1 justify-end">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-black text-foreground">{mosque.rating}</span>
          </div>
          <p className="text-[9px] text-muted-foreground font-medium">{mosque.reviews} reviews</p>
        </div>
      </CardContent>
    </Card>
    </Link>
  )
}
