"use client"

import { useState } from "react"
import {
  Search, PlusCircle, CheckCircle2, Clock, AlertTriangle,
  FileText, MoreHorizontal, Download, RefreshCw, XCircle
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const CERTS = [
  { business: "Medina Meats",       certNum: "HI-IND-2024-101", issued: "2024-01-15", expiry: "2025-01-14", status: "active" },
  { business: "Zam Zam Finance",    certNum: "HI-IND-2024-102", issued: "2024-02-01", expiry: "2025-01-31", status: "active" },
  { business: "Barakah Grocers",    certNum: "HI-IND-2023-088", issued: "2023-08-10", expiry: "2024-08-09", status: "expiring" },
  { business: "Al-Noor Catering",   certNum: "HI-IND-2023-075", issued: "2023-06-01", expiry: "2024-05-31", status: "expiring" },
  { business: "Karim's Restaurant", certNum: "HI-IND-2022-045", issued: "2022-07-01", expiry: "2023-06-30", status: "expired" },
]

const STATUS_STYLES: Record<string, string> = {
  active:   "bg-emerald-50 text-emerald-600 border-emerald-200",
  expiring: "bg-amber-50 text-amber-600 border-amber-200",
  expired:  "bg-red-50 text-red-600 border-red-200",
}

const STATUS_LABELS: Record<string, string> = {
  active: "Active", expiring: "Expiring Soon", expired: "Expired"
}

export default function CertificateManagementPage() {
  const [search, setSearch] = useState("")
  const filtered = CERTS.filter(c => c.business.toLowerCase().includes(search.toLowerCase()) || c.certNum.includes(search))

  const active   = CERTS.filter(c => c.status === "active").length
  const expiring = CERTS.filter(c => c.status === "expiring").length
  const expired  = CERTS.filter(c => c.status === "expired").length

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Certification Hub</div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Certificate Management</h1>
          <p className="text-muted-foreground font-medium text-sm">Issue, renew, and manage Halal certificates for businesses.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-12 px-8 font-black gap-2 shadow-lg">
              <PlusCircle className="h-4 w-4" /> Issue New Certificate
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-3xl">
            <DialogHeader>
              <DialogTitle className="font-black text-xl">Issue New Certificate</DialogTitle>
              <DialogDescription>Fill in the details to generate a new Halal certificate.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest">Business Name</Label>
                <Input placeholder="Search for a registered business..." className="rounded-2xl h-11" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest">Scope of Certification</Label>
                <Textarea placeholder="e.g., All food items, specific meat products..." className="rounded-2xl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest">Issue Date</Label>
                  <Input type="date" className="rounded-2xl h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest">Expiry Date</Label>
                  <Input type="date" className="rounded-2xl h-11" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest">Upload Scanned Certificate</Label>
                <Input type="file" className="rounded-2xl h-11" />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" className="rounded-2xl font-black">Cancel</Button>
              <Button className="rounded-2xl font-black bg-emerald-600 hover:bg-emerald-700 text-white">Issue Certificate</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: "Active",        value: active,   icon: CheckCircle2,  bg: "bg-emerald-50", color: "text-emerald-600" },
          { label: "Expiring Soon", value: expiring, icon: Clock,          bg: "bg-amber-50",   color: "text-amber-600" },
          { label: "Expired",       value: expired,  icon: AlertTriangle,  bg: "bg-red-50",     color: "text-red-600" },
          { label: "Total Issued",  value: CERTS.length, icon: FileText,  bg: "bg-blue-50",    color: "text-blue-600" },
        ].map((s, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl bg-card p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">{s.label}</span>
              <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${s.bg}`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-foreground">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
        <CardHeader className="p-6 sm:p-8 border-b">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="text-xl font-black">All Issued Certificates</CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by business or cert number..."
                className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Business</TableHead>
                <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Certificate No.</TableHead>
                <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Expiry</TableHead>
                <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                <TableHead className="text-right px-8 h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((cert) => (
                <TableRow key={cert.certNum} className="border-border hover:bg-muted/50 transition-colors group">
                  <TableCell className="px-8 py-5 font-black text-foreground">{cert.business}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground hidden sm:table-cell">{cert.certNum}</TableCell>
                  <TableCell className="text-sm font-bold text-muted-foreground hidden sm:table-cell">{cert.expiry}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`font-black text-[9px] uppercase px-3 ${STATUS_STYLES[cert.status]}`}>
                      {STATUS_LABELS[cert.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl">
                        <DropdownMenuLabel className="font-black text-xs uppercase tracking-widest">Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2 font-bold"><RefreshCw className="h-3.5 w-3.5" /> Renew</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 font-bold"><Download className="h-3.5 w-3.5" /> Download</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 gap-2 font-bold"><XCircle className="h-3.5 w-3.5" /> Revoke</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
