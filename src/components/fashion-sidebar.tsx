
"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Shirt,
  ShoppingBag,
  Package,
  Truck,
  Users,
  Tag,
  Star,
  Image as ImageIcon,
  Settings,
  Headset,
  ExternalLink,
  PlusCircle,
  TrendingUp,
  UserCircle,
  ChevronDown,
  PenTool,
  BookOpen,
  Heart,
  Wallet,
  ShieldCheck,
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

export function FashionSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toolGroups = [
    {
      title: "Operations",
      icon: ShoppingBag,
      items: [
        { title: "Product Catalog", icon: Shirt, url: "/vendor/fashion/products" },
        { title: "Orders & Shipping", icon: ShoppingBag, url: "/vendor/fashion/orders" },
        { title: "Inventory Status", icon: Package, url: "/vendor/fashion/inventory" },
      ]
    },
    {
      title: "Engagement",
      icon: PenTool,
      items: [
        { title: "Brand Posts", icon: PenTool, url: "/vendor/fashion/engagement/posts" },
        { title: "Fashion Blog", icon: BookOpen, url: "/vendor/fashion/engagement/blog" },
        { title: "Customer Reviews", icon: Star, url: "/vendor/fashion/reviews" },
      ]
    },
    {
      title: "Marketing",
      icon: Tag,
      items: [
        { title: "Offers & Promos", icon: Tag, url: "/vendor/fashion/offers" },
        { title: "Loyalty Hub", icon: Heart, url: "/vendor/fashion/marketing/loyalty" },
        { title: "Collaborate", icon: Users, url: "/vendor/fashion/marketing/collaborate" },
      ]
    },
    {
      title: "Brand Account",
      icon: Settings,
      items: [
        { title: "Brand Profile", icon: UserCircle, url: "/vendor/fashion/profile" },
        { title: "Wallet & Billing", icon: Wallet, url: "/vendor/fashion/account/wallet" },
        { title: "Lookbooks Gallery", icon: ImageIcon, url: "/vendor/fashion/gallery" },
        { title: "Support Center", icon: Headset, url: "/vendor/fashion/support" },
      ]
    }
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-white">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/fashion/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-pink-200">
            <Shirt className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-slate-900 font-headline tracking-tight">Fashion Panel</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-white">
        <SidebarMenu className="space-y-1 mb-4">
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={mounted && pathname === "/vendor/fashion/dashboard"} 
              className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50 data-[active=true]:bg-pink-600 data-[active=true]:text-white transition-all"
            >
              <Link href="/vendor/fashion/dashboard">
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
                  <SidebarMenuButton className="h-10 font-bold text-pink-600 bg-pink-50/50 rounded-lg hover:bg-pink-50 transition-colors">
                    <group.icon className="h-4 w-4 mr-3" />
                    <span className="text-sm">{group.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-pink-100">
                    {group.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={mounted && pathname === sub.url}
                          className="h-9 font-bold text-slate-500 rounded-lg hover:text-pink-600 hover:bg-pink-50 transition-all"
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
        <Link href="/" className="flex items-center gap-3 text-pink-600 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-pink-600 rounded-full flex items-center justify-center text-white font-black text-xs">MA</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">Modest Attire Co.</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
