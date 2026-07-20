"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { useAdminRole } from "@/hooks/use-admin-role"
import { Loader2 } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth()
  const { tier, loading: roleLoading } = useAdminRole()
  const router = useRouter()

  const isDev = typeof window !== "undefined" && window.location.hostname === "localhost"

  useEffect(() => {
    if (isDev) return
    if (authLoading || roleLoading) return
    if (!user) { router.replace("/employee/login"); return }
    if (!tier) { router.replace("/employee/login"); return }
  }, [user, tier, authLoading, roleLoading, isDev, router])

  if (!isDev && (authLoading || roleLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!isDev && (!user || !tier)) {
    return null
  }

  return <>{children}</>
}
