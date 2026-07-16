"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Coins, Loader2, AlertCircle, Info, CheckCircle2,
  ChevronLeft, ChevronRight, RefreshCw, Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getZakatInfo, calculateZakat, type ZakatInfo, type ZakatCalculationResult } from "@/lib/ummah-api"

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-muted", className)} />
}

// Per-troy-oz → per-gram conversion
const TROY_OZ_TO_GRAM = 31.1035

interface LivePrices { goldPerGram: number; silverPerGram: number; currency: string; fetched: boolean; error: boolean }

async function fetchLiveMetalPrices(): Promise<{ gold: number; silver: number }> {
  // metals.live — free, no auth needed, returns prices per troy oz in USD
  const res = await fetch("https://api.metals.live/v1/spot/gold,silver", { cache: "no-store" })
  if (!res.ok) throw new Error("metals API error")
  const data = await res.json() as Array<{ gold?: number; silver?: number }>
  let gold = 0, silver = 0
  for (const item of data) {
    if (item.gold) gold = item.gold
    if (item.silver) silver = item.silver
  }
  if (!gold || !silver) throw new Error("prices missing")
  return { gold: parseFloat((gold / TROY_OZ_TO_GRAM).toFixed(2)), silver: parseFloat((silver / TROY_OZ_TO_GRAM).toFixed(2)) }
}

const STEPS = ["Assets", "Metals", "Deductions", "Result"] as const

const initialAssets = { cash: "", business_goods: "", stocks: "" }
const initialMetals = { gold_grams: "", silver_grams: "" }
const initialDebts = { debts: "" }

