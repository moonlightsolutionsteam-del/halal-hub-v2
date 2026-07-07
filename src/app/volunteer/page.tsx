

"use client"

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Clock, MapPin, Users, Users2, HandHelping, Calendar, Plus, Star, Award, CheckCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const opportunities = [
    {
        title: "Community Kitchen Volunteer",
        organization: "Al-Noor Islamic Center",
        status: "High Need",
        statusColor: "text-red-500",
        description: "Help prepare and serve warm meals for community members and those in need.",
        location: "123 Quran Rd, Delhi",
        time: "Fridays, 5 PM - 8 PM",
        volunteersNeeded: 12,
        volunteersSignedUp: 8,
        skills: ["Food Prep", "Serving", "Cleaning"],
        coordinator: "Br. Omar Abdullah"
    },
    {
        title: "Youth Mentor Program",
        organization: "Masjid As-Salam",
        status: "Medium Need",
        statusColor: "text-yellow-600",
        description: "Mentor young Muslims in our community, providing guidance and support in their studies and deen.",
        location: "456 Sunnah Ave, Delhi",
        time: "4 Hours/Week",
        volunteersNeeded: 12,
        volunteersSignedUp: 5,
        skills: ["Mentoring", "Tutoring", "Communication"],
        coordinator: "Sr. Fatima Al-Zahra"
    },
    {
        title: "Emergency Relief Team",
        organization: "Mercy Foundation",
        status: "Urgent",
        statusColor: "text-red-600",
        description: "Join our rapid response team to provide aid during local emergencies and crises.",
        location: "Remote/On-call",
        time: "Flexible",
        volunteersNeeded: 25,
        volunteersSignedUp: 10,
        skills: ["First Aid", "Logistics", "Driving"],
        coordinator: "Br. Ahmed Hassan"
    },
];

const volunteerHistory = [
    {
        title: "Ramadan Food Distribution",
        organization: "Al-Noor Islamic Center",
        date: "March 15, 2024",
        hours: 6,
        points: 100,
        feedback: "Excellent volunteer! Very helpful and dedicated."
    },
    {
        title: "Mosque Cleanup Day",
        organization: "Islamic Society Center",
        date: "February 28, 2024",
        hours: 4,
        points: 60,
        feedback: "Great team player, arrived early and stayed late."
    },
    {
        title: "Youth Islamic Workshop",
        organization: "Masjid As-Salam",
        date: "February 10, 2024",
        hours: 8,
        points: 120,
        feedback: "Wonderful with the children, very patient and knowledgeable."
    }
];

const upcomingCommitments = [
    { title: "Community Kitchen", time: "This Saturday, 10:00 AM", color: "bg-yellow-100 border-yellow-200" },
    { title: "Youth Mentoring", time: "Next Sunday, 3:00 PM", color: "bg-blue-100 border-blue-200" }
];

const impactSummary = [
    { label: "Meals Served", value: "320+" },
    { label: "Students Mentored", value: "15" },
    { label: "Families Helped", value: "45" },
    { label: "Events Organized", value: "8" },
];

const communityLeaderboard = [
    { rank: 1, avatar: "AH", name: "Ahmed Hassan", points: 1250, hours: 95, title: "Community Champion", titleColor: "bg-purple-100 text-purple-800" },
    { rank: 2, avatar: "FA", name: "Fatima Al-Zahra", points: 1180, hours: 88, title: "Service Leader", titleColor: "bg-blue-100 text-blue-800" },
    { rank: 3, avatar: "OA", name: "Omar Abdullah", points: 980, hours: 76, title: "Dedicated Helper", titleColor: "bg-pink-100 text-pink-800" },
    { rank: 4, avatar: "ZH", name: "Zainab Hussein", points: 920, hours: 71, title: "Kind Heart", titleColor: "bg-green-100 text-green-800" },
    { rank: 5, avatar: "YR", name: "Yusuf Rahman", points: 850, hours: 65, title: "Team Player", titleColor: "bg-teal-100 text-teal-800" },
];

const tabItems = [
    { label: "Opportunities", icon: <HandHelping className="h-5 w-5" /> },
    { label: "My Activity", icon: <Calendar className="h-5 w-5" /> },
    { label: "Create Event", icon: <Plus className="h-5 w-5" /> },
    { label: "Leaderboard", icon: <Star className="h-5 w-5" /> },
    { label: "Badges", icon: <Award className="h-5 w-5" /> },
];

