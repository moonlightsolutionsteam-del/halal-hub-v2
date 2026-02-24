
"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Utensils,
  Calendar,
  FileText,
  Users,
  Truck,
  Star,
  Tag,
  Settings,
  Headset,
  ExternalLink,
  PlusCircle,
  ClipboardList,
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

const CateringIcon = Utensils;

export function CateringSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/vendor/catering/dashboard" },
    { title: "Menu Management", icon: Utensils, url: "#" },
    { title: "Catering Profile", icon: UserCircle, url: "/vendor/catering/profile" },
    { title: "Booking Calendar", icon: Calendar, url: "#" },
    { title: "Proposals & Invoices", icon: FileText, url: "#" },
    { title: "Inquiries", icon: ClipboardList, url: "#" },
    { title: "Staffing", icon: Users, url: "#" },
    { title: "Logistics & Delivery", icon: Truck, url: "#" },
    { title: "Offers & Promos", icon: Tag, url: "#" },
    { title: "Reviews", icon: Star, url: "#" },
    { title: "Settings", icon: Settings, url: "#" },
    { title: "Support", icon: Headset, url: "#" },
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-white">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/catering/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <CateringIcon className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-primary font-headline tracking-tight">Catering Panel</span>
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
          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-xs">CS</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">Elite Catering Co.</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
