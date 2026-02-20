
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Share2, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const POSTS = [
  {
    id: 1,
    author: "Zarah K.",
    avatar: "ZK",
    title: "Is this gelatin in [Product X] definitely halal?",
    preview: "I found a new snack at the supermarket but the label just says 'gelatin'. Has anyone checked if it's bovine or porcine?",
    category: "Product Verification",
    likes: 24,
    comments: 12,
    time: "2 hours ago"
  },
  {
    id: 2,
    author: "Omar S.",
    avatar: "OS",
    title: "New restaurant opening in Manchester!",
    preview: "Just tried the soft opening for 'Saffron Sky'. The atmosphere is amazing and it's fully certified. Highly recommend!",
    category: "Restaurants",
    likes: 45,
    comments: 8,
    time: "5 hours ago"
  },
  {
    id: 3,
    author: "Amina H.",
    avatar: "AH",
    title: "Traveling to Japan as a Muslim - My experience",
    preview: "I just got back from Tokyo and Osaka. Here is a list of halal-friendly spots I found during my 10-day trip.",
    category: "Travel Guide",
    likes: 156,
    comments: 42,
    time: "Yesterday"
  }
];

export default function CommunityPage() {
  return (
    <div className="container mx-auto p-4 space-y-8 md:p-8 max-w-5xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline text-primary">Community Forum</h1>
          <p className="text-muted-foreground">Join the conversation with thousands of members worldwide.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" /> Start Discussion
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">Categories</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="flex flex-col">
                        {["All Topics", "Product Verification", "Restaurants", "Travel Guide", "Events", "Spiritual Support"].map((cat, i) => (
                            <button key={cat} className={`text-left px-6 py-3 text-sm transition-colors hover:bg-muted ${i === 0 ? "bg-primary/10 text-primary font-bold" : "text-muted-foreground"}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-accent/10 border-accent/20">
                <CardHeader>
                    <CardTitle className="text-sm">Forum Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Total Members</span>
                        <span className="font-bold">12,402</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Daily Posts</span>
                        <span className="font-bold">85</span>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="md:col-span-3 space-y-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search discussions..." className="pl-9 h-12" />
            </div>

            <div className="space-y-4">
                {POSTS.map((post) => (
                    <Card key={post.id} className="hover:border-primary/50 transition-colors cursor-pointer">
                        <CardHeader className="flex-row gap-4 space-y-0">
                            <Avatar>
                                <AvatarFallback className="bg-primary/10 text-primary font-bold">{post.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-muted-foreground">{post.author} • {post.time}</span>
                                    <Badge variant="outline" className="text-[10px] uppercase">{post.category}</Badge>
                                </div>
                                <CardTitle className="text-lg leading-snug">{post.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">{post.preview}</p>
                        </CardContent>
                        <CardFooter className="border-t py-3 flex justify-between">
                            <div className="flex gap-4">
                                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                                    <ThumbsUp className="h-4 w-4" /> {post.likes}
                                </button>
                                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                                    <MessageSquare className="h-4 w-4" /> {post.comments}
                                </button>
                            </div>
                            <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
                                <Share2 className="h-4 w-4" />
                            </button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <Button variant="outline" className="w-full">Load More Discussions</Button>
        </div>
      </div>
    </div>
  );
}
