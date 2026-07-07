
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, TrendingUp,
  History, PieChart, ShoppingCart, Utensils,
  Car, Home, PartyPopper, Package,
  Plus, Search, Filter, ArrowLeft,
  ChevronRight, MoreVertical, ShieldCheck,
  Zap, MapPin, CheckCircle2, Sparkles,
  Split, FileText
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { name: "Food / Dining", icon: Utensils, color: "text-orange-600", bg: "bg-orange-50", spend: 5000, percentage: 40 },
  { name: "Groceries", icon: ShoppingCart, color: "text-emerald-600", bg: "bg-emerald-50", spend: 4000, percentage: 32 },
  { name: "Outings", icon: PartyPopper, color: "text-purple-600", bg: "bg-purple-50", spend: 3450, percentage: 28 },
];

const CONTRIBUTIONS = [
  { name: "Ibrahim", spend: 6000, img: "av1" },
  { name: "Fatima", spend: 4000, img: "av2" },
  { name: "Extended", spend: 2450, img: "av5" },
];

const ACTIVITY = [
  { id: 1, name: "Fatima", action: "paid", amount: "₹850", item: "Groceries", icon: ShoppingCart, color: "text-emerald-600", time: "2h ago", split: 3 },
  { id: 2, name: "Ibrahim", action: "paid", amount: "₹1,200", item: "Dinner", icon: Utensils, color: "text-orange-600", time: "5h ago", split: 4 },
  { id: 3, name: "Zaid", action: "paid", amount: "₹450", item: "Transport", icon: Car, color: "text-blue-600", time: "Yesterday", split: 0 },
];

export default function FamilyExpensesPage() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-10 max-w-5xl pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-emerald-600 transition-colors w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Hub
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
              <Wallet className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl font-black font-headline text-foreground tracking-tight">Family Expenses</h1>
              <p className="text-muted-foreground font-medium text-lg italic">Awareness over accounting. Staying in sync without the stress.</p>
            </div>
          </div>
        </div>
        <Link href="/family-tree/expenses/add">
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-10 font-black shadow-lg shadow-blue-200 h-16 text-white transition-all active:scale-95 text-lg">
            <Plus className="mr-2 h-6 w-6" /> Add Expense
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Summary & Activity */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Summary Card */}
          <Card className="rounded-[3rem] border-none shadow-sm bg-zinc-900 text-white p-12 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <TrendingUp className="h-48 w-48 text-emerald-400" />
            </div>
            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Total Spent This Month</p>
                <div className="flex items-baseline gap-4">
                  <h2 className="text-4xl sm:text-7xl font-black tracking-tighter">₹12,450</h2>
                  <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-xs px-4 h-8 flex items-center shadow-lg">
                    <ArrowDownLeft className="h-4 w-4 mr-1" /> 12% vs LAST MO
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-1">Top Category</p>
                  <p className="text-xl font-black">Food 🍽️</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-1">Main Spender</p>
                  <p className="text-xl font-black">Ibrahim</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-1">Entries</p>
                  <p className="text-xl font-black">24 Active</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Activity Feed */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-4">
              <h3 className="text-2xl font-black text-foreground tracking-tight">Spending Feed</h3>
              <Button variant="ghost" className="text-blue-600 font-black text-xs uppercase tracking-widest">Filter By Category</Button>
            </div>
            <div className="space-y-4">
              {ACTIVITY.map((act) => (
                <Link key={act.id} href={`/family-tree/expenses/${act.id}`}>
                  <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-card group hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-blue-100 cursor-pointer mb-4">
                    <div className="p-6 flex items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <Avatar className="h-14 w-14 border-4 border-border shadow-md group-hover:scale-105 transition-transform">
                          <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&auto=format&q=80`} />
                          <AvatarFallback>{act.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-lg font-black text-foreground leading-tight">
                            {act.name} <span className="font-medium text-muted-foreground lowercase">{act.action}</span> {act.amount}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 mt-1">
                            <Badge variant="secondary" className={cn("border-none text-[9px] font-black uppercase px-2 h-5", act.color, "bg-muted")}>
                              <act.icon className="h-3 w-3 mr-1" /> {act.item}
                            </Badge>
                            {act.split > 0 && (
                              <Badge className="bg-blue-50 text-blue-600 border-none text-[9px] font-black uppercase h-5 px-2 flex items-center gap-1">
                                <Split className="h-2.5 w-2.5" /> Shared with {act.split}
                              </Badge>
                            )}
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{act.time}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            <Button variant="outline" className="w-full h-14 rounded-2xl border-2 font-black uppercase text-xs tracking-widest text-muted-foreground hover:bg-muted">
              Load Earlier Spending
            </Button>
          </section>
        </div>

        {/* Right Column: Breakdown & Members */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Category Breakdown */}
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-8">
            <h3 className="text-xl font-black text-foreground">By Category</h3>
            <div className="space-y-8">
              {CATEGORIES.map((cat, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <cat.icon className={cn("h-4 w-4", cat.color)} />
                      <span className="text-muted-foreground">{cat.name}</span>
                    </div>
                    <span className="text-foreground">${cat.spend.toLocaleString()}</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden shadow-inner">
                    <div className={cn("h-full rounded-full transition-all duration-1000", cat.color.replace('text-', 'bg-'))} style={{ width: `${cat.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Member Contribution */}
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-8">
            <h3 className="text-xl font-black text-foreground">Contributions</h3>
            <div className="space-y-6">
              {CONTRIBUTIONS.map((mem, i) => (
                <div key={i} className="flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                      <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100/100`} />
                      <AvatarFallback>{mem.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-black text-foreground">{mem.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-foreground">${mem.spend.toLocaleString()}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">Contribution</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Smart discovery link */}
          <Card className="rounded-[2.5rem] border-none bg-emerald-50 p-10 space-y-6 relative overflow-hidden border-2 border-emerald-100 shadow-inner">
            <Sparkles className="absolute -top-4 -right-4 h-24 w-24 opacity-10 text-emerald-600" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="h-12 w-12 rounded-2xl bg-card flex items-center justify-center shadow-md">
                <Utensils className="h-6 w-6 text-emerald-600" />
              </div>
              <h4 className="text-lg font-black text-emerald-900 uppercase tracking-tighter">Dining Discovery</h4>
            </div>
            <p className="text-xs font-medium text-emerald-800 leading-relaxed relative z-10">
              You spent ₹5,000 on Food this month. Explore similar high-rated halal restaurants in your area.
            </p>
            <Link href="/family-tree/discovery">
              <Button variant="outline" className="w-full rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 border-emerald-200 h-12 bg-card text-emerald-700 relative z-10 hover:bg-emerald-50">Explore Nearby</Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
