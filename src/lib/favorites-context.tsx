"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import type { Dua } from "@/lib/ummah-api"

const STORAGE_KEY = "halalhub-favorite-duas"

interface FavoritesContextType {
  favorites: Dua[]
  isFavorite: (id: number) => boolean
  toggleFavorite: (dua: Dua) => void
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
})

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Dua[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setFavorites(JSON.parse(stored))
    } catch {}
  }, [])

  const isFavorite = useCallback((id: number) => favorites.some((d) => d.id === id), [favorites])

  const toggleFavorite = useCallback((dua: Dua) => {
    setFavorites((prev) => {
      const exists = prev.some((d) => d.id === dua.id)
      const next = exists ? prev.filter((d) => d.id !== dua.id) : [...prev, dua]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavoriteDuas = () => useContext(FavoritesContext)
