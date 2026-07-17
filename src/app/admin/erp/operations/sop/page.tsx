"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, BookCopy, FileText } from "lucide-react"
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

type Article = {
  id: string
  article_id: string | null
  title: string
  category: string | null
  version: string | null
  last_updated: string | null
  status: string | null
  author: string | null
}

function getStatusVariant(s: string | null) {
  if (s === "Published") return "secondary"
  if (s === "Needs Review") return "destructive"
  return "default"
}

export default function SopPage() {
  const [articles, setArticles] = React.useState<Article[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [catFilter, setCatFilter] = React.useState("all")
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState("")
  const [category, setCategory] = React.useState("SOP")
  const [content, setContent] = React.useState("")
  const [author, setAuthor] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  const refresh = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("erp_sop_articles").select("*").order("created_at", { ascending: false })
    setArticles(data ?? [])
  }

  React.useEffect(() => { refresh().then(() => setLoading(false)) }, [])

  async function handleCreate() {
    if (!title.trim()) return
    setSaving(true)
    const supabase = createClient()
    const prefix = category === "Knowledge Base" ? "KB" : "SOP"
    const count = articles.filter(a => (a.article_id ?? "").startsWith(prefix)).length
    const nextId = `${prefix}-${String(count + 1).padStart(3, "0")}`
    await supabase.from("erp_sop_articles").insert({ article_id: nextId, title: title.trim(), category, content: content || null, author: author || null, status: "Draft", version: "1.0", last_updated: new Date().toISOString().split("T")[0] })
    await logErpActivity({ employeeName: author || "Admin", action: "sop_created", module: "operations", recordType: "sop", recordTitle: `${nextId} - ${title}` })
    await refresh()
    setSaving(false); setOpen(false)
    setTitle(""); setContent(""); setAuthor("")
  }

  async function updateStatus(id: string, status: string, articleTitle: string) {
    const supabase = createClient()
    await supabase.from("erp_sop_articles").update({ status, updated_at: new Date().toISOString() }).eq("id", id)
    await logErpActivity({ employeeName: "Admin", action: `sop_${status.toLowerCase().replace(/\s+/g, "_")}`, module: "operations", recordType: "sop", recordId: id, recordTitle: articleTitle })
    await refresh()
  }

  const categories = [...new Set(articles.map(a => a.category).filter(Boolean))] as string[]

  const filtered = articles.filter(a => {
    const ms = !search || a.title.toLowerCase().includes(search.toLowerCase())
    const mc = catFilter === "all" || a.category === catFilter
    return ms && mc
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">SOP & Knowledge Base</h1>
        <p className="text-muted-foreground">Manage standard operating procedures and internal knowledge base.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Articles", value: articles.length },
          { label: "Published", value: articles.filter(a => a.status === "Published").length },
          { label: "Draft", value: articles.filter(a => a.status === "Draft").length },
          { label: "Needs Review", value: articles.filter(a => a.status === "Needs Review").length },
        ].map(({ label, value }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle><FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{value}</div></CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Articles</CardTitle>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" />New Article</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Create Article</DialogTitle></DialogHeader>
                <div className="space-y-3 py-4">
                  <div className="space-y-1"><Label>Title *</Label><Input value={title} onChange={e => setTitle(e.target.value)} /></div>
                  <div className="space-y-1">
                    <Label>Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Onboarding">Onboarding</SelectItem>
                        <SelectItem value="Support">Support</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Knowledge Base">Knowledge Base</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1"><Label>Author</Label><Input value={author} onChange={e => setAuthor(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Content</Label><Textarea value={content} onChange={e => setContent(e.target.value)} className="min-h-[120px]" placeholder="Write the SOP or KB content..." /></div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={saving || !title.trim()}>{saving ? "Saving…" : "Create"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search articles..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={catFilter} onValueChange={setCatFilter}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
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
                  <TableHead>Article</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Version</TableHead>
                  <TableHead className="hidden lg:table-cell">Author</TableHead>
                  <TableHead className="hidden lg:table-cell">Last Updated</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(a => (
                  <TableRow key={a.id}>
                    <TableCell>
                      <div className="font-medium">{a.title}</div>
                      <div className="text-xs text-muted-foreground font-mono">{a.article_id}</div>
                    </TableCell>
                    <TableCell><Badge variant="outline">{a.category}</Badge></TableCell>
                    <TableCell><Badge variant={getStatusVariant(a.status)}>{a.status}</Badge></TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">v{a.version}</TableCell>
                    <TableCell className="hidden lg:table-cell">{a.author ?? "—"}</TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">{a.last_updated ?? "—"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => updateStatus(a.id, "Published", a.title)}>Publish</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(a.id, "Needs Review", a.title)}>Flag for Review</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
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
