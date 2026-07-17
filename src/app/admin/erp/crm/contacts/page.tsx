"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"

type Contact = {
  id: string
  name: string
  email: string | null
  phone: string | null
  account: string | null
  status: string | null
  owner: string | null
  owner_initials: string | null
  last_contact: string | null
}

function getStatusVariant(s: string | null) {
  if (s === "Customer") return "secondary"
  if (s === "Partner") return "default"
  return "outline"
}

export default function ContactsPage() {
  const [contacts, setContacts] = React.useState<Contact[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [account, setAccount] = React.useState("")
  const [owner, setOwner] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  const refresh = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("erp_contacts").select("*").order("created_at", { ascending: false })
    setContacts(data ?? [])
  }

  React.useEffect(() => { refresh().then(() => setLoading(false)) }, [])

  async function handleCreate() {
    if (!name.trim()) return
    setSaving(true)
    const supabase = createClient()
    const initials = owner.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    await supabase.from("erp_contacts").insert({ name: name.trim(), email: email || null, phone: phone || null, account: account || null, owner: owner || null, owner_initials: initials || null, status: "Lead", last_contact: new Date().toISOString() })
    await logErpActivity({ employeeName: owner || "Admin", action: "contact_created", module: "crm", recordType: "contact", recordTitle: name })
    await refresh()
    setSaving(false); setOpen(false)
    setName(""); setEmail(""); setPhone(""); setAccount(""); setOwner("")
  }

  const filtered = contacts.filter(c => {
    const ms = !search || c.name.toLowerCase().includes(search.toLowerCase()) || (c.account ?? "").toLowerCase().includes(search.toLowerCase())
    const mst = statusFilter === "all" || c.status === statusFilter
    return ms && mst
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Contacts</h1>
        <p className="text-muted-foreground">Manage your CRM contact database.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Total Contacts", value: contacts.length },
          { label: "Customers", value: contacts.filter(c => c.status === "Customer").length },
          { label: "Partners", value: contacts.filter(c => c.status === "Partner").length },
        ].map(({ label, value }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle><Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{value}</div></CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Contacts</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" />Add Contact</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>New Contact</DialogTitle></DialogHeader>
                <div className="space-y-3 py-4">
                  <div className="space-y-1"><Label>Name *</Label><Input value={name} onChange={e => setName(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Email</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Phone</Label><Input value={phone} onChange={e => setPhone(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Account / Company</Label><Input value={account} onChange={e => setAccount(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Owner</Label><Input value={owner} onChange={e => setOwner(e.target.value)} placeholder="Assigned to" /></div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={saving || !name.trim()}>{saving ? "Saving…" : "Add Contact"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search contacts..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Lead">Lead</SelectItem>
                <SelectItem value="Customer">Customer</SelectItem>
                <SelectItem value="Partner">Partner</SelectItem>
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
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="hidden md:table-cell">Account</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Owner</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(c => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.email}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{c.phone ?? "—"}</TableCell>
                    <TableCell className="hidden md:table-cell">{c.account ?? "—"}</TableCell>
                    <TableCell><Badge variant={getStatusVariant(c.status)}>{c.status}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {c.owner ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 text-xs"><AvatarFallback>{c.owner_initials ?? "?"}</AvatarFallback></Avatar>
                          {c.owner}
                        </div>
                      ) : "—"}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Log Call</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
