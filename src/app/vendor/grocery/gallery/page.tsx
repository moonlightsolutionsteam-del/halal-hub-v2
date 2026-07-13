
"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Trash2 } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function GroceryGalleryPage() {
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

  function setPrimary(url: string) {
    saveImages([url, ...images.filter(i => i !== url)])
  }

  if (loading) {
    return <div className="p-8 flex items-center justify-center min-h-screen"><div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
  }

  if (!businessId) {
    return <div className="p-8 text-center text-muted-foreground">Register your store to manage a gallery.</div>
  }

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-[10px]">
            <Camera className="h-3 w-3" /> Store Presentation
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Media Gallery</h1>
          <p className="text-muted-foreground font-medium">Showcase your store's aisles, fresh departments, and clean environment to shoppers.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        {images.map((img, i) => (
          <Card key={img} className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden group hover:shadow-xl transition-all border-2 border-transparent hover:border-emerald-100">
            <div className="relative aspect-video">
              <Image src={img} alt={`Store photo ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              {i === 0 && (
                <Badge className="absolute top-4 left-4 bg-emerald-600 text-white border-none px-3 font-black text-[9px] uppercase tracking-widest shadow-xl">STORE COVER</Badge>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="destructive" onClick={() => saveImages(images.filter(i2 => i2 !== img))} className="rounded-xl h-10 w-10"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
            {i !== 0 && (
              <div className="p-6 flex items-center justify-end">
                <Button variant="ghost" size="sm" onClick={() => setPrimary(img)} className="text-[10px] font-black uppercase text-emerald-600 p-0 h-auto hover:bg-transparent hover:underline">Set as primary</Button>
              </div>
            )}
          </Card>
        ))}

        <label className="rounded-[2.5rem] border-4 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center p-12 text-center gap-4 hover:bg-card hover:border-emerald-200 transition-all cursor-pointer group min-h-[250px]">
          <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Upload className="h-8 w-8 text-emerald-600" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-xl text-foreground">{uploading ? "Uploading..." : "Upload More"}</p>
            <p className="text-sm text-muted-foreground font-medium">Add aisle photos or department shots</p>
          </div>
          <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={handleUpload} />
        </label>
      </div>
    </div>
  );
}
