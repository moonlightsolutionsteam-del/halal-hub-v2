"use client"

import * as React from "react"
import { Search, Building, ShieldCheck, Clock, UserPlus, MoreHorizontal, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAdminCategory } from "@/hooks/use-admin-category"

export default function SuperAdminOrganizationsPage() {
  const [search, setSearch] = React.useState("")
  const cat = useAdminCategory(["Organization", "Charity", "NGO", "Islamic Center", "Community", "Dawah", "Foundation", "Trust"])

  const orgs = cat.businesses.map(b => ({
    id: b.id,
    name: b.name,
    type: b.subcategory ?? b.category,
    city: [b.city, b.country].filter(Boolean).join(", ") || "—",
    status: b.halal_verified ? "Verified" : b.status === "pending" ? "Pending" : b.status ?? "—",
    halal_verified: b.halal_verified ?? false,
  }))

  const filtered = search
    ? orgs.filter(o => o.name.toLowerCase().includes(search.toLowerCase()) || o.city.toLowerCase().includes(search.toLowerCase()))
    : orgs

  const total = orgs.length
  const pending = orgs.filter(o => o.status === "pending").length
  const verified = orgs.filter(o => o.halal_verified).length

  return (
    <div className="p-4 sm:p-8 space-y-6 bg-background min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Building className="h-3 w-3" /> Directory Hub
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-headline text-foreground tracking-tighter">ORGANIZATIONS</h1>
          <p className="text-muted-foreground font-medium text-sm italic">Manage NGOs, charities, foundations, and Islamic organizations.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-8 font-black shadow-2xl h-12 gap-2">
          <Plus className="h-4 w-4" /> Add Organization
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 sm:gap-6">
        {[
          { label: "Total", value: total, icon: Building, color: "text-primary", bg: "bg-primary/10" },
          { label: "Pending Review", value: pending, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Halal Verified", value: verified, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((s, i) => (
          <Card key={i} className="rounded-[2.5rem] border-none shadow-sm bg-card">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${s.bg}`}>
                <s.icon className={`h-6 w-6 ${s.color}`} />
              </div>
              <div>
                <p className="text-3xl font-black text-foreground">{s.value}</p>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
        <CardHeader className="p-6 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or city..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 h-12 rounded-2xl bg-muted border-none font-medium"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Organization</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Location</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                <TableHead className="text-right px-8 h-14"><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(org => (
                <TableRow key={org.id} className="border-border hover:bg-muted/50 transition-colors group">
                  <TableCell className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Building className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-black text-foreground">{org.name}</p>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-tighter">{org.type}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-bold text-muted-foreground">{org.city}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      org.status === "Verified" || org.halal_verified
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200 font-black text-[9px] px-3"
                        : org.status === "pending"
                        ? "bg-amber-50 text-amber-600 border-amber-200 font-black text-[9px] px-3"
                        : "bg-muted text-muted-foreground border-border font-black text-[9px] px-3"
                    }>
                      {org.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Verify</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Suspend</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {!cat.loading && filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-muted-foreground font-medium">
                    {search ? "No organizations match your search." : "No organizations found."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
