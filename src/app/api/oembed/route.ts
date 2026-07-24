import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { rateLimit, getRequestIdentifier } from "@/lib/rate-limit"

type Platform = "youtube" | "twitter" | "instagram" | "facebook" | "unknown"

function detectPlatform(url: string): Platform {
  if (/youtube\.com|youtu\.be/.test(url)) return "youtube"
  if (/twitter\.com|x\.com/.test(url)) return "twitter"
  if (/instagram\.com/.test(url)) return "instagram"
  if (/facebook\.com/.test(url)) return "facebook"
  return "unknown"
}

async function fetchOembed(url: string, platform: Platform): Promise<Record<string, unknown> | null> {
  try {
    let endpoint: string

    switch (platform) {
      case "youtube":
        endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
        break
      case "twitter":
        endpoint = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&omit_script=true&dnt=true`
        break
      case "instagram": {
        const token = process.env.INSTAGRAM_OEMBED_TOKEN
        if (!token) return null
        endpoint = `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(url)}&access_token=${token}&omitscript=true`
        break
      }
      case "facebook": {
        const token = process.env.INSTAGRAM_OEMBED_TOKEN
        if (!token) return null
        endpoint = `https://graph.facebook.com/v18.0/oembed_post?url=${encodeURIComponent(url)}&access_token=${token}&omitscript=true`
        break
      }
      default:
        return null
    }

    const res = await fetch(endpoint, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  const rl = rateLimit(getRequestIdentifier(req, 'oembed'), { limit: 60, windowSecs: 60 })
  if (!rl.success) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
  }

  const url = req.nextUrl.searchParams.get("url")
  if (!url) return NextResponse.json({ error: "url is required" }, { status: 400 })

  const platform = detectPlatform(url)
  if (platform === "unknown") return NextResponse.json({ error: "Unsupported platform" }, { status: 400 })

  // Check cache first
  const supabase = await createClient()
  const { data: cached } = await supabase
    .from("social_embeds")
    .select("*")
    .eq("url", url)
    .single()

  if (cached) return NextResponse.json(cached)

  // Fetch from platform
  const raw = await fetchOembed(url, platform)
  if (!raw) {
    // Return a minimal card even if oEmbed fails (platform not configured yet)
    return NextResponse.json({
      url,
      platform,
      title: null,
      author_name: null,
      thumbnail_url: null,
      embed_html: null,
    })
  }

  const embed = {
    url,
    platform,
    title: (raw.title as string) ?? null,
    author_name: (raw.author_name as string) ?? null,
    thumbnail_url: (raw.thumbnail_url as string) ?? null,
    embed_html: (raw.html as string) ?? null,
    width: (raw.width as number) ?? null,
    height: (raw.height as number) ?? null,
  }

  // Cache in DB (upsert in case of race)
  await supabase.from("social_embeds").upsert(embed, { onConflict: "url" })

  return NextResponse.json(embed)
}
