"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft, ArrowRight, Sparkles, CheckCircle2,
  Camera, Youtube, Instagram, Twitter, Globe,
  Mic, Users, DollarSign, Handshake, Link2,
  PenTool, Music, Video, BookOpen, Radio,
  Smartphone, Rss, Image as ImageIcon,
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

const CREATOR_CATEGORIES = [
  "Islamic Scholarship", "Quranic Education", "Islamic Finance",
  "Modest Fashion", "Halal Food & Cooking", "Muslim Lifestyle",
  "Mental Health & Wellness", "Marriage & Family", "Da'wah & Outreach",
  "Muslim Travel", "Islamic Art & Calligraphy", "Tech & Entrepreneurship",
  "Parenting & Homeschool", "Sports & Fitness", "Beauty & Skincare",
  "Business & Career", "Music & Nasheeds", "Comedy & Entertainment",
]

const CONTENT_FORMATS = [
  { label: "Long-form Video", icon: Video },
  { label: "Short-form Reels", icon: Smartphone },
  { label: "Podcasts / Audio", icon: Mic },
  { label: "Blog / Written", icon: PenTool },
  { label: "Live Streams", icon: Radio },
  { label: "Online Courses", icon: BookOpen },
  { label: "Social Posts", icon: ImageIcon },
  { label: "Nasheeds / Music", icon: Music },
  { label: "Newsletters", icon: Rss },
]

const AUDIENCE_AGES = ["Under 18", "18–24", "25–34", "35–44", "45–54", "55+", "All Ages", "Families"]

const COLLAB_TYPES = [
  "Paid Sponsorships", "Affiliate Marketing", "Product Reviews",
  "Brand Ambassadorships", "Content Licensing", "Speaking / Events",
  "Course Collaborations", "Podcast Guest Appearances", "Halal Certification Reviews",
]

const FOLLOWER_RANGES = ["0 – 1k", "1k – 10k", "10k – 50k", "50k – 100k", "100k – 500k", "500k+"]

