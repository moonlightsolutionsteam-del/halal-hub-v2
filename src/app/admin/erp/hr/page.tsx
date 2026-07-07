"use client"

import { redirect } from 'next/navigation'

export default function HrDashboardRedirect() {
    redirect('/admin/erp/hr/dashboard')
}
