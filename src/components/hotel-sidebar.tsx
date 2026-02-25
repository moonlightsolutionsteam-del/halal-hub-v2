"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Bed,
  Calendar,
  Users,
  Star,
  Tag,
  ShieldCheck,
  Image as ImageIcon,
  Headset,
  Settings,
  ExternalLink,
  Coffee,
  Wallet,
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

export function HotelSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toolGroups = [
    {
      title: "Operations",
      icon: Bed,
      items: [
        { title: "Dashboard", icon: LayoutDashboard, url: "/vendor/hotel/dashboard" },
        { title: "Room Mgt", icon: Bed, url: "/vendor/hotel/rooms" },
        { title: "Bookings", icon: Calendar, url: "/vendor/hotel/bookings" },
        { title: "Guest List", icon: Users, url: "/vendor/hotel/guests" },
      ]
    },
    {
      title: "Property Experience",
      icon: SparklesIcon,
      items: [
        { title: "Amenities & Food", icon: Coffee, url: "/vendor/hotel/amenities" },
        { title: "Media Gallery", icon: ImageIcon, url: "/vendor/hotel/gallery" },
        { title: "Reviews", icon: Star, url: "/vendor/hotel/reviews" },
      ]
    },
    {
      title: "Growth & Finance",
      icon: Tag,
      items: [
        { title: "Offers & Promos", icon: Tag, url: "/vendor/hotel/offers" },
        { title: "Wallet & Billing", icon: Wallet, url: "/vendor/hotel/account/wallet" },
      ]
    },
    {
      title: "Property Admin",
      icon: Settings,
      items: [
        { title: "Property Profile", icon: UserCircle, url: "/vendor/hotel/profile" },
        { title: "Support Center", icon: Headset, url: "/vendor/hotel/support" },
      ]
    }
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-white">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/hotel/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-sky-200">
            <Bed className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-slate-900 font-headline tracking-tight">Hotel Panel</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-white">
        {toolGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-sky-600 bg-sky-50/50 rounded-lg hover:bg-sky-50 transition-colors">
                    <group.icon className="h-4 w-4 mr-3" />
                    <span className="text-sm">{group.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-sky-100">
                    {group.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={mounted && pathname === sub.url}
                          className="h-9 font-bold text-slate-500 rounded-lg hover:text-sky-600 hover:bg-sky-50 transition-all"
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
        <Link href="/" className="flex items-center gap-3 text-sky-600 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-sky-600 rounded-full flex items-center justify-center text-white font-black text-xs">RH</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">Royal Halal Suites</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}

function SparklesIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  )
}
