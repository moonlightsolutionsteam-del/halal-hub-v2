
"use client"

import { useState, useMemo, type ElementType } from "react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Search, ChevronRight, ChevronDown, ChevronUp, X,
  Sparkles, ShieldCheck, UtensilsCrossed, LayoutGrid,
  Newspaper, Users, MessageSquare, BookOpen, Video, Briefcase,
  Moon, Hash, Star, Calendar, MessageCircle, User, Building,
  Heart, Compass, Calculator, HandHelping, Gift,
  ShoppingBag, Store as StoreIcon,
  Trophy, Wallet, Bookmark, TreePine,
  Building2, PlusCircle, Zap,
  MapPin, Backpack, CalendarCheck, Globe,
} from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────

type BadgeType = "New" | "Popular" | "Beta" | "Coming Soon"

interface Feature {
  name: string
  desc: string
  href: string
  icon: ElementType
  bg: string
  color: string
  badge?: BadgeType
  category?: string
}

interface Category {
  id: string
  title: string
  desc: string
  icon: ElementType
  iconBg: string
  iconColor: string
  features: Feature[]
}

// ── Data ──────────────────────────────────────────────────────────────────────

const QUICK_ACTIONS = [
  { label: "Restaurants",  href: "/restaurants",    icon: UtensilsCrossed, bg: "bg-orange-100 dark:bg-orange-950/40",  color: "text-orange-600",  accent: "from-orange-500/10" },
  { label: "Prayer",       href: "/prayer-times",   icon: Moon,            bg: "bg-emerald-100 dark:bg-emerald-950/40",color: "text-emerald-600", accent: "from-emerald-500/10" },
  { label: "Mosques",      href: "/mosques",        icon: Building,        bg: "bg-teal-100 dark:bg-teal-950/40",      color: "text-teal-600",    accent: "from-teal-500/10" },
  { label: "Marketplace",  href: "/marketplace",    icon: ShoppingBag,     bg: "bg-indigo-100 dark:bg-indigo-950/40",  color: "text-indigo-600",  accent: "from-indigo-500/10" },
  { label: "Community",    href: "/community",      icon: Users,           bg: "bg-purple-100 dark:bg-purple-950/40",  color: "text-purple-600",  accent: "from-purple-500/10" },
  { label: "Halal Check",  href: "/halal-check",    icon: ShieldCheck,     bg: "bg-green-100 dark:bg-green-950/40",    color: "text-green-600",   accent: "from-green-500/10" },
]

const RECENTLY_USED = [
  { label: "Prayer",   href: "/prayer-times",   icon: Moon,        bg: "bg-emerald-100 dark:bg-emerald-950/40", color: "text-emerald-600" },
  { label: "Mosques",  href: "/mosques",        icon: Building,    bg: "bg-teal-100 dark:bg-teal-950/40",       color: "text-teal-600" },
  { label: "Market",   href: "/marketplace",    icon: ShoppingBag, bg: "bg-indigo-100 dark:bg-indigo-950/40",   color: "text-indigo-600" },
  { label: "Feed",     href: "/feed",           icon: Newspaper,   bg: "bg-blue-100 dark:bg-blue-950/40",       color: "text-blue-600" },
  { label: "Halal ✓", href: "/halal-check",    icon: ShieldCheck, bg: "bg-green-100 dark:bg-green-950/40",     color: "text-green-600" },
  { label: "Wallet",   href: "/account/wallet", icon: Wallet,      bg: "bg-amber-100 dark:bg-amber-950/40",     color: "text-amber-600" },
]

const FEATURED = {
  eyebrow: "FEATURED THIS WEEK",
  title: "Hajj Season 2026",
  desc: "Complete pilgrimage toolkit — guides, checklists, packages & certification.",
  href: "/prayer/hajj",
  icon: Compass,
  gradient: "from-amber-500/15 via-orange-500/8 to-transparent",
  iconBg: "bg-amber-100 dark:bg-amber-950/40",
  iconColor: "text-amber-600",
}

