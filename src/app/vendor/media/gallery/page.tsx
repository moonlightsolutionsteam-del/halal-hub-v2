"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, Upload, Camera } from "lucide-react"
import Image from "next/image"

const GALLERY_SLOTS = [
  { label: "Store Logo", hint: "1:1 · PNG or JPG", seed: "media-logo" },
  { label: "Storefront Banner", hint: "16:9 · PNG or JPG", seed: "media-banner" },
  { label: "Featured Collection", hint: "4:3 · Showcase your bestsellers", seed: "media-collection" },
  { label: "Author Spotlights", hint: "4:3 · Photo of featured scholars", seed: "media-authors" },
  { label: "Event Photography", hint: "16:9 · Book fairs, launches", seed: "media-events" },
  { label: "Social Media Kit", hint: "1:1 · Instagram / X ready", seed: "media-social" },
]

export default function MediaGalleryPage() {
  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <ImageIcon className="h-3 w-3" /> Media Gallery
          </div>
          <h1 className="text-3xl font-black font-headline text-foreground tracking-tight">Media Gallery</h1>
          <p className="text-sm font-bold text-muted-foreground">Upload photos that appear on your public Halal Hub listing and social profiles.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-2xl px-8 font-black h-12 text-white">
          <Upload className="mr-2 h-4 w-4" /> Upload Photos
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {GALLERY_SLOTS.map((slot) => (
          <Card key={slot.label} className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden group">
            <div className="relative aspect-video bg-muted overflow-hidden">
              <Image
                src={`https://picsum.photos/seed/${slot.seed}/400/250`}
                alt={slot.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button size="sm" className="bg-white text-foreground hover:bg-white/90 rounded-2xl font-black text-xs">
                  <Camera className="h-4 w-4 mr-2" /> Replace
                </Button>
              </div>
            </div>
            <div className="p-4">
              <p className="font-black text-sm text-foreground">{slot.label}</p>
              <p className="text-[10px] font-bold text-muted-foreground mt-1">{slot.hint}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
