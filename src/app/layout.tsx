
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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#04A15A" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
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

            <div className="flex flex-1 flex-col overflow-hidden relative min-w-0">
              {/* Header — compact on mobile, expanded on desktop */}
              <header className="sticky top-0 z-20 glass px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between border-b border-border/60 shadow-soft-sm flex-shrink-0">
                <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                  <SidebarTrigger className="text-muted-foreground hover:text-primary transition-colors duration-200 h-10 w-10 shrink-0" />
                  <Link href="/" className="flex items-center gap-2 group shrink-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-glow-primary transition-transform duration-200 group-hover:scale-105">
                      <MessageSquare className="h-4 w-4 sm:h-5 sm:h-5 fill-current" />
                    </div>
                    <span className="text-base sm:text-xl font-semibold text-primary font-headline tracking-tight whitespace-nowrap hidden sm:block">Halal Hub</span>
                  </Link>
                </div>

                {!isAdminPath && !isVendorPath && !isFamilyTreePath && <HeaderSearch />}

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  {/* Location hidden on smallest screens to save space */}
                  <div className="hidden sm:block">
                    <HeaderLocation />
                  </div>
                  <Link href="/account/dashboard">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-card shadow-soft hover:shadow-soft-md transition-shadow duration-200 ring-2 ring-primary/10">
                      <AvatarImage src="https://picsum.photos/seed/user/100/100" />
                      <AvatarFallback className="text-xs">JD</AvatarFallback>
                    </Avatar>
                  </Link>
                </div>
              </header>

              <main className="flex-1 overflow-y-auto relative bg-background">
                <div className="max-w-[1440px] mx-auto pb-28 md:pb-8">
                  {children}
                </div>
              </main>

              {/* Bottom navigation — mobile only, pill style with safe-area support */}
              {!isAdminPath && !isVendorPath && (
                <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-4"
                  style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}>
                  <div className="glass-strong border border-border/60 rounded-full h-16 shadow-soft-lg flex items-center justify-around px-1 ring-1 ring-black/5 dark:ring-white/10 max-w-[480px] mx-auto">
                    {[
                      { href: "/", icon: Home, label: "Home", active: mounted && pathname === '/' },
                      { href: "/feed", icon: Newspaper, label: "Feed", active: mounted && pathname === '/feed' },
                      { href: "/categories", icon: List, label: "Browse", active: mounted && pathname?.startsWith('/categories') },
                      { href: "/community", icon: Globe, label: "Community", active: mounted && pathname === '/community' },
                      { href: "/account/dashboard", icon: User, label: "Me", active: mounted && pathname?.startsWith('/account') },
                    ].map(({ href, icon: Icon, label, active }) => (
                      <Link key={href} href={href}
                        className={`press flex flex-col items-center justify-center gap-0.5 flex-1 h-full rounded-full transition-all duration-200 ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                        <Icon className={`h-5 w-5 transition-transform duration-200 ${active ? 'scale-110' : ''}`} />
                        <span className={`text-[9px] font-black uppercase tracking-wide leading-none ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
                      </Link>
                    ))}
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
