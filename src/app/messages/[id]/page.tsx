
"use client";

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { createClient } from '@/lib/supabase/client';

interface Message {
    id: string;
    content: string;
    sender_id: string;
    created_at: string;
}

export default function ChatPage() {
    const params = useParams();
    const otherId = params.id as string;
    const { user } = useAuth();
    const [recipient, setRecipient] = useState<{ name: string | null; photo_url: string | null } | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [sending, setSending] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!user?.uid || !otherId) return;
        const supabase = createClient();

        supabase.from("profiles").select("name, photo_url").eq("id", otherId).single()
            .then(({ data }: { data: { name: string | null; photo_url: string | null } | null }) => setRecipient(data));

        async function loadMessages() {
            const { data } = await supabase
                .from("messages")
                .select("id, content, sender_id, created_at, read, receiver_id")
                .or(`and(sender_id.eq.${user!.uid},receiver_id.eq.${otherId}),and(sender_id.eq.${otherId},receiver_id.eq.${user!.uid})`)
                .order("created_at", { ascending: true });
            setMessages(data ?? []);

            const unreadIds = (data ?? [])
                .filter((m: any) => m.receiver_id === user!.uid && !m.read)
                .map((m: any) => m.id);
            if (unreadIds.length > 0) {
                await supabase.from("messages").update({ read: true }).in("id", unreadIds);
            }
        }
        loadMessages();

        const channel = supabase
            .channel(`chat-${[user.uid, otherId].sort().join("-")}`)
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "messages" },
                (payload: any) => {
                    const m = payload.new;
                    const belongs = (m.sender_id === user!.uid && m.receiver_id === otherId) || (m.sender_id === otherId && m.receiver_id === user!.uid);
                    if (belongs) setMessages((prev) => [...prev, m]);
                }
            )
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [user?.uid, otherId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === "" || !user?.uid || sending) return;

        setSending(true);
        const supabase = createClient();
        const content = inputValue;
        setInputValue("");

        const { error } = await supabase.from("messages").insert({
            sender_id: user.uid,
            receiver_id: otherId,
            content,
        });
        setSending(false);

        if (!error) {
            setMessages((prev) => [...prev, {
                id: `local-${Date.now()}`,
                content,
                sender_id: user.uid,
                created_at: new Date().toISOString(),
            }]);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b p-4 flex items-center gap-3">
                <Avatar className="h-9 w-9">
                    {recipient?.photo_url && <AvatarImage src={recipient.photo_url} />}
                    <AvatarFallback>{recipient?.name?.charAt(0) ?? "U"}</AvatarFallback>
                </Avatar>
                <p className="font-bold">{recipient?.name ?? "Halal Hub User"}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                {messages.length === 0 && (
                    <p className="text-center text-muted-foreground text-sm py-8">No messages yet. Say salaam!</p>
                )}
                {messages.map((msg) => {
                    const isMine = msg.sender_id === user?.uid;
                    return (
                        <div key={msg.id} className={`flex items-end gap-3 ${isMine ? 'justify-end' : 'justify-start'}`}>
                            {!isMine && (
                                <Avatar className="h-8 w-8">
                                    {recipient?.photo_url && <AvatarImage src={recipient.photo_url} />}
                                    <AvatarFallback>{recipient?.name?.charAt(0) ?? "U"}</AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`rounded-lg p-3 max-w-sm ${isMine ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                                <p className="text-sm">{msg.content}</p>
                                <p className={`text-xs mt-1 text-right ${isMine ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            {isMine && user && (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.photoURL || undefined} />
                                    <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>
            <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <Input
                        placeholder="Type a message..."
                        className="flex-1 h-12 text-base"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={sending}
                    />
                    <Button type="submit" size="icon" className="h-12 w-12" disabled={sending}>
                        <Send className="h-5 w-5" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
