import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Halal Marketplace",
  description: "Buy and sell halal products in Mumbai's Muslim marketplace.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
