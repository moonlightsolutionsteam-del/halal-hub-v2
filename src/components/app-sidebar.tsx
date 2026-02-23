
"use client"

import * as React from "react"
import {
  UtensilsCrossed,
  ShieldCheck,
  Clock,
  Compass,
  Map,
  MessageSquare,
  CalendarDays,
  Home,
  Store,
  Users,
  Briefcase,
  Heart,
  Gift,
  List,
  Newspaper,
  BookOpen,
  Medal,
  LayoutDashboard,
  Building2,
  CheckSquare,
  Package,
  Tags,
  BarChart3,
  Shield,
  FileText,
  Settings,
  Search,
  Grid
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const userItems = [
  { title: "Home Hub", url: "/", icon: Home },
  { title: "Categories", url: "/categories", icon: Grid },
  { title: "Dining Guide", url: "/restaurants", icon: UtensilsCrossed },
  { title: "Map View", url: "/travel", icon: Map },
  { title: "My Dashboard", url: "/account/dashboard", icon: LayoutDashboard },
]

const vendorItems = [
  { title: "Vendor Dashboard", url: "/vendor/dashboard", icon: LayoutDashboard },
  { title: "Business Profile", url: "/vendor/profile", icon: Building2 },
  { title: "Verification", url: "/vendor/verification", icon: CheckSquare },
  { title: "Products/Services", url: "/vendor/products", icon: Package },
  { title: "Analytics", url: "/vendor/analytics", icon: BarChart3 },
]

const adminItems = [
  { title: "Platform Overview", url: "/admin/dashboard", icon: Shield },
  { title: "User Management", url: "/admin/users", icon: Users },
  { title: "Entity Management", url: "/admin/entities", icon: Building2 },
  { title: "Finance & Payouts", url: "/admin/finance", icon: FileText },
  { title: "System Settings", url: "/admin/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
              <Compass className="h-6 w-6" />
            </div>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="text-xl font-black tracking-tight font-headline text-primary leading-none">
                  Halal Hub
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                  Universal Hub
              </span>
            </div>
          </div>
          <SidebarTrigger className="hidden md:flex ml-auto" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>User Experience</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Vendor Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {vendorItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Admin Center</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
         <div className="flex items-center gap-3 group-data-[collapsible=icon]:hidden bg-muted/50 p-3 rounded-2xl">
            <Avatar className="h-9 w-9 border-2 border-primary/20">
                <AvatarImage src="https://picsum.photos/seed/user/50/50" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="text-sm font-bold">John Doe</span>
                <span className="text-[10px] text-primary font-black uppercase">Super Admin</span>
            </div>
         </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
