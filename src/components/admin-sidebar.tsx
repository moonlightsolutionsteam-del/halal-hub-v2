
"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  PenTool,
  Building,
  Church,
  CheckSquare,
  Rss,
  Gift,
  Moon,
  MapPin,
  Image as ImageIcon,
  Network,
  Globe,
  Store,
  Calendar,
  Users2,
  Database,
  Settings,
  ExternalLink,
  ChevronDown,
  UtensilsCrossed,
  ShoppingCart,
  CookingPot,
  Sparkles,
  Hotel,
  Plane,
  Shirt,
  CircleDollarSign,
  Stethoscope,
  GraduationCap,
  BookOpen,
  Wrench,
  LayoutGrid,
  Ticket,
  Megaphone,
  List,
  BarChart3,
  Headset,
  Bell,
  Target,
  UserPlus,
  CalendarDays,
  Contact,
  Briefcase,
  FileText,
  Phone,
  Share2,
  Wallet,
  Receipt,
  ShieldCheck,
  Search,
  History,
  TrendingUp,
  CreditCard,
  Book,
  HandCoins,
  Percent,
  ArrowUpRight,
  ClipboardList,
  Truck,
  RefreshCw,
  LifeBuoy,
  Library,
  Box,
  Zap,
  Code2,
  Bug,
  Rocket,
  Server,
  HardDrive,
  AlertTriangle,
  Cpu,
  Shield,
  Sliders,
  FolderOpen,
  Award,
  MessageSquare,
  ShieldAlert,
  Scale,
  Banknote,
  HeartHandshake,
  LineChart,
  Package
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

