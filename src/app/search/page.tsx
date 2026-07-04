"use client"

import { Suspense, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star, SearchX, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useBusinesses } from "@/hooks/use-businesses"
import { cn } from "@/lib/utils"

const FILTERS = ["All", "Verified Only", "Top Rated", "Open Now"] as const
type Filter = (typeof FILTERS)[number]

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-2xl bg-muted", className)} />
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-6 text-center text-muted-foreground">Loading search...</div>}>
      <SearchResults />
    </Suspense>
  )
}

function SearchResults() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [input, setInput] = useState(query)
  const [filter, setFilter] = useState<Filter>("All")
  const { businesses, loading } = useBusinesses()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = businesses
    if (q) {
      list = list.filter((b) =>
        [b.name, b.type, b.category, ...(b.cuisines || []), ...(b.specialties || []), ...(b.amenities || [])]
          .filter(Boolean)
          .some((field) => String(field).toLowerCase().includes(q))
      )
    }
    if (filter === "Verified Only") list = list.filter((b) => b.verifiedHalal || b.verified)
    if (filter === "Top Rated") list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0)).filter((b) => (b.rating || 0) >= 4.5)
    if (filter === "Open Now") list = list.filter((b) => b.isOpen)
    return list
  }, [businesses, query, filter])

  const submit = () => {
    router.push(`/search?q=${encodeURIComponent(input.trim())}`)
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-3xl font-black font-headline text-foreground">Search</h1>
            <p className="text-muted-foreground font-medium">
              {query ? <>Found {results.length} match{results.length === 1 ? "" : "es"} for &ldquo;{query}&rdquo;</> : "Search halal businesses, mosques, and services."}
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                className="pl-9 h-12 rounded-2xl border-none shadow-soft bg-card"
                placeholder="Search anything..."
              />
            </div>
            <Button onClick={submit} className="h-12 rounded-2xl px-5">Search</Button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {FILTERS.map((f) => (
            <Badge
              key={f}
              variant={filter === f ? "default" : "secondary"}
              className="px-4 py-2 rounded-full cursor-pointer transition-colors duration-200"
              onClick={() => setFilter(f)}
            >
              {f}
            </Badge>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32" />)}
        </div>
      ) : results.length === 0 ? (
        <Card className="rounded-[2rem] border-none shadow-soft">
          <CardContent className="p-6 sm:p-12 text-center space-y-4">
            <SearchX className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <div className="space-y-1">
              <p className="text-lg font-black text-foreground">No results{query ? <> for &ldquo;{query}&rdquo;</> : ""}</p>
              <p className="text-sm text-muted-foreground font-medium">Try a different search term, or browse the directory instead.</p>
            </div>
            <Link href="/categories"><Button variant="outline" className="rounded-full mt-2">Browse Categories</Button></Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {results.map((b) => (
            <Link key={b.id} href={`/entities/${b.id}`}>
              <Card className="group rounded-[2rem] border-none shadow-soft hover:shadow-soft-md transition-shadow duration-200 overflow-hidden h-full">
                <CardContent className="p-0 flex">
                  <div className="relative w-20 sm:w-28 shrink-0">
                    {b.imageUrl && <Image src={b.imageUrl} alt={b.name} fill className="object-cover" />}
                  </div>
                  <div className="p-3 sm:p-5 space-y-1.5 sm:space-y-2 flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-base font-black text-foreground truncate group-hover:text-primary transition-colors">{b.name}</p>
                      {(b.verifiedHalal || b.verified) && <Badge className="shrink-0 text-[10px]">Verified</Badge>}
                    </div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">{b.type} · {b.category}</p>
                    <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                      {b.rating != null && <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{b.rating}</span>}
                      {b.distance && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{b.distance}</span>}
                      <span className="ml-auto flex items-center gap-1 text-primary">View<ArrowRight className="h-3 w-3" /></span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
