
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Check, Copy, Code, LayoutTemplate, Clock, Megaphone, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const prayerTimes = [
  { name: "Fajr", time: "05:11" },
  { name: "Dhuhr", time: "12:08" },
  { name: "Asr", time: "04:15" },
  { name: "Maghrib", time: "05:56" },
  { name: "Isha", time: "07:06" },
];

const PrayerTimesWidgetPreview = ({ isDarkMode }: { isDarkMode: boolean }) => (
    <div className={`p-4 rounded-lg w-full max-w-sm mx-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} border`}>
        <h3 className="font-bold text-lg text-center mb-4">Today's Prayer Times</h3>
        <div className="space-y-2">
            {prayerTimes.map(prayer => (
                <div key={prayer.name} className={`flex justify-between items-center p-2 rounded ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <span className="font-semibold">{prayer.name}</span>
                    <span className="font-mono font-bold text-lg">{prayer.time}</span>
                </div>
            ))}
        </div>
    </div>
);

const AnnouncementsWidgetPreview = ({ isDarkMode }: { isDarkMode: boolean }) => (
    <div className={`p-4 rounded-lg w-full max-w-sm mx-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} border`}>
        <h3 className="font-bold text-lg text-center mb-4">Announcements</h3>
        <div className="space-y-3">
            <div className={`p-3 rounded ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                <p className="font-semibold text-sm">Eid Prayer Timings</p>
                <p className="text-xs opacity-80">First jamaat at 7:00 AM, second at 8:00 AM.</p>
            </div>
            <div className={`p-3 rounded ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                <p className="font-semibold text-sm">Weekly Tafsir Cancelled</p>
                <p className="text-xs opacity-80">This Friday's session is cancelled.</p>
            </div>
        </div>
    </div>
);


export default function WebWidgetsPage() {
    const { toast } = useToast();
    const [isDarkMode, setIsDarkMode] = useState(true);
    const prayerWidgetCode = `<iframe src="https://halalhub.com/widget/prayer-times/jama-masjid?theme=${isDarkMode ? 'dark' : 'light'}" width="100%" height="350" style="border:none;"></iframe>`;
    const announcementWidgetCode = `<iframe src="https://halalhub.com/widget/announcements/jama-masjid?theme=${isDarkMode ? 'dark' : 'light'}" width="100%" height="250" style="border:none;"></iframe>`;

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to Clipboard!",
            description: "You can now paste the code into your website's HTML.",
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
                    <LayoutTemplate className="h-8 w-8" />
                    Web Widgets
                </h1>
                <p className="text-muted-foreground">
                    Embed prayer times, announcements, and more directly on your mosque's website.
                </p>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5 text-primary"/>
                        Widget Customization
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="dark-mode" className="font-semibold">
                            Dark Mode
                        </Label>
                        <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary"/>
                        Prayer Times Widget
                    </CardTitle>
                    <CardDescription>
                        Display live prayer timings on your website.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label className="text-sm font-semibold">Live Preview</Label>
                        <div className="mt-2 rounded-lg border p-4">
                            <PrayerTimesWidgetPreview isDarkMode={isDarkMode} />
                        </div>
                    </div>
                     <div>
                        <Label htmlFor="prayer-code" className="text-sm font-semibold">Embed Code</Label>
                        <div className="mt-2 flex items-center gap-2">
                            <Input id="prayer-code" readOnly value={prayerWidgetCode} className="bg-secondary/50 font-mono text-xs"/>
                            <Button size="icon" onClick={() => copyToClipboard(prayerWidgetCode)}>
                                <Copy className="h-4 w-4"/>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Megaphone className="h-5 w-5 text-primary"/>
                        Announcements Widget
                    </CardTitle>
                    <CardDescription>
                        Show the latest mosque announcements on your site.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     <div>
                        <Label className="text-sm font-semibold">Live Preview</Label>
                        <div className="mt-2 rounded-lg border p-4">
                            <AnnouncementsWidgetPreview isDarkMode={isDarkMode} />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="announcement-code" className="text-sm font-semibold">Embed Code</Label>
                        <div className="mt-2 flex items-center gap-2">
                            <Input id="announcement-code" readOnly value={announcementWidgetCode} className="bg-secondary/50 font-mono text-xs"/>
                             <Button size="icon" onClick={() => copyToClipboard(announcementWidgetCode)}>
                                <Copy className="h-4 w-4"/>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