export default function ZakatPage() {
  const [info, setInfo] = useState<ZakatInfo | null>(null)
  const [infoLoading, setInfoLoading] = useState(true)

  const [livePrice, setLivePrice] = useState<LivePrices>({
    goldPerGram: 97, silverPerGram: 1.05, currency: "USD", fetched: false, error: false,
  })
  const [priceLoading, setPriceLoading] = useState(false)

  const [step, setStep] = useState(0)
  const [assets, setAssets] = useState(initialAssets)
  const [metals, setMetals] = useState(initialMetals)
  const [debts, setDebts] = useState(initialDebts)
  const [nisabStandard, setNisabStandard] = useState<"gold" | "silver">("gold")

  const [result, setResult] = useState<ZakatCalculationResult | null>(null)
  const [calculating, setCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getZakatInfo()
      .then(setInfo)
      .catch(() => {})
      .finally(() => setInfoLoading(false))
  }, [])

  const fetchPrices = useCallback(async () => {
    setPriceLoading(true)
    try {
      const { gold, silver } = await fetchLiveMetalPrices()
      setLivePrice({ goldPerGram: gold, silverPerGram: silver, currency: "USD", fetched: true, error: false })
    } catch {
      setLivePrice((p) => ({ ...p, fetched: false, error: true }))
    } finally {
      setPriceLoading(false)
    }
  }, [])

  useEffect(() => { fetchPrices() }, [fetchPrices])

  const handleCalculate = async () => {
    setCalculating(true)
    setError(null)
    try {
      const res = await calculateZakat({
        cash: Number(assets.cash) || 0,
        gold_grams: Number(metals.gold_grams) || 0,
        gold_price_per_gram: livePrice.goldPerGram,
        silver_grams: Number(metals.silver_grams) || 0,
        silver_price_per_gram: livePrice.silverPerGram,
        business_goods: Number(assets.business_goods) || 0,
        stocks: Number(assets.stocks) || 0,
        debts: Number(debts.debts) || 0,
      })
      setResult(res)
      setStep(3)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation failed")
    } finally {
      setCalculating(false)
    }
  }

  const progress = ((step + 1) / STEPS.length) * 100

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-2">
          <Coins className="h-7 w-7 text-primary" />Zakat Calculator
        </h1>
        <p className="text-sm font-bold text-muted-foreground">Calculate your obligatory annual charity — 2.5% of net zakatable wealth</p>
      </div>

      {/* Live price banner */}
      <Card className={cn("rounded-2xl border-none shadow-sm", livePrice.error ? "bg-amber-50 dark:bg-amber-950/30" : "bg-emerald-50 dark:bg-emerald-950/30")}>
        <CardContent className="p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Live Metal Prices (USD)</p>
            {priceLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />Fetching live prices…
              </div>
            ) : livePrice.error ? (
              <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Using estimate prices — live fetch failed</p>
            ) : (
              <div className="flex items-center gap-3 text-sm font-black">
                <span className="text-foreground">Gold: <span className="text-primary">${livePrice.goldPerGram}/g</span></span>
                <span className="text-muted-foreground">·</span>
                <span className="text-foreground">Silver: <span className="text-primary">${livePrice.silverPerGram}/g</span></span>
                {livePrice.fetched && <Badge variant="secondary" className="text-[9px]">LIVE</Badge>}
              </div>
            )}
          </div>
          <Button variant="ghost" size="icon" className="rounded-full shrink-0" onClick={fetchPrices} disabled={priceLoading}>
            <RefreshCw className={cn("h-4 w-4", priceLoading && "animate-spin")} />
          </Button>
        </CardContent>
      </Card>

      {/* Nisab standard selector */}
      <div className="flex items-center gap-3">
        <p className="text-xs font-black uppercase text-muted-foreground tracking-widest shrink-0">Nisab Standard:</p>
        <div className="flex rounded-full bg-muted p-1 gap-1">
          {(["gold", "silver"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setNisabStandard(s)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-bold transition-all",
                nisabStandard === s ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {s === "gold" ? "🥇 Gold (85g)" : "🥈 Silver (595g)"}
            </button>
          ))}
        </div>
      </div>

      {/* Step progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-black text-muted-foreground">
          {STEPS.map((s, i) => (
            <button key={s} onClick={() => i < step || step === 3 ? setStep(i) : undefined}
              className={cn("transition-colors", i <= step ? "text-primary" : "text-muted-foreground/40")}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step content */}
      <Card className="rounded-[2rem] border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-black flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center">{step + 1}</span>
            {STEPS[step]}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">

          {/* Step 0: Cash & liquid assets */}
          {step === 0 && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground font-medium">Enter amounts in USD. Include all cash, savings, and receivables you have held for one lunar year (hawl).</p>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-black uppercase text-muted-foreground">Cash, Savings & Bank Balances</Label>
                  <Input type="number" min="0" placeholder="0" value={assets.cash}
                    onChange={(e) => setAssets((p) => ({ ...p, cash: e.target.value }))} className="rounded-xl text-base" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-black uppercase text-muted-foreground">Business Goods / Trade Stock</Label>
                  <Input type="number" min="0" placeholder="0" value={assets.business_goods}
                    onChange={(e) => setAssets((p) => ({ ...p, business_goods: e.target.value }))} className="rounded-xl text-base" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-black uppercase text-muted-foreground">Stocks & Investments (liquid value)</Label>
                  <Input type="number" min="0" placeholder="0" value={assets.stocks}
                    onChange={(e) => setAssets((p) => ({ ...p, stocks: e.target.value }))} className="rounded-xl text-base" />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Gold & Silver */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground font-medium">Enter weight in grams. Prices are auto-filled from live market data — verify for accuracy.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-200/50 dark:border-amber-800/30">
                  <p className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest">Gold</p>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-muted-foreground">Weight (grams)</Label>
                    <Input type="number" min="0" placeholder="0" value={metals.gold_grams}
                      onChange={(e) => setMetals((p) => ({ ...p, gold_grams: e.target.value }))} className="rounded-xl" />
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
                    <span>Price/gram</span>
                    <span className="text-primary font-black">${livePrice.goldPerGram}</span>
                  </div>
                  {metals.gold_grams && (
                    <div className="flex items-center justify-between text-sm font-bold">
                      <span className="text-muted-foreground">Value</span>
                      <span className="text-foreground">${(Number(metals.gold_grams) * livePrice.goldPerGram).toLocaleString()}</span>
                    </div>
                  )}
                  {info && (
                    <p className="text-[10px] text-muted-foreground">Nisab threshold: {info.nisab.gold.grams}g</p>
                  )}
                </div>

                <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-slate-700/30">
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Silver</p>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-muted-foreground">Weight (grams)</Label>
                    <Input type="number" min="0" placeholder="0" value={metals.silver_grams}
                      onChange={(e) => setMetals((p) => ({ ...p, silver_grams: e.target.value }))} className="rounded-xl" />
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
                    <span>Price/gram</span>
                    <span className="text-primary font-black">${livePrice.silverPerGram}</span>
                  </div>
                  {metals.silver_grams && (
                    <div className="flex items-center justify-between text-sm font-bold">
                      <span className="text-muted-foreground">Value</span>
                      <span className="text-foreground">${(Number(metals.silver_grams) * livePrice.silverPerGram).toLocaleString()}</span>
                    </div>
                  )}
                  {info && (
                    <p className="text-[10px] text-muted-foreground">Nisab threshold: {info.nisab.silver.grams}g</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Deductions */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground font-medium">Subtract immediate debts and liabilities. Only debts due within the next lunar year count.</p>
              <div className="space-y-1.5">
                <Label className="text-xs font-black uppercase text-muted-foreground">Debts Owed (immediate liabilities)</Label>
                <Input type="number" min="0" placeholder="0" value={debts.debts}
                  onChange={(e) => setDebts({ debts: e.target.value })} className="rounded-xl text-base" />
              </div>
              {/* Summary before calculating */}
              <div className="mt-4 p-4 rounded-2xl bg-muted/50 space-y-2 text-sm">
                <p className="text-xs font-black uppercase text-muted-foreground tracking-widest mb-3">Summary</p>
                {[
                  { label: "Cash & Savings", value: Number(assets.cash) || 0 },
                  { label: "Business Goods", value: Number(assets.business_goods) || 0 },
                  { label: "Stocks", value: Number(assets.stocks) || 0 },
                  { label: "Gold", value: (Number(metals.gold_grams) || 0) * livePrice.goldPerGram },
                  { label: "Silver", value: (Number(metals.silver_grams) || 0) * livePrice.silverPerGram },
                ].map(({ label, value }) => value > 0 && (
                  <div key={label} className="flex justify-between font-bold">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="text-foreground">${value.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold border-t border-border pt-2 mt-2">
                  <span className="text-muted-foreground">Debts</span>
                  <span className="text-destructive">-${(Number(debts.debts) || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-black text-base border-t border-border pt-2">
                  <span className="text-foreground">Net Wealth</span>
                  <span className="text-primary">${(
                    (Number(assets.cash) || 0) + (Number(assets.business_goods) || 0) + (Number(assets.stocks) || 0) +
                    (Number(metals.gold_grams) || 0) * livePrice.goldPerGram +
                    (Number(metals.silver_grams) || 0) * livePrice.silverPerGram -
                    (Number(debts.debts) || 0)
                  ).toLocaleString()}</span>
                </div>
              </div>
              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-xl">
                  <AlertCircle className="h-4 w-4 shrink-0" />{error}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Result */}
          {step === 3 && result && (
            <div className="space-y-4">
              <div className={cn(
                "p-6 rounded-2xl text-center space-y-3",
                result.above_nisab ? "bg-gradient-to-br from-primary to-emerald-400 text-white" : "bg-muted/50"
              )}>
                <div className="flex items-center justify-center gap-2">
                  {result.above_nisab
                    ? <><Sparkles className="h-5 w-5" /><span className="text-sm font-black uppercase tracking-widest opacity-90">Zakat Is Due</span></>
                    : <><Info className="h-5 w-5 text-muted-foreground" /><span className="text-sm font-black uppercase tracking-widest text-muted-foreground">Below Nisab</span></>
                  }
                </div>
                <p className={cn("text-5xl font-black tabular-nums", !result.above_nisab && "text-foreground")}>
                  ${result.zakat_due_formatted}
                </p>
                <p className={cn("text-xs", result.above_nisab ? "opacity-80" : "text-muted-foreground")}>{result.note}</p>
              </div>

              <div className="space-y-2 text-sm">
                {[
                  { label: "Gross Wealth", value: `$${result.breakdown.gross_wealth.toLocaleString()}` },
                  { label: "Liabilities", value: `-$${result.breakdown.liabilities.toLocaleString()}`, className: "text-destructive" },
                  { label: "Net Zakatable", value: `$${result.breakdown.net_zakatable_wealth.toLocaleString()}` },
                  { label: `Nisab (${nisabStandard})`, value: `$${result.nisab_value.toLocaleString()}` },
                  { label: "Rate", value: result.rate },
                ].map(({ label, value, className }) => (
                  <div key={label} className="flex justify-between py-1.5 border-b border-border/50 font-bold">
                    <span className="text-muted-foreground">{label}</span>
                    <span className={cn("text-foreground", className)}>{value}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full rounded-full" onClick={() => { setResult(null); setStep(0); setAssets(initialAssets); setMetals(initialMetals); setDebts(initialDebts) }}>
                Start Over
              </Button>
            </div>
          )}

          {/* Navigation */}
          {step < 3 && (
            <div className="flex gap-3 pt-2">
              {step > 0 && (
                <Button variant="outline" className="flex-1 rounded-full" onClick={() => setStep((s) => s - 1)}>
                  <ChevronLeft className="h-4 w-4 mr-1" />Back
                </Button>
              )}
              {step < 2 ? (
                <Button className="flex-1 rounded-full font-bold" onClick={() => setStep((s) => s + 1)}>
                  Continue<ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button className="flex-1 rounded-full font-bold h-12" onClick={handleCalculate} disabled={calculating}>
                  {calculating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Coins className="h-4 w-4 mr-2" />}
                  Calculate Zakat
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info cards */}
      {!infoLoading && info && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="rounded-[2rem] border-none shadow-sm">
            <CardHeader><CardTitle className="text-base font-black">Conditions for Zakat</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {info.conditions.map((c, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />{c}
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-[2rem] border-none shadow-sm">
            <CardHeader><CardTitle className="text-base font-black">Eligible Recipients</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {info.eligible_recipients.map((r, i) => (
                <Badge key={i} variant="secondary" className="font-bold text-xs">{r}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
