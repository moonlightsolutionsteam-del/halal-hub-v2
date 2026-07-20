"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  Megaphone, Coins, Users, CalendarDays, Loader2, CheckCircle2,
  AlertCircle, Trophy,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

type Campaign = {
  id: string
  title: string
  description: string | null
  brand_name: string | null
  campaign_type: string
  coin_cost: number
  max_slots: number
  slots_filled: number
  deadline: string | null
  deliverable: string | null
  reward_value: string | null
  cover_url: string | null
}

export default function CampaignsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [myApps, setMyApps] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Campaign | null>(null)
  const [pitch, setPitch] = useState("")
  const [applying, setApplying] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    const p1 = supabase
      .from("campaigns")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false })

    const p2 = user
      ? supabase.from("campaign_applications").select("campaign_id").eq("user_id", user.uid)
      : Promise.resolve({ data: [] })

    Promise.all([p1, p2]).then(([camRes, appRes]) => {
      setCampaigns(camRes.data ?? [])
      setMyApps(new Set((appRes.data ?? []).map((a: any) => a.campaign_id)))
      setLoading(false)
    })
  }, [user])

  async function apply() {
    if (!user || !selected) return
    if (user.halalCoinsBalance < selected.coin_cost) {
      toast({ title: "Not enough Halal Coins", description: `You need ${selected.coin_cost} HC to apply.`, variant: "destructive" })
      return
    }
    setApplying(true)
    const supabase = createClient()

    // Insert application
    const { error } = await supabase.from("campaign_applications").insert({
      campaign_id: selected.id,
      user_id: user.uid,
      pitch: pitch.trim() || null,
      coins_burned: selected.coin_cost,
      status: "pending",
    })

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
      setApplying(false)
      return
    }

    // Burn coins from coin_ledger (debit)
    if (selected.coin_cost > 0) {
      const { data: last } = await supabase
        .from("coin_ledger")
        .select("balance_after")
        .eq("user_id", user.uid)
        .order("created_at", { ascending: false })
        .limit(1)
        .single()
      const bal = (last?.balance_after ?? user.halalCoinsBalance) - selected.coin_cost
      await supabase.from("coin_ledger").insert({
        user_id: user.uid,
        amount: -selected.coin_cost,
        balance_after: bal,
        action_type: "campaign_application",
        description: `Applied to campaign: ${selected.title}`,
        reference_id: selected.id,
      })
      await supabase.from("profiles").update({ halal_coins_balance: bal }).eq("id", user.uid)
      await supabase.from("user_levels").update({ current_balance: bal }).eq("user_id", user.uid)
    }

    // Increment slots_filled
    await supabase.from("campaigns").update({ slots_filled: selected.slots_filled + 1 }).eq("id", selected.id)

    setMyApps(prev => new Set([...prev, selected.id]))
    toast({ title: "Application submitted!", description: selected.coin_cost > 0 ? `${selected.coin_cost} HC burned.` : "Good luck!" })
    setSelected(null)
    setPitch("")
    setApplying(false)
  }

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
          <Megaphone className="h-6 w-6 text-primary" /> Campaigns
        </h1>
        <p className="text-sm text-muted-foreground">
          Brand campaigns open for creators. Burn Halal Coins to apply — approved creators get rewarded.
        </p>
      </div>

      {campaigns.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground">
          <Megaphone className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <p className="font-bold text-lg">No active campaigns right now</p>
          <p className="text-sm mt-1">Check back soon — new campaigns are added regularly.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {campaigns.map(c => {
            const applied = myApps.has(c.id)
            const slotsLeft = c.max_slots - c.slots_filled
            const full = slotsLeft <= 0
            const pct = Math.min(100, Math.round((c.slots_filled / c.max_slots) * 100))
            return (
              <Card key={c.id} className="rounded-2xl border-none shadow-sm">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base font-black text-foreground">{c.title}</span>
                        <Badge className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary border-primary/20">
                          {c.campaign_type}
                        </Badge>
                      </div>
                      {c.brand_name && <p className="text-xs font-bold text-muted-foreground">{c.brand_name}</p>}
                      {c.description && <p className="text-sm text-foreground/80 line-clamp-3">{c.description}</p>}
                    </div>
                    {c.reward_value && (
                      <div className="shrink-0 text-right">
                        <p className="text-xs text-muted-foreground font-medium">Reward</p>
                        <p className="text-sm font-black text-emerald-600">{c.reward_value}</p>
                      </div>
                    )}
                  </div>

                  {c.deliverable && (
                    <div className="p-3 rounded-xl bg-muted/50">
                      <p className="text-xs font-bold text-muted-foreground mb-0.5">Deliverable</p>
                      <p className="text-sm text-foreground">{c.deliverable}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <Coins className="h-3.5 w-3.5 text-amber-500" />
                      <span className="font-bold text-foreground">{c.coin_cost} HC</span> to apply
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" />
                      {slotsLeft} slot{slotsLeft !== 1 ? "s" : ""} left
                    </span>
                    {c.deadline && (
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" />
                        Closes {new Date(c.deadline).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {/* Slots bar */}
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary/70 transition-all" style={{ width: `${pct}%` }} />
                  </div>

                  <div className="flex justify-end">
                    {applied ? (
                      <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                        <CheckCircle2 className="h-4 w-4" /> Applied
                      </div>
                    ) : full ? (
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-bold">
                        <AlertCircle className="h-4 w-4" /> Slots full
                      </div>
                    ) : !user ? (
                      <Button size="sm" className="rounded-xl font-bold" onClick={() => toast({ title: "Sign in to apply" })}>
                        Apply
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="rounded-xl font-bold gap-1.5"
                        onClick={() => { setSelected(c); setPitch("") }}
                      >
                        <Trophy className="h-3.5 w-3.5" />
                        Apply — {c.coin_cost > 0 ? `${c.coin_cost} HC` : "Free"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Apply dialog */}
      <Dialog open={!!selected} onOpenChange={open => { if (!open) setSelected(null) }}>
        <DialogContent className="rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="font-black">Apply to Campaign</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 pt-1">
              <div className="p-3 rounded-xl bg-muted/50 space-y-1">
                <p className="text-sm font-black text-foreground">{selected.title}</p>
                {selected.brand_name && <p className="text-xs text-muted-foreground">{selected.brand_name}</p>}
              </div>

              {selected.coin_cost > 0 && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
                  <Coins className="h-4 w-4 text-amber-500 shrink-0" />
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                    <span className="font-black">{selected.coin_cost} Halal Coins</span> will be burned when you apply.
                    {user && user.halalCoinsBalance < selected.coin_cost && (
                      <span className="text-red-600 font-black"> You only have {user.halalCoinsBalance} HC.</span>
                    )}
                  </p>
                </div>
              )}

              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Your Pitch <span className="text-muted-foreground font-normal">(optional)</span></Label>
                <Textarea
                  placeholder="Tell the brand why you're the right fit…"
                  value={pitch}
                  onChange={e => setPitch(e.target.value)}
                  className="rounded-xl resize-none"
                  rows={4}
                />
              </div>

              <Button
                className="w-full rounded-xl font-bold"
                onClick={apply}
                disabled={applying || (!!user && user.halalCoinsBalance < selected.coin_cost)}
              >
                {applying ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Submit Application
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
