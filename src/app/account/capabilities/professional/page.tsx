"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft, ArrowRight, Briefcase, CheckCircle2,
  Globe, MapPin, Clock, DollarSign, Star,
  GraduationCap, Award, Plus, X, Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useCapabilities } from "@/hooks/use-capabilities"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

// ─── Data ────────────────────────────────────────────────────────────────────

const PROFESSION_CATEGORIES: Record<string, string[]> = {
  "Healthcare": ["Doctor / Physician", "Dentist", "Nurse / Healthcare", "Pharmacist", "Physiotherapist", "Nutritionist / Dietitian", "Therapist / Counselor", "Psychiatrist", "Optometrist"],
  "Legal & Finance": ["Lawyer / Solicitor", "Accountant / Auditor", "Financial Advisor", "Tax Consultant", "Insurance Broker", "Mortgage Advisor", "Sharia Finance Advisor"],
  "Technology": ["Software Developer", "Data Scientist", "UX / UI Designer", "Cybersecurity Specialist", "DevOps / Cloud Engineer", "AI / ML Engineer", "Product Manager"],
  "Education": ["Teacher / Educator", "Tutor / Private Instructor", "Academic Researcher", "Curriculum Designer", "Educational Consultant", "Islamic Studies Teacher"],
  "Business & Consulting": ["Business Consultant", "HR Professional", "Marketing Specialist", "Brand Strategist", "Operations Manager", "Project Manager"],
  "Creative & Media": ["Graphic Designer", "Photographer", "Videographer", "Copywriter", "Architect", "Interior Designer"],
  "Lifestyle & Wellness": ["Personal Trainer", "Life Coach", "Yoga / Fitness Instructor", "Beauty / Makeup Artist"],
  "Real Estate & Trade": ["Real Estate Agent", "Contractor / Builder", "Electrician / Plumber", "Property Manager"],
}

const SKILLS_BY_PROFESSION: Record<string, string[]> = {
  "Doctor / Physician": ["General Medicine", "Family Practice", "Preventive Care", "Chronic Disease Management", "Telemedicine"],
  "Lawyer / Solicitor": ["Contract Law", "Family Law", "Immigration", "Criminal Defence", "Property Law", "Wills & Probate"],
  "Software Developer": ["React", "Node.js", "Python", "TypeScript", "AWS", "Mobile Development", "API Design"],
  "Financial Advisor": ["Investment Planning", "Halal Finance", "Zakat Calculation", "Retirement Planning", "Portfolio Management"],
  "Teacher / Educator": ["Curriculum Design", "Islamic Studies", "Quran Teaching", "Maths", "English", "Science"],
  "Sharia Finance Advisor": ["Islamic Banking", "Sukuk", "Zakat", "Murabaha", "Ijara", "Halal Investment Screening"],
}

const AVAILABILITY_OPTIONS = [
  { value: "available", label: "Available Now" },
  { value: "by_appointment", label: "By Appointment" },
  { value: "busy", label: "Currently Busy" },
]

const SERVICE_MODES = ["In-Person", "Online / Remote", "Home Visits", "Clinic / Office", "Hybrid"]

