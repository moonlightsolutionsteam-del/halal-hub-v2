"use client"

import { redirect } from 'next/navigation'

export default function AccountingDashboardRedirect() {
    redirect('/admin/erp/accounting/revenue-dashboard')
}
