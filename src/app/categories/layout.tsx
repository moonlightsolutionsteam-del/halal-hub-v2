import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Halal Categories",
  description: "Browse all halal business categories in Mumbai — food, mosques, fashion, healthcare, education, travel, and more.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
