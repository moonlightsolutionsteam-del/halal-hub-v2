"use client"

import {
  UtensilsCrossed, ShoppingCart, CookingPot, Sparkles, Bed, Plane,
  Shirt, CircleDollarSign, Stethoscope, GraduationCap, BookOpen,
  ChevronRight, Award, Zap
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useOnboarding } from "@/lib/onboarding-context";

const DEV_DASHBOARDS = [
  { label: "Food & Dining", url: "/vendor/dashboard" },
  { label: "Butcher / Meat", url: "/vendor/butcher/dashboard" },
  { label: "Grocery", url: "/vendor/grocery/dashboard" },
  { label: "Catering", url: "/vendor/catering/dashboard" },
  { label: "Events", url: "/vendor/events/dashboard" },
  { label: "Hotel", url: "/vendor/hotel/dashboard" },
  { label: "Travel", url: "/vendor/travel/dashboard" },
  { label: "Fashion", url: "/vendor/fashion/dashboard" },
  { label: "Cosmetics", url: "/vendor/cosmetics/dashboard" },
  { label: "Finance", url: "/vendor/finance/dashboard" },
  { label: "Healthcare", url: "/vendor/healthcare/dashboard" },
  { label: "Education", url: "/vendor/education/dashboard" },
  { label: "Media", url: "/vendor/media/dashboard" },
  { label: "Certification Body", url: "/admin/certification-body" },
];

const MeatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.5 2a2.5 2.5 0 0 0-2.5 2.5V6a3 3 0 0 0 3 3h1a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3h-1a3 3 0 0 1-3-3v-1.5" />
    <path d="M15 22a7 7 0 0 0 7-7c0-2.5-2-4.5-4.5-4.5h-1a2.5 2.5 0 0 0-2.5 2.5V15a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-1" />
    <circle cx="15" cy="15" r="1" />
  </svg>
);

const CATEGORIES = [
  { id: 'food', title: 'Food & Dining', desc: 'Restaurants, Cafes, Cloud Kitchens.', icon: UtensilsCrossed },
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
  const { update } = useOnboarding();
  const [showSkip, setShowSkip] = useState(false);

  return (
    <div className="py-12 px-6">
      <div className="max-w-screen-2xl mx-auto space-y-12">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Step 1 of 8</p>
            <button
              onClick={() => setShowSkip(v => !v)}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full transition-all"
            >
              <Zap className="w-3 h-3" />
              DEV: Skip to Dashboard
            </button>
          </div>
          <h1 className="text-xl sm:text-3xl font-black font-headline text-foreground">Select Business Category</h1>
          <p className="text-sm text-muted-foreground font-medium">Choose the category that best fits your business to get started.</p>
        </div>

        {showSkip && (
          <div className="max-w-2xl p-5 rounded-3xl border-2 border-dashed border-amber-300 bg-amber-50/60 space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-amber-700">Dev Shortcut — Jump to Dashboard</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {DEV_DASHBOARDS.map((d) => (
                <Link
                  key={d.url}
                  href={d.url}
                  className="text-center text-xs font-bold bg-white border border-amber-200 hover:border-amber-400 hover:bg-amber-50 text-amber-800 px-3 py-2.5 rounded-2xl transition-all"
                >
                  {d.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2 max-w-2xl">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/partner/onboarding/business/details?category=${category.id}`}
              onClick={() => update({ category: category.id, categoryLabel: category.title, currentStep: 1 })}
              className="flex items-center justify-between p-6 rounded-3xl hover:bg-card transition-all group border border-transparent hover:border-border hover:shadow-soft"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                  <category.icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-base font-black text-foreground">{category.title}</h3>
                  <p className="text-xs text-muted-foreground font-medium">{category.desc}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
