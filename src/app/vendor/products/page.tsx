"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus, Search, Filter, Edit2,
  Trash2, MoreVertical, Loader2,
  UtensilsCrossed, X, ImagePlus
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

interface MenuItem {
  id: string
  title: string | null
  description: string | null
  price: number | null
  image_url: string | null
}

function ItemFormModal({
  bizId,
  bizName,
  vendorUid,
  item,
  onClose,
  onSaved,
}: {
  bizId: string
  bizName: string
  vendorUid: string
  item: MenuItem | null
  onClose: () => void
  onSaved: (saved: MenuItem) => void
}) {
  const { toast } = useToast()
  const [title, setTitle] = React.useState(item?.title ?? "")
  const [description, setDescription] = React.useState(item?.description ?? "")
  const [price, setPrice] = React.useState(item?.price != null ? String(item.price) : "")
  const [imageUrl, setImageUrl] = React.useState(item?.image_url ?? "")
  const [saving, setSaving] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)
  const imgRef = React.useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const supabase = createClient()
    const ext = file.name.split(".").pop() ?? "jpg"
    const path = `${bizId}/menu_${Date.now()}.${ext}`
    const { error } = await supabase.storage
      .from("business-media")
      .upload(path, file, { upsert: true, contentType: file.type })
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" })
    } else {
      const { data } = supabase.storage.from("business-media").getPublicUrl(path)
      setImageUrl(data.publicUrl)
    }
    setUploading(false)
    e.target.value = ""
  }

  const handleSave = async () => {
    if (!title.trim()) {
      toast({ title: "Item name is required", variant: "destructive" })
      return
    }
    setSaving(true)
    const supabase = createClient()
    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      price: price ? parseFloat(price) : null,
      image_url: imageUrl || null,
      business_id: bizId,
      business_name: bizName,
      vendor_uid: vendorUid,
    }
    if (item) {
      const { data, error } = await supabase
        .from("business_catalog_items")
        .update(payload)
        .eq("id", item.id)
        .select("id, title, description, price, image_url")
        .single()
      setSaving(false)
      if (error) { toast({ title: "Save failed", description: error.message, variant: "destructive" }); return }
      toast({ title: "Item updated!" })
      onSaved(data)
    } else {
      const { data, error } = await supabase
        .from("business_catalog_items")
        .insert(payload)
        .select("id, title, description, price, image_url")
        .single()
      setSaving(false)
      if (error) { toast({ title: "Save failed", description: error.message, variant: "destructive" }); return }
      toast({ title: "Item added!" })
      onSaved(data)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full sm:max-w-md bg-background rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black">{item ? "Edit Item" : "Add Menu Item"}</h2>
          <Button variant="ghost" size="icon" className="rounded-2xl" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Image upload */}
        <div
          onClick={() => imgRef.current?.click()}
          className="relative w-full aspect-video rounded-2xl overflow-hidden bg-muted border-2 border-dashed border-border hover:border-primary/40 transition-all cursor-pointer flex items-center justify-center"
        >
          {imageUrl ? (
            <Image src={imageUrl} alt="" fill className="object-cover" sizes="400px" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              {uploading ? <Loader2 className="h-8 w-8 animate-spin" /> : <ImagePlus className="h-8 w-8" />}
              <p className="text-sm font-medium">{uploading ? "Uploading…" : "Add photo"}</p>
            </div>
          )}
          {imageUrl && (
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white text-sm font-bold">Change photo</p>
            </div>
          )}
        </div>
        <input ref={imgRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Item Name *</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Product name"
              className="h-11 rounded-2xl bg-muted border-none font-bold"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this item…"
              className="rounded-2xl bg-muted border-none resize-none"
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Price (₹)</Label>
            <Input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g., 350"
              type="number"
              min="0"
              className="h-11 rounded-2xl bg-muted border-none font-bold"
            />
          </div>
        </div>

        <Button
          className="w-full h-12 rounded-2xl font-black gap-2"
          onClick={handleSave}
          disabled={saving || uploading}
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {saving ? "Saving…" : item ? "Save Changes" : "Add Item"}
        </Button>
      </div>
    </div>
  )
}

