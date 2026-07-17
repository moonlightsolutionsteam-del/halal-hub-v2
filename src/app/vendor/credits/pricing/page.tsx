"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  MousePointer2, 
  Users2, 
  Star, 
  Rocket,
  Info,
  Layers,
  ArrowUpRight,
  Target,
  Wallet,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

type ActiveSub = {
  plan: string
  status: string
  expires_at: string | null
  business_slots: number | null
  image_slots: number | null
}

const PRICING_PLANS = [
  {
    name: "Starter",
    price: "₹1,000",
    credits: "1,000",
    bonus: "+0",
    desc: "Best for small businesses exploring the hub.",
    features: ["Basic Directory Listing", "Standard Support", "Pay-per-lead active"],
    popular: false,
    color: "text-muted-foreground",
    bg: "bg-muted"
  },
  {
    name: "Growth",
    price: "₹2,500",
    credits: "2,700",
    bonus: "+200",
    desc: "Most Popular for growing neighborhood shops.",
    features: ["Priority Listing Support", "Bonus Credit Pack", "Direct Customer Inquiries"],
    popular: true,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  },
  {
    name: "Pro",
    price: "₹5,000",
    credits: "5,800",
    bonus: "+800",
    desc: "Optimized for high-volume establishments.",
    features: ["Advanced Analytics", "Verification Badge Audit", "Enhanced Visibility"],
    popular: false,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    name: "Elite",
    price: "₹10,000",
    credits: "12,500",
    bonus: "+2,500",
    desc: "Maximum impact for market leaders.",
    features: ["Dedicated Account Manager", "Free Monthly Audit", "Max Bonus Credits"],
    popular: false,
    color: "text-purple-600",
    bg: "bg-purple-50"
  }
];

const ACTIONS = [
  { name: "Boost Listing", cost: "25 credits/day", icon: Rocket, color: "text-blue-500", bg: "bg-blue-50" },
  { name: "Unlock Leads", cost: "10 credits", icon: Users2, color: "text-emerald-500", bg: "bg-emerald-50" },
  { name: "Promote Offers", cost: "40 credits", icon: TagIcon, color: "text-amber-500", bg: "bg-amber-50" },
  { name: "Creator Collab", cost: "30 credits", icon: Star, color: "text-purple-500", bg: "bg-purple-50" },
  { name: "Featured Placement", cost: "300 credits", icon: Zap, color: "text-rose-500", bg: "bg-rose-50" },
  { name: "Market Insights", cost: "100 credits", icon: TrendingUp, color: "text-indigo-500", bg: "bg-indigo-50" },
];

