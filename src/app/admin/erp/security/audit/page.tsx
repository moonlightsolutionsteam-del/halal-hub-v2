// @ts-nocheck
"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, ShieldCheck } from "lucide-react"

type AdminRole = { id: string; user_id: string | null; email: string | null; role: string | null; tier: string | null; created_at: string | null }

const TIER_COLOR: Record<string, string> = {
  super: "bg-red-100 text-red-700",
  admin: "bg-amber-100 text-amber-700",
  moderator: "bg-blue-100 text-blue-700",
  viewer: "bg-slate-100 text-slate-600",
}

export default function AuditPage() {
  const [roles, setRoles] = React.useState<AdminRole[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("admin_roles")
      .select("id, user_id, email, role, tier, created_at")
      .order("tier", { ascending: true })
      .then(({ data }) => { setRoles(data ?? []); setLoading(false) })
  }, [])

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const byTier: Record<string, AdminRole[]> = {}
  for (const r of roles) {
    const t = r.tier ?? r.role ?? "unknown"
    byTier[t] = [...(byTier[t] ?? []), r]
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline">Permissions Audit</h1>
        <p className="text-muted-foreground text-sm">All admin roles and tier assignments from the database.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{roles.length}</p><p className="text-xs text-muted-foreground mt-0.5">Total admins</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{Object.keys(byTier).length}</p><p className="text-xs text-muted-foreground mt-0.5">Distinct tiers/roles</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-red-600">{(byTier["super"] ?? []).length}</p><p className="text-xs text-muted-foreground mt-0.5">Super admins</p></CardContent></Card>
      </div>

      {Object.entries(byTier).map(([tier, members]) => (
        <Card key={tier}>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-black capitalize">{tier}</CardTitle>
              <span className="text-xs text-muted-foreground ml-auto">{members.length} member{members.length !== 1 ? "s" : ""}</span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="text-left px-4 py-2 text-xs font-black text-muted-foreground">Email / User</th>
                  <th className="text-left px-4 py-2 text-xs font-black text-muted-foreground hidden sm:table-cell">Role</th>
                  <th className="text-left px-4 py-2 text-xs font-black text-muted-foreground hidden md:table-cell">Tier</th>
                  <th className="text-right px-4 py-2 text-xs font-black text-muted-foreground">Since</th>
                </tr>
              </thead>
              <tbody>
                {members.map(m => (
                  <tr key={m.id} className="border-b border-border/40 last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-2.5">
                      <p className="font-medium text-xs">{m.email ?? "—"}</p>
                      {m.user_id && <p className="text-[10px] text-muted-foreground font-mono">{m.user_id.slice(0, 8)}…</p>}
                    </td>
                    <td className="px-4 py-2.5 hidden sm:table-cell">
                      <Badge variant="outline" className="text-[10px] font-bold capitalize">{m.role ?? "—"}</Badge>
                    </td>
                    <td className="px-4 py-2.5 hidden md:table-cell">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${TIER_COLOR[m.tier ?? ""] ?? "bg-slate-100 text-slate-600"}`}>
                        {m.tier ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right text-xs text-muted-foreground">
                      {m.created_at ? new Date(m.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" }) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ))}

      {roles.length === 0 && <p className="text-center text-sm text-muted-foreground py-10">No admin roles found in the database.</p>}
    </div>
  )
}
