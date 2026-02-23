"use client"

import * as React from "react"
import {
  UtensilsCrossed,
  ShieldCheck,
  Map,
  Home,
  Users,
  Briefcase,
  Heart,
  LayoutDashboard,
  Grid,
  Moon,
  Calendar,
  Newspaper,
  BookOpen,
  Medal,
  Gift,
  Compass
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarHeader,
} from "@/components/ui/sidebar"

const sidebarItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Dining", url: "/restaurants", icon: UtensilsCrossed },
  { title: "Verifier", url: "/verifier", icon: ShieldCheck },
  { title: "Marketplace", url: "/categories", icon: Gift },
  { title: "Directory", url: "/categories", icon: Grid },
  { title: "Map", url: "/travel", icon: Map },
  { title: "Prayer", url: "/prayer-times", icon: Moon },
  { title: "Community", url: "/community", icon: Users },
  { title: "Events", url: "/events", icon: Calendar },
  { title: "News", url: "/community", icon: Newspaper },
  { title: "Family", url: "/categories", icon: Heart },
  { title: "Professionals", url: "/categories", icon: Briefcase },
  { title: "Charity", url: "/categories", icon: BookOpen },
  { title: "Rewards", url: "/account/dashboard", icon: Medal },
  { title: "Journey", url: "/account/dashboard", icon: LayoutDashboard },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r bg-white/50 backdrop-blur-sm">
      <SidebarHeader className="md:hidden p-6 border-b bg-primary/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Compass className="h-6 w-6" />
          </div>
          <span className="font-black text-xl text-primary font-headline tracking-tight">Halal Hub</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="py-4 px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className="h-11 w-full md:w-10 flex items-center md:justify-center rounded-xl transition-all duration-200 hover:bg-primary/10 hover:text-primary data-[active=true]:bg-primary data-[active=true]:text-white data-[active=true]:shadow-lg data-[active=true]:shadow-primary/20 gap-3 px-4 md:px-0"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span className="md:hidden font-bold text-sm tracking-tight">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
