"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Coins, Loader2, AlertCircle, Info, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  getZakatInfo, calculateZakat,
  type ZakatInfo, type ZakatCalculationResult,
} from "@/lib/ummah-api"

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-muted", className)} />
}

const initialForm = {
  cash: "",
  gold_grams: "",
  gold_price_per_gram: "80",
  silver_grams: "",
  silver_price_per_gram: "1",
  business_goods: "",
  stocks: "",
  debts: "",
}

export default function ZakatPage() {
  const [info, setInfo] = useState<ZakatInfo | null>(null)
  const [infoLoading, setInfoLoading] = useState(true)
  const [form, setForm] = useState(initialForm)
  const [result, setResult] = useState<ZakatCalculationResult | null>(null)
  const [calculating, setCalculating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getZakatInfo()
      .then(setInfo)
      .catch(() => {})
      .finally(() => setInfoLoading(false))
  }, [])

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleCalculate = async () => {
    setCalculating(true)
    setError(null)
    setResult(null)
    try {
      const res = await calculateZakat({
        cash: Number(form.cash) || 0,
        gold_grams: Number(form.gold_grams) || 0,
        gold_price_per_gram: Number(form.gold_price_per_gram) || 0,
        silver_grams: Number(form.silver_grams) || 0,
        silver_price_per_gram: Number(form.silver_price_per_gram) || 0,
        business_goods: Number(form.business_goods) || 0,
        stocks: Number(form.stocks) || 0,
        debts: Number(form.debts) || 0,
      })
      setResult(res)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to calculate zakat")
    } finally {
      setCalculating(false)
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-2">
          <Coins className="h-7 w-7 text-primary" />Zakat Calculator
        </h1>
        <p className="text-sm font-bold text-muted-foreground">Calculate your obligatory annual charity (2.5% of qualifying wealth)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator form */}
        <Card className="lg:col-span-2 rounded-[2rem] border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-black">Your Wealth</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-black uppercase text-muted-foreground">Cash & Savings</Label>
                <Input type="number" placeholder="0" value={form.cash} onChange={handleChange("cash")} className="rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-black uppercase text-muted-foreground">Business Goods / Trade</Label>
                <Input type="number" placeholder="0" value={form.business_goods} onChange={handleChange("business_goods")} className="rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-black uppercase text-muted-foreground">Gold (grams)</Label>
                <Input type="number" placeholder="0" value={form.gold_grams} onChange={handleChange("gold_grams")} className="rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-black uppercase text-muted-foreground">Gold Price / Gram ($)</Label>
                <Input type="number" placeholder="80" value={form.gold_price_per_gram} onChange={handleChange("gold_price_per_gram")} className="rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-black uppercase text-muted-foreground">Silver (grams)</Label>
                <Input type="number" placeholder="0" value={form.silver_grams} onChange={handleChange("silver_grams")} className="rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-black uppercase text-muted-foreground">Silver Price / Gram ($)</Label>
                <Input type="number" placeholder="1" value={form.silver_price_per_gram} onChange={handleChange("silver_price_per_gram")} className="rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-black uppercase text-muted-foreground">Stocks & Investments</Label>
                <Input type="number" placeholder="0" value={form.stocks} onChange={handleChange("stocks")} className="rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-black uppercase text-muted-foreground">Debts Owed (deduct)</Label>
                <Input type="number" placeholder="0" value={form.debts} onChange={handleChange("debts")} className="rounded-xl" />
              </div>
            </div>
            <Button onClick={handleCalculate} disabled={calculating} className="w-full rounded-full h-12 font-bold">
              {calculating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Coins className="h-4 w-4 mr-2" />}
              Calculate Zakat
            </Button>
            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-xl">
                <AlertCircle className="h-4 w-4 shrink-0" />{error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Result */}
        <div className="space-y-4">
          {result ? (
            <Card className={cn(
              "rounded-[2rem] border-none shadow-sm",
              result.above_nisab ? "bg-gradient-to-br from-primary to-emerald-400 text-white" : "bg-muted/50"
            )}>
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  {result.above_nisab ? <CheckCircle2 className="h-5 w-5" /> : <Info className="h-5 w-5" />}
                  <p className={cn("text-xs font-black uppercase tracking-widest", result.above_nisab ? "opacity-90" : "text-muted-foreground")}>
                    {result.above_nisab ? "Zakat is Due" : "Below Nisab"}
                  </p>
                </div>
                <p className="text-4xl font-black">${result.zakat_due_formatted}</p>
                <p className={cn("text-xs", result.above_nisab ? "opacity-80" : "text-muted-foreground")}>{result.note}</p>
                <div className="pt-3 border-t border-white/20 space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="opacity-80">Gross Wealth</span><span className="font-bold">${result.breakdown.gross_wealth.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="opacity-80">Liabilities</span><span className="font-bold">-${result.breakdown.liabilities.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="opacity-80">Net Zakatable</span><span className="font-bold">${result.breakdown.net_zakatable_wealth.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="opacity-80">Nisab ({result.nisab_standard})</span><span className="font-bold">${result.nisab_value.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="opacity-80">Rate</span><span className="font-bold">{result.rate}</span></div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="rounded-[2rem] border-none shadow-sm bg-muted/30">
              <CardContent className="p-6 text-center space-y-2">
                <Coins className="h-10 w-10 mx-auto text-muted-foreground opacity-50" />
                <p className="text-sm font-bold text-muted-foreground">Enter your wealth details to calculate your zakat obligation</p>
              </CardContent>
            </Card>
          )}

          {infoLoading ? (
            <Skeleton className="h-40" />
          ) : info && (
            <Card className="rounded-[2rem] border-none shadow-sm">
              <CardContent className="p-6 space-y-3">
                <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Nisab Thresholds</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground font-bold">Gold Standard</span>
                  <Badge variant="secondary">{info.nisab.gold.grams}g</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground font-bold">Silver Standard</span>
                  <Badge variant="secondary">{info.nisab.silver.grams}g</Badge>
                </div>
                <p className="text-xs text-muted-foreground pt-2 border-t border-border">{info.nisab.note}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {info && (
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
