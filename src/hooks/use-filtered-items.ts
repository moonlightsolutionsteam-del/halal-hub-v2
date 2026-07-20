"use client"

import { useMemo } from "react"

type Filterable = {
  name?: string
  loc?: string
  type?: string
  features?: string[]
  [key: string]: any
}

export function useFilteredItems<T extends Filterable>(
  items: T[],
  search: string,
  tab: string,
  tabDefault: string
): T[] {
  return useMemo(() => {
    return items.filter(item => {
      if (search) {
        const q = search.toLowerCase()
        const inName = item.name?.toLowerCase().includes(q) ?? false
        const inLoc = (item.loc || "").toLowerCase().includes(q)
        const inType = (item.type || "").toLowerCase().includes(q)
        if (!inName && !inLoc && !inType) return false
      }
      if (tab && tab !== tabDefault) {
        const t = tab.toLowerCase()
        const inType = (item.type || "").toLowerCase().includes(t)
        const inFeatures = Array.isArray(item.features)
          ? item.features.some(f => f.toLowerCase().includes(t))
          : false
        if (!inType && !inFeatures) return false
      }
      return true
    })
  }, [items, search, tab, tabDefault])
}
