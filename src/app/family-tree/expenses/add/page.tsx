
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  ArrowLeft, Wallet, Utensils, ShoppingCart, 
  Car, Home, PartyPopper, Package,
  Sparkles, CheckCircle2, ChevronRight,
  Zap, HandHeart, Info, Loader2
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const CATEGORIES = [
  { id: 'food', label: 'Food / Dining', icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'groceries', label: 'Groceries', icon: ShoppingCart, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'travel', label: 'Travel', icon: Car, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'household', label: 'Household', icon: Home, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'outing', label: 'Outing', icon: PartyPopper, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'other', label: 'Other', icon: Package, color: 'text-slate-600', bg: 'bg-slate-50' },
];

const FAMILY_MEMBERS = [
  { id: 'm1', name: 'Ibrahim (You)', initials: 'I' },
  { id: 'm2', name: 'Fatima', initials: 'F' },
  { id: 'm3', name: 'Zaid', initials: 'Z' },
  { id: 'm4', name: 'Sarah', initials: 'S' },
];

export default function AddFamilyExpensePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = React.useState("food");
  const [selectedPayer, setSelectedPayer] = React.useState("m1");
  const [loading, setLoading] = React.useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/family-tree/expenses');
    }, 1500);
  };

  return (
    <div className="container mx-auto p-6 space-y-10 max-w-2xl pb-24 text-slate-900">
      <div className="flex items-center gap-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-2xl bg-white shadow-sm border h-12 w-12" 
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline tracking-tight">Add Expense</h1>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest opacity-60">Fast Entry Mode</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="rounded-[3rem] border-none shadow-xl bg-white p-10 space-y-10">
            {/* Amount Input */}
            <div className="space-y-4 text-center">
              <Label className="font-bold text-xs uppercase tracking-widest text-slate-400">Amount Spent</Label>
              <div className="relative max-w-[240px] mx-auto">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl font-black text-slate-300">₹</span>
                <Input 
                  type="number" 
                  placeholder="0" 
                  className="h-20 text-5xl font-black text-center border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                  autoFocus
                />
              </div>
              <div className="h-px bg-slate-100 w-24 mx-auto" />
            </div>

            {/* Category Selection */}
            <div className="space-y-4">
              <Label className="font-bold text-xs uppercase tracking-widest text-slate-400">Category</Label>
              <div className="grid grid-cols-3 gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={React.useMemo(() => {
                      return `flex flex-col items-center justify-center p-4 rounded-3xl transition-all border-4 ${
                        selectedCategory === cat.id 
                          ? 'bg-blue-50 border-blue-600 text-blue-600 scale-[1.02] shadow-lg shadow-blue-100' 
                          : 'bg-slate-50 border-transparent text-slate-400 hover:bg-slate-100'
                      }`;
                    }, [selectedCategory, cat.id])}
                  >
                    <cat.icon className="h-6 w-6 mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-tighter text-center leading-tight">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payer Selection */}
            <div className="space-y-4">
              <Label className="font-bold text-xs uppercase tracking-widest text-slate-400">Paid By</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {FAMILY_MEMBERS.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => setSelectedPayer(member.id)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-2xl border-2 transition-all",
                      selectedPayer === member.id 
                        ? "bg-emerald-50 border-emerald-500 text-emerald-700" 
                        : "bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100"
                    )}
                  >
                    <div className={cn(
                      "h-8 w-8 rounded-xl flex items-center justify-center font-black text-xs shadow-sm shrink-0",
                      selectedPayer === member.id ? "bg-white" : "bg-white text-slate-300"
                    )}>
                      {member.initials}
                    </div>
                    <span className="text-[11px] font-black uppercase truncate">{member.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Note */}
            <div className="space-y-4 pt-4">
              <Label className="font-bold text-xs uppercase tracking-widest text-slate-400">Note (Optional)</Label>
              <Input placeholder="What was this for?" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
            </div>
          </Card>
        </section>

        {/* Action Button */}
        <div className="pt-10 flex flex-col items-center gap-4">
          <Button 
            onClick={handleSave}
            disabled={loading}
            className="w-full h-20 rounded-[2rem] bg-blue-600 hover:bg-blue-700 text-white font-black text-2xl shadow-2xl transition-transform active:scale-[0.98]"
          >
            {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : "Log Family Expense"}
          </Button>
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">
            <Zap className="h-3 w-3 text-amber-500" /> Syncing with family hub...
          </div>
        </div>
      </div>
    </div>
  );
}
