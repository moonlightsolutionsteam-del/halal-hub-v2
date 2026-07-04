
"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
    Award,
    Beef,
    BookOpen,
    CalendarDays,
    ChevronUp,
    CircleDollarSign,
    CookingPot,
    HeartPulse,
    Home,
    Landmark,
    List,
    Map as MapIcon,
    Menu,
    Minus,
    Moon,
    Plane,
    Plus,
    School,
    Search,
    ShieldCheck,
    ShoppingCart,
    Star,
    Utensils,
    PartyPopper,
    Shirt,
    X,
    Clock,
    ArrowLeft,
    Newspaper,
    User,
    MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { useBusinesses } from "@/hooks/use-businesses";
import type { Business } from "@/lib/types";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const masterCategories = [
    { id: "food_dining", name: "Food & Dining", icon: <Utensils className="h-6 w-6" />, visible: true, href: "/categories/food" },
    { id: "meat_shops", name: "Meat Shops & Butchers", icon: <Beef className="h-6 w-6" />, visible: true, href: "/categories/meat" },
    { id: "grocery", name: "Grocery & Supermarkets", icon: <ShoppingCart className="h-6 w-6" />, visible: false },
    { id: "catering", name: "Catering Services", icon: <CookingPot className="h-6 w-6" />, visible: true, href: "/categories/catering" },
    { id: "events_services", name: "Event Services & Venues", icon: <PartyPopper className="h-6 w-6" />, visible: false },
    { id: "events_conferences", name: "Events & Conferences", icon: <CalendarDays className="h-6 w-6" />, visible: false },
    { id: "mosques", name: "Mosques & Islamic Centers", icon: <Landmark className="h-6 w-6" />, visible: true, href: "/categories" },
    { id: "travel_tourism", name: "Travel & Tourism", icon: <Plane className="h-6 w-6" />, visible: false },
    { id: "fashion_modest", name: "Fashion & Modest Wear", icon: <Shirt className="h-6 w-6" />, visible: true, href: "/categories/fashion" },
    { id: "cosmetics", name: "Cosmetics & Personal Care", icon: <Utensils className="h-6 w-6" />, visible: false }, // No direct icon, using a placeholder
    { id: "finance_banking", name: "Finance & Banking", icon: <CircleDollarSign className="h-6 w-6" />, visible: false },
    { id: "healthcare_wellness", name: "Healthcare, Wellness & Spiritual Healing", icon: <HeartPulse className="h-6 w-6" />, visible: false },
    { id: "education_training", name: "Education & Training", icon: <School className="h-6 w-6" />, visible: false },
    { id: "certification_bodies", name: "Halal Certification Bodies & Services", icon: <Award className="h-6 w-6" />, visible: true },
    { id: "bookstores", name: "Bookstores & Islamic Media", icon: <BookOpen className="h-6 w-6" />, visible: true, href: "/categories/media" },
    { id: "creators", name: "Creators", icon: <User className="h-6 w-6" />, visible: true, href: "/categories/media" },
];

const categories = masterCategories.filter(cat => cat.visible);
const amenitiesList = ["Parking", "Prayer Space", "Family Seating", "Wheelchair Accessible"];

const HalalIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="white"/>
    <path d="M8.22217 17.4V7.6H10.1222V11.23H13.8222V7.6H15.7222V17.4H13.8222V13.04H10.1222V17.4H8.22217Z" fill="#2E7D32"/>
    </svg>
  );

const DrumIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 10H5C3.89543 10 3 10.8954 3 12V14C3 15.1046 3.89543 16 5 16H19C20.1046 16 21 15.1046 21 14V12C21 10.8954 20.1046 10 19 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 12L5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const BusinessCard = ({ business }: { business: Business }) => {
    
    const getLink = () => {
        switch(business.type) {
            case 'restaurant': return `/entities/${business.id}`;
            case 'meat': return `/entities/${business.id}`;
            case 'mosque': return `/entities/${business.id}`;
            default: return '#';
        }
    }

  return (
  <Card className="overflow-hidden w-full">
    <Link href={getLink()} passHref>
      <div className="flex">
        <div className="relative w-1/3">
          <Image
            src={business.imageUrl || 'https://picsum.photos/seed/placeholder/400'}
            alt={business.name}
            fill
            className="object-cover"
            data-ai-hint={business.imageHint || 'business location'}
          />
        </div>
        <div className="w-2/3">
          <CardContent className="p-4">
             <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold font-headline leading-tight">{business.name}</h3>
                {business.verifiedHalal && (
                    <Badge className="bg-green-100 text-green-800 border-green-200 shrink-0">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Verified
                    </Badge>
                )}
            </div>
            <div className="text-sm text-muted-foreground mt-1 space-x-1">
                {business.cuisines?.map((c: string) => <span key={c}>{c}</span>)}
            </div>
            {business.rating && (
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
                <span>{business.rating} ({business.reviews} reviews)</span>
                </div>
            )}
             <div className="text-sm text-muted-foreground mt-1">
                <span>{business.distance}</span>
                {business.isOpen !== undefined && (
                    <>
                        <span className="mx-2">•</span>
                        <span className={business.isOpen ? 'text-green-600' : 'text-red-600'}>
                            {business.isOpen ? 'Open' : 'Closed'}
                        </span>
                    </>
                )}
            </div>
             {business.nextPrayer && (
                <div className="text-sm font-semibold text-primary mt-2 flex items-center gap-1">
                    <Clock className="h-4 w-4" /> Next: {business.nextPrayer} at {business.nextPrayerTime}
                </div>
            )}
          </CardContent>
        </div>
      </div>
    </Link>
  </Card>
)};

const MapPinButton = ({ business, icon }: { business: Business; icon: React.ReactNode }) => {
    const { setSelectedBusiness } = useMapContext();
    const top = `${(business.latitude - 28.64) * 2500 + 40}%`;
    const left = `${(business.longitude - 77.21) * 2500 + 60}%`;

    return (
        <button
            onClick={() => setSelectedBusiness(business)}
            className="absolute z-10 p-2 bg-primary rounded-full shadow-lg flex items-center justify-center"
            style={{ top, left, transform: 'translate(-50%, -50%)' }}
        >
            {icon}
        </button>
    );
};

const MapContext = React.createContext<{
    selectedBusiness: any;
    setSelectedBusiness: React.Dispatch<React.SetStateAction<any>>;
}>({
    selectedBusiness: null,
    setSelectedBusiness: () => {},
});

const useMapContext = () => React.useContext(MapContext);

const getIconForCategory = (categoryId: string) => {
    switch (categoryId) {
        case 'restaurant': return <Utensils className="h-6 w-6 text-white" />;
        case 'meat': return <Beef className="h-6 w-6 text-white" />;
        case 'mosque': return <Landmark className="h-6 w-6 text-white" />;
        default: return <MapPin className="h-6 w-6 text-white" />;
    }
}

