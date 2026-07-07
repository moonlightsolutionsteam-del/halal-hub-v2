
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MessageCircle,
  Phone,
  Send,
  Users,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

const quickQuestions = [
  "How do I perform Wudu correctly?",
  "What are the times for today's prayers?",
  "Can you help me understand a Quran verse?",
  "I need advice about family matters",
  "How do I calculate Zakat?",
  "What should I do if I miss a prayer?",
];

const resources = [
  "Prayer Times & Qibla",
  "Quran with Translation",
  "Hadith Collection",
  "Islamic Calendar",
];

interface Message {
    text: string;
    sender: 'user' | 'imam';
    time: string;
}

export default function AskImamPage() {
    const [messages, setMessages] = useState<Message[]>([
        { text: "As-salamu alaykum. How can I assist you today?", sender: "imam", time: "10:30 AM" },
        { text: "Wa alaikum assalam. I have a question about making up missed prayers from when I was traveling.", sender: "user", time: "10:35 AM" },
        { text: "Excellent question! When traveling, if you shortened your prayers (Qasr), you do not need to make them up later. However, if you missed prayers entirely due to circumstances, you should make them up as soon as possible. Would you like me to explain the specific rulings for your situation?", sender: "imam", time: "10:38 AM" },
    ]);
    const [inputValue, setInputValue] = useState("");

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === "") return;

        const newMessage: Message = {
            text: inputValue,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue("");

        // Simulate Imam's reply
        setTimeout(() => {
            const replyMessage: Message = {
                text: "Thank you for your question. I am reviewing it now and will get back to you shortly with a detailed answer, insha'Allah.",
                sender: 'imam',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, replyMessage]);
        }, 1500);
    };


  return (
    <div className="bg-background min-h-full">
      <div className="p-4 md:p-8">
        <header className="text-center mb-8">
          <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-primary">
            <AvatarImage src="https://randomuser.me/api/portraits/men/50.jpg" alt="Imam Ahmad Rahman" />
            <AvatarFallback>IR</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-headline font-bold">Ask Your Imam</h1>
          <p className="text-muted-foreground">
            Get Islamic guidance and answers to your questions from qualified local imams
          </p>
        </header>

        <div className="max-w-2xl lg:max-w-5xl mx-auto">
            {/* Tabs */}
            <div className="flex items-center justify-center space-x-2 mb-6 p-1 bg-secondary rounded-full">
                <Button className="flex-1 rounded-full bg-background text-foreground hover:bg-background/90" size="sm" asChild>
                    <Link href="/prayer/ask-imam">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Chat
                    </Link>
                </Button>
                <Button className="flex-1 rounded-full" variant="ghost" size="sm" asChild>
                    <Link href="/prayer/choose-imam">
                        <Users className="mr-2 h-4 w-4" />
                        Choose Imam
                    </Link>
                </Button>
                <Button className="flex-1 rounded-full" variant="ghost" size="sm" asChild>
                    <Link href="/prayer/appointments">
                        <Calendar className="mr-2 h-4 w-4" />
                        Appointments
                    </Link>
                </Button>
            </div>

            {/* Chat Section */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                             <AvatarImage src="https://randomuser.me/api/portraits/men/50.jpg" alt="Imam Ahmad Rahman" />
                             <AvatarFallback>IR</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold">Imam Ahmad Rahman</p>
                            <div className="flex items-center gap-1.5 text-xs">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-green-500">Available</span>
                                <span className="text-muted-foreground">• Usually responds within 1 hour</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon"><Phone className="h-4 w-4"/></Button>
                        <Button variant="outline" size="icon"><MessageCircle className="h-4 w-4"/></Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 h-96 overflow-y-auto p-4 bg-secondary/30 rounded-lg">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex flex-col gap-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`rounded-lg p-3 max-w-sm ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                    <p className={`text-xs mt-1 text-right ${msg.sender === 'user' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{msg.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSendMessage} className="mt-4 relative">
                        <Input 
                            placeholder="Type your question..." 
                            className="pr-12 h-12"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <Button type="submit" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9">
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Quick Questions Section */}
            <div className="mt-8">
                <h2 className="font-bold font-headline text-xl mb-3">Quick Questions</h2>
                <div className="space-y-2">
                    {quickQuestions.map((q) => (
                        <Button key={q} variant="outline" className="w-full justify-start text-left h-auto py-3" onClick={() => setInputValue(q)}>
                            {q}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Resources Section */}
            <div className="mt-8">
                 <h2 className="font-bold font-headline text-xl mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Resources
                </h2>
                <div className="space-y-2">
                    {resources.map((r) => (
                         <Button key={r} variant="outline" className="w-full justify-start text-left h-auto py-3">
                            {r}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