function formatExpiry(iso: string | null): string {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

export default function CreditsPricingPage() {
  const { user, loading: authLoading } = useAuth()
  const [sub, setSub] = React.useState<ActiveSub | null>(null)

  React.useEffect(() => {
    if (authLoading || !user?.uid) return
    const supabase = createClient()
    ;supabase
      .from("businesses").select("id").eq("owner_id", user.uid).limit(1).maybeSingle()
      .then(({ data }: { data: { id: string } | null }) => {
        if (!data) return
        ;supabase
          .from("partner_subscriptions")
          .select("plan, status, expires_at, business_slots, image_slots")
          .eq("business_id", data.id)
          .eq("status", "active")
          .limit(1)
          .maybeSingle()
          .then(({ data: s }: { data: ActiveSub | null }) => {
            if (s) setSub(s)
          })
      })
  }, [user?.uid, authLoading])

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-10 sm:space-y-20 max-w-7xl pb-32 selection:bg-primary/10">
      
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-10">
        <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/20 text-primary font-black uppercase text-[10px] tracking-[0.2em] bg-primary/5">
          Flexible Growth Economy
        </Badge>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-headline text-foreground tracking-tighter leading-tight">
          Fuel Your Business with <span className="text-primary">Hub Credits</span>
        </h1>
        <p className="text-sm sm:text-xl text-muted-foreground font-medium italic">
          No rigid subscriptions. Pay only for the features you use to grow your presence.
        </p>
      </div>

      {/* Active subscription banner */}
      {sub && (
        <div className="max-w-3xl mx-auto w-full">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/30 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            <div className="h-14 w-14 rounded-2xl bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg">
              <CheckCircle2 className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Active Plan</p>
              <h3 className="text-xl font-black text-foreground capitalize">{sub.plan} Pack</h3>
              <p className="text-sm font-medium text-muted-foreground">
                Expires {formatExpiry(sub.expires_at)}
                {sub.business_slots != null && ` · ${sub.business_slots} listing slot${sub.business_slots !== 1 ? "s" : ""}`}
                {sub.image_slots != null && ` · ${sub.image_slots} image slot${sub.image_slots !== 1 ? "s" : ""}`}
              </p>
            </div>
            <Badge className="bg-emerald-500 text-white border-none font-black text-[10px] uppercase px-4 py-1.5 rounded-full">Active</Badge>
          </Card>
        </div>
      )}

      {/* Pricing Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        {PRICING_PLANS.map((plan) => (
          <Card 
            key={plan.name} 
            className={cn(
              "rounded-[3rem] border-none shadow-sm flex flex-col hover:shadow-2xl transition-all duration-500 relative group overflow-hidden",
              plan.popular ? "bg-card ring-4 ring-primary/20 scale-105 z-10" : "bg-card"
            )}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 p-6">
                <Badge className="bg-primary text-white border-none font-black text-[10px] uppercase px-4 h-7">Most Popular</Badge>
              </div>
            )}
            <CardHeader className="p-5 sm:p-10 space-y-4 sm:space-y-6">
              <div className="space-y-1">
                <h3 className={cn("text-xl font-black uppercase tracking-widest", plan.color)}>{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-5xl font-black text-foreground tracking-tighter">{plan.price}</span>
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-muted border-2 border-border space-y-1 shadow-inner group-hover:bg-primary/5 transition-colors">
                <p className="text-xl sm:text-3xl font-black text-foreground tracking-tight">{plan.credits}</p>
                <p className="text-xs font-black uppercase text-muted-foreground">Total Credits</p>
                {plan.bonus !== "+0" && (
                  <Badge className="bg-emerald-500 text-white border-none font-black text-[9px] h-5 px-2 mt-2">{plan.bonus} BONUS</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-0 sm:p-10 sm:pt-0 flex-1 space-y-4 sm:space-y-6">
              <p className="text-sm font-bold text-muted-foreground leading-relaxed italic">"{plan.desc}"</p>
              <div className="space-y-4">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs font-bold text-foreground leading-tight">{f}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-5 pt-0 sm:p-10 sm:pt-0">
              <Button className={cn(
                "w-full h-10 sm:h-14 rounded-xl sm:rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl transition-all group-hover:scale-105 active:scale-95",
                plan.popular ? "bg-primary hover:bg-primary/90 text-white" : "bg-zinc-900 hover:bg-zinc-800 text-white"
              )}>
                Buy {plan.name} Pack
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* How it works */}
      <section className="space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-foreground tracking-tight">How Credits Work</h2>
          <p className="text-muted-foreground font-medium">Three simple steps to scaling your halal brand.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-0.5 bg-muted -translate-y-1/2 z-0" />
          {[
            { step: "01", title: "Buy Credits", desc: "Purchase credit packs that suit your monthly growth budget.", icon: Wallet, color: "bg-blue-100 text-blue-600" },
            { step: "02", title: "Use Credits", desc: "Spend them on listing boosts, leads, and brand collaborations.", icon: MousePointer2, color: "bg-emerald-100 text-emerald-600" },
            { step: "03", title: "Grow Business", desc: "See immediate lift in visibility, leads, and customer conversion.", icon: TrendingUp, color: "bg-purple-100 text-purple-600" },
          ].map((item, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-6 group">
              <div className={cn("h-24 w-24 rounded-[2.5rem] flex items-center justify-center shadow-xl border-4 border-white transition-transform duration-500 group-hover:scale-110", item.color)}>
                <item.icon className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase text-primary tracking-widest leading-none">Step {item.step}</p>
                <h3 className="text-2xl font-black text-foreground">{item.title}</h3>
                <p className="text-sm font-medium text-muted-foreground max-w-[200px] mx-auto italic leading-relaxed">"{item.desc}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Usage Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-foreground tracking-tight text-center">What can you do?</h2>
          <p className="text-muted-foreground font-medium italic">Full control over your growth toolkit.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {ACTIONS.map((action, i) => (
            <Card key={i} className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex flex-col items-center text-center gap-4 hover:shadow-md transition-all group">
              <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform", action.bg, action.color)}>
                <action.icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-foreground leading-tight">{action.name}</p>
                <p className={cn("text-[10px] font-black uppercase tracking-tighter", action.color)}>{action.cost}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Value Proposition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <Card className="rounded-[3rem] border-none shadow-xl bg-zinc-900 text-white p-12 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Target className="h-48 w-48 text-primary" />
          </div>
          <div className="relative z-10 space-y-6">
            <Badge className="bg-emerald-500 text-white border-none font-black text-xs uppercase px-6 py-2 rounded-full shadow-2xl">THE HUB EDGE</Badge>
            <h2 className="text-2xl sm:text-4xl font-black font-headline tracking-tight leading-tight">Pay for Outcomes, <br />Not Permissions.</h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md italic">
              "Unlike traditional recurring subscriptions, credits give you total flexibility. If your shop is busy, save your credits. If you need a boost, spend them instantly."
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              {[
                { label: "No Lock-in", icon: ShieldCheck },
                { label: "Full Flexibility", icon: Layers },
                { label: "No Hidden Fees", icon: CheckCircle2 },
                { label: "Pay for Results", icon: Target },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                  <f.icon className="h-4 w-4 text-emerald-400" /> {f.label}
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="space-y-8">
          <div className="space-y-4 px-4">
            <h3 className="text-3xl font-black text-foreground tracking-tight leading-snug">
              Trusted by 10,000+ Halal Business Leaders Globally.
            </h3>
            <p className="text-muted-foreground font-medium text-lg leading-relaxed">
              We've designed our credit system to align with ethical trade principles—ensuring you only invest when your business is ready to scale.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 flex flex-col gap-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400 border-none" />)}
              </div>
              <p className="text-sm font-bold text-emerald-900 leading-relaxed italic">
                "The credits system saved us ₹20k last Ramadan by allowing us to boost only when we had stock available."
              </p>
              <p className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">— Al-Zaeem Sweets</p>
            </div>
            <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex flex-col gap-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400 border-none" />)}
              </div>
              <p className="text-sm font-bold text-blue-900 leading-relaxed italic">
                "Simple, transparent, and effective. The 2,500 bonus credits in the Elite pack were a game changer for our launch."
              </p>
              <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest">— Pure Glow Beauty</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-primary rounded-[4rem] p-16 text-center text-white space-y-8 shadow-2xl shadow-primary/30 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-emerald-500 to-emerald-400 opacity-50" />
        <Sparkles className="absolute -top-10 -left-10 h-64 w-64 opacity-10 text-white animate-pulse" />
        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black font-headline tracking-tight">Ready to boost your presence?</h2>
          <p className="text-white/80 font-medium text-xl max-w-xl mx-auto italic">
            Select a credit pack today and start receiving verified leads within 24 hours.
          </p>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-card text-primary hover:bg-muted h-16 px-12 rounded-2xl font-black uppercase text-sm tracking-widest shadow-2xl">
            Buy Growth Pack Now
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-card/10 h-16 px-12 rounded-2xl font-black uppercase text-sm tracking-widest">
            Contact Sales
          </Button>
        </div>
      </div>

    </div>
  )
}

function TagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42l-8.704-8.704Z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  )
}
