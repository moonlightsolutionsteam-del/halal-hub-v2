
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
    <div className="px-4 sm:px-6 py-5 sm:py-8 space-y-6 max-w-6xl mx-auto">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl md:text-2xl sm:text-4xl font-black font-headline text-primary tracking-tight">Explore Categories</h1>
        <p className="text-muted-foreground text-sm sm:text-base font-medium">Browse halal-certified services across all 13 premium verticals.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {CATEGORIES.map((cat) => (
          <Link key={cat.slug} href={`/categories/${cat.slug}`}>
            <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-none shadow-sm rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden group bg-card h-full">
              <CardHeader className="flex flex-row items-center gap-3 sm:gap-4 space-y-0 p-4 sm:p-5 md:p-6">
                <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${cat.color} group-hover:scale-110 transition-transform shadow-sm`}>
                  <cat.icon className="h-5 w-5 sm:h-7 sm:w-7" />
                </div>
                <div className="space-y-1 min-w-0">
                  <CardTitle className="text-sm sm:text-base md:text-lg font-black leading-tight group-hover:text-primary transition-colors line-clamp-2">{cat.name}</CardTitle>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] sm:text-[10px] font-black bg-muted px-2 py-0.5 rounded-full text-muted-foreground uppercase tracking-widest">{cat.count}</span>
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
