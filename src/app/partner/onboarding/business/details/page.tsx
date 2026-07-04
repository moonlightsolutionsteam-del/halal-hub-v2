"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useOnboarding } from "@/lib/onboarding-context"
import { ArrowRight, Building2, Info, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const BUSINESS_TYPES: Record<string, string[]> = {
  food: ["Casual Dining", "Fine Dining", "Cafe & Coffee", "Cloud Kitchen", "Street Food", "Buffet", "Fast Food / QSR", "Bakery"],
  meat: ["Butcher Shop", "Wholesale Supplier", "Online Delivery", "Processing Unit"],
  grocery: ["Mini Market", "Supermarket", "Organic Store", "Hypermarket", "Online Grocery"],
  catering: ["Wedding Catering", "Corporate Catering", "Home Delivery", "Event Catering"],
  events: ["Event Venue", "Event Planning", "Decoration Services", "Photography & Video"],
  hotels: ["Hotel", "Homestay", "Guest House", "Resort", "Serviced Apartment"],
  travel: ["Travel Agency", "Hajj & Umrah", "Tour Operator", "Car Rental"],
  fashion: ["Clothing Store", "Online Store", "Tailor / Bespoke", "Hijab & Abaya"],
  cosmetics: ["Beauty Store", "Pharmacy", "Online Store", "Salon & Spa"],
  finance: ["Islamic Bank", "Investment Fund", "Insurance (Takaful)", "Money Exchange"],
  healthcare: ["Clinic", "Hospital", "Pharmacy", "Hijama Centre", "Dental Clinic"],
  education: ["Madrasa", "School", "Training Centre", "Online Academy"],
  media: ["Bookstore", "Islamic Media", "Publishing House", "Online Store"],
  certifier: ["Halal Certification Body", "Audit Agency", "Government Body"],
}

function DetailsForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { draft, update } = useOnboarding()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const categoryFromUrl = searchParams.get("category") || draft.category

  useEffect(() => {
    if (categoryFromUrl && !draft.category) {
      update({ category: categoryFromUrl })
    }
  }, [categoryFromUrl, draft.category, update])

  const types = BUSINESS_TYPES[categoryFromUrl] || BUSINESS_TYPES.food

  function validate() {
    const e: Record<string, string> = {}
    if (!draft.businessName.trim()) e.businessName = "Business name is required."
    if (draft.businessName.trim().length < 3) e.businessName = "Must be at least 3 characters."
    if (!draft.description.trim()) e.description = "Description is required."
    if (draft.description.trim().length < 30) e.description = "Please write at least 30 characters."
    if (!draft.businessType) e.businessType = "Please select a business type."
    return e
  }

  function handleNext() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    update({ currentStep: 2 })
    router.push("/partner/onboarding/business/location")
  }

  function field(name: string, label: string, placeholder: string, el: React.ReactNode) {
    return (
      <div className="space-y-2">
        <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">{label}</Label>
        {el}
        {errors[name] && (
          <p className="text-xs font-bold text-red-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />{errors[name]}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Step 2 of 8</p>
        <h1 className="text-3xl font-black font-headline text-foreground flex items-center gap-3">
          <Building2 className="h-8 w-8 text-primary" /> Business Information
        </h1>
        <p className="text-sm text-muted-foreground font-medium">Tell us about your business. This will appear on your public listing.</p>
      </div>

      <Card className="rounded-[2rem] border-none shadow-soft bg-card">
        <CardContent className="p-8 space-y-8">
          <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl">
            <Info className="h-4 w-4 text-primary shrink-0" />
            <p className="text-xs font-bold text-primary">Category: <span className="font-black capitalize">{draft.categoryLabel || categoryFromUrl}</span> — you can change this by going back.</p>
          </div>

          {field("businessType", "Business Type *", "", (
            <Select value={draft.businessType} onValueChange={(v) => { update({ businessType: v }); setErrors(p => ({ ...p, businessType: "" })) }}>
              <SelectTrigger className={cn("h-12 rounded-2xl bg-muted border-none font-bold", errors.businessType && "ring-2 ring-red-500/50")}>
                <SelectValue placeholder="Select type..." />
              </SelectTrigger>
              <SelectContent>
                {types.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          ))}

          {field("businessName", "Business Name *", "e.g., Karim's Restaurant", (
            <Input
              value={draft.businessName}
              onChange={(e) => { update({ businessName: e.target.value }); setErrors(p => ({ ...p, businessName: "" })) }}
              placeholder="e.g., Karim's Restaurant"
              className={cn("h-12 rounded-2xl bg-muted border-none font-bold text-lg", errors.businessName && "ring-2 ring-red-500/50")}
            />
          ))}

          {field("brandName", "Alternate / Brand Name (Optional)", "e.g., Karim's Hotel", (
            <Input
              value={draft.brandName}
              onChange={(e) => update({ brandName: e.target.value })}
              placeholder="e.g., Karim's Hotel"
              className="h-12 rounded-2xl bg-muted border-none font-bold"
            />
          ))}

          {field("tagline", "Tagline / Short Description (Optional)", "e.g., The Original since 1913", (
            <Input
              value={draft.tagline}
              onChange={(e) => update({ tagline: e.target.value })}
              placeholder="e.g., The Original since 1913"
              className="h-12 rounded-2xl bg-muted border-none font-medium"
              maxLength={100}
            />
          ))}

          {field("description", "About Your Business *", "Tell customers what makes your business special...", (
            <div className="space-y-1">
              <Textarea
                value={draft.description}
                onChange={(e) => { update({ description: e.target.value }); setErrors(p => ({ ...p, description: "" })) }}
                placeholder="Describe your business, its history, and what sets you apart..."
                className={cn("min-h-[140px] rounded-2xl bg-muted border-none p-4 font-medium resize-none", errors.description && "ring-2 ring-red-500/50")}
                maxLength={1000}
              />
              <p className="text-xs text-muted-foreground text-right">{draft.description.length}/1000</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between gap-4">
        <Button variant="outline" className="rounded-2xl h-14 px-8 border-2 font-black uppercase text-xs tracking-widest" onClick={() => router.back()}>
          Back
        </Button>
        <Button className="rounded-2xl h-14 px-10 font-black bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 flex-1" onClick={handleNext}>
          Continue to Location <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default function DetailsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-muted-foreground">Loading...</div>}>
      <DetailsForm />
    </Suspense>
  )
}
