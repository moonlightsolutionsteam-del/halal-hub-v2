
"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link 
      href={href} 
      className={cn(
        "px-4 py-2 text-muted-foreground font-semibold hover:text-primary whitespace-nowrap",
        isActive && "border-b-2 border-primary text-primary"
      )}
    >
      {children}
    </Link>
  );
};


export default function AccountingLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="space-y-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Finance & Accounting</h2>
          <p className="text-muted-foreground">
            Manage revenue, expenses, payouts, and financial reporting.
          </p>
        </div>
        <div className="flex items-center border-b overflow-x-auto no-scrollbar">
            <NavLink href="/SKIP_ADMIN_ERP/accounting/revenue-dashboard">Revenue Dashboard</NavLink>
            <NavLink href="/SKIP_ADMIN_ERP/accounting/vendor-billing">Vendor Billing</NavLink>
            <NavLink href="/SKIP_ADMIN_ERP/accounting/credits-ledger">Credits Ledger</NavLink>
            <NavLink href="/SKIP_ADMIN_ERP/accounting/invoices">Invoices</NavLink>
            <NavLink href="/SKIP_ADMIN_ERP/accounting/receivables-dues">Receivables & Dues</NavLink>
            <NavLink href="/SKIP_ADMIN_ERP/accounting/expenses">Expenses</NavLink>
            <NavLink href="/SKIP_ADMIN_ERP/accounting/payouts">Payouts</NavLink>
            <NavLink href="/SKIP_ADMIN_ERP/accounting/taxes-gst">Taxes & GST</NavLink>
            <NavLink href="/SKIP_ADMIN_ERP/accounting/reports">Reports</NavLink>
            <NavLink href="/SKIP_ADMIN_ERP/accounting/audit-logs">Audit Logs</NavLink>
            <NavLink href="/SKIP_ADMIN_ERP/accounting/settings">Settings</NavLink>
        </div>
        <div className="mt-4">
            {children}
        </div>
    </div>
  );
}
