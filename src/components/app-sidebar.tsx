
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

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Dining Guide", url: "/restaurants", icon: UtensilsCrossed },
  { title: "Halal Verifier", url: "/verifier", icon: ShieldCheck },
  { title: "Marketplace", url: "/market", icon: Store },
  { title: "Directory", url: "/directory", icon: List },
]

const exploreItems = [
  { title: "Map & Travel", url: "/travel", icon: Map },
  { title: "Prayer Times", url: "/prayer-times", icon: Clock },
  { title: "Community", url: "/community", icon: MessageSquare },
  { title: "Events", url: "/events", icon: CalendarDays },
  { title: "News Feed", url: "/feed", icon: Newspaper },
]

const lifestyleItems = [
  { title: "Family Hub", url: "/family", icon: Users },
  { title: "Professionals", url: "/pro", icon: Briefcase },
  { title: "Charity", url: "/charity", icon: Heart },
  { title: "Rewards", url: "/rewards", icon: Gift },
  { title: "My Journey", url: "/journey", icon: Medal },
  { title: "Blog", url: "/blog", icon: BookOpen },
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
                  HalalSphere
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
              {mainItems.map((item) => (
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
                <span className="text-[10px] text-primary font-black uppercase">Premium Member</span>
            </div>
         </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
