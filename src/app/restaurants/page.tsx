
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Filter, Info } from "lucide-react";
import Image from "next/image";
import { Alert, AlertDescription } from "@/components/ui/alert";

const RESTAURANTS = [
  {
    id: 1,
    name: "The Bosphorus Kitchen",
    cuisine: "Turkish",
    location: "Downtown, New York",
    rating: 4.8,
    reviews: 124,
    status: "Verified",
    image: "https://picsum.photos/seed/restaurant1/600/400"
  },
  {
    id: 2,
    name: "Al-Zaeem Shawarma",
    cuisine: "Middle Eastern",
    location: "Brooklyn, NY",
    rating: 4.5,
    reviews: 89,
    status: "User Submitted",
    image: "https://picsum.photos/seed/restaurant2/600/400"
  },
  {
    id: 3,
    name: "Green Curry Thai",
    cuisine: "Thai",
    location: "Queens, NY",
    rating: 4.2,
    reviews: 56,
    status: "Verified",
    image: "https://picsum.photos/seed/restaurant3/600/400"
  },
  {
    id: 4,
    name: "Steak & Grill House",
    cuisine: "Steakhouse",
    location: "Jersey City, NJ",
    rating: 4.9,
    reviews: 210,
    status: "User Submitted",
    image: "https://picsum.photos/seed/restaurant4/600/400"
  }
];

export default function RestaurantsPage() {
  return (
    <div className="container mx-auto p-4 space-y-8 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline text-primary">Halal Dining Guide</h1>
          <p className="text-muted-foreground">Discover verified and community-submitted halal eateries near you.</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
            <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search cuisine or name..." className="pl-9" />
            </div>
            <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
            </Button>
        </div>
      </div>

      <Alert variant="default" className="bg-primary/10 border-primary/20 text-primary-foreground">
        <Info className="h-4 w-4 !text-primary" />
        <AlertDescription className="text-primary text-xs">
          Halal status is determined via user submitted documentation and reviews. Listings represent crowd-sourced guidance only, with no guarantee.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {RESTAURANTS.map((res) => (
          <Card key={res.id} className="group overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
            <div className="relative aspect-video">
                <Image 
                    src={res.image} 
                    alt={res.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    data-ai-hint="restaurant interior"
                />
                <div className="absolute top-3 right-3">
                    <Badge variant={res.status === "Verified" ? "default" : "secondary"} className="shadow-sm">
                        {res.status}
                    </Badge>
                </div>
            </div>
            <CardHeader className="p-4 space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">{res.name}</CardTitle>
                <div className="flex items-center gap-1 text-sm font-bold text-accent">
                    <Star className="h-4 w-4 fill-current" />
                    {res.rating}
                </div>
              </div>
              <CardDescription className="flex items-center gap-1">
                <Badge variant="outline" className="text-[10px] uppercase">{res.cuisine}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="line-clamp-1">{res.location}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t gap-2">
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90">Details</Button>
                <Button variant="outline" size="sm" className="w-full">Claim Listing</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
