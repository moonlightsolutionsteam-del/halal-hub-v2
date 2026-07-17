"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  X, Camera, Play, Star, MessageCircle, MapPin, Calendar,
  ThumbsUp, Tag, Megaphone, HelpCircle, Users, ChevronLeft,
  ImagePlus, Video, Upload, Loader2, CheckCircle2, Zap,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type PostType =
  | "story" | "photo" | "video" | "review" | "discussion"
  | "checkin" | "event" | "recommendation"
  | "offer" | "business_update" | "question" | "community"

interface PostTypeConfig {
  id: PostType
  label: string
  icon: React.ElementType
  tint: string
  iconColor: string
  placeholder: string
  hasMedia: boolean
  extraFields?: "review" | "event" | "offer"
}

const POST_TYPES: PostTypeConfig[] = [
  { id: "story",           label: "Story",           icon: Zap,           tint: "bg-gradient-to-br from-pink-50 to-violet-50 dark:from-pink-950/40 dark:to-violet-950/40", iconColor: "text-pink-600 dark:text-pink-400", placeholder: "Share a moment — disappears in 24 hours…", hasMedia: true },
  { id: "photo",           label: "Photo",           icon: Camera,        tint: "bg-blue-50 dark:bg-blue-950/40",     iconColor: "text-blue-600 dark:text-blue-400",     placeholder: "Share what's on your mind…",               hasMedia: true },
  { id: "video",           label: "Video",           icon: Play,          tint: "bg-purple-50 dark:bg-purple-950/40", iconColor: "text-purple-600 dark:text-purple-400", placeholder: "What's happening in this video?",           hasMedia: true },
  { id: "review",          label: "Review",          icon: Star,          tint: "bg-amber-50 dark:bg-amber-950/40",   iconColor: "text-amber-600 dark:text-amber-400",   placeholder: "Share your experience…",                   hasMedia: true,  extraFields: "review" },
  { id: "discussion",      label: "Discussion",      icon: MessageCircle, tint: "bg-sky-50 dark:bg-sky-950/40",       iconColor: "text-sky-600 dark:text-sky-400",       placeholder: "Start a discussion with the community…",   hasMedia: false },
  { id: "checkin",         label: "Check In",        icon: MapPin,        tint: "bg-rose-50 dark:bg-rose-950/40",     iconColor: "text-rose-600 dark:text-rose-400",     placeholder: "Where are you?",                           hasMedia: true },
  { id: "event",           label: "Event",           icon: Calendar,      tint: "bg-violet-50 dark:bg-violet-950/40", iconColor: "text-violet-600 dark:text-violet-400", placeholder: "Describe your event…",                     hasMedia: true,  extraFields: "event" },
  { id: "recommendation",  label: "Recommend",       icon: ThumbsUp,      tint: "bg-teal-50 dark:bg-teal-950/40",     iconColor: "text-teal-600 dark:text-teal-400",     placeholder: "What are you recommending and why?",        hasMedia: true },
  { id: "offer",           label: "Offer",           icon: Tag,           tint: "bg-orange-50 dark:bg-orange-950/40", iconColor: "text-orange-600 dark:text-orange-400", placeholder: "Describe the offer…",                      hasMedia: true,  extraFields: "offer" },
  { id: "business_update", label: "Business Update", icon: Megaphone,     tint: "bg-emerald-50 dark:bg-emerald-950/40",iconColor: "text-emerald-600 dark:text-emerald-400",placeholder: "Share an update about your business…",     hasMedia: true },
  { id: "question",        label: "Question",        icon: HelpCircle,    tint: "bg-indigo-50 dark:bg-indigo-950/40", iconColor: "text-indigo-600 dark:text-indigo-400", placeholder: "Ask the community a question…",             hasMedia: false },
  { id: "community",       label: "Community Post",  icon: Users,         tint: "bg-pink-50 dark:bg-pink-950/40",     iconColor: "text-pink-600 dark:text-pink-400",     placeholder: "Post to the community…",                   hasMedia: true },
]

