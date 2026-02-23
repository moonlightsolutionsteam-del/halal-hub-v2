"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Building2,
  Calendar,
  Ticket,
  MessageSquare,
  ImageIcon,
  Star,
  Tag,
  Users,
  Settings,
  Headset,
  ExternalLink,
  PlusCircle,
  Sparkles,
  MapPin
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"

export function EventsSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/vendor/events/dashboard" },
    { title: "Venue Profile", icon: Building2, url: "#" },
    { title: "Event Packages", icon: Sparkles, url: "#" },
    { title: "Bookings & Calendar", icon: Calendar, url: "#" },
    { title: "Tickets & Sales", icon: Ticket, url: "#" },
    { title: "Leads & Inquiries", icon: MessageSquare, url: "#" },
    { title: "Attendees", icon: Users, url: "#" },
    { title: "Media Gallery", icon: ImageIcon, url: "#" },
    { title: "Reviews", icon: Star, url: "#" },
    { title: "Offers & Promos", icon: Tag, url: "#" },
    { title: "Locations", icon: MapPin, url: "#" },
    { title: "Settings", icon: Settings, url: "#" },
    { title: "Support", icon: Headset, url: "#" },
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-white">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/events/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Calendar className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-primary font-headline tracking-tight">Events Panel</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-white">
        <SidebarGroup>
          <SidebarMenu className="space-y-1">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === item.url} 
                  className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50 data-[active=true]:bg-primary data-[active=true]:text-white transition-all"
                >
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4 mr-3" />
                    <span className="text-sm">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t bg-slate-50/50">
        <Link href="/" className="flex items-center gap-3 text-primary cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-xs">EV</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">Grand Hall Events</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
