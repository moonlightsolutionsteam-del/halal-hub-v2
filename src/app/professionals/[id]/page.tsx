"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

export default function ProfessionalDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  useEffect(() => {
    router.replace(`/entities/${id}`)
  }, [id, router])

  return null
}
