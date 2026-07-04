"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useOnboarding } from "@/lib/onboarding-context"
import { ArrowRight, ShieldCheck, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const HALAL_OPTIONS = [
  {
    id: "certified",
    label: "Halal Certified",
    desc: "We hold a valid certificate from a recognised halal certifying body.",
    color: "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400",
  },
  {
    id: "self-declared",
    label: "Self-Declared Halal",
    desc: "The business owner declares the products/services are halal, without a formal certificate.",
    color: "border-amber-400 bg-amber-50 dark:bg-amber-950/30",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
  },
  {
    id: "halal-friendly",
    label: "Halal-Friendly",
    desc: "Primarily halal, but may also serve non-halal items. Clearly separated.",
    color: "border-blue-400 bg-blue-50 dark:bg-blue-950/30",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400",
  },
  {
    id: "not-applicable",
    label: "Not Applicable",
    desc: "This business does not serve food or products where halal status applies (e.g., mosque, bookstore, school).",
    color: "border-muted bg-muted/30",
    badge: "bg-muted text-muted-foreground",
  },
]

const SLAUGHTER_METHODS = ["Hand Slaughtered", "Machine Slaughtered (Blessed)", "Both", "Not Applicable"]

export default function HalalPage() {
  const router = useRouter()
  const { draft, update } = useOnboarding()
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!draft.halalStatus) e.halalStatus = "Please select your halal status."
    if (!draft.halalDeclarationAgreed) e.declaration = "You must agree to the halal declaration to proceed."
    return e
  }

  function handleNext() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    update({ currentStep: 6 })
    router.push("/partner/onboarding/business/media")
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Step 6 of 8</p>
        <h1 className="text-3xl font-black font-headline text-foreground flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-primary" /> Halal Declaration
        </h1>
        <p className="text-sm text-muted-foreground font-medium">This information appears on your listing and builds trust with Muslim consumers.</p>
      </div>

      <div className="space-y-3">
        <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Halal Status *</Label>
        {HALAL_OPTIONS.map(opt => (
          <button
            key={opt.id}
            onClick={() => { update({ halalStatus: opt.id }); setErrors(p => ({ ...p, halalStatus: "" })) }}
            className={cn(
              "w-full flex items-start gap-4 p-5 rounded-2xl border-2 transition-all text-left",
              draft.halalStatus === opt.id ? opt.color : "border-transparent bg-card hover:bg-muted"
            )}
          >
            <div className={cn(
              "w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center transition-all",
              draft.halalStatus === opt.id ? "border-primary bg-primary" : "border-muted-foreground/40"
            )}>
              {draft.halalStatus === opt.id && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-black text-foreground">{opt.label}</p>
              <p className="text-xs font-medium text-muted-foreground">{opt.desc}</p>
            </div>
          </button>
        ))}
        {errors.halalStatus && <p className="text-xs font-bold text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.halalStatus}</p>}
      </div>

      {draft.halalStatus === "certified" && (
        <Card className="rounded-[2rem] border-none shadow-soft bg-card animate-in fade-in duration-300">
          <CardContent className="p-8 space-y-6">
            <p className="text-sm font-black text-foreground">Certification Details</p>
            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Certifying Body / Authority</Label>
              <Input value={draft.certificationBody} onChange={(e) => update({ certificationBody: e.target.value })} placeholder="e.g., Halal India, JAKIM, IFANCA" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Certificate Number</Label>
                <Input value={draft.certificationNumber} onChange={(e) => update({ certificationNumber: e.target.value })} placeholder="e.g., HI-2024-XXXXX" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Expiry Date</Label>
                <Input type="date" value={draft.certificationExpiry} onChange={(e) => update({ certificationExpiry: e.target.value })} className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {(draft.halalStatus === "certified" || draft.halalStatus === "self-declared") && (
        <Card className="rounded-[2rem] border-none shadow-soft bg-card animate-in fade-in duration-300">
          <CardContent className="p-8 space-y-4">
            <p className="text-sm font-black text-foreground">Slaughter Method (for Meat/Food Businesses)</p>
            <div className="grid grid-cols-2 gap-3">
              {SLAUGHTER_METHODS.map(m => (
                <button
                  key={m}
                  onClick={() => update({ slaughterMethod: m })}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all",
                    draft.slaughterMethod === m ? "border-primary bg-primary/5" : "border-transparent bg-muted hover:bg-muted/80"
                  )}
                >
                  <p className="text-xs font-black text-foreground">{m}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="rounded-[2rem] border-none shadow-xl bg-zinc-900 dark:bg-zinc-800 text-white overflow-hidden">
        <CardContent className="p-8 space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-black">Halal Integrity Declaration</h3>
            <p className="text-sm text-white/70 font-medium leading-relaxed">
              By ticking this box, you confirm that the information you have provided about your business's halal status is accurate to the best of your knowledge. Providing false information will result in immediate removal from Halal Hub.
            </p>
          </div>
          <div className={cn("flex items-start gap-4 p-4 rounded-2xl border transition-all", draft.halalDeclarationAgreed ? "border-emerald-500/50 bg-white/5" : "border-white/10 bg-white/5", errors.declaration && "border-red-400")}>
            <Checkbox
              id="declaration"
              checked={draft.halalDeclarationAgreed}
              onCheckedChange={(v) => { update({ halalDeclarationAgreed: !!v }); setErrors(p => ({ ...p, declaration: "" })) }}
              className="border-white/50 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 mt-0.5"
            />
            <label htmlFor="declaration" className="text-sm font-bold text-white/80 cursor-pointer leading-relaxed">
              I confirm all halal information provided is accurate and I accept full responsibility for its correctness.
            </label>
          </div>
          {errors.declaration && <p className="text-xs font-bold text-red-400 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.declaration}</p>}
        </CardContent>
      </Card>

      <div className="flex justify-between gap-4">
        <Button variant="outline" className="rounded-2xl h-14 px-8 border-2 font-black uppercase text-xs tracking-widest" onClick={() => router.back()}>
          Back
        </Button>
        <Button className="rounded-2xl h-14 px-10 font-black bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 flex-1" onClick={handleNext}>
          Continue to Media <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
