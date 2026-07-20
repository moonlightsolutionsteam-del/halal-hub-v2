// @ts-nocheck
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { PlusCircle, Network, Users, Trash2, Loader2 } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

const ROLES = [
  "Imam",
  "Deputy Imam",
  "Khatib",
  "Committee Chair",
  "Secretary",
  "Treasurer",
  "Board Member",
  "Youth Leader",
  "Women's Circle Lead",
  "Volunteer Coordinator",
  "Other",
]

type StaffMember = {
  id: string
  name: string | null
  role: string | null
  image_url: string | null
}

export default function MosqueLeadershipPage() {
  const { user, loading: authLoading } = useAuth()
  const [businessId, setBusinessId] = React.useState<string | null>(null)
  const [staff, setStaff] = React.useState<StaffMember[]>([])
  const [loading, setLoading] = React.useState(true)
  const [adding, setAdding] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [form, setForm] = React.useState({ name: "", role: ROLES[0] })

  const load = React.useCallback(() => {
    if (authLoading || !user?.uid) { setLoading(false); return }
    const supabase = createClient()
    supabase.from("businesses").select("id").eq("owner_id", user.uid).limit(1).maybeSingle()
      .then(({ data }: { data: { id: string } | null }) => {
        if (!data) { setLoading(false); return }
        setBusinessId(data.id)
        supabase.from("business_staff")
          .select("id, name, role, image_url")
          .eq("business_id", data.id)
          .order("created_at", { ascending: true })
          .then(({ data: rows }: { data: StaffMember[] | null }) => {
            setStaff(rows ?? [])
            setLoading(false)
          })
      })
  }, [user?.uid, authLoading])

  React.useEffect(() => { load() }, [load])

  async function handleAdd() {
    if (!form.name.trim() || !businessId) return
    setSaving(true)
    await createClient().from("business_staff").insert({
      business_id: businessId,
      name: form.name.trim(),
      role: form.role,
    })
    setForm({ name: "", role: ROLES[0] })
    setAdding(false)
    setSaving(false)
    load()
  }

  async function handleDelete(id: string) {
    await createClient().from("business_staff").delete().eq("id", id)
    load()
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Leadership</h1>
          <p className="text-sm font-bold text-muted-foreground">Manage your Imam and committee members.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/vendor/mosque/leadership/tree">
            <Button variant="outline" className="rounded-full"><Network className="h-4 w-4 mr-2" />Org Chart</Button>
          </Link>
          <Button className="rounded-full" onClick={() => setAdding(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />Add Member
          </Button>
        </div>
      </div>

      {adding && (
        <Card>
          <CardContent className="pt-5 space-y-3">
            <p className="text-sm font-black">New Leadership Member</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <label className="text-xs font-bold text-muted-foreground">Name *</label>
                <Input
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Sheikh Abdullah"
                  autoFocus
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground">Role</label>
                <select
                  className="w-full h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium"
                  value={form.role}
                  onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                >
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <Button className="h-9 rounded-lg font-bold" onClick={handleAdd} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Member"}
              </Button>
              <Button variant="ghost" className="h-9 rounded-lg font-bold" onClick={() => setAdding(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-6 w-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : staff.length === 0 && !adding ? (
        <Card className="rounded-[2rem] border-none shadow-soft p-12 text-center space-y-3">
          <Users className="h-10 w-10 text-muted-foreground/30 mx-auto" />
          <p className="font-black text-foreground">No leadership members yet</p>
          <p className="text-sm text-muted-foreground">Add your Imam and committee members to get started.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {staff.map((person) => (
            <Card key={person.id} className="rounded-[2rem] border-none shadow-soft text-center relative group">
              <CardContent className="p-6 space-y-3">
                <Avatar className="h-20 w-20 mx-auto border-2 border-border">
                  <AvatarImage src={person.image_url ?? ""} />
                  <AvatarFallback>{(person.name ?? "M")[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-black text-foreground">{person.name ?? "—"}</p>
                  <Badge variant="secondary" className="mt-1 text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40">
                    {person.role ?? "Staff"}
                  </Badge>
                </div>
                <button
                  onClick={() => handleDelete(person.id)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground/40 hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
