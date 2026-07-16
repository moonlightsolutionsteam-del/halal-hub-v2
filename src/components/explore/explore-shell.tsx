"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface StatItem {
  icon: React.ReactNode
  label: string
}

export interface ExploreShellProps {
  // Hero
  heroBg: string
  iconBg: string
  accentIcon: React.ReactNode
  title: string
  subtitle: string
  statItems: StatItem[]

  // Search
  search: string
  onSearch: (v: string) => void
  searchPlaceholder: string

  // Filter chips (row 1)
  filters: string[]
  activeFilter: string
  onFilterChange: (v: string) => void
  filterActiveClass: string

  // Quick filter chips (row 2)
  quickFilters: string[]
  activeQuick: string
  onQuickChange: (v: string) => void
  quickActiveClass: string

  // Optional amenity badges below sticky
  amenities?: string[]
  amenityClass?: string

  // Main content (featured + results)
  children: React.ReactNode

  // Load more
  loadMoreLabel: string
  loadMoreHoverClass: string
  onLoadMore?: () => void
  hasMore?: boolean

  // CTA
  ctaBg: string
  ctaAccentIcon: React.ReactNode
  ctaTitle: string
  ctaDesc: string
  ctaLabel: string
  ctaLink: string
  ctaTextColor: string
}

export function ExploreShell({
  heroBg, iconBg, accentIcon, title, subtitle, statItems,
  search, onSearch, searchPlaceholder,
  filters, activeFilter, onFilterChange, filterActiveClass,
  quickFilters, activeQuick, onQuickChange, quickActiveClass,
  amenities, amenityClass,
  children,
  loadMoreLabel, loadMoreHoverClass, onLoadMore, hasMore = false,
  ctaBg, ctaAccentIcon, ctaTitle, ctaDesc, ctaLabel, ctaLink, ctaTextColor,
}: ExploreShellProps) {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <div className={`bg-gradient-to-br ${heroBg} to-background px-4 pt-10 pb-8`}>
        <div className="max-w-3xl mx-auto space-y-3">
          <div className={`h-16 w-16 rounded-3xl ${iconBg} flex items-center justify-center`}>
            {accentIcon}
          </div>
          <h1 className="text-3xl font-black font-headline text-foreground">{title}</h1>
          <p className="text-sm font-medium text-muted-foreground">{subtitle}</p>
          <div className="flex items-center gap-4 pt-1">
            {statItems.map((s, i) => (
              <span key={i} className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                {s.icon} {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Search + Filters */}
      <div className="sticky top-0 z-20 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-3 space-y-2.5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => onSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-11 h-11 rounded-2xl border-none bg-muted font-medium text-sm"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-0.5 no-scrollbar">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => onFilterChange(f)}
                className={cn(
                  "shrink-0 px-4 py-1.5 rounded-full text-xs font-black transition-all",
                  activeFilter === f
                    ? filterActiveClass
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-0.5 no-scrollbar">
            {quickFilters.map(f => (
              <button
                key={f}
                onClick={() => onQuickChange(f)}
                className={cn(
                  "shrink-0 px-3.5 py-1 rounded-full text-[11px] font-bold transition-all border",
                  activeQuick === f ? quickActiveClass : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8 pb-24">

        {amenities && amenities.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-0.5 no-scrollbar">
            {amenities.map(a => (
              <span
                key={a}
                className={cn("shrink-0 px-3.5 py-1.5 rounded-full text-[10px] font-black border cursor-pointer transition-colors", amenityClass)}
              >
                {a}
              </span>
            ))}
          </div>
        )}

        {children}

        <div className="flex justify-center pt-2">
          {hasMore ? (
            <Button
              variant="outline"
              onClick={onLoadMore}
              className={cn("rounded-full px-8 font-black border-2 h-11 transition-all", loadMoreHoverClass)}
            >
              {loadMoreLabel}
            </Button>
          ) : (
            <p className="text-xs font-black text-muted-foreground uppercase tracking-widest py-2">All results shown</p>
          )}
        </div>

        <Card className="rounded-[2.5rem] border-none overflow-hidden">
          <CardContent className={`p-8 space-y-4 ${ctaBg} text-white`}>
            {ctaAccentIcon}
            <h3 className="text-xl font-black font-headline">{ctaTitle}</h3>
            <p className="text-sm text-white/80 font-medium leading-relaxed">{ctaDesc}</p>
            <Link href={ctaLink}>
              <Button className={cn("h-12 px-8 rounded-2xl bg-white hover:bg-white/90 font-black text-sm shadow-lg", ctaTextColor)}>
                {ctaLabel}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
