"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { AdminRoleGate } from "@/components/admin-role-gate"
import { useAdminRole, AdminTier } from "@/hooks/use-admin-role"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Shield, ShieldCheck, ShieldAlert, Eye, Edit3,
  UserPlus, Trash2, Search, Loader2, Users,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type RoleRow = {
  id: string
  user_id: string
  tier: AdminTier
  granted_at: string
  notes: string | null
  profile: { full_name: string | null; email: string | null } | null
}

const TIER_META: Record<AdminTier, { label: string; color: string; bg: string; icon: React.ElementType; desc: string }> = {
  viewer:      { label: "T1 Viewer",     color: "text-slate-600",   bg: "bg-slate-100 dark:bg-slate-800",   icon: Eye,        desc: "Read-only access to dashboards and reports" },
  editor:      { label: "T2 Editor",     color: "text-blue-600",    bg: "bg-blue-50 dark:bg-blue-950/30",   icon: Edit3,      desc: "Can create, edit, and manage listings and content" },
  manager:     { label: "T3 Manager",    color: "text-amber-600",   bg: "bg-amber-50 dark:bg-amber-950/30", icon: ShieldCheck, desc: "Full operational control; can view all admin roles" },
  super_admin: { label: "T4 Super Admin",color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30", icon: Shield, desc: "Unrestricted access; can manage roles and system config" },
}

function TierBadge({ tier }: { tier: AdminTier }) {
  const m = TIER_META[tier]
  const Icon = m.icon
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${m.bg} ${m.color}`}>
      <Icon className="h-3 w-3" />{m.label}
    </span>
  )
}

function AddAdminDialog({ onAdded }: { onAdded: () => void }) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [tier, setTier] = useState<AdminTier>("viewer")
  const [notes, setNotes] = useState("")
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()
  const { user } = useAdminRole() as any

  async function handleAdd() {
    if (!email.trim()) return
    setSaving(true)
    const supabase = createClient()

    // Look up user by email via profiles table
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email.trim())
      .single()

    if (!profile) {
      toast({ title: "User not found", description: "No account with that email exists.", variant: "destructive" })
      setSaving(false)
      return
    }

    const { error } = await supabase.from("admin_roles").upsert({
      user_id: profile.id,
      tier,
      notes: notes || null,
    })

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Admin role assigned", description: `${email} is now ${TIER_META[tier].label}` })
      setOpen(false)
      setEmail(""); setNotes("")
      onAdded()
    }
    setSaving(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="rounded-xl h-9 font-bold gap-1.5">
          <UserPlus className="h-4 w-4" /> Add Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-black">Assign Admin Role</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 pt-1">
          <Input
            placeholder="user@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="rounded-xl"
          />
          <Select value={tier} onValueChange={v => setTier(v as AdminTier)}>
            <SelectTrigger className="rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(TIER_META) as AdminTier[]).map(t => (
                <SelectItem key={t} value={t}>
                  <span className="font-bold">{TIER_META[t].label}</span>
                  <span className="text-muted-foreground ml-2 text-xs">{TIER_META[t].desc}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Notes (optional)"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="rounded-xl"
          />
          <Button className="w-full rounded-xl font-bold" onClick={handleAdd} disabled={saving || !email.trim()}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Assign Role
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function RBACContent() {
  const [rows, setRows] = useState<RoleRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const { toast } = useToast()
  const { tier: myTier } = useAdminRole()

  async function load() {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from("admin_roles")
      .select("id, user_id, tier, granted_at, notes, profile:profiles(full_name, email)")
      .order("granted_at", { ascending: false })
    setRows((data as RoleRow[]) ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function changeRoleTier(id: string, newTier: AdminTier) {
    setUpdatingId(id)
    const supabase = createClient()
    const { error } = await supabase.from("admin_roles").update({ tier: newTier }).eq("id", id)
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      setRows(rs => rs.map(r => r.id === id ? { ...r, tier: newTier } : r))
      toast({ title: "Role updated" })
    }
    setUpdatingId(null)
  }

  async function removeRole(id: string, name: string | null) {
    const supabase = createClient()
    const { error } = await supabase.from("admin_roles").delete().eq("id", id)
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      setRows(rs => rs.filter(r => r.id !== id))
      toast({ title: "Role removed", description: `${name ?? "User"} no longer has admin access` })
    }
  }

  const filtered = rows.filter(r => {
    const q = search.toLowerCase()
    return !q
      || r.profile?.full_name?.toLowerCase().includes(q)
      || r.profile?.email?.toLowerCase().includes(q)
      || r.tier.includes(q)
  })

  const counts = (Object.keys(TIER_META) as AdminTier[]).map(t => ({
    tier: t,
    count: rows.filter(r => r.tier === t).length,
  }))

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-foreground flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" /> Role Management
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Dual-layer RBAC · {rows.length} admin{rows.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <AddAdminDialog onAdded={load} />
      </div>

      {/* Tier summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {counts.map(({ tier, count }) => {
          const m = TIER_META[tier]
          const Icon = m.icon
          return (
            <Card key={tier} className="rounded-2xl border-none shadow-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${m.bg}`}>
                  <Icon className={`h-4 w-4 ${m.color}`} />
                </div>
                <div>
                  <p className="text-lg font-black text-foreground">{count}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{m.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Permission matrix */}
      <Card className="rounded-2xl border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-black">Permission Matrix</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-xs text-left min-w-[520px]">
            <thead>
              <tr className="text-muted-foreground border-b">
                <th className="pb-2 font-bold pr-4">Feature</th>
                {(Object.keys(TIER_META) as AdminTier[]).map(t => (
                  <th key={t} className="pb-2 font-bold text-center px-2">{TIER_META[t].label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {[
                ["View dashboards & stats",       true,  true,  true,  true],
                ["Manage business listings",       false, true,  true,  true],
                ["Moderate reviews & reports",     false, true,  true,  true],
                ["Manage campaigns & gamification",false, false, true,  true],
                ["Support queue & SLA actions",    false, false, true,  true],
                ["Feature flags & Ramadan config", false, false, true,  true],
                ["View admin role assignments",    false, false, true,  true],
                ["Assign & revoke admin roles",    false, false, false, true],
                ["System configuration",           false, false, false, true],
              ].map(([label, ...perms]) => (
                <tr key={label as string} className="text-foreground/80">
                  <td className="py-2 pr-4 font-medium">{label as string}</td>
                  {perms.map((allowed, i) => (
                    <td key={i} className="py-2 text-center px-2">
                      {allowed ? (
                        <span className="text-emerald-600 font-black">✓</span>
                      ) : (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Admin list */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search admins..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 rounded-xl"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <Card className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-8 text-center text-muted-foreground">
              <Users className="h-10 w-10 mx-auto mb-3 opacity-20" />
              <p className="font-bold text-foreground">No admins found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {filtered.map(row => {
              const name = row.profile?.full_name ?? "Unknown"
              const email = row.profile?.email ?? row.user_id
              const isSelf = false // would need auth context; safe to skip editing own role via UI
              return (
                <Card key={row.id} className="rounded-2xl border-none shadow-sm">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center shrink-0 text-sm font-black text-muted-foreground">
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-foreground truncate">{name}</p>
                      <p className="text-xs text-muted-foreground truncate">{email}</p>
                      {row.notes && (
                        <p className="text-[10px] text-muted-foreground/60 mt-0.5 truncate">{row.notes}</p>
                      )}
                    </div>
                    {myTier === "super_admin" ? (
                      <Select
                        value={row.tier}
                        onValueChange={v => changeRoleTier(row.id, v as AdminTier)}
                        disabled={updatingId === row.id}
                      >
                        <SelectTrigger className="rounded-xl h-8 text-xs font-bold w-36 shrink-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(TIER_META) as AdminTier[]).map(t => (
                            <SelectItem key={t} value={t} className="text-xs font-bold">
                              {TIER_META[t].label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <TierBadge tier={row.tier} />
                    )}
                    {myTier === "super_admin" && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-xl text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 shrink-0"
                        onClick={() => removeRole(row.id, name)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminRBACPage() {
  return (
    <AdminRoleGate required="manager">
      <RBACContent />
    </AdminRoleGate>
  )
}
