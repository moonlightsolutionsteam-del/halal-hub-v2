
"use client"

import * as React from "react"
import {
  LayoutDashboard,
  UserCircle,
  Package,
  ShieldCheck,
  Image as ImageIcon,
  Truck,
  Tag,
  Star,
  PlusCircle,
  Headset,
  ExternalLink,
  ChevronDown,
  ClipboardList,
  Heart,
  Users2,
  PenTool,
  BookOpen,
  Wallet,
  Settings
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

const MeatIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.5 2a2.5 2.5 0 0 0-2.5 2.5V6a3 3 0 0 0 3 3h1a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3h-1a3 3 0 0 1-3-3v-1.5" />
    <path d="M15 22a7 7 0 0 0 7-7c0-2.5-2-4.5-4.5-4.5h-1a2.5 2.5 0 0 0-2.5 2.5V15a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-1" />
    <circle cx="15" cy="15" r="1" />
  </svg>
);

export function ButcherSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toolGroups = [
    {
      title: "Inventory & Orders",
      icon: Package,
      items: [
        { title: "Meat Inventory", icon: Package, url: "/vendor/butcher/products" },
        { title: "Shop Orders", icon: ClipboardList, url: "/vendor/butcher/orders" },
        { title: "Delivery Logistics", icon: Truck, url: "/vendor/butcher/delivery" },
      ]
    },
    {
      title: "Engagement",
      icon: PenTool,
      items: [
        { title: "Social Posts", icon: PenTool, url: "/vendor/butcher/engagement/posts" },
        { title: "Butcher Blog", icon: BookOpen, url: "/vendor/butcher/engagement/blog" },
        { title: "Customer Reviews", icon: Star, url: "/vendor/butcher/reviews" },
      ]
    },
    {
      title: "Marketing",
      icon: Tag,
      items: [
        { title: "Offers & Promos", icon: Tag, url: "/vendor/butcher/offers" },
        { title: "Loyalty Program", icon: Heart, url: "/vendor/butcher/marketing/loyalty" },
        { title: "Collaborate", icon: Users2, url: "/vendor/butcher/marketing/collaborate" },
        { title: "Trust Hub", icon: ShieldCheck, url: "/vendor/butcher/marketing/transparency" },
      ]
    },
    {
      title: "Shop Account",
      icon: Settings,
      items: [
        { title: "Wallet & Billing", icon: Wallet, url: "/vendor/butcher/account/wallet" },
        { title: "Source Documents", icon: ShieldCheck, url: "/vendor/butcher/documents" },
        { title: "Media Gallery", icon: ImageIcon, url: "/vendor/butcher/gallery" },
        { title: "Support Center", icon: Headset, url: "/vendor/butcher/support" },
      ]
    }
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-white">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/butcher/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-red-200">
            <MeatIcon className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-slate-900 font-headline tracking-tight">Butcher Panel</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-white">
        <SidebarMenu className="space-y-1 mb-4">
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={mounted && pathname === "/vendor/butcher/dashboard"} 
              className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50 data-[active=true]:bg-red-600 data-[active=true]:text-white transition-all"
            >
              <Link href="/vendor/butcher/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-3" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={mounted && pathname === "/vendor/butcher/profile"} 
              className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50 data-[active=true]:bg-red-600 data-[active=true]:text-white transition-all"
            >
              <Link href="/vendor/butcher/profile">
                <UserCircle className="h-4 w-4 mr-3" />
                <span>Shop Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {toolGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-red-600 bg-red-50/50 rounded-lg hover:bg-red-50 transition-colors">
                    <group.icon className="h-4 w-4 mr-3" />
                    <span className="text-sm">{group.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-red-100">
                    {group.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={mounted && pathname === sub.url}
                          className="h-9 font-bold text-slate-500 rounded-lg hover:text-red-600 hover:bg-red-50 transition-all"
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
        <Link href="/" className="flex items-center gap-3 text-red-600 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-xs">MB</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">Meat Bar Butcher</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
