"use client"

import { createContext, useContext, useEffect, useState, useRef, useCallback } from "react"

export interface BusinessHours {
  open: string
  close: string
  closed: boolean
}

export interface OnboardingDraft {
  // Step 0 — Category
  category: string
  categoryLabel: string

  // Step 1 — Business Details
  businessName: string
  brandName: string
  description: string
  tagline: string
  businessType: string
  subcategory: string

  // Step 2 — Location
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  country: string
  postalCode: string
  latitude: string
  longitude: string
  landmark: string

  // Step 3 — Operating Hours
  hours: Record<string, BusinessHours>

  // Step 4 — Contact & Social
  email: string
  phone: string
  whatsapp: string
  website: string
  instagram: string
  facebook: string
  youtube: string
  tiktok: string

  // Step 5 — Halal Declaration
  halalStatus: string
  certificationBody: string
  certificationNumber: string
  certificationExpiry: string
  slaughterMethod: string
  halalDeclarationAgreed: boolean

  // Step 1b — Category Specifications (stored alongside details)
  categorySpecs: Record<string, string | string[]>

  // Step 6 — Media
  logoUrl: string
  coverUrl: string
  galleryUrls: string[]
  documentUrls: string[]

  // Meta
  currentStep: number
  submittedAt: string
  status: "draft" | "submitted" | "approved" | "rejected"
}

const DEFAULT_HOURS: Record<string, BusinessHours> = {
  Monday: { open: "09:00", close: "21:00", closed: false },
  Tuesday: { open: "09:00", close: "21:00", closed: false },
  Wednesday: { open: "09:00", close: "21:00", closed: false },
  Thursday: { open: "09:00", close: "21:00", closed: false },
  Friday: { open: "09:00", close: "22:00", closed: false },
  Saturday: { open: "09:00", close: "22:00", closed: false },
  Sunday: { open: "10:00", close: "20:00", closed: false },
}

const EMPTY_DRAFT: OnboardingDraft = {
  category: "",
  categoryLabel: "",
  businessName: "",
  brandName: "",
  description: "",
  tagline: "",
  businessType: "",
  subcategory: "",
  categorySpecs: {},
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
  latitude: "",
  longitude: "",
  landmark: "",
  hours: DEFAULT_HOURS,
  email: "",
  phone: "",
  whatsapp: "",
  website: "",
  instagram: "",
  facebook: "",
  youtube: "",
  tiktok: "",
  halalStatus: "",
  certificationBody: "",
  certificationNumber: "",
  certificationExpiry: "",
  slaughterMethod: "",
  halalDeclarationAgreed: false,
  logoUrl: "",
  coverUrl: "",
  galleryUrls: [],
  documentUrls: [],
  currentStep: 1,
  submittedAt: "",
  status: "draft",
}

const STORAGE_KEY = "halalhub-onboarding-draft"

interface OnboardingContextType {
  draft: OnboardingDraft
  update: (partial: Partial<OnboardingDraft>) => void
  reset: () => void
  goToStep: (step: number) => void
}

const OnboardingContext = createContext<OnboardingContextType>({
  draft: EMPTY_DRAFT,
  update: () => {},
  reset: () => {},
  goToStep: () => {},
})

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<OnboardingDraft>(EMPTY_DRAFT)
  const loaded = useRef(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setDraft({ ...EMPTY_DRAFT, ...parsed })
      }
    } catch {}
    loaded.current = true
  }, [])

  useEffect(() => {
    if (!loaded.current) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
    } catch {}
  }, [draft])

  const update = useCallback((partial: Partial<OnboardingDraft>) => {
    setDraft((prev) => ({ ...prev, ...partial }))
  }, [])

  const reset = useCallback(() => {
    setDraft(EMPTY_DRAFT)
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }, [])

  const goToStep = useCallback((step: number) => {
    setDraft((prev) => ({ ...prev, currentStep: step }))
  }, [])

  return (
    <OnboardingContext.Provider value={{ draft, update, reset, goToStep }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export const useOnboarding = () => useContext(OnboardingContext)
