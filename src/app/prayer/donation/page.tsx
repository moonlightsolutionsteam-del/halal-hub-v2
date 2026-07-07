
"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  ArrowLeft, Heart, Droplets, Utensils, GraduationCap, Home,
  Moon, HandHeart, ChevronRight, ShieldCheck
} from "lucide-react"

const CAUSES = [
  { id: "sadaqah", name: "General Sadaqah", desc: "Where the need is greatest", icon: HandHeart, bg: "bg-pink-100 dark:bg-pink-950/40", color: "text-pink-600" },
  { id: "water", name: "Water Wells", desc: "Clean water for a village", icon: Droplets, bg: "bg-sky-100 dark:bg-sky-950/40", color: "text-sky-600" },
  { id: "food", name: "Feed the Hungry", desc: "Iftar & food parcels", icon: Utensils, bg: "bg-orange-100 dark:bg-orange-950/40", color: "text-orange-600" },
  { id: "orphan", name: "Orphan Care", desc: "Sponsor a child's needs", icon: Heart, bg: "bg-rose-100 dark:bg-rose-950/40", color: "text-rose-600" },
  { id: "education", name: "Islamic Education", desc: "Support madrasas & students", icon: GraduationCap, bg: "bg-violet-100 dark:bg-violet-950/40", color: "text-violet-600" },
  { id: "masjid", name: "Masjid Fund", desc: "Build & maintain mosques", icon: Home, bg: "bg-emerald-100 dark:bg-emerald-950/40", color: "text-emerald-600" },
]

const AMOUNTS = [100, 250, 500, 1000, 2500, 5000]

export default function DonationPage() {
  const [cause, setCause] = useState("sadaqah")
  const [amount, setAmount] = useState<number | null>(500)
  const [custom, setCustom] = useState("")

  const activeAmount = custom ? parseInt(custom) || 0 : amount ?? 0
  const selectedCause = CAUSES.find(c => c.id === cause)!

  return (
    <div className="max-w-2xl mx-auto pb-28 px-4 py-5 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/prayer-times" className="w-9 h-9 rounded-xl border border-border/50 flex items-center justify-center hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-base font-black">Give Sadaqah</h1>
          <p className="text-[10px] text-muted-foreground">One-time giving to a verified cause</p>
        </div>
      </div>

      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-br from-pink-500/10 via-primary/5 to-transparent border border-pink-500/10 p-5 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-pink-500/15 flex items-center justify-center">
            <HandHeart className="h-5 w-5 text-pink-600" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-600">Sadaqah Jariyah</p>
            <h2 className="text-lg font-black text-foreground leading-tight">Give With Barakah</h2>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          "The believer's shade on the Day of Resurrection will be their charity." — Every rupee reaches a verified cause.
        </p>
      </div>

      {/* Cause selection */}
      <section className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Choose a Cause</p>
        <div className="grid grid-cols-2 gap-2.5">
          {CAUSES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCause(c.id)}
              className={cn(
                "text-left rounded-2xl border p-3.5 space-y-2 transition-all",
                cause === c.id ? "border-primary ring-2 ring-primary/20 bg-primary/5" : "border-border/50 bg-card hover:bg-muted/30"
              )}
            >
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", c.bg)}>
                <c.icon className={cn("h-4 w-4", c.color)} />
              </div>
              <div>
                <p className="text-[12px] font-black text-foreground">{c.name}</p>
                <p className="text-[10px] text-muted-foreground leading-snug">{c.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Amount selection */}
      <section className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Select Amount</p>
        <div className="grid grid-cols-3 gap-2.5">
          {AMOUNTS.map((amt) => (
            <button
              key={amt}
              onClick={() => { setAmount(amt); setCustom("") }}
              className={cn(
                "rounded-2xl border py-3 font-black text-sm transition-all",
                !custom && amount === amt ? "border-primary ring-2 ring-primary/20 bg-primary/5 text-primary" : "border-border/50 bg-card text-foreground hover:bg-muted/30"
              )}
            >
              ₹{amt.toLocaleString("en-IN")}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-muted-foreground">₹</span>
          <input
            type="number"
            inputMode="numeric"
            value={custom}
            onChange={(e) => { setCustom(e.target.value); setAmount(null) }}
            placeholder="Enter custom amount"
            className="w-full h-12 rounded-2xl border border-border/60 bg-background pl-8 pr-4 text-sm font-black focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
      </section>

      {/* Trust note */}
      <div className="flex items-start gap-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl px-3.5 py-3">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
        <p className="text-[10px] text-emerald-700 dark:text-emerald-400 leading-relaxed">
          100% of your donation reaches the cause. HalalHub partners only with verified, accountable NGOs — 80G receipts issued for eligible donations.
        </p>
      </div>

      {/* Sticky give button */}
      <button
        disabled={activeAmount < 1}
        className="w-full h-14 rounded-2xl bg-primary text-white font-black text-sm hover:bg-primary/90 disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
      >
        <Heart className="h-4 w-4 fill-current" />
        Donate ₹{activeAmount.toLocaleString("en-IN")} to {selectedCause.name}
      </button>

      {/* Zakat cross-link */}
      <Link href="/zakat" className="group block">
        <div className="rounded-3xl border border-border/50 bg-card p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <Moon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-black text-foreground">Calculating your Zakat?</p>
            <p className="text-[11px] text-muted-foreground">Use the Zakat calculator to work out what's due</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </div>
      </Link>
    </div>
  )
}
