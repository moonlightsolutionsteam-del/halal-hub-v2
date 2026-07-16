"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Search, Plus, Clock, CheckCircle2, XCircle, Loader2, Sparkles } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"

type Suggestion = {
  id: string
  place_name: string | null
  category: string | null
  status: string | null
  created_at: string
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  approved:  { label: "Added to Hub",  color: "bg-emerald-50 text-emerald-700 border-emerald-100 border", icon: CheckCircle2 },
  pending:   { label: "Under Review",  color: "bg-amber-50 text-amber-700 border-amber-100 border",       icon: Clock },
  rejected:  { label: "Not Added",     color: "bg-red-50 text-red-700 border-red-100 border",             icon: XCircle },
}

export default function SuggestionsPage() {
  const { user, loading: authLoading } = useAuth()
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;(supabase as any)
      .from("suggestions")
      .select("id, place_name, category, status, created_at")
      .eq("user_id", user.uid)
      .order("created_at", { ascending: false })
      .then(({ data }: { data: Suggestion[] | null }) => {
        setSuggestions(data ?? [])
        setLoading(false)
      })
  }, [user?.uid, authLoading])

  const filtered = suggestions.filter(s => {
    const q = search.toLowerCase()
    return !q || (s.place_name ?? "").toLowerCase().includes(q) || (s.category ?? "").toLowerCase().includes(q)
  })

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-0.5">
          <h1 className="text-xl sm:text-3xl font-black font-headline text-foreground tracking-tight">My Suggestions</h1>
          <p className="text-sm font-bold text-muted-foreground">Businesses you&apos;ve suggested to add to HalalHub.</p>
        </div>
        <Link href="/suggest">
          <Button className="bg-primary text-white rounded-full px-6 font-bold h-11 gap-2 shrink-0">
            <Plus className="h-4 w-4" /> Suggest a Place
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search your suggestions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 h-12 rounded-2xl bg-card border-none shadow-sm"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-lg text-foreground">{search ? "No matches found" : "No suggestions yet"}</p>
            <p className="text-muted-foreground font-medium text-sm">
              {search ? "Try a different search term." : "Know a great halal place not on our map? Tell us!"}
            </p>
          </div>
          {!search && (
            <Link href="/suggest">
              <Button className="bg-primary text-white rounded-full px-8 font-bold mt-2">Suggest a Place</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(s => {
            const cfg = STATUS_CONFIG[s.status ?? "pending"] ?? STATUS_CONFIG.pending
            const Icon = cfg.icon
            const date = new Date(s.created_at).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
            return (
              <Card key={s.id} className="rounded-[2rem] border-none shadow-sm bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-foreground text-sm truncate">{s.place_name ?? "Unnamed Place"}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {s.category && <span className="text-[10px] font-bold text-muted-foreground uppercase">{s.category}</span>}
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" /> {date}
                      </span>
                    </div>
                  </div>
                  <Badge className={`${cfg.color} font-black text-[9px] uppercase px-3 py-1 rounded-full flex items-center gap-1 shrink-0`}>
                    <Icon className="h-2.5 w-2.5" /> {cfg.label}
                  </Badge>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
