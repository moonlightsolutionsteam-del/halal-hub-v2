
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Clock, Users, Ticket } from "lucide-react";
import Image from "next/image";

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
    <div className="container mx-auto p-4 space-y-8 md:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-headline text-primary">Halal Events</h1>
        <p className="text-muted-foreground">Find seminars, festivals, and community gatherings near you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {EVENTS.map((event) => (
          <Card key={event.id} className="overflow-hidden flex flex-col group">
            <div className="relative aspect-[16/9]">
                <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    data-ai-hint="event poster"
                />
                <div className="absolute top-4 left-4">
                    <Badge className="bg-accent text-accent-foreground font-bold shadow-md">{event.type}</Badge>
                </div>
            </div>
            <CardHeader>
              <CardTitle className="group-hover:text-primary transition-colors">{event.title}</CardTitle>
              <CardDescription className="flex items-center gap-1.5 pt-1">
                <CalendarDays className="h-4 w-4 text-primary" />
                {event.date}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                {event.location}
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-primary">
                <Ticket className="h-4 w-4" />
                {event.price}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className="w-full bg-primary">Book Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <section className="bg-primary/5 rounded-3xl p-8 text-center space-y-6 mt-8">
        <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold font-headline">Hosting an Event?</h2>
            <p className="text-muted-foreground">Get your event listed on Halal Hub and reach thousands of interested community members.</p>
            <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-primary">Post Your Event</Button>
                <Button variant="outline">Learn More</Button>
            </div>
        </div>
      </section>
    </div>
  );
}
