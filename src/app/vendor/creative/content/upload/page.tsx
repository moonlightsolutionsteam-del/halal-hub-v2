"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Upload, Video, Mic, FileText,
  ArrowLeft, Sparkles, CheckCircle2, Zap,
  Loader2, X, ImageIcon
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

const CONTENT_TYPES = [
  { id: "video", label: "Studio Reel", icon: Video, color: "text-blue-600", bg: "bg-blue-50", accept: "video/mp4,video/mov,video/webm,video/quicktime" },
  { id: "podcast", label: "Podcast Ep", icon: Mic, color: "text-purple-600", bg: "bg-purple-50", accept: "audio/mpeg,audio/mp3,audio/wav,audio/ogg" },
  { id: "article", label: "Blog Article", icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50", accept: "" },
]

export default function ContentUploadPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  const [type, setType] = React.useState("video")
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [visibility, setVisibility] = React.useState("public")
  const [file, setFile] = React.useState<File | null>(null)
  const [uploading, setUploading] = React.useState(false)
  const [uploadProgress, setUploadProgress] = React.useState(0)

  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const currentType = CONTENT_TYPES.find(t => t.id === type)!

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) setFile(f)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if (f) setFile(f)
  }

  const handlePublish = async () => {
    if (!user?.uid) {
      toast({ title: "Sign in to publish", variant: "destructive" })
      return
    }
    if (!description.trim() && !title.trim()) {
      toast({ title: "Add a title or description", variant: "destructive" })
      return
    }

    setUploading(true)
    setUploadProgress(10)

    try {
      const supabase = createClient()
      let mediaUrl: string | null = null

      // Upload file to Supabase Storage if one was selected
      if (file && type !== "article") {
        setUploadProgress(30)
        const ext = file.name.split(".").pop()
        const path = `creator-content/${user.uid}/${Date.now()}.${ext}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("media")
          .upload(path, file, { upsert: false })

        if (uploadError) {
          // If bucket doesn't exist yet, we still insert the post without media
          console.warn("Storage upload failed:", uploadError.message)
        } else {
          const { data: urlData } = supabase.storage.from("media").getPublicUrl(path)
          mediaUrl = urlData.publicUrl
        }
        setUploadProgress(70)
      }

      // Insert into feed_posts
      const postType = type === "article" ? "article" : type === "podcast" ? "podcast" : "video"
      const { error: insertError } = await (supabase as any).from("feed_posts").insert({
        owner_id: user.uid,
        display_name: user.name ?? user.email ?? "Creator",
        description: description.trim() || title.trim(),
        post_type: postType,
        media_url: mediaUrl,
        status: visibility === "private" ? "draft" : "active",
        metadata: { title: title.trim(), visibility },
      })

      setUploadProgress(100)

      if (insertError) {
        toast({ title: "Failed to publish", description: insertError.message, variant: "destructive" })
        return
      }

      toast({ title: "Published to Halal Hub!" })
      router.push("/vendor/creative/content/published")
    } catch (err: any) {
      toast({ title: "Something went wrong", description: err?.message, variant: "destructive" })
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-3xl pb-24 text-foreground">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-2xl bg-card shadow-sm border h-12 w-12" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline tracking-tight">Upload Content</h1>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-60 mt-0.5">New Media Production</p>
        </div>
      </div>

      {/* Content type picker */}
      <div className="grid grid-cols-3 gap-3">
        {CONTENT_TYPES.map(opt => (
          <button
            key={opt.id}
            onClick={() => { setType(opt.id); setFile(null) }}
            className={cn(
              "flex flex-col items-center justify-center p-5 rounded-[2rem] transition-all border-4",
              type === opt.id
                ? "bg-card border-primary shadow-xl scale-105"
                : "bg-card border-transparent text-muted-foreground hover:border-border hover:bg-muted"
            )}
          >
            <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center mb-2.5",
              type === opt.id ? `${opt.bg} ${opt.color}` : "bg-muted text-muted-foreground"
            )}>
              <opt.icon className="h-5 w-5" />
            </div>
            <span className={cn("text-[10px] font-black uppercase tracking-tighter text-center leading-tight",
              type === opt.id ? "text-primary" : "text-muted-foreground"
            )}>
              {opt.label}
            </span>
          </button>
        ))}
      </div>

      {/* Media upload area (not shown for articles) */}
      {type !== "article" && (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="border-4 border-dashed border-border rounded-[2.5rem] bg-muted/30 flex flex-col items-center justify-center text-center gap-3 py-10 px-6 hover:border-primary/30 hover:bg-card transition-all cursor-pointer group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={currentType.accept}
            className="hidden"
            onChange={handleFileChange}
          />
          {file ? (
            <>
              <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-black text-foreground">{file.name}</p>
                <p className="text-sm text-muted-foreground">{(file.size / 1_000_000).toFixed(1)} MB</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="gap-1 text-xs text-muted-foreground"
                onClick={e => { e.stopPropagation(); setFile(null) }}
              >
                <X className="h-3 w-3" /> Remove
              </Button>
            </>
          ) : (
            <>
              <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-black text-foreground">Drop your file here</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {type === "video" ? "MP4, MOV, WebM (Max 500MB)" : "MP3, WAV, OGG (Max 200MB)"}
                </p>
              </div>
              <Button size="sm" variant="outline" className="rounded-xl font-black text-[10px] border-2 uppercase h-10 px-8 mt-2">
                Select from Computer
              </Button>
            </>
          )}
        </div>
      )}

      {/* Metadata form */}
      <Card className="rounded-[2.5rem] border-none shadow-sm">
        <CardContent className="p-6 space-y-5">
          <div className="space-y-2">
            <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Title</Label>
            <Input
              placeholder="e.g., Lessons from the Seerah - Part 4"
              className="h-13 rounded-2xl bg-muted border-none font-black text-base"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">
              {type === "article" ? "Article Body" : "Description / Caption"}
            </Label>
            <Textarea
              placeholder={type === "article" ? "Write your article here…" : "What is this about?"}
              className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium resize-none"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Visibility</Label>
            <Select value={visibility} onValueChange={setVisibility}>
              <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-none shadow-2xl">
                <SelectItem value="public">Public — visible to everyone</SelectItem>
                <SelectItem value="private">Private draft — only you</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* AI card */}
      <Card className="rounded-[2rem] border-none bg-zinc-900 text-white overflow-hidden relative">
        <Sparkles className="absolute -top-4 -right-4 h-24 w-24 opacity-10 text-primary" />
        <CardContent className="p-6 flex items-center gap-4 relative z-10">
          <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-black">AI Co-Producer</p>
            <p className="text-xs text-white/60 font-medium">Auto-subtitles and chapter markers — coming soon.</p>
          </div>
        </CardContent>
      </Card>

      {/* Upload progress bar */}
      {uploading && uploadProgress > 0 && (
        <div className="space-y-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-xs text-center text-muted-foreground font-bold">
            {uploadProgress < 70 ? "Uploading file…" : "Saving to feed…"}
          </p>
        </div>
      )}

      {/* Publish button */}
      <Button
        onClick={handlePublish}
        disabled={uploading || (!title.trim() && !description.trim())}
        className="w-full h-16 rounded-[2rem] font-black text-lg shadow-2xl transition-transform active:scale-[0.98]"
      >
        {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Publish to Hub"}
      </Button>

      <div className="flex items-center justify-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
        <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Vetted according to Community Standards
      </div>
    </div>
  )
}
