
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Calendar, MessageCircle, Star, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const imams = [
    {
        id: "imamrahman",
        name: "Imam Ahmad Rahman",
        center: "Al-Noor Islamic Center",
        specialization: "Quran Interpretation & Family Counseling",
        status: "Available",
        responseTime: "Usually responds within 1 hour",
        rating: 4.9,
        avatar: "https://randomuser.me/api/portraits/men/51.jpg"
    },
    {
        id: "omar-hassan",
        name: "Imam Omar Hassan",
        center: "Masjid As Salam",
        specialization: "Islamic Law & Youth Guidance",
        status: "Busy",
        responseTime: "Usually responds within 3 hours",
        rating: 4.8,
        avatar: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    {
        id: "abdullah-al-faisal",
        name: "Imam Abdullah Al-Faisal",
        center: "Islamic Society Center",
        specialization: "Spirituality & Marriage Counseling",
        status: "Available",
        responseTime: "Usually responds within 30 minutes",
        rating: 4.9,
        avatar: "https://randomuser.me/api/portraits/men/53.jpg"
    }
]

export default function ChooseImamPage() {
    return (
        <div className="bg-background min-h-full">
            <div className="p-4 md:p-8">
                <header className="text-center mb-8">
                    <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-primary">
                        <AvatarImage src="https://randomuser.me/api/portraits/men/50.jpg" alt="Ask Your Imam" />
                        <AvatarFallback>AYI</AvatarFallback>
                    </Avatar>
                    <h1 className="text-3xl font-headline font-bold">Ask Your Imam</h1>
                    <p className="text-muted-foreground">
                        Get Islamic guidance and answers to your questions from qualified local imams
                    </p>
                </header>

                 <div className="max-w-2xl lg:max-w-5xl mx-auto">
                    {/* Tabs */}
                    <div className="flex items-center justify-center space-x-2 mb-6 p-1 bg-secondary rounded-full">
                        <Button className="flex-1 rounded-full" variant="ghost" size="sm" asChild>
                             <Link href="/prayer/ask-imam">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Chat
                            </Link>
                        </Button>
                        <Button className="flex-1 rounded-full bg-background text-foreground hover:bg-background/90" size="sm" asChild>
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

                    {/* Imam List */}
                    <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
                        {imams.map((imam, index) => (
                            <Card key={index}>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={imam.avatar} alt={imam.name} />
                                                <AvatarFallback>{imam.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h2 className="font-bold font-headline text-lg">{imam.name}</h2>
                                                <p className="text-sm text-muted-foreground">{imam.center}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <Star className="h-4 w-4 fill-current"/>
                                            <span className="font-bold">{imam.rating}</span>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-sm font-semibold">Specialization:</p>
                                        <p className="text-sm text-muted-foreground">{imam.specialization}</p>
                                    </div>
                                     <div className="flex items-center gap-2 mb-4">
                                        <Badge variant={imam.status === 'Available' ? 'default' : 'destructive'} className={imam.status === 'Available' ? "bg-green-100 text-green-800" : ""}>
                                            {imam.status}
                                        </Badge>
                                        <p className="text-xs text-muted-foreground">{imam.responseTime}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link href={`/creators/${imam.id}`} className="flex-1">
                                            <Button variant="outline" className="w-full">
                                                <ArrowRight className="mr-2 h-4 w-4" />
                                                View Profile
                                            </Button>
                                        </Link>
                                        <Button className="flex-1">
                                            <MessageCircle className="mr-2 h-4 w-4" />
                                            Chat
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
