"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, Users, Briefcase, ArrowUpRight, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"

type Contact = { id: string; name: string; account: string | null; email: string | null; status: string | null; owner: string | null; owner_initials: string | null; last_contact: string | null }

function statusVariant(s: string | null) {
  if (s === "Active Customer" || s === "Active") return "secondary" as const
  if (s === "Past Customer" || s === "Churned") return "destructive" as const
  return "default" as const
}

function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) } catch { return d }
}

export default function AccountsPage() {
  const [contacts, setContacts] = React.useState<Contact[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_contacts")
      .select("id, name, account, email, status, owner, owner_initials, last_contact")
      .order("last_contact", { ascending: false })
      .limit(100)
      .then(({ data }) => { setContacts(data ?? []); setLoading(false) })
  }, [])

  const filtered = contacts.filter(c => {
    const q = search.toLowerCase()
    return !q || c.name.toLowerCase().includes(q) || (c.account ?? "").toLowerCase().includes(q) || (c.owner ?? "").toLowerCase().includes(q)
  })

  const active = contacts.filter(c => c.status === "Active Customer" || c.status === "Active")
  const thisWeek = contacts.filter(c => {
    if (!c.last_contact) return false
    const d = new Date(c.last_contact)
    const now = new Date()
    return (now.getTime() - d.getTime()) < 7 * 24 * 60 * 60 * 1000
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Accounts</h1>
        <p className="text-muted-foreground">Manage all companies and organizations your team interacts with.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle><Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : contacts.length}</div>
            <p className="text-xs text-muted-foreground">In CRM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle><Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : active.length}</div>
            <p className="text-xs text-muted-foreground">{contacts.length > 0 ? `${Math.round((active.length / contacts.length) * 100)}% of total` : "—"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle><ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : thisWeek.length}</div>
            <p className="text-xs text-muted-foreground">Contacts touched this week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <CardTitle>All Contacts</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search contacts..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <Button><PlusCircle className="mr-2 h-4 w-4" />Add Contact</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead className="hidden md:table-cell">Company / Account</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Owner</TableHead>
                  <TableHead className="hidden lg:table-cell">Last Contact</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No contacts found.</TableCell></TableRow>
                ) : filtered.map(c => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7 text-xs"><AvatarFallback>{c.name.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                        <div>
                          <div className="font-medium">{c.name}</div>
                          <div className="text-xs text-muted-foreground">{c.email ?? ""}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm">{c.account ?? "—"}</TableCell>
                    <TableCell><Badge variant={statusVariant(c.status)}>{c.status ?? "Prospect"}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {c.owner ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 text-xs"><AvatarFallback>{c.owner_initials ?? c.owner.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                          <span className="text-sm">{c.owner}</span>
                        </div>
                      ) : "—"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{fmtDate(c.last_contact)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Log Activity</DropdownMenuItem>
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
