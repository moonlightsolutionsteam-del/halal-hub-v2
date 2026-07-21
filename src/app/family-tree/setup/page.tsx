"use client"

import * as React from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Phone, Mail, Link as LinkIcon, ArrowRight, ArrowLeft,
  ShieldCheck, CheckCircle2, Loader2, Copy, Check
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

export default function FamilySetupPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  const [step, setStep] = React.useState(1)
  const [familyName, setFamilyName] = React.useState("")
  const [saving, setSaving] = React.useState(false)
  const [inviteCode, setInviteCode] = React.useState<string | null>(null)
  const [groupId, setGroupId] = React.useState<string | null>(null)
  const [copied, setCopied] = React.useState(false)

  const inviteUrl = inviteCode
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/family-tree/join?code=${inviteCode}`
    : null

  const handleCopyLink = () => {
    if (!inviteUrl) return
    navigator.clipboard?.writeText(inviteUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: "Invite link copied!" })
  }

  const handleCreateGroup = async () => {
    if (!familyName.trim()) {
      toast({ title: "Enter a family name", variant: "destructive" })
      return
    }
    if (!user?.uid) {
      toast({ title: "Sign in to create a family group", variant: "destructive" })
      return
    }
    setSaving(true)
    const supabase = createClient()

    // Create the group
    const { data: group, error: gErr } = await (supabase as any)
      .from("family_groups")
      .insert({ name: familyName.trim(), created_by: user.uid })
      .select("id, invite_code")
      .single()

    if (gErr || !group) {
      toast({ title: "Failed to create group", description: gErr?.message, variant: "destructive" })
      setSaving(false)
      return
    }

    // Add creator as admin member
    await (supabase as any).from("family_members").insert({
      group_id: group.id,
      user_id: user.uid,
      role: "admin",
      display_name: user.name ?? user.email ?? "Family Admin",
    })

    setGroupId(group.id)
    setInviteCode(group.invite_code)
    setSaving(false)
    setStep(2)
  }

  const handleFinish = () => {
    router.push("/family-tree")
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-8 max-w-3xl pb-24">

      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost" size="icon"
          className="rounded-2xl bg-card shadow-sm border h-11 w-11"
          onClick={() => step === 1 ? router.back() : setStep(step - 1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-black font-headline text-foreground">Family Setup</h1>
          <div className="flex gap-2 mt-1.5">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 w-10 rounded-full transition-all ${step >= i ? "bg-emerald-600" : "bg-muted"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Step 1 — Name */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div>
            <h2 className="text-xl font-black text-foreground">Step 1: Family Name</h2>
            <p className="text-sm text-muted-foreground font-medium mt-1">How should we refer to your family?</p>
          </div>
          <Card className="rounded-[2rem] border-none shadow-sm bg-card">
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Family Display Name</Label>
                <Input
                  placeholder="e.g., The Al-Sayed Family"
                  className="h-14 rounded-2xl bg-muted border-none font-black text-lg"
                  value={familyName}
                  onChange={e => setFamilyName(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && familyName.trim() && handleCreateGroup()}
                />
              </div>
              <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-emerald-900 dark:text-emerald-300 leading-relaxed">
                  Your family group is strictly private. Only members you invite can see board items, events, or messages.
                </p>
              </div>
            </CardContent>
          </Card>
          <Button
            onClick={handleCreateGroup}
            disabled={saving || !familyName.trim()}
            className="w-full h-14 rounded-2xl font-black text-base shadow-xl"
          >
            {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Continue <ArrowRight className="ml-2 h-4 w-4" /></>}
          </Button>
        </div>
      )}

      {/* Step 2 — Invite */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div>
            <h2 className="text-xl font-black text-foreground">Step 2: Invite Members</h2>
            <p className="text-sm text-muted-foreground font-medium mt-1">Add your parents, spouse, or children to the hub.</p>
          </div>
          <div className="space-y-3">
            {[
              { label: "Copy Invite Link", icon: LinkIcon, action: handleCopyLink, primary: true },
              { label: "Share via WhatsApp", icon: Phone, action: () => {
                if (inviteUrl) window.open(`https://wa.me/?text=${encodeURIComponent(`Join our family hub: ${inviteUrl}`)}`, "_blank")
              }, primary: false },
              { label: "Share via Email", icon: Mail, action: () => {
                if (inviteUrl) window.open(`mailto:?subject=Join our family hub&body=${encodeURIComponent(`Click to join: ${inviteUrl}`)}`, "_blank")
              }, primary: false },
            ].map((opt, i) => (
              <Card key={i} className={`rounded-2xl border-none shadow-sm cursor-pointer transition-all hover:shadow-md ${opt.primary ? "bg-primary text-primary-foreground" : "bg-card"}`} onClick={opt.action}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${opt.primary ? "bg-white/20" : "bg-muted"}`}>
                    {opt.label === "Copy Invite Link" && copied
                      ? <Check className="h-5 w-5" />
                      : <opt.icon className="h-5 w-5" />
                    }
                  </div>
                  <span className="font-bold text-sm">{opt.label}</span>
                  <ArrowRight className="h-4 w-4 ml-auto opacity-50" />
                </CardContent>
              </Card>
            ))}
          </div>
          {inviteCode && (
            <div className="flex items-center gap-3 p-4 bg-muted rounded-2xl">
              <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Code:</span>
              <span className="font-black text-lg text-foreground tracking-widest">{inviteCode.toUpperCase()}</span>
              <Button variant="ghost" size="sm" className="ml-auto rounded-xl text-xs font-bold" onClick={handleCopyLink}>
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            </div>
          )}
          <Button onClick={() => setStep(3)} className="w-full h-14 rounded-2xl font-black text-base shadow-xl">
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Step 3 — Done */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div>
            <h2 className="text-xl font-black text-foreground">Step 3: You're All Set!</h2>
            <p className="text-sm text-muted-foreground font-medium mt-1">Your family hub is ready to use.</p>
          </div>
          <Card className="rounded-[2rem] border-none shadow-sm bg-card">
            <CardContent className="p-8 space-y-4">
              {[
                { label: "Family created", done: true },
                { label: "Invite links ready", done: true },
                { label: "Board & chat unlocked", done: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className={`h-5 w-5 shrink-0 ${item.done ? "text-emerald-600" : "text-muted-foreground"}`} />
                  <span className={`font-bold text-sm ${item.done ? "text-foreground" : "text-muted-foreground"}`}>{item.label}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter className="bg-muted/50 p-5 rounded-b-[2rem] border-t">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center w-full">
                Members who join with your code will be added automatically.
              </p>
            </CardFooter>
          </Card>
          <Button onClick={handleFinish} className="w-full h-14 rounded-2xl font-black text-base shadow-xl">
            Go to Family Hub <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
