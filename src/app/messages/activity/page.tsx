
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, Repeat } from "lucide-react";

const activities = [
    { type: "like", user: { name: "Yusuf Ibrahim", avatar: "https://images.unsplash.com/photo-1612307057748-b44842539a29?w=800&h=600&fit=crop&auto=format&q=80"}, content: "liked your photo of Karim's.", time: "1h ago" },
    { type: "comment", user: { name: "Zoya Akhtar", avatar: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop&auto=format&q=80"}, content: "commented: 'Looks amazing, mashallah!'", time: "3h ago" },
    { type: "repost", user: { name: "Aisha Khan", avatar: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&h=600&fit=crop&auto=format&q=80"}, content: "reposted your article on Halal dining.", time: "Yesterday" },
];

const ActivityItem = ({ activity }: { activity: any }) => {
    const getIcon = () => {
        switch(activity.type) {
            case 'like': return <Heart className="h-5 w-5 text-red-500 fill-current" />;
            case 'comment': return <MessageSquare className="h-5 w-5 text-blue-500" />;
            case 'repost': return <Repeat className="h-5 w-5 text-green-500" />;
            default: return null;
        }
    }
    return (
        <div className="flex items-start gap-4 p-4 border-b">
            <div className="relative">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={activity.user.avatar} />
                    <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 p-0.5 bg-background rounded-full">
                    {getIcon()}
                </div>
            </div>
            <div className="flex-1">
                <p className="text-sm">
                    <span className="font-bold">{activity.user.name}</span> {activity.content}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
        </div>
    )
}

export default function ActivityPage() {
  return (
    <div>
        <h2 className="p-4 text-lg font-semibold">This Week</h2>
        {activities.map((item, index) => (
            <ActivityItem key={index} activity={item} />
        ))}
         <div className="text-center py-8 text-muted-foreground">
            <p>No more activity</p>
        </div>
    </div>
  );
}
