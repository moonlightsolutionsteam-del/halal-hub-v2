"use client"

import * as React from "react"
import { ExternalLink, Youtube, Twitter, Instagram, Facebook, Link2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Platform = "youtube" | "twitter" | "instagram" | "facebook" | "unknown"

export type SocialEmbed = {
  url: string
  platform: Platform
  title: string | null
  author_name: string | null
  thumbnail_url: string | null
  embed_html: string | null
}

const PLATFORM_META: Record<Platform, { label: string; Icon: React.ElementType; bg: string; text: string }> = {
  youtube:   { label: "YouTube",   Icon: Youtube,   bg: "bg-red-50 dark:bg-red-950/30",      text: "text-red-600 dark:text-red-400" },
  twitter:   { label: "X / Twitter", Icon: Twitter, bg: "bg-sky-50 dark:bg-sky-950/30",      text: "text-sky-600 dark:text-sky-400" },
  instagram: { label: "Instagram", Icon: Instagram,  bg: "bg-pink-50 dark:bg-pink-950/30",    text: "text-pink-600 dark:text-pink-400" },
  facebook:  { label: "Facebook",  Icon: Facebook,   bg: "bg-blue-50 dark:bg-blue-950/30",    text: "text-blue-600 dark:text-blue-400" },
  unknown:   { label: "Link",      Icon: Link2,      bg: "bg-muted dark:bg-muted",             text: "text-muted-foreground" },
}

export function SocialEmbedCard({ embed, caption }: { embed: SocialEmbed; caption?: string | null }) {
  const [showEmbed, setShowEmbed] = React.useState(false)
  const meta = PLATFORM_META[embed.platform] ?? PLATFORM_META.unknown
  const { Icon } = meta

  const canEmbed = !!embed.embed_html && embed.platform !== "instagram"

  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-card">
      {/* Platform header */}
      <div className={cn("flex items-center gap-2 px-4 py-2.5", meta.bg)}>
        <Icon className={cn("h-4 w-4", meta.text)} />
        <span className={cn("text-xs font-black", meta.text)}>{meta.label}</span>
        <a
          href={embed.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto"
          onClick={e => e.stopPropagation()}
        >
          <ExternalLink className={cn("h-3.5 w-3.5", meta.text)} />
        </a>
      </div>

      {/* Embed or thumbnail */}
      {showEmbed && canEmbed ? (
        <div
          className="w-full [&_iframe]:w-full [&_iframe]:min-h-[280px] [&_blockquote]:mx-0 [&_blockquote]:rounded-none"
          dangerouslySetInnerHTML={{ __html: embed.embed_html! }}
        />
      ) : embed.thumbnail_url ? (
        <div
          className="relative w-full cursor-pointer group"
          onClick={() => canEmbed && setShowEmbed(true)}
        >
          <img
            src={embed.thumbnail_url}
            alt={embed.title ?? "Social media post"}
            className="w-full object-cover max-h-64"
          />
          {canEmbed && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white/90 rounded-full px-4 py-2 text-xs font-black text-foreground">
                Click to play
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Title + author */}
      {(embed.title || embed.author_name) && (
        <div className="px-4 py-3 space-y-0.5">
          {embed.title && (
            <p className="text-sm font-black text-foreground line-clamp-2">{embed.title}</p>
          )}
          {embed.author_name && (
            <p className="text-xs text-muted-foreground font-medium">{embed.author_name}</p>
          )}
        </div>
      )}

      {/* Fallback if no metadata at all */}
      {!embed.title && !embed.thumbnail_url && (
        <div className="px-4 py-3">
          <a
            href={embed.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary font-medium underline-offset-2 hover:underline break-all"
          >
            {embed.url}
          </a>
        </div>
      )}

      {caption && (
        <div className="px-4 pb-3 pt-1 border-t border-border">
          <p className="text-sm text-muted-foreground">{caption}</p>
        </div>
      )}
    </div>
  )
}

/** Lightweight hook — fetches embed data client-side */
export function useSocialEmbed(url: string | null) {
  const [embed, setEmbed] = React.useState<SocialEmbed | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!url) { setEmbed(null); return }
    setLoading(true)
    setError(null)
    fetch(`/api/oembed?url=${encodeURIComponent(url)}`)
      .then(r => r.json())
      .then(data => { setEmbed(data); setLoading(false) })
      .catch(() => { setError("Could not load preview"); setLoading(false) })
  }, [url])

  return { embed, loading, error }
}

const SOCIAL_URL_RE = /https?:\/\/(www\.)?(youtube\.com|youtu\.be|twitter\.com|x\.com|instagram\.com|facebook\.com)\/\S+/i

/** Returns the first social URL found in a string, or null */
export function extractSocialUrl(text: string): string | null {
  return text.match(SOCIAL_URL_RE)?.[0] ?? null
}