const EXPERIENCE_LEVELS = [
  { value: "1-2", label: "1–2 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "6-10", label: "6–10 years" },
  { value: "10+", label: "10+ years" },
]

const STEPS = [
  { number: 1, title: "Profession & Expertise" },
  { number: 2, title: "Skills & Qualifications" },
  { number: 3, title: "Services & Pricing" },
  { number: 4, title: "Availability & Location" },
]

// ─── Chip helper ─────────────────────────────────────────────────────────────

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-2xl text-sm font-bold border-2 transition-all",
        selected
          ? "bg-primary text-white border-primary shadow-sm"
          : "bg-muted text-muted-foreground border-transparent hover:border-primary/30 hover:text-foreground"
      )}
    >
      {label}
    </button>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProfessionalActivationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const { hasCapability, getCapability, activateCapability, loading } = useCapabilities()

  const [step, setStep] = React.useState(1)
  const [submitting, setSubmitting] = React.useState(false)

  // Step 1 — Profession
  const [profession, setProfession] = React.useState("")
  const [customProfession, setCustomProfession] = React.useState("")
  const [bio, setBio] = React.useState("")
  const [experienceLevel, setExperienceLevel] = React.useState("")

  // Step 2 — Skills & Qualifications
  const [skills, setSkills] = React.useState<string[]>([])
  const [skillInput, setSkillInput] = React.useState("")
  const [qualifications, setQualifications] = React.useState<string[]>([])
  const [qualInput, setQualInput] = React.useState("")
  const [languages, setLanguages] = React.useState<string[]>([])
  const [langInput, setLangInput] = React.useState("")

  // Step 3 — Services & Pricing
  const [serviceModes, setServiceModes] = React.useState<string[]>([])
  const [hourlyRate, setHourlyRate] = React.useState("")
  const [sessionRate, setSessionRate] = React.useState("")
  const [openToVolunteer, setOpenToVolunteer] = React.useState(false)
  const [serviceNote, setServiceNote] = React.useState("")

  // Step 4 — Availability & Location
  const [availability, setAvailability] = React.useState("available")
  const [city, setCity] = React.useState("")
  const [country, setCountry] = React.useState("")
  const [website, setWebsite] = React.useState("")
  const [linkedin, setLinkedin] = React.useState("")

  const isActive = hasCapability("professional")
  const cap = getCapability("professional")

  const finalProfession = profession === "Other" ? customProfession : profession

  const suggestedSkills = React.useMemo(() =>
    (SKILLS_BY_PROFESSION[finalProfession] || []).filter(s => !skills.includes(s)),
    [finalProfession, skills]
  )

  const addTag = (val: string, arr: string[], setArr: (v: string[]) => void) => {
    const trimmed = val.trim()
    if (trimmed && !arr.includes(trimmed)) setArr([...arr, trimmed])
  }

  const removeTag = (val: string, arr: string[], setArr: (v: string[]) => void) =>
    setArr(arr.filter(x => x !== val))

  const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) =>
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  const canProceed = () => {
    if (step === 1) return !!finalProfession.trim() && bio.trim().length >= 20
    return true
  }

  const handleSubmit = async () => {
    if (!finalProfession.trim()) { toast({ variant: "destructive", title: "Select your profession" }); return }
    if (!bio.trim()) { toast({ variant: "destructive", title: "Add a short bio" }); return }
    if (!user?.uid) { toast({ variant: "destructive", title: "Sign in required" }); return }

    setSubmitting(true)
    const supabase = createClient()

    const { error: profileError } = await supabase.from("professional_profiles").upsert({
      user_id: user.uid,
      profession: finalProfession,
      bio,
      experience_level: experienceLevel || null,
      skills,
      qualifications,
      languages,
      service_modes: serviceModes,
      hourly_rate: hourlyRate ? parseFloat(hourlyRate.replace(/[^0-9.]/g, "")) : null,
      session_rate: sessionRate ? parseFloat(sessionRate.replace(/[^0-9.]/g, "")) : null,
      open_to_volunteer: openToVolunteer,
      service_note: serviceNote || null,
      availability,
      city: city || null,
      country: country || null,
      website: website || null,
      linkedin: linkedin || null,
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

    toast({ title: "Application submitted!", description: "Your professional profile is under review." })
    router.push("/vendor/professional/dashboard")
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
            <h1 className="text-2xl font-black text-foreground">Under Review</h1>
            <p className="text-sm text-muted-foreground">Your professional profile is being reviewed. We'll notify you once approved.</p>
          </div>
          <Button variant="outline" className="rounded-2xl font-black h-12 w-full" onClick={() => router.back()}>Back to Profile</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur border-b px-4 h-16 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => step > 1 ? setStep(s => s - 1) : router.back()} className="rounded-2xl">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Step {step} of {STEPS.length}</p>
          <h1 className="text-sm font-black text-foreground">{STEPS[step - 1].title}</h1>
        </div>
        <div className="flex gap-1">
          {STEPS.map(s => (
            <div key={s.number} className={cn("h-1.5 rounded-full transition-all", s.number <= step ? "bg-primary" : "bg-muted", s.number === step ? "w-8" : "w-4")} />
          ))}
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8 space-y-8">
        {/* Hero — only on step 1 */}
        {step === 1 && (
          <div className="text-center space-y-3 pb-2">
            <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-primary/25">
              <Briefcase className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-black text-foreground tracking-tight">Become a Professional</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
              Offer your expertise to the Ummah. Get discovered by clients, build trust through verified credentials, and serve your community.
            </p>
            <div className="flex items-center justify-center gap-2 pt-1">
              <Badge className="bg-primary/10 text-primary border-none font-bold text-xs">Free to activate</Badge>
              <Badge className="bg-muted text-muted-foreground border-none font-bold text-xs">Verified status available</Badge>
            </div>
          </div>
        )}

        {/* ── Step 1: Profession & Expertise ── */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-lg font-black">Select Your Profession <span className="text-primary">*</span></h2>
              <div className="space-y-4">
                {Object.entries(PROFESSION_CATEGORIES).map(([category, profs]) => (
                  <div key={category} className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{category}</p>
                    <div className="flex flex-wrap gap-2">
                      {profs.map(p => (
                        <Chip key={p} label={p} selected={profession === p} onClick={() => setProfession(p)} />
                      ))}
                    </div>
                  </div>
                ))}
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Other</p>
                  <Chip label="Other / Not listed" selected={profession === "Other"} onClick={() => setProfession("Other")} />
                  {profession === "Other" && (
                    <Input
                      placeholder="Describe your profession"
                      value={customProfession}
                      onChange={e => setCustomProfession(e.target.value)}
                      className="h-12 rounded-2xl bg-muted border-none font-bold mt-2"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-black">Years of Experience</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {EXPERIENCE_LEVELS.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setExperienceLevel(value)}
                    className={cn(
                      "p-4 rounded-2xl border-2 text-sm font-bold transition-all",
                      experienceLevel === value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-transparent bg-muted text-muted-foreground hover:border-primary/20"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Professional Bio <span className="text-primary">*</span></Label>
              <Textarea
                placeholder="Describe your expertise, approach, and how you serve clients…"
                value={bio}
                onChange={e => setBio(e.target.value)}
                maxLength={320}
                className="rounded-2xl resize-none min-h-[110px] font-medium text-sm bg-muted border-none p-4"
              />
              <p className="text-xs text-muted-foreground text-right">{bio.length}/320 · minimum 20 characters</p>
            </div>
          </div>
        )}

        {/* ── Step 2: Skills & Qualifications ── */}
        {step === 2 && (
          <div className="space-y-8">
            {/* Skills */}
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-black flex items-center gap-2"><Star className="h-5 w-5 text-primary" /> Skills & Specialisations</h2>
                <p className="text-sm text-muted-foreground font-medium">Add your key areas of expertise.</p>
              </div>
              {suggestedSkills.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Suggested for {finalProfession}</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedSkills.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSkills(prev => [...prev, s])}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all flex items-center gap-1"
                      >
                        <Plus className="h-3 w-3" /> {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill and press Enter"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag(skillInput, skills, setSkills); setSkillInput("") } }}
                  className="h-12 rounded-2xl bg-muted border-none font-bold flex-1"
                />
                <Button type="button" variant="outline" className="h-12 rounded-2xl font-bold px-5" onClick={() => { addTag(skillInput, skills, setSkills); setSkillInput("") }}>
                  Add
                </Button>
              </div>
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map(s => (
                    <span key={s} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-bold">
                      {s}
                      <button type="button" onClick={() => removeTag(s, skills, setSkills)} className="opacity-60 hover:opacity-100"><X className="h-3 w-3" /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Qualifications */}
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-black flex items-center gap-2"><GraduationCap className="h-5 w-5 text-primary" /> Qualifications & Credentials</h2>
                <p className="text-sm text-muted-foreground font-medium">Degrees, certifications, professional memberships.</p>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., MBBS, ACCA, Bar Council"
                  value={qualInput}
                  onChange={e => setQualInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag(qualInput, qualifications, setQualifications); setQualInput("") } }}
                  className="h-12 rounded-2xl bg-muted border-none font-bold flex-1"
                />
                <Button type="button" variant="outline" className="h-12 rounded-2xl font-bold px-5" onClick={() => { addTag(qualInput, qualifications, setQualifications); setQualInput("") }}>
                  Add
                </Button>
              </div>
              {qualifications.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {qualifications.map(q => (
                    <span key={q} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted text-foreground text-xs font-bold">
                      <Award className="h-3 w-3 text-primary" /> {q}
                      <button type="button" onClick={() => removeTag(q, qualifications, setQualifications)} className="opacity-60 hover:opacity-100"><X className="h-3 w-3" /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Languages */}
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-black flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Languages Spoken</h2>
                <p className="text-sm text-muted-foreground font-medium">Languages you can serve clients in.</p>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., English, Arabic, Urdu"
                  value={langInput}
                  onChange={e => setLangInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag(langInput, languages, setLanguages); setLangInput("") } }}
                  className="h-12 rounded-2xl bg-muted border-none font-bold flex-1"
                />
                <Button type="button" variant="outline" className="h-12 rounded-2xl font-bold px-5" onClick={() => { addTag(langInput, languages, setLanguages); setLangInput("") }}>
                  Add
                </Button>
              </div>
              {languages.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {languages.map(l => (
                    <span key={l} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted text-foreground text-xs font-bold">
                      {l}
                      <button type="button" onClick={() => removeTag(l, languages, setLanguages)} className="opacity-60 hover:opacity-100"><X className="h-3 w-3" /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Step 3: Services & Pricing ── */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-black">Service Delivery Modes</h2>
                <p className="text-sm text-muted-foreground font-medium">How do you deliver your services?</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {SERVICE_MODES.map(mode => (
                  <Chip key={mode} label={mode} selected={serviceModes.includes(mode)} onClick={() => toggle(serviceModes, setServiceModes, mode)} />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-black flex items-center gap-2"><DollarSign className="h-5 w-5 text-primary" /> Pricing</h2>
                <p className="text-sm text-muted-foreground font-medium">Optional — helps clients understand your rates.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Hourly Rate</Label>
                  <Input placeholder="e.g., £80/hr" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Per-Session / Consultation</Label>
                  <Input placeholder="e.g., £150" value={sessionRate} onChange={e => setSessionRate(e.target.value)} className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
              </div>
              <label className="flex items-center gap-3 p-4 rounded-2xl bg-muted cursor-pointer group">
                <input
                  type="checkbox"
                  checked={openToVolunteer}
                  onChange={e => setOpenToVolunteer(e.target.checked)}
                  className="h-4 w-4 accent-emerald-600"
                />
                <span className="text-sm font-bold text-foreground">Open to pro-bono / volunteer work for the community</span>
              </label>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Service Note</Label>
                <Textarea
                  placeholder="e.g., Initial consultation is free. Focused on serving Muslim women and families."
                  value={serviceNote}
                  onChange={e => setServiceNote(e.target.value)}
                  className="rounded-2xl resize-none min-h-[90px] bg-muted border-none p-4 font-medium text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Step 4: Availability & Location ── */}
        {step === 4 && (
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-black flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> Availability Status</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {AVAILABILITY_OPTIONS.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAvailability(value)}
                    className={cn(
                      "p-4 rounded-2xl border-2 text-sm font-bold transition-all",
                      availability === value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-transparent bg-muted text-muted-foreground hover:border-primary/20"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-black flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Location</h2>
                <p className="text-sm text-muted-foreground font-medium">Helps local clients discover you.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">City</Label>
                  <Input placeholder="e.g., London" value={city} onChange={e => setCity(e.target.value)} className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Country</Label>
                  <Input placeholder="e.g., United Kingdom" value={country} onChange={e => setCountry(e.target.value)} className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-black flex items-center gap-2"><Globe className="h-5 w-5 text-primary" /> Online Presence</h2>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Website / Portfolio", icon: Globe, value: website, set: setWebsite, placeholder: "https://yoursite.com", color: "text-blue-700", bg: "bg-blue-50" },
                  { label: "LinkedIn", icon: Briefcase, value: linkedin, set: setLinkedin, placeholder: "https://linkedin.com/in/yourname", color: "text-blue-700", bg: "bg-blue-50" },
                ].map(({ label, icon: Icon, value, set, placeholder, color, bg }) => (
                  <div key={label} className="flex items-center gap-4 p-4 bg-muted/60 rounded-2xl">
                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", bg, color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
                      <Input value={value} onChange={e => set(e.target.value)} placeholder={placeholder} className="h-8 border-none bg-transparent p-0 text-sm font-bold focus-visible:ring-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <Card className="rounded-3xl border-none bg-zinc-900 text-white p-8 space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Your Profile Summary</p>
              <div className="space-y-3">
                <p className="text-base font-black">{finalProfession}</p>
                {experienceLevel && <p className="text-sm opacity-60">{EXPERIENCE_LEVELS.find(e => e.value === experienceLevel)?.label} experience</p>}
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {skills.slice(0, 5).map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-lg bg-primary/20 text-primary text-[10px] font-black">{s}</span>
                    ))}
                    {skills.length > 5 && <span className="text-[10px] font-black opacity-40">+{skills.length - 5} more</span>}
                  </div>
                )}
                {bio && <p className="text-xs opacity-50 line-clamp-2 italic">"{bio}"</p>}
              </div>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 pt-2">
          {step < STEPS.length ? (
            <Button
              className="flex-1 h-12 rounded-2xl bg-primary text-white font-black shadow-lg shadow-primary/20 disabled:opacity-40"
              disabled={!canProceed()}
              onClick={() => setStep(s => s + 1)}
            >
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              className="flex-1 h-12 rounded-2xl bg-primary text-white font-black shadow-lg shadow-primary/20"
              disabled={submitting || !finalProfession.trim() || !bio.trim()}
              onClick={handleSubmit}
            >
              {submitting ? "Submitting…" : "Submit Professional Profile"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
