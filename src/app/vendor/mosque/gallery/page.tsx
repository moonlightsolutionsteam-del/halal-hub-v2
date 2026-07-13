"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UploadCloud, Trash2 } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

export default function MosqueGalleryPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [businessId, setBusinessId] = useState<string | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;(supabase as any).from("businesses").select("id, images").eq("owner_id", user.uid).limit(1)
      .then(({ data }: { data: { id: string; images: string[] | null }[] | null }) => {
        const biz = data?.[0]
        setBusinessId(biz?.id ?? null)
        setImages(biz?.images ?? [])
        setLoading(false)
      })
  }, [user?.uid])

  async function saveImages(next: string[]) {
    if (!businessId) return
    const supabase = createClient()
    const { error } = await (supabase as any).from("businesses").update({ images: next }).eq("id", businessId)
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
    return <div className="p-8 flex items-center justify-center min-h-screen"><div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
  }

  if (!businessId) {
    return <div className="p-8 text-center text-muted-foreground">Register your masjid to manage a gallery.</div>
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Media Gallery</h1>
          <p className="text-sm font-bold text-muted-foreground">Photos of your masjid, events, and community.</p>
        </div>
        <label className="inline-flex">
          <Button asChild className="rounded-full" disabled={uploading}>
            <span><UploadCloud className="h-4 w-4 mr-2" />{uploading ? "Uploading..." : "Upload Photos"}</span>
          </Button>
          <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={handleUpload} />
        </label>
      </div>

      {images.length === 0 ? (
        <Card className="rounded-[1.5rem] border-none shadow-soft p-16 text-center text-muted-foreground">
          No photos yet. Upload some to showcase your masjid.
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <Card key={src} className="rounded-[1.5rem] border-none shadow-soft overflow-hidden aspect-square relative group">
              <Image src={src} alt={`Masjid photo ${i + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button size="icon" variant="destructive" className="rounded-xl h-10 w-10" onClick={() => saveImages(images.filter(img => img !== src))}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
