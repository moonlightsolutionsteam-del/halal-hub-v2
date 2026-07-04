"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useOnboarding } from "@/lib/onboarding-context"
import { ArrowRight, Phone, Mail, Globe, Instagram, Facebook, Youtube, MessageCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ContactPage() {
  const router = useRouter()
  const { draft, update } = useOnboarding()
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!draft.phone.trim()) e.phone = "Phone number is required."
    if (draft.phone && !/^\+?[0-9\s\-().]{7,20}$/.test(draft.phone)) e.phone = "Enter a valid phone number."
    if (draft.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) e.email = "Enter a valid email address."
    if (draft.website && !/^https?:\/\/.+/.test(draft.website)) e.website = "Website must start with http:// or https://"
    return e
  }

  function handleNext() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    update({ currentStep: 5 })
    router.push("/partner/onboarding/business/halal")
  }

  function Row({ icon, label, field, placeholder, required, hint }: {
    icon: React.ReactNode, label: string, field: keyof typeof draft, placeholder: string, required?: boolean, hint?: string
  }) {
    return (
      <div className="space-y-2">
        <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">{label}{required && " *"}</Label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>
          <Input
            value={draft[field] as string}
            onChange={(e) => { update({ [field]: e.target.value }); setErrors(p => ({ ...p, [field]: "" })) }}
            placeholder={placeholder}
            className={cn("h-12 rounded-2xl bg-muted border-none font-bold pl-11", errors[field as string] && "ring-2 ring-red-500/50")}
          />
        </div>
        {errors[field as string] && <p className="text-xs font-bold text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors[field as string]}</p>}
        {hint && !errors[field as string] && <p className="text-xs text-muted-foreground font-medium">{hint}</p>}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Step 5 of 8</p>
        <h1 className="text-3xl font-black font-headline text-foreground flex items-center gap-3">
          <Phone className="h-8 w-8 text-primary" /> Contact & Social Media
        </h1>
        <p className="text-sm text-muted-foreground font-medium">How should customers and the Halal Hub team reach you?</p>
      </div>

      <Card className="rounded-[2rem] border-none shadow-soft bg-card">
        <CardContent className="p-8 space-y-6">
          <div className="space-y-1 pb-2">
            <p className="text-sm font-black text-foreground">Contact Details</p>
          </div>

          <Row icon={<Phone className="h-4 w-4" />} label="Phone Number" field="phone" placeholder="+91 99999 99999" required hint="This number will be visible to customers." />
          <Row icon={<MessageCircle className="h-4 w-4" />} label="WhatsApp Number" field="whatsapp" placeholder="+91 99999 99999" hint="Leave blank if same as phone." />
          <Row icon={<Mail className="h-4 w-4" />} label="Email Address" field="email" placeholder="info@yourbusiness.com" hint="For verification & notifications only." />
          <Row icon={<Globe className="h-4 w-4" />} label="Website" field="website" placeholder="https://yourbusiness.com" />

          <div className="border-t pt-6 space-y-1 pb-2">
            <p className="text-sm font-black text-foreground">Social Media (Optional)</p>
            <p className="text-xs text-muted-foreground font-medium">Add links to boost trust and discovery.</p>
          </div>

          <Row icon={<Instagram className="h-4 w-4" />} label="Instagram" field="instagram" placeholder="https://instagram.com/yourbusiness" />
          <Row icon={<Facebook className="h-4 w-4" />} label="Facebook" field="facebook" placeholder="https://facebook.com/yourbusiness" />
          <Row icon={<Youtube className="h-4 w-4" />} label="YouTube" field="youtube" placeholder="https://youtube.com/@yourbusiness" />
        </CardContent>
      </Card>

      <div className="flex justify-between gap-4">
        <Button variant="outline" className="rounded-2xl h-14 px-8 border-2 font-black uppercase text-xs tracking-widest" onClick={() => router.back()}>
          Back
        </Button>
        <Button className="rounded-2xl h-14 px-10 font-black bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 flex-1" onClick={handleNext}>
          Continue to Halal Declaration <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
