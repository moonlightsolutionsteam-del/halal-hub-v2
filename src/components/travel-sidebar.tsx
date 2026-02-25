
"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Plane,
  Calendar,
  Users,
  Star,
  Tag,
  ShieldCheck,
  Image as ImageIcon,
  Headset,
  Settings,
  ExternalLink,
  Briefcase,
  Compass,
  FileText,
  UserCircle,
  Wallet,
  ChevronDown,
  Globe,
  MapPin,
  MessageSquare
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

export function TravelSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toolGroups = [
    {
      title: "Operations",
      icon: Compass,
      items: [
        { title: "Tour Packages", icon: Compass, url: "/vendor/travel/packages" },
        { title: "Booking Registry", icon: Calendar, url: "/vendor/travel/bookings" },
        { title: "Partner Network", icon: Briefcase, url: "/vendor/travel/partners" },
      ]
    },
    {
      title: "Growth & CRM",
      icon: Users,
      items: [
        { title: "Enquiries & Leads", icon: MessageSquare, url: "/vendor/travel/leads" },
        { title: "Marketing Offers", icon: Tag, url: "/vendor/travel/offers" },
        { title: "Guest Reviews", icon: Star, url: "/vendor/travel/reviews" },
      ]
    },
    {
      title: "Agency Account",
      icon: Settings,
      items: [
        { title: "Agency Profile", icon: UserCircle, url: "/vendor/travel/profile" },
        { title: "Wallet & Payouts", icon: Wallet, url: "/vendor/travel/account/wallet" },
        { title: "Media Gallery", icon: ImageIcon, url: "/vendor/travel/gallery" },
        { title: "Support Center", icon: Headset, url: "/vendor/travel/support" },
      ]
    }
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-white">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/travel/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-amber-200">
            <Plane className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-slate-900 font-headline tracking-tight">Travel Panel</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-white">
        <SidebarMenu className="space-y-1 mb-4">
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={mounted && pathname === "/vendor/travel/dashboard"} 
              className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50 data-[active=true]:bg-amber-600 data-[active=true]:text-white transition-all"
            >
              <Link href="/vendor/travel/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-3" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {toolGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-amber-600 bg-amber-50/50 rounded-lg hover:bg-amber-50 transition-colors">
                    <group.icon className="h-4 w-4 mr-3" />
                    <span className="text-sm">{group.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-amber-100">
                    {group.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={mounted && pathname === sub.url}
                          className="h-9 font-bold text-slate-500 rounded-lg hover:text-amber-600 hover:bg-amber-50 transition-all"
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
        <Link href="/" className="flex items-center gap-3 text-amber-600 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-black text-xs">ST</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">Saffron Travels</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
