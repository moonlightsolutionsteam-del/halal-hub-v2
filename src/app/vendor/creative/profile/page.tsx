"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  UserCircle, Camera, Globe, Save,
  CheckCircle2, ShieldCheck, Image as ImageIcon,
  Youtube, Instagram, Twitter, Linkedin,
  DollarSign, Handshake, Link2, Star, Sparkles, Mic
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const CREATOR_CATEGORIES = [
  "Islamic Scholarship", "Quranic Education", "Islamic Finance",
  "Modest Fashion", "Halal Food & Cooking", "Muslim Lifestyle",
  "Mental Health & Wellness", "Marriage & Family", "Da'wah & Outreach",
  "Muslim Travel", "Islamic Art & Calligraphy", "Tech & Entrepreneurship",
]

const COLLAB_TYPES = [
  "Paid Sponsorships", "Affiliate Marketing", "Product Reviews",
  "Brand Ambassadorships", "Content Licensing", "Speaking / Events",
  "Course Collaborations", "Podcast Guest Appearances",
]

export default function CreativeProfilePage() {
  const [activeTab, setActiveTab] = useState("identity")

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-4xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <UserCircle className="h-3 w-3" /> Identity Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Creator Identity</h1>
          <p className="text-muted-foreground font-medium">Manage your public persona, content categories, and collaboration settings.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-12 px-8 font-black uppercase text-xs tracking-widest shadow-xl">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-card border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="identity" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Identity</TabsTrigger>
          <TabsTrigger value="content" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Content</TabsTrigger>
          <TabsTrigger value="collaboration" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Collaboration</TabsTrigger>
          <TabsTrigger value="accounts" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Accounts</TabsTrigger>
        </TabsList>

        <TabsContent value="identity" className="space-y-8 animate-in fade-in duration-500">
          <Card className="rounded-[3rem] border-none shadow-sm bg-card overflow-hidden">
            <div className="h-36 bg-muted relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20" />
              <Button variant="secondary" className="absolute bottom-4 right-4 h-9 rounded-xl font-bold text-xs bg-card/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                <ImageIcon className="h-4 w-4 mr-2" /> Change Cover
              </Button>
            </div>
            <CardContent className="p-5 sm:p-10 pt-0">
              <div className="flex flex-col sm:flex-row gap-8 items-end -mt-14 mb-10">
                <div className="relative shrink-0">
                  <Avatar className="h-28 w-28 border-8 border-card shadow-2xl">
                    <AvatarImage src="https://picsum.photos/seed/creator-main/400/400" />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-black">HA</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-1 right-1 h-10 w-10 bg-primary text-white rounded-2xl flex items-center justify-center border-4 border-card shadow-xl hover:scale-110 transition-transform">
                    <Camera className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-1 pb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-3xl font-black text-foreground">Shaykh Hamza</h3>
                    <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] uppercase px-3 h-6">VERIFIED SCHOLAR</Badge>
                  </div>
                  <p className="text-sm font-bold text-muted-foreground">@hamza_legacy · Member since 2021</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Display Name</Label>
                  <Input defaultValue="Shaykh Hamza" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Handle / Username</Label>
                  <Input defaultValue="@hamza_legacy" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Primary Language</Label>
                  <Input defaultValue="English / Arabic" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Location</Label>
                  <Input placeholder="e.g., London, UK" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Public Bio</Label>
                  <Textarea
                    className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium"
                    defaultValue="Bridging traditional wisdom with modern life. Islamic scholar and digital educator focusing on ethical lifestyles."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-8 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" /> Content Categories
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Select all topics and themes your content covers. This helps brands and followers discover you.</p>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CREATOR_CATEGORIES.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 p-4 bg-muted rounded-2xl cursor-pointer hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all">
                    <input type="checkbox" className="accent-emerald-600 h-4 w-4" defaultChecked={cat === "Islamic Scholarship" || cat === "Muslim Lifestyle"} />
                    <span className="text-sm font-bold text-foreground">{cat}</span>
                  </label>
                ))}
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Mic className="h-5 w-5 text-primary" /> Content Formats
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Long-form Video", "Short-form Reels", "Podcasts / Audio", "Blog / Written", "Live Streams", "Online Courses", "Social Posts", "Newsletters"].map((fmt) => (
                  <label key={fmt} className="flex items-center gap-3 p-4 bg-muted rounded-2xl cursor-pointer hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all">
                    <input type="checkbox" className="accent-emerald-600 h-4 w-4" />
                    <span className="text-sm font-bold text-foreground">{fmt}</span>
                  </label>
                ))}
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" /> Audience Age Ranges
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Under 18", "18–24", "25–34", "35–44", "45–54", "55+", "All Ages", "Families"].map((age) => (
                  <label key={age} className="flex items-center gap-3 p-3 bg-muted rounded-xl cursor-pointer hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all">
                    <input type="checkbox" className="accent-emerald-600 h-4 w-4" />
                    <span className="text-xs font-bold text-foreground">{age}</span>
                  </label>
                ))}
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-8 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Handshake className="h-5 w-5 text-primary" /> Collaboration Types
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Tell brands how you're open to working together.</p>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {COLLAB_TYPES.map((type) => (
                  <label key={type} className="flex items-center gap-3 p-4 bg-muted rounded-2xl cursor-pointer hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all">
                    <input type="checkbox" className="accent-emerald-600 h-4 w-4" />
                    <span className="text-sm font-bold text-foreground">{type}</span>
                  </label>
                ))}
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" /> Rate Preferences
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Starting Rate (Per Post)</Label>
                  <Input placeholder="e.g., £500" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Campaign Rate (Per Month)</Label>
                  <Input placeholder="e.g., £2,500" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Collaboration Note (visible to brands)</Label>
                  <Textarea
                    placeholder="e.g., Open to long-term brand partnerships with halal-certified businesses only."
                    className="min-h-[100px] rounded-2xl bg-muted border-none p-4 font-medium"
                  />
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-8 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Link2 className="h-5 w-5 text-primary" /> Digital Presence
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Connect your social channels to display follower counts and verify your reach.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: "Personal Website", icon: Globe, placeholder: "https://yoursite.com", color: "text-blue-600", bg: "bg-blue-50" },
                { label: "YouTube Channel", icon: Youtube, placeholder: "https://youtube.com/@handle", color: "text-red-600", bg: "bg-red-50" },
                { label: "Instagram", icon: Instagram, placeholder: "@handle or full URL", color: "text-pink-600", bg: "bg-pink-50" },
                { label: "Twitter / X", icon: Twitter, placeholder: "@handle", color: "text-foreground", bg: "bg-muted" },
                { label: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/in/...", color: "text-blue-700", bg: "bg-blue-50" },
              ].map((social) => (
                <Card key={social.label} className="rounded-3xl border-none shadow-sm bg-card p-6 group hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform ${social.bg} ${social.color}`}>
                      <social.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">{social.label}</p>
                      <Input placeholder={social.placeholder} className="h-9 border-none bg-transparent p-0 text-sm font-bold focus-visible:ring-0" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Card className="rounded-[3rem] border-none bg-zinc-900 text-white p-10 relative overflow-hidden flex flex-col md:flex-row items-center gap-10 shadow-2xl">
            <ShieldCheck className="absolute -top-4 -right-4 h-48 w-48 opacity-10 text-primary" />
            <div className="h-20 w-20 rounded-[2rem] bg-card/10 flex items-center justify-center text-primary border border-white/10 shadow-2xl shrink-0">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div className="space-y-2 relative z-10 flex-1 text-center md:text-left">
              <h3 className="text-2xl font-black tracking-tight leading-tight">Verified Authority Status</h3>
              <p className="text-muted-foreground font-medium leading-relaxed italic">
                Your scholarly credentials have been audited and verified by the Halal Hub Integrity Board. This gives you high-visibility across the ecosystem.
              </p>
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-card/10 rounded-xl h-12 px-8 font-black text-xs uppercase tracking-widest relative z-10">
              Audit Records
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
