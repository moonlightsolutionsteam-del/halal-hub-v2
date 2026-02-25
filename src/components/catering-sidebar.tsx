
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
  UserCircle,
  ChevronDown
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function CateringSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toolGroups = [
    {
      title: "Operations",
      icon: Utensils,
      items: [
        { title: "Dashboard", icon: LayoutDashboard, url: "/vendor/catering/dashboard" },
        { title: "Menu Items", icon: Utensils, url: "/vendor/catering/menu" },
        { title: "Event Bookings", icon: Calendar, url: "/vendor/catering/bookings" },
        { title: "Proposals", icon: FileText, url: "/vendor/catering/proposals" },
      ]
    },
    {
      title: "Field & Delivery",
      icon: Truck,
      items: [
        { title: "Staffing", icon: Users, url: "/vendor/catering/staff" },
        { title: "Logistics", icon: Truck, url: "/vendor/catering/logistics" },
        { title: "Inquiries", icon: ClipboardList, url: "/vendor/catering/inquiries" },
      ]
    },
    {
      title: "Growth",
      icon: Tag,
      items: [
        { title: "Offers & Promos", icon: Tag, url: "/vendor/catering/offers" },
        { title: "Guest Reviews", icon: Star, url: "/vendor/catering/reviews" },
      ]
    },
    {
      title: "Account",
      icon: Settings,
      items: [
        { title: "Catering Profile", icon: UserCircle, url: "/vendor/catering/profile" },
        { title: "Support Center", icon: Headset, url: "/vendor/catering/support" },
      ]
    }
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-white">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/catering/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Utensils className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-slate-900 font-headline tracking-tight">Catering Panel</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-white">
        {toolGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-blue-600 bg-blue-50/50 rounded-lg hover:bg-blue-50 transition-colors">
                    <group.icon className="h-4 w-4 mr-3" />
                    <span className="text-sm">{group.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-blue-100">
                    {group.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={mounted && pathname === sub.url}
                          className="h-9 font-bold text-slate-500 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all"
                        >
                          <Link href={sub.url}>
                            <sub.icon className="h-4 w-4 mr-3 opacity-60" />
                            <span className="text-[13px]">{sub.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-6 border-t bg-slate-50/50">
        <Link href="/" className="flex items-center gap-3 text-blue-600 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xs">EC</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">Elite Catering</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
