
"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Clock, MapPin, Bell, BellOff, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PrayerTimesPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Mock qibla rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
        setRotation(prev => (prev + 1) % 360);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const prayerTimes = [
    { name: "Fajr", time: "5:12 AM", active: false },
    { name: "Sunrise", time: "6:34 AM", active: false },
    { name: "Dhuhr", time: "12:45 PM", active: true },
    { name: "Asr", time: "3:30 PM", active: false },
    { name: "Maghrib", time: "5:58 PM", active: false },
    { name: "Isha", time: "7:20 PM", active: false },
  ];

  return (
    <div className="container mx-auto p-4 space-y-8 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline text-primary">Prayer & Spiritual Guide</h1>
          <p className="text-muted-foreground flex items-center gap-1">
            <MapPin className="h-4 w-4" /> New York, NY, USA
          </p>
        </div>
        <Button 
            variant={notificationsEnabled ? "outline" : "default"} 
            className={notificationsEnabled ? "" : "bg-primary"}
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
        >
            {notificationsEnabled ? (
                <><BellOff className="mr-2 h-4 w-4" /> Disable Alerts</>
            ) : (
                <><Bell className="mr-2 h-4 w-4" /> Enable Notifications</>
            )}
        </Button>
      </div>

      <Tabs defaultValue="times" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="times">Prayer Times</TabsTrigger>
          <TabsTrigger value="qibla">Qibla Finder</TabsTrigger>
        </TabsList>
        
        <TabsContent value="times" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Today's Schedule</CardTitle>
                        <CardDescription>Estimated times based on standard calculation methods.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="divide-y">
                            {prayerTimes.map((prayer) => (
                                <div key={prayer.name} className={`flex items-center justify-between py-4 ${prayer.active ? "text-primary font-bold" : ""}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${prayer.active ? "bg-primary animate-pulse" : "bg-muted"}`} />
                                        <span>{prayer.name}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-mono">{prayer.time}</span>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Bell className="h-4 w-4 text-muted-foreground" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="bg-primary text-primary-foreground">
                        <CardHeader>
                            <CardTitle className="text-xl">Next Prayer</CardTitle>
                            <CardDescription className="text-primary-foreground/80">Time remaining until Dhuhr</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-5xl font-black mb-2">01:42:05</div>
                            <p className="text-sm opacity-90 italic">"Prayer is the pillar of religion."</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-muted-foreground uppercase">Calculation Method</p>
                                <p className="text-sm">ISNA (North America)</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-muted-foreground uppercase">Asr Method</p>
                                <p className="text-sm">Shafi, Maliki, Hanbali</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </TabsContent>

        <TabsContent value="qibla">
            <Card className="max-w-2xl mx-auto overflow-hidden">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Qibla Direction</CardTitle>
                    <CardDescription>Rotate your device to align with the Kaaba.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-12">
                    <div className="relative w-64 h-64 border-8 border-primary/20 rounded-full flex items-center justify-center shadow-inner mb-8">
                        <div 
                            className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out"
                            style={{ transform: `rotate(${rotation}deg)` }}
                        >
                            <div className="relative w-full h-full">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="flex flex-col items-center">
                                        <Navigation className="h-8 w-8 text-primary fill-current" />
                                        <div className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">QIBLA</div>
                                    </div>
                                </div>
                                <div className="absolute inset-4 border border-dashed border-muted-foreground/30 rounded-full" />
                            </div>
                        </div>
                        <div className="text-center z-10">
                            <div className="text-4xl font-black text-primary">58°</div>
                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">NE Direction</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="bg-muted/50 p-4 rounded-xl text-center">
                            <p className="text-xs text-muted-foreground mb-1 uppercase font-bold">Current Lat</p>
                            <p className="font-mono font-bold">40.7128° N</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-xl text-center">
                            <p className="text-xs text-muted-foreground mb-1 uppercase font-bold">Current Lon</p>
                            <p className="font-mono font-bold">74.0060° W</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
