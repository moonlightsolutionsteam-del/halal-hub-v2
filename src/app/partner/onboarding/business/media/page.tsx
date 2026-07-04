"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useOnboarding } from "@/lib/onboarding-context"
import { ArrowRight, Camera, Upload, ImageIcon, FileText, X, Star, Info } from "lucide-react"
import { cn } from "@/lib/utils"

function UploadZone({ icon, title, subtitle, accept, onSelect, preview }: {
  icon: React.ReactNode
  title: string
  subtitle: string
  accept: string
  onSelect: (url: string) => void
  preview?: string
}) {
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    onSelect(url)
  }

  return (
    <div className="relative group">
      <label className={cn(
        "flex flex-col items-center justify-center gap-3 p-8 rounded-[2rem] border-2 border-dashed cursor-pointer transition-all",
        preview ? "border-primary/30 bg-primary/5" : "border-border hover:border-primary/30 hover:bg-muted/50"
      )}>
        {preview ? (
          <div className="relative w-full h-36 rounded-2xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-xs font-black">Click to replace</p>
            </div>
          </div>
        ) : (
          <>
            <div className="h-14 w-14 rounded-3xl bg-muted flex items-center justify-center text-muted-foreground">{icon}</div>
            <div className="text-center space-y-1">
              <p className="text-sm font-black text-foreground">{title}</p>
              <p className="text-xs font-medium text-muted-foreground">{subtitle}</p>
            </div>
          </>
        )}
        <input type="file" accept={accept} className="hidden" onChange={handleFile} />
      </label>
    </div>
  )
}

export default function MediaPage() {
  const router = useRouter()
  const { draft, update } = useOnboarding()
  const [docName, setDocName] = useState("")

  function addGallery(url: string) {
    if (draft.galleryUrls.length < 10) {
      update({ galleryUrls: [...draft.galleryUrls, url] })
    }
  }

  function removeGallery(i: number) {
    update({ galleryUrls: draft.galleryUrls.filter((_, idx) => idx !== i) })
  }

  function handleDocUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    update({ documentUrls: [...draft.documentUrls, `${file.name}::${url}`] })
  }

  function removeDoc(i: number) {
    update({ documentUrls: draft.documentUrls.filter((_, idx) => idx !== i) })
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Step 7 of 8</p>
        <h1 className="text-xl sm:text-3xl font-black font-headline text-foreground flex items-center gap-3">
          <Camera className="h-8 w-8 text-primary" /> Photos & Documents
        </h1>
        <p className="text-sm text-muted-foreground font-medium">Visual content increases views by 3x. Add a logo, cover photo, and gallery images.</p>
      </div>

      <div className="p-4 bg-primary/5 rounded-2xl flex items-start gap-3">
        <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <p className="text-xs font-bold text-primary">All images must be JPG, PNG, or WEBP. Maximum 5MB per image. Documents can be PDF, JPG or PNG up to 10MB.</p>
      </div>

      <div className="space-y-4">
        <p className="font-black text-sm text-foreground uppercase tracking-widest text-xs text-muted-foreground">Logo</p>
        <UploadZone
          icon={<Star className="h-7 w-7" />}
          title="Upload Your Logo"
          subtitle="Square image — PNG with transparent background preferred. Min 200×200px."
          accept="image/*"
          onSelect={(url) => update({ logoUrl: url })}
          preview={draft.logoUrl}
        />
      </div>

      <div className="space-y-4">
        <p className="font-black text-xs uppercase tracking-widest text-muted-foreground">Cover Photo</p>
        <UploadZone
          icon={<ImageIcon className="h-7 w-7" />}
          title="Upload a Cover Photo"
          subtitle="Landscape image — shown at the top of your listing. Min 1200×400px recommended."
          accept="image/*"
          onSelect={(url) => update({ coverUrl: url })}
          preview={draft.coverUrl}
        />
      </div>

      <div className="space-y-4">
        <p className="font-black text-xs uppercase tracking-widest text-muted-foreground">Gallery Photos (up to 10)</p>
        <div className="grid grid-cols-3 gap-3">
          {draft.galleryUrls.map((url, i) => (
            <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`gallery-${i}`} className="w-full h-full object-cover" />
              <button
                onClick={() => removeGallery(i)}
                className="absolute top-2 right-2 h-6 w-6 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {draft.galleryUrls.length < 10 && (
            <label className="aspect-square rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/30 hover:bg-muted/50 transition-all">
              <Upload className="h-5 w-5 text-muted-foreground" />
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">Add Photo</p>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) addGallery(URL.createObjectURL(f)) }} />
            </label>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <p className="font-black text-xs uppercase tracking-widest text-muted-foreground">Verification Documents</p>
        <p className="text-xs text-muted-foreground font-medium">Upload your halal certificate, business license, or ownership proof. Our team will review these privately.</p>

        {draft.documentUrls.map((doc, i) => {
          const name = doc.split("::")[0]
          return (
            <div key={i} className="flex items-center gap-3 p-4 bg-muted/50 rounded-2xl">
              <FileText className="h-5 w-5 text-primary shrink-0" />
              <p className="text-sm font-bold text-foreground truncate flex-1">{name}</p>
              <button onClick={() => removeDoc(i)} className="text-muted-foreground hover:text-red-500 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
          )
        })}

        <label className="flex items-center gap-4 p-5 rounded-2xl border-2 border-dashed border-border cursor-pointer hover:border-primary/30 hover:bg-muted/50 transition-all">
          <div className="h-10 w-10 bg-muted rounded-2xl flex items-center justify-center text-muted-foreground shrink-0">
            <Upload className="h-5 w-5" />
          </div>
          <div className="space-y-0.5">
            <p className="text-sm font-black text-foreground">Upload Document</p>
            <p className="text-xs font-medium text-muted-foreground">PDF, JPG, PNG — max 10MB</p>
          </div>
          <input type="file" accept=".pdf,image/*" className="hidden" onChange={handleDocUpload} />
        </label>
      </div>

      <div className="flex justify-between gap-4">
        <Button variant="outline" className="rounded-2xl h-14 px-8 border-2 font-black uppercase text-xs tracking-widest" onClick={() => router.back()}>
          Back
        </Button>
        <Button className="rounded-2xl h-14 px-10 font-black bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 flex-1" onClick={() => { update({ currentStep: 7 }); router.push("/partner/onboarding/business/review") }}>
          Review & Submit <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
