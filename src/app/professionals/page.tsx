
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search, MapPin, Star, ChevronRight, CheckCircle2,
  Briefcase, Stethoscope, Scale, Calculator, Home,
  GraduationCap, Heart, Mic2, ArrowRight, MessageSquare,
  Clock, Globe
} from "lucide-react"

const SPECIALTIES = [
  "All",
  "Doctors",
  "Lawyers",
  "Finance",
  "Real Estate",
  "Tutors",
  "Therapists",
  "Coaches",
  "Imams",
]

const SPECIALTY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "All": Briefcase,
  "Doctors": Stethoscope,
  "Lawyers": Scale,
  "Finance": Calculator,
  "Real Estate": Home,
  "Tutors": GraduationCap,
  "Therapists": Heart,
  "Coaches": Mic2,
  "Imams": Globe,
}

interface Professional {
  id: string
  name: string
  title: string
  specialty: string
  location: string
  city: string
  rating: number
  reviews: number
  experience: string
  languages: string[]
  services: string[]
  verified: boolean
  featured: boolean
  available: boolean
  color: string
}

const PROFESSIONALS: Professional[] = [
  {
    id: "1",
    name: "Dr. Aisha Rahman",
    title: "General Physician",
    specialty: "Doctors",
    location: "Bandra West",
    city: "Mumbai",
    rating: 4.9,
    reviews: 210,
    experience: "12 years",
    languages: ["English", "Urdu", "Hindi"],
    services: ["General Consultation", "Preventive Care", "Pediatrics"],
    verified: true,
    featured: true,
    available: true,
    color: "bg-violet-100 dark:bg-violet-950/30",
  },
  {
    id: "2",
    name: "Ahmed Khan",
    title: "Family Law Advocate",
    specialty: "Lawyers",
    location: "Connaught Place",
    city: "New Delhi",
    rating: 4.8,
    reviews: 95,
    experience: "15 years",
    languages: ["English", "Hindi", "Urdu"],
    services: ["Marriage / Divorce", "Custody", "Islamic Wills"],
    verified: true,
    featured: true,
    available: true,
    color: "bg-blue-100 dark:bg-blue-950/30",
  },
  {
    id: "3",
    name: "Fatima Al-Sayed",
    title: "Chartered Accountant",
    specialty: "Finance",
    location: "DIFC",
    city: "Dubai",
    rating: 4.7,
    reviews: 78,
    experience: "10 years",
    languages: ["English", "Arabic"],
    services: ["Zakat Calculation", "Tax Advisory", "Business Setup"],
    verified: true,
    featured: true,
    available: false,
    color: "bg-emerald-100 dark:bg-emerald-950/30",
  },
  {
    id: "4",
    name: "Sheikh Yusuf Ibrahim",
    title: "Islamic Scholar & Imam",
    specialty: "Imams",
    location: "East London",
    city: "London",
    rating: 5.0,
    reviews: 310,
    experience: "20 years",
    languages: ["English", "Arabic", "Urdu"],
    services: ["Nikah Ceremonies", "Counselling", "Quran Teaching"],
    verified: true,
    featured: true,
    available: true,
    color: "bg-amber-100 dark:bg-amber-950/30",
  },
  {
    id: "5",
    name: "Mariam Hassan",
    title: "Licensed Therapist",
    specialty: "Therapists",
    location: "Kuala Lumpur",
    city: "KL",
    rating: 4.8,
    reviews: 142,
    experience: "8 years",
    languages: ["English", "Malay", "Arabic"],
    services: ["Anxiety & Depression", "Trauma", "Islamic Counselling"],
    verified: true,
    featured: false,
    available: true,
    color: "bg-rose-100 dark:bg-rose-950/30",
  },
  {
    id: "6",
    name: "Khalid Mahmood",
    title: "Real Estate Broker",
    specialty: "Real Estate",
    location: "Jumeirah",
    city: "Dubai",
    rating: 4.6,
    reviews: 55,
    experience: "9 years",
    languages: ["English", "Arabic", "Urdu"],
    services: ["Halal Mortgage Guidance", "Property Search", "Valuation"],
    verified: true,
    featured: false,
    available: true,
    color: "bg-sky-100 dark:bg-sky-950/30",
  },
  {
    id: "7",
    name: "Nadia Siddiqui",
    title: "Quran & Arabic Tutor",
    specialty: "Tutors",
    location: "Online",
    city: "Global",
    rating: 4.9,
    reviews: 430,
    experience: "6 years",
    languages: ["English", "Urdu", "Arabic"],
    services: ["Quran Recitation", "Tajweed", "Arabic Grammar"],
    verified: true,
    featured: false,
    available: true,
    color: "bg-indigo-100 dark:bg-indigo-950/30",
  },
  {
    id: "8",
    name: "Tariq Osman",
    title: "Life & Career Coach",
    specialty: "Coaches",
    location: "Mississauga",
    city: "Toronto",
    rating: 4.7,
    reviews: 88,
    experience: "7 years",
    languages: ["English", "French"],
    services: ["Career Transition", "Leadership", "Productivity"],
    verified: false,
    featured: false,
    available: true,
    color: "bg-orange-100 dark:bg-orange-950/30",
  },
]

