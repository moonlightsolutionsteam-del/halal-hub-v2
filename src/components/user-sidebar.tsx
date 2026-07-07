
"use client"

import * as React from "react"
import {
  UserCircle,
  Shield,
  Briefcase,
  User,
  MapPin,
  List,
  FileText,
  Mail,
  Star,
  Share2,
  Settings,
  HelpCircle,
  Sun,
  LogOut,
  X,
  Globe,
  PlusCircle,
  BookOpen,
  Newspaper,
  Moon,
  Coins,
  Bookmark
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HalalHubMark } from "@/components/brand"

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
import { useTheme } from "@/lib/theme-context"
import { useAuth } from "@/hooks/use-auth"

export function UserSidebar() {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()
  const { theme, toggleTheme } = useTheme()
  const { signOut } = useAuth()

  const mainItems = [
    { title: "Website", icon: Globe, url: "/welcome" },
    { title: "User profile", icon: UserCircle, url: "/account/dashboard" },
    { title: "Super Admin", icon: Shield, url: "/admin/dashboard", iconColor: "text-red-500" },
  ];

  const partnerItems = [
    { title: "Feed", icon: Newspaper, url: "/feed" },
    { title: "Manage Your Business", icon: Briefcase, url: "/partner/portal" },
    { title: "Creator Studio", icon: User, url: "/vendor/creative/dashboard" },
  ];

  const faithItems = [
    { title: "Prayer Times", icon: Moon, url: "/prayer-times" },
    { title: "Quran", icon: BookOpen, url: "/quran" },
    { title: "Zakat Calculator", icon: Coins, url: "/zakat" },
    { title: "99 Names of Allah", icon: Star, url: "/asma-ul-husna" },
  ];

  const generalItems = [
    { title: "Saved Places", icon: Bookmark, url: "/saved" },
    { title: "Suggest a Place", icon: PlusCircle, url: "/suggest" },
    { title: "My Suggestions", icon: List, url: "/account/suggestions" },
    { title: "Journal & Blog", icon: BookOpen, url: "/blog" },
    { title: "Terms & Privacy", icon: FileText, url: "/terms" },
    { title: "Contact Us", icon: Mail, url: "/contact" },
    { title: "Help Center", icon: HelpCircle, url: "/help" },
    { title: "Settings", icon: Settings, url: "/account/settings" },
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-card">
      <SidebarHeader className="p-6 flex flex-row items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <HalalHubMark className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-primary font-headline tracking-tight">Halal Hub</span>
        </Link>
        <button onClick={() => setOpenMobile(false)} className="md:hidden text-muted-foreground">
          <X className="h-5 w-5" />
        </button>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-card">
        <SidebarGroup>
          <SidebarMenu>
            {mainItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="h-12 font-bold rounded-lg text-foreground hover:bg-muted">
                  <Link href={item.url}>
                    <item.icon className={`h-6 w-6 mr-4 ${item.iconColor || 'text-foreground'}`} />
                    <span className="text-base">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-4 text-[11px] font-black uppercase text-muted-foreground tracking-widest mb-4">For Partners</SidebarGroupLabel>
          <SidebarMenu>
            {partnerItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="h-12 font-bold rounded-lg text-foreground hover:bg-muted">
                  <Link href={item.url}>
                    <item.icon className="h-6 w-6 mr-4 text-foreground" />
                    <span className="text-base">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-4 text-[11px] font-black uppercase text-muted-foreground tracking-widest mb-4">Faith</SidebarGroupLabel>
          <SidebarMenu>
            {faithItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="h-12 font-bold rounded-lg text-foreground hover:bg-muted">
                  <Link href={item.url}>
                    <item.icon className="h-5 w-5 mr-4 text-foreground" />
                    <span className="text-sm">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-4 text-[11px] font-black uppercase text-muted-foreground tracking-widest mb-4">Switch Role (Dev)</SidebarGroupLabel>
          <div className="px-2 space-y-1">
            <Link href="/dev/role/consumer" className="block w-full text-left px-6 py-3 text-sm font-bold text-foreground hover:bg-muted rounded-2xl transition-colors">Consumer</Link>
            <Link href="/dev/role/creator" className="block w-full text-left px-6 py-3 text-sm font-bold text-foreground hover:bg-muted rounded-2xl transition-colors">Creator</Link>
            <Link href="/dev/role/vendor" className="block w-full text-left px-6 py-3 text-sm font-bold text-amber-900 bg-amber-50 rounded-2xl transition-colors">Business Owner</Link>
          </div>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-4 text-[11px] font-black uppercase text-muted-foreground tracking-widest mb-4">General</SidebarGroupLabel>
          <SidebarMenu>
            {generalItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="h-12 font-bold rounded-lg text-foreground hover:bg-muted">
                  <Link href={item.url}>
                    <item.icon className="h-5 w-5 mr-4 text-foreground" />
                    <span className="text-sm">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            
            <SidebarMenuItem>
              <div className="flex items-center justify-between px-2 h-12">
                <div className="flex items-center">
                  <Sun className="h-5 w-5 mr-4 text-foreground" />
                  <span className="text-sm font-bold text-foreground">Dark Mode</span>
                </div>
                <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
              </div>
            </SidebarMenuItem>

            <SidebarMenuItem className="mt-4">
              <SidebarMenuButton onClick={() => signOut()} className="h-12 font-bold rounded-lg text-foreground hover:bg-muted">
                <LogOut className="h-5 w-5 mr-4 text-foreground" />
                <span className="text-sm">Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t bg-muted/50 flex flex-row items-center gap-4">
        <div className="h-10 w-10 bg-zinc-900 rounded-full flex items-center justify-center text-white font-black text-xs">N</div>
        <span className="text-xs font-bold text-muted-foreground ml-auto">Version 1.0.0</span>
      </SidebarFooter>
    </Sidebar>
  )
}
