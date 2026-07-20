"use client"

import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Coins, Loader2, TrendingUp, TrendingDown, Zap, Star, Gift,
  Utensils, BookOpen, Heart, ShoppingBag, History, Trophy,
} from "lucide-react"
import { CoinRedeemWidget } from "@/components/coin-redeem-widget"

type LedgerEntry = {
  id: string
  amount: number
  balance_after: number
  action_type: string
  description: string | null
  season: string | null
  created_at: string | null
}

type UserLevel = {
  level: number
  level_name: string | null
  current_balance: number
  lifetime_coins_earned: number
}

const LEVEL_COLORS: Record<number, { bg: string; text: string; border: string }> = {
  5: { bg: "bg-amber-100",   text: "text-amber-700",   border: "border-amber-200" },
  4: { bg: "bg-violet-100",  text: "text-violet-700",  border: "border-violet-200" },
  3: { bg: "bg-blue-100",    text: "text-blue-700",    border: "border-blue-200" },
  2: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200" },
  1: { bg: "bg-muted",       text: "text-muted-foreground", border: "border-border" },
}

const LEVEL_THRESHOLDS = [
  { level: 5, min: 10000, name: "Community Champion" },
  { level: 4, min: 5000,  name: "HalalHub Regular" },
  { level: 3, min: 2000,  name: "Trusted Reviewer" },
  { level: 2, min: 500,   name: "Community Member" },
  { level: 1, min: 0,     name: "Explorer" },
]

const earnGuide = [
  { action: "Daily Login",           coins: 5,   icon: Star },
  { action: "Write a Review",        coins: 20,  icon: Star },
  { action: "Publish a Post",        coins: 25,  icon: Zap },
  { action: "Add Review Photo",      coins: 10,  icon: Star },
  { action: "Add Review Video",      coins: 25,  icon: Zap },
  { action: "Complete Profile",      coins: 30,  icon: Gift },
  { action: "Refer a Consumer",      coins: 50,  icon: Gift },
  { action: "Refer a Creator",       coins: 100, icon: Gift },
  { action: "Refer a Business",      coins: 150, icon: Gift },
  { action: "7-Day Streak",          coins: 25,  icon: Zap },
  { action: "30-Day Streak",         coins: 100, icon: Zap },
  { action: "90-Day Streak",         coins: 300, icon: Zap },
]

const KaabaIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
    <path d="M3.5 3.5L10 8.5L3.5 13.5L10.5 20.5L15.5 15.5L20.5 20.5L13.5 10L20.5 3.5L3.5 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M10 8.5L13.5 10L15.5 15.5L10.5 20.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
)

const rewardCatalogue = [
  {
    icon: <Utensils className="h-7 w-7 text-primary" />,
    title: "Family Iftar Voucher",
    description: "₹50 voucher for a local halal restaurant",
    category: "Dining",
    coins: 2000,
  },
  {
    icon: <BookOpen className="h-7 w-7 text-primary" />,
    title: "Islamic Book Collection",
    description: "Set of 5 Islamic children's books",
    category: "Education",
    coins: 1500,
  },
  {
    icon: <KaabaIcon />,
    title: "Family Umrah Fund",
    description: "Contribution to family Umrah savings",
    category: "Pilgrimage",
    coins: 5000,
  },
  {
    icon: <Heart className="h-7 w-7 text-primary" />,
    title: "Donate to Charity",
    description: "Donate your coins to a partner charity",
    category: "Charity",
    coins: 100,
  },
  {
    icon: <ShoppingBag className="h-7 w-7 text-primary" />,
    title: "Fashion Voucher",
    description: "Discount at a modest fashion store",
    category: "Shopping",
    coins: 1200,
  },
]

const REWARD_CATEGORIES = ["All", "Dining", "Education", "Pilgrimage", "Charity", "Shopping"]