const OpportunitiesSection = () => (
     <div className="space-y-6">
        {opportunities.map((opp, index) => (
            <Card key={index}>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className="font-headline text-xl">{opp.title}</CardTitle>
                        <div className="text-right">
                            <p className="font-bold text-lg">{opp.volunteersSignedUp}/{opp.volunteersNeeded}</p>
                            <p className="text-xs text-muted-foreground">Volunteers</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-primary">{opp.organization}</p>
                        <Badge variant="outline" className={opp.statusColor}>{opp.status}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{opp.description}</p>
                    <div className="text-sm space-y-2">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{opp.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{opp.time}</span>
                        </div>
                    </div>

                    <div>
                        <Label className="text-xs font-semibold">Volunteers Needed</Label>
                        <Progress value={(opp.volunteersSignedUp / opp.volunteersNeeded) * 100} className="mt-1 h-2" />
                    </div>

                        <div>
                        <h4 className="text-sm font-semibold">Required Skills</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {opp.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                        </div>
                    </div>

                    <p className="text-xs text-muted-foreground pt-2">Coordinator: {opp.coordinator}</p>
                    
                    <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">Learn More</Button>
                        <Button className="flex-1">Volunteer</Button>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

const MyActivitySection = () => (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-xl">Upcoming Commitments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {upcomingCommitments.map((item, index) => (
                    <div key={index} className={cn("p-4 rounded-lg border", item.color)}>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.time}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Personal Stats</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-blue-500/10 rounded-lg">
                        <p className="text-3xl font-bold text-blue-500">18</p>
                        <p className="text-sm text-muted-foreground">Total Hours</p>
                    </div>
                    <div className="p-4 bg-green-500/10 rounded-lg">
                        <p className="text-3xl font-bold text-green-500">280</p>
                        <p className="text-sm text-muted-foreground">Total Points</p>
                    </div>
                    <div className="p-4 bg-purple-500/10 rounded-lg">
                        <p className="text-3xl font-bold text-purple-500">3</p>
                        <p className="text-sm text-muted-foreground">Events Done</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Impact Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {impactSummary.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                            <p className="text-muted-foreground">{item.label}</p>
                            <p className="font-bold">{item.value}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-xl">My Volunteer History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {volunteerHistory.map((item, index) => (
                    <div key={index} className="p-4 rounded-lg bg-secondary/30">
                        <div className="flex items-start gap-4">
                            <CheckCircle className="h-8 w-8 text-green-500 mt-1" />
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold">{item.title}</h3>
                                    <Badge className="bg-green-100 text-green-800">completed</Badge>
                                </div>
                                <p className="text-sm text-primary font-semibold">{item.organization}</p>
                                <div className="text-xs text-muted-foreground mt-1 space-x-2">
                                    <span>{item.date}</span>
                                    <span>•</span>
                                    <span>{item.hours} hours</span>
                                    <span>•</span>
                                    <span>{item.points} points earned</span>
                                </div>
                                <p className="text-sm italic text-muted-foreground mt-2">"{item.feedback}"</p>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
);

const CreateEventSection = () => (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Create Volunteer Event</CardTitle>
            <CardDescription>Fill out the details below to post a new volunteer opportunity for the community.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="event-title">Event Title</Label>
                <Input id="event-title" placeholder="e.g., Annual Mosque Cleanup" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="event-category">Category</Label>
                <Select>
                    <SelectTrigger id="event-category">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="community">Community Service</SelectItem>
                        <SelectItem value="education">Education & Youth</SelectItem>
                        <SelectItem value="dawah">Dawah & Outreach</SelectItem>
                        <SelectItem value="mosque">Mosque Services</SelectItem>
                        <SelectItem value="health">Health & Wellness</SelectItem>
                        <SelectItem value="environment">Environment</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                    <Label htmlFor="event-date">Date</Label>
                    <Input id="event-date" type="date" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="event-time">Time</Label>
                    <Input id="event-time" type="time" />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="event-location">Location</Label>
                <Input id="event-location" placeholder="e.g., Al-Noor Islamic Center" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                    <Label htmlFor="volunteers-needed">Volunteers Needed</Label>
                    <Input id="volunteers-needed" type="number" placeholder="e.g., 10" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="points-per-volunteer">Points per Volunteer</Label>
                    <Input id="points-per-volunteer" type="number" placeholder="Points to award" />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="event-urgency">Urgency Level</Label>
                <Select>
                    <SelectTrigger id="event-urgency">
                        <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="event-description">Event Description</Label>
                <Textarea id="event-description" placeholder="Describe the volunteer opportunity, what volunteers will do, and any requirements..." />
            </div>
            <div className="space-y-2">
                <Label htmlFor="required-skills">Required Skills (comma-separated)</Label>
                <Input id="required-skills" placeholder="e.g., Cooking, Customer Service, Physical Work" />
            </div>
            <div className="flex gap-4 pt-2">
                <Button className="flex-1"><Plus className="mr-2 h-4 w-4" />Create Event</Button>
                <Button variant="outline" className="flex-1">Save as Draft</Button>
            </div>
        </CardContent>
    </Card>
);

const LeaderboardSection = () => (
    <div>
        <h2 className="text-xl font-bold font-headline mb-4">Community Volunteer Leaderboard</h2>
        <div className="space-y-2">
            {communityLeaderboard.map((user, index) => (
                <Card key={index} className="bg-secondary/30">
                    <CardContent className="p-3 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className={cn(
                                "flex items-center justify-center h-8 w-8 rounded-full font-bold text-white",
                                user.rank === 1 ? "bg-yellow-500" :
                                user.rank === 2 ? "bg-gray-400" :
                                user.rank === 3 ? "bg-orange-500" :
                                "bg-primary"
                            )}>
                                {user.rank}
                            </div>
                            <Avatar>
                                <AvatarFallback>{user.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.points} points • {user.hours} hours</p>
                                <Badge className={cn("mt-1 text-xs", user.titleColor)}>{user.title}</Badge>
                            </div>
                        </div>
                        {user.rank <= 3 && <Award className={cn(
                             "h-6 w-6",
                             user.rank === 1 ? "text-yellow-500" :
                             user.rank === 2 ? "text-gray-400" :
                             "text-orange-500"
                        )} />}
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
);

const EmptyState = ({ message, description }: { message: string, description: string }) => (
    <div className="text-center py-12">
        <p className="font-bold text-lg">{message}</p>
        <p className="text-muted-foreground">{description}</p>
    </div>
);


export default function VolunteerPage() {
    const [activeTab, setActiveTab] = useState("My Activity");
    
    const renderContent = () => {
        switch (activeTab) {
            case "Opportunities":
                return <OpportunitiesSection />;
            case "My Activity":
                return <MyActivitySection />;
            case "Create Event":
                return <CreateEventSection />;
            case "Leaderboard":
                return <LeaderboardSection />;
            case "Badges":
            default:
                return <EmptyState message="Coming Soon" description="This feature is under construction." />;
        }
    }
    
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 space-y-8">
            <header className="text-center space-y-4">
                <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-background ring-2 ring-primary">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop&auto=format&q=80" alt="Volunteer Hub" />
                    <AvatarFallback>VH</AvatarFallback>
                </Avatar>
                <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
                    Volunteer Coordination Hub
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl lg:max-w-5xl mx-auto">
                    Discover local volunteer opportunities, sign up for events, and track your contributions with real-time analytics.
                </p>
            </header>

            <div className="bg-secondary/30 p-2 rounded-xl flex items-center justify-around">
                {tabItems.map(item => (
                    <button
                        key={item.label}
                        onClick={() => setActiveTab(item.label)}
                        className={cn(
                            "flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-medium w-full",
                            activeTab === item.label
                                ? "bg-background text-primary shadow"
                                : "text-muted-foreground hover:bg-secondary"
                        )}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>

            {renderContent()}

            <Card className="bg-green-600/10 border-green-600/20 text-center">
                <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-green-700">Can't find a suitable role?</h3>
                    <p className="text-muted-foreground mt-1">Register your interest and skills, and we'll notify you of new opportunities.</p>
                    <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">Register as a general volunteer</Button>
                </CardContent>
            </Card>

        </div>
    )
}
