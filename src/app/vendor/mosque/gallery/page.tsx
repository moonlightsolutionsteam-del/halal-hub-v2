"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UploadCloud } from "lucide-react"
import Image from "next/image"

const photos = Array.from({ length: 8 }, (_, i) => `https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400/400`)

export default function MosqueGalleryPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Media Gallery</h1>
          <p className="text-sm font-bold text-muted-foreground">Photos of your masjid, events, and community.</p>
        </div>
        <Button className="rounded-full"><UploadCloud className="h-4 w-4 mr-2" />Upload Photos</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((src, i) => (
          <Card key={i} className="rounded-[1.5rem] border-none shadow-soft overflow-hidden aspect-square relative group">
            <Image src={src} alt={`Masjid photo ${i + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
          </Card>
        ))}
      </div>
    </div>
  )
}
