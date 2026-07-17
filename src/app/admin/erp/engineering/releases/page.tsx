"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, Rocket, CheckCircle2, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { logErpActivity } from "@/lib/erp-logger"

type Release = {
  id: string
  version: string
  release_type: string | null
  features: string | null
  bugs_fixed: number | null
  deployment_date: string | null
  deployed_by: string | null
  status: string | null
  notes: string | null
}

function getStatusVariant(s: string | null) {
  if (s === "Deployed") return "secondary"
  if (s === "In QA") return "default"
  return "outline"
}

export default function ReleasesPage() {
  const [releases, setReleases] = React.useState<Release[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const [version, setVersion] = React.useState("")
  const [releaseType, setReleaseType] = React.useState("Web")
  const [features, setFeatures] = React.useState("")
  const [bugsFixed, setBugsFixed] = React.useState("")
  const [deployedBy, setDeployedBy] = React.useState("")
  const [deployDate, setDeployDate] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  const refresh = async () => {
    const supabase = createClient()
    const { data } = await (supabase as any).from("erp_releases").select("*").order("created_at", { ascending: false })
    setReleases(data ?? [])
  }

  React.useEffect(() => { refresh().then(() => setLoading(false)) }, [])

  async function handleCreate() {
    if (!version.trim()) return
    setSaving(true)
    const supabase = createClient()
    await (supabase as any).from("erp_releases").insert({ version: version.trim(), release_type: releaseType, features: features || null, bugs_fixed: bugsFixed ? parseInt(bugsFixed) : 0, deployed_by: deployedBy || null, deployment_date: deployDate || null, status: "Planned" })
    await logErpActivity({ employeeName: deployedBy || "Admin", action: "release_planned", module: "engineering", recordType: "release", recordTitle: version })
    await refresh()
    setSaving(false); setOpen(false)
    setVersion(""); setFeatures(""); setBugsFixed(""); setDeployedBy(""); setDeployDate("")
  }

  async function updateStatus(id: string, status: string, ver: string) {
    const supabase = createClient()
    await (supabase as any).from("erp_releases").update({ status }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: `release_${status.toLowerCase().replace(/\s+/g, "_")}`, module: "engineering", recordType: "release", recordId: id, recordTitle: ver })
    await refresh()
  }

  const filtered = releases.filter(r => !search || r.version.toLowerCase().includes(search.toLowerCase()) || (r.features ?? "").toLowerCase().includes(search.toLowerCase()))

  const deployed = releases.filter(r => r.status === "Deployed").length
  const inQA = releases.filter(r => r.status === "In QA").length
  const planned = releases.filter(r => r.status === "Planned").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Releases</h1>
        <p className="text-muted-foreground">Track app and web releases, deployments, and QA.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Releases</CardTitle><Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{releases.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deployed</CardTitle><CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{deployed}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">In QA</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{inQA}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Planned</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{planned}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Release Log</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" />New Release</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Create Release</DialogTitle></DialogHeader>
                <div className="space-y-3 py-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><Label>Version *</Label><Input value={version} onChange={e => setVersion(e.target.value)} placeholder="e.g., v2.5.2" /></div>
                    <div className="space-y-1">
                      <Label>Type</Label>
                      <Select value={releaseType} onValueChange={setReleaseType}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Web">Web</SelectItem>
                          <SelectItem value="App">App</SelectItem>
                          <SelectItem value="Both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-1"><Label>Features / Changelog</Label><Textarea value={features} onChange={e => setFeatures(e.target.value)} placeholder="List key features..." /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><Label>Bugs Fixed</Label><Input type="number" value={bugsFixed} onChange={e => setBugsFixed(e.target.value)} /></div>
                    <div className="space-y-1"><Label>Deploy Date</Label><Input type="date" value={deployDate} onChange={e => setDeployDate(e.target.value)} /></div>
                  </div>
                  <div className="space-y-1"><Label>Deployed By</Label><Input value={deployedBy} onChange={e => setDeployedBy(e.target.value)} /></div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={saving || !version.trim()}>{saving ? "Saving…" : "Create"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by version or features..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12"><div className="h-6 w-6 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Version</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Features</TableHead>
                  <TableHead className="hidden lg:table-cell">Bugs Fixed</TableHead>
                  <TableHead className="hidden lg:table-cell">Deploy Date</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(r => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono font-medium">{r.version}</TableCell>
                    <TableCell>{r.release_type}</TableCell>
                    <TableCell><Badge variant={getStatusVariant(r.status)}>{r.status}</Badge></TableCell>
                    <TableCell className="hidden md:table-cell max-w-[200px]">
                      <div className="truncate text-sm text-muted-foreground">{r.features ?? "—"}</div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell tabular-nums">{r.bugs_fixed ?? 0}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{r.deployment_date ?? "TBD"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => updateStatus(r.id, "In QA", r.version)}>Move to QA</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(r.id, "Deployed", r.version)}>Mark Deployed</DropdownMenuItem>
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