const CATEGORIES: Category[] = [
  {
    id: "explore",
    title: "Explore",
    desc: "Discover halal businesses & services",
    icon: LayoutGrid,
    iconBg: "bg-blue-100 dark:bg-blue-950/40",
    iconColor: "text-blue-600",
    features: [
      { name: "Directory",    desc: "Browse all 13 business categories",  href: "/categories",   icon: LayoutGrid,      bg: "bg-blue-50 dark:bg-blue-950/30",    color: "text-blue-600" },
      { name: "Map",          desc: "Find halal spots near you",           href: "/map",           icon: MapPin,          bg: "bg-sky-50 dark:bg-sky-950/30",     color: "text-sky-600" },
      { name: "Events",       desc: "Islamic events in your city",         href: "/events",        icon: Calendar,        bg: "bg-purple-50 dark:bg-purple-950/30",color: "text-purple-600", badge: "Popular" },
      { name: "Halal Check",  desc: "Scan & verify halal products",        href: "/halal-check",   icon: ShieldCheck,     bg: "bg-green-50 dark:bg-green-950/30",  color: "text-green-600" },
      { name: "Restaurants",  desc: "Find halal dining near you",          href: "/restaurants",   icon: UtensilsCrossed, bg: "bg-orange-50 dark:bg-orange-950/30",color: "text-orange-600", badge: "Popular" },
      { name: "Travel",       desc: "Halal-friendly travel options",       href: "/travel",        icon: Compass,         bg: "bg-amber-50 dark:bg-amber-950/30",  color: "text-amber-600" },
    ],
  },
  {
    id: "social",
    title: "Social",
    desc: "Connect with the Muslim community",
    icon: Users,
    iconBg: "bg-purple-100 dark:bg-purple-950/40",
    iconColor: "text-purple-600",
    features: [
      { name: "Feed",          desc: "Your Muslim community feed",          href: "/feed",          icon: Newspaper,    bg: "bg-blue-50 dark:bg-blue-950/30",     color: "text-blue-600" },
      { name: "Community",     desc: "Groups, circles & ummah",             href: "/community",     icon: Users,        bg: "bg-purple-50 dark:bg-purple-950/30", color: "text-purple-600" },
      { name: "Chat",          desc: "Messages & conversations",            href: "/messages",      icon: MessageSquare,bg: "bg-indigo-50 dark:bg-indigo-950/30", color: "text-indigo-600" },
      { name: "Blogs",         desc: "Read & share Islamic content",        href: "/blog",          icon: BookOpen,     bg: "bg-slate-50 dark:bg-slate-900/40",   color: "text-slate-600" },
      { name: "Creators",      desc: "Support Muslim creators",             href: "/creators",      icon: Video,        bg: "bg-rose-50 dark:bg-rose-950/30",     color: "text-rose-600",  badge: "New" },
      { name: "Professionals", desc: "Muslim professional network",         href: "/professionals", icon: Briefcase,    bg: "bg-sky-50 dark:bg-sky-950/30",      color: "text-sky-600" },
    ],
  },
  {
    id: "faith",
    title: "Faith & Giving",
    desc: "Ibadah, learning & sadaqah",
    icon: Moon,
    iconBg: "bg-emerald-100 dark:bg-emerald-950/40",
    iconColor: "text-emerald-600",
    features: [
      { name: "Prayer Times",  desc: "Salah schedule & Qibla",              href: "/prayer-times",       icon: Moon,          bg: "bg-emerald-50 dark:bg-emerald-950/30", color: "text-emerald-600" },
      { name: "Quran",         desc: "Read & listen to the Quran",          href: "/quran",              icon: BookOpen,      bg: "bg-teal-50 dark:bg-teal-950/30",       color: "text-teal-600",    badge: "Popular" },
      { name: "Tasbeeh",       desc: "Digital dhikr counter",               href: "/prayer/tasbeeh",     icon: Hash,          bg: "bg-green-50 dark:bg-green-950/30",     color: "text-green-600" },
      { name: "99 Names",      desc: "Asma ul-Husna with meanings",         href: "/asma-ul-husna",      icon: Star,          bg: "bg-yellow-50 dark:bg-yellow-950/30",   color: "text-yellow-600" },
      { name: "Jummah Guide",  desc: "Friday prayer times & sunnah",        href: "/prayer/jummah",      icon: CalendarCheck, bg: "bg-indigo-50 dark:bg-indigo-950/30",   color: "text-indigo-600" },
      { name: "Ask an Imam",   desc: "Get answers to Islamic questions",     href: "/prayer/ask-imam",    icon: MessageCircle, bg: "bg-purple-50 dark:bg-purple-950/30",   color: "text-purple-600",  badge: "New" },
      { name: "Choose Imam",   desc: "Browse local Islamic scholars",        href: "/prayer/choose-imam", icon: User,          bg: "bg-cyan-50 dark:bg-cyan-950/30",       color: "text-cyan-600" },
      { name: "Mosques",       desc: "Find mosques near you",               href: "/mosques",            icon: Building,      bg: "bg-teal-50 dark:bg-teal-950/30",       color: "text-teal-600" },
      { name: "Hajj Hub",      desc: "Pilgrimage guides & packages",        href: "/prayer/hajj",        icon: Compass,       bg: "bg-amber-50 dark:bg-amber-950/30",     color: "text-amber-600" },
      { name: "Shahadah",      desc: "Take or witness the Shahadah",        href: "/prayer/shahadah",    icon: Heart,         bg: "bg-rose-50 dark:bg-rose-950/30",       color: "text-rose-600" },
      { name: "Zakat",         desc: "Calculate your annual obligation",    href: "/zakat",              icon: Calculator,    bg: "bg-orange-50 dark:bg-orange-950/30",   color: "text-orange-600" },
      { name: "Charity",       desc: "Donate to verified causes",           href: "/charity",            icon: Gift,          bg: "bg-red-50 dark:bg-red-950/30",         color: "text-red-600" },
      { name: "Volunteer",     desc: "Give your time to the ummah",         href: "/volunteer",          icon: HandHelping,   bg: "bg-green-50 dark:bg-green-950/30",     color: "text-green-600" },
      { name: "Donate",        desc: "Sadaqah & one-time giving",           href: "/prayer/donation",    icon: Sparkles,      bg: "bg-pink-50 dark:bg-pink-950/30",       color: "text-pink-600" },
    ],
  },
  {
    id: "shop",
    title: "Shop",
    desc: "Halal marketplace & official store",
    icon: ShoppingBag,
    iconBg: "bg-indigo-100 dark:bg-indigo-950/40",
    iconColor: "text-indigo-600",
    features: [
      { name: "Marketplace", desc: "Buy & sell halal products",          href: "/marketplace", icon: ShoppingBag, bg: "bg-indigo-50 dark:bg-indigo-950/30", color: "text-indigo-600", badge: "Popular" },
      { name: "Hub Store",   desc: "Official Halal Hub merchandise",     href: "/store",       icon: StoreIcon,   bg: "bg-violet-50 dark:bg-violet-950/30", color: "text-violet-600", badge: "New" },
    ],
  },
  {
    id: "you",
    title: "You",
    desc: "Your profile, rewards & journey",
    icon: User,
    iconBg: "bg-amber-100 dark:bg-amber-950/40",
    iconColor: "text-amber-600",
    features: [
      { name: "My Journey",  desc: "Your faith & lifestyle journey",       href: "/account/backpack",  icon: Backpack,  bg: "bg-amber-50 dark:bg-amber-950/30",  color: "text-amber-600" },
      { name: "Rewards",     desc: "Points, badges & achievements",        href: "/rewards",           icon: Trophy,    bg: "bg-yellow-50 dark:bg-yellow-950/30",color: "text-yellow-600", badge: "Popular" },
      { name: "Wallet",      desc: "HH Coins & payment history",          href: "/account/wallet",    icon: Wallet,    bg: "bg-green-50 dark:bg-green-950/30",  color: "text-green-600" },
      { name: "Family Tree", desc: "Map your lineage & roots",             href: "/family-tree",       icon: TreePine,  bg: "bg-teal-50 dark:bg-teal-950/30",   color: "text-teal-600",  badge: "New" },
      { name: "Saved",       desc: "Bookmarked places, posts & products",  href: "/saved",             icon: Bookmark,  bg: "bg-rose-50 dark:bg-rose-950/30",   color: "text-rose-600" },
      { name: "Settings",    desc: "App preferences & account info",       href: "/account/settings",  icon: Zap,       bg: "bg-slate-50 dark:bg-slate-900/40", color: "text-slate-500" },
    ],
  },
  {
    id: "business",
    title: "Business",
    desc: "Manage & grow your business",
    icon: Building2,
    iconBg: "bg-slate-100 dark:bg-slate-800/60",
    iconColor: "text-slate-600",
    features: [
      { name: "Partner Portal",  desc: "Manage your business profile",       href: "/partner/portal",                       icon: Building2,  bg: "bg-slate-50 dark:bg-slate-900/40",    color: "text-slate-600" },
      { name: "List a Business", desc: "Add your business to Halal Hub",    href: "/partner/onboarding/business/category", icon: PlusCircle, bg: "bg-emerald-50 dark:bg-emerald-950/30",color: "text-emerald-600", badge: "New" },
      { name: "Get Verified",    desc: "Apply for the halal verified badge", href: "/verifier",                             icon: ShieldCheck,bg: "bg-green-50 dark:bg-green-950/30",    color: "text-green-600" },
      { name: "Suggest a Place", desc: "Recommend a business to add",        href: "/suggest",                              icon: Globe,      bg: "bg-blue-50 dark:bg-blue-950/30",      color: "text-blue-600" },
    ],
  },
]

