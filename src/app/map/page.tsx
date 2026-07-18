"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  Award, Beef, BookOpen, CircleDollarSign, CookingPot,
  HeartPulse, Landmark, Plane, School, Search,
  ShieldCheck, ShoppingCart, Star, Utensils, PartyPopper,
  Shirt, X, ArrowLeft, Newspaper, User, MapPin,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose, SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useBusinesses } from "@/hooks/use-businesses";
import type { Business } from "@/lib/types";
import { CATEGORY_COLORS } from "@/components/map/LeafletMap";

const LeafletMap = dynamic(() => import("@/components/map/LeafletMap"), { ssr: false });

const CATEGORIES = [
  { id: "food_dining",          name: "Food & Dining",   icon: Utensils,          color: "#f97316" },
  { id: "meat_shops",           name: "Meat",            icon: Beef,              color: "#ef4444" },
  { id: "grocery",              name: "Grocery",         icon: ShoppingCart,      color: "#10b981" },
  { id: "catering",             name: "Catering",        icon: CookingPot,        color: "#3b82f6" },
  { id: "events_services",      name: "Events",          icon: PartyPopper,       color: "#a855f7" },
  { id: "mosques",              name: "Mosques",         icon: Landmark,          color: "#4f46e5" },
  { id: "travel_tourism",       name: "Travel",          icon: Plane,             color: "#f59e0b" },
  { id: "fashion_modest",       name: "Fashion",         icon: Shirt,             color: "#ec4899" },
  { id: "healthcare_wellness",  name: "Healthcare",      icon: HeartPulse,        color: "#14b8a6" },
  { id: "education_training",   name: "Education",       icon: School,            color: "#8b5cf6" },
  { id: "finance_banking",      name: "Finance",         icon: CircleDollarSign,  color: "#6366f1" },
  { id: "bookstores",           name: "Media",           icon: BookOpen,          color: "#64748b" },
  { id: "certification_bodies", name: "Certification",   icon: Award,             color: "#059669" },
  { id: "creators",             name: "Creators",        icon: User,              color: "#0ea5e9" },
];

const AMENITIES = ["Parking", "Prayer Space", "Family Seating", "Wheelchair Accessible"];

