"use client"

import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"
import * as React from "react"
import {
  Building2, Bell, Calendar, Users, Heart,
  DollarSign, BookOpen, Image, Megaphone,
  Settings, FileText, Tv2,
  ChevronRight, Star, MapPin, CheckCircle2,
  Wifi, Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const MODULES = [
  {
    section: "Salat & Worship",
    items: [
      { label: "Prayer Timings", description: "Set & publish daily Salat times", icon: Bell, href: "/vendor/mosque/salat", color: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400" },
      { label: "Announcements", description: "Broadcast urgent notices to Musallees", icon: Megaphone, href: "/vendor/mosque/announcements", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" },
    ],
  },
  {
    section: "Community",
    items: [
      { label: "Events", description: "Islamic lectures, workshops, Iftar dinners", icon: Calendar, href: "/vendor/mosque/events", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" },
      { label: "Programs", description: "Islamic classes, Hifz, Arabic courses", icon: BookOpen, href: "/vendor/mosque/programs", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" },
      { label: "Leadership", description: "Imam, committee & org chart", icon: Users, href: "/vendor/mosque/leadership", color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" },
    ],
  },
  {
    section: "Finance & Donations",
    items: [
      { label: "Donations", description: "Sadaqah, Zakat, Waqf collection", icon: Heart, href: "/vendor/mosque/donations", color: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400" },
      { label: "Payments & Billing", description: "Subscription, invoices, payouts", icon: DollarSign, href: "/vendor/mosque/payments", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" },
    ],
  },
  {
    section: "Content & Media",
    items: [
      { label: "Posts & Updates", description: "Community posts and social updates", icon: FileText, href: "/vendor/mosque/engagement/posts", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" },
      { label: "Blog & Khutbahs", description: "Publish Jumuah khutbahs and articles", icon: BookOpen, href: "/vendor/mosque/engagement/blog", color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400" },
      { label: "Gallery", description: "Photos and media library", icon: Image, href: "/vendor/mosque/gallery", color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400" },
      { label: "Flyers", description: "Create and share event flyers", icon: FileText, href: "/vendor/mosque/flyers", color: "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400" },
    ],
  },
  {
    section: "Tools & Settings",
    items: [
      { label: "Connect TV", description: "Display prayer times on mosque screens", icon: Tv2, href: "/vendor/mosque/connect-tv", color: "bg-slate-100 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400" },
      { label: "Web Widgets", description: "Embed prayer times on your website", icon: Wifi, href: "/vendor/mosque/web-widgets", color: "bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400" },
      { label: "Documents", description: "Policies, constitutions, and legal docs", icon: Shield, href: "/vendor/mosque/documents", color: "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400" },
      { label: "Settings", description: "Mosque profile and display preferences", icon: Settings, href: "/vendor/mosque/settings", color: "bg-muted text-muted-foreground" },
    ],
  },
]

type BizRow = { id: string; name: string; city: string | null; country: string | null; rating: number | null; halal_verified: boolean | null }

export default function MosqueDashboard() {
  const { user } = useAuth()
  const [mosque, setMosque] = React.useState<BizRow | null>(null)
  const [followers, setFollowers] = React.useState<number | null>(null)

  React.useEffect(() => {
    if (!user?.uid) return
    const supabase = createClient()
    supabase
      .from("businesses")
      .select("id, name, city, country, rating, halal_verified")
      .eq("owner_id", user.uid)
      .or("category.ilike.%mosque%,category.ilike.%masjid%,category.ilike.%islamic%")
      .limit(1)
      .then(({ data }) => {
        const row = data?.[0] ?? null
        setMosque(row)
        if (!row) return
        supabase.from("saved_businesses").select("id", { count: "exact", head: true })
          .eq("business_id", row.id)
          .then(({ count }) => setFollowers(count ?? 0))
      })
  }, [user?.uid])

  const greeting = user?.name ? `Assalamu Alaikum, ${user.name.split(" ")[0]}` : "Assalamu Alaikum"

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-teal-600 flex items-center justify-center">
              <Building2 className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-black text-foreground">Mosque Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/vendor/mosque/profile">
              <Button variant="ghost" size="sm" className="text-xs font-bold h-8 rounded-lg">Edit Profile</Button>
            </Link>
            <Link href="/vendor/mosque/musalli-dashboard">
              <Button variant="outline" size="sm" className="text-xs font-bold h-8 rounded-lg">Musalli View</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{greeting}</p>
          {mosque ? (
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-foreground">{mosque.name}</h1>
                {mosque.city && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {mosque.city}{mosque.country ? `, ${mosque.country}` : ""}
                  </p>
                )}
              </div>
              <div className="flex gap-2 flex-wrap justify-end">
                {mosque.halal_verified && (
                  <Badge variant="outline" className="text-teal-600 border-teal-200 bg-teal-50 text-[10px] font-bold gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Verified
                  </Badge>
                )}
                {mosque.rating && (
                  <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 text-[10px] font-bold gap-1">
                    <Star className="h-3 w-3" /> {mosque.rating.toFixed(1)}
                  </Badge>
                )}
              </div>
            </div>
          ) : (
            <h1 className="text-2xl font-black text-foreground">Mosque Management</h1>
          )}
        </div>

        {mosque && (
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border/60 bg-card p-4">
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wide">Followers</p>
              <p className="text-2xl font-black text-foreground mt-1">{followers ?? "—"}</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card p-4">
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wide">Rating</p>
              <p className="text-2xl font-black text-foreground mt-1">{mosque.rating ? `${mosque.rating.toFixed(1)} ★` : "—"}</p>
            </div>
          </div>
        )}

        {MODULES.map(section => (
          <div key={section.section} className="space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{section.section}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {section.items.map(mod => {
                const Icon = mod.icon
                return (
                  <Link key={mod.href} href={mod.href}>
                    <div className="group rounded-2xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-md transition-all p-4 flex items-start gap-3 cursor-pointer">
                      <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${mod.color}`}>
                        <Icon className="h-[18px] w-[18px]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors">{mod.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{mod.description}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/40 shrink-0 mt-0.5 group-hover:text-primary/60 transition-colors" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