// ── Badge helper ──────────────────────────────────────────────────────────────

function badgeClass(badge: BadgeType): string {
  switch (badge) {
    case "New":         return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
    case "Popular":     return "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
    case "Beta":        return "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400"
    case "Coming Soon": return "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ExplorePage() {
  const [query, setQuery]         = useState("")
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  function toggleSection(id: string) {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const allFeatures: Feature[] = useMemo(
    () => CATEGORIES.flatMap(cat => cat.features.map(f => ({ ...f, category: cat.title }))),
    []
  )

  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return []
    return allFeatures.filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.desc.toLowerCase().includes(q) ||
      (f.category ?? "").toLowerCase().includes(q)
    )
  }, [query, allFeatures])

  const isSearching = query.trim().length > 0

  return (
    <div className="max-w-2xl lg:max-w-5xl mx-auto pb-32">

      {/* ── Sticky header + search ── */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border/40 px-4 pt-4 pb-3 space-y-3">
        <h1 className="text-2xl font-black font-headline text-foreground tracking-tight">Explore</h1>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search Halal Hub…"
            className="pl-10 pr-10 h-11 rounded-full border-border/60 bg-muted/40 text-sm font-medium placeholder:text-muted-foreground/60 focus-visible:ring-primary/30"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="px-4 py-5 space-y-7">

        {isSearching ? (
          /* ── Search results ── */
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for &quot;{query}&quot;
            </p>
            {searchResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center">
                  <Search className="h-7 w-7 text-muted-foreground/40" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-muted-foreground">Nothing found</p>
                  <p className="text-xs text-muted-foreground/60 mt-0.5">Try a different keyword</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                {searchResults.map(f => (
                  <FeatureCard key={f.href + f.name} feature={f} showCategory />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* ── Quick actions ── */}
            <section className="space-y-3">
              <Label>Quick Actions</Label>
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
                {QUICK_ACTIONS.map(action => (
                  <Link key={action.href} href={action.href} className="group block">
                    <div className={cn(
                      "rounded-2xl border border-border/40 p-3.5 space-y-3 bg-gradient-to-br to-transparent",
                      "hover:shadow-md hover:-translate-y-0.5 transition-all duration-200",
                      action.accent
                    )}>
                      <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", action.bg)}>
                        <action.icon className={cn("h-4 w-4", action.color)} />
                      </div>
                      <p className="text-[11px] font-black leading-snug text-foreground">{action.label}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* ── Recently used ── */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Recently Used</Label>
                <span className="text-[10px] font-semibold text-muted-foreground/50">Updates automatically</span>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                {RECENTLY_USED.map(item => (
                  <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1.5 shrink-0">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-soft", item.bg)}>
                      <item.icon className={cn("h-5 w-5", item.color)} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wide text-muted-foreground whitespace-nowrap">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* ── Featured module ── */}
            <Link href={FEATURED.href} className="group block">
              <div className={cn(
                "rounded-3xl border border-border/30 p-4 bg-gradient-to-br overflow-hidden",
                FEATURED.gradient
              )}>
                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-1 min-w-0">
                    <p className="text-[9px] font-black uppercase tracking-widest text-primary">{FEATURED.eyebrow}</p>
                    <p className="text-base font-black text-foreground leading-tight">{FEATURED.title}</p>
                    <p className="text-[11px] text-muted-foreground leading-snug">{FEATURED.desc}</p>
                  </div>
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-soft", FEATURED.iconBg)}>
                    <FEATURED.icon className={cn("h-7 w-7", FEATURED.iconColor)} />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-black text-primary group-hover:gap-2 transition-all duration-200">
                  Explore now <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>

            {/* ── Feature categories ── */}
            <section className="space-y-3">
              <Label>All Features</Label>
              {CATEGORIES.map(cat => (
                <div key={cat.id} className="rounded-2xl border border-border/50 bg-card overflow-hidden">
                  <button
                    onClick={() => toggleSection(cat.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", cat.iconBg)}>
                        <cat.icon className={cn("h-4 w-4", cat.iconColor)} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-foreground leading-tight">{cat.title}</p>
                        <p className="text-[10px] text-muted-foreground font-medium mt-0.5">{cat.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[10px] font-bold text-muted-foreground/50">{cat.features.length}</span>
                      {collapsed[cat.id]
                        ? <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        : <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      }
                    </div>
                  </button>
                  {!collapsed[cat.id] && (
                    <div className="px-3 pb-3 grid grid-cols-2 lg:grid-cols-3 gap-2 border-t border-border/30 pt-3">
                      {cat.features.map(f => (
                        <FeatureCard key={f.href + f.name} feature={f} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>

            <div className="text-center py-2 space-y-0.5">
              <p className="text-[11px] font-black text-muted-foreground/40 uppercase tracking-widest">Halal Hub</p>
              <p className="text-[10px] text-muted-foreground/30">More modules coming soon</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{children}</p>
  )
}

function FeatureCard({ feature, showCategory = false }: { feature: Feature; showCategory?: boolean }) {
  return (
    <Link href={feature.href} className="group block h-full">
      <div className="h-full rounded-2xl border border-border/50 bg-card p-3 space-y-2.5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
        <div className="flex items-start justify-between gap-1">
          <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", feature.bg)}>
            <feature.icon className={cn("h-4 w-4", feature.color)} />
          </div>
          {feature.badge && (
            <span className={cn(
              "text-[8px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded-full shrink-0 mt-0.5",
              badgeClass(feature.badge)
            )}>
              {feature.badge}
            </span>
          )}
        </div>
        <div className="flex-1 space-y-0.5">
          {showCategory && feature.category && (
            <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/50">{feature.category}</p>
          )}
          <p className="text-[12px] font-black text-foreground leading-tight">{feature.name}</p>
          <p className="text-[10px] text-muted-foreground leading-snug line-clamp-2">{feature.desc}</p>
        </div>
        <div className="flex items-center gap-0.5 text-[9px] font-black text-muted-foreground group-hover:text-primary transition-colors duration-150">
          Open <ChevronRight className="h-2.5 w-2.5" />
        </div>
      </div>
    </Link>
  )
}
