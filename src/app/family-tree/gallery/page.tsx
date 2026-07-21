"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Image as ImageIcon, Plus, Upload, Trash2, Loader2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"

type GalleryItem = {
  id: string
  title: string | null
  album: string
  file_url: string
  uploader_name: string | null
  created_at: string
}

export default function FamilyGalleryPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const fileRef = React.useRef<HTMLInputElement>(null)

  const [groupId, setGroupId] = React.useState<string | null>(null)
  const [items, setItems] = React.useState<GalleryItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [showAdd, setShowAdd] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [title, setTitle] = React.useState("")
  const [album, setAlbum] = React.useState("General")
  const [file, setFile] = React.useState<File | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    async function load() {
      const { data: myRow } = await (supabase as any)
        .from("family_members").select("group_id").eq("user_id", user!.uid).maybeSingle()
      if (!myRow) { setLoading(false); return }
      setGroupId(myRow.group_id)
      const { data } = await (supabase as any)
        .from("family_gallery")
        .select("id, title, album, file_url, uploader_name, created_at")
        .eq("group_id", myRow.group_id)
        .order("created_at", { ascending: false })
      setItems(data ?? [])
      setLoading(false)
    }
    load()
  }, [user?.uid])

  const handleFileChange = (f: File | null) => {
    setFile(f)
    if (f) {
      const url = URL.createObjectURL(f)
      setPreview(url)
    } else {
      setPreview(null)
    }
  }

  const handleUpload = async () => {
    if (!file || !groupId) return
    setSaving(true)
    const supabase = createClient()
    const ext = file.name.split(".").pop() ?? "jpg"
    const path = `family-gallery/${groupId}/${Date.now()}.${ext}`
    const { error: upErr } = await supabase.storage.from("media").upload(path, file, { upsert: false })
    if (upErr) {
      toast({ title: "Upload failed", description: upErr.message, variant: "destructive" })
      setSaving(false)
      return
    }
    const { data: urlData } = supabase.storage.from("media").getPublicUrl(path)
    const { data, error } = await (supabase as any)
      .from("family_gallery")
      .insert({
        group_id: groupId,
        title: title.trim() || null,
        album: album.trim() || "General",
        file_url: urlData.publicUrl,
        media_type: file.type.startsWith("video") ? "video" : "image",
        uploaded_by: user?.uid,
        uploader_name: user?.name ?? user?.email ?? "Member",
      })
      .select("id, title, album, file_url, uploader_name, created_at")
      .single()

    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" })
    } else {
      setItems(prev => [data, ...prev])
      setTitle(""); setAlbum("General"); setFile(null); setPreview(null)
      setShowAdd(false)
      toast({ title: "Photo added!" })
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    await (supabase as any).from("family_gallery").delete().eq("id", id)
    setItems(prev => prev.filter(i => i.id !== id))
    toast({ title: "Photo removed" })
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  )

  // Group by album
  const albums: Record<string, GalleryItem[]> = {}
  items.forEach(i => {
    if (!albums[i.album]) albums[i.album] = []
    albums[i.album].push(i)
  })

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl space-y-5 pb-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-3 w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Hub
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-rose-100 dark:bg-rose-950/40 flex items-center justify-center text-rose-600">
              <ImageIcon className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black">Family Gallery</h1>
              <p className="text-xs text-muted-foreground font-bold">{items.length} photo{items.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
        </div>
        <Button onClick={() => setShowAdd(v => !v)} className="rounded-full h-10 px-5 font-black bg-rose-500 hover:bg-rose-600 text-white shadow-lg mt-8">
          {showAdd ? <X className="h-4 w-4" /> : <><Plus className="h-4 w-4 mr-1.5" /> Upload</>}
        </Button>
      </div>

      {showAdd && (
        <Card className="rounded-2xl border-none shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <CardContent className="p-5 space-y-4">
            <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden"
              onChange={e => handleFileChange(e.target.files?.[0] ?? null)} />
            <button onClick={() => fileRef.current?.click()}
              className="w-full h-40 rounded-2xl bg-muted border-2 border-dashed border-border hover:border-rose-400 transition-colors flex flex-col items-center justify-center gap-2 overflow-hidden relative">
              {preview
                ? <img src={preview} alt="" className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
                : <><Upload className="h-6 w-6 text-muted-foreground" /><span className="text-sm font-bold text-muted-foreground">Choose photo or video</span></>
              }
            </button>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Caption (optional)</Label>
                <Input placeholder="Add a caption…" className="h-11 rounded-xl bg-muted border-none font-medium"
                  value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Album</Label>
                <Input placeholder="e.g. Eid 2024" className="h-11 rounded-xl bg-muted border-none font-medium"
                  value={album} onChange={e => setAlbum(e.target.value)} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleUpload} disabled={saving || !file} className="rounded-xl h-10 px-6 font-black bg-rose-500 hover:bg-rose-600 text-white">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Upload"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!groupId && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <ImageIcon className="h-10 w-10 text-muted-foreground/20" />
          <p className="font-black">No family group yet</p>
          <Button asChild className="rounded-xl font-bold"><Link href="/family-tree/setup">Set Up Family Hub</Link></Button>
        </div>
      )}

      {groupId && items.length === 0 && !showAdd && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <ImageIcon className="h-10 w-10 text-muted-foreground/20" />
          <p className="font-black">No photos yet</p>
          <p className="text-sm text-muted-foreground">Upload family photos and videos to preserve memories.</p>
        </div>
      )}

      {Object.entries(albums).map(([albumName, albumItems]) => (
        <div key={albumName} className="space-y-3">
          <h2 className="font-black text-sm uppercase tracking-widest text-muted-foreground">{albumName} · {albumItems.length}</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {albumItems.map(item => (
              <div key={item.id} className="relative group aspect-square rounded-2xl overflow-hidden bg-muted">
                <img src={item.file_url} alt={item.title ?? ""} className="w-full h-full object-cover" />
                {item.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1.5 text-[10px] font-bold text-white truncate opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.title}
                  </div>
                )}
                <button onClick={() => handleDelete(item.id)}
                  className="absolute top-1.5 right-1.5 h-6 w-6 rounded-lg bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
