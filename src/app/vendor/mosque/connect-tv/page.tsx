
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Check, Copy, ExternalLink, Tv, Image as ImageIcon, Megaphone, BookOpen } from "lucide-react";
import { useState } from "react";

export default function ConnectTvPage() {
    const [copied, setCopied] = useState(false);
    const displayUrl = "https://halalhub.com/display/jama-masjid-delhi";

    const handleCopy = () => {
        navigator.clipboard.writeText(displayUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
                    <Tv className="h-8 w-8" />
                    Mosque TV Display
                </h1>
                <p className="text-muted-foreground">
                    Broadcast prayer times, announcements, and more on any screen in your mosque.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Your Display URL</CardTitle>
                    <CardDescription>
                        Open this unique URL in the web browser of any Smart TV, tablet, or computer connected to a screen.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Input readOnly value={displayUrl} className="bg-secondary/50 h-11 text-base"/>
                        <Button size="icon" onClick={handleCopy} className="w-11 h-11">
                            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                        </Button>
                    </div>
                     <Button asChild className="w-full">
                        <a href={displayUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4"/> Launch & Preview TV Mode
                        </a>
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Setup Instructions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <div className="flex items-start gap-4">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">1</div>
                        <p>On your Smart TV or device, open the web browser app.</p>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">2</div>
                        <p>Navigate to the unique URL provided above. It's recommended to bookmark this page for easy access.</p>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">3</div>
                        <p>For the best experience, set the browser to full-screen mode if available.</p>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">4</div>
                        <p>The display will automatically update whenever you change prayer times or make new announcements.</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Display Settings</CardTitle>
                    <CardDescription>
                        Choose what content appears on the TV screen.
                    </CardDescription>
                </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="show-announcements" className="font-semibold flex items-center gap-3">
                            <Megaphone className="h-5 w-5 text-primary"/>
                            Show Announcements
                        </Label>
                        <Switch id="show-announcements" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="show-quran" className="font-semibold flex items-center gap-3">
                            <BookOpen className="h-5 w-5 text-primary"/>
                            Show Quran Verse of the Day
                        </Label>
                        <Switch id="show-quran" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                         <Label htmlFor="background-image" className="font-semibold flex items-center gap-3">
                           <ImageIcon className="h-5 w-5 text-primary"/>
                            Custom Background Image
                        </Label>
                        <Switch id="background-image" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
