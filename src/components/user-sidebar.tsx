
"use client"

import * as React from "react"
import {
  Home,
  UtensilsCrossed,
  ShieldCheck,
  Compass,
  Globe,
  Moon,
  Calendar,
  Settings,
  LayoutDashboard,
  UserCircle,
  MessageSquare,
  Gift,
  Search
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

export function UserSidebar() {
  const pathname = usePathname()

  const mainItems = [
    { title: "Dashboard", icon: Home, url: "/" },
    { title: "Dining Guide", icon: UtensilsCrossed, url: "/restaurants" },
    { title: "AI Verifier", icon: ShieldCheck, url: "/verifier" },
    { title: "Map & Travel", icon: Compass, url: "/travel" },
    { title: "Prayer Times", icon: Moon, url: "/prayer-times" },
  ];

  const communityItems = [
    { title: "Community Forum", icon: Globe, url: "/community" },
    { title: "Events", icon: Calendar, url: "/events" },
    { title: "Rewards", icon: Gift, url: "/account/dashboard" },
  ];

  const personalItems = [
    { title: "My Profile", icon: UserCircle, url: "/account/dashboard" },
    { title: "Settings", icon: Settings, url: "/account/settings" },
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-white">
      <SidebarHeader className="p-6 border-b">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <MessageSquare className="h-5 w-5 fill-current" />
          </div>
          <span className="font-black text-xl text-primary font-headline tracking-tight">Halal Hub</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Discovery</SidebarGroupLabel>
          <SidebarMenu>
            {mainItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.url} className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50 data-[active=true]:bg-emerald-50 data-[active=true]:text-primary">
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4 mr-3" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest mt-4 mb-2">Connect</SidebarGroupLabel>
          <SidebarMenu>
            {communityItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.url} className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50 data-[active=true]:bg-emerald-50 data-[active=true]:text-primary">
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4 mr-3" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest mt-4 mb-2">Personal</SidebarGroupLabel>
          <SidebarMenu>
            {personalItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.url} className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50 data-[active=true]:bg-emerald-50 data-[active=true]:text-primary">
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4 mr-3" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t bg-slate-50/50">
        <div className="flex items-center gap-3 text-slate-400 cursor-pointer hover:text-primary transition-colors">
          <div className="h-8 w-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-black text-xs">JD</div>
          <span className="text-sm font-bold">John Doe</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
