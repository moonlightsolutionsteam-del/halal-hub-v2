"use client"

import * as React from 'react';
import { usePathname } from 'next/navigation';
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
import { CertificationBodySidebar } from "@/components/certification-body-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { HeaderLocation } from "@/components/header-location";
import { HeaderSearch } from "@/components/header-search";
import { ThemeProvider } from "@/lib/theme-context";
import { PrayerSettingsProvider } from "@/lib/prayer-context";
import { FavoritesProvider } from "@/lib/favorites-context";
import { SavedBusinessesProvider } from "@/lib/saved-businesses-context";
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/hooks/use-auth";
import { Home, Moon, User, LayoutGrid, Newspaper } from "lucide-react";
import { HalalHubMark } from "@/components/brand";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import { useLoginCoins, LEVEL_ICONS, getConsumerLevel } from "@/lib/use-login-coins";
import { useToast } from "@/hooks/use-toast";

function getInitials(name: string | null | undefined): string {
  if (!name) return "?";
  return name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

// Invisible component — fires award_login_coins once per day and toasts the result
function LoginCoinsGrant() {
  const result = useLoginCoins();
  const { toast } = useToast();
  const toastedRef = React.useRef(false);

  React.useEffect(() => {
    if (!result || result.alreadyAwarded || result.coinsAwarded === 0 || toastedRef.current) return;
    toastedRef.current = true;

    const level = getConsumerLevel(result.lifetimeCoins);
    const icon = LEVEL_ICONS[level.level - 1];

    if (result.milestone) {
      toast({
        title: `🔥 ${result.milestone}-day login streak!`,
        description: `+${result.coinsAwarded} Halal Coins — streak milestone bonus included. Keep it up!`,
      });
    } else {
      toast({
        title: `+${result.coinsAwarded} Halal Coins`,
        description: `Daily login reward. ${icon} ${level.name} · ${result.streak}-day streak`,
      });
    }
  }, [result, toast]);

  return null;
}

function HeaderAvatar() {
  const { user } = useAuth();
  return (
    <Link href={user ? "/account/dashboard" : "/login"}>
      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-card shadow-soft hover:shadow-soft-md transition-shadow duration-200 ring-2 ring-primary/10">
        {user?.photoURL && <AvatarImage src={user.photoURL} />}
        <AvatarFallback className="text-xs">{getInitials(user?.name)}</AvatarFallback>
      </Avatar>
    </Link>
  );
}

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDevPreview = pathname === '/dev-preview';
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
  const isCertificationBodyPath = pathname?.startsWith('/vendor/certification-body');
  const isFamilyTreePath = pathname?.startsWith('/family-tree');

  const getSidebar = () => {
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
    if (isCertificationBodyPath) return <CertificationBodySidebar />;
    if (isFamilyTreePath) return <FamilyTreeSidebar />;
    if (isVendorPath) return <VendorSidebar />;
    return <UserSidebar />;
  };

  if (isDevPreview) {
    return (
      <ThemeProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
    <AuthProvider>
    <LoginCoinsGrant />
    <PrayerSettingsProvider>
    <FavoritesProvider>
    <SavedBusinessesProvider>
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full bg-background">
        {getSidebar()}

        <div className="flex flex-1 flex-col overflow-hidden relative min-w-0">
          <header className="sticky top-0 z-20 glass px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between border-b border-border/60 shadow-soft-sm flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <SidebarTrigger className="text-muted-foreground hover:text-primary transition-colors duration-200 h-10 w-10 shrink-0" />
              <Link href="/" className="flex items-center gap-2 group shrink-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-glow-primary transition-transform duration-200 group-hover:scale-105">
                  <HalalHubMark className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-base sm:text-xl font-semibold text-primary font-headline tracking-tight whitespace-nowrap hidden sm:block">Halal Hub</span>
              </Link>
            </div>

            {!isAdminPath && !isVendorPath && !isFamilyTreePath && <HeaderSearch />}

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="hidden sm:block">
                <HeaderLocation />
              </div>
              <ThemeToggleButton />
              <HeaderAvatar />
            </div>
          </header>

          <main className="flex-1 overflow-y-auto relative bg-background">
            <div className="max-w-[1440px] mx-auto pb-28 md:pb-8">
              {children}
            </div>
          </main>

          {!isAdminPath && !isVendorPath && (
            <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-4"
              style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}>
              <div className="glass-strong border border-border/60 rounded-full h-16 shadow-soft-lg flex items-center justify-around px-1 ring-1 ring-black/5 dark:ring-white/10 max-w-[480px] mx-auto">
                {[
                  { href: "/", icon: Home, label: "Home", active: mounted && pathname === '/' },
                  { href: "/feed", icon: Newspaper, label: "Feed", active: mounted && pathname === '/feed' },
                  { href: "/explore", icon: LayoutGrid, label: "Explore", active: mounted && pathname === '/explore' },
                  { href: "/prayer-times", icon: Moon, label: "Prayer", active: mounted && (pathname === '/prayer-times' || pathname?.startsWith('/prayer')) },
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
  );
}
