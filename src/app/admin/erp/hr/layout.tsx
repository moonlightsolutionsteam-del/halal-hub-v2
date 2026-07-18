"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { ClipboardCheck, Users, LayoutDashboard, BarChart2, UserPlus, CalendarCheck, Settings } from "lucide-react";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "px-4 py-1.5 text-sm font-bold text-muted-foreground hover:text-foreground whitespace-nowrap flex items-center gap-2 rounded-full transition-colors",
        isActive && "bg-primary/10 text-primary"
      )}
    >
      {children}
    </Link>
  );
};


export default function HRLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const hrNav = [
    { href: "/admin/erp/hr/dashboard", icon: <LayoutDashboard className="h-4 w-4" />, label: "Dashboard" },
    { href: "/admin/erp/hr/team", icon: <Users className="h-4 w-4" />, label: "Team Directory" },
    { href: "/admin/erp/hr/attendance", icon: <ClipboardCheck className="h-4 w-4" />, label: "Attendance" },
    { href: "/admin/erp/hr/leaves", icon: <CalendarCheck className="h-4 w-4" />, label: "Leaves" },
    { href: "/admin/erp/hr/recruitment", icon: <UserPlus className="h-4 w-4" />, label: "Recruitment" },
    { href: "/admin/erp/hr/performance", icon: <BarChart2 className="h-4 w-4" />, label: "Performance" },
    { href: "/admin/erp/hr/settings", icon: <Settings className="h-4 w-4" />, label: "Settings" },
  ];

  return (
    <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black font-headline">Human Resources</h2>
          <p className="text-sm text-muted-foreground font-medium">
            Manage employees, attendance, and recruitment.
          </p>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
            {hrNav.map(item => (
                <NavLink key={item.label} href={item.href}>
                    {item.icon} {item.label}
                </NavLink>
            ))}
        </div>
        <div>
            {children}
        </div>
    </div>
  );
}
