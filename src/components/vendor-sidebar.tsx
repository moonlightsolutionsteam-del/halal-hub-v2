
"use client"

import * as React from "react"
import {
  LayoutDashboard, UserCircle, Truck, UtensilsCrossed, QrCode, Smartphone,
  ClipboardList, CalendarDays, Receipt, Share2, PenTool, BookOpen,
  MessageSquare, Star, MapPin, Calendar, Tag, Users2, Heart, ShieldCheck,
  Wallet, Award, Headset, Package, ChevronDown, ExternalLink, PlusCircle,
  TrendingUp, Settings, Zap, Beef, CookingPot, Plane, Hotel, ShoppingBag,
  Sparkles, GraduationCap, Stethoscope, Landmark, Library, Building2,
  Briefcase, ImageIcon, FileText, Users, DollarSign, BarChart2, Layers,
  BookMarked, Megaphone, Gift, HandHeart, Globe, Mic2, PlayCircle, Boxes,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

type NavItem = { title: string; icon: React.ElementType; url: string }
type NavGroup = { title: string; icon: React.ElementType; items: NavItem[] }
type VerticalConfig = { label: string; icon: React.ElementType; primaryTools: NavGroup }

function getCategoryVertical(cat: string | null): string {
  const c = (cat ?? "").toLowerCase()
  if (c.includes("mosque") || c.includes("masjid") || c.includes("islamic centre") || c.includes("islamic center")) return "mosque"
  if (c.includes("hotel") || c.includes("homestay") || c.includes("resort") || c.includes("accommodation")) return "hotel"
  if (c.includes("restaurant") || c.includes("food & dining")) return "restaurant"
  if (c.includes("catering")) return "catering"
  if (c.includes("meat") || c.includes("butcher")) return "butcher"
  if (c.includes("grocery") || c.includes("supermarket")) return "grocery"
  if (c.includes("fashion") || c.includes("modest wear")) return "fashion"
  if (c.includes("cosmetic") || c.includes("beauty") || c.includes("personal care")) return "cosmetics"
  if (c.includes("education") || c.includes("training") || c.includes("school")) return "education"
  if (c.includes("health") || c.includes("wellness") || c.includes("clinic") || c.includes("healing")) return "healthcare"
  if (c.includes("finance") || c.includes("banking")) return "finance"
  if (c.includes("travel") || c.includes("tourism")) return "travel"
  if (c.includes("event")) return "events"
  if (c.includes("book") || c.includes("media") || c.includes("library")) return "media"
  if (c.includes("organisation") || c.includes("organization") || c.includes("charity") || c.includes("ngo")) return "organization"
  if (c.includes("professional") || c.includes("freelancer") || c.includes("consultant")) return "professional"
  return "restaurant"
}

const VERTICAL_CONFIGS: Record<string, VerticalConfig> = {
  restaurant: {
    label: "Restaurant Panel",
    icon: UtensilsCrossed,
    primaryTools: {
      title: "Restaurant Tools", icon: UtensilsCrossed,
      items: [
        { title: "Menu Items", icon: UtensilsCrossed, url: "/vendor/products" },
        { title: "Order Management", icon: ClipboardList, url: "/vendor/orders" },
        { title: "Dining Reservations", icon: CalendarDays, url: "/vendor/reservations" },
        { title: "QR Menu Generator", icon: QrCode, url: "/vendor/tools/qr-menu" },
        { title: "Digital Table Ordering", icon: Smartphone, url: "/vendor/tools/table-ordering" },
        { title: "Digital Bills", icon: Receipt, url: "/vendor/tools/bills" },
        { title: "Delivery Mgt", icon: Truck, url: "/vendor/delivery" },
      ],
    },
  },
  butcher: {
    label: "Butcher Panel",
    icon: Beef,
    primaryTools: {
      title: "Butcher Tools", icon: Beef,
      items: [
        { title: "Meat Products", icon: Boxes, url: "/vendor/butcher/products" },
        { title: "Orders", icon: ClipboardList, url: "/vendor/butcher/orders" },
        { title: "Offers", icon: Tag, url: "/vendor/butcher/offers" },
        { title: "Delivery Management", icon: Truck, url: "/vendor/butcher/delivery" },
        { title: "Gallery", icon: ImageIcon, url: "/vendor/butcher/gallery" },
        { title: "Documents & Certs", icon: FileText, url: "/vendor/butcher/documents" },
      ],
    },
  },
  catering: {
    label: "Catering Panel",
    icon: CookingPot,
    primaryTools: {
      title: "Catering Tools", icon: CookingPot,
      items: [
        { title: "Menu & Packages", icon: UtensilsCrossed, url: "/vendor/catering/menu" },
        { title: "Bookings", icon: CalendarDays, url: "/vendor/catering/bookings" },
        { title: "Inquiries", icon: MessageSquare, url: "/vendor/catering/inquiries" },
        { title: "Proposals", icon: FileText, url: "/vendor/catering/proposals" },
        { title: "Staff Management", icon: Users, url: "/vendor/catering/staff" },
        { title: "Logistics", icon: Truck, url: "/vendor/catering/logistics" },
        { title: "Offers", icon: Tag, url: "/vendor/catering/offers" },
      ],
    },
  },
  events: {
    label: "Events Panel",
    icon: Calendar,
    primaryTools: {
      title: "Events Tools", icon: Calendar,
      items: [
        { title: "Packages", icon: Package, url: "/vendor/events/packages" },
        { title: "Bookings", icon: CalendarDays, url: "/vendor/events/bookings" },
        { title: "Leads", icon: Users, url: "/vendor/events/leads" },
        { title: "Attendees", icon: Users2, url: "/vendor/events/attendees" },
        { title: "Gallery", icon: ImageIcon, url: "/vendor/events/gallery" },
        { title: "Offers", icon: Tag, url: "/vendor/events/offers" },
        { title: "Sales", icon: BarChart2, url: "/vendor/events/sales" },
      ],
    },
  },
  travel: {
    label: "Travel Panel",
    icon: Plane,
    primaryTools: {
      title: "Travel Tools", icon: Plane,
      items: [
        { title: "Packages", icon: Globe, url: "/vendor/travel/packages" },
        { title: "Bookings", icon: CalendarDays, url: "/vendor/travel/bookings" },
        { title: "Leads", icon: Users, url: "/vendor/travel/leads" },
        { title: "Partners", icon: Briefcase, url: "/vendor/travel/partners" },
        { title: "Gallery", icon: ImageIcon, url: "/vendor/travel/gallery" },
        { title: "Offers", icon: Tag, url: "/vendor/travel/offers" },
      ],
    },
  },
  hotel: {
    label: "Hotel Panel",
    icon: Hotel,
    primaryTools: {
      title: "Hotel Tools", icon: Hotel,
      items: [
        { title: "Rooms", icon: Layers, url: "/vendor/hotel/rooms" },
        { title: "Bookings", icon: CalendarDays, url: "/vendor/hotel/bookings" },
        { title: "Guests", icon: Users, url: "/vendor/hotel/guests" },
        { title: "Amenities", icon: Sparkles, url: "/vendor/hotel/amenities" },
        { title: "Gallery", icon: ImageIcon, url: "/vendor/hotel/gallery" },
        { title: "Offers", icon: Tag, url: "/vendor/hotel/offers" },
        { title: "Venue Packages", icon: Package, url: "/vendor/hotel/venue/packages" },
        { title: "Venue Leads", icon: Users2, url: "/vendor/hotel/venue/leads" },
      ],
    },
  },
  grocery: {
    label: "Grocery Panel",
    icon: ShoppingBag,
    primaryTools: {
      title: "Grocery Tools", icon: ShoppingBag,
      items: [
        { title: "Inventory", icon: Boxes, url: "/vendor/grocery/inventory" },
        { title: "Orders", icon: ClipboardList, url: "/vendor/grocery/orders" },
        { title: "Delivery", icon: Truck, url: "/vendor/grocery/delivery" },
        { title: "Offers", icon: Tag, url: "/vendor/grocery/marketing/offers" },
        { title: "Gallery", icon: ImageIcon, url: "/vendor/grocery/gallery" },
        { title: "Bills", icon: Receipt, url: "/vendor/grocery/bills" },
        { title: "Documents", icon: FileText, url: "/vendor/grocery/documents" },
      ],
    },
  },
  fashion: {
    label: "Fashion Panel",
    icon: Sparkles,
    primaryTools: {
      title: "Fashion Tools", icon: Sparkles,
      items: [
        { title: "Products", icon: Boxes, url: "/vendor/fashion/products" },
        { title: "Inventory", icon: Layers, url: "/vendor/fashion/inventory" },
        { title: "Orders", icon: ClipboardList, url: "/vendor/fashion/orders" },
        { title: "Gallery", icon: ImageIcon, url: "/vendor/fashion/gallery" },
        { title: "Offers", icon: Tag, url: "/vendor/fashion/offers" },
      ],
    },
  },
  cosmetics: {
    label: "Cosmetics Panel",
    icon: Sparkles,
    primaryTools: {
      title: "Cosmetics Tools", icon: Sparkles,
      items: [
        { title: "Products", icon: Boxes, url: "/vendor/cosmetics/products" },
        { title: "Inventory", icon: Layers, url: "/vendor/cosmetics/inventory" },
        { title: "Orders", icon: ClipboardList, url: "/vendor/cosmetics/orders" },
        { title: "Gallery", icon: ImageIcon, url: "/vendor/cosmetics/gallery" },
        { title: "Offers", icon: Tag, url: "/vendor/cosmetics/marketing/offers" },
        { title: "Documents", icon: FileText, url: "/vendor/cosmetics/documents" },
      ],
    },
  },
  education: {
    label: "Education Panel",
    icon: GraduationCap,
    primaryTools: {
      title: "Education Tools", icon: GraduationCap,
      items: [
        { title: "Curriculum", icon: BookOpen, url: "/vendor/education/curriculum" },
        { title: "Students", icon: Users, url: "/vendor/education/students" },
        { title: "Schedule", icon: CalendarDays, url: "/vendor/education/schedule" },
        { title: "Finance", icon: DollarSign, url: "/vendor/education/finance" },
        { title: "Offers", icon: Tag, url: "/vendor/education/offers" },
      ],
    },
  },
  healthcare: {
    label: "Healthcare Panel",
    icon: Stethoscope,
    primaryTools: {
      title: "Healthcare Tools", icon: Stethoscope,
      items: [
        { title: "Services", icon: Package, url: "/vendor/healthcare/services" },
        { title: "Appointments", icon: CalendarDays, url: "/vendor/healthcare/appointments" },
        { title: "Patients", icon: Users, url: "/vendor/healthcare/patients" },
        { title: "Records", icon: FileText, url: "/vendor/healthcare/records" },
        { title: "Staff", icon: Users2, url: "/vendor/healthcare/staff" },
        { title: "Gallery", icon: ImageIcon, url: "/vendor/healthcare/account/gallery" },
        { title: "Offers", icon: Tag, url: "/vendor/healthcare/offers" },
        { title: "Documents", icon: BookMarked, url: "/vendor/healthcare/account/documents" },
      ],
    },
  },
  finance: {
    label: "Finance Panel",
    icon: Landmark,
    primaryTools: {
      title: "Finance Tools", icon: Landmark,
      items: [
        { title: "Products", icon: Package, url: "/vendor/finance/products" },
        { title: "Leads & Clients", icon: Users, url: "/vendor/finance/leads" },
        { title: "Transactions", icon: Receipt, url: "/vendor/finance/transactions" },
        { title: "Portfolio", icon: BarChart2, url: "/vendor/finance/portfolio" },
        { title: "Compliance", icon: ShieldCheck, url: "/vendor/finance/compliance" },
        { title: "KYC", icon: FileText, url: "/vendor/finance/kyc" },
        { title: "Reports", icon: BarChart2, url: "/vendor/finance/reports" },
        { title: "Offers", icon: Tag, url: "/vendor/finance/offers" },
      ],
    },
  },
  media: {
    label: "Books & Media Panel",
    icon: Library,
    primaryTools: {
      title: "Media Tools", icon: Library,
      items: [
        { title: "Inventory", icon: Boxes, url: "/vendor/media/inventory" },
        { title: "Orders", icon: ClipboardList, url: "/vendor/media/orders" },
        { title: "Authors", icon: PenTool, url: "/vendor/media/authors" },
        { title: "Digital Content", icon: PlayCircle, url: "/vendor/media/digital" },
        { title: "Licenses", icon: FileText, url: "/vendor/media/licenses" },
        { title: "Gallery", icon: ImageIcon, url: "/vendor/media/gallery" },
        { title: "Offers", icon: Tag, url: "/vendor/media/offers" },
      ],
    },
  },
  mosque: {
    label: "Mosque Panel",
    icon: Building2,
    primaryTools: {
      title: "Mosque Tools", icon: Building2,
      items: [
        { title: "Salat Times", icon: CalendarDays, url: "/vendor/mosque/salat" },
        { title: "Programs", icon: BookOpen, url: "/vendor/mosque/programs" },
        { title: "Events", icon: Calendar, url: "/vendor/mosque/events" },
        { title: "Announcements", icon: Megaphone, url: "/vendor/mosque/announcements" },
        { title: "Donations", icon: HandHeart, url: "/vendor/mosque/donations" },
        { title: "Leadership", icon: Users2, url: "/vendor/mosque/leadership" },
        { title: "Gallery", icon: ImageIcon, url: "/vendor/mosque/gallery" },
        { title: "Services", icon: Package, url: "/vendor/mosque/services" },
        { title: "Musalli Dashboard", icon: Users, url: "/vendor/mosque/musalli-dashboard" },
        { title: "Flyers", icon: FileText, url: "/vendor/mosque/flyers" },
        { title: "Connect TV", icon: Mic2, url: "/vendor/mosque/connect-tv" },
        { title: "Web Widgets", icon: Globe, url: "/vendor/mosque/web-widgets" },
        { title: "Documents", icon: BookMarked, url: "/vendor/mosque/documents" },
      ],
    },
  },
  organization: {
    label: "Organisation Panel",
    icon: Building2,
    primaryTools: {
      title: "Organisation Tools", icon: Building2,
      items: [
        { title: "Services", icon: Package, url: "/vendor/organization/services" },
        { title: "Events", icon: Calendar, url: "/vendor/organization/events" },
        { title: "Announcements", icon: Megaphone, url: "/vendor/organization/announcements" },
        { title: "Donations", icon: HandHeart, url: "/vendor/organization/donations" },
        { title: "Gallery", icon: ImageIcon, url: "/vendor/organization/gallery" },
        { title: "Documents", icon: FileText, url: "/vendor/organization/documents" },
      ],
    },
  },
  professional: {
    label: "Professional Panel",
    icon: Briefcase,
    primaryTools: {
      title: "Professional Tools", icon: Briefcase,
      items: [
        { title: "Portfolio", icon: ImageIcon, url: "/vendor/professional/portfolio" },
        { title: "Services", icon: Package, url: "/vendor/professional/services" },
        { title: "Bookings", icon: CalendarDays, url: "/vendor/professional/bookings" },
        { title: "Collaborations", icon: Users2, url: "/vendor/professional/collaborations" },
        { title: "Jobs & Opportunities", icon: Briefcase, url: "/vendor/professional/jobs" },
        { title: "Analytics", icon: BarChart2, url: "/vendor/professional/analytics" },
        { title: "Messages", icon: MessageSquare, url: "/vendor/professional/messages" },
        { title: "Posts", icon: PenTool, url: "/vendor/professional/posts" },
        { title: "Blog", icon: BookOpen, url: "/vendor/professional/blog" },
        { title: "Testimonials", icon: Star, url: "/vendor/professional/testimonials" },
        { title: "Verification", icon: ShieldCheck, url: "/vendor/professional/verification" },
      ],
    },
  },
}

const SHARED_GROUPS: NavGroup[] = [
  {
    title: "Engagement", icon: Share2,
    items: [
      { title: "Posts", icon: PenTool, url: "/vendor/engagement/posts" },
      { title: "Blog", icon: BookOpen, url: "/vendor/engagement/blog" },
      { title: "Enquiry", icon: MessageSquare, url: "/vendor/engagement/enquiry" },
      { title: "Reviews", icon: Star, url: "/vendor/engagement/reviews" },
      { title: "Check-ins", icon: MapPin, url: "/vendor/engagement/check-ins" },
    ],
  },
  {
    title: "Marketing & Growth", icon: TrendingUp,
    items: [
      { title: "Buy Credits", icon: Zap, url: "/vendor/credits/pricing" },
      { title: "Events", icon: Calendar, url: "/vendor/marketing/events" },
      { title: "Offers", icon: Tag, url: "/vendor/marketing/offers" },
      { title: "Collaborate", icon: Users2, url: "/vendor/marketing/collaborate" },
      { title: "Loyalty", icon: Heart, url: "/vendor/marketing/loyalty" },
      { title: "Trust & Transparency", icon: ShieldCheck, url: "/vendor/marketing/transparency" },
    ],
  },
  {
    title: "Account", icon: Settings,
    items: [
      { title: "Wallet & Billing", icon: Wallet, url: "/vendor/account/wallet" },
      { title: "Certifications", icon: Award, url: "/vendor/verification" },
      { title: "Request Services", icon: Package, url: "/vendor/account/services" },
      { title: "Support", icon: Headset, url: "/vendor/account/support" },
    ],
  },
]

export function VendorSidebar() {
  const pathname = usePathname()
  const { user, loading: authLoading } = useAuth()
  const [bizName, setBizName] = React.useState<string | null>(null)
  const [vertical, setVertical] = React.useState<string>("restaurant")

  React.useEffect(() => {
    if (authLoading || !user?.uid) return
    const supabase = createClient()
    supabase
      .from("businesses")
      .select("name, category")
      .eq("owner_id", user.uid)
      .limit(1)
      .maybeSingle()
      .then(({ data }: { data: { name: string; category: string | null } | null }) => {
        if (!data) return
        setBizName(data.name)
        setVertical(getCategoryVertical(data.category))
      })
  }, [user?.uid, authLoading])

  const config = VERTICAL_CONFIGS[vertical] ?? VERTICAL_CONFIGS.restaurant
  const PanelIcon = config.icon
  const allGroups = [config.primaryTools, ...SHARED_GROUPS]

  return (
    <Sidebar variant="sidebar" className="border-r bg-card">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <PanelIcon className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-primary font-headline tracking-tight">{config.label}</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-card">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/vendor/dashboard"} className="h-10 font-bold rounded-lg text-muted-foreground hover:bg-muted data-[active=true]:bg-primary data-[active=true]:text-white">
              <Link href="/vendor/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-3" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.endsWith("/profile")} className="h-10 font-bold rounded-lg text-muted-foreground hover:bg-muted">
              <Link href="/vendor/profile">
                <UserCircle className="h-4 w-4 mr-3" />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {allGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
                    <group.icon className="h-4 w-4 mr-3" />
                    <span>{group.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-primary/10">
                    {group.items.map((sub) => (
                      <SidebarMenuItem key={sub.url}>
                        <SidebarMenuButton asChild isActive={pathname === sub.url} className="h-9 font-bold text-muted-foreground rounded-lg hover:text-primary hover:bg-primary/5 transition-all">
                          <Link href={sub.url}>
                            <sub.icon className="h-4 w-4 mr-3 opacity-60" />
                            <span className="text-[13px]">{sub.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-6 border-t bg-muted/50">
        <Link href="/" className="flex items-center gap-3 text-primary cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white font-black text-xs">
            {(bizName ?? "BZ")[0]}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-foreground truncate">{bizName ?? "Your Business"}</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40 shrink-0" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
