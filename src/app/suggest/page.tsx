
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  MapPin, Plus, Camera, ArrowLeft, 
  ArrowRight, ShieldCheck, CheckCircle2, 
  Sparkles, Info, Loader2, Utensils, 
  Store, ShoppingBag, Landmark, Zap
} from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function SuggestPlacePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [category, setCategory] = React.useState("dining");
  const [placeName, setPlaceName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [reason, setReason] = React.useState("");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, placeName, address, reason }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast({ title: "Suggestion Submitted!", description: "You'll earn 50 Hub Coins once verified." });
      router.push('/account/suggestions');
    } catch (err: any) {
      toast({ title: "Error", description: err?.message ?? "Failed to submit.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-10 max-w-3xl pb-32 text-foreground">
      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" className="rounded-2xl bg-card shadow-sm border" onClick={() => step === 1 ? router.back() : setStep(step - 1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="space-y-1">
          <h1 className="text-xl sm:text-3xl font-black font-headline tracking-tight">Suggest a Place</h1>
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={cn("h-1.5 w-16 rounded-full transition-all duration-500", step >= i ? 'bg-primary' : 'bg-muted')} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {step === 1 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-foreground">What kind of place is this?</h2>
              <p className="text-muted-foreground font-medium">Help the community by categorizing your suggestion correctly.</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { id: "dining", label: "Dining", icon: Utensils, color: "text-orange-600", bg: "bg-orange-50" },
                { id: "butcher", label: "Butcher", icon: Store, color: "text-red-600", bg: "bg-red-50" },
                { id: "grocery", label: "Grocery", icon: ShoppingBag, color: "text-emerald-600", bg: "bg-emerald-50" },
                { id: "masjid", label: "Mosque", icon: Landmark, color: "text-blue-600", bg: "bg-blue-50" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setCategory(opt.id)}
                  className={cn(
                    "flex flex-col items-center justify-center p-6 rounded-[2.5rem] transition-all border-4",
                    category === opt.id 
                      ? 'bg-card border-primary shadow-xl scale-105' 
                      : 'bg-card border-transparent text-muted-foreground hover:border-border hover:bg-muted'
                  )}
                >
                  <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center mb-3", category === opt.id ? opt.bg + ' ' + opt.color : 'bg-muted text-muted-foreground')}>
                    <opt.icon className="h-6 w-6" />
                  </div>
                  <span className={cn("text-[10px] font-black uppercase tracking-tighter text-center leading-tight", category === opt.id ? 'text-primary' : 'text-muted-foreground')}>
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-foreground">Where is it located?</h2>
              <p className="text-muted-foreground font-medium">Provide as much detail as possible for the audit team.</p>
            </div>
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-8">
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Place Name</Label>
                <Input value={placeName} onChange={e => setPlaceName(e.target.value)} placeholder="e.g., The Halal Grill" className="h-14 rounded-2xl bg-muted border-none font-black text-xl" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Street Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={address} onChange={e => setAddress(e.target.value)} placeholder="Search address..." className="h-12 rounded-2xl bg-muted border-none font-bold pl-12" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Why are you suggesting this?</Label>
                <Textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="e.g., They serve hand-slaughtered beef and have a clean prayer area..." className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium resize-none" />
              </div>
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-foreground">Photos & Proof</h2>
              <p className="text-muted-foreground font-medium">Sharing photos of the menu or certificate helps speed up verification.</p>
            </div>
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-8">
              <div className="p-6 sm:p-12 border-4 border-dashed border-border rounded-[2.5rem] bg-muted/30 flex flex-col items-center justify-center text-center gap-4 hover:border-primary/20 hover:bg-card transition-all cursor-pointer group">
                <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-black text-foreground">Snap or Upload</p>
                  <p className="text-sm font-medium text-muted-foreground">Menu, Storefront, or Halal Logo</p>
                </div>
              </div>
              <div className="p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-100 flex items-start gap-4">
                <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-emerald-900 leading-relaxed">
                  Earn <span className="font-black text-emerald-600">+50 Hub Coins</span> once your suggestion is verified by our scholarly board.
                </p>
              </div>
            </Card>
          </div>
        )}

        <div className="flex justify-between gap-4 pt-8">
          {step > 1 && (
            <Button 
              variant="outline" 
              className="rounded-2xl h-16 px-10 border-2 font-black uppercase text-xs tracking-widest text-muted-foreground"
              onClick={() => setStep(step - 1)}
            >
              Previous
            </Button>
          )}
          <Button 
            className="rounded-2xl h-16 px-12 font-black uppercase text-sm tracking-widest bg-primary hover:bg-primary/90 text-white shadow-2xl flex-1 transition-all active:scale-[0.98]"
            onClick={() => step === 3 ? handleSubmit() : setStep(step + 1)}
            disabled={loading}
          >
            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : (
              <>
                {step === 3 ? "Submit Suggestion" : "Continue to Step " + (step + 1)} 
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
