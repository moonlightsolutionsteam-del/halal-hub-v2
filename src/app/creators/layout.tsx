import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Muslim Creators",
  description: "Discover Islamic content creators, scholars, chefs, and influencers on Halal Hub.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
