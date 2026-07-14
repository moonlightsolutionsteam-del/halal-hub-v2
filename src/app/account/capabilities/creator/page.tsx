"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Sparkles, ShieldCheck, Camera, Youtube, Instagram, Twitter, Globe, CheckCircle2 } from "lucide-react"
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

const CREATOR_CATEGORIES = [
  "Food & Cuisine", "Islamic Education", "Modest Fashion", "Travel & Lifestyle",
  "Business & Finance", "Health & Wellness", "Parenting & Family", "Art & Design",
  "Technology", "Community & Social", "Sports & Fitness", "Entertainment",
]

const CONTENT_TAGS = [
  "Short Videos", "Long-form Video", "Reels", "Podcasts", "Blog Posts",
  "Photo Stories", "Live Streams", "Reviews", "Tutorials", "Vlogs", "Interviews",
]

export default function CreatorActivationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const { hasCapability, getCapability, activateCapability, loading } = useCapabilities()

  const [bio, setBio] = React.useState("")
  const [category, setCategory] = React.useState("")
  const [selectedContent, setSelectedContent] = React.useState<string[]>([])
  const [instagram, setInstagram] = React.useState("")
  const [youtube, setYoutube] = React.useState("")
  const [twitter, setTwitter] = React.useState("")
  const [website, setWebsite] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  const isActive = hasCapability("creator")
  const cap = getCapability("creator")

  const toggleContent = (tag: string) =>
    setSelectedContent(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!category) { toast({ variant: "destructive", title: "Select a creator category" }); return }
    if (!bio.trim()) { toast({ variant: "destructive", title: "Add a short bio" }); return }
    if (!user?.uid) { toast({ variant: "destructive", title: "Sign in required" }); return }

    setSubmitting(true)
    const supabase = createClient()

    // Upsert creator_profile
    const { error: profileError } = await (supabase as any).from("creator_profiles").upsert({
      user_id: user.uid,
      bio,
      category,
      content_categories: selectedContent,
      social_links: {
        instagram: instagram || null,
        youtube: youtube || null,
        twitter: twitter || null,
        website: website || null,
      },
      verification_status: "pending",
    }, { onConflict: "user_id" })

    if (profileError) {
      toast({ variant: "destructive", title: "Something went wrong", description: profileError.message })
      setSubmitting(false)
      return
    }

    // Activate capability
    const { error: capError } = await activateCapability("creator", { category })
    setSubmitting(false)

    if (capError) {
      toast({ variant: "destructive", title: "Could not activate capability", description: String(capError) })
      return
    }

    toast({ title: "Creator capability activated!", description: "Your creator profile is now live." })
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
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur border-b px-4 h-16 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-2xl">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-black">Become a Creator</h1>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <div className="text-center space-y-3 pb-4">
          <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-primary/25">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-black text-foreground tracking-tight">Creator Capability</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Share your knowledge and passion with the Ummah. Create content, grow a following, and collaborate with others — all within your single Halal Hub identity.
          </p>
          <div className="flex items-center justify-center gap-2 pt-1">
            <Badge className="bg-primary/10 text-primary border-none font-bold text-xs">Free to activate</Badge>
            <Badge className="bg-muted text-muted-foreground border-none font-bold text-xs">No separate account</Badge>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bio */}
          <div className="space-y-2">
            <Label className="text-sm font-black uppercase tracking-wider text-muted-foreground">Creator Bio</Label>
            <Textarea
              placeholder="Tell the Ummah what you create and why it matters…"
              value={bio}
              onChange={e => setBio(e.target.value)}
              maxLength={280}
              className="rounded-2xl resize-none min-h-[100px] font-medium text-sm"
            />
            <p className="text-xs text-muted-foreground text-right">{bio.length}/280</p>
          </div>

          {/* Category */}
          <div className="space-y-3">
            <Label className="text-sm font-black uppercase tracking-wider text-muted-foreground">Primary Category</Label>
            <div className="grid grid-cols-2 gap-2">
              {CREATOR_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "text-left px-4 py-3 rounded-2xl text-sm font-bold border-2 transition-all",
                    category === cat
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Content Types */}
          <div className="space-y-3">
            <Label className="text-sm font-black uppercase tracking-wider text-muted-foreground">Content Types <span className="text-muted-foreground font-medium normal-case">(optional)</span></Label>
            <div className="flex flex-wrap gap-2">
              {CONTENT_TAGS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleContent(tag)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-bold border transition-all",
                    selectedContent.includes(tag)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40",
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <Label className="text-sm font-black uppercase tracking-wider text-muted-foreground">Social Links <span className="text-muted-foreground font-medium normal-case">(optional)</span></Label>
            <div className="space-y-3">
              {[
                { icon: Instagram, placeholder: "Instagram username", value: instagram, setValue: setInstagram },
                { icon: Youtube,   placeholder: "YouTube channel URL", value: youtube, setValue: setYoutube },
                { icon: Twitter,   placeholder: "X (Twitter) username", value: twitter, setValue: setTwitter },
                { icon: Globe,     placeholder: "Personal website URL", value: website, setValue: setWebsite },
              ].map(({ icon: Icon, placeholder, value, setValue }) => (
                <div key={placeholder} className="relative">
                  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={placeholder}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    className="pl-11 rounded-2xl font-medium"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* What you unlock */}
          <Card className="rounded-2xl border-none bg-secondary/50 p-5 space-y-3">
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">What you unlock</p>
            {[
              "Creator Dashboard with analytics",
              "Publish posts, reels, and stories",
              "Creator badge on your profile",
              "Collaboration requests from businesses",
              "Creator Spotlight in the feed",
            ].map(item => (
              <div key={item} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                {item}
              </div>
            ))}
          </Card>

          <Button
            type="submit"
            disabled={submitting || !category || !bio.trim()}
            className="w-full h-14 rounded-2xl bg-primary text-white font-black text-base shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all"
          >
            {submitting ? "Activating…" : "Activate Creator Capability"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">This adds the creator capability to your existing Halal Hub identity. No new account is created.</p>
        </form>
      </div>
    </div>
  )
}
