
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, Clock, CheckCircle, ArrowRight, Compass, Map } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto p-4 space-y-8 md:p-8">
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline md:text-4xl text-primary">Welcome to HalalSphere</h1>
          <p className="text-muted-foreground mt-1">Your comprehensive guide to a modern halal lifestyle.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/verifier">Verify Product</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/restaurants">Explore Food</Link>
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-accent overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                Prayer Times
            </CardTitle>
            <CardDescription>Next: Dhuhr at 12:45 PM</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mt-2">
                <div className="flex justify-between text-sm py-1 border-b border-muted">
                    <span>Fajr</span>
                    <span>5:12 AM</span>
                </div>
                <div className="flex justify-between text-sm py-1 font-bold text-primary">
                    <span>Dhuhr</span>
                    <span>12:45 PM</span>
                </div>
                <div className="flex justify-between text-sm py-1">
                    <span>Asr</span>
                    <span>3:30 PM</span>
                </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4 group" asChild>
                <Link href="/prayer-times">
                    Full Schedule <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 relative overflow-hidden bg-primary/5">
            <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
                <Compass className="w-full h-full rotate-12" />
            </div>
          <CardHeader>
            <CardTitle>Global Halal Community</CardTitle>
            <CardDescription>Discover trending topics and local events happening today.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-background rounded-lg p-4 shadow-sm border">
                <h4 className="font-bold text-sm mb-1">Weekly Halal Seminar</h4>
                <p className="text-xs text-muted-foreground">Join us this Saturday for a discussion on ethical finance in the modern world.</p>
                <Link href="/events" className="text-xs text-primary font-medium mt-2 block">View Details</Link>
            </div>
            <div className="bg-background rounded-lg p-4 shadow-sm border">
                <h4 className="font-bold text-sm mb-1">New Turkish Gem!</h4>
                <p className="text-xs text-muted-foreground">Users are raving about "The Bosphorus Kitchen" in Downtown. Check it out!</p>
                <Link href="/restaurants" className="text-xs text-primary font-medium mt-2 block">See Reviews</Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-headline">Featured Locations</h2>
          <Button variant="link" asChild>
            <Link href="/travel">See all destinations</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Link key={i} href={`/restaurants`} className="group">
              <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
                <Image 
                  src={`https://picsum.photos/seed/location${i}/400/300`} 
                  alt="Featured place" 
                  fill 
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint="scenic location"
                />
                <div className="absolute top-2 left-2">
                    <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Top Rated</span>
                </div>
              </div>
              <h3 className="font-bold group-hover:text-primary transition-colors">Destined Delight Cafe</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Map className="h-3 w-3" />
                London, United Kingdom
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
