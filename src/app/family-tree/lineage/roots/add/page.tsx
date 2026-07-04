
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  ArrowLeft, Network, GitBranch, Plus, 
  MapPin, History, ShieldCheck, Upload,
  Save, Loader2, Info, Sparkles,
  CheckCircle2, Globe
} from "lucide-react"

export default function AddRootAncestorPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/family-tree/lineage/roots');
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
          <h1 className="text-xl sm:text-3xl font-black font-headline tracking-tight">Define Root Ancestor</h1>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest opacity-60">Lineage Preservation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <GitBranch className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-black">Identity Details</h2>
          </div>
          
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-8">
            <div className="space-y-4">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Full Name</Label>
              <Input placeholder="e.g., Sheikh Ibrahim Al-Sayed" className="h-14 rounded-2xl bg-muted border-none font-black text-xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Place of Origin</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="e.g., Old Delhi, India" className="h-12 rounded-2xl bg-muted border-none font-bold pl-12" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Estimated Year</Label>
                <div className="relative">
                  <History className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="e.g., 1895" className="h-12 rounded-2xl bg-muted border-none font-bold pl-12" />
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-black">Verification Documents</h2>
          </div>
          
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <div className="p-5 sm:p-10 border-4 border-dashed border-border rounded-[2.5rem] flex flex-col items-center justify-center gap-4 bg-muted/30 hover:bg-card hover:border-emerald-100 transition-all cursor-pointer group">
              <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                <Upload className="h-8 w-8" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-black text-foreground">Upload Historical Proof</p>
                <p className="text-xs font-medium text-muted-foreground max-w-[240px]">Birth certificate, Hajj record, or property deed (Max 10MB)</p>
              </div>
            </div>
          </Card>
        </section>

        <div className="p-8 bg-amber-50 rounded-[2.5rem] border-2 border-amber-100 flex items-start gap-4">
          <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs font-medium text-amber-900/70 leading-relaxed">
            Root ancestors act as the "Source of Truth" for your family tree. Once saved, this data will be audited by the Lineage Admin before being unified with the global ancestry map.
          </p>
        </div>

        <div className="pt-10 flex flex-col items-center gap-4">
          <Button 
            onClick={handleSave}
            disabled={loading}
            className="w-full h-20 rounded-[2rem] bg-emerald-600 hover:bg-emerald-700 text-white font-black text-2xl shadow-2xl transition-transform active:scale-[0.98]"
          >
            {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : "Verify & Save Root"}
          </Button>
          <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-center">
            <Globe className="h-3 w-3 text-blue-500" /> Available for family collaboration only
          </div>
        </div>
      </div>
    </div>
  );
}
