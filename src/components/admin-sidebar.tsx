
"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  PenTool,
  Building,
  Church,
  CheckSquare,
  Rss,
  Gift,
  MapPin,
  Image as ImageIcon,
  Network,
  Globe,
  Store,
  Calendar,
  Users2,
  Database,
  Settings,
  ExternalLink,
  ChevronDown,
  UtensilsCrossed,
  ShoppingCart,
  CookingPot,
  Sparkles,
  Hotel,
  Plane,
  Shirt,
  CircleDollarSign,
  Stethoscope,
  GraduationCap,
  BookOpen,
  Wrench,
  LayoutGrid,
  Ticket,
  Users as AttendeesIcon,
  Megaphone,
  List,
  BarChart3,
  Headset,
  Bell
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

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

export function AdminSidebar() {
  const pathname = usePathname()

  const platformItems = [
    { title: "Users", icon: Users, url: "/admin/users" },
    { title: "Creators", icon: PenTool, url: "#" },
    { title: "Organizations", icon: Building, url: "#" },
    { title: "Mosques", icon: Church, url: "#" },
    { title: "Verification", icon: CheckSquare, url: "/admin/verification" },
    { title: "Content Feed", icon: Rss, url: "#" },
    { title: "Reward Engine", icon: Gift, url: "#" },
    { title: "Check-ins", icon: MapPin, url: "#" },
    { title: "Reviews & Media", icon: ImageIcon, url: "#" },
    { title: "Family Tree", icon: Network, url: "#" },
    { title: "Community", icon: Globe, url: "/community" },
  ];

  const businessSubItems = [
    { title: "Restaurants", icon: UtensilsCrossed, url: "/restaurants" },
    { title: "Meat Shops", icon: MeatIcon, url: "#" },
    { title: "Grocery", icon: ShoppingCart, url: "#" },
    { title: "Catering", icon: CookingPot, url: "#" },
    { title: "Event Services", icon: Sparkles, url: "#" },
    { title: "Hotels", icon: Hotel, url: "#" },
    { title: "Travel", icon: Plane, url: "/travel" },
    { title: "Fashion", icon: Shirt, url: "#" },
    { title: "Cosmetics", icon: Sparkles, url: "#" },
    { title: "Finance", icon: CircleDollarSign, url: "#" },
    { title: "Healthcare", icon: Stethoscope, url: "#" },
    { title: "Education", icon: GraduationCap, url: "#" },
    { title: "Bookstores", icon: BookOpen, url: "#" },
    { title: "Professionals", icon: Wrench, url: "#" },
  ];

  const eventSubItems = [
    { title: "Dashboard", icon: LayoutGrid, url: "#" },
    { title: "Manage Events", icon: Calendar, url: "/events" },
    { title: "Booking & Tickets", icon: Ticket, url: "#" },
    { title: "Attendees & Check-ins", icon: AttendeesIcon, url: "#" },
    { title: "Event Promotions", icon: Megaphone, url: "#" },
    { title: "Event Categories", icon: List, url: "#" },
    { title: "Analytics", icon: BarChart3, url: "#" },
    { title: "Support & Moderation", icon: Headset, url: "#" },
    { title: "Notifications", icon: Bell, url: "#" },
  ];

  const internalERP = [
    { title: "HR", icon: Users2, url: "#" },
    { title: "CRM", icon: Globe, url: "#" },
    { title: "Marketing", icon: Rss, url: "#" },
    { title: "Accounting", icon: Database, url: "#" },
    { title: "Operations", icon: Settings, url: "#" },
    { title: "Engineering", icon: Database, url: "#" },
  ];

  const systems = [
    { title: "Data & Systems", icon: Database, url: "#" },
    { title: "Settings", icon: Settings, url: "/account/settings" },
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-white">
      <SidebarHeader className="p-6 border-b">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-slate-900 font-headline tracking-tight">Super Admin</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard"} className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50 data-[active=true]:bg-slate-100 data-[active=true]:text-slate-900">
              <Link href="/admin/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-3" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest mt-4 mb-2">Platform</SidebarGroupLabel>
          <SidebarMenu className="px-1">
            {platformItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.url} className="h-9 font-bold text-slate-600 rounded-lg hover:bg-slate-50 data-[active=true]:bg-slate-100 data-[active=true]:text-slate-900">
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4 mr-3 opacity-70" />
                    <span className="text-[13px]">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest mt-4 mb-2">Business Verticals</SidebarGroupLabel>
          <SidebarMenu className="px-1 space-y-1">
            {/* Businesses Collapsible */}
            <Collapsible defaultOpen className="group/collapsible-biz">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100">
                    <Store className="h-4 w-4 mr-3" />
                    <span>Businesses</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible-biz:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-emerald-100">
                    {businessSubItems.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton asChild className="h-9 font-bold text-slate-500 rounded-lg hover:text-emerald-600 hover:bg-emerald-50/50">
                          <Link href={sub.url}>
                            <sub.icon className="h-4 w-4 mr-3 opacity-70" />
                            <span className="text-[13px]">{sub.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* Events Collapsible */}
            <Collapsible defaultOpen className="group/collapsible-evt">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100">
                    <Calendar className="h-4 w-4 mr-3" />
                    <span>Events</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible-evt:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-emerald-100">
                    {eventSubItems.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton asChild className="h-9 font-bold text-slate-500 rounded-lg hover:text-emerald-600 hover:bg-emerald-50/50">
                          <Link href={sub.url}>
                            <sub.icon className="h-4 w-4 mr-3 opacity-70" />
                            <span className="text-[13px]">{sub.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest mt-4 mb-2">Internal ERP</SidebarGroupLabel>
          <SidebarMenu className="px-1">
            {internalERP.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton className="h-9 font-bold text-slate-600 rounded-lg hover:bg-slate-50">
                  <item.icon className="h-4 w-4 mr-3 opacity-70" />
                  <span className="text-[13px]">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest mt-4 mb-2">Systems</SidebarGroupLabel>
          <SidebarMenu className="px-1">
            {systems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton className="h-9 font-bold text-slate-600 rounded-lg hover:bg-slate-50">
                  <item.icon className="h-4 w-4 mr-3 opacity-70" />
                  <span className="text-[13px]">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t bg-slate-50/50">
        <Link href="/" className="flex items-center gap-3 text-red-500 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center text-white font-black text-xs">SA</div>
          <span className="text-sm font-bold">Exit Admin</span>
          <ExternalLink className="h-3 w-3 ml-auto" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
