
"use client"

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarDays, MapPin, Clock, Users, Ticket, 
  ArrowLeft, Share2, Heart, CheckCircle2,
  Info, ShieldCheck, Star, ChevronRight,
  Map as MapIcon, Globe, Calendar, User,
  Utensils, Droplets, Wifi
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

const MOCK_EVENT_DETAILS: Record<string, any> = {
  "1": {
    title: "Global Halal Expo 2024",
    date: "June 15 - June 17, 2024",
    location: "ExCel London, Royal Victoria Dock",
    type: "Exhibition",
    price: 25,
    currency: "£",
    image: "https://picsum.photos/seed/event1-hero/1600/800",
    attendees: "2,000+",
    about: "The Global Halal Expo is the premier international trade fair for the halal industry. Bringing together thousands of professionals, exhibitors, and visitors from across the globe, it showcases the latest trends in food, finance, fashion, and lifestyle. This three-day event features keynote speeches from industry leaders, specialized workshops, and unparalleled networking opportunities.",
    schedule: [
      { time: "09:00 AM", event: "Registration & Networking" },
      { time: "10:30 AM", event: "Opening Keynote: Future of Halal" },
      { time: "01:00 PM", event: "Lunch & Prayer Break" },
      { time: "02:30 PM", event: "Workshop: Islamic Finance Trends" },
    ],
    amenities: [
      { name: "Prayer Room", icon: Globe },
      { name: "Halal Food Court", icon: Utensils },
      { name: "Wudu Stations", icon: Droplets },
      { name: "Free Wi-Fi", icon: Wifi },
    ],
    organizer: "Hub Global Media",
    verified: true
  }
};

