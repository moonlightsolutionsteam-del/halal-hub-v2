"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Star, Search, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { getAsmaUlHusna, type AsmaName } from "@/lib/ummah-api"

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-muted", className)} />
}

export default function AsmaUlHusnaPage() {
  const [names, setNames] = useState<AsmaName[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    getAsmaUlHusna()
      .then((d) => setNames(d.names))
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load names"))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return names
    return names.filter(
      (n) => n.english.toLowerCase().includes(q) || n.transliteration.toLowerCase().includes(q) || n.meaning.toLowerCase().includes(q)
    )
  }, [names, search])

  if (error) {
    return (
      <div className="p-4 md:p-8 max-w-5xl mx-auto">
        <Card className="border-destructive/50">
          <CardContent className="p-8 text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
            <h2 className="text-xl font-bold text-foreground">Unable to load the 99 Names</h2>
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-2">
          <Star className="h-7 w-7 text-primary fill-primary/20" />Asma-ul-Husna
        </h1>
        <p className="text-sm font-bold text-muted-foreground">The 99 Beautiful Names of Allah</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search names or meanings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 rounded-2xl h-11"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {loading && Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-40" />)}
        {!loading && filtered.map((name) => (
          <Card key={name.number} className="rounded-[2rem] border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start justify-between">
                <span className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-xs font-black text-primary shrink-0">
                  {name.number}
                </span>
                <span className="text-2xl font-bold text-primary" dir="rtl">{name.arabic}</span>
              </div>
              <div>
                <p className="text-base font-black text-foreground">{name.transliteration}</p>
                <p className="text-sm font-bold text-muted-foreground">{name.english}</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{name.meaning}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {!loading && filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Star className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p className="font-bold">No names match your search</p>
        </div>
      )}
    </div>
  )
}
