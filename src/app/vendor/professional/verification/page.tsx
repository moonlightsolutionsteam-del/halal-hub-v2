"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Award, CheckCircle2, Clock, Upload, ShieldCheck, Star, Zap, Lock, Phone, Mail } from "lucide-react"

const BADGES = [
  { id: "identity", label: "Identity Verified", desc: "Government ID confirmed", icon: ShieldCheck, status: "verified", color: "emerald" },
  { id: "email", label: "Email Verified", desc: "yusuf@yusufqahtani.com", icon: Mail, status: "verified", color: "emerald" },
  { id: "phone", label: "Phone Verified", desc: "+44 7700 900000", icon: Phone, status: "verified", color: "emerald" },
  { id: "professional", label: "Professional Certified", desc: "LinkedIn or credential verified", icon: Award, status: "pending", color: "amber" },
  { id: "portfolio", label: "Portfolio Verified", desc: "Work samples independently reviewed", icon: Star, status: "not_started", color: "gray" },
  { id: "halal", label: "Halal Network Verified", desc: "Endorsed by verified Halal professionals", icon: CheckCircle2, status: "not_started", color: "gray" },
]

export default function ProfessionalVerificationPage() {
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState<typeof BADGES[0] | null>(null)

  const verified = BADGES.filter(b => b.status === "verified").length
  const total = BADGES.length

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-3xl mx-auto pb-24">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
          <Award className="h-3 w-3" /> Verification
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Profile Verification</h1>
        <p className="text-sm font-bold text-muted-foreground">Build trust with verified credentials and professional badges.</p>
      </div>

      {/* Progress */}
      <Card className="rounded-[2rem] border-none shadow-sm bg-gradient-to-r from-violet-600 to-violet-700 text-white p-8">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-full border-4 border-white/30 flex items-center justify-center shrink-0">
            <div className="text-center">
              <p className="text-2xl font-black">{verified}</p>
              <p className="text-[10px] font-black opacity-80">of {total}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-black text-xl">Verification Score</p>
            <p className="text-sm text-white/80 font-medium">You're {verified} of {total} verifications complete. Fully verified profiles receive 3× more inbound opportunities.</p>
            <div className="flex gap-2">
              <Badge className="bg-white/20 text-white border-none font-black text-[10px]">Identity ✓</Badge>
              <Badge className="bg-white/20 text-white border-none font-black text-[10px]">Email ✓</Badge>
              <Badge className="bg-white/20 text-white border-none font-black text-[10px]">Phone ✓</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Badges */}
      <div className="space-y-4">
        <h2 className="text-lg font-black">Verification Badges</h2>
        <div className="space-y-3">
          {BADGES.map(badge => (
            <Card key={badge.id} className="rounded-[2rem] border-none shadow-sm bg-card p-6">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  badge.status === "verified" ? "bg-emerald-50" :
                  badge.status === "pending" ? "bg-amber-50" : "bg-muted"
                }`}>
                  <badge.icon className={`h-5 w-5 ${
                    badge.status === "verified" ? "text-emerald-600" :
                    badge.status === "pending" ? "text-amber-600" : "text-muted-foreground"
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-black text-foreground">{badge.label}</p>
                    {badge.status === "verified" && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                    {badge.status === "pending" && <Clock className="h-4 w-4 text-amber-500" />}
                  </div>
                  <p className="text-xs font-bold text-muted-foreground">{badge.desc}</p>
                </div>
                <div className="shrink-0">
                  {badge.status === "verified" ? (
                    <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px]">Verified</Badge>
                  ) : badge.status === "pending" ? (
                    <Badge className="bg-amber-50 text-amber-600 border-none font-black text-[10px]">In Review</Badge>
                  ) : (
                    <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-black text-xs h-9"
                      onClick={() => { setSelected(badge); setShowModal(true) }}>
                      Verify Now
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* What verification unlocks */}
      <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-4">
        <h2 className="text-lg font-black flex items-center gap-2">
          <Zap className="h-5 w-5 text-violet-600" /> What Verification Unlocks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Verified badge on your profile",
            "Priority in search results",
            "3× more inbound messages",
            "Access to exclusive opportunities",
            "Higher trust from businesses",
            "Featured in Verified directory",
          ].map(b => (
            <div key={b} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span className="text-sm font-bold text-foreground">{b}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Verify Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="rounded-[2rem] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">{selected?.label}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <p className="text-sm font-bold text-muted-foreground">Upload your credential to start the verification process. Our team reviews submissions within 2–3 business days.</p>
            <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-violet-300 cursor-pointer transition-colors">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="font-bold text-sm">Upload Document</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, JPG or PNG — Max 10MB</p>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">Reference Number (optional)</Label>
              <Input placeholder="e.g., License or certificate number" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black" onClick={() => setShowModal(false)}>
              Submit for Review
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
