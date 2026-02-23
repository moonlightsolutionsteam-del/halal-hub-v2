import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plane, Camera, Compass, Bed, Utensils } from "lucide-react";
import Image from "next/image";

const MosqueIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 20H4V10l8-5 8 5v10Z" />
    <path d="M12 5V2" />
    <path d="M12 10v10" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const DESTINATIONS = [
  {
    name: "Istanbul, Turkey",
    description: "The meeting point of East and West, with countless mosques and delicious halal cuisine.",
    image: "https://picsum.photos/seed/istanbul/800/600",
    tags: ["Historic", "Gourmet", "Mosques"]
  },
  {
    name: "Kuala Lumpur, Malaysia",
    description: "A modern metropolis with world-class halal infrastructure and shopping.",
    image: "https://picsum.photos/seed/kl/800/600",
    tags: ["Urban", "Shopping", "Kid-Friendly"]
  },
  {
    name: "London, UK",
    description: "Home to a vibrant Muslim community and an endless array of halal food from around the globe.",
    image: "https://picsum.photos/seed/london/800/600",
    tags: ["Multicultural", "Museums", "Parks"]
  }
];

export default function TravelPage() {
  return (
    <div className="container mx-auto p-4 space-y-8 md:p-8">
      <section className="relative h-[300px] rounded-2xl overflow-hidden mb-8">
        <Image 
          src="https://picsum.photos/seed/travel-hero/1200/400" 
          alt="Halal Travel" 
          fill 
          className="object-cover brightness-50"
          data-ai-hint="scenic landscape travel"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <Badge variant="secondary" className="mb-4 bg-accent text-accent-foreground">Explore Without Limits</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-headline">The World is Yours</h1>
          <p className="text-white/90 max-w-xl">Curated halal-friendly destinations, mosques, and eateries for your next adventure.</p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <h2 className="text-2xl font-bold font-headline">Featured Destinations</h2>
          <div className="grid gap-6">
            {DESTINATIONS.map((dest) => (
              <Card key={dest.name} className="overflow-hidden flex flex-col md:flex-row group">
                <div className="relative w-full md:w-1/3 aspect-video md:aspect-auto">
                    <Image src={dest.image} alt={dest.name} fill className="object-cover transition-transform group-hover:scale-105" data-ai-hint="city landmark" />
                </div>
                <div className="flex-1 p-6 space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-primary">{dest.name}</h3>
                            <div className="flex gap-2 mt-1">
                                {dest.tags.map(tag => <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>)}
                            </div>
                        </div>
                        <Button variant="ghost" size="icon"><Compass className="h-5 w-5" /></Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{dest.description}</p>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1 text-xs font-bold">
                            <Utensils className="h-3 w-3 text-accent" />
                            <span>120+ Eateries</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold">
                            <MosqueIcon className="h-3 w-3 text-accent" />
                            <span>45+ Mosques</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold">
                            <Bed className="h-3 w-3 text-accent" />
                            <span>Premium Hotels</span>
                        </div>
                    </div>
                    <Button className="w-full md:w-auto bg-primary">Explore Guide</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Nearby Halal Spots</CardTitle>
                    <CardDescription>Based on your current location</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex gap-3 items-center p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                            <div className="h-12 w-12 rounded bg-primary/10 flex items-center justify-center">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold">Local Mosque #{i}</h4>
                                <p className="text-xs text-muted-foreground">0.8 miles away</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="bg-accent/10 border-accent/20">
                <CardHeader>
                    <div className="h-10 w-10 bg-accent rounded-full flex items-center justify-center mb-2">
                        <Plane className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-lg">Travel Insurance</CardTitle>
                    <CardDescription>Get comprehensive coverage for your halal travels.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className="w-full border-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground">Learn More</Button>
                </CardContent>
            </Card>
        </aside>
      </div>
    </div>
  );
}
