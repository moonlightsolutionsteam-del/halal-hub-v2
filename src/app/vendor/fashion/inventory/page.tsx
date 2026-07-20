"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Shirt, CheckCircle2, XCircle } from "lucide-react"

type FashionProduct = {
  id: string
  name: string
  category: string | null
  gender: string | null
  sizes: string[] | null
  price: number | null
  is_available: boolean | null
}

export default function FashionInventoryPage() {
  const { user } = useAuth()
  const [items, setItems] = React.useState<FashionProduct[]>([])
  const [loading, setLoading] = React.useState(true)

  const load = React.useCallback(() => {
    if (!user?.uid) return
    const supabase = createClient()
    supabase.from("businesses").select("id").eq("owner_id", user.uid).limit(1).maybeSingle()
      .then(({ data }: { data: { id: string } | null }) => {
        if (!data) { setLoading(false); return }
        supabase.from("fashion_products").select("id, name, category, gender, sizes, price, is_available")
          .eq("business_id", data.id).order("category").order("name")
          .then(({ data: rows }) => { setItems(rows ?? []); setLoading(false) })
      })
  }, [user?.uid])

  React.useEffect(() => { load() }, [load])

  async function toggleAvailable(id: string, current: boolean) {
    await createClient().from("fashion_products").update({ is_available: !current }).eq("id", id)
    load()
  }

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const available = items.filter(i => i.is_available)
  const unavailable = items.filter(i => !i.is_available)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline">Inventory Status</h1>
        <p className="text-muted-foreground text-sm">Toggle products on or off — controls what shoppers can see.</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums">{items.length}</p><p className="text-xs text-muted-foreground mt-0.5">Total products</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-emerald-600">{available.length}</p><p className="text-xs text-muted-foreground mt-0.5">Live</p></CardContent></Card>
        <Card><CardContent className="pt-4 pb-3"><p className="text-xl font-black tabular-nums text-muted-foreground">{unavailable.length}</p><p className="text-xs text-muted-foreground mt-0.5">Hidden</p></CardContent></Card>
      </div>

      {items.length === 0 && (
        <div className="text-center py-16 space-y-3">
          <Shirt className="h-10 w-10 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground font-medium">No products yet.</p>
          <p className="text-sm text-muted-foreground">Add products in Product Catalog, then manage visibility here.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map(item => (
          <Card key={item.id}>
            <CardContent className="p-3 flex items-center gap-3">
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${item.is_available ? "bg-emerald-50 dark:bg-emerald-950/30" : "bg-muted"}`}>
                {item.is_available
                  ? <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  : <XCircle className="h-4 w-4 text-muted-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm">{item.name}</span>
                  {item.category && <Badge variant="outline" className="text-[10px] font-bold">{item.category}</Badge>}
                  {item.gender && <span className="text-[10px] text-muted-foreground">{item.gender}</span>}
                </div>
                {item.price && <span className="text-xs font-bold text-primary">₹{item.price?.toLocaleString()}</span>}
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
