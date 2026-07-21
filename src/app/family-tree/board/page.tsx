"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ClipboardList, Plus, Search,
  CheckCircle2, Pin, ArrowLeft,
  Trash2, RotateCcw, Loader2, X
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

type BoardItem = {
  id: string
  title: string
  description: string | null
  assigned_name: string | null
  priority: boolean
  status: string
  created_at: string | null
}

type FamilyGroup = {
  id: string
  name: string
}

function timeAgo(iso: string | null): string {
  if (!iso) return ""
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return "Today"
  if (days === 1) return "Yesterday"
  return `${days}d ago`
}

export default function FamilyBoardPage() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [group, setGroup] = React.useState<FamilyGroup | null>(null)
  const [items, setItems] = React.useState<BoardItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState<"active" | "completed">("active")
  const [search, setSearch] = React.useState("")
  const [showAdd, setShowAdd] = React.useState(false)
  const [newTitle, setNewTitle] = React.useState("")
  const [newDesc, setNewDesc] = React.useState("")
  const [newPriority, setNewPriority] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  const fetchItems = React.useCallback(async () => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()

    // Get user's group
    const { data: memberRow } = await (supabase as any)
      .from("family_members")
      .select("group_id, family_groups(id, name)")
      .eq("user_id", user.uid)
      .maybeSingle()

    if (!memberRow) { setLoading(false); return }
    const g = memberRow.family_groups as FamilyGroup
    setGroup(g)

    // Fetch board items
    const { data } = await (supabase as any)
      .from("family_board_items")
      .select("id, title, description, assigned_name, priority, status, created_at")
      .eq("group_id", g.id)
      .order("priority", { ascending: false })
      .order("created_at", { ascending: false })

    setItems(data ?? [])
    setLoading(false)
  }, [user?.uid])

  React.useEffect(() => { fetchItems() }, [fetchItems])

  const handleAdd = async () => {
    if (!newTitle.trim() || !group) return
    setSaving(true)
    const supabase = createClient()
    const { data, error } = await (supabase as any)
      .from("family_board_items")
      .insert({
        group_id: group.id,
        title: newTitle.trim(),
        description: newDesc.trim() || null,
        priority: newPriority,
        status: "active",
        created_by: user?.uid,
        assigned_name: user?.name ?? null,
      })
      .select("id, title, description, assigned_name, priority, status, created_at")
      .single()

    if (error) {
      toast({ title: "Failed to add item", description: error.message, variant: "destructive" })
    } else {
      setItems(prev => [data, ...prev])
      setNewTitle(""); setNewDesc(""); setNewPriority(false)
      setShowAdd(false)
      toast({ title: "Added to board!" })
    }
    setSaving(false)
  }

  const handleToggle = async (item: BoardItem) => {
    const supabase = createClient()
    const newStatus = item.status === "active" ? "completed" : "active"
    await (supabase as any)
      .from("family_board_items")
      .update({ status: newStatus })
      .eq("id", item.id)
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, status: newStatus } : i))
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    await (supabase as any).from("family_board_items").delete().eq("id", id)
    setItems(prev => prev.filter(i => i.id !== id))
    toast({ title: "Item removed" })
  }

  const filtered = items.filter(i =>
    i.status === activeTab &&
    (!search || i.title.toLowerCase().includes(search.toLowerCase()) || (i.description ?? "").toLowerCase().includes(search.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="container mx-auto p-6 max-w-4xl flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!group) {
    return (
      <div className="container mx-auto p-6 max-w-4xl flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <ClipboardList className="h-12 w-12 text-muted-foreground/30" />
        <p className="text-xl font-black">No family group yet</p>
        <p className="text-sm text-muted-foreground">Set up your family hub to start using the board.</p>
        <Button asChild className="rounded-xl font-bold">
          <Link href="/family-tree/setup">Set Up Family Hub</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-5 max-w-4xl pb-24 text-foreground">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-emerald-600 transition-colors w-fit mb-3">
            <ArrowLeft className="h-4 w-4" /> Back to Hub
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 shrink-0">
              <ClipboardList className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-foreground">Family Board</h1>
              <p className="text-xs text-muted-foreground font-bold">{group.name}</p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => setShowAdd(v => !v)}
          className="rounded-full h-11 px-5 font-black shadow-lg bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          {showAdd ? <X className="h-4 w-4" /> : <><Plus className="h-4 w-4 mr-1.5" /> Add</>}
        </Button>
      </div>

      {/* Add form */}
      {showAdd && (
        <Card className="rounded-2xl border-none shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <CardContent className="p-5 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Task / Note</Label>
              <Input
                placeholder="e.g., Buy groceries for Eid dinner"
                className="h-12 rounded-xl bg-muted border-none font-bold"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Details (optional)</Label>
              <Textarea
                placeholder="Any extra details…"
                className="rounded-xl bg-muted border-none resize-none min-h-[72px] font-medium"
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setNewPriority(v => !v)}
                className={cn(
                  "flex items-center gap-2 text-xs font-black uppercase tracking-wider rounded-xl px-3 py-2 transition-colors",
                  newPriority ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40" : "bg-muted text-muted-foreground"
                )}
              >
                <Pin className="h-3.5 w-3.5" /> {newPriority ? "Priority on" : "Mark as priority"}
              </button>
              <Button
                onClick={handleAdd}
                disabled={saving || !newTitle.trim()}
                className="rounded-xl h-10 px-6 font-black bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to Board"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search + tabs */}
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search board…"
            className="pl-9 h-11 rounded-2xl bg-card border-none shadow-sm font-medium"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1.5 shrink-0">
          {(["active", "completed"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "h-11 px-4 rounded-2xl text-xs font-black uppercase tracking-tight transition-colors",
                activeTab === tab ? "bg-emerald-600 text-white" : "bg-card text-muted-foreground shadow-sm hover:bg-muted"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Board items */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <ClipboardList className="h-10 w-10 text-muted-foreground/30" />
          <p className="font-black text-foreground">
            {activeTab === "active" ? "Board is clear!" : "Nothing completed yet"}
          </p>
          <p className="text-sm text-muted-foreground">
            {activeTab === "active" ? "Add a task or note for the family." : "Complete tasks to see them here."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(item => (
            <Card key={item.id} className={cn(
              "rounded-2xl border-none shadow-sm hover:shadow-md transition-all group border-2 border-transparent",
              item.priority && activeTab === "active" ? "hover:border-amber-100 dark:hover:border-amber-900" : "hover:border-emerald-100 dark:hover:border-emerald-900"
            )}>
              <CardContent className="p-4 flex items-start gap-3">
                {/* Complete toggle */}
                <button
                  onClick={() => handleToggle(item)}
                  className={cn(
                    "h-9 w-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors border-2",
                    item.status === "completed"
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "border-border text-muted-foreground hover:border-emerald-600 hover:text-emerald-600"
                  )}
                >
                  {item.status === "completed"
                    ? <CheckCircle2 className="h-4 w-4" />
                    : <RotateCcw className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  }
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.priority && (
                      <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-950/40 border-none font-black text-[9px] uppercase px-2 h-5 gap-1">
                        <Pin className="h-2.5 w-2.5 fill-current" /> Priority
                      </Badge>
                    )}
                    <span className="text-[10px] font-bold text-muted-foreground">{timeAgo(item.created_at)}</span>
                  </div>
                  <p className={cn(
                    "font-black text-base text-foreground mt-0.5 leading-tight",
                    item.status === "completed" && "line-through opacity-40"
                  )}>
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="text-sm text-muted-foreground font-medium mt-1 italic">"{item.description}"</p>
                  )}
                  {item.assigned_name && (
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="bg-emerald-100 text-emerald-700 text-[10px] font-black">
                          {item.assigned_name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                        {item.assigned_name}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="h-8 w-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="text-center text-[10px] font-black text-muted-foreground uppercase tracking-widest py-2">
        {items.filter(i => i.status === "active").length} active · {items.filter(i => i.status === "completed").length} completed
      </p>
    </div>
  )
}
