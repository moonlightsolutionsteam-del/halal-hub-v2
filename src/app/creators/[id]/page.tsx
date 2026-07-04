
"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
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

const CREATORS: Record<string, any> = {
  imamrahman: {
    name: "Imam Ahmad Rahman",
    handle: "@imamrahman",
    title: "Islamic Scholar & Senior Imam",
    location: "Al-Noor Islamic Center, Mumbai",
    avatar: "https://picsum.photos/seed/imam1/200",
    cover: "https://picsum.photos/seed/imam1-cover/1200/400",
    color: "bg-emerald-600",
    accent: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    verified: true,
    followers: "48.2K",
    posts: "320",
    rating: 4.9,
    reviewCount: 152,
    experience: "15 years",
    about:
      "Imam Ahmad Rahman has been serving the community for over 15 years. With a Masters in Islamic Studies from Al-Azhar University, he specializes in Quranic Tafsir, Fiqh, and family counselling. Known for engaging lectures and compassionate guidance.",
    expertise: ["Quranic Tafsir", "Fiqh (Islamic Law)", "Family & Marriage Counselling", "Youth Mentorship", "Islamic History"],
    services: ["1-on-1 Counselling", "Nikah Services", "Quran Classes", "Corporate Islamic Talks"],
    social: [
      { platform: "YouTube", handle: "@ImamRahmanOfficial", icon: Youtube, url: "#" },
      { platform: "Instagram", handle: "@imam.rahman", icon: Instagram, url: "#" },
      { platform: "Twitter", handle: "@ImamRahman", icon: Twitter, url: "#" },
    ],
    gallery: [
      { type: "video", thumb: "https://picsum.photos/seed/lecture1/400/300", title: "Lessons from Surah Yusuf", views: "12.4K" },
      { type: "video", thumb: "https://picsum.photos/seed/lecture2/400/300", title: "The Life of the Prophet (PBUH)", views: "9.8K" },
      { type: "article", thumb: "https://picsum.photos/seed/blog1/400/300", title: "The Spiritual Benefits of Fasting", views: "6.1K" },
      { type: "article", thumb: "https://picsum.photos/seed/blog3/400/300", title: "Parenting in the Digital Age", views: "4.3K" },
      { type: "video", thumb: "https://picsum.photos/seed/lecture3/400/300", title: "Ramadan: Inner Transformation", views: "21.0K" },
      { type: "article", thumb: "https://picsum.photos/seed/blog4/400/300", title: "Understanding Zakat in Modern Times", views: "8.2K" },
    ],
    reviews: [
      { user: "Aisha Yusuf", rating: 5, text: "Imam Ahmad's advice was invaluable during a difficult time in my marriage. Highly recommended." },
      { user: "Omar Abdullah", rating: 5, text: "His Tafsir sessions are incredibly insightful and easy to understand." },
      { user: "Nadia K.", rating: 5, text: "A truly compassionate and knowledgeable scholar. His youth mentorship program changed my son's life." },
    ],
    upcomingEvents: [
      { title: "Friday Khutbah", date: "Every Friday", time: "1:15 PM", location: "Al-Noor Islamic Center" },
      { title: "Family Fiqh Q&A", date: "July 12, 2026", time: "7:00 PM", location: "Online (Zoom)" },
    ],
  },
  aishaskitchen: {
    name: "Aisha's Kitchen",
    handle: "@aishaskitchen",
    title: "Halal Food Blogger & Recipe Creator",
    location: "Mumbai, India",
    avatar: "https://picsum.photos/seed/creator1/200",
    cover: "https://picsum.photos/seed/food-cover/1200/400",
    color: "bg-orange-500",
    accent: "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
    verified: true,
    followers: "92.5K",
    posts: "780",
    rating: 4.8,
    reviewCount: 340,
    experience: "6 years",
    about:
      "Exploring the world of Halal cuisine, one dish at a time. Join me for recipes, restaurant reviews, and culinary adventures from across the Muslim world. All recipes are 100% halal-verified.",
    expertise: ["Mughlai Cuisine", "Restaurant Reviews", "Home Cooking", "Food Photography", "Recipe Development"],
    services: ["Sponsored Posts", "Recipe Development", "Food Photography", "Restaurant Collaboration"],
    social: [
      { platform: "Instagram", handle: "@aishaskitchen", icon: Instagram, url: "#" },
      { platform: "YouTube", handle: "@AishasKitchen", icon: Youtube, url: "#" },
    ],
    gallery: [
      { type: "video", thumb: "https://picsum.photos/seed/food1/400/300", title: "Perfect Biryani Recipe", views: "45K" },
      { type: "article", thumb: "https://picsum.photos/seed/food2/400/300", title: "Top 10 Halal Spots in Mumbai", views: "28K" },
      { type: "video", thumb: "https://picsum.photos/seed/food3/400/300", title: "Ramadan Special: 5 Suhoor Recipes", views: "67K" },
      { type: "article", thumb: "https://picsum.photos/seed/food4/400/300", title: "Guide to Halal Street Food", views: "19K" },
    ],
    reviews: [
      { user: "Fatima R.", rating: 5, text: "Her biryani recipe is the only one I'll ever use. Perfectly detailed and always halal." },
      { user: "Bilal M.", rating: 5, text: "Best food blogger I follow. Her restaurant reviews are always honest and she never compromises on halal standards." },
    ],
    upcomingEvents: [
      { title: "Live Cooking Session", date: "July 18, 2026", time: "6:00 PM", location: "Instagram Live" },
    ],
  },
  modestfashion: {
    name: "Modest Fashionista",
    handle: "@modestfashion",
    title: "Modest Fashion Blogger & Stylist",
    location: "Bangalore, India",
    avatar: "https://picsum.photos/seed/creator3/200",
    cover: "https://picsum.photos/seed/fashion-cover/1200/400",
    color: "bg-rose-500",
    accent: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
    verified: false,
    followers: "134K",
    posts: "1,200",
    rating: 4.9,
    reviewCount: 520,
    experience: "8 years",
    about:
      "Celebrating style with modesty. Your daily dose of inspiration for chic, elegant, and ethically sourced modest wear. From abayas to everyday modest outfits — finding beauty in covering.",
    expertise: ["Modest Fashion", "Personal Styling", "Abaya Design", "Hijab Tutorials", "Ethical Fashion"],
    services: ["Brand Ambassadorship", "Styling Consultations", "Content Creation", "Lookbook Photography"],
    social: [
      { platform: "Instagram", handle: "@modestfashionista", icon: Instagram, url: "#" },
      { platform: "YouTube", handle: "@ModestFashionista", icon: Youtube, url: "#" },
      { platform: "Twitter", handle: "@modestfashion", icon: Twitter, url: "#" },
    ],
    gallery: [
      { type: "article", thumb: "https://picsum.photos/seed/fashion1/400/300", title: "Summer Abaya Edit 2026", views: "54K" },
      { type: "video", thumb: "https://picsum.photos/seed/fashion2/400/300", title: "5-Minute Hijab Tutorial", views: "88K" },
      { type: "article", thumb: "https://picsum.photos/seed/fashion3/400/300", title: "Modest Wedding Guest Looks", views: "41K" },
      { type: "video", thumb: "https://picsum.photos/seed/fashion4/400/300", title: "Ethical Modest Brands Haul", views: "30K" },
    ],
    reviews: [
      { user: "Hana A.", rating: 5, text: "She makes modest dressing feel so chic and modern. I've refreshed my entire wardrobe following her recommendations." },
      { user: "Sana M.", rating: 5, text: "The hijab tutorials are clear and beautiful. She really understands what modest fashion means to Muslim women." },
    ],
    upcomingEvents: [],
  },
  halalreviews: {
    name: "Halal Food Reviews",
    handle: "@halalreviews",
    title: "Food Critic & Halal Investigator",
    location: "New Delhi, India",
    avatar: "https://picsum.photos/seed/creator2/200",
    cover: "https://picsum.photos/seed/food-review-cover/1200/400",
    color: "bg-amber-600",
    accent: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
    verified: true,
    followers: "61.3K",
    posts: "450",
    rating: 4.7,
    reviewCount: 180,
    experience: "5 years",
    about:
      "Your trusted guide to the best Halal food spots across India and beyond. Unbiased, independent reviews and certification checks so you can eat with confidence.",
    expertise: ["Restaurant Reviews", "Street Food", "Halal Verification", "Food Photography", "Certification Checks"],
    services: ["Restaurant Reviews", "Sponsored Content", "Halal Verification Guidance", "Brand Partnerships"],
    social: [
      { platform: "YouTube", handle: "@HalalFoodReviews", icon: Youtube, url: "#" },
      { platform: "Instagram", handle: "@halalreviews", icon: Instagram, url: "#" },
    ],
    gallery: [
      { type: "video", thumb: "https://picsum.photos/seed/review1/400/300", title: "Is This Restaurant Actually Halal?", views: "72K" },
      { type: "article", thumb: "https://picsum.photos/seed/review2/400/300", title: "Top 5 Halal Burger Spots in Delhi", views: "34K" },
      { type: "video", thumb: "https://picsum.photos/seed/review3/400/300", title: "Street Food Halal Check: Chandni Chowk", views: "55K" },
      { type: "article", thumb: "https://picsum.photos/seed/review4/400/300", title: "How to Read a Halal Certificate", views: "23K" },
    ],
    reviews: [
      { user: "Tariq B.", rating: 5, text: "Finally a reviewer who actually checks the halal certificates and doesn't just take the restaurant's word for it." },
      { user: "Maryam D.", rating: 4, text: "Honest and thorough. Would love more coverage outside Delhi but the content is always top quality." },
    ],
    upcomingEvents: [
      { title: "Delhi Food Walk", date: "August 10, 2026", time: "11:00 AM", location: "Chandni Chowk, Delhi" },
    ],
  },
};