export default function MapPage() {
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const router = useRouter();
  const { businesses, loading, error } = useBusinesses();

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [distance, setDistance] = useState([5]);
  const [rating, setRating] = useState(0);
  const [verifiedHalal, setVerifiedHalal] = useState(false);
  const [openNow, setOpenNow] = useState(false);
  const [amenities, setAmenities] = useState<string[]>([]);

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
        prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setAmenities(prev =>
        prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setDistance([5]);
    setRating(0);
    setVerifiedHalal(false);
    setOpenNow(false);
    setAmenities([]);
  };

  const filteredBusinesses = React.useMemo(() => {
    return businesses.filter(business => {
      const businessDistance = parseFloat(business.distance || '100');
      if (selectedCategories.length > 0 && !selectedCategories.includes(business.categoryId)) return false;
      if (businessDistance > distance[0]) return false;
      if (rating > 0 && (business.rating || 0) < rating) return false;
      if (verifiedHalal && !business.verifiedHalal) return false;
      if (openNow && !business.isOpen) return false;
      if (amenities.length > 0 && !amenities.every(a => business.amenities?.includes(a))) return false;
      return true;
    });
  }, [businesses, selectedCategories, distance, rating, verifiedHalal, openNow, amenities]);

  const handleBusinessSheetClose = () => {
    setSelectedBusiness(null);
  }

  const navigateToDetails = (id: string, category: string) => {
    handleBusinessSheetClose();
    const basePath = category === 'restaurant' ? '/entities' : category === 'meat' ? '/entities' : '/entities';
    const path = `${basePath}/${id}`;
    router.push(path);
  }

  return (
    <MapContext.Provider value={{ selectedBusiness, setSelectedBusiness }}>
        <div className="flex flex-col h-screen bg-gray-200">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-card px-4 md:px-6">
            <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard')}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
            <h1 className="text-lg font-semibold truncate">Discover on Map</h1>
            </div>
            <div className="flex items-center gap-2">
            {/* Placeholder for potential actions */}
            </div>
        </header>
        {/* Map View */}
        <div className="flex-1 relative">
            <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://www.openstreetmap.org/export/embed.html?bbox=77.21,28.64,77.23,28.66&layer=mapnik"
            ></iframe>
            
            {/* Floating Action Buttons */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
                <Button onClick={() => console.log('Halal Icon clicked')} variant="secondary" size="icon" className="rounded-full h-14 w-14 shadow-lg bg-white hover:bg-gray-100 text-black">
                    <HalalIcon />
                </Button>
                <Button onClick={() => console.log('Drum Icon clicked')} variant="secondary" size="icon" className="rounded-full h-14 w-14 shadow-lg bg-white hover:bg-gray-100 text-black">
                    <DrumIcon />
                </Button>
            </div>
            <div className="absolute top-4 right-4 space-y-2 z-10">
                <Button onClick={() => console.log('Zoom in clicked')} variant="secondary" size="icon" className="rounded-full h-12 w-12 shadow-lg bg-white hover:bg-gray-100 text-black">
                    <Plus className="h-6 w-6"/>
                </Button>
                <Button onClick={() => console.log('Zoom out clicked')} variant="secondary" size="icon" className="rounded-full h-12 w-12 shadow-lg bg-white hover:bg-gray-100 text-black">
                    <Minus className="h-6 w-6"/>
                </Button>
            </div>

            {/* Business markers */}
            {!loading && filteredBusinesses.map(business => (
                <MapPinButton key={business.id} business={business} icon={getIconForCategory(business.categoryId)} />
            ))}

            <div className="absolute bottom-20 right-4 z-10">
                <Button variant="secondary" size="icon" className="rounded-full h-14 w-14 shadow-lg bg-white hover:bg-gray-100 text-black">
                    <MapPin className="h-7 w-7"/>
                </Button>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full" onClick={() => router.push('/dashboard')}>
                    <Home className="h-7 w-7 text-gray-400"/>
                </Button>
                <Button variant="ghost" size="icon" className="h-14 w-14 rounded-full" onClick={() => router.push('/feed')}>
                    <Newspaper className="h-7 w-7 text-gray-400"/>
                </Button>
                 <Button variant="secondary" size="icon" className="h-14 w-14 rounded-full bg-white text-black">
                    <MapIcon className="h-7 w-7"/>
                </Button>
            </div>

        </div>

        {/* Bottom Sheet for Categories and Search */}
        <Sheet>
            <SheetTrigger asChild>
            <div className="absolute bottom-4 left-0 right-0 z-20 px-4 pb-4 cursor-pointer">
                <div className="bg-background rounded-2xl shadow-2xl p-4">
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-2"></div>
                    <p className="text-center font-semibold">View Categories & Places</p>
                </div>
                </div>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[90%] rounded-t-2xl flex flex-col">
                <SheetHeader className="text-center pb-2">
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto -mt-2"></div>
                    <SheetTitle>Filter Places</SheetTitle>
                </SheetHeader>
                <div className="px-4">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                        placeholder="Search"
                        className="pl-10 h-12 text-base bg-gray-100 border-transparent rounded-xl"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto px-4 pb-20 space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-2">Categories</h3>
                        <div className="flex flex-wrap gap-4">
                            {categories.map((category) => (
                                <button key={category.id} onClick={() => toggleCategory(category.id)} className={`flex-1 min-w-[120px] flex flex-col items-center justify-center text-center gap-2 p-4 rounded-lg border-2 transition-colors h-28 ${selectedCategories.includes(category.id) ? 'border-primary bg-primary/10' : 'bg-secondary/50'}`}>
                                    <div className="text-primary">{category.icon}</div>
                                    <span className="text-xs font-semibold text-foreground">{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <Separator />

                    <div>
                        <h3 className="font-bold text-lg mb-4">Distance</h3>
                        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                            <span>1 km</span>
                            <span>50 km</span>
                        </div>
                        <Slider
                            defaultValue={[5]}
                            max={50}
                            min={1}
                            step={1}
                            value={distance}
                            onValueChange={setDistance}
                        />
                         <p className="text-center text-sm mt-2">Up to {distance[0]} km</p>
                    </div>

                    <Separator />
                    
                    <div>
                        <h3 className="font-bold text-lg mb-4">Filters</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="open-now">Open Now</Label>
                                <Switch id="open-now" checked={openNow} onCheckedChange={setOpenNow} />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="verified-halal">Verified Halal</Label>
                                <Switch id="verified-halal" checked={verifiedHalal} onCheckedChange={setVerifiedHalal}/>
                            </div>
                             <div>
                                <Label className="mb-2 block">Rating</Label>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button key={star} onClick={() => setRating(star === rating ? 0 : star)}>
                                            <Star className={`h-8 w-8 transition-colors ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                        </button>
                                    ))}
                                    <p className="ml-2 text-sm text-muted-foreground">{rating > 0 ? `${rating} & up` : "Any"}</p>
                                </div>
                            </div>
                            <div>
                                <Label className="mb-2 block">Amenities</Label>
                                <div className="flex flex-wrap gap-2">
                                    {amenitiesList.map(amenity => (
                                        <Button key={amenity} variant={amenities.includes(amenity) ? "default" : "outline"} onClick={() => toggleAmenity(amenity)}>{amenity}</Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                        <Button variant="ghost" onClick={clearFilters}>Clear All</Button>
                        <SheetClose asChild>
                            <Button>Apply Filters</Button>
                        </SheetClose>
                    </div>

                </div>
            </SheetContent>
        </Sheet>
        
        {/* Business Preview Sheet */}
        <Sheet open={!!selectedBusiness} onOpenChange={(isOpen) => !isOpen && handleBusinessSheetClose()}>
            <SheetContent side="bottom" className="rounded-t-lg z-40 p-0">
            {selectedBusiness && (
                <div>
                <SheetHeader className="p-4">
                    <SheetTitle className="sr-only">{selectedBusiness.name}</SheetTitle>
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto"></div>
                </SheetHeader>
                <Card className="border-none shadow-none">
                    <Image
                    src={selectedBusiness.imageUrl || 'https://picsum.photos/seed/placeholder/600'}
                    alt={selectedBusiness.name}
                    width={600}
                    height={400}
                    className="object-cover w-full h-48"
                    data-ai-hint={selectedBusiness.imageHint || 'business exterior'}
                    />
                    <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                        <div>
                        <Badge variant="secondary" className="mb-2">{selectedBusiness.category}</Badge>
                        <h3 className="text-xl font-bold">{selectedBusiness.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                            {selectedBusiness.rating && (
                                <>
                                    <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
                                    <span>{selectedBusiness.rating} ({selectedBusiness.reviews} reviews)</span>
                                    <span className="mx-2">•</span>
                                </>
                            )}
                            <span>{selectedBusiness.distance}</span>
                        </div>
                        </div>
                        {selectedBusiness.verifiedHalal && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                            <ShieldCheck className="w-4 h-4 mr-1"/>
                            Verified Halal
                        </Badge>
                        )}
                    </div>
                    <Button className="w-full mt-4" onClick={() => navigateToDetails(selectedBusiness.id, selectedBusiness.categoryId)}>View Details</Button>
                    </CardContent>
                </Card>
                </div>
            )}
            </SheetContent>
        </Sheet>
        </div>
    </MapContext.Provider>
  );
}
