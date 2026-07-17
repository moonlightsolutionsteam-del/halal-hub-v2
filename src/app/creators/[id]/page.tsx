"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft, BookOpen, Calendar, CheckCircle2, MessageCircle,
  Mic2, Star, Video, Share2, Heart, Users, Play,
  Instagram, Twitter, Youtube, ExternalLink, ThumbsUp,
  Edit, Globe, Award, Info, Camera, Rss
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSavedBusinesses } from "@/lib/saved-businesses-context";
import { createClient } from "@/lib/supabase/client";

function formatFollowers(n: number | null): string {
  if (!n) return "0"
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${Math.round(n / 1000)}K`
  return n.toString()
}

export default function CreatorProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const [creator, setCreator] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState("about");
  const [galleryFilter, setGalleryFilter] = React.useState<"all" | "video" | "article">("all");
  const { isSaved, toggleSaved } = useSavedBusinesses();
  const { toast } = useToast();
  const entityId = `creator-${id}`;
  const saved = isSaved(entityId);

  React.useEffect(() => {
    const supabase = createClient()
    ;(supabase as any)
      .from("creators")
      .select("id, user_id, display_name, avatar_url, bio, category, cover_url, follower_count, post_count, status")
      .eq("id", id)
      .maybeSingle()
      .then(({ data }: { data: any }) => {
        if (!data) { setLoading(false); return }

        const mapped = {
          name: data.display_name ?? "Creator",
          handle: `@${(data.display_name ?? "creator").toLowerCase().replace(/\s+/g, "_")}`,
          title: data.category ?? "Creator",
          location: "",
          avatar: data.avatar_url ?? "",
          cover: data.cover_url ?? "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&h=600&fit=crop&auto=format&q=80",
          color: "bg-primary",
          accent: "bg-primary/10 text-primary dark:bg-primary/20",
          verified: data.status === "active",
          followers: formatFollowers(data.follower_count),
          posts: (data.post_count ?? 0).toString(),
          rating: 0,
          reviewCount: 0,
          experience: "",
          about: data.bio ?? "",
          expertise: [] as string[],
          services: [] as string[],
          social: [] as any[],
          upcomingEvents: [] as any[],
          reviews: [] as any[],
          gallery: [] as any[],
        }
        setCreator(mapped)

        if (data.user_id) {
          ;(supabase as any)
            .from("feed_posts")
            .select("id, description, media_url, status, created_at")
            .eq("owner_id", data.user_id)
            .order("created_at", { ascending: false })
            .limit(12)
            .then(({ data: pData }: { data: any[] | null }) => {
              const gallery = (pData ?? [])
                .filter((p: any) => p.media_url)
                .map((p: any) => ({
                  type: "article" as const,
                  thumb: p.media_url,
                  title: p.description ?? "Post",
                  views: "—",
                }))
              setCreator((prev: any) => ({ ...prev, gallery }))
              setLoading(false)
            })
        } else {
          setLoading(false)
        }
      })
  }, [id])

  const handleSave = () => {
    if (!creator) return
    toggleSaved({ id: entityId, name: creator.name, category: "Creator", location: creator.location });
    toast({ title: saved ? "Removed" : "Saved" });
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) { await navigator.share({ title: creator?.name ?? "Creator", url }); }
      else { await navigator.clipboard.writeText(url); toast({ title: "Link copied" }); }
    } catch {}
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!creator) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p className="text-lg font-black text-foreground">Creator not found</p>
      <Link href="/creators"><Button variant="outline" className="rounded-2xl font-black border-2"><ArrowLeft className="h-4 w-4 mr-2" /> Back to Creators</Button></Link>
    </div>
  )

  const filteredGallery = creator.gallery.filter((g: any) =>
    galleryFilter === "all" || g.type === galleryFilter
  );

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* Nav */}
      <div className="bg-card/90 backdrop-blur-md sticky top-0 z-40 border-b">
        <div className="container mx-auto max-w-3xl px-4 h-16 flex items-center justify-between">
          <Link href="/creators" className="flex items-center gap-2 text-sm font-black text-muted-foreground hover:text-primary group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Creators
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-2xl" onClick={handleShare}><Share2 className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="rounded-2xl text-rose-500" onClick={handleSave}><Heart className={saved ? "h-4 w-4 fill-rose-500" : "h-4 w-4"} /></Button>
          </div>
        </div>
      </div>

      {/* Cover */}
      <div className="relative h-40 md:h-52 w-full overflow-hidden">
        <Image src={creator.cover} alt="cover" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
      </div>

      <div className="container mx-auto max-w-3xl px-4 space-y-6">
        {/* Profile card */}
        <div className="-mt-12 relative z-10 space-y-4">
          <div className="flex items-end gap-4">
            <Avatar className="h-24 w-24 rounded-[2rem] border-4 border-background shadow-xl shrink-0">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback className={`text-2xl font-black ${creator.accent} rounded-[2rem]`}>{creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="pb-2 space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-black text-foreground font-headline leading-tight">{creator.name}</h1>
                {creator.verified && <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />}
              </div>
              <p className="text-xs font-bold text-muted-foreground">{creator.handle}</p>
              <p className="text-xs font-medium text-muted-foreground">{creator.title}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Followers", value: creator.followers },
              { label: "Posts", value: creator.posts },
              { label: "Rating", value: creator.rating || "—" },
              { label: "Reviews", value: creator.reviewCount || "—" },
            ].map(stat => (
              <div key={stat.label} className="text-center p-3 bg-muted rounded-2xl">
                <p className="font-black text-sm text-foreground">{stat.value}</p>
                <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Link href="/messages" className="flex-1">
              <Button variant="outline" className="w-full h-11 rounded-2xl font-black text-xs border-2">
                <MessageCircle className="h-4 w-4 mr-1.5" /> Message
              </Button>
            </Link>
            <Link href="/prayer/appointments" className="flex-1">
              <Button className={`w-full h-11 rounded-2xl font-black text-xs ${creator.color} text-white`}>
                <Calendar className="h-4 w-4 mr-1.5" /> Schedule
              </Button>
            </Link>
          </div>

          {/* Social links */}
          {creator.social.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {creator.social.map((s: any) => (
                <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="rounded-2xl h-9 px-4 font-bold text-xs border-2 flex items-center gap-1.5">
                    <s.icon className="h-3.5 w-3.5" /> {s.handle}
                  </Button>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-5">
          <TabsList className="bg-card border rounded-2xl h-12 p-1 shadow-sm w-full overflow-x-auto flex justify-start">
            {["about", "content", "events", "reviews"].map(tab => (
              <TabsTrigger key={tab} value={tab} className="rounded-xl px-5 font-bold text-xs h-full capitalize shrink-0">
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* About */}
          <TabsContent value="about" className="space-y-4 animate-in fade-in duration-300">
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-3">
              <h2 className="font-black text-base flex items-center gap-2"><Info className="h-4 w-4 text-primary" /> About</h2>
              {creator.about
                ? <p className="text-sm text-muted-foreground font-medium leading-relaxed">{creator.about}</p>
                : <p className="text-sm text-muted-foreground italic">No bio available yet.</p>}
            </Card>

            {creator.expertise.length > 0 && (
              <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-3">
                <h2 className="font-black text-base flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {creator.expertise.map((e: string) => (
                    <span key={e} className={`text-xs font-bold px-3 py-1.5 ${creator.accent} rounded-full`}>{e}</span>
                  ))}
                </div>
              </Card>
            )}

            {creator.services.length > 0 && (
              <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-3">
                <h2 className="font-black text-base flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Services</h2>
                <div className="grid grid-cols-2 gap-2">
                  {creator.services.map((s: string) => (
                    <div key={s} className="flex items-center gap-2 p-3 bg-muted rounded-2xl">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="text-xs font-bold text-foreground">{s}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Content / Gallery */}
          <TabsContent value="content" className="space-y-4 animate-in fade-in duration-300">
            <div className="flex gap-2">
              {(["all", "video", "article"] as const).map(f => (
                <button key={f} onClick={() => setGalleryFilter(f)}
                  className={`px-4 py-2 rounded-full text-xs font-black border-2 transition-all capitalize ${galleryFilter === f ? "bg-primary text-white border-transparent" : "border-border text-muted-foreground hover:text-foreground"}`}>
                  {f === "all" ? "All" : f === "video" ? "Videos" : "Articles"}
                </button>
              ))}
            </div>
            {filteredGallery.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {filteredGallery.map((item: any, i: number) => (
                  <div key={i} className="group relative rounded-[1.5rem] overflow-hidden bg-muted aspect-video cursor-pointer hover:shadow-md transition-all">
                    <Image src={item.thumb} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-10 w-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                          <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3 space-y-0.5">
                      <p className="text-[11px] font-black text-white leading-tight line-clamp-2">{item.title}</p>
                      <p className="text-[10px] text-white/70 font-medium">{item.views} views</p>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${item.type === "video" ? "bg-rose-500 text-white" : "bg-blue-500 text-white"}`}>
                        {item.type === "video" ? "Video" : "Post"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground text-sm font-medium">No content published yet.</div>
            )}
          </TabsContent>

          {/* Events */}
          <TabsContent value="events" className="space-y-4 animate-in fade-in duration-300">
            {creator.upcomingEvents.length > 0 ? (
              <div className="space-y-3">
                {creator.upcomingEvents.map((event: any, i: number) => (
                  <Card key={i} className="rounded-[2rem] border-none shadow-sm bg-card p-5">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-sm text-foreground">{event.title}</p>
                        <p className="text-xs text-muted-foreground font-medium mt-0.5">{event.date} · {event.time}</p>
                        <p className="text-xs text-muted-foreground font-medium">{event.location}</p>
                      </div>
                      <Button variant="outline" className="rounded-2xl h-9 px-4 font-bold text-xs shrink-0 border-2">RSVP</Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 space-y-2">
                <Calendar className="h-10 w-10 text-muted-foreground/30 mx-auto" />
                <p className="text-sm font-bold text-muted-foreground">No upcoming events</p>
                <p className="text-xs text-muted-foreground">Check back soon or follow to get notified.</p>
              </div>
            )}
            <Button variant="outline" className="w-full rounded-2xl h-12 font-black text-xs border-2">
              <Rss className="h-4 w-4 mr-2" /> Follow for Updates
            </Button>
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews" className="space-y-5 animate-in fade-in duration-300">
            {creator.reviews.length === 0 ? (
              <div className="text-center py-16 space-y-2">
                <Star className="h-10 w-10 text-muted-foreground/30 mx-auto" />
                <p className="text-sm font-bold text-muted-foreground">No reviews yet</p>
                <p className="text-xs text-muted-foreground">Be the first to review this creator.</p>
              </div>
            ) : (
              <>
                <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 flex items-center gap-6">
                  <div className="text-center shrink-0">
                    <p className="text-5xl font-black text-foreground">{creator.rating}</p>
                    <div className="flex gap-0.5 justify-center mt-1">
                      {[1,2,3,4,5].map(s => <Star key={s} className={`h-4 w-4 ${s <= Math.floor(creator.rating) ? "fill-amber-400 text-amber-400" : "text-muted"}`} />)}
                    </div>
                    <p className="text-[10px] text-muted-foreground font-bold mt-1">{creator.reviewCount} reviews</p>
                  </div>
                </Card>
                <div className="space-y-3">
                  {creator.reviews.map((r: any, i: number) => (
                    <Card key={i} className="rounded-[2rem] border-none shadow-sm bg-card p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 rounded-xl bg-muted">
                            <AvatarFallback className="text-xs font-black bg-muted text-muted-foreground rounded-xl">{r.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <p className="font-black text-sm text-foreground">{r.user}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(r.rating)].map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium italic leading-relaxed">"{r.text}"</p>
                      <button className="flex items-center gap-1 text-xs text-muted-foreground font-bold hover:text-primary transition-colors">
                        <ThumbsUp className="h-3 w-3" /> Helpful
                      </button>
                    </Card>
                  ))}
                </div>
              </>
            )}
            <Button variant="outline" className="w-full rounded-2xl h-12 font-black text-xs border-2">
              <Edit className="h-4 w-4 mr-2" /> Write a Review
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
