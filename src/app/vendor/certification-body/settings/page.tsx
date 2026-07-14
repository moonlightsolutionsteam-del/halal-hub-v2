"use client"

import { Settings, Bell, Shield, Palette } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const SETTING_GROUPS = [
  {
    title: "Notifications",
    icon: Bell,
    settings: [
      { label: "New certification requests",  desc: "Email me when a business submits a request",      enabled: true },
      { label: "Certificate expiry alerts",   desc: "Remind me 30 days before a certificate expires",  enabled: true },
      { label: "Audit reminders",             desc: "Notify me of upcoming scheduled audits",           enabled: true },
      { label: "Enquiry replies",             desc: "Email when a business replies to an enquiry",      enabled: false },
    ]
  },
  {
    title: "Security",
    icon: Shield,
    settings: [
      { label: "Two-factor authentication",  desc: "Require 2FA for all panel logins",           enabled: true },
      { label: "Login email alerts",         desc: "Email me on new device logins",               enabled: false },
    ]
  },
]

export default function SettingsPage() {
  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Administration</div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Settings</h1>
        <p className="text-muted-foreground font-medium text-sm">Configure your panel preferences and account settings.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {SETTING_GROUPS.map((group) => (
          <Card key={group.title} className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-6 sm:p-8 border-b flex flex-row items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <group.icon className="h-5 w-5 text-emerald-600" />
              </div>
              <CardTitle className="text-xl font-black">{group.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 space-y-5">
              {group.settings.map((setting, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <Label className="font-black text-sm text-foreground cursor-pointer">{setting.label}</Label>
                    <p className="text-xs text-muted-foreground font-medium">{setting.desc}</p>
                  </div>
                  <button
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${setting.enabled ? "bg-emerald-600" : "bg-muted"}`}
                  >
                    <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform ${setting.enabled ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-end">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-12 px-8 font-black">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
