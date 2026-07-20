"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, CheckCircle2, XCircle } from "lucide-react"

type CosmeticProduct = {
  id: string
  name: string
  category: string | null
  price: number | null
  is_halal_certified: boolean | null
  is_cruelty_free: boolean | null
  is_vegan: boolean | null
  is_available: boolean | null
}

export default function CosmeticsInventoryPage() {
  const { user } = useAuth()
  const [items, setItems] = React.useState<CosmeticProduct[]>([])
  const [loading, setLoading] = React.useState(true)

  const load = React.useCallback(() => {
    if (!user?.uid) return
    const supabase = createClient()
    supabase.from("businesses").select("id").eq("owner_id", user.uid).limit(1).maybeSingle()
      .then(({ data }: { data: { id: string } | null }) => {
        if (!data) { setLoading(false); return }
        supabase.from("cosmetics_products")
          .select("id, name, category, price, is_halal_certified, is_cruelty_free, is_vegan, is_available")
          .eq("business_id", data.id).order("category").order("name")
          .then(({ data: rows }) => { setItems(rows ?? []); setLoading(false) })
      })
  }, [user?.uid])

  React.useEffect(() => { load() }, [load])

  async function toggleAvailable(id: string, current: boolean) {
    await createClient().from("cosmetics_products").update({ is_available: !current }).eq("id", id)
    load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const available = items.filter(i => i.is_available)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline">Inventory</h1>
        <p className="text-muted-foreground text-sm">Toggle products on or off — controls what shoppers can see.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{items.length}</p><p className="text-xs text-muted-foreground mt-0.5">Total products</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-emerald-600">{available.length}</p><p className="text-xs text-muted-foreground mt-0.5">Live</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-primary">{items.filter(i => i.is_halal_certified).length}</p><p className="text-xs text-muted-foreground mt-0.5">Halal certified</p></CardContent></Card>
      </div>

      {items.length === 0 && (
        <div className="text-center py-16 space-y-3">
          <Sparkles className="h-10 w-10 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground font-medium">No products yet.</p>
          <p className="text-sm text-muted-foreground">Add products in Product Catalog, then manage visibility here.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map(item => (
          <Card key={item.id}>
            <CardContent className="p-3 flex items-center gap-3">
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${item.is_available ? "bg-pink-50 dark:bg-pink-950/30" : "bg-muted"}`}>
                {item.is_available
                  ? <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  : <XCircle className="h-4 w-4 text-muted-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm">{item.name}</span>
                  {item.category && <Badge variant="outline" className="text-[10px] font-bold">{item.category}</Badge>}
                </div>
                <div className="flex gap-1.5 mt-0.5 flex-wrap">
                  {item.is_halal_certified && <span className="text-[10px] font-bold text-emerald-600">Halal</span>}
                  {item.is_cruelty_free && <span className="text-[10px] font-bold text-blue-600">CF</span>}
                  {item.is_vegan && <span className="text-[10px] font-bold text-green-600">Vegan</span>}
                  {item.price && <span className="text-xs font-bold text-primary">₹{item.price?.toLocaleString()}</span>}
                </div>
              </div>
              <button onClick={() => toggleAvailable(item.id, !!item.is_available)}
                className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition-colors shrink-0 ${item.is_available ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-muted text-muted-foreground border-input"}`}>
                {item.is_available ? "Live" : "Off"}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
