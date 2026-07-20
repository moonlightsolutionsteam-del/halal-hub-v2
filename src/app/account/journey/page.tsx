"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Trophy, Flame, Coins, Compass, MapPin, Heart, Star, Award,
  Users, ScanLine, HandHeart, Megaphone, Lock, ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"

const ICONS: Record<string, any> = {
  Compass, MapPin, Heart, Star, Award, Users, ScanLine, HandHeart, Megaphone, Flame,
}

type Achievement = {
  id: string; key: string; name: string; description: string; icon: string
  event_type: string; threshold: number; points_reward: number
}
type UserAchievement = { achievement_id: string; unlocked_at: string | null }
type LedgerRow = { id: string; delta: number; reason: string; created_at: string | null }

const EVENT_LABELS: Record<string, string> = {
  business_checkin: "Businesses Checked In",
  business_saved: "Businesses Saved",
  review_written: "Reviews Written",
  community_post: "Community Posts",
  product_scanned: "Products Scanned",
  donation_made: "Donations Made",
  business_suggested: "Businesses Suggested",
}

export default function MyJourneyPage() {
  const { user, loading: authLoading } = useAuth()
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [unlocked, setUnlocked] = useState<Map<string, string | null>>(new Map())
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [ledger, setLedger] = useState<LedgerRow[]>([])
  const [streak, setStreak] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()

    ;supabase.from("achievements").select("id, key, name, description, icon, event_type, threshold, points_reward")
      .eq("active", true).order("sort_order", { ascending: true })
      .then(({ data }: { data: Achievement[] | null }) => setAchievements(data ?? []))

    ;supabase.from("user_achievements").select("achievement_id, unlocked_at").eq("user_id", user.uid)
      .then(({ data }: { data: UserAchievement[] | null }) => {
        setUnlocked(new Map((data ?? []).map(r => [r.achievement_id, r.unlocked_at])))
      })

    ;supabase.from("user_activity_events").select("event_type").eq("user_id", user.uid)
      .then(({ data }: { data: { event_type: string }[] | null }) => {
        const c: Record<string, number> = {}
        for (const row of data ?? []) c[row.event_type] = (c[row.event_type] ?? 0) + 1
        setCounts(c)
        setLoading(false)
      })

    ;supabase.from("points_ledger").select("id, delta, reason, created_at")
      .eq("user_id", user.uid).order("created_at", { ascending: false }).limit(10)
      .then(({ data }: { data: LedgerRow[] | null }) => setLedger(data ?? []))

    ;supabase.from("user_streaks").select("current_count").eq("user_id", user.uid).eq("streak_type", "daily_checkin").maybeSingle()
      .then(({ data }: { data: { current_count: number | null } | null }) => setStreak(data?.current_count ?? 0))
  }, [user?.uid, authLoading])

  if (!authLoading && !user) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-screen gap-4 text-center">
        <h1 className="text-xl font-black">Sign in to see your journey</h1>
        <Link href="/login"><Button className="rounded-2xl h-12 px-8 font-black">Sign In</Button></Link>
      </div>
    )
  }

  const totalEvents = Object.values(counts).reduce((s, n) => s + n, 0)
  const unlockedCount = achievements.filter(a => unlocked.has(a.id)).length

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 max-w-4xl mx-auto pb-24">
      <div className="flex items-center gap-3">
        <Link href="/account/dashboard">
          <Button variant="ghost" size="icon" className="rounded-full"><ArrowLeft className="h-5 w-5" /></Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">My Journey</h1>
          <p className="text-sm text-muted-foreground font-medium">Your activity, streaks, and achievements on Halal Hub.</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="rounded-3xl border-none shadow-sm bg-card p-5 text-center">
          <Coins className="h-6 w-6 mx-auto mb-2 text-amber-500" />
          <p className="text-2xl font-black">{user?.halalCoinsBalance ?? 0}</p>
          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-wide">Halal Coins</p>
        </Card>
        <Card className="rounded-3xl border-none shadow-sm bg-card p-5 text-center">
          <Flame className="h-6 w-6 mx-auto mb-2 text-orange-500" />
          <p className="text-2xl font-black">{streak}</p>
          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-wide">Day Streak</p>
        </Card>
        <Card className="rounded-3xl border-none shadow-sm bg-card p-5 text-center">
          <Trophy className="h-6 w-6 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-black">{unlockedCount}/{achievements.length}</p>
          <p className="text-[10px] font-black uppercase text-muted-foreground tracking-wide">Achievements</p>
        </Card>
      </div>

      <Card className="rounded-[2rem] border-none shadow-sm bg-card">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-lg font-black">Your Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          {loading ? (
            <div className="h-16 animate-pulse bg-muted/50 rounded-2xl" />
          ) : totalEvents === 0 ? (
            <p className="text-sm text-muted-foreground">No activity yet — check in to a business, save a favourite, or write a review to get started.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.entries(counts).map(([type, count]) => (
                <div key={type} className="p-4 bg-muted/30 rounded-2xl">
                  <p className="text-xl font-black text-foreground">{count}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">{EVENT_LABELS[type] ?? type}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-[2rem] border-none shadow-sm bg-card">
        <CardHeader className="p-6 pb-2">
          <CardTitle className="text-lg font-black">Achievements</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {achievements.map((a) => {
            const Icon = ICONS[a.icon] ?? Award
            const isUnlocked = unlocked.has(a.id)
            const progress = Math.min(counts[a.event_type] ?? 0, a.threshold)
            return (
              <div key={a.id} className={`p-4 rounded-2xl border-2 space-y-2 ${isUnlocked ? "border-primary/20 bg-primary/5" : "border-transparent bg-muted/30"}`}>
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${isUnlocked ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                  {isUnlocked ? <Icon className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
                </div>
                <p className="text-sm font-black text-foreground leading-tight">{a.name}</p>
                <p className="text-[11px] text-muted-foreground font-medium leading-snug">{a.description}</p>
                {!isUnlocked && (
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary/60 rounded-full" style={{ width: `${(progress / a.threshold) * 100}%` }} />
                  </div>
                )}
                {!isUnlocked && (
                  <p className="text-[10px] font-bold text-muted-foreground">{progress}/{a.threshold}</p>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>

      {ledger.length > 0 && (
        <Card className="rounded-[2rem] border-none shadow-sm bg-card">
          <CardHeader className="p-6 pb-2">
            <CardTitle className="text-lg font-black">Recent Coins Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-2 space-y-2">
            {ledger.map((row) => (
              <div key={row.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-none">
                <p className="text-sm font-bold text-foreground capitalize">{row.reason.replace(/_/g, " ").replace("achievement:", "Achievement: ")}</p>
                <p className={`text-sm font-black ${row.delta >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {row.delta >= 0 ? "+" : ""}{row.delta}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
