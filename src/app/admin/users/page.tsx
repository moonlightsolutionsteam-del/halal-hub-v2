"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Search, Mail, Loader2, UserCheck } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface Profile {
  id: string
  full_name: string | null
  email: string | null
  role: string | null
  city: string | null
  country: string | null
  is_banned: boolean | null
  created_at: string | null
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Profile[]>([])
  const [total, setTotal] = useState(0)
  const [banned, setBanned] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const supabase = createClient()
    async function load() {
      setLoading(true)
      const [countRes, bannedRes, listRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }).eq("is_banned", true),
        supabase
          .from("profiles")
          .select("id, full_name, email, role, city, country, is_banned, created_at")
          .order("created_at", { ascending: false })
          .limit(50),
      ])
      setTotal(countRes.count ?? 0)
      setBanned(bannedRes.count ?? 0)
      setUsers(listRes.data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = users.filter((u) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      u.full_name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.role?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-3xl font-black font-headline">User Directory</h1>
          <p className="text-muted-foreground font-medium">
            {loading ? "Loading users..." : `${total.toLocaleString()} registered participants`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {[
          { label: "Total Users", value: loading ? "—" : total.toLocaleString(), color: "text-primary" },
          { label: "Banned", value: loading ? "—" : banned.toLocaleString(), color: "text-red-500" },
          { label: "Active", value: loading ? "—" : (total - banned).toLocaleString(), color: "text-emerald-500" },
          { label: "Showing", value: loading ? "—" : filtered.length.toLocaleString(), color: "text-blue-500" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl p-4">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.label}</p>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden">
        <div className="p-6 border-b flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email or role..."
              className="pl-9 h-12 rounded-2xl bg-muted/30 border-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-bold">Loading users...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground">
            <Users className="h-10 w-10" />
            <p className="text-sm font-bold">{search ? "No users match your search." : "No users registered yet."}</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-muted/10">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="px-8 h-14 font-black text-xs uppercase text-muted-foreground">User</TableHead>
                <TableHead className="h-14 font-black text-xs uppercase text-muted-foreground">Role</TableHead>
                <TableHead className="h-14 font-black text-xs uppercase text-muted-foreground">Location</TableHead>
                <TableHead className="h-14 font-black text-xs uppercase text-muted-foreground">Status</TableHead>
                <TableHead className="h-14 font-black text-xs uppercase text-muted-foreground">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/5 border-muted/20">
                  <TableCell className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 rounded-xl">
                        <AvatarFallback className="rounded-xl bg-primary/10 text-primary font-black text-sm">
                          {(user.full_name ?? user.email ?? "U").charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-black text-foreground text-sm">{user.full_name ?? "—"}</p>
                        <p className="text-[11px] font-medium text-muted-foreground">{user.email ?? "—"}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-full font-bold text-[10px] uppercase tracking-wider">
                      {user.role ?? "consumer"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-muted-foreground">
                    {[user.city, user.country].filter(Boolean).join(", ") || "—"}
                  </TableCell>
                  <TableCell>
                    {user.is_banned ? (
                      <Badge className="bg-red-100 text-red-600 border-none rounded-full font-bold text-[10px]">Banned</Badge>
                    ) : (
                      <Badge className="bg-emerald-100 text-emerald-700 border-none rounded-full font-bold text-[10px]">Active</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-xs font-medium text-muted-foreground">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  )
}
