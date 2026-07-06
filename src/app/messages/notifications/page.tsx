
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const notifications = [
    { type: "follow", user: { name: "Yusuf Ibrahim", avatar: "https://images.unsplash.com/photo-1612307057748-b44842539a29?w=800&h=600&fit=crop&auto=format&q=80"}, time: "2h ago" },
    { type: "comment", user: { name: "Aisha Khan", avatar: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&h=600&fit=crop&auto=format&q=80"}, post: "your post about Karim's", time: "5h ago" },
    { type: "like", user: { name: "Zoya Akhtar", avatar: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=600&fit=crop&auto=format&q=80"}, post: "your reel on Hijab styles", time: "1d ago" },
];

const NotificationItem = ({ notification }: { notification: any }) => {
    return (
        <div className="flex items-start gap-4 p-4 border-b">
            <Avatar className="h-10 w-10">
                <AvatarImage src={notification.user.avatar} />
                <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <p className="text-sm">
                    <span className="font-bold">{notification.user.name}</span>
                    {notification.type === 'follow' && ' started following you.'}
                    {notification.type === 'comment' && ` commented: "Great review!" on `}
                    {notification.type === 'like' && ` liked `}
                    {notification.post && <span className="font-semibold">{notification.post}</span>}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
            </div>
            {notification.type === 'follow' && <Button size="sm">Follow Back</Button>}
        </div>
    )
}

export default function NotificationsPage() {
  return (
    <div>
        {notifications.map((item, index) => (
            <NotificationItem key={index} notification={item} />
        ))}
         <div className="text-center py-8 text-muted-foreground">
            <p>No more notifications</p>
        </div>
    </div>
  );
}