export default function WalletPage() {
  const { user } = useAuth()
  const [ledger, setLedger] = useState<LedgerEntry[]>([])
  const [levelData, setLevelData] = useState<UserLevel | null>(null)
  const [loading, setLoading] = useState(true)
  const [balance, setBalance] = useState(0)
  const [rewardCategory, setRewardCategory] = useState("All")

  useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    const db = supabase as any
    Promise.all([
      db.from("coin_ledger")
        .select("id, amount, balance_after, action_type, description, season, created_at")
        .eq("user_id", user.uid)
        .order("created_at", { ascending: false })
        .limit(50),
      db.from("user_levels")
        .select("level, level_name, current_balance, lifetime_coins_earned")
        .eq("user_id", user.uid)
        .single(),
    ]).then(([ledgerRes, levelRes]: [any, any]) => {
      setLedger(ledgerRes.data ?? [])
      setLevelData(levelRes.data ?? null)
      setBalance(levelRes.data?.current_balance ?? user.halalCoinsBalance ?? 0)
      setLoading(false)
    })
  }, [user?.uid])

  const currentLevel = levelData?.level ?? 1
  const levelName = levelData?.level_name ?? "Explorer"
  const lifetime = levelData?.lifetime_coins_earned ?? 0
  const nextThreshold = LEVEL_THRESHOLDS.find(t => t.level === currentLevel + 1)
  const progressPct = nextThreshold
    ? Math.min(100, Math.round((lifetime / nextThreshold.min) * 100))
    : 100
  const levelColors = LEVEL_COLORS[currentLevel] ?? LEVEL_COLORS[1]
  const totalEarned = ledger.filter(e => e.amount > 0).reduce((s, e) => s + e.amount, 0)
  const totalSpent  = ledger.filter(e => e.amount < 0).reduce((s, e) => s + Math.abs(e.amount), 0)

  const filteredRewards = rewardCategory === "All"
    ? rewardCatalogue
    : rewardCatalogue.filter(r => r.category === rewardCategory)

  return (
    <div className="p-4 md:p-6 space-y-5 max-w-lg mx-auto">

      {/* Balance hero */}
      <Card className="rounded-3xl border-none shadow-md bg-gradient-to-br from-amber-400 to-amber-500 text-white overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold opacity-80">Halal Coins</p>
            <Badge className={`text-[10px] px-2.5 py-1 border font-bold ${levelColors.bg} ${levelColors.text} ${levelColors.border}`}>
              Lv {currentLevel} · {levelName}
            </Badge>
          </div>
          <div>
            <p className="text-5xl font-black tracking-tight">
              {loading ? "—" : balance.toLocaleString()}
            </p>
            <p className="text-sm font-medium opacity-75 mt-1">
              {lifetime.toLocaleString()} earned lifetime · 10 HC = ₹1
            </p>
          </div>
          {nextThreshold && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold opacity-80">
                <span>{levelName}</span>
                <span>{nextThreshold.name}</span>
              </div>
              <div className="h-2 rounded-full bg-white/30 overflow-hidden">
                <div className="h-full rounded-full bg-white transition-all" style={{ width: `${progressPct}%` }} />
              </div>
              <p className="text-xs opacity-70 text-right">
                {(nextThreshold.min - lifetime).toLocaleString()} HC to next level
              </p>
            </div>
          )}
          {currentLevel === 5 && (
            <p className="text-xs font-bold opacity-80">Community Champion — highest level reached!</p>
          )}
        </CardContent>
      </Card>

      {/* Quick stats */}
      {!loading && (
        <div className="grid grid-cols-2 gap-3">
          <Card className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-base font-black text-emerald-600">+{totalEarned.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground font-medium">Earned (last 50)</p>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-rose-50 flex items-center justify-center">
                <TrendingDown className="h-4 w-4 text-rose-600" />
              </div>
              <div>
                <p className="text-base font-black text-rose-600">−{totalSpent.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground font-medium">Spent (last 50)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs: Spend / History / Earn */}
      <Tabs defaultValue="rewards">
        <TabsList className="rounded-full h-11 w-full">
          <TabsTrigger value="rewards" className="rounded-full flex-1 gap-1.5">
            <Trophy className="h-3.5 w-3.5" /> Rewards
          </TabsTrigger>
          <TabsTrigger value="spend" className="rounded-full flex-1 gap-1.5">
            <Coins className="h-3.5 w-3.5" /> Spend
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-full flex-1 gap-1.5">
            <History className="h-3.5 w-3.5" /> History
          </TabsTrigger>
        </TabsList>

        {/* Rewards catalogue */}
        <TabsContent value="rewards" className="mt-4 space-y-4">
          {/* Category filter */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {REWARD_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setRewardCategory(cat)}
                className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
                  rewardCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredRewards.map(reward => {
              const canRedeem = balance >= reward.coins
              return (
                <Card key={reward.title} className="rounded-2xl border-none shadow-sm">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      {reward.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-foreground">{reward.title}</p>
                      <p className="text-xs text-muted-foreground">{reward.description}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Coins className="h-3 w-3 text-amber-500" />
                        <span className="text-xs font-black text-amber-600">{reward.coins.toLocaleString()} HC</span>
                        <Badge className="text-[10px] px-1.5 py-0 bg-muted text-muted-foreground border-border ml-1">
                          {reward.category}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="rounded-xl h-8 text-xs font-bold shrink-0"
                      disabled={!canRedeem}
                    >
                      {canRedeem ? "Redeem" : "Need more"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <p className="text-xs text-center text-muted-foreground pt-1">
            More rewards coming soon · Ramadan editions unlock in season
          </p>
        </TabsContent>

        {/* Spend / discount tab */}
        <TabsContent value="spend" className="mt-4 space-y-4">
          <p className="text-xs text-muted-foreground font-medium px-1">
            Apply Halal Coins as a discount on your next order. 10 HC = ₹1.
          </p>
          {user?.uid && !loading ? (
            <CoinRedeemWidget
              userId={user.uid}
              onRedeemed={(discount, coinsSpent) => {
                setBalance(b => b - coinsSpent)
              }}
            />
          ) : (
            <div className="flex justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          )}

          <Card className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-4 space-y-2">
              <p className="text-xs font-black text-foreground">How coin spending works</p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">·</span> Minimum 50 HC per redemption</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">·</span> Discount capped at 20% of order value</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">·</span> Coins burned immediately on redemption</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">·</span> Ramadan seasons give ×2 coins on eligible actions</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transaction history */}
        <TabsContent value="history" className="mt-4">
          <Card className="rounded-2xl border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-black">Transaction History</CardTitle>
              <CardDescription className="text-xs">Last 50 coin activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1 pt-0">
              {loading ? (
                <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
              ) : ledger.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No transactions yet. Start earning by logging in daily or posting!
                </p>
              ) : (
                ledger.map(e => {
                  const isCredit = e.amount > 0
                  const date = new Date(e.created_at ?? "").toLocaleString([], {
                    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
                  })
                  return (
                    <div key={e.id} className="flex items-center gap-3 py-2.5 border-b border-border/50 last:border-0">
                      <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${isCredit ? "bg-emerald-50" : "bg-rose-50"}`}>
                        <Coins className={`h-3.5 w-3.5 ${isCredit ? "text-emerald-600" : "text-rose-600"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground truncate">
                          {e.description ?? e.action_type.replace(/_/g, " ")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {date}
                          {e.season && <span className="ml-1 text-amber-600 font-bold">· {e.season}</span>}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-sm font-black ${isCredit ? "text-emerald-600" : "text-rose-600"}`}>
                          {isCredit ? "+" : ""}{e.amount} HC
                        </p>
                        <p className="text-xs text-muted-foreground">bal {e.balance_after}</p>
                      </div>
                    </div>
                  )
                })
              )}
            </CardContent>
          </Card>

          {/* Earn guide */}
          <Card className="rounded-2xl border-none shadow-sm mt-3">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-black">How to Earn</CardTitle>
              <CardDescription className="text-xs">Ramadan seasons give ×2 coins on eligible actions</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Separator className="mb-3" />
              <div className="space-y-2">
                {earnGuide.map(({ action, coins, icon: Icon }) => (
                  <div key={action} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <p className="text-sm text-foreground">{action}</p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-600 font-black text-sm">
                      <Coins className="h-3.5 w-3.5" />{coins}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
