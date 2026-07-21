"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Users, Loader2, UserPlus, Crown, Shield } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

type Member = {
  id: string
  user_id: string
  role: string
  display_name: string | null
  joined_at: string
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString([], { month: "short", year: "numeric" })
}

export default function FamilyMembersPage() {
  const { user } = useAuth()
  const [members, setMembers] = React.useState<Member[]>([])
  const [groupName, setGroupName] = React.useState("")
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    async function load() {
      const { data: myRow } = await (supabase as any)
        .from("family_members")
        .select("group_id, family_groups(name)")
        .eq("user_id", user!.uid)
        .maybeSingle()
      if (!myRow) { setLoading(false); return }
      setGroupName(myRow.family_groups?.name ?? "Family")
      const { data } = await (supabase as any)
        .from("family_members")
        .select("id, user_id, role, display_name, joined_at")
        .eq("group_id", myRow.group_id)
        .order("joined_at", { ascending: true })
      setMembers(data ?? [])
      setLoading(false)
    }
    load()
  }, [user?.uid])

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  )

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-2xl space-y-5 pb-24">
      <div>
        <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-3 w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Hub
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black">Members</h1>
              <p className="text-xs text-muted-foreground font-bold">{groupName} · {members.length} member{members.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <Button asChild variant="outline" className="rounded-xl gap-2 font-bold h-9">
            <Link href="/family-tree/setup"><UserPlus className="h-4 w-4" /> Invite</Link>
          </Button>
        </div>
      </div>

      {members.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <Users className="h-10 w-10 text-muted-foreground/20" />
          <p className="font-black">No group yet</p>
          <p className="text-sm text-muted-foreground">Set up your family hub first.</p>
          <Button asChild className="rounded-xl font-bold">
            <Link href="/family-tree/setup">Set Up Family Hub</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {members.map(m => (
            <Card key={m.id} className="rounded-2xl border-none shadow-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <Avatar className="h-11 w-11 shrink-0">
                  <AvatarFallback className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 font-black">
                    {(m.display_name ?? "?")[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-black text-sm text-foreground truncate">{m.display_name ?? "Member"}</p>
                    {m.user_id === user?.uid && (
                      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">(you)</span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground font-medium">Joined {fmtDate(m.joined_at)}</p>
                </div>
                <Badge className={`text-[9px] font-black uppercase shrink-0 border-none gap-1 ${
                  m.role === "admin"
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {m.role === "admin" ? <Crown className="h-2.5 w-2.5" /> : <Shield className="h-2.5 w-2.5" />}
                  {m.role}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