const FALLBACK = CREATORS["imamrahman"];

export default function CreatorProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const creator = CREATORS[id] || FALLBACK;
  const [activeTab, setActiveTab] = useState("about");
  const [galleryFilter, setGalleryFilter] = useState<"all" | "video" | "article">("all");
  const { isSaved, toggleSaved } = useSavedBusinesses();
  const { toast } = useToast();
  const entityId = `creator-${id}`;
  const saved = isSaved(entityId);

  const handleSave = () => {
    toggleSaved({ id: entityId, name: creator.name, category: "Creator", location: creator.location });
    toast({ title: saved ? "Removed" : "Saved" });
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) { await navigator.share({ title: creator.name, url }); }
      else { await navigator.clipboard.writeText(url); toast({ title: "Link copied" }); }
    } catch {}
  };

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
              { label: "Rating", value: creator.rating },
              { label: "Reviews", value: creator.reviewCount },
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
          <div className="flex gap-2 flex-wrap">
            {creator.social.map((s: any) => (
              <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-2xl h-9 px-4 font-bold text-xs border-2 flex items-center gap-1.5">
                  <s.icon className="h-3.5 w-3.5" /> {s.handle}
                </Button>
              </a>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-5">
          <TabsList className="bg-card border rounded-2xl h-12 p-1 shadow-sm w-full overflow-x-auto flex justify-start">
            {["about", "content", "events", "reviews"].map(tab => (
              <TabsTrigger key={tab} value={tab} className={`rounded-xl px-5 font-bold text-xs h-full capitalize shrink-0 data-[state=active]:${creator.color} data-[state=active]:text-white`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* About */}
          <TabsContent value="about" className="space-y-4 animate-in fade-in duration-300">
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-3">
              <h2 className="font-black text-base flex items-center gap-2"><Info className="h-4 w-4 text-primary" /> About</h2>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">{creator.about}</p>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-3">
              <h2 className="font-black text-base flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {creator.expertise.map((e: string) => (
                  <span key={e} className={`text-xs font-bold px-3 py-1.5 ${creator.accent} rounded-full`}>{e}</span>
                ))}
              </div>
            </Card>

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
          </TabsContent>

          {/* Content / Gallery */}
          <TabsContent value="content" className="space-y-4 animate-in fade-in duration-300">
            <div className="flex gap-2">
              {(["all", "video", "article"] as const).map(f => (
                <button key={f} onClick={() => setGalleryFilter(f)}
                  className={`px-4 py-2 rounded-full text-xs font-black border-2 transition-all capitalize ${galleryFilter === f ? `${creator.color} text-white border-transparent` : "border-border text-muted-foreground hover:text-foreground"}`}>
                  {f === "all" ? "All" : f === "video" ? "Videos" : "Articles"}
                </button>
              ))}
            </div>
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
                      {item.type === "video" ? "Video" : "Article"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {filteredGallery.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm font-medium">No content in this category yet.</div>
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
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 flex items-center gap-6">
              <div className="text-center shrink-0">
                <p className="text-5xl font-black text-foreground">{creator.rating}</p>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[1,2,3,4,5].map(s => <Star key={s} className={`h-4 w-4 ${s <= Math.floor(creator.rating) ? "fill-amber-400 text-amber-400" : "text-muted"}`} />)}
                </div>
                <p className="text-[10px] text-muted-foreground font-bold mt-1">{creator.reviewCount} reviews</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5,4,3,2,1].map(star => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-muted-foreground w-3">{star}</span>
                    <div className="h-2 bg-muted rounded-full flex-1 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: star === 5 ? "88%" : star === 4 ? "9%" : "3%" }} />
                    </div>
                  </div>
                ))}
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
            <Button variant="outline" className="w-full rounded-2xl h-12 font-black text-xs border-2">
              <Edit className="h-4 w-4 mr-2" /> Write a Review
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
