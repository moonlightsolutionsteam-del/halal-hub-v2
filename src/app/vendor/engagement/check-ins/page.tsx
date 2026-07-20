// @ts-nocheck
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Coins } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

type CheckIn = {
  id: string
  user_id: string
  check_date: string
  coins_earned: number
  created_at: string | null
  profiles: { name: string | null } | null
}

function timeAgo(iso: string | null): string {
  if (!iso) return ""
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
}

export default function CheckInsPage() {
  const { user, loading: authLoading } = useAuth()
  const [checkIns, setCheckIns] = React.useState<CheckIn[]>([])
  const [loading, setLoading] = React.useState(true)

  const totalCoins = checkIns.reduce((s, c) => s + (c.coins_earned ?? 0), 0)

  React.useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;supabase
      .from("businesses").select("id").eq("owner_id", user.uid).limit(1).maybeSingle()
      .then(({ data }: { data: { id: string } | null }) => {
        if (!data) { setLoading(false); return }
        ;supabase
          .from("check_ins")
          .select("id, user_id, check_date, coins_earned, created_at, profiles(name)")
          .eq("business_id", data.id)
          .order("created_at", { ascending: false })
          .then(({ data: rows }: { data: CheckIn[] | null }) => {
            setCheckIns(rows ?? [])
            setLoading(false)
          })
      })
  }, [user?.uid, authLoading])

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 max-w-4xl mx-auto pb-24">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
          <MapPin className="h-3 w-3" /> Footfall
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Check-ins</h1>
        <p className="text-muted-foreground font-medium">Customers who have checked in at your location.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="rounded-[2rem] border-none shadow-sm bg-primary text-primary-foreground p-6 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Total Check-ins</p>
          <p className="text-4xl font-black tracking-tighter">{checkIns.length}</p>
        </Card>
        <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Coins Awarded</p>
          <p className="text-4xl font-black tracking-tighter text-foreground">{totalCoins}</p>
        </Card>
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Recent Check-ins</p>
        {checkIns.length === 0 && (
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-12 text-center space-y-3">
            <MapPin className="h-10 w-10 text-muted-foreground/30 mx-auto" />
            <p className="font-black text-foreground">No check-ins yet</p>
            <p className="text-sm text-muted-foreground">Customers who check in at your location will appear here.</p>
          </Card>
        )}
        {checkIns.map(c => (
          <Card key={c.id} className="rounded-[2rem] border-none shadow-sm bg-card">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-black text-foreground">{c.profiles?.name ?? "Anonymous"}</p>
                <p className="text-xs text-muted-foreground font-medium">
                  {new Date(c.check_date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {c.coins_earned > 0 && (
                  <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/30">
                    <Coins className="h-3.5 w-3.5 text-amber-600" />
                    <span className="text-xs font-black text-amber-700 dark:text-amber-400">+{c.coins_earned}</span>
                  </div>
                )}
                <span className="text-[10px] text-muted-foreground font-medium">{timeAgo(c.created_at)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
