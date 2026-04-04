
"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Network,
  Users,
  ShieldCheck,
  FileText,
  History,
  Settings,
  UserPlus,
  GitBranch,
  ChevronDown,
  ExternalLink,
  Search,
  Users2,
  Lock,
  Globe,
  Award,
  ClipboardList,
  Calendar,
  Sparkles,
  Heart,
  Utensils,
  Target,
  Zap,
  Wallet
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

const FamilyTreeIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v8" />
    <path d="m16 12-4-4-4 4" />
    <rect width="8" height="4" x="8" y="12" rx="1" />
    <path d="M12 16v6" />
    <path d="M8 22h8" />
  </svg>
);

export function FamilyTreeSidebar() {
  const pathname = usePathname()

  const hubGroups = [
    {
      title: "Coordination",
      icon: LayoutDashboard,
      items: [
        { title: "Dashboard", icon: LayoutDashboard, url: "/family-tree" },
        { title: "Family Board", icon: ClipboardList, url: "/family-tree/board" },
        { title: "Family Expenses", icon: Wallet, url: "/family-tree/expenses" },
        { title: "Events Planner", icon: Calendar, url: "/family-tree/events" },
        { title: "Halal Discovery", icon: Sparkles, url: "/family-tree/discovery" },
      ]
    },
    {
      title: "Living & Growth",
      icon: Zap,
      items: [
        { title: "Goals & Wellness", icon: Target, url: "/family-tree/goals" },
        { title: "Heritage Kitchen", icon: Utensils, url: "/family-tree/kitchen" },
      ]
    },
    {
      title: "Lineage & Preservation",
      icon: GitBranch,
      items: [
        { title: "Ancestry Roots", icon: Network, url: "/family-tree/lineage/roots" },
        { title: "Member Directory", icon: Users, url: "/family-tree/lineage/members" },
        { title: "Document Vault", icon: FileText, url: "/family-tree/lineage/documents" },
        { title: "Heritage Logs", icon: History, url: "/family-tree/lineage/history" },
      ]
    },
    {
      title: "Settings",
      icon: Settings,
      items: [
        { title: "Hub Configuration", icon: Settings, url: "/family-tree/setup" },
        { title: "Privacy & Roles", icon: Lock, url: "/family-tree/privacy-roles" },
      ]
    }
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-white">
      <SidebarHeader className="p-6 border-b">
        <Link href="/family-tree" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <FamilyTreeIcon className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-slate-900 font-headline tracking-tight">Family Hub</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-white">
        {hubGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-emerald-600 bg-emerald-50/50 rounded-lg hover:bg-emerald-50 transition-colors">
                    <group.icon className="h-4 w-4 mr-3" />
                    <span className="text-sm">{group.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-emerald-100">
                    {group.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={pathname === sub.url}
                          className="h-9 font-bold text-slate-500 rounded-lg hover:text-emerald-600 hover:bg-emerald-50 transition-all"
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
        <Link href="/account/dashboard" className="flex items-center gap-3 text-emerald-600 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-black text-xs">SA</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">Super Admin</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit Family Hub</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
