"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckSquare, Users, Building, Search, Loader2, Coins } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

type CheckIn = {
  id: string
  check_date: string
  coins_earned: number
  created_at: string | null
  business: { name: string; category: string | null } | null
  user: { name: string | null } | null
}

export default function AdminCheckInsPage() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const supabase = createClient()
    ;(supabase as any)
      .from("check_ins")
      .select("id, check_date, coins_earned, created_at, business:businesses(name, category), user:profiles!check_ins_user_id_fkey(name)")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }: { data: CheckIn[] | null }) => {
        setCheckIns(data ?? [])
        setLoading(false)
      })
  }, [])

  const filtered = checkIns.filter(c => {
    const q = search.toLowerCase()
    return !q || (c.business?.name ?? "").toLowerCase().includes(q) || (c.user?.name ?? "").toLowerCase().includes(q)
  })

  const totalCoins = checkIns.reduce((sum, c) => sum + (c.coins_earned ?? 0), 0)
  const uniqueUsers = new Set(checkIns.map(c => c.user?.name)).size
  const uniqueBiz = new Set(checkIns.map(c => c.business?.name)).size

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-foreground">Check-Ins</h1>
        <p className="text-sm text-muted-foreground font-medium">Track community check-ins to halal businesses.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="rounded-2xl border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <CheckSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-black">{checkIns.length}</p>
              <p className="text-xs text-muted-foreground font-bold">Total Check-ins</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-black">{uniqueUsers}</p>
              <p className="text-xs text-muted-foreground font-bold">Unique Users</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Coins className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xl font-black">{totalCoins.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground font-bold">Coins Awarded</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by user or business..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-11 rounded-xl" />
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <CheckSquare className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">{search ? "No matches." : "No check-ins yet."}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(c => {
            const date = c.created_at
              ? new Date(c.created_at).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
              : c.check_date
            return (
              <Card key={c.id} className="rounded-2xl border-none shadow-sm">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-black text-foreground truncate">{c.user?.name ?? "Anonymous"}</p>
                      <span className="text-muted-foreground text-xs">checked in at</span>
                      <p className="text-sm font-bold text-primary truncate">{c.business?.name ?? "Unknown"}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      {c.business?.category && <Badge variant="secondary" className="text-[10px]">{c.business.category}</Badge>}
                      <span className="text-xs text-muted-foreground">{date}</span>
                    </div>
                  </div>
                  <div className="text-xs font-black text-amber-600 flex items-center gap-1 shrink-0">
                    <Coins className="h-3 w-3" />+{c.coins_earned}
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
