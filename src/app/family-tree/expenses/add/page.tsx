"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  ArrowLeft, Wallet, Utensils, ShoppingCart, 
  Car, Home, PartyPopper, Package,
  Sparkles, CheckCircle2, ChevronRight,
  Zap, HandHeart, Info, Loader2, Users,
  Split
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { id: 'food', label: 'Food / Dining', icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'groceries', label: 'Groceries', icon: ShoppingCart, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'travel', label: 'Travel', icon: Car, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'household', label: 'Household', icon: Home, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'outing', label: 'Outing', icon: PartyPopper, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'other', label: 'Other', icon: Package, color: 'text-muted-foreground', bg: 'bg-muted' },
];

const FAMILY_MEMBERS = [
  { id: 'm1', name: 'Ibrahim (You)', initials: 'I' },
  { id: 'm2', name: 'Fatima', initials: 'F' },
  { id: 'm3', name: 'Zaid', initials: 'Z' },
  { id: 'm4', name: 'Sarah', initials: 'S' },
];

export default function AddFamilyExpensePage() {
  const router = useRouter();
  const [amount, setAmount] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("food");
  const [selectedPayer, setSelectedPayer] = React.useState("m1");
  const [splitWith, setSplitWith] = React.useState<string[]>(FAMILY_MEMBERS.map(m => m.id));
  const [loading, setLoading] = React.useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/family-tree/expenses');
    }, 1500);
  };

  const toggleSplitMember = (id: string) => {
    setSplitWith(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const perPersonAmount = React.useMemo(() => {
    const num = parseFloat(amount);
    if (isNaN(num) || splitWith.length === 0) return 0;
    return (num / splitWith.length).toFixed(2);
  }, [amount, splitWith]);

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-10 max-w-2xl pb-24 text-foreground">
      <div className="flex items-center gap-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-2xl bg-card shadow-sm border h-12 w-12" 
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="space-y-1">
          <h1 className="text-xl sm:text-3xl font-black font-headline tracking-tight">Add Expense</h1>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest opacity-60">Log spending & split costs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="rounded-[3rem] border-none shadow-xl bg-card p-10 space-y-10">
            {/* Amount Input */}
            <div className="space-y-4 text-center">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Amount Spent</Label>
              <div className="relative max-w-[240px] mx-auto">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl font-black text-muted-foreground">₹</span>
                <Input 
                  type="number" 
                  placeholder="0" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-20 text-5xl font-black text-center border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                  autoFocus
                />
              </div>
              <div className="h-px bg-muted w-24 mx-auto" />
            </div>

            {/* Category Selection */}
            <div className="space-y-4">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Category</Label>
              <div className="grid grid-cols-3 gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-3xl transition-all border-4",
                      selectedCategory === cat.id 
                        ? 'bg-blue-50 border-blue-600 text-blue-600 scale-[1.02] shadow-lg shadow-blue-100' 
                        : 'bg-muted border-transparent text-muted-foreground hover:bg-muted'
                    )}
                  >
                    <cat.icon className="h-6 w-6 mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-tighter text-center leading-tight">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payer Selection */}
            <div className="space-y-4">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Paid By</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {FAMILY_MEMBERS.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => setSelectedPayer(member.id)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-2xl border-2 transition-all",
                      selectedPayer === member.id 
                        ? "bg-emerald-50 border-emerald-500 text-emerald-700" 
                        : "bg-muted border-transparent text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <div className={cn(
                      "h-8 w-8 rounded-xl flex items-center justify-center font-black text-xs shadow-sm shrink-0",
                      selectedPayer === member.id ? "bg-card" : "bg-card text-muted-foreground"
                    )}>
                      {member.initials}
                    </div>
                    <span className="text-[11px] font-black uppercase truncate">{member.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Split Selection */}
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Split Between</Label>
                <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none font-black text-[9px] uppercase px-3 py-1">
                  {splitWith.length === FAMILY_MEMBERS.length ? "Everyone" : `${splitWith.length} Members`}
                </Badge>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {FAMILY_MEMBERS.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => toggleSplitMember(member.id)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-2xl border-2 transition-all",
                      splitWith.includes(member.id) 
                        ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm" 
                        : "bg-muted border-transparent text-muted-foreground grayscale opacity-60"
                    )}
                  >
                    <div className={cn(
                      "h-8 w-8 rounded-xl flex items-center justify-center font-black text-xs shadow-sm shrink-0",
                      splitWith.includes(member.id) ? "bg-card" : "bg-card text-muted-foreground"
                    )}>
                      {member.initials}
                    </div>
                    <span className="text-[11px] font-black uppercase truncate">{member.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
              {parseFloat(amount) > 0 && splitWith.length > 0 && (
                <div className="p-4 bg-muted rounded-2xl flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-xl bg-card flex items-center justify-center text-blue-600 shadow-sm">
                      <Split className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Share Per Person</span>
                  </div>
                  <span className="text-lg font-black text-foreground tracking-tight">₹{perPersonAmount}</span>
                </div>
              )}
            </div>

            {/* Optional Note */}
            <div className="space-y-4 pt-4 border-t border-border">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Note (Optional)</Label>
              <Input placeholder="What was this for?" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
          </Card>
        </section>

        {/* Action Button */}
        <div className="pt-10 flex flex-col items-center gap-4">
          <Button 
            onClick={handleSave}
            disabled={loading || !amount || parseFloat(amount) <= 0}
            className="w-full h-20 rounded-[2rem] bg-blue-600 hover:bg-blue-700 text-white font-black text-2xl shadow-2xl transition-transform active:scale-[0.98]"
          >
            {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : "Log & Split Expense"}
          </Button>
          <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-center">
            <Zap className="h-3 w-3 text-amber-500" /> Awareness for the whole family
          </div>
        </div>
      </div>
    </div>
  );
}