export default function VendorProductsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [bizId, setBizId] = React.useState<string | null>(null)
  const [bizName, setBizName] = React.useState("")
  const [items, setItems] = React.useState<MenuItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [showForm, setShowForm] = React.useState(false)
  const [editItem, setEditItem] = React.useState<MenuItem | null>(null)
  const [deleting, setDeleting] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!user?.uid) return
    const supabase = createClient()
    ;supabase
      .from("businesses")
      .select("id, name")
      .eq("owner_id", user.uid)
      .limit(1)
      .then(({ data }: { data: any[] | null }) => {
        const biz = data?.[0]
        if (!biz) { setLoading(false); return }
        setBizId(biz.id)
        setBizName(biz.name ?? "")
        ;supabase
          .from("business_catalog_items")
          .select("id, title, description, price, image_url")
          .eq("business_id", biz.id)
          .order("created_at", { ascending: true })
          .then(({ data: items }: { data: MenuItem[] | null }) => {
            setItems(items ?? [])
            setLoading(false)
          })
      })
  }, [user?.uid])

  const handleDelete = async (id: string) => {
    setDeleting(id)
    const supabase = createClient()
    const { error } = await supabase
      .from("business_catalog_items")
      .delete()
      .eq("id", id)
    setDeleting(null)
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" })
    } else {
      setItems((prev) => prev.filter((i) => i.id !== id))
      toast({ title: "Item removed" })
    }
  }

  const handleSaved = (saved: MenuItem) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === saved.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = saved
        return next
      }
      return [...prev, saved]
    })
    setShowForm(false)
    setEditItem(null)
  }

  const filtered = items.filter((i) =>
    (i.title ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (i.description ?? "").toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      {(showForm || editItem) && bizId && (
        <ItemFormModal
          bizId={bizId}
          bizName={bizName}
          vendorUid={user?.uid ?? ""}
          item={editItem}
          onClose={() => { setShowForm(false); setEditItem(null) }}
          onSaved={handleSaved}
        />
      )}

      <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Menu Items</h1>
            <p className="text-muted-foreground font-medium">
              Manage your menu offerings — they appear live on your listing page.
            </p>
          </div>
          <Button
            className="bg-primary rounded-full px-8 font-bold shadow-lg shadow-primary/20 text-white"
            onClick={() => { setEditItem(null); setShowForm(true) }}
            disabled={!bizId}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Menu Item
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items…"
              className="pl-9 h-11 rounded-2xl bg-card border-none shadow-sm"
            />
          </div>
          <p className="text-sm text-muted-foreground font-medium shrink-0">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4 text-center">
            <div className="h-20 w-20 bg-muted rounded-3xl flex items-center justify-center text-muted-foreground">
              <UtensilsCrossed className="h-10 w-10" />
            </div>
            <div>
              <p className="text-lg font-black text-foreground">
                {search ? "No items match your search" : "No menu items yet"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {search ? "Try a different keyword" : "Add your first item — it'll appear on your listing page instantly."}
              </p>
            </div>
            {!search && (
              <Button
                className="rounded-full px-8 font-bold"
                onClick={() => { setEditItem(null); setShowForm(true) }}
              >
                <Plus className="mr-2 h-4 w-4" /> Add First Item
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {filtered.map((item) => (
              <Card
                key={item.id}
                className="group rounded-[2rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-square bg-muted">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.title ?? ""}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="300px"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground/40">
                      <UtensilsCrossed className="h-10 w-10" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          className="rounded-full bg-card/80 backdrop-blur-md text-foreground hover:bg-card border-none shadow-sm h-8 w-8"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl p-2 border-none shadow-xl">
                        <DropdownMenuItem
                          className="rounded-xl font-bold gap-2"
                          onClick={() => { setEditItem(item); setShowForm(false) }}
                        >
                          <Edit2 className="h-4 w-4" /> Edit Item
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="rounded-xl font-bold gap-2 text-red-500 focus:text-red-500"
                          onClick={() => handleDelete(item.id)}
                          disabled={deleting === item.id}
                        >
                          {deleting === item.id
                            ? <Loader2 className="h-4 w-4 animate-spin" />
                            : <Trash2 className="h-4 w-4" />}
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardContent className="p-4 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-black text-foreground line-clamp-1 flex-1">{item.title}</p>
                    {item.price != null && (
                      <p className="text-sm font-black text-primary shrink-0">₹{item.price}</p>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Add new card */}
            <button
              onClick={() => { setEditItem(null); setShowForm(true) }}
              className="rounded-[2rem] border-4 border-dashed border-muted hover:border-primary/40 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-4 text-muted-foreground hover:text-primary p-6 min-h-[220px]"
            >
              <div className="h-12 w-12 rounded-2xl bg-muted/50 flex items-center justify-center">
                <Plus className="h-6 w-6" />
              </div>
              <div className="text-center">
                <p className="font-black">Add Item</p>
                <p className="text-xs font-medium mt-0.5">New menu entry</p>
              </div>
            </button>
          </div>
        )}
      </div>
    </>
  )
}
