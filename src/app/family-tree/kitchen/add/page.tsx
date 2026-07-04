
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft, Utensils, ChefHat, Clock, 
  Plus, Camera, Save, Sparkles,
  CheckCircle2, Info, Loader2, BookOpen,
  Scale, Flame, ShieldCheck
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CATEGORIES = ["Mains", "Desserts", "Starters", "Beverages", "Spices", "Bread"];
const DIFFICULTIES = ["Easy", "Medium", "Hard", "Expert"];

export default function AddHeritageRecipePage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/family-tree/kitchen');
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-10 max-w-3xl pb-24 text-foreground">
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
          <h1 className="text-xl sm:text-3xl font-black font-headline tracking-tight">Preserve Recipe</h1>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest opacity-60">Heritage Kitchen Vault</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-8">
            <div className="space-y-4">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Recipe Title</Label>
              <Input placeholder="e.g., Grandma's Signature Biryani" className="h-14 rounded-2xl bg-muted border-none font-black text-xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Category</Label>
                <Select defaultValue="Mains">
                  <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-none shadow-2xl">
                    {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Difficulty</Label>
                <Select defaultValue="Medium">
                  <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-none shadow-2xl">
                    {DIFFICULTIES.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Recipe Photos</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <button className="aspect-square rounded-3xl border-4 border-dashed border-border bg-muted flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-amber-300 hover:text-amber-600 transition-all group">
                  <Camera className="h-8 w-8 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase">Add Photo</span>
                </button>
              </div>
            </div>
          </Card>
        </section>

        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
              <Flame className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-black">Ingredients & Steps</h2>
          </div>
          
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-8">
            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Ingredient List</Label>
              <Textarea 
                placeholder="List ingredients one by one (e.g., 500g Basmati Rice...)" 
                className="min-h-[150px] rounded-2xl bg-muted border-none p-4 font-medium resize-none" 
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Cooking Steps</Label>
              <Textarea 
                placeholder="Describe the cooking process in detail..." 
                className="min-h-[200px] rounded-2xl bg-muted border-none p-4 font-medium resize-none" 
              />
            </div>
          </Card>
        </section>

        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <Card className="rounded-[2.5rem] border-none bg-zinc-900 text-white p-10 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <ChefHat className="h-32 w-32" />
            </div>
            <div className="relative z-10 space-y-2">
              <h3 className="text-2xl font-black">Oral History Note</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed italic">
                Add a private note about the origins of this recipe or a memory associated with it. This will be preserved in the Heritage Logs.
              </p>
            </div>
            <Textarea 
              placeholder="e.g., This recipe was passed down from my great-grandmother in Old Delhi..." 
              className="bg-card/5 border-white/10 rounded-2xl min-h-[100px] text-white placeholder:text-muted-foreground" 
            />
          </Card>
        </section>

        <div className="pt-10 flex flex-col items-center gap-4">
          <Button 
            onClick={handleSave}
            disabled={loading}
            className="w-full h-20 rounded-[2rem] bg-amber-600 hover:bg-amber-700 text-white font-black text-2xl shadow-2xl transition-transform active:scale-[0.98]"
          >
            {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : "Save to Heritage Vault"}
          </Button>
          <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-center">
            <ShieldCheck className="h-3 w-3 text-emerald-500" /> End-to-end encrypted private family data
          </div>
        </div>
      </div>
    </div>
  );
}
