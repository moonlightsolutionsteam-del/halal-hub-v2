"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bookmark, MapPin, Heart, ArrowRight, Loader2, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"

type SavedRow = {
  id: string
  business_id: string
  business: {
    id: string
    name: string
    category: string | null
    city: string | null
    image_url: string | null
    rating: number | null
    halal_verified: boolean | null
  } | null
}

export default function SavedPage() {
  const { user, loading: authLoading } = useAuth()
  const [rows, setRows] = useState<SavedRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;supabase
      .from("saved_businesses")
      .select("id, business_id, business:businesses(id, name, category, city, image_url, rating, halal_verified)")
      .eq("user_id", user.uid)
      .order("created_at", { ascending: false })
      .then(({ data }: { data: SavedRow[] | null }) => {
        setRows(data ?? [])
        setLoading(false)
      })
  }, [user?.uid, authLoading])

  const unsave = async (rowId: string) => {
    const supabase = createClient()
    await supabase.from("saved_businesses").delete().eq("id", rowId)
    setRows(prev => prev.filter(r => r.id !== rowId))
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Saved Places</h1>
        <p className="text-sm font-bold text-muted-foreground">Businesses and places you&apos;ve bookmarked.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : !user ? (
        <Card className="rounded-[2rem] border-none shadow-sm">
          <CardContent className="p-6 sm:p-12 text-center space-y-4">
            <Bookmark className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <div className="space-y-1">
              <p className="text-lg font-black text-foreground">Sign in to see your saved places</p>
              <p className="text-sm text-muted-foreground font-medium">Your saved businesses are synced across all your devices.</p>
            </div>
            <Link href="/login"><Button className="bg-primary text-white rounded-full mt-2 px-8 font-bold">Sign In</Button></Link>
          </CardContent>
        </Card>
      ) : rows.length === 0 ? (
        <Card className="rounded-[2rem] border-none shadow-sm">
          <CardContent className="p-6 sm:p-12 text-center space-y-4">
            <Bookmark className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <div className="space-y-1">
              <p className="text-lg font-black text-foreground">Nothing saved yet</p>
              <p className="text-sm text-muted-foreground font-medium">Tap the heart on any listing to save it here.</p>
            </div>
            <Link href="/categories"><Button variant="outline" className="rounded-full mt-2">Explore the Directory</Button></Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {rows.map(row => {
            const b = row.business
            if (!b) return null
            return (
              <Card key={row.id} className="group rounded-[2rem] border-none shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                <CardContent className="p-0 flex">
                  <div className="relative w-24 shrink-0">
                    {b.image_url ? (
                      <Image src={b.image_url} alt={b.name} fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                        <Bookmark className="h-6 w-6 text-primary/40" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 sm:p-4 flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/entities/${b.id}`} className="min-w-0">
                        <p className="text-xs sm:text-sm font-black text-foreground truncate group-hover:text-primary transition-colors">{b.name}</p>
                      </Link>
                      <button onClick={() => unsave(row.id)} aria-label="Remove from saved" className="shrink-0">
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      </button>
                    </div>
                    {b.category && <Badge variant="secondary" className="text-[10px]">{b.category}</Badge>}
                    {b.city && <p className="text-xs text-muted-foreground font-medium flex items-center gap-1"><MapPin className="h-3 w-3" />{b.city}</p>}
                    {b.rating && (
                      <p className="text-xs font-bold text-amber-600 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />{b.rating.toFixed(1)}
                      </p>
                    )}
                    <Link href={`/entities/${b.id}`} className="text-xs font-bold text-primary flex items-center gap-1 pt-0.5">
                      View <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
