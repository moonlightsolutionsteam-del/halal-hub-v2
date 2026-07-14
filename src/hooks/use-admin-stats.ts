"use client"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export interface AdminStats {
  totalBusinesses: number
  activeBusinesses: number
  pendingBusinesses: number
  rejectedBusinesses: number
  totalUsers: number
  categoryCounts: Record<string, number>
  pendingList: PendingBusiness[]
  loading: boolean
}

export interface PendingBusiness {
  id: string
  name: string
  category: string
  city: string | null
  country: string | null
  created_at: string | null
}

const EMPTY: AdminStats = {
  totalBusinesses: 0,
  activeBusinesses: 0,
  pendingBusinesses: 0,
  rejectedBusinesses: 0,
  totalUsers: 0,
  categoryCounts: {},
  pendingList: [],
  loading: true,
}

export function useAdminStats(): AdminStats {
  const [stats, setStats] = useState<AdminStats>(EMPTY)

  useEffect(() => {
    const supabase = createClient()
    async function load() {
      const [businesses, profiles, pending] = await Promise.all([
        (supabase as any).from("businesses").select("status, category"),
        (supabase as any).from("profiles").select("id", { count: "exact", head: true }),
        (supabase as any)
          .from("businesses")
          .select("id, name, category, city, country, created_at")
          .eq("status", "pending")
          .order("created_at", { ascending: false })
          .limit(6),
      ])

      const rows: { status: string; category: string }[] = businesses.data ?? []
      const active = rows.filter((r) => r.status === "active").length
      const pendingCount = rows.filter((r) => r.status === "pending").length
      const rejected = rows.filter((r) => r.status === "rejected").length
      const categoryCounts: Record<string, number> = {}
      for (const r of rows) {
        if (r.status === "active") {
          categoryCounts[r.category] = (categoryCounts[r.category] ?? 0) + 1
        }
      }

      setStats({
        totalBusinesses: rows.length,
        activeBusinesses: active,
        pendingBusinesses: pendingCount,
        rejectedBusinesses: rejected,
        totalUsers: profiles.count ?? 0,
        categoryCounts,
        pendingList: pending.data ?? [],
        loading: false,
      })
    }
    load()
  }, [])

  return stats
}
