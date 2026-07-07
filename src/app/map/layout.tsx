import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Halal Map Mumbai",
  description: "Interactive map of halal businesses, mosques, and Islamic services in Mumbai.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
