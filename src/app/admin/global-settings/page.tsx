"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Save, Settings, Flag, ShieldAlert, History } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type FeatureFlag = {
  id: string
  key: string
  label: string
  description: string | null
  enabled: boolean
  locked: boolean
  updated_by: string | null
  updated_at: string
}

type AuditEntry = {
  id: string
  action_type: string
  module: string
  description: string | null
  admin_name: string | null
  created_at: string
}

export default function GlobalSettingsPage() {
  const { toast } = useToast()
  const [flags, setFlags] = React.useState<FeatureFlag[]>([])
  const [auditLog, setAuditLog] = React.useState<AuditEntry[]>([])
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState<string | null>(null)

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("feature_flags").select("*").order("label"),
      supabase.from("admin_actions").select("id, action_type, module, description, admin_name, created_at")
        .eq("module", "feature_flags")
        .order("created_at", { ascending: false })
        .limit(20),
    ]).then(([{ data: flagData }, { data: logData }]) => {
      setFlags(flagData ?? [])
      setAuditLog(logData ?? [])
      setLoading(false)
    })
  }, [])

  async function toggleFlag(flag: FeatureFlag) {
    if (flag.locked) return
    setSaving(flag.id)
    const supabase = createClient()
    const newVal = !flag.enabled

    const { error } = await supabase
      .from("feature_flags")
      .update({ enabled: newVal, updated_by: "Super Admin", updated_at: new Date().toISOString() })
      .eq("id", flag.id)

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      // Audit log
      await supabase.from("admin_actions").insert({
        action_type: newVal ? "FEATURE_ENABLED" : "FEATURE_DISABLED",
        module: "feature_flags",
        description: `${newVal ? "Enabled" : "Disabled"} feature: ${flag.label}`,
        before_json: { enabled: flag.enabled },
        after_json: { enabled: newVal },
        admin_name: "Super Admin",
        admin_tier: "T4",
      })

      setFlags(prev => prev.map(f => f.id === flag.id ? { ...f, enabled: newVal, updated_at: new Date().toISOString() } : f))
      setAuditLog(prev => [{
        id: crypto.randomUUID(),
        action_type: newVal ? "FEATURE_ENABLED" : "FEATURE_DISABLED",
        module: "feature_flags",
        description: `${newVal ? "Enabled" : "Disabled"} feature: ${flag.label}`,
        admin_name: "Super Admin",
        created_at: new Date().toISOString(),
      }, ...prev.slice(0, 19)])

      toast({ title: `Feature ${newVal ? "enabled" : "disabled"}`, description: flag.label })
    }
    setSaving(null)
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" /> Global Settings
        </h1>
        <p className="text-sm text-muted-foreground font-medium">Manage platform-wide settings and feature flags. All changes are logged.</p>
      </div>

      {/* General Settings */}
      <Card className="rounded-2xl border-none shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-black">General Settings</CardTitle>
          <CardDescription>Basic platform information and maintenance mode.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="platform-name" className="text-xs font-bold">Platform Name</Label>
              <Input id="platform-name" defaultValue="HalalHub" className="rounded-xl h-10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email" className="text-xs font-bold">Public Contact Email</Label>
              <Input id="contact-email" type="email" defaultValue="contact@halalhub.app" className="rounded-xl h-10" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <p className="text-sm font-bold text-foreground">Maintenance Mode</p>
              <p className="text-xs text-muted-foreground mt-0.5">Temporarily make the public site unavailable. Admins can still access.</p>
            </div>
            <Switch id="maintenance-mode" />
          </div>
        </CardContent>
      </Card>

      {/* Feature Flags */}
      <Card className="rounded-2xl border-none shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4 text-primary" />
            <CardTitle className="text-base font-black">Feature Flags</CardTitle>
          </div>
          <CardDescription>Enable or disable platform modules. Every toggle is logged to the audit trail.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : (
            flags.map(flag => (
              <div key={flag.id} className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${flag.enabled ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-border"}`}>
                <div className="flex items-start gap-3 min-w-0">
                  {flag.locked && <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-foreground">{flag.label}</p>
                      {flag.locked && <Badge className="bg-amber-500/15 text-amber-600 border-amber-200 text-[10px]">T4 Lock</Badge>}
                      {flag.enabled && <Badge className="bg-emerald-500/15 text-emerald-600 border-emerald-200 text-[10px]">Live</Badge>}
                    </div>
                    {flag.description && <p className="text-xs text-muted-foreground mt-0.5">{flag.description}</p>}
                    <p className="text-[10px] text-muted-foreground/60 mt-1">
                      Last changed {new Date(flag.updated_at).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      {flag.updated_by ? ` by ${flag.updated_by}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  {saving === flag.id && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                  <Switch
                    checked={flag.enabled}
                    onCheckedChange={() => toggleFlag(flag)}
                    disabled={flag.locked || saving === flag.id}
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Localization */}
      <Card className="rounded-2xl border-none shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-black">Localization</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold">Default Language</Label>
            <Select defaultValue="en">
              <SelectTrigger className="rounded-xl h-10"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
                <SelectItem value="ur">Urdu</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold">Default Country</Label>
            <Select defaultValue="in">
              <SelectTrigger className="rounded-xl h-10"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="in">India</SelectItem>
                <SelectItem value="ae">United Arab Emirates</SelectItem>
                <SelectItem value="us">United States</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Recent Flag Audit Log */}
      {auditLog.length > 0 && (
        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base font-black">Recent Flag Changes</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {auditLog.map(entry => (
              <div key={entry.id} className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
                <Badge className={entry.action_type === "FEATURE_ENABLED"
                  ? "bg-emerald-500/15 text-emerald-600 border-emerald-200 text-[10px] shrink-0"
                  : "bg-red-500/15 text-red-600 border-red-200 text-[10px] shrink-0"
                }>
                  {entry.action_type === "FEATURE_ENABLED" ? "ON" : "OFF"}
                </Badge>
                <div className="min-w-0">
                  <p className="text-xs text-foreground font-medium">{entry.description}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {new Date(entry.created_at).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    {entry.admin_name ? ` · ${entry.admin_name}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button className="rounded-xl gap-2 h-11 px-6 font-bold">
          <Save className="h-4 w-4" /> Save General Settings
        </Button>
      </div>
    </div>
  )
}
