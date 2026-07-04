"use client"

import { redirect } from 'next/navigation'

export default function AccountingDashboardRedirect() {
    redirect('/SKIP_ADMIN_ERP/accounting/revenue-dashboard')
}
