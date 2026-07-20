"use client"

import { useAdminRole, AdminTier } from "@/hooks/use-admin-role"
import { ShieldAlert, Loader2 } from "lucide-react"

interface AdminRoleGateProps {
  required: AdminTier
  children: React.ReactNode
}

export function AdminRoleGate({ required, children }: AdminRoleGateProps) {
  const { loading, can } = useAdminRole()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
      </div>
    )
  }

  if (!can(required)) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-6">
        <div className="h-14 w-14 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-4">
          <ShieldAlert className="h-7 w-7 text-red-500" />
        </div>
        <h2 className="text-lg font-black text-foreground">Access Restricted</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
          Your admin role does not have permission to view this section. Contact a super admin.
        </p>
      </div>
    )
  }

  return <>{children}</>
}
