
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';

interface Message {
    text: string;
    sender: 'user' | 'recipient';
    time: string;
    avatar: string;
}

export default function ChatPage() {
    const { user } = useAuth();
    const recipient = {
        name: "Aisha Khan",
        avatar: "https://picsum.photos/seed/creator1/100",
    };

    const [messages, setMessages] = useState<Message[]>([
        {
            text: "As-salamu alaykum! I saw your post about Karim's and wanted to ask about the best time to visit to avoid the crowd.",
            sender: 'user',
            time: "10:30 AM",
            avatar: user?.photoURL || "",
        },
        {
            text: "Wa alaikum assalam! So glad you liked the post. It's best to go for a late lunch around 3 PM on weekdays. It's much quieter then.",
            sender: 'recipient',
            time: "10:32 AM",
            avatar: recipient.avatar,
        },
        {
            text: "JazakAllah Khair! That's very helpful. I'll plan to go then.",
            sender: 'user',
            time: "10:33 AM",
            avatar: user?.photoURL || "",
        }
    ]);
    const [inputValue, setInputValue] = useState("");

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === "") return;

        const newMessage: Message = {
            text: inputValue,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            avatar: user?.photoURL || "",
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue("");

        // Simulate a reply
        setTimeout(() => {
            const replyMessage: Message = {
                text: "You're welcome! Enjoy your meal.",
                sender: 'recipient',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                avatar: recipient.avatar,
            };
            setMessages(prev => [...prev, replyMessage]);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'recipient' && (
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={msg.avatar} />
                                <AvatarFallback>{recipient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        )}
                        <div className={`rounded-lg p-3 max-w-sm ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                            <p className="text-sm">{msg.text}</p>
                            <p className={`text-xs mt-1 text-right ${msg.sender === 'user' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{msg.time}</p>
                        </div>
                         {msg.sender === 'user' && user && (
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user.photoURL || undefined} />
                                <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
            </div>
            <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <Input 
                        placeholder="Type a message..." 
                        className="flex-1 h-12 text-base"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button type="submit" size="icon" className="h-12 w-12">
                        <Send className="h-5 w-5" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
