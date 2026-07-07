import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Explore Halal Mumbai",
  description: "Explore halal food, mosques, services, events, and community near you in Mumbai.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
