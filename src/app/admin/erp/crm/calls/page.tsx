"use client"

import * as React from "react"
import { PlusCircle, Search, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"

type Call = {
  id: string
  contact: string | null
  account: string | null
  subject: string | null
  duration: string | null
  owner: string | null
  owner_initials: string | null
  call_date: string | null
}

export default function CallsPage() {
  const [calls, setCalls] = React.useState<Call[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const [contact, setContact] = React.useState("")
  const [account, setAccount] = React.useState("")
  const [subject, setSubject] = React.useState("")
  const [duration, setDuration] = React.useState("")
  const [owner, setOwner] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  const refresh = async () => {
    const supabase = createClient()
    const { data } = await (supabase as any).from("erp_calls").select("*").order("call_date", { ascending: false })
    setCalls(data ?? [])
  }

  React.useEffect(() => { refresh().then(() => setLoading(false)) }, [])

  async function handleCreate() {
    if (!contact.trim()) return
    setSaving(true)
    const supabase = createClient()
    const initials = owner.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    await (supabase as any).from("erp_calls").insert({ contact: contact.trim(), account: account || null, subject: subject || null, duration: duration || null, owner: owner || null, owner_initials: initials || null, call_date: new Date().toISOString() })
    await logErpActivity({ employeeName: owner || "Admin", action: "call_logged", module: "crm", recordType: "call", recordTitle: `${contact} - ${subject}` })
    await refresh()
    setSaving(false); setOpen(false)
    setContact(""); setAccount(""); setSubject(""); setDuration(""); setOwner("")
  }

  const filtered = calls.filter(c =>
    !search || (c.contact ?? "").toLowerCase().includes(search.toLowerCase()) || (c.subject ?? "").toLowerCase().includes(search.toLowerCase())
  )

  const today = calls.filter(c => c.call_date?.startsWith(new Date().toISOString().split("T")[0])).length
  const thisWeek = calls.filter(c => {
    if (!c.call_date) return false
    const d = new Date(c.call_date)
    const diff = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24)
    return diff <= 7
  }).length

  function formatDate(d: string | null) {
    if (!d) return "—"
    try { return new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) } catch { return d }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Calls</h1>
        <p className="text-muted-foreground">Log and review client and prospect calls.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Total Calls", value: calls.length },
          { label: "Today", value: today },
          { label: "This Week", value: thisWeek },
        ].map(({ label, value }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle><Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{value}</div></CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Call Log</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" />Log Call</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Log a Call</DialogTitle></DialogHeader>
                <div className="space-y-3 py-4">
                  <div className="space-y-1"><Label>Contact *</Label><Input value={contact} onChange={e => setContact(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Account</Label><Input value={account} onChange={e => setAccount(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Subject / Notes</Label><Input value={subject} onChange={e => setSubject(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Duration</Label><Input value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g., 15 min" /></div>
                  <div className="space-y-1"><Label>Owner</Label><Input value={owner} onChange={e => setOwner(e.target.value)} /></div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={saving || !contact.trim()}>{saving ? "Saving…" : "Log Call"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search calls..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12"><div className="h-6 w-6 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead className="hidden md:table-cell">Subject</TableHead>
                  <TableHead className="hidden md:table-cell">Duration</TableHead>
                  <TableHead className="hidden lg:table-cell">Owner</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(c => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="font-medium">{c.contact}</div>
                      <div className="text-xs text-muted-foreground">{c.account}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{c.subject ?? "—"}</TableCell>
                    <TableCell className="hidden md:table-cell">{c.duration ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {c.owner ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 text-xs"><AvatarFallback>{c.owner_initials ?? "?"}</AvatarFallback></Avatar>
                          {c.owner}
                        </div>
                      ) : "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{formatDate(c.call_date)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
