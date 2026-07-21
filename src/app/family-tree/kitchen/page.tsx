"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Utensils, Plus, Trash2, Loader2, X, ChefHat, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

type Recipe = {
  id: string
  name: string
  author_name: string | null
  cook_time: string | null
  difficulty: string
  ingredients: string | null
  steps: string | null
  created_at: string
}

const DIFFICULTIES = ["Easy", "Medium", "Expert"]

export default function HeritageKitchenPage() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [groupId, setGroupId] = React.useState<string | null>(null)
  const [recipes, setRecipes] = React.useState<Recipe[]>([])
  const [loading, setLoading] = React.useState(true)
  const [showAdd, setShowAdd] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [expanded, setExpanded] = React.useState<string | null>(null)

  const [name, setName] = React.useState("")
  const [author, setAuthor] = React.useState("")
  const [cookTime, setCookTime] = React.useState("")
  const [difficulty, setDifficulty] = React.useState("Medium")
  const [ingredients, setIngredients] = React.useState("")
  const [steps, setSteps] = React.useState("")

  React.useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    async function load() {
      const { data: myRow } = await (supabase as any)
        .from("family_members").select("group_id").eq("user_id", user!.uid).maybeSingle()
      if (!myRow) { setLoading(false); return }
      setGroupId(myRow.group_id)
      const { data } = await (supabase as any)
        .from("family_recipes")
        .select("id, name, author_name, cook_time, difficulty, ingredients, steps, created_at")
        .eq("group_id", myRow.group_id)
        .order("created_at", { ascending: false })
      setRecipes(data ?? [])
      setLoading(false)
    }
    load()
  }, [user?.uid])

  const handleAdd = async () => {
    if (!name.trim() || !groupId) return
    setSaving(true)
    const supabase = createClient()
    const { data, error } = await (supabase as any)
      .from("family_recipes")
      .insert({
        group_id: groupId,
        name: name.trim(),
        author_name: author.trim() || user?.name || null,
        cook_time: cookTime.trim() || null,
        difficulty,
        ingredients: ingredients.trim() || null,
        steps: steps.trim() || null,
        added_by: user?.uid,
      })
      .select("id, name, author_name, cook_time, difficulty, ingredients, steps, created_at")
      .single()

    if (error) {
      toast({ title: "Failed to save", description: error.message, variant: "destructive" })
    } else {
      setRecipes(prev => [data, ...prev])
      setName(""); setAuthor(""); setCookTime(""); setDifficulty("Medium"); setIngredients(""); setSteps("")
      setShowAdd(false)
      toast({ title: "Recipe added!" })
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    await (supabase as any).from("family_recipes").delete().eq("id", id)
    setRecipes(prev => prev.filter(r => r.id !== id))
    toast({ title: "Recipe removed" })
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
            <div className="h-11 w-11 rounded-2xl bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center text-orange-600">
              <Utensils className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black">Heritage Kitchen</h1>
              <p className="text-xs text-muted-foreground font-bold">{recipes.length} recipe{recipes.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
        </div>
        <Button onClick={() => setShowAdd(v => !v)} className="rounded-full h-10 px-5 font-black bg-orange-500 hover:bg-orange-600 text-white shadow-lg mt-8">
          {showAdd ? <X className="h-4 w-4" /> : <><Plus className="h-4 w-4 mr-1.5" /> Add</>}
        </Button>
      </div>

      {showAdd && (
        <Card className="rounded-2xl border-none shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <CardContent className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5 col-span-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recipe Name</Label>
                <Input placeholder="e.g. Grandma's Biryani" className="h-12 rounded-xl bg-muted border-none font-bold"
                  value={name} onChange={e => setName(e.target.value)} autoFocus />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Author</Label>
                <Input placeholder="e.g. Nani" className="h-11 rounded-xl bg-muted border-none font-medium"
                  value={author} onChange={e => setAuthor(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Cook Time</Label>
                <Input placeholder="e.g. 2h 30m" className="h-11 rounded-xl bg-muted border-none font-medium"
                  value={cookTime} onChange={e => setCookTime(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Difficulty</Label>
              <div className="flex gap-2">
                {DIFFICULTIES.map(d => (
                  <button key={d} onClick={() => setDifficulty(d)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-black transition-colors ${difficulty === d ? "bg-orange-500 text-white" : "bg-muted text-muted-foreground"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Ingredients</Label>
              <Textarea placeholder="List each ingredient on a new line…" className="rounded-xl bg-muted border-none resize-none min-h-[80px] font-medium"
                value={ingredients} onChange={e => setIngredients(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Steps</Label>
              <Textarea placeholder="Describe the cooking steps…" className="rounded-xl bg-muted border-none resize-none min-h-[80px] font-medium"
                value={steps} onChange={e => setSteps(e.target.value)} />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAdd} disabled={saving || !name.trim()} className="rounded-xl h-10 px-6 font-black bg-orange-500 hover:bg-orange-600 text-white">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Recipe"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!groupId && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <Utensils className="h-10 w-10 text-muted-foreground/20" />
          <p className="font-black">No family group yet</p>
          <Button asChild className="rounded-xl font-bold"><Link href="/family-tree/setup">Set Up Family Hub</Link></Button>
        </div>
      )}

      {groupId && recipes.length === 0 && !showAdd && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <ChefHat className="h-10 w-10 text-muted-foreground/20" />
          <p className="font-black">No recipes yet</p>
          <p className="text-sm text-muted-foreground">Preserve your family's heritage recipes.</p>
        </div>
      )}

      {recipes.length > 0 && (
        <div className="space-y-3">
          {recipes.map(r => (
            <Card key={r.id} className="rounded-2xl border-none shadow-sm group cursor-pointer"
              onClick={() => setExpanded(expanded === r.id ? null : r.id)}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center text-orange-600 shrink-0">
                    <ChefHat className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm">{r.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {r.author_name && <span className="text-[11px] text-muted-foreground font-medium">{r.author_name}</span>}
                      {r.cook_time && <span className="text-[11px] text-muted-foreground flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" /> {r.cook_time}</span>}
                    </div>
                  </div>
                  <Badge className={`text-[9px] font-black uppercase border-none shrink-0 ${
                    r.difficulty === "Expert" ? "bg-red-100 text-red-600 dark:bg-red-950/40"
                    : r.difficulty === "Medium" ? "bg-amber-100 text-amber-600 dark:bg-amber-950/40"
                    : "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40"
                  }`}>{r.difficulty}</Badge>
                  <button onClick={e => { e.stopPropagation(); handleDelete(r.id) }}
                    className="h-8 w-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors opacity-0 group-hover:opacity-100">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                {expanded === r.id && (r.ingredients || r.steps) && (
                  <div className="mt-4 space-y-3 animate-in fade-in duration-200">
                    {r.ingredients && (
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Ingredients</p>
                        <p className="text-sm font-medium text-foreground whitespace-pre-line">{r.ingredients}</p>
                      </div>
                    )}
                    {r.steps && (
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Steps</p>
                        <p className="text-sm font-medium text-foreground whitespace-pre-line">{r.steps}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
