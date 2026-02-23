"use client"

import * as React from "react"
import {
  UtensilsCrossed,
  ShieldCheck,
  Compass,
  Map,
  MessageSquare,
  Home,
  Users,
  Briefcase,
  Heart,
  LayoutDashboard,
  Building2,
  CheckSquare,
  Package,
  BarChart3,
  Shield,
  FileText,
  Settings,
  Grid,
  Moon,
  Calendar,
  Newspaper,
  BookOpen,
  Medal,
  Gift
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

const mainServices = [
  { title: "Home Hub", url: "/", icon: Home },
  { title: "Dining Guide", url: "/restaurants", icon: UtensilsCrossed },
  { title: "Halal Verifier", url: "/verifier", icon: ShieldCheck },
  { title: "Marketplace", url: "/categories", icon: Gift },
  { title: "Directory", url: "/categories", icon: Grid },
]

const exploreItems = [
  { title: "Map & Travel", url: "/travel", icon: Map },
  { title: "Prayer Times", url: "/prayer-times", icon: Moon },
  { title: "Community", url: "/community", icon: Users },
  { title: "Events", url: "/events", icon: Calendar },
  { title: "News Feed", url: "/community", icon: Newspaper },
]

const lifestyleItems = [
  { title: "Family Hub", url: "/categories", icon: Heart },
  { title: "Professionals", url: "/categories", icon: Briefcase },
  { title: "Charity", url: "/categories", icon: BookOpen },
  { title: "Rewards", url: "/account/dashboard", icon: Medal },
  { title: "My Journey", url: "/account/dashboard", icon: LayoutDashboard },
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
          <SidebarGroupLabel>Main Services</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainServices.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon className={pathname === item.url ? "text-primary" : ""} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Explore</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {exploreItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon className={pathname === item.url ? "text-primary" : ""} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Lifestyle</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {lifestyleItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon className={pathname === item.url ? "text-primary" : ""} />
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
         <div className="flex items-center gap-3 group-data-[collapsible=icon]:hidden bg-muted/50 p-3 rounded-2xl hover:bg-muted transition-colors cursor-pointer">
            <Avatar className="h-9 w-9 border-2 border-primary/20">
                <AvatarImage src="https://picsum.photos/seed/user/50/50" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 leading-none">John Doe</span>
                <span className="text-[10px] text-primary font-black uppercase mt-1">Premium Member</span>
            </div>
         </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
