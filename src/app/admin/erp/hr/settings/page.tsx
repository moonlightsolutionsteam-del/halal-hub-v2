// @ts-nocheck
"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"

const permissionsData = [
  { role: "Super Admin", access: "Full HR Access", description: "Can manage all aspects of the HR module." },
  { role: "HR Manager", access: "All HR (except settings)", description: "Manages employees, leaves, and recruitment." },
  { role: "Manager", access: "Team Only", description: "Can view and approve leaves for their direct reports." },
  { role: "Employee", access: "Self Only", description: "Can view their own profile and apply for leave." },
]

type Settings = {
  working_hours: string
  holiday_calendar_url: string
  leave_policy: string
  approval_hierarchy: string
  salary_bands_enabled: boolean
}

const DEFAULTS: Settings = {
  working_hours: "",
  holiday_calendar_url: "",
  leave_policy: "",
  approval_hierarchy: "",
  salary_bands_enabled: false,
}

export default function HRSettingsPage() {
  const [settings, setSettings] = React.useState<Settings>(DEFAULTS)
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [saved, setSaved] = React.useState(false)

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_hr_settings").select("*").eq("id", 1).maybeSingle().then(({ data }) => {
      if (data) setSettings({ ...DEFAULTS, ...data })
      setLoading(false)
    })
  }, [])

  function set<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    const supabase = createClient()
    await supabase.from("erp_hr_settings").upsert({ id: 1, ...settings })
    await logErpActivity({ employeeName: "Admin", action: "hr_settings_updated", module: "hr", recordType: "settings", recordTitle: "HR Global Settings" })
    setSaving(false)
    setSaved(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">HR Settings</h1>
        <p className="text-muted-foreground">Configure global settings for the Human Resources module.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Global Settings</CardTitle>
              <CardDescription>These settings apply to all employees and managers.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="working-hours">Standard Working Hours</Label>
                <Input id="working-hours" placeholder="e.g., 9:30 AM - 6:30 PM" value={settings.working_hours} onChange={e => set("working_hours", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="holiday-calendar">Holiday Calendar URL</Label>
                <Input id="holiday-calendar" placeholder="Link to iCal/.ics file" value={settings.holiday_calendar_url} onChange={e => set("holiday_calendar_url", e.target.value)} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="leave-policy">Default Leave Policy</Label>
                <Textarea id="leave-policy" placeholder="Describe your company's leave policy..." value={settings.leave_policy} onChange={e => set("leave_policy", e.target.value)} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="approval-hierarchy">Approval Hierarchy</Label>
                <Textarea id="approval-hierarchy" placeholder="Define the approval flow, e.g., Employee -> Manager -> HR" value={settings.approval_hierarchy} onChange={e => set("approval_hierarchy", e.target.value)} />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4 md:col-span-2">
                <div>
                  <Label htmlFor="enable-salary" className="font-semibold">Enable Salary Bands</Label>
                  <p className="text-sm text-muted-foreground">Allow adding salary information to employee profiles.</p>
                </div>
                <Switch id="enable-salary" checked={settings.salary_bands_enabled} onCheckedChange={v => set("salary_bands_enabled", v)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>Define what different roles can access within the HR module.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Access Level</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permissionsData.map(role => (
                    <TableRow key={role.role}>
                      <TableCell className="font-semibold">{role.role}</TableCell>
                      <TableCell>{role.access}</TableCell>
                      <TableCell>{role.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex justify-end items-center gap-3">
            {saved && <span className="text-sm text-green-600 font-medium">Settings saved.</span>}
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Saving…</> : "Save HR Settings"}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
