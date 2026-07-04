"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useOnboarding } from "@/lib/onboarding-context"
import { ArrowRight, MapPin, AlertCircle, Navigation } from "lucide-react"
import { cn } from "@/lib/utils"

const COUNTRIES = [
  "India", "United Kingdom", "United States", "Canada", "Australia",
  "Malaysia", "Singapore", "UAE", "Saudi Arabia", "Qatar", "Kuwait",
  "Bahrain", "Oman", "Pakistan", "Bangladesh", "Indonesia", "South Africa",
  "France", "Germany", "Netherlands", "Belgium", "Other"
]

export default function LocationPage() {
  const router = useRouter()
  const { draft, update } = useOnboarding()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [locating, setLocating] = useState(false)

  function validate() {
    const e: Record<string, string> = {}
    if (!draft.addressLine1.trim()) e.addressLine1 = "Street address is required."
    if (!draft.city.trim()) e.city = "City is required."
    if (!draft.country) e.country = "Country is required."
    return e
  }

  function handleNext() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    update({ currentStep: 3 })
    router.push("/partner/onboarding/business/hours")
  }

  function detectLocation() {
    if (!navigator.geolocation) return
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        update({ latitude: String(latitude), longitude: String(longitude) })
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
          const data = await res.json()
          const addr = data.address || {}
          update({
            addressLine1: addr.road || addr.street || "",
            city: addr.city || addr.town || addr.village || "",
            state: addr.state || "",
            country: addr.country || "",
            postalCode: addr.postcode || "",
          })
        } catch {}
        setLocating(false)
      },
      () => setLocating(false)
    )
  }

  function f(key: keyof typeof draft) {
    return { value: draft[key] as string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => { update({ [key]: e.target.value }); setErrors(p => ({ ...p, [key]: "" })) } }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Step 3 of 8</p>
        <h1 className="text-xl sm:text-3xl font-black font-headline text-foreground flex items-center gap-3">
          <MapPin className="h-8 w-8 text-primary" /> Business Location
        </h1>
        <p className="text-sm text-muted-foreground font-medium">Help customers find you. This address will appear on your public listing.</p>
      </div>

      <Card className="rounded-[2rem] border-none shadow-soft bg-card">
        <CardContent className="p-8 space-y-6">
          <Button
            variant="outline"
            className="w-full rounded-2xl h-12 border-2 border-dashed font-bold text-sm gap-2"
            onClick={detectLocation}
            disabled={locating}
          >
            <Navigation className={cn("h-4 w-4 text-primary", locating && "animate-spin")} />
            {locating ? "Detecting location..." : "Detect My Current Location"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs font-bold text-muted-foreground uppercase tracking-widest"><span className="bg-card px-4">or enter manually</span></div>
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Street Address *</Label>
            <Input {...f("addressLine1")} placeholder="e.g., 123 Karim Street" className={cn("h-12 rounded-2xl bg-muted border-none font-bold", errors.addressLine1 && "ring-2 ring-red-500/50")} />
            {errors.addressLine1 && <p className="text-xs font-bold text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.addressLine1}</p>}
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Address Line 2 (Optional)</Label>
            <Input {...f("addressLine2")} placeholder="Floor, Building, Suite, etc." className="h-12 rounded-2xl bg-muted border-none font-medium" />
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Landmark / Area (Optional)</Label>
            <Input {...f("landmark")} placeholder="e.g., Near Central Mosque" className="h-12 rounded-2xl bg-muted border-none font-medium" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">City *</Label>
              <Input {...f("city")} placeholder="e.g., Mumbai" className={cn("h-12 rounded-2xl bg-muted border-none font-bold", errors.city && "ring-2 ring-red-500/50")} />
              {errors.city && <p className="text-xs font-bold text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.city}</p>}
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">State / Province</Label>
              <Input {...f("state")} placeholder="e.g., Maharashtra" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Country *</Label>
              <Select value={draft.country} onValueChange={(v) => { update({ country: v }); setErrors(p => ({ ...p, country: "" })) }}>
                <SelectTrigger className={cn("h-12 rounded-2xl bg-muted border-none font-bold", errors.country && "ring-2 ring-red-500/50")}>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.country && <p className="text-xs font-bold text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.country}</p>}
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Postal Code</Label>
              <Input {...f("postalCode")} placeholder="e.g., 400001" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
          </div>

          {(draft.latitude && draft.longitude) && (
            <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-2xl">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <p className="text-xs font-bold text-primary">GPS: {Number(draft.latitude).toFixed(5)}, {Number(draft.longitude).toFixed(5)}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between gap-4">
        <Button variant="outline" className="rounded-2xl h-14 px-8 border-2 font-black uppercase text-xs tracking-widest" onClick={() => router.back()}>
          Back
        </Button>
        <Button className="rounded-2xl h-14 px-10 font-black bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 flex-1" onClick={handleNext}>
          Continue to Hours <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
