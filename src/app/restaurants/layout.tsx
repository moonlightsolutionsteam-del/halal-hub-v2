import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Halal Restaurants Mumbai",
  description: "Discover the best halal-certified restaurants and eateries in Mumbai.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
