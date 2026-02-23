
"use client"

import { Card } from "@/components/ui/card";
import { 
  UtensilsCrossed, Map, List, Store, User, Briefcase, 
  ShieldCheck, Users, Moon, MessageSquare, Newspaper, 
  Settings, BookOpen, Heart, HandHelping, Medal, 
  Gift, Calendar, Globe, Info
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const BeefIcon = (props: any) => (
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

const FEATURES = [
  { name: "Food & Dining", icon: UtensilsCrossed, url: "/restaurants" },
  { name: "Meat & Butchers", icon: BeefIcon, url: "/categories" },
  { name: "Map", icon: Map, url: "/travel" },
  { name: "Directory", icon: List, url: "/categories" },
  { name: "Marketplace", icon: Store, url: "/categories" },
  { name: "Creators", icon: User, url: "/community" },
  { name: "Professionals", icon: Briefcase, url: "/categories" },
  { name: "Halal Check", icon: ShieldCheck, url: "/verifier" },
  { name: "Family", icon: Users, url: "/categories" },
  { name: "Prayer", icon: Moon, url: "/prayer-times" },
  { name: "Chat", icon: MessageSquare, url: "/community" },
  { name: "Feed", icon: Newspaper, url: "/community" },
  { name: "Manage", icon: Settings, url: "/vendor/dashboard" },
  { name: "Blog", icon: BookOpen, url: "/community" },
  { name: "Charity", icon: Heart, url: "/categories", highlight: true },
  { name: "Volunteer", icon: HandHelping, url: "/categories" },
  { name: "My Journey", icon: Medal, url: "/account/dashboard" },
  { name: "Rewards", icon: Gift, url: "/account/dashboard" },
  { name: "Community", icon: Globe, url: "/community" },
  { name: "Events", icon: Calendar, url: "/events" },
];

export default function Home() {
  return (
    <div className="space-y-12 py-8">
      {/* Centered Heading */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Discover Features
        </h1>
      </div>

      {/* 5x4 Grid Layout matching the screenshot */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-10 max-w-6xl mx-auto px-4">
        {FEATURES.map((feature) => (
          <Link key={feature.name} href={feature.url} className="group">
            <Card className={cn(
              "aspect-square flex flex-col items-center justify-center p-6 transition-all duration-300 border-none rounded-[2.5rem] shadow-sm group-hover:shadow-xl group-hover:-translate-y-2",
              feature.highlight ? "bg-[#E6F4EF]" : "bg-white"
            )}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <feature.icon className="h-8 w-8 text-primary stroke-[1.5]" />
              </div>
              <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors text-center px-2">
                {feature.name}
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
