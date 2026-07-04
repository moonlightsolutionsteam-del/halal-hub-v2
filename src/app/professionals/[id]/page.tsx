
"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft, MapPin, Clock, Phone, Globe, Share2, Heart,
  CheckCircle2, Star, ChevronRight, MessageSquare,
  Calendar, ShieldCheck, Briefcase, GraduationCap,
  Award, Languages, Users, Video, FileText, Info,
  ThumbsUp, CalendarCheck, DollarSign
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useSavedBusinesses } from "@/lib/saved-businesses-context"

const PROFESSIONALS: Record<string, any> = {
  "1": {
    name: "Dr. Aisha Rahman",
    title: "General Physician",
    specialty: "Doctors",
    location: "Bandra West",
    city: "Mumbai",
    country: "India",
    phone: "+91 98765 43210",
    website: "https://daisharahman.com",
    email: "dr.aisha@example.com",
    rating: 4.9,
    reviewCount: 210,
    experience: "12 years",
    clients: "1,400+",
    languages: ["English", "Urdu", "Hindi"],
    verified: true,
    available: true,
    color: "bg-violet-600",
    accent: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400",
    tagline: "Compassionate care rooted in Islamic values.",
    about: "Dr. Aisha Rahman is a board-certified General Physician with 12 years of clinical experience in Mumbai. She combines modern evidence-based medicine with a deep understanding of halal dietary requirements and Islamic patient ethics. She offers consultations in English, Urdu, and Hindi and welcomes families of all ages.",
    qualifications: [
      { degree: "MBBS", institution: "Grant Medical College, Mumbai", year: "2012" },
      { degree: "MD (General Medicine)", institution: "KEM Hospital, Mumbai", year: "2015" },
      { degree: "Fellowship in Preventive Medicine", institution: "AIIMS New Delhi", year: "2017" },
    ],
    services: [
      { name: "General Consultation", duration: "30 min", price: "₹800", popular: true },
      { name: "Preventive Health Check", duration: "60 min", price: "₹1,500", popular: true },
      { name: "Child Health Review", duration: "30 min", price: "₹700", popular: false },
      { name: "Follow-up Consultation", duration: "15 min", price: "₹400", popular: false },
      { name: "Nutrition & Wellness Plan", duration: "45 min", price: "₹1,200", popular: false },
    ],
    availability: [
      { day: "Monday", slots: ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"] },
      { day: "Wednesday", slots: ["10:00 AM", "11:00 AM", "4:00 PM"] },
      { day: "Friday", slots: ["2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"] },
      { day: "Saturday", slots: ["9:00 AM", "10:00 AM", "11:00 AM"] },
    ],
    certifications: [
      { label: "Medical Council of India", status: "Active" },
      { label: "Maharashtra Medical Council", status: "Active" },
      { label: "Halal-Aware Practitioner", status: "Certified" },
    ],
    reviews: [
      { user: "Maryam S.", rating: 5, text: "Dr. Aisha is incredibly thorough and kind. She took the time to explain every aspect of my health and even factored in my dietary restrictions as a Muslim." },
      { user: "Ahmed K.", rating: 5, text: "Brought my whole family here. She's wonderful with children and the elderly alike. Truly a blessing to the community." },
      { user: "Fatima H.", rating: 4, text: "Very knowledgeable and patient. The wait time can be a bit long but the quality of care is worth it." },
    ],
    faqs: [
      { q: "Do you offer telehealth consultations?", a: "Yes, video consultations are available for follow-ups and non-emergency cases." },
      { q: "Do you prescribe Sunnah-based remedies?", a: "I integrate evidence-based medicine with Sunnah wellness practices like Hijama referrals where appropriate." },
      { q: "Is there a female-only waiting area?", a: "Yes, our clinic provides a separate waiting area for female patients." },
    ],
  },
  "2": {
    name: "Ahmed Khan",
    title: "Family Law Advocate",
    specialty: "Lawyers",
    location: "Connaught Place",
    city: "New Delhi",
    country: "India",
    phone: "+91 98100 12345",
    website: "https://ahmedkhanlaw.in",
    email: "advocate.ahmed@example.com",
    rating: 4.8,
    reviewCount: 95,
    experience: "15 years",
    clients: "800+",
    languages: ["English", "Hindi", "Urdu"],
    verified: true,
    available: true,
    color: "bg-blue-600",
    accent: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    tagline: "Protecting Muslim family rights through ethical advocacy.",
    about: "Ahmed Khan is a senior family law advocate with 15 years of experience at the Delhi High Court. He specialises in Islamic family law including Nikah contracts, divorce proceedings (Talaq/Khul), child custody, and Islamic wills (Wasiyyah). Ahmed is deeply committed to serving the Muslim community with integrity.",
    qualifications: [
      { degree: "LLB", institution: "Faculty of Law, Delhi University", year: "2009" },
      { degree: "LLM (Family Law)", institution: "National Law University, Delhi", year: "2011" },
    ],
    services: [
      { name: "Initial Legal Consultation", duration: "60 min", price: "₹2,000", popular: true },
      { name: "Nikah Contract Review", duration: "90 min", price: "₹5,000", popular: true },
      { name: "Divorce & Separation", duration: "Ongoing", price: "From ₹15,000", popular: false },
      { name: "Child Custody Case", duration: "Ongoing", price: "From ₹20,000", popular: false },
      { name: "Islamic Will (Wasiyyah)", duration: "2 sessions", price: "₹8,000", popular: false },
    ],
    availability: [
      { day: "Tuesday", slots: ["10:00 AM", "11:00 AM", "3:00 PM"] },
      { day: "Thursday", slots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
      { day: "Saturday", slots: ["10:00 AM", "11:00 AM", "12:00 PM"] },
    ],
    certifications: [
      { label: "Bar Council of Delhi", status: "Active" },
      { label: "Delhi High Court Advocate", status: "Enrolled" },
      { label: "Muslim Personal Law Board", status: "Member" },
    ],
    reviews: [
      { user: "Zainab N.", rating: 5, text: "Ahmed Khan handled our Nikah contract review with great expertise. He explained all the Islamic clauses clearly and ensured our rights were protected." },
      { user: "Ibrahim M.", rating: 4, text: "Professional and empathetic. He guided us through a difficult custody matter with patience and deep knowledge of Islamic family law." },
    ],
    faqs: [
      { q: "Do you handle cases outside Delhi?", a: "I primarily practice at Delhi High Court but can advise on cases in other jurisdictions through referral networks." },
      { q: "Can you draft an Islamic will (Wasiyyah)?", a: "Yes, I specialise in drafting Wasiyyah documents that comply with both Islamic principles and Indian succession law." },
    ],
  },
  "4": {
    name: "Sheikh Yusuf Ibrahim",
    title: "Islamic Scholar & Imam",
    specialty: "Imams",
    location: "East London",
    city: "London",
    country: "UK",
    phone: "+44 20 7946 0001",
    website: "https://sheikhyusuf.com",
    email: "sheikh.yusuf@example.com",
    rating: 5.0,
    reviewCount: 310,
    experience: "20 years",
    clients: "5,000+",
    languages: ["English", "Arabic", "Urdu"],
    verified: true,
    available: true,
    color: "bg-amber-600",
    accent: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    tagline: "Scholarly guidance for modern Muslim life.",
    about: "Sheikh Yusuf Ibrahim is a graduate of Al-Azhar University (Cairo) with an Ijazah in Quranic sciences and a Master's in Islamic Jurisprudence. Based in East London, he serves as a senior Imam and provides Islamic counselling, Nikah services, and educational lectures to the UK Muslim community.",
    qualifications: [
      { degree: "BA Islamic Studies", institution: "Al-Azhar University, Cairo", year: "2004" },
      { degree: "MA Islamic Jurisprudence", institution: "SOAS, University of London", year: "2007" },
      { degree: "Ijazah in Quran (Hafs)", institution: "Al-Azhar University", year: "2003" },
    ],
    services: [
      { name: "Nikah Ceremony", duration: "2 hours", price: "£250", popular: true },
      { name: "Islamic Counselling", duration: "60 min", price: "£80", popular: true },
      { name: "Quran Hifz Supervision", duration: "Weekly", price: "£120/mo", popular: false },
      { name: "Corporate Islamic Talk", duration: "90 min", price: "£500", popular: false },
    ],
    availability: [
      { day: "Monday", slots: ["6:00 PM", "7:00 PM"] },
      { day: "Wednesday", slots: ["6:00 PM", "7:00 PM", "8:00 PM"] },
      { day: "Sunday", slots: ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"] },
    ],
    certifications: [
      { label: "Al-Azhar Ijazah", status: "Certified" },
      { label: "UK Nikah Registration", status: "Authorised" },
      { label: "British Muslim Forum", status: "Member" },
    ],
    reviews: [
      { user: "Khadijah O.", rating: 5, text: "Sheikh Yusuf conducted our Nikah beautifully. His knowledge and warmth made the occasion truly special. Highly recommend." },
      { user: "Bilal A.", rating: 5, text: "His counselling sessions helped our marriage greatly. He is wise, non-judgmental, and deeply grounded in Islamic principles." },
    ],
    faqs: [
      { q: "Do you conduct Nikah outside London?", a: "Yes, I travel across the UK for Nikah ceremonies. Travel fees apply outside the M25." },
      { q: "Are counselling sessions confidential?", a: "Absolutely. All sessions are strictly confidential in accordance with professional and Islamic ethical standards." },
    ],
  },
}

const FALLBACK = PROFESSIONALS["1"]

export default function ProfessionalProfilePage() {
  const { id } = useParams()
  const pro = PROFESSIONALS[String(id)] ?? FALLBACK
  const [activeTab, setActiveTab] = useState("about")
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const { isSaved, toggleSaved } = useSavedBusinesses()
  const { toast } = useToast()
  const entityId = `professional-${id}`
  const saved = isSaved(entityId)

  const handleSave = () => {
    toggleSaved({ id: entityId, name: pro.name, category: pro.specialty, location: pro.city })
    toast({ title: saved ? "Removed" : "Saved", description: saved ? `${pro.name} removed.` : `${pro.name} saved.` })
  }

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    try {
      if (navigator.share) { await navigator.share({ title: pro.name, url }) }
      else { await navigator.clipboard.writeText(url); toast({ title: "Link copied" }) }
    } catch {}
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pb-28">
      {/* Sticky nav */}
      <div className="bg-card/90 backdrop-blur-md sticky top-0 z-40 border-b">
        <div className="container mx-auto max-w-3xl px-4 h-16 flex items-center justify-between">
          <Link href="/professionals" className="flex items-center gap-2 text-sm font-black text-muted-foreground hover:text-primary group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Professionals
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-2xl" onClick={handleShare}><Share2 className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="rounded-2xl text-rose-500" onClick={handleSave}><Heart className={saved ? "h-4 w-4 fill-rose-500" : "h-4 w-4"} /></Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-6 space-y-6">
        {/* Profile hero card */}
        <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
          <div className={`h-24 ${pro.color} opacity-20`} />
          <CardContent className="px-6 pb-6 -mt-12 space-y-4">
            <div className="flex items-end gap-4">
              <Avatar className={`h-20 w-20 rounded-[1.5rem] border-4 border-card shadow-lg ${pro.accent} shrink-0`}>
                <AvatarFallback className={`text-xl font-black rounded-[1.5rem] ${pro.accent}`}>
                  {pro.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="pb-1 space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <p className="font-black text-lg text-foreground leading-tight">{pro.name}</p>
                  {pro.verified && <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />}
                </div>
                <p className="text-sm font-bold text-muted-foreground">{pro.title}</p>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{pro.location}, {pro.city}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground font-medium italic">"{pro.tagline}"</p>

            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Rating", value: pro.rating },
                { label: "Reviews", value: pro.reviewCount },
                { label: "Experience", value: pro.experience },
                { label: "Clients", value: pro.clients },
              ].map(stat => (
                <div key={stat.label} className="text-center p-2 bg-muted rounded-2xl">
                  <p className="font-black text-sm text-foreground">{stat.value}</p>
                  <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Link href="/messages" className="flex-1">
                <Button variant="outline" className="w-full h-11 rounded-2xl font-black text-xs border-2">
                  <MessageSquare className="h-4 w-4 mr-1.5" /> Message
                </Button>
              </Link>
              <Button className={`flex-1 h-11 rounded-2xl font-black text-xs ${pro.color} text-white`}
                onClick={() => { setActiveTab("book"); }}>
                <Calendar className="h-4 w-4 mr-1.5" /> Book Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Availability banner */}
        <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl ${pro.available ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" : "bg-muted"}`}>
          <div className={`h-2.5 w-2.5 rounded-full ${pro.available ? "bg-green-500 animate-pulse" : "bg-muted-foreground"}`} />
          <span className={`text-xs font-black ${pro.available ? "text-green-700 dark:text-green-400" : "text-muted-foreground"}`}>
            {pro.available ? "Accepting new clients" : "Currently not accepting new clients"}
          </span>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-5">
          <TabsList className="bg-card border rounded-2xl h-12 p-1 shadow-sm w-full overflow-x-auto flex justify-start">
            {["about", "services", "book", "reviews", "faq"].map(tab => (
              <TabsTrigger key={tab} value={tab} className={`rounded-xl px-5 font-bold text-xs h-full capitalize shrink-0 data-[state=active]:${pro.color} data-[state=active]:text-white`}>
                {tab === "faq" ? "FAQ" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* About */}
          <TabsContent value="about" className="space-y-4 animate-in fade-in duration-300">
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-3">
              <h2 className="font-black text-base flex items-center gap-2"><Info className="h-4 w-4 text-primary" /> About</h2>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">{pro.about}</p>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-4">
              <h2 className="font-black text-base flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary" /> Qualifications</h2>
              <div className="space-y-3">
                {pro.qualifications.map((q: any) => (
                  <div key={q.degree} className="flex items-start gap-3 p-3 bg-muted rounded-2xl">
                    <Award className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-black text-xs text-foreground">{q.degree}</p>
                      <p className="text-[11px] text-muted-foreground font-medium">{q.institution} · {q.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-4">
              <h2 className="font-black text-base flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Certifications</h2>
              <div className="space-y-2">
                {pro.certifications.map((cert: any) => (
                  <div key={cert.label} className="flex items-center justify-between p-3 bg-muted rounded-2xl">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span className="text-xs font-bold text-foreground">{cert.label}</span>
                    </div>
                    <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-none text-[10px] font-bold rounded-full px-2">{cert.status}</Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-4">
              <h2 className="font-black text-base flex items-center gap-2"><Languages className="h-4 w-4 text-primary" /> Languages</h2>
              <div className="flex flex-wrap gap-2">
                {pro.languages.map((l: string) => (
                  <span key={l} className="text-xs font-bold px-3 py-1.5 bg-muted text-muted-foreground rounded-full">{l}</span>
                ))}
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-4">
              <h2 className="font-black text-base flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> Contact</h2>
              <div className="space-y-2">
                {[
                  { icon: Phone, label: "Phone", value: pro.phone, href: `tel:${pro.phone.replace(/[^+\d]/g,"")}` },
                  { icon: Globe, label: "Website", value: pro.website, href: pro.website },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                     className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted transition-colors group">
                    <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{label}</p>
                      <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate max-w-[220px]">{value}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                  </a>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Services */}
          <TabsContent value="services" className="space-y-3 animate-in fade-in duration-300">
            <p className="text-xs font-bold text-muted-foreground px-1">All services are provided in a Shariah-compliant environment.</p>
            {pro.services.map((svc: any) => (
              <Card key={svc.name} className="rounded-[2rem] border-none shadow-sm bg-card p-5">
                <div className="flex items-start gap-4">
                  <div className={`h-10 w-10 rounded-2xl ${pro.accent} flex items-center justify-center shrink-0`}>
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-black text-sm text-foreground">{svc.name}</p>
                      <span className="font-black text-sm text-primary shrink-0">{svc.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> {svc.duration}
                    </p>
                    {svc.popular && <Badge className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-none text-[10px] font-bold rounded-full px-2">Popular</Badge>}
                  </div>
                </div>
                <Button className={`w-full mt-4 rounded-2xl h-10 font-black text-xs ${pro.color} text-white`}
                  onClick={() => setActiveTab("book")}>
                  Book This Service
                </Button>
              </Card>
            ))}
          </TabsContent>

          {/* Book */}
          <TabsContent value="book" className="space-y-4 animate-in fade-in duration-300">
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-4">
              <h2 className="font-black text-base flex items-center gap-2"><CalendarCheck className="h-4 w-4 text-primary" /> Available Slots</h2>
              <div className="space-y-4">
                {pro.availability.map((day: any) => (
                  <div key={day.day} className="space-y-2">
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">{day.day}</p>
                    <div className="flex flex-wrap gap-2">
                      {day.slots.map((slot: string) => (
                        <button key={slot} onClick={() => setSelectedSlot(slot === selectedSlot ? null : slot)}
                          className={`px-4 py-2 rounded-xl text-xs font-black border-2 transition-all ${selectedSlot === slot ? `${pro.color} text-white border-transparent shadow-sm` : "border-border text-foreground hover:border-primary/40"}`}>
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {selectedSlot && (
              <Card className="rounded-[2rem] border-none shadow-sm bg-primary/5 border border-primary/10 p-5 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">Selected Slot</p>
                    <p className="font-black text-base text-primary">{selectedSlot}</p>
                  </div>
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <Link href="/prayer/appointments">
                  <Button className={`w-full h-12 rounded-2xl font-black text-sm ${pro.color} text-white`}>
                    Confirm Booking
                  </Button>
                </Link>
                <p className="text-[10px] text-center text-muted-foreground font-medium">You'll receive a confirmation via email or SMS.</p>
              </Card>
            )}

            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-5 flex items-center gap-4">
              <Video className="h-8 w-8 text-primary shrink-0" />
              <div className="flex-1">
                <p className="font-black text-sm text-foreground">Prefer online?</p>
                <p className="text-xs text-muted-foreground font-medium">Video consultations are available for most services.</p>
              </div>
              <Button variant="outline" className="rounded-2xl h-9 px-4 font-bold text-xs shrink-0 border-2">Book Online</Button>
            </Card>
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews" className="space-y-5 animate-in fade-in duration-300">
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 flex items-center gap-6">
              <div className="text-center shrink-0">
                <p className="text-5xl font-black text-foreground">{pro.rating}</p>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[1,2,3,4,5].map(s => <Star key={s} className={`h-4 w-4 ${s <= Math.floor(pro.rating) ? "fill-amber-400 text-amber-400" : "text-muted"}`} />)}
                </div>
                <p className="text-[10px] text-muted-foreground font-bold mt-1">{pro.reviewCount} reviews</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5,4,3,2,1].map(star => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-muted-foreground w-3">{star}</span>
                    <div className="h-2 bg-muted rounded-full flex-1 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: star === 5 ? "85%" : star === 4 ? "12%" : "3%" }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <div className="space-y-3">
              {pro.reviews.map((r: any, i: number) => (
                <Card key={i} className="rounded-[2rem] border-none shadow-sm bg-card p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-black text-sm text-foreground">{r.user}</p>
                    <div className="flex gap-0.5">
                      {[...Array(r.rating)].map((_,j) => <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium italic leading-relaxed">"{r.text}"</p>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground font-bold hover:text-primary transition-colors">
                    <ThumbsUp className="h-3 w-3" /> Helpful
                  </button>
                </Card>
              ))}
            </div>
            <Button variant="outline" className="w-full rounded-2xl h-12 font-black text-xs border-2">
              <MessageSquare className="h-4 w-4 mr-2" /> Write a Review
            </Button>
          </TabsContent>

          {/* FAQ */}
          <TabsContent value="faq" className="space-y-3 animate-in fade-in duration-300">
            {pro.faqs.map((faq: any, i: number) => (
              <Card key={i} className="rounded-[2rem] border-none shadow-sm bg-card p-5 space-y-2">
                <p className="font-black text-sm text-foreground">{faq.q}</p>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">{faq.a}</p>
              </Card>
            ))}
            <Card className="rounded-[2rem] border-none shadow-sm bg-muted p-5 text-center space-y-2">
              <p className="text-sm font-black text-foreground">Have a question not listed here?</p>
              <Link href="/messages">
                <Button className="rounded-2xl h-10 px-6 font-black text-xs bg-primary text-white">Ask {pro.name.split(" ")[0]}</Button>
              </Link>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Mobile sticky CTA */}
      <div className="sm:hidden fixed bottom-20 left-4 right-4 z-30">
        <div className="bg-card/90 backdrop-blur-xl rounded-2xl shadow-lg p-3 flex gap-3">
          <Link href="/messages" className="flex-1">
            <Button variant="outline" className="w-full h-12 rounded-xl font-black text-xs border-2">
              <MessageSquare className="h-4 w-4 mr-1" /> Message
            </Button>
          </Link>
          <Button className={`flex-1 h-12 rounded-xl font-black text-sm ${pro.color} text-white`}
            onClick={() => setActiveTab("book")}>
            <Calendar className="h-4 w-4 mr-1" /> Book
          </Button>
        </div>
      </div>
    </div>
  )
}
