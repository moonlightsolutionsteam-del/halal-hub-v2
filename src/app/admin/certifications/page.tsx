"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Building, ShieldCheck, Award, Loader2, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAdminCategory } from "@/hooks/use-admin-category"

export default function SuperAdminCertificationsPage() {
  const [search, setSearch] = React.useState("")
  const cat = useAdminCategory(["Certification Body", "Halal Certification", "Certification Authority"])

  const bodies = cat.businesses.map(b => ({
    id: b.id,
    name: b.name,
    image_url: b.image_url,
    status: b.halal_verified ? "Active" : b.status === "pending" ? "Pending Review" : b.status ?? "—",
    city: [b.city, b.country].filter(Boolean).join(", ") || "—",
  }))

  const filtered = search
    ? bodies.filter(b => b.name.toLowerCase().includes(search.toLowerCase()))
    : bodies

  const active = bodies.filter(b => b.status === "Active").length
  const pending = bodies.filter(b => b.status === "Pending Review").length

  return (
    <div className="p-4 sm:p-8 space-y-6 bg-background min-h-screen pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Award className="h-3 w-3" /> Trust & Verification
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-headline text-foreground tracking-tighter">CERTIFICATIONS</h1>
          <p className="text-muted-foreground font-medium text-sm italic">Manage approved halal certification bodies on the platform.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-8 font-black shadow-2xl h-12 gap-2">
          <PlusCircle className="h-4 w-4" /> Add New Body
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 sm:gap-6">
        {[
          { label: "Total Bodies", value: bodies.length, icon: Award, color: "text-primary", bg: "bg-primary/10" },
          { label: "Active", value: active, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending", value: pending, icon: Building, color: "text-amber-600", bg: "bg-amber-50" },
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
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="font-black text-lg">Certification Bodies</CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {cat.loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : (
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="border-none">
                  <TableHead className="hidden sm:table-cell px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Logo</TableHead>
                  <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Name</TableHead>
                  <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Location</TableHead>
                  <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                  <TableHead className="text-right px-8"><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(body => (
                  <TableRow key={body.id} className="border-border hover:bg-muted/50 transition-colors group">
                    <TableCell className="hidden sm:table-cell px-8 py-4">
                      <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center overflow-hidden">
                        {body.image_url ? (
                          <img src={body.image_url} alt={body.name} className="h-full w-full object-contain" />
                        ) : (
                          <Award className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-8 font-black text-foreground">{body.name}</TableCell>
                    <TableCell className="text-xs font-bold text-muted-foreground">{body.city}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        body.status === "Active"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200 font-black text-[9px] px-3"
                          : "bg-amber-50 text-amber-600 border-amber-200 font-black text-[9px] px-3"
                      }>
                        {body.status}
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
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Certified Businesses</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">De-list</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {!cat.loading && filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground font-medium">
                      No certification bodies found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
