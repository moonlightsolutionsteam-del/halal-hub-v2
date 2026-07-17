"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/use-auth";

type Notification = {
  id: string;
  title: string | null;
  body: string | null;
  type: string | null;
  read: boolean | null;
  created_at: string | null;
}

function timeAgo(iso: string | null): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationsPage() {
  const { user, loading: authLoading } = useAuth();
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (authLoading || !user?.uid) { setLoading(false); return; }
    const supabase = createClient();
    supabase
      .from("notifications")
      .select("id, title, body, type, read, created_at")
      .eq("user_id", user.uid)
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        setNotifications(data ?? []);
        setLoading(false);
      });
  }, [user?.uid, authLoading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-6 w-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-16 space-y-3">
        <Bell className="h-10 w-10 text-muted-foreground/30 mx-auto" />
        <p className="font-bold text-foreground">No notifications yet</p>
        <p className="text-sm text-muted-foreground">You'll see follows, likes, and comments here.</p>
      </div>
    );
  }

  return (
    <div>
      {notifications.map((notif) => (
        <div key={notif.id} className="flex items-start gap-4 p-4 border-b">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{(notif.title ?? "N")[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-bold">{notif.title ?? "Notification"}</p>
            {notif.body && <p className="text-sm text-muted-foreground">{notif.body}</p>}
            <p className="text-xs text-muted-foreground mt-1">{timeAgo(notif.created_at)}</p>
          </div>
          {!notif.read && <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />}
        </div>
      ))}
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">All caught up</p>
      </div>
    </div>
  );
}
