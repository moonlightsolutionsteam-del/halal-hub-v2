"use client"

import { useCallback, useEffect, useState } from "react"
import { useAuth } from "./use-auth"
import { createClient } from "@/lib/supabase/client"

export type CapabilityType =
  | "consumer"
  | "creator"
  | "professional"
  | "business_owner"
  | "volunteer"
  | "moderator"
  | "admin"

export type CapabilityStatus = "pending" | "active" | "suspended"

export interface Capability {
  id: string
  type: CapabilityType
  status: CapabilityStatus
  activated_at: string
  metadata: Record<string, any>
}

export function useCapabilities() {
  const { user } = useAuth()
  const [capabilities, setCapabilities] = useState<Capability[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    if (!user?.uid) { setCapabilities([]); setLoading(false); return }
    const supabase = createClient()
    const { data } = await supabase
      .from("capabilities")
      .select("id, type, status, activated_at, metadata")
      .eq("user_id", user.uid)
    setCapabilities((data ?? []) as Capability[])
    setLoading(false)
  }, [user?.uid])

  useEffect(() => { refresh() }, [refresh])

  const hasCapability = useCallback(
    (type: CapabilityType) => capabilities.some(c => c.type === type && c.status === "active"),
    [capabilities],
  )

  const getCapability = useCallback(
    (type: CapabilityType) => capabilities.find(c => c.type === type) ?? null,
    [capabilities],
  )

  const activateCapability = useCallback(async (
    type: CapabilityType,
    metadata: Record<string, any> = {},
  ): Promise<{ error: any }> => {
    if (!user?.uid) return { error: "Not signed in" }
    const supabase = createClient()
    // Creator self-activates immediately; others go pending for admin approval
    const status: CapabilityStatus = type === "creator" ? "active" : "pending"
    const { error } = await supabase.from("capabilities").upsert(
      { user_id: user.uid, type, status, metadata, activated_at: new Date().toISOString() },
      { onConflict: "user_id,type" },
    )
    if (!error) await refresh()
    return { error }
  }, [user?.uid, refresh])

  return { capabilities, loading, hasCapability, getCapability, activateCapability, refresh }
}
