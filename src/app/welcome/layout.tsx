import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Welcome to Halal Hub",
  description: "Your Islamic lifestyle super-app for Mumbai. Find halal food, mosques, events, and community.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