export default function MapPage() {
  const router = useRouter();
  const { businesses, loading } = useBusinesses();

  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [verifiedHalal, setVerifiedHalal] = useState(false);
  const [openNow, setOpenNow] = useState(false);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setRating(0);
    setVerifiedHalal(false);
    setOpenNow(false);
    setAmenities([]);
    setSearchQuery("");
  };

  const filteredBusinesses = React.useMemo(() => {
    return businesses.filter(biz => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(biz.categoryId ?? "")) return false;
      if (rating > 0 && (biz.rating ?? 0) < rating) return false;
      if (verifiedHalal && !biz.verifiedHalal) return false;
      if (openNow && !biz.isOpen) return false;
      if (amenities.length > 0 && !amenities.every(a => biz.amenities?.includes(a))) return false;
      if (searchQuery && !biz.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [businesses, selectedCategories, rating, verifiedHalal, openNow, amenities, searchQuery]);

  const handleMarkerClick = useCallback((biz: Business) => {
    setSelectedBusiness(biz);
  }, []);

  const categoryColor = selectedBusiness
    ? (CATEGORY_COLORS[selectedBusiness.categoryId ?? ""] ?? { bg: "#6b7280" })
    : null;

  const activeFilterCount =
    selectedCategories.length +
    (rating > 0 ? 1 : 0) +
    (verifiedHalal ? 1 : 0) +
    (openNow ? 1 : 0) +
    amenities.length;

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-[1000] flex h-14 items-center gap-3 border-b bg-white/95 backdrop-blur px-4">
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-base font-bold shrink-0">Discover</h1>
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search places…"
            className="pl-8 h-8 text-sm rounded-full bg-gray-100 border-transparent"
          />
        </div>
      </header>

      {/* Map area */}
      <div className="flex-1 relative">

        {/* Category pill strip — floats over map */}
        <div
          className="absolute top-3 left-0 right-0 z-[999] px-3"
          style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex gap-2" style={{ minWidth: "max-content" }}>
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const active = selectedCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all whitespace-nowrap"
                  style={
                    active
                      ? { backgroundColor: cat.color, color: "#fff" }
                      : { backgroundColor: "#fff", color: "#374151" }
                  }
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters button — top-right */}
        <div className="absolute top-14 right-3 z-[999] flex gap-2 items-center">
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow"
            >
              <X className="h-3 w-3" /> {activeFilterCount}
            </button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex items-center gap-1.5 bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
                {activeFilterCount > 0 && (
                  <span className="ml-0.5 bg-primary text-primary-foreground text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[88%] rounded-t-2xl flex flex-col">
              <SheetHeader className="text-center pb-2 pt-1">
                <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-2" />
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-6">
                <div>
                  <h3 className="font-bold mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => {
                      const Icon = cat.icon;
                      const active = selectedCategories.includes(cat.id);
                      return (
                        <button
                          key={cat.id}
                          onClick={() => toggleCategory(cat.id)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border-2 transition-all"
                          style={
                            active
                              ? { backgroundColor: cat.color, borderColor: cat.color, color: "#fff" }
                              : { borderColor: "#e5e7eb", color: "#374151" }
                          }
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {cat.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-bold mb-4">Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="open-now">Open Now</Label>
                      <Switch id="open-now" checked={openNow} onCheckedChange={setOpenNow} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="verified-halal">Verified Halal Only</Label>
                      <Switch id="verified-halal" checked={verifiedHalal} onCheckedChange={setVerifiedHalal} />
                    </div>
                    <div>
                      <Label className="mb-2 block">Minimum Rating</Label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button key={star} onClick={() => setRating(star === rating ? 0 : star)}>
                            <Star className={`h-7 w-7 transition-colors ${rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                          </button>
                        ))}
                        <p className="ml-2 text-sm text-muted-foreground">{rating > 0 ? `${rating}★ & up` : "Any"}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="mb-2 block">Amenities</Label>
                      <div className="flex flex-wrap gap-2">
                        {AMENITIES.map(a => (
                          <Button
                            key={a}
                            variant={amenities.includes(a) ? "default" : "outline"}
                            size="sm"
                            onClick={() => setAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])}
                          >
                            {a}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <Button variant="ghost" onClick={clearFilters}>Clear All</Button>
                  <SheetClose asChild>
                    <Button>Show {filteredBusinesses.length} places</Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Place count badge — bottom-left */}
        {!loading && (
          <div className="absolute bottom-20 left-3 z-[999]">
            <span className="bg-white/90 backdrop-blur text-xs font-semibold px-3 py-1.5 rounded-full shadow">
              {filteredBusinesses.length} place{filteredBusinesses.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}

        {/* Real Leaflet map */}
        <div className="w-full h-full">
          <LeafletMap
            businesses={filteredBusinesses}
            onMarkerClick={handleMarkerClick}
          />
        </div>

        {/* Bottom nav dock */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-1 bg-white/95 backdrop-blur rounded-full shadow-xl px-2 py-1.5">
          <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full" onClick={() => router.push("/dashboard")}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </Button>
          <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full" onClick={() => router.push("/feed")}>
            <Newspaper className="h-5 w-5 text-gray-400" />
          </Button>
          <Button size="icon" className="h-11 w-11 rounded-full bg-primary text-white">
            <MapPin className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Business preview bottom sheet */}
      <Sheet open={!!selectedBusiness} onOpenChange={open => !open && setSelectedBusiness(null)}>
        <SheetContent side="bottom" className="rounded-t-2xl z-[1001] p-0">
          {selectedBusiness && (
            <>
              <div className="px-4 pt-4">
                <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-3" />
              </div>
              {selectedBusiness.imageUrl ? (
                <div className="relative w-full h-40">
                  <Image
                    src={selectedBusiness.imageUrl}
                    alt={selectedBusiness.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-full h-16 flex items-center justify-center"
                  style={{ backgroundColor: categoryColor?.bg ?? "#6b7280" }}
                >
                  <MapPin className="h-6 w-6 text-white/50" />
                </div>
              )}
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground capitalize mb-0.5">
                      {selectedBusiness.category?.replace(/_/g, " ")}
                    </p>
                    <h3 className="text-lg font-bold leading-tight">{selectedBusiness.name}</h3>
                    {selectedBusiness.rating && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                        <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                        <span>{selectedBusiness.rating}</span>
                        {selectedBusiness.reviews && <span>({selectedBusiness.reviews} reviews)</span>}
                      </div>
                    )}
                  </div>
                  {selectedBusiness.verifiedHalal && (
                    <Badge className="bg-green-50 text-green-700 border-green-200 shrink-0">
                      <ShieldCheck className="h-3 w-3 mr-1" /> Verified
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link href={`/entities/${selectedBusiness.id}`} className="flex-1">
                    <Button className="w-full" size="sm">View Details</Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={() => setSelectedBusiness(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
