"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Network, Plus, Trash2, Loader2, X, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

type Ancestor = {
  id: string
  full_name: string
  relation: string | null
  birth_year: number | null
  birth_place: string | null
  notes: string | null
  created_at: string
}

const RELATIONS = ["Grandfather", "Grandmother", "Great-grandfather", "Great-grandmother", "Uncle", "Aunt", "Cousin", "Other"]

export default function AddRootAncestorPage() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [groupId, setGroupId] = React.useState<string | null>(null)
  const [ancestors, setAncestors] = React.useState<Ancestor[]>([])
  const [loading, setLoading] = React.useState(true)
  const [showAdd, setShowAdd] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  const [fullName, setFullName] = React.useState("")
  const [relation, setRelation] = React.useState("Grandfather")
  const [birthYear, setBirthYear] = React.useState("")
  const [birthPlace, setBirthPlace] = React.useState("")
  const [notes, setNotes] = React.useState("")

  React.useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    async function load() {
      const { data: myRow } = await (supabase as any)
        .from("family_members").select("group_id").eq("user_id", user!.uid).maybeSingle()
      if (!myRow) { setLoading(false); return }
      setGroupId(myRow.group_id)
      const { data } = await (supabase as any)
        .from("family_ancestors")
        .select("id, full_name, relation, birth_year, birth_place, notes, created_at")
        .eq("group_id", myRow.group_id)
        .order("created_at", { ascending: false })
      setAncestors(data ?? [])
      setLoading(false)
    }
    load()
  }, [user?.uid])

  const handleAdd = async () => {
    if (!fullName.trim() || !groupId) return
    setSaving(true)
    const supabase = createClient()
    const { data, error } = await (supabase as any)
      .from("family_ancestors")
      .insert({
        group_id: groupId,
        full_name: fullName.trim(),
        relation,
        birth_year: birthYear ? parseInt(birthYear) : null,
        birth_place: birthPlace.trim() || null,
        notes: notes.trim() || null,
        added_by: user?.uid,
      })
      .select("id, full_name, relation, birth_year, birth_place, notes, created_at")
      .single()

    if (error) {
      toast({ title: "Failed to save", description: error.message, variant: "destructive" })
    } else {
      setAncestors(prev => [data, ...prev])
      setFullName(""); setRelation("Grandfather"); setBirthYear(""); setBirthPlace(""); setNotes("")
      setShowAdd(false)
      toast({ title: "Ancestor added!" })
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    await (supabase as any).from("family_ancestors").delete().eq("id", id)
    setAncestors(prev => prev.filter(a => a.id !== id))
    toast({ title: "Ancestor removed" })
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  )

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-2xl space-y-5 pb-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-3 w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Hub
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center text-amber-600">
              <Network className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black">Lineage Roots</h1>
              <p className="text-xs text-muted-foreground font-bold">{ancestors.length} ancestor{ancestors.length !== 1 ? "s" : ""} recorded</p>
            </div>
          </div>
        </div>
        <Button onClick={() => setShowAdd(v => !v)} className="rounded-full h-10 px-5 font-black bg-amber-500 hover:bg-amber-600 text-white shadow-lg mt-8">
          {showAdd ? <X className="h-4 w-4" /> : <><Plus className="h-4 w-4 mr-1.5" /> Add</>}
        </Button>
      </div>

      {showAdd && (
        <Card className="rounded-2xl border-none shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <CardContent className="p-5 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</Label>
              <Input placeholder="e.g. Abdullah Al-Sayed" className="h-12 rounded-xl bg-muted border-none font-bold"
                value={fullName} onChange={e => setFullName(e.target.value)} autoFocus />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Relation</Label>
              <div className="flex gap-2 flex-wrap">
                {RELATIONS.map(r => (
                  <button key={r} onClick={() => setRelation(r)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors ${relation === r ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground"}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Birth Year</Label>
                <Input type="number" placeholder="e.g. 1932" className="h-11 rounded-xl bg-muted border-none font-medium"
                  value={birthYear} onChange={e => setBirthYear(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Birth Place</Label>
                <Input placeholder="e.g. Cairo, Egypt" className="h-11 rounded-xl bg-muted border-none font-medium"
                  value={birthPlace} onChange={e => setBirthPlace(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Notes (optional)</Label>
              <Textarea placeholder="Stories, achievements, or anything to remember…" className="rounded-xl bg-muted border-none resize-none min-h-[72px] font-medium"
                value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAdd} disabled={saving || !fullName.trim()} className="rounded-xl h-10 px-6 font-black bg-amber-500 hover:bg-amber-600 text-white">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Ancestor"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!groupId && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <Network className="h-10 w-10 text-muted-foreground/20" />
          <p className="font-black">No family group yet</p>
          <Button asChild className="rounded-xl font-bold"><Link href="/family-tree/setup">Set Up Family Hub</Link></Button>
        </div>
      )}

      {groupId && ancestors.length === 0 && !showAdd && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <Network className="h-10 w-10 text-muted-foreground/20" />
          <p className="font-black">No ancestors recorded yet</p>
          <p className="text-sm text-muted-foreground">Document your family roots and heritage.</p>
        </div>
      )}

      {ancestors.length > 0 && (
        <div className="space-y-2">
          {ancestors.map(a => (
            <Card key={a.id} className="rounded-2xl border-none shadow-sm group">
              <CardContent className="p-4 flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                  <Network className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-black text-sm">{a.full_name}</p>
                    {a.relation && <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-950/40 border-none text-[9px] font-black uppercase">{a.relation}</Badge>}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    {a.birth_year && <span className="text-[11px] text-muted-foreground font-medium">b. {a.birth_year}</span>}
                    {a.birth_place && (
                      <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-0.5">
                        <MapPin className="h-2.5 w-2.5" /> {a.birth_place}
                      </span>
                    )}
                  </div>
                  {a.notes && <p className="text-xs text-muted-foreground font-medium mt-1 italic">"{a.notes}"</p>}
                </div>
                <button onClick={() => handleDelete(a.id)}
                  className="h-8 w-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors opacity-0 group-hover:opacity-100 shrink-0">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