function getInitials(name: string | null | undefined) {
  if (!name) return "?"
  return name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase()
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface CreatePostModalProps {
  open: boolean
  initialType?: PostType | null
  onClose: () => void
  onPosted?: () => void
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CreatePostModal({ open, initialType, onClose, onPosted }: CreatePostModalProps) {
  const { user } = useAuth()

  // Stage: "pick-type" | "compose"
  const [stage, setStage] = React.useState<"pick-type" | "compose">(initialType ? "compose" : "pick-type")
  const [selectedType, setSelectedType] = React.useState<PostType>(initialType ?? "photo")

  // Compose fields
  const [text, setText] = React.useState("")
  const [title, setTitle] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [businessName, setBusinessName] = React.useState("")
  const [rating, setRating] = React.useState(0)
  const [hoverRating, setHoverRating] = React.useState(0)
  const [eventDate, setEventDate] = React.useState("")
  const [eventTime, setEventTime] = React.useState("")
  const [discount, setDiscount] = React.useState("")
  const [mediaFile, setMediaFile] = React.useState<File | null>(null)
  const [mediaPreview, setMediaPreview] = React.useState<string | null>(null)
  const [uploading, setUploading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const typeConfig = POST_TYPES.find(t => t.id === selectedType)!

  // Reset when modal opens
  React.useEffect(() => {
    if (open) {
      setStage(initialType ? "compose" : "pick-type")
      setSelectedType(initialType ?? "photo")
      setText(""); setTitle(""); setLocation(""); setBusinessName("")
      setRating(0); setHoverRating(0); setEventDate(""); setEventTime(""); setDiscount("")
      setMediaFile(null); setMediaPreview(null)
      setUploading(false); setSuccess(false); setError(null)
    }
  }, [open, initialType])

  const handleTypeSelect = (type: PostType) => {
    setSelectedType(type)
    setStage("compose")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setMediaFile(file)
    const url = URL.createObjectURL(file)
    setMediaPreview(url)
  }

  const removeMedia = () => {
    setMediaFile(null)
    if (mediaPreview) URL.revokeObjectURL(mediaPreview)
    setMediaPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const canPost = (): boolean => {
    if (selectedType === "story") return !!mediaFile
    if (!text.trim() && !mediaFile) return false
    if (selectedType === "review" && !businessName.trim()) return false
    if (selectedType === "event" && !title.trim()) return false
    return true
  }

  const handleSubmit = async () => {
    if (!canPost()) return
    if (!user) { setError("You must be signed in to post."); return }

    setUploading(true)
    setError(null)

    try {
      const supabase = createClient()
      let mediaUrl: string | null = null

      // Upload file if present
      if (mediaFile) {
        const ext = mediaFile.name.split(".").pop()
        const path = `${user.uid}/${Date.now()}.${ext}`
        const { error: uploadErr } = await supabase.storage
          .from("post-media")
          .upload(path, mediaFile, { upsert: false })
        if (uploadErr) throw new Error(uploadErr.message)
        const { data: urlData } = supabase.storage.from("post-media").getPublicUrl(path)
        mediaUrl = urlData.publicUrl
      }

      // Build metadata for extra fields
      const metadata: Record<string, any> = {}
      if (selectedType === "review")  { metadata.rating = rating; metadata.business_name = businessName }
      if (selectedType === "event")   { metadata.event_date = eventDate; metadata.event_time = eventTime; metadata.event_title = title }
      if (selectedType === "offer")   { metadata.discount = discount; metadata.offer_title = title }
      if (selectedType === "checkin") { metadata.location = location }

      const { error: insertErr } = await supabase.from("feed_posts").insert({
        owner_id: user.uid,
        display_name: user.name || "Halal Hub Member",
        description: text.trim() || null,
        media_url: mediaUrl,
        post_type: selectedType,
        place_name: location.trim() || null,
        business_name: businessName.trim() || null,
        metadata: Object.keys(metadata).length > 0 ? metadata : null,
      })

      if (insertErr) throw new Error(insertErr.message)

      setSuccess(true)
      setTimeout(() => {
        onPosted?.()
        onClose()
      }, 1200)
    } catch (err: any) {
      setError(err.message ?? "Something went wrong. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div className={cn(
        "relative z-10 w-full bg-background rounded-t-3xl sm:rounded-3xl shadow-2xl",
        "max-h-[92dvh] sm:max-w-lg sm:mx-4 overflow-hidden flex flex-col",
      )}>

        {/* ── Stage: Pick Type ─────────────────────────────────────────────── */}
        {stage === "pick-type" && (
          <>
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-border shrink-0">
              <h2 className="text-base font-black text-foreground">What are you sharing?</h2>
              <button onClick={onClose} className="rounded-full p-1.5 hover:bg-muted transition-colors">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <div className="overflow-y-auto p-4 grid grid-cols-3 gap-2.5">
              {POST_TYPES.map(pt => (
                <button
                  key={pt.id}
                  onClick={() => handleTypeSelect(pt.id)}
                  className={cn(
                    "rounded-2xl py-4 px-2 flex flex-col items-center gap-2 transition-all active:scale-95 hover:-translate-y-0.5",
                    pt.tint
                  )}
                >
                  <pt.icon className={cn("h-6 w-6", pt.iconColor)} />
                  <span className={cn("text-[10px] font-black leading-tight text-center", pt.iconColor)}>{pt.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ── Stage: Compose ───────────────────────────────────────────────── */}
        {stage === "compose" && (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-border shrink-0">
              <button
                onClick={() => initialType ? onClose() : setStage("pick-type")}
                className="rounded-full p-1.5 hover:bg-muted transition-colors"
              >
                {initialType ? <X className="h-5 w-5 text-muted-foreground" /> : <ChevronLeft className="h-5 w-5 text-muted-foreground" />}
              </button>
              <div className={cn("flex items-center gap-1.5 rounded-full px-3 py-1", typeConfig.tint)}>
                <typeConfig.icon className={cn("h-3.5 w-3.5", typeConfig.iconColor)} />
                <span className={cn("text-[11px] font-black", typeConfig.iconColor)}>{typeConfig.label}</span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                {!initialType && (
                  <button
                    onClick={() => setStage("pick-type")}
                    className="text-xs font-black text-muted-foreground hover:text-foreground"
                  >
                    Change
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-4 pt-4 pb-2 space-y-4">
              {/* User row */}
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 shrink-0 ring-2 ring-primary/20">
                  {user?.photoURL && <AvatarImage src={user.photoURL} />}
                  <AvatarFallback className="bg-primary/10 text-primary font-black text-sm">{getInitials(user?.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-black text-foreground">{user?.name || "Guest"}</p>
                  <p className="text-[10px] text-muted-foreground font-medium">Posting to Community</p>
                </div>
              </div>

              {/* Event / Offer title */}
              {(selectedType === "event" || selectedType === "offer") && (
                <input
                  className="w-full text-base font-black bg-transparent border-b border-border pb-2 outline-none placeholder:text-muted-foreground/50 text-foreground"
                  placeholder={selectedType === "event" ? "Event title…" : "Offer headline…"}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              )}

              {/* Review business name */}
              {selectedType === "review" && (
                <input
                  className="w-full text-sm font-bold bg-muted rounded-xl px-4 py-3 outline-none placeholder:text-muted-foreground text-foreground"
                  placeholder="Business or place name *"
                  value={businessName}
                  onChange={e => setBusinessName(e.target.value)}
                />
              )}

              {/* Star rating */}
              {selectedType === "review" && (
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      onMouseEnter={() => setHoverRating(n)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(n)}
                      className="p-0.5"
                    >
                      <Star className={cn(
                        "h-8 w-8 transition-colors",
                        n <= (hoverRating || rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"
                      )} />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="text-sm font-black text-amber-500 ml-2">
                      {["", "Poor", "Fair", "Good", "Great", "Excellent"][rating]}
                    </span>
                  )}
                </div>
              )}

              {/* Main text area */}
              <textarea
                className="w-full min-h-[100px] resize-none bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground/60 leading-relaxed"
                placeholder={typeConfig.placeholder}
                value={text}
                onChange={e => setText(e.target.value)}
                rows={4}
              />

              {/* Location field */}
              {(selectedType === "checkin" || selectedType === "event" || selectedType === "recommendation") && (
                <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-3">
                  <MapPin className="h-4 w-4 text-rose-500 shrink-0" />
                  <input
                    className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                    placeholder="Add location…"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                  />
                </div>
              )}

              {/* Event date & time */}
              {selectedType === "event" && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2.5">
                    <Calendar className="h-4 w-4 text-violet-500 shrink-0" />
                    <input
                      type="date"
                      className="flex-1 bg-transparent outline-none text-sm text-foreground"
                      value={eventDate}
                      onChange={e => setEventDate(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2.5">
                    <span className="text-violet-500 font-black text-xs shrink-0">TIME</span>
                    <input
                      type="time"
                      className="flex-1 bg-transparent outline-none text-sm text-foreground"
                      value={eventTime}
                      onChange={e => setEventTime(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Offer discount */}
              {selectedType === "offer" && (
                <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-950/30 rounded-xl px-4 py-3 border border-orange-200 dark:border-orange-800">
                  <Tag className="h-4 w-4 text-orange-500 shrink-0" />
                  <input
                    className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground font-bold"
                    placeholder="Discount code or % off (optional)"
                    value={discount}
                    onChange={e => setDiscount(e.target.value)}
                  />
                </div>
              )}

              {/* Media area */}
              {typeConfig.hasMedia && (
                <div>
                  {mediaPreview ? (
                    <div className="relative rounded-2xl overflow-hidden">
                      {selectedType === "video" || mediaFile?.type.startsWith("video/") ? (
                        <video src={mediaPreview} className="w-full max-h-64 object-cover rounded-2xl" controls />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={mediaPreview} alt="preview" className="w-full max-h-64 object-cover rounded-2xl" />
                      )}
                      <button
                        onClick={removeMedia}
                        className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-border rounded-2xl py-8 flex flex-col items-center gap-2 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                    >
                      {selectedType === "video"
                        ? <Video className="h-8 w-8 text-muted-foreground/50" />
                        : <ImagePlus className="h-8 w-8 text-muted-foreground/50" />}
                      <span className="text-sm font-bold text-muted-foreground">
                        {selectedType === "video" ? "Add video" : "Add photo"}
                      </span>
                      <span className="text-xs text-muted-foreground/60">Tap to upload from device</span>
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={selectedType === "video" ? "video/*" : "image/*,video/*"}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 px-4 py-3 text-sm font-bold text-red-700 dark:text-red-400">
                  {error}
                </div>
              )}

              {/* Auth prompt */}
              {!user && (
                <div className="rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground font-medium text-center">
                  <a href="/account/auth" className="text-primary font-black">Sign in</a> to post to the community.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 pt-3 pb-5 border-t border-border shrink-0">
              {success ? (
                <div className="flex items-center justify-center gap-2 py-3 text-emerald-600 font-black">
                  <CheckCircle2 className="h-5 w-5" /> Posted successfully!
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {typeConfig.hasMedia && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-2xl p-2.5 bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Upload className="h-5 w-5 text-muted-foreground" />
                    </button>
                  )}
                  <Button
                    onClick={handleSubmit}
                    disabled={!canPost() || uploading || !user}
                    className="flex-1 rounded-2xl h-12 text-sm font-black bg-primary text-white hover:bg-primary/90 disabled:opacity-40"
                  >
                    {uploading ? (
                      <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Posting…</>
                    ) : (
                      "Post to Community"
                    )}
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
