
"use client"

import { 
  UtensilsCrossed, 
  ShoppingCart, 
  CookingPot, 
  Sparkles, 
  Bed, 
  Plane, 
  Shirt, 
  CircleDollarSign, 
  Stethoscope, 
  GraduationCap, 
  BookOpen,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

const MeatIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.5 2a2.5 2.5 0 0 0-2.5 2.5V6a3 3 0 0 0 3 3h1a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3h-1a3 3 0 0 1-3-3v-1.5" />
    <path d="M15 22a7 7 0 0 0 7-7c0-2.5-2-4.5-4.5-4.5h-1a2.5 2.5 0 0 0-2.5 2.5V15a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-1" />
    <circle cx="15" cy="15" r="1" />
  </svg>
);

const CATEGORIES = [
  { id: 'food', title: 'Food & Dining', desc: 'Restaurants, Cafes, Cloud Kitchens.', icon: UtensilsCrossed, directUrl: '/vendor/dashboard' },
  { id: 'meat', title: 'Meat Shops & Butchers', desc: 'Fresh, frozen, and wholesale suppliers.', icon: MeatIcon },
  { id: 'grocery', title: 'Grocery & Supermarkets', desc: 'Mini-markets to hypermarkets.', icon: ShoppingCart },
  { id: 'catering', title: 'Catering Services', desc: 'Wedding, corporate, and event specialists.', icon: CookingPot },
  { id: 'events', title: 'Event Services & Venues', desc: 'Party services and halal-friendly event spaces.', icon: Sparkles },
  { id: 'hotels', title: 'Hotels & Homestays', desc: 'Halal-friendly accommodations.', icon: Bed },
  { id: 'travel', title: 'Travel & Tourism', desc: 'Hajj/Umrah and halal-friendly travel agencies.', icon: Plane },
  { id: 'fashion', title: 'Fashion & Modest Wear', desc: 'Hijabs, abayas, and designer brands.', icon: Shirt },
  { id: 'cosmetics', title: 'Cosmetics & Personal Care', desc: 'Halal-certified beauty and skin products.', icon: Sparkles },
  { id: 'finance', title: 'Finance & Banking', desc: 'Shariah-compliant banking and investment.', icon: CircleDollarSign },
  { id: 'healthcare', title: 'Healthcare & Wellness', desc: 'Clinics, pharmacies, hijama centers, and more.', icon: Stethoscope },
  { id: 'education', title: 'Education & Training', desc: 'Madrasas, schools, and Islamic training centres.', icon: GraduationCap },
  { id: 'media', title: 'Bookstores & Islamic Media', desc: 'Literature and digital media.', icon: BookOpen },
];

export default function BusinessCategoryPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-screen-2xl mx-auto space-y-12">
        <div className="space-y-1">
          <h1 className="text-2xl font-black font-headline text-slate-900">Select Business Category</h1>
          <p className="text-sm text-muted-foreground font-medium">Choose the category that best fits your business to get started.</p>
        </div>

        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <Link 
              key={category.id} 
              href={category.directUrl || `/partner/onboarding/business/details?category=${category.id}`}
              className="flex items-center justify-between p-6 rounded-3xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <category.icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-base font-black text-slate-900">{category.title}</h3>
                  <p className="text-xs text-muted-foreground font-medium">{category.desc}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
