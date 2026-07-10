"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Share2, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const CATEGORIES = ["All Topics", "Product Verification", "Restaurants", "Travel Guide", "Events", "Spiritual Support"];

const POSTS = [
  { id: 1, author: "Zarah K.", avatar: "ZK", title: "Is this gelatin in [Product X] definitely halal?", preview: "I found a new snack at the supermarket but the label just says 'gelatin'. Has anyone checked if it's bovine or porcine?", category: "Product Verification", likes: 24, comments: 12, time: "2 hours ago" },
  { id: 2, author: "Omar S.", avatar: "OS", title: "New restaurant opening in Manchester!", preview: "Just tried the soft opening for 'Saffron Sky'. The atmosphere is amazing and it's fully certified. Highly recommend!", category: "Restaurants", likes: 45, comments: 8, time: "5 hours ago" },
  { id: 3, author: "Amina H.", avatar: "AH", title: "Traveling to Japan as a Muslim - My experience", preview: "I just got back from Tokyo and Osaka. Here is a list of halal-friendly spots I found during my 10-day trip.", category: "Travel Guide", likes: 156, comments: 42, time: "Yesterday" },
];

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = POSTS.filter(post => {
    const matchesCategory = activeCategory === "All Topics" || post.category === activeCategory;
    const matchesSearch = searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.preview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="px-4 sm:px-6 py-5 sm:py-8 space-y-5 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-0.5 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-primary tracking-tight">Community</h1>
          <p className="text-muted-foreground text-sm font-medium hidden sm:block">Join thousands of members worldwide.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-2xl h-11 px-4 sm:px-6 font-bold shrink-0" onClick={() => alert("Discussion creation coming soon!")}>
          <Plus className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Start Discussion</span>
        </Button>
      </div>

      {/* Category filter — horizontal scroll chips on mobile */}
      <div className="overflow-x-auto no-scrollbar -mx-4 sm:mx-0 px-4 sm:px-0">
        <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`h-9 px-4 rounded-full text-xs font-black whitespace-nowrap transition-colors shrink-0 ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-8">
        {/* Sidebar — hidden on mobile, visible on md+ */}
        <aside className="hidden md:block md:col-span-1 space-y-4">
          <Card className="rounded-[1.5rem] border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                {CATEGORIES.map((cat, i) => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`text-left px-5 py-3 text-sm font-bold transition-colors rounded-xl mx-2 mb-0.5 ${
                      activeCategory === cat ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/10 rounded-[1.5rem] shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-black">Forum Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[["Total Members", "12,402"], ["Daily Posts", "85"], ["Active Now", "234"]].map(([label, val]) => (
                <div key={label} className="flex justify-between text-xs">
                  <span className="text-muted-foreground font-medium">{label}</span>
                  <span className="font-black text-foreground">{val}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Main content */}
        <div className="md:col-span-3 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search discussions..."
              className="pl-10 h-12 rounded-2xl border-none bg-card shadow-sm font-medium"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Posts */}
          <div className="space-y-3">
            {filteredPosts.length === 0 && (
              <div className="text-center py-12 text-muted-foreground font-medium">
                No discussions found for this filter.
              </div>
            )}
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-all duration-200 cursor-pointer rounded-[1.5rem] sm:rounded-[2rem] border-none shadow-sm bg-card">
                <CardHeader className="flex-row gap-3 sm:gap-4 space-y-0 p-4 sm:p-6 pb-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary font-black text-sm">{post.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <span className="text-[11px] font-bold text-muted-foreground">{post.author} · {post.time}</span>
                      <Badge variant="outline" className="text-[9px] uppercase font-black shrink-0">{post.category}</Badge>
                    </div>
                    <p className="font-black text-foreground text-sm sm:text-base leading-snug">{post.title}</p>
                  </div>
                </CardHeader>
                <CardContent className="px-4 sm:px-6 pb-0">
                  <p className="text-sm text-muted-foreground font-medium line-clamp-2 leading-relaxed">{post.preview}</p>
                </CardContent>
                <CardFooter className="px-4 sm:px-6 py-3 border-t border-border/50 flex justify-between mt-3">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors min-h-[44px]">
                      <ThumbsUp className="h-4 w-4" /> {post.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors min-h-[44px]">
                      <MessageSquare className="h-4 w-4" /> {post.comments}
                    </button>
                  </div>
                  <button className="text-muted-foreground hover:text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
                    <Share2 className="h-4 w-4" />
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Button variant="outline" className="w-full h-12 rounded-2xl font-bold border-2">Load More Discussions</Button>
        </div>
      </div>
    </div>
  );
}