export default function EventDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [ticketCount, setTicketCount] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const event = MOCK_EVENT_DETAILS[id] || MOCK_EVENT_DETAILS["1"];

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24 selection:bg-primary/10">
      {/* Sticky Header */}
      <div className="bg-card/80 backdrop-blur-md sticky top-0 z-40 border-b">
        <div className="container mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 text-sm font-black text-muted-foreground hover:text-primary transition-all group p-0 h-auto"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
            Back to Events
          </Button>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-muted"><Share2 className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-rose-50 text-rose-500"><Heart className="h-5 w-5" /></Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <Image 
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <div className="container mx-auto max-w-7xl">
            <div className="space-y-6 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-primary text-white border-none font-black px-5 py-1.5 rounded-full text-xs shadow-2xl uppercase tracking-[0.2em]">{event.type}</Badge>
                {event.verified && (
                  <Badge variant="outline" className="bg-card/10 backdrop-blur-md text-emerald-400 border-emerald-500/30 font-black px-5 py-1.5 rounded-full text-xs uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3" /> Verified Event
                  </Badge>
                )}
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white font-headline tracking-tighter drop-shadow-2xl">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-8 text-white font-bold">
                <div className="flex items-center gap-3 bg-card/10 backdrop-blur-xl px-6 py-3 rounded-3xl border border-white/20 shadow-2xl">
                  <CalendarDays className="h-6 w-6 text-primary" />
                  <span className="text-xl tracking-tight">{event.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl">{event.location.split(',')[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="container mx-auto px-6 pt-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-16">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-[2.5rem] bg-card border shadow-sm h-20 p-2">
                <TabsTrigger value="about" className="rounded-[2rem] font-black text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">About Event</TabsTrigger>
                <TabsTrigger value="schedule" className="rounded-[2rem] font-black text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Schedule</TabsTrigger>
                <TabsTrigger value="speakers" className="rounded-[2rem] font-black text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Speakers</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-12 space-y-12 animate-in fade-in duration-700">
                <div className="space-y-6">
                  <h2 className="text-3xl font-black tracking-tight text-foreground">Event Overview</h2>
                  <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                    {event.about}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-4">
                    <h3 className="text-sm font-black uppercase text-muted-foreground tracking-widest">Target Audience</h3>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <Users className="h-6 w-6" />
                      </div>
                      <p className="text-lg font-black text-foreground">Professionals & Public</p>
                    </div>
                  </Card>
                  <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-4">
                    <h3 className="text-sm font-black uppercase text-muted-foreground tracking-widest">Estimated Capacity</h3>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <p className="text-lg font-black text-foreground">{event.attendees} Pax</p>
                    </div>
                  </Card>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-foreground">On-site Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {event.amenities.map((item: any, i: number) => (
                      <div key={i} className="flex flex-col items-center justify-center p-6 bg-card rounded-3xl border border-border shadow-sm group hover:border-primary/20 transition-all">
                        <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                          <item.icon className="h-6 w-6" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="mt-12 animate-in fade-in duration-700">
                <div className="space-y-6">
                  {event.schedule.map((item: any, i: number) => (
                    <div key={i} className="flex items-start gap-8 p-8 bg-card rounded-[2.5rem] shadow-sm border border-border group hover:shadow-lg transition-all">
                      <div className="text-center w-24 shrink-0">
                        <p className="text-xl font-black text-primary">{item.time.split(' ')[0]}</p>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{item.time.split(' ')[1]}</p>
                      </div>
                      <div className="h-12 w-px bg-muted" />
                      <div className="space-y-1">
                        <h4 className="text-xl font-black text-foreground leading-tight group-hover:text-primary transition-colors">{item.event}</h4>
                        <p className="text-sm font-bold text-muted-foreground">Conference Hall A • Main Wing</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="speakers" className="mt-12 animate-in fade-in duration-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[1, 2].map((i) => (
                    <Card key={i} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card p-8 space-y-6 hover:shadow-xl transition-all border-2 border-transparent hover:border-primary/10">
                      <div className="flex items-center gap-6">
                        <div className="relative h-20 w-20 rounded-3xl overflow-hidden shadow-lg border-2 border-white">
                          <Image src={`https://picsum.photos/seed/speaker${i}/200/200`} alt="Speaker" fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-foreground">Dr. Abdullah {i === 1 ? "Hussain" : "Ali"}</h4>
                          <p className="text-xs font-bold text-primary uppercase tracking-widest">Keynote Speaker</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium leading-relaxed italic">
                        "Industry veteran with over 15 years of experience in global halal markets and ethical finance standards."
                      </p>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="lg:col-span-4 space-y-10">
            <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden bg-card sticky top-28 border border-border">
              <CardHeader className="p-10 pb-6 bg-muted/50">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-3xl font-black tracking-tighter">Event Booking</CardTitle>
                    <p className="text-[10px] font-black uppercase text-primary tracking-[0.2em]">Limited Slots Available</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-card flex items-center justify-center shadow-sm">
                    <Ticket className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-10 space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-muted rounded-[2rem] border-2 border-transparent hover:border-primary/10 transition-all">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">General Access</p>
                      <p className="text-2xl font-black text-foreground">{event.currency}{event.price}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-lg bg-card shadow-sm border"
                        onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                      >-</Button>
                      <span className="font-black text-lg w-4 text-center">{ticketCount}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-lg bg-card shadow-sm border"
                        onClick={() => setTicketCount(ticketCount + 1)}
                      >+</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-bold px-2">
                      <span className="text-muted-foreground">Total Amount</span>
                      <span className="text-2xl font-black text-primary">{event.currency}{event.price * ticketCount}</span>
                    </div>
                    <Button className="w-full h-16 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white font-black text-xl shadow-2xl shadow-primary/20 transition-all active:scale-95">
                      Confirm & Pay <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="pt-8 border-t border-border space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-black text-foreground uppercase">Secure Transaction</p>
                      <p className="text-[10px] font-medium text-muted-foreground leading-relaxed">Your data is end-to-end encrypted and handled with theological integrity.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[3rem] border-none bg-zinc-900 p-10 text-center space-y-6 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 h-24 w-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="h-16 w-16 bg-card/10 rounded-2xl flex items-center justify-center mx-auto border border-white/10 shadow-2xl">
                <Info className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-white">Need Support?</h4>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  Have questions about group bookings or dietary requirements? Our event concierge is ready to help.
                </p>
              </div>
              <Button variant="outline" className="w-full h-12 rounded-2xl border-white/20 text-white hover:bg-card/10 font-black text-xs uppercase tracking-widest">
                Chat with Concierge
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
