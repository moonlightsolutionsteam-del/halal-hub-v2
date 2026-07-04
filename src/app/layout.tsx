
"use client"

import * as React from 'react';
import { usePathname } from 'next/navigation';
import './globals.css';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/user-sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { VendorSidebar } from "@/components/vendor-sidebar";
import { ButcherSidebar } from "@/components/butcher-sidebar";
import { GrocerySidebar } from "@/components/grocery-sidebar";
import { EventsSidebar } from "@/components/events-sidebar";
import { CateringSidebar } from "@/components/catering-sidebar";
import { HotelSidebar } from "@/components/hotel-sidebar";
import { TravelSidebar } from "@/components/travel-sidebar";
import { FashionSidebar } from "@/components/fashion-sidebar";
import { CosmeticsSidebar } from "@/components/cosmetics-sidebar";
import { FinanceSidebar } from "@/components/finance-sidebar";
import { HealthcareSidebar } from "@/components/healthcare-sidebar";
import { EducationSidebar } from "@/components/education-sidebar";
import { MediaSidebar } from "@/components/media-sidebar";
import { CreativeSidebar } from "@/components/creative-sidebar";
import { FamilyTreeSidebar } from "@/components/family-tree-sidebar";
import { MosqueSidebar } from "@/components/mosque-sidebar";
import { OrganizationSidebar } from "@/components/organization-sidebar";
import { ProfessionalSidebar } from "@/components/professional-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { HeaderLocation } from "@/components/header-location";
import { HeaderSearch } from "@/components/header-search";
import { ThemeProvider } from "@/lib/theme-context";
import { PrayerSettingsProvider } from "@/lib/prayer-context";
import { FavoritesProvider } from "@/lib/favorites-context";
import { SavedBusinessesProvider } from "@/lib/saved-businesses-context";
import { AuthProvider } from "@/context/AuthContext";
import { MessageSquare, Home, Search, Globe, User, List, Newspaper } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isAdminPath = pathname?.startsWith('/admin');
  const isVendorPath = pathname?.startsWith('/vendor');
  const isButcherPath = pathname?.startsWith('/vendor/butcher');
  const isGroceryPath = pathname?.startsWith('/vendor/grocery');
  const isEventsPath = pathname?.startsWith('/vendor/events');
  const isCateringPath = pathname?.startsWith('/vendor/catering');
  const isHotelPath = pathname?.startsWith('/vendor/hotel');
  const isTravelPath = pathname?.startsWith('/vendor/travel');
  const isFashionPath = pathname?.startsWith('/vendor/fashion');
  const isCosmeticsPath = pathname?.startsWith('/vendor/cosmetics');
  const isFinancePath = pathname?.startsWith('/vendor/finance');
  const isHealthcarePath = pathname?.startsWith('/vendor/healthcare');
  const isEducationPath = pathname?.startsWith('/vendor/education');
  const isMediaPath = pathname?.startsWith('/vendor/media');
  const isCreativePath = pathname?.startsWith('/vendor/creative');
  const isMosquePath = pathname?.startsWith('/vendor/mosque');
  const isOrganizationPath = pathname?.startsWith('/vendor/organization');
  const isProfessionalPath = pathname?.startsWith('/vendor/professional');
  const isFamilyTreePath = pathname?.startsWith('/family-tree');

  const getSidebar = () => {
    // During hydration, return a placeholder or the default sidebar 
    // to match server-side null pathname logic if necessary.
    // However, FamilyTreeSidebar is now more stable.
    if (isAdminPath) return <AdminSidebar />;
    if (isButcherPath) return <ButcherSidebar />;
    if (isGroceryPath) return <GrocerySidebar />;
    if (isEventsPath) return <EventsSidebar />;
    if (isCateringPath) return <CateringSidebar />;
    if (isHotelPath) return <HotelSidebar />;
    if (isTravelPath) return <TravelSidebar />;
    if (isFashionPath) return <FashionSidebar />;
    if (isCosmeticsPath) return <CosmeticsSidebar />;
    if (isFinancePath) return <FinanceSidebar />;
    if (isHealthcarePath) return <HealthcareSidebar />;
    if (isEducationPath) return <EducationSidebar />;
    if (isMediaPath) return <MediaSidebar />;
    if (isCreativePath) return <CreativeSidebar />;
    if (isMosquePath) return <MosqueSidebar />;
    if (isOrganizationPath) return <OrganizationSidebar />;
    if (isProfessionalPath) return <ProfessionalSidebar />;
    if (isFamilyTreePath) return <FamilyTreeSidebar />;
    if (isVendorPath) return <VendorSidebar />;
    return <UserSidebar />;
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-primary/20 overflow-x-hidden bg-background text-foreground">
        <ThemeProvider>
        <AuthProvider>
        <PrayerSettingsProvider>
        <FavoritesProvider>
        <SavedBusinessesProvider>
        <SidebarProvider defaultOpen={false}>
          <div className="flex min-h-screen w-full bg-background">
            {getSidebar()}
            
            <div className="flex flex-1 flex-col overflow-hidden relative">
              <header className="sticky top-0 z-20 glass px-4 sm:px-6 py-4 flex items-center justify-between border-b border-border/60 shadow-soft-sm">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="text-muted-foreground hover:text-primary transition-colors duration-200 h-10 w-10" />
                  <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-glow-primary transition-transform duration-200 group-hover:scale-105">
                      <MessageSquare className="h-5 w-5 fill-current" />
                    </div>
                    <span className="text-xl font-semibold text-primary font-headline tracking-tight whitespace-nowrap hidden sm:block">Halal Hub</span>
                  </Link>
                </div>

                {!isAdminPath && !isVendorPath && !isFamilyTreePath && <HeaderSearch />}

                <div className="flex items-center gap-4">
                  <HeaderLocation />
                  <Link href="/account/dashboard">
                    <Avatar className="h-10 w-10 border-2 border-card shadow-soft hover:shadow-soft-md transition-shadow duration-200 ring-2 ring-primary/10">
                      <AvatarImage src="https://picsum.photos/seed/user/100/100" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Link>
                </div>
              </header>

              <main className="flex-1 overflow-y-auto relative bg-background">
                <div className="max-w-[1440px] mx-auto pb-24 md:pb-8">
                  {children}
                </div>
              </main>

              {!isAdminPath && !isVendorPath && (
                <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-[400px]">
                  <div className="glass-strong border border-border/60 rounded-full h-16 shadow-soft-lg flex items-center justify-around px-2 ring-1 ring-black/5 dark:ring-white/10">
                    <Link href="/" className={`press p-3 rounded-full transition-all duration-200 ${mounted && pathname === '/' ? 'text-primary bg-primary/10 scale-110' : 'text-muted-foreground'}`}>
                      <Home className="h-6 w-6" />
                    </Link>
                    <Link href="/feed" className={`press p-3 rounded-full transition-all duration-200 ${mounted && pathname === '/feed' ? 'text-primary bg-primary/10 scale-110' : 'text-muted-foreground'}`}>
                      <Newspaper className="h-6 w-6" />
                    </Link>
                    <Link href="/categories" className={`press p-3 rounded-full transition-all duration-200 ${mounted && pathname?.startsWith('/categories') ? 'text-primary bg-primary/10 scale-110' : 'text-muted-foreground'}`}>
                      <List className="h-6 w-6" />
                    </Link>
                    <Link href="/community" className={`press p-3 rounded-full transition-all duration-200 ${mounted && pathname === '/community' ? 'text-primary bg-primary/10 scale-110' : 'text-muted-foreground'}`}>
                      <Globe className="h-6 w-6" />
                    </Link>
                    <Link href="/account/dashboard" className={`press p-3 rounded-full transition-all duration-200 ${mounted && pathname?.startsWith('/account') ? 'text-primary bg-primary/10 scale-110' : 'text-muted-foreground'}`}>
                      <User className="h-6 w-6" />
                    </Link>
                  </div>
                </nav>
              )}
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
        </SavedBusinessesProvider>
        </FavoritesProvider>
        </PrayerSettingsProvider>
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
