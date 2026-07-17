"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, Trash2, Loader2 } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

export default function VendorGalleryPage() {
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [businessId, setBusinessId] = useState<string | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;supabase.from("businesses").select("id, images").eq("owner_id", user.uid).limit(1)
      .then(({ data }: { data: { id: string; images: string[] | null }[] | null }) => {
        const biz = data?.[0]
        setBusinessId(biz?.id ?? null)
        setImages(biz?.images ?? [])
        setLoading(false)
      })
  }, [user?.uid, authLoading])

  async function saveImages(next: string[]) {
    if (!businessId) return
    const supabase = createClient()
    const { error } = await supabase.from("businesses").update({ images: next }).eq("id", businessId)
    if (error) {
      toast({ variant: "destructive", title: "Couldn't update gallery", description: error.message })
      return
    }
    setImages(next)
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !user?.uid) return
    setUploading(true)
    const supabase = createClient()
    const path = `${user.uid}/gallery-${Date.now()}-${file.name}`
    const { error: uploadError } = await supabase.storage.from("business-media").upload(path, file)
    if (uploadError) {
      toast({ variant: "destructive", title: "Upload failed", description: uploadError.message })
      setUploading(false)
      return
    }
    const { data } = supabase.storage.from("business-media").getPublicUrl(path)
    await saveImages([...images, data.publicUrl])
    setUploading(false)
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!businessId) {
    return <div className="p-8 text-center text-muted-foreground">Register your business to manage a gallery.</div>
  }

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Camera className="h-3 w-3" /> Media Gallery
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Business Gallery</h1>
          <p className="text-muted-foreground font-medium text-sm">Showcase your business with high-quality photos. The first image is your cover photo.</p>
        </div>
        <Badge variant="outline" className="font-black text-xs">{images.length} photo{images.length !== 1 ? "s" : ""}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        {images.map((img, i) => (
          <Card key={img} className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden group hover:shadow-xl transition-all border-2 border-transparent hover:border-primary/20">
            <div className="relative aspect-video">
              <Image src={img} alt={`Photo ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              {i === 0 && (
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground border-none px-3 font-black text-[9px] uppercase tracking-widest shadow-xl">Cover Photo</Badge>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="destructive" onClick={() => saveImages(images.filter(u => u !== img))} className="rounded-xl h-10 w-10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {i !== 0 && (
              <div className="p-4 flex items-center justify-end">
                <Button variant="ghost" size="sm" onClick={() => saveImages([img, ...images.filter(u => u !== img)])} className="text-[10px] font-black uppercase text-primary p-0 h-auto hover:bg-transparent hover:underline">
                  Set as cover
                </Button>
              </div>
            )}
          </Card>
        ))}

        <label className="rounded-[2.5rem] border-4 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center p-12 text-center gap-4 hover:bg-card hover:border-primary/30 transition-all cursor-pointer group min-h-[200px]">
          <div className="h-14 w-14 bg-card rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            {uploading ? <Loader2 className="h-7 w-7 text-primary animate-spin" /> : <Upload className="h-7 w-7 text-primary" />}
          </div>
          <div className="space-y-1">
            <p className="font-black text-lg text-foreground">{uploading ? "Uploading..." : "Add Photo"}</p>
            <p className="text-xs text-muted-foreground font-medium">JPG, PNG, WebP — up to 10 MB</p>
          </div>
          <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={handleUpload} />
        </label>
      </div>
    </div>
  )
}
