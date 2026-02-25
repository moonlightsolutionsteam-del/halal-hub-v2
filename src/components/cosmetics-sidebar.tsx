
"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Sparkles,
  ShoppingBag,
  Package,
  ShieldCheck,
  Star,
  Tag,
  Users,
  Settings,
  Headset,
  ExternalLink,
  TrendingUp,
  Image as ImageIcon,
  UserCircle,
  ChevronDown,
  PenTool,
  BookOpen,
  MessageSquare,
  Heart,
  Wallet,
  FlaskConical,
  Beaker
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

export function CosmeticsSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toolGroups = [
    {
      title: "Store Ops",
      icon: ShoppingBag,
      items: [
        { title: "Product Catalog", icon: Package, url: "/vendor/cosmetics/products" },
        { title: "Order Tracking", icon: ShoppingBag, url: "/vendor/cosmetics/orders" },
        { title: "Inventory", icon: LayersIcon, url: "/vendor/cosmetics/inventory" },
      ]
    },
    {
      title: "Engagement",
      icon: PenTool,
      items: [
        { title: "Social Posts", icon: PenTool, url: "/vendor/cosmetics/engagement/posts" },
        { title: "Beauty Blog", icon: BookOpen, url: "/vendor/cosmetics/engagement/blog" },
        { title: "Inquiries", icon: MessageSquare, url: "/vendor/cosmetics/engagement/enquiry" },
        { title: "Brand Reviews", icon: Star, url: "/vendor/cosmetics/engagement/reviews" },
      ]
    },
    {
      title: "Marketing",
      icon: TrendingUp,
      items: [
        { title: "Offers & Deals", icon: Tag, url: "/vendor/cosmetics/marketing/offers" },
        { title: "Beauty Loyalty", icon: Heart, url: "/vendor/cosmetics/marketing/loyalty" },
        { title: "Influencer Collabs", icon: Users, url: "/vendor/cosmetics/marketing/collaborate" },
        { title: "Lab Transparency", icon: FlaskConical, url: "/vendor/cosmetics/marketing/transparency" },
      ]
    },
    {
      title: "Brand Account",
      icon: Settings,
      items: [
        { title: "Wallet & Payouts", icon: Wallet, url: "/vendor/cosmetics/account/wallet" },
        { title: "Lab Certs", icon: ShieldCheck, url: "/vendor/cosmetics/documents" },
        { title: "Visual Gallery", icon: ImageIcon, url: "/vendor/cosmetics/gallery" },
        { title: "Support", icon: Headset, url: "/vendor/cosmetics/support" },
      ]
    }
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-white">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/cosmetics/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-rose-200">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-slate-900 font-headline tracking-tight">Beauty Panel</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-white">
        <SidebarMenu className="space-y-1 mb-4">
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={mounted && pathname === "/vendor/cosmetics/dashboard"} 
              className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50 data-[active=true]:bg-rose-600 data-[active=true]:text-white transition-all"
            >
              <Link href="/vendor/cosmetics/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-3" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={mounted && pathname === "/vendor/cosmetics/profile"} 
              className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50 data-[active=true]:bg-rose-600 data-[active=true]:text-white transition-all"
            >
              <Link href="/vendor/cosmetics/profile">
                <UserCircle className="h-4 w-4 mr-3" />
                <span>Brand Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {toolGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-rose-600 bg-rose-50/50 rounded-lg hover:bg-rose-50 transition-colors">
                    <group.icon className="h-4 w-4 mr-3" />
                    <span className="text-sm">{group.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-rose-100">
                    {group.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={mounted && pathname === sub.url}
                          className="h-9 font-bold text-slate-500 rounded-lg hover:text-rose-600 hover:bg-rose-50 transition-all"
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
        <Link href="/" className="flex items-center gap-3 text-rose-600 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-rose-600 rounded-full flex items-center justify-center text-white font-black text-xs">CP</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">Pure Glow Beauty</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}

function LayersIcon(props: any) {
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
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m2.6 11.08 8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9" />
      <path d="m2.6 15.08 8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9" />
    </svg>
  )
}
