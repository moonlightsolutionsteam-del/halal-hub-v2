"use client"

import * as React from "react"
import {
  User,
  Shield,
  Briefcase,
  MapPin,
  List,
  FileText,
  Mail,
  Star,
  Share2,
  Settings,
  LifeBuoy,
  Sun,
  LogOut,
  Compass,
  X
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
  useSidebar,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function AppSidebar() {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  return (
    <Sidebar variant="sidebar" className="border-r bg-sidebar">
      {/* Header with Logo and Close Button */}
      <SidebarHeader className="p-6 flex flex-row items-center justify-between border-b bg-sidebar">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0">
            <Compass className="h-6 w-6" />
          </div>
          <span className="font-black text-2xl text-primary font-headline tracking-tight whitespace-nowrap">Halal Hub</span>
        </div>
        <button 
          onClick={() => setOpenMobile(false)} 
          className="md:hidden p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6 space-y-4 bg-sidebar">
        {/* Profile & Admin Section */}
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-14 text-lg font-bold hover:bg-muted/50 rounded-xl px-4">
                <Link href="/account/settings">
                  <User className="h-6 w-6 mr-3 text-slate-700" />
                  <span>User profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-14 text-lg font-bold hover:bg-muted/50 rounded-xl px-4">
                <Link href="/admin/dashboard">
                  <Shield className="h-6 w-6 mr-3 text-red-500" />
                  <span>Super Admin</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Partners Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground/60 mb-2">For Partners</SidebarGroupLabel>
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-14 text-lg font-bold hover:bg-muted/50 rounded-xl px-4">
                <Link href="/vendor/dashboard">
                  <Briefcase className="h-6 w-6 mr-3 text-slate-700" />
                  <span>Manage Your Business</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-14 text-lg font-bold hover:bg-muted/50 rounded-xl px-4">
                <Link href="/community">
                  <User className="h-6 w-6 mr-3 text-slate-700" />
                  <span>Creator Studio</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <div className="h-px bg-muted mx-4 my-2" />

        {/* Developer Role Switch */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground/60 mb-4">Switch Role (Dev)</SidebarGroupLabel>
          <div className="px-4 flex flex-col gap-6">
            <button className="text-left font-black text-[17px] text-slate-800 hover:text-primary transition-colors">Consumer</button>
            <button className="text-left font-black text-[17px] text-slate-800 hover:text-primary transition-colors">Creator</button>
            <button className="text-left font-black text-[17px] text-slate-800 hover:text-primary transition-colors">Business Owner</button>
          </div>
        </SidebarGroup>

        <div className="h-px bg-muted mx-4 my-2" />

        {/* General Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground/60 mb-2">General</SidebarGroupLabel>
          <SidebarMenu className="gap-1">
            {[
              { title: "Suggest a Place", icon: MapPin, url: "#" },
              { title: "My Suggestions", icon: List, url: "#" },
              { title: "Terms & Privacy", icon: FileText, url: "#" },
              { title: "Contact Us", icon: Mail, url: "#" },
              { title: "Rate Us", icon: Star, url: "#" },
              { title: "Share App", icon: Share2, url: "#" },
              { title: "Settings", icon: Settings, url: "/account/settings" },
              { title: "Help", icon: LifeBuoy, url: "#" },
            ].map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="h-12 text-lg font-bold hover:bg-muted/50 rounded-xl px-4">
                  <Link href={item.url}>
                    <item.icon className="h-6 w-6 mr-3 text-slate-700" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            
            {/* Dark Mode Switch */}
            <SidebarMenuItem>
              <div className="flex items-center justify-between h-12 px-4">
                <div className="flex items-center gap-3 font-bold text-lg text-slate-800">
                  <Sun className="h-6 w-6 text-slate-700" />
                  <span>Dark Mode</span>
                </div>
                <Switch />
              </div>
            </SidebarMenuItem>

            {/* Logout */}
            <SidebarMenuItem className="mt-4">
              <SidebarMenuButton className="h-14 text-lg font-bold text-slate-800 hover:bg-muted/50 rounded-xl px-4">
                <LogOut className="h-6 w-6 mr-3 text-slate-700" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with Version and User Initial */}
      <SidebarFooter className="p-6 border-t bg-sidebar/50 flex flex-row items-center justify-between gap-4">
        <div className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
          <span className="font-bold text-lg">N</span>
        </div>
        <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-60">Version 1.0.0</span>
      </SidebarFooter>
    </Sidebar>
  )
}