import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Halal Store",
  description: "Shop halal-certified products, Islamic goods, and modest fashion.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
