"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"

type Meeting = {
  id: string
  title: string
  attendee: string | null
  account: string | null
  date_time: string | null
  owner: string | null
  owner_initials: string | null
  status: string | null
}

function getStatusVariant(s: string | null) {
  if (s === "Completed") return "secondary"
  if (s === "Cancelled") return "destructive"
  return "default"
}

export default function MeetingsPage() {
  const [meetings, setMeetings] = React.useState<Meeting[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState("")
  const [attendee, setAttendee] = React.useState("")
  const [account, setAccount] = React.useState("")
  const [dateTime, setDateTime] = React.useState("")
  const [owner, setOwner] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  const refresh = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("erp_meetings").select("*").order("date_time", { ascending: false })
    setMeetings(data ?? [])
  }

  React.useEffect(() => { refresh().then(() => setLoading(false)) }, [])

  async function handleCreate() {
    if (!title.trim()) return
    setSaving(true)
    const supabase = createClient()
    const initials = owner.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    await supabase.from("erp_meetings").insert({ title: title.trim(), attendee: attendee || null, account: account || null, date_time: dateTime || null, owner: owner || null, owner_initials: initials || null, status: "Scheduled" })
    await logErpActivity({ employeeName: owner || "Admin", action: "meeting_scheduled", module: "crm", recordType: "meeting", recordTitle: title })
    await refresh()
    setSaving(false); setOpen(false)
    setTitle(""); setAttendee(""); setAccount(""); setDateTime(""); setOwner("")
  }

  async function updateStatus(id: string, status: string, meetingTitle: string) {
    const supabase = createClient()
    await supabase.from("erp_meetings").update({ status }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: `meeting_${status.toLowerCase()}`, module: "crm", recordType: "meeting", recordId: id, recordTitle: meetingTitle })
    await refresh()
  }

  const filtered = meetings.filter(m => {
    const ms = !search || m.title.toLowerCase().includes(search.toLowerCase()) || (m.attendee ?? "").toLowerCase().includes(search.toLowerCase())
    const mst = statusFilter === "all" || m.status === statusFilter
    return ms && mst
  })

  function formatDateTime(dt: string | null) {
    if (!dt) return "—"
    try { return new Date(dt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) } catch { return dt }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Meetings</h1>
        <p className="text-muted-foreground">Schedule and track client and team meetings.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total", value: meetings.length },
          { label: "Scheduled", value: meetings.filter(m => m.status === "Scheduled").length },
          { label: "Completed", value: meetings.filter(m => m.status === "Completed").length },
          { label: "Cancelled", value: meetings.filter(m => m.status === "Cancelled").length },
        ].map(({ label, value }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle><Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{value}</div></CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Meetings</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" />Schedule Meeting</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>New Meeting</DialogTitle></DialogHeader>
                <div className="space-y-3 py-4">
                  <div className="space-y-1"><Label>Title *</Label><Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Meeting purpose" /></div>
                  <div className="space-y-1"><Label>Attendee</Label><Input value={attendee} onChange={e => setAttendee(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Account</Label><Input value={account} onChange={e => setAccount(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Date & Time</Label><Input type="datetime-local" value={dateTime} onChange={e => setDateTime(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Owner</Label><Input value={owner} onChange={e => setOwner(e.target.value)} /></div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={saving || !title.trim()}>{saving ? "Saving…" : "Schedule"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search meetings..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12"><div className="h-6 w-6 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Meeting</TableHead>
                  <TableHead className="hidden md:table-cell">Account</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Date & Time</TableHead>
                  <TableHead className="hidden lg:table-cell">Owner</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(m => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <div className="font-medium">{m.title}</div>
                      <div className="text-xs text-muted-foreground">{m.attendee}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{m.account ?? "—"}</TableCell>
                    <TableCell><Badge variant={getStatusVariant(m.status)}>{m.status}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{formatDateTime(m.date_time)}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {m.owner ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 text-xs"><AvatarFallback>{m.owner_initials ?? "?"}</AvatarFallback></Avatar>
                          {m.owner}
                        </div>
                      ) : "—"}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Update</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => updateStatus(m.id, "Completed", m.title)}>Mark Completed</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => updateStatus(m.id, "Cancelled", m.title)}>Cancel Meeting</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
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
