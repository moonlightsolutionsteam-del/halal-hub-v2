"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, FileText, CheckCircle2, Edit3, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

type Article = { id: string; title: string; category: string | null; author: string | null; status: string | null; created_at: string | null; version: string | null }

function fmtDate(d: string | null) {
  if (!d) return "—"
  try { return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) } catch { return d }
}

export default function SuperAdminBlogPage() {
  const [articles, setArticles] = React.useState<Article[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_sop_articles")
      .select("id, title, category, author, status, created_at, version")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data }) => { setArticles(data ?? []); setLoading(false) })
  }, [])

  const published = articles.filter(a => a.status === "Published")
  const drafts = articles.filter(a => a.status === "Draft" || a.status === "draft")

  function ArticleTable({ items }: { items: Article[] }) {
    return (
      <Card>
        <CardHeader><CardTitle>{items === published ? "Published Articles" : items === drafts ? "Drafts" : "All Articles"}</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden md:table-cell">Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No articles found.</TableCell></TableRow>
                ) : items.map(a => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.title}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {a.category ? <Badge variant="outline">{a.category}</Badge> : "—"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{a.author ?? "—"}</TableCell>
                    <TableCell>
                      <Badge variant={a.status === "Published" ? "secondary" : "outline"}>{a.status ?? "Draft"}</Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">{fmtDate(a.created_at)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Analytics</DropdownMenuItem>
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
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            {loading ? "Loading…" : `Showing ${items.length} article${items.length !== 1 ? "s" : ""}`}
          </div>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center mb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-headline">Blog Management</h1>
          <p className="text-muted-foreground">Create, edit, and manage all blog posts and articles.</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" asChild>
            <Link href="/admin/erp/marketing/blog/create">
              <PlusCircle className="mr-2 h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Create Post</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle><FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : articles.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle><CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : published.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle><Edit3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : drafts.length}</div></CardContent>
        </Card>
      </div>

      <TabsList>
        <TabsTrigger value="all">All ({loading ? "…" : articles.length})</TabsTrigger>
        <TabsTrigger value="published">Published ({loading ? "…" : published.length})</TabsTrigger>
        <TabsTrigger value="draft">Draft ({loading ? "…" : drafts.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-4"><ArticleTable items={articles} /></TabsContent>
      <TabsContent value="published" className="mt-4"><ArticleTable items={published} /></TabsContent>
      <TabsContent value="draft" className="mt-4"><ArticleTable items={drafts} /></TabsContent>
    </Tabs>
  )
}
