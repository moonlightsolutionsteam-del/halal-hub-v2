"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Settings, Shield, Eye, Bell, Lock, AlertTriangle, CheckCircle2 } from "lucide-react"

type ToggleProps = { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }

function Toggle({ label, desc, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border/50 last:border-0">
      <div>
        <p className="font-black text-sm text-foreground">{label}</p>
        <p className="text-xs font-bold text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <button onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ml-4 ${checked ? "bg-violet-600" : "bg-muted"}`}>
        <span className={`absolute top-1 h-4 w-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-7" : "translate-x-1"}`} />
      </button>
    </div>
  )
}

export default function ProfessionalSettingsPage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [notifs, setNotifs] = useState({ messages: true, connections: true, opps: true, recs: false, digest: true })
  const [privacy, setPrivacy] = useState({ showEmail: false, showPhone: false, discoverableSearch: true, showConnections: true, publicProfile: true })

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-3xl mx-auto pb-24">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
          <Settings className="h-3 w-3" /> Account
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Privacy & Settings</h1>
        <p className="text-sm font-bold text-muted-foreground">Control who sees your profile and how you're notified.</p>
      </div>

      {/* Privacy Controls */}
      <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-2">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-violet-600" />
          <h2 className="text-lg font-black">Privacy Controls</h2>
        </div>
        <Toggle label="Public Profile" desc="Allow anyone to find and view your profile" checked={privacy.publicProfile} onChange={v => setPrivacy(p => ({ ...p, publicProfile: v }))} />
        <Toggle label="Discoverable in Search" desc="Appear in Halal Hub search results" checked={privacy.discoverableSearch} onChange={v => setPrivacy(p => ({ ...p, discoverableSearch: v }))} />
        <Toggle label="Show Connections" desc="Display your connection count publicly" checked={privacy.showConnections} onChange={v => setPrivacy(p => ({ ...p, showConnections: v }))} />
        <Toggle label="Show Email" desc="Display email address on your public profile" checked={privacy.showEmail} onChange={v => setPrivacy(p => ({ ...p, showEmail: v }))} />
        <Toggle label="Show Phone Number" desc="Display phone number on your public profile" checked={privacy.showPhone} onChange={v => setPrivacy(p => ({ ...p, showPhone: v }))} />
      </Card>

      {/* Profile Visibility */}
      <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-5">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-violet-600" />
          <h2 className="text-lg font-black">Profile Visibility</h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {[
            { label: "Who can send you messages?", default: "Connections only" },
            { label: "Who can see your portfolio?", default: "Everyone" },
            { label: "Who can see your recommendations?", default: "Everyone" },
            { label: "Who can request your services?", default: "Everyone" },
          ].map(item => (
            <div key={item.label} className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-muted-foreground">{item.label}</Label>
              <Select defaultValue={item.default}>
                <SelectTrigger className="h-11 rounded-2xl bg-muted border-none font-bold"><SelectValue /></SelectTrigger>
                <SelectContent className="rounded-2xl">
                  {["Everyone", "Connections only", "Verified users only", "No one"].map(opt => (
                    <SelectItem key={opt} value={opt} className="font-bold">{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </Card>

      {/* Notifications */}
      <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-2">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-5 w-5 text-violet-600" />
          <h2 className="text-lg font-black">Notification Preferences</h2>
        </div>
        <Toggle label="New Messages" desc="Get notified when someone messages you" checked={notifs.messages} onChange={v => setNotifs(n => ({ ...n, messages: v }))} />
        <Toggle label="Connection Requests" desc="Get notified for new connection requests" checked={notifs.connections} onChange={v => setNotifs(n => ({ ...n, connections: v }))} />
        <Toggle label="New Opportunities" desc="Get notified when new matched opportunities appear" checked={notifs.opps} onChange={v => setNotifs(n => ({ ...n, opps: v }))} />
        <Toggle label="Recommendation Requests" desc="Get notified when someone requests a recommendation" checked={notifs.recs} onChange={v => setNotifs(n => ({ ...n, recs: v }))} />
        <Toggle label="Weekly Digest" desc="Receive a weekly summary of your profile activity" checked={notifs.digest} onChange={v => setNotifs(n => ({ ...n, digest: v }))} />
      </Card>

      {/* Security */}
      <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-5">
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-violet-600" />
          <h2 className="text-lg font-black">Security</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-muted rounded-2xl">
            <div>
              <p className="font-black text-sm">Two-Factor Authentication</p>
              <div className="flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <p className="text-xs font-bold text-emerald-600">Enabled via Authenticator App</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="rounded-xl font-bold text-xs h-9 border-2">Manage</Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted rounded-2xl">
            <div>
              <p className="font-black text-sm">Password</p>
              <p className="text-xs font-bold text-muted-foreground">Last changed 3 months ago</p>
            </div>
            <Button size="sm" variant="outline" className="rounded-xl font-bold text-xs h-9 border-2">Change</Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted rounded-2xl">
            <div>
              <p className="font-black text-sm">Active Sessions</p>
              <p className="text-xs font-bold text-muted-foreground">2 devices signed in</p>
            </div>
            <Button size="sm" variant="outline" className="rounded-xl font-bold text-xs h-9 border-2">View</Button>
          </div>
        </div>
      </Card>

      {/* Save */}
      <Button className="w-full h-14 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black text-base">
        Save Settings
      </Button>

      {/* Danger Zone */}
      <Card className="rounded-[2rem] border-2 border-rose-200 bg-rose-50/30 p-8 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-rose-600" />
          <h2 className="text-lg font-black text-rose-600">Danger Zone</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl">
            <div>
              <p className="font-black text-sm">Deactivate Profile</p>
              <p className="text-xs font-bold text-muted-foreground">Temporarily hide your profile from others</p>
            </div>
            <Button size="sm" variant="outline" className="rounded-xl font-bold text-xs h-9 border-2 border-rose-300 text-rose-600 hover:bg-rose-50">Deactivate</Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl">
            <div>
              <p className="font-black text-sm">Delete Account</p>
              <p className="text-xs font-bold text-muted-foreground">Permanently remove your profile and all data</p>
            </div>
            <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs h-9"
              onClick={() => setShowDeleteModal(true)}>Delete</Button>
          </div>
        </div>
      </Card>

      {/* Delete Confirmation */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="rounded-[2rem] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-rose-600">Delete Account?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <p className="text-sm font-bold text-muted-foreground">This will permanently delete your profile, portfolio, connections, and all associated data. This cannot be undone.</p>
            <div className="flex gap-3">
              <Button className="flex-1 h-12 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black" onClick={() => setShowDeleteModal(false)}>
                Yes, Delete Everything
              </Button>
              <Button variant="outline" className="flex-1 h-12 rounded-2xl border-2 font-black" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
