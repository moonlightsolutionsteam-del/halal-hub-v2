"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Camera, PlusCircle } from "lucide-react"

const posts = [
  { text: "Alhamdulillah, our new water facility is now open for all worshippers. May Allah accept our efforts.", likes: 84, comments: 12, time: "2 days ago" },
  { text: "Reminder: Jummah Khutbah starts at 1:15 PM this Friday. See you all there!", likes: 52, comments: 4, time: "4 days ago" },
  { text: "Thank you to everyone who volunteered at this week's food drive. Together we served over 300 families.", likes: 210, comments: 28, time: "1 week ago" },
]

export default function MosquePostsPage() {
  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-foreground tracking-tight">Community Posts</h1>
        <p className="text-sm font-bold text-muted-foreground">Share updates and photos with your community.</p>
      </div>

      <Card className="rounded-[2rem] border-none shadow-soft">
        <CardContent className="p-6 space-y-4">
          <Textarea placeholder="Share something with the community..." className="min-h-[80px]" />
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground"><Camera className="h-4 w-4 mr-2" />Add Photo</Button>
            <Button className="rounded-full"><PlusCircle className="h-4 w-4 mr-2" />Post</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {posts.map((post, i) => (
          <Card key={i} className="rounded-[2rem] border-none shadow-soft">
            <CardContent className="p-6 space-y-4">
              <p className="text-sm text-foreground font-medium leading-relaxed">{post.text}</p>
              <div className="flex items-center gap-6 text-sm font-bold text-muted-foreground">
                <span className="flex items-center gap-1.5"><Heart className="h-4 w-4" />{post.likes}</span>
                <span className="flex items-center gap-1.5"><MessageCircle className="h-4 w-4" />{post.comments}</span>
                <span className="ml-auto text-xs">{post.time}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
