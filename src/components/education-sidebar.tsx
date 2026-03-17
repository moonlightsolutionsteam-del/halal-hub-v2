
"use client"

import * as React from "react"
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  Star,
  Tag,
  ShieldCheck,
  Image as ImageIcon,
  Headset,
  Settings,
  ExternalLink,
  Library,
  Wallet,
  UserCircle,
  CheckCircle2
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

export function EducationSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/vendor/education/dashboard" },
    { title: "Institution Profile", icon: UserCircle, url: "/vendor/education/profile" },
    { title: "Students & Enrollment", icon: Users, url: "/vendor/education/students" },
    { title: "Courses & Curriculum", icon: BookOpen, url: "/vendor/education/curriculum" },
    { title: "Class Schedules", icon: Calendar, url: "/vendor/education/schedule" },
    { title: "Fees & Finance", icon: Wallet, url: "/vendor/education/finance" },
    { title: "Reviews", icon: Star, url: "/vendor/education/reviews" },
    { title: "Support Center", icon: Headset, url: "/vendor/education/support" },
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-white">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/education/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-violet-200">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-slate-900 font-headline tracking-tight">Education Panel</span>
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
                  className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50 data-[active=true]:bg-violet-600 data-[active=true]:text-white transition-all"
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
        <Link href="/" className="flex items-center gap-3 text-violet-600 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-10 w-10 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 font-black text-xs">IK</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">Iman Knowledge Acad.</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