export function AdminSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const directoryItems = [
    { title: "Users", icon: Users, url: "/admin/users" },
    { title: "Creators", icon: PenTool, url: "/admin/creators" },
    { title: "Organizations", icon: Building, url: "/admin/organizations" },
    { title: "Mosques", icon: Church, url: "/admin/mosques" },
    { title: "Professionals", icon: Wrench, url: "/admin/professionals" },
  ];

  const platformGroups = [
    {
      title: "Marketplace",
      icon: Store,
      items: [
        { title: "Seller Applications", icon: Users2, url: "/admin/marketplace/sellers" },
        { title: "Product Moderation", icon: Package, url: "/admin/marketplace/products" },
      ]
    },
    {
      title: "Trust & Safety",
      icon: ShieldCheck,
      items: [
        { title: "Verification", icon: CheckSquare, url: "/admin/verification" },
        { title: "Audit Logs", icon: History, url: "/admin/audit-logs" },
        { title: "Reports", icon: Bell, url: "/admin/enquiry" },
      ]
    },
    {
      title: "Engagement",
      icon: Globe,
      items: [
        { title: "Content Feed", icon: Rss, url: "/admin/feed" },
        { title: "Gamification", icon: Gift, url: "/admin/gamification" },
        { title: "Ramadan Mode", icon: Moon, url: "/admin/ramadan" },
        { title: "Check-ins", icon: MapPin, url: "/admin/check-ins" },
        { title: "Reviews & Media", icon: ImageIcon, url: "/admin/reviews" },
        { title: "Family Tree", icon: Network, url: "/admin/family-tree" },
        { title: "Community", icon: Globe, url: "/community" },
      ]
    }
  ];

  const eventManagementGroup = {
    title: "Events Management",
    icon: Calendar,
    items: [
      { title: "Events Dashboard", icon: LayoutGrid, url: "/admin/events" },
      { title: "Venue Registry", icon: Building, url: "/admin/events" },
      { title: "Ticketing Ops", icon: Ticket, url: "/admin/events" },
      { title: "Moderation", icon: ShieldAlert, url: "/admin/events" },
      { title: "Lead Pipeline", icon: MessageSquare, url: "/admin/events" },
      { title: "Attendee Hub", icon: Users, url: "/admin/events" },
      { title: "Governance", icon: Scale, url: "/admin/events" },
      { title: "Event Reports", icon: BarChart3, url: "/admin/events" },
    ]
  };

  const businessSubItems = [
    { title: "Business Submissions", icon: MessageSquare, url: "/admin/businesses" },
    { title: "Restaurants", icon: UtensilsCrossed, url: "/admin/restaurants" },
    { title: "Meat Shops", icon: MeatIcon, url: "/admin/meat" },
    { title: "Grocery", icon: ShoppingCart, url: "/admin/grocery" },
    { title: "Catering", icon: CookingPot, url: "/admin/catering" },
    { title: "Event Services", icon: Sparkles, url: "/admin/events" },
    { title: "Hotels", icon: Hotel, url: "/admin/hotels" },
    { title: "Travel", icon: Plane, url: "/admin/travel" },
    { title: "Fashion", icon: Shirt, url: "/admin/fashion" },
    { title: "Cosmetics", icon: Sparkles, url: "/admin/cosmetics" },
    { title: "Finance", icon: CircleDollarSign, url: "/admin/finance" },
    { title: "Healthcare", icon: Stethoscope, url: "/admin/healthcare" },
    { title: "Education", icon: GraduationCap, url: "/admin/education" },
    { title: "Bookstores", icon: BookOpen, url: "/admin/media" },
  ];

  const erpGroups = [
    {
      title: "HR",
      icon: Users2,
      items: [
        { title: "Dashboard", icon: LayoutGrid, url: "/admin/erp/hr/dashboard" },
        { title: "Team Directory", icon: Users, url: "/admin/erp/hr/team" },
        { title: "Attendance", icon: CheckSquare, url: "/admin/erp/hr/attendance" },
        { title: "Leaves", icon: CalendarDays, url: "/admin/erp/hr/leaves" },
        { title: "Recruitment", icon: UserPlus, url: "/admin/erp/hr/recruitment" },
        { title: "Performance", icon: BarChart3, url: "/admin/erp/hr/performance" },
        { title: "Payroll", icon: Wallet, url: "/admin/erp/hr/payroll" },
        { title: "Onboarding", icon: Rocket, url: "/admin/erp/hr/onboarding" },
        { title: "Exit Management", icon: ArrowUpRight, url: "/admin/erp/hr/exit" },
        { title: "Training & LMS", icon: GraduationCap, url: "/admin/erp/hr/training" },
        { title: "Benefits", icon: HandCoins, url: "/admin/erp/hr/benefits" },
        { title: "Document Vault", icon: FolderOpen, url: "/admin/erp/hr/documents" },
      ]
    },
    {
      title: "CRM",
      icon: Target,
      items: [
        { title: "Deals / Pipeline", icon: Target, url: "/admin/erp/crm/deals" },
        { title: "Leads", icon: UserPlus, url: "/admin/erp/crm/leads" },
        { title: "Contacts", icon: Contact, url: "/admin/erp/crm/contacts" },
        { title: "Accounts", icon: Briefcase, url: "/admin/erp/crm/accounts" },
        { title: "Tasks", icon: FileText, url: "/admin/erp/crm/tasks" },
        { title: "Meetings", icon: Calendar, url: "/admin/erp/crm/meetings" },
        { title: "Calls", icon: Phone, url: "/admin/erp/crm/calls" },
        { title: "Campaigns", icon: Megaphone, url: "/admin/erp/crm/campaigns" },
        { title: "Reports", icon: BarChart3, url: "/admin/erp/crm/reports" },
      ]
    },
    {
      title: "Marketing",
      icon: Megaphone,
      items: [
        { title: "Dashboard", icon: LayoutGrid, url: "/admin/erp/marketing/dashboard" },
        { title: "Blog", icon: Rss, url: "/admin/erp/marketing/blog" },
        { title: "Campaigns", icon: Megaphone, url: "/admin/erp/marketing/campaigns" },
        { title: "Social Media", icon: Share2, url: "/admin/erp/marketing/social" },
        { title: "Analytics", icon: BarChart3, url: "/admin/erp/marketing/analytics" },
      ]
    },
    {
      title: "Finance",
      icon: Banknote,
      items: [
        { title: "Revenue Dashboard", icon: TrendingUp, url: "/admin/erp/accounting/revenue-dashboard" },
        { title: "MIS Reports", icon: BarChart3, url: "/admin/erp/finance/mis-reports" },
        { title: "Budget Management", icon: Target, url: "/admin/erp/finance/budget" },
        { title: "Cash Flow", icon: TrendingUp, url: "/admin/erp/finance/cash-flow" },
        { title: "Fundraising Pipeline", icon: ArrowUpRight, url: "/admin/erp/finance/fundraising" },
        { title: "Vendor Billing", icon: CreditCard, url: "/admin/erp/accounting/vendor-billing" },
        { title: "Credits Ledger", icon: Book, url: "/admin/erp/accounting/credits-ledger" },
        { title: "Invoices", icon: FileText, url: "/admin/erp/accounting/invoices" },
        { title: "Receivables & Dues", icon: HandCoins, url: "/admin/erp/accounting/receivables-dues" },
        { title: "Expenses", icon: Receipt, url: "/admin/erp/accounting/expenses" },
        { title: "Payouts", icon: ArrowUpRight, url: "/admin/erp/accounting/payouts" },
        { title: "Taxes & GST", icon: Percent, url: "/admin/erp/accounting/taxes-gst" },
        { title: "TDS Management", icon: Percent, url: "/admin/erp/finance/tds" },
        { title: "Reports", icon: BarChart3, url: "/admin/erp/accounting/reports" },
        { title: "Audit Logs", icon: History, url: "/admin/erp/accounting/audit-logs" },
        { title: "Settings", icon: Settings, url: "/admin/erp/accounting/settings" },
      ]
    },
    {
      title: "Operations",
      icon: Wrench,
      items: [
        { title: "Ops Dashboard", icon: LayoutGrid, url: "/admin/erp/operations/dashboard" },
        { title: "Task & Project Management", icon: ClipboardList, url: "/admin/erp/operations/tasks" },
        { title: "Lead & Onboarding Ops", icon: UserPlus, url: "/admin/erp/operations/leads" },
        { title: "Field Team Mgt", icon: Truck, url: "/admin/erp/operations/field-team" },
        { title: "Vendor Lifecycle", icon: RefreshCw, url: "/admin/erp/operations/vendor-lifecycle" },
        { title: "Support & SLA", icon: LifeBuoy, url: "/admin/support" },
        { title: "SOP & Knowledge Base", icon: Library, url: "/admin/erp/operations/sop" },
        { title: "Asset Management", icon: Box, url: "/admin/erp/operations/assets" },
        { title: "Process Automation", icon: Zap, url: "/admin/erp/operations/automation" },
        { title: "Ops Settings", icon: Settings, url: "/admin/erp/operations/settings" },
      ]
    },
    {
      title: "Engineering",
      icon: Cpu,
      items: [
        { title: "Dashboard", icon: LayoutGrid, url: "/admin/erp/engineering/dashboard" },
        { title: "Product Development", icon: Code2, url: "/admin/erp/engineering/product-development" },
        { title: "Tech Tasks", icon: CheckSquare, url: "/admin/erp/engineering/tasks" },
        { title: "Bugs", icon: Bug, url: "/admin/erp/engineering/bugs" },
        { title: "Releases", icon: Rocket, url: "/admin/erp/engineering/releases" },
        { title: "Infrastructure", icon: Server, url: "/admin/erp/engineering/infrastructure" },
        { title: "Tech Vendors", icon: HardDrive, url: "/admin/erp/engineering/vendors" },
        { title: "Technical Risks", icon: AlertTriangle, url: "/admin/erp/engineering/risks" },
        { title: "Systems", icon: Settings, url: "/admin/erp/engineering/settings" },
      ]
    },
    {
      title: "Legal & Compliance",
      icon: Scale,
      items: [
        { title: "Contract Repository", icon: FileText, url: "/admin/erp/legal/contracts" },
        { title: "Compliance Calendar", icon: CalendarDays, url: "/admin/erp/legal/compliance" },
        { title: "Legal Cases", icon: Briefcase, url: "/admin/erp/legal/cases" },
        { title: "Policy Management", icon: ClipboardList, url: "/admin/erp/legal/policies" },
        { title: "DPDP Compliance", icon: ShieldCheck, url: "/admin/erp/legal/dpdp" },
      ]
    },
    {
      title: "Customer Success",
      icon: HeartHandshake,
      items: [
        { title: "Vendor Health Scores", icon: Target, url: "/admin/erp/cs/health-scores" },
        { title: "Churn Prevention", icon: AlertTriangle, url: "/admin/erp/cs/churn" },
        { title: "Vendor NPS", icon: BarChart3, url: "/admin/erp/cs/nps" },
        { title: "Success Playbooks", icon: Book, url: "/admin/erp/cs/playbooks" },
        { title: "Escalation Tracker", icon: LifeBuoy, url: "/admin/erp/cs/escalations" },
      ]
    },
    {
      title: "Business Intelligence",
      icon: LineChart,
      items: [
        { title: "Platform KPIs", icon: LayoutGrid, url: "/admin/erp/bi/kpis" },
        { title: "Unit Economics", icon: CircleDollarSign, url: "/admin/erp/bi/unit-economics" },
        { title: "Cohort Analysis", icon: Users2, url: "/admin/erp/bi/cohorts" },
        { title: "Geographic Intel", icon: MapPin, url: "/admin/erp/bi/geo" },
        { title: "Google Analytics", icon: Globe, url: "/admin/erp/bi/google-analytics" },
      ]
    },
    {
      title: "Security & Privacy",
      icon: ShieldAlert,
      items: [
        { title: "Access Logs", icon: History, url: "/admin/erp/security/access-logs" },
        { title: "Data Privacy (DPDP)", icon: Shield, url: "/admin/erp/security/privacy" },
        { title: "Security Incidents", icon: AlertTriangle, url: "/admin/erp/security/incidents" },
        { title: "Permissions Audit", icon: CheckSquare, url: "/admin/erp/security/audit" },
      ]
    }
  ];

  const systemGroups = [
    {
      title: "Data & Systems",
      icon: Database,
      items: [
        { title: "Analytics", icon: BarChart3, url: "/admin/dashboard" },
        { title: "Notification Engine", icon: Bell, url: "/admin/notifications" },
        { title: "Audit Logs", icon: History, url: "/admin/audit-logs" },
      ]
    },
    {
      title: "Settings",
      icon: Settings,
      items: [
        { title: "Roles & Permissions (RBAC)", icon: Shield, url: "/admin/rbac" },
        { title: "Global Settings", icon: Sliders, url: "/admin/global-settings" },
        { title: "File Manager", icon: FolderOpen, url: "/admin/file-manager" },
        { title: "Pages", icon: FileText, url: "/admin/pages" },
        { title: "Enquiries", icon: MessageSquare, url: "/admin/enquiry" },
      ]
    }
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-card">
      <SidebarHeader className="p-6 border-b">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-foreground font-headline tracking-tight">Super Admin</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-card">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={mounted && pathname === "/admin/dashboard"} className="h-10 font-bold rounded-lg text-muted-foreground hover:bg-muted data-[active=true]:bg-muted data-[active=true]:text-foreground">
              <Link href="/admin/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-3" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-4 mb-2">Directory Hub</SidebarGroupLabel>
          <SidebarMenu className="px-1 space-y-1">
            <Collapsible className="group/collapsible-dir">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40">
                    <Users className="h-4 w-4 mr-3" />
                    <span>Directory</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible-dir:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-blue-100 dark:border-blue-900/40">
                    {directoryItems.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton asChild isActive={mounted && pathname === sub.url} className="h-9 font-bold text-muted-foreground rounded-lg hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30">
                          <Link href={sub.url}>
                            <sub.icon className="h-4 w-4 mr-3 opacity-70" />
                            <span className="text-[13px]">{sub.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-4 mb-2">Platform</SidebarGroupLabel>
          <SidebarMenu className="px-1 space-y-1">
            {platformGroups.map((group) => (
              <Collapsible key={group.title} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="h-10 font-bold text-muted-foreground rounded-lg hover:bg-muted">
                      <group.icon className="h-4 w-4 mr-3 opacity-70" />
                      <span>{group.title}</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenu className="ml-4 mt-1 border-l border-border">
                      {group.items.map((sub) => (
                        <SidebarMenuItem key={sub.title}>
                          <SidebarMenuButton asChild isActive={mounted && pathname === sub.url} className="h-9 font-bold text-muted-foreground rounded-lg hover:text-primary hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30">
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
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-4 mb-2">Business Verticals</SidebarGroupLabel>
          <SidebarMenu className="px-1 space-y-1">
            <Collapsible className="group/collapsible-biz">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40">
                    <Store className="h-4 w-4 mr-3" />
                    <span>Businesses</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible-biz:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-emerald-100 dark:border-emerald-900/40">
                    {businessSubItems.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton asChild isActive={mounted && pathname === sub.url} className="h-9 font-bold text-muted-foreground rounded-lg hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30">
                          <Link href={sub.url}>
                            <sub.icon className="h-4 w-4 mr-3 opacity-70" />
                            <span className="text-[13px]">{sub.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>

        {/* New Events Management Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-4 mb-2">Events & Conferences</SidebarGroupLabel>
          <SidebarMenu className="px-1 space-y-1">
            <Collapsible className="group/collapsible-events">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40">
                    <Calendar className="h-4 w-4 mr-3" />
                    <span>Events Management</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible-events:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-purple-100 dark:border-purple-900/40">
                    {eventManagementGroup.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton asChild isActive={mounted && pathname === sub.url} className="h-9 font-bold text-muted-foreground rounded-lg hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-950/30">
                          <Link href={sub.url}>
                            <sub.icon className="h-4 w-4 mr-3 opacity-70" />
                            <span className="text-[13px]">{sub.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-4 mb-2">Certifications</SidebarGroupLabel>
          <SidebarMenu className="px-1 space-y-1">
            <Collapsible className="group/collapsible-cert">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/40">
                    <Award className="h-4 w-4 mr-3" />
                    <span>Halal Certification</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible-cert:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-amber-100 dark:border-amber-900/40">
                    {[
                      { title: "Body Applications", icon: CheckSquare, url: "/admin/certifications" },
                      { title: "Audit & Integrity Portal", icon: ShieldCheck, url: "/admin/certification-body" },
                    ].map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton asChild isActive={mounted && pathname === sub.url} className="h-9 font-bold text-muted-foreground rounded-lg hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-950/30">
                          <Link href={sub.url}>
                            <sub.icon className="h-4 w-4 mr-3 opacity-70" />
                            <span className="text-[13px]">{sub.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-4 mb-2">Internal ERP</SidebarGroupLabel>
          <SidebarMenu className="px-1 space-y-1">
            {erpGroups.map((group) => (
              <Collapsible key={group.title} className="group/collapsible-erp">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="h-10 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-lg hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30">
                      <group.icon className="h-4 w-4 mr-3 opacity-80" />
                      <span>{group.title}</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible-erp:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenu className="ml-4 mt-1 border-l border-emerald-100 dark:border-emerald-900/40">
                      {group.items.map((sub) => (
                        <SidebarMenuItem key={sub.title}>
                          <SidebarMenuButton asChild className="h-9 font-bold text-muted-foreground rounded-lg hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30">
                            <Link href={sub.url}>
                              <sub.icon className="h-4 w-4 mr-3 opacity-70" />
                              <span className="text-[13px]">{sub.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-4 mb-2">Systems</SidebarGroupLabel>
          <SidebarMenu className="px-1 space-y-1">
            {systemGroups.map((group) => (
              <Collapsible key={group.title} className="group/collapsible-system">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="h-10 font-bold text-muted-foreground rounded-lg hover:bg-muted">
                      <group.icon className="h-4 w-4 mr-3 opacity-70" />
                      <span>{group.title}</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible-system:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenu className="ml-4 mt-1 border-l border-border">
                      {group.items.map((sub) => (
                        <SidebarMenuItem key={sub.title}>
                          <SidebarMenuButton asChild className="h-9 font-bold text-muted-foreground rounded-lg hover:text-primary hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30">
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
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t bg-muted/50">
        <Link href="/" className="flex items-center gap-3 text-red-500 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-zinc-900 rounded-full flex items-center justify-center text-white font-black text-xs">SA</div>
          <span className="text-sm font-bold">Exit Admin</span>
          <ExternalLink className="h-3 w-3 ml-auto" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
