"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Briefcase, CheckCircle2, ShieldCheck, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useCapabilities } from "@/hooks/use-capabilities"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

const PROFESSIONS = [
  "Doctor / Physician", "Dentist", "Nurse / Healthcare", "Lawyer / Solicitor",
  "Accountant / Auditor", "Financial Advisor", "Architect", "Engineer",
  "Software Developer", "Designer (UX/UI)", "Teacher / Educator", "Therapist / Counselor",
  "Business Consultant", "HR Professional", "Marketing Specialist", "Real Estate Agent",
  "Travel Consultant", "Chef / Nutritionist", "Personal Trainer", "Life Coach", "Other",
]

const AVAILABILITY_OPTIONS = [
  { value: "available",       label: "Available Now" },
  { value: "by_appointment",  label: "By Appointment" },
  { value: "busy",            label: "Currently Busy" },
]

export default function ProfessionalActivationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const { hasCapability, getCapability, activateCapability, loading } = useCapabilities()

  const [profession, setProfession] = React.useState("")
  const [customProfession, setCustomProfession] = React.useState("")
  const [experienceYears, setExperienceYears] = React.useState("")
  const [skillInput, setSkillInput] = React.useState("")
  const [skills, setSkills] = React.useState<string[]>([])
  const [availability, setAvailability] = React.useState("available")
  const [hourlyRate, setHourlyRate] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  const isActive = hasCapability("professional")
  const cap = getCapability("professional")

  const addSkill = () => {
    const s = skillInput.trim()
    if (s && !skills.includes(s)) setSkills(prev => [...prev, s])
    setSkillInput("")
  }

  const removeSkill = (skill: string) => setSkills(prev => prev.filter(s => s !== skill))

  const finalProfession = profession === "Other" ? customProfession : profession

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!finalProfession.trim()) { toast({ variant: "destructive", title: "Select your profession" }); return }
    if (!user?.uid) { toast({ variant: "destructive", title: "Sign in required" }); return }

    setSubmitting(true)
    const supabase = createClient()

    const { error: profileError } = await (supabase as any).from("professional_profiles").upsert({
      user_id: user.uid,
      profession: finalProfession,
      experience_years: experienceYears ? parseInt(experienceYears) : null,
      skills,
      availability,
      hourly_rate: hourlyRate ? parseFloat(hourlyRate) : null,
      verification_status: "pending",
    }, { onConflict: "user_id" })

    if (profileError) {
      toast({ variant: "destructive", title: "Something went wrong", description: profileError.message })
      setSubmitting(false)
      return
    }

    const { error: capError } = await activateCapability("professional", { profession: finalProfession })
    setSubmitting(false)

    if (capError) {
      toast({ variant: "destructive", title: "Could not activate capability", description: String(capError) })
      return
    }

    toast({ title: "Application submitted!", description: "Your professional profile is under review. We'll notify you once approved." })
    router.push("/account/dashboard")
  }

  if (loading) return null

  if (isActive) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full rounded-3xl border-none shadow-sm p-10 text-center space-y-6">
          <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-foreground">Professional Active</h1>
            <p className="text-sm text-muted-foreground">Your professional profile is live and discoverable.</p>
          </div>
          <div className="flex flex-col gap-3">
            <Button className="rounded-2xl bg-primary text-white font-black h-12" onClick={() => router.push("/vendor/professional/dashboard")}>
              Open Professional Dashboard
            </Button>
            <Button variant="outline" className="rounded-2xl font-black h-12" onClick={() => router.back()}>Back</Button>
          </div>
        </Card>
      </div>
    )
  }

  if (cap?.status === "pending") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full rounded-3xl border-none shadow-sm p-10 text-center space-y-6">
          <div className="h-20 w-20 rounded-3xl bg-amber-50 flex items-center justify-center mx-auto">
            <Briefcase className="h-10 w-10 text-amber-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-foreground">Application Under Review</h1>
            <p className="text-sm text-muted-foreground">Our team is reviewing your professional profile. This typically takes 24–48 hours.</p>
          </div>
          <Button variant="outline" className="rounded-2xl font-black h-12 w-full" onClick={() => router.back()}>Back to Profile</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur border-b px-4 h-16 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-2xl">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-black">Offer Professional Services</h1>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <div className="text-center space-y-3 pb-4">
          <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-violet-500/25">
            <Briefcase className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-black text-foreground tracking-tight">Professional Capability</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Make your expertise available to the Muslim community. Receive enquiries, manage bookings, and build your professional reputation — all within your Halal Hub identity.
          </p>
          <div className="flex items-center justify-center gap-2 pt-1">
            <Badge className="bg-amber-50 text-amber-700 border-none font-bold text-xs">Admin reviewed</Badge>
            <Badge className="bg-muted text-muted-foreground border-none font-bold text-xs">24–48h approval</Badge>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profession */}
          <div className="space-y-3">
            <Label className="text-sm font-black uppercase tracking-wider text-muted-foreground">Your Profession</Label>
            <div className="grid grid-cols-2 gap-2">
              {PROFESSIONS.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setProfession(p)}
                  className={cn(
                    "text-left px-4 py-3 rounded-2xl text-sm font-bold border-2 transition-all",
                    profession === p
                      ? "border-violet-500 bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-300"
                      : "border-border bg-card text-muted-foreground hover:border-violet-400/40",
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
            {profession === "Other" && (
              <Input
                placeholder="Specify your profession…"
                value={customProfession}
                onChange={e => setCustomProfession(e.target.value)}
                className="rounded-2xl font-medium mt-2"
              />
            )}
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label className="text-sm font-black uppercase tracking-wider text-muted-foreground">Years of Experience <span className="font-medium normal-case">(optional)</span></Label>
            <Input
              type="number"
              min={0}
              max={60}
              placeholder="e.g. 8"
              value={experienceYears}
              onChange={e => setExperienceYears(e.target.value)}
              className="rounded-2xl font-medium max-w-[140px]"
            />
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <Label className="text-sm font-black uppercase tracking-wider text-muted-foreground">Key Skills <span className="font-medium normal-case">(optional)</span></Label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g. Contract Law, Tax Planning…"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill() } }}
                className="rounded-2xl font-medium flex-1"
              />
              <Button type="button" variant="outline" onClick={addSkill} className="rounded-2xl shrink-0 h-10 w-10 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.map(s => (
                  <Badge key={s} className="bg-muted text-foreground border-none font-bold gap-1.5 pr-1">
                    {s}
                    <button type="button" onClick={() => removeSkill(s)} className="hover:text-destructive transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Availability */}
          <div className="space-y-3">
            <Label className="text-sm font-black uppercase tracking-wider text-muted-foreground">Availability</Label>
            <div className="flex gap-2 flex-wrap">
              {AVAILABILITY_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setAvailability(opt.value)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-bold border-2 transition-all",
                    availability === opt.value
                      ? "border-violet-500 bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-300"
                      : "border-border bg-card text-muted-foreground hover:border-violet-400/40",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hourly Rate */}
          <div className="space-y-2">
            <Label className="text-sm font-black uppercase tracking-wider text-muted-foreground">Hourly Rate (₹) <span className="font-medium normal-case">(optional)</span></Label>
            <div className="relative max-w-[200px]">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">₹</span>
              <Input
                type="number"
                min={0}
                placeholder="0"
                value={hourlyRate}
                onChange={e => setHourlyRate(e.target.value)}
                className="pl-8 rounded-2xl font-medium"
              />
            </div>
          </div>

          {/* What you unlock */}
          <Card className="rounded-2xl border-none bg-secondary/50 p-5 space-y-3">
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">What you unlock</p>
            {[
              "Searchable professional profile",
              "Receive enquiry & booking requests",
              "Professional dashboard with analytics",
              "Verified Professional badge",
              "Featured in professional directory",
            ].map(item => (
              <div key={item} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                <ShieldCheck className="h-4 w-4 text-violet-500 shrink-0" />
                {item}
              </div>
            ))}
          </Card>

          <Button
            type="submit"
            disabled={submitting || !finalProfession.trim()}
            className="w-full h-14 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black text-base shadow-lg shadow-violet-500/25 transition-all"
          >
            {submitting ? "Submitting…" : "Submit for Review"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">Adds the professional capability to your existing Halal Hub identity. No new account is created.</p>
        </form>
      </div>
    </div>
  )
}
