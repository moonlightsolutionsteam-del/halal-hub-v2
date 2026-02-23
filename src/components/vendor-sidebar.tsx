
"use client"

import * as React from "react"
import {
  LayoutDashboard,
  UserCircle,
  Truck,
  UtensilsCrossed,
  QrCode,
  Smartphone,
  ClipboardList,
  CalendarDays,
  Receipt,
  Share2,
  PenTool,
  BookOpen,
  MessageSquare,
  Star,
  MapPin,
  Calendar,
  Tag,
  Users2,
  Heart,
  ShieldCheck,
  Wallet,
  Award,
  Headset,
  Package,
  ChevronDown,
  ExternalLink,
  PlusCircle,
  TrendingUp,
  Settings
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

export function VendorSidebar() {
  const pathname = usePathname()

  const toolGroups = [
    {
      title: "Restaurant Tools",
      icon: UtensilsCrossed,
      items: [
        { title: "Menu Items", icon: UtensilsCrossed, url: "/vendor/products" },
        { title: "QR Menu Generator", icon: QrCode, url: "#" },
        { title: "Digital Table Ordering", icon: Smartphone, url: "#" },
        { title: "Order Management", icon: ClipboardList, url: "#" },
        { title: "Dining Reservations", icon: CalendarDays, url: "#" },
        { title: "Digital Bills", icon: Receipt, url: "#" },
      ]
    },
    {
      title: "Engagement",
      icon: Share2,
      items: [
        { title: "Posts", icon: PenTool, url: "#" },
        { title: "Blog", icon: BookOpen, url: "#" },
        { title: "Enquiry", icon: MessageSquare, url: "#" },
        { title: "Reviews", icon: Star, url: "#" },
        { title: "Check-ins", icon: MapPin, url: "#" },
      ]
    },
    {
      title: "Marketing",
      icon: TrendingUp,
      items: [
        { title: "Events", icon: Calendar, url: "/events" },
        { title: "Offers", icon: Tag, url: "#" },
        { title: "Collaborate", icon: Users2, url: "#" },
        { title: "Loyalty", icon: Heart, url: "#" },
        { title: "Trust & Transparency", icon: ShieldCheck, url: "#" },
      ]
    },
    {
      title: "Account",
      icon: Settings,
      items: [
        { title: "Wallet & Billing", icon: Wallet, url: "#" },
        { title: "Certificates", icon: Award, url: "/vendor/verification" },
        { title: "Request Services", icon: Package, url: "#" },
        { title: "Support", icon: Headset, url: "#" },
      ]
    }
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-white">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <UtensilsCrossed className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-primary font-headline tracking-tight">Restaurant Panel</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-white">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/vendor/dashboard"} className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50 data-[active=true]:bg-primary data-[active=true]:text-white">
              <Link href="/vendor/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-3" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/vendor/profile"} className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50">
              <Link href="/vendor/profile">
                <UserCircle className="h-4 w-4 mr-3" />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50">
              <Link href="#">
                <Package className="h-4 w-4 mr-3" />
                <span>Sourcing</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {toolGroups.map((group) => (
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
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton asChild isActive={pathname === sub.url} className="h-9 font-bold text-slate-500 rounded-lg hover:text-primary hover:bg-primary/5 transition-all">
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

        <SidebarGroup>
          <Collapsible className="group/collapsible-delivery">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="h-10 font-bold text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                  <Truck className="h-4 w-4 mr-3" />
                  <span>Delivery Management</span>
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible-delivery:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenu className="ml-4 mt-1 border-l border-slate-100">
                  <SidebarMenuItem>
                    <SidebarMenuButton className="h-9 font-bold text-slate-500 rounded-lg">
                      <LayoutDashboard className="h-4 w-4 mr-3 opacity-60" />
                      <span className="text-[13px]">Overview</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t bg-slate-50/50">
        <Link href="/" className="flex items-center gap-3 text-primary cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white font-black text-xs">BK</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">Bosphorus Kitchen</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
