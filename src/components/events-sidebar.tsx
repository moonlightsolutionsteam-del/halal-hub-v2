
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
  MapPin,
  UserCircle
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
    { title: "Venue Profile", icon: UserCircle, url: "/vendor/events/profile" },
    { title: "Event Packages", icon: Sparkles, url: "/vendor/events/packages" },
    { title: "Bookings & Calendar", icon: Calendar, url: "/vendor/events/bookings" },
    { title: "Tickets & Sales", icon: Ticket, url: "/vendor/events/sales" },
    { title: "Leads & Inquiries", icon: MessageSquare, url: "/vendor/events/leads" },
    { title: "Attendees", icon: Users, url: "/vendor/events/attendees" },
    { title: "Media Gallery", icon: ImageIcon, url: "/vendor/events/gallery" },
    { title: "Reviews", icon: Star, url: "/vendor/events/reviews" },
    { title: "Offers & Promos", icon: Tag, url: "/vendor/events/offers" },
    { title: "Support", icon: Headset, url: "/vendor/events/support" },
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-white">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/events/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-purple-200">
            <Calendar className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-slate-900 font-headline tracking-tight">Events Panel</span>
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
                  className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50 data-[active=true]:bg-purple-600 data-[active=true]:text-white transition-all"
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
        <Link href="/" className="flex items-center gap-3 text-purple-600 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-black text-xs">EV</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">Grand Hall Events</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
