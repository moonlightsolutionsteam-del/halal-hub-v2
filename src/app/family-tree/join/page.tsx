"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Loader2, CheckCircle2, ArrowRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

function JoinPageInner() {
  const router = useRouter()
  const params = useSearchParams()
  const { user } = useAuth()
  const { toast } = useToast()

  const [code, setCode] = React.useState(params.get("code") ?? "")
  const [joining, setJoining] = React.useState(false)
  const [joined, setJoined] = React.useState(false)
  const [groupName, setGroupName] = React.useState("")

  const handleJoin = async () => {
    if (!code.trim()) return
    if (!user?.uid) {
      toast({ title: "Sign in to join a family group", variant: "destructive" })
      return
    }
    setJoining(true)
    const supabase = createClient()

    // Look up group by invite code
    const { data: group } = await (supabase as any)
      .from("family_groups")
      .select("id, name")
      .ilike("invite_code", code.trim())
      .maybeSingle()

    if (!group) {
      toast({ title: "Invalid invite code", description: "Check the code and try again.", variant: "destructive" })
      setJoining(false)
      return
    }

    // Check if already a member
    const { data: existing } = await (supabase as any)
      .from("family_members")
      .select("id")
      .eq("group_id", group.id)
      .eq("user_id", user.uid)
      .maybeSingle()

    if (existing) {
      toast({ title: "Already a member of this family group!" })
      router.push("/family-tree")
      return
    }

    // Join the group
    const { error } = await (supabase as any).from("family_members").insert({
      group_id: group.id,
      user_id: user.uid,
      role: "member",
      display_name: user.name ?? user.email ?? "Family Member",
    })

    if (error) {
      toast({ title: "Failed to join", description: error.message, variant: "destructive" })
      setJoining(false)
      return
    }

    setGroupName(group.name)
    setJoined(true)
    setJoining(false)
  }

  if (joined) {
    return (
      <div className="container mx-auto p-6 max-w-md flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <div className="h-20 w-20 rounded-3xl bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-foreground">Welcome to the family!</h1>
          <p className="text-muted-foreground font-medium mt-1">You've joined <span className="font-black text-foreground">{groupName}</span>.</p>
        </div>
        <Button onClick={() => router.push("/family-tree")} className="rounded-2xl h-13 px-8 font-black">
          Go to Family Hub <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-md space-y-8 pb-24">
      <div className="text-center space-y-2">
        <div className="h-16 w-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center mx-auto">
          <Users className="h-8 w-8 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-black text-foreground">Join Family Hub</h1>
        <p className="text-sm text-muted-foreground font-medium">Enter the invite code shared by your family admin.</p>
      </div>

      <Card className="rounded-[2rem] border-none shadow-sm">
        <CardContent className="p-6 space-y-4">
          <Input
            placeholder="Enter invite code (e.g. A1B2C3D4)"
            className="h-14 rounded-2xl bg-muted border-none font-black text-xl tracking-widest text-center uppercase"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            maxLength={8}
            onKeyDown={e => e.key === "Enter" && handleJoin()}
          />
          <Button
            onClick={handleJoin}
            disabled={joining || !code.trim()}
            className="w-full h-14 rounded-2xl font-black text-base bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl"
          >
            {joining ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Join Family <ArrowRight className="ml-2 h-4 w-4" /></>}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function JoinPage() {
  return (
    <React.Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>}>
      <JoinPageInner />
    </React.Suspense>
  )
}
