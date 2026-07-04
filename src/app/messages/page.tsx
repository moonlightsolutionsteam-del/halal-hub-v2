"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, Bell, UserPlus, PartyPopper, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"

const conversations = [
  { id: "good-deeds", name: "Good Deeds Tree", avatar: "🌴", isEmoji: true, lastMessage: "👉You have 100 points to claim", time: "6:27 PM", unread: 1 },
  { id: "team", name: "Halal Hub Team", avatar: "☪️", isEmoji: true, lastMessage: "Congratulations for winning First Sign-in, go and check👉", time: "01/12/2025", unread: 1 },
  { id: "1", name: "Aisha Khan", avatar: "https://picsum.photos/seed/creator1/100", lastMessage: "You're welcome! Enjoy your meal.", time: "10:38 AM", unread: 0 },
  { id: "2", name: "Karim's Restaurant", avatar: "https://picsum.photos/seed/resto1/100", lastMessage: "Your table for 4 is confirmed for 7:30 PM.", time: "Yesterday", unread: 1 },
  { id: "3", name: "Yusuf Ibrahim", avatar: "https://picsum.photos/seed/creator2/100", lastMessage: "Sounds great, let's collaborate.", time: "2 days ago", unread: 0 },
]

const ActionCard = ({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) => (
  <Link href={href}>
    <Card className="rounded-2xl border-none shadow-soft hover:shadow-soft-md transition-shadow duration-200">
      <CardContent className="p-3 flex flex-col items-center justify-center gap-2 aspect-square">
        <div className="p-3 bg-primary/10 rounded-xl">{icon}</div>
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  </Link>
)

export default function MessagesPage() {
  const [isAlertVisible, setIsAlertVisible] = useState(true)

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-foreground tracking-tight">Messages</h1>
        <p className="text-sm font-bold text-muted-foreground">Chats with friends, businesses, and the community.</p>
      </div>

      {isAlertVisible && (
        <Alert className="rounded-2xl border-border/60 text-muted-foreground">
          <AlertCircle className="h-4 w-4" />
          <div className="flex justify-between items-center w-full">
            <AlertDescription>
              Unable to receive message notifications from friends. <Link href="/account/settings" className="font-semibold text-primary underline">Set</Link>
            </AlertDescription>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsAlertVisible(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Alert>
      )}

      <div className="grid grid-cols-3 gap-4">
        <ActionCard icon={<Bell className="h-6 w-6 text-primary" />} label="Notifications" href="/messages/notifications" />
        <ActionCard icon={<UserPlus className="h-6 w-6 text-primary" />} label="New Friends" href="/messages/new-friends" />
        <ActionCard icon={<PartyPopper className="h-6 w-6 text-primary" />} label="Activity" href="/messages/activity" />
      </div>

      <Card className="rounded-[2rem] border-none shadow-soft overflow-hidden">
        <div className="flex flex-col divide-y divide-border/60">
          {conversations.map((convo) => (
            <Link href={`/messages/${convo.id}`} key={convo.id} className="block">
              <div className="flex items-center gap-4 p-4 hover:bg-muted/40 transition-colors">
                <Avatar className="h-12 w-12">
                  {convo.isEmoji ? (
                    <AvatarFallback className="text-2xl bg-primary/10">{convo.avatar}</AvatarFallback>
                  ) : (
                    <>
                      <AvatarImage src={convo.avatar} />
                      <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-foreground">{convo.name}</p>
                    <p className="text-xs text-muted-foreground">{convo.time}</p>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                    {convo.unread > 0 && (
                      <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs shrink-0">
                        {convo.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  )
}