function ProfessionalCard({ pro }: { pro: Professional }) {
  return (
    <Link href={`/professionals/${pro.id}`} className="block group">
      <div className="bg-card rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all space-y-4 border border-transparent hover:border-primary/10">
        <div className="flex items-start gap-4">
          <Avatar className={`h-14 w-14 rounded-2xl shrink-0 ${pro.color}`}>
            <AvatarFallback className={`text-lg font-black rounded-2xl ${pro.color} text-foreground`}>
              {pro.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <p className="font-black text-sm text-foreground truncate">{pro.name}</p>
              {pro.verified && <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />}
            </div>
            <p className="text-xs font-bold text-muted-foreground">{pro.title}</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{pro.location}, {pro.city}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-black text-foreground">{pro.rating}</span>
            </div>
            <span className="text-[10px] text-muted-foreground">{pro.reviews} reviews</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {pro.services.slice(0, 3).map(s => (
            <span key={s} className="text-[10px] font-bold px-2.5 py-1 bg-muted rounded-full text-muted-foreground">
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-border/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className="font-medium">{pro.experience}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Globe className="h-3 w-3" />
              <span className="font-medium">{pro.languages[0]}{pro.languages.length > 1 ? ` +${pro.languages.length - 1}` : ""}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${pro.available ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-muted text-muted-foreground"}`}>
              {pro.available ? "Available" : "Busy"}
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  )
}

function FeaturedCard({ pro }: { pro: Professional }) {
  return (
    <Link href={`/professionals/${pro.id}`} className="block shrink-0 w-52 group">
      <div className={`rounded-[2rem] p-5 space-y-3 ${pro.color} hover:shadow-md transition-all`}>
        <div className="flex items-start justify-between">
          <Avatar className="h-14 w-14 rounded-2xl bg-white/60 dark:bg-black/20">
            <AvatarFallback className="text-lg font-black rounded-2xl bg-transparent text-foreground">
              {pro.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          {pro.verified && (
            <span className="text-[10px] font-black bg-white/70 dark:bg-black/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-primary" /> Verified
            </span>
          )}
        </div>
        <div>
          <p className="font-black text-sm text-foreground leading-tight">{pro.name}</p>
          <p className="text-xs font-bold text-muted-foreground">{pro.title}</p>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-black">{pro.rating}</span>
          <span className="text-xs text-muted-foreground">({pro.reviews})</span>
        </div>
        <Button size="sm" className="w-full rounded-xl h-8 text-xs font-bold bg-white/60 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/30 text-foreground border-none shadow-none">
          Book Now
        </Button>
      </div>
    </Link>
  )
}

export default function ProfessionalsPage() {
  const [search, setSearch] = useState("")
  const [activeSpecialty, setActiveSpecialty] = useState("All")

  const filtered = PROFESSIONALS.filter(pro => {
    const matchesSearch =
      !search ||
      pro.name.toLowerCase().includes(search.toLowerCase()) ||
      pro.title.toLowerCase().includes(search.toLowerCase()) ||
      pro.city.toLowerCase().includes(search.toLowerCase()) ||
      pro.services.some(s => s.toLowerCase().includes(search.toLowerCase()))
    const matchesSpecialty = activeSpecialty === "All" || pro.specialty === activeSpecialty
    return matchesSearch && matchesSpecialty
  })

  const featured = PROFESSIONALS.filter(p => p.featured)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-3xl mx-auto px-4 py-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-violet-100 dark:bg-violet-950/40 rounded-2xl flex items-center justify-center shrink-0">
              <Briefcase className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <h1 className="text-xl font-black font-headline text-foreground leading-none">Professionals</h1>
              <p className="text-xs text-muted-foreground font-medium">Find verified Muslim professionals near you.</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, specialty or city..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 h-11 rounded-2xl bg-muted border-none font-medium text-sm"
            />
          </div>

          {/* Specialty chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {SPECIALTIES.map(spec => {
              const Icon = SPECIALTY_ICONS[spec] ?? Briefcase
              const active = activeSpecialty === spec
              return (
                <button
                  key={spec}
                  onClick={() => setActiveSpecialty(spec)}
                  className={`flex items-center gap-1.5 shrink-0 px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
                    active
                      ? "bg-violet-600 text-white shadow-sm"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {spec}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        {/* Featured */}
        {activeSpecialty === "All" && !search && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-foreground flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" /> Top Rated
              </h2>
              <span className="text-xs text-muted-foreground font-medium">{featured.length} featured</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {featured.map(pro => <FeaturedCard key={pro.id} pro={pro} />)}
            </div>
          </section>
        )}

        {/* All Professionals */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-foreground">
              {activeSpecialty === "All" ? "All Professionals" : activeSpecialty}
            </h2>
            <span className="text-xs text-muted-foreground font-medium">{filtered.length} found</span>
          </div>

          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map(pro => <ProfessionalCard key={pro.id} pro={pro} />)}
            </div>
          ) : (
            <div className="text-center py-16 space-y-2">
              <Briefcase className="h-10 w-10 text-muted-foreground/30 mx-auto" />
              <p className="text-sm font-bold text-muted-foreground">No professionals found</p>
              <p className="text-xs text-muted-foreground">Try a different search or specialty</p>
            </div>
          )}
        </section>

        {/* CTA */}
        <div className="rounded-[2rem] bg-violet-600 text-white p-8 space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl font-black font-headline">Are you a professional?</h3>
            <p className="text-sm text-violet-100 font-medium">Join thousands of Muslim professionals connecting with the community through Halal Hub.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/partner/onboarding/business/category" className="flex-1">
              <Button className="w-full h-12 rounded-2xl bg-white text-violet-700 hover:bg-violet-50 font-black text-sm">
                List Your Practice <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" className="flex-1 h-12 rounded-2xl border-white/30 text-white hover:bg-white/10 font-black text-sm">
              <MessageSquare className="mr-2 h-4 w-4" /> Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
