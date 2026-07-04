
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  UtensilsCrossed, Store, ShoppingCart, CookingPot, 
  Sparkles, Bed, Plane, Shirt, 
  CircleDollarSign, Stethoscope, GraduationCap, 
  BookOpen, Building2, ChevronRight 
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  { name: "Food & Dining", slug: "food", icon: UtensilsCrossed, count: "1,240", color: "bg-orange-100 text-orange-600" },
  { name: "Meat & Butchers", slug: "meat", icon: Store, count: "450", color: "bg-red-100 text-red-600" },
  { name: "Grocery & Supermarkets", slug: "grocery", icon: ShoppingCart, count: "890", color: "bg-emerald-100 text-emerald-600" },
  { name: "Catering Services", slug: "catering", icon: CookingPot, count: "120", color: "bg-blue-100 text-blue-600" },
  { name: "Event Services", slug: "events", icon: Sparkles, count: "210", color: "bg-purple-100 text-purple-600" },
  { name: "Hotels & Homestays", slug: "hotels", icon: Bed, count: "85", color: "bg-sky-100 text-sky-600" },
  { name: "Travel & Tourism", slug: "travel", icon: Plane, count: "156", color: "bg-amber-100 text-amber-600" },
  { name: "Fashion & Modest Wear", slug: "fashion", icon: Shirt, count: "340", color: "bg-pink-100 text-pink-600" },
  { name: "Cosmetics & Beauty", slug: "cosmetics", icon: Sparkles, count: "92", color: "bg-rose-100 text-rose-600" },
  { name: "Finance & Banking", slug: "finance", icon: CircleDollarSign, count: "42", color: "bg-indigo-100 text-indigo-600" },
  { name: "Healthcare & Wellness", slug: "healthcare", icon: Stethoscope, count: "115", color: "bg-teal-100 text-teal-600" },
  { name: "Education & Training", slug: "education", icon: GraduationCap, count: "64", color: "bg-violet-100 text-violet-600" },
  { name: "Bookstores & Media", slug: "media", icon: BookOpen, count: "78", color: "bg-muted text-muted-foreground" },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl">
      <div className="space-y-2">
        <h1 className="text-4xl font-black font-headline text-primary tracking-tight">Explore Categories</h1>
        <p className="text-muted-foreground text-lg font-medium">Browse halal-certified services across all 13 premium verticals.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat) => (
          <Link key={cat.slug} href={`/categories/${cat.slug}`}>
            <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-none shadow-sm rounded-[2rem] overflow-hidden group bg-card">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${cat.color} group-hover:scale-110 transition-transform shadow-sm`}>
                  <cat.icon className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-lg font-black leading-tight group-hover:text-primary transition-colors">{cat.name}</CardTitle>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black bg-muted px-2 py-0.5 rounded-full text-muted-foreground uppercase tracking-widest">{cat.count} Listings</span>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
