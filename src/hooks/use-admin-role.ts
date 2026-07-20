"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

export type AdminTier = "viewer" | "editor" | "manager" | "super_admin"

const TIER_RANK: Record<AdminTier, number> = {
  viewer: 1,
  editor: 2,
  manager: 3,
  super_admin: 4,
}

export function useAdminRole() {
  const { user } = useAuth()
  const [tier, setTier] = useState<AdminTier | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    supabase
      .from("admin_roles")
      .select("tier")
      .eq("user_id", user.uid)
      .single()
      .then(({ data }) => {
        setTier((data?.tier as AdminTier) ?? null)
        setLoading(false)
      })
  }, [user?.uid])

  const can = (required: AdminTier) =>
    tier !== null && TIER_RANK[tier] >= TIER_RANK[required]

  return { tier, loading, can }
}
