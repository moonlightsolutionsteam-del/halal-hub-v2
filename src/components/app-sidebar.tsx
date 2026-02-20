
"use client"

import * as React from "react"
import {
  Utensils,
  CheckCircle,
  Clock,
  Compass,
  Map,
  MessageSquare,
  CalendarDays,
  Home,
  Menu,
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
} from "@/components/ui/sidebar"

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Restaurants", url: "/restaurants", icon: Utensils },
  { title: "Product Verifier", url: "/verifier", icon: CheckCircle },
  { title: "Prayer Times", url: "/prayer-times", icon: Clock },
  { title: "Qibla Finder", url: "/qibla", icon: Compass },
  { title: "Travel Guide", url: "/travel", icon: Map },
  { title: "Community", url: "/community", icon: MessageSquare },
  { title: "Events", url: "/events", icon: CalendarDays },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Compass className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight group-data-[collapsible=icon]:hidden font-headline text-primary">
            HalalSphere
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
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
         <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold">JD</div>
            <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">Premium User</span>
            </div>
         </div>
      </SidebarFooter>
    </Sidebar>
  )
}
