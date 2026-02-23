
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  UtensilsCrossed, ShieldCheck, MapPin, List, Store, 
  User, Briefcase, Users, Moon, Heart, Calendar, 
  Stethoscope, Building2, GraduationCap, Plane
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  { name: "Restaurants", icon: UtensilsCrossed, count: "1,240", color: "bg-orange-100 text-orange-600" },
  { name: "Butchers & Meat", icon: Store, count: "450", color: "bg-red-100 text-red-600" },
  { name: "Healthcare", icon: Stethoscope, count: "120", color: "bg-blue-100 text-blue-600" },
  { name: "Mosques", icon: Building2, count: "85", color: "bg-emerald-100 text-emerald-600" },
  { name: "Education", icon: GraduationCap, count: "64", color: "bg-purple-100 text-purple-600" },
  { name: "Travel & Hajj", icon: Plane, count: "210", color: "bg-sky-100 text-sky-600" },
  { name: "Financial", icon: Briefcase, count: "42", color: "bg-amber-100 text-amber-600" },
  { name: "Charity", icon: Heart, count: "156", color: "bg-pink-100 text-pink-600" },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-black font-headline text-primary">Explore Categories</h1>
        <p className="text-muted-foreground text-lg">Browse halal-certified services across all verticals.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat) => (
          <Link key={cat.name} href={`/restaurants?category=${cat.name.toLowerCase()}`}>
            <Card className="hover:shadow-lg transition-all border-none shadow-sm rounded-3xl overflow-hidden group">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${cat.color} group-hover:scale-110 transition-transform`}>
                  <cat.icon className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-lg font-bold leading-none">{cat.name}</CardTitle>
                  <p className="text-xs font-medium text-muted-foreground">{cat.count} listings</p>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
