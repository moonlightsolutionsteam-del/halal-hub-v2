"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search, MapPin, Star, ArrowLeft,
  Video, Users, ChevronRight,
  CheckCircle2, Sparkles, Zap, PenLine
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

const TABS = ["All", "Video", "Podcast", "Writing", "Photography", "Design", "Education"]

type CreatorRow = {
  id: string
  display_name: string | null
  bio: string | null
  avatar_url: string | null
  cover_url: string | null
  category: string | null
  follower_count: number | null
}

export default function CreatorsPage() {
  const [selectedTab, setSelectedTab] = useState("All")
  const [creators, setCreators] = useState<CreatorRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    ;supabase
      .from("creators")
      .select("id, display_name, bio, avatar_url, cover_url, category, follower_count")
      .eq("status", "active")
      .order("follower_count", { ascending: false })
      .then(({ data }: { data: CreatorRow[] | null }) => {
        setCreators(data ?? [])
        setLoading(false)
      })
  }, [])

  const filtered = selectedTab === "All" ? creators : creators.filter(c => c.category === selectedTab)

  return (
    <div className="container mx-auto p-3 sm:p-6 space-y-4 sm:space-y-10 max-w-7xl">
      <div className="flex flex-col gap-3 sm:gap-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-8">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="h-9 w-9 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-orange-100 text-orange-600 shadow-inner">
              <Video className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-5xl font-black font-headline text-foreground tracking-tight">Muslim Creators</h1>
              <p className="text-muted-foreground font-medium text-xs sm:text-xl">Discover verified Muslim content creators building communities across every platform.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="h-10 sm:h-14 rounded-xl sm:rounded-2xl bg-card border-none shadow-sm gap-2 font-bold px-4 sm:px-6 hover:bg-muted" asChild>
              <Link href="/account/capabilities/creator">
                <PenLine className="h-5 w-5 text-orange-600" /> Apply to Be Listed
              </Link>
            </Button>
            <div className="relative flex-1 md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search creators, niches, or platforms..." className="pl-10 sm:pl-12 h-10 sm:h-14 rounded-xl sm:rounded-2xl bg-card border-none shadow-sm font-medium text-sm sm:text-lg" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setSelectedTab(tab)}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border-2 ${
              selectedTab === tab
                ? "bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-600/20 scale-105"
                : "bg-card text-muted-foreground border-transparent hover:border-orange-200"
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
                <Button variant="ghost" size="sm" className="text-[10px] font-black text-orange-600 p-0 h-auto uppercase tracking-tighter">Reset</Button>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-foreground tracking-widest">Creator Standards</p>
                <div className="space-y-3">
                  {["Hub Verified", "Family Friendly", "Islamic Focus", "Brand Partnership Ready"].map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div className="h-5 w-5 border-2 rounded-lg border-border group-hover:border-orange-600 transition-colors flex items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-sm bg-orange-600 scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                      <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground">{f}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="h-px bg-muted w-full" />
              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-foreground tracking-widest">Platform</p>
                <div className="grid grid-cols-2 gap-2">
                  {["YouTube", "Instagram", "Podcast", "TikTok"].map(p => (
                    <button key={p} className="py-2 rounded-xl bg-muted text-muted-foreground font-black text-xs hover:bg-orange-50 hover:text-orange-600 transition-colors border border-transparent hover:border-orange-100">{p}</button>
                  ))}
                </div>
              </div>
            </div>
            <Card className="rounded-3xl border-none bg-orange-900 text-white p-8 space-y-4 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 opacity-20"><Sparkles className="h-24 w-24" /></div>
              <h3 className="font-black text-lg leading-tight relative z-10">Get Your Brand Discovered</h3>
              <p className="text-xs text-white/80 leading-relaxed relative z-10">Partner with Muslim creators who align with your values and reach engaged halal audiences.</p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs h-12 shadow-xl bg-card text-orange-900 hover:bg-orange-50">Partner With Creators</Button>
            </Card>
          </Card>
        </aside>

        <div className="lg:col-span-9 space-y-8">
          <div className="flex items-center justify-between px-2">
            <p className="text-sm font-bold text-muted-foreground tracking-tight">
              {loading ? "Loading…" : <>Found <span className="text-foreground">{filtered.length}</span> creators</>}
            </p>
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground py-16">Loading creators…</p>
          ) : filtered.length === 0 ? (
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-16 text-center space-y-4">
              <Video className="h-10 w-10 mx-auto text-muted-foreground opacity-50" />
              <p className="text-lg font-black text-foreground">No creators listed yet</p>
              <p className="text-sm text-muted-foreground">Check back soon, or apply to be the first creator on Halal Hub.</p>
            </Card>
          ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-8">
            {filtered.map(item => (
              <Link key={item.id} href={`/creators/${item.id}`}>
                <Card className="group rounded-2xl sm:rounded-[3rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-2xl transition-all duration-700 flex flex-col h-full border-2 border-transparent hover:border-orange-100/50">
                  <div className="relative aspect-square sm:aspect-[16/9] overflow-hidden bg-muted">
                    {(item.cover_url || item.avatar_url) && (
                      <img src={item.cover_url ?? item.avatar_url ?? ""} alt={item.display_name ?? "Creator"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    )}
                    <div className="absolute bottom-2 left-2 sm:bottom-6 sm:left-6 flex gap-2">
                      <Badge className="bg-card text-orange-600 font-black border-none shadow-xl px-2 py-1 sm:px-5 sm:py-2 rounded-full uppercase text-[10px] tracking-widest flex items-center gap-1 sm:gap-2">
                        <Users className="h-3 w-3" /> {(item.follower_count ?? 0).toLocaleString()}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-3 pb-1 sm:p-8 sm:pb-4">
                    <div className="space-y-2">
                      {item.category && <p className="text-[10px] font-black uppercase tracking-widest text-orange-600">{item.category}</p>}
                      <CardTitle className="text-sm sm:text-3xl font-black group-hover:text-orange-600 transition-colors leading-tight">{item.display_name ?? "Creator"}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="px-3 pb-3 sm:px-8 sm:pb-8 flex-1 space-y-2 sm:space-y-6">
                    {item.bio && <p className="hidden sm:block text-sm text-muted-foreground line-clamp-2">{item.bio}</p>}
                  </CardContent>
                  <CardFooter className="px-3 pb-3 pt-0 sm:px-8 sm:pb-8 mt-auto">
                    <Button className="w-full bg-zinc-900 hover:bg-orange-600 text-white rounded-xl sm:rounded-[1.5rem] font-black text-[10px] sm:text-sm uppercase tracking-widest h-9 sm:h-16 shadow-lg sm:shadow-2xl transition-all group-hover:scale-[1.02]">
                      View Profile <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