const STEPS = [
  { number: 1, title: "Identity & Bio" },
  { number: 2, title: "Content Niche" },
  { number: 3, title: "Reach & Platforms" },
  { number: 4, title: "Collaboration" },
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

export default function CreatorActivationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const { hasCapability, getCapability, activateCapability, loading } = useCapabilities()

  const [step, setStep] = React.useState(1)
  const [submitting, setSubmitting] = React.useState(false)

  // Step 1 — Identity
  const [displayName, setDisplayName] = React.useState("")
  const [handle, setHandle] = React.useState("")
  const [bio, setBio] = React.useState("")
  const [location, setLocation] = React.useState("")

  // Step 2 — Content Niche
  const [categories, setCategories] = React.useState<string[]>([])
  const [formats, setFormats] = React.useState<string[]>([])
  const [audienceAges, setAudienceAges] = React.useState<string[]>([])

  // Step 3 — Reach & Platforms
  const [followerRange, setFollowerRange] = React.useState("")
  const [instagram, setInstagram] = React.useState("")
  const [youtube, setYoutube] = React.useState("")
  const [twitter, setTwitter] = React.useState("")
  const [tiktok, setTiktok] = React.useState("")
  const [website, setWebsite] = React.useState("")

  // Step 4 — Collaboration
  const [collabTypes, setCollabTypes] = React.useState<string[]>([])
  const [startingRate, setStartingRate] = React.useState("")
  const [campaignRate, setCampaignRate] = React.useState("")
  const [collabNote, setCollabNote] = React.useState("")

  const isActive = hasCapability("creator")
  const cap = getCapability("creator")

  const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) =>
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  const canProceed = () => {
    if (step === 1) return bio.trim().length >= 20
    if (step === 2) return categories.length > 0
    if (step === 3) return true
    return true
  }

  const handleSubmit = async () => {
    if (!categories.length) { toast({ variant: "destructive", title: "Select at least one creator category" }); return }
    if (!bio.trim()) { toast({ variant: "destructive", title: "Add a short bio" }); return }
    if (!user?.uid) { toast({ variant: "destructive", title: "Sign in required" }); return }

    setSubmitting(true)
    const supabase = createClient()

    const { error: profileError } = await supabase.from("creator_profiles").upsert({
      user_id: user.uid,
      display_name: displayName || null,
      handle: handle || null,
      bio,
      location: location || null,
      category: categories[0],
      content_categories: categories,
      content_formats: formats,
      audience_ages: audienceAges,
      follower_range: followerRange || null,
      social_links: {
        instagram: instagram || null,
        youtube: youtube || null,
        twitter: twitter || null,
        tiktok: tiktok || null,
        website: website || null,
      },
      collab_types: collabTypes,
      starting_rate: startingRate || null,
      campaign_rate: campaignRate || null,
      collab_note: collabNote || null,
      verification_status: "pending",
    }, { onConflict: "user_id" })

    if (profileError) {
      toast({ variant: "destructive", title: "Something went wrong", description: profileError.message })
      setSubmitting(false)
      return
    }

    const { error: capError } = await activateCapability("creator", { category: categories[0] })
    setSubmitting(false)

    if (capError) {
      toast({ variant: "destructive", title: "Could not activate capability", description: String(capError) })
      return
    }

    toast({ title: "Creator capability activated!", description: "Your creator profile is now live." })
    router.push("/vendor/creative/dashboard")
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
            <h1 className="text-2xl font-black text-foreground">Creator Active</h1>
            <p className="text-sm text-muted-foreground">Your creator capability is live. Head to Creator Studio to manage your content.</p>
          </div>
          <div className="flex flex-col gap-3">
            <Button className="rounded-2xl bg-primary text-white font-black h-12" onClick={() => router.push("/vendor/creative/dashboard")}>
              Open Creator Studio
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
            <Sparkles className="h-10 w-10 text-amber-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-foreground">Under Review</h1>
            <p className="text-sm text-muted-foreground">Your creator application is being reviewed. We'll notify you once it's approved.</p>
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
              <Sparkles className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-black text-foreground tracking-tight">Become a Creator</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
              Share your knowledge and passion with the Ummah. Create content, grow a following, and collaborate — all within your single Halal Hub identity.
            </p>
            <div className="flex items-center justify-center gap-2 pt-1">
              <Badge className="bg-primary/10 text-primary border-none font-bold text-xs">Free to activate</Badge>
              <Badge className="bg-muted text-muted-foreground border-none font-bold text-xs">No separate account</Badge>
            </div>
          </div>
        )}

        {/* ── Step 1: Identity & Bio ── */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Display Name</Label>
                <Input
                  placeholder="e.g., Shaykh Hamza"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  className="h-12 rounded-2xl bg-muted border-none font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Handle / Username</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-sm">@</span>
                  <Input
                    placeholder="your_handle"
                    value={handle}
                    onChange={e => setHandle(e.target.value.replace(/\s/g, "_").toLowerCase())}
                    className="h-12 rounded-2xl bg-muted border-none font-bold pl-8"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Location</Label>
              <Input
                placeholder="e.g., London, UK"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="h-12 rounded-2xl bg-muted border-none font-bold"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Creator Bio <span className="text-primary">*</span></Label>
              <Textarea
                placeholder="Tell the Ummah what you create and why it matters…"
                value={bio}
                onChange={e => setBio(e.target.value)}
                maxLength={280}
                className="rounded-2xl resize-none min-h-[110px] font-medium text-sm bg-muted border-none p-4"
              />
              <p className="text-xs text-muted-foreground text-right">{bio.length}/280 · minimum 20 characters</p>
            </div>
          </div>
        )}

        {/* ── Step 2: Content Niche ── */}
        {step === 2 && (
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-black">Content Categories <span className="text-primary">*</span></h2>
                <p className="text-sm text-muted-foreground font-medium">Select all topics your content covers.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {CREATOR_CATEGORIES.map(cat => (
                  <Chip key={cat} label={cat} selected={categories.includes(cat)} onClick={() => toggle(categories, setCategories, cat)} />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-black">Content Formats</h2>
                <p className="text-sm text-muted-foreground font-medium">What types of content do you produce?</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CONTENT_FORMATS.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggle(formats, setFormats, label)}
                    className={cn(
                      "p-4 rounded-2xl border-2 flex flex-col items-center gap-2 text-center transition-all",
                      formats.includes(label)
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-transparent bg-muted text-muted-foreground hover:border-primary/20"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-bold leading-tight">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-black">Target Audience Ages</h2>
                <p className="text-sm text-muted-foreground font-medium">Who does your content primarily speak to?</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {AUDIENCE_AGES.map(age => (
                  <Chip key={age} label={age} selected={audienceAges.includes(age)} onClick={() => toggle(audienceAges, setAudienceAges, age)} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 3: Reach & Platforms ── */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-black flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Overall Reach</h2>
                <p className="text-sm text-muted-foreground font-medium">Your combined follower / subscriber count across all platforms.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {FOLLOWER_RANGES.map(range => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setFollowerRange(range)}
                    className={cn(
                      "p-4 rounded-2xl border-2 text-sm font-bold transition-all",
                      followerRange === range
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-transparent bg-muted text-muted-foreground hover:border-primary/20"
                    )}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-black flex items-center gap-2"><Link2 className="h-5 w-5 text-primary" /> Social Platforms</h2>
                <p className="text-sm text-muted-foreground font-medium">Add your handles or profile URLs. Skip any that don't apply.</p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Instagram", icon: Instagram, value: instagram, set: setInstagram, placeholder: "@handle or full URL", color: "text-pink-600", bg: "bg-pink-50" },
                  { label: "YouTube", icon: Youtube, value: youtube, set: setYoutube, placeholder: "https://youtube.com/@channel", color: "text-red-600", bg: "bg-red-50" },
                  { label: "TikTok", icon: Smartphone, value: tiktok, set: setTiktok, placeholder: "@tiktok_handle", color: "text-foreground", bg: "bg-muted" },
                  { label: "Twitter / X", icon: Twitter, value: twitter, set: setTwitter, placeholder: "@handle", color: "text-foreground", bg: "bg-muted" },
                  { label: "Website / Blog", icon: Globe, value: website, set: setWebsite, placeholder: "https://yoursite.com", color: "text-blue-600", bg: "bg-blue-50" },
                ].map(({ label, icon: Icon, value, set, placeholder, color, bg }) => (
                  <div key={label} className="flex items-center gap-4 p-4 bg-muted/60 rounded-2xl">
                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", bg, color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
                      <Input
                        value={value}
                        onChange={e => set(e.target.value)}
                        placeholder={placeholder}
                        className="h-8 border-none bg-transparent p-0 text-sm font-bold focus-visible:ring-0"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 4: Collaboration ── */}
        {step === 4 && (
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-black flex items-center gap-2"><Handshake className="h-5 w-5 text-primary" /> Collaboration Types</h2>
                <p className="text-sm text-muted-foreground font-medium">How are you open to working with brands and the community?</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {COLLAB_TYPES.map(type => (
                  <Chip key={type} label={type} selected={collabTypes.includes(type)} onClick={() => toggle(collabTypes, setCollabTypes, type)} />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-black flex items-center gap-2"><DollarSign className="h-5 w-5 text-primary" /> Rate Preferences</h2>
                <p className="text-sm text-muted-foreground font-medium">Optional — helps brands understand your ballpark rates.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Starting Rate (Per Post)</Label>
                  <Input placeholder="e.g., £500" value={startingRate} onChange={e => setStartingRate(e.target.value)} className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Campaign Rate (Per Month)</Label>
                  <Input placeholder="e.g., £2,500" value={campaignRate} onChange={e => setCampaignRate(e.target.value)} className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Collaboration Note</Label>
                  <Textarea
                    placeholder="e.g., Open to long-term brand partnerships with halal-certified businesses only."
                    value={collabNote}
                    onChange={e => setCollabNote(e.target.value)}
                    className="rounded-2xl resize-none min-h-[90px] bg-muted border-none p-4 font-medium text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Summary card */}
            <Card className="rounded-3xl border-none bg-zinc-900 text-white p-8 space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Summary</p>
              <div className="space-y-2">
                {bio && <p className="text-sm font-medium opacity-70 line-clamp-2 italic">"{bio}"</p>}
                {categories.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {categories.slice(0, 4).map(c => (
                      <span key={c} className="px-2 py-0.5 rounded-lg bg-primary/20 text-primary text-[10px] font-black">{c}</span>
                    ))}
                    {categories.length > 4 && <span className="text-[10px] font-black opacity-40">+{categories.length - 4} more</span>}
                  </div>
                )}
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
              disabled={submitting || !bio.trim() || categories.length === 0}
              onClick={handleSubmit}
            >
              {submitting ? "Activating…" : "Activate Creator Capability"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
