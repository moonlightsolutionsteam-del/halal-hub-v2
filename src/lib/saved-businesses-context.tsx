"use client"

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react"

export interface SavedBusiness {
  id: string
  name: string
  category: string
  location: string
}

const STORAGE_KEY = "halalhub-saved-businesses"

interface SavedBusinessesContextType {
  saved: SavedBusiness[]
  isSaved: (id: string) => boolean
  toggleSaved: (business: SavedBusiness) => void
}

const SavedBusinessesContext = createContext<SavedBusinessesContextType>({
  saved: [],
  isSaved: () => false,
  toggleSaved: () => {},
})

export function SavedBusinessesProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<SavedBusiness[]>([])
  const loaded = useRef(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setSaved(JSON.parse(stored))
    } catch {}
    loaded.current = true
  }, [])

  useEffect(() => {
    if (!loaded.current) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
    } catch {}
  }, [saved])

  const isSaved = useCallback((id: string) => saved.some((b) => b.id === id), [saved])

  const toggleSaved = useCallback((business: SavedBusiness) => {
    setSaved((prev) =>
      prev.some((b) => b.id === business.id)
        ? prev.filter((b) => b.id !== business.id)
        : [...prev, business]
    )
  }, [])

  return (
    <SavedBusinessesContext.Provider value={{ saved, isSaved, toggleSaved }}>
      {children}
    </SavedBusinessesContext.Provider>
  )
}

export const useSavedBusinesses = () => useContext(SavedBusinessesContext)
