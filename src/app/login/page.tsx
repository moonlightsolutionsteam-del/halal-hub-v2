"use client";

import * as React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, MapPin, Coins, Users, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    icon: MapPin,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    accent: "from-emerald-500 to-teal-600",
    title: "Discover Halal Near You",
    body: "Browse 130+ verified halal restaurants, shops, and services across India — all in one place.",
    visual: "🕌",
  },
  {
    icon: Coins,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    accent: "from-amber-500 to-orange-500",
    title: "Check In & Earn Coins",
    body: "Visit places, write reviews, and suggest new businesses. Every action earns Halal Coins redeemable for rewards.",
    visual: "🪙",
  },
  {
    icon: Users,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    accent: "from-violet-500 to-purple-600",
    title: "Your Muslim Community",
    body: "Connect with family, track prayer streaks, and join a global network of over a million Muslims.",
    visual: "🤝",
  },
];

export default function LoginPage() {
  const [slide, setSlide] = React.useState(0);
  const [showForm, setShowForm] = React.useState(false);
  const isLast = slide === SLIDES.length - 1;

  const advance = () => {
    if (isLast) {
      setShowForm(true);
    } else {
      setSlide((s) => s + 1);
    }
  };

  if (showForm) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-black text-foreground tracking-tight">Welcome to Halal Hub</h1>
            <p className="text-sm text-muted-foreground">Sign in or create your account</p>
          </div>
          <LoginForm />
        </div>
      </div>
    );
  }

  const current = SLIDES[slide];
  const Icon = current.icon;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip */}
      <div className="flex justify-end p-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground font-bold text-xs uppercase tracking-widest"
          onClick={() => setShowForm(true)}
        >
          Skip
        </Button>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8 space-y-8">
        {/* Emoji visual */}
        <div
          className={cn(
            "h-36 w-36 rounded-[3rem] flex items-center justify-center text-7xl shadow-xl bg-gradient-to-br",
            current.accent,
          )}
        >
          {current.visual}
        </div>

        {/* Text */}
        <div className="text-center space-y-3 max-w-xs">
          <h2 className="text-3xl font-black text-foreground tracking-tight leading-tight">
            {current.title}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {current.body}
          </p>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === slide ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30",
              )}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 pt-0">
        <Button
          className="w-full h-14 rounded-2xl text-base font-black"
          onClick={advance}
        >
          {isLast ? "Get Started" : "Next"}
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
