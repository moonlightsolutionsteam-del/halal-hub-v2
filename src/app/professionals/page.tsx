"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search, MapPin, ArrowLeft,
  Briefcase, Award, ChevronRight,
  CheckCircle2, Sparkles, Zap, MessageCircle, UserX
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

const TABS = ["All", "Legal", "Medical", "Finance", "IT & Tech", "Consultancy", "Architecture"]

type Professional = {
  id: string
  profession: string | null
  specializations: string[] | null
  availability: string | null
  verification_status: string | null
  profile: { name: string | null; photo_url: string | null; city: string | null } | null
}

export default function ProfessionalsPage() {
  const [selectedTab, setSelectedTab] = useState("All")
  const [query, setQuery] = useState("")
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    ;supabase
      .from("professional_profiles")
      .select("id, profession, specializations, availability, verification_status, profiles(name, photo_url, city)")
      .order("created_at", { ascending: false })
      .limit(40)
      .then(({ data }: { data: any[] | null }) => {
        setLoading(false)
        if (data?.length) setProfessionals(data.map(d => ({ ...d, profile: d.profiles ?? null })))
      })
  }, [])

  const filtered = professionals.filter(p => {
    const tab = selectedTab === "All" || (p.profession ?? "").toLowerCase().includes(selectedTab.toLowerCase())
    const q = query === "" || (p.profile?.name ?? "").toLowerCase().includes(query.toLowerCase()) || (p.profession ?? "").toLowerCase().includes(query.toLowerCase())
    return tab && q
  })

  return (
    <div className="container mx-auto p-3 sm:p-6 space-y-4 sm:space-y-10 max-w-7xl">
      <div className="flex flex-col gap-3 sm:gap-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-8">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="h-9 w-9 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-violet-100 text-violet-600 shadow-inner">
              <Briefcase className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-5xl font-black font-headline text-foreground tracking-tight">Muslim Professionals</h1>
              <p className="text-muted-foreground font-medium text-xs sm:text-xl">Connect with verified Muslim professionals across law, medicine, finance and technology.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link href="/account/capabilities/professional">
              <Button variant="outline" className="h-10 sm:h-14 rounded-xl sm:rounded-2xl bg-card border-none shadow-sm gap-2 font-bold px-4 sm:px-6 hover:bg-muted">
                <MessageCircle className="h-5 w-5 text-violet-600" /> List Your Services
              </Button>
            </Link>
            <div className="relative flex-1 md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by profession, skill, or name..."
                className="pl-10 sm:pl-12 h-10 sm:h-14 rounded-xl sm:rounded-2xl bg-card border-none shadow-sm font-medium text-sm sm:text-lg"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setSelectedTab(tab)}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border-2 ${
              selectedTab === tab
                ? "bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-600/20 scale-105"
                : "bg-card text-muted-foreground border-transparent hover:border-violet-200"
            }`}
          >{tab}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="hidden lg:block lg:col-span-3 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-md p-8 bg-card space-y-8 sticky top-24">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Refine Search</h3>
                <Button variant="ghost" size="sm" className="text-[10px] font-black text-violet-600 p-0 h-auto uppercase tracking-tighter">Reset</Button>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-foreground tracking-widest">Professional Trust</p>
                <div className="space-y-3">
                  {["Hub Verified", "Available Now", "Arabic Speaker", "Shariah Qualified"].map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div className="h-5 w-5 border-2 rounded-lg border-border group-hover:border-violet-600 transition-colors flex items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-sm bg-violet-600 scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                      <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground">{f}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="h-px bg-muted w-full" />
              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-foreground tracking-widest">Session Type</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Online", "In-Person", "Phone", "Free Consult"].map(p => (
                    <button key={p} className="py-2 rounded-xl bg-muted text-muted-foreground font-black text-xs hover:bg-violet-50 hover:text-violet-600 transition-colors border border-transparent hover:border-violet-100">{p}</button>
                  ))}
                </div>
              </div>
            </div>
            <Card className="rounded-3xl border-none bg-violet-900 text-white p-8 space-y-4 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 opacity-20"><Sparkles className="h-24 w-24" /></div>
              <h3 className="font-black text-lg leading-tight relative z-10">Join as a Professional</h3>
              <p className="text-xs text-white/80 leading-relaxed relative z-10">Be discovered by thousands of Muslims seeking trusted professionals who share their values.</p>
              <Link href="/account/capabilities/professional">
                <Button variant="secondary" className="w-full rounded-2xl font-black text-xs h-12 shadow-xl bg-card text-violet-900 hover:bg-violet-50">Apply Now</Button>
              </Link>
            </Card>
          </Card>
        </aside>

        <div className="lg:col-span-9 space-y-8">
          <div className="flex items-center justify-between px-2">
            <p className="text-sm font-bold text-muted-foreground tracking-tight">
              {loading ? "Loading…" : <>Found <span className="text-foreground">{filtered.length}</span> verified professionals</>}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sort by:</span>
              <select className="bg-transparent font-black text-xs uppercase tracking-tighter outline-none cursor-pointer text-foreground">
                <option>Most Recommended</option>
                <option>Available Now</option>
                <option>Top Rated</option>
              </select>
            </div>
          </div>

          {loading && (
            <div className="grid grid-cols-2 gap-3 sm:gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="rounded-2xl sm:rounded-[3rem] bg-muted animate-pulse h-80" />
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
              <div className="h-20 w-20 rounded-3xl bg-violet-100 flex items-center justify-center">
                <UserX className="h-10 w-10 text-violet-400" />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-black text-foreground">No professionals listed yet</p>
                <p className="text-muted-foreground font-medium max-w-sm">Be the first Muslim professional to join and get discovered by thousands of community members.</p>
              </div>
              <Link href="/account/capabilities/professional">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-black px-10 h-14">
                  List Your Services <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:gap-8">
              {filtered.map(item => (
                <Card key={item.id} className="group rounded-2xl sm:rounded-[3rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-2xl transition-all duration-700 flex flex-col h-full border-2 border-transparent hover:border-violet-100/50">
                  <div className="relative aspect-square sm:aspect-[16/9] overflow-hidden bg-violet-50 flex items-center justify-center">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="bg-violet-100 text-violet-600 font-black text-3xl">{(item.profile?.name ?? item.profession ?? "P")[0]}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-2 left-2 sm:bottom-6 sm:left-6 flex gap-2">
                      {item.verification_status === "verified" && (
                        <Badge className="bg-emerald-500 text-white font-black border-none shadow-xl px-2 py-1 sm:px-5 sm:py-2 rounded-full uppercase text-[10px] tracking-widest flex items-center gap-1 sm:gap-2">
                          <CheckCircle2 className="h-3 w-3" /> Verified
                        </Badge>
                      )}
                      <Badge className={`font-black border-none shadow-xl px-2 py-1 sm:px-5 sm:py-2 rounded-full uppercase text-[10px] tracking-widest ${item.availability === "available" ? "bg-violet-500 text-white" : "bg-card text-muted-foreground"}`}>
                        {item.availability === "available" ? "Available" : "Busy"}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-3 pb-1 sm:p-8 sm:pb-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-violet-600">{item.profession || "Professional"}</p>
                      <CardTitle className="text-sm sm:text-3xl font-black group-hover:text-violet-600 transition-colors leading-tight">{item.profile?.name || "Professional"}</CardTitle>
                      {item.profile?.city && (
                        <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground mt-2">
                          <MapPin className="h-4 w-4 text-violet-600" /> {item.profile.city}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="px-3 pb-3 sm:px-8 sm:pb-8 flex-1 space-y-2 sm:space-y-6">
                    {item.specializations && item.specializations.length > 0 && (
                      <div className="hidden sm:block space-y-3">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Expertise</p>
                        <div className="flex flex-wrap gap-2">
                          {item.specializations.slice(0, 3).map(f => (
                            <span key={f} className="text-[10px] font-bold bg-muted text-muted-foreground px-3 py-1 rounded-lg border border-border">{f}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:pt-6 sm:border-t border-border">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                        <Award className="h-4 w-4 text-violet-500" /> {item.profession || "Pro"}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                        <Zap className="h-4 w-4 text-amber-500" /> Quick Response
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-3 pb-3 pt-0 sm:px-8 sm:pb-8 mt-auto">
                    <Button className="w-full bg-zinc-900 hover:bg-violet-600 text-white rounded-xl sm:rounded-[1.5rem] font-black text-[10px] sm:text-sm uppercase tracking-widest h-9 sm:h-16 shadow-lg sm:shadow-2xl transition-all group-hover:scale-[1.02]">
                      Book Consultation <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
