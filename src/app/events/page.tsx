
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Clock, Users, Ticket, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const EVENTS = [
  {
    id: 1,
    title: "Global Halal Expo 2024",
    date: "June 15 - June 17",
    location: "ExCel London",
    type: "Exhibition",
    price: "From £25",
    image: "https://picsum.photos/seed/event1/800/400"
  },
  {
    id: 2,
    title: "Islamic Finance Symposium",
    date: "May 22",
    location: "Online / Global",
    type: "Seminar",
    price: "Free",
    image: "https://picsum.photos/seed/event2/800/400"
  },
  {
    id: 3,
    title: "Eid in the Park Celebrations",
    date: "April 10",
    location: "Central Park, NYC",
    type: "Celebration",
    price: "Free",
    image: "https://picsum.photos/seed/event3/800/400"
  }
];

export default function EventsPage() {
  return (
    <div className="container mx-auto p-4 space-y-8 md:p-8 max-w-7xl">
      <div className="space-y-2">
        <h1 className="text-4xl font-black font-headline text-primary tracking-tight">Halal Events</h1>
        <p className="text-muted-foreground font-medium text-lg">Find seminars, festivals, and community gatherings near you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {EVENTS.map((event) => (
          <Card key={event.id} className="overflow-hidden flex flex-col group rounded-[2.5rem] border-none shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="relative aspect-[16/9]">
                <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    data-ai-hint="event poster"
                />
                <div className="absolute top-4 left-4">
                    <Badge className="bg-card/90 backdrop-blur-md text-primary font-black shadow-lg border-none px-4 py-1 rounded-full text-[10px] uppercase tracking-widest">{event.type}</Badge>
                </div>
            </div>
            <CardHeader className="p-6 pb-2">
              <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors leading-tight">{event.title}</CardTitle>
              <CardDescription className="flex items-center gap-1.5 pt-2 font-bold text-muted-foreground uppercase text-[10px] tracking-widest">
                <CalendarDays className="h-3.5 w-3.5 text-primary" />
                {event.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 flex-1 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                {event.location}
              </div>
              <div className="flex items-center gap-2 text-lg font-black text-primary tracking-tight">
                <Ticket className="h-5 w-5" />
                {event.price}
              </div>
            </CardContent>
            <CardFooter className="p-6 border-t bg-muted/50">
              <Link href={`/events/${event.id}`} className="w-full">
                <Button className="w-full bg-primary hover:bg-primary/90 rounded-2xl h-12 font-black uppercase text-xs tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95">
                  Book Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <section className="bg-zinc-900 rounded-[3rem] p-12 text-center space-y-8 mt-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Ticket className="h-64 w-64 text-primary" />
        </div>
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-4xl font-black font-headline text-white tracking-tight">Hosting an Event?</h2>
            <p className="text-muted-foreground font-medium text-lg leading-relaxed">Get your event listed on Halal Hub and reach thousands of interested community members. Manage ticketing, check-ins, and analytics from a single dashboard.</p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 px-10 font-black uppercase text-xs tracking-widest shadow-2xl">Post Your Event</Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-card/10 rounded-2xl h-14 px-10 font-black uppercase text-xs tracking-widest">Learn More</Button>
            </div>
        </div>
      </section>
    </div>
  );
}
