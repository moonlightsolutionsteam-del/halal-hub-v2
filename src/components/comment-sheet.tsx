// @ts-nocheck
"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Heart, CornerDownRight, Loader2, Send } from "lucide-react"
import { cn } from "@/lib/utils"

type Comment = {
  id: string
  author_id: string
  display_name: string | null
  body: string
  parent_comment_id: string | null
  created_at: string
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h`
  return `${Math.floor(hrs / 24)}d`
}

function getInitials(name: string | null | undefined): string {
  if (!name) return "?"
  return name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase()
}

// ─── Individual comment row ───────────────────────────────────────────────────

function CommentRow({
  comment,
  onReply,
  isReply = false,
}: {
  comment: Comment
  onReply?: () => void
  isReply?: boolean
}) {
  const [liked, setLiked] = React.useState(false)

  return (
    <div className="flex gap-2.5">
      <Avatar className={cn("shrink-0", isReply ? "h-7 w-7" : "h-9 w-9")}>
        <AvatarFallback className="bg-primary/10 text-primary font-black text-[10px]">
          {getInitials(comment.display_name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="bg-muted rounded-2xl rounded-tl-sm px-3 py-2.5">
          <p className={cn("font-black text-foreground leading-none mb-1", isReply ? "text-[11px]" : "text-xs")}>
            {comment.display_name || "Member"}
          </p>
          <p className={cn("text-foreground leading-relaxed break-words", isReply ? "text-xs" : "text-sm")}>
            {comment.body}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-1 px-1">
          <span className="text-[10px] text-muted-foreground font-medium">{timeAgo(comment.created_at)}</span>
          {onReply && (
            <button
              onClick={onReply}
              className="text-[10px] font-black text-muted-foreground hover:text-foreground transition-colors"
            >
              Reply
            </button>
          )}
          <button onClick={() => setLiked(l => !l)} className="ml-auto p-1">
            <Heart className={cn("h-3.5 w-3.5 transition-all", liked ? "text-red-500 fill-red-500" : "text-muted-foreground")} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Sheet ────────────────────────────────────────────────────────────────────

interface CommentSheetProps {
  postId: string
  open: boolean
  onClose: () => void
  onCountChange?: (count: number) => void
}

export function CommentSheet({ postId, open, onClose, onCountChange }: CommentSheetProps) {
  const { user } = useAuth()
  const [comments, setComments] = React.useState<Comment[]>([])
  const [loading, setLoading] = React.useState(false)
  const [text, setText] = React.useState("")
  const [replyTo, setReplyTo] = React.useState<Comment | null>(null)
  const [posting, setPosting] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  const load = React.useCallback(async () => {
    if (!postId) return
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from("post_comments")
      .select("id, author_id, display_name, body, parent_comment_id, created_at")
      .eq("post_id", postId)
      .order("created_at", { ascending: true })
    setLoading(false)
    const list: Comment[] = data ?? []
    setComments(list)
    onCountChange?.(list.length)
  }, [postId, onCountChange])

  React.useEffect(() => {
    if (open) {
      load()
      setTimeout(() => inputRef.current?.focus(), 300)
    } else {
      setText("")
      setReplyTo(null)
    }
  }, [open, load])

  const submit = async () => {
    if (!text.trim() || !user || posting) return
    setPosting(true)
    const supabase = createClient()
    const { data: inserted } = await supabase
      .from("post_comments")
      .insert({
        post_id: postId,
        author_id: user.uid,
        display_name: user.name || "Member",
        body: text.trim(),
        parent_comment_id: replyTo?.id ?? null,
      })
      .select("id, author_id, display_name, body, parent_comment_id, created_at")
      .single()
    setPosting(false)
    setText("")
    setReplyTo(null)
    if (inserted) {
      setComments(prev => {
        const next = [...prev, inserted as Comment]
        onCountChange?.(next.length)
        return next
      })
      setTimeout(() => listRef.current?.scrollTo({ top: 99999, behavior: "smooth" }), 50)
    }
  }

  const topLevel = comments.filter(c => !c.parent_comment_id)
  const repliesFor = (id: string) => comments.filter(c => c.parent_comment_id === id)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[400] flex flex-col justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div className="relative z-10 bg-background rounded-t-3xl flex flex-col max-h-[82dvh]" style={{ minHeight: "40dvh" }}>
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3 border-b border-border shrink-0">
          <h3 className="text-sm font-black text-foreground">
            Comments{" "}
            {comments.length > 0 && (
              <span className="text-muted-foreground font-medium">({comments.length})</span>
            )}
          </h3>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-muted transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Comment list */}
        <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : topLevel.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <p className="text-muted-foreground text-sm font-bold">No comments yet.</p>
              <p className="text-muted-foreground/60 text-xs font-medium">Start the conversation.</p>
            </div>
          ) : (
            topLevel.map(comment => {
              const replies = repliesFor(comment.id)
              return (
                <div key={comment.id} className="space-y-2">
                  <CommentRow
                    comment={comment}
                    onReply={() => {
                      setReplyTo(comment)
                      inputRef.current?.focus()
                    }}
                  />
                  {replies.map(reply => (
                    <div key={reply.id} className="pl-8 flex gap-2 items-start">
                      <CornerDownRight className="h-3 w-3 text-muted-foreground/30 shrink-0 mt-2.5" />
                      <div className="flex-1 min-w-0">
                        <CommentRow comment={reply} isReply />
                      </div>
                    </div>
                  ))}
                </div>
              )
            })
          )}
        </div>

        {/* Input bar */}
        <div
          className="px-4 py-3 border-t border-border shrink-0 bg-background"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
        >
          {replyTo && (
            <div className="flex items-center gap-2 mb-2 bg-muted px-3 py-1.5 rounded-xl">
              <span className="text-xs text-muted-foreground font-medium flex-1 truncate">
                Replying to{" "}
                <span className="font-black text-foreground">{replyTo.display_name || "Member"}</span>
              </span>
              <button onClick={() => setReplyTo(null)} className="shrink-0">
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          )}
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 shrink-0">
              {user?.photoURL && <AvatarImage src={user.photoURL} />}
              <AvatarFallback className="bg-primary/10 text-primary font-black text-[10px]">
                {getInitials(user?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 flex items-center gap-2 bg-muted rounded-full px-4 py-2.5">
              <input
                ref={inputRef}
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    submit()
                  }
                }}
                placeholder={user ? "Add a comment…" : "Sign in to comment"}
                disabled={!user}
                className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
              />
              {text.trim() && (
                <button
                  onClick={submit}
                  disabled={posting}
                  className="text-primary shrink-0 disabled:opacity-50"
                >
                  {posting
                    ? <Loader2 className="h-4 w-4 animate-spin" />
                    : <Send className="h-4 w-4 -rotate-12" />
                  }
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
