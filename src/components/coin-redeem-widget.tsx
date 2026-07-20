"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { redeemCoins } from "@/lib/gamification/redeem-coins"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Coins, CheckCircle2, Loader2, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface CoinRedeemWidgetProps {
  userId: string
  orderValueInr?: number          // optional: cap by max_redeem_pct of order
  onRedeemed?: (discountInr: number, coinsSpent: number) => void
  className?: string
}

type Config = {
  coins_per_rupee: number
  max_redeem_pct: number
  min_redeem_coins: number
}

export function CoinRedeemWidget({ userId, orderValueInr, onRedeemed, className }: CoinRedeemWidgetProps) {
  const { toast } = useToast()
  const [balance, setBalance] = useState(0)
  const [config, setConfig] = useState<Config>({ coins_per_rupee: 10, max_redeem_pct: 20, min_redeem_coins: 50 })
  const [coins, setCoins] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(true)
  const [redeeming, setRedeeming] = useState(false)
  const [redeemed, setRedeemed] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("user_levels").select("current_balance").eq("user_id", userId).single(),
      supabase.from("coin_config").select("coins_per_rupee, max_redeem_pct, min_redeem_coins").eq("id", 1).single(),
    ]).then(([lvlRes, cfgRes]) => {
      const bal = lvlRes.data?.current_balance ?? 0
      const cfg = cfgRes.data ?? config
      setBalance(bal)
      setConfig(cfg)

      // Default slider to either full balance or cap
      const maxByOrder = orderValueInr
        ? Math.floor((orderValueInr * cfg.max_redeem_pct / 100) * cfg.coins_per_rupee)
        : bal
      setCoins(Math.min(bal, maxByOrder))
      setLoading(false)
    })
  }, [userId])

  const maxCoins = (() => {
    if (orderValueInr) {
      const capByOrder = Math.floor((orderValueInr * config.max_redeem_pct / 100) * config.coins_per_rupee)
      return Math.min(balance, capByOrder)
    }
    return balance
  })()

  const discountInr = parseFloat((coins / config.coins_per_rupee).toFixed(2))
  const canRedeem = coins >= config.min_redeem_coins && balance >= coins

  async function handleRedeem() {
    if (!canRedeem) return
    setRedeeming(true)
    const result = await redeemCoins(userId, coins, { context: "order_discount" })
    if (result.ok) {
      setBalance(result.newBalance)
      setRedeemed(true)
      onRedeemed?.(result.discountInr, result.coinsSpent)
      toast({
        title: `₹${result.discountInr} discount applied!`,
        description: `${result.coinsSpent} Halal Coins redeemed. New balance: ${result.newBalance} HC`,
      })
    } else {
      toast({ title: "Redemption failed", description: result.reason, variant: "destructive" })
    }
    setRedeeming(false)
  }

  if (loading) return null
  if (balance < config.min_redeem_coins) return null

  if (redeemed) {
    return (
      <div className={cn("flex items-center gap-2 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30", className)}>
        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
        <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
          ₹{discountInr} discount applied from {coins} HC
        </p>
      </div>
    )
  }

  return (
    <div className={cn("rounded-2xl border border-amber-100 dark:border-amber-900/30 bg-amber-50/50 dark:bg-amber-950/10 overflow-hidden", className)}>
      <button
        className="w-full flex items-center justify-between p-4 gap-3"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-center gap-2">
          <Coins className="h-4 w-4 text-amber-500 shrink-0" />
          <div className="text-left">
            <p className="text-sm font-black text-foreground">Use Halal Coins</p>
            <p className="text-xs text-muted-foreground">{balance.toLocaleString()} HC available · {config.coins_per_rupee} HC = ₹1</p>
          </div>
        </div>
        {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-amber-100 dark:border-amber-900/30 pt-3">
          {orderValueInr && (
            <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
              Max discount capped at {config.max_redeem_pct}% of order value (₹{(orderValueInr * config.max_redeem_pct / 100).toFixed(2)})
            </p>
          )}

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-muted-foreground">{config.min_redeem_coins} HC</span>
              <span className="text-amber-600">{coins.toLocaleString()} HC selected</span>
              <span className="text-muted-foreground">{maxCoins.toLocaleString()} HC</span>
            </div>
            <Slider
              min={config.min_redeem_coins}
              max={maxCoins}
              step={config.min_redeem_coins}
              value={[coins]}
              onValueChange={([v]) => setCoins(v)}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-lg font-black text-emerald-600">−₹{discountInr}</p>
              <p className="text-xs text-muted-foreground">discount from {coins.toLocaleString()} HC</p>
            </div>
            <Button
              className="rounded-xl font-bold gap-1.5"
              disabled={!canRedeem || redeeming}
              onClick={handleRedeem}
            >
              {redeeming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Coins className="h-4 w-4" />}
              Apply Discount
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
